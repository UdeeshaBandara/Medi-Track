import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientRequest } from './create-patient-request.dto';
export declare class AppService {
    private readonly patientRecordClient;
    private readonly appointmentClient;
    private readonly notificationClient;
    private readonly users;
    constructor(patientRecordClient: ClientProxy, appointmentClient: ClientProxy, notificationClient: ClientProxy);
    getHello(): string;
    createUser(createUserRequest: CreatePatientRequest): void;
    getAnalytics(): import("rxjs").Observable<any>;
}
