export class CreateLabResultRequest {
 
    test_name: string;

   
    result_summary: string;

 
    result_details: string;

  
    test_date: Date; 

    // @ManyToOne(() => Patient, (patient) => patient.labResult)
    // patient: Patient;
  }