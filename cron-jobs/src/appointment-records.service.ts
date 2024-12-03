import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentSummary } from './entities/appointment.summary.entity';
import { EntityManager, Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PatientAggregationService {

    constructor(
        @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
        @InjectRepository(AppointmentSummary)
        private readonly patientSummaryRepository: Repository<AppointmentSummary>,
        private readonly entityManager: EntityManager
    ) { }

    async appointmentSummary() {

        const patients = await firstValueFrom(
            this.appointmentClient.send('appointment_summary', {})
        );
       
        let apppointmentSummary = [];
        const execDate = new Date().toISOString();

        patients.forEach(element => {
            apppointmentSummary.push(
                new AppointmentSummary({
                    date: execDate,
                    totalAppointments: +element.count
                })
            )
        });
      
        return this.entityManager.save(apppointmentSummary);

    }

}
