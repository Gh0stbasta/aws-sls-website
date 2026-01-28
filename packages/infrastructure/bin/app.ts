#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';

const app = new cdk.App();

// TODO: Import and instantiate stacks here
// Example:
// import { WebsiteStack } from './lib/website-stack';
// new WebsiteStack(app, 'WebsiteStack', { ... });

app.synth();
