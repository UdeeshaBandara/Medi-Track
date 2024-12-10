import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Upload } from "@aws-sdk/lib-storage";

@Injectable()
export class AppService {

  constructor(private readonly configService: ConfigService) { }

  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY')
    },
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });


  async upload(fileName: string, file: Buffer) {
    const parallelUploads3 = new Upload({
      client: this.s3Client,
      params: {
        Bucket: 'medi-track-documents-20240485',
        Key: fileName,
        Body: Buffer.from(file),
      }

    });
    await parallelUploads3.done();
    return {
      message: 'File uploaded successfully',
    }
  }
}