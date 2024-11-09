import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly entityManager: EntityManager,
  ) { }

  async create(createDoctorDto: CreateDoctorDto) {
    const item = new Doctor({
      ...createDoctorDto
    });
    return await this.entityManager.save(item);
  }

  findAll() {
    return this.doctorRepository.find();
  }

  findOne(id: number) {
    return this.doctorRepository.findOneBy({ id });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const Doctor = await this.doctorRepository.findOneBy({ id });
    Object.assign(Doctor, updateDoctorDto);
    await this.entityManager.save(Doctor);
  }

  async remove(id: number) {
    await this.doctorRepository.delete(id);
  }
}
