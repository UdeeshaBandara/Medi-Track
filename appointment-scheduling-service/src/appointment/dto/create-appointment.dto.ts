export class CreateAppointmentDto {
    
    reason_for_visit: string;

    appointment_date: string;
  
    start_time: Date;

    end_time: Date;

    status: number;

    patient_id: number;
 
    doctor_id: number;
}
