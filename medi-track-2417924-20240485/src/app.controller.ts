import {
  Controller, Get, ParseFilePipe, Post, Body, UploadedFile,
  UseInterceptors,
  Param,
  Delete,
  UseGuards,
  Patch
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePatientRequest } from './create-patient-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('patient')
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post()
  createPatient(@Body() createUserRequest: CreatePatientRequest) {
    return this.appService.createUser(createUserRequest);
  }

  @Get()
  getPatients() {
    Logger.log('getPatients', 'Patient');
    return this.appService.findAllPatients();
  }

  @Get(':id')
  getOnePatients(@Param('id') id) {

    return this.appService.findOnePatient(id);
  }

  @Patch(':id')
  updatePatients(@Param('id') id: string, @Body() patientDetails: any) {
   return this.appService.updatePatient(id, patientDetails);
  }

  @Delete(':id')
  deletePatients(@Param('id') id) {
   return this.appService.deletePatient(id);
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.appService.uploadFiles(file.originalname, file.buffer);
  }
}
