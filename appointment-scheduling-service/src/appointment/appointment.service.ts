import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly entityManager: EntityManager,
  ) { }


  async create(createAppointmentDto: CreateAppointmentDto) {
    const item = new Appointment({
      ...createAppointmentDto
    });
    return await this.entityManager.save(item);
  }

  findAll() {
    return this.appointmentRepository.find();
  }

  findOne(id: number) {
    return this.appointmentRepository.findOneBy({ id });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const Patient = await this.appointmentRepository.findOneBy({ id });
    Object.assign(Patient, updateAppointmentDto);
    await this.entityManager.save(Patient);
  }

  async remove(id: number) {
    await this.appointmentRepository.delete(id);
  }
}
