import { Patient } from "src/patient/entities/patient.entity";

export class CreateMedicalHistoryDto {

 
    name: string;

   
    condition: string;
 
     
    treatment: string;

    
    date_diagnosed: Date;
 
 
    emergency_contact: number;
 
 
    patient: Patient;
}
