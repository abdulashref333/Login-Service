import { Request, Response } from 'express';
import { CustomResponse } from '../../utils/custome-response';
import { JWT } from '../../utils/jwt';
import { IUserSerialized } from '../user/user.interface';
import userService from '../user/user.service';
import { Password } from '../../utils/password';

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return CustomResponse.sendWithError(res, 'Invalid Credentials!', 400);
    }

    const isMatch = Password.compare(password, user.password);
    if (isMatch) {
      const token = JWT.sign(user as IUserSerialized);

      const userSerialization = user as IUserSerialized;
      userSerialization.password = undefined;

      const result = { user: userSerialization, token };
      CustomResponse.send(res, result, `Welcome Back, ${user.firstname}`);
    } else {
      return CustomResponse.sendWithError(res, 'Invalid Credentials!', 400);
    }
  }
  async loginByGoogle(req: Request, res: Response) {
    const { user } = req;

    if (user) {
      const token = JWT.sign(user as IUserSerialized);
      const result = { user, token };

      return CustomResponse.send(res, result, 'Created Successfully', 201);
    } else {
      throw new Error();
    }
  }
}

export default new AuthController();
