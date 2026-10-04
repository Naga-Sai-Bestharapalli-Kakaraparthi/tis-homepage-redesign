'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, GraduationCap, MapPin, Check, ChevronRight, ChevronLeft,
  ShieldCheck, Send, Loader2, CheckCircle2,
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  grade: string;
  state: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  grade?: string;
  state?: string;
  consent?: string;
}

const GRADES = ['Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'];

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Other',
];

const INITIAL_DATA: FormData = {
  fullName: '',
  email: '',
  phone: '',
  grade: '',
  state: '',
  consent: false,
};

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: i === current ? 1.1 : 1,
              backgroundColor: i <= current ? 'hsl(46 74% 54%)' : 'hsl(210 30% 18%)',
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
          >
            {i < current ? (
              <Check className="h-4 w-4 text-navy" />
            ) : (
              <span className={i === current ? 'text-navy' : 'text-muted-foreground'}>
                {i + 1}
              </span>
            )}
          </motion.div>
          {i < total - 1 && (
            <div className={`h-0.5 w-8 rounded-full ${i < current ? 'bg-gold' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({
  icon: Icon,
  label,
  error,
  children,
}: {
  icon: typeof User;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground/80">
        <Icon className="h-4 w-4 text-gold" />
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20';

export default function InquiryForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string | boolean) => {
    setData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (step === 0) {
      if (!data.fullName.trim()) newErrors.fullName = 'Please enter your full name';
      else if (data.fullName.trim().length < 3) newErrors.fullName = 'Name must be at least 3 characters';

      if (!data.email.trim()) newErrors.email = 'Please enter your email';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        newErrors.email = 'Please enter a valid email address';
    }

    if (step === 1) {
      if (!data.phone.trim()) newErrors.phone = 'Please enter your phone number';
      else if (!/^\+?[\d\s-]{10,15}$/.test(data.phone))
        newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (step === 2) {
      if (!data.grade) newErrors.grade = 'Please select a grade';
      if (!data.state) newErrors.state = 'Please select your state';
      if (!data.consent) newErrors.consent = 'Please provide consent to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      if (step === 1 && !otpSent) {
        setOtpSent(true);
      }
      setStep((p) => Math.min(p + 1, 2));
    }
  };

  const prev = () => setStep((p) => Math.max(p - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const reset = () => {
    setData(INITIAL_DATA);
    setStep(0);
    setOtpSent(false);
    setOtp('');
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section
      id="admissions"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      {/* Decorative background */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute left-0 bottom-1/4 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            Admissions Open 2026-27
          </span>
          <h2 className="mt-4 font-playfair text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Begin Your{' '}
            <span className="text-gradient-gold">TIS Journey</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Fill out the inquiry form below and our admissions team will get in touch
            within 24 hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8 lg:p-10"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light shadow-gold"
              >
                <CheckCircle2 className="h-10 w-10 text-navy" />
              </motion.div>
              <h3 className="mt-6 font-playfair text-2xl font-bold text-foreground">
                Inquiry Submitted Successfully!
              </h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Thank you, {data.fullName.split(' ')[0]}! Our admissions team will contact
                you at {data.email} or {data.phone} within 24 hours.
              </p>
              <button
                onClick={reset}
                className="mt-6 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/50 hover:text-gold"
              >
                Submit Another Inquiry
              </button>
            </motion.div>
          ) : (
            <>
              <StepIndicator current={step} total={3} />

              <div className="mt-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Info */}
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <InputField icon={User} label="Full Name" error={errors.fullName}>
                        <input
                          type="text"
                          value={data.fullName}
                          onChange={(e) => update('fullName', e.target.value)}
                          placeholder="Enter student or parent full name"
                          className={inputClass}
                        />
                      </InputField>
                      <InputField icon={Mail} label="Email Address" error={errors.email}>
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </InputField>
                    </motion.div>
                  )}

                  {/* Step 2: Phone + OTP */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <InputField icon={Phone} label="Phone Number" error={errors.phone}>
                        <input
                          type="tel"
                          value={data.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className={inputClass}
                        />
                      </InputField>

                      {otpSent && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="rounded-xl border border-gold/30 bg-gold/5 p-4"
                        >
                          <div className="flex items-center gap-2 text-sm text-gold">
                            <ShieldCheck className="h-4 w-4" />
                            <span className="font-medium">OTP Verification (Preview)</span>
                          </div>
                          <p className="mt-1.5 text-xs text-muted-foreground">
                            An OTP has been sent to {data.phone}. Enter it below to verify.
                          </p>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="Enter 6-digit OTP"
                            className={`${inputClass} mt-3 tracking-[0.5em]`}
                            maxLength={6}
                          />
                          <button
                            onClick={() => setOtpSent(false)}
                            className="mt-2 text-xs text-gold/70 hover:text-gold"
                          >
                            Change phone number
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Grade + State + Consent */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <InputField icon={GraduationCap} label="Grade / Class Selection" error={errors.grade}>
                        <select
                          value={data.grade}
                          onChange={(e) => update('grade', e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select grade</option>
                          {GRADES.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </InputField>
                      <InputField icon={MapPin} label="State" error={errors.state}>
                        <select
                          value={data.state}
                          onChange={(e) => update('state', e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select your state</option>
                          {STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </InputField>
                      <div>
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-gold/30">
                          <input
                            type="checkbox"
                            checked={data.consent}
                            onChange={(e) => update('consent', e.target.checked)}
                            className="mt-0.5 h-5 w-5 shrink-0 accent-gold"
                          />
                          <span className="text-sm text-muted-foreground">
                            I consent to Tulas International School contacting me regarding
                            admissions, and I agree to the schools privacy policy and terms.
                          </span>
                        </label>
                        <AnimatePresence>
                          {errors.consent && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-1.5 text-xs text-destructive"
                            >
                              {errors.consent}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button
                      onClick={prev}
                      className="flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:border-gold/40 hover:text-gold"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 2 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={next}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-2.5 text-sm font-semibold text-navy shadow-gold"
                    >
                      {step === 1 && !otpSent ? 'Send OTP & Continue' : 'Continue'}
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-2.5 text-sm font-semibold text-navy shadow-gold disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Inquiry
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
