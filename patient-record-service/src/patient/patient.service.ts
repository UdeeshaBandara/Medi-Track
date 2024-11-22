import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly entityManager: EntityManager,
  ) { }

  create(createPatientDto: CreatePatientDto) {

    const item = new Patient({
      ...createPatientDto
    });
    return this.entityManager.save(item);
  }

  findAll() {
    return this.patientRepository.find();
  }

  findOne(id: number) {
    return this.patientRepository.findOneBy({ id });

  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const Patient = await this.patientRepository.findOneBy({ id });
    Object.assign(Patient, updatePatientDto);
    return this.entityManager.save(Patient);
  }

   remove(id: number) {
    return this.patientRepository.delete(id);
  }
}
