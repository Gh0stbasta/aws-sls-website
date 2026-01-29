import type { Variants } from 'framer-motion';

/**
 * Animation Variants for Framer Motion
 * 
 * This module exports reusable animation variants for consistent animations
 * across the application. Framer Motion automatically respects the user's 
 * prefers-reduced-motion setting by reducing animation durations when enabled.
 * 
 * Note: When prefers-reduced-motion is enabled, Framer Motion automatically
 * sets animation durations to 0, so we don't need to manually check the preference.
 */

/**
 * Fade In animation
 * Simple opacity transition from 0 to 1
 */
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

/**
 * Fade In Up animation
 * Combines opacity and vertical movement for a smooth entrance effect
 */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

/**
 * Fade In Down animation
 * Combines opacity and vertical movement from above
 */
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

/**
 * Stagger Container
 * Container that staggers the animation of its children
 * Perfect for lists or groups of elements
 */
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.4
    }
  }
};

/**
 * Scale In animation
 * Scales element from smaller to normal size
 */
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

/**
 * Slide In from Left
 * Slides element in from the left side
 */
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

/**
 * Slide In from Right
 * Slides element in from the right side
 */
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

/**
 * Hero Title animation
 * Special variant for hero titles with delayed animation
 */
export const heroTitle: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
      delay: 0.2
    }
  }
};

/**
 * Hero Subtitle animation
 * Delayed animation for subtitle text
 */
export const heroSubtitle: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.4
    }
  }
};

/**
 * Hero CTA (Call-to-Action) animation
 * Delayed animation for CTA buttons in hero sections
 */
export const heroCTA: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.6
    }
  }
};
