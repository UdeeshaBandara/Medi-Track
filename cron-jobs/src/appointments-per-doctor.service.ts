import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RedshiftService } from './redshift.service';

@Injectable()
export class AppointmentRecordService {

    constructor(
        @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
        private readonly redshiftService: RedshiftService
    ) { }

    async appointmentCountByDoctor() {

        const patients = await firstValueFrom(
            this.appointmentClient.send('appointment_count_by_doctor', {})
        );
       
        let apppointmentSummaryPromises = [];
        const execDate = new Date().toISOString();

        patients.forEach(element => {
            apppointmentSummaryPromises.push(
                this.redshiftService.insertData('appointment_summary_per_doctor', {
                    date: execDate,
                    doctor_id: +element.doctor_id,
                    total_appointments: +element.count,
                    doctor_name: element.doctor_name
                })
            )
        });
        await Promise.all(apppointmentSummaryPromises);
      

    }

}
