# TICKET-007: Features Section Implementation

**Status:** OPEN  
**Assignee:** -  
**Effort:** M  
**Priority:** HIGH

## Context & Architecture

**Komponente:** Page Sections / Features  
**Betroffene Module:** `src/sections/FeaturesSection.tsx`, `src/components/FeatureCard.tsx`  
**Relevante ADRs:** ADR-001 (Frontend Stack)  
**Design Pattern:** Grid Layout mit Card Components

## User Story

> "Als **Visitor**, möchte ich **Key Features des Templates in einer Grid anzeigen**, damit **ich schnell die Highlights verstehe**."

## Contract Definition

**Feature Data Structure:**
```typescript
// src/data/features.ts
interface Feature {
  id: string;
  icon: string; // emoji or icon name
  title: string;
  description: string;
}

export const featuresData: Feature[] = [
  {
    id: "serverless",
    icon: "⚡",
    title: "Serverless",
    description: "AWS Lambda + CloudFront for zero server management"
  },
  // ... mehr Features
];
```

**Feature Card Component:**
```typescript
// src/components/FeatureCard.tsx
interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="p-6 border rounded-lg">
      <span className="text-4xl">{feature.icon}</span>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
};
```

**Features Section:**
```typescript
// src/sections/FeaturesSection.tsx
export const FeaturesSection: React.FC = () => {
  return (
    <section id="features">
      <h2>Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresData.map(feature => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
};
```

## Acceptance Criteria

- [ ] Features Grid wird renderiert (responsive 1/2/3 Spalten)
- [ ] Feature Cards haben Styling (Border, Padding, Hover)
- [ ] Icon wird angezeigt (Emoji für MVP)
- [ ] Title + Description sind lesbar
- [ ] Dark Mode funktioniert
- [ ] Hover Effect auf Cards
- [ ] Data ist externalisiert
- [ ] Section ID ist `features`

## Requirements

### Funktional
- [ ] Grid Layout (1 col mobile, 2 col tablet, 3 col desktop)
- [ ] Feature Cards mit Icon + Title + Description
- [ ] 5-8 Features angezeigt
- [ ] Card Hover Effects (Schatten, Scale, etc.)
- [ ] Dark Mode Colors
- [ ] Alle Acceptance Criteria erfüllt

### Technisch
- [ ] Tailwind Grid/Responsive Utilities
- [ ] TypeScript Interface für Feature
- [ ] No `any` Types
- [ ] Komponenten unter 200 Zeilen
- [ ] Reusable Card Component

### Dokumentation
- [ ] Feature Data Struktur dokumentiert
- [ ] Card Component Props dokumentiert
- [ ] How to add new features dokumentiert

## Implementation Plan

**Schritt 1: Data Setup**
- [ ] `src/data/features.ts` mit 5-8 Features
- [ ] Feature Interface definieren
- [ ] Emojis oder Icons wählen

**Schritt 2: Card Component**
- [ ] `src/components/FeatureCard.tsx` erstellen
- [ ] Card Layout mit Icon/Title/Description
- [ ] Tailwind Styling (Border, Padding)
- [ ] Hover Effects

**Schritt 3: Features Section**
- [ ] `src/sections/FeaturesSection.tsx` erstellen
- [ ] Grid Layout (Responsive)
- [ ] Map over featuresData

**Schritt 4: Styling**
- [ ] Card Hover Effects (Shadow, Transform)
- [ ] Dark Mode Colors
- [ ] Typography Hierarchy

**Schritt 5: Testing**
- [ ] Grid responsive auf allen Breakpoints
- [ ] Hover Effects arbeiten
- [ ] Dark Mode korrekt
- [ ] 5-8 Features angezeigt

## Dependencies

**Blockiert durch:**
- [ ] TICKET-003 (Frontend Setup)
- [ ] TICKET-004 (Tailwind Theme)
- [ ] TICKET-005 (Layout Components)

**Blockiert:**
- [ ] Keine direkt

## Notes

- Features sollten Template Benefits hervorheben
- Emojis sind einfach, später können echte Icons hinzugefügt werden
- Card Component ist reusable (auch für andere Sections)
- Hover Effects sollten subtle sein (kein Overload)
- Features Daten können später externalisiert werden (CMS, etc.)
