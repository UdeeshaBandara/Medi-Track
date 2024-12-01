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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const abstract_entity_1 = require("../../database/abstract.entity");
const lab_result_entity_1 = require("../../lab-result/entities/lab-result.entity");
const medical_history_entity_1 = require("../../medical-history/entities/medical-history.entity");
const prescription_entity_1 = require("../../prescription/entities/prescription.entity");
const typeorm_1 = require("typeorm");
let Patient = class Patient extends abstract_entity_1.AbstractEntity {
};
exports.Patient = Patient;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Patient.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Patient.prototype, "contact_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Patient.prototype, "emergency_contact", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => medical_history_entity_1.MedicalHistory, (patient) => patient.patient),
    __metadata("design:type", Array)
], Patient.prototype, "medicalHistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prescription_entity_1.Prescription, (patient) => patient.patient),
    __metadata("design:type", Array)
], Patient.prototype, "prescription", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lab_result_entity_1.LabResult, (patient) => patient.patient),
    __metadata("design:type", Array)
], Patient.prototype, "labResult", void 0);
exports.Patient = Patient = __decorate([
    (0, typeorm_1.Entity)()
], Patient);
//# sourceMappingURL=patient.entity.js.map