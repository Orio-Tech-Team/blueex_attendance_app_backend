import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { Employee } from './employee.entity';
import { Departments } from 'src/modules/departments/entities/department.entity';

@Entity('employee_department')
export class EmployeeDepartment extends GenericEntity {
  @Column({ nullable: false })
  employee_number: number;

  @Column({ nullable: false })
  department_code: string;

  @ManyToOne(() => Employee, (employee) => employee.employee_department)
  @JoinColumn({
    name: 'employee_number',
    referencedColumnName: 'employee_number',
  })
  employee: Employee;

  @ManyToOne(
    () => Departments,
    (departments) => departments.employee_department,
  )
  @JoinColumn({
    name: 'department_code',
    referencedColumnName: 'id',
  })
  department: Departments;
}
