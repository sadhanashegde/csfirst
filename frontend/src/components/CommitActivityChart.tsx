import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { CommitActivity } from '../types';

interface CommitActivityChartProps {
  commitActivity: CommitActivity[];
}

const CommitActivityChart: React.FC<CommitActivityChartProps> = ({ commitActivity }) => {
  const data = commitActivity.map((week) => ({
    week: new Date(week.week * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    commits: week.total
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <defs>
            <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis 
            dataKey="week"
            angle={-45}
            textAnchor="end"
            height={80}
            className="fill-gray-600 dark:fill-gray-400 text-xs"
          />
          <YAxis className="fill-gray-600 dark:fill-gray-400" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="commits" 
            stroke="#0ea5e9" 
            fillOpacity={1} 
            fill="url(#colorCommits)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitActivityChart;
