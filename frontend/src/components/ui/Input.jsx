import React from 'react';
import clsx from 'clsx';

/**
 * Input Component
 * Reusable text input field with validation states
 *
 * @component
 * @example
 * <Input type="email" placeholder="Enter email" />
 * <Input error="Email is required" />
 * <Input success label="Username" />
 *
 * @param {Object} props - Component props
 * @param {string} props.type - Input type (text, email, password, number, etc.)
 * @param {string} props.label - Label text
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {string} props.success - Success message
 * @param {string} props.hint - Helper text
 * @param {boolean} props.disabled - Disable input
 * @param {boolean} props.required - Mark as required
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Input element with label and messages
 */
const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  hint,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const inputClassName = clsx(
    'w-full px-4 py-2 border rounded-lg bg-white dark:bg-secondary-800',
    'text-secondary-900 dark:text-secondary-100',
    'placeholder-secondary-400 dark:placeholder-secondary-500',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
    disabled && 'opacity-50 cursor-not-allowed bg-secondary-100 dark:bg-secondary-700',
    error ? 'border-error-500 focus:ring-error-500' : 'border-secondary-300 dark:border-secondary-600 focus:ring-primary-500 focus:border-transparent',
    success && !error && 'border-success-500 focus:ring-success-500',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          {label}
          {required && <span className="text-error-600 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error-600 dark:text-error-400">{error}</p>
      )}
      {success && !error && (
        <p className="mt-1 text-sm text-success-600 dark:text-success-400">{success}</p>
      )}
      {hint && !error && !success && (
        <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">{hint}</p>
      )}
    </div>
  );
};

export default Input;
