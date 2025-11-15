import React from 'react';
import { useCalculator } from '../contexts/CalculatorContext';
import { CalculatorButton } from './CalculatorButton';

export function HistoryPanel() {
  const { state, dispatch } = useCalculator();

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  if (state.history.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            History
          </h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No calculations yet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          History
        </h3>
        <CalculatorButton
          onClick={clearHistory}
          variant="danger"
          size="small"
        >
          Clear All
        </CalculatorButton>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {state.history.map((entry, index) => (
          <div
            key={index}
            className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm font-mono text-gray-700 dark:text-gray-300"
          >
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}