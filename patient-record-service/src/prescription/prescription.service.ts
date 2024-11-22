import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';

@Injectable()
export class PrescriptionService {

  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    private readonly entityManager: EntityManager,
  ) { }

  async create(createPrescriptionDto: CreatePrescriptionDto) {
      const item = new Prescription({
      ...createPrescriptionDto
    });
    return await this.entityManager.save(item);
  }

  findAll() {
    return this.prescriptionRepository.find();
  }

  findOne(id: number) {
    return this.prescriptionRepository.findOneBy({ id });
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    const Prescription = await this.prescriptionRepository.findOneBy({ id });
    Object.assign(Prescription, updatePrescriptionDto);
    await this.entityManager.save(Prescription);
  }

  async remove(id: number) {
    await this.prescriptionRepository.delete(id);
  }
}
