import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { DataNotFoundException } from 'src/Helper/Exception/data-not-found.exception';
import { Connection, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

interface CreateEmployeeType {
  emp_id: number;
  emp_name: string;
  emp_cnic: string;
  emp_date_joining: string;
  emp_date_leaving: string;
  dempartment: string;
  email: string;
  contact: string;
  location: string;
  shift: number;
  desgno: string;
  status: 'YES' | 'NO';
}

@Injectable()
export class EmployeeService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(empData: CreateEmployeeType) {
    //
    await this.connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    //employee creation
    await this.connection.query(
      `INSERT INTO employees (employee_number, employee_name,shift_id, status) VALUES (${
        empData.emp_id
      }, '${empData.emp_name}', ${empData.shift}, ${empData.status == 'YES'})`,
    );
    // designation
    await this.connection.query(
      `INSERT INTO employee_designation (employee_number, designation_code) VALUES ('${empData.emp_id}', '${empData.desgno}')`,
    );
    //department
    await this.connection.query(
      `INSERT INTO employee_department (employee_number, department_code) VALUES ('${empData.emp_id}', '${empData.dempartment}')`,
    );
    //station
    await this.connection.query(
      `INSERT INTO employee_stations (employee_number, station_code) VALUES ('${empData.emp_id}', '${empData.location}')`,
    );

    await this.connection.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async updateEmployee(empData: CreateEmployeeType) {
    //
    await this.connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    //employee creation
    await this.connection.query(
      `UPDATE employees SET employee_name = '${empData.emp_name}', shift_id = ${
        empData.shift
      }, status = ${empData.status == 'YES'} WHERE employee_number = ${
        empData.emp_id
      }`,
    );
    // designation
    await this.connection.query(
      `UPDATE employee_designation SET designation_code = '${empData.desgno}' WHERE employee_number = ${empData.emp_id};`,
    );
    //department
    await this.connection.query(
      `UPDATE employee_department SET department_code = '${empData.dempartment}' WHERE employee_number = ${empData.emp_id};`,
    );
    //station
    await this.connection.query(
      `UPDATE employee_stations SET station_code = '${empData.location}' WHERE employee_number = ${empData.emp_id};`,
    );

    await this.connection.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

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
  async findByEmployeeNumber(id: number): Promise<Employee> {
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
