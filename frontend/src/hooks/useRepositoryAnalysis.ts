import { useState, useCallback } from 'react';
import { analyzeRepository } from '../services/api';
import { RepositoryStats } from '../types';

export const useRepositoryAnalysis = () => {
  const [data, setData] = useState<RepositoryStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Analyzing repository:', url);
      const result = await analyzeRepository(url);
      console.log('Repository data received:', result);
      
      // Validate that we have the required data
      if (!result || !result.repository) {
        throw new Error('Invalid repository data received');
      }
      
      setData(result);
    } catch (err: any) {
      console.error('Error analyzing repository:', err);
      const errorMessage = err.response?.data?.error || 
        err.message || 
        'Failed to analyze repository. Please check if the repository exists and is public.';
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, analyze, reset };
};
