import { Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EmployeeService } from '../employee/employee.service';
import { NotificationType } from './entities/notification.entity';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly employeeService: EmployeeService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  async createNotification(@Req() request) {
    const employeeNumber = request.user_information.refrence_number;
    const employee = await this.employeeService.findByShift(employeeNumber);
    const type: NotificationType = request.body.type;
    return await this.notificationService.createNotification(employee, type);
  }
}
