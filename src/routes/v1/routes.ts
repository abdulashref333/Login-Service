import * as express from 'express';
import userRouter from '../../modules/user/user.routes';
import auth from '../../modules/auth/auth.routes';

const v1Routers = express.Router();

v1Routers.use('/auth', auth);
v1Routers.use('/users', userRouter);

export default v1Routers;
