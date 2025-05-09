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
        port: 4001
      }
    },
  );
   app.listen();
   Logger.log('Uploader service is  host: 0.0.0.0 on: 4001', 'Bootstrap');
}
bootstrap();