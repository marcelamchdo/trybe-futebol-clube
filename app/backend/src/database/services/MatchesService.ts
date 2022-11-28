import Matches from '../models/Matches';
import Teams from '../models/Teams';

const matchesService = async () => {
  const matches = await Matches.findAll({
    include: [{
      model: Teams, as: 'teamHome',
    }, {
      model: Teams, as: 'teamAway',
    }],
  });
  return matches;
};

const editMatches = async (id: number) => {
  await Matches.update({ inProgress: false }, { where: { id } });
  return { status: 200, message: { message: 'Finished' } };
};

const insertMatches = async (
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const createMatches = await Matches.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
  });
  if (homeTeam === awayTeam) {
    return {
      status: 422,
      message: { message: 'It is not possible to create a match with two equal teams' },
    };
  }
  return { status: 201, message: createMatches };
};

export default { matchesService, editMatches, insertMatches };
