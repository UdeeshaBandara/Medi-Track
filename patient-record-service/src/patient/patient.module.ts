import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]),
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
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule { }
