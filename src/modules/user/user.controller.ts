import { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import UserService from './user.service';
import { ICreateUser } from './user.interface';
import { Password } from '../../utils/password';
import { CustomResponse } from '../../utils/custome-response';
import { JWT } from '../../utils/jwt';

class UserController {
  async signUP(req: Request, res: Response): Promise<void> {
    const { firstname, lastname, email, password } = req.body;

    const isUserExist = await UserService.isEmailTaken(email);
    if (isUserExist) throw new BadRequestError('This Email Already Exist');

    const hashedPassword = await Password.toHash(password);

    const dataObject: ICreateUser = { firstname, lastname, email, password: hashedPassword };

    const user = await UserService.create(dataObject);
    delete user.password;

    if (user) {
      // Creating a JWT token for this user, and returning it back in the response
      // so that it can be used in the Authentication process
      const token = JWT.sign(user);
      const result = { user, token };

      return CustomResponse.send(res, result, 'Created Successfully', 201);
    } else {
      throw new Error();
    }
  }
}

export default new UserController();
