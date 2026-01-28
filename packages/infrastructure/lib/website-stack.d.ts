import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
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
export declare class WebsiteStack extends cdk.Stack {
    /**
     * S3 Bucket storing static website files
     */
    readonly bucket: s3.Bucket;
    /**
     * CloudFront Distribution serving content
     */
    readonly distribution: cloudfront.Distribution;
    /**
     * S3 Bucket ARN (for IAM policies)
     */
    readonly bucketArn: string;
    /**
     * CloudFront Distribution ID (for cache invalidation)
     */
    readonly distributionId: string;
    constructor(scope: Construct, id: string, props: WebsiteStackProps);
    /**
     * Creates IAM policy statements for GitHub Actions deployment
     *
     * Grants permissions for:
     * - S3: Upload, delete, list objects
     * - CloudFront: Create cache invalidations
     */
    getGitHubActionsPolicy(): iam.PolicyStatement[];
}
//# sourceMappingURL=website-stack.d.ts.map