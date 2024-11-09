import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Upload } from "@aws-sdk/lib-storage";

@Injectable()
export class AppService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    const parallelUploads3 = new Upload({
      client: this.s3Client,
      params:{
        Bucket: 'medi-track-documents',
        Key: fileName,
        Body: Buffer.from(file),
      }
  
    });
    await parallelUploads3.done();
  }
}