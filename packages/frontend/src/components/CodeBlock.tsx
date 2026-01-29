import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

/**
 * CodeBlock Component Props
 * 
 * @property {string} code - The code string to display
 * @property {string} language - Programming language for syntax highlighting
 * @property {string} [title] - Optional title displayed above code block
 */
interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

/**
 * CodeBlock Component
 * 
 * A syntax-highlighted code block component with:
 * - Prism.js syntax highlighting
 * - Dark mode optimized styling
 * - Language badge
 * - Optional title
 * - Copy button (optional, for future enhancement)
 * 
 * Features:
 * - Auto-highlights on mount and updates
 * - Responsive scrolling for long code
 * - Dark theme compatible
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  // Language display name mapping
  const languageLabels: Record<string, string> = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    bash: 'Bash',
    json: 'JSON',
  };

  const languageLabel = languageLabels[language] || language;

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden shadow-lg">
      {/* Header with title and language badge */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        {title && (
          <p className="text-sm font-medium text-slate-300">{title}</p>
        )}
        <div className="ml-auto">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-200">
            {languageLabel}
          </span>
        </div>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        <pre className="!bg-transparent !m-0 !p-0 text-sm">
          <code
            ref={codeRef}
            className={`language-${language} !bg-transparent`}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};
