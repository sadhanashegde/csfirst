import { Request, Response, NextFunction } from 'express';
import { getRepository, extractOwnerAndRepo, calculateHealthScore } from '../services/githubService';
import { getContributors } from '../services/githubService';
import { getLanguages } from '../services/githubService';
import { getCommitActivity } from '../services/githubService';
import { RepositoryStats, CommitActivity } from '../types';

export const getRepoInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'Repository URL is required' });
    }

    const { owner, repo } = extractOwnerAndRepo(url);

    const [repository, contributors, languagesRaw] = await Promise.all([
      getRepository(owner, repo),
      getContributors(owner, repo),
      getLanguages(owner, repo)
    ]);

    // Fetch commit activity separately with error handling
    let commitActivity: CommitActivity[] = [];
    try {
      commitActivity = await getCommitActivity(owner, repo);
    } catch (err) {
      console.log('Commit activity not available for this repository');
      commitActivity = [];
    }

    // Calculate language percentages
    const totalBytes = Object.values(languagesRaw).reduce((sum, bytes) => sum + bytes, 0);
    const languages = Object.entries(languagesRaw).map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / totalBytes) * 100
    }));

    // Calculate health score
    const healthScore = calculateHealthScore(repository, contributors);

    // Find top contributor
    const topContributor = contributors.length > 0 
      ? contributors.reduce((prev, current) => (prev.contributions > current.contributions) ? prev : current)
      : null;

    // Calculate average commits per week
    const activityArray = Array.isArray(commitActivity) ? commitActivity : [];
    const totalCommits = activityArray.reduce((sum, week) => sum + week.total, 0);
    const avgCommitsPerWeek = activityArray.length > 0 ? totalCommits / activityArray.length : 0;

    // Find peak commit day
    const allDays = activityArray.flatMap(week => week.days);
    const maxCommits = allDays.length > 0 ? Math.max(...allDays) : 0;
    const peakCommitDay = maxCommits > 0 ? `${maxCommits} commits in a single day` : 'No commit data';

    const stats: RepositoryStats = {
      repository,
      contributors,
      languages,
      commitActivity,
      healthScore,
      topContributor,
      peakCommitDay,
      avgCommitsPerWeek: Math.round(avgCommitsPerWeek * 100) / 100
    };

    res.json(stats);
  } catch (error: any) {
    next(error);
  }
};
