import React, { useState } from 'react';
import { Award, CheckCircle, Quote, X, Shield, FileCheck, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS, RECOMMENDATIONS, Certification, Recommendation } from '../data/portfolioData';

export const CredentialsSection: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [activeRec, setActiveRec] = useState<Recommendation | null>(null);

  return (
    <section id="credentials" className="py-16 sm:py-24 border-t border-zinc-800 bg-[#0c0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">
            Verifiable Rigor & Commendations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight [text-wrap:balance]">
            Certifications, Awards & Academic Endorsements
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Officially verified credentials including Huawei Global Training Center Overseas Engineering Certificate, ICPC national award, bank commendations, and university faculty endorsements.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CERTIFICATIONS.map((cert) => {
            const isHuawei = cert.id === 'huawei-overseas-2026';

            return (
              <div
                key={cert.id}
                onClick={() => setActiveCert(cert)}
                className={`group p-6 rounded-2xl bg-[#161920] border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isHuawei
                    ? 'border-orange-500/50 hover:border-orange-400 shadow-lg shadow-orange-950/20'
                    : 'border-zinc-800 hover:border-orange-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                    <span className="font-mono text-orange-400 font-semibold">{cert.year}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      isHuawei
                        ? 'text-orange-300 bg-orange-950/60 border-orange-500/30'
                        : 'text-emerald-400 bg-emerald-950/60 border-emerald-500/20'
                    }`}>
                      {cert.credentialBadge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-white group-hover:text-orange-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs font-medium text-zinc-400 mt-1 mb-3">
                    Issued by: {cert.issuer}
                  </p>

                  <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Verified Credential</span>
                  <span className="text-orange-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    View Citation →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Academic Letters of Recommendation */}
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Quote className="w-5 h-5 text-orange-400" />
            <h3 className="text-xl font-bold font-display text-white">
              Faculty Endorsements & Academic Commendations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECOMMENDATIONS.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setActiveRec(rec)}
                className="p-6 rounded-2xl bg-[#161920] border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <div>
                  <Quote className="w-6 h-6 text-zinc-700 mb-3" />
                  <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed line-clamp-5">
                    "{rec.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <div className="text-sm font-bold text-white font-display">
                    {rec.author}
                  </div>
                  <div className="text-xs text-orange-400 font-medium">
                    {rec.role}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    {rec.institution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Cert Modal */}
      {activeCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setActiveCert(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#161920] border border-orange-500/40 rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
              <Shield className="w-4 h-4" />
              <span>Official Verified Record</span>
            </div>

            <h3 className="text-xl font-bold font-display text-white">
              {activeCert.title}
            </h3>

            <p className="text-xs text-orange-300 font-medium">
              {activeCert.issuer} · {activeCert.year}
            </p>

            {activeCert.serialNumber && (
              <div className="px-3 py-1.5 rounded-lg bg-[#1d212a] border border-zinc-800 text-xs font-mono text-zinc-300">
                <span className="text-zinc-500">Certificate Serial:</span> {activeCert.serialNumber}
              </div>
            )}

            <p className="text-sm text-zinc-300 leading-relaxed">
              {activeCert.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Key Verification Evidence & Courses
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {activeCert.keyDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveCert(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors cursor-pointer"
              >
                Close Citation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommendation Modal */}
      {activeRec && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setActiveRec(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#161920] border border-zinc-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveRec(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
              <FileCheck className="w-4 h-4" />
              <span>Official Letter of Recommendation</span>
            </div>

            <h3 className="text-lg font-bold font-display text-white">
              {activeRec.author}
            </h3>

            <p className="text-xs text-zinc-400">
              {activeRec.role} · {activeRec.institution}
            </p>

            <div className="p-4 rounded-xl bg-[#1d212a] border border-zinc-800 text-sm text-zinc-200 italic leading-relaxed">
              "{activeRec.quote}"
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
              <span>Contact email:</span>
              <a href={`mailto:${activeRec.contactEmail}`} className="text-orange-400 hover:underline">
                {activeRec.contactEmail}
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
