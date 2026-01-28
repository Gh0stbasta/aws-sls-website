# TICKET-006: Hero Section Implementation

**Status:** OPEN  
**Assignee:** -  
**Effort:** M  
**Priority:** HIGH

## Context & Architecture

**Komponente:** Page Sections / Hero  
**Betroffene Module:** `src/sections/HeroSection.tsx`  
**Relevante ADRs:** ADR-001 (Frontend Stack)  
**Design Pattern:** Functional Component mit optional Framer Motion (später)

## User Story

> "Als **Visitor**, möchte ich **eine ansprechende Hero Section mit CTA Button**, damit **ich sofort verstehe worum es geht**."

## Contract Definition

**Hero Section Component:**
```typescript
// src/sections/HeroSection.tsx
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink
}) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href={ctaLink}>{ctaText}</a>
      </div>
    </section>
  );
};
```

**Data Source:**
```typescript
// src/data/hero.ts
export const heroData = {
  title: "Serverless Static Website Template",
  subtitle: "AWS + React + Vite - Production Ready",
  ctaText: "Get Started",
  ctaLink: "#quick-start"
};
```

## Acceptance Criteria

- [ ] Hero Section rendert mit Title + Subtitle + CTA Button
- [ ] Full-height (min-h-screen) layout
- [ ] Text ist centered und readable
- [ ] CTA Button hat hover effects
- [ ] Dark Mode funktioniert
- [ ] Mobile responsive (Font Sizes angepasst)
- [ ] Data ist externalisiert (nicht hardcoded)
- [ ] Section ID ist `hero` für Scrolling

## Requirements

### Funktional
- [ ] Large Title (h1, ~3-4xl font)
- [ ] Subtitle (p, ~xl font)
- [ ] CTA Button mit Styling + Hover Effect
- [ ] Smooth Scroll zu Section
- [ ] Data externalisiert in `src/data/hero.ts`
- [ ] Alle Acceptance Criteria erfüllt

### Technisch
- [ ] Tailwind Responsive Sizing
- [ ] Dark Mode Colors korrekt
- [ ] No `any` Types
- [ ] Unter 150 Zeilen Code

### Dokumentation
- [ ] Component Props dokumentiert
- [ ] Data Struktur dokumentiert
- [ ] Inline Comments für Layout Tricks

## Implementation Plan

**Schritt 1: Data Setup**
- [ ] `src/data/hero.ts` erstellen
- [ ] Hero Data exportieren

**Schritt 2: Component Struktur**
- [ ] `src/sections/HeroSection.tsx` erstellen
- [ ] Props Interface definieren
- [ ] Basic JSX Structure

**Schritt 3: Styling**
- [ ] Full-height Container
- [ ] Center Text Alignment
- [ ] Title + Subtitle Sizing
- [ ] Button Styling (Tailwind)

**Schritt 4: Interactivity**
- [ ] CTA Button Links zu Quick Start
- [ ] Hover States
- [ ] Dark Mode Colors

**Schritt 5: Testing**
- [ ] Rendert korrekt auf Desktop
- [ ] Responsive auf Tablet/Mobile
- [ ] Dark Mode functional
- [ ] Link funktioniert

## Dependencies

**Blockiert durch:**
- [ ] TICKET-003 (Frontend Setup)
- [ ] TICKET-004 (Tailwind Theme)
- [ ] TICKET-005 (Layout Components)

**Blockiert:**
- [ ] Keine direkt

## Notes

- Hero sollte sehr einfach sein - nur Text + Button
- Keine komplexen Animations hier (kommt später mit Framer Motion)
- CTA Button kann zu `#quick-start` linken
- Data ist externalisiert für einfache Anpassung
- Später kann Gradient Background hinzugefügt werden
