import { NestFactory } from '@nestjs/core';
import { DiseaseSummaryService } from './disease-summary.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aggregationService = app.get(DiseaseSummaryService);
 
  await aggregationService.diseaseSummary();
 
  await app.close();
}

bootstrap();
