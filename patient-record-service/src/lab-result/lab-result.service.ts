import { Injectable } from '@nestjs/common';
import { CreateLabResultDto } from './dto/create-lab-result.dto';
import { UpdateLabResultDto } from './dto/update-lab-result.dto';

@Injectable()
export class LabResultService {
  create(createLabResultDto: CreateLabResultDto) {
    return 'This action adds a new labResult';
  }

  findAll() {
    return `This action returns all labResult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} labResult`;
  }

  update(id: number, updateLabResultDto: UpdateLabResultDto) {
    return `This action updates a #${id} labResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} labResult`;
  }
}
