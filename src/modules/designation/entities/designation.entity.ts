import { GenericEntity } from 'src/generic/generic.entity';
import { EmployeeDesignation } from 'src/modules/employee/entities/employee-designation.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('designations')
export class Designation extends GenericEntity {
  @Column({
    nullable: false,
  })
  designation: string;

  @Column({
    nullable: true,
  })
  job_description: string;

  @Column({
    nullable: false,
  })
  designation_count: number;

  @Column({
    nullable: false,
  })
  work_code: number;

  @Column({
    nullable: false,
    default: false,
  })
  app: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  web: boolean;

  @OneToMany(
    () => EmployeeDesignation,
    (employee_designation) => employee_designation.designation,
  )
  employee_designation: EmployeeDesignation[];
}
