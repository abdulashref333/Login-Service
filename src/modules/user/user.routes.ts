import { Router } from 'express';
import UserController from './user.controller';
import { validateRequest } from '../../middlewares/validate-request';
import { addUserValidation } from './user.schemas';

const users = Router();

users.post('/sign-up', validateRequest(addUserValidation), UserController.signUP);

export default users;
