'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp } from '@/lib/motion';

export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  as?: 'div' | 'span';
}) {
  const MotionTag = as === 'span' ? motion.span : motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
