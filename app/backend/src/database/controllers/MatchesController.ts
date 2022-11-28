import { Request, Response } from 'express';
import Teams from '../models/Teams';
import MatchesService from '../services/MatchesService';

const matchesController = async (req: Request, res: Response) => {
  const { inProgress: progress } = req.query;
  const matches = await MatchesService.matchesService();
  if (progress) {
    if (progress === 'true') {
      const result = matches.filter((el) => Boolean(el.inProgress) === true);
      return res.status(200).json(result);
    }
    if (progress === 'false') {
      const result = matches.filter((el) => Boolean(el.inProgress) === false);
      return res.status(200).json(result);
    }
    return res.status(200).json(matches);
  }
  return res.status(200).json(matches);
};

const editMatches = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = await MatchesService.editMatches(Number(id));
  return res.status(status).json(message);
};

const updatedMatches = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const { status, message } = await MatchesService.matchesUpdated(body, Number(id));
  return res.status(status).json(message);
};

const insertMatches = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const allTeams = await Teams.findAll();
  const existingTeam = allTeams.find((e) => e.dataValues.id === Number(homeTeam));
  if (!existingTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  const createMatche = await MatchesService.insertMatches(
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  );
  return res.status(createMatche.status).json(createMatche.message);
};

export default { matchesController, editMatches, insertMatches, updatedMatches };
