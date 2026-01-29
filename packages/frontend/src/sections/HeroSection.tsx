import React from 'react';

/**
 * Hero Section Component Props
 * 
 * @property {string} title - Main headline displayed in large font
 * @property {string} subtitle - Secondary text displayed below title
 * @property {string} ctaText - Call-to-action button text
 * @property {string} ctaLink - URL or anchor link for the CTA button
 */
export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

/**
 * Hero Section Component
 * 
 * A full-height hero section with centered content, including:
 * - Large responsive title
 * - Subtitle text
 * - Call-to-action button with hover effects
 * 
 * Features:
 * - Fully responsive with mobile-optimized font sizes
 * - Dark mode support
 * - Smooth scroll anchor support
 * - Tailwind CSS styling
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink
}) => {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Handle smooth scrolling for anchor links
    if (ctaLink.startsWith('#')) {
      e.preventDefault();
      const targetId = ctaLink.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-200"
    >
      <div className="text-center px-4 max-w-4xl mx-auto">
        {/* Main Title - Large, responsive, with gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent leading-tight">
          {title}
        </h1>
        
        {/* Subtitle - Medium size, readable */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        {/* CTA Button - Styled with hover effects */}
        <a
          href={ctaLink}
          onClick={handleCtaClick}
          className="inline-block bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};
