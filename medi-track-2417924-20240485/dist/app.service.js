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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const create_patient_event_1 = require("./create-patient.event");
let AppService = class AppService {
    constructor(patientRecordClient, appointmentClient) {
        this.patientRecordClient = patientRecordClient;
        this.appointmentClient = appointmentClient;
        this.users = [];
    }
    getHello() {
        console.log(' getHello:');
        return 'Hello dddd!';
    }
    createUser(createUserRequest) {
        console.log('createUser :', createUserRequest);
        this.users.push(createUserRequest);
        this.patientRecordClient.emit('patient_created', new create_patient_event_1.CreatePatientEvent(createUserRequest.name));
        console.log('users :', this.users);
    }
    getAnalytics() {
        console.log('getAnalytics :');
        this.patientRecordClient.emit('patient_created', new create_patient_event_1.CreatePatientEvent('sas'));
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PATIENTRECORDS')),
    __param(1, (0, common_1.Inject)('APPOINTMENTS')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AppService);
//# sourceMappingURL=app.service.js.map