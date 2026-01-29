import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Options for scroll animation hook
 */
export interface ScrollAnimationOptions {
  /**
   * Fraction of the element that must be visible to trigger the animation
   * 0 = trigger immediately when element enters viewport
   * 1 = trigger only when entire element is visible
   * Default: 0.1 (10% visible)
   */
  threshold?: number;
  
  /**
   * Whether the animation should trigger only once
   * Default: true
   */
  once?: boolean;
}

/**
 * Custom hook for scroll-triggered animations
 * 
 * This hook combines useRef and useInView from Framer Motion to create
 * scroll-triggered animations. The animation triggers when the element
 * becomes visible in the viewport.
 * 
 * @param options - Configuration options for the scroll animation
 * @returns Object containing ref and inView state
 * 
 * @example
 * ```tsx
 * const { ref, inView } = useScrollAnimation({ threshold: 0.2 });
 * 
 * return (
 *   <motion.div
 *     ref={ref}
 *     initial="hidden"
 *     animate={inView ? "visible" : "hidden"}
 *     variants={fadeInUp}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    once = true
  } = options;

  const ref = useRef(null);
  const inView = useInView(ref, {
    once,
    amount: threshold
  });

  return { ref, inView };
};
