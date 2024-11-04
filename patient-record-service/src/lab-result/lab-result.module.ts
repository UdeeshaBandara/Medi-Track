import { Module } from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { LabResultController } from './lab-result.controller';

@Module({
  controllers: [LabResultController],
  providers: [LabResultService],
})
export class LabResultModule {}
