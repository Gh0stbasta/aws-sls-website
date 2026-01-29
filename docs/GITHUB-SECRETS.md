# GitHub Actions Secrets - Quick Reference

This file documents the required GitHub Secrets for the CI/CD pipeline.

## Required Secrets

Configure these secrets in: **Settings → Secrets and variables → Actions**

| Secret Name | Description | Example | How to Get |
|------------|-------------|---------|------------|
| `AWS_ROLE_ARN` | ARN of the GitHub Actions deployment role | `arn:aws:iam::123456789012:role/github-actions-deployment-role` | AWS IAM Console → Roles → Copy ARN |
| `AWS_REGION` | AWS region for deployment | `us-east-1` | Choose your preferred region |
| `WEBSITE_BUCKET` | S3 bucket name for website files | `aws-sls-website-prod` | From CDK deployment output |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID | `E1234ABCDEFGH` | From CDK deployment output or CloudFront Console |

## Setup Instructions

1. **Deploy Infrastructure First** (locally or manually):
   ```bash
   cd packages/infrastructure
   pnpm install
   pnpm run cdk:deploy
   ```
   This will output the `WEBSITE_BUCKET` and `CLOUDFRONT_DISTRIBUTION_ID` values.

2. **Configure OIDC** in AWS (see [docs/CICD.md](CICD.md) for detailed steps):
   - Create OIDC identity provider
   - Create deployment role with trust relationship
   - Note the Role ARN

3. **Add Secrets to GitHub**:
   - Go to repository **Settings**
   - Click **Secrets and variables** → **Actions**
   - Click **New repository secret** for each secret
   - Paste the values from steps 1 and 2

## Verification

After adding secrets, trigger the workflow manually:
1. Go to **Actions** tab
2. Select **Deploy to AWS** workflow
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow** button

Check the workflow logs for any authentication or permission errors.

## Security Notes

- Secrets are automatically masked in workflow logs (displayed as `***`)
- OIDC provides temporary credentials (valid for 15 minutes)
- No long-lived AWS access keys are stored
- Review [docs/CICD.md](CICD.md) for complete security considerations

---

**Related Documentation:**
- [CI/CD Pipeline Documentation](CICD.md)
- [ADR-004: Security & Deployment](adrs/ADR-004-security-deployment.md)
