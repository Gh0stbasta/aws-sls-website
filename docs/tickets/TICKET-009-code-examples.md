# TICKET-009: Code Examples Section Implementation

**Status:** OPEN  
**Assignee:** -  
**Effort:** M  
**Priority:** MEDIUM

## Context & Architecture

**Komponente:** Page Sections / Code Examples  
**Betroffene Module:** `src/sections/CodeExamplesSection.tsx`, `src/components/CodeBlock.tsx`  
**Relevante ADRs:** ADR-001 (Frontend Stack)  
**Design Pattern:** Tabbed Interface für Code Snippets

## User Story

> "Als **Developer**, möchte ich **Code Examples sehen (CDK, Deploy, etc.)**, damit **ich das Template verstehe und starten kann**."

## Contract Definition

**Code Example Data:**
```typescript
// src/data/codeExamples.ts
interface CodeExample {
  id: string;
  language: 'typescript' | 'javascript' | 'bash' | 'json';
  title: string;
  code: string;
  description: string;
}

export const codeExamplesData: CodeExample[] = [
  {
    id: 'cdk-deploy',
    language: 'bash',
    title: 'Deploy Infrastructure',
    code: 'cd packages/infrastructure\ncdk deploy',
    description: 'Deploy AWS Infrastructure with CDK'
  },
  {
    id: 'frontend-dev',
    language: 'bash',
    title: 'Start Dev Server',
    code: 'cd packages/frontend\npnpm run dev',
    description: 'Start React development server'
  },
  // ... mehr Examples
];
```

**Code Block Component:**
```typescript
// src/components/CodeBlock.tsx
interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title }) => {
  return (
    <div className="bg-slate-900 text-slate-100 p-4 rounded">
      {title && <p className="text-sm text-slate-400">{title}</p>}
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
```

## Acceptance Criteria

- [ ] Code Examples werden in Tabs angezeigt (oder Carousel)
- [ ] Code Syntax wird korrekt angezeigt
- [ ] Language Badge angezeigt (bash, typescript, etc.)
- [ ] Dark Mode Styling korrekt
- [ ] Copy Button vorhanden (optional)
- [ ] Mobile responsive (Scrollable Tabs)
- [ ] Data ist externalisiert
- [ ] Section ID ist `code-examples`

## Requirements

### Funktional
- [ ] Code Block Component mit Syntax Highlighting
- [ ] Tabbed Interface für mehrere Examples
- [ ] 5-8 Code Examples angezeigt
- [ ] Language Badge
- [ ] Optional: Copy to Clipboard Button
- [ ] Dark Mode Colors
- [ ] Alle Acceptance Criteria erfüllt

### Technisch
- [ ] Syntax Highlighting (Prism.js oder similar)
- [ ] Tabbed Navigation
- [ ] Responsive Tab Layout
- [ ] TypeScript Interfaces
- [ ] Komponenten unter 300 Zeilen
- [ ] No hardcoded code strings

### Dokumentation
- [ ] Code Example Data Struktur dokumentiert
- [ ] Syntax Highlighting Library dokumentiert
- [ ] How to add code examples dokumentiert

## Implementation Plan

**Schritt 1: Data Setup**
- [ ] `src/data/codeExamples.ts` mit 5-8 Examples
- [ ] CodeExample Interface definieren
- [ ] Verschiedene Languages: bash, typescript, json

**Schritt 2: Code Block Component**
- [ ] `src/components/CodeBlock.tsx` erstellen
- [ ] Language Badge anzeigen
- [ ] Syntax Highlighting (Prism.js oder highlight.js)
- [ ] Dark Theme für Code Block

**Schritt 3: Tabs Component**
- [ ] Simple Tabbed Interface
- [ ] Tabs Styling
- [ ] Tab Selection Logic
- [ ] Keyboard Navigation (optional)

**Schritt 4: Code Examples Section**
- [ ] `src/sections/CodeExamplesSection.tsx` erstellen
- [ ] Render Tabs + Code Blocks
- [ ] Map over codeExamplesData

**Schritt 5: Testing**
- [ ] Tabs funktionieren
- [ ] Code Syntax korrekt highlighted
- [ ] Dark Mode readable
- [ ] Mobile Responsive

## Dependencies

**Blockiert durch:**
- [ ] TICKET-003 (Frontend Setup)
- [ ] TICKET-004 (Tailwind Theme)
- [ ] TICKET-005 (Layout Components)

**Blockiert:**
- [ ] Keine direkt

## Notes

- Syntax Highlighting Library: Prism.js oder highlight.js (leicht)
- Copy Button optional für MVP (kann später hinzugefügt werden)
- Code Examples sollten praktisch & copy-paste ready sein
- 5-8 Examples reichen: CDK, Deploy, Frontend Dev, Build, etc.
- Code Strings können aus Dateien importiert werden (später)
