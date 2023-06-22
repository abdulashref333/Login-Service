import { Router } from 'express';
import UserController from './user.controller';
import { validateRequest } from '../../middlewares/validate-request';
import { addUserValidation } from './user.schemas';
import passport = require('passport');

const users = Router();

users
  .post('/sign-up', validateRequest(addUserValidation), UserController.signUP)
  .get('/me', passport.authenticate('jwt', { session: false }), UserController.me);

export default users;
