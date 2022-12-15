import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EmployeeService } from '../employee/employee.service';
import { AttendacneService } from './attendacne.service';
import { GetAttendanceServerDto } from './dto/get-attendance-server.dto';
import {
  GetAttendanceDto,
  GetPerEmployeeAttendanceDto,
} from './dto/get-attendance.dto';
import { GetAttendanceDataDto } from './dto/get-attendance-data.dto';
import { Response } from 'src/Helper/common/response.common';
//
@Controller('attendance')
export class AttendacneController {
  constructor(
    private readonly attendacneService: AttendacneService,
    private readonly employeeService: EmployeeService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @Get()
  async markAttendance(@Req() request): Promise<any> {
    const employeeNumber = request.user_information.refrence_number;
    const employee = await this.employeeService.findByShift(employeeNumber);
    return await this.attendacneService.markAttendance(employee);
  }
  //
  @ApiBearerAuth('JWT-auth')
  @Post('get_employee_attendance_detail')
  async getEmployeeAttendanceDetail(
    @Body() getPerEmployeeAttendanceDto: GetPerEmployeeAttendanceDto,
    @Req() request,
  ): Promise<any> {
    const employee = await this.attendacneService.findByMonth(
      getPerEmployeeAttendanceDto,
    );
    return Response.get(200, 'success', employee);
  }
  //

  @Post('manual')
  async markAttendanceManually(@Req() request): Promise<any> {
    const employeeNumber = request.body.emp_id;
    const employee = await this.employeeService.findByShift(employeeNumber);
    const date: string = request.body.date;
    const inTime: string = request.body.in_time;
    const outTime: string = request.body.out_time;

    return await this.attendacneService.markAttendanceManually(
      employee,
      date,
      inTime,
      outTime,
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Post()
  async getAttendance(
    @Body() getAttendanceDto: GetAttendanceDto,
    @Req() request,
  ) {
    const employeeNumber = request.user_information.refrence_number;
    return await this.attendacneService.getAttendanceByMonth(
      getAttendanceDto,
      employeeNumber,
    );
  }

  @Post('server')
  async getAttendanceServer(
    @Body() getAttenadanceServerData: GetAttendanceServerDto,
  ) {
    return await this.attendacneService.getAttendanceServerUpdate(
      getAttenadanceServerData,
    );
  }

  @Post('getattendancedata')
  async function(@Body() getAttendanceDataDto: GetAttendanceDataDto) {
    return await this.attendacneService.getAttendanceDataDto(
      getAttendanceDataDto,
    );
  }
}
