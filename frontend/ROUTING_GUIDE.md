# Step 4: Routing Configuration Guide

## 📋 Overview

This guide explains the routing structure for the Online Salon Booking System frontend.

## 🗂️ Files Created

### 1. `/src/routes/index.jsx` - Main Routing Component
The central routing file that defines all application routes.

**Key Features:**
- Lazy loading of all page components
- Organized route sections (Public, Customer, Owner, Admin)
- Protected and role-based route wrappers
- Loading fallback UI
- Catch-all 404 route

### 2. `/src/routes/ProtectedRoute.jsx` - Authentication Guard
Wrapper component for protecting routes that require authentication.

**Usage:**
```jsx
<ProtectedRoute>
  <CustomerDashboard />
</ProtectedRoute>
```

**Behavior:**
- Checks if user is authenticated via Redux store
- Shows loading spinner while checking authentication
- Redirects to `/login` if not authenticated
- Renders protected component if authenticated

### 3. `/src/routes/RoleBasedRoute.jsx` - Role-Based Access Control
Wrapper component for restricting access based on user role.

**Usage:**
```jsx
<RoleBasedRoute requiredRoles={['admin', 'owner']}>
  <AdminDashboard />
</RoleBasedRoute>
```

**Props:**
- `requiredRoles` (Array): Roles allowed to access [required]
- `children` (ReactNode): Component to render [required]
- `fallbackPath` (String): Path to redirect if role doesn't match (default: '/')

**Behavior:**
- Checks if user role is in the required roles array
- Redirects to fallback path if role doesn't match
- Shows loading spinner while checking

---

## 🛣️ Route Structure

### Public Routes (No Authentication Required)
```
/login                          # Login page
/register                       # Registration page
/forgot-password                # Forgot password page
/reset-password/:token          # Reset password with token
/unauthorized                   # 401 Unauthorized page
/server-error                   # 500 Server error page
*                               # 404 Not found page
```

### Customer Routes (Authenticated + role='customer')
```
/                               # Home/Dashboard
/salons/search                  # Search salons
/salons/:salonId                # Salon details page
/booking/:salonId               # Booking flow/wizard
/booking/success/:bookingId     # Booking confirmation
/bookings                       # Booking history
/favorites                      # Favorite salons
/profile                        # Customer profile
/notifications                  # Customer notifications
```

### Salon Owner Routes (Authenticated + role='owner')
```
/owner                          # Owner dashboard
/owner/analytics                # Analytics & reports
/owner/appointments             # Today's appointments
/owner/staff                    # Staff management
/owner/services                 # Service management
/owner/gallery                  # Gallery management
/owner/offers                   # Offers & promotions
/owner/reviews                  # Reviews & ratings
/owner/working-hours            # Working hours setup
/owner/profile                  # Owner profile
```

### Admin Routes (Authenticated + role='admin')
```
/admin                          # Admin dashboard
/admin/users                    # User management
/admin/salons                   # Salon management
/admin/bookings                 # Booking management
/admin/payments                 # Payment reports
/admin/categories               # Category management
/admin/notifications            # System notifications
/admin/settings                 # System settings
```

---

## 🔐 Authentication Flow

### Login Process
1. User navigates to `/login`
2. Enters credentials
3. Backend returns JWT token
4. Token stored in Redux + localStorage
5. Redirects to home page

### Access Protected Route
1. User navigates to protected route (e.g., `/bookings`)
2. `ProtectedRoute` checks if authenticated
3. If not, redirects to `/login`
4. If yes, renders component

### Access Role-Based Route
1. User navigates to admin route (e.g., `/admin`)
2. `RoleBasedRoute` checks user's role
3. If role not in `requiredRoles`, redirects to fallback path
4. If role matches, renders component

---

## 🚀 Lazy Loading Benefits

All route components are lazy-loaded:

```jsx
const Home = React.lazy(() => import('@pages/customer/Home'));
```

**Benefits:**
- ✅ Smaller initial bundle size
- ✅ Faster initial page load
- ✅ Reduced memory usage
- ✅ Better code splitting
- ✅ Improved performance

**Trade-off:**
- Slight delay when loading new routes
- Handled by `LoadingFallback` component

---

## 📱 Responsive Routing

The routing works seamlessly across all devices:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

No route changes needed for different screen sizes.

---

## 🔄 Navigation Examples

### Using React Router Link
```jsx
import { Link } from 'react-router-dom';

// Navigate to salon details
<Link to={`/salons/${salonId}`}>View Salon</Link>

// Navigate with state
<Link to="/booking" state={{ salonId: 123 }}>Book Now</Link>
```

### Using useNavigate Hook
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate after booking
navigate(`/booking/success/${bookingId}`);

// Go back
navigate(-1);

// Navigate with replace
navigate('/login', { replace: true });
```

---

## 🧪 Testing Routes

### Test Protected Route
```jsx
// Should redirect to login
visit('/bookings'); // Redirects to /login

// After login, should work
login();
visit('/bookings'); // Works
```

### Test Role-Based Route
```jsx
// Customer trying to access admin
login({ role: 'customer' });
visit('/admin'); // Redirects to /

// Admin accessing admin route
login({ role: 'admin' });
visit('/admin'); // Works
```

---

## 🛠️ Adding New Routes

### Step 1: Create Page Component
```jsx
// src/pages/customer/NewPage.jsx
const NewPage = () => {
  return <div>New Page Content</div>;
};
export default NewPage;
```

### Step 2: Lazy Load in routes/index.jsx
```jsx
const NewPage = React.lazy(() => import('@pages/customer/NewPage'));
```

### Step 3: Add Route
```jsx
<Route
  path="/new-route"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

---

## 🔀 Redirect on Login

After successful login, redirect based on role:

```jsx
const navigate = useNavigate();
const { user } = useSelector(state => state.auth);

useEffect(() => {
  if (user?.role === 'admin') {
    navigate('/admin');
  } else if (user?.role === 'owner') {
    navigate('/owner');
  } else {
    navigate('/');
  }
}, [user]);
```

---

## 📊 Route Guards

### ProtectedRoute Guard
- Checks `state.auth.isAuthenticated`
- Checks `state.auth.loading`
- Redirects to `/login`

### RoleBasedRoute Guard
- Checks `state.auth.user.role`
- Checks `requiredRoles` array
- Redirects to `fallbackPath`

---

## ⚠️ Common Issues & Solutions

### Issue: Infinite redirect loop
**Solution:** Make sure public routes are NOT wrapped in ProtectedRoute

### Issue: Role checks failing
**Solution:** Ensure user role in Redux matches expected value

### Issue: Slow route transitions
**Solution:** Optimize lazy-loaded components or prefetch routes

---

## 📝 Notes

- Always use `replace: true` for auth redirects
- Lazy loading happens only once per route
- LoadingFallback shows during lazy component loading
- Path aliases (@pages, @components) make imports cleaner
- Consider adding route-level error boundaries

---

## ✅ Routing Checklist

- [ ] All routes defined in `routes/index.jsx`
- [ ] Public routes don't require authentication
- [ ] Protected routes wrapped in `ProtectedRoute`
- [ ] Admin routes wrapped in `RoleBasedRoute` with role check
- [ ] Owner routes wrapped in `RoleBasedRoute` with role check
- [ ] Lazy loading configured for all pages
- [ ] 404 catch-all route at end
- [ ] Loading fallback UI configured
- [ ] Navigation working across all routes

---

**Routing Setup Complete!** 🎉
