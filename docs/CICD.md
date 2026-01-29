# CI/CD Pipeline Documentation

## Overview

This document describes the automated CI/CD pipeline for deploying the serverless static website to AWS using GitHub Actions.

**Related ADRs:**
- [ADR-003: CI/CD Pipeline Strategy](adrs/ADR-003-cicd-pipeline.md)
- [ADR-004: Security & Deployment Credentials Strategy](adrs/ADR-004-security-deployment.md)

## Pipeline Architecture

### Workflow: Deploy to AWS

**File:** `.github/workflows/deploy.yml`

**Triggers:**
- Automatic: Push to `main` branch
- Manual: workflow_dispatch (GitHub Actions UI)

**Steps:**
1. Checkout code
2. Install pnpm package manager
3. Setup Node.js 20 with pnpm cache
4. Install dependencies (`pnpm install`)
5. Configure AWS credentials using OIDC
6. Deploy infrastructure via CDK (if changes detected)
7. Build frontend (`packages/frontend`)
8. Sync frontend to S3 bucket
9. Invalidate CloudFront cache

**Runtime:** ~5-10 minutes per deployment

## Required GitHub Secrets

The following secrets must be configured in your GitHub repository settings:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `AWS_ROLE_ARN` | ARN of the GitHub Actions deployment role | `arn:aws:iam::123456789012:role/github-actions-deployment-role` |
| `AWS_REGION` | AWS region for deployment | `us-east-1` |
| `WEBSITE_BUCKET` | S3 bucket name for website files | `aws-sls-website-prod` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID | `E1234ABCDEFGH` |

### Setting Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret from the table above

## AWS OIDC Setup

This pipeline uses **OpenID Connect (OIDC)** for secure, temporary AWS credential generation. This eliminates the need for long-lived access keys.

### Prerequisites

- AWS Account
- AWS CDK bootstrapped in target account and region (run `cdk bootstrap` if not already completed)
- GitHub repository

### Step 1: Create OIDC Identity Provider in AWS

1. Open **AWS IAM Console** → **Identity Providers**
2. Click **Add provider**
3. Configure:
   - **Provider type:** OpenID Connect
   - **Provider URL:** `https://token.actions.githubusercontent.com`
   - **Audience:** `sts.amazonaws.com`
4. Click **Add provider**

### Step 2: Create IAM Deployment Role

1. Open **IAM Console** → **Roles** → **Create role**
2. **Trusted entity type:** Web identity
3. **Identity provider:** `token.actions.githubusercontent.com`
4. **Audience:** `sts.amazonaws.com`
5. Click **Next**

### Step 3: Configure Trust Relationship

Edit the trust relationship to restrict access to your specific GitHub repository:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_ORG/YOUR_REPO:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

Replace:
- `YOUR_ACCOUNT_ID` with your AWS account ID
- `YOUR_GITHUB_ORG/YOUR_REPO` with your GitHub organization/username and repository name

### Step 4: Attach IAM Permissions Policy

Create and attach a policy with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3BucketAccess",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    },
    {
      "Sid": "CDKDeploymentPermissions",
      "Effect": "Allow",
      "Action": [
        "cloudformation:DescribeStacks",
        "cloudformation:CreateChangeSet",
        "cloudformation:ExecuteChangeSet",
        "cloudformation:DescribeChangeSet",
        "cloudformation:DeleteChangeSet",
        "cloudformation:GetTemplate"
      ],
      "Resource": "arn:aws:cloudformation:*:YOUR_ACCOUNT_ID:stack/WebsiteStack/*"
    },
    {
      "Sid": "CDKAssetBucket",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::cdk-*-assets-YOUR_ACCOUNT_ID-*",
        "arn:aws:s3:::cdk-*-assets-YOUR_ACCOUNT_ID-*/*"
      ]
    }
  ]
}
```

**Note on CDK Permissions:** The above policy covers the basic deployment needs. For full CDK infrastructure deployment (creating S3 buckets, CloudFront distributions, IAM roles, etc.), additional permissions are required. During initial setup, you may need broader permissions or consider using AWS's recommended CDK execution policy. After the infrastructure is deployed, you can restrict the role to the minimal permissions shown above for ongoing deployments.

Replace:
- `YOUR_BUCKET_NAME` with your S3 bucket name
- `YOUR_ACCOUNT_ID` with your AWS account ID
- `YOUR_DISTRIBUTION_ID` with your CloudFront distribution ID

### Step 5: Save Role ARN

Copy the Role ARN (e.g., `arn:aws:iam::123456789012:role/github-actions-deployment-role`) and add it to GitHub Secrets as `AWS_ROLE_ARN`.

## Deployment Workflow

### Automatic Deployment

Every push to the `main` branch automatically triggers deployment:

```bash
git checkout main
git pull origin main
# Make your changes
git add .
git commit -m "feat: update website content"
git push origin main
# Deployment starts automatically - check GitHub Actions tab
```

### Manual Deployment

Trigger deployment manually from GitHub UI:

1. Go to **Actions** tab in GitHub repository
2. Select **Deploy to AWS** workflow
3. Click **Run workflow**
4. Select branch (usually `main`)
5. Click **Run workflow** button

## Monitoring Deployments

### GitHub Actions UI

1. Go to **Actions** tab in repository
2. Click on the latest workflow run
3. View logs for each step
4. Check for errors or warnings

### AWS CloudFormation Console

1. Open **AWS CloudFormation Console**
2. Find stack: `WebsiteStack`
3. View stack events and outputs

### CloudFront Distribution

After deployment, access your website at:
- CloudFront URL: `https://YOUR_DISTRIBUTION_ID.cloudfront.net`
- Custom domain (if configured): `https://yourdomain.com`

