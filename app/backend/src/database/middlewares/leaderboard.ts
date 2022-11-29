import { Matches, Team } from '../interfaces/leaderboardInterface';

const pointsTotal = (teamHome: Matches[]) => {
  let wins = 0;
  let ties = 0;
  let points = 0;
  let defeats = 0;

  teamHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) {
      points += 3;
      wins += 1;
    }

    if (homeTeamGoals < awayTeamGoals) {
      defeats += 1;
    }

    if (homeTeamGoals === awayTeamGoals) {
      ties += 1;
      points += 1;
    }
  });
  return { wins, defeats, ties, points };
};

const efficiency = (point: number, games: number) => (
  (point / (games * 3)) * 100).toFixed(2);

const goals = (teamHome: Matches[]) => {
  const favor = teamHome.reduce((acc: number, curr) =>
    acc + curr.homeTeamGoals, 0);
  const own = teamHome.reduce((acc: number, curr) =>
    acc + curr.awayTeamGoals, 0);
  const balance = (favor - own);
  return { balance, favor, own };
};

const ranking = ({ teamName, teamHome }: Team) => {
  if (teamHome) {
    const objeto = {
      name: teamName,
      totalPoints: pointsTotal(teamHome).points,
      totalGames: teamHome.length,
      totalVictories: pointsTotal(teamHome).wins,
      totalDraws: pointsTotal(teamHome).ties,
      totalLosses: pointsTotal(teamHome).defeats,
      goalsFavor: goals(teamHome).favor,
      goalsOwn: goals(teamHome).own,
      goalsBalance: goals(teamHome).balance,
      efficiency: efficiency(pointsTotal(teamHome).points, teamHome.length),
    };
    return objeto;
  }
};

export default ranking;
