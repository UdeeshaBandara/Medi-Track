import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentService } from './appointment/appointment.service';
import { LabResultService } from './lab-result/lab-result.service';
import { LabResultController } from './lab-result/lab-result.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PATIENTRECORDS',
        transport: Transport.TCP,
        options:{
          port:4000
        }
      },
      {
        name: 'UPLOADER',
        transport: Transport.TCP,
        options:{
          port:4001
        }
      },
      {
        name: 'APPOINTMENTS',
        transport: Transport.TCP,
        options:{
          port:4002
        }
      }
    ]),
  ],
  controllers: [AppController,AppointmentController, LabResultController],
  providers: [AppService,AppointmentService, LabResultService],
})
export class AppModule {}