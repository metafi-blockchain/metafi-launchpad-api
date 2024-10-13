import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {BaseEntity} from '../commons/base.entity'
//@Exclude() //hide property when get info
@Entity()
export class ActivityLog extends BaseEntity{

   
    
    @Column()
    methods: string
    
    @Column()
    account: string

    @Column()
    ipAddress: string

    @Column()
    path: string

    @Column()
    data: string;

}

