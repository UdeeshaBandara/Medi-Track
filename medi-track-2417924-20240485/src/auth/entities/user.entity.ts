import { AbstractEntity } from "../../../src/database/abstract.entity";
import {
    Column,
    Entity
  } from 'typeorm';


@Entity()
export class User extends AbstractEntity<User> {

    @Column()
    name: string;

    @Column()
    password: string;

    
}
