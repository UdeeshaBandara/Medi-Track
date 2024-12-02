import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientSummary } from './entities/patient.summary.entity';
import { PatientAggregationService } from './patient-data-aggregator.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([PatientSummary]),
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
  controllers: [AppController],
  providers: [AppService, PatientAggregationService],
})
export class AppModule { }
