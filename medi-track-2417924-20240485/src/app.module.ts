import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}