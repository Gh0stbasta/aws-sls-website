# TICKET-008: Architecture Section Implementation

**Status:** OPEN  
**Assignee:** -  
**Effort:** M  
**Priority:** MEDIUM

## Context & Architecture

**Komponente:** Page Sections / Architecture  
**Betroffene Module:** `src/sections/ArchitectureSection.tsx`  
**Relevante ADRs:** ADR-002 (AWS Infrastructure)  
**Design Pattern:** Diagram Visualization (ASCII / SVG / Text-based)

## User Story

> "Als **Developer**, möchte ich **die AWS Architecture visuell sehen**, damit **ich verstehe wie das Template aufgebaut ist**."

## Contract Definition

**Architecture Data:**
```typescript
// src/data/architecture.ts
interface ArchitectureNode {
  id: string;
  label: string;
  type: 'client' | 'cdn' | 'storage' | 'deployment';
  description: string;
}

interface ArchitectureFlow {
  from: string;
  to: string;
  label: string;
}

export const architectureNodes: ArchitectureNode[] = [
  { id: 'browser', label: 'Browser', type: 'client', description: 'User browser' },
  { id: 'cloudfront', label: 'CloudFront', type: 'cdn', description: 'CDN' },
  { id: 's3', label: 'S3 Bucket', type: 'storage', description: 'Static files' },
  { id: 'github', label: 'GitHub', type: 'deployment', description: 'Source code' },
  { id: 'actions', label: 'GitHub Actions', type: 'deployment', description: 'CI/CD' },
];

export const architectureFlows: ArchitectureFlow[] = [
  { from: 'github', to: 'actions', label: 'Push' },
  { from: 'actions', to: 's3', label: 'Deploy' },
  { from: 's3', to: 'cloudfront', label: 'Origin' },
  { from: 'cloudfront', to: 'browser', label: 'Serve' },
];
```

**Architecture Section:**
```typescript
// src/sections/ArchitectureSection.tsx
export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture">
      <h2>Architecture</h2>
      <div className="bg-slate-100 dark:bg-slate-800 p-8">
        {/* ASCII Diagram oder SVG */}
        {/* Nodes und Flows visuell darstellen */}
      </div>
    </section>
  );
};
```

## Acceptance Criteria

- [ ] Architecture Diagram wird angezeigt
- [ ] Nodes (Browser, CloudFront, S3, GitHub, etc.) sind sichtbar
- [ ] Flows/Connections zwischen Nodes
- [ ] Beschreibung für jeden Node
- [ ] Dark Mode funktioniert
- [ ] Responsive auf Mobile (optional: Scrollable)
- [ ] Data ist externalisiert
- [ ] Section ID ist `architecture`

## Requirements

### Funktional
- [ ] Visual Architecture Diagram
- [ ] Alle AWS Services angezeigt (S3, CloudFront, GitHub Actions, etc.)
- [ ] Flows zeigen Datenfluss (GitHub → Actions → S3 → CloudFront → Browser)
- [ ] Node Labels + Descriptions
- [ ] Dark Mode Colors
- [ ] Alle Acceptance Criteria erfüllt

### Technisch
- [ ] ASCII Diagram oder einfaches SVG (no complex libraries)
- [ ] Responsive Layout
- [ ] TypeScript Interfaces für Nodes/Flows
- [ ] Data externalisiert
- [ ] Kein Code über 300 Zeilen

### Dokumentation
- [ ] Architecture Data Struktur dokumentiert
- [ ] Diagram Notation erklärt
- [ ] How to update diagram dokumentiert

## Implementation Plan

**Schritt 1: Data Setup**
- [ ] `src/data/architecture.ts` mit Nodes + Flows
- [ ] Interfaces für ArchitectureNode, ArchitectureFlow

**Schritt 2: Diagram Render**
- [ ] Entscheide: ASCII vs. SVG vs. Text-basiert
  - ASCII: Einfach, Monospace
  - SVG: Prettier, responsive
  - Text-based: Flexibel
- [ ] Render Nodes in Layout
- [ ] Render Flows/Connections

**Schritt 3: Styling**
- [ ] Node Boxes mit Border + Background
- [ ] Flow Arrows/Lines
- [ ] Labels für jede Connection
- [ ] Dark Mode Colors

**Schritt 4: Responsive Design**
- [ ] Desktop: Full diagram
- [ ] Tablet: Adjusted layout
- [ ] Mobile: Horizontal scrollable (optional)

**Schritt 5: Testing**
- [ ] Diagram rendert korrekt
- [ ] Alle Nodes sichtbar
- [ ] Flows logisch
- [ ] Dark Mode readable

## Dependencies

**Blockiert durch:**
- [ ] TICKET-003 (Frontend Setup)
- [ ] TICKET-004 (Tailwind Theme)
- [ ] TICKET-005 (Layout Components)

**Blockiert:**
- [ ] Keine direkt

## Notes

- MVP: ASCII Diagram mit Text-basiertem Layout (schnell zu implementieren)
- Alternative: Simple SVG mit Boxes + Arrows
- Später: Interaktive Diagram mit Hover Details
- Mobile: Kann horizontal scrollable sein oder collapsed
- Keine Graph Library (d3, vis, etc.) - zu komplex für MVP
