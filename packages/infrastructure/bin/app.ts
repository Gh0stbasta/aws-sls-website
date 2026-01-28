#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { WebsiteStack } from "../lib/website-stack.js";

const app = new cdk.App();

// Environment configuration
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
  region:
    process.env.CDK_DEFAULT_REGION || process.env.AWS_REGION || "us-east-1",
};

// Bucket name - must be globally unique
// Override with context: cdk deploy -c bucketName=my-custom-bucket
const bucketName =
  app.node.tryGetContext("bucketName") ||
  process.env.BUCKET_NAME ||
  "aws-sls-website-prod";

// Instantiate Website Stack
new WebsiteStack(app, "WebsiteStack", {
  bucketName,
  env,
  description: "Serverless Static Website - S3 + CloudFront",

  // Stack tags
  tags: {
    Project: "aws-sls-website",
    Environment: process.env.ENVIRONMENT || "production",
    ManagedBy: "CDK",
  },
});

app.synth();
