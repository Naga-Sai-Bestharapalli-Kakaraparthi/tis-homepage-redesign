'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap, Phone, MapPin, Mail, Facebook, Instagram, Youtube, Linkedin,
  FileText, Video, HelpCircle, Smartphone, ChevronRight,
} from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Download Brochure', icon: FileText, href: '#admissions' },
  { label: 'Virtual Tour', icon: Video, href: '#home' },
  { label: 'FAQ', icon: HelpCircle, href: '#rankings' },
  { label: 'Mobile Phone Policy', icon: Smartphone, href: '#testimonials' },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Rankings', href: '#rankings' },
  { label: 'Sports & Facilities', href: '#sports' },
  { label: 'Visitors & Reviews', href: '#testimonials' },
  { label: 'Admissions', href: '#admissions' },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const CONTACT = {
  phone: '+91-9837983791',
  email: 'admissions@tulasinternationalschool.com',
  address: 'Tulas International School, Dehradun, Uttarakhand, India',
};

function handleNavClick(e: React.MouseEvent, href: string) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/10 bg-navy-deep">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      {/* Gold top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-light">
                <GraduationCap className="h-6 w-6 text-navy" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-playfair text-lg font-bold text-white">Tulas</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                  International School
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Empowering global leaders through academic excellence, sports, and holistic
              development on our 22-acre eco-friendly campus.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    onClick={(e) => e.preventDefault()}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-gold"
                    >
                      <Icon className="h-4 w-4 text-gold/60 transition-colors group-hover:text-gold" />
                      {link.label}
                      <ChevronRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-gold"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold/40 transition-all group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                <a href={`tel:${CONTACT.phone}`} className="transition-colors hover:text-gold">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                <a href={`mailto:${CONTACT.email}`} className="break-all transition-colors hover:text-gold">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="relative border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs text-slate-500">
            (c) {new Date().getFullYear()} Tulas International School. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Designed with precision for a premium educational experience.
          </p>
        </div>
      </div>
    </footer>
  );
}
