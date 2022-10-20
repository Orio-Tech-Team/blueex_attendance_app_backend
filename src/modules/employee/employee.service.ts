import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataNotFoundException } from 'src/Helper/Exception/data-not-found.exception';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findByEmployee(employeeNumber: number) {
    return await this.employeeRepository.find({
      where: {
        employee_number: employeeNumber,
      },
      relations: ['employee_station', 'employee_station.station'],
    });
  }

  async findByShift(employeeNumber: number): Promise<Employee> {
    return this.employeeRepository
      .findOneOrFail({
        relations: ['shift'],
        where: {
          employee_number: employeeNumber,
        },
      })
      .catch((error) => {
        throw DataNotFoundException.exception('Invalid Employee');
      });
  }

  async find(): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: {
        is_deleted: false,
      },
    });
  }
}
