import React, { useState } from 'react';
import { Search, Github } from 'lucide-react';
import { useRepositoryAnalysis } from '../hooks/useRepositoryAnalysis';
import { isValidGitHubUrl } from '../services/api';
import Dashboard from './Dashboard';

const HomePage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const { data, loading, error, analyze, reset } = useRepositoryAnalysis();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError('');

    if (!url.trim()) {
      setUrlError('Please enter a repository URL');
      return;
    }

    if (!isValidGitHubUrl(url)) {
      setUrlError('Please enter a valid GitHub repository URL (e.g., https://github.com/owner/repo)');
      return;
    }

    await analyze(url);
  };

  const handleReset = () => {
    setUrl('');
    reset();
  };

  if (data) {
    return <Dashboard data={data} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Github className="w-16 h-16 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              GitHub Repository Insights
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Analyze and visualize repository metrics with beautiful dashboards
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 animate-slide-up">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter GitHub repository URL (e.g., https://github.com/facebook/react)"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              
              {urlError && (
                <p className="mt-3 text-red-500 text-sm flex items-center">
                  <span className="mr-1">⚠</span> {urlError}
                </p>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Analyze Repository</span>
                  </>
                )}
              </button>
            </form>

            {/* Example URLs */}
            <div className="mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'https://github.com/facebook/react',
                  'https://github.com/torvalds/linux',
                  'https://github.com/microsoft/vscode'
                ].map((exampleUrl) => (
                  <button
                    key={exampleUrl}
                    onClick={() => setUrl(exampleUrl)}
                    className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {exampleUrl.split('/').pop()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📊', title: 'Detailed Analytics', desc: 'Comprehensive repository metrics and insights' },
              { icon: '👥', title: 'Contributor Stats', desc: 'Track top contributors and their impact' },
              { icon: '📈', title: 'Activity Trends', desc: 'Visualize commit patterns over time' }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
