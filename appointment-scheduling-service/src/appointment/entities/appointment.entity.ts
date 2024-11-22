import { AbstractEntity } from "src/database/abstract.entity";
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    ManyToOne
  } from 'typeorm';

@Entity()
export class Appointment extends AbstractEntity<Appointment>  {
 
    @Column()
    reason_for_visit: string;

    @Column()
    appointment_date: Date;

    @Column()
    start_time: Date;

    @Column()
    end_time: Date;
 
    @Column()
    status: number;
 
    // @ManyToOne(() => Patient, (patient) => patient.medicalHistory)
    // patient: Patient;

}
