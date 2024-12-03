import { AbstractEntity } from "src/database/abstract.entity";
import {  Column,  Entity } from 'typeorm';


@Entity()
export class AppointmentSummaryPerDoctor extends AbstractEntity<AppointmentSummaryPerDoctor> {

    @Column()
    date: string;

    @Column()
    doctor_id: number;
   
    @Column()
    totalAppointments: number;

    
}
