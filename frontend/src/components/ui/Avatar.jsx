import React from 'react';
import clsx from 'clsx';

/**
 * Avatar Component
 * Reusable avatar image component with fallback
 *
 * @component
 * @example
 * <Avatar src="/profile.jpg" alt="User" size="md" />
 * <Avatar initials="JS" size="lg" />
 *
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {string} props.initials - Fallback initials
 * @param {string} props.size - Avatar size: xs, sm, md, lg, xl
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Avatar element
 */
const Avatar = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-full font-semibold',
        'bg-gradient-to-br from-primary-400 to-primary-600 text-white',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        initials || alt.charAt(0).toUpperCase()
      )}
    </div>
  );
};

export default Avatar;
