import {
  Controller, Get,  Post, Body, 

  Param,
  Delete,
} from '@nestjs/common';
import { CreateAppointmentRequest } from './create-appointment-request.dto';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  createAppointment(@Body() createUserRequest: CreateAppointmentRequest) {
    return this.appointmentService.createAppointment(createUserRequest);
  }

  @Get()
  getAppointments() {
     
    return this.appointmentService.findAllAppointments();
  }

  @Get(':id')
  getOneAppointments(@Param('id') id) {

    return this.appointmentService.findOneAppointment(id);
  }

  @Get(':id')
  updateAppointments(@Param('id') id: string, @Body() patientDetails: any) {
   return this.appointmentService.updateAppointment(id, patientDetails);
  }

  @Delete(':id')
  deleteAppointments(@Param('id') id) {
   return this.appointmentService.deleteAppointment(id);
  }

}
