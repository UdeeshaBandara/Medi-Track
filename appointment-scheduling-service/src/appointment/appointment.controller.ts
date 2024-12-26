import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { MessagePattern } from '@nestjs/microservices';
import * as moment from "moment";

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @MessagePattern('appointment_created')
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create({ ...createAppointmentDto, appointment_date: moment(createAppointmentDto.appointment_date).format('YYYY-MM-DD') });
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
  // @Get('cron')
  getAppointmentCountByDoctor() {

    return this.appointmentService.getAppointmentCountByDoctor();
  }

  @MessagePattern('appointment_summary')
  // @Get('cron')
  appointmentSummary() {

    return this.appointmentService.appointmentSummary();
  }
}
