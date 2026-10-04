'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="interactive"]'
      );
      const pointer = target.closest('a, button, [role="button"], [data-cursor="pointer"]');

      setIsHovering(!!interactive);
      setIsPointer(!!pointer);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 rounded-full border-2 border-gold mix-blend-difference md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovering ? 1.8 : 1,
        borderColor: isPointer
          ? 'hsl(48 85% 65%)'
          : isHovering
            ? 'hsl(46 74% 54%)'
            : 'hsl(46 74% 54%)',
        backgroundColor: isHovering
          ? 'hsla(46, 74%, 54%, 0.15)'
          : 'hsla(46, 74%, 54%, 0)',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    />
  );
}
