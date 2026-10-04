'use client';

import { motion } from 'framer-motion';
import { Trophy, MapPin, Globe, Flag, TrendingUp } from 'lucide-react';
import { useCountUp } from './useCountUp';

interface RankingCard {
  rank: string;
  rankNum: number;
  scope: string;
  icon: typeof Trophy;
  highlight: string;
}

const RANKINGS: RankingCard[] = [
  {
    rank: '#1',
    rankNum: 1,
    scope: 'Co-Ed Boarding School in Dehradun',
    icon: MapPin,
    highlight: 'Local Excellence',
  },
  {
    rank: '#2',
    rankNum: 2,
    scope: 'Co-Ed Boarding School in Uttarakhand',
    icon: Flag,
    highlight: 'State Recognition',
  },
  {
    rank: '#1',
    rankNum: 1,
    scope: 'Co-Ed Boarding School in North India',
    icon: Globe,
    highlight: 'Regional Leadership',
  },
  {
    rank: '#4',
    rankNum: 4,
    scope: 'Co-Ed Boarding School in India',
    icon: Trophy,
    highlight: 'National Ranking',
  },
];

function RankCard({ ranking, index }: { ranking: RankingCard; index: number }) {
  const { ref, display } = useCountUp({
    end: ranking.rankNum,
    duration: 2,
    prefix: '#',
  });

  const Icon = ranking.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-lg transition-shadow hover:shadow-xl sm:p-8"
    >
      {/* Gradient hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 transition-all duration-500 group-hover:from-gold/5 group-hover:via-gold/0 group-hover:to-gold/10" />

      {/* Top gold bar */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-gold to-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
            {ranking.highlight}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span
            ref={ref}
            className="font-playfair text-5xl font-bold text-gradient-gold sm:text-6xl"
          >
            {display}
          </span>
        </div>

        <p className="mt-3 text-sm font-medium leading-snug text-foreground/70 sm:text-base">
          {ranking.scope}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-gold/70">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Ranked by Educational Excellence Awards</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section
      id="rankings"
      className="relative overflow-hidden bg-gradient-to-b from-navy-deep to-navy py-20 sm:py-28"
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            Awards & Rankings
          </span>
          <h2 className="mt-4 font-playfair text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Recognized Among the{' '}
            <span className="text-gradient-gold">Best in India</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Our commitment to academic excellence and holistic development has earned
            us prestigious rankings across every level.
          </p>
        </motion.div>

        {/* Rankings grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RANKINGS.map((ranking, i) => (
            <RankCard key={i} ranking={ranking} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
