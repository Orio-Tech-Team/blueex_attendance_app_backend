import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Employee])],
  controllers: [NotificationController],
  providers: [NotificationService, EmployeeService],
})
export class NotificationModule {}
