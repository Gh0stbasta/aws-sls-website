# TICKET-004: Tailwind CSS & Theme System

**Status:** OPEN  
**Assignee:** -  
**Effort:** S  
**Priority:** HIGH

## Context & Architecture

**Komponente:** Styling & Design System  
**Betroffene Module:** `packages/frontend/src/`, `tailwind.config.ts`  
**Relevante ADRs:** ADR-001 (Frontend Stack)  
**Design Pattern:** Utility-First CSS + Context API für Theme

## User Story

> "Als **Designer/Developer**, möchte ich **Tailwind CSS mit Dark/Light Mode**, damit **ich schnell styled und responsive Components baue**."

## Contract Definition

**Theme Context:**
```typescript
// src/contexts/ThemeContext.tsx
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>(...);
export const useTheme = () => useContext(ThemeContext);
```

**Tailwind Config:**
```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { ... },
      spacing: { ... },
    }
  },
  darkMode: 'class', // Using class strategy
  plugins: [...]
}
```

## Acceptance Criteria

- [ ] Tailwind CSS wird in Frontend installiert
- [ ] PostCSS konfiguriert
- [ ] Dark Mode funktioniert (class-based)
- [ ] Custom Colors/Spacing definiert
- [ ] Theme Context funktioniert
- [ ] App Root nutzt ThemeProvider
- [ ] Tailwind Classes werden in CSS generiert
- [ ] Build optimiert CSS (Purging)

## Requirements

### Funktional
- [ ] Tailwind CSS v3+
- [ ] Dark Mode Toggle funktioniert
- [ ] Theme wird in localStorage persistiert (optional)
- [ ] Custom Color Palette für Template
- [ ] Responsive Design unterstützt
- [ ] Alle Acceptance Criteria erfüllt

### Technisch
- [ ] PostCSS Plugin konfiguriert
- [ ] Vite integriert Tailwind Build
- [ ] CSS wird optimiert/gepurged
- [ ] TypeScript Types für Tailwind (optional)
- [ ] Keine CSS-in-JS Komplexität

### Dokumentation
- [ ] `tailwind.config.ts` dokumentiert
- [ ] Theme Context erklärt
- [ ] Dark Mode Nutzung dokumentiert
- [ ] Custom Utility Classes dokumentiert

## Implementation Plan

**Schritt 1: Tailwind Installation**
- [ ] Tailwind CSS + PostCSS installieren
- [ ] `tailwind.config.ts` erstellen
- [ ] `postcss.config.js` erstellen
- [ ] `src/index.css` mit Tailwind Directives

**Schritt 2: Vite Integration**
- [ ] CSS wird in Vite geladen
- [ ] HMR funktioniert mit Tailwind Changes

**Schritt 3: Theme Context**
- [ ] `src/contexts/ThemeContext.tsx` erstellen
- [ ] `useTheme` Hook implementieren
- [ ] localStorage für Theme Persistence

**Schritt 4: App Integration**
- [ ] `App.tsx` wraps mit `<ThemeProvider>`
- [ ] HTML `class` wird dynamisch gesetzt
- [ ] Dark Mode Classes funktionieren

**Schritt 5: Testing**
- [ ] Tailwind Classes rendern korrekt
- [ ] Theme Toggle funktioniert
- [ ] Build optimiert CSS
- [ ] Keine Runtime Overhead

## Dependencies

**Blockiert durch:**
- [ ] TICKET-003 (Frontend Setup)

**Blockiert:**
- [ ] TICKET-005 (Components)
- [ ] Alle UI Component Tickets

## Notes

- Verwende class-based Dark Mode (nicht media queries)
- Custom Colors sollten sich an Website Brand anpassen
- Tailwind JIT Mode ist default in v3+
- Achte auf Specificity bei Custom CSS
- Keine `@apply` Overuse - Utility-First mindset
