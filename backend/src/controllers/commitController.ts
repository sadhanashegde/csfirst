import { Request, Response, NextFunction } from 'express';
import { getCommits, getCommitActivity, extractOwnerAndRepo } from '../services/githubService';

export const getCommitsInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    const perPage = req.body.perPage || 100;
    
    if (!url) {
      return res.status(400).json({ error: 'Repository URL is required' });
    }

    const { owner, repo } = extractOwnerAndRepo(url);
    const [commits, commitActivity] = await Promise.all([
      getCommits(owner, repo, perPage),
      getCommitActivity(owner, repo)
    ]);

    const totalCommits = commitActivity.reduce((sum, week) => sum + week.total, 0);

    res.json({ 
      commits: commits.slice(0, 50), // Limit to 50 for performance
      commitActivity,
      totalCommits
    });
  } catch (error: any) {
    next(error);
  }
};
