# Tailwind CSS Setup

This project uses **Tailwind CSS v4** with custom configuration for styling.

## Configuration

### PostCSS Configuration (`postcss.config.js`)

The project uses PostCSS with Tailwind and Autoprefixer:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

### CSS Configuration (`src/index.css`)

Tailwind v4 uses CSS-based configuration instead of JavaScript config files:

- **@import "tailwindcss"**: Imports Tailwind CSS
- **@variant dark**: Configures class-based dark mode (`.dark` class strategy)
- **@theme**: Defines custom colors, spacing, and design tokens

## Custom Theme

### Custom Colors

Three custom color palettes are defined:

- **primary**: Blue tones (used for primary buttons and accents)
- **secondary**: Purple/magenta tones (used for secondary actions)
- **accent**: Orange tones (available for highlights)

Each palette includes shades from 50 to 950 for comprehensive color options.

### Custom Spacing

Additional spacing values:
- `spacing-18`: 4.5rem
- `spacing-88`: 22rem
- `spacing-128`: 32rem

## Dark Mode

The project uses **class-based dark mode**:

1. The `ThemeContext` adds/removes the `dark` class on the `<html>` element
2. Use `dark:` prefix in class names for dark mode styles
3. Example: `bg-white dark:bg-gray-900`

### Dark Mode Variant Configuration

In `src/index.css`:

```css
@variant dark (&:is(.dark *));
```

This creates a custom variant that applies styles when any ancestor has the `.dark` class.

## Usage Examples

### Using Custom Colors

```tsx
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Click me
</button>
```

### Using Dark Mode

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content that adapts to theme
</div>
```

### Using Custom Spacing

```tsx
<div className="mt-18 mb-88">
  Content with custom spacing
</div>
```

## Build Optimization

Tailwind CSS automatically:
- Purges unused styles in production builds
- Optimizes CSS output for minimal file size
- Generates only the classes used in your code

Run `npm run build` to create an optimized production build.

## Hot Module Replacement (HMR)

Tailwind CSS changes are automatically reflected during development without a full page reload thanks to Vite's HMR integration.
