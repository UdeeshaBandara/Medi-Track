import { NestFactory } from '@nestjs/core';
import { AppointmentRecordService } from './appointments-per-doctor.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aggregationService = app.get(AppointmentRecordService);
 
  await aggregationService.appointmentCountByDoctor();
 
  await app.close();
}

bootstrap();
