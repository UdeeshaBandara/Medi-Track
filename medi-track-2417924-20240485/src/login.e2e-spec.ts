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

  it('POST / should logged in the user', async () => {
    jest.setTimeout(15000);
    // const payload = { name: "Udeesha", password: 'noise' };
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200);

    expect(response.body).toHaveProperty('config');
  });

  afterAll(async () => {
    await app.close();
  });


});
