import { Controller, Body } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { MessagePattern } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

@Controller()
export class PatientController {
  constructor(
    private readonly patientService: PatientService
    ) {}

  @MessagePattern('patient_created')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @MessagePattern('patient_find_all')
  async findAll() {
    Logger.log('PatientController', 'appointment_find_all ');
   
    return await this.patientService.findAll();
  }

  @MessagePattern('patient_find_one')
  async findOne(@Body() id: string) {
    return this.patientService.findOne(+id);
    
  }

  @MessagePattern('patient_update')
  update(  @Body() updatePatientDto: any) {
    return this.patientService.update(+updatePatientDto.id, updatePatientDto);
  }

  @MessagePattern('patient_delete')
  remove(id: string) {
    return this.patientService.remove(+id);
  }
}
