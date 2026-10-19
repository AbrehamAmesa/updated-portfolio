import React, { useState } from 'react';
import { ArrowRight, Check, Copy, ExternalLink, Github, Linkedin, Mail, Phone, Sparkles, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Dark Gray & Dark Orange ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-orange-600/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Proof */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-orange-400">
              <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Associate Application Development Officer</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">Siinqee Bank S.C.</span>
              <span className="text-zinc-600">·</span>
              <span className="text-orange-400/90 font-mono text-xs">Huawei Certified</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.1] [text-wrap:balance]">
              Dedicated Software Developer
            </h1>

            {/* Subtitle prose */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
              Hello, I'm <strong className="text-white font-semibold">{PERSONAL_INFO.shortName}</strong>. I specialize in building mission-critical enterprise systems with <span className="text-orange-400 font-medium">Java Spring Boot</span> & <span className="text-orange-400 font-medium">Laravel</span>, paired with <span className="text-orange-400 font-medium">React.js</span> interfaces and high-performance <span className="text-orange-400 font-medium">Mini Apps</span> on modern mobile wallet infrastructures.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-all shadow-md shadow-orange-950/40 active:scale-[0.98]"
              >
                <span>Explore Projects & Mini Apps</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-200 bg-[#161920] hover:bg-[#1d212a] border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-semibold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs">{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>View Full CV</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quantitative Proof Grid */}
            <div className="pt-6 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums tracking-tight">
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

          {/* Right Column: Visual Portrait & Live Credentials Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm rounded-2xl bg-[#161920] border border-zinc-800 p-4 shadow-2xl">
              
              {/* Media container */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-900">
                <img
                  src={PERSONAL_INFO.avatarImage}
                  alt="Abreham Amesa Bedada"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.classList.add('flex', 'items-center', 'justify-center', 'bg-zinc-800');
                    }
                  }}
                />
                
                {/* Contrast scrim */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#161920] via-[#161920]/60 to-transparent pointer-events-none" />

                {/* Overlaid details */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-bold font-display leading-tight">{PERSONAL_INFO.name}</p>
                  <p className="text-xs text-orange-400 font-medium">Associate Application Development Officer</p>
                </div>
              </div>

              {/* Status details underneath */}
              <div className="mt-4 pt-3 border-t border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Current Role</span>
                  <span className="font-medium text-zinc-200">Siinqee Bank S.C.</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Overseas Certification</span>
                  <span className="font-medium text-orange-400">Huawei Global Training Center</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Education</span>
                  <span className="font-medium text-zinc-200">BSc Information Systems (WKU)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Location Base</span>
                  <span className="font-medium text-zinc-200">Addis Ababa, Ethiopia</span>
                </div>

                {/* Social & Contact Strip */}
                <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-400 hover:text-white hover:bg-[#1d212a] rounded-lg transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-400 hover:text-orange-400 hover:bg-[#1d212a] rounded-lg transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-[#1d212a] rounded-lg transition-colors"
                      title="Direct Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${PERSONAL_INFO.phone1}`}
                      className="p-2 text-zinc-400 hover:text-amber-400 hover:bg-[#1d212a] rounded-lg transition-colors"
                      title="Direct Phone"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>

                  <a
                    href="#contact"
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
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
