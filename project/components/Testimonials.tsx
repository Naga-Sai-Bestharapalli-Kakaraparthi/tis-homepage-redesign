'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Medal, Users, Target } from 'lucide-react';

interface Visitor {
  name: string;
  title: string;
  icon: typeof Medal;
  quote: string;
  highlight: string;
}

const VISITORS: Visitor[] = [
  {
    name: 'Sakshi Malik',
    title: 'Olympic Bronze Medalist, Wrestling',
    icon: Medal,
    quote:
      'The facilities at Tulas International School are truly world-class. The dedication to sports alongside academics is exactly what young athletes need to excel on the global stage.',
    highlight: 'Olympic Medalist',
  },
  {
    name: 'Vishesh Bhriguvanshi',
    title: 'Indian Basketball Team Captain',
    icon: Users,
    quote:
      'TIS is nurturing the next generation of champions. The infrastructure and coaching standards rival professional academies. I am impressed by the students determination and spirit.',
    highlight: 'National Captain',
  },
  {
    name: 'Prakashi & Chandro Tomar',
    title: 'Renowned Shooter Dadis',
    icon: Target,
    quote:
      'Visiting Tulas International School filled our hearts with pride. The shooting range and the encouragement given to young talent is remarkable. These children are the future of Indian shooting.',
    highlight: 'Shooting Legends',
  },
];

interface Review {
  name: string;
  rating: number;
  text: string;
  role: string;
}

const REVIEWS: Review[] = [
  {
    name: 'Rajesh Kumar',
    rating: 5,
    role: 'Parent of Class VIII Student',
    text: 'TIS has transformed my child completely. The academic rigor combined with sports has built incredible confidence. The teachers are caring and the campus is beautiful.',
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    role: 'Parent of Class XI Student',
    text: 'As a parent, I could not have asked for a better school. The 6:1 ratio means my daughter gets personal attention. The sports facilities are better than most private academies.',
  },
  {
    name: 'Amit Singh',
    rating: 5,
    role: 'Parent of Class VI Student',
    text: 'The eco-friendly 22-acre campus is stunning. My son has discovered a passion for archery here. The holistic development approach is exactly what we wanted.',
  },
  {
    name: 'Neha Gupta',
    rating: 5,
    role: 'Parent of Class IX Student',
    text: 'Best decision we made was choosing TIS. The boarding facilities are excellent, food is nutritious, and the school maintains regular communication with parents.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count ? 'fill-gold text-gold' : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeVisitor, setActiveVisitor] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [activeTab, setActiveTab] = useState<'visitors' | 'reviews'>('visitors');

  const nextVisitor = () => setActiveVisitor((p) => (p + 1) % VISITORS.length);
  const prevVisitor = () => setActiveVisitor((p) => (p - 1 + VISITORS.length) % VISITORS.length);
  const nextReview = () => setActiveReview((p) => (p + 1) % REVIEWS.length);
  const prevReview = () => setActiveReview((p) => (p - 1 + REVIEWS.length) % REVIEWS.length);

  const currentVisitor = VISITORS[activeVisitor];
  const currentReview = REVIEWS[activeReview];
  const VisitorIcon = currentVisitor.icon;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-deep py-20 sm:py-28"
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            Recognition & Reviews
          </span>
          <h2 className="mt-4 font-playfair text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Distinguished Visitors &{' '}
            <span className="text-gradient-gold">Parent Voices</span>
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <div className="mx-auto mb-10 flex w-fit gap-1 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('visitors')}
            className={`rounded-xl px-5 py-2 text-sm font-medium transition-all ${
              activeTab === 'visitors'
                ? 'bg-gradient-to-r from-gold to-gold-light text-navy'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Distinguished Visitors
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`rounded-xl px-5 py-2 text-sm font-medium transition-all ${
              activeTab === 'reviews'
                ? 'bg-gradient-to-r from-gold to-gold-light text-navy'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Google Reviews
          </button>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'visitors' ? (
            <motion.div
              key="visitors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Visitor dots */}
              <div className="mb-6 flex justify-center gap-2">
                {VISITORS.map((v, i) => (
                  <button
                    key={v.name}
                    onClick={() => setActiveVisitor(i)}
                    aria-label={v.name}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                      i === activeVisitor
                        ? 'bg-gold text-navy'
                        : 'bg-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {v.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="relative mx-auto max-w-3xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeVisitor}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-3xl border border-gold/15 bg-white/5 p-8 backdrop-blur-md sm:p-10"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-light text-navy shadow-gold">
                        <VisitorIcon className="h-8 w-8" />
                      </div>
                      <Quote className="h-8 w-8 text-gold/30" />
                      <p className="mt-4 font-playfair text-lg leading-relaxed text-white/90 sm:text-xl">
                        {currentVisitor.quote}
                      </p>
                      <div className="mt-6">
                        <h4 className="font-playfair text-xl font-semibold text-gold">
                          {currentVisitor.name}
                        </h4>
                        <p className="mt-1 text-sm text-white/50">{currentVisitor.title}</p>
                        <span className="mt-2 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                          {currentVisitor.highlight}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={prevVisitor}
                    aria-label="Previous visitor"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextVisitor}
                    aria-label="Next visitor"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Review dots */}
              <div className="mb-6 flex justify-center gap-2">
                {REVIEWS.map((r, i) => (
                  <button
                    key={r.name}
                    onClick={() => setActiveReview(i)}
                    aria-label={`Review by ${r.name}`}
                    className={`h-2.5 rounded-full transition-all ${
                      i === activeReview ? 'w-8 bg-gold' : 'w-2.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="relative mx-auto max-w-3xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReview}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-3xl border border-gold/15 bg-white/5 p-8 backdrop-blur-md sm:p-10"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light font-playfair text-lg font-bold text-navy">
                          {currentReview.name.charAt(0)}
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-white">{currentReview.name}</h4>
                          <p className="text-xs text-white/50">{currentReview.role}</p>
                        </div>
                      </div>
                      <Stars count={currentReview.rating} />
                      <Quote className="mt-4 h-6 w-6 text-gold/30" />
                      <p className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">
                        {currentReview.text}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-gold">Google</span>
                          Reviews
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span>Verified Parent</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={prevReview}
                    aria-label="Previous review"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextReview}
                    aria-label="Next review"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
