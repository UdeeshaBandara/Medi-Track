import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentSummaryPerDoctor } from './entities/appointment.summary.doctor.entity';
import { PatientAggregationService } from './appointment-records.service';
import { AppointmentRecordService } from './appointments-per-doctor.service';
import { DiseaseSummaryService } from './disease-summary.service';
import { DiseaseSummary } from './entities/disease.summary.entity';
import { AppointmentSummary } from './entities/appointment.summary.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([AppointmentSummaryPerDoctor, AppointmentSummary, DiseaseSummary]),
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'PATIENTRECORD',
        transport: Transport.TCP,
        options: {
          host: 'patient-record-blue',
          port: 4000
        }
      },
      {
        name: 'UPLOADER',
        transport: Transport.TCP,
        options: {
          host: 'file-handler-blue',
          port: 4001
        }
      },
      {
        name: 'APPOINTMENTS',
        transport: Transport.TCP,
        options: {
          host: 'appointment-scheduling-blue',
          port: 4002
        }
      },
      {
        name: 'NOTIFICATIONS',
        transport: Transport.TCP,
        options: {
          host: 'notification-service-blue',
          port: 4003
        }
      }
    ])
  ],
  controllers: [],
  providers: [PatientAggregationService, AppointmentRecordService, DiseaseSummaryService],
})
export class AppModule { }
