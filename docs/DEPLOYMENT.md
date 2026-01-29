# Deployment Guide

Complete guide for deploying the Serverless Static Website to AWS.

## Table of Contents

- [Prerequisites](#prerequisites)
- [AWS Setup](#aws-setup)
- [Deployment Methods](#deployment-methods)
- [Manual Deployment](#manual-deployment)
- [Automated CI/CD Deployment](#automated-cicd-deployment)
- [Environment Configuration](#environment-configuration)
- [Custom Domain Setup](#custom-domain-setup)
- [Updating Deployments](#updating-deployments)
- [Rollback Procedure](#rollback-procedure)
- [Monitoring and Logs](#monitoring-and-logs)
- [Cost Optimization](#cost-optimization)

## Prerequisites

### Required

- **AWS Account** - [Sign up](https://aws.amazon.com/free/)
- **Node.js 20+** and **pnpm 9+**
- **AWS CLI v2** - [Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- **Git** - For cloning and version control

### Recommended

- **GitHub Account** - For automated CI/CD deployment
- **Basic AWS knowledge** - Understanding of S3, CloudFront, IAM
- **AWS CDK knowledge** - Helpful for infrastructure customization

## AWS Setup

### 1. Install AWS CLI

```bash
# macOS (Homebrew)
brew install awscli

# Windows (Download installer)
# https://awscli.amazonaws.com/AWSCLIV2.msi

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Verify installation
aws --version
```

### 2. Configure AWS Credentials

**Option A: AWS CLI Configure (Interactive)**

```bash
aws configure
```

You'll be prompted for:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `us-east-1`)
- Default output format (e.g., `json`)

**Option B: Manual Configuration**

Create `~/.aws/credentials`:
```ini
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

Create `~/.aws/config`:
```ini
[default]
region = us-east-1
output = json
```

**Security Best Practice:** Use IAM user with minimal permissions (see [IAM Policy](#iam-policy) below).

### 3. Bootstrap AWS CDK

CDK requires a one-time bootstrap per AWS account/region:

```bash
cd packages/infrastructure

# Bootstrap CDK (one-time setup)
npx cdk bootstrap aws://YOUR_ACCOUNT_ID/YOUR_REGION

# Example:
npx cdk bootstrap aws://123456789012/us-east-1
```

This creates:
- S3 bucket for CDK assets
- IAM roles for CloudFormation
- ECR repository (if needed)

## Deployment Methods

### Comparison

| Method | Best For | Pros | Cons |
|--------|----------|------|------|
| **Manual** | Testing, one-off deploys | Full control, immediate | Manual steps, error-prone |
| **CI/CD** | Production, team collaboration | Automated, consistent, auditable | Initial setup required |

## Manual Deployment

### Step 1: Build Frontend

```bash
# From repository root
cd packages/frontend

# Install dependencies
pnpm install

# Build production bundle
pnpm run build

# Output: dist/ folder with optimized assets
```

### Step 2: Deploy Infrastructure

```bash
# Navigate to infrastructure package
cd ../infrastructure

# Install dependencies
pnpm install

# Build CDK app
pnpm run build

# Preview changes (optional but recommended)
npx cdk diff

# Deploy infrastructure
npx cdk deploy --require-approval never

# Note outputs:
# - BucketName: sls-website-bucket-xxxxx
# - DistributionId: E1234567890ABC
# - DistributionDomain: d111111abcdef8.cloudfront.net
```

**Save the outputs!** You'll need them for the next steps.

### Step 3: Upload Frontend to S3

```bash
# Replace BUCKET_NAME with output from CDK deploy
export BUCKET_NAME="sls-website-bucket-xxxxx"

# Sync built frontend to S3
aws s3 sync ../frontend/dist s3://$BUCKET_NAME --delete

# --delete removes old files
# Output: Shows uploaded files
```

### Step 4: Invalidate CloudFront Cache

```bash
# Replace DISTRIBUTION_ID with output from CDK deploy
export DISTRIBUTION_ID="E1234567890ABC"

# Invalidate all cached files
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

# Output: Invalidation ID and status
# Invalidation takes ~30-60 seconds to complete
```

### Step 5: Verify Deployment

```bash
# Get CloudFront domain from CDK outputs or:
aws cloudfront list-distributions \
  --query "DistributionList.Items[0].DomainName" \
  --output text

# Open in browser:
# https://d111111abcdef8.cloudfront.net
```

✅ **Your website is now live!**

## Automated CI/CD Deployment

### Architecture

```
GitHub Push → GitHub Actions → AWS OIDC → Deploy to S3/CloudFront
```

**Benefits:**
- No long-lived AWS credentials in GitHub
- Automatic deployments on push to `main`
- Audit trail via GitHub Actions logs
- Consistent deployment process

### Prerequisites

1. **GitHub Repository** with admin access
2. **AWS Account** with permissions to create IAM roles

### Setup Steps

#### 1. Create OIDC Provider in AWS

```bash
# Option A: AWS Console
# Navigate to: IAM → Identity Providers → Add Provider
# Provider Type: OpenID Connect
# Provider URL: https://token.actions.githubusercontent.com
# Audience: sts.amazonaws.com

# Option B: AWS CLI
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

#### 2. Create IAM Role for GitHub Actions

Create `github-actions-role-policy.json`:

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
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/aws-sls-website:*"
        }
      }
    }
  ]
}
```

Create the role:

```bash
# Create role
aws iam create-role \
  --role-name GitHubActionsDeploymentRole \
  --assume-role-policy-document file://github-actions-role-policy.json

# Attach permissions policy (see IAM Policy section below)
aws iam put-role-policy \
  --role-name GitHubActionsDeploymentRole \
  --policy-name DeploymentPolicy \
  --policy-document file://deployment-policy.json
```

#### 3. Configure GitHub Secrets

Navigate to: `GitHub Repository → Settings → Secrets and Variables → Actions`

Add these secrets:
- `AWS_ACCOUNT_ID`: Your AWS account ID (e.g., `123456789012`)
- `AWS_REGION`: Your deployment region (e.g., `us-east-1`)
- `AWS_ROLE_ARN`: ARN of the IAM role (e.g., `arn:aws:iam::123456789012:role/GitHubActionsDeploymentRole`)

#### 4. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build frontend
        run: pnpm run build:frontend

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy infrastructure
        run: |
          cd packages/infrastructure
          pnpm run cdk deploy --require-approval never

      - name: Upload to S3
        run: |
          BUCKET_NAME=$(aws cloudformation describe-stacks \
            --stack-name WebsiteStack \
            --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
            --output text)
          aws s3 sync packages/frontend/dist s3://$BUCKET_NAME --delete

      - name: Invalidate CloudFront
        run: |
          DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
            --stack-name WebsiteStack \
            --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
            --output text)
          aws cloudfront create-invalidation \
            --distribution-id $DISTRIBUTION_ID \
            --paths "/*"
```

#### 5. Test Deployment

```bash
# Trigger deployment by pushing to main
git push origin main

# Or manually trigger via GitHub UI:
# Actions tab → Deploy to AWS → Run workflow
```

## Environment Configuration

### Frontend Environment Variables

Create `packages/frontend/.env`:

```bash
# API endpoint (if applicable)
VITE_API_URL=https://api.example.com

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Feature flags
VITE_ENABLE_DARK_MODE=true
```

**Note:** Only variables prefixed with `VITE_` are exposed to the frontend.

### Infrastructure Environment Variables

CDK can use environment variables or context:

```bash
# Using environment variables
export CDK_DEFAULT_ACCOUNT=123456789012
export CDK_DEFAULT_REGION=us-east-1

# Or use cdk.json context
```

## Custom Domain Setup

### Prerequisites

- Domain registered (AWS Route53 or external registrar)
- Hosted Zone in Route53 (if using AWS)

### Step 1: Request ACM Certificate

**Important:** Certificate MUST be in `us-east-1` for CloudFront.

```bash
# Request certificate
aws acm request-certificate \
  --domain-name example.com \
  --subject-alternative-names www.example.com \
  --validation-method DNS \
  --region us-east-1

# Note the Certificate ARN
```

### Step 2: Validate Domain

Follow AWS email or DNS validation steps to prove domain ownership.

### Step 3: Update CDK Stack

Edit `packages/infrastructure/lib/website-stack.ts`:

```typescript
// Add certificate and domain configuration
const certificate = acm.Certificate.fromCertificateArn(
  this,
  'Certificate',
  'arn:aws:acm:us-east-1:123456789012:certificate/xxxxx'
);

const distribution = new cloudfront.Distribution(this, 'Distribution', {
  // ... existing config
  certificate: certificate,
  domainNames: ['example.com', 'www.example.com'],
});
```

### Step 4: Create Route53 Records

```bash
# Get CloudFront domain from CDK outputs
# Create ALIAS records pointing to CloudFront distribution
```

Or use CDK Route53 constructs for automatic record creation.

## Updating Deployments

### Frontend Changes Only

```bash
# Build frontend
cd packages/frontend
pnpm run build

# Upload to S3
aws s3 sync dist s3://YOUR_BUCKET_NAME --delete

# Invalidate cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Infrastructure Changes

```bash
# Deploy infrastructure changes
cd packages/infrastructure
npx cdk deploy

# Frontend upload (if needed)
# ... follow steps above
```

### Full Update (Both)

```bash
# From repository root
pnpm run build:frontend
cd packages/infrastructure
npx cdk deploy
# Then upload and invalidate as above
```

## Rollback Procedure

### Quick Rollback (S3 Versioning)

If S3 versioning is enabled:

```bash
# List object versions
aws s3api list-object-versions \
  --bucket YOUR_BUCKET_NAME \
  --prefix index.html

# Restore previous version (manual in AWS Console)
```

### Git Rollback

```bash
# Find previous working commit
git log --oneline

# Checkout previous version
git checkout COMMIT_HASH

# Rebuild and redeploy
pnpm run build:frontend
# ... deploy as usual

# Or create rollback branch
git checkout -b rollback/emergency-fix
git push origin rollback/emergency-fix
```

### CloudFormation Rollback

```bash
# If infrastructure deployment fails, CloudFormation auto-rolls back
# Monitor in AWS Console: CloudFormation → Stacks → WebsiteStack

# Manual rollback
aws cloudformation rollback-stack --stack-name WebsiteStack
```

## Monitoring and Logs

### CloudFront Access Logs

Enable in CDK:

```typescript
// In website-stack.ts
const logBucket = new s3.Bucket(this, 'LogBucket');

const distribution = new cloudfront.Distribution(this, 'Distribution', {
  // ... existing config
  enableLogging: true,
  logBucket: logBucket,
});
```

### CloudWatch Metrics

Monitor in AWS Console:
- CloudFront → Distributions → YOUR_DISTRIBUTION → Monitoring
- Metrics: Requests, Bytes Downloaded, Error Rate

### Cost Monitoring

```bash
# Set up billing alert
aws cloudwatch put-metric-alarm \
  --alarm-name HighAWSBill \
  --alarm-description "Alert when AWS bill exceeds $5" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 21600 \
  --evaluation-periods 1 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold
```

## Cost Optimization

### Current Setup (Optimized)

- ✅ S3 storage (pay per GB)
- ✅ CloudFront PriceClass 100 (USA, Europe only)
- ✅ No Lambda, API Gateway, databases
- ✅ AWS Free Tier eligible

### Expected Costs

| Traffic | S3 | CloudFront | Total/Month |
|---------|-----|-----------|-------------|
| 1k users/month | $0 | $0 | **$0** (Free Tier) |
| 10k users/month | $0 | $0-5 | **$0-5** |
| 100k users/month | $0-1 | $5-20 | **$5-20** |

### Cost Reduction Tips

1. **Use Free Tier wisely**
   - S3: 5GB storage, 20k GET requests
   - CloudFront: 1TB transfer, 10M requests

2. **Optimize Assets**
   ```bash
   # Compress images before upload
   # Use WebP format
   # Minify JS/CSS (Vite does this)
   ```

3. **Cache Effectively**
   - Set long cache TTL for static assets
   - Use versioned URLs for cache busting

4. **Monitor Usage**
   - Set up billing alerts
   - Review AWS Cost Explorer monthly

## IAM Policy

Minimal IAM policy for deployment:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
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
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:*"
      ],
      "Resource": "arn:aws:cloudformation:*:YOUR_ACCOUNT_ID:stack/WebsiteStack/*"
    }
  ]
}
```

## Troubleshooting

For deployment issues, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

Common issues:
- CDK bootstrap errors
- AWS credentials not configured
- CloudFront cache not invalidating
- CORS errors

## Next Steps

- Set up custom domain (optional)
- Configure CloudWatch monitoring
- Enable S3 versioning for rollbacks
- Set up staging environment
- Implement blue-green deployments

---

**Need help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or open an issue on GitHub.
