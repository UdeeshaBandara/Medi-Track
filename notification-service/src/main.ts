import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], 
  });
  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
  // Logger.log('Application is running on: updated host name', 'Bootstrap');
}
bootstrap();