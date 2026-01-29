/**
 * Architecture Section Data
 * 
 * This file contains the data structure for the AWS architecture diagram.
 * Externalized for easy customization without touching component code.
 */

/**
 * Architecture Node
 * Represents a component in the AWS architecture
 */
export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'client' | 'cdn' | 'storage' | 'deployment';
  description: string;
}

/**
 * Architecture Flow
 * Represents a connection/data flow between architecture nodes
 */
export interface ArchitectureFlow {
  from: string;
  to: string;
  label: string;
}

/**
 * All architecture nodes in the system
 */
export const architectureNodes: ArchitectureNode[] = [
  { 
    id: 'browser', 
    label: 'Browser', 
    type: 'client', 
    description: 'User browser' 
  },
  { 
    id: 'cloudfront', 
    label: 'CloudFront', 
    type: 'cdn', 
    description: 'CDN' 
  },
  { 
    id: 's3', 
    label: 'S3 Bucket', 
    type: 'storage', 
    description: 'Static files' 
  },
  { 
    id: 'github', 
    label: 'GitHub', 
    type: 'deployment', 
    description: 'Source code' 
  },
  { 
    id: 'actions', 
    label: 'GitHub Actions', 
    type: 'deployment', 
    description: 'CI/CD' 
  },
];

/**
 * All flows/connections between nodes
 * Shows the data flow from source code to user
 */
export const architectureFlows: ArchitectureFlow[] = [
  { from: 'github', to: 'actions', label: 'Push' },
  { from: 'actions', to: 's3', label: 'Deploy' },
  { from: 's3', to: 'cloudfront', label: 'Origin' },
  { from: 'cloudfront', to: 'browser', label: 'Serve' },
];
