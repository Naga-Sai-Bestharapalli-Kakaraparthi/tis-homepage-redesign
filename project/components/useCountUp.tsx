'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp({
  end,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, end, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate(value) {
        setDisplay(
          prefix +
            value.toFixed(decimals) +
            suffix
        );
      },
    });

    return () => controls.stop();
  }, [inView, end, duration, decimals, prefix, suffix]);

  return { ref, display };
}
