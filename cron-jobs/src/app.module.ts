import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PatientAggregationService } from './appointment-records.service';
import { AppointmentRecordService } from './appointments-per-doctor.service';
import { DiseaseSummaryService } from './disease-summary.service';
import { RedshiftModule } from './redshift.module';
import { RedshiftService } from './redshift.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedshiftModule,
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
  providers: [PatientAggregationService, AppointmentRecordService, DiseaseSummaryService, RedshiftService],
})
export class AppModule { }
