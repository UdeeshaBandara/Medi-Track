import { AppService } from './app.service';
import { CreatePatientRequest } from './create-patient-request.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    createUser(createUserRequest: CreatePatientRequest): void;
    getAnalytics(): import("rxjs").Observable<any>;
}
