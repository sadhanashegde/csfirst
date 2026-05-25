import { Request, Response, NextFunction } from 'express';
import { getLanguages, extractOwnerAndRepo } from '../services/githubService';

export const getLanguagesInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'Repository URL is required' });
    }

    const { owner, repo } = extractOwnerAndRepo(url);
    const languagesRaw = await getLanguages(owner, repo);

    const totalBytes = Object.values(languagesRaw).reduce((sum, bytes) => sum + bytes, 0);
    const languages = Object.entries(languagesRaw).map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / totalBytes) * 100
    }));

    res.json({ languages });
  } catch (error: any) {
    next(error);
  }
};
