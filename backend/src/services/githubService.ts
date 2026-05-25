import axios, { AxiosError } from 'axios';
import NodeCache from 'node-cache';
import { Repository, Contributor, Commit, Language, CommitActivity } from '../types';

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
  },
  timeout: 10000 // 10 second timeout to prevent hanging
});

export const extractOwnerAndRepo = (url: string): { owner: string; repo: string } => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error('Invalid GitHub repository URL');
  }
  return { owner: match[1], repo: match[2].replace('.git', '') };
};

export const getRepository = async (owner: string, repo: string): Promise<Repository> => {
  const cacheKey = `repo:${owner}:${repo}`;
  const cached = cache.get<Repository>(cacheKey);
  if (cached) return cached;

  const response = await githubApi.get<Repository>(`/repos/${owner}/${repo}`);
  cache.set(cacheKey, response.data);
  return response.data;
};

export const getContributors = async (owner: string, repo: string): Promise<Contributor[]> => {
  const cacheKey = `contributors:${owner}:${repo}`;
  const cached = cache.get<Contributor[]>(cacheKey);
  if (cached) return cached;

  const response = await githubApi.get<Contributor[]>(`/repos/${owner}/${repo}/contributors`);
  cache.set(cacheKey, response.data);
  return response.data;
};

export const getCommits = async (owner: string, repo: string, perPage: number = 100): Promise<Commit[]> => {
  const cacheKey = `commits:${owner}:${repo}:${perPage}`;
  const cached = cache.get<Commit[]>(cacheKey);
  if (cached) return cached;

  const response = await githubApi.get<Commit[]>(`/repos/${owner}/${repo}/commits`, {
    params: { per_page: perPage }
  });
  cache.set(cacheKey, response.data);
  return response.data;
};

export const getLanguages = async (owner: string, repo: string): Promise<Record<string, number>> => {
  const cacheKey = `languages:${owner}:${repo}`;
  const cached = cache.get<Record<string, number>>(cacheKey);
  if (cached) return cached;

  const response = await githubApi.get<Record<string, number>>(`/repos/${owner}/${repo}/languages`);
  cache.set(cacheKey, response.data);
  return response.data;
};

export const getCommitActivity = async (owner: string, repo: string): Promise<CommitActivity[]> => {
  const cacheKey = `commitActivity:${owner}:${repo}`;
  const cached = cache.get<CommitActivity[]>(cacheKey);
  if (cached) return cached;

  const response = await githubApi.get<CommitActivity[]>(`/repos/${owner}/${repo}/stats/commit_activity`);
  cache.set(cacheKey, response.data);
  return response.data;
};

export const calculateHealthScore = (repo: Repository, contributors: Contributor[]): number => {
  let score = 0;
  
  // Stars contribution (max 20 points)
  score += Math.min(repo.stargazers_count / 100, 20);
  
  // Forks contribution (max 15 points)
  score += Math.min(repo.forks_count / 50, 15);
  
  // Open issues (inverse, max 15 points)
  score += Math.max(15 - repo.open_issues_count / 10, 0);
  
  // Recent activity (max 20 points)
  const lastUpdate = new Date(repo.updated_at);
  const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
  score += Math.max(20 - daysSinceUpdate / 30, 0);
  
  // Contributor count (max 20 points)
  score += Math.min(contributors.length / 5, 20);
  
  // Has description (max 10 points)
  if (repo.description) score += 10;
  
  return Math.min(Math.round(score), 100);
};
