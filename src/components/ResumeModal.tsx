import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Printer,
  Copy,
  Check,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen,
  Briefcase,
  Github,
  Linkedin,
  Code2,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import {
  PERSONAL_INFO,
  PROJECTS,
  CERTIFICATIONS,
  EDUCATION,
} from '../data/portfolioData';
import { useExperience } from '../context/ExperienceContext';
import avatarImage from '../assets/images/avatar_abreham_portrait_1790668810450.jpg';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AnyRecord = Record<string, any>;

const PORTFOLIO_URL = 'https://abrehamamesa.netlify.app';

const resumeStyles = `
  .resume-modal-overlay,
  .resume-modal-overlay * {
    box-sizing: border-box;
  }

  .resume-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(15, 23, 42, 0.76);
    backdrop-filter: blur(5px);
    overflow-y: auto;
  }

  .resume-modal-shell {
    width: min(100%, 1080px);
    max-height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 16px;
    background: #f1f5f9;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  }

  .resume-toolbar {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 18px;
    color: #fff;
    background: #111827;
  }

  .resume-toolbar-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
  }

  .resume-toolbar-subtitle {
    margin: 3px 0 0;
    color: #cbd5e1;
    font-size: 12px;
  }

  .resume-toolbar-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 8px;
  }

  .resume-toolbar-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-height: 36px;
    padding: 8px 12px;
    border: 1px solid #475569;
    border-radius: 8px;
    background: #1f2937;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .resume-toolbar-button:hover {
    background: #374151;
  }

  .resume-toolbar-button.primary {
    border-color: #ea580c;
    background: #ea580c;
  }

  .resume-toolbar-button.primary:hover {
    background: #c2410c;
  }

  .resume-toolbar-button svg {
    width: 15px;
    height: 15px;
  }

  .resume-close-button {
    width: 36px;
    height: 36px;
    padding: 8px;
  }

  .resume-modal-scroll {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 28px;
  }

  .resume-document {
    width: 100%;
    max-width: 800px;
    min-height: 1120px;
    margin: 0 auto;
    padding: 46px 48px;
    background: #fff;
    color: #1f2937;
    box-shadow: 0 5px 30px rgba(15, 23, 42, 0.1);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10pt;
    line-height: 1.48;
  }

  .resume-header {
    padding-bottom: 20px;
    border-bottom: 3px solid #ea580c;
  }

  .resume-header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
  }

  .resume-profile-info {
    flex: 1;
    min-width: 0;
  }

  .resume-name {
    margin: 0;
    color: #111827;
    font-size: 26pt;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.7px;
    overflow-wrap: anywhere;
  }

  .resume-role {
    margin: 8px 0 12px;
    color: #c2410c;
    font-size: 12pt;
    font-weight: 700;
  }

  .resume-contact-list {
    display: flex;
    flex-wrap: wrap;
    gap: 7px 14px;
    margin-top: 10px;
  }

  .resume-contact-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    color: #475569;
    font-size: 8.5pt;
    overflow-wrap: anywhere;
  }

  .resume-contact-item svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
    color: #ea580c;
  }

  .resume-contact-item a {
    color: inherit;
    text-decoration: none;
    overflow-wrap: anywhere;
  }

  .resume-avatar {
    width: 112px;
    height: 112px;
    flex-shrink: 0;
    object-fit: cover;
    object-position: center;
    border: 3px solid #fed7aa;
    border-radius: 50%;
    background: #f8fafc;
  }

  .resume-section {
    margin-top: 20px;
  }

  .resume-section-heading {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 10px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e2e8f0;
    color: #111827;
    font-size: 11pt;
    font-weight: 800;
    letter-spacing: 0.55px;
    text-transform: uppercase;
  }

  .resume-section-heading svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    color: #ea580c;
  }

  .resume-summary {
    margin: 0;
    color: #374151;
    text-align: justify;
  }

  .resume-skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .resume-skill {
    display: inline-block;
    padding: 4px 8px;
    border: 1px solid #fed7aa;
    border-radius: 5px;
    background: #fff7ed;
    color: #9a3412;
    font-size: 8.5pt;
    font-weight: 600;
  }

  .resume-entry {
    margin-bottom: 13px;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .resume-entry:last-child {
    margin-bottom: 0;
  }

  .resume-entry-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .resume-entry-title {
    margin: 0;
    color: #111827;
    font-size: 10pt;
    font-weight: 800;
  }

  .resume-entry-subtitle {
    margin: 2px 0 0;
    color: #c2410c;
    font-size: 9pt;
    font-weight: 700;
  }

  .resume-entry-date {
    flex-shrink: 0;
    color: #64748b;
    font-size: 8.5pt;
    font-weight: 600;
    text-align: right;
  }

  .resume-entry-description {
    margin: 5px 0 0;
    color: #475569;
    font-size: 9pt;
  }

  .resume-entry-list {
    margin: 5px 0 0;
    padding-left: 17px;
    color: #475569;
    font-size: 9pt;
  }

  .resume-entry-list li {
    margin: 2px 0;
    padding-left: 2px;
  }

  .resume-project-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .resume-project-card {
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 7px;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .resume-project-title {
    margin: 0;
    color: #111827;
    font-size: 9.5pt;
    font-weight: 800;
  }

  .resume-project-description {
    margin: 5px 0 0;
    color: #475569;
    font-size: 8.5pt;
  }

  .resume-project-tech {
    margin-top: 6px;
    color: #c2410c;
    font-size: 8pt;
    font-weight: 700;
  }

  .resume-education-layout {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .resume-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 24px;
    padding-top: 9px;
    border-top: 1px solid #e5e7eb;
    color: #94a3b8;
    font-size: 8pt;
  }

  .resume-qr-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 18px;
    padding: 12px 0 0;
    border-top: 2px solid #ea580c;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .resume-qr-copy {
    flex: 1;
    min-width: 0;
  }

  .resume-qr-title {
    margin: 0;
    color: #111827;
    font-size: 10pt;
    font-weight: 800;
  }

  .resume-qr-description {
    margin: 5px 0 0;
    color: #64748b;
    font-size: 8.5pt;
    line-height: 1.5;
  }

  .resume-qr-url {
    display: block;
    margin-top: 5px;
    color: #c2410c;
    font-size: 8.5pt;
    overflow-wrap: anywhere;
    text-decoration: none;
  }

  .resume-qr-code {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
  }

  .resume-qr-code svg {
    display: block;
    width: 88px;
    height: 88px;
  }

  .resume-empty {
    color: #94a3b8;
    font-size: 9pt;
    font-style: italic;
  }

  @media (max-width: 700px) {
    .resume-modal-overlay {
      padding: 8px;
    }

    .resume-modal-shell {
      max-height: calc(100vh - 16px);
      border-radius: 10px;
    }

    .resume-toolbar {
      align-items: flex-start;
      padding: 12px;
    }

    .resume-toolbar-subtitle {
      display: none;
    }

    .resume-toolbar-actions {
      gap: 6px;
    }

    .resume-toolbar-button {
      min-height: 34px;
      padding: 7px 9px;
    }

    .resume-toolbar-button .resume-button-label {
      display: none;
    }

    .resume-modal-scroll {
      padding: 10px;
    }

    .resume-document {
      min-height: auto;
      padding: 25px 20px;
      font-size: 9pt;
    }

    .resume-name {
      font-size: 20pt;
    }

    .resume-avatar {
      width: 78px;
      height: 78px;
    }

    .resume-header-content {
      gap: 12px;
    }

    .resume-project-grid {
      grid-template-columns: 1fr;
    }

    .resume-entry-heading {
      gap: 8px;
    }
  }

  @page {
    size: A4 portrait;
    margin: 12mm 14mm;
  }

  @media print {
    html,
    body {
      width: 100% !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      background: #fff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body * {
      visibility: hidden !important;
    }

    .resume-modal-overlay,
    .resume-modal-overlay * {
      visibility: visible !important;
    }

    .resume-modal-overlay {
      position: static !important;
      inset: auto !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: #fff !important;
      backdrop-filter: none !important;
    }

    .resume-modal-shell {
      display: block !important;
      width: 100% !important;
      max-width: none !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: #fff !important;
      box-shadow: none !important;
    }

    .resume-toolbar {
      display: none !important;
    }

    .resume-modal-scroll {
      display: block !important;
      width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: #fff !important;
    }

    #resume-print-root {
      display: block !important;
      width: 100% !important;
      max-width: none !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: #fff !important;
      box-shadow: none !important;
      font-size: 9pt !important;
    }

    #resume-print-root .resume-name {
      font-size: 23pt !important;
    }

    #resume-print-root .resume-avatar {
      width: 88px !important;
      height: 88px !important;
      print-color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
    }

    #resume-print-root .resume-section {
      margin-top: 14px !important;
    }

    #resume-print-root .resume-entry {
      margin-bottom: 9px !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    #resume-print-root .resume-project-grid {
      gap: 7px !important;
    }

    #resume-print-root .resume-project-card {
      padding: 7px !important;
    }

    #resume-print-root .resume-qr-section {
      margin-top: 14px !important;
      padding-top: 9px !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    #resume-print-root .resume-qr-code {
      padding: 4px !important;
    }

    #resume-print-root .resume-qr-code svg {
      width: 76px !important;
      height: 76px !important;
    }

    #resume-print-root a {
      color: inherit !important;
      text-decoration: none !important;
    }

    #resume-print-root .resume-skill {
      background: #fff7ed !important;
      print-color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
    }

    #resume-print-root .resume-header,
    #resume-print-root .resume-section-heading {
      break-after: avoid !important;
      page-break-after: avoid !important;
    }
  }
`;

