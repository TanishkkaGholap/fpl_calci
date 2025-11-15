import React from 'react';
import { CalculatorProvider } from './contexts/CalculatorContext';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import { CalculatorKeypad } from './components/CalculatorKeypad';
import { SettingsPanel } from './components/SettingsPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { useKeyboard } from './hooks/useKeyboard';

function AppContent() {
  useKeyboard();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Engineering Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Professional-grade calculator with advanced mathematical functions
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Calculator */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
                <CalculatorDisplay />
                <CalculatorKeypad />
              </div>
            </div>

            {/* Side Panels */}
            <div className="space-y-6">
              <SettingsPanel />
              <HistoryPanel />
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Press keyboard keys for quick input • Supports complex expressions with parentheses
          </p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <CalculatorProvider>
      <AppContent />
    </CalculatorProvider>
  );
}

export default App;
