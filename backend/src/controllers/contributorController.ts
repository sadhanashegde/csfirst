import { Request, Response, NextFunction } from 'express';
import { getContributors, extractOwnerAndRepo } from '../services/githubService';

export const getContributorsInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'Repository URL is required' });
    }

    const { owner, repo } = extractOwnerAndRepo(url);
    const contributors = await getContributors(owner, repo);

    res.json({ contributors });
  } catch (error: any) {
    next(error);
  }
};
