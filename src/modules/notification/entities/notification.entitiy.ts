import { GenericEntity } from 'src/generic/generic.entity';
import { Attendance } from 'src/modules/attendacne/entities/attendacne.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Station } from '../../station/entities/station.entity';
import { Shift } from '../../shift/entities/shift.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';

export enum NotificationType {
  CHECKIN = 'check_in',
  CHECKOUT = 'check_out',
}

@Entity('notification')
export class Notification extends GenericEntity {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @Column({
    nullable: false,
  })
  notification_time: Date;

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.CHECKIN,
  })
  type: string;

  @Column({
    nullable: false,
  })
  employee_number: number;

  @OneToMany(() => Employee, (employee) => employee.notification)
  employee: Employee[];
}
