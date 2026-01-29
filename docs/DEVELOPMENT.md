# Development Guide

Complete guide for setting up your local development environment and contributing to the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development Tools](#development-tools)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Debugging](#debugging)
- [Common Development Tasks](#common-development-tasks)

## Prerequisites

### Required Software

- **Node.js 20+** - [Download](https://nodejs.org/)
- **pnpm 9+** - Install with `npm install -g pnpm`
- **Git** - [Download](https://git-scm.com/)

### Recommended (Optional)

- **Docker Desktop** - For DevContainer support
- **Visual Studio Code** - Recommended IDE with DevContainer extension
- **AWS CLI v2** - For manual deployments

## Local Setup

### Option 1: Native Development

```bash
# 1. Clone the repository
git clone https://github.com/Gh0stbasta/aws-sls-website.git
cd aws-sls-website

# 2. Install dependencies
pnpm install

# 3. Build infrastructure (first time)
pnpm run build:infra

# 4. Start development server
pnpm run dev:frontend
```

The frontend will be available at `http://localhost:5173`

### Option 2: DevContainer (Recommended)

Using DevContainer ensures a consistent development environment across all team members.

**Prerequisites:**
- Docker Desktop installed and running
- VS Code with "Dev Containers" extension

**Steps:**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gh0stbasta/aws-sls-website.git
   cd aws-sls-website
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Reopen in Container**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Select "Dev Containers: Reopen in Container"
   - Wait for container to build (first time takes ~5 minutes)

4. **Start developing**
   ```bash
   # Dependencies are auto-installed
   pnpm run dev:frontend
   ```

**What's Included in DevContainer:**
- Node.js 20
- pnpm 9+
- AWS CLI v2
- Git
- VS Code extensions (ESLint, Prettier, Tailwind CSS IntelliSense)

## Development Workflow

### Starting Development

```bash
# Terminal 1: Frontend Development Server
pnpm run dev:frontend
# Opens http://localhost:5173 with Hot Module Replacement (HMR)

# Terminal 2 (optional): CDK Watch Mode
pnpm run dev:infra
# Watches for infrastructure changes and auto-synths
```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit files in `packages/frontend/src/` for frontend changes
   - Edit files in `packages/infrastructure/lib/` for infrastructure changes

3. **Test locally**
   ```bash
   pnpm run lint        # Run linters
   pnpm run test        # Run tests
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

## Project Structure

```
aws-sls-website/
├── packages/
│   ├── frontend/                  # React Frontend Application
│   │   ├── src/
│   │   │   ├── main.tsx          # Application entry point
│   │   │   ├── App.tsx           # Root component
│   │   │   ├── components/       # Reusable UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── ...
│   │   │   ├── sections/         # Page sections (Hero, Features, etc.)
│   │   │   ├── contexts/         # React Context providers
│   │   │   │   └── ThemeContext.tsx
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   └── data/             # Static data and content
│   │   ├── public/               # Static assets
│   │   ├── vite.config.ts        # Vite configuration
│   │   └── package.json
│   │
│   └── infrastructure/            # AWS CDK Infrastructure
│       ├── bin/
│       │   └── app.ts            # CDK app entry point
│       ├── lib/
│       │   └── website-stack.ts  # CloudFormation stack definition
│       ├── cdk.json              # CDK configuration
│       └── package.json
│
├── .devcontainer/                # DevContainer configuration
├── .github/workflows/            # CI/CD pipelines
├── docs/                         # Documentation
│   ├── adrs/                     # Architecture Decision Records
│   ├── DEVELOPMENT.md            # This file
│   ├── DEPLOYMENT.md             # Deployment guide
│   ├── TROUBLESHOOTING.md        # Common issues
│   └── FAQ.md                    # Frequently asked questions
│
├── pnpm-workspace.yaml           # pnpm workspace configuration
├── package.json                  # Root package.json
└── tsconfig.json                 # Root TypeScript config
```

## Available Scripts

### Root Level Scripts

```bash
# Install all dependencies
pnpm install

# Frontend development
pnpm run dev:frontend              # Start dev server (http://localhost:5173)
pnpm run build:frontend            # Production build

# Infrastructure development
pnpm run dev:infra                 # Watch mode for CDK
pnpm run build:infra               # Build CDK

# Code quality
pnpm run lint                      # Lint all packages
pnpm run test                      # Run tests (all packages)
pnpm run format                    # Format code (all packages)
```

### Frontend Scripts

```bash
cd packages/frontend

# Development
pnpm run dev                       # Start dev server
pnpm run build                     # Production build
pnpm run preview                   # Preview production build

# Code quality
pnpm run lint                      # Run ESLint
pnpm run format                    # Format with Prettier
```

### Infrastructure Scripts

```bash
cd packages/infrastructure

# CDK commands
pnpm run cdk diff                  # Show infrastructure changes
pnpm run cdk synth                 # Synthesize CloudFormation template
pnpm run cdk deploy                # Deploy to AWS
pnpm run cdk destroy               # Destroy stack (careful!)

# Development
pnpm run build                     # Compile TypeScript
pnpm run watch                     # Watch mode
```

## Development Tools

### VS Code Extensions (Recommended)

The DevContainer automatically installs these extensions:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind class autocomplete
- **Jest Runner** - Run tests from editor
- **TypeScript** - Enhanced TypeScript support

### Code Formatting

- **Auto-format on save** is enabled in DevContainer
- Manually format: `pnpm run format`
- Prettier config: `.prettierrc` (if exists) or defaults

### Linting

- ESLint is configured for TypeScript and React
- Run manually: `pnpm run lint`
- Auto-fix: `pnpm run lint --fix`

## Testing

### Running Tests

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage
```

**Note:** Test infrastructure may be added in future tickets. Check `package.json` for available test scripts.

## Code Quality

### Type Checking

```bash
# Check types in all packages
pnpm run type-check
```

### Pre-commit Hooks (Optional)

Consider setting up Husky for pre-commit hooks:

```bash
# Install Husky
pnpm add -D husky

# Setup pre-commit hook
npx husky init
echo "pnpm run lint" > .husky/pre-commit
```

## Debugging

### Frontend Debugging

**VS Code Launch Configuration:**

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/packages/frontend/src"
    }
  ]
}
```

**Browser DevTools:**
- React DevTools extension for Chrome/Firefox
- Vite provides source maps automatically in dev mode

### Infrastructure Debugging

```bash
# View synthesized CloudFormation template
cd packages/infrastructure
pnpm run cdk synth

# View differences before deploying
pnpm run cdk diff

# Enable verbose CDK output
pnpm run cdk deploy --verbose
```

## Common Development Tasks

### Adding a New Component

```bash
# 1. Create component file
cd packages/frontend/src/components
touch MyNewComponent.tsx

# 2. Create component (example)
cat > MyNewComponent.tsx << 'EOF'
import { FC } from 'react';

interface MyNewComponentProps {
  title: string;
}

export const MyNewComponent: FC<MyNewComponentProps> = ({ title }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
};
EOF

# 3. Export from index (if using barrel exports)
# 4. Use in your application
```

### Updating Dependencies

```bash
# Check for outdated packages
pnpm outdated

# Update specific package
pnpm update <package-name>

# Update all dependencies (careful!)
pnpm update --latest

# Rebuild after updates
pnpm run build:infra
pnpm run build:frontend
```

### Adding a New Package to Monorepo

```bash
# Create new package directory
mkdir -p packages/new-package
cd packages/new-package

# Initialize package
pnpm init

# Add to workspace (already configured in pnpm-workspace.yaml)

# Install dependencies for this package
pnpm add <dependency>
```

### Working with Tailwind CSS

```bash
# Tailwind classes are autocompleted in VS Code
# Configure in: packages/frontend/tailwind.config.ts

# Add custom colors, fonts, etc. to config
# Example: Add a custom color
# colors: {
#   primary: '#your-color'
# }
```

### Hot Module Replacement (HMR)

Vite provides instant HMR out of the box:

- Edit any React component → Changes appear instantly
- Edit CSS/Tailwind → Styles update without page reload
- State is preserved during updates

If HMR breaks:
```bash
# Restart dev server
# Press Ctrl+C to stop
pnpm run dev:frontend
```

### Environment Variables

```bash
# Frontend environment variables (packages/frontend/.env)
# Prefix with VITE_ to expose to frontend
VITE_API_URL=https://api.example.com

# Access in code:
# const apiUrl = import.meta.env.VITE_API_URL
```

## Next Steps

- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) if you encounter issues
- Read [FAQ.md](FAQ.md) for common questions
- Review [ADRs](adrs/) for architectural decisions

## Getting Help

- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- Review existing [GitHub Issues](https://github.com/Gh0stbasta/aws-sls-website/issues)
- Create a new issue if you found a bug
- Read the [Contributing Guide](../README.md#-contributing) for PR guidelines

---

Happy coding! 🚀
