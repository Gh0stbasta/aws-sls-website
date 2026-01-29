/**
 * Features Data
 * 
 * This file contains the feature list displayed in the Features section.
 * Externalized for easy customization without touching component code.
 * 
 * To add a new feature:
 * 1. Add a new object to the featuresData array
 * 2. Provide a unique id, icon (emoji), title, and description
 * 3. Keep descriptions concise (1-2 lines)
 */

/**
 * Feature Interface
 * 
 * @property {string} id - Unique identifier for the feature
 * @property {string} icon - Emoji or icon character to display
 * @property {string} title - Feature name/title
 * @property {string} description - Brief description of the feature
 */
export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const featuresData: Feature[] = [
  {
    id: "serverless",
    icon: "⚡",
    title: "Serverless",
    description: "AWS Lambda + CloudFront for zero server management and automatic scaling"
  },
  {
    id: "react",
    icon: "⚛️",
    title: "Modern React",
    description: "Built with React 19 and TypeScript for type-safe, maintainable code"
  },
  {
    id: "vite",
    icon: "🚀",
    title: "Lightning Fast",
    description: "Vite-powered development with instant HMR and optimized production builds"
  },
  {
    id: "tailwind",
    icon: "🎨",
    title: "Tailwind CSS",
    description: "Utility-first CSS with custom theme and dark mode support"
  },
  {
    id: "infrastructure",
    icon: "🏗️",
    title: "Infrastructure as Code",
    description: "AWS CDK for reproducible, version-controlled infrastructure deployment"
  },
  {
    id: "ci-cd",
    icon: "🔄",
    title: "CI/CD Ready",
    description: "GitHub Actions workflows for automated testing and deployment"
  },
  {
    id: "cost-effective",
    icon: "💰",
    title: "Cost Effective",
    description: "Pay only for what you use with AWS's serverless pricing model"
  },
  {
    id: "secure",
    icon: "🔒",
    title: "Secure by Default",
    description: "HTTPS, CloudFront distribution, and AWS security best practices"
  }
];
