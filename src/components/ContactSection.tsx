import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Enterprise Banking / Mini Apps Project',
    subject: '',
    message: '',
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject';
    if (!formData.message.trim()) errs.message = 'Please provide a brief message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone1);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(`[${formData.inquiryType}] ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPreferred Contact: ${formData.preferredContact}\n\nMessage:\n${formData.message}`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">
            Let's Collaborate
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight [text-wrap:balance]">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Available for enterprise software engineering roles, Mini App architecture, full-stack web applications, and backend API consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#161920] border border-zinc-800 space-y-5">
              <h3 className="text-lg font-bold font-display text-white">
                Direct Contact Channels
              </h3>
              
              <div className="space-y-4">
                {/* Email card */}
                <div className="flex items-start justify-between p-3.5 rounded-xl bg-[#1d212a] border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-950/60 border border-orange-500/30 text-orange-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-400 font-medium">Email Address</div>
                      <a 
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-medium text-white hover:text-orange-400 transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-[#252a35] transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Mobile Phone cards */}
                <div className="flex items-start justify-between p-3.5 rounded-xl bg-[#1d212a] border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-950/60 border border-orange-500/30 text-orange-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-400 font-medium">Primary Mobile</div>
                      <a 
                        href={`tel:${PERSONAL_INFO.phone1}`}
                        className="text-xs sm:text-sm font-medium text-white hover:text-orange-400 font-mono transition-colors"
                      >
                        {PERSONAL_INFO.phone1}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-[#252a35] transition-colors cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1d212a] border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-400 font-medium">Secondary Mobile</div>
                      <a 
                        href={`tel:${PERSONAL_INFO.phone2}`}
                        className="text-xs sm:text-sm font-medium text-white hover:text-orange-400 font-mono transition-colors"
                      >
                        {PERSONAL_INFO.phone2}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-[#1d212a] border border-zinc-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400 font-medium">Location Base</div>
                    <div className="text-xs sm:text-sm font-medium text-white">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>

              </div>

              {/* Profiles strip */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Developer Profiles:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-orange-400"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

            {/* Quick response commitment */}
            <div className="p-4 rounded-xl bg-[#161920] border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
              ⚡ Typical response time is under 24 hours. Messages sent through this form generate a direct prioritized dispatch.
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#161920] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            
            {isSubmitted ? (
              <div className="py-8 space-y-6 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Message Prepared Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry regarding "{formData.subject}" is ready. You can launch your mail client directly to complete delivery, or reset the form.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1d212a] border border-zinc-800 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                    Message Summary
                  </div>
                  <div><span className="text-zinc-500">To:</span> <span className="text-zinc-200">{PERSONAL_INFO.email}</span></div>
                  <div><span className="text-zinc-500">From:</span> <span className="text-zinc-200">{formData.email}</span></div>
                  <div><span className="text-zinc-500">Inquiry:</span> <span className="text-orange-400">{formData.inquiryType}</span></div>
                  <div className="pt-2 text-zinc-300 border-t border-zinc-800 line-clamp-3">
                    "{formData.message}"
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={generateMailto()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Open in Email App</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        inquiryType: 'Enterprise Banking / Mini Apps Project',
                        subject: '',
                        message: '',
                        preferredContact: 'email'
                      });
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white bg-[#1d212a] rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Your Full Name <span className="text-orange-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dawit Kebede"
                      className={`w-full px-3.5 py-2.5 bg-[#1d212a] border rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 ${
                        errors.name ? 'border-rose-500' : 'border-zinc-800'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Your Email Address <span className="text-orange-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. dawit@example.com"
                      className={`w-full px-3.5 py-2.5 bg-[#1d212a] border rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 ${
                        errors.email ? 'border-rose-500' : 'border-zinc-800'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Inquiry Type & Preferred Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1d212a] border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                    >
                      <option>Enterprise Banking / Mini Apps Project</option>
                      <option>Mobile Wallet & SuperApp Integration</option>
                      <option>Java Spring Boot / Laravel Backend</option>
                      <option>React.js / UI Systems Design</option>
                      <option>Full-Time Engineering Role</option>
                      <option>General Tech Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Preferred Response
                    </label>
                    <select
                      value={formData.preferredContact}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1d212a] border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="email">Email Response</option>
                      <option value="phone">Phone Call / SMS</option>
                      <option value="telegram">Telegram / WhatsApp</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Subject <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project consultation / Software Engineer discussion"
                    className={`w-full px-3.5 py-2.5 bg-[#1d212a] border rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 ${
                      errors.subject ? 'border-rose-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.subject && <p className="text-[11px] text-rose-400 mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Message Details <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project requirements, scope, or job opportunity..."
                    className={`w-full px-3.5 py-2.5 bg-[#1d212a] border rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 ${
                      errors.message ? 'border-rose-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-all shadow-md shadow-orange-950/40 active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Inquiry</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
