# ADR-002: AWS Infrastructure Architecture

**Date:** 2026-01-28  
**Status:** ACCEPTED

---

## Context

Das Serverless Static Website Template benötigt eine **kostengünstige, skalierbare und sichere** AWS-Infrastruktur für Static Hosting.

**Requirements:**
- Kostenlos für Traffic bis 100 User/Tag (AWS Free Tier compliant)
- HTTPS enforcement
- Security Headers (CSP, HSTS, etc.)
- Globale Content Delivery (CloudFront)
- Deployment via Infrastructure as Code (IaC)

---

## Decision

**Infrastructure Stack:**
- **Storage:** S3 Bucket (Private, kein Public Access)
- **CDN:** CloudFront Distribution
- **IaC Tool:** AWS CDK (TypeScript)
- **Deployment:** GitHub Actions

**Architecture:**

```
[User] → [CloudFront Distribution] → [S3 Bucket (Origin)]
            ↓
    [Security Headers]
    [HTTPS Enforcement]
    [Caching]
```

**Key Components:**

1. **S3 Bucket:**
   - Private (Block Public Access enabled)
   - Versioning disabled (cost optimization)
   - Lifecycle Policy: Delete old versions after 7 days
   - Encryption: SSE-S3 (default)

2. **CloudFront Distribution:**
   - Origin Access Identity (OAI) für S3 Access
   - Price Class: PriceClass_100 (USA, Europe, Israel - cost optimized)
   - Default Root Object: `index.html`
   - Error Pages: Custom 404 → `index.html` (SPA support)
   - HTTPS Only (HTTP → HTTPS Redirect)
   - Security Headers via Response Headers Policy

3. **CloudFront Response Headers Policy:**
   - `Content-Security-Policy` (CSP)
   - `Strict-Transport-Security` (HSTS)
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`

---

## Rationale

### AWS CDK (TypeScript)

**Vorteile:**
- Infrastructure as Code (versioniert, wiederholbar)
- TypeScript → Type-Safety, gleiche Sprache wie Frontend
- Synthetisiert CloudFormation (AWS-native)
- Einfachere Abstraktion als reine CloudFormation
- Gute IDE-Unterstützung (IntelliSense)

**Alternativen:**
1. **Terraform** - Verworfen: Multi-Cloud nicht notwendig, AWS CDK besser für AWS
2. **CloudFormation (YAML)** - Verworfen: Verbose, keine Type-Safety
3. **Serverless Framework** - Verworfen: Overkill für Static Site
4. **AWS SAM** - Verworfen: Lambda-fokussiert, nicht ideal für Static Hosting

### S3 + CloudFront (vs. Alternativen)

**Vorteile:**
- **Cost:** AWS Free Tier (5GB S3, 50GB CloudFront/Monat)
- **Performance:** Global CDN, Edge Caching
- **Security:** OAI, Security Headers, HTTPS
- **Scalability:** Auto-Scaling, kein Server Management

**Alternativen:**
1. **S3 Static Website Hosting (ohne CloudFront)** - Verworfen:
   - Kein HTTPS (nur mit Custom Domain + Certificate Manager)
   - Keine Security Headers
   - Kein Global CDN
   
2. **Amplify Hosting** - Verworfen:
   - Höhere Kosten außerhalb Free Tier
   - Weniger Kontrolle über Infrastruktur
   
3. **EC2 + Nginx** - Verworfen:
   - Hohe Kosten
   - Server Management notwendig
   - Nicht Serverless

4. **Vercel / Netlify** - Verworfen:
   - Nicht AWS
   - Requirement ist AWS-native Template

### CloudFront Price Class 100

**Rationale:**
- **Cost Optimization:** Nur Edge Locations in USA, Europe, Israel
- **Use Case:** Demo-Template, keine globale Production-Anforderung
- **Savings:** ~30% günstiger als PriceClass_All

**Trade-off:** Höhere Latency in Asien, Australien, Südamerika  
**Akzeptabel:** Demo-Zweck, Traffic kommt primär aus USA/Europe

---

## Consequences

### Positive

- ✅ **Cost:** Kostenlos für 100 User/Tag (AWS Free Tier)
- ✅ **Performance:** Global CDN, Edge Caching
- ✅ **Security:** HTTPS enforced, Security Headers, Private S3
- ✅ **Scalability:** Auto-Scaling ohne Configuration
- ✅ **Maintainability:** Kein Server Management
- ✅ **IaC:** Reproduzierbare Infrastructure via CDK

### Negative

- ⚠️ **Latency:** Höhere Latency außerhalb USA/Europe (PriceClass_100)
- ⚠️ **Custom Domain:** Nicht included (würde Route53 + Certificate Manager benötigen)
- ⚠️ **CDK Complexity:** Lernkurve für CDK (vs. manuelle AWS Console)

### Risks

- **Risiko:** CloudFront Caching führt zu stale content nach Deployment
  - **Mitigation:** CloudFront Invalidation nach jedem Deployment (`/*` Pfad)

- **Risiko:** Kosten eskalieren bei unerwartet hohem Traffic
  - **Mitigation:** CloudWatch Billing Alarm (>$5/Monat)

- **Risiko:** Security Headers können Browser-Kompatibilitätsprobleme verursachen
  - **Mitigation:** Testing auf allen Target-Browsern, CSP im report-only mode starten

---

## Implementation Notes

### CDK Stack Structure

```
infrastructure/
├── bin/
│   └── app.ts              # CDK App Entry Point
├── lib/
│   ├── storage-stack.ts    # S3 Bucket Stack
│   ├── cdn-stack.ts        # CloudFront Stack
│   └── config.ts           # Configuration
├── cdk.json                # CDK Configuration
├── tsconfig.json
└── package.json
```

### Deployment Flow

1. **Build Frontend:** `npm run build` (Vite) → `dist/` folder
2. **Synthesize CDK:** `cdk synth` → CloudFormation Template
3. **Deploy Infrastructure:** `cdk deploy` → AWS CloudFormation
4. **Upload Assets:** `aws s3 sync dist/ s3://bucket-name`
5. **Invalidate Cache:** `aws cloudfront create-invalidation`

### Cost Estimation (100 User/Day)

**Assumptions:**
- 100 User/Day = 3000 Requests/Month
- Average Page Size: 2MB (with images, fonts, etc.)
- Data Transfer: 6GB/Month

**AWS Free Tier:**
- S3: 5GB Storage, 20,000 GET Requests ✅
- CloudFront: 50GB Data Transfer, 2M Requests ✅

**Ergebnis:** $0/Month (innerhalb Free Tier)

---

## References

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [CloudFront Response Headers Policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/adding-response-headers.html)
- [S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

---

## Approval

**Architekt:** ✅ ACCEPTED  
**Datum:** 2026-01-28
