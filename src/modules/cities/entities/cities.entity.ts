import { GenericEntity } from 'src/generic/generic.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Station } from '../../station/entities/station.entity';

@Entity("cities")
export class Cities extends GenericEntity{
    
    @Column({
        nullable : false,
        unique : true,
        length : 3
    })
    city_code : string

    @Column({
        nullable : false
    })
    city_name : string

    @OneToMany(()=>Station , (station) => station.cities)
    station : Station[]
}