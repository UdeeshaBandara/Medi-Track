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

  async createUser(createUserRequest: CreatePatientRequest) {

    return await this.patientRecordClient.send(
      'patient_created',
      createUserRequest
    );

  }

  async findAllPatients() {
    return await this.patientRecordClient.send(
      'patient_find_all', {}
    );
  }

  async findOnePatient(id: number) {

    return await this.patientRecordClient.send(
      'patient_find_one',
      id
    );
  }

  async updatePatient(id: string, patientDetails: any) {
    return await this.patientRecordClient.send(
      'patient_update',
      { id, ...patientDetails }
    );
  }

  async deletePatient(id: number) {
    return await this.patientRecordClient.send(
      'patient_delete',
      id,
    );
  }

  uploadFiles(fileName: string, file: Buffer) {

    this.uploadClient.send(
      'file_upload',
      new FileUploadEvent(fileName, file),
    );
  }

}
