import { CreatePatientEvent } from './create-patient.event';
export declare class AppService {
    getHello(): string;
    handleUserCreated(data: CreatePatientEvent): void;
}
