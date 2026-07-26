import React from 'react';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';

/**
 * ConfirmDialog Component
 * Confirmation dialog for destructive actions
 *
 * @component
 * @example
 * <ConfirmDialog
 *   isOpen={true}
 *   title="Delete Item?"
 *   message="This action cannot be undone."
 *   onConfirm={handleDelete}
 *   onCancel={handleCancel}
 * />
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Dialog visibility
 * @param {string} props.title - Dialog title
 * @param {string} props.message - Confirmation message
 * @param {Function} props.onConfirm - Confirm handler
 * @param {Function} props.onCancel - Cancel handler
 * @param {string} props.confirmText - Confirm button text
 * @param {string} props.cancelText - Cancel button text
 * @param {boolean} props.isDangerous - Dangerous action styling
 * @returns {React.ReactElement} Confirmation dialog
 */
const ConfirmDialog = ({
  isOpen = false,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-secondary-800 rounded-lg shadow-xl max-w-md w-full mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
            {title}
          </h2>
          <button
            onClick={onCancel}
            className="text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Message */}
        <div className="p-6">
          <p className="text-secondary-600 dark:text-secondary-400">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-secondary-200 dark:border-secondary-700">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={clsx(
              'px-4 py-2 rounded-lg text-white transition-colors',
              isDangerous
                ? 'bg-error-600 hover:bg-error-700'
                : 'bg-primary-600 hover:bg-primary-700'
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
