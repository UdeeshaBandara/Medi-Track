import { AbstractEntity } from "src/database/abstract.entity";
import {
    Column,
    Entity
  } from 'typeorm';

@Entity({ schema: 'medi-track-appointment-service' })
export class Appointment extends AbstractEntity<Appointment>  {
 
    @Column()
    reason_for_visit: string;

    @Column()
    appointment_date: string;

    @Column()
    start_time: Date;

    @Column()
    end_time: Date;
 
    @Column()
    status: number;
 
    @Column()
    patient_id: number;
 
    @Column()
    doctor_id: number;

}
