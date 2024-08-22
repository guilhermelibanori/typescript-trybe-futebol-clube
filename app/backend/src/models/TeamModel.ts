import { ITeamsModel } from '../Interfaces/ITeamsModel';
import SequelizeTeams from '../database/models/SequelizeTeams';
import ITeams from '../Interfaces/ITeams';

export default class TeamModel implements ITeamsModel<ITeams> {
  private model = SequelizeTeams;

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: ITeams = dbData;
    return { id, teamName };
  }

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}
