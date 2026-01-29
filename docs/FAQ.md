# Frequently Asked Questions (FAQ)

Answers to common questions about the Serverless Static Website template.

## Table of Contents

- [General Questions](#general-questions)
- [Technical Questions](#technical-questions)
- [Deployment & Hosting](#deployment--hosting)
- [Costs & Pricing](#costs--pricing)
- [Customization](#customization)
- [Performance & Scalability](#performance--scalability)
- [Security](#security)
- [Support & Contributing](#support--contributing)

---

## General Questions

### What is this template?

This is a **production-ready template** for building and deploying serverless static websites to AWS. It combines:
- **React 18** + **Vite** for the frontend
- **AWS CDK** for infrastructure as code
- **S3 + CloudFront** for hosting and CDN
- **GitHub Actions** for CI/CD

Perfect for:
- Landing pages
- Documentation sites
- Marketing websites
- Personal portfolios
- Company websites
- Any static website that needs to scale

### Who is this template for?

- **Developers** building static websites with React
- **Teams** wanting automated AWS deployments
- **Startups** needing cost-effective, scalable hosting
- **Students** learning AWS and modern frontend development
- **Freelancers** building client websites

**Prerequisites:**
- Basic knowledge of React and TypeScript
- Familiarity with AWS (S3, CloudFront)
- Understanding of Git and GitHub

### Can I use this in production?

**Yes!** This template is production-ready and follows AWS best practices:

✅ **Security:** HTTPS enforced, security headers, private S3 buckets  
✅ **Performance:** Global CDN via CloudFront, optimized builds  
✅ **Reliability:** Serverless architecture, auto-scaling  
✅ **Cost-effective:** AWS Free Tier eligible  
✅ **Maintainable:** Infrastructure as Code (CDK), automated deployments

Many companies use similar architectures for production websites.

### What's the difference between this and other hosting platforms?

| Feature | This Template | Vercel/Netlify | Traditional Hosting |
|---------|---------------|----------------|---------------------|
| **Cost** | $0-20/month | $0-20/month | $5-50/month |
| **AWS Native** | ✅ Yes | ❌ No | Varies |
| **Full Control** | ✅ Yes | ⚠️ Limited | ✅ Yes |
| **Infrastructure as Code** | ✅ CDK | ❌ No | ⚠️ Optional |
| **Scalability** | ✅ Auto | ✅ Auto | ⚠️ Manual |
| **Learning Value** | ✅ AWS Skills | ⚠️ Limited | ⚠️ Limited |

**Choose this template if:**
- You want to learn AWS
- You need full infrastructure control
- You're building on AWS already
- You want to customize everything

**Choose Vercel/Netlify if:**
- You want zero configuration
- You don't care about AWS specifically
- You want faster initial setup

---

## Technical Questions

### Why React + Vite?

**React:**
- Industry standard, huge ecosystem
- Great for building interactive UIs
- Strong TypeScript support
- Large talent pool

**Vite:**
- ⚡ Lightning-fast HMR (Hot Module Replacement)
- Modern build tool (ESBuild powered)
- Optimized production builds
- Better developer experience than Create React App

### Why AWS CDK instead of Terraform?

**AWS CDK advantages for this use case:**
- ✅ Same language as app (TypeScript)
- ✅ Better AWS integration
- ✅ Type-safe infrastructure
- ✅ Generates CloudFormation (AWS native)
- ✅ Easier to learn for TypeScript developers

**Terraform is better if:**
- You need multi-cloud support
- You already have Terraform expertise
- You need broader community modules

For AWS-only projects, CDK is generally preferred.

### Why pnpm instead of npm/yarn?

**pnpm advantages:**
- ⚡ **Faster** - Saves disk space, faster installs
- 🎯 **Efficient** - Symlinks shared dependencies
- 🏢 **Monorepo-friendly** - Built-in workspace support
- 🔒 **Strict** - Prevents phantom dependencies

**Alternatives work too:**
- Replace `pnpm` with `npm` or `yarn` in all commands
- Delete `pnpm-lock.yaml`, run `npm install` or `yarn install`

### Is TypeScript required?

**Yes, for infrastructure.** CDK requires TypeScript (or JavaScript).

**For frontend:**
- TypeScript is strongly recommended
- You can use JavaScript if you remove type annotations
- But TypeScript provides:
  - Better IDE support
  - Catch errors before runtime
  - Safer refactoring
  - Better documentation

### Can I use a different frontend framework?

**Yes!** The infrastructure is framework-agnostic.

**To use Vue, Svelte, Angular, etc.:**

1. Replace `packages/frontend` with your framework
2. Ensure it builds to a `dist/` folder (or update S3 sync path)
3. Keep the infrastructure package unchanged

**Example for Vue:**
```bash
rm -rf packages/frontend
npm create vue@latest packages/frontend
# Follow prompts
```

The CDK infrastructure works with any static site generator.

---

## Deployment & Hosting

### How long does deployment take?

**First deployment:**
- Infrastructure (CDK): ~5-10 minutes
- Frontend upload: ~30 seconds
- CloudFront setup: ~15-20 minutes
- **Total: ~30-40 minutes**

**Subsequent deployments:**
- Frontend only: ~1-2 minutes
- Infrastructure changes: ~3-5 minutes

**Why so long first time?**
- CloudFront distributions take time to propagate globally
- CDK bootstrapping (one-time setup)

### Can I deploy to multiple environments?

**Yes!** Use multiple CDK stacks or branches.

**Option 1: Separate Stacks**

```bash
# Production
cdk deploy --context environment=prod

# Staging
cdk deploy --context environment=staging

# Update CDK stack to use context:
const stackName = this.node.tryGetContext('environment') || 'dev';
```

**Option 2: Separate Branches**

```bash
# Production from main branch
git push origin main  # Deploys to prod

# Staging from staging branch
git push origin staging  # Deploys to staging
```

Configure GitHub Actions to deploy different branches to different stacks.

### Can I use a custom domain?

**Yes!** See [DEPLOYMENT.md - Custom Domain Setup](DEPLOYMENT.md#custom-domain-setup).

**Summary:**
1. Request ACM certificate in `us-east-1`
2. Validate domain ownership
3. Update CDK stack with certificate ARN and domain names
4. Create Route53 ALIAS records

**Estimated time:** 30-60 minutes (mostly waiting for certificate validation)

### Can I deploy to AWS regions other than us-east-1?

**Yes, but with caveats:**

- **S3 bucket:** Can be in any region
- **CloudFront:** Global service (no region)
- **ACM Certificate:** MUST be in `us-east-1` for CloudFront

**Recommended approach:**
- Deploy S3 bucket to your preferred region (e.g., `eu-west-1`)
- Keep ACM certificate in `us-east-1`
- CloudFront automatically pulls from any S3 region

---

## Costs & Pricing

### How much does it cost to run?

**Expected costs (based on traffic):**

| Monthly Users | S3 | CloudFront | Total |
|--------------|-----|------------|-------|
| **1,000** | $0 | $0 | **$0** ✅ Free Tier |
| **10,000** | $0 | $0-5 | **$0-5** |
| **100,000** | $0-1 | $5-20 | **$5-20** |
| **1,000,000** | $1-5 | $50-100 | **$50-100** |

**Assumptions:**
- 2 MB average page size
- 3 pages per visit
- Free Tier: 50 GB CloudFront transfer/month, 5 GB S3 storage

**Real-world example:**
- Personal portfolio: $0/month (Free Tier)
- Small business website: $0-5/month
- Popular blog (50k visitors): ~$10-15/month

### What's included in AWS Free Tier?

**S3 Free Tier (12 months for new accounts):**
- 5 GB storage
- 20,000 GET requests
- 2,000 PUT requests

**CloudFront Free Tier (always free):**
- 1 TB data transfer out
- 10,000,000 HTTP/HTTPS requests
- 2,000,000 CloudFront Function invocations

**After Free Tier:**
- S3: ~$0.023 per GB/month
- CloudFront: ~$0.085 per GB (first 10 TB)

### How can I reduce costs?

1. **Optimize Assets**
   - Compress images (use WebP)
   - Minify JavaScript/CSS (Vite does this)
   - Remove unused code

2. **Increase Cache TTL**
   - Reduce CloudFront requests
   - Set `Cache-Control` headers

3. **Use CloudFront Price Class 100**
   - Only USA, Europe, Israel edge locations
   - ~30% cheaper than global
   - Already configured in this template

4. **Set Billing Alarms**
   ```bash
   # Alert when bill exceeds $5
   aws cloudwatch put-metric-alarm --alarm-name HighBill ...
   ```

5. **Delete Unused Resources**
   - Remove old CloudFormation stacks
   - Empty unused S3 buckets

---

## Customization

### How do I change the website content?

**1. Edit React Components**

```bash
cd packages/frontend/src

# Main sections are in sections/
# - Hero.tsx
# - Features.tsx
# - etc.

# Components are in components/
# - Button.tsx
# - Card.tsx
# - etc.
```

**2. Update Static Data**

```bash
# Edit data files (if they exist)
cd packages/frontend/src/data
```

**3. Rebuild and Deploy**

```bash
pnpm run build:frontend
# Deploy (see DEPLOYMENT.md)
```

### How do I change the styling/theme?

**Tailwind CSS customization:**

```bash
# Edit Tailwind config
vim packages/frontend/tailwind.config.ts
```

**Example: Change primary color**

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',  // Change this
      },
    },
  },
};
```

**Dark mode:**
- Already implemented via `ThemeContext`
- Toggle with theme switcher component
- Customize in Tailwind config

### Can I add a backend API?

**Yes!** Common approaches:

**Option 1: AWS API Gateway + Lambda**

```bash
# Add API stack to CDK infrastructure
# packages/infrastructure/lib/api-stack.ts

const api = new apigateway.RestApi(this, 'API');
const lambda = new lambda.Function(this, 'Handler', {
  runtime: lambda.Runtime.NODEJS_20_X,
  handler: 'index.handler',
  code: lambda.Code.fromAsset('lambda'),
});
```

**Option 2: Third-party Services**
- Supabase (database + auth)
- Firebase
- AWS Amplify

**Option 3: Separate Backend**
- Deploy API separately
- Use CORS for frontend access
- Configure in frontend `.env`

### Can I add authentication?

**Yes!** Options:

1. **AWS Cognito** (recommended for AWS)
   - Add Cognito User Pool via CDK
   - Use AWS Amplify library in frontend
   - Protected routes in React

2. **Auth0 / Clerk**
   - Third-party auth services
   - Easy integration
   - More features out of the box

3. **Roll your own**
   - Not recommended for production
   - Use established solutions

---

## Performance & Scalability

### How many users can it handle?

**Short answer:** Millions.

**Why:**
- Serverless architecture auto-scales
- CloudFront CDN distributes globally
- No server capacity planning needed
- S3 handles virtually unlimited requests

**Real-world limits:**
- CloudFront: 100,000+ requests/second per distribution
- S3: 5,500 GET requests/second per prefix
- You'll hit cost limits before performance limits

**Bottlenecks (if any):**
- Cost (traffic-based pricing)
- Origin (S3) limits (easily raised via AWS support)

### How fast is the website?

**Performance metrics:**
- **Time to First Byte (TTFB):** ~50-200ms (CloudFront cached)
- **First Contentful Paint:** ~0.5-1.5s (depends on bundle size)
- **Lighthouse Score:** Typically 90+ (with optimization)

**Factors:**
- CloudFront edge locations (globally distributed)
- Build optimization (Vite does this well)
- Asset size (images, fonts, etc.)

**Optimization tips:**
- Code splitting
- Lazy loading
- Image optimization
- Preloading critical assets

### Does it support server-side rendering (SSR)?

**No, this is a static site generator template.**

For SSR, consider:
- **Next.js on Vercel** (easiest)
- **Next.js on AWS** (via Amplify or custom setup)
- **Remix** on AWS Lambda

This template is for **static sites only** (SPA - Single Page Application).

---

## Security

### Is it secure?

**Yes, with several security layers:**

✅ **HTTPS enforced** - All traffic encrypted  
✅ **Security headers** - CSP, HSTS, X-Frame-Options  
✅ **Private S3 bucket** - Not publicly accessible  
✅ **Origin Access Identity** - Only CloudFront can access S3  
✅ **No long-lived credentials** - OIDC for GitHub Actions  
✅ **Least privilege IAM** - Minimal permissions

See [ADR-004: Security & Deployment](adrs/ADR-004-security-deployment.md) for details.

### What about DDoS protection?

**CloudFront includes:**
- AWS Shield Standard (free, automatic)
- Rate limiting capabilities
- Geographic restrictions (if needed)

**For advanced protection:**
- AWS Shield Advanced ($3,000/month)
- AWS WAF (Web Application Firewall)

For most use cases, Shield Standard is sufficient.

### Can I add CSP (Content Security Policy)?

**Yes, already configured!**

See `packages/infrastructure/lib/website-stack.ts`:

```typescript
const responseHeadersPolicy = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeaders', {
  securityHeadersBehavior: {
    contentSecurityPolicy: { ... },
    strictTransportSecurity: { ... },
    // etc.
  },
});
```

**Customize CSP:**
- Edit the CDK stack
- Redeploy infrastructure
- Test thoroughly (CSP can break functionality)

---

## Support & Contributing

### How do I get help?

1. **Check documentation**
   - [README.md](../README.md)
   - [DEVELOPMENT.md](DEVELOPMENT.md)
   - [DEPLOYMENT.md](DEPLOYMENT.md)
   - [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
   - This FAQ

2. **Search GitHub Issues**
   - [Open Issues](https://github.com/Gh0stbasta/aws-sls-website/issues)
   - [Closed Issues](https://github.com/Gh0stbasta/aws-sls-website/issues?q=is%3Aissue+is%3Aclosed)

3. **Create new issue**
   - Use issue template
   - Include error messages and logs
   - Describe expected vs. actual behavior

### Can I contribute?

**Yes! Contributions are welcome.**

**Ways to contribute:**
1. **Report bugs** - Create an issue
2. **Suggest features** - Open a discussion
3. **Fix bugs** - Submit a pull request
4. **Improve docs** - Fix typos, add examples
5. **Share feedback** - What works, what doesn't?

**See:** [Contributing Guide](../README.md#-contributing)

### What's the license?

**MIT License** - Very permissive.

**You can:**
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Sublicense
- ✅ Private use

**You must:**
- Include license and copyright notice

**You cannot:**
- Hold author liable

**See:** [LICENSE](../LICENSE) for full text.

### Where can I see examples?

**This template itself is an example!**

**To see it live:**
- Deploy the template as-is
- Browse the included demo content
- Customize from there

**Community examples:**
- Check GitHub for forks
- Look for "Deployed to..." badges in READMEs

---

## Still Have Questions?

- 📚 **Docs:** [README](../README.md) | [Development](DEVELOPMENT.md) | [Deployment](DEPLOYMENT.md)
- 🐛 **Issues:** [GitHub Issues](https://github.com/Gh0stbasta/aws-sls-website/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/Gh0stbasta/aws-sls-website/discussions)

---

**Happy building! 🚀**
