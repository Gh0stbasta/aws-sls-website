import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export interface WebsiteStackProps extends cdk.StackProps {
  /**
   * S3 Bucket name (must be globally unique)
   */
  bucketName: string;

  /**
   * CloudFront Distribution ID (optional, for updates)
   */
  distributionId?: string;
}

/**
 * CDK Stack for Serverless Static Website
 *
 * Creates:
 * - S3 Bucket (private, no public access)
 * - CloudFront Distribution with Origin Access Identity
 * - IAM policies for GitHub Actions deployment
 */
export class WebsiteStack extends cdk.Stack {
  /**
   * S3 Bucket storing static website files
   */
  public readonly bucket: s3.Bucket;

  /**
   * CloudFront Distribution serving content
   */
  public readonly distribution: cloudfront.Distribution;

  /**
   * S3 Bucket ARN (for IAM policies)
   */
  public readonly bucketArn: string;

  /**
   * CloudFront Distribution ID (for cache invalidation)
   */
  public readonly distributionId: string;

  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props);

    // =====================================================
    // S3 Bucket - Private Storage
    // =====================================================
    this.bucket = new s3.Bucket(this, "WebsiteBucket", {
      bucketName: props.bucketName,

      // Block all public access (CloudFront will access via OAI)
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

      // No versioning needed for static website
      versioned: false,

      // Encryption at rest
      encryption: s3.BucketEncryption.S3_MANAGED,

      // Enforce HTTPS only
      enforceSSL: true,

      // Auto-delete bucket on stack deletion (dev/test only)
      // For production, set to RETAIN
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // =====================================================
    // CloudFront - Origin Access Identity (OAI)
    // =====================================================
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "WebsiteOAI",
      {
        comment: `OAI for ${props.bucketName}`,
      },
    );

    // Grant CloudFront OAI read access to S3 bucket
    this.bucket.grantRead(originAccessIdentity);

    // =====================================================
    // CloudFront Distribution
    // =====================================================
    this.distribution = new cloudfront.Distribution(
      this,
      "WebsiteDistribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(this.bucket, {
            originAccessIdentity,
          }),

          // Viewer Protocol Policy: Redirect HTTP to HTTPS
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,

          // Allowed HTTP methods
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,

          // Cache settings (24 hours default TTL)
          cachePolicy: new cloudfront.CachePolicy(this, "WebsiteCachePolicy", {
            defaultTtl: cdk.Duration.hours(24),
            minTtl: cdk.Duration.seconds(0),
            maxTtl: cdk.Duration.days(365),

            // Cache based on query strings, headers, cookies
            queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
            headerBehavior: cloudfront.CacheHeaderBehavior.none(),
            cookieBehavior: cloudfront.CacheCookieBehavior.none(),

            // Enable compression
            enableAcceptEncodingGzip: true,
            enableAcceptEncodingBrotli: true,
          }),
        },

        // Default root object
        defaultRootObject: "index.html",

        // Error responses for SPA (404 -> index.html)
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: cdk.Duration.minutes(5),
          },
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: cdk.Duration.minutes(5),
          },
        ],

        // Enable IPv6
        enableIpv6: true,

        // Price class (all edge locations)
        priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,

        // HTTP version
        httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      },
    );

    // =====================================================
    // Outputs (for CI/CD and reference)
    // =====================================================

    // Store ARN and ID for GitHub Actions
    this.bucketArn = this.bucket.bucketArn;
    this.distributionId = this.distribution.distributionId;

    // CloudFormation Outputs (visible in AWS Console)
    new cdk.CfnOutput(this, "BucketName", {
      value: this.bucket.bucketName,
      description: "S3 Bucket name for static website files",
      exportName: `${this.stackName}-BucketName`,
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: this.distribution.distributionId,
      description: "CloudFront Distribution ID",
      exportName: `${this.stackName}-DistributionId`,
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: this.distribution.distributionDomainName,
      description: "CloudFront Distribution Domain Name (website URL)",
      exportName: `${this.stackName}-DomainName`,
    });

    new cdk.CfnOutput(this, "BucketArn", {
      value: this.bucket.bucketArn,
      description: "S3 Bucket ARN",
      exportName: `${this.stackName}-BucketArn`,
    });
  }

  /**
   * Creates IAM policy statements for GitHub Actions deployment
   *
   * Grants permissions for:
   * - S3: Upload, delete, list objects
   * - CloudFront: Create cache invalidations
   */
  public getGitHubActionsPolicy(): iam.PolicyStatement[] {
    return [
      // S3 Permissions
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "s3:PutObject",
          "s3:PutObjectAcl",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket",
        ],
        resources: [this.bucket.bucketArn, `${this.bucket.bucketArn}/*`],
      }),

      // CloudFront Permissions
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation",
          "cloudfront:ListInvalidations",
        ],
        resources: [
          `arn:aws:cloudfront::${this.account}:distribution/${this.distributionId}`,
        ],
      }),
    ];
  }
}
