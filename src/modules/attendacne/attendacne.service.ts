import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendacne.entity';
import { Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { GetDate } from 'src/Helper/common/date.common';
import { GetAttendanceDto } from './dto/get-attendance.dto';
import { GetAttendanceServerDto } from './dto/get-attendance-server.dto';
import { GetAttendanceDataDto } from './dto/get-attendance-data.dto';
import { getConnection } from 'typeorm';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { getManager } from 'typeorm';

@Injectable()
export class AttendacneService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async markAttendance(employee: Employee): Promise<any> {
    const attendanceDate = await GetDate.currentDate();
    const attendance = await this.getAttendance(
      employee.employee_number,
      attendanceDate,
    );
    const attendanceTime = GetDate.currentTime().toString();
    let attendanceType = 'Present';
    if (employee.shift.start_time.toString() < attendanceTime) {
      attendanceType = 'Late';
    } else {
      attendanceType = 'Present';
    }
    let newAttendance;
    if (attendance == true) {
      newAttendance = await this.attendanceRepository.save(
        this.attendanceRepository.create({
          employee_number: employee.employee_number,
          attendance_date: attendanceDate,
          intime: attendanceTime,
          type: attendanceType,
        }),
      );
    } else {
      newAttendance = await this.attendanceRepository.save({
        ...attendance,
        outtime: attendanceTime,
      });
    }
    return await this.getAttendanceById(newAttendance.id);
  }

  async markAttendanceManually(
    employee: Employee,
    date: string,
    inTime: string,
    outTime,
  ): Promise<any> {
    const attendance = await this.getAttendance(employee.employee_number, date);

    let attendanceType = 'Present';
    if (employee.shift.start_time.toString() < inTime) {
      attendanceType = 'Late';
    } else {
      attendanceType = 'Present';
    }
    let newAttendance;
    if (attendance == true) {
      newAttendance = await this.attendanceRepository.save(
        this.attendanceRepository.create({
          employee_number: employee.employee_number,
          attendance_date: date,
          intime: inTime,
          outtime: outTime,
          type: attendanceType,
        }),
      );
    } else {
      newAttendance = await this.attendanceRepository.save({
        ...attendance,
        intime: inTime,
        outtime: outTime,
        type: attendanceType,
      });
    }
    return await this.getAttendanceById(newAttendance.id);
  }

  async getAttendance(
    employeeNumber: number,
    attendanceDate: string,
  ): Promise<any> {
    return this.attendanceRepository
      .findOneOrFail({
        where: {
          employee_number: employeeNumber,
          attendance_date: attendanceDate,
        },
      })
      .catch((error) => {
        return true;
      });
  }

  async getAttendanceByMonth(
    getAttendanceDto: GetAttendanceDto,
    employeeNumber,
  ) {
    const attendance = await this.attendanceRepository
      .createQueryBuilder('attendance')
      .select([
        "attendance.employee_number,attendance.type,attendance.intime,attendance.outtime,date_format(attendance.attendance_date,'%Y-%m-%d') as attendance_date",
        "DATE_FORMAT(attendance_date, '%a') as day",
        'TIMEDIFF(outtime , intime) as working_hours',
      ])
      .where(
        "employee_number = :employeeNumber AND DATE_FORMAT(attendance_date,'%Y-%m') = :attendanceDate",
        {
          attendanceDate: getAttendanceDto.attedance_date,
          employeeNumber: employeeNumber,
        },
      )
      .getRawMany();
    return attendance;
  }

  async getAttendanceById(id) {
    return await this.attendanceRepository
      .createQueryBuilder('attendance')
      .select([
        "attendance.employee_number,attendance.type,attendance.intime,attendance.outtime,date_format(attendance.attendance_date,'%Y-%m-%d') as attendance_date",
        "DATE_FORMAT(attendance_date, '%a') as day",
        'TIMEDIFF(outtime , intime) as working_hours',
      ])
      .where('id = :id', {
        id: id,
      })
      .getRawOne();
  }

  async getAttendanceServerUpdate(
    getAttendanceServerData: GetAttendanceServerDto,
  ) {
    return await this.attendanceRepository.find({
      where: {
        updated_at: MoreThanOrEqual(getAttendanceServerData.last_update),
      },
    });
  }

  async getAttendanceDataDto(getAttendanceDataDto: GetAttendanceDataDto) {
    let query =
      "SELECT employees.* , IFNULL(attendance.intime,'00:00:00') as intime , IFNULL(attendance.outtime, '00:00:00') as outtime , DATE_FORMAT(employees.attendance_date, '%a') as day , (CASE WHEN attendance.type IS NULL AND DATE_FORMAT(employees.attendance_date,'%a') IN ('Sat','Sun') THEN 'Holiday' WHEN attendance.type IS NULL THEN 'Absent' ELSE attendance.type END) as type , TIMEDIFF(IFNULL(outtime,'00:00:00') , IFNULL(intime,'00:00:00')) as working_hours FROM attendance RIGHT JOIN (SELECT employees.employee_number ,employees.employee_name , v.selected_date as attendance_date FROM (SELECT ADDDATE('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date FROM (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t0,(SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,(SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,(SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3,(SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t4) v , employees WHERE selected_date BETWEEN '" +
      getAttendanceDataDto.from_date +
      "' AND '" +
      getAttendanceDataDto.to_date +
      "') employees ON attendance.attendance_date = employees.attendance_date AND attendance.employee_number = employees.employee_number";

    if (!getAttendanceDataDto.employee_number) {
      return await getManager().query(query);
    } else {
      query +=
        " WHERE employees.employee_number ='" +
        getAttendanceDataDto.employee_number +
        "'";
      return await getManager().query(query);
    }
  }
}
