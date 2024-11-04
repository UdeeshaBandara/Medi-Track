import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class PatientService {
    private readonly patientRepository;
    private readonly entityManager;
    constructor(patientRepository: Repository<Patient>, entityManager: EntityManager);
    create(createPatientDto: CreatePatientDto): Promise<Patient>;
    findAll(): Promise<Patient[]>;
    findOne(id: number): Promise<Patient>;
    update(id: number, updatePatientDto: UpdatePatientDto): Promise<void>;
    remove(id: number): Promise<void>;
}
