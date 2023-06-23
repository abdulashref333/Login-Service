import * as supertest from 'supertest';
import app from '../../application';
import { IUser } from '../user/user.interface';

const BASE_URL = '/api/v1/auth';
const request = supertest(app._express);
let user: IUser;
let token = 'Bearer ';

describe('TEST AUTH MODULE', () => {
  beforeAll(async () => {
    const res = await request.post('/api/v1/users/sign-up').send({
      firstname: 'test',
      lastname: 'test',
      email: 'test@test.com',
      password: '12345678',
    });

    token += res.body.data.token;
    user = res.body.data.user;
    user.password = '12345678';
  });

  describe('/login API', () => {
    test('should success', async () => {
      const res = await request.post(BASE_URL + '/login').send({ email: user.email, password: user.password });

      expect(res.status).toBe(200);
      expect(res.body.data.user).toHaveProperty('_id');
      expect(res.body.data.user).not.toHaveProperty('password');
    });

    test('should fail with wrong password', async () => {
      const res = await request.post(BASE_URL + '/login').send({ email: user.email, password: 'wrong_password' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('Invalid Credentials');
    });

    test('should fail with wrong email', async () => {
      const res = await request
        .post(BASE_URL + '/login')
        .send({ email: 'wrong_email@test.com', password: user.password });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('Invalid Credentials');
    });
  });

  describe('/google API', () => {
    test('should redirect to google', async () => {
      const res = await request.get(BASE_URL + '/google');

      expect(res.status).toBe(302);
    });
  });

  afterAll(async () => {
    await app._db.db.collection('users').deleteMany({});
    await app._db.close();
    await app._server.close();
  });
});
