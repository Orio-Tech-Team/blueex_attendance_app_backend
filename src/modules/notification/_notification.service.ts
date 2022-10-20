import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetDate } from 'src/Helper/common/date.common';
import { DataNotFoundException } from 'src/Helper/Exception/data-not-found.exception';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import {
  Notification,
  NotificationType,
} from './entities/notification.entitiy';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(
    employee: Employee,
    type: NotificationType,
  ): Promise<any> {
    const notificationDate = await GetDate.currentDate();

    return await this.notificationRepository.save(
      this.notificationRepository.create({
        notification_time: notificationDate,
        type: type,
        employee_number: employee.employee_number,
      }),
    );
  }
}
