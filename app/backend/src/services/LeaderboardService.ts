import ITeams from '../Interfaces/ITeams';
import TeamModel from '../models/TeamModel';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import ILeaderboards from '../Interfaces/ILeaderboards';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import MatchModel from '../models/MatchModel';
import IMatches from '../Interfaces/IMatches';

export default class Leaderboardservice {
  constructor(
    private teamModel: ITeamsModel<ITeams> = new TeamModel(),
    private matchModel: IMatchesModel<IMatches> = new MatchModel(),
  ) { }

  static getTeamWins(teamId: number, teamMatches: IMatches[]): number {
    return teamMatches.filter((match) => (
      (match.homeTeamId === teamId && match.homeTeamGoals
         > match.awayTeamGoals && match.inProgress === false)
        || (match.awayTeamId === teamId && match.awayTeamGoals
           > match.homeTeamGoals && match.inProgress === false)
    )).length;
  }

  static getTeamDraws(teamId: number, teamMatches: IMatches[]): number {
    return teamMatches.filter((match) => (
      (match.homeTeamId === teamId && match.homeTeamGoals
         === match.awayTeamGoals && match.inProgress === false)
        || (match.awayTeamId === teamId && match.awayTeamGoals
           === match.homeTeamGoals && match.inProgress === false)
    )).length;
  }

  static getTeamLosses(teamId: number, teamMatches: IMatches[]): number {
    return teamMatches.filter((match) => (
      (match.homeTeamId === teamId && match.homeTeamGoals
         < match.awayTeamGoals && match.inProgress === false)
        || (match.awayTeamId === teamId && match.awayTeamGoals
          < match.homeTeamGoals && match.inProgress === false)
    )).length;
  }

  static getTeamGoalsFavor(teamId: number, teamMatches: IMatches[]): number {
    return teamMatches
      .filter((match) => !match.inProgress)
      .reduce((totalGoals, match) => {
        if (match.homeTeamId === teamId) {
          return totalGoals + match.homeTeamGoals;
        } if (match.awayTeamId === teamId) {
          return totalGoals + match.awayTeamGoals;
        }
        return totalGoals;
      }, 0);
  }

  static getTeamGoalsTaken(teamId: number, teamMatches: IMatches[]): number {
    return teamMatches
      .filter((match) => !match.inProgress)
      .reduce((totalGoals, match) => {
        if (match.homeTeamId === teamId) {
          return totalGoals + match.awayTeamGoals;
        } if (match.awayTeamId === teamId) {
          return totalGoals + match.homeTeamGoals;
        }
        return totalGoals;
      }, 0);
  }

  static calculateTotalGames(teamWins: number, teamDraws: number, teamLosses: number): number {
    return teamWins + teamDraws + teamLosses;
  }

  static getTeamDataForTeam(tm: ITeams, teamMatches: IMatches[]): ILeaderboards {
    const teamWins = Leaderboardservice.getTeamWins(tm.id, teamMatches);
    const teamDraws = Leaderboardservice.getTeamDraws(tm.id, teamMatches);
    const teamLosses = Leaderboardservice.getTeamLosses(tm.id, teamMatches);
    const totalPoints = (teamWins * 3) + (teamDraws * 1);
    const teamGoalsFavor = Leaderboardservice.getTeamGoalsFavor(tm.id, teamMatches);
    const teamGoalsTaken = Leaderboardservice.getTeamGoalsTaken(tm.id, teamMatches);
    const totalGame = Leaderboardservice.calculateTotalGames(teamWins, teamDraws, teamLosses);
    return {
      totalPoints,
      totalGames: totalGame,
      totalVictories: teamWins,
      totalDraws: teamDraws,
      totalLosses: teamLosses,
      goalsFavor: teamGoalsFavor,
      goalsOwn: teamGoalsTaken,
      goalsBalance: teamGoalsFavor - teamGoalsTaken,
      efficiency: ((totalPoints / (totalGame * 3)) * 100).toFixed(2),
    };
  }

  public async getTeamData(): Promise<ILeaderboards[]> {
    const allTeams = await this.teamModel.findAll();
    const teamDataArray: Promise<ILeaderboards>[] = allTeams.map(async (team) => {
      const teamMatches = await this.matchModel.findByTeamId(+team.id);
      const matches: IMatches[] = teamMatches || [];
      return Leaderboardservice.getTeamDataForTeam(team, matches);
    });
    return Promise.all(teamDataArray).then((teamData) => teamData.map((data, index) => ({
      name: allTeams[index].teamName,
      ...data,
    })));
  }

  static sortTeams(teams: ILeaderboards[]): ILeaderboards[] {
    return teams.sort((teamA, teamB) => {
      if (teamB.totalPoints !== teamA.totalPoints) {
        return teamB.totalPoints - teamA.totalPoints;
      }
      if (teamB.totalVictories !== teamA.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      }
      if (teamB.goalsBalance !== teamA.goalsBalance) {
        return teamB.goalsBalance - teamA.goalsBalance;
      }
      if (teamB.goalsFavor !== teamA.goalsFavor) {
        return teamB.goalsFavor - teamA.goalsFavor;
      }
      return 0;
    });
  }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboards[]>> {
    const teamData = await this.getTeamData();
    const sortedTeams = Leaderboardservice.sortTeams(teamData);
    return { status: 'SUCCESSFUL', data: sortedTeams };
  }

  public async getLeaderboardAway(): Promise<ServiceResponse<ILeaderboards[]>> {
    const allTeams = await this.teamModel.findAll();
    const teamDataArray: Promise<ILeaderboards>[] = allTeams.map(async (team) => {
      const teamMatches = await this.matchModel.findByTeamId(+team.id);
      const awayMatches: IMatches[] = teamMatches ? teamMatches
        .filter((match) => match.awayTeamId === +team.id) : [];
      const teamData = Leaderboardservice.getTeamDataForTeam(team, awayMatches);
      return {
        name: team.teamName,
        ...teamData,
      };
    });
    const awayTeamData = await Promise.all(teamDataArray);
    const sortedAwayTeams = Leaderboardservice.sortTeams(awayTeamData);
    return { status: 'SUCCESSFUL', data: sortedAwayTeams };
  }

  public async getLeaderboardHome(): Promise<ServiceResponse<ILeaderboards[]>> {
    const allTeams = await this.teamModel.findAll();
    const teamDataArray: Promise<ILeaderboards>[] = allTeams.map(async (team) => {
      const teamMatches = await this.matchModel.findByTeamId(+team.id);
      const homeMatches: IMatches[] = teamMatches ? teamMatches
        .filter((match) => match.homeTeamId === +team.id) : [];
      const teamData = Leaderboardservice.getTeamDataForTeam(team, homeMatches);
      return {
        name: team.teamName,
        ...teamData,
      };
    });
    const homeTeamData = await Promise.all(teamDataArray);
    const sortedHomeTeams = Leaderboardservice.sortTeams(homeTeamData);
    return { status: 'SUCCESSFUL', data: sortedHomeTeams };
  }
}
