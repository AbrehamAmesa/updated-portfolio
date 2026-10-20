
import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Printer,
  Copy,
  Check,
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
    font-family: Arial, Helvetica, sans-serif;
  }

  .resume-modal-shell {
    display: flex;
    flex-direction: column;
    width: min(100%, 1080px);
    max-height: calc(100vh - 40px);
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
    line-height: 1.45;
  }

  .resume-header {
    padding-bottom: 18px;
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
    width: 108px;
    height: 108px;
    flex-shrink: 0;
    object-fit: cover;
    object-position: center;
    border: 3px solid #fed7aa;
    border-radius: 50%;
    background: #f8fafc;
  }

  .resume-section {
    margin-top: 19px;
  }

  .resume-section-heading {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 9px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e2e8f0;
    color: #111827;
    font-size: 11pt;
    font-weight: 800;
    letter-spacing: 0.5px;
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
    margin-bottom: 12px;
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
    gap: 9px;
  }

  .resume-project-card {
    min-width: 0;
    padding: 9px;
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
    margin: 6px 0 0;
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
    margin-top: 20px;
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
    margin-top: 16px;
    padding-top: 10px;
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
    padding: 5px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
  }

  .resume-qr-code svg {
    display: block;
    width: 80px;
    height: 80px;
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
      display: block !important;
      width: auto !important;
      height: auto !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: #fff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /*
     * The modal is rendered directly under body using createPortal.
     * Remove the application root and other body children from the
     * print layout instead of merely hiding their visibility.
     */
    body > *:not(.resume-modal-overlay):not(style) {
      display: none !important;
    }

    .resume-modal-overlay,
    .resume-modal-overlay * {
      visibility: visible !important;
    }

    .resume-modal-overlay {
      position: static !important;
      inset: auto !important;
      display: block !important;
      width: auto !important;
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
      height: auto !important;
      max-height: none !important;
      min-height: 0 !important;
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
      flex: none !important;
      width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: #fff !important;
    }

    #resume-print-root {
      display: block !important;
      width: 100% !important;
      max-width: none !important;
      height: auto !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: #fff !important;
      box-shadow: none !important;
      color: #1f2937 !important;
      font-size: 9pt !important;
      line-height: 1.35 !important;
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

    #resume-print-root .resume-header {
      padding-bottom: 12px !important;
    }

    #resume-print-root .resume-section {
      margin-top: 13px !important;
    }

    #resume-print-root .resume-section-heading {
      margin-bottom: 7px !important;
    }

    #resume-print-root .resume-entry {
      margin-bottom: 8px !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    #resume-print-root .resume-project-grid {
      gap: 7px !important;
    }

    #resume-print-root .resume-project-card {
      padding: 7px !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    #resume-print-root .resume-qr-section {
      margin-top: 12px !important;
      padding-top: 8px !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    #resume-print-root .resume-qr-code {
      padding: 4px !important;
    }

    #resume-print-root .resume-qr-code svg {
      width: 72px !important;
      height: 72px !important;
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

    #resume-print-root img,
    #resume-print-root svg {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
  }
