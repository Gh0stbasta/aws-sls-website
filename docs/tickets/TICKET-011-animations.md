# TICKET-011: Animations (Framer Motion)

**Status:** OPEN  
**Assignee:** -  
**Effort:** M  
**Priority:** MEDIUM

## Context & Architecture

**Komponente:** Animations & UX Enhancement  
**Betroffene Module:** All Section Components  
**Relevante ADRs:** ADR-001 (Frontend Stack)  
**Design Pattern:** Declarative Animations with Framer Motion

## User Story

> "Als **User**, möchte ich **smooth Animations beim Scrolling**, damit **die Website modern und engaging wirkt**."

## Contract Definition

**Animation Patterns:**
```typescript
// src/animations/variants.ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

// Usage in Components:
<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content
</motion.div>
```

## Acceptance Criteria

- [ ] Framer Motion installiert
- [ ] Hero Section hat Fade-In Animation
- [ ] Feature Cards haben Stagger Animation
- [ ] Scroll-triggered Animations (InView)
- [ ] Smooth Transitions alle Sections
- [ ] No Janky/Stuttering Animations
- [ ] Performance ist gut (60fps)
- [ ] Mobile Performance okay (optional: reduced motion)

## Requirements

### Funktional
- [ ] Hero Title/Subtitle Fade-In
- [ ] Feature Cards Stagger on Scroll
- [ ] Section Transitions smooth
- [ ] CTA Button Hover Animation
- [ ] Scroll Triggered Animations (useInView)
- [ ] Respects `prefers-reduced-motion`
- [ ] All Acceptance Criteria erfüllt

### Technisch
- [ ] Framer Motion v10+
- [ ] useInView Hook für Scroll Triggers
- [ ] Reusable Animation Variants
- [ ] No janky transitions
- [ ] 60fps Performance
- [ ] TypeScript Animations

### Dokumentation
- [ ] Animation Variants dokumentiert
- [ ] How to add animations dokumentiert
- [ ] Performance tips documented

## Implementation Plan

**Schritt 1: Framer Motion Setup**
- [ ] `framer-motion` installieren
- [ ] `src/animations/variants.ts` erstellen
- [ ] Common Animations definieren (fadeIn, stagger, etc.)

**Schritt 2: Hero Section Animations**
- [ ] Title Fade-In + Delay
- [ ] Subtitle Fade-In
- [ ] CTA Button Scale on Hover

**Schritt 3: Feature Cards Animations**
- [ ] Container mit Stagger
- [ ] Each Card Fade-In + Scale
- [ ] useInView für Scroll Trigger

**Schritt 4: Section Transitions**
- [ ] Each Section Fade-In on Scroll
- [ ] Parallax optional (nice-to-have)
- [ ] Code Examples Section Slide-In

**Schritt 5: Performance & Accessibility**
- [ ] Test 60fps auf Desktop/Mobile
- [ ] Respects prefers-reduced-motion
- [ ] No Layout Shift
- [ ] Animations subtle (not overdone)

## Dependencies

**Blockiert durch:**
- [ ] TICKET-003 (Frontend Setup)
- [ ] TICKET-006, 007, 008, 009, 010 (Sections need to exist)

**Blockiert:**
- [ ] Keine

## Notes

- Framer Motion ist perfekt für einfache Animations
- `useInView` Hook für Scroll-Triggered Animations
- Animations sollten subtle sein (nicht zu viel)
- `prefers-reduced-motion` Respect ist wichtig (Accessibility)
- Mobile: Animations können optional reduced werden
- No Parallax für MVP (zu komplex)
