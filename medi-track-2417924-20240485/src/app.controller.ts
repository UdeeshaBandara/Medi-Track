import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePatientRequest } from './create-patient-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() createUserRequest: CreatePatientRequest) {
    this.appService.createUser(createUserRequest);
  }

  @Get('analytics')
  getAnalytics() {
    return this.appService.getAnalytics();
  }
}
