import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PatientModule } from './patient/patient.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { LabResultModule } from './lab-result/lab-result.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PatientModule,
    MedicalHistoryModule,
    PrescriptionModule,
    LabResultModule,
    ClientsModule.registerAsync([
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
