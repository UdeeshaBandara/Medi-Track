import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientRequest } from './create-patient-request.dto';
import { CreatePatientEvent } from './create-patient.event';
import { FileUploadEvent } from './file-upload.event';

@Injectable()
export class AppService {

  private readonly users: any[] = [];

  constructor(
    @Inject('PATIENTRECORDS') private readonly patientRecordClient: ClientProxy,
    @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
    @Inject('UPLOADER') private readonly uploadClient: ClientProxy,
    // @Inject('NOTIFICATIONS') private readonly notificationClient: ClientProxy,
  ) { }

  getHello(): string {
    return 'Hello Triggered!';
  }

  createUser(createUserRequest: CreatePatientRequest) {
    console.log('createUser :', createUserRequest);
    this.users.push(createUserRequest);
    
    this.patientRecordClient.emit(
      'patient_created',
      new CreatePatientEvent(createUserRequest.name),
    );
    console.log('users :', this.users);
    // this.appointmentClient.emit(
    //   'patient_created',
    //   new CreatePatientEvent(createUserRequest.name),
    // );
  }
  
  uploadFiles(fileName: string, file: Buffer) {
  console.log('file :', file);
 
    this.uploadClient.emit(
      'file_upload',
      new FileUploadEvent(fileName,file),
    );
  }

  getAnalytics() {

    console.log('getAnalytics :', );
    this.patientRecordClient.emit(
      'patient_created',
      new CreatePatientEvent('sas'),
    );
    // return this.notificationClient.send({ cmd: 'get_analytics' }, {});
  }
}
