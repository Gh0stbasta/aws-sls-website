/**
 * Code Examples Data
 * 
 * This file contains code examples for the Code Examples Section.
 * Each example demonstrates practical usage of the template.
 */

export interface CodeExample {
  id: string;
  language: 'typescript' | 'javascript' | 'bash' | 'json';
  title: string;
  code: string;
  description: string;
}

export const codeExamplesData: CodeExample[] = [
  {
    id: 'cdk-deploy',
    language: 'bash',
    title: 'Deploy Infrastructure',
    code: `# Navigate to infrastructure package
cd packages/infrastructure

# Install dependencies
npm install

# Deploy to AWS
cdk deploy`,
    description: 'Deploy AWS Infrastructure with CDK'
  },
  {
    id: 'frontend-dev',
    language: 'bash',
    title: 'Start Dev Server',
    code: `# Navigate to frontend package
cd packages/frontend

# Install dependencies
pnpm install

# Start development server
pnpm run dev`,
    description: 'Start React development server with hot reload'
  },
  {
    id: 'build-frontend',
    language: 'bash',
    title: 'Build Frontend',
    code: `# Build optimized production bundle
pnpm run build

# Preview production build locally
pnpm run preview`,
    description: 'Build and preview production bundle'
  },
  {
    id: 'component-example',
    language: 'typescript',
    title: 'Create Component',
    code: `import React from 'react';

interface MyComponentProps {
  title: string;
  description: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  description 
}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};`,
    description: 'Example React component with TypeScript and Tailwind'
  },
  {
    id: 'cdk-stack',
    language: 'typescript',
    title: 'CDK Stack Example',
    code: `import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

export class WebsiteStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    // S3 Bucket for static website
    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // CloudFront Distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(
      this, 
      'WebsiteDistribution',
      {
        originConfigs: [{
          s3OriginSource: {
            s3BucketSource: bucket
          },
          behaviors: [{ isDefaultBehavior: true }]
        }]
      }
    );
  }
}`,
    description: 'AWS CDK infrastructure definition for static website'
  },
  {
    id: 'package-json',
    language: 'json',
    title: 'Package Configuration',
    code: `{
  "name": "frontend",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}`,
    description: 'Frontend package.json configuration'
  },
  {
    id: 'vite-config',
    language: 'typescript',
    title: 'Vite Configuration',
    code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
});`,
    description: 'Vite build configuration for optimized production builds'
  },
  {
    id: 'environment-setup',
    language: 'bash',
    title: 'Environment Setup',
    code: `# Install Node.js dependencies
npm install -g pnpm

# Install workspace dependencies
pnpm install

# Configure AWS credentials
aws configure

# Bootstrap CDK (first time only)
cd packages/infrastructure
cdk bootstrap`,
    description: 'Initial environment setup for the project'
  }
];
