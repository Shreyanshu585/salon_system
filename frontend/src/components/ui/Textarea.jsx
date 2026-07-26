import React from 'react';
import clsx from 'clsx';

/**
 * Textarea Component
 * Reusable textarea field with validation states
 *
 * @component
 * @example
 * <Textarea label="Comments" placeholder="Enter your comments..." />
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Label text
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Textarea value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {number} props.rows - Number of rows (default: 4)
 * @param {boolean} props.disabled - Disable textarea
 * @returns {React.ReactElement} Textarea element
 */
const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
  disabled = false,
  className = '',
  ...props
}) => {
  const textareaClassName = clsx(
    'w-full px-4 py-2 border rounded-lg bg-white dark:bg-secondary-800',
    'text-secondary-900 dark:text-secondary-100',
    'placeholder-secondary-400 dark:placeholder-secondary-500',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
    'resize-vertical',
    disabled && 'opacity-50 cursor-not-allowed',
    error ? 'border-error-500 focus:ring-error-500' : 'border-secondary-300 dark:border-secondary-600 focus:ring-primary-500',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={textareaClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error-600 dark:text-error-400">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
