import React from 'react';
import type { Feature } from '../data/features';

/**
 * FeatureCard Component Props
 * 
 * @property {Feature} feature - The feature data to display
 */
export interface FeatureCardProps {
  feature: Feature;
}

/**
 * FeatureCard Component
 * 
 * A reusable card component that displays a single feature with:
 * - An emoji/icon
 * - A title
 * - A description
 * 
 * Features:
 * - Hover effects (shadow and scale transformation)
 * - Dark mode support
 * - Responsive padding and spacing
 * - Accessible and semantic HTML
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="group p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary-400 dark:hover:border-primary-500">
      {/* Icon */}
      <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
        {feature.icon}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {feature.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};