## Troubleshooting

### Deployment Fails: Authentication Error

**Error:** `Error: Not authorized to perform sts:AssumeRoleWithWebIdentity`

**Solution:**
1. Verify `AWS_ROLE_ARN` secret is correct
2. Check OIDC provider is configured in AWS
3. Verify trust relationship includes your repository
4. Ensure workflow has `id-token: write` permission

### Deployment Fails: S3 Access Denied

**Error:** `An error occurred (AccessDenied) when calling the PutObject operation`

**Solution:**
1. Verify `WEBSITE_BUCKET` secret matches actual bucket name
2. Check IAM role has `s3:PutObject` permission for the bucket
3. Ensure bucket exists (deploy CDK stack first)

### Deployment Fails: CloudFront Invalidation Error

**Error:** `An error occurred (InvalidArgument) when calling the CreateInvalidation operation`

**Solution:**
1. Verify `CLOUDFRONT_DISTRIBUTION_ID` secret is correct
2. Check IAM role has `cloudfront:CreateInvalidation` permission
3. Ensure distribution exists (deploy CDK stack first)

### Build Fails: pnpm Install Error

**Error:** `ERR_PNPM_NO_MATCHING_VERSION`

**Solution:**
1. Check `pnpm-lock.yaml` is committed
2. Verify Node.js version is 20+
3. Try `pnpm install --no-frozen-lockfile` locally and commit updated lockfile

### CDK Deploy Fails

**Error:** `Policy statement must contain resources`

**Solution:**
1. Check IAM role has CloudFormation permissions
2. Verify CDK bootstrap is completed in your AWS account
3. Run `cdk bootstrap` if needed

## Security Considerations

### No Long-lived Credentials

- Pipeline uses OIDC tokens (valid for 15 minutes)
- No AWS access keys stored in repository
- Automatic credential rotation

### Secrets Masking

- GitHub automatically masks secrets in logs
- CloudFront and S3 operations use `--quiet` flag
- Sensitive output redirected to `/dev/null`

### Least Privilege

- IAM role has minimal required permissions
- Scoped to specific S3 bucket and CloudFront distribution
- No access to other AWS services

### Audit Trail

- All deployments logged in GitHub Actions
- AWS CloudTrail tracks OIDC authentication
- CloudFormation events show infrastructure changes

## Performance Optimization

### Cache Usage

- pnpm modules cached between runs (after pnpm is installed)
- Node.js setup uses pnpm cache
- Reduces install time for subsequent runs

### Parallel Operations

- Frontend build and CDK deployment could run in parallel (not implemented for simplicity)
- S3 sync uses multipart upload for large files

### Conditional Deployment

- CDK automatically skips if no infrastructure changes
- CloudFront invalidation only on successful S3 sync

## Cost Estimation

GitHub Actions costs (free tier):
- Free for public repositories
- Private repositories: 2000 minutes/month free
- Each deployment: ~5-10 minutes
- Cost per deployment (over free tier): ~$0.008-0.016

AWS costs:
- CloudFormation: Free
- S3 API calls: ~$0.005 per 1000 requests
- CloudFront invalidations: First 1000/month free, then $0.005 each

**Total monthly cost:** $0-5 for typical usage

## Related Documentation

- [README.md](../README.md) - Project overview
- [ADR-003: CI/CD Pipeline](adrs/ADR-003-cicd-pipeline.md)
- [ADR-004: Security & Deployment](adrs/ADR-004-security-deployment.md)

---

**Last Updated:** January 2026  
**Version:** 1.0
