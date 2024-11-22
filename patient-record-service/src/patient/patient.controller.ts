import { Controller, Body } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @EventPattern('patient_created')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @EventPattern('patient_find_all')
  findAll() {
    return this.patientService.findAll();
  }

  @EventPattern('patient_find_one')
  async findOne(@Body() id: string) {
    return this.patientService.findOne(+id);
    
  }

  @EventPattern('patient_update')
  update(  @Body() updatePatientDto: any) {
    return this.patientService.update(+updatePatientDto.id, updatePatientDto);
  }

  @EventPattern('patient_delete')
  remove(id: string) {
    return this.patientService.remove(+id);
  }
}
