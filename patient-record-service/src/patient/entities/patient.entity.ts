import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Patient extends AbstractEntity<Patient>  {
    @Column()
    name: string;
    @Column()
    address: string;
    @Column()
    age: number;
    @Column()
    contactNumber: number;
  
  
  
  

}
