/**
 * Reset Password Page
 * Reset password with token from email
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import { Button, Input, Card, Alert, Loader } from '@components/ui';
import useAuth from '@hooks/useAuth';
import { validatePassword } from '@utils/validation';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleResetPassword, loading } = useAuth();

  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  /**
   * Check if token is valid
   */
  useEffect(() => {
    if (!token) {
      setServerError('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  /**
   * Validate form fields
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    const result = await handleResetPassword(
      token,
      formData.password,
      formData.confirmPassword
    );

    if (result.success) {
      setSuccess(true);
    } else {
      setServerError(result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-secondary-900 dark:to-secondary-800 flex items-center justify-center p-4">
        <Loader size="lg" text="Resetting password..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-secondary-900 dark:to-secondary-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            Create New Password
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Enter your new password below
          </p>
        </div>

        {!success ? (
          <>
            {/* Server Error */}
            {serverError && (
              <Alert variant="error" className="mb-6">
                {serverError}
              </Alert>
            )}

            {/* Form */}
            {!serverError && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3.5 text-secondary-400" size={20} />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      error={errors.password}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                    At least 8 characters with uppercase, lowercase, and numbers
                  </p>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3.5 text-secondary-400" size={20} />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      error={errors.confirmPassword}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3.5 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                    >
                      {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  className="mt-6"
                >
                  Reset Password
                </Button>
              </form>
            )}
          </>
        ) : (
          <>
            {/* Success Message */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-100 dark:bg-success-900/30 mb-4">
                <FiCheck size={32} className="text-success-600 dark:text-success-400" />
              </div>
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                Password Reset Successful
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
            </div>

            {/* Action Button */}
            <Link to="/login">
              <Button variant="primary" fullWidth>
                Return to Login
              </Button>
            </Link>
          </>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
