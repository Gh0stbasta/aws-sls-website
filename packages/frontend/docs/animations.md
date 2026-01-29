# Framer Motion Animations Guide

## Overview

This project uses [Framer Motion](https://www.framer.com/motion/) for declarative, performant animations. All animations are designed with accessibility in mind and respect the user's `prefers-reduced-motion` system setting.

## Table of Contents

- [Quick Start](#quick-start)
- [Available Animation Variants](#available-animation-variants)
- [Using Scroll-Triggered Animations](#using-scroll-triggered-animations)
- [Hero Section Animations](#hero-section-animations)
- [Performance Best Practices](#performance-best-practices)
- [Accessibility](#accessibility)
- [Examples](#examples)

## Quick Start

### Basic Animation

```tsx
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/variants';

function MyComponent() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <h1>This will fade in with upward motion</h1>
    </motion.div>
  );
}
```

### Scroll-Triggered Animation

Using Framer Motion's built-in `whileInView` (recommended):

```tsx
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/variants';

function MySection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <h2>This animates when scrolled into view</h2>
    </motion.section>
  );
}
```

Alternative using the `useScrollAnimation` hook:

```tsx
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp } from '../animations/variants';

function MySection() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <h2>This animates when scrolled into view</h2>
    </motion.section>
  );
}
```

## Available Animation Variants

All variants are defined in `src/animations/variants.ts` and automatically respect `prefers-reduced-motion`.

### Basic Animations

#### `fadeIn`
Simple opacity transition from 0 to 1.
```tsx
variants={fadeIn}
```

#### `fadeInUp`
Combines opacity with upward vertical movement (20px).
```tsx
variants={fadeInUp}
```

#### `fadeInDown`
Combines opacity with downward vertical movement from above (20px).
```tsx
variants={fadeInDown}
```

#### `scaleIn`
Scales element from 95% to 100% size with opacity.
```tsx
variants={scaleIn}
```

### Directional Animations

#### `slideInLeft`
Slides element in from the left (-50px).
```tsx
variants={slideInLeft}
```

#### `slideInRight`
Slides element in from the right (+50px).
```tsx
variants={slideInRight}
```

### Container Animations

#### `staggerContainer`
Container that staggers the animation of its children. Use with child variants for list animations.

```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

Configuration:
- **staggerChildren**: 0.1s delay between each child animation
- **delayChildren**: 0.2s delay before starting children animations

### Hero Section Variants

Special variants optimized for hero sections with specific timing:

#### `heroTitle`
For main hero titles - 0.8s duration, 0.2s delay, 30px upward motion.
```tsx
variants={heroTitle}
```

#### `heroSubtitle`
For hero subtitles - 0.6s duration, 0.4s delay, 20px upward motion.
```tsx
variants={heroSubtitle}
```

#### `heroCTA`
For hero CTA buttons - 0.6s duration, 0.6s delay, 20px upward motion.
```tsx
variants={heroCTA}
```

## Using Scroll-Triggered Animations

The `useScrollAnimation` hook simplifies scroll-triggered animations using Framer Motion's `useInView`.

### Hook API

```tsx
const { ref, inView } = useScrollAnimation(options);
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | `number` | `0.1` | Fraction of element that must be visible (0-1) |
| `once` | `boolean` | `true` | Whether animation triggers only once |

### Examples

**Trigger when 20% visible:**
```tsx
const { ref, inView } = useScrollAnimation({ threshold: 0.2 });
```

**Trigger repeatedly (every scroll):**
```tsx
const { ref, inView } = useScrollAnimation({ 
  once: false, 
  threshold: 0.3 
});
```

## Hero Section Animations

The HeroSection component demonstrates a coordinated sequence of animations:

1. **Title** appears first (0.2s delay)
2. **Subtitle** appears next (0.4s delay)
3. **CTA Button** appears last (0.6s delay)

Additionally, the CTA button has interactive hover/tap animations:
- **Hover**: Scales to 105%
- **Tap**: Scales to 98%

```tsx
<motion.a
  variants={heroCTA}
  initial="hidden"
  animate="visible"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
>
  Get Started
</motion.a>
```

## Performance Best Practices

### 1. Use Transform Properties
Framer Motion animations using `transform` properties (x, y, scale, rotate) are GPU-accelerated and perform at 60fps.

✅ **Good** (GPU-accelerated):
```tsx
variants={{ 
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}}
```

❌ **Avoid** (causes layout recalculation):
```tsx
variants={{ 
  hidden: { marginTop: 20 },
  visible: { marginTop: 0 }
}}
```

### 2. Optimize Animation Triggers
Use `once: true` for scroll animations that don't need to repeat:

```tsx
const { ref, inView } = useScrollAnimation({ once: true });
```

### 3. Reduce Motion Complexity on Mobile
The variants automatically disable animations when `prefers-reduced-motion` is enabled, but you can also conditionally reduce complexity:

```tsx
const isMobile = window.innerWidth < 768;

const variant = {
  hidden: { opacity: 0, y: isMobile ? 10 : 20 },
  visible: { opacity: 1, y: 0 }
};
```

### 4. Avoid Animating Too Many Elements
For long lists, consider:
- Using `staggerContainer` with a reasonable child limit
- Virtualizing lists with libraries like `react-window`
- Simplifying animations on lower-end devices

### 5. Monitor Performance
Use Chrome DevTools Performance tab to ensure animations maintain 60fps:

1. Open DevTools → Performance
2. Start recording
3. Trigger animations
4. Stop recording and check for frame drops

Target: Green bars should be under 16.7ms (60fps)

## Accessibility

### Respects `prefers-reduced-motion`

Framer Motion automatically respects the user's system preferences for reduced motion. When `prefers-reduced-motion: reduce` is enabled in the user's system settings, Framer Motion will:
- Instantly jump to the final state instead of animating
- Disable all transform-based animations
- Skip transition durations

This behavior is built into Framer Motion and works automatically with all animation variants in this project.

### Testing Reduced Motion

**macOS:**
1. System Preferences → Accessibility → Display
2. Enable "Reduce motion"

**Windows:**
1. Settings → Ease of Access → Display
2. Turn off "Show animations in Windows"

**Browser DevTools:**
1. Chrome DevTools → Command Palette (Cmd/Ctrl + Shift + P)
2. Type "emulate CSS prefers-reduced-motion"
3. Select "reduce"

After enabling reduced motion, reload the page to see instant state changes instead of animations.

### Focus Management

Always ensure animated elements maintain proper focus states:

```tsx
<motion.button
  variants={fadeInUp}
  className="focus:outline-none focus:ring-4"
>
  Click Me
</motion.button>
```

## Examples

### Card Grid with Stagger

```tsx
import { motion } from 'framer-motion';
import { staggerContainer, scaleIn } from '../animations/variants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function CardGrid({ cards }) {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {cards.map(card => (
        <motion.div
          key={card.id}
          variants={scaleIn}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Sequential Animations

```tsx
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function SequentialList() {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.li variants={item}>First item</motion.li>
      <motion.li variants={item}>Second item</motion.li>
      <motion.li variants={item}>Third item</motion.li>
    </motion.ul>
  );
}
```

### Hover Effects

```tsx
import { motion } from 'framer-motion';

function HoverCard() {
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3>Hover me!</h3>
    </motion.div>
  );
}
```

### Page Transitions

```tsx
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 }
};

function Page({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Troubleshooting

### Animations not triggering on scroll

1. Ensure the element has a `ref` attached:
   ```tsx
   <motion.div ref={ref}>
   ```

2. Check threshold value - lower values trigger earlier:
   ```tsx
   useScrollAnimation({ threshold: 0.1 }) // Triggers when 10% visible
   ```

3. Verify element is actually scrollable (has overflow content)

### Animations feel janky or stuttery

1. Check if animating transform properties (not layout properties)
2. Open DevTools Performance and look for long frames (>16.7ms)
3. Reduce number of simultaneously animating elements
4. Simplify animation complexity

### Reduced motion not working

1. Verify system settings are enabled
2. Check browser compatibility (modern browsers only)
3. Test in production build (dev mode may behave differently)

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Animation Performance Guide](https://web.dev/animations-guide/)
- [WCAG Motion Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [CSS Triggers (Performance)](https://csstriggers.com/)

## Support

For issues or questions:
1. Check this documentation
2. Review examples in `src/sections/HeroSection.tsx` and `src/App.tsx`
3. Consult Framer Motion documentation
4. Check project GitHub issues
