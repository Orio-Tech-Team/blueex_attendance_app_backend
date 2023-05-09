import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
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
//
import * as moment from 'moment';
//
// const moment = require('moment');
const nodemailer = require('nodemailer');
const FormData = require('form-data');
//
@Controller('attendance')
export class AttendacneController {
  constructor(
    private readonly attendacneService: AttendacneService,
    private readonly employeeService: EmployeeService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @Get('app')
  async markAttendanceApp(@Req() request): Promise<any> {
    try {
      const employeeNumber = request.user_information.refrence_number;
      const employee = await this.employeeService.findByShift(employeeNumber);

      const attendance = await this.attendacneService.markAttendance(employee);
      //

      const data = new FormData();

      data.append(
        'data',
        JSON.stringify({
          empid: employeeNumber,
          time: moment().format('HHmm'),
          status: attendance.type.charAt(0).toUpperCase(),
          channel: 'APP',
        }),
      );

      //
      const method = {
        method: 'post',
        url: 'http://benefitx.blue-ex.com/hrm/cronjob/appattendance.php',
        headers: {
          ...data.getHeaders(),
        },
        data: data,
      };

      const response = await axios(method);
      //
      return Response.get(200, 'Success', attendance);
    } catch (err) {
      return Response.get(500, err.message, []);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  async markAttendance(@Req() request): Promise<any> {
    const employeeNumber = request.user_information.refrence_number;
    const employee = await this.employeeService.findByShift(employeeNumber);

    const attendance = await this.attendacneService.markAttendance(employee);
    //

    const data = new FormData();

    data.append(
      'data',
      JSON.stringify({
        empid: employeeNumber,
        time: moment().format('HHmm'),
        status: attendance.type.charAt(0).toUpperCase(),
        channel: 'APP',
      }),
    );

    //
    const method = {
      method: 'post',
      url: 'http://benefitx.blue-ex.com/hrm/cronjob/appattendance.php',
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios(method);
    //
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
  @ApiBearerAuth('JWT-auth')
  @Get('get_employee_attendance')
  async getEmployeeAttendance(@Req() request): Promise<any> {
    const employeeNumber = request.user_information.refrence_number;
    const currentDate = moment();

    var employee = await this.attendacneService.getAttendance(
      employeeNumber,
      currentDate.format('YYYY-MM-DD'),
    );
    //
    if (typeof employee == 'boolean') return Response.get(200, 'success', {});
    //
    const in_time = moment(employee.intime, 'hh:mm:ss').toDate();
    const out_time = moment(employee.outtime, 'hh:mm:ss').toDate();
    //

    //
    const working_hours = employee.outtime
      ? this.attendacneService.timeDifference(in_time, out_time)
      : null;
    //
    employee = {
      ...employee,
      working_hours,
    };
    //
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
  @Post('app')
  async getAttendanceApp(
    @Body() getAttendanceDto: GetAttendanceDto,
    @Req() request,
  ) {
    try {
      const employeeNumber = request.user_information.refrence_number;
      const response = await this.attendacneService.getAttendanceByMonth(
        getAttendanceDto,
        employeeNumber,
      );
      return Response.get(200, 'Success', response);
    } catch (err) {
      return Response.get(500, err.message, []);
    }
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

  @Post('getattendancedata/app')
  async functionApp(@Body() getAttendanceDataDto: GetAttendanceDataDto) {
    try {
      const data = await this.attendacneService.getAttendanceDataDto(
        getAttendanceDataDto,
      );
      return Response.get(200, 'Success', data);
    } catch (err) {
      return Response.get(500, err.message, []);
    }
  }

  @Post('getattendancedata')
  async function(@Body() getAttendanceDataDto: GetAttendanceDataDto) {
    return await this.attendacneService.getAttendanceDataDto(
      getAttendanceDataDto,
    );
  }
  @ApiBearerAuth('JWT-auth')
  @Post('hr-attendance-update')
  async hrAttedanceUpdate(
    @Body()
    hrAttendance: { date: string; time: string; type: string; comment: string },
    @Req() request,
  ) {
    try {
      const employeeNumber = request.user_information.refrence_number;
      const employee = await this.employeeService.findByShift(employeeNumber);
      var time_to_send = this.attendacneService
        .timeHandler(hrAttendance.time)
        .replace(':', '');

      //
      var attendance_status: string = hrAttendance.type
        .toLowerCase()
        .includes('in')
        ? 'I'
        : 'O';
      //
      var time_to_check: string = hrAttendance.time;
      let newTime: string[] = time_to_check.split('');
      newTime.splice(2, 0, ':');
      time_to_check = newTime.join('');
      var attendance_type: string =
        employee.shift.start_time.toString() <
        this.attendacneService.timeHandler(hrAttendance.time)
          ? 'L'
          : 'P';
      const data = new FormData();
      if (time_to_send.length == 3) {
        time_to_send = `0${time_to_send}`;
      }

      if (time_to_send.includes('TimeOfDay')) {
        time_to_send = time_to_send.substring(
          time_to_send.indexOf('(') + 1,
          time_to_send.length - 1,
        );
      }

      data.append(
        'data',
        JSON.stringify({
          empid: employeeNumber,
          date: hrAttendance.date,
          time: time_to_send,
          status: attendance_type,
          comment: hrAttendance.comment,
          attype: attendance_status,
        }),
      );

      var config = {
        method: 'post',
        url: 'http://benefitx.blue-ex.com/hrm/cronjob/appattendance_update.php',
        headers: {
          ...data.getHeaders(),
        },
        data: data,
      };
      const respones = await axios(config);

      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: 'orio.tech',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: `attendance@orio.tech`, // generated ethereal user
          pass: `kkcdY?umlCP`, // generated ethereal password
        },
      });
      //
      let info = await transporter.sendMail({
        from: '"ORIO - Technologies" <attendance@orio.tech>', // sender address
        to: 'anam.saleem@blue-ex.com,hr.south@blue-ex.com', // list of receivers
        // to: 'ateebkhan997@gmail.com', // list of receivers/
        subject: 'Attendance Request!', // Subject line
        // text: 'Hello world?', // plain text body
        html: `
      <p>
      Hi,</br>
      Me ${employee.employee_name} with Employee ID: ${employeeNumber}, request you to kindly update my attendance for - Date ${hrAttendance.date}, ${hrAttendance.time}, ${hrAttendance.type}.
      </br>
      Reason
      </br>
      ${hrAttendance.comment}
      </p>
      `,
      });

      return Response.get(200, 'Success', []);
    } catch (err) {
      return Response.get(500, err.message, []);
    }
  }
}

//
