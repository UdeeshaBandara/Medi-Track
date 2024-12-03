import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @MessagePattern('appointment_created')
  create(@Body() createPatientDto: CreateAppointmentDto) {
    return this.appointmentService.create(createPatientDto);
  }

  @MessagePattern('appointment_find_all')
  findAll() {
    return this.appointmentService.findAll();
  }

  @MessagePattern('appointment_find_one')
  async findOne(@Body() id: string) {
    return this.appointmentService.findOne(+id);

  }

  @MessagePattern('appointment_update')
  update(@Body() updatePatientDto: any) {
    return this.appointmentService.update(+updatePatientDto.id, updatePatientDto);
  }

  @MessagePattern('appointment_delete')
  remove(id: string) {
    return this.appointmentService.remove(+id);
  }

  @MessagePattern('appointment_count_by_doctor')
  getAppointmentCountByDoctor() {

    return this.appointmentService.getAppointmentCountByDoctor();
  }
}
