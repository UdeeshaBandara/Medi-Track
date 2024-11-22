import {
  Controller, Get, ParseFilePipe, Post, Body, UploadedFile,
  UseInterceptors,
  Param,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePatientRequest } from './create-patient-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('patient')
  createPatient(@Body() createUserRequest: CreatePatientRequest) {
    return this.appService.createUser(createUserRequest);
  }

  @Get('patient')
  getPatients() {
     
    return this.appService.findAllPatients();
  }

  @Get('patient/:id')
  getOnePatients(@Param('id') id) {

    return this.appService.findOnePatient(id);
  }

  @Get('patient/:id')
  updatePatients(@Param('id') id: string, @Body() patientDetails: any) {
   return this.appService.updatePatient(id, patientDetails);
  }

  @Delete('patient/:id')
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
    await this.appService.uploadFiles(file.originalname, file.buffer);
  }
}
