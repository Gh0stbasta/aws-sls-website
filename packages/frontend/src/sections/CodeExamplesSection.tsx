import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { codeExamplesData } from '../data/codeExamples';

/**
 * Code Examples Section Component
 * 
 * A section displaying code examples in a tabbed interface.
 * 
 * Features:
 * - Tabbed navigation for multiple code examples
 * - Syntax-highlighted code blocks
 * - Responsive tab layout (scrollable on mobile)
 * - Dark mode compatible
 * - Example descriptions
 * 
 * Uses:
 * - CodeBlock component for code display
 * - codeExamplesData for content
 */
export const CodeExamplesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(codeExamplesData[0]?.id || '');

  const activeExample = codeExamplesData.find(
    (example) => example.id === activeTab
  ) || codeExamplesData[0];

  return (
    <section
      id="code-examples"
      className="min-h-screen py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            Code Examples
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore practical examples to get started with the template
          </p>
        </div>

        {/* Tabbed Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto -mb-px space-x-2 scrollbar-hide" aria-label="Tabs">
              {codeExamplesData.map((example) => {
                const isActive = activeTab === example.id;
                return (
                  <button
                    key={example.id}
                    onClick={() => setActiveTab(example.id)}
                    className={`
                      whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors
                      ${
                        isActive
                          ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {example.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Active Code Example */}
        <div className="space-y-4">
          {activeExample && (
            <>
              {/* Description */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  {activeExample.description}
                </p>
              </div>

              {/* Code Block */}
              <CodeBlock
                code={activeExample.code}
                language={activeExample.language}
                title={activeExample.title}
              />
            </>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All examples are ready to copy and use in your project
          </p>
        </div>
      </div>
    </section>
  );
};
