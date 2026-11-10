"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Send, Clock, Check } from "lucide-react";
import { Reveal, MaskReveal } from "@/components/ui-motion/reveal";
import { Magnetic } from "@/components/ui-motion/magnetic";
import { contact, owner } from "@/data/portfolio";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Errors = { name?: string; email?: string; message?: string };

const FIELD =
  "w-full rounded-xl border border-line-strong bg-surface px-4.5 py-4 text-ink placeholder:text-ink-faint text-[15px] transition-colors duration-300 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/40";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", budget: "Not specified", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  // While the email is still the editable placeholder, the channel card and
  // the form explain the situation politely — instead of dead-ending visitors
  // at a fake address.
  const emailConfigured = !/example\.com/.test(owner.email);
  const onEmailClick = () =>
    toast({
      title: "Email — coming soon",
      description:
        "My inbox isn't connected here yet. The social links below are the fastest way to reach me.",
    });

  // While the WhatsApp number is still the editable placeholder, clicking the
  // card explains the situation politely — instead of opening a dead link.
  const whatsappConfigured = !/000000000000/.test(owner.whatsapp);
  const onWhatsAppClick = () =>
    toast({
      title: "WhatsApp — coming soon",
      description:
        "WhatsApp isn't connected here yet. The social links below are the fastest way to reach me.",
    });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = (): boolean => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "A valid email helps me reply.";
    if (form.message.trim().length < 10) next.message = "A few more words about the project…";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // If the inbox isn't configured yet, don't dead-end the visitor at a
    // placeholder address — point them to the live channels instead.
    if (!emailConfigured) {
      toast({
        title: "Email — coming soon",
        description:
          "The form isn't wired to my inbox yet. Please reach me through the social links on the left.",
      });
      return;
    }

    const subject = encodeURIComponent(`New project inquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Hi ${owner.firstName},\n\nName: ${form.name}\nEmail: ${form.email}\nBudget: ${form.budget}\n\n${form.message}\n\n— Sent from the portfolio contact form`
    );
    window.location.href = `mailto:${owner.email}?subject=${subject}&body=${body}`;
    setSent(true);
    toast({
      title: "Opening your email client…",
      description: "Your message is pre-filled and ready to send.",
    });
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 lg:py-44" aria-label="Contact">
      <div className="absolute inset-0 glow-signal pointer-events-none opacity-70" aria-hidden />
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* left: channels */}
          <div>
            <MaskReveal>
              <h2 className="font-display font-bold uppercase tracking-tight leading-[0.98] text-5xl sm:text-6xl lg:text-7xl text-ink">
                Let&apos;s Build
                <br />
                <span className="text-signal">Something.</span>
              </h2>
            </MaskReveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-ink-dim text-base sm:text-lg leading-relaxed">
                {contact.subheading}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/60 backdrop-blur px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink">
                <span className="w-2 h-2 rounded-full bg-signal animate-pulse-dot" />
                {owner.availability.label} — {owner.availability.note}
              </div>
            </Reveal>

            {/* channel list */}
            <Reveal delay={0.24}>
              <div className="mt-10 space-y-3 max-w-md">
                {emailConfigured ? (
                  <a
                    href={`mailto:${owner.email}`}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-signal/50"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 text-signal group-hover:bg-signal group-hover:text-abyss transition-colors">
                      <Mail className="w-4.5 h-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-faint">
                        Email
                      </span>
                      <span className="block text-ink text-sm sm:text-base truncate">{owner.email}</span>
                    </span>
                    <Send className="ml-auto w-4 h-4 text-ink-faint group-hover:text-signal group-hover:translate-x-1 transition-all" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onEmailClick}
                    className="group w-full flex items-center gap-4 rounded-xl border border-dashed border-line-strong bg-surface px-5 py-4 text-left transition-colors hover:border-signal/50"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 text-signal group-hover:bg-signal group-hover:text-abyss transition-colors">
                      <Mail className="w-4.5 h-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-faint">
                        Email
                      </span>
                      <span className="block text-ink text-sm sm:text-base">Coming soon</span>
                    </span>
                    <Send className="ml-auto w-4 h-4 text-ink-faint group-hover:text-signal group-hover:translate-x-1 transition-all" />
                  </button>
                )}

                {whatsappConfigured ? (
                  <a
                    href={owner.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-signal/50"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 text-signal group-hover:bg-signal group-hover:text-abyss transition-colors">
                      <MessageCircle className="w-4.5 h-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-faint">
                        WhatsApp
                      </span>
                      <span className="block text-ink text-sm sm:text-base">{owner.whatsappDisplay}</span>
                    </span>
                    <Send className="ml-auto w-4 h-4 text-ink-faint group-hover:text-signal group-hover:translate-x-1 transition-all" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onWhatsAppClick}
                    className="group w-full flex items-center gap-4 rounded-xl border border-dashed border-line-strong bg-surface px-5 py-4 text-left transition-colors hover:border-signal/50"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 text-signal group-hover:bg-signal group-hover:text-abyss transition-colors">
                      <MessageCircle className="w-4.5 h-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-faint">
                        WhatsApp
                      </span>
                      <span className="block text-ink text-sm sm:text-base">
                        {whatsappConfigured ? owner.whatsappDisplay : "Coming soon"}
                      </span>
                    </span>
                    <Send className="ml-auto w-4 h-4 text-ink-faint group-hover:text-signal group-hover:translate-x-1 transition-all" />
                  </button>
                )}

                <div className="flex items-center gap-4 rounded-xl border border-line bg-surface px-5 py-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 text-signal">
                    <MapPin className="w-4.5 h-4.5" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-faint">
                      Based in
                    </span>
                    <span className="block text-ink text-sm sm:text-base">{owner.location}</span>
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                    <Clock className="w-3.5 h-3.5" /> {owner.timezone}
                  </span>
                </div>
              </div>
            </Reveal>

            {/* socials */}
            <Reveal delay={0.3}>
              <div className="mt-10">
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-faint mb-4">
                  Elsewhere
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {owner.socials.map((s) => (
                    <Magnetic key={s.label} strength={0.25}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full border border-line-strong px-5 py-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim transition-colors hover:border-signal hover:text-signal"
                      >
                        {s.label}
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* right: form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-2xl border border-line bg-surface/70 backdrop-blur p-6 sm:p-9 space-y-5"
              aria-label="Contact form"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-2xl text-ink">Start a project</h3>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-faint">
                  ~24h reply
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cf-name" className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-dim mb-2">
                    Your name
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your full name"
                    className={cn(FIELD, errors.name && "border-destructive")}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="cf-email" className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-dim mb-2">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@company.com"
                    className={cn(FIELD, errors.email && "border-destructive")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div>
                <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-dim mb-2">
                  Budget range
                </span>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Budget range">
                  {["< $1k", "$1k – $5k", "$5k – $10k", "$10k+", "Not specified"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      role="radio"
                      aria-checked={form.budget === b}
                      onClick={() => setForm((f) => ({ ...f, budget: b }))}
                      className={cn(
                        "rounded-full border px-4 py-2 font-mono text-[11px] tracking-wide transition-colors",
                        form.budget === b
                          ? "border-signal bg-signal text-abyss font-semibold"
                          : "border-line-strong text-ink-dim hover:border-signal/60 hover:text-ink"
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="cf-msg" className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-dim mb-2">
                  Project details
                </label>
                <textarea
                  id="cf-msg"
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell me about your project — goals, timeline, and what success looks like…"
                  className={cn(FIELD, "resize-none", errors.message && "border-destructive")}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
              </div>

              <Magnetic className="w-fit">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold text-sm sm:text-base transition-colors",
                    sent ? "bg-mint text-abyss" : "bg-signal text-abyss hover:bg-ink"
                  )}
                >
                  {sent ? (
                    <>
                      <Check className="w-4.5 h-4.5" /> Draft ready in your email client
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4.5 h-4.5" />
                    </>
                  )}
                </motion.button>
              </Magnetic>

              <p className="text-xs text-ink-faint leading-relaxed">
                {emailConfigured
                  ? contact.formNote
                  : "The form will be wired to my inbox shortly — meanwhile the social channels on the left are the fastest way to reach me."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
