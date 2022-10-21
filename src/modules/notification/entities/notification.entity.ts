import { GenericEntity } from 'src/generic/generic.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Employee } from 'src/modules/employee/entities/employee.entity';

export enum NotificationType {
  CHECKIN = 'check_in',
  CHECKOUT = 'check_out',
}

@Entity('notification')
export class Notification extends GenericEntity {
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

  @ManyToOne(() => Employee, (employee) => employee.notification)
  @JoinColumn({
    name: 'employee_number',
    referencedColumnName: 'employee_number',
  })
  employee: Employee;
}
