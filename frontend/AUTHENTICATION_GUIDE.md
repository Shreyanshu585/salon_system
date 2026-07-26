# Step 6: Authentication Module Guide

## 📋 Overview

This guide covers the complete authentication system for the Salon Booking System frontend.

## 🔐 Components Created

### 1. **Authentication Service** (`authService.js`)

Centralized service for all authentication API calls.

**Methods:**

```javascript
// Login
const result = await authService.login(email, password);

// Register
const result = await authService.register(userData);

// Forgot Password
const result = await authService.forgotPassword(email);

// Reset Password
const result = await authService.resetPassword(token, password, confirmPassword);

// Verify Email
const result = await authService.verifyEmail(email, otp);

// Logout
const result = await authService.logout();

// Get Current User
const user = await authService.getCurrentUser();

// Refresh Token
const newToken = await authService.refreshToken();

// Check Authentication
const isAuth = authService.isAuthenticated();

// Get Token
const token = authService.getToken();

// Get User
const user = authService.getUser();
```

**Features:**
- Automatic token storage in localStorage
- Error handling with meaningful messages
- User data caching
- Token refresh support

---

### 2. **Axios Configuration** (`axiosConfig.js`)

Configured axios instance with interceptors.

**Features:**

- **Request Interceptor:**
  - Automatically adds authentication token to headers
  - Sets appropriate content-type

- **Response Interceptor:**
  - Handles 401 Unauthorized responses
  - Automatically refreshes token
  - Redirects to login on token refresh failure
  - Global error handling

**Usage:**
```javascript
import axiosInstance from '@services/axiosConfig';

const response = await axiosInstance.get('/endpoint');
```

---

### 3. **useAuth Hook** (`useAuth.js`)

Custom React hook for authentication operations.

**State:**
```javascript
const {
  user,              // Current user object
  loading,           // Loading state
  error,             // Error message
  isAuthenticated    // Auth status
} = useAuth();
```

**Methods:**
```javascript
const {
  handleLogin,           // Login function
  handleRegister,        // Register function
  handleLogout,          // Logout function
  handleForgotPassword,  // Forgot password function
  handleResetPassword,   // Reset password function
  checkAuth              // Check auth status
} = useAuth();
```

**Usage:**
```javascript
import useAuth from '@hooks/useAuth';

const MyComponent = () => {
  const { user, isAuthenticated, handleLogin } = useAuth();

  const login = async () => {
    const result = await handleLogin('email@test.com', 'password');
    if (result.success) {
      // Login successful
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Logged in as {user.firstName}</p>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};
```

---

### 4. **Auth Redux Slice** (`authSlice.js`)

Redux slice for global authentication state management.

**State Structure:**
```javascript
{
  auth: {
    user: { /* user object */ },
    isAuthenticated: true/false,
    loading: true/false,
    error: null,
    message: null
  }
}
```

**Actions:**
```javascript
dispatch(loginStart());
dispatch(loginSuccess(user));
dispatch(loginFailure(error));
dispatch(registerStart());
dispatch(registerSuccess(user));
dispatch(registerFailure(error));
dispatch(logout());
dispatch(setUser(user));
dispatch(clearError());
dispatch(clearMessage());
```

---

### 5. **Login Page** (`Login.jsx`)

User login form with email and password.

**Features:**
- Email validation
- Password validation
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Sign up link
- Server error handling
- Loading state
- Auto-redirect if authenticated
- Dark mode support

**Usage:**
```javascript
import { Login } from '@pages/auth';

// Use in routing
<Route path="/login" element={<Login />} />
```

**Form Fields:**
- Email address (required, validated)
- Password (required, minimum 6 characters)
- Remember me (checkbox)
- Forgot password (link)

---

### 6. **Register Page** (`Register.jsx`)

User registration form with validation.

**Features:**
- First name and last name fields
- Email validation
- Phone number validation
- Password strength validation
- Confirm password matching
- Terms & conditions checkbox
- Show/hide password toggle
- Sign in link
- Server error handling
- Loading state
- Dark mode support

**Usage:**
```javascript
import { Register } from '@pages/auth';

// Use in routing
<Route path="/register" element={<Register />} />
```

**Form Fields:**
- First name (required)
- Last name (required)
- Email address (required, validated)
- Phone number (required, validated)
- Password (required, strong password validation)
- Confirm password (required, must match)
- Terms & conditions (required, checkbox)

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

---

### 7. **Forgot Password Page** (`ForgotPassword.jsx`)

Request password reset via email.

**Features:**
- Email input field
- Email validation
- Success message after submission
- Option to try another email
- Return to login link
- Loading state
- Server error handling
- Dark mode support

**Usage:**
```javascript
import { ForgotPassword } from '@pages/auth';

// Use in routing
<Route path="/forgot-password" element={<ForgotPassword />} />
```

**Flow:**
1. User enters email
2. Request sent to backend
3. Success message displayed
4. User directed to check email
5. Email contains reset link with token

---

