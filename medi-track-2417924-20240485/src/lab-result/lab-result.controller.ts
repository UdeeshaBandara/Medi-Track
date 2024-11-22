import {
  Controller, Get, Post, Body,
  Param,
  Delete,
} from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { CreateLabResultRequest } from './create-lab-result-request.dto';

@Controller('lab-result')
export class LabResultController {
  constructor(private readonly labResultService: LabResultService) { }

  @Post()
  createLabResult(@Body() createUserRequest: CreateLabResultRequest) {
    return this.labResultService.createLabResult(createUserRequest);
  }

  @Get()
  getLabResults() {
     
    return this.labResultService.findAllLabResults();
  }

  @Get(':id')
  getOneLabResults(@Param('id') id) {

    return this.labResultService.findOneLabResult(id);
  }

  @Get(':id')
  updateLabResults(@Param('id') id: string, @Body() patientDetails: any) {
   return this.labResultService.updateLabResult(id, patientDetails);
  }

  @Delete(':id')
  deleteLabResults(@Param('id') id) {
   return this.labResultService.deleteLabResult(id);
  }
}
