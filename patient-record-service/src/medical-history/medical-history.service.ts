import { Injectable } from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class MedicalHistoryService {

  constructor(
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepository: Repository<MedicalHistory>,
    private readonly entityManager: EntityManager,
  ) { }

  async create(createMedicalHistoryDto: CreateMedicalHistoryDto) {
    const item = new MedicalHistory({
      ...createMedicalHistoryDto
    });
    return await this.entityManager.save(item);
  }

  findAll() {
    return this.medicalHistoryRepository.find();
  }

  findOne(id: number) {
    return this.medicalHistoryRepository.findOneBy({ id });

  }

  async update(id: number, updateMedicalHistoryDto: UpdateMedicalHistoryDto) {
    const MedicalHistory = await this.medicalHistoryRepository.findOneBy({ id });
    Object.assign(MedicalHistory, updateMedicalHistoryDto);
    await this.entityManager.save(MedicalHistory);
  }

  async remove(id: number) {
    await this.medicalHistoryRepository.delete(id);
  }
}
