# Troubleshooting Guide

Common issues and their solutions when working with the Serverless Static Website template.

## Table of Contents

- [Development Issues](#development-issues)
- [Build Issues](#build-issues)
- [Deployment Issues](#deployment-issues)
- [AWS Issues](#aws-issues)
- [Performance Issues](#performance-issues)
- [Getting More Help](#getting-more-help)

---

## Development Issues

### Port Already in Use

**Problem:** Development server fails to start with "Port 5173 is already in use".

**Solution:**

```bash
# Option 1: Kill process using port 5173
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process

# Option 2: Use different port
pnpm run dev:frontend -- --port 3000
```

### Node Version Mismatch

**Problem:** `Error: The engine "node" is incompatible with this module`

**Solution:**

```bash
# Check current Node version
node --version

# Required: Node.js 20+
# Install via nvm (recommended)
nvm install 20
nvm use 20

# Or download from https://nodejs.org/
```

### pnpm Not Found

**Problem:** `pnpm: command not found`

**Solution:**

```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version

# Should be 9.0.0 or higher
```

### DevContainer Not Starting

**Problem:** DevContainer fails to build or start.

**Symptoms:**
- "Cannot connect to Docker daemon"
- Container build timeout
- Extension not available

**Solution:**

```bash
# 1. Verify Docker is running
docker --version
docker ps

# 2. Restart Docker Desktop

# 3. Clear Docker cache
docker system prune -a

# 4. Rebuild DevContainer
# Ctrl+Shift+P → "Dev Containers: Rebuild Container"

# 5. Check Docker resources (increase memory to 4GB+)
# Docker Desktop → Settings → Resources
```

### Hot Module Replacement (HMR) Not Working

**Problem:** Changes to React components don't reflect immediately.

**Solution:**

```bash
# 1. Restart dev server
# Press Ctrl+C, then:
pnpm run dev:frontend

# 2. Clear browser cache (Ctrl+Shift+R)

# 3. Check for errors in browser console

# 4. Ensure file is being watched
# Check terminal for "rebuilding..." messages

# 5. If using WSL2, ensure files are in WSL filesystem
# Not /mnt/c/... but /home/user/...
```

### TypeScript Errors in IDE

**Problem:** VS Code shows TypeScript errors but build succeeds.

**Solution:**

```bash
# 1. Restart TypeScript server
# Ctrl+Shift+P → "TypeScript: Restart TS Server"

# 2. Ensure workspace is opened at repository root
# Not in packages/frontend or packages/infrastructure

# 3. Check TypeScript version
# VS Code → Bottom right → TypeScript version

# 4. Install workspace TypeScript version
pnpm install

# 5. Reload window
# Ctrl+Shift+P → "Developer: Reload Window"
```

---

## Build Issues

### Frontend Build Fails

**Problem:** `pnpm run build:frontend` fails with errors.

**Common Causes:**

**1. TypeScript Type Errors**

```bash
# Check for type errors
cd packages/frontend
pnpm run type-check

# Fix errors in reported files
# Common issues:
# - Missing type imports
# - Incorrect prop types
# - Unused variables
```

**2. Missing Dependencies**

```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install

# Clear pnpm cache if needed
pnpm store prune
```

**3. Memory Issues (Large Projects)**

```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm run build:frontend
```

### Infrastructure Build Fails

**Problem:** `pnpm run build:infra` fails.

**Solution:**

```bash
cd packages/infrastructure

# 1. Check for TypeScript errors
pnpm run build

# 2. Verify CDK is installed
npx cdk --version

# 3. Reinstall dependencies
rm -rf node_modules
pnpm install

# 4. Clear CDK cache
rm -rf cdk.out
pnpm run build
```

### Linting Errors

**Problem:** `pnpm run lint` fails.

**Solution:**

```bash
# Auto-fix common issues
pnpm run lint --fix

# If auto-fix doesn't work, manually fix reported issues

# Disable specific rules (last resort)
# Add to .eslintrc or inline comment:
// eslint-disable-next-line @typescript-eslint/no-explicit-any

# Skip linting for specific files
# Add to .eslintignore
```

---

## Deployment Issues

### GitHub Actions: AWS Credentials Error

**Problem:** GitHub Actions workflow fails with:
```
Run aws-actions/configure-aws-credentials@v4
Error: Credentials could not be loaded, please check your action inputs: 
Could not load credentials from any providers
```

**Cause:**
The GitHub Actions workflow cannot authenticate with AWS because required GitHub secrets are missing or incorrectly configured. This workflow uses **AWS OIDC (OpenID Connect)** for secure, temporary credential generation.

**Solution - Complete Setup Checklist:**

#### Step 1: Verify GitHub Secrets Are Configured

Go to your repository: **Settings → Secrets and variables → Actions**

Ensure these 4 secrets exist:

| Secret Name | Example Value | Where to Get It |
|------------|---------------|-----------------|
| `AWS_ROLE_ARN` | `arn:aws:iam::123456789012:role/github-actions-deployment-role` | From Step 2 below |
| `AWS_REGION` | `us-east-1` | Your preferred AWS region |
| `WEBSITE_BUCKET` | `aws-sls-website-prod-xxxxx` | From CDK deployment output (Step 3) |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1234ABCDEFGH` | From CDK deployment output (Step 3) |

**If any secrets are missing, continue to Steps 2-4 below.**

#### Step 2: Create AWS OIDC Provider and IAM Role

This is required for GitHub Actions to securely authenticate with AWS.

**A. Create OIDC Identity Provider**

1. Open [AWS IAM Console](https://console.aws.amazon.com/iam/) → **Identity Providers**
2. Click **Add provider**
3. Configure:
   - **Provider type:** OpenID Connect
   - **Provider URL:** `https://token.actions.githubusercontent.com`
   - **Audience:** `sts.amazonaws.com`
4. Click **Add provider**

**B. Create IAM Deployment Role**

1. Go to **IAM Console** → **Roles** → **Create role**
2. Select **Trusted entity type:** Web identity
3. Select **Identity provider:** `token.actions.githubusercontent.com`
4. Select **Audience:** `sts.amazonaws.com`
5. Click **Next**
6. Skip permissions for now (we'll add them in step D)
7. Name the role: `github-actions-deployment-role`
8. Click **Create role**

**C. Configure Trust Policy**

After creating the role, edit its trust relationship:

1. Go to the role details page
2. Click **Trust relationships** tab
3. Click **Edit trust policy**
4. Replace with this policy (**update the placeholders**):

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
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/YOUR_REPO_NAME:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

Replace:
- `YOUR_ACCOUNT_ID` → Your 12-digit AWS account ID (e.g., `123456789012`)
- `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` → Your GitHub username and repository name (e.g., `octocat/my-website`)

5. Click **Update policy**

**D. Attach Permissions Policy**

Create and attach permissions for the role:

1. Go to the role → **Permissions** tab
2. Click **Add permissions** → **Create inline policy**
3. Switch to **JSON** view
4. Paste this policy:

> **Note:** The policy below grants broad permissions to support initial CDK deployment. After your infrastructure is deployed, you should restrict these permissions. See the "Restrictive Policy" section at the end of this guide.

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
        "arn:aws:s3:::aws-sls-website-*",
        "arn:aws:s3:::aws-sls-website-*/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CloudFormationStackManagement",
      "Effect": "Allow",
      "Action": [
        "cloudformation:DescribeStacks",
        "cloudformation:CreateChangeSet",
        "cloudformation:ExecuteChangeSet",
        "cloudformation:DescribeChangeSet",
        "cloudformation:DeleteChangeSet",
        "cloudformation:GetTemplate",
        "cloudformation:CreateStack",
        "cloudformation:UpdateStack",
        "cloudformation:DeleteStack",
        "cloudformation:GetTemplateSummary"
      ],
      "Resource": [
        "arn:aws:cloudformation:*:*:stack/WebsiteStack/*",
        "arn:aws:cloudformation:*:*:stack/CDKToolkit/*"
      ]
    },
    {
      "Sid": "CDKResourceCreation",
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:PutBucketPolicy",
        "s3:PutBucketPublicAccessBlock",
        "s3:PutBucketWebsite",
        "s3:GetBucketLocation",
        "cloudfront:CreateDistribution",
        "cloudfront:UpdateDistribution",
        "cloudfront:DeleteDistribution",
        "cloudfront:GetDistribution",
        "cloudfront:TagResource"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CDKIAMRoleManagement",
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:PutRolePolicy",
        "iam:DeleteRolePolicy",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:GetRole",
        "iam:PassRole",
        "iam:TagRole"
      ],
      "Resource": [
        "arn:aws:iam::*:role/cdk-*",
        "arn:aws:iam::*:role/WebsiteStack-*"
      ]
    },
    {
      "Sid": "CDKAssetBucket",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::cdk-*-assets-*",
        "arn:aws:s3:::cdk-*-assets-*/*"
      ]
    }
  ]
}
```

5. Name the policy: `GitHubActionsDeploymentPolicy`
6. Click **Create policy**

**E. Copy the Role ARN**

1. Go to the role summary page
2. Copy the **ARN** (looks like `arn:aws:iam::123456789012:role/github-actions-deployment-role`)
3. Save this for Step 4

#### Step 3: Deploy Infrastructure Locally (First Time)

Before GitHub Actions can deploy, you need to create the S3 bucket and CloudFront distribution:

```bash
# 1. Configure AWS CLI with your credentials
aws configure

# 2. Install dependencies
pnpm install

# 3. Bootstrap CDK (first time only)
cd packages/infrastructure
pnpm run cdk:bootstrap

# 4. Deploy the infrastructure
pnpm run cdk:deploy

# The output will show:
# WebsiteStack.WebsiteBucketName = aws-sls-website-prod-xxxxx
# WebsiteStack.CloudFrontDistributionId = E1234ABCDEFGH
#
# SAVE THESE VALUES - you'll need them for GitHub secrets
```

#### Step 4: Add All Secrets to GitHub

Now add all 4 secrets to your repository:

1. Go to repository: **Settings → Secrets and variables → Actions**
2. Click **New repository secret** for each:

   **Secret 1:**
   - Name: `AWS_ROLE_ARN`
   - Value: `arn:aws:iam::123456789012:role/github-actions-deployment-role` (from Step 2E)

   **Secret 2:**
   - Name: `AWS_REGION`
   - Value: `us-east-1` (or your chosen region)

   **Secret 3:**
   - Name: `WEBSITE_BUCKET`
   - Value: The bucket name from Step 3 output (e.g., `aws-sls-website-prod-xxxxx`)

   **Secret 4:**
   - Name: `CLOUDFRONT_DISTRIBUTION_ID`
   - Value: The distribution ID from Step 3 output (e.g., `E1234ABCDEFGH`)

#### Step 5: Test the Workflow

1. Go to **Actions** tab in your repository
2. Select **Deploy to AWS** workflow
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow**

The workflow should now succeed! ✅

#### Step 6: (Optional) Restrict Permissions After Deployment

After your infrastructure is successfully deployed, you can tighten the IAM role permissions for better security:

**Restrictive Policy (After Infrastructure Exists):**

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
        "arn:aws:s3:::YOUR_ACTUAL_BUCKET_NAME",
        "arn:aws:s3:::YOUR_ACTUAL_BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    },
    {
      "Sid": "CloudFormationReadOnly",
      "Effect": "Allow",
      "Action": [
        "cloudformation:DescribeStacks",
        "cloudformation:GetTemplate"
      ],
      "Resource": "arn:aws:cloudformation:*:*:stack/WebsiteStack/*"
    }
  ]
}
```

Replace:
- `YOUR_ACTUAL_BUCKET_NAME` with your bucket (from Step 3 output)
- `YOUR_ACCOUNT_ID` with your AWS account ID
- `YOUR_DISTRIBUTION_ID` with your CloudFront distribution ID

**Related Documentation:**
- [CI/CD Pipeline Documentation](CICD.md)
- [GitHub Secrets Reference](GITHUB-SECRETS.md)
- [ADR-004: Security & Deployment](adrs/ADR-004-security-deployment.md)

---

### CDK Bootstrap Errors

**Problem:** `cdk bootstrap` fails or shows "CDK not bootstrapped".

**Solution:**

```bash
# 1. Verify AWS credentials
aws sts get-caller-identity

# 2. Bootstrap with explicit account/region
npx cdk bootstrap aws://ACCOUNT_ID/REGION

# Example:
npx cdk bootstrap aws://123456789012/us-east-1

# 3. If already bootstrapped, check:
aws cloudformation describe-stacks --stack-name CDKToolkit

# 4. Force re-bootstrap (if needed)
npx cdk bootstrap --force
```

### AWS Credentials Not Found

**Problem:** `Unable to locate credentials`

**Solution:**

```bash
# 1. Check credentials file exists
cat ~/.aws/credentials

# 2. Configure credentials
aws configure

# 3. Verify credentials work
aws sts get-caller-identity

# 4. Set profile (if using named profiles)
export AWS_PROFILE=your-profile-name

# 5. For CI/CD, check GitHub Secrets are set:
# - AWS_ACCOUNT_ID
# - AWS_REGION
# - AWS_ROLE_ARN
```

### CDK Deploy Fails

**Problem:** `cdk deploy` fails with CloudFormation errors.

**Common Errors:**

**1. Stack Already Exists**

```bash
# View existing stack
aws cloudformation describe-stacks --stack-name WebsiteStack

# Delete old stack (careful!)
aws cloudformation delete-stack --stack-name WebsiteStack

# Wait for deletion
aws cloudformation wait stack-delete-complete --stack-name WebsiteStack

# Redeploy
npx cdk deploy
```

**2. Insufficient Permissions**

```bash
# Check IAM permissions
aws iam get-user

# Required permissions:
# - CloudFormation: Create/Update/Delete Stack
# - S3: Create/Delete Bucket, Put/Get Objects
# - CloudFront: Create/Update Distribution
# - IAM: Create/Attach Roles (for CDK)

# See DEPLOYMENT.md for minimal IAM policy
```

**3. Resource Limit Exceeded**

```bash
# Check AWS service quotas
aws service-quotas list-service-quotas \
  --service-code cloudfront

# Request quota increase if needed
# AWS Console → Service Quotas
```

### S3 Upload Fails

**Problem:** `aws s3 sync` fails or uploads wrong files.

**Solution:**

```bash
# 1. Verify bucket exists
aws s3 ls s3://YOUR_BUCKET_NAME

# 2. Check permissions
aws s3api get-bucket-policy --bucket YOUR_BUCKET_NAME

# 3. Ensure frontend is built
ls -la packages/frontend/dist/

# 4. Upload with verbose output
aws s3 sync packages/frontend/dist s3://YOUR_BUCKET_NAME \
  --delete \
  --debug

# 5. Check for .gitignore excluding dist/
# If dist/ is ignored by git but not present, build first
pnpm run build:frontend
```

### CloudFront Invalidation Fails

**Problem:** Cache invalidation doesn't complete or fails.

**Solution:**

```bash
# 1. Check invalidation status
aws cloudfront get-invalidation \
  --distribution-id YOUR_DIST_ID \
  --id INVALIDATION_ID

# 2. Verify distribution exists
aws cloudfront list-distributions

# 3. Create invalidation manually
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"

# 4. Wait for completion (can take 10-15 minutes)
# Check status in AWS Console:
# CloudFront → Distributions → Invalidations tab

# 5. Alternative: Invalidate specific paths
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/index.html" "/assets/*"
```

### Changes Not Visible After Deployment

**Problem:** Updated website still shows old content.

**Solution:**

```bash
# 1. Verify files uploaded to S3
aws s3 ls s3://YOUR_BUCKET_NAME/ --recursive

# 2. Check if invalidation completed
aws cloudfront list-invalidations \
  --distribution-id YOUR_DIST_ID

# 3. Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Or use Incognito mode

# 4. Check CloudFront cache headers
curl -I https://your-cloudfront-domain.net

# 5. Wait (CloudFront propagation can take 5-10 minutes)

# 6. Force invalidation of all paths
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

---

## AWS Issues

### Access Denied Errors

**Problem:** AWS operations fail with "Access Denied" or "403 Forbidden".

**Solution:**

```bash
# 1. Check current identity
aws sts get-caller-identity

# 2. Verify IAM permissions
# AWS Console → IAM → Users → Your User → Permissions

# 3. For S3 access denied:
# - Check bucket policy
# - Check IAM user policy
# - Verify bucket exists in correct region

# 4. For CloudFormation access denied:
# - User needs CloudFormation permissions
# - User needs permissions for created resources (S3, CloudFront, IAM)

# 5. Use policy simulator (AWS Console)
# IAM → Policy Simulator
# Test specific actions to find missing permissions
```

### Region Mismatch

**Problem:** Resources not found or in wrong region.

**Solution:**

```bash
# 1. Check configured region
aws configure get region

# 2. Override region for specific command
aws s3 ls --region us-east-1

# 3. Set region in environment
export AWS_REGION=us-east-1
export AWS_DEFAULT_REGION=us-east-1

# 4. Note: CloudFront is global (us-east-1)
# ACM certificates for CloudFront must be in us-east-1

# 5. Check CDK stack region
# In packages/infrastructure/bin/app.ts
```

### Cost Alerts

**Problem:** Unexpected AWS charges.

**Solution:**

```bash
# 1. Check AWS Cost Explorer
# AWS Console → Billing → Cost Explorer

# 2. Review by service
# Identify which service is costly

# 3. Common culprits:
# - CloudFront data transfer (high traffic)
# - S3 storage (old versions not deleted)
# - Data transfer to internet

# 4. Set up billing alert
aws cloudwatch put-metric-alarm \
  --alarm-name HighBill \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 21600 \
  --evaluation-periods 1 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold

# 5. Clean up unused resources
# - Delete old CloudFormation stacks
# - Empty and delete unused S3 buckets
# - Delete unused distributions
```

---

## Performance Issues

### Slow Initial Page Load

**Problem:** Website takes long to load on first visit.

**Solution:**

1. **Optimize Frontend Bundle Size**

```bash
# Analyze bundle size
cd packages/frontend
pnpm run build
npx vite-bundle-visualizer

# Common fixes:
# - Code split routes
# - Lazy load components
# - Remove unused dependencies
```

2. **Optimize Images**

```bash
# Use WebP format
# Compress images before upload
# Use responsive images with srcset

# Example: Convert PNG to WebP
convert image.png -quality 80 image.webp
```

3. **Enable CloudFront Compression**

```typescript
// In website-stack.ts
const distribution = new cloudfront.Distribution(this, 'Distribution', {
  defaultBehavior: {
    compress: true, // Enable Gzip/Brotli compression
    // ... other settings
  },
});
```

### Slow Subsequent Loads

**Problem:** Returning visitors experience slow loads.

**Solution:**

1. **Increase Cache TTL**

```typescript
// In website-stack.ts
const distribution = new cloudfront.Distribution(this, 'Distribution', {
  defaultBehavior: {
    cachePolicy: new cloudfront.CachePolicy(this, 'CachePolicy', {
      defaultTtl: Duration.days(30), // Increase from default
      maxTtl: Duration.days(365),
      minTtl: Duration.minutes(0),
    }),
  },
});
```

2. **Use Cache-Control Headers**

```typescript
// When uploading to S3
aws s3 sync dist s3://bucket \
  --cache-control "max-age=31536000,public,immutable"
```

3. **Verify Caching Works**

```bash
# Check cache headers
curl -I https://your-domain.com/assets/index.js

# Look for:
# cache-control: max-age=31536000
# x-cache: Hit from cloudfront
```

---

## Getting More Help

### Check Documentation

- [README.md](../README.md) - Overview and quick start
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [FAQ.md](FAQ.md) - Frequently asked questions

### Search Existing Issues

- [GitHub Issues](https://github.com/Gh0stbasta/aws-sls-website/issues)
- Search for similar problems
- Check closed issues

### Ask for Help

1. **GitHub Discussions**
   - General questions
   - Feature requests
   - Ideas

2. **GitHub Issues**
   - Bug reports
   - Use issue template
   - Include error messages and logs

3. **Stack Overflow**
   - Tag: `aws-cdk`, `react`, `vite`
   - Search first, then ask

### Debug Tips

1. **Enable Verbose Logging**

```bash
# CDK verbose mode
npx cdk deploy --verbose

# AWS CLI debug mode
aws s3 ls --debug

# npm/pnpm verbose
pnpm run build:frontend --verbose
```

2. **Check Service Status**

- [AWS Service Health Dashboard](https://status.aws.amazon.com/)
- [GitHub Status](https://www.githubstatus.com/)

3. **Collect Information**

Before asking for help, gather:
- Error messages (full stack trace)
- Node.js version (`node --version`)
- pnpm version (`pnpm --version`)
- AWS CLI version (`aws --version`)
- Operating system
- Steps to reproduce

---

## Still Stuck?

If this guide didn't solve your issue:

1. ✅ Check [FAQ.md](FAQ.md)
2. ✅ Search [GitHub Issues](https://github.com/Gh0stbasta/aws-sls-website/issues)
3. ✅ Create a [new issue](https://github.com/Gh0stbasta/aws-sls-website/issues/new) with details

**When creating an issue, include:**
- Clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Error messages and logs
- Environment details (OS, Node version, etc.)
- Screenshots (if applicable)

We're here to help! 🚀
