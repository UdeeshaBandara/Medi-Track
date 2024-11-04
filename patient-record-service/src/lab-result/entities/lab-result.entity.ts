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
export class LabResult extends AbstractEntity<LabResult> {

    @Column()
    test_name: string;

    @Column()
    result_summary: string;

    @Column()
    result_details: string;

    @Column()
    test_date: Date; 

    @ManyToOne(() => Patient, (patient) => patient.labResult)
    patient: Patient;
}
