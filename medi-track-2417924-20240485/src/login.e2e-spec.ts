import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthModule } from '../src/auth/auth.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST / ping test to the gateway', async () => {
    jest.setTimeout(15000);
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200);

    expect(response.body).toHaveProperty('config');
  });

  it('POST /auth/login integration test', async () => {
    jest.setTimeout(15000);
    const payload = { name: process.env.TEST_USER_NAME, password: process.env.TEST_USER_PASSWORD };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload)
      .expect(201);
    expect(response.body).toHaveProperty('access_token');
  });

  afterAll(async () => {
    await app.close();
  });


});
