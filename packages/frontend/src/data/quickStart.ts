/**
 * Quick Start Data
 * 
 * This file contains the data structure and content for the Quick Start section.
 * 
 * How to customize:
 * - Add/remove steps from the quickStartStepsData array
 * - Modify step titles, descriptions, or commands
 * - Ensure step numbers are sequential
 */

/**
 * Interface for a Quick Start Step
 * 
 * @property {string} id - Unique identifier for the step
 * @property {number} number - Step number (1, 2, 3, etc.)
 * @property {string} title - Step title/heading
 * @property {string} description - Detailed description of the step
 * @property {string} [command] - Optional command to run (displayed in code block)
 */
export interface QuickStartStep {
  id: string;
  number: number;
  title: string;
  description: string;
  command?: string; // Optional command to run
}

/**
 * Quick Start Steps Data
 * 
 * Defines the steps needed to get started with the template.
 * Steps are displayed in order from 1 to 4.
 */
export const quickStartStepsData: QuickStartStep[] = [
  {
    id: 'clone',
    number: 1,
    title: 'Clone Repository',
    description: 'Clone the template repository to your local machine',
    command: 'git clone https://github.com/Gh0stbasta/aws-sls-website'
  },
  {
    id: 'install',
    number: 2,
    title: 'Install Dependencies',
    description: 'Install pnpm package manager and project dependencies',
    command: 'pnpm install'
  },
  {
    id: 'dev',
    number: 3,
    title: 'Start Dev Server',
    description: 'Run the frontend development server locally',
    command: 'cd packages/frontend && pnpm run dev'
  },
  {
    id: 'deploy',
    number: 4,
    title: 'Deploy to AWS',
    description: 'Deploy infrastructure and frontend to AWS using CDK',
    command: 'cd packages/infrastructure && cdk deploy'
  },
];
