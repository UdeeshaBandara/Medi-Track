import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
      providers: [AppService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    appService = moduleRef.get<AppService>(AppService);
  });

  it('should check connection to the microservice', async () => {
    const response = await appService.checkTCPConnection();
    expect(response).toBe('Healthy'); 
  });

  afterAll(async () => {
    await app.close();
  });


});
