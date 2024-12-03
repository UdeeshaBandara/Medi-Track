import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity } from 'typeorm';

@Entity({ schema: 'medi-track-appointment-service' })
export class Doctor extends AbstractEntity<Doctor> {

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

}

