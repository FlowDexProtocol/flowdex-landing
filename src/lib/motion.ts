import type { Variants } from 'framer-motion';

// Easing/timings matched to the JSX prototypes' Sl/FU/Sc/Ct reveal helpers.
export const EASE_SLIDE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -70, y: 16 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: EASE_SLIDE } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 70, y: 16 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: EASE_SLIDE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerContainer = (staggerDelay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay } },
});
