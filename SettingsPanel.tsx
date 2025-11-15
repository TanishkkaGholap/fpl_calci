import React from 'react';
import { useCalculator } from '../contexts/CalculatorContext';
import { CalculatorButton } from './CalculatorButton';

export function SettingsPanel() {
  const { state, dispatch } = useCalculator();

  const toggleAngleMode = () => {
    dispatch({
      type: 'SET_ANGLE_MODE',
      payload: state.angleMode === 'degrees' ? 'radians' : 'degrees',
    });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Settings
      </h3>
      
      <div className="space-y-4">
        {/* Angle Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Angle Mode
          </label>
          <div className="flex space-x-2">
            <CalculatorButton
              onClick={toggleAngleMode}
              variant={state.angleMode === 'degrees' ? 'primary' : 'secondary'}
              size="small"
            >
              Degrees
            </CalculatorButton>
            <CalculatorButton
              onClick={toggleAngleMode}
              variant={state.angleMode === 'radians' ? 'primary' : 'secondary'}
              size="small"
            >
              Radians
            </CalculatorButton>
          </div>
        </div>

        {/* Theme Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <div className="flex space-x-2">
            <CalculatorButton
              onClick={toggleTheme}
              variant={!state.isDarkMode ? 'primary' : 'secondary'}
              size="small"
            >
              Light
            </CalculatorButton>
            <CalculatorButton
              onClick={toggleTheme}
              variant={state.isDarkMode ? 'primary' : 'secondary'}
              size="small"
            >
              Dark
            </CalculatorButton>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Keyboard Shortcuts
          </label>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div>Enter: Evaluate expression</div>
            <div>Escape: Clear all</div>
            <div>Backspace: Delete last character</div>
            <div>Numbers 0-9: Input numbers</div>
            <div>+ - * /: Basic operations</div>
          </div>
        </div>
      </div>
    </div>
  );
}