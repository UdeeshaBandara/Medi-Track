import { NestFactory } from '@nestjs/core';

import { PatientAggregationService } from './patient-data-aggregator.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aggregationService = app.get(PatientAggregationService);

  console.log('Starting data aggregation job...');
  await aggregationService.aggregateData();

  console.log('Job completed.');
  await app.close();
}

bootstrap();
