import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        host: '0.0.0.0',
        port: 4000
      },
      logger: ['log', 'error', 'warn', 'debug', 'verbose'], 
    },
  );
   app.listen();
   Logger.log('Patient record is  host: 0.0.0.0 on: 4000', 'Bootstrap');
}
bootstrap();
