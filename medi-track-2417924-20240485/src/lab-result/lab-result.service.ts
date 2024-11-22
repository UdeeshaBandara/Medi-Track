import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateLabResultRequest } from './create-lab-result-request.dto';

@Injectable()
export class LabResultService {

  private readonly users: any[] = [];

  constructor(

    @Inject('PATIENTRECORDS') private readonly patientRecordClient: ClientProxy,
  
    // @Inject('NOTIFICATIONS') private readonly notificationClient: ClientProxy,
  ) { }



  async createLabResult(createUserRequest: CreateLabResultRequest) {

    return await this.patientRecordClient.send(
      'lab_result_created',
      createUserRequest
    );

  }

  async findAllLabResults() {
    return await this.patientRecordClient.send(
      'lab_result_find_all', {}
    );
  }

  async findOneLabResult(id: number) {

    return await this.patientRecordClient.send(
      'lab_result_find_one',
      id
    );
  }

  async updateLabResult(id: string, labResultDetails: any) {
    return await this.patientRecordClient.send(
      'lab_result_update',
      { id, ...labResultDetails }
    );
  }

  async deleteLabResult(id: number) {
    return await this.patientRecordClient.send(
      'lab_result_delete',
      id,
    );
  }
}
