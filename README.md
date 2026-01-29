# Serverless Static Website Template

AWS + React + Vite - Production Ready Template for Serverless Static Websites

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **📊 Projekt-Status:** [Quick Status](docs/QUICK-STATUS.md) | [Detaillierter Status](docs/PROJECT-STATUS.md) | **Fortschritt: ~30%** ✅

## Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Development Commands](#-development-commands)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Security](#-security)
- [Cost Estimation](#-cost-estimation)
- [License](#-license)
- [Contributing](#-contributing)
- [FAQ](#-faq)

## 🌟 Features

- **Serverless**: Hosted on AWS S3 + CloudFront (scales automatically)
- **Fast**: Built with Vite (sub-second HMR, fast builds)
- **Modern**: React 18 + TypeScript + Tailwind CSS
- **Type-Safe**: Full TypeScript Support
- **Dark Mode**: Built-in Dark/Light Mode Toggle
- **Responsive**: Mobile-first Design System
- **Automated**: GitHub Actions CI/CD Pipeline
- **Cost-Optimized**: Uses AWS Free Tier ($0/month potential)

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite + TypeScript | Fast, modern UI framework |
| **Styling** | Tailwind CSS + Dark Mode | Utility-first CSS + Theme |
| **Animations** | Framer Motion | Smooth scroll/page animations |
| **Infrastructure** | AWS CDK (TypeScript) | IaC for S3 + CloudFront |
| **Deployment** | GitHub Actions + OIDC | Automated CI/CD Pipeline |
| **Package Manager** | pnpm Workspaces | Fast monorepo management |

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+** and **pnpm 9+**
- OR **Docker** (for DevContainer)
- **AWS Account** (for deployment)

### Local Development

```bash
# 1. Clone Repository
git clone https://github.com/user/aws-sls-website
cd aws-sls-website

# 2. Install Dependencies
pnpm install

# 3. Start Frontend Dev Server
pnpm run dev:frontend
# Opens http://localhost:5173

# 4. (Optional) Watch CDK for Changes
pnpm run dev:infra
```

### Using DevContainer

```bash
# Open in Container
# Ctrl+Shift+P → "Dev Containers: Reopen in Container"

# Then same commands as above
pnpm install
pnpm run dev:frontend
```

## 📁 Project Structure

```
aws-sls-website/
├── packages/
│   ├── frontend/              # React + Vite Application
│   │   ├── src/
│   │   │   ├── main.tsx       # Entry point
│   │   │   ├── App.tsx        # Root component
│   │   │   ├── components/    # Reusable components
│   │   │   ├── sections/      # Page sections
│   │   │   ├── contexts/      # React contexts (Theme, etc.)
│   │   │   ├── hooks/         # Custom hooks
│   │   │   └── data/          # Static data
│   │   ├── vite.config.ts     # Vite configuration
│   │   └── tsconfig.json      # TypeScript config
│   │
│   └── infrastructure/        # AWS CDK Infrastructure
│       ├── lib/
│       │   └── website-stack.ts
│       ├── bin/
│       │   └── app.ts         # CDK App entry
│       └── cdk.json
│
├── .devcontainer/             # DevContainer config
├── .github/workflows/         # CI/CD Workflows
├── docs/                      # Documentation & ADRs
├── pnpm-workspace.yaml        # Monorepo workspace
└── tsconfig.json              # Root TypeScript config
```

## 🔨 Development Commands

```bash
# Frontend Development
pnpm run dev:frontend          # Start dev server
pnpm run build:frontend        # Production build

# Infrastructure Development
pnpm run dev:infra             # Watch CDK changes
pnpm run build:infra           # Build CDK

# All Packages
pnpm install                   # Install all dependencies
pnpm run lint                  # Lint all packages
pnpm run test                  # Test all packages
```

## 🚢 Deployment

> **⚠️ IMPORTANT:** Before GitHub Actions can deploy automatically, you must complete the one-time setup below. If you see the error "Credentials could not be loaded", see [Troubleshooting](docs/TROUBLESHOOTING.md#github-actions-aws-credentials-error).

### Prerequisites

**Required for automated deployments:**

1. **AWS Account** with OIDC Provider + Deployment Role configured
2. **GitHub Secrets** configured (see [docs/GITHUB-SECRETS.md](docs/GITHUB-SECRETS.md)):
   - `AWS_ROLE_ARN` - IAM role ARN for GitHub Actions
   - `AWS_REGION` - AWS region (e.g., `us-east-1`)
   - `WEBSITE_BUCKET` - S3 bucket name from CDK deployment
   - `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID from CDK deployment

**First-time setup guide:** See [CI/CD Documentation](docs/CICD.md) for complete step-by-step instructions.

### Automatic Deployment (Recommended)

Push to `main` branch → GitHub Actions automatically deploys

```bash
git push origin main
# Watch deployment in GitHub Actions tab
```

### Manual Deployment

```bash
# 1. Deploy Infrastructure (first time or if CDK changed)
cd packages/infrastructure
cdk deploy --require-approval never

# 2. Deploy Frontend
cd ../frontend
pnpm run build
aws s3 sync dist s3://your-bucket-name --delete

# 3. Invalidate CloudFront Cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## 📚 Documentation

- [CI/CD Pipeline](docs/CICD.md) - GitHub Actions automated deployment
- [GitHub Secrets Setup](docs/GITHUB-SECRETS.md) - Required secrets for CI/CD
- [Development Guide](docs/DEVELOPMENT.md) - Setup & local development (if exists)
- [Deployment Guide](docs/DEPLOYMENT.md) - How to deploy to AWS (if exists)
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues & solutions (if exists)
- [Architecture Decisions](docs/adrs/) - Technical decisions (ADRs)

## 🔐 Security

- **No Long-lived Credentials**: Uses AWS OIDC for GitHub Actions
- **Least Privilege**: IAM Role restricted to S3 + CloudFront only
- **No Secrets in Logs**: Output masking on sensitive operations
- See [ADR-004: Security & Deployment](docs/adrs/ADR-004-security-deployment.md)

## 💰 Cost Estimation

| Service | Free Tier | Monthly Cost |
|---------|-----------|--------------|
| **S3** | 5GB storage | $0 |
| **CloudFront** | 1TB egress | $0-20 |
| **GitHub Actions** | 2000 min/month | $0 |
| **Route53** | Not used | $0 |
| **Lambda** | Not used | $0 |
| **Total** | - | **$0-20/month** |

*Actual costs depend on traffic. Small projects typically fall within free tier.*

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -am 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## ❓ FAQ

### How much does it cost?
Typically $0-20/month for small projects. Most services fall within AWS Free Tier limits.

### Can I use this in production?
Yes! This template is production-ready. It's used to host static websites, documentation, landing pages, etc.

### How do I customize the website?
- Edit React components in `packages/frontend/src/`
- Modify colors in `tailwind.config.ts`
- Update content in `src/data/`
- Deploy with `git push origin main`

### How do I add a custom domain?
See [DEPLOYMENT.md](docs/DEPLOYMENT.md#custom-domain-setup) for Route53 + ACM setup.

### Can I add a backend API?
Yes! Add API Gateway + Lambda functions. The template focuses on the frontend static hosting.

---

**Built with ❤️ using TypeScript, React, and AWS**

