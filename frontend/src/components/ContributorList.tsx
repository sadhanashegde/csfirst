import React from 'react';
import { Contributor } from '../types';
import { formatNumber } from '../utils/formatters';

interface ContributorListProps {
  contributors: Contributor[];
}

const ContributorList: React.FC<ContributorListProps> = ({ contributors }) => {
  const topContributors = contributors.slice(0, 8);

  return (
    <div className="space-y-3">
      {topContributors.map((contributor) => (
        <div 
          key={contributor.id}
          className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <img 
            src={contributor.avatar_url} 
            alt={contributor.login}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">{contributor.login}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatNumber(contributor.contributions)} contributions
            </p>
          </div>
          <a 
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContributorList;
