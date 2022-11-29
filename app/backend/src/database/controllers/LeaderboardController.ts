import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboadService';

const leaderboardController = async (_req: Request, res: Response) => {
  const matches = await LeaderboardService.leaderboardService();
  return res.status(200).json(matches);
};

export default { leaderboardController };
