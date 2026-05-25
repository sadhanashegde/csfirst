import React from 'react';
import { getHealthScoreColor, getHealthScoreBg } from '../utils/formatters';

interface HealthScoreProps {
  score: number;
}

const HealthScore: React.FC<HealthScoreProps> = ({ score }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${getHealthScoreBg(score)} transition-all duration-500 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-bold ${getHealthScoreColor(score)}`}>
            {score}
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Repository Health Score
      </p>
    </div>
  );
};

export default HealthScore;
