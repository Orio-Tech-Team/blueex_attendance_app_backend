import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { Employee } from './employee.entity';
import { Designation } from 'src/modules/designation/entities/designation.entity';

@Entity('employee_designation')
export class EmployeeDesignation extends GenericEntity {
  @Column({ nullable: false })
  employee_number: number;

  @Column({ nullable: false })
  designation_code: string;

  @ManyToOne(() => Employee, (employee) => employee.employee_designation)
  @JoinColumn({
    name: 'employee_number',
    referencedColumnName: 'employee_number',
  })
  employee: Employee;

  @ManyToOne(
    () => Designation,
    (designation) => designation.employee_designation,
  )
  @JoinColumn({
    name: 'designation_code',
    referencedColumnName: 'id',
  })
  designation: Designation;
}
