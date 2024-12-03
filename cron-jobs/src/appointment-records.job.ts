import { NestFactory } from '@nestjs/core';
import { PatientAggregationService } from './appointment-records.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aggregationService = app.get(PatientAggregationService);
 
  await aggregationService.appointmentSummary();
 
  await app.close();
}

bootstrap();
