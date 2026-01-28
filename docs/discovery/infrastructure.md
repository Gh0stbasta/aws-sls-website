# Infrastructure & Technical Constraints

**Projekt:** Serverless Static Website Template  
**Datum:** 2026-01-28

---

## Cloud Provider

**Provider:** Amazon Web Services (AWS)  
**Account:** Existing AWS Account  
**Region:** Single Region (to be determined - likely `us-east-1` for cost optimization)

**Rationale:** AWS Free Tier compliant, native CloudFront + S3 integration

---

## AWS Services

### Core Services

- **S3 (Simple Storage Service)**
  - Purpose: Static file hosting (HTML, CSS, JS, images)
  - Configuration: Private bucket, OAI access only
  - Versioning: Disabled (cost optimization)
  - Encryption: SSE-S3 (default)

- **CloudFront**
  - Purpose: Content Delivery Network (CDN)
  - Price Class: PriceClass_100 (USA, Europe, Israel)
  - HTTPS: Enforced (HTTP → HTTPS redirect)
  - Caching: Default TTL 86400s (24h)

### Supporting Services

- **CloudFormation**
  - Purpose: Infrastructure deployment (via CDK)
  - Stack Management: Single stack per environment

- **IAM (Identity and Access Management)**
  - Purpose: Access control for GitHub Actions
  - Policy: Least privilege (S3 + CloudFront only)

### NOT Used (Out of Scope)

- ❌ Route53 (no custom domain)
- ❌ Certificate Manager (CloudFront default SSL)
- ❌ Lambda / Lambda@Edge
- ❌ API Gateway
- ❌ DynamoDB
- ❌ Cognito
- ❌ CloudWatch Alarms (basic monitoring only)
- ❌ WAF (Web Application Firewall)

---

## Deployment Strategy

### Infrastructure as Code (IaC)

**Tool:** AWS CDK v2  
**Language:** TypeScript  
**Deployment:** GitHub Actions (automated)

### Deployment Flow

```
Developer Push → GitHub → GitHub Actions → CDK Deploy → CloudFormation → AWS
```

**Steps:**
1. Code pushed to `main` branch
2. GitHub Actions triggered
3. Frontend build (Vite)
4. CDK synth + deploy (if infrastructure changed)
5. S3 sync (upload frontend files)
6. CloudFront invalidation

### Environments

**Single Environment:** Production only

**Rationale:** Template project, cost optimization, simplicity

---

## Data Storage

### Frontend Assets

- **Location:** S3 Bucket
- **Size:** <5GB (within Free Tier)
- **Retention:** No lifecycle policy (static assets)
- **Backup:** Not required (code is in Git)

### Logs

- **CloudFront Access Logs:** Disabled (cost optimization)
- **S3 Server Access Logs:** Disabled

**Rationale:** Template project, no production monitoring needed

---

## Security Constraints

### Network Security

- **S3 Bucket:** Private (Block Public Access enabled)
- **CloudFront OAI:** Only access method to S3
- **HTTPS:** Enforced (TLS 1.2+)

### Response Headers

- `Content-Security-Policy` (CSP)
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Secrets Management

- **GitHub Secrets:** AWS Credentials, Bucket Name, Distribution ID
- **No .env files in Git:** Enforced via `.gitignore`

---

## External Dependencies

### Build-time Dependencies

- **Node.js:** v20+ (LTS)
- **npm:** v10+ (or pnpm)
- **AWS CDK CLI:** v2.x

### Third-Party Services

**None.** All functionality is self-contained.

---

## Development Environment

### DevContainer (Required for Phase 3)

**Base Image:** `mcr.microsoft.com/devcontainers/typescript-node:20`

**Installed Tools:**
- Node.js v20+
- AWS CLI v2
- AWS CDK CLI
- Git

**VS Code Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- AWS Toolkit

### Local Development

**Requirements:**
- Docker (for DevContainer)
- VS Code (recommended)
- Git

**Optional:**
- AWS CLI (for manual deployment)
- Chrome DevTools (for debugging)

---

## Performance Constraints

### Frontend Performance

- **Initial Bundle Size:** <200KB (gzipped)
- **Page Load Time:** <2s (3G connection)
- **Lighthouse Score:** No explicit target (best effort)

### CloudFront Performance

- **Cache Hit Ratio:** >80% (after warmup)
- **TTL:** Default 24h (configurable per object type)
- **Compression:** Gzip + Brotli enabled

---

## Cost Constraints

### Budget Limit

**Target:** $0/month (AWS Free Tier)

**Free Tier Limits:**
- S3: 5GB Storage, 20,000 GET Requests
- CloudFront: 50GB Data Transfer, 2M Requests

**Assumptions (100 User/Day):**
- 3,000 Requests/Month
- 6GB Data Transfer/Month

**Result:** Within Free Tier ✅

### Cost Monitoring

- **CloudWatch Billing Alarm:** Alert if >$5/month
- **Manual Review:** Monthly AWS Cost Explorer check

---

## Compliance & Governance

### Data Residency

- **No User Data:** Static website, no PII collection
- **CloudFront Edge:** Global distribution (PriceClass_100)

### Compliance Standards

**None required.** Template project, no regulatory requirements.

---

## Scalability Constraints

### Current Limits

- **Concurrent Users:** ~1000/s (CloudFront default)
- **Storage:** 5GB (Free Tier limit)
- **Bandwidth:** 50GB/month (Free Tier limit)

### Scaling Strategy (if needed)

1. Upgrade CloudFront Price Class (→ PriceClass_All)
2. Enable CloudFront Access Logs (monitoring)
3. Add CloudWatch Alarms (traffic spikes)
4. Implement Rate Limiting (if DDoS risk)

**Current Assessment:** No scaling needed for template use case

---

## Disaster Recovery

### Backup Strategy

**None.** Infrastructure is code (CDK), frontend is in Git.

### Recovery Time Objective (RTO)

- **Infrastructure:** <10 minutes (CDK redeploy)
- **Frontend:** <5 minutes (S3 sync from local build)

### Recovery Point Objective (RPO)

- **Data Loss:** 0 (everything in Git)

---

## Technical Debt & Known Limitations

### Current Limitations

1. **No Custom Domain:** CloudFront default URL only
2. **No Staging Environment:** Direct to production
3. **No Monitoring:** Basic CloudWatch only
4. **Single Region:** No multi-region redundancy

### Accepted Technical Debt

- No comprehensive test suite (template project)
- No automated performance testing (Lighthouse CI)
- No deployment rollback mechanism

**Rationale:** Template project, not production application

---

## Approval

**Architekt:** ✅ Approved  
**Datum:** 2026-01-28
