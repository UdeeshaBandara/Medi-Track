import { AbstractEntity } from "src/database/abstract.entity";
import { Patient } from "src/patient/entities/patient.entity";
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
export class MedicalHistory extends AbstractEntity<MedicalHistory>  {

    @Column()
    name: string;

    @Column()
    condition: string;
 
    @Column()
    treatment: string;

    @Column()
    date_diagnosed: Date;
 
    @Column()
    emergency_contact: number;
 
    @ManyToOne(() => Patient, (patient) => patient.medicalHistory)
    patient: Patient;

}
