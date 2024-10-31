import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientRequest } from './create-patient-request.dto';
import { CreatePatientEvent } from './create-patient.event';

@Injectable()
export class AppService {

  private readonly users: any[] = [];

  constructor(
    @Inject('PATIENT_RECORDS') private readonly patientRecordClient: ClientProxy,
    @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
    @Inject('NOTIFICATIONS') private readonly notificationClient: ClientProxy,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreatePatientRequest) {
    this.users.push(createUserRequest);
    this.patientRecordClient.emit(
      'patient_created',
      new CreatePatientEvent(createUserRequest.name),
    );
    this.appointmentClient.emit(
      'patient_created',
      new CreatePatientEvent(createUserRequest.name),
    );
  }

  getAnalytics() {
    return this.notificationClient.send({ cmd: 'get_analytics' }, {});
  }
}
