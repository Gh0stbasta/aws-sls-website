# TICKET-001: Project Setup & Monorepo

**Status:** ✅ COMPLETED  
**Assignee:** -  
**Effort:** S  
**Priority:** CRITICAL

## Context & Architecture

**Komponente:** Project Infrastructure  
**Betroffene Module:** Root, `.devcontainer/`, `package.json`, `.github/`  
**Relevante ADRs:** ADR-000, ADR-001, ADR-002  
**Design Pattern:** Monorepo (Workspace Pattern)

## User Story

> "Als **Entwickler**, möchte ich ein **funktionierendes Monorepo Setup mit DevContainer**, damit **ich lokal entwickeln kann und die Umgebung reproducierbar ist**."

## Contract Definition

**Struktur:**
```
aws-sls-website/
├── packages/
│   ├── frontend/          # React + Vite App
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   └── src/
│   └── infrastructure/    # AWS CDK
│       ├── package.json
│       └── lib/
├── .devcontainer/
│   ├── devcontainer.json
│   └── Dockerfile
├── .github/workflows/     # CI/CD (wird später gefüllt)
├── package.json          # Root workspace config
├── pnpm-workspace.yaml   # Workspace definition
├── tsconfig.json         # Root TypeScript config
└── README.md
```

**Package Manager:** pnpm (workspace support)

**DevContainer Requirements:**
- Node.js 20+
- pnpm 9+
- AWS CLI v2
- Git

## Acceptance Criteria

- [ ] Workspace ist initialisiert mit pnpm
- [ ] Frontend & Infrastructure Packages sind erstellt
- [ ] DevContainer funktioniert: `devcontainer open`
- [ ] Root `package.json` hat workspace definition
- [ ] Alle Dependencies sind installiert
- [ ] `pnpm install` lädt alle Packages korrekt
- [ ] TypeScript Compiler funktioniert für beide Packages
- [ ] Git ist im Container verfügbar

## Requirements

### Funktional
- [ ] Monorepo mit pnpm Workspaces
- [ ] Separate `packages/frontend` & `packages/infrastructure`
- [ ] DevContainer ist fully functional
- [ ] Root `tsconfig.json` für Linting/Type-Checking
- [ ] `.gitignore` ist korrekt konfiguriert
- [ ] Alle Acceptance Criteria erfüllt

### Technisch
- [ ] Workspace Struktur ist clean (keine Circular Dependencies)
- [ ] DevContainer builds ohne Fehler
- [ ] Node-Module sind nicht gecacht in Git
- [ ] pnpm-lock.yaml ist versioniert

### Dokumentation
- [ ] `README.md`: Quick Start (wie man das Project startet)
- [ ] `.devcontainer/`: Dokumentiert was die Container enthalten
- [ ] `docs/`: Link zu diesem Setup Ticket

## Implementation Plan

**Schritt 1: Monorepo Setup**
- [ ] Root `package.json` mit workspace config erstellen
- [ ] `pnpm-workspace.yaml` erstellen
- [ ] `packages/frontend` Verzeichnis erstellen
- [ ] `packages/infrastructure` Verzeichnis erstellen
- [ ] Root `tsconfig.json` erstellen

**Schritt 2: DevContainer Setup**
- [ ] `.devcontainer/devcontainer.json` erstellen
- [ ] `.devcontainer/Dockerfile` mit Node + pnpm + AWS CLI
- [ ] `.devcontainer/`: VSCode Extensions konfigurieren

**Schritt 3: Basis Package Configs**
- [ ] `packages/frontend/package.json` Template
- [ ] `packages/infrastructure/package.json` Template
- [ ] `.gitignore` für alle Node Patterns

**Schritt 4: Verifikation**
- [ ] `pnpm install` durchführen
- [ ] DevContainer testen
- [ ] Build test (sollte noch nicht viel bauen)

## Dependencies

**Blockiert durch:**
- Keine

**Blockiert:**
- [ ] TICKET-002 (CDK Infrastructure)
- [ ] TICKET-003 (Frontend Setup)

## Notes

- Verwende pnpm statt npm/yarn (besserer Workspace Support)
- DevContainer sollte optional sein, aber stark empfohlen
- Achte auf `.devcontainer/.gitignore` damit Container nicht zu groß wird
- Lock File (`pnpm-lock.yaml`) MUSS versioniert sein für Reproducibility
