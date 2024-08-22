import { ID } from '.';

export interface ITeamsModel<ITeams> {
  findAll(): Promise<ITeams[]>,
  findById(id: ID): Promise<ITeams | null>,
}
