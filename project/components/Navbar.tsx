'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, GraduationCap, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Rankings', href: '#rankings' },
  { label: 'Sports', href: '#sports' },
  { label: 'Visitors', href: '#testimonials' },
  { label: 'Admissions', href: '#admissions' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'fixed left-0 right-0 top-0 z-[9990] transition-all duration-500',
        scrolled ? 'glass-nav border-b border-gold/10 shadow-lg shadow-navy/5' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5"
        >
          <motion.div
            whileHover={{ rotate: -5, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-light shadow-gold"
          >
            <GraduationCap className="h-6 w-6 text-navy" strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="font-playfair text-lg font-bold tracking-tight text-foreground">
              Tulas
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
              International School
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gold transition-all duration-300 group-hover:w-3/4" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Right side: Theme toggle + CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-card/50 text-foreground transition-all hover:border-gold/50 hover:text-gold"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}

          <motion.a
            href="#admissions"
            onClick={(e) => handleNavClick(e, '#admissions')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold to-gold-light px-5 py-2.5 text-sm font-semibold text-navy shadow-gold transition-shadow hover:shadow-gold-lg sm:flex"
          >
            Apply Now
            <ChevronRight className="h-4 w-4" />
          </motion.a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-card/50 text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden glass-nav border-b border-gold/10 lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-gold/10 hover:text-gold"
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </a>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href="#admissions"
                  onClick={(e) => handleNavClick(e, '#admissions')}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-gold to-gold-light px-5 py-3 text-sm font-semibold text-navy"
                >
                  Apply Now
                  <ChevronRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
