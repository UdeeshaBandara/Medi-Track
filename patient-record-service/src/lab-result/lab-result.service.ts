import { Injectable } from '@nestjs/common';
import { CreateLabResultDto } from './dto/create-lab-result.dto';
import { UpdateLabResultDto } from './dto/update-lab-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { LabResult } from './entities/lab-result.entity';

@Injectable()
export class LabResultService {
  
  constructor(
    @InjectRepository(LabResult)
    private readonly labResultyRepository: Repository<LabResult>,
    private readonly entityManager: EntityManager,
  ) { }


  async create(createLabResultDto: CreateLabResultDto) {
    const item = new LabResult({
      ...createLabResultDto
    });
    return await this.entityManager.save(item);
  }

  findAll() {
    return this.labResultyRepository.find();
  }

  findOne(id: number) {
    return this.labResultyRepository.findOneBy({ id });
  }

  async update(id: number, updateLabResultDto: UpdateLabResultDto) {
    const MedicalHistory = await this.labResultyRepository.findOneBy({ id });
    Object.assign(MedicalHistory, updateLabResultDto);
    await this.entityManager.save(MedicalHistory);
  }

  async remove(id: number) {
    await this.labResultyRepository.delete(id);
  }
}
