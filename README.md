# Serverless Static Website Template

AWS + React + Vite - Production Ready Template for Serverless Static Websites

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **📊 Projekt-Status:** [Quick Status](docs/QUICK-STATUS.md) | [Detaillierter Status](docs/PROJECT-STATUS.md) | **Fortschritt: ~30%** ✅

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

### Prerequisites

- AWS Account with OIDC Provider + Deployment Role configured
- GitHub Secrets set:
  - `AWS_ACCOUNT_ID`
  - `AWS_REGION`
  - `AWS_ROLE_ARN`

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

- [Development Guide](docs/DEVELOPMENT.md) - Setup & local development
- [Deployment Guide](docs/DEPLOYMENT.md) - How to deploy to AWS
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues & solutions
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
See [DEPLOYMENT.md](docs/DEPLOYMENT.md#custom-domain) for Route53 + ACM setup.

### Can I add a backend API?
Yes! Add API Gateway + Lambda functions. The template focuses on the frontend static hosting.

---

**Built with ❤️ using TypeScript, React, and AWS**

- **Modularität:** Code < 500 Zeilen pro File, lose Kopplung
- **Architektur:** SOLID, Clean Architecture, Design Patterns
- **Lesbarkeit:** Selbstdokumentierender Code, aussagekräftige Namen
- **Performance:** Effiziente Algorithmen, Bottleneck-Dokumentation
- **Fehlerbehandlung:** Explizit, keine Silent Failures

### DevContainer & Versionskontrolle

- **DevContainer:** Isolierte, reproduzierbare Entwicklungsumgebung (PFLICHT Phase 3)
- **Git:** Conventional Commits, Working Branch Strategy, Checkpoints pro Ticket

## 🚀 Schnelstart für neues Projekt

1. **Kopiere diesen Ordner** als Basis für dein Projekt
2. **Aktualisiere `agentContract.md`** – Passe Enterprise-Standards an dein Tech-Stack an
3. **Phase 1 starten:** Discovery durchführen → `docs/discovery/requirements.md` füllen
4. **ADRs erstellen:** Technische Entscheidungen dokumentieren → `docs/adrs/`
5. **Phase 2:** Backlog planen, Tickets erstellen → `docs/planning/backlog.md`
6. **Phase 3:** "Bearbeite TICKET-[ID]" → KI-Agent implementiert
7. **Phase 4:** Code Review, Testing, Deployment

## 📊 Ticket-Größen (für KI-Agents)

| Größe | KI Effort | Human Effort | Best für |
|-------|-----------|-------------|----------|
| **XS** | ~10 min | ~1-2 h | Bug Fixes, kleine Configs |
| **S** | ~30 min | ~3-4 h | Single Endpoint, Unit Tests |
| **M** | ~1 h | ~4-8 h | Multi-Endpoint Features |
| **L** | ~4 h | ~1-2 Tage | Komplexe Features → **AUFTEILEN!** |

⚠️ **Hinweis:** XS-Tickets bevorzugen – höchste Erfolgsquote für KI-Agents.

## ⚠️ Wichtige Grenzen & Hinweise

### KI-Agent Realität
- **Nicht autonom:** KI benötigt Steuerung und Feedback vom Architekten
- **Junior Developer Mentalität:** Code muss vor Production validiert werden
- **Business-Value Validierung:** Jedes Ticket muss auf echten Business-Value überprüft werden

### Projektspezifische Anpassung
- **Template, kein Standard:** Passe dieses Gerüst an dein Projekt und dein Team an
- **Experimentieren:** Finde die beste Arbeitsweise für deinen Projekttyp
- **Continuous Improvement:** Dokumentiere Learnings → zukünftige Tickets verbessern

### Kalibrierung
- Ticket-Größen sind **Startwerte**, nicht Absoluta
- Starte mit 2-3 Tickets, miss tatsächliche Zeiten
- Aktualisiere Tabelle basierend auf empirischen Daten
- Retrospektiven dokumentieren (siehe Phase 4)

## 📚 Weitere Ressourcen

- **Agent Contract:** [workflow/agentContract.md](workflow/agentContract.md) – Zentrale Governance
- **Phase 1 Details:** [workflow/01_discovery.md](workflow/01_discovery.md)
- **Phase 2 Details:** [workflow/02_planning.md](workflow/02_planning.md)
- **Phase 3 Details:** [workflow/03_implementation.md](workflow/03_implementation.md)
- **Phase 4 Details:** [workflow/04_review.md](workflow/04_review.md)

---

**Version:** 2.0  
**Letzte Aktualisierung:** Januar 2026  
**Status:** Production-Ready

