import { ICreateUser } from './user.interface';
import { User } from './user.model';

class UserService {
  async create(user: ICreateUser) {
    return await User.create(user);
  }

  async findOne() {}

  async isEmailTaken(email: string) {
    const user = await User.findOne({ email });
    return !!user;
  }
}

export default new UserService();
