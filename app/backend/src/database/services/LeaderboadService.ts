/* eslint-disable no-restricted-syntax */
import ranking from '../middlewares/leaderboard';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

const leaderboardService = async () => {
  const matches = await Teams.findAll({
    include: [{
      model: Matches,
      as: 'teamHome',
      where: { inProgress: false },
    }],
  });

  const result = matches.map((el) => ranking(el));
  const values = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
  const board = result.sort((a: any, b: any) => {
    for (const e of values) {
      if (a[e] < b[e]) {
        return 1;
      } if (a[e] > b[e]) {
        return -1;
      }
    } return 0;
  }); return board;
};

export default { leaderboardService };
