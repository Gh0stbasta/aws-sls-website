# ADR-004: Security & Deployment Credentials Strategy

**Date:** 2026-01-28  
**Status:** ACCEPTED

---

## Context

Die CI/CD Pipeline (ADR-003) benötigt Zugriff auf AWS, um Ressourcen zu deployen. Dies erfordert sichere Verwaltung von:
- AWS Account Credentials
- Deployment Permissions
- Sensible Konfigurationsdaten

Sicherheitsrisiken bei unzureichender Verwaltung:
- **Credentials im Code/Logs:** GitHub Actions speichert Logs für 90 Tage
- **Long-lived Credentials:** IAM Access Keys sind schwer zu rotieren
- **Overprivileged Access:** Unnötige Permissions erhöhen Angriffsfläche
- **Data Leakage:** Sensitive Data im Terminal Output → GitHub Workflow Logs

---

## Decision

**Sicherheitsstrategie für Deployment:**

1. **OIDC (OpenID Connect) für GitHub Actions**
   - GitHub Provider im AWS Account registriert
   - Kurzlebige, temporäre Credentials (Web Identity Tokens)
   - Keine langlebigen Access Keys im Repository

2. **IAM Deployment Role (Least Privilege)**
   - Dedizierte Role: `github-actions-deployment-role` (bereits im AWS Account konfiguriert)
   - Permissions für Frontend Deploy:
     - S3 Bucket Sync/Upload
     - CloudFront Cache Invalidation

3. **GitHub Secrets für Nicht-Credential Daten**
   - `AWS_ACCOUNT_ID` - AWS Account Number
   - `AWS_REGION` - Deployment Region
   - `AWS_ROLE_ARN` - ARN der Deployment Role (nicht secret, aber versionierbar)
   - Sämtliche sensiblen Values: Masked in Logs

4. **Output Masking & Logging Control**
   - Keine Ressourcen-ARNs oder IDs in stdout/stderr
   - `aws` CLI Flag: `--no-cli-pager` (verhindert Paging)
   - Explizites Output Redirection zu `/dev/null` für sensible Operationen
   - GitHub Secrets: Automatisch masked in Logs (redacted)

---

## Rationale

### OIDC statt Access Keys

| Aspekt | OIDC Tokens | IAM Access Keys |
|--------|------------|-----------------|
| Lebensdauer | 15 Min (kurzlebig) | Unbegrenzt |
| Rotation | Automatisch | Manuell |
| Speicherung | Nicht im Repo | In GitHub Secrets |
| Kompromittierungsrisiko | Niedrig | Mittel-Hoch |
| Rückgängig Machen | Instant (OIDC Config) | Neue Keys erstellen |

**OIDC ist Best Practice für GitHub Actions** (AWS, Google Cloud, Azure empfehlen dies)

### Least Privilege Principle

Deployment Role hat **nur diese Permissions:**
```json
{
  "Effect": "Allow",
  "Action": [
    "s3:PutObject",
    "s3:DeleteObject",
    "s3:ListBucket",
    "cloudfront:CreateInvalidation"
  ],
  "Resource": [
    "arn:aws:s3:::website-bucket/*",
    "arn:aws:cloudfront::ACCOUNT_ID:distribution/DIST_ID"
  ]
}
```

Nicht enthalten: EC2, RDS, IAM, Secrets Manager, etc.

### GitHub Secrets + Output Masking

**Warum keine Resources in Logs:**
- GitHub Actions Logs sind 90 Tage öffentlich einsehbar
- `AWS_ACCOUNT_ID`, ARNs können als Recon verwendet werden
- Output Masking: Alle `${{ secrets.* }}` Variablen werden automatisch `***` ersetzt

**Implementierung:**
```yaml
- name: Deploy
  env:
    AWS_ACCOUNT_ID: ${{ secrets.AWS_ACCOUNT_ID }}
  run: |
    # ARN wird nicht geloggt
    aws s3 sync . s3://website-bucket --quiet
    # Oder explizit:
    aws cloudfront create-invalidation ... > /dev/null
```

### Betrachtete Alternativen

1. **IAM Access Keys in Secrets** ❌
   - Langlebig, schwer zu rotieren
   - Standard vor OIDC, nicht mehr recommended
   
2. **Hardcoded AWS_PROFILE in Workflow** ❌
   - Credentials im ECR/Container sichtbar
   - Keine Audit-Möglichkeit
   
3. **Temporary STS Credentials** ⚠️
   - Funktioniert, aber manuell zu verwalten
   - OIDC ist automatisiert, besser

4. **Keine Secrets, nur Public Data** ❌
   - Account ID, Region sind semi-public
   - Aber: Trotzdem nicht in Default Logs zeigen

---

## Consequences

### Positive

- ✅ **Zero Long-lived Credentials:** Keine Access Keys im Repo
- ✅ **Automatic Rotation:** OIDC Token ist 15 Minuten gültig
- ✅ **Least Privilege:** Role hat nur notwendige Permissions
- ✅ **Audit Trail:** AWS CloudTrail zeigt OIDC Authentifizierung
- ✅ **No Data Leakage:** Resources/IDs nicht in Logs sichtbar
- ✅ **AWS Best Practice:** Empfohlen von AWS Security

### Negative

- ⚠️ **OIDC Setup Komplexität:** Einmaliges Setup im AWS Console erforderlich
- ⚠️ **Konfiguration versionierbar:** `AWS_ACCOUNT_ID`, `AWS_REGION` in Secrets (nicht im Code)
- ⚠️ **Limited to GitHub:** OIDC ist GitHub-spezifisch (nicht einfach auf andere CI/CD portierbar)

### Risks

| Risk | Mitigation |
|------|-----------|
| OIDC Provider wird kompromittiert | AWS CloudTrail Monitoring, GitHub Actions Logs Review |
| GitHub Secrets werden leaks | GitHub Org Policies, Automatic Secret Scanning |
| Deployment Role hat zu viele Permissions | IAM Policy Review in Code Review (Pull Requests) |
| Logs enthalten doch sensible Daten | Code Review für Workflows, Masking-Tests |

---

## Implementation Checklist

- [x] **AWS Account Setup:** ✅ Bereits konfiguriert
  - [x] OIDC Provider: `token.actions.githubusercontent.com` registriert
  - [x] Trust Relationship für `github-actions-deployment-role` konfiguriert
  - [x] Role Policies für S3/CloudFront gesetzt

- [x] **GitHub Secrets:** ✅ Bereits im Repository
  - [x] `AWS_ACCOUNT_ID` - 12-stellige Account Number
  - [x] `AWS_REGION` - Deployment Region
  - [x] `AWS_ROLE_ARN` - Full ARN der Deployment Role

- [ ] **Workflow File (.github/workflows/deploy.yml):**
  - [ ] `permissions: id-token: write` für OIDC
  - [ ] `aws-actions/configure-aws-credentials` mit OIDC Mode
  - [ ] Output Redirection für sensible Operationen (`> /dev/null`)
  - [ ] `--quiet` Flag für aws-cli

---

## References

- [AWS Security Best Practices: Using OpenID Connect to Access AWS from GitHub Actions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc_github.html)
- [GitHub Actions: Using OpenID Connect with AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [AWS IAM Best Practice: Principle of Least Privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege)
- [Related: ADR-003-cicd-pipeline.md](ADR-003-cicd-pipeline.md)

