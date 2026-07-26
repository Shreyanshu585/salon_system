import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import clsx from 'clsx';

/**
 * Alert Component
 * Reusable alert message component
 *
 * @component
 * @example
 * <Alert variant="info">Information message</Alert>
 * <Alert variant="success" title="Success!">Operation completed</Alert>
 * <Alert variant="error" onClose={() => {}}>
 *   Error message with close button
 * </Alert>
 *
 * @param {Object} props - Component props
 * @param {string} props.variant - Alert type: info, success, warning, error
 * @param {string} props.title - Alert title
 * @param {React.ReactNode} props.children - Alert message
 * @param {Function} props.onClose - Close handler
 * @returns {React.ReactElement} Alert element
 */
const Alert = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const variants = {
    info: {
      bg: 'bg-primary-50 dark:bg-primary-900/20',
      border: 'border-primary-500',
      text: 'text-primary-800 dark:text-primary-300',
      icon: <FiInfo className="w-5 h-5" />,
    },
    success: {
      bg: 'bg-success-50 dark:bg-success-900/20',
      border: 'border-success-500',
      text: 'text-success-800 dark:text-success-300',
      icon: <FiCheckCircle className="w-5 h-5" />,
    },
    warning: {
      bg: 'bg-warning-50 dark:bg-warning-900/20',
      border: 'border-warning-500',
      text: 'text-warning-800 dark:text-warning-300',
      icon: <FiAlertTriangle className="w-5 h-5" />,
    },
    error: {
      bg: 'bg-error-50 dark:bg-error-900/20',
      border: 'border-error-500',
      text: 'text-error-800 dark:text-error-300',
      icon: <FiAlertCircle className="w-5 h-5" />,
    },
  };

  const config = variants[variant];

  return (
    <div
      className={clsx(
        'p-4 rounded-lg border-l-4 flex items-start gap-3',
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <p className="text-sm">{children}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-current hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
