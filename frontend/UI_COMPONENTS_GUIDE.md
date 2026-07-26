# Step 5: Reusable UI Components Guide

## 📋 Overview

This guide documents all reusable UI components created for the Salon Booking System.

## 🎨 Components Created

### 1. **Button Component** (`Button.jsx`)

Reusable button with multiple variants and sizes.

**Variants:**
- `primary` - Main action button (purple)
- `secondary` - Secondary action button (gray)
- `outline` - Outlined button
- `ghost` - Ghost/transparent button
- `success` - Success action (green)
- `warning` - Warning action (amber)
- `error` - Danger/error action (red)

**Sizes:**
- `sm` - Small button
- `md` - Medium button (default)
- `lg` - Large button

**Features:**
- Loading state with spinner
- Disabled state
- Full width option
- Keyboard focus ring

**Usage:**
```jsx
import { Button } from '@components/ui';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

<Button variant="outline" disabled>
  Disabled Button
</Button>

<Button loading fullWidth>
  Loading...
</Button>
```

---

### 2. **Input Component** (`Input.jsx`)

Text input field with validation states and helper text.

**Features:**
- Label support
- Placeholder text
- Error state with message
- Success state with message
- Helper/hint text
- Disabled state
- Required field indicator
- All HTML input types

**Usage:**
```jsx
import { Input } from '@components/ui';

<Input
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  required
/>

<Input
  type="text"
  label="Username"
  hint="3-20 characters"
  success="Username is available"
/>
```

---

### 3. **Textarea Component** (`Textarea.jsx`)

Multi-line text input field.

**Features:**
- Label support
- Custom row height
- Error state
- Resizable
- Dark mode support

**Usage:**
```jsx
import { Textarea } from '@components/ui';

<Textarea
  label="Comments"
  placeholder="Enter your comments..."
  rows={6}
  value={comments}
  onChange={(e) => setComments(e.target.value)}
/>
```

---

### 4. **Card Component** (`Card.jsx`)

Container component with optional sections.

**Sub-components:**
- `Card.Header` - Card header with title/subtitle
- `Card.Body` - Main content area
- `Card.Footer` - Footer section

**Features:**
- Hover effect option
- Shadow styling
- Dark mode support
- Composable structure

**Usage:**
```jsx
import { Card } from '@components/ui';

<Card hover>
  <Card.Header title="Salon Info" subtitle="Basic details" />
  <Card.Body>
    <p>Salon content here...</p>
  </Card.Body>
  <Card.Footer>
    <Button>Edit</Button>
  </Card.Footer>
</Card>
```

---

### 5. **Modal Component** (`Modal.jsx`)

Dialog box for alerts and confirmations.

**Features:**
- Custom title
- Size options: sm, md, lg
- Close button
- Backdrop click to close
- Scrollable content
- Modal.Footer sub-component

**Usage:**
```jsx
import { Modal, Button } from '@components/ui';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  size="md"
>
  Are you sure you want to proceed?
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      Confirm
    </Button>
  </Modal.Footer>
</Modal>
```

---

### 6. **Avatar Component** (`Avatar.jsx`)

User profile picture component.

**Features:**
- Image support with fallback
- Initials display
- Size options: xs, sm, md, lg, xl
- Gradient background
- Circular shape

**Usage:**
```jsx
import { Avatar } from '@components/ui';

<Avatar src="/profile.jpg" alt="John Doe" size="md" />

<Avatar initials="JD" size="lg" />

<Avatar alt="Jane Smith" size="sm" /> {/* Uses first letter */}
```

---

### 7. **Rating Component** (`Rating.jsx`)

Star rating display and input.

**Features:**
- Interactive star rating (1-5)
- Read-only mode
- Hover preview
- Half-star support
- Customizable max stars
- Size options: sm, md, lg

**Usage:**
```jsx
import { Rating } from '@components/ui';

<Rating
  value={rating}
  onChange={setRating}
  maxStars={5}
  size="md"
/>

<Rating value={3.5} readOnly size="lg" />
```

---

### 8. **Badge Component** (`Badge.jsx`)

Tag/badge display component.

**Variants:**
- `primary` - Primary badge
- `success` - Success badge
- `warning` - Warning badge
- `error` - Error badge
- `secondary` - Secondary badge

**Sizes:**
- `sm` - Small
- `md` - Medium
- `lg` - Large

**Usage:**
```jsx
import { Badge } from '@components/ui';

<Badge variant="primary">New</Badge>
<Badge variant="success" size="sm">Verified</Badge>
<Badge variant="error">Pending</Badge>
```

---

### 9. **Skeleton Component** (`Skeleton.jsx`)

Loading placeholder skeleton.

**Variants:**
- `rect` - Rectangle (default)
- `circle` - Circle
- `text` - Text line

