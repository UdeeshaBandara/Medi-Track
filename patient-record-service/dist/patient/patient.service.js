"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const patient_entity_1 = require("./entities/patient.entity");
const typeorm_2 = require("typeorm");
let PatientService = class PatientService {
    constructor(patientRepository, entityManager) {
        this.patientRepository = patientRepository;
        this.entityManager = entityManager;
    }
    async create(createPatientDto) {
        const item = new patient_entity_1.Patient({
            ...createPatientDto
        });
        return await this.entityManager.save(item);
    }
    findAll() {
        return this.patientRepository.find();
    }
    findOne(id) {
        return this.patientRepository.findOneBy({ id });
    }
    async update(id, updatePatientDto) {
        const Patient = await this.patientRepository.findOneBy({ id });
        Object.assign(Patient, updatePatientDto);
        await this.entityManager.save(Patient);
    }
    async remove(id) {
        await this.patientRepository.delete(id);
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], PatientService);
//# sourceMappingURL=patient.service.js.map