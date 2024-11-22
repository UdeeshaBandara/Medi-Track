import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @EventPattern('appointment_created')
  create(@Body() createPatientDto: CreateAppointmentDto) {
    return this.appointmentService.create(createPatientDto);
  }

  @EventPattern('appointment_find_all')
  findAll() {
    return this.appointmentService.findAll();
  }

  @EventPattern('appointment_find_one')
  async findOne(@Body() id: string) {
    return this.appointmentService.findOne(+id);

  }

  @EventPattern('appointment_update')
  update(@Body() updatePatientDto: any) {
    return this.appointmentService.update(+updatePatientDto.id, updatePatientDto);
  }

  @EventPattern('appointment_delete')
  remove(id: string) {
    return this.appointmentService.remove(+id);
  }
}
