import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ClientsModule.registerAsync([
      {
        name: 'PATIENTRECORD',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('PATIENT_RECORD_HOST', 'patient-record-blue'),
            port: 4000
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'UPLOADER',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('UPLOADER_HOST', 'file-handler-blue'),
            port: 4001
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'APPOINTMENTS',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('APPOINTMENTS_HOST', 'appointment-scheduling-blue'),
            port: 4002
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'NOTIFICATIONS',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('NOTIFICATIONS_HOST', 'notification-service-blue'),
            port: 4003
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [],
  providers: [PatientAggregationService, AppointmentRecordService, DiseaseSummaryService, RedshiftService],
})
export class AppModule { }
