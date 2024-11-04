import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientRequest } from './create-patient-request.dto';
export declare class AppService {
    private readonly patientRecordClient;
    private readonly appointmentClient;
    private readonly users;
    constructor(patientRecordClient: ClientProxy, appointmentClient: ClientProxy);
    getHello(): string;
    createUser(createUserRequest: CreatePatientRequest): void;
    getAnalytics(): void;
}
