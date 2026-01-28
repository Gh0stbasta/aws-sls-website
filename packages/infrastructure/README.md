# Infrastructure - AWS CDK

AWS CDK v2 Infrastructure as Code (TypeScript) for Serverless Static Website

## 🏗️ Architecture

This CDK stack deploys:

- **S3 Bucket** - Private storage for static website files
- **CloudFront Distribution** - Global CDN with HTTPS
- **Origin Access Identity (OAI)** - Secure S3 access via CloudFront only
- **Cache Policy** - 24-hour default TTL with compression
- **Error Handling** - SPA support (404/403 → index.html)

## 🚀 Quick Start

### Prerequisites

- AWS CLI configured with credentials
- Node.js 20+ and pnpm installed
- CDK CLI: `npm install -g aws-cdk`

### Bootstrap CDK (First Time Only)

```bash
# Bootstrap your AWS account for CDK
cdk bootstrap aws://ACCOUNT-ID/REGION

# Example:
cdk bootstrap aws://123456789012/us-east-1
```

### Deployment Commands

```bash
# Synthesize CloudFormation template
pnpm run cdk:synth

# Show what will be deployed (dry-run)
pnpm run cdk diff

# Deploy to AWS
pnpm run cdk:deploy

# Watch mode (auto-deploy on changes)
pnpm run cdk:watch

# Destroy stack (remove all resources)
pnpm run cdk:destroy
```

## 📁 Project Structure

```
packages/infrastructure/
├── bin/
│   └── app.ts              # CDK App entry point
├── lib/
│   └── website-stack.ts    # Main stack (S3 + CloudFront)
├── cdk.json                # CDK configuration
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies & scripts
```

## ⚙️ Configuration

### Environment Variables

**Required:**

```bash
AWS_ACCOUNT_ID=123456789012    # Your AWS Account ID
AWS_REGION=us-east-1           # Deployment region
```

**Optional:**

```bash
BUCKET_NAME=my-custom-bucket   # Override S3 bucket name
ENVIRONMENT=production         # Stack tags
```

### CDK Context Variables

Override bucket name via CDK context:

```bash
cdk deploy -c bucketName=my-custom-bucket-name
```

### S3 Bucket Naming

The S3 bucket name must be globally unique. Default: `aws-sls-website-prod`

To override:

1. Set `BUCKET_NAME` environment variable, OR
2. Use CDK context: `cdk deploy -c bucketName=...`, OR
3. Modify `bin/app.ts`

## 🔒 Security

- **S3 Bucket:** Private, no public access (enforced)
- **HTTPS Only:** CloudFront redirects HTTP → HTTPS
- **SSL/TLS:** S3 encryption at rest (S3-managed)
- **OAI:** CloudFront accesses S3 via Origin Access Identity
- **IAM:** Minimal permissions for GitHub Actions

## 📤 Stack Outputs

After deployment, the stack outputs:

```bash
WebsiteStack.BucketName             # S3 bucket name
WebsiteStack.DistributionId         # CloudFront distribution ID
WebsiteStack.DistributionDomainName # CloudFront URL (website URL)
WebsiteStack.BucketArn              # S3 bucket ARN
```

Access outputs:

```bash
aws cloudformation describe-stacks \
  --stack-name WebsiteStack \
  --query 'Stacks[0].Outputs'
```

## 🎯 GitHub Actions Integration

The stack provides IAM policy statements for GitHub Actions deployment.

**Permissions granted:**

- **S3:** PutObject, GetObject, DeleteObject, ListBucket
- **CloudFront:** CreateInvalidation, GetInvalidation, ListInvalidations

See `TICKET-013` for CI/CD pipeline setup.

## 🧪 Testing

### Synthesize (No AWS Credentials Required)

```bash
# Generate CloudFormation template
pnpm run cdk:synth

# Output: cdk.out/WebsiteStack.template.json
```

### Diff (Check Changes)

```bash
# Compare deployed stack with local changes
pnpm run cdk diff
```

### Deploy to Test Environment

```bash
# Deploy with custom bucket name
cdk deploy -c bucketName=test-website-bucket-$(date +%s)
```

### Destroy Test Stack

```bash
# Remove all resources
pnpm run cdk:destroy
```

## 🔧 Troubleshooting

### CDK Bootstrap Required

**Error:** `Policy contains a statement with one or more invalid principals`

**Solution:** Bootstrap your AWS account

```bash
cdk bootstrap aws://ACCOUNT-ID/REGION
```

### Bucket Name Already Exists

**Error:** `Bucket name already exists`

**Solution:** S3 bucket names are globally unique. Choose a different name:

```bash
cdk deploy -c bucketName=my-unique-bucket-name-12345
```

### CloudFormation Stack Stuck

**Error:** Stack stuck in `UPDATE_ROLLBACK_IN_PROGRESS`

**Solution:**

1. Check AWS Console → CloudFormation → Events
2. Delete stack manually if needed
3. Redeploy

### No AWS Credentials

**Error:** `Unable to locate credentials`

**Solution:** Configure AWS CLI

```bash
aws configure
# Or use environment variables:
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export AWS_REGION=us-east-1
```

## 📚 CDK Resources

### Stack Resources

- `WebsiteBucket` - S3 Bucket (private)
- `WebsiteOAI` - CloudFront Origin Access Identity
- `WebsiteDistribution` - CloudFront Distribution
- `WebsiteCachePolicy` - CloudFront Cache Policy

### Cost Estimation

**Free Tier (First 12 Months):**

- S3: 5 GB storage, 20,000 GET requests
- CloudFront: 1 TB data transfer out, 10M HTTP/HTTPS requests

**After Free Tier:**

- S3: ~$0.023/GB/month (storage)
- CloudFront: ~$0.085/GB (first 10 TB data transfer)

Typical small website: **$1-5/month**

## 🔗 Related Documentation

- See `../../docs/adrs/ADR-002-aws-infrastructure.md` for architecture decisions
- See `../../docs/adrs/ADR-004-security-deployment.md` for security strategy
- See `TICKET-002` for implementation details
- See `TICKET-013` for CI/CD pipeline integration

## 📝 Notes

- CloudFront distribution takes **5-15 minutes** to deploy
- CloudFront cache invalidation takes **1-3 minutes** to propagate globally
- Stack uses `DESTROY` removal policy for dev/test (change to `RETAIN` for production)
- IPv6 is enabled for CloudFront
- HTTP/2 and HTTP/3 are enabled for performance
