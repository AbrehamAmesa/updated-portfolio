import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);

      window.setTimeout(() => {
        setCopiedEmail(false);
      }, 2200);
    } catch (error) {
      console.error('Unable to copy email:', error);
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24"
    >
      {/* Ambient orange glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[380px] w-[650px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-orange-600/10 via-amber-600/5 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-orange-400 sm:text-sm">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-orange-500" />
              <span>Associate Application Development Officer</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">Siinqee Bank S.C.</span>
              <span className="text-zinc-600">·</span>
              <span className="font-mono text-xs text-orange-400/90">
                Huawei Certified
              </span>
            </div>

            <h1 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-6xl">
              Dedicated Software Developer
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Hello, I'm{' '}
              <strong className="font-semibold text-white">
                {PERSONAL_INFO.shortName}
              </strong>
              . I specialize in building mission-critical enterprise systems
              with{' '}
              <span className="font-medium text-orange-400">
                Java Spring Boot
              </span>{' '}
              and{' '}
              <span className="font-medium text-orange-400">Laravel</span>,
              paired with{' '}
              <span className="font-medium text-orange-400">React.js</span>{' '}
              interfaces and high-performance{' '}
              <span className="font-medium text-orange-400">Mini Apps</span> on
              modern mobile wallet infrastructures.
            </p>

            {/* Action bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-950/40 transition-all hover:bg-orange-500 active:scale-[0.98]"
              >
                <span>Explore Projects &amp; Mini Apps</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-800 bg-[#161920] px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-[#1d212a]"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">
                      Email Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs">{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex cursor-pointer items-center gap-1.5 px-4 py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              >
                <span>View Full CV</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-6 sm:grid-cols-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={`${stat.label}-${idx}`} className="space-y-0.5">
                  <div className="font-display text-2xl font-bold tracking-tight text-white tabular-nums sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-zinc-300">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {stat.context}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: portrait and credentials */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-[#161920] p-4 shadow-2xl">
              {/* Portrait */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-900">
                {!avatarFailed && PERSONAL_INFO.avatarImage ? (
                  <img
                    src={PERSONAL_INFO.avatarImage}
                    alt="Abreham Amesa Bedada"
                    loading="eager"
                    fetchPriority="high"
                    className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    onError={(event) => {
                      console.error(
                        'Avatar failed to load:',
                        PERSONAL_INFO.avatarImage
                      );
                      setAvatarFailed(true);
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                    <div className="px-6 text-center">
                      <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border border-orange-400/30 bg-[#161920] text-2xl font-bold text-orange-400">
                        {PERSONAL_INFO.shortName
                          ?.split(' ')
                          .map((part) => part.charAt(0))
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {PERSONAL_INFO.name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-400">
                        Software Developer
                      </p>
                    </div>
                  </div>
                )}

                {/* Bottom contrast gradient */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#161920] via-[#161920]/60 to-transparent" />

                {/* Portrait details */}
                <div className="absolute right-3 bottom-3 left-3 text-white">
                  <p className="font-display text-sm leading-tight font-bold">
                    {PERSONAL_INFO.name}
                  </p>
                  <p className="text-xs font-medium text-orange-400">
                    Associate Application Development Officer
                  </p>
                </div>
              </div>

              {/* Credentials */}
              <div className="mt-4 space-y-2.5 border-t border-zinc-800 pt-3">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-zinc-400">Current Role</span>
                  <span className="text-right font-medium text-zinc-200">
                    Siinqee Bank S.C.
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-zinc-400">
                    Overseas Certification
                  </span>
                  <span className="text-right font-medium text-orange-400">
                    Huawei Global Training Center
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-zinc-400">Education</span>
                  <span className="text-right font-medium text-zinc-200">
                    BSc Information Systems (WKU)
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-zinc-400">Location Base</span>
                  <span className="text-right font-medium text-zinc-200">
                    Addis Ababa, Ethiopia
                  </span>
                </div>

                {/* Social and contact links */}
                <div className="flex items-center justify-between border-t border-zinc-800 pt-2">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      title="GitHub Profile"
                      className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-[#1d212a] hover:text-white"
                    >
                      <Github className="h-4 w-4" />
                    </a>

                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      title="LinkedIn Profile"
                      className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-[#1d212a] hover:text-orange-400"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      aria-label="Send email"
                      title="Direct Email"
                      className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-[#1d212a] hover:text-emerald-400"
                    >
                      <Mail className="h-4 w-4" />
                    </a>

                    <a
                      href={`tel:${PERSONAL_INFO.phone1}`}
                      aria-label="Call phone"
                      title="Direct Phone"
                      className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-[#1d212a] hover:text-amber-400"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>

                  <a
                    href="#contact"
                    className="text-xs font-semibold text-orange-400 transition-colors hover:text-orange-300"
                  >
                    Send Message →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
