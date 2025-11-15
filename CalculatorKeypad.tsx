import React from 'react';
import { CalculatorButton } from './CalculatorButton';
import { useCalculator } from '../contexts/CalculatorContext';

export function CalculatorKeypad() {
  const { dispatch } = useCalculator();

  const handleInput = (value: string) => {
    dispatch({ type: 'ADD_INPUT', payload: value });
  };

  const handleEvaluate = () => {
    dispatch({ type: 'EVALUATE' });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR' });
  };

  const handleClearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const handleBackspace = () => {
    dispatch({ type: 'BACKSPACE' });
  };

  const handleMemoryStore = () => {
    dispatch({ type: 'MEMORY_STORE' });
  };

  const handleMemoryRecall = () => {
    dispatch({ type: 'MEMORY_RECALL' });
  };

  const handleMemoryClear = () => {
    dispatch({ type: 'MEMORY_CLEAR' });
  };

  const handleMemoryAdd = () => {
    dispatch({ type: 'MEMORY_ADD' });
  };

  const handleMemorySubtract = () => {
    dispatch({ type: 'MEMORY_SUBTRACT' });
  };

  const buttonLayout = [
    // Row 1: Memory and special functions
    [
      { label: 'MC', action: handleMemoryClear, variant: 'secondary' as const },
      { label: 'MR', action: handleMemoryRecall, variant: 'secondary' as const },
      { label: 'M+', action: handleMemoryAdd, variant: 'secondary' as const },
      { label: 'M-', action: handleMemorySubtract, variant: 'secondary' as const },
      { label: 'C', action: handleClearAll, variant: 'danger' as const },
      { label: '⌫', action: handleBackspace, variant: 'danger' as const },
    ],
    // Row 2: Advanced functions
    [
      { label: 'sin', action: () => handleInput('sin('), variant: 'function' as const },
      { label: 'cos', action: () => handleInput('cos('), variant: 'function' as const },
      { label: 'tan', action: () => handleInput('tan('), variant: 'function' as const },
      { label: 'ln', action: () => handleInput('ln('), variant: 'function' as const },
      { label: 'log', action: () => handleInput('log('), variant: 'function' as const },
      { label: '√', action: () => handleInput('sqrt('), variant: 'function' as const },
    ],
    // Row 3: Numbers and basic operations
    [
      { label: '7', action: () => handleInput('7'), variant: 'secondary' as const },
      { label: '8', action: () => handleInput('8'), variant: 'secondary' as const },
      { label: '9', action: () => handleInput('9'), variant: 'secondary' as const },
      { label: '÷', action: () => handleInput('/'), variant: 'operator' as const },
      { label: '×', action: () => handleInput('*'), variant: 'operator' as const },
      { label: '(', action: () => handleInput('('), variant: 'secondary' as const },
    ],
    // Row 4: Numbers and basic operations
    [
      { label: '4', action: () => handleInput('4'), variant: 'secondary' as const },
      { label: '5', action: () => handleInput('5'), variant: 'secondary' as const },
      { label: '6', action: () => handleInput('6'), variant: 'secondary' as const },
      { label: '-', action: () => handleInput('-'), variant: 'operator' as const },
      { label: '+', action: () => handleInput('+'), variant: 'operator' as const },
      { label: ')', action: () => handleInput(')'), variant: 'secondary' as const },
    ],
    // Row 5: Numbers and decimal
    [
      { label: '1', action: () => handleInput('1'), variant: 'secondary' as const },
      { label: '2', action: () => handleInput('2'), variant: 'secondary' as const },
      { label: '3', action: () => handleInput('3'), variant: 'secondary' as const },
      { label: '.', action: () => handleInput('.'), variant: 'secondary' as const },
      { label: 'π', action: () => handleInput('pi'), variant: 'function' as const },
      { label: 'e', action: () => handleInput('e'), variant: 'function' as const },
    ],
    // Row 6: Zero and equals
    [
      { label: '0', action: () => handleInput('0'), variant: 'secondary' as const, size: 'large' as const },
      { label: 'x²', action: () => handleInput('^2'), variant: 'function' as const },
      { label: 'x³', action: () => handleInput('^3'), variant: 'function' as const },
      { label: '^', action: () => handleInput('^'), variant: 'function' as const },
      { label: '=', action: handleEvaluate, variant: 'primary' as const },
    ],
  ];

  return (
    <div className="grid gap-2">
      {buttonLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-6 gap-2">
          {row.map((button, buttonIndex) => (
            <CalculatorButton
              key={`${rowIndex}-${buttonIndex}`}
              onClick={button.action}
              variant={button.variant}
              size={button.size || 'medium'}
              ariaLabel={button.label}
            >
              {button.label}
            </CalculatorButton>
          ))}
        </div>
      ))}
    </div>
  );
}