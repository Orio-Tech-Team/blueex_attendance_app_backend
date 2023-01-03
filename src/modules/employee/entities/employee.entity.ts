import { GenericEntity } from 'src/generic/generic.entity';
import { Attendance } from 'src/modules/attendacne/entities/attendacne.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Station } from '../../station/entities/station.entity';
import { EmployeeStation } from './employee-station.entity';
import { Shift } from '../../shift/entities/shift.entity';
import { Notification } from 'src/modules/notification/entities/notification.entity';
import { EmployeeDepartment } from './employee-department.entity';
import { EmployeeDesignation } from './employee-designation.entity';

@Entity('employees')
export class Employee extends GenericEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  employee_number: number;

  @Column({
    nullable: false,
  })
  employee_name: string;

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  attendance: Attendance[];

  @OneToMany(
    () => EmployeeStation,
    (employee_station) => employee_station.employee,
  )
  employee_station: EmployeeStation[];

  @OneToMany(
    () => EmployeeDepartment,
    (employee_department) => employee_department.employee,
  )
  employee_department: EmployeeDepartment[];

  @OneToMany(
    () => EmployeeDesignation,
    (employee_designation) => employee_designation.employee,
  )
  employee_designation: EmployeeDesignation[];

  @ManyToOne(() => Shift, (shift) => shift.employee)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @OneToMany(() => Notification, (notification) => notification.employee)
  notification: Notification[];
}
