import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  if (err.response) {
    // GitHub API error
    const status = err.response.status;
    const message = err.response.data?.message || 'GitHub API error';

    if (status === 404) {
      return res.status(404).json({ error: 'Repository not found. Please check the URL and try again.' });
    }
    if (status === 403) {
      return res.status(429).json({ 
        error: 'GitHub API rate limit exceeded. Without a token, you can make 60 requests per hour. Add a GITHUB_TOKEN to your .env file for higher limits (5000/hour). Please wait and try again later.' 
      });
    }
    return res.status(status).json({ error: message });
  }

  if (err.message === 'Invalid GitHub repository URL') {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === 'ECONNABORTED') {
    return res.status(504).json({ error: 'Request timeout. The repository might be too large or the API is slow. Please try again.' });
  }

  res.status(500).json({ error: 'Internal server error' });
};
