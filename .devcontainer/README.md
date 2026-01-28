# DevContainer

Containerized Development Environment

## Quick Start

1. **Open in DevContainer**
   ```
   Press Ctrl+Shift+P → "Dev Containers: Reopen in Container"
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Start Development**
   ```bash
   # Terminal 1: Frontend
   pnpm run dev:frontend

   # Terminal 2: Infrastructure CDK
   pnpm run dev:infra
   ```

## What's Included

- **Node.js 20**: JavaScript/TypeScript Runtime
- **pnpm 9+**: Fast Package Manager with Workspace Support
- **AWS CLI v2**: AWS Command-line Tools
- **Git**: Version Control
- **VSCode Extensions**:
  - ESLint: Code Linting
  - Prettier: Code Formatting
  - Tailwind CSS: CSS Intellisense
  - Jest: Testing

## Notes

- DevContainer is optional but recommended
- Ensures consistent development environment across team
- AWS CLI is configured with your local credentials
- All changes to code sync immediately between host and container
