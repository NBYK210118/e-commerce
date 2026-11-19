import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { configureHttp } from '../src/security/http';

describe('Application HTTP smoke tests (mock database)', () => {
  let app: INestApplication;
  const previous = process.env.JWT_SECRET;
  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-only-http-smoke-secret-0123456789';
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue({
        category: {
          findMany: jest
            .fn()
            .mockResolvedValue([{ id: 1, name: 'Sample', imgUrl: '' }]),
        },
      })
      .compile();
    app = module.createNestApplication({ bodyParser: false });
    configureHttp(app);
    await app.init();
  });
  afterAll(async () => {
    await app?.close();
    if (previous === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previous;
  });
  it('keeps category browsing public', async () => {
    const response = await request(app.getHttpServer())
      .get('/category')
      .expect(200);
    expect(response.body[0].name).toBe('Sample');
    expect(response.headers['x-content-type-options']).toBe('nosniff');
  });
  it('requires authentication for profile changes', async () => {
    await request(app.getHttpServer())
      .post('/user/my-profile/update')
      .send({ role: 'ADMIN' })
      .expect(401);
  });
});
