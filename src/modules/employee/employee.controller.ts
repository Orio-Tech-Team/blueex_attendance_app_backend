import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'src/Helper/common/response.common';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiBearerAuth('JWT-auth')
  @Get('app')
  async findByEmployeeApp(@Req() req): Promise<any> {
    try {
      const employeeNumber = req.user_information.refrence_number;
      const data = await this.employeeService.findByEmployee(employeeNumber);
      return Response.get(200, 'Success', data);
    } catch (err) {
      return Response.get(500, err.message, []);
    }
  }

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
