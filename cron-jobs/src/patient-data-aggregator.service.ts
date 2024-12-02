import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientSummary } from './entities/patient.summary.entity';
import { EntityManager, Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PatientAggregationService {

    constructor(
        @Inject('PATIENTRECORD') private readonly patientRecordClient: ClientProxy,
        @InjectRepository(PatientSummary)
        private readonly patientSummaryRepository: Repository<PatientSummary>,
        private readonly entityManager: EntityManager
    ) { }

    async aggregateData() {

        const patients = await firstValueFrom(
            this.patientRecordClient.send('patient_find_all', {})
        );

        const patientCount = Array.isArray(patients) ? patients.length : 0;

        const user = new PatientSummary({
            date: new Date().toISOString(),
            totalAppointments: patientCount.toString()
        });
        return this.entityManager.save(user);

    }

}
