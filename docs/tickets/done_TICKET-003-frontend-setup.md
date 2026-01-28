# TICKET-003: Frontend Setup (Vite + React + TypeScript)

**Status:** ✅ DONE  
**Assignee:** Agent  
**Effort:** S  
**Priority:** CRITICAL  
**Completed:** 2026-01-28

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

- [x] Vite Project wird generiert
- [x] React + React-DOM installiert
- [x] TypeScript kompiliert ohne Fehler
- [x] Dev Server läuft auf `localhost:5173`
- [x] Build generiert optimierte `dist/` Ordner
- [x] `pnpm run dev` startet den Server
- [x] `pnpm run build` buildet die App
- [x] `pnpm run preview` kann den Build previewed

## Requirements

### Funktional

- [x] Vite + React + TypeScript Setup
- [x] `.env` Support für Config
- [x] ESBuild für schnelle Builds
- [x] HMR (Hot Module Replacement) im Dev
- [x] Source Maps für Debugging
- [x] Alle Acceptance Criteria erfüllt

### Technisch

- [x] Vite Config ist optimiert für Production
- [x] TypeScript strict mode aktiviert
- [x] Base path für S3 deployment
- [x] CSS Modules Support (optional für später)
- [x] SVG Import Support
- [x] Tree-shaking enabled

### Dokumentation

- [x] `packages/frontend/README.md`: Dev & Build Commands
- [x] `tsconfig.json` dokumentiert
- [x] `vite.config.ts` dokumentiert
- [x] Environment Variable (.env.example)

## Implementation Plan

**Schritt 1: Vite Scaffolding**

- [x] `pnpm create vite` mit React + TypeScript
- [x] Project in `packages/frontend/` verschieben
- [x] Dependencies installieren

**Schritt 2: Vite Config**

- [x] `vite.config.ts`: Base path für S3 bucket
- [x] Optimize build settings
- [x] HMR für Dev Environment

**Schritt 3: TypeScript Config**

- [x] `tsconfig.json` mit strict mode
- [x] Path aliases (optional: `@/` für `src/`)
- [x] DOM Lib Types

**Schritt 4: Project Structure**

- [x] `src/components/` Ordner erstellen
- [x] `src/sections/` Ordner erstellen
- [x] `src/contexts/` Ordner erstellen
- [x] `src/hooks/` Ordner erstellen
- [x] `public/` mit dummy assets

**Schritt 5: Testing**

- [x] `pnpm run dev` im packages/frontend arbeitet
- [x] `pnpm run build` generiert dist/ ohne Fehler
- [x] `pnpm run preview` zeigt den Build

## Dependencies

**Blockiert durch:**

- [x] TICKET-001 (Project Setup)

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
