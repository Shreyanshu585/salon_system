/**
 * Validation Utilities
 * Common validation functions
 */

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * At least 8 characters with uppercase, lowercase, and numbers
 */
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s()+-]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate form field is not empty
 */
export const validateRequired = (value) => {
  return value?.trim().length > 0;
};

/**
 * Validate minimum length
 */
export const validateMinLength = (value, min) => {
  return value?.length >= min;
};

/**
 * Validate maximum length
 */
export const validateMaxLength = (value, max) => {
  return value?.length <= max;
};

/**
 * Validate strings match
 */
export const validateMatch = (value1, value2) => {
  return value1 === value2;
};

/**
 * Validate URL format
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