**Usage:**
```jsx
import { Skeleton } from '@components/ui';

<Skeleton width="100%" height="200px" />
<Skeleton variant="circle" width="48px" height="48px" />
<Skeleton variant="text" width="80%" height="16px" />
```

---

### 10. **Alert Component** (`Alert.jsx`)

Alert message display.

**Variants:**
- `info` - Information (blue)
- `success` - Success (green)
- `warning` - Warning (amber)
- `error` - Error (red)

**Features:**
- Icon support
- Title and message
- Close button option
- Dark mode support

**Usage:**
```jsx
import { Alert } from '@components/ui';

<Alert variant="success" title="Success!">
  Operation completed successfully.
</Alert>

<Alert
  variant="error"
  onClose={handleClose}
>
  An error occurred. Please try again.
</Alert>
```

---

### 11. **Pagination Component** (`Pagination.jsx`)

Page navigation component.

**Features:**
- Next/Previous buttons
- Ellipsis for many pages
- Customizable max visible buttons
- Disabled states

**Usage:**
```jsx
import { Pagination } from '@components/ui';

<Pagination
  current={currentPage}
  total={totalPages}
  onChange={setCurrentPage}
  maxButtons={5}
/>
```

---

### 12. **Loader Component** (`Loader.jsx`)

Loading spinner component.

**Sizes:**
- `sm` - Small spinner
- `md` - Medium spinner (default)
- `lg` - Large spinner

**Usage:**
```jsx
import { Loader } from '@components/ui';

<Loader />
<Loader size="lg" text="Loading..." />
```

---

### 13. **ConfirmDialog Component** (`ConfirmDialog.jsx`)

Confirmation dialog for actions.

**Features:**
- Custom title and message
- Confirm/Cancel buttons
- Dangerous action styling
- Customizable button text

**Usage:**
```jsx
import { ConfirmDialog } from '@components/ui';

<ConfirmDialog
  isOpen={showConfirm}
  title="Delete Item?"
  message="This action cannot be undone."
  onConfirm={handleDelete}
  onCancel={handleCancel}
  isDangerous={true}
/>
```

---

### 14. **EmptyState Component** (`EmptyState.jsx`)

Display when no data is available.

**Features:**
- Icon support
- Title and message
- Action button/element
- Centered layout

**Usage:**
```jsx
import { EmptyState, Button } from '@components/ui';
import { FiInbox } from 'react-icons/fi';

<EmptyState
  icon={<FiInbox />}
  title="No Results"
  message="Try adjusting your search or filters."
  action={<Button>Clear Filters</Button>}
/>
```

---

## 🎯 Component Features Matrix

| Component | Dark Mode | Responsive | Animated | Accessible |
|-----------|-----------|------------|----------|-------------|
| Button | ✅ | ✅ | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ | ✅ |
| Textarea | ✅ | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ | ✅ |
| Modal | ✅ | ✅ | ✅ | ✅ |
| Avatar | ✅ | ✅ | ❌ | ✅ |
| Rating | ✅ | ✅ | ✅ | ✅ |
| Badge | ✅ | ✅ | ❌ | ✅ |
| Skeleton | ✅ | ✅ | ✅ | ✅ |
| Alert | ✅ | ✅ | ✅ | ✅ |
| Pagination | ✅ | ✅ | ✅ | ✅ |
| Loader | ✅ | ✅ | ✅ | ✅ |
| ConfirmDialog | ✅ | ✅ | ✅ | ✅ |
| EmptyState | ✅ | ✅ | ❌ | ✅ |

---

## 📦 Barrel Export

All components are exported from `index.js` for clean imports:

```jsx
// Instead of:
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';

// Use:
import { Button, Input } from '@components/ui';
```

---

## 🎨 Theming

All components support:
- **Light Mode** - White background, dark text
- **Dark Mode** - Dark background, light text
- **Color Variants** - Primary, secondary, success, warning, error
- **Size Options** - Small, medium, large

---

## ♿ Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Focus indicators
- Color contrast compliance
- Semantic HTML

---

## 🚀 Performance

- Memoization for unnecessary re-renders
- Efficient state management
- CSS-in-JS only when needed
- Minimal bundle size impact
- Lazy loading compatible

---

## 📝 Best Practices

1. **Use consistent naming** - Follow component name conventions
2. **Pass required props** - Don't rely on defaults for critical props
3. **Compose components** - Combine components for complex UIs
4. **Handle loading states** - Always show feedback during async operations
5. **Test all variants** - Test each size/variant combination
6. **Dark mode testing** - Ensure components work in dark mode

---

## 🔄 Component Updates

When updating components:
1. Maintain backward compatibility
2. Update documentation
3. Test all variants
4. Update examples
5. Test accessibility

---

**UI Components Setup Complete!** 🎉
