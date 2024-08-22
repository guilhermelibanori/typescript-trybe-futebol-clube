import { IMatchesModel } from '../Interfaces/IMatchesModel';
import MatchModel from '../models/MatchModel';
import IMatches, { IUpdateMatch } from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamService from './TeamService';

export default class MatchService {
  constructor(
    private matchModel: IMatchesModel<IMatches> = new MatchModel(),
    private teamService = new TeamService(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByProgress(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, data: IUpdateMatch):
  Promise<ServiceResponse<{ message: string }>> {
    await this.matchModel.updateMatch(id, data);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(data: IMatches): Promise<ServiceResponse<IMatches>> {
    if (data.homeTeamId === data.awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const checkTeamHome = await this.teamService.getTeamById(data.homeTeamId);
    const checkTeamAway = await this.teamService.getTeamById(data.awayTeamId);
    if (checkTeamHome.status === 'NOT_FOUND' || checkTeamAway.status === 'NOT_FOUND') {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.createMatch(data);
    if (!newMatch) return { status: 'NOT_FOUND', data: { message: 'Failed to create the match' } };

    return { status: 'CREATED', data: newMatch };
  }
}
