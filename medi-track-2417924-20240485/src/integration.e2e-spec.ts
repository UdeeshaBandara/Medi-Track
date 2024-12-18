import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, AuthModule,
        ClientsModule.registerAsync([
          {
            name: 'PATIENTRECORD',
            useFactory: (configService: ConfigService) => ({
              transport: Transport.TCP,
              options: {
                host: configService.get<string>('PATIENT_RECORD_HOST', 'patient-record-blue'),
                port: 4000
              },
            }),
            inject: [ConfigService],
          },
          {
            name: 'UPLOADER',
            useFactory: (configService: ConfigService) => ({
              transport: Transport.TCP,
              options: {
                host: configService.get<string>('UPLOADER_HOST', 'file-handler-blue'),
                port: 4001
              },
            }),
            inject: [ConfigService],
          },
          {
            name: 'APPOINTMENTS',
            useFactory: (configService: ConfigService) => ({
              transport: Transport.TCP,
              options: {
                host: configService.get<string>('APPOINTMENTS_HOST', 'appointment-scheduling-blue'),
                port: 4002
              },
            }),
            inject: [ConfigService],
          },
          {
            name: 'NOTIFICATIONS',
            useFactory: (configService: ConfigService) => ({
              transport: Transport.TCP,
              options: {
                host: configService.get<string>('NOTIFICATIONS_HOST', 'notification-service-blue'),
                port: 4003
              },
            }),
            inject: [ConfigService],
          }
        ])],
      providers: [AppService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    appService = moduleRef.get<AppService>(AppService);
  });

  it('should check connection to the microservice', async () => {
    const response = await appService.checkTCPConnection();
    console.log('response :', response);
    expect(response).toBe('Healthy');
  });

  afterAll(async () => {
    await app.close();
  });


});
