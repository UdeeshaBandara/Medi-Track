import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { CreateLabResultDto } from './dto/create-lab-result.dto';
import { UpdateLabResultDto } from './dto/update-lab-result.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('lab-result')
export class LabResultController {
  constructor(private readonly labResultService: LabResultService) {}

  @MessagePattern('lab_result_created')
  create(@Body() createPatientDto: any) {
    return this.labResultService.create(createPatientDto);
  }

  @MessagePattern('lab_result_find_all')
  findAll() {
    return this.labResultService.findAll();
  }

  @MessagePattern('lab_result_find_one')
  async findOne(@Body() id: string) {
    return this.labResultService.findOne(+id);
    
  }

  @MessagePattern('lab_result_update')
  update(  @Body() updatePatientDto: any) {
    return this.labResultService.update(+updatePatientDto.id, updatePatientDto);
  }

  @MessagePattern('lab_result_delete')
  remove(id: string) {
    return this.labResultService.remove(+id);
  }
}
