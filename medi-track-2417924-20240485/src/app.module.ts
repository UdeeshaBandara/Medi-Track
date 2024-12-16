import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentService } from './appointment/appointment.service';
import { LabResultService } from './lab-result/lab-result.service';
import { LabResultController } from './lab-result/lab-result.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { HealthCheckController } from './health-check/health.check.controller';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
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
  controllers: [AppController, AppointmentController, LabResultController, NotificationController, DoctorController, HealthCheckController],
  providers: [AppService, AppointmentService, LabResultService, NotificationService, DoctorService],
})
export class AppModule { }