import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]),
  ClientsModule.register([
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
  ])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule { }
