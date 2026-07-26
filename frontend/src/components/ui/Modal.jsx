import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';

/**
 * Modal Component
 * Reusable modal dialog with customizable actions
 *
 * @component
 * @example
 * <Modal isOpen={true} onClose={handleClose} title="Confirm Action">
 *   Are you sure?
 *   <Modal.Footer>
 *     <Button onClick={handleClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Modal visibility state
 * @param {Function} props.onClose - Close handler
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.size - Modal size: sm, md, lg
 * @param {boolean} props.closeButton - Show close button
 * @returns {React.ReactElement} Modal element
 */
const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md',
  closeButton = true,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={clsx(
          'relative bg-white dark:bg-secondary-800 rounded-lg shadow-xl w-full mx-4',
          sizeClasses[size],
          'animate-scale-in'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
            {title}
          </h2>
          {closeButton && (
            <button
              onClick={onClose}
              className="text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors"
            >
              <FiX size={24} />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.Footer = ({ children, className = '' }) => (
  <div className={clsx('flex items-center justify-end gap-3 mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700', className)}>
    {children}
  </div>
);

export default Modal;
