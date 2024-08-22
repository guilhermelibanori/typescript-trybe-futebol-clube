import { IUsersModel } from '../Interfaces/IUsersModel';
import SequelizeUsers from '../database/models/SequelizeUsers';
import IUsers from '../Interfaces/IUsers';

export default class UsersModel implements IUsersModel<IUsers> {
  private model = SequelizeUsers;

  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, password, role } = user;
    return { id, username, password, email, role };
  }
}
