import * as jwt from 'jsonwebtoken';
import { IUserSerialized } from '../modules/user/user.interface';
import { config } from '../../config/config';

export interface IToken {
  sub: string;
  email: string;
}

export class JWT {
  static sign(user: IUserSerialized) {
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      } as IToken,
      config.jwt.secret!,
      { expiresIn: config.jwt.accessExpiration },
    );
    return token;
  }

  static verify(token: string) {
    const result = jwt.verify(token, config.jwt.secret!);

    return result;
  }
}
