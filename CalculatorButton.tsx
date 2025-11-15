import React from 'react';

interface CalculatorButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'function' | 'operator';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  ariaLabel?: string;
}

export function CalculatorButton({
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  ariaLabel,
}: CalculatorButtonProps) {
  const baseClasses = 'rounded-lg font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    function: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500',
    operator: 'bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500',
  };
  
  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}