import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {  Appointment } from './entities/appointment.entity';
import * as moment from "moment";

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
  
  async getAppointmentCountByDoctor() {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('appointment.doctor_id', 'doctor_id')
      .addSelect('doctor.name', 'doctor_name') 
      .addSelect('COUNT(appointment.id)', 'count')
      .innerJoin('doctor', 'doctor', 'doctor.id = appointment.doctor_id') 
      .where('appointment.appointment_date = :date', { date: moment(new Date()).format('YYYY-MM-DD') })
      .groupBy('appointment.doctor_id')
      .addGroupBy('doctor.name') 
      .getRawMany();
  }

  async appointmentSummary() {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .addSelect('COUNT(appointment.id)', 'count')
      .where('appointment.appointment_date = :date', { date: moment(new Date()).format('YYYY-MM-DD') })
      .getRawMany();
  }
}
