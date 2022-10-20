import { Module } from '@nestjs/common';
import { AttendacneService } from './attendacne.service';
import { AttendacneController } from './attendacne.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendacne.entity';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Attendance,Employee])],
  controllers: [AttendacneController],
  providers: [AttendacneService, EmployeeService]
})
export class AttendacneModule {}
