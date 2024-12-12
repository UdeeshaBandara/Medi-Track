import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RedshiftService } from './redshift.service';

@Injectable()
export class PatientAggregationService {

    constructor(
        @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
        private readonly redshiftService: RedshiftService
    ) { }

    async appointmentSummary() {

        const patients = await firstValueFrom(
            this.appointmentClient.send('appointment_summary', {})
        );
       
        let apppointmentSummaryPromises = [];
        const execDate = new Date().toISOString();

        patients.forEach(element => {
            apppointmentSummaryPromises.push(this.redshiftService.insertData('appointment_summary', {
                date: execDate,
                totalAppointments: +element.count
            }));
        
        });
     
    
        await Promise.all(apppointmentSummaryPromises);
      

    }

}
