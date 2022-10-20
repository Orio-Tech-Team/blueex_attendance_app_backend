import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {ApiProperty} from "@nestjs/swagger"
import { classToPlain, Exclude } from "class-transformer";

export class GenericEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column({nullable: false , default: true , select : false})
    status : boolean

    @Exclude({ toPlainOnly: true })
    @Column({nullable: false , default : false , select:false})
    is_deleted : boolean

    @ApiProperty()
    @CreateDateColumn()
    created_at : Date

    @ApiProperty()
    @UpdateDateColumn()
    updated_at : Date

    toJSON() {
        return classToPlain(this);
    }
}