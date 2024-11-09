import { LabResult } from "src/lab-result/entities/lab-result.entity";
import { MedicalHistory } from "src/medical-history/entities/medical-history.entity";
import { Prescription } from "src/prescription/entities/prescription.entity";

export class CreatePatientDto {
    
    name: string;
 
    address: string;
   
    age: number; 
   
    email: string;

    gender: string;
     
    date_of_birth: Date;
 
    contact_number: number;

    emergency_contact: number;

    medicalHistory: MedicalHistory[];
 
    prescription: Prescription[];

    labResult: LabResult[];
}
