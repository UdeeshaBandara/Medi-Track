import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PatientModule } from './patient/patient.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { LabResultModule } from './lab-result/lab-result.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PatientModule,
    MedicalHistoryModule,
    PrescriptionModule,
    LabResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
