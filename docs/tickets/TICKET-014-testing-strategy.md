# TICKET-014: Testing Strategy & Implementation

**Status:** OPEN  
**Assignee:** -  
**Effort:** M  
**Priority:** HIGH  
**Created:** 2026-01-28

## Context & Architecture

**Komponente:** Testing Infrastructure  
**Betroffene Module:** `packages/frontend/`, `packages/infrastructure/`, Root  
**Relevante ADRs:** ADR-000 (Code Standards), ADR-001 (Frontend Stack)  
**Design Pattern:** Test-Driven Development (TDD) Ready, CI-Integration

## User Story

> "Als **Developer**, möchte ich **eine umfassende Testing-Strategie für Frontend und Infrastructure**, damit **Code-Qualität gesichert ist und Bugs früh erkannt werden**."

## Contract Definition

**Testing Layers:**
```
├── Unit Tests        # Einzelne Funktionen/Komponenten
├── Integration Tests # Zusammenspiel von Modulen
├── E2E Tests        # End-to-End User Flows (optional)
└── Infrastructure   # CDK Snapshot Tests
```

**Test Commands:**
```bash
# Root-level
pnpm test              # Run all tests
pnpm test:frontend     # Frontend tests only
pnpm test:infra        # Infrastructure tests only
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report

# Package-level
cd packages/frontend && pnpm test
cd packages/infrastructure && pnpm test
```

## Acceptance Criteria

- [ ] Test Framework installiert (Vitest für Frontend, Jest für Infrastructure)
- [ ] Frontend: Unit Tests für React Components
- [ ] Frontend: Test utilities (render helpers, mocks)
- [ ] Infrastructure: CDK Snapshot Tests
- [ ] Infrastructure: Assertion Tests für Stack Resources
- [ ] Root-level test scripts in package.json
- [ ] Coverage Reports konfiguriert (>80% Ziel)
- [ ] CI-Integration ready (für TICKET-013)

## Requirements

### Funktional
- [ ] **Frontend Testing:**
  - [ ] Vitest + React Testing Library
  - [ ] Component Unit Tests
  - [ ] Hook Testing Support
  - [ ] Mock Setup (API, Context, etc.)
  - [ ] Coverage Reports (HTML + Terminal)
  
- [ ] **Infrastructure Testing:**
  - [ ] CDK Snapshot Tests
  - [ ] Fine-grained Assertions (S3, CloudFront)
  - [ ] Stack Property Validation
  - [ ] IAM Policy Tests
  
- [ ] **Monorepo Integration:**
  - [ ] Root-level aggregate test command
  - [ ] Parallel test execution
  - [ ] Individual package test isolation
  - [ ] Shared test utilities (optional)

### Technisch
- [ ] Vitest für Frontend (schneller als Jest, native ESM)
- [ ] Jest für Infrastructure (CDK-kompatibel)
- [ ] TypeScript Support in allen Tests
- [ ] Coverage Thresholds konfiguriert
- [ ] Watch Mode für lokale Entwicklung
- [ ] CI-friendly output (TAP/JUnit XML)

### Dokumentation
- [ ] Root README: Testing Section
- [ ] `packages/frontend/README.md`: Testing Guide
- [ ] `packages/infrastructure/README.md`: Testing Guide
- [ ] Example Tests als Referenz
- [ ] Coverage Badges (optional, für README)

## Implementation Plan

### Schritt 1: Frontend Testing Setup
- [ ] `pnpm add -D vitest @testing-library/react @testing-library/jest-dom`
- [ ] `vitest.config.ts` erstellen
- [ ] `src/tests/setup.ts` für Test Environment
- [ ] Example Test: `App.test.tsx`

### Schritt 2: Infrastructure Testing Setup
- [ ] `pnpm add -D jest @types/jest ts-jest`
- [ ] `jest.config.js` erstellen
- [ ] Example Test: `website-stack.test.ts`
- [ ] CDK Snapshot Tests

### Schritt 3: Test Utilities
- [ ] Frontend: Custom render function mit Providers
- [ ] Frontend: Mock handlers (MSW optional)
- [ ] Infrastructure: Helper für Stack instantiation

### Schritt 4: Root-level Integration
- [ ] `package.json` scripts: `test`, `test:frontend`, `test:infra`
- [ ] Coverage aggregation (optional)
- [ ] Pre-commit hooks (optional, via Husky)

### Schritt 5: Documentation
- [ ] Testing best practices dokumentieren
- [ ] Example Tests kommentieren
- [ ] CI-Integration vorbereiten

## Dependencies

**Blockiert durch:**
- [ ] TICKET-001 (Project Setup)
- [ ] TICKET-003 (Frontend Setup)
- [ ] TICKET-002 (Infrastructure Setup)

**Blockiert:**
- [ ] TICKET-013 (CI/CD - braucht Tests)
- [ ] Alle Feature Tickets (sollten Tests schreiben)

## Testing Strategy Details

### Frontend Testing Scope

**Unit Tests:**
- React Components (render, props, events)
- Custom Hooks (state, effects)
- Utility Functions (helpers, formatters)

**Integration Tests:**
- Component interactions
- Context Providers
- Routing (falls vorhanden)

**Not in Scope (Phase 1):**
- E2E Tests (Playwright/Cypress)
- Visual Regression Tests
- Performance Tests

### Infrastructure Testing Scope

**CDK Snapshot Tests:**
- Entire stack CloudFormation template
- Detect unintended changes

**Fine-grained Assertions:**
- S3 Bucket properties (encryption, versioning)
- CloudFront distribution settings
- IAM policies correctness
- Resource count validation

**Not in Scope:**
- Live AWS deployment tests
- Integration with real AWS services

### Coverage Goals

| Component      | Target Coverage | Priority |
| -------------- | --------------- | -------- |
| Frontend Utils | 90%+            | High     |
| React Hooks    | 80%+            | High     |
| React Components | 70%+          | Medium   |
| CDK Stacks     | 80%+            | High     |

## Example Tests

### Frontend Example
```typescript
// packages/frontend/src/App.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument();
  });
});
```

### Infrastructure Example
```typescript
// packages/infrastructure/lib/website-stack.test.ts
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { WebsiteStack } from './website-stack';

describe('WebsiteStack', () => {
  const app = new App();
  const stack = new WebsiteStack(app, 'TestStack', {
    bucketName: 'test-bucket',
  });
  const template = Template.fromStack(stack);

  it('creates S3 bucket with correct properties', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'test-bucket',
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
      },
    });
  });

  it('creates CloudFront distribution', () => {
    template.resourceCountIs('AWS::CloudFront::Distribution', 1);
  });
});
```

## Notes

- Vitest ist schneller und moderner als Jest für Frontend
- CDK Tests sollten Snapshots + Assertions kombinieren
- Coverage Thresholds nicht zu streng am Anfang (kann später erhöht werden)
- Tests sollten schnell laufen (<5s für Unit Tests)
- Watch Mode ist wichtig für Developer Experience
- CI-Integration kommt in TICKET-013 (GitHub Actions)

## References

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [AWS CDK Testing](https://docs.aws.amazon.com/cdk/v2/guide/testing.html)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
