import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientSummary } from './entities/patient.summary.entity';
import { EntityManager, Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PatientAggregationService {

    constructor(
        @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
        @InjectRepository(PatientSummary)
        private readonly patientSummaryRepository: Repository<PatientSummary>,
        private readonly entityManager: EntityManager
    ) { }

    async aggregateData() {

        const patients = await firstValueFrom(
            this.appointmentClient.send('appointment_count_by_doctor', {})
        );
       
        const patientCount = Array.isArray(patients) ? patients.length : 0;

        const user = new PatientSummary({
            date: new Date().toISOString(),
            totalAppointments: patientCount.toString()
        });
        return this.entityManager.save(user);

    }

}
