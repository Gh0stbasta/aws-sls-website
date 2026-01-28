# Data Model & API Sketch

**Projekt:** Serverless Static Website Template  
**Datum:** 2026-01-28

---

## Overview

Da dies eine **Static Website** ohne Backend ist, gibt es:
- ❌ Kein klassisches Data Model (keine Datenbank)
- ❌ Keine REST/GraphQL API

Stattdessen dokumentieren wir hier:
- ✅ Frontend Component Structure
- ✅ Content Model (Sections, Data)
- ✅ CDK Infrastructure Model

---

## Frontend Component Architecture

### Component Tree

```
<App>
├── <ThemeProvider>           # Dark/Light Mode Context
│   ├── <Header>              # Navigation, Theme Toggle
│   ├── <HeroSection>         # Landing Hero mit Animations
│   ├── <FeaturesSection>     # Features Grid
│   ├── <ArchitectureSection> # AWS Architecture Diagram
│   ├── <CodeExamplesSection> # CDK Code Snippets
│   ├── <QuickStartSection>   # Getting Started Guide
│   └── <Footer>              # Links, Copyright
└── <ScrollManager>           # Smooth Scroll, Scroll-Triggered Animations
```

### Component Interfaces (TypeScript)

#### App.tsx
```typescript
interface AppProps {}

interface AppState {
  theme: 'light' | 'dark';
}
```

#### HeroSection.tsx
```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}
```

#### FeaturesSection.tsx
```typescript
interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}
```

#### ArchitectureSection.tsx
```typescript
interface ArchitectureNode {
  id: string;
  label: string;
  type: 'service' | 'flow';
  description: string;
}

interface ArchitectureSectionProps {
  nodes: ArchitectureNode[];
}
```

#### CodeExamplesSection.tsx
```typescript
interface CodeExample {
  id: string;
  language: 'typescript' | 'javascript' | 'bash';
  title: string;
  code: string;
  description: string;
}

interface CodeExamplesSectionProps {
  examples: CodeExample[];
}
```

---

## Content Model (Static Data)

### Site Metadata

```typescript
interface SiteMetadata {
  title: string;          // "AWS Serverless Website Template"
  description: string;    // SEO Description
  author: string;
  repository: string;     // GitHub Repo URL
  version: string;        // "1.0.0"
}
```

### Features Data

```typescript
const features: Feature[] = [
  {
    id: 'f1',
    icon: '<CloudIcon />',
    title: 'Serverless Architecture',
    description: 'Zero server management with S3 + CloudFront'
  },
  {
    id: 'f2',
    icon: '<CodeIcon />',
    title: 'Infrastructure as Code',
    description: 'AWS CDK with TypeScript for reproducible deployments'
  },
  {
    id: 'f3',
    icon: '<RocketIcon />',
    title: 'Deploy in <5 Minutes',
    description: 'Automated GitHub Actions pipeline'
  },
  {
    id: 'f4',
    icon: '<DollarIcon />',
    title: 'AWS Free Tier Optimized',
    description: 'Kostenlos für 100 User/Tag'
  },
  {
    id: 'f5',
    icon: '<ShieldIcon />',
    title: 'Security Best Practices',
    description: 'HTTPS enforced, Security Headers, Private S3'
  },
  {
    id: 'f6',
    icon: '<SparklesIcon />',
    title: 'Modern React Stack',
    description: 'React 18, TypeScript, Vite, Tailwind, Framer Motion'
  }
];
```

### Code Examples Data

```typescript
const codeExamples: CodeExample[] = [
  {
    id: 'ex1',
    language: 'typescript',
    title: 'CDK S3 Bucket',
    description: 'S3 Bucket with CloudFront OAI',
    code: `const bucket = new s3.Bucket(this, 'WebsiteBucket', {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  encryption: s3.BucketEncryption.S3_MANAGED,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});`
  },
  {
    id: 'ex2',
    language: 'typescript',
    title: 'CloudFront Distribution',
    description: 'CDN with Security Headers',
    code: `const distribution = new cloudfront.Distribution(this, 'CDN', {
  defaultBehavior: {
    origin: new origins.S3Origin(bucket, {
      originAccessIdentity: oai,
    }),
    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
  },
  defaultRootObject: 'index.html',
});`
  },
  {
    id: 'ex3',
    language: 'bash',
    title: 'Deploy Command',
    description: 'One-command deployment',
    code: `npm run deploy`
  }
];
```

