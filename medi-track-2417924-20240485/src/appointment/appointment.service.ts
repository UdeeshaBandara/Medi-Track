import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAppointmentRequest } from './create-appointment-request.dto';


@Injectable()
export class AppointmentService {



  constructor(
    @Inject('APPOINTMENTS') private readonly appointmentClient: ClientProxy,
    // @Inject('NOTIFICATIONS') private readonly notificationClient: ClientProxy,
  ) { }

  async createAppointment(createUserRequest: CreateAppointmentRequest) {

    return await this.appointmentClient.send(
      'appointment_created',
      createUserRequest
    );

  }

  async findAllAppointments() {
    return await this.appointmentClient.send(
      'appointment_find_all', {}
    );
  }

  async findOneAppointment(id: number) {

    return await this.appointmentClient.send(
      'appointment_find_one',
      id
    );
  }

  async updateAppointment(id: string, appointmentDetails: any) {
    return await this.appointmentClient.send(
      'appointment_update',
      { id, ...appointmentDetails }
    );
  }

  async deleteAppointment(id: number) {
    return await this.appointmentClient.send(
      'appointment_delete',
      id,
    );
  }

}
