import {
  Controller, Get,  Post, Body, 
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDoctorRequest } from './create-doctor-request.dto';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('doctor')
export class DoctorController {
  
  constructor(private readonly doctorService: DoctorService) { }

  @Post()
  createDoctor(@Body() createUserRequest: CreateDoctorRequest) {
    return this.doctorService.createDoctor(createUserRequest);
  }

  @Get()
  getDoctors() {
     
    return this.doctorService.findAllDoctors();
  }

  @Get(':id')
  getOneDoctors(@Param('id') id) {

    return this.doctorService.findOneDoctor(id);
  }

  @Get(':id')
  updateDoctors(@Param('id') id: string, @Body() patientDetails: any) {
   return this.doctorService.updateDoctor(id, patientDetails);
  }

  @Delete(':id')
  deleteDoctors(@Param('id') id) {
   return this.doctorService.deleteDoctor(id);
  }

}
