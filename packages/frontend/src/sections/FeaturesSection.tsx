import React from 'react';
import { FeatureCard } from '../components/FeatureCard';
import { featuresData } from '../data/features';

/**
 * Features Section Component
 * 
 * Displays a grid of feature cards highlighting the key benefits of the template.
 * 
 * Features:
 * - Responsive grid layout:
 *   - 1 column on mobile
 *   - 2 columns on tablet (md breakpoint)
 *   - 3 columns on desktop (lg breakpoint)
 * - Dark mode support
 * - Smooth transitions
 * - Semantic HTML with section and heading
 * 
 * The feature data is externalized in src/data/features.ts for easy customization.
 */
export const FeaturesSection: React.FC = () => {
  return (
    <section 
      id="features" 
      className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-200"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to build and deploy a modern serverless website
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map(feature => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
