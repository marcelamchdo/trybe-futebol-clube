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

export default { matchesService };
