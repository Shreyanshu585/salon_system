import React from 'react';
import clsx from 'clsx';

/**
 * Button Component
 * Reusable button with multiple variants and sizes
 *
 * @component
 * @example
 * <Button variant="primary" size="md">Click Me</Button>
 * <Button variant="outline" disabled>Disabled</Button>
 *
 * @param {Object} props - Component props
 * @param {string} props.variant - Button style: primary, secondary, outline, ghost, success, warning, error
 * @param {string} props.size - Button size: sm, md, lg
 * @param {boolean} props.disabled - Disable button
 * @param {boolean} props.loading - Show loading state
 * @param {boolean} props.fullWidth - Make button full width
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @returns {React.ReactElement} Button element
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-400',
    secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500 dark:bg-secondary-700 dark:text-secondary-100 dark:hover:bg-secondary-600 disabled:bg-secondary-100',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20 disabled:border-primary-300 disabled:text-primary-300',
    ghost: 'text-secondary-700 hover:bg-secondary-100 focus:ring-secondary-500 dark:text-secondary-300 dark:hover:bg-secondary-800 disabled:text-secondary-400',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 disabled:bg-success-400',
    warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500 disabled:bg-warning-400',
    error: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 disabled:bg-error-400',
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const finalClassName = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50 cursor-not-allowed',
    className
  );

  return (
    <button
      className={finalClassName}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