---

## CDK Infrastructure Model

### Stack Architecture

```
CDKApp
└── WebsiteStack
    ├── S3Bucket (WebsiteBucket)
    ├── CloudFrontOAI (OriginAccessIdentity)
    ├── CloudFrontDistribution (CDN)
    └── OutputParameters
        ├── BucketName
        └── DistributionId
```

### CDK Constructs (TypeScript Interfaces)

#### WebsiteStackProps

```typescript
interface WebsiteStackProps extends cdk.StackProps {
  stage: 'dev' | 'staging' | 'prod';  // Future: Multi-environment
  domainName?: string;                 // Future: Custom domain
}
```

#### S3 Bucket Configuration

```typescript
interface BucketConfig {
  bucketName: string;                  // Auto-generated or custom
  blockPublicAccess: boolean;          // true (always)
  encryption: 'S3_MANAGED' | 'KMS';    // S3_MANAGED (default)
  versioning: boolean;                 // false (cost optimization)
  removalPolicy: 'DESTROY' | 'RETAIN'; // DESTROY (dev), RETAIN (prod)
}
```

#### CloudFront Configuration

```typescript
interface CloudFrontConfig {
  priceClass: 'PriceClass_100' | 'PriceClass_200' | 'PriceClass_All';
  defaultRootObject: string;           // 'index.html'
  errorResponses: ErrorResponse[];
  viewerProtocolPolicy: 'REDIRECT_TO_HTTPS' | 'HTTPS_ONLY';
  responseHeadersPolicy: ResponseHeadersPolicyConfig;
}

interface ErrorResponse {
  httpStatus: number;                  // 404
  responseHttpStatus: number;          // 200
  responsePagePath: string;            // '/index.html' (SPA routing)
  ttl: number;                         // 300 seconds
}

interface ResponseHeadersPolicyConfig {
  securityHeadersBehavior: {
    contentSecurityPolicy: string;
    strictTransportSecurity: string;
    contentTypeOptions: string;
    frameOptions: string;
    referrerPolicy: string;
  };
}
```

---

## Folder Structure (Frontend)

```
frontend/
├── public/
│   ├── favicon.ico
│   └── robots.txt (optional)
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── ArchitectureSection.tsx
│   │   ├── CodeExamplesSection.tsx
│   │   └── QuickStartSection.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   ├── utils/
│   │   └── constants.ts
│   ├── styles/
│   │   └── globals.css
│   ├── data/
│   │   ├── features.ts
│   │   └── codeExamples.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Folder Structure (Infrastructure)

```
infrastructure/
├── bin/
│   └── app.ts              # CDK App Entry Point
├── lib/
│   ├── website-stack.ts    # Main Stack
│   └── config.ts           # Configuration
├── test/
│   └── website-stack.test.ts
├── cdk.json
├── tsconfig.json
└── package.json
```

---

## State Management

### Theme State (Context API)

```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
```

**Storage:** `localStorage` (`theme` key)

### No Additional State Management

- ❌ Kein Redux (zu komplex für Static Site)
- ❌ Kein Zustand (nicht benötigt)
- ✅ React Context für Theme (ausreichend)

---

## Routing

### Single-Page Application (SPA)

**No React Router** (Version 1 - Single Page)

**Future Enhancement (Out of Scope):**
- React Router für Multi-Page
- Anchor Links für Section Navigation (`#features`, `#architecture`)

**Current Implementation:**
- Smooth Scroll zu Sections via `scrollIntoView()`
- Header Links triggern Scroll

---

## API Contracts (None)

Da keine Backend-API vorhanden ist:

- ❌ Keine REST Endpoints
- ❌ Keine GraphQL Schema
- ❌ Keine WebSocket Connections

**Static Data Only:**
- Alle Inhalte sind hardcoded in TypeScript Files
- Keine Runtime Data Fetching

---

## Approval

**Architekt:** ✅ Approved  
**Datum:** 2026-01-28

Data Model & Component Architecture ist klar definiert. Phase 1 ist abgeschlossen.
