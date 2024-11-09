import {
  Controller, Get, ParseFilePipe, Post, Body, UploadedFile,
  UseInterceptors,
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
  createUser(@Body() createUserRequest: CreatePatientRequest) {
    console.log('createUserRequest :', createUserRequest);
    this.appService.createUser(createUserRequest);
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
