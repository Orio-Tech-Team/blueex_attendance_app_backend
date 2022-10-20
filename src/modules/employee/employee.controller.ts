import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiBearerAuth('JWT-auth')
  @Get()
  async findByEmployee(@Req() req): Promise<any> {
    const employeeNumber = req.user_information.refrence_number;
    return await this.employeeService.findByEmployee(employeeNumber);
  }

  @Get('all')
  async find(@Req() req): Promise<Employee[]> {
    return await this.employeeService.find();
  }
}
