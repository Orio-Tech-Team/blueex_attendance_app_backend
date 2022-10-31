import { GenericEntity } from 'src/generic/generic.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Shift } from 'src/modules/shift/entities/shift.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('attendance')
export class Attendance extends GenericEntity {
  @Column({
    nullable: false,
  })
  employee_number: number;

  @Column('time', {
    nullable: false,
  })
  intime: Date;

  @Column('time', {
    nullable: true,
  })
  outtime: Date;

  @Column({
    nullable: false,
    type: 'date',
  })
  attendance_date: string;

  @Column({
    nullable: false,
  })
  type: string;

  @ManyToOne(() => Employee, (employee) => employee.attendance)
  @JoinColumn({
    name: 'employee_number',
    referencedColumnName: 'employee_number',
  })
  employee: Employee;
}
