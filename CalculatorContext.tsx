import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CalculatorEngine, CalculatorState, AngleMode } from '../utils/calculator';

// Actions
type CalculatorAction =
  | { type: 'ADD_INPUT'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ALL' }
  | { type: 'BACKSPACE' }
  | { type: 'EVALUATE' }
  | { type: 'SET_ANGLE_MODE'; payload: AngleMode }
  | { type: 'TOGGLE_THEME' }
  | { type: 'MEMORY_STORE' }
  | { type: 'MEMORY_RECALL' }
  | { type: 'MEMORY_CLEAR' }
  | { type: 'MEMORY_ADD' }
  | { type: 'MEMORY_SUBTRACT' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_TO_HISTORY'; payload: string };

// Load initial state from localStorage
const loadInitialState = (): CalculatorState => {
  const saved = localStorage.getItem('calculator-state');
  const defaultState: CalculatorState = {
    display: '0',
    history: [],
    memory: 0,
    angleMode: 'degrees',
    isDarkMode: false,
    error: null,
  };
  
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        history: parsed.history || [],
        memory: parsed.memory || 0,
        angleMode: parsed.angleMode || 'degrees',
        isDarkMode: parsed.isDarkMode || false,
      };
    } catch (error) {
      return defaultState;
    }
  }
  
  return defaultState;
};

const initialState = loadInitialState();

// Calculator context
interface CalculatorContextType {
  state: CalculatorState;
  engine: CalculatorEngine;
  dispatch: React.Dispatch<CalculatorAction>;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

// Reducer
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  let newState: CalculatorState;
  
  switch (action.type) {
    case 'ADD_INPUT':
      if (state.error) {
        newState = {
          ...state,
          display: action.payload,
          error: null,
        };
      } else if (state.display === '0' && action.payload !== '.') {
        newState = {
          ...state,
          display: action.payload,
        };
      } else {
        newState = {
          ...state,
          display: state.display + action.payload,
        };
      }
      break;

    case 'CLEAR':
      newState = {
        ...state,
        display: '0',
        error: null,
      };
      break;

    case 'CLEAR_ALL':
      newState = {
        ...state,
        display: '0',
        history: [],
        error: null,
      };
      break;

    case 'BACKSPACE':
      if (state.display.length === 1) {
        newState = {
          ...state,
          display: '0',
        };
      } else {
        newState = {
          ...state,
          display: state.display.slice(0, -1),
        };
      }
      break;

    case 'EVALUATE':
      try {
        const engine = new CalculatorEngine(state.angleMode);
        const result = engine.evaluateExpression(state.display);
        if (result.error) {
          newState = {
            ...state,
            error: result.error,
          };
        } else {
          const formattedResult = engine.formatNumber(result.result);
          const historyEntry = `${state.display} = ${formattedResult}`;
          newState = {
            ...state,
            display: formattedResult,
            history: [historyEntry, ...state.history.slice(0, 9)], // Keep last 10 calculations
            error: null,
          };
        }
      } catch (error) {
        newState = {
          ...state,
          error: error instanceof Error ? error.message : 'Calculation error',
        };
      }
      break;

    case 'SET_ANGLE_MODE':
      newState = {
        ...state,
        angleMode: action.payload,
      };
      break;

    case 'TOGGLE_THEME':
      newState = {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
      break;

    case 'MEMORY_STORE':
      const currentValue = parseFloat(state.display);
      if (isNaN(currentValue)) {
        newState = {
          ...state,
          error: 'Invalid value for memory storage',
        };
      } else {
        newState = {
          ...state,
          memory: currentValue,
        };
      }
      break;

    case 'MEMORY_RECALL':
      newState = {
        ...state,
        display: state.memory.toString(),
      };
      break;

    case 'MEMORY_CLEAR':
      newState = {
        ...state,
        memory: 0,
      };
      break;

    case 'MEMORY_ADD':
      const addValue = parseFloat(state.display);
      if (isNaN(addValue)) {
        newState = {
          ...state,
          error: 'Invalid value for memory operation',
        };
      } else {
        newState = {
          ...state,
          memory: state.memory + addValue,
        };
      }
      break;

    case 'MEMORY_SUBTRACT':
      const subtractValue = parseFloat(state.display);
      if (isNaN(subtractValue)) {
        newState = {
          ...state,
          error: 'Invalid value for memory operation',
        };
      } else {
        newState = {
          ...state,
          memory: state.memory - subtractValue,
        };
      }
      break;

    case 'SET_ERROR':
      newState = {
        ...state,
        error: action.payload,
      };
      break;

    case 'ADD_TO_HISTORY':
      newState = {
        ...state,
        history: [action.payload, ...state.history.slice(0, 9)],
      };
      break;

    default:
      newState = state;
  }
  
  // Save to localStorage
  localStorage.setItem('calculator-state', JSON.stringify({
    history: newState.history,
    memory: newState.memory,
    angleMode: newState.angleMode,
    isDarkMode: newState.isDarkMode,
  }));
  
  // Apply theme changes
  if (newState.isDarkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  
  return newState;
}

// Provider
export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const engine = new CalculatorEngine(state.angleMode);

  return (
    <CalculatorContext.Provider value={{ state, engine, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}

// Hook
export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}