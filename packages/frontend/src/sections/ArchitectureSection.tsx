import React from 'react';
import { architectureNodes, architectureFlows, type ArchitectureNode } from '../data/architecture';

/**
 * Node type styling configurations
 * Using complete className strings to ensure Tailwind can detect and include these classes
 */
const NODE_TYPE_STYLES: Record<ArchitectureNode['type'], { containerClass: string; legendClass: string }> = {
  client: { 
    containerClass: 'bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-500',
    legendClass: 'w-4 h-4 rounded bg-blue-500'
  },
  cdn: { 
    containerClass: 'bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-purple-500',
    legendClass: 'w-4 h-4 rounded bg-purple-500'
  },
  storage: { 
    containerClass: 'bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-500',
    legendClass: 'w-4 h-4 rounded bg-green-500'
  },
  deployment: { 
    containerClass: 'bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-orange-500',
    legendClass: 'w-4 h-4 rounded bg-orange-500'
  },
};

/**
 * Architecture Section Component
 * 
 * Displays the AWS architecture diagram showing:
 * - GitHub → GitHub Actions → S3 → CloudFront → Browser flow
 * - Visual representation of each node
 * - Connections/flows between nodes
 * 
 * Features:
 * - SVG-based diagram for clean rendering
 * - Dark mode support
 * - Responsive design
 * - Externalized data
 */
export const ArchitectureSection: React.FC = () => {
  // Create a map for efficient node lookups
  const nodeMap = React.useMemo(() => {
    return new Map(architectureNodes.map(node => [node.id, node]));
  }, []);

  // Helper to safely get nodes
  const getNode = (id: string) => nodeMap.get(id);
  
  // Helper to get flow by source
  const getFlow = (from: string) => architectureFlows.find(f => f.from === from);

  return (
    <section 
      id="architecture" 
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-200"
    >
      <div className="max-w-6xl w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Architecture
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AWS Serverless Infrastructure Overview
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 overflow-x-auto">
          <div className="min-w-[800px]" role="img" aria-label="AWS Architecture diagram showing data flow from GitHub through GitHub Actions to S3, then CloudFront, and finally to Browser">
            {/* Visual Flow Diagram */}
            <div className="relative">
              {/* SVG for connection lines */}
              <svg 
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {/* GitHub to Actions */}
                <line x1="20%" y1="25%" x2="20%" y2="40%" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* Actions to S3 */}
                <line x1="20%" y1="60%" x2="40%" y2="60%" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* S3 to CloudFront */}
                <line x1="60%" y1="60%" x2="80%" y2="60%" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* CloudFront to Browser */}
                <line x1="80%" y1="40%" x2="80%" y2="25%" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Arrow marker definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" className="fill-gray-400 dark:fill-gray-600" />
                  </marker>
                </defs>
              </svg>

              {/* Nodes Grid Layout */}
              <div className="grid grid-cols-2 gap-8 relative z-10">
                {/* Top Row: Browser and CloudFront */}
                <div className="col-span-1"></div>
                <div className="col-span-1 flex justify-center">
                  {getNode('browser') && <NodeBox node={getNode('browser')!} />}
                </div>

                {/* Middle Row with flow labels */}
                <div className="col-span-2 grid grid-cols-4 gap-4">
                  {/* GitHub */}
                  <div className="flex flex-col items-center">
                    {getNode('github') && <NodeBox node={getNode('github')!} />}
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      ↓ {getFlow('github')?.label}
                    </div>
                  </div>

                  {/* GitHub Actions */}
                  <div className="flex flex-col items-center">
                    {getNode('actions') && <NodeBox node={getNode('actions')!} />}
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      → {getFlow('actions')?.label}
                    </div>
                  </div>

                  {/* S3 */}
                  <div className="flex flex-col items-center">
                    {getNode('s3') && <NodeBox node={getNode('s3')!} />}
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      → {getFlow('s3')?.label}
                    </div>
                  </div>

                  {/* CloudFront */}
                  <div className="flex flex-col items-center">
                    {getNode('cloudfront') && <NodeBox node={getNode('cloudfront')!} />}
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      ↑ {getFlow('cloudfront')?.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Component Types
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <LegendItem type="deployment" label="CI/CD Pipeline" />
                <LegendItem type="storage" label="Storage" />
                <LegendItem type="cdn" label="Content Delivery" />
                <LegendItem type="client" label="Client" />
              </div>
            </div>
          </div>
        </div>

        {/* Flow Description */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Data Flow:</span> Code is pushed to GitHub, triggering GitHub Actions 
            which builds and deploys to S3. CloudFront serves the static content to users worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * Individual Node Box Component
 */
interface NodeBoxProps {
  node: ArchitectureNode;
}

const NodeBox: React.FC<NodeBoxProps> = ({ node }) => {
  const styles = NODE_TYPE_STYLES[node.type];
  
  return (
    <div 
      className={`${styles.containerClass} rounded-lg p-4 min-w-[140px] text-center shadow-lg hover:shadow-xl transition-shadow duration-200`}
    >
      <div className="text-white font-bold text-lg mb-1">
        {node.label}
      </div>
      <div className="text-white text-xs opacity-90">
        {node.description}
      </div>
    </div>
  );
};

/**
 * Legend Item Component
 */
interface LegendItemProps {
  type: ArchitectureNode['type'];
  label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ type, label }) => {
  const styles = NODE_TYPE_STYLES[type];

  return (
    <div className="flex items-center gap-2">
      <div className={styles.legendClass}></div>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </div>
  );
};