`;

const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const experienceContext = useExperience() as {
    experiences?: any[];
    publicExperiences?: any[];
    viewMode?: string;
  };

  const experiences = useMemo(() => {
    const source =
      experienceContext.publicExperiences ??
      experienceContext.experiences ??
      [];

    return source
      .filter((item) => item && item.isPublic !== false)
      .slice()
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [
    experienceContext.publicExperiences,
    experienceContext.experiences,
  ]);

  const personal = PERSONAL_INFO;
  const projects = PROJECTS;
  const certifications = CERTIFICATIONS;

  const skills = useMemo(() => {
    const groupedSkills = personal.coreSkills;

    return Object.values(groupedSkills)
      .flat()
      .filter((skill): skill is string => typeof skill === 'string');
  }, []);

  const education = EDUCATION;

  const resumeSummary = personal.bio;

  const resumeText = useMemo(() => {
    const lines: string[] = [
      personal.name,
      personal.title,
      personal.email,
      personal.phone1,
      personal.phone2,
      personal.location,
      personal.linkedin,
      PORTFOLIO_URL,
      '',
      'PROFESSIONAL SUMMARY',
      resumeSummary,
      '',
      'TECHNICAL EXPERTISE',
      skills.join(', '),
      '',
      'PROFESSIONAL EXPERIENCE',
    ];

    experiences.forEach((item) => {
      lines.push(
        item.title ?? '',
        item.organization ?? '',
        item.period ?? '',
        item.location ?? '',
        ...(item.achievements ?? []),
        '',
      );
    });

    lines.push('', 'SELECTED PROJECTS');

    projects.forEach((project) => {
      lines.push(
        project.title,
        project.subtitle,
        project.role,
        project.organization,
        project.year,
        project.summary,
        `Technologies: ${project.techStack.join(', ')}`,
        '',
      );
    });

    lines.push(
      '',
      'EDUCATION',
      education.degree,
      education.institution,
      education.graduationYear,
      `Exit Exam Score: ${education.exitExamScore}`,
      ...education.keyActivities,
      '',
      'CERTIFICATIONS & HONORS',
    );

    certifications.forEach((certification) => {
      lines.push(
        certification.title,
        certification.issuer,
        certification.year,
        certification.description,
        '',
      );
    });

    lines.push(`Portfolio: ${PORTFOLIO_URL}`);

    return lines.join('\n');
  }, [experiences, projects, certifications, skills, resumeSummary]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resumeText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Unable to copy résumé:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <>
      <style>{resumeStyles}</style>

      <div
        className="resume-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Résumé preview"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="resume-modal-shell">
          <div className="resume-toolbar">
            <div>
              <p className="resume-toolbar-title">Résumé Preview</p>
              <p className="resume-toolbar-subtitle">
                Review your résumé before printing or saving as PDF.
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
                onClick={() =>
                  window.open(
                    PORTFOLIO_URL,
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
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
                    <h1 className="resume-name">{personal.name}</h1>

                    <p className="resume-role">{personal.title}</p>

                    <div className="resume-contact-list">
                      <span className="resume-contact-item">
                        <Mail />
                        <a href={`mailto:${personal.email}`}>
                          {personal.email}
                        </a>
                      </span>

                      <span className="resume-contact-item">
                        <Phone />
                        <span>{personal.phone1}</span>
                      </span>

                      <span className="resume-contact-item">
                        <Phone />
                        <span>{personal.phone2}</span>
                      </span>

                      <span className="resume-contact-item">
                        <MapPin />
                        <span>{personal.location}</span>
                      </span>

                      <span className="resume-contact-item">
                        <Linkedin />
                        <a href={personal.linkedin}>LinkedIn Profile</a>
                      </span>
                    </div>
                  </div>

                  <img
                    src={avatarImage}
                    alt={`${personal.name} profile portrait`}
                    className="resume-avatar"
                  />
                </div>
              </header>

              {/* SUMMARY */}
              <section className="resume-section">
                <h2 className="resume-section-heading">
                  <BookOpen />
                  Professional Summary
                </h2>

                <p className="resume-summary">{personal.bio}</p>
              </section>

              {/* SKILLS */}
              <section className="resume-section">
                <h2 className="resume-section-heading">
                  <Code2 />
                  Technical Expertise
                </h2>

                <div className="resume-skills-list">
                  {skills.map((skill) => (
                    <span className="resume-skill" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* EXPERIENCE */}
              <section className="resume-section">
                <h2 className="resume-section-heading">
                  <Briefcase />
                  Professional Experience
                </h2>

                {experiences.length > 0 ? (
                  experiences.map((item, index) => (
                    <div
                      className="resume-entry"
                      key={item.id ?? `${item.title}-${index}`}
                    >
                      <div className="resume-entry-heading">
                        <div>
                          <h3 className="resume-entry-title">
                            {item.title}
                          </h3>

                          <p className="resume-entry-subtitle">
                            {item.organization}
                          </p>
                        </div>

                        <span className="resume-entry-date">
                          {item.period}
                        </span>
                      </div>

                      {item.location && (
                        <p className="resume-entry-description">
                          {item.location}
                        </p>
                      )}

                      {item.achievements?.length > 0 && (
                        <ul className="resume-entry-list">
                          {item.achievements.map(
                            (achievement: string, achievementIndex: number) => (
                              <li
                                key={`${item.id}-${achievementIndex}`}
                              >
                                {achievement}
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="resume-empty">
                    No public work experience is currently available.
                  </p>
                )}
              </section>

              {/* PROJECTS */}
              <section className="resume-section">
                <h2 className="resume-section-heading">
                  <Code2 />
                  Selected Projects
                </h2>

                <div className="resume-project-grid">
                  {projects.map((project) => (
                    <div className="resume-project-card" key={project.id}>
                      <h3 className="resume-project-title">
                        {project.title}
                      </h3>

                      <p className="resume-project-description">
                        {project.summary}
                      </p>

                      <p className="resume-project-tech">
                        {project.techStack.join(' · ')}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* EDUCATION */}
              <section className="resume-section">
                <h2 className="resume-section-heading">
                  <BookOpen />
                  Education
                </h2>

                <div className="resume-entry">
                  <div className="resume-education-layout">
                    <div>
                      <h3 className="resume-entry-title">
                        {education.degree}
                      </h3>

                      <p className="resume-entry-subtitle">
                        {education.institution}
                      </p>
                    </div>

                    <span className="resume-entry-date">
                      {education.graduationYear}
                    </span>
                  </div>

                  <p className="resume-entry-description">
                    Exit Exam Score: {education.exitExamScore}
                  </p>

                  <ul className="resume-entry-list">
                    {education.keyActivities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* CERTIFICATIONS */}
              <section className="resume-section">
                <h2 className="resume-section-heading">
                  <Award />
                  Certifications &amp; Honors
                </h2>

                {certifications.map((certification) => (
                  <div className="resume-entry" key={certification.id}>
                    <div className="resume-entry-heading">
                      <div>
                        <h3 className="resume-entry-title">
                          {certification.title}
                        </h3>

                        <p className="resume-entry-subtitle">
                          {certification.issuer}
                        </p>
                      </div>

                      <span className="resume-entry-date">
                        {certification.year}
                      </span>
                    </div>

                    <p className="resume-entry-description">
                      {certification.description}
                    </p>
                  </div>
                ))}
              </section>

              {/* FOOTER */}
              <footer className="resume-footer">
                <span>{personal.name}</span>
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
                    size={80}
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
