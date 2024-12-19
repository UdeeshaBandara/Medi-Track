import {
  Controller, Get, ParseFilePipe, Post, Body, UploadedFile,
  UseInterceptors,
  Param,
  Delete,
  UseGuards,
  Patch
} from '@nestjs/common'; 
import { ConfigService } from '@nestjs/config';
import { AppService } from 'src/app.service';

@Controller()
export class HealthCheckController { 

 
  constructor(private readonly configService: ConfigService,private readonly appService: AppService) {}


  @Get()
  getHealth() {
    
    const patientHost = this.configService.get<string>('PATIENT_RECORD_HOST');
 
    return { message: 'Health check endpoint', config: patientHost };
  }


  checkTCPConnection() {
 
    return this.appService.checkTCPConnection();
  }

}
