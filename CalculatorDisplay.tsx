import React from 'react';
import { useCalculator } from '../contexts/CalculatorContext';

interface CalculatorDisplayProps {
  className?: string;
}

export function CalculatorDisplay({ className = '' }: CalculatorDisplayProps) {
  const { state } = useCalculator();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 ${className}`}>
      {/* Memory indicator */}
      {state.memory !== 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          M: {state.memory.toExponential(4)}
        </div>
      )}
      
      {/* Error display */}
      {state.error && (
        <div className="text-sm text-red-600 dark:text-red-400 mb-2">
          Error: {state.error}
        </div>
      )}
      
      {/* Main display */}
      <div className="text-right">
        <div className="text-2xl md:text-3xl font-mono text-gray-900 dark:text-white break-all">
          {state.display}
        </div>
      </div>
      
      {/* Angle mode indicator */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
        {state.angleMode === 'degrees' ? 'DEG' : 'RAD'}
      </div>
    </div>
  );
}