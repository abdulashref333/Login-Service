import { Router } from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import passport = require('passport');
import AuthController from './auth.controller';
import { loginValidation } from './auth.schema';

const auth = Router();

auth
  .post('/login', validateRequest(loginValidation), AuthController.login)
  .get('/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }))
  .get('/google/redirect', passport.authenticate('google', { session: false }), AuthController.oauth2Login)
  .get('/facebook', passport.authenticate('facebook', { session: false }))
  .get('/facebook/redirect', passport.authenticate('facebook', { session: false }), AuthController.oauth2Login);

export default auth;
