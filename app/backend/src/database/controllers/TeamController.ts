import { Request, Response } from 'express';
import Model from '../models/Teams';
import teamService from '../services/TeamService';

const teamController = async (_req: Request, res: Response) => {
  const team = await Model.findAll();
  return res.status(200).json(team);
};

const teamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idTeam = await teamService.teamById(Number(id));
  return res.status(200).json(idTeam);
};

export default { teamController, teamById };
