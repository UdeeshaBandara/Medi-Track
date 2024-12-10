import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientRequest } from './create-patient-request.dto';
import { FileUploadEvent } from './file-upload.event';
import { Logger } from '@nestjs/common';
@Injectable()
export class AppService {

  private readonly users: any[] = [];

  constructor(
    @Inject('PATIENTRECORD') private readonly patientRecordClient: ClientProxy,
    @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
    @Inject('UPLOADER') private readonly uploadClient: ClientProxy,
    // @Inject('NOTIFICATIONS') private readonly notificationClient: ClientProxy,
  ) { }

  async createUser(createUserRequest: CreatePatientRequest) {

    return await this.patientRecordClient.send(
      'patient_created',
      createUserRequest
    );

  }

  async findAllPatients() {
    Logger.log('findAllPatients', 'Patient');
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


  async uploadFiles(fileName: string, file: Buffer) {
    return await this.uploadClient.send(
      'file_upload',
      new FileUploadEvent(fileName, file)
    );
  }
 

}
