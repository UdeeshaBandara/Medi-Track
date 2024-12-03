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
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
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
  controllers: [AppController, AppointmentController, LabResultController, NotificationController,DoctorController],
  providers: [AppService, AppointmentService, LabResultService, NotificationService, DoctorService],
})
export class AppModule { }