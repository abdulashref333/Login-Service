import { IBase } from '../../common/base.interface';

export interface ICreateUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IUser extends IBase {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  googleId?: string;
  facebookId?: string;
}

export interface IUserSerialized extends IBase {
  firstname: string;
  lastname: string;
  password?: string;
  email: string;
}
