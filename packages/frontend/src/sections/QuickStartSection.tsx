import React from 'react';
import { QuickStartStep } from '../components/QuickStartStep';
import { quickStartStepsData } from '../data/quickStart';

/**
 * Quick Start Section Component
 * 
 * Displays a vertical timeline/stepper of quick start instructions
 * to help new developers get the template running quickly.
 * 
 * Features:
 * - Vertical timeline layout with numbered steps
 * - Step indicators with connector lines
 * - Copy-paste ready commands
 * - Dark mode support
 * - Mobile responsive
 * - Section ID "quick-start" for navigation
 * 
 * How to customize:
 * - Modify quickStartStepsData in src/data/quickStart.ts
 * - Adjust section padding/spacing
 * - Change heading text or styling
 */
export const QuickStartSection: React.FC = () => {
  return (
    <section 
      id="quick-start" 
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-16 px-4 transition-colors duration-200"
    >
      <div className="max-w-4xl w-full mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Start
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Get up and running in just 4 simple steps
          </p>
        </div>

        {/* Timeline Steps */}
        <ol className="space-y-0 list-none">
          {quickStartStepsData.map((step, index) => (
            <li key={step.id}>
              <QuickStartStep 
                step={step} 
                isLast={index === quickStartStepsData.length - 1}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
