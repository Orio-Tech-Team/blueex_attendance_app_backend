import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { Cities } from '../../cities/entities/cities.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { EmployeeStation } from '../../employee/entities/employee-station.entity';

@Entity('stations')
export class Station extends GenericEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  station_code: string;

  @Column({
    nullable: false,
  })
  station_name: string;

  @Column({ nullable: false })
  latitude: string;

  @Column({ nullable: false })
  longtitude: string;

  @Column({
    nullable: false,
  })
  radius: number;

  @Column({
    nullable: false,
  })
  city_code: string;

  @Column()
  erp_id: string;

  @Column()
  zone: string;

  @ManyToOne(() => Cities, (cities) => cities.station)
  @JoinColumn({ name: 'city_code', referencedColumnName: 'city_code' })
  cities: Cities;

  @OneToMany(
    () => EmployeeStation,
    (employee_station) => employee_station.station,
  )
  employee_station: EmployeeStation[];
}
