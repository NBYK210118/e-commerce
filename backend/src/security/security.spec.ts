import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../app.module';
import { PrismaService } from '../database/prisma.service';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { SellinglistService } from '../sellinglist/sellinglist.service';
import { configureHttp } from './http';
import { jwtSecret, redactCredentials } from './security';

describe('security regression', () => {
  let app: INestApplication;
  let jwt: JwtService;
  const originalSecret = process.env.JWT_SECRET;
  const users: any[] = [
    {
      id: 1,
      email: 'user@example.test',
      role: 'USER',
      password: 'never-return-this',
      profile: {},
    },
    {
      id: 2,
      email: 'admin@example.test',
      role: 'ADMIN',
      password: 'never-return-this',
      profile: {},
    },
  ];
  const prisma: any = {
    user: {
      findUnique: jest.fn(({ where }) =>
        Promise.resolve(
          users.find((u) =>
            where.id ? u.id === where.id : u.email === where.email,
          ),
        ),
      ),
      findFirst: jest.fn(({ where }) =>
        Promise.resolve(users.find((u) => u.email === where.email)),
      ),
      findMany: jest.fn(() => Promise.resolve(users)),
      deleteMany: jest.fn(() => Promise.resolve({ count: 0 })),
      delete: jest.fn(),
      create: jest.fn(({ data }) => Promise.resolve({ id: 3, ...data })),
    },
    product: { count: jest.fn(), update: jest.fn(), findMany: jest.fn() },
    userProduct: { deleteMany: jest.fn() },
    productImage: { deleteMany: jest.fn(), findFirst: jest.fn() },
    sellingList: { findUnique: jest.fn() },
    $transaction: jest.fn(async (callback) => callback(prisma)),
  };
  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-only-key-not-for-deployment-0123456789';
    users[0].password = await bcrypt.hash('test-password-1234', 4);
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();
    app = module.createNestApplication({ bodyParser: false });
    app.useLogger(false);
    configureHttp(app);
    await app.init();
    jwt = module.get(JwtService);
  });
  afterAll(async () => {
    await app?.close();
    if (originalSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = originalSecret;
  });
  const token = (id = 1) => jwt.sign({ sub: id, email: users[id - 1].email });
  it('requires a configured strong secret', () => {
    const secret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    expect(jwtSecret).toThrow();
    process.env.JWT_SECRET = 'short';
    expect(jwtSecret).toThrow();
    process.env.JWT_SECRET = secret;
  });
  it.each(['/user/all', '/user/my-profile/all', '/question'])(
    'denies anonymous access to %s',
    async (path) => {
      await request(app.getHttpServer()).get(path).expect(401);
    },
  );
  it('denies anonymous and non-admin bulk deletion without touching the database', async () => {
    await request(app.getHttpServer()).delete('/user/del-all-user').expect(401);
    await request(app.getHttpServer())
      .delete('/user/del-all-user')
      .auth(token(), { type: 'bearer' })
      .expect(403);
    expect(prisma.user.deleteMany).not.toHaveBeenCalled();
  });
  it('allows an administrator to list users without credentials', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/all')
      .auth(token(2), { type: 'bearer' })
      .expect(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].password).toBeUndefined();
  });
  it('returns 401 for unknown users and wrong passwords', async () => {
    await request(app.getHttpServer())
      .post('/user/signin')
      .send({ email: 'missing@example.test', password: 'wrong' })
      .expect(401);
    await request(app.getHttpServer())
      .post('/user/signin')
      .send({ email: users[0].email, password: 'wrong' })
      .expect(401);
  });
  it('rejects short signup passwords and never accepts client roles or returns hashes', async () => {
    const data = {
      email: 'new@example.test',
      firstName: 'New',
      lastName: 'User',
      password: 'short',
      role: 'ADMIN',
    };
    await request(app.getHttpServer())
      .post('/user/signup')
      .send(data)
      .expect(400);
    expect(prisma.user.create).not.toHaveBeenCalled();
    const response = await request(app.getHttpServer())
      .post('/user/signup')
      .send({ ...data, password: 'strong-password-1234' })
      .expect(200);
    expect(response.body.password).toBeUndefined();
    expect(prisma.user.create.mock.calls[0][0].data.role).toBeUndefined();
  });
  it('signs and verifies a valid login using the configured key', async () => {
    const login = await request(app.getHttpServer())
      .post('/user/signin')
      .send({ email: users[0].email, password: 'test-password-1234' })
      .expect(201);
    expect(jwt.verify(login.text).sub).toBe(1);
    const profile = await request(app.getHttpServer())
      .get('/user/verify')
      .auth(login.text, { type: 'bearer' })
      .expect(200);
    expect(profile.body.user.password).toBeUndefined();
  });
  it('rejects expired, forged and legacy tokens', async () => {
    const tokens = [
      jwt.sign({ sub: 1 }, { expiresIn: -1 }),
      jwt.sign({ sub: 1 }, { secret: 'old-compromised-key' }),
      jwt.sign({ email: users[0].email }),
    ];
    for (const value of tokens)
      await request(app.getHttpServer())
        .get('/user/verify')
        .auth(value, { type: 'bearer' })
        .expect(401);
  });
  it('rejects malformed JSON, URL-encoded forms and oversized bodies', async () => {
    await request(app.getHttpServer())
      .post('/user/signin')
      .set('Content-Type', 'application/json')
      .send('{')
      .expect(400);
    await request(app.getHttpServer())
      .post('/user/signin')
      .type('form')
      .send({ email: 'a' })
      .expect(415);
    await request(app.getHttpServer())
      .post('/user/signin')
      .send({ data: 'x'.repeat(10 * 1024 * 1024) })
      .expect(413);
  });
  it('does not expose another user wishlist', async () => {
    await request(app.getHttpServer())
      .get('/wishlist/2')
      .auth(token(), { type: 'bearer' })
      .expect(403);
  });
  it('rejects non-admin support replies', async () => {
    await request(app.getHttpServer())
      .post('/answer/reply?question_id=1')
      .auth(token(), { type: 'bearer' })
      .send({})
      .expect(403);
  });
  it('redacts nested credentials and preserves dates', () => {
    const date = new Date();
    expect(
      redactCredentials({
        user: { password: 'x', id: 1 },
        items: [{ passwordHash: 'y' }],
        date,
      }),
    ).toEqual({ user: { id: 1 }, items: [{}], date });
  });
  it('blocks foreign product updates, status changes and deletions before writes', async () => {
    prisma.product.count.mockResolvedValue(0);
    await expect(
      new ProductService(prisma).updateProduct(users[0], 9, {} as any),
    ).rejects.toThrow('Product ownership');
    await expect(
      new SellinglistService(prisma).updateProductStatus(users[0], {
        '9': true,
      }),
    ).rejects.toThrow('Product ownership');
    await expect(
      new UserService(prisma, jwt).deleteProduct(users[0], { '9': true }),
    ).rejects.toThrow('Product ownership');
    expect(prisma.product.update).not.toHaveBeenCalled();
    expect(prisma.userProduct.deleteMany).not.toHaveBeenCalled();
  });
});
