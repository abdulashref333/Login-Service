import * as supertest from 'supertest';
import app from '../../application';
import { IUser } from './user.interface';

let user: IUser;
let token: string = 'Bearer ';
const BASE_URL = '/api/v1/users';
const request = supertest(app._express);

describe('TEST USER MODULE', () => {
  afterAll(async () => {
    await app._db.db.collection('users').deleteMany({});
    await app._db.close();
    await app._server.close();
  });

  describe('/sign-up API', () => {
    /*
      success scenario
    */
    test('should register a new user', async () => {
      const res = await request.post(BASE_URL + '/sign-up').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      });

      expect(res.status).toBe(201);
      expect(res.body.data.token).toBeTruthy();
      expect(res.body.data.user).toHaveProperty('_id');
      token += res.body.data.token;
      user = res.body.data.user;
    });

    /*
      failure scenario
    */
    test('should return 400 while email is missing on req body', async () => {
      const res = await request.post(BASE_URL + '/sign-up').send({
        firstname: 'test',
        lastname: 'test',
        password: '12345678',
      });

      expect(res.status).toBe(400);
      expect(res.body[0].message).toContain('email');
    });
  });

  describe('/me API', () => {
    /*
      success scenario
    */
    test('should return user profile', async () => {
      const res = await request.get(BASE_URL + '/me').set('authorization', token);

      expect(res.status).toBe(200);
      expect(res.body.data.user).toHaveProperty('_id');
    });

    /*
      failure scenario
    */
    test('should return 401 when send request without token', async () => {
      const res = await request.get(BASE_URL + '/me');
      expect(res.status).toBe(401);
    });
  });
});
