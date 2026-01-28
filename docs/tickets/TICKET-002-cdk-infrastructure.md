# TICKET-002: CDK Infrastructure Setup (S3 + CloudFront)

**Status:** OPEN  
**Assignee:** -  
**Effort:** M  
**Priority:** CRITICAL

## Context & Architecture

**Komponente:** AWS Infrastructure  
**Betroffene Module:** `packages/infrastructure/lib/`  
**Relevante ADRs:** ADR-002 (AWS Infrastructure), ADR-004 (Security)  
**Design Pattern:** IaC mit AWS CDK v2 (TypeScript)

## User Story

> "Als **Deployment Engineer**, möchte ich **CDK Stacks für S3 + CloudFront**, damit **die Website statisch auf AWS gehostet wird**."

## Contract Definition

**CDK Stack Exports:**
```typescript
// lib/website-stack.ts
export interface WebsiteStackProps extends cdk.StackProps {
  bucketName: string;
  distributionId?: string; // For updates
}

export class WebsiteStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;
  public readonly bucketArn: string;
  public readonly distributionId: string;
}

// lib/index.ts (App)
const app = new cdk.App();
new WebsiteStack(app, 'WebsiteStack', {
  bucketName: 'aws-sls-website-prod',
  env: { account: process.env.AWS_ACCOUNT_ID, region: process.env.AWS_REGION }
});
```

**Deployment Output:**
- S3 Bucket (Private + OAI)
- CloudFront Distribution
- IAM Policy für GitHub Actions (bereits vorhanden, nur referenzieren)

## Acceptance Criteria

- [ ] S3 Bucket wird erstellt (Private, no public access)
- [ ] OAI (Origin Access Identity) für CloudFront ist konfiguriert
- [ ] CloudFront Distribution deployed den S3 Content
- [ ] HTTP → HTTPS Redirect ist konfiguriert
- [ ] CloudFront Default TTL ist 24h (86400s)
- [ ] CDK Synth funktioniert ohne Fehler
- [ ] `cdk deploy` funktioniert mit OIDC Credentials
- [ ] Keine Secrets in Output (Sicherheit)

## Requirements

### Funktional
- [ ] S3 Bucket mit correct name/versioning
- [ ] CloudFront Distribution mit Default Root Object (index.html)
- [ ] OAI für S3 Access only via CloudFront
- [ ] IAM Policies für GitHub Actions (S3 + CloudFront Permission)
- [ ] Error Handling für 404 → index.html (SPA)
- [ ] Alle Acceptance Criteria erfüllt

### Technisch
- [ ] CDK v2 (nicht v1)
- [ ] TypeScript Interfaces definiert
- [ ] No hardcoded values (use env vars/config)
- [ ] Outputs sind structured (keine sensitive Data in Logs)
- [ ] Stack ist idempotent (mehrfaches Deploy sollte safe sein)
- [ ] Kein Code über 500 Zeilen

### Dokumentation
- [ ] `packages/infrastructure/README.md`: How to deploy
- [ ] `cdk.json` erklärt
- [ ] Inline Comments für non-obvious CDK Decisions
- [ ] Commands: `cdk synth`, `cdk deploy`, `cdk destroy`

## Implementation Plan

**Schritt 1: CDK App Setup**
- [ ] `packages/infrastructure` als CDK App initialisieren
- [ ] `cdk.json` mit Context Variables
- [ ] `lib/website-stack.ts` Grundgerüst

**Schritt 2: S3 Bucket**
- [ ] S3 Bucket erstellen (Private, no public access)
- [ ] Versioning disabled
- [ ] BlockPublicAccess enabled
- [ ] Export bucket reference

**Schritt 3: CloudFront + OAI**
- [ ] OAI erstellen
- [ ] CloudFront Distribution mit S3 Origin
- [ ] Error Page Handling (404 → index.html)
- [ ] Cache Behavior (Default TTL 24h)

**Schritt 4: IAM Policy**
- [ ] IAM Policy für GitHub Actions referenzieren
- [ ] S3 PutObject, DeleteObject, ListBucket
- [ ] CloudFront CreateInvalidation

**Schritt 5: Testing**
- [ ] `cdk synth` generiert valid CloudFormation
- [ ] `cdk diff` zeigt Änderungen
- [ ] `cdk deploy` mit OIDC (Test mit real Credentials)

## Dependencies

**Blockiert durch:**
- [ ] TICKET-001 (Project Setup)

**Blockiert:**
- [ ] TICKET-003 (Frontend Setup - braucht Bucket Name)
- [ ] TICKET-013 (CI/CD Pipeline - braucht Stack)

## Notes

- S3 Bucket name muss globally unique sein
- CloudFront takes ~5-10 min to propagate
- Keine CloudFormation Outputs in Logs (Security - siehe ADR-004)
- CDK Stack sollte idempotent sein (no recreate on redeploy)
- Test mit real AWS Account (OIDC Auth) vor Phase 3 Completion
