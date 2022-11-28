import { Request, Response } from 'express';
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

export default { matchesController };
