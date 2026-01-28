# TICKET-010: Quick Start Section Implementation

**Status:** OPEN  
**Assignee:** -  
**Effort:** S  
**Priority:** HIGH

## Context & Architecture

**Komponente:** Page Sections / Quick Start  
**Betroffene Module:** `src/sections/QuickStartSection.tsx`  
**Relevante ADRs:** ADR-001 (Frontend Stack)  
**Design Pattern:** Stepper/Timeline Component

## User Story

> "Als **New Developer**, möchte ich **Quick Start Instructions sehen**, damit **ich das Template schnell zum Laufen bekomme**."

## Contract Definition

**Quick Start Steps:**
```typescript
// src/data/quickStart.ts
interface QuickStartStep {
  id: string;
  number: number;
  title: string;
  description: string;
  command?: string; // Optional command to run
}

export const quickStartStepsData: QuickStartStep[] = [
  {
    id: 'clone',
    number: 1,
    title: 'Clone Repository',
    description: 'Clone the template repository',
    command: 'git clone https://github.com/user/aws-sls-website'
  },
  {
    id: 'install',
    number: 2,
    title: 'Install Dependencies',
    description: 'Install pnpm and dependencies',
    command: 'pnpm install'
  },
  {
    id: 'dev',
    number: 3,
    title: 'Start Dev Server',
    description: 'Run frontend development server',
    command: 'cd packages/frontend && pnpm run dev'
  },
  {
    id: 'deploy',
    number: 4,
    title: 'Deploy to AWS',
    description: 'Deploy infrastructure and frontend',
    command: 'cd packages/infrastructure && cdk deploy'
  },
];
```

**Quick Start Section:**
```typescript
// src/sections/QuickStartSection.tsx
export const QuickStartSection: React.FC = () => {
  return (
    <section id="quick-start">
      <h2>Quick Start</h2>
      <div className="space-y-6">
        {quickStartStepsData.map(step => (
          <QuickStartStep key={step.id} step={step} />
        ))}
      </div>
    </section>
  );
};
```

## Acceptance Criteria

- [ ] Quick Start Steps werden in Reihenfolge angezeigt
- [ ] Step Number wird angezeigt (1, 2, 3, 4)
- [ ] Step Title + Description
- [ ] Optional Command wird angezeigt (mit Code Block)
- [ ] Step Indicator (z.B. Circle mit Number)
- [ ] Dark Mode funktioniert
- [ ] Mobile responsive
- [ ] Section ID ist `quick-start`

## Requirements

### Funktional
- [ ] 4-5 Quick Start Steps
- [ ] Step Indicator (Visual)
- [ ] Title + Description pro Step
- [ ] Commands sind copy-paste ready
- [ ] Vertical Timeline/Stepper Layout
- [ ] All Acceptance Criteria erfüllt

### Technisch
- [ ] Simple Timeline/Stepper Component
- [ ] No complex libraries
- [ ] TypeScript Interfaces
- [ ] Tailwind Styling für Timeline
- [ ] Under 200 Lines Code

### Dokumentation
- [ ] Quick Start Data Struktur dokumentiert
- [ ] Timeline Component dokumentiert
- [ ] How to customize steps dokumentiert

## Implementation Plan

**Schritt 1: Data Setup**
- [ ] `src/data/quickStart.ts` mit 4-5 Steps
- [ ] QuickStartStep Interface definieren

**Schritt 2: Step Component**
- [ ] `src/components/QuickStartStep.tsx` erstellen
- [ ] Step Number Indicator (Circle)
- [ ] Title + Description
- [ ] Optional Command Display
- [ ] Connector Line (optional)

**Schritt 3: Quick Start Section**
- [ ] `src/sections/QuickStartSection.tsx` erstellen
- [ ] Render Steps in Reihenfolge
- [ ] Vertical Timeline Layout

**Schritt 4: Styling**
- [ ] Step Indicator (Tailwind Circle)
- [ ] Timeline Line (Optional)
- [ ] Typography Hierarchy
- [ ] Dark Mode Colors

**Schritt 5: Testing**
- [ ] Steps render korrekt
- [ ] Order ist logisch
- [ ] Commands sind korrekt
- [ ] Dark Mode readable

## Dependencies

**Blockiert durch:**
- [ ] TICKET-003 (Frontend Setup)
- [ ] TICKET-004 (Tailwind Theme)
- [ ] TICKET-005 (Layout Components)

**Blockiert:**
- [ ] Keine direkt

## Notes

- Steps sollten die echte User Journey abdecken
- Commands sollten Copy-Paste ready sein
- Nummer Indicator kann einfach CSS Circle sein
- Timeline Line optional (nice-to-have)
- Later: Interaktive Steps mit Checklists
