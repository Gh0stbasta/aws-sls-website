# Frontend - Serverless Static Website

React 19 + Vite + TypeScript - Optimized for AWS S3 + CloudFront Deployment

## 🚀 Quick Start

### Development Server

```bash
# Start dev server with HMR (Hot Module Replacement)
pnpm run dev

# Opens http://localhost:5173
```

### Production Build

```bash
# Build for production
pnpm run build

# Preview production build locally
pnpm run preview
# Opens http://localhost:4173
```

### Linting

```bash
# Run ESLint
pnpm run lint
```

## 📁 Project Structure

```
src/
├── main.tsx              # Application entry point
├── App.tsx               # Root component
├── index.css             # Global styles
├── components/           # Reusable UI components
├── sections/             # Page sections (Hero, Features, etc.)
├── contexts/             # React Context providers (Theme, etc.)
└── hooks/                # Custom React hooks
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript 5.9** - Type safety (strict mode enabled)
- **Vite 7** - Build tool with lightning-fast HMR
- **ESLint** - Code linting with React best practices

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

All environment variables must be prefixed with `VITE_` to be exposed to the app.

### TypeScript

- **Strict mode enabled** - Full type safety
- **Path aliases** - Use `@/` for cleaner imports (e.g., `import { Button } from '@/components/Button'`)
- **DOM types included** - Full browser API support

### Vite Build Optimization

- **Tree-shaking** - Removes unused code
- **Code splitting** - Separates vendor chunks for better caching
- **Source maps** - Enabled for debugging
- **ESBuild minification** - Fast production builds

### Base Path

The `base` path in `vite.config.ts` is set to `/`. For CloudFront deployment with a custom path, update:

```ts
export default defineConfig({
  base: "/your-custom-path/",
  // ...
});
```

## 🧪 Build Output

Production builds output to `dist/`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── vendor-[hash].js
│   └── index-[hash].css
└── ...
```

The build is optimized for deployment to AWS S3 + CloudFront.

## 📦 Dependencies

### Production

- `react` - UI framework
- `react-dom` - React DOM rendering

### Development

- `@vitejs/plugin-react` - Vite React plugin with Fast Refresh
- `typescript` - TypeScript compiler
- `eslint` - Linting with React rules
- `vite` - Build tool

## 🔗 Related

- See `../../docs/adrs/ADR-001-frontend-stack.md` for architecture decisions
- Deployment handled by CI/CD (see `TICKET-013`)
- Infrastructure defined in `../infrastructure/`

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
