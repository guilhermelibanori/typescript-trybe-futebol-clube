import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matchService.getAllMatches();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getMatchByProgress(_req: Request, res: Response) {
    const { inProgress } = _req.query as { inProgress: string };
    const serviceResponse = await this.matchService.getMatchesByProgress(inProgress);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(_req: Request, res: Response) {
    const { id } = _req.params;
    const serviceResponse = await this.matchService.finishMatch(+id);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(_req: Request, res: Response) {
    const { id } = _req.params;
    const serviceResponse = await this.matchService.updateMatch(+id, _req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createMatch(_req: Request, res: Response) {
    const serviceResponse = await this.matchService.createMatch(_req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
