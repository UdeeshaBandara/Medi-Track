import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentSummaryPerDoctor } from './entities/appointment.summary.doctor.entity';
import { EntityManager, Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DiseaseSummaryService {

    constructor(
        @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
        @InjectRepository(AppointmentSummaryPerDoctor)
        private readonly patientSummaryRepository: Repository<AppointmentSummaryPerDoctor>,
        private readonly entityManager: EntityManager
    ) { }

    async diseaseSummary() {

        const patients = await firstValueFrom(
            this.appointmentClient.send('appointment_count_by_doctor', {})
        );
       
        let apppointmentSummary = [];
        const execDate = new Date().toISOString();

        patients.forEach(element => {
            apppointmentSummary.push(
                new AppointmentSummaryPerDoctor({
                    date: execDate,
                    doctor_id: +element.doctor_id,
                    totalAppointments: +element.count
                })
            )
        });
      
        return this.entityManager.save(apppointmentSummary);

    }

}
