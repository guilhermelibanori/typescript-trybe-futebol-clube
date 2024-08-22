import { Request, Response } from 'express';
import JWT from '../utils/JWT';
import IAuth from '../Interfaces/IAuth';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async doLogin(_req: Request, res: Response) {
    const serviceResponse = await this.userService.doLogin(_req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getRole(_req: Request, res: Response) {
    const token = _req.headers.authorization;
    if (token) {
      const data = JWT.verify(token) as unknown as IAuth;
      const serviceResponse = await this.userService.getRole(data);
      res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
  }
}
