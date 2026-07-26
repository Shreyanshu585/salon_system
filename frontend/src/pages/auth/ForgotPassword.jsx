/**
 * Forgot Password Page
 * Request password reset via email
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Button, Input, Card, Alert, Loader } from '@components/ui';
import useAuth from '@hooks/useAuth';
import { validateEmail } from '@utils/validation';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { handleForgotPassword, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /**
   * Validate form
   */
  const validateForm = () => {
    setError('');

    if (!email) {
      setError('Email is required');
      return false;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await handleForgotPassword(email);

    if (result.success) {
      setSuccess(true);
      setSubmitted(true);
    } else {
      setError(result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-secondary-900 dark:to-secondary-800 flex items-center justify-center p-4">
        <Loader size="lg" text="Sending reset link..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-secondary-900 dark:to-secondary-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            Reset Password
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Enter your email to receive a password reset link
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Error Alert */}
            {error && (
              <Alert variant="error" className="mb-6">
                {error}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-secondary-400" size={20} />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    error={error && email === '' ? error : ''}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
              >
                Send Reset Link
              </Button>
            </form>

            {/* Back to Login */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium mt-6 text-sm"
            >
              <FiArrowLeft size={16} />
              Back to Login
            </Link>
          </>
        ) : (
          <>
            {/* Success Message */}
            <Alert variant="success" className="mb-6">
              Check your email for a password reset link. The link will expire in 1 hour.
            </Alert>

            {/* Info Box */}
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-primary-800 dark:text-primary-200">
                <strong>Didn't receive the email?</strong> Check your spam folder or try entering a different email address.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate('/login')}
              >
                Return to Login
              </Button>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                  setError('');
                }}
              >
                Try Another Email
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
