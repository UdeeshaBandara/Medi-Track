import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateDoctorRequest } from './create-doctor-request.dto';


@Injectable()
export class DoctorService {

  constructor(
    @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
  ) { }

  async createDoctor(createUserRequest: CreateDoctorRequest) {

    return await this.appointmentClient.send(
      'doctor_create',
      createUserRequest
    );

  }

  async findAllDoctors() {
    return await this.appointmentClient.send(
      'doctor_find_all', {}
    );
  }

  async findOneDoctor(id: number) {

    return await this.appointmentClient.send(
      'doctor_find_one',
      id
    );
  }

  async updateDoctor(id: string, appointmentDetails: any) {
    return await this.appointmentClient.send(
      'doctor_update',
      { id, ...appointmentDetails }
    );
  }

  async deleteDoctor(id: number) {
    return await this.appointmentClient.send(
      'doctor_delete',
      id,
    );
  }

}
