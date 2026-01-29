/**
 * Hero Section Data
 * 
 * This file contains the content for the hero section.
 * Externalized for easy customization without touching component code.
 */

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const heroData: HeroData = {
  title: "Serverless Static Website Template",
  subtitle: "AWS + React + Vite - Production Ready",
  ctaText: "Get Started",
  ctaLink: "#quick-start"
};