### 8. **Reset Password Page** (`ResetPassword.jsx`)

Reset password using token from email.

**Features:**
- Token validation from URL
- New password input
- Confirm password input
- Password strength validation
- Show/hide password toggle
- Password match validation
- Success message
- Redirect to login
- Server error handling
- Loading state
- Dark mode support

**Usage:**
```javascript
import { ResetPassword } from '@pages/auth';

// Use in routing
<Route path="/reset-password" element={<ResetPassword />} />
```

**URL Format:**
```
/reset-password?token=abc123xyz
```

**Flow:**
1. User clicks link from email
2. Token extracted from URL
3. User enters new password
4. Password validated
5. Password reset on backend
6. Success message shown
7. User redirected to login

---

### 9. **Validation Utilities** (`validation.js`)

Common validation functions.

**Functions:**

```javascript
// Email validation
validateEmail(email) // Returns: boolean

// Password strength (8+ chars, uppercase, lowercase, number)
validatePassword(password) // Returns: boolean

// Phone number validation
validatePhone(phone) // Returns: boolean

// Required field validation
validateRequired(value) // Returns: boolean

// Minimum length validation
validateMinLength(value, min) // Returns: boolean

// Maximum length validation
validateMaxLength(value, max) // Returns: boolean

// Match two values
validateMatch(value1, value2) // Returns: boolean

// URL validation
validateUrl(url) // Returns: boolean
```

**Usage:**
```javascript
import { validateEmail, validatePassword } from '@utils/validation';

if (validateEmail(userEmail) && validatePassword(userPassword)) {
  // Proceed with login
}
```

---

## 🔄 Authentication Flow

### Login Flow
```
Login Page
    ↓
Validate Form
    ↓
Call authService.login()
    ↓
Store Token & User
    ↓
Update Redux State
    ↓
Redirect to Dashboard
```

### Register Flow
```
Register Page
    ↓
Validate Form
    ↓
Call authService.register()
    ↓
Store Token & User
    ↓
Update Redux State
    ↓
Redirect to Dashboard
```

### Forgot Password Flow
```
Forgot Password Page
    ↓
Validate Email
    ↓
Call authService.forgotPassword()
    ↓
Show Success Message
    ↓
User Receives Email
    ↓
User Clicks Link with Token
    ↓
Redirect to Reset Password
```

### Reset Password Flow
```
Reset Password Page (with token)
    ↓
Validate Password
    ↓
Call authService.resetPassword()
    ↓
Show Success Message
    ↓
Redirect to Login
    ↓
User Logs In with New Password
```

---

## 🛡️ Security Features

1. **Token-Based Authentication**
   - JWT tokens stored in localStorage
   - Automatic token inclusion in requests
   - Token refresh on expiration

2. **Password Security**
   - Password strength validation
   - Confirm password matching
   - Secure password reset via email token

3. **Email Verification**
   - OTP verification support
   - Email validation
   - Reset token expiration

4. **Error Handling**
   - Meaningful error messages
   - Server error responses
   - Validation error feedback

5. **State Management**
   - Redux for auth state
   - Persistent user data
   - Loading and error states

---

## 📱 Integration with Routes

```javascript
import { Login, Register, ForgotPassword, ResetPassword } from '@pages/auth';
import ProtectedRoute from '@components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        {/* More routes */}
      </Route>
    </Routes>
  );
};
```

---

## 🎨 UI/UX Features

1. **Form Validation**
   - Real-time error messages
   - Field-level validation
   - Clear error indicators

2. **User Feedback**
   - Loading states with spinners
   - Success messages
   - Error alerts
   - Helpful hints

3. **Accessibility**
   - Semantic HTML
   - ARIA labels
   - Keyboard navigation
   - Focus management

4. **Responsive Design**
   - Mobile-friendly
   - Tablet optimized
   - Desktop layouts
   - Dark mode support

---

## 📝 API Integration

The authentication system expects the following API endpoints:

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/verify-email
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/refresh-token
```

---

## 🚀 Best Practices

1. **Always validate** on both client and server
2. **Use HTTPS** in production
3. **Secure token storage** (consider cookies with HttpOnly flag)
4. **Implement rate limiting** on backend
5. **Use CSRF protection** for state-changing requests
6. **Set token expiration** appropriately
7. **Clear localStorage** on logout
8. **Validate token** before redirecting to protected routes

---

## 🔗 Related Files

- Auth Service: `src/services/authService.js`
- Axios Config: `src/services/axiosConfig.js`
- useAuth Hook: `src/hooks/useAuth.js`
- Auth Slice: `src/redux/slices/authSlice.js`
- Login Page: `src/pages/auth/Login.jsx`
- Register Page: `src/pages/auth/Register.jsx`
- Forgot Password: `src/pages/auth/ForgotPassword.jsx`
- Reset Password: `src/pages/auth/ResetPassword.jsx`
- Validation Utils: `src/utils/validation.js`

---

**Authentication Module Setup Complete!** 🔐
