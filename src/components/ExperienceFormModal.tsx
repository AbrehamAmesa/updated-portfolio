import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Briefcase, Eye, EyeOff } from 'lucide-react';
import { Experience } from '../data/portfolioData';
import { useExperience } from '../context/ExperienceContext';

interface ExperienceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  experienceToEdit?: Experience | null;
}

export const ExperienceFormModal: React.FC<ExperienceFormModalProps> = ({
  isOpen,
  onClose,
  experienceToEdit
}) => {
  const { addExperience, updateExperience } = useExperience();

  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [period, setPeriod] = useState('');
  const [type, setType] = useState('Full-time · Enterprise Engineering');
  const [isPublic, setIsPublic] = useState(true);
  const [achievements, setAchievements] = useState<string[]>([
    'Led development of core enterprise backend microservices and RESTful API endpoints.',
    'Engineered intuitive user interface workflows using modern React and Tailwind CSS.',
    'Optimized database queries and collaborated closely with cross-functional banking teams.'
  ]);
  const [newBullet, setNewBullet] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (experienceToEdit) {
      setTitle(experienceToEdit.title);
      setOrganization(experienceToEdit.organization);
      setLocation(experienceToEdit.location);
      setPeriod(experienceToEdit.period);
      setType(experienceToEdit.type);
      setIsPublic(experienceToEdit.isPublic !== false);
      setAchievements(experienceToEdit.achievements && experienceToEdit.achievements.length > 0
        ? [...experienceToEdit.achievements]
        : ['']
      );
    } else {
      setTitle('');
      setOrganization('Siinqee Bank S.C.');
      setLocation('Addis Ababa, Ethiopia');
      setPeriod('2026 - Present');
      setType('Full-time · Enterprise Banking & Mini Apps');
      setIsPublic(true);
      setAchievements([
        'Architected and deployed high-performance Mini App modules for mobile banking services.',
        'Engineered decoupled backend microservices with Java Spring Boot and Laravel.',
        'Collaborated with security teams to enforce mobile wallet encryption and transaction safety.'
      ]);
    }
    setErrors({});
  }, [experienceToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddBullet = () => {
    if (newBullet.trim()) {
      setAchievements([...achievements, newBullet.trim()]);
      setNewBullet('');
    }
  };

  const handleRemoveBullet = (index: number) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  };

  const handleBulletChange = (index: number, text: string) => {
    const updated = [...achievements];
    updated[index] = text;
    setAchievements(updated);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Job title is required';
    if (!organization.trim()) errs.organization = 'Organization name is required';
    if (!period.trim()) errs.period = 'Employment period is required';
    const validBullets = achievements.filter((a) => a.trim().length > 0);
    if (validBullets.length === 0) errs.achievements = 'At least one achievement bullet point is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const validBullets = achievements.map((a) => a.trim()).filter((a) => a.length > 0);

    try {
      if (experienceToEdit) {
        await updateExperience(experienceToEdit.id, {
          title: title.trim(),
          organization: organization.trim(),
          location: location.trim(),
          period: period.trim(),
          type: type.trim(),
          isPublic,
          achievements: validBullets
        });
      } else {
        await addExperience({
          title: title.trim(),
          organization: organization.trim(),
          location: location.trim(),
          period: period.trim(),
          type: type.trim(),
          isPublic,
          achievements: validBullets
        });
      }
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#161920] border border-orange-500/30 rounded-2xl shadow-2xl text-zinc-100 my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white">
                {experienceToEdit ? 'Edit Work Experience' : 'Add New Work Experience'}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {experienceToEdit
                  ? 'Update role details, dates, and key project achievements'
                  : 'Add a new career role or project achievement to your timeline'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1d212a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Title and Organization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Job Title / Role <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer / Lead Architect"
                className={`w-full px-3.5 py-2.5 bg-[#1d212a] border rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 ${
                  errors.title ? 'border-rose-500' : 'border-zinc-800'
                }`}
              />
              {errors.title && <p className="text-[11px] text-rose-400 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Company / Organization <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Siinqee Bank S.C."
                className={`w-full px-3.5 py-2.5 bg-[#1d212a] border rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 ${
                  errors.organization ? 'border-rose-500' : 'border-zinc-800'
                }`}
              />
              {errors.organization && <p className="text-[11px] text-rose-400 mt-1">{errors.organization}</p>}
            </div>
          </div>

          {/* Row 2: Location and Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kazanchis, Oda Tower, Addis Ababa"
                className="w-full px-3.5 py-2.5 bg-[#1d212a] border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Employment Period <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. Jan 2026 - Present"
                className={`w-full px-3.5 py-2.5 bg-[#1d212a] border rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 ${
                  errors.period ? 'border-rose-500' : 'border-zinc-800'
                }`}
              />
              {errors.period && <p className="text-[11px] text-rose-400 mt-1">{errors.period}</p>}
            </div>
          </div>

          {/* Row 3: Role Type and Visibility Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Role Type / Domain
              </label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Full-time · Enterprise Banking & Mini Apps"
                className="w-full px-3.5 py-2.5 bg-[#1d212a] border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="bg-[#1d212a] border border-zinc-800 p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">
                  Public Visibility
                </span>
                <span className="text-[11px] text-zinc-400">
                  {isPublic ? 'Visible to all visitors' : 'Draft (Admin only)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isPublic
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {isPublic ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Public</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Row 4: Key Achievements / Bullet points */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Key Responsibilities & Achievements <span className="text-orange-400">*</span>
              </label>
              <span className="text-[11px] text-zinc-500">
                {achievements.length} bullet points
              </span>
            </div>

            <div className="space-y-2.5 mb-3">
              {achievements.map((bullet, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold mt-2 text-xs">›</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleBulletChange(index, e.target.value)}
                    placeholder="Describe specific impact, system built, technologies used..."
                    className="flex-1 px-3 py-2 bg-[#1d212a] border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                  {achievements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(index)}
                      className="p-2 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-[#252a35] transition-colors cursor-pointer"
                      title="Remove bullet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add bullet input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newBullet}
                onChange={(e) => setNewBullet(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddBullet();
                  }
                }}
                placeholder="+ Type new bullet point and click Add..."
                className="flex-1 px-3 py-2 bg-[#1d212a]/60 border border-zinc-800 rounded-lg text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-orange-500"
              />
              <button
                type="button"
                onClick={handleAddBullet}
                className="px-3 py-2 bg-[#252a35] hover:bg-[#303746] text-xs font-semibold text-orange-400 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
              >
                Add Bullet
              </button>
            </div>
            {errors.achievements && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.achievements}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-all shadow-md shadow-orange-950/40 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Saving...' : experienceToEdit ? 'Save Changes' : 'Publish Experience'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
