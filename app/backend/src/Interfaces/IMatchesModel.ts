import { ID } from '.';
import { IUpdateMatch } from './IMatches';

export interface IMatchesModel<IMatches> {
  findAll(inProgress?: string): Promise<IMatches[]>,
  finishMatch(id: ID): Promise<number | null>,
  updateMatch(id: ID, data: IUpdateMatch): Promise<number | null>,
  createMatch(data: IMatches): Promise<IMatches | null>,
  findByTeamId(id: number): Promise<IMatches[] | null>,
}
