import { AbstractEntity } from "src/database/abstract.entity";
import { Column,  Entity } from 'typeorm';


@Entity()
export class AppointmentSummary extends AbstractEntity<AppointmentSummary> {

    @Column()
    date: string;
   
    @Column()
    totalAppointments: number;

    
}
