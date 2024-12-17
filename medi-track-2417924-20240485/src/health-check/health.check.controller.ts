import {
  Controller, Get, ParseFilePipe, Post, Body, UploadedFile,
  UseInterceptors,
  Param,
  Delete,
  UseGuards,
  Patch
} from '@nestjs/common'; 
import { ConfigService } from '@nestjs/config';

@Controller()
export class HealthCheckController { 

 
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHealth() {
    
    const patientHost = this.configService.get<string>('PATIENT_RECORD_HOST');
 
    return { message: 'Health check route', config: patientHost };
  }

}
