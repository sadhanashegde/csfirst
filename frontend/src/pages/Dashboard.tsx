import React from 'react';
import { ArrowLeft, Star, GitFork, Eye, AlertCircle, Calendar, HardDrive, Code, Activity } from 'lucide-react';
import { RepositoryStats } from '../types';
import { formatDate, formatNumber, formatSize } from '../utils/formatters';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import HealthScore from '../components/HealthScore';
import ContributorChart from '../components/ContributorChart';
import CommitActivityChart from '../components/CommitActivityChart';
import LanguageChart from '../components/LanguageChart';
import ContributorList from '../components/ContributorList';

interface DashboardProps {
  data: RepositoryStats;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
  const { repository, contributors, languages, commitActivity, healthScore, topContributor, peakCommitDay, avgCommitsPerWeek } = data;

  // Ensure data exists and has required fields
  if (!repository) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg">No repository data available</p>
          <button onClick={onReset} className="mt-4 text-primary-600 hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onReset}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-md">
              {repository.full_name}
            </h1>
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Repository Info */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-start space-x-4 mb-4">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              className="w-16 h-16 rounded-full shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{repository.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                by <span className="font-medium">{repository.owner.login}</span>
              </p>
              {repository.description && (
                <p className="text-gray-700 dark:text-gray-300 mt-2">{repository.description}</p>
              )}
            </div>
          </div>

          {/* Topics */}
          {repository.topics && repository.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {repository.topics.slice(0, 5).map((topic) => (
                <span
                  key={topic}
                  className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Star} label="Stars" value={formatNumber(repository.stargazers_count)} />
          <StatCard icon={GitFork} label="Forks" value={formatNumber(repository.forks_count)} />
          <StatCard icon={Eye} label="Watchers" value={formatNumber(repository.watchers_count)} />
          <StatCard icon={AlertCircle} label="Open Issues" value={formatNumber(repository.open_issues_count)} />
        </div>

        {/* Health Score and Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="flex items-center justify-center">
            <HealthScore score={healthScore} />
          </Card>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Created</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatDate(repository.created_at)}
              </p>
            </Card>
            <Card>
              <div className="flex items-center space-x-3 mb-2">
                <Activity className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatDate(repository.updated_at)}
              </p>
            </Card>
            <Card>
              <div className="flex items-center space-x-3 mb-2">
                <HardDrive className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Size</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatSize(repository.size)}
              </p>
            </Card>
            <Card>
              <div className="flex items-center space-x-3 mb-2">
                <Code className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Primary Language</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {repository.language || 'N/A'}
              </p>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Commit Activity</h3>
            {Array.isArray(commitActivity) && commitActivity.length > 0 ? (
              <CommitActivityChart commitActivity={commitActivity} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No commit activity data available</p>
            )}
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Language Distribution</h3>
            {Array.isArray(languages) && languages.length > 0 ? (
              <LanguageChart languages={languages} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No language data available</p>
            )}
          </Card>
        </div>

        {/* Contributors Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Contributors</h3>
            {Array.isArray(contributors) && contributors.length > 0 ? (
              <ContributorChart contributors={contributors} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No contributor data available</p>
            )}
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contributor List</h3>
            {Array.isArray(contributors) && contributors.length > 0 ? (
              <ContributorList contributors={contributors} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No contributor data available</p>
            )}
          </Card>
        </div>

        {/* Additional Insights */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Top Contributor</p>
              {topContributor && (
                <div className="flex items-center space-x-2">
                  <img
                    src={topContributor.avatar_url}
                    alt={topContributor.login}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {topContributor.login}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Peak Commit Day</p>
              <p className="font-medium text-gray-900 dark:text-white">{peakCommitDay}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Commits/Week</p>
              <p className="font-medium text-gray-900 dark:text-white">{avgCommitsPerWeek.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        {/* License Info */}
        {repository.license && (
          <Card>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <Code className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">License</p>
                <p className="font-medium text-gray-900 dark:text-white">{repository.license.name}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
