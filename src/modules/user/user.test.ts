import * as supertest from 'supertest';
import app from '../../application';
import { ICreateUser, IUser } from './user.interface';
import userService from './user.service';
import mongoose from 'mongoose';
import { config } from '../../../config/config';

let user: IUser;
let token: string = 'Bearer ';
const BASE_URL = '/api/v1/users';
const request = supertest(app._express);

describe('TEST USER MODULE', () => {
  afterAll(async () => {
    const connections = await mongoose.connect(config.mongoose.url, config.mongoose.options);
    await connections.connection.db.collection('users').deleteMany({});
    await connections.connection.close();
    await app._server.close();
  });

  /*
    success scenario
  */
  test('/sign-up should register a new user', async () => {
    await request
      .post(BASE_URL + '/sign-up')
      .send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.data.token).toBeTruthy();
        expect(res.body.data.user).toHaveProperty('_id');
        token += res.body.data.token;
        user = res.body.data.user;
      });
  });

  /*
    failure scenario
  */
  test('/sign-up should return 400 while email is missing on req body', async () => {
    await request
      .post(BASE_URL + '/sign-up')
      .send({
        firstname: 'test',
        lastname: 'test',
        password: '12345678',
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body[0].message).toContain('email');
      });
  });

  /*
    success scenario
  */
  test('/me should return user profile', async () => {
    await request
      .get(BASE_URL + '/me')
      .set('authorization', token)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.user).toHaveProperty('_id');
      });
  });

  /*
    failure scenario
  */
  test('/me should return 401 when send request without token', async () => {
    await request.get(BASE_URL + '/me').then((res) => {
      expect(res.status).toBe(401);
    });
  });
});
