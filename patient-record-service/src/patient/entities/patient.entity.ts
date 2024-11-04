import { AbstractEntity } from "src/database/abstract.entity";
import { LabResult } from "src/lab-result/entities/lab-result.entity";
import { MedicalHistory } from "src/medical-history/entities/medical-history.entity";
import { Prescription } from "src/prescription/entities/prescription.entity";
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    ManyToOne
  } from 'typeorm';


@Entity()
export class Patient extends AbstractEntity<Patient> {

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    gender: string;

    @Column()
    date_of_birth: Date;

    @Column()
    contact_number: number;

    @Column()
    emergency_contact: number;

    @OneToMany(() => MedicalHistory, (patient) => patient.patient)
    medicalHistory: MedicalHistory[];

    @OneToMany(() => Prescription, (patient) => patient.patient)
    prescription: Prescription[];

    @OneToMany(() => LabResult, (patient) => patient.patient)
    labResult: LabResult[];
}
