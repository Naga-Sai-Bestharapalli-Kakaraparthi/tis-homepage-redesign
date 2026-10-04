'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface Sport {
  name: string;
  image: string;
  description: string;
  facilities: string[];
}

const SPORTS: Sport[] = [
  {
    name: 'Archery',
    image:
      'https://images.pexels.com/photos/6540692/pexels-photo-6540692.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Professional archery training with certified coaches on our dedicated range. Students develop precision, focus, and discipline.',
    facilities: ['Olympic-standard targets', 'Compound & recurve bows', 'Certified coaches', 'Safety gear provided'],
  },
  {
    name: 'Horse Riding',
    image:
      'https://images.pexels.com/photos/39456235/pexels-photo-39456235.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'World-class equestrian facilities with trained horses and expert instructors. From beginner to advanced riding skills.',
    facilities: ['Professional stables', 'Trained horses', 'Dressage arena', 'Expert instructors'],
  },
  {
    name: 'Football',
    image:
      'https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Full-size football ground with FIFA-standard turf. Regular inter-school tournaments and professional coaching.',
    facilities: ['FIFA-standard turf', 'Professional coaching', 'Inter-school tournaments', 'Night lighting'],
  },
  {
    name: 'Shooting Range',
    image:
      'https://images.pexels.com/photos/6092070/pexels-photo-6092070.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Indoor shooting range with professional-grade equipment. Students train under national-level shooting instructors.',
    facilities: ['Indoor 10m range', 'Professional equipment', 'National-level coaches', 'Safety protocols'],
  },
  {
    name: 'Swimming',
    image:
      'https://images.pexels.com/photos/8028682/pexels-photo-8028682.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Olympic-size swimming pool with temperature control. Competitive swimming training and water safety programs.',
    facilities: ['Olympic-size pool', 'Temperature controlled', 'Certified lifeguards', 'Competitive training'],
  },
  {
    name: 'Cycling',
    image:
      'https://images.pexels.com/photos/21588830/pexels-photo-21588830.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Dedicated cycling tracks and trails across our 22-acre campus. Professional-grade cycles and training programs.',
    facilities: ['Dedicated cycling tracks', 'Professional cycles', 'Cross-country trails', 'Safety equipment'],
  },
  {
    name: 'Squash',
    image:
      'https://images.pexels.com/photos/10470898/pexels-photo-10470898.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'International-standard squash courts with glass-back walls. Professional coaching for all skill levels.',
    facilities: ['Glass-back courts', 'Professional coaching', 'Tournament standard', 'Equipment provided'],
  },
  {
    name: 'Lawn Tennis',
    image:
      'https://images.pexels.com/photos/27151849/pexels-photo-27151849.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'All-weather tennis courts with professional coaching. Regular tournaments and skill development programs.',
    facilities: ['All-weather courts', 'Professional coaching', 'Regular tournaments', 'Equipment provided'],
  },
];

function SportCard({ sport, index, onClick }: { sport: Sport; index: number; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      data-cursor="pointer"
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-navy text-left"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sport.image}
        alt={sport.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent transition-opacity duration-500 group-hover:from-navy-deep/95" />

      {/* Title */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-playfair text-xl font-semibold text-white">
          {sport.name}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-gold/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>View details</span>
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </div>
      </div>

      {/* Gold border on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-gold/0 transition-colors duration-300 group-hover:border-gold/40" />
    </motion.button>
  );
}

function SportModal({ sport, onClose }: { sport: Sport; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9980] flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gold/20 bg-card shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-navy-deep/60 text-white transition-colors hover:bg-gold hover:text-navy"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sport.image} alt={sport.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h3 className="font-playfair text-3xl font-bold text-white">{sport.name}</h3>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
            {sport.description}
          </p>
          <div className="mt-6">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
              Facilities & Features
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {sport.facilities.map((facility) => (
                <div key={facility} className="flex items-center gap-2 text-sm text-foreground/70">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15">
                    <Check className="h-3 w-3 text-gold" />
                  </div>
                  {facility}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SportsGrid() {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  return (
    <section
      id="sports"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            World-Class Facilities
          </span>
          <h2 className="mt-4 font-playfair text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            16+ Olympic Sports &{' '}
            <span className="text-gradient-gold">Premium Facilities</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            From archery to equestrian sports, our campus offers world-class training
            facilities for every passion. Click any sport to explore.
          </p>
        </motion.div>

        {/* Sports grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {SPORTS.map((sport, i) => (
            <SportCard key={sport.name} sport={sport} index={i} onClick={() => setSelectedSport(sport)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSport && (
          <SportModal sport={selectedSport} onClose={() => setSelectedSport(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
