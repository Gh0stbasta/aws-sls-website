# Infrastructure

AWS CDK (TypeScript) Infrastructure as Code

## Deployment

```bash
# Synthesize CloudFormation
pnpm run cdk:synth

# Deploy to AWS
pnpm run cdk:deploy

# Destroy stack
pnpm run cdk:destroy

# Watch mode (auto-deploy on changes)
pnpm run cdk:watch
```

## Project Structure

```
lib/
├── app.ts              # CDK App Entry Point
├── website-stack.ts    # Main Stack (S3 + CloudFront)
└── ...                 # Other constructs
```

## Environment Variables

Required:
- `AWS_ACCOUNT_ID`: Your AWS Account ID (from GitHub Secrets)
- `AWS_REGION`: Deployment Region (from GitHub Secrets)

## CDK Workflows

### Initial Setup
```bash
cdk synth      # Generate CloudFormation template
cdk deploy     # Deploy to AWS
```

### Updates
```bash
cdk diff       # Show what will change
cdk deploy     # Apply changes
```

### Cleanup
```bash
cdk destroy    # Remove all resources
```
