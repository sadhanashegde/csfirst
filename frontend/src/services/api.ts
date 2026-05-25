import axios from 'axios';
import { RepositoryStats } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeRepository = async (url: string): Promise<RepositoryStats> => {
  const response = await api.post<RepositoryStats>('/api/repo', { url });
  return response.data;
};

export const getContributors = async (url: string) => {
  const response = await api.post('/api/contributors', { url });
  return response.data;
};

export const getCommits = async (url: string, perPage?: number) => {
  const response = await api.post('/api/commits', { url, perPage });
  return response.data;
};

export const getLanguages = async (url: string) => {
  const response = await api.post('/api/languages', { url });
  return response.data;
};

export const isValidGitHubUrl = (url: string): boolean => {
  const pattern = /^https?:\/\/(www\.)?github\.com\/[^\/]+\/[^\/]+\/?$/;
  return pattern.test(url);
};
