import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendacne.entity';
import {
  Repository,
  MoreThanOrEqual,
  LessThanOrEqual,
  Connection,
} from 'typeorm';
import { GetDate } from 'src/Helper/common/date.common';
import {
  GetAttendanceDto,
  GetPerEmployeeAttendanceDto,
} from './dto/get-attendance.dto';
import { GetAttendanceServerDto } from './dto/get-attendance-server.dto';
import { GetAttendanceDataDto } from './dto/get-attendance-data.dto';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { getManager } from 'typeorm';

@Injectable()
export class AttendacneService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
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
    let shiftTime = employee.shift.start_time.toString();
    let shiftList = shiftTime.split(':');
    shiftList[1] = (+shiftList[1] + 10).toString();
    //
    let graceTime = `${shiftList[0]}:${shiftList[1]}:${shiftList[2]}`;
    if (graceTime < inTime) {
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
    // let query = `SELECT att.*,ep.employee_name,ep.shift_id,s.start_time, s.end_time,CONCAT(s.start_time," - ",s.end_time) AS shift, (att.outtime-att.intime) as working_hours FROM attendance att left join employees ep on ep.employee_number=att.employee_number left join shifts s on s.id=ep.shift_id WHERE att.attendance_date BETWEEN '${getAttendanceDataDto.from_date}' AND '${getAttendanceDataDto.to_date}';`;

    let query = `SELECT '${getAttendanceDataDto.from_date}' as attendance_date,employee_number,employee_name,shift_id,IF(attend_type = 'Absent','00:00:00',start_time) AS intime,IF(attend_type = 'Absent','00:00:00',end_time) AS outtime,shift,working_hours,attend_type as type FROM (SELECT employee_number,employee_name,shift_id,(SELECT intime FROM attendance WHERE attendance.employee_number = employees.employee_number AND attendance_date = '${getAttendanceDataDto.from_date}') AS start_time, (SELECT outtime FROM attendance WHERE attendance.employee_number = employees.employee_number AND attendance_date = '${getAttendanceDataDto.from_date}') AS end_time,CONCAT(start_time," - ",end_time) AS shift,IFNULL((SELECT (TIMEDIFF(outtime,intime)) FROM attendance WHERE attendance.employee_number = employees.employee_number AND attendance_date = '${getAttendanceDataDto.from_date}'),0)  AS working_hours,IFNULL((SELECT type FROM attendance WHERE attendance.employee_number = employees.employee_number AND attendance_date = '${getAttendanceDataDto.from_date}'),'Absent')  AS attend_type from employees LEFT JOIN shifts on employees.shift_id = shifts.id order by employee_number) t`;

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

  async findByMonth(
    getPerEmployeeAttendanceDto: GetPerEmployeeAttendanceDto,
  ): Promise<any> {
    return await this.connection.query(
      `SELECT employee_number,attendance_date,type,is_deleted,status,intime,outtime FROM attendance WHERE employee_number = "${getPerEmployeeAttendanceDto.employee_number}" AND monthname(attendance_date) = "${getPerEmployeeAttendanceDto.attendance_month}" AND YEAR(attendance_date) = "${getPerEmployeeAttendanceDto.attendance_year}";`,
    );
  }
  //
  timeHandler = (time: string) => {
    var hours = time.substring(0, time.indexOf(':'));
    var mins = time.substring(time.indexOf(':') + 1);
    //
    if (mins.length == 1) mins = '0' + mins;
    if (hours.length == 1) hours = '0' + hours;
    //
    return hours + ':' + mins;
  };

  timeDifference(start: Date, end: Date): string {
    const diff = end.getTime() - start.getTime();
    const diffInSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
