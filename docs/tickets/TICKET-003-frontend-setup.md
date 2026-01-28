# TICKET-003: Frontend Setup (Vite + React + TypeScript)

**Status:** OPEN  
**Assignee:** -  
**Effort:** S  
**Priority:** CRITICAL

## Context & Architecture

**Komponente:** Frontend Infrastructure  
**Betroffene Module:** `packages/frontend/`  
**Relevante ADRs:** ADR-001 (Frontend Stack), ADR-000 (Code Standards)  
**Design Pattern:** SPA mit React + Vite

## User Story

> "Als **Frontend Developer**, möchte ich **ein funktionierendes React + Vite + TypeScript Setup**, damit **ich moderne Frontend-Komponenten entwickeln kann**."

## Contract Definition

**Project Structure:**
```
packages/frontend/
├── src/
│   ├── main.tsx            # Entry point
│   ├── App.tsx             # Root component
│   ├── index.css           # Global styles
│   ├── components/         # Reusable components
│   ├── sections/           # Page sections
│   ├── hooks/              # Custom hooks
│   └── contexts/           # Context providers (Theme, etc.)
├── public/                 # Static assets
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
├── package.json
└── README.md
```

**Build Output:**
```bash
npm run build  # Outputs to dist/
```

## Acceptance Criteria

- [ ] Vite Project wird generiert
- [ ] React + React-DOM installiert
- [ ] TypeScript kompiliert ohne Fehler
- [ ] Dev Server läuft auf `localhost:5173`
- [ ] Build generiert optimierte `dist/` Ordner
- [ ] `pnpm run dev` startet den Server
- [ ] `pnpm run build` buildet die App
- [ ] `pnpm run preview` kann den Build previewed

## Requirements

### Funktional
- [ ] Vite + React + TypeScript Setup
- [ ] `.env` Support für Config
- [ ] ESBuild für schnelle Builds
- [ ] HMR (Hot Module Replacement) im Dev
- [ ] Source Maps für Debugging
- [ ] Alle Acceptance Criteria erfüllt

### Technisch
- [ ] Vite Config ist optimiert für Production
- [ ] TypeScript strict mode aktiviert
- [ ] Base path für S3 deployment
- [ ] CSS Modules Support (optional für später)
- [ ] SVG Import Support
- [ ] Tree-shaking enabled

### Dokumentation
- [ ] `packages/frontend/README.md`: Dev & Build Commands
- [ ] `tsconfig.json` dokumentiert
- [ ] `vite.config.ts` dokumentiert
- [ ] Environment Variable (.env.example)

## Implementation Plan

**Schritt 1: Vite Scaffolding**
- [ ] `pnpm create vite` mit React + TypeScript
- [ ] Project in `packages/frontend/` verschieben
- [ ] Dependencies installieren

**Schritt 2: Vite Config**
- [ ] `vite.config.ts`: Base path für S3 bucket
- [ ] Optimize build settings
- [ ] HMR für Dev Environment

**Schritt 3: TypeScript Config**
- [ ] `tsconfig.json` mit strict mode
- [ ] Path aliases (optional: `@/` für `src/`)
- [ ] DOM Lib Types

**Schritt 4: Project Structure**
- [ ] `src/components/` Ordner erstellen
- [ ] `src/sections/` Ordner erstellen
- [ ] `src/contexts/` Ordner erstellen
- [ ] `src/hooks/` Ordner erstellen
- [ ] `public/` mit dummy assets

**Schritt 5: Testing**
- [ ] `pnpm run dev` im packages/frontend arbeitet
- [ ] `pnpm run build` generiert dist/ ohne Fehler
- [ ] `pnpm run preview` zeigt den Build

## Dependencies

**Blockiert durch:**
- [ ] TICKET-001 (Project Setup)
- [ ] TICKET-002 (Infrastructure - für Bucket Name)

**Blockiert:**
- [ ] TICKET-004 (Tailwind Setup)
- [ ] TICKET-005 (Components)
- [ ] Alle anderen Frontend Tickets

## Notes

- React 18+ für beste Performance
- Vite v5 oder später (schneller Build)
- TypeScript strict mode von Anfang an
- `.env.example` statt `.env` in Git
- Base path kann später angepasst werden basierend auf CloudFront
