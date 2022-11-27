import Teams from '../models/Teams';

const teamService = async () => {
  const team = await Teams.findAll();
  return { status: 200, message: team };
};

const teamById = async (id: number) => {
  const teamId = await Teams.findOne({ where: { id } });
  return teamId;
};

export default { teamService, teamById };
