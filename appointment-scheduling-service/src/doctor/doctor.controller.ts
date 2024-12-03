import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @MessagePattern('doctor_create')
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @MessagePattern('doctor_find_all')
  findAll() {
    return this.doctorService.findAll();
  }

  @MessagePattern('doctor_find_one')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @MessagePattern('doctor_update')
  update(@Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(updateDoctorDto.id, updateDoctorDto);
  }

  @MessagePattern('doctor_delete')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