const getText = (
  object: AnyRecord | undefined | null,
  keys: string[],
  fallback = '',
): string => {
  if (!object) return fallback;

  for (const key of keys) {
    const value = object[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }

    if (typeof value === 'number') {
      return String(value);
    }
  }

  return fallback;
};

const getArray = (value: unknown): AnyRecord[] =>
  Array.isArray(value) ? value.filter(Boolean) : [];

const getDescription = (item: AnyRecord): string =>
  getText(item, [
    'description',
    'summary',
    'details',
    'overview',
    'objective',
    'about',
    'content',
  ]);

const getDateRange = (item: AnyRecord): string => {
  const start = getText(item, [
    'startDate',
    'start',
    'from',
    'dateFrom',
    'periodStart',
  ]);

  const end = getText(item, [
    'endDate',
    'end',
    'to',
    'dateTo',
    'periodEnd',
  ]);

  const direct = getText(item, [
    'dateRange',
    'duration',
    'period',
    'dates',
  ]);

  if (direct) return direct;
  if (start && end) return `${start} – ${end}`;
  if (start) return `${start} – Present`;
  return end;
};

const getList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          return getText(item as AnyRecord, [
            'description',
            'text',
            'name',
            'title',
          ]);
        }
        return '';
      })
      .filter(Boolean);
  }

  if (typeof value === 'string' && value.trim()) {
    return value
      .split(/\n|•|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Supports common context naming conventions without changing the context.
  const experienceContext = useExperience() as AnyRecord;

  const experience = useMemo(
    () =>
      getArray(
        experienceContext?.experience ??
          experienceContext?.experiences ??
          experienceContext?.workExperience ??
          experienceContext?.workExperiences ??
          experienceContext?.professionalExperience,
      ),
    [experienceContext],
  );

  const personal = PERSONAL_INFO as AnyRecord;
  const projects = getArray(PROJECTS as unknown);
  const certifications = getArray(CERTIFICATIONS as unknown);
  const education = getArray(EDUCATION as unknown);

  const name = getText(
    personal,
    ['name', 'fullName', 'full_name'],
    'Your Name',
  );

  const role = getText(
    personal,
    ['currentRole', 'role', 'title', 'position', 'headline'],
    'Software Developer',
  );

  const email = getText(personal, ['email', 'emailAddress']);
  const phone = getText(personal, ['phone', 'phoneNumber', 'mobile']);
  const secondaryPhone = getText(personal, [
    'secondaryPhone',
    'alternatePhone',
    'phone2',
  ]);
  const location = getText(personal, ['location', 'address', 'city']);
  const github = getText(personal, ['github', 'githubUrl', 'githubURL']);
  const linkedin = getText(personal, [
    'linkedin',
    'linkedinUrl',
    'linkedinURL',
  ]);

  const summary = getText(personal, [
    'professionalSummary',
    'summary',
    'bio',
    'about',
    'description',
    'objective',
  ]);

  const rawSkills =
    personal.technicalSkills ??
    personal.skills ??
    personal.technologies ??
    personal.techStack ??
    [];

  const skills = getList(rawSkills);

  const buildResumeText = (): string => {
    const lines: string[] = [
      name,
      role,
      [email, phone, secondaryPhone, location, github, linkedin]
        .filter(Boolean)
        .join(' | '),
      '',
      'PROFESSIONAL SUMMARY',
      summary || '',
      '',
      'TECHNICAL EXPERTISE',
      skills.join(', '),
      '',
      'PROFESSIONAL EXPERIENCE',
    ];

    experience.forEach((item) => {
      lines.push(
        getText(item, ['role', 'title', 'position', 'jobTitle', 'name']),
        getText(item, [
          'company',
          'companyName',
          'organization',
          'employer',
        ]),
        getDateRange(item),
        getDescription(item),
        ...getList(
          item.responsibilities ??
            item.achievements ??
            item.highlights ??
            item.bulletPoints,
        ),
        '',
      );
    });

    lines.push('', 'SELECTED PROJECTS');

    projects.forEach((item) => {
      lines.push(
        getText(item, ['name', 'title', 'projectName']),
        getDescription(item),
        getText(item, ['technologies', 'techStack', 'stack']),
        '',
      );
    });

    lines.push('', 'EDUCATION');

    education.forEach((item) => {
      lines.push(
        getText(item, ['degree', 'title', 'qualification', 'program']),
        getText(item, ['institution', 'school', 'university', 'organization']),
        getDateRange(item),
        getDescription(item),
        '',
      );
    });

    lines.push('', 'CERTIFICATIONS & HONORS');

    certifications.forEach((item) => {
      lines.push(
        getText(item, ['name', 'title', 'certification', 'certificateName']),
        getText(item, ['issuer', 'organization', 'provider']),
        getDateRange(item),
      );
    });

    lines.push('', `Portfolio: ${PORTFOLIO_URL}`);

    return lines.filter((line) => line !== undefined).join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildResumeText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Unable to copy résumé text:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <style>{resumeStyles}</style>

      <div
        className="resume-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Résumé preview"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="resume-modal-shell">
          <div className="resume-toolbar">
            <div>
              <p className="resume-toolbar-title">Résumé Preview</p>
              <p className="resume-toolbar-subtitle">
                Review your CV before printing or saving as PDF.
              </p>
            </div>

            <div className="resume-toolbar-actions">
              <button
                type="button"
                className="resume-toolbar-button"
                onClick={handleCopy}
                title="Copy résumé text"
              >
                {copied ? <Check /> : <Copy />}
                <span className="resume-button-label">
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </button>

              <button
                type="button"
                className="resume-toolbar-button primary"
                onClick={handlePrint}
                title="Print or save as PDF"
              >
                <Printer />
                <span className="resume-button-label">Print / PDF</span>
              </button>

              <button
                type="button"
                className="resume-toolbar-button"
                onClick={() => window.open(PORTFOLIO_URL, '_blank', 'noopener,noreferrer')}
                title="Open portfolio"
              >
                <ExternalLink />
                <span className="resume-button-label">Portfolio</span>
              </button>

              <button
                type="button"
                className="resume-toolbar-button resume-close-button"
                onClick={onClose}
                aria-label="Close résumé preview"
                title="Close"
              >
                <X />
              </button>
            </div>
          </div>

          <div className="resume-modal-scroll">
            <article id="resume-print-root" className="resume-document">
              {/* HEADER */}
              <header className="resume-header">
                <div className="resume-header-content">
                  <div className="resume-profile-info">
                    <h1 className="resume-name">{name}</h1>
                    <p className="resume-role">{role}</p>

                    <div className="resume-contact-list">
                      {email && (
                        <span className="resume-contact-item">
                          <Mail />
                          <a href={`mailto:${email}`}>{email}</a>
                        </span>
                      )}

                      {phone && (
                        <span className="resume-contact-item">
                          <Phone />
                          <span>{phone}</span>
                        </span>
                      )}

                      {secondaryPhone && secondaryPhone !== phone && (
                        <span className="resume-contact-item">
                          <Phone />
                          <span>{secondaryPhone}</span>
                        </span>
                      )}

                      {location && (
                        <span className="resume-contact-item">
                          <MapPin />
                          <span>{location}</span>
                        </span>
                      )}

                      {github && (
                        <span className="resume-contact-item">
                          <Github />
                          <a
                            href={
                              github.startsWith('http')
                                ? github
                                : `https://github.com/${github.replace(/^@/, '')}`
                            }
                          >
                            GitHub
                          </a>
                        </span>
                      )}

                      {linkedin && (
                        <span className="resume-contact-item">
                          <Linkedin />
                          <a
                            href={
                              linkedin.startsWith('http')
                                ? linkedin
                                : `https://www.linkedin.com/in/${linkedin.replace(/^@/, '')}`
                            }
                          >
                            LinkedIn
                          </a>
                        </span>
                      )}
                    </div>
                  </div>

                  <img
                    src={avatarImage}
                    alt={`${name} profile portrait`}
                    className="resume-avatar"
                  />
                </div>
              </header>

              {/* PROFESSIONAL SUMMARY */}
              {summary && (
                <section className="resume-section">
                  <h2 className="resume-section-heading">
                    <BookOpen />
                    Professional Summary
                  </h2>
                  <p className="resume-summary">{summary}</p>
                </section>
              )}

              {/* TECHNICAL EXPERTISE */}
              {skills.length > 0 && (
                <section className="resume-section">
                  <h2 className="resume-section-heading">
                    <Code2 />
                    Technical Expertise
                  </h2>

                  <div className="resume-skills-list">
                    {skills.map((skill, index) => (
                      <span className="resume-skill" key={`${skill}-${index}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* PROFESSIONAL EXPERIENCE */}
              <section className="resume-section">
                <h2 className="resume-section-heading">
                  <Briefcase />
                  Professional Experience
                </h2>

                {experience.length > 0 ? (
                  experience.map((item, index) => {
                    const title = getText(item, [
                      'role',
                      'title',
                      'position',
                      'jobTitle',
                      'name',
                    ]);

                    const company = getText(item, [
                      'company',
                      'companyName',
                      'organization',
                      'employer',
                    ]);

                    const description = getDescription(item);

                    const responsibilities = getList(
                      item.responsibilities ??
                        item.achievements ??
                        item.highlights ??
                        item.bulletPoints,
                    );

                    return (
                      <div
                        className="resume-entry"
                        key={`${company}-${title}-${index}`}
                      >
                        <div className="resume-entry-heading">
                          <div>
                            <h3 className="resume-entry-title">
                              {title || 'Professional Role'}
                            </h3>
                            {company && (
                              <p className="resume-entry-subtitle">
                                {company}
                              </p>
                            )}
                          </div>

                          {getDateRange(item) && (
                            <span className="resume-entry-date">
                              {getDateRange(item)}
                            </span>
                          )}
                        </div>

                        {description && (
                          <p className="resume-entry-description">
                            {description}
                          </p>
                        )}

                        {responsibilities.length > 0 && (
                          <ul className="resume-entry-list">
                            {responsibilities.map((responsibility, i) => (
                              <li key={`${responsibility}-${i}`}>
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="resume-empty">
                    Add your work experience to the ExperienceContext data.
                  </p>
                )}
              </section>

              {/* SELECTED PROJECTS */}
              {projects.length > 0 && (
                <section className="resume-section">
                  <h2 className="resume-section-heading">
                    <Code2 />
                    Selected Projects
                  </h2>

                  <div className="resume-project-grid">
                    {projects.map((item, index) => {
                      const title = getText(item, [
                        'name',
                        'title',
                        'projectName',
                      ]);

                      const description = getDescription(item);

                      const technologies = getList(
                        item.technologies ??
                          item.techStack ??
                          item.stack ??
                          item.technologiesUsed,
                      );

                      const directTechnologies = getText(item, [
                        'technologies',
                        'techStack',
                        'stack',
                      ]);

                      return (
                        <div
                          className="resume-project-card"
                          key={`${title}-${index}`}
                        >
                          <h3 className="resume-project-title">
                            {title || `Project ${index + 1}`}
                          </h3>

                          {description && (
                            <p className="resume-project-description">
                              {description}
                            </p>
                          )}

                          {(technologies.length > 0 || directTechnologies) && (
                            <p className="resume-project-tech">
                              {technologies.length > 0
                                ? technologies.join(' · ')
                                : directTechnologies}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* EDUCATION */}
              {education.length > 0 && (
                <section className="resume-section">
                  <h2 className="resume-section-heading">
                    <BookOpen />
                    Education
                  </h2>

                  {education.map((item, index) => {
                    const degree = getText(item, [
                      'degree',
                      'title',
                      'qualification',
                      'program',
                    ]);

                    const institution = getText(item, [
                      'institution',
                      'school',
                      'university',
                      'organization',
                    ]);

                    const description = getDescription(item);

                    return (
                      <div
                        className="resume-entry"
                        key={`${institution}-${degree}-${index}`}
                      >
                        <div className="resume-education-layout">
                          <div>
                            <h3 className="resume-entry-title">
                              {degree || 'Education'}
                            </h3>
                            {institution && (
                              <p className="resume-entry-subtitle">
                                {institution}
                              </p>
                            )}
                          </div>

                          {getDateRange(item) && (
                            <span className="resume-entry-date">
                              {getDateRange(item)}
                            </span>
                          )}
                        </div>

                        {description && (
                          <p className="resume-entry-description">
                            {description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </section>
              )}

              {/* CERTIFICATIONS */}
              {certifications.length > 0 && (
                <section className="resume-section">
                  <h2 className="resume-section-heading">
                    <Award />
                    Certifications &amp; Honors
                  </h2>

                  {certifications.map((item, index) => {
                    const title = getText(item, [
                      'name',
                      'title',
                      'certification',
                      'certificateName',
                    ]);

                    const issuer = getText(item, [
                      'issuer',
                      'organization',
                      'provider',
                      'institution',
                    ]);

                    return (
                      <div
                        className="resume-entry"
                        key={`${title}-${index}`}
                      >
                        <div className="resume-entry-heading">
                          <div>
                            <h3 className="resume-entry-title">
                              {title || 'Certification'}
                            </h3>
                            {issuer && (
                              <p className="resume-entry-subtitle">
                                {issuer}
                              </p>
                            )}
                          </div>

                          {getDateRange(item) && (
                            <span className="resume-entry-date">
                              {getDateRange(item)}
                            </span>
                          )}
                        </div>

                        {getDescription(item) && (
                          <p className="resume-entry-description">
                            {getDescription(item)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </section>
              )}

              {/* FOOTER */}
              <footer className="resume-footer">
                <span>{name}</span>
                <span>Curriculum Vitae</span>
              </footer>

              {/* PORTFOLIO QR CODE */}
              <section
                className="resume-qr-section"
                aria-label="Portfolio QR code"
              >
                <div className="resume-qr-copy">
                  <h2 className="resume-qr-title">
                    Explore My Portfolio
                  </h2>

                  <p className="resume-qr-description">
                    Scan the QR code to explore my professional profile,
                    projects, technical skills, and experience online.
                  </p>

                  <a
                    className="resume-qr-url"
                    href={PORTFOLIO_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    abrehamamesa.netlify.app
                  </a>
                </div>

                <div className="resume-qr-code">
                  <QRCodeSVG
                    value={PORTFOLIO_URL}
                    size={88}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#111827"
                    title="Scan to visit my portfolio"
                  />
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ResumeModal;
