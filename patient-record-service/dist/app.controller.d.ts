import { AppService } from './app.service';
import { CreatePatientEvent } from './create-patient.event';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    handleUserCreated(data: CreatePatientEvent): void;
}
