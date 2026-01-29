# Theme Context

This directory contains the React Context implementation for theme management.

## ThemeContext.tsx

Provides dark/light mode theme switching functionality with localStorage persistence.

### Usage

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Features

- **Theme Types**: `'light' | 'dark'`
- **localStorage Persistence**: Theme preference is saved and restored on page reload
- **Class-based Dark Mode**: Applies `.dark` class to `<html>` element for Tailwind CSS
- **Provider Pattern**: Wrap your app with `<ThemeProvider>` to enable theme functionality

### Implementation Details

The theme is applied by adding/removing the `dark` class on the `<html>` element. This works with Tailwind CSS v4's custom variant configuration.
