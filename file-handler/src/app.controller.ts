import { AppService } from './app.service';
import {
  Body,
  Controller,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileUploadDto } from './dto/file-upload.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('file_upload')
  async uploadFile(@Body() fileDetails: FileUploadDto) {
    return await this.appService.upload(fileDetails.fileName, fileDetails.file);
  }
}
