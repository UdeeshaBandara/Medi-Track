import { AbstractEntity } from "src/database/abstract.entity";
export declare class Patient extends AbstractEntity<Patient> {
    name: string;
    address: string;
    age: number;
    contactNumber: number;
}
