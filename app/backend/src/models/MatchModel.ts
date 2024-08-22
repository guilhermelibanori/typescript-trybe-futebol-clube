import sequelize = require('sequelize');
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import IMatches, { IUpdateMatch } from '../Interfaces/IMatches';

export default class MatchModel implements IMatchesModel<IMatches> {
  private model = SequelizeMatches;

  async findAll(progress: string | undefined): Promise<IMatches[]> {
    let inProgress: boolean | undefined;
    if (progress === 'true') {
      inProgress = true;
    } else if (progress === 'false') {
      inProgress = false;
    } else {
      inProgress = undefined;
    }
    const whereClause = inProgress !== undefined ? { inProgress } : {};
    const dbData = await this.model.findAll({
      where: whereClause,
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async finishMatch(id: number): Promise<number | null> {
    const [numUpdatedRows] = await this.model.update({ inProgress: false }, { where: { id } });
    return numUpdatedRows;
  }

  async updateMatch(id: number, data: IUpdateMatch): Promise<number | null> {
    const { awayTeamGoals, homeTeamGoals } = data;
    const [numUpdatedRows] = await this.model.update({
      awayTeamGoals, homeTeamGoals }, { where: { id },
    });
    return numUpdatedRows;
  }

  async createMatch(data: IMatches): Promise<IMatches | null> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = data;
    const dbData = await this.model.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    return dbData;
  }

  async findByTeamId(id: number): Promise<IMatches[] | null> {
    const dbData = await this.model.findAll({
      where: {
        [sequelize.Op.or]: [
          { homeTeamId: id },
          { awayTeamId: id },
        ],
      },
    });
    if (dbData == null) return null;
    return dbData;
  }
}
