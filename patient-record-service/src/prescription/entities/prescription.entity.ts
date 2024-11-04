import { AbstractEntity } from "src/database/abstract.entity";
import { MedicalHistory } from "src/medical-history/entities/medical-history.entity";
import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { Patient } from "src/patient/entities/patient.entity";


@Entity()
export class Prescription extends AbstractEntity<Prescription> {

    @Column()
    medication_name: string;

    @Column()
    dosage: string;

    @Column()
    frequency: string;

    @Column()
    start_date: Date;
    
    @Column()
    end_date: Date;

    @ManyToOne(() => Patient, (patient) => patient.prescription)
    patient: Patient;
}
