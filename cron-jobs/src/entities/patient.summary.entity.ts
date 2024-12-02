import { AbstractEntity } from "src/database/abstract.entity";
import {
    Column,
    Entity
  } from 'typeorm';


@Entity()
export class PatientSummary extends AbstractEntity<PatientSummary> {

    @Column()
    date: string;

    @Column()
    totalAppointments: string;

    
}
