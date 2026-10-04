'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Play, MapPin, Trees, Trophy, Users, Award } from 'lucide-react';

const HERO_IMAGE =
  'https://images.pexels.com/photos/29461083/pexels-photo-29461083.jpeg?auto=compress&cs=tinysrgb&w=1920';

const FLOATING_STATS = [
  { icon: Trees, value: '22', unit: 'Acre', label: 'Eco-Friendly Campus', delay: 0.3 },
  { icon: Trophy, value: '16+', unit: '', label: 'Olympic Sports', delay: 0.45 },
  { icon: Users, value: '6:1', unit: '', label: 'Student-Teacher Ratio', delay: 0.6 },
  { icon: Award, value: '#1', unit: '', label: 'Boarding School in Dehradun', delay: 0.75 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function Hero() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-navy-deep pt-24"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="Tulas International School campus aerial view"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/60 to-navy-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/50 to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Floating gold orbs */}
      <motion.div
        className="absolute right-[10%] top-[20%] z-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[5%] z-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-20 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl">
          {/* Location badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm text-gold backdrop-blur-sm"
          >
            <MapPin className="h-4 w-4" />
            <span className="font-medium tracking-wide">Dehradun, Uttarakhand</span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
            <span className="text-gold/70">CBSE Co-Ed Boarding</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-playfair text-4xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Empowering Global Leaders on a{' '}
            <span className="text-gradient-gold">22-Acre</span>{' '}
            <span className="text-gradient-gold">Eco-Friendly</span> Campus
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl"
          >
            Top-ranked CBSE Co-Ed Boarding School in Dehradun combining academic
            excellence, 16+ Olympic sports, and holistic development.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('#sports')}
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-light px-7 py-3.5 text-sm font-semibold text-navy shadow-gold transition-shadow hover:shadow-gold-lg sm:text-base"
            >
              Explore Campus Life
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('#admissions')}
              className="group flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-gold/10 sm:text-base"
            >
              <Play className="h-5 w-5 text-gold" />
              Book a Virtual Tour
            </motion.button>
          </motion.div>

          {/* Floating stats badges */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {FLOATING_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: stat.delay, type: 'spring', stiffness: 200, damping: 15 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition-colors group-hover:bg-gold/25">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-0.5">
                        <span className="font-playfair text-xl font-bold text-white sm:text-2xl">
                          {stat.value}
                        </span>
                        {stat.unit && (
                          <span className="text-xs text-gold/80">{stat.unit}</span>
                        )}
                      </div>
                      <p className="text-xs leading-tight text-slate-400 sm:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
        <div className="flex h-12 w-6 justify-center rounded-full border-2 border-white/20 p-1">
          <motion.div
            className="h-2 w-1 rounded-full bg-gold"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
