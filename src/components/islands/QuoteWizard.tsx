"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface QuoteWizardProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type Frequency = 'weekly' | 'fortnightly' | 'twice-weekly' | 'once-off';
type PoolType = 'chlorine' | 'salt' | 'mineral' | 'not-sure';

interface QuoteData {
  frequency: Frequency | '';
  poolType: PoolType | '';
  approxSize: string;
  postcode: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
}

const freqOptions: { value: Frequency; label: string; price: number; desc: string }[] = [
  { value: 'weekly', label: 'Weekly', price: 55, desc: 'Most popular — Crystal plan' },
  { value: 'fortnightly', label: 'Fortnightly', price: 45, desc: 'Splash plan — low-use pools' },
  { value: 'twice-weekly', label: 'Twice a week', price: 89, desc: 'Concierge — rentals & big pools' },
  { value: 'once-off', label: 'One-off / rescue', price: 129, desc: 'Green pool or post-storm cleanup' },
];

const poolTypeOptions: { value: PoolType; label: string }[] = [
  { value: 'chlorine', label: 'Chlorine' },
  { value: 'salt', label: 'Salt water' },
  { value: 'mineral', label: 'Mineral / magnesium' },
  { value: 'not-sure', label: "I'm not sure" },
];

export function QuoteWizard({ open: propOpen, onOpenChange }: QuoteWizardProps) {
  const [open, setOpen] = useState(propOpen ?? false);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<QuoteData>({
    frequency: '',
    poolType: '',
    approxSize: '',
    postcode: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteData, string>>>({});

  // Listen for global open event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-quote-wizard', handler);
    return () => window.removeEventListener('open-quote-wizard', handler);
  }, []);

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    onOpenChange?.(v);
    if (!v) {
      // Reset after close animation
      setTimeout(() => {
        setStep(0);
        setSubmitted(false);
        setData({
          frequency: '',
          poolType: '',
          approxSize: '',
          postcode: '',
          name: '',
          email: '',
          phone: '',
          notes: '',
          consent: false,
        });
        setErrors({});
      }, 300);
    }
  };

  const update = useCallback(<K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }, []);

  const validateStep = (s: number): boolean => {
    const e: Partial<Record<keyof QuoteData, string>> = {};
    if (s === 0 && !data.frequency) e.frequency = 'Please select a frequency';
    if (s === 1 && !data.poolType) e.poolType = 'Please select a pool type';
    if (s === 2) {
      if (!data.postcode || !/^\d{4}$/.test(data.postcode)) e.postcode = 'Enter a valid QLD postcode';
      if (!data.approxSize) e.approxSize = 'Please select a pool size';
    }
    if (s === 3) {
      if (!data.name.trim()) e.name = 'Please enter your name';
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email';
      if (!data.phone.trim()) e.phone = 'Please enter your phone number';
      if (!data.consent) e.consent = 'Please agree to the privacy policy';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      setStep(4);
    } catch {
      setErrors({ name: 'Something went wrong. Please call 1300 766 572.' });
    } finally {
      setSubmitting(false);
    }
  };

  const estimatedPrice = freqOptions.find((f) => f.value === data.frequency)?.price ?? 55;

  const steps = [
    { title: 'How often?', desc: 'Choose your preferred cleaning schedule.' },
    { title: 'Pool type', desc: 'What sanitiser does your pool use?' },
    { title: 'Location & size', desc: 'So we can route your technician.' },
    { title: 'Your details', desc: "We'll be in touch within 24 hours." },
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {submitted ? 'Quote sent!' : steps[step]?.title}
          </DialogTitle>
          <DialogDescription>
            {submitted
              ? "We'll call you within 24 hours to confirm your first visit."
              : steps[step]?.desc}
          </DialogDescription>
        </DialogHeader>

        {/* Progress bar */}
        {!submitted && (
          <div className="flex gap-1.5 mb-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-[var(--color-aqua)]' : 'bg-[var(--color-hairline)]'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 0: Frequency */}
        {step === 0 && (
          <div className="grid gap-3">
            {freqOptions.map((f) => (
              <button
                key={f.value}
                onClick={() => update('frequency', f.value)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  data.frequency === f.value
                    ? 'border-[var(--color-aqua)] bg-aqua-soft'
                    : 'border-[var(--color-hairline)] hover:border-[var(--color-ink-mute)]'
                }`}
              >
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold">{f.label}</span>
                  <span className="font-display text-xl tabular-nums">${f.price}<span className="text-sm font-normal text-ink-mute">/visit</span></span>
                </div>
                <div className="text-sm text-ink-soft mt-0.5">{f.desc}</div>
              </button>
            ))}
            {errors.frequency && <p className="text-sm text-red-600">{errors.frequency}</p>}
          </div>
        )}

        {/* Step 1: Pool Type */}
        {step === 1 && (
          <div className="grid gap-3">
            {poolTypeOptions.map((p) => (
              <button
                key={p.value}
                onClick={() => update('poolType', p.value)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  data.poolType === p.value
                    ? 'border-[var(--color-aqua)] bg-aqua-soft'
                    : 'border-[var(--color-hairline)] hover:border-[var(--color-ink-mute)]'
                }`}
              >
                <span className="font-semibold">{p.label}</span>
              </button>
            ))}
            {errors.poolType && <p className="text-sm text-red-600">{errors.poolType}</p>}
          </div>
        )}

        {/* Step 2: Location & Size */}
        {step === 2 && (
          <div className="grid gap-5">
            <div>
              <Label htmlFor="postcode">QLD Postcode</Label>
              <Input
                id="postcode"
                value={data.postcode}
                onChange={(e) => update('postcode', e.target.value)}
                placeholder="4218"
                maxLength={4}
                className="mt-1.5"
              />
              {errors.postcode && <p className="text-sm text-red-600 mt-1">{errors.postcode}</p>}
            </div>
            <div>
              <Label htmlFor="size">Approximate pool size</Label>
              <Select value={data.approxSize} onValueChange={(v) => update('approxSize', v)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select size..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small — up to 30,000L</SelectItem>
                  <SelectItem value="medium">Medium — 30,000–60,000L</SelectItem>
                  <SelectItem value="large">Large — 60,000–100,000L</SelectItem>
                  <SelectItem value="xl">Extra large — 100,000L+</SelectItem>
                  <SelectItem value="not-sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
              {errors.approxSize && <p className="text-sm text-red-600 mt-1">{errors.approxSize}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={data.name} onChange={(e) => update('name', e.target.value)} className="mt-1.5" />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={data.email} onChange={(e) => update('email', e.target.value)} className="mt-1.5" />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={data.phone} onChange={(e) => update('phone', e.target.value)} className="mt-1.5" />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <Label htmlFor="notes">Anything else we should know?</Label>
              <Textarea
                id="notes"
                value={data.notes}
                onChange={(e) => update('notes', e.target.value)}
                placeholder="e.g. recent storm damage, green water, broken pump..."
                className="mt-1.5 min-h-[80px]"
              />
            </div>
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="consent"
                checked={data.consent}
                onCheckedChange={(c) => update('consent', c === true)}
                className="mt-0.5"
              />
              <Label htmlFor="consent" className="text-sm font-normal text-ink-soft leading-snug cursor-pointer">
                I agree to Pool Pals contacting me about my quote. Read our{' '}
                <a href="/privacy" className="underline">privacy policy</a>.
              </Label>
            </div>
            {errors.consent && <p className="text-sm text-red-600">{errors.consent}</p>}

            {/* Estimate */}
            <div className="bg-aqua-soft rounded-xl p-4 text-center">
              <div className="text-xs text-ink-mute tracking-widest uppercase">Estimated from</div>
              <div className="font-display text-[44px] leading-none mt-1">
                ${estimatedPrice}<span className="text-base font-normal text-ink-mute">/visit</span>
              </div>
              <div className="text-xs text-[var(--color-success)] mt-1">All chemicals included · Cancel anytime</div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[var(--color-success)]/15 text-[var(--color-success)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <p className="text-ink-soft mb-4">
              Your quote request has been sent to our team. You'll receive a confirmation email shortly.
            </p>
            <Button onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        )}

        {/* Navigation */}
        {!submitted && (
          <div className="flex gap-3 mt-2">
            {step > 0 && (
              <Button variant="outline" onClick={back} className="flex-1">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={next} className="flex-1 bg-[var(--color-ink)] text-white hover:bg-ink-soft">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={submitting} className="flex-1 bg-[var(--color-aqua)] text-white hover:bg-aqua-deep">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Send my quote
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
