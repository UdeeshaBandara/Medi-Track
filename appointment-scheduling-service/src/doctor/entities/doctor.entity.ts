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
export class Doctor extends AbstractEntity<Doctor>  {

    @Column()
    name: string;
 
    @Column()
    email: string;
    
    @Column()
    specialization: string;

    @Column()
    availability: Date;
 
    @Column()
    phone_number: number;
 
    @ManyToOne(() => Patient, (patient) => patient.medicalHistory)
    patient: Patient;

}

