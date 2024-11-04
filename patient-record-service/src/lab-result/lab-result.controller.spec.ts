import { Test, TestingModule } from '@nestjs/testing';
import { LabResultController } from './lab-result.controller';
import { LabResultService } from './lab-result.service';

describe('LabResultController', () => {
  let controller: LabResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabResultController],
      providers: [LabResultService],
    }).compile();

    controller = module.get<LabResultController>(LabResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
