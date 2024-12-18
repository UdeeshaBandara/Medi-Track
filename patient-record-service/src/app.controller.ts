import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePatientEvent } from './create-patient.event';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('tcp_check')
  checkTCPConnection() {

    return 'Healthy';
  }
}
