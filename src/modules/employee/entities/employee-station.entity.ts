import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { Employee } from './employee.entity';
import { Station } from 'src/modules/station/entities/station.entity';

@Entity('employee_stations')
export class EmployeeStation extends GenericEntity {
  @Column({ nullable: false })
  employee_number: number;

  @Column({ nullable: false })
  station_code: string;

  @ManyToOne(() => Employee, (employee) => employee.employee_station)
  @JoinColumn({
    name: 'employee_number',
    referencedColumnName: 'employee_number',
  })
  employee: Employee;

  @ManyToOne(() => Station, (station) => station.employee_station)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'station_code' })
  station: Station;
}
