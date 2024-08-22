import * as bcrypt from 'bcryptjs';
import IAuth from '../Interfaces/IAuth';
import IToken from '../Interfaces/IToken';
import { IUsersModel } from '../Interfaces/IUsersModel';
import UserModel from '../models/UserModel';
import IUsers from '../Interfaces/IUsers';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';

export default class Userservice {
  constructor(
    private userModel: IUsersModel<IUsers> = new UserModel(),
  ) { }

  public async doLogin(data: IUsers): Promise<ServiceResponse<IToken | ServiceMessage >> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = JWT.sign({ email: data.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(data: IAuth): Promise<ServiceResponse<{ role: string }>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
