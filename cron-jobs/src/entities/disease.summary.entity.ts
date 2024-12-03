import { AbstractEntity } from "src/database/abstract.entity";
import {  Column,  Entity } from 'typeorm';


@Entity()
export class DiseaseSummary extends AbstractEntity<DiseaseSummary> {

    @Column()
    date: string;

    @Column()
    doctor_id: number;
   
    @Column()
    totalAppointments: number;

    
}
