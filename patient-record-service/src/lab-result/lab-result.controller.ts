import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { CreateLabResultDto } from './dto/create-lab-result.dto';
import { UpdateLabResultDto } from './dto/update-lab-result.dto';

@Controller('lab-result')
export class LabResultController {
  constructor(private readonly labResultService: LabResultService) {}

  @Post()
  create(@Body() createLabResultDto: CreateLabResultDto) {
    return this.labResultService.create(createLabResultDto);
  }

  @Get()
  findAll() {
    return this.labResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labResultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabResultDto: UpdateLabResultDto) {
    return this.labResultService.update(+id, updateLabResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labResultService.remove(+id);
  }
}
