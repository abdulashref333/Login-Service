import { Passport } from 'passport';
import { User } from '../modules/user/user.model';
import { JWT } from './jwt';
import { Password } from './password';
// const User = require('../modules/user/user.model');
// const JWT = require('./jwt');

// let user;
// beforeAll(async function (done) {
//   user = await User.create({
//     firstname: 'test',
//     lastname: '_test',
//     email: 'test@test.com',
//   });
//   done();
// });

describe('Testing Utils', function () {
  describe('JWT Static Methods', () => {
    test('Sign Method Should return token', () => {
      expect(
        JWT.sign({
          email: 'test@test.com',
          firstname: 'abdo',
          lastname: 'test',
          id: '6494663885f06b98dc8e9653',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ).toBeTruthy();
    });
  });

  describe('Password Static Methods', () => {
    test('toHash method should return hash', async () => {
      const hashedPass = await Password.toHash('1234');
      expect(hashedPass).toBeTruthy();
    });

    test('compare method should return true when pass is correct', async () => {
      const hashedPass = await Password.toHash('1234');
      const isMatch = await Password.compare(hashedPass, '1234');
      expect(isMatch).toEqual(true);
    });

    test('compare should return false when pass is wrong', async () => {
      const hashedPass = await Password.toHash('1234');
      const isMatch = await Password.compare(hashedPass, 'pass');
      expect(isMatch).toEqual(false);
    });
  });
});

export default {};
