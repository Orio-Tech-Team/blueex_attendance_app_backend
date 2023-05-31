import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { DataNotFoundException } from 'src/Helper/Exception/data-not-found.exception';
import { Connection, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findByEmployee(employeeNumber: number) {
    // return await this.connection
    //   .query(`SELECT e.employee_number, e.employee_name, s.*
    // FROM employees e
    // JOIN employee_stations es ON e.employee_number = es.employee_number
    // JOIN stations s ON es.station_code = s.station_code WHERE e.employee_number='${employeeNumber}' ORDER BY s.id DESC;`);
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
  async findByEmployeeNumber(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { employee_number: id },
    });
  }
  async find(): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: {
        is_deleted: false,
      },
    });
  }
  //
}
