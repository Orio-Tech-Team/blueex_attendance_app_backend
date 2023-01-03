import { GenericEntity } from 'src/generic/generic.entity';
import { EmployeeDepartment } from 'src/modules/employee/entities/employee-department.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('departments')
export class Departments extends GenericEntity {
  @Column({
    nullable: false,
  })
  department_name: string;

  @Column({
    nullable: false,
  })
  mref: string;

  @Column({
    nullable: false,
  })
  hod: string;

  @OneToMany(
    () => EmployeeDepartment,
    (employee_department) => employee_department.department,
  )
  employee_department: EmployeeDepartment[];
}
