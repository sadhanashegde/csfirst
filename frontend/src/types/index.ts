export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  owner: {
    login: string;
    avatar_url: string;
    type: string;
  };
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string | null;
  license: {
    key: string;
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  topics: string[];
  default_branch: string;
  html_url: string;
}

export interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

export interface Language {
  name: string;
  bytes: number;
  percentage: number;
}

export interface CommitActivity {
  days: number[];
  total: number;
  week: number;
}

export interface RepositoryStats {
  repository: Repository;
  contributors: Contributor[];
  languages: Language[];
  commitActivity: CommitActivity[];
  healthScore: number;
  topContributor: Contributor | null;
  peakCommitDay: string;
  avgCommitsPerWeek: number;
}

export interface ApiError {
  error: string;
}
