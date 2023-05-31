import { Module } from '@nestjs/common';
import { ScheduledTask } from './scheduledTask.controller';
import { EmployeeService } from 'src/modules/employee/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/modules/employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [ScheduledTask],
  providers: [EmployeeService],
})
export class ScheduleModule {}
