import { Injectable } from '@nestjs/common';
import { CreatePatientEvent } from './create-patient.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreatePatientEvent) {
    console.log('patient_created - COMMUNICATIONS', data);
    // TODO: Email the user...
  }
}
