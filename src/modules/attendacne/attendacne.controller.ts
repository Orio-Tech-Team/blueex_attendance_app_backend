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
const axios = require('axios');
const moment = require('moment');
const nodemailer = require('nodemailer');
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
    const attendance = await this.attendacneService.markAttendance(employee);
    //
    const method = {
      method: 'post',
      url: 'http://benefitx.blue-ex.com/hrm/cronjob/appattendance.php',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify({
        data: `{"empid":${employeeNumber},"time":${moment().format(
          'HHmm',
        )}, "status":"${attendance.type
          .charAt(0)
          .toUpperCase()}", "channel":"APP"}`,
      }),
    };
    await axios(method);

    return attendance;
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

  @Post('hr-attendance-update')
  async hrAttedanceUpdate(
    @Body() hrAttendance: { date: string; time: string; type: string },
    @Req() request,
  ) {
    const employeeNumber = request.user_information.refrence_number;
    const employee = await this.employeeService.findByEmployee(employeeNumber);
    //
    let testAccount = await nodemailer.createTestAccount();
    //
    let transporter = nodemailer.createTransport({
      host: 'orio.tech',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: `ateeb.khan@orio.tech`, // generated ethereal user
        pass: `jcUIKc-9V}Z5`, // generated ethereal password
      },
    });
    //
    let info = await transporter.sendMail({
      from: '"Ateeb" <ateeb.khan@orio.tech>', // sender address
      to: 'mohammad.ismail@orio.tech', // list of receivers
      subject: 'Request for attendance!', // Subject line
      text: 'Hello world?', // plain text body
      html: `<b>Me employee holding Employee ID: ${employeeNumber}</b>
      <b>Employee Name: ${employee[0].employee_name}</b>
      <p>Kindly update my attendance on date ${hrAttendance.date}
      update my ${hrAttendance.type} time, time ${hrAttendance.time}
      </p>
      `, // html body
    });
    //
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //
    return '';
  }
}
