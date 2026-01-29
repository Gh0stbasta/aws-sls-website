import React from 'react';
import type { QuickStartStep as QuickStartStepType } from '../data/quickStart';

/**
 * Quick Start Step Component Props
 * 
 * @property {QuickStartStepType} step - The step data to display
 * @property {boolean} [isLast] - Whether this is the last step (affects connector line)
 */
interface QuickStartStepProps {
  step: QuickStartStepType;
  isLast?: boolean;
}

/**
 * Quick Start Step Component
 * 
 * Displays a single step in the quick start timeline/stepper.
 * 
 * Features:
 * - Numbered circle indicator
 * - Title and description
 * - Optional command display with copy-paste ready code block
 * - Connector line to next step (except for last step)
 * - Dark mode support
 * - Mobile responsive
 * 
 * How to customize:
 * - Modify the circle size/colors in the indicator div
 * - Adjust spacing between steps
 * - Customize command code block styling
 */
export const QuickStartStep: React.FC<QuickStartStepProps> = ({ step, isLast = false }) => {
  return (
    <div className="relative flex gap-6">
      {/* Step Indicator Column */}
      <div className="flex flex-col items-center">
        {/* Circle with Number */}
        <div 
          className="w-12 h-12 rounded-full bg-primary-600 dark:bg-primary-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-lg"
          aria-label={`Step ${step.number}`}
        >
          {step.number}
        </div>
        
        {/* Connector Line - Only show if not last step */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-primary-200 dark:bg-primary-800 min-h-[60px]" />
        )}
      </div>

      {/* Content Column */}
      <div className="flex-1 pb-8">
        {/* Step Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {step.title}
        </h3>
        
        {/* Step Description */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4">
          {step.description}
        </p>
        
        {/* Optional Command Block */}
        {step.command && (
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
            <pre>
              <code className="text-sm sm:text-base text-green-400 dark:text-green-300 font-mono">
                {step.command}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
