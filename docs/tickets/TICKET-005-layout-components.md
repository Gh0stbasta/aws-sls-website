# TICKET-005: Layout Components (Header, Footer)

**Status:** OPEN  
**Assignee:** -  
**Effort:** S  
**Priority:** HIGH

## Context & Architecture

**Komponente:** Layout Components  
**Betroffene Module:** `src/components/Header.tsx`, `src/components/Footer.tsx`  
**Relevante ADRs:** ADR-001 (Frontend Stack), ADR-000 (Code Standards)  
**Design Pattern:** Functional Components mit Hooks

## User Story

> "Als **User**, möchte ich **Header mit Navigation und Footer mit Links**, damit **ich die Website navigieren und Social Links finden kann**."

## Contract Definition

**Header Component:**
```typescript
// src/components/Header.tsx
interface HeaderProps {
  onThemeToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onThemeToggle }) => {
  return (
    <header className="sticky top-0 bg-white dark:bg-slate-900">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        {/* Navigation Links */}
        {/* Theme Toggle Button */}
      </nav>
    </header>
  );
};
```

**Footer Component:**
```typescript
// src/components/Footer.tsx
export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800">
      {/* Copyright */}
      {/* Social Links */}
      {/* Quick Links */}
    </footer>
  );
};
```

## Acceptance Criteria

- [ ] Header Component wird renderiert
- [ ] Navigation Links sind responsive
- [ ] Theme Toggle Button funktioniert
- [ ] Logo wird angezeigt
- [ ] Footer wird am Ende der Page angezeigt
- [ ] Social Links sind vorhanden
- [ ] Footer responsive auf mobile
- [ ] Dark Mode funktioniert in Header/Footer

## Requirements

### Funktional
- [ ] Navigation mit Link zu Sections (Hero, Features, etc.)
- [ ] Theme Toggle Button (Sun/Moon Icon)
- [ ] Mobile Responsive (Hamburger Menu optional für später)
- [ ] Footer mit Copyright, Social Links
- [ ] Smooth Scrolling zu Sections
- [ ] Alle Acceptance Criteria erfüllt

### Technisch
- [ ] React Functional Components
- [ ] TypeScript Interfaces dokumentiert
- [ ] Tailwind Classes für Styling
- [ ] No External UI Library (nur Icons optional)
- [ ] Unter 500 Zeilen pro Datei

### Dokumentation
- [ ] Component Props dokumentiert
- [ ] Usage Examples in Storybook (optional)
- [ ] Inline Comments für komplexe Logik

## Implementation Plan

**Schritt 1: Header Component**
- [ ] Navigation Links definieren
- [ ] Logo/Branding anzeigen
- [ ] Theme Toggle Button mit Icon
- [ ] Sticky Position + z-index

**Schritt 2: Footer Component**
- [ ] Copyright Text
- [ ] Social Media Links (GitHub, Twitter, etc.)
- [ ] Quick Navigation Links
- [ ] Dark Mode Styling

**Schritt 3: Integration**
- [ ] Header in `App.tsx` am Top
- [ ] Footer in `App.tsx` am Bottom
- [ ] Theme Toggle connected mit Context

**Schritt 4: Responsive Design**
- [ ] Mobile Breakpoints testen
- [ ] Touch-friendly Button Sizes
- [ ] Navigation is mobile-readable

**Schritt 5: Testing**
- [ ] Header/Footer rendern korrekt
- [ ] Links sind funktional
- [ ] Theme Toggle ändert Colors
- [ ] Responsive auf verschiedenen Screen Sizes

## Dependencies

**Blockiert durch:**
- [ ] TICKET-003 (Frontend Setup)
- [ ] TICKET-004 (Tailwind Theme)

**Blockiert:**
- [ ] Alle anderen Section Components (brauchen Container Layout)

## Notes

- Icons können mit Lucide React oder ähnlich gemacht werden (optional)
- Navigation Links sollten zu Section IDs scrollen (smooth scroll)
- Social Links können placeholder sein, später konfigurierbar
- Header sticky position kann später angepasst werden
- Keine komplexe Animation hier - nur Basic Layout
