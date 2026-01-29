# ADR-003: CI/CD Pipeline Strategy

**Date:** 2026-01-28  
**Status:** ACCEPTED

---

## Context

Das Template benötigt eine automatisierte Deployment-Pipeline, die:
- Bei jedem Push auf `main` Branch deployed
- Frontend baut und auf S3 hochlädt
- CloudFront Cache invalidiert
- Kostengünstig ist (GitHub Actions Free Tier)
- Einfach zu verstehen und zu warten ist

---

## Decision

**CI/CD Tool:** GitHub Actions

**Pipeline Strategy:**
- Single Environment (Production only)
- Automated Deployment on Push to `main`
- Manual Workflow Dispatch möglich

**Workflow:**

```yaml
Trigger: Push to main
├── Step 1: Checkout Code
├── Step 2: Setup Node.js
├── Step 3: Install Dependencies (Frontend)
├── Step 4: Build Frontend (Vite)
├── Step 5: Setup AWS Credentials
├── Step 6: Deploy CDK Stacks (if changed)
├── Step 7: Sync Frontend to S3
└── Step 8: Invalidate CloudFront Cache
```

---

## Rationale

### GitHub Actions

**Vorteile:**
- Nativ in GitHub integriert
- Free Tier: 2000 Minutes/Month (ausreichend)
- YAML-basiert (versioniert im Repo)
- Große Marketplace (AWS Actions, etc.)
- Secrets Management integriert

**Alternativen:**
1. **AWS CodePipeline** - Verworfen: Höhere Kosten, komplexere Setup
2. **GitLab CI** - Verworfen: Projekt ist auf GitHub
3. **CircleCI** - Verworfen: External Service, weniger GitHub Integration
4. **Manual Deployment** - Verworfen: Fehleranfällig, nicht reproduzierbar

### Single Environment (Production Only)

**Rationale:**
- Template-Projekt (kein Business-Critical)
- Cost Optimization (keine Multi-Environment Costs)
- Simplicity (weniger Komplexität)

**Trade-off:** Kein Staging Environment für Testing vor Production  
**Akzeptabel:** Template kann lokal getestet werden, kein echte Nutzer

---

## Consequences

### Positive

- ✅ **Automation:** Deployment bei jedem Push automatisch
- ✅ **Cost:** GitHub Actions Free Tier (kostenlos)
- ✅ **Simplicity:** Eine Pipeline, leicht zu verstehen
- ✅ **Reproducibility:** Versioniert im Repo (`.github/workflows/`)
- ✅ **Speed:** Deployment in <5 Minuten

### Negative

- ⚠️ **No Staging:** Kein Pre-Production Testing Environment
- ⚠️ **Main Branch Dependency:** Jeder Merge deployed sofort
- ⚠️ **AWS Credentials:** Müssen als GitHub Secrets hinterlegt werden

### Risks

- **Risiko:** Broken Build wird direkt deployed
  - **Mitigation:** PR Checks (Linting, Type-Checking) vor Merge

- **Risiko:** AWS Credentials Leak (GitHub Secrets)
  - **Mitigation:** Least Privilege IAM Policy, Read-only für alle außer Deployment

- **Risiko:** GitHub Actions Downtime verhindert Deployment
  - **Mitigation:** Manual Deployment-Script als Fallback (`deploy.sh`)

---

## Implementation Notes

### GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

**Key Steps:**

1. **AWS Credentials Setup (OIDC):**
   ```yaml
   - uses: aws-actions/configure-aws-credentials@v4
     with:
       role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE_ARN }}
       aws-region: ${{ secrets.AWS_REGION }}
   ```

2. **CDK Deployment (only if infrastructure changed):**
   ```yaml
   - name: Deploy CDK
     run: |
       cd packages/infrastructure
       pnpm run cdk:deploy
     env:
       AWS_ACCOUNT_ID: ${{ secrets.AWS_ACCOUNT_ID }}
   ```

3. **S3 Sync:**
   ```yaml
   - name: Sync to S3
     run: |
       aws s3 sync frontend/dist s3://${{ steps.stack-outputs.outputs.bucket-name }} --delete
   ```

4. **CloudFront Invalidation:**
   ```yaml
   - name: Invalidate CloudFront
     run: |
       aws cloudfront create-invalidation \
         --distribution-id ${{ steps.stack-outputs.outputs.distribution-id }} \
         --paths "/*"
   ```

### Required GitHub Secrets

- `AWS_ACCOUNT_ID`
- `AWS_DEPLOY_ROLE_ARN`
- `AWS_REGION`

**Note:** Bucket name and CloudFront distribution ID are retrieved automatically from CDK stack outputs.

### IAM Policy (Least Privilege)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::bucket-name",
        "arn:aws:s3:::bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

---

## Future Enhancements (Out of Scope for V1)

- Multi-Environment (dev/staging/prod)
- Automated Screenshot Testing (Percy, Chromatic)
- Lighthouse CI (Performance Budgets)
- Deployment Preview für Pull Requests
- Rollback Mechanism

---

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS Actions for GitHub](https://github.com/aws-actions)
- [CDK Deployment Best Practices](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html)

---

## Approval

**Architekt:** ✅ ACCEPTED  
**Datum:** 2026-01-28
