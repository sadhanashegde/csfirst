import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from './hooks/useDarkMode';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      <HomePage />
    </div>
  );
};

export default App;
