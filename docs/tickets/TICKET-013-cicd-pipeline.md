# TICKET-013: GitHub Actions CI/CD Pipeline

**Status:** OPEN  
**Assignee:** -  
**Effort:** M  
**Priority:** CRITICAL

## Context & Architecture

**Komponente:** CI/CD Infrastructure  
**Betroffene Module:** `.github/workflows/deploy.yml`  
**Relevante ADRs:** ADR-003 (CI/CD Pipeline), ADR-004 (Security & Deployment)  
**Design Pattern:** Automated Deployment on Push to Main

## User Story

> "Als **Entwickler**, möchte ich **automatisches Deployment auf Push zu main**, damit **der Deploy prozess automatisiert und zuverlässig ist**."

## Contract Definition

**Workflow File:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Configure AWS Credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: ${{ secrets.AWS_REGION }}
      
      - name: Build Frontend
        run: cd packages/frontend && pnpm run build
      
      - name: Deploy Infrastructure (CDK)
        run: cd packages/infrastructure && cdk deploy --require-approval never
      
      - name: Deploy Frontend to S3
        run: |
          aws s3 sync packages/frontend/dist s3://${{ secrets.WEBSITE_BUCKET }} \
            --delete \
            --quiet
      
      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*" \
            > /dev/null
```

## Acceptance Criteria

- [ ] Workflow triggert on push zu main
- [ ] OIDC Authentication funktioniert
- [ ] Frontend build läuft durch
- [ ] CDK deploy läuft durch (oder skippt wenn no changes)
- [ ] S3 Sync deployiert Frontend Files
- [ ] CloudFront Cache wird invalidiert
- [ ] No Secrets in Logs (Output Masking)
- [ ] Workflow Status ist sichtbar auf GitHub

## Requirements

### Funktional
- [ ] Automatic deploy on push main
- [ ] Manual trigger via workflow_dispatch
- [ ] Node.js 20 Runtime
- [ ] pnpm Install & Build
- [ ] Frontend Build Artifact
- [ ] CDK Deploy (if infrastructure changes)
- [ ] S3 Sync with --delete flag
- [ ] CloudFront Invalidation
- [ ] All Acceptance Criteria erfüllt

### Technisch
- [ ] OIDC Token Authentication (no Access Keys)
- [ ] Secrets: AWS_ACCOUNT_ID, AWS_REGION, AWS_ROLE_ARN, WEBSITE_BUCKET, CLOUDFRONT_DISTRIBUTION_ID
- [ ] No hardcoded values
- [ ] Output redirection to /dev/null (Security)
- [ ] --quiet flags für aws-cli
- [ ] Smart caching (pnpm cache)

### Dokumentation
- [ ] Workflow file dokumentiert
- [ ] Required Secrets dokumentiert
- [ ] Troubleshooting Guide
- [ ] How to trigger manual deploy

## Implementation Plan

**Schritt 1: Workflow Setup**
- [ ] `.github/workflows/deploy.yml` erstellen
- [ ] Trigger: push main + workflow_dispatch
- [ ] Permissions: contents read, id-token write

**Schritt 2: Environment Setup**
- [ ] Checkout Code
- [ ] Setup Node.js 20
- [ ] Install pnpm
- [ ] pnpm install

**Schritt 3: OIDC Authentication**
- [ ] aws-actions/configure-aws-credentials
- [ ] OIDC Role Assume
- [ ] AWS_REGION aus Secrets

**Schritt 4: Build & Deploy**
- [ ] Frontend build: `pnpm run build`
- [ ] CDK deploy: `cdk deploy --require-approval never`
- [ ] S3 sync: mit --delete flag
- [ ] CloudFront invalidate: `/*` path

**Schritt 5: Output Masking & Logging**
- [ ] aws commands mit `--quiet` flag
- [ ] Outputs zu `/dev/null` redirect
- [ ] No ARNs/IDs in logs
- [ ] Test full workflow

## Dependencies

**Blockiert durch:**
- [ ] TICKET-002 (CDK Infrastructure - braucht Stack)
- [ ] TICKET-003 (Frontend - braucht build output)
- [ ] TICKET-012 (Documentation - referenced in Workflow)

**Blockiert:**
- [ ] Keine (last ticket)

## Notes

- OIDC Setup ist bereits im AWS Account vorhanden
- GitHub Secrets sind bereits konfiguriert
- `cdk deploy --require-approval never` ist für unattended deploy
- `--delete` flag bei S3 sync entfernt alte files
- CloudFront Invalidation braucht DISTRIBUTION_ID (aus TICKET-002)
- Test Workflow mit manual trigger vor production push
- No Access Keys - nur OIDC!
