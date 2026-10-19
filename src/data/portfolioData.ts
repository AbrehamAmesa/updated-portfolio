export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Enterprise Banking' | 'Mini Apps & SuperApp' | 'HR & Workforce' | 'Fintech & Payments' | 'Workflow & Legal' | 'Live Web Apps';
  techStack: string[];
  role: string;
  organization: string;
  year: string;
  status: 'In Production' | 'Live Web' | 'Adopted by Faculty' | 'Enterprise Deployed';
  featured: boolean;
  image: string;
  summary: string;
  description: string;
  modules: string[];
  architecturalHighlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  certificateAward?: string;
}

export interface Experience {
  id: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: string;
  achievements: string[];
  isPublic?: boolean;
  order?: number;
  isCustom?: boolean;
  createdAt?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  credentialBadge: string;
  keyDetails: string[];
  serialNumber?: string;
}

export interface Recommendation {
  id: string;
  author: string;
  role: string;
  institution: string;
  quote: string;
  contactEmail: string;
}

export const PERSONAL_INFO = {
  name: 'Abreham Amesa Bedada',
  shortName: 'Abreham Amesa',
  title: 'Full Stack Software Engineer & Systems Designer',
  currentRole: 'Associate Application Development Officer at Siinqee Bank S.C.',
  location: 'Addis Ababa',
  email: 'abrehamamesw@gmail.com',
  phone1: '+251-973-705-847',
  phone2: '+251-710-794-385',
  linkedin: 'https://linkedin.com/in/abrishkena/',
  portfolioUrl: 'https://abreham-amesa.page.gd',
  avatarImage: '/src/assets/images/avatar_abreham_portrait_1790668810450.jpg',
  bio: 'Associate Application Development Officer at Siinqee Bank S.C. with proven experience designing, building, and deploying mission-critical enterprise banking platforms, full-stack systems, Mini Apps on mobile wallet architectures, and intuitive user interfaces. Specializes in Laravel, Java Spring Boot, React.js, Mini App O&M, and high-security REST APIs.',
  stats: [
    { value: '7+', label: 'Enterprise Systems Built', context: 'At Siinqee Bank & WKU' },
    { value: 'Huawei', label: 'Overseas Certified', context: 'Mini App & Cloud DWS' },
    { value: '13th', label: 'ICPC National Rank', context: 'Ethiopian Collegiate Contest' },
  ],
  coreSkills: {
    frontend: ['React.js', 'Mini App Runtime', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'HTML5', 'Modern UI/UX Design'],
    backend: ['Java Spring Boot', 'Laravel', 'PHP', 'Node.js', 'RESTful API Architecture', 'Mobile Wallet APIs'],
    cloudOps: ['Industry Cloud Platform DWS', 'Digital View System O&M', 'Linux Shell Scripting', 'Red Hat Java EE'],
    databases: ['SQL', 'MySQL', 'MongoDB', 'Database Indexing & Query Tuning']
  }
};

export const PROJECTS: Project[] = [
 
  {
    id: 'corehcm',
    title: 'COREHCM Enterprise System',
    subtitle: 'Comprehensive Human Capital Management & Workforce Platform',
    category: 'HR & Workforce',
    techStack: ['Java Spring Boot', 'React.js', 'MySQL', 'Tailwind CSS', 'REST API'],
    role: 'Full Stack Software Engineer',
    organization: 'Siinqee Bank S.C.',
    year: '2023 - 2024',
    status: 'In Production',
    featured: true,
    image: '/src/assets/images/project_corehcm_preview_1790668823547.jpg',
    summary: 'Enterprise Human Capital Management platform powering bank-wide staff records, position hierarchies, payroll integration, and automated performance reviews.',
    description: 'COREHCM is an enterprise-scale human capital management solution designed to handle end-to-end employee lifecycle workflows for a major financial institution with hundreds of branches. The system replaced legacy disjointed spreadsheets with a unified, role-based cloud platform with real-time analytics.',
    modules: [
      'Employee Record & Document Management',
      'Position & Organizational Structure Hierarchy',
      'Attendance & Multi-Tier Leave Request Engine',
      'Performance Evaluation & Appraisal Cycles',
      'Recruitment, Candidate Pipeline & Onboarding',
      'Payroll Integration & Compensation Matrix',
      'Work Unit & Departmental Structure',
      'Buzz Social & Internal Employee Engagement Module'
    ],
    architecturalHighlights: [
      'Engineered decoupled Java Spring Boot microservices handling complex organizational chart relationships and hierarchy traversal.',
      'Constructed responsive React frontend with interactive position tree visualizers and role-guarded action panels.',
      'Designed transactional database schemas ensuring strict audit logging for payroll and attendance adjustments.',
      'Recognized with official Siinqee Bank Certificate of Appreciation for development excellence.'
    ],
    certificateAward: 'Siinqee Bank Certificate of Appreciation'
  },
  {
    id: 'legal-case-system',
    title: 'Legal Case Management System',
    subtitle: 'Institutional Banking Litigation & Court Schedule Platform',
    category: 'Workflow & Legal',
    techStack: ['Laravel', 'React.js', 'MySQL', 'Blade', 'Bootstrap/Tailwind'],
    role: 'Lead Developer & Architect',
    organization: 'Siinqee Bank S.C.',
    year: '2024',
    status: 'In Production',
    featured: true,
    image: '/src/assets/images/project_legal_system_preview_1790668835195.jpg',
    summary: 'A secure banking system for legal counsel to record litigation cases, track judicial court schedules, assign attorneys, and forecast risk.',
    description: 'Developed to eliminate missed court dates and organize thousands of concurrent bank litigation cases, collateral claims, and regulatory inquiries. Offers automated hearing reminders, evidence attachment vaults, and executive case outcome analytics.',
    modules: [
      'Litigation Case Registration & Dossier Tracking',
      'Encrypted Legal Document Management & Archival',
      'Hearing Calendar & Court Session Scheduler',
      'Executive Case Status Dashboard & Risk Reporting',
      'In-House Lawyer & External Counsel Assignment',
      'Automated SMS & Email Hearing Reminders'
    ],
    architecturalHighlights: [
      'Built custom calendar synchronization engine ensuring legal teams never miss statutory court deadlines.',
      'Implemented granular role-based access control protecting confidential banking litigation documents.',
      'Designed high-throughput reporting queries aggregating case liabilities across all bank regional districts.',
      'Awarded Siinqee Bank Certificate of Appreciation signed by IT Innovation Director.'
    ],
    certificateAward: 'Siinqee Bank Certificate of Appreciation'
  },
  {
    id: 'webirr-integration',
    title: 'Webirr Payment Gateway Integration',
    subtitle: 'High-Reliability Digital Payment Checkout & Verification Interface',
    category: 'Fintech & Payments',
    techStack: ['React.js', 'REST API', 'JavaScript', 'Tailwind CSS', 'Webhooks'],
    role: 'Frontend Engineer',
    organization: 'Siinqee Bank S.C.',
    year: '2024',
    status: 'Enterprise Deployed',
    featured: true,
    image: '/src/assets/images/project_webirr_payment_preview_1790668845321.png',
    summary: 'Resilient checkout components and callback interfaces integrating the Webirr Ethiopian digital payment gateway.',
    description: 'Engineered the customer-facing and merchant payment initiation workflows for Webirr payments. Focused on bulletproof state management during network delays, instant transaction verification feedback, and clear user notification states.',
    modules: [
      'Payment Initiation & Merchant Order Checkout UI',
      'Secure Callback Handling & Webhook Verification Interface',
      'Real-Time Transaction Status Display with Auto-Polling',
      'Intelligent Error Handling & Step-by-Step Fallback Prompts',
      'Downloadable Digital Transaction Receipt & QR Verification'
    ],
    architecturalHighlights: [
      'Eliminated double-charge race conditions with idempotent payment request tokens and client-side lockouts.',
      'Designed frictionless checkout UX with support for mobile banking and USSD callback verification.',
      'Built self-healing retry mechanisms and user-friendly error banners for intermittent network connectivity.'
    ]
  },
  {
    id: 'collateral-valuation',
    title: 'Collateral Valuation System',
    subtitle: 'Branch Credit Security & Multi-Tier Appraisal Workflow',
    category: 'Enterprise Banking',
    techStack: ['Laravel', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Chart.js'],
    role: 'Software Engineer',
    organization: 'Siinqee Bank S.C.',
    year: '2024',
    status: 'In Production',
    featured: true,
    image: '/src/assets/images/collateral.png',
    summary: 'Branch collateral appraisal system enabling loan officers to inspect, register, categorize, and calculate mortgage and movable asset values.',
    description: 'A mission-critical credit underwriting tool used daily by bank branch staff to appraise real estate, vehicles, and industrial machinery prior to loan disbursement. Coordinates branch surveyors, senior evaluators, and credit approval committees.',
    modules: [
      'Branch Collateral Asset Registration Form with Multi-Photo Upload',
      'Multi-Tier Valuation & Appraisal Calculation Engine',
      'Asset Category & Depreciation Schedule Management',
      'Branch Submission & Regional Committee Review Panel',
      'Formal Approval & Risk Escalation Pipeline',
      'Detailed Valuation PDF Reporting & Excel Export'
    ],
    architecturalHighlights: [
      'Automated standardized valuation formula calculations based on national banking standards.',
      'Enforced strict 4-eyes approval workflow preventing unilateral loan security approvals.',
      'Optimized media compression for field inspection photographs submitted across low-bandwidth rural branches.'
    ]
  },
  {
    id: 'change-request-system',
    title: 'Change Request Management System',
    subtitle: 'IT Governance, Production Release & Audit Workflow Engine',
    category: 'Workflow & Legal',
    techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
    role: 'Software Engineer',
    organization: 'Siinqee Bank S.C.',
    year: '2024',
    status: 'In Production',
    featured: false,
    image: '/src/assets/images/changerequest.png',
    summary: 'Rigorous IT change management system governing production software updates, security impact scores, and rollback procedures.',
    description: 'Centralized banking IT release governance system ensuring all code changes to core banking, networks, and databases are vetted, impact-assessed, and documented for internal and central bank compliance audits.',
    modules: [
      'Standardized Change Request Submission Portal',
      'Multi-Stage Review & Department Head Approvals',
      'Risk & Impact Matrix Assessment Scoring',
      'Comprehensive Immutable Audit Logs & Event History',
      'Engineering Team Assignment, Timeline & Rollback Plans'
    ],
    architecturalHighlights: [
      'Implemented immutable change log ledger for compliance with strict banking regulatory guidelines.',
      'Automated SLA monitoring and notification escalation for critical hotfix approvals.'
    ]
  },
  {
    id: 'kpi-system',
    title: 'Departmental KPI Performance Analytics',
    subtitle: 'Institutional Goal Tracking, Scoring Models & Reviews',
    category: 'HR & Workforce',
    techStack: ['Laravel', 'React.js', 'MySQL', 'ApexCharts'],
    role: 'Full Stack Engineer',
    organization: 'Siinqee Bank S.C.',
    year: '2023 - 2024',
    status: 'In Production',
    featured: false,
    image: '/src/assets/images/kpiandpms.png',
    summary: 'Quarterly institutional KPI creation, objective weighting, employee evaluation scoring, and executive performance analytics.',
    description: 'Replaced manual performance review spreadsheets with dynamic goal templates, metric weightings, and peer/manager calibration workflows across all bank directorates.',
    modules: [
      'Custom KPI Goal Creation & Weight Assignment',
      'Automated Employee & Departmental Scoring Engine',
      'Quarterly and Annual Performance Review Workflow',
      'Consolidated Executive Dashboards & Department Leaderboards',
      'Data Export to Core HCM for Appraisal Records'
    ],
    architecturalHighlights: [
      'Designed flexible formula evaluator allowing dynamic weight distribution across disparate department types.',
      'Created intuitive interactive radar and bar comparison charts for senior executives.'
    ]
  },
  {
    id: 'akko-pharmacy',
    title: 'Akko Pharmacy Management Portal',
    subtitle: 'Pharmaceutical Inventory & Prescription Dispensing System',
    category: 'Live Web Apps',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3'],
    role: 'Solo Full Stack Developer',
    organization: 'Independent Project',
    year: '2023',
    status: 'Live Web',
    featured: false,
    image: '/src/assets/images/image.png',
    summary: 'Live web-based pharmacy point-of-sale, batch expiry tracking, and prescription management application.',
    description: 'Built for practical local healthcare inventory management. Tracks medication stock thresholds, expiry date warnings, daily revenue receipts, and patient prescriptions.',
    modules: [
      'Medicine Inventory & Batch Number Registry',
      'Automated Low-Stock & Expiry Notification Alerts',
      'Prescription Dispensing & Patient Records',
      'Sales Receipt Generator & Daily Reconciliation'
    ],
    architecturalHighlights: [
      'Lightweight database queries tailored for reliable operation on resource-constrained web hosts.',
      'Live deployed and functional web application.'
    ],
    liveUrl: 'http://akko-pharmacy.great-site.net/'
  },
  {
    id: 'ethiotech-portal',
    title: 'Ethiotech Web Platform',
    subtitle: 'Digital Services Directory & Client Onboarding Portal',
    category: 'Live Web Apps',
    techStack: ['React.js', 'Node.js', 'CSS Modules'],
    role: 'Frontend & UI Developer',
    organization: 'Independent Project',
    year: '2023',
    status: 'Live Web',
    featured: false,
    image: '/src/assets/images/project_legal_system_preview_1790668835195.jpg',
    summary: 'Technology services showcase platform featuring responsive project portfolios, inquiry workflows, and live quotation requests.',
    description: 'Modern web portal showcasing custom software development services, project case studies, and client onboarding forms with responsive design.',
    modules: [
      'Interactive Tech Services Catalog',
      'Client Quote Request & Brief Intake',
      'Responsive Mobile-First UI Architecture',
      'Automated Inbound Lead Email Notification'
    ],
    architecturalHighlights: [
      'High-performance static bundle optimization with modern CSS.',
      'Live deployed and functional web portal.'
    ],
    liveUrl: 'http://ethio-tech.great-site.net/'
  },
  {
    id: 'transport-management',
    title: 'WKU Transport Fleet Logistics',
    subtitle: 'Campus Vehicle Scheduling & Dispatch System',
    category: 'Enterprise Banking',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    role: 'Incubation Center Developer',
    organization: 'Wolkite University Incubation Center',
    year: '2021 - 2023',
    status: 'Adopted by Faculty',
    featured: false,
    image: '/src/assets/images/project_corehcm_preview_1790668823547.jpg',
    summary: 'Official vehicle requisition, fleet scheduling, and driver allocation system officially adopted by Wolkite University administration.',
    description: 'Developed inside the Wolkite University ICT Incubation Center to modernize university transport operations. Its real-world success led to formal adoption by faculty leadership and formal academic recognition.',
    modules: [
      'Faculty Vehicle Trip Requisition Flow',
      'Fleet Availability & Maintenance Scheduler',
      'Driver Shift & Route Assignment Logistics',
      'Fuel Consumption Auditing & Mileage Reports'
    ],
    architecturalHighlights: [
      'Vetted and adopted university-wide by the Directorate of Computing and Informatics.',
      'Featured as an exemplary real-world project in formal university commendation letters.'
    ]
  }
];

export const WORK_EXPERIENCES: Experience[] = [
  {
    id: 'exp-siinqee-assoc-app-dev-officer',
    period: 'Sep 02, 2026 - Present',
    title: 'Associate Application Development Officer',
    organization: 'Siinqee Bank S.C.',
    location: 'Headquarters: Kazanchis, Oda Tower, Addis Ababa',
    type: 'Full-time · Enterprise Engineering & App Development',
    isPublic: true,
    order: 0,
    achievements: [
      'Promoted to Associate Application Development Officer to drive high-impact core application engineering, software architecture standards, and digital platform initiatives across Siinqee Bank.',
      'Leads enterprise application development lifecycle, including requirements analysis, microservices design, and mission-critical production rollouts.',
      'Directs the development, integration, and operational maintenance of SuperApp Mini Apps and Mobile Wallet platforms in collaboration with international fintech ecosystems.',
      'Supervises code quality, system scalability, and technical governance across corporate HR, litigation, and valuation platforms.'
    ]
  },
  {
    id: 'exp-siinqee-assoc-se-1',
    period: 'Oct 2025 - Sep 2026',
    title: 'Associate Software Engineer-I',
    organization: 'Siinqee Bank S.C.',
    location: 'Headquarters: Kazanchis, Oda Tower, Addis Ababa',
    type: 'Full-time · Enterprise Banking & Mini Apps',
    isPublic: true,
    order: 1,
    achievements: [
      'Promoted following outstanding engineering delivery on Core Banking subsystems, Mini Apps, and enterprise modules.',
      'Architects Mini App integration and Mobile Wallet instances on the Huawei Digital Finance platform.',
      'Maintains and optimizes in-house enterprise platforms including Legal Case Management, COREHCM, and Collateral Valuation.',
      'Completed intensive Siinqee Bank Overseas Training at Huawei Global Training Center on Mini App O&M, Cloud DWS, and Mobile Wallet System instance configuration.'
    ]
  },
  {
    id: 'exp-siinqee-jr-se',
    period: 'Nov 2024 - Sep 2025',
    title: 'Junior Software Engineer',
    organization: 'Siinqee Bank S.C.',
    location: 'Addis Ababa, Ethiopia',
    type: 'Full-time · Engineering',
    isPublic: true,
    order: 2,
    achievements: [
      'Built high-impact systems including the Collateral Valuation System and Webirr payment gateway components.',
      'Authored automated test suites, resolved critical system bugs, and optimized query execution times.',
      'Awarded the Certificate of Appreciation by the Director of IT Innovation for exceptional contributions.'
    ]
  },
  {
    id: 'exp-siinqee-advisory',
    period: 'Oct 2024 - Nov 2024',
    title: 'Junior Capacity Building & Advisory Service Officer',
    organization: 'Siinqee Bank S.C.',
    location: 'Addis Ababa, Ethiopia',
    type: 'Internal Progression',
    isPublic: true,
    order: 3,
    achievements: [
      'Assisted in technical advisory, staff software tooling training, and internal operational workflows.'
    ]
  },
  {
    id: 'exp-siinqee-trainee',
    period: 'Sep 2023 - Sep 2024',
    title: 'Bank Trainee',
    organization: 'Siinqee Bank S.C.',
    location: 'Addis Ababa, Ethiopia',
    type: 'Rotational Engineering & Banking Operations',
    isPublic: true,
    order: 4,
    achievements: [
      'Graduated top of cohort, gaining deep insight into retail banking, credit operations, and compliance requirements.',
      'Rapidly transitioned into the IT Innovation and Software Development directorate.'
    ]
  },
  {
    id: 'exp-wku-incubation',
    period: 'Jun 2021 - Jul 2023',
    title: 'Incubation Center Developer',
    organization: 'Wolkite University ICT Incubation Center',
    location: 'Wolkite, Ethiopia',
    type: 'Part-time / University Center',
    isPublic: true,
    order: 5,
    achievements: [
      'Spearheaded development of the campus Transport Management System, officially adopted by university leadership.',
      'Represented Wolkite University in national collegiate algorithmic programming contests.',
      'Mentored junior students in web development, database design, and algorithmic problem solving.'
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'huawei-overseas-2026',
    title: 'Huawei Certified: Mini App O&M, Cloud DWS & Mobile Wallet Systems',
    issuer: 'Huawei Global Training Center (华为全球培训中心)',
    year: 'June 2026',
    serialNumber: 'HUC26ESWCNCIC003002',
    description: 'Completed the Siinqee Bank Overseas Training program at Huawei Global Training Center. Courses completed: Mini App O&M and Development Training, Industry Cloud Platform DWS Operation Training, Digital View System Operation and Maintenance Training, and Mobile Wallet System Instance Configuration Professional Practice.',
    credentialBadge: 'Huawei Overseas Certified Engineer',
    keyDetails: [
      'Official Certificate Serial Number: HUC26ESWCNCIC003002 (Issued: 2026-06-26)',
      'Course 1: Mini App O&M and Development Training',
      'Course 2: Industry Cloud Platform DWS Operation Training',
      'Course 3: Digital View System Operation and Maintenance Training',
      'Course 4: Mobile Wallet System Instance Configuration Professional Practice'
    ]
  },
  {
    id: 'icpc-2021',
    title: '13th Place · Ethiopian Collegiate Programming Contest (ECPC)',
    issuer: 'International Collegiate Programming Contest (ICPC) / ACPC',
    year: '2021',
    description: 'Awarded 13th Place in the national Ethiopian Collegiate Programming Contest held at Adama Science and Technology University (ASTU), qualifying for Africa & Arab regional championship.',
    credentialBadge: 'Top 13 National Finalist',
    keyDetails: [
      'Verified by ICPC Executive Director William B. Poucher, Ph.D. & ACPC Championship Director',
      'Advanced algorithmic problem-solving under strict 5-hour timed conditions',
      'Active problem solver on Kattis and competitive coding platforms'
    ]
  },
  {
    id: 'siinqee-award',
    title: 'Certificate of Appreciation for Innovation & Excellence',
    issuer: 'Siinqee Bank S.C. · Directorate of IT Innovation & Project Management',
    year: '2024',
    description: 'Formal bank commendation awarded in recognition of exceptional contributions to the development of Legal Case Management System and upgrade of Human Capital Management System.',
    credentialBadge: 'Enterprise Banking Honor',
    keyDetails: [
      'Signed by Yigremachew Eshetu, Director of IT Innovation and Project Management',
      'Commended for dedication, technical expertise, and collaborative spirit',
      'Directly drove production rollout across bank corporate divisions'
    ]
  },
  {
    id: 'redhat-java',
    title: 'Red Hat Application Development I: Programming in Java EE (AD183)',
    issuer: 'Red Hat Academy & Wolkite University',
    year: '2022',
    description: 'Enterprise Java EE engineering certification covering robust distributed architectures, transaction management, RESTful web services, and CDI beans.',
    credentialBadge: 'Red Hat Certified Training',
    keyDetails: [
      'Verified by Ken Goetz, Vice President, Global Training Services at Red Hat',
      'Hands-on enterprise Java enterprise middleware and backend design'
    ]
  },
  {
    id: 'ndg-linux',
    title: 'NDG Linux Essentials Professional Development',
    issuer: 'Cisco Networking Academy / Linux Professional Institute (LPI)',
    year: '2022',
    description: 'Comprehensive mastery of Linux OS architecture, terminal command line, file system permissions, user administration, and shell scripting.',
    credentialBadge: 'Linux Essentials Verified',
    keyDetails: [
      'Navigation of Linux server environments, system security, and automation scripts',
      'Foundational preparation for LPIC-1 Linux Server administration'
    ]
  },
  {
    id: 'dereja-mastercard',
    title: 'Employability & Job Readiness Certification',
    issuer: 'Mastercard Foundation & Dereja in partnership with Wolkite University',
    year: '2023',
    description: 'Professional excellence, corporate teamwork, agile project coordination, and technical communication certification.',
    credentialBadge: 'Mastercard Foundation Partner',
    keyDetails: [
      'Signed by Lishan Seyoum, Director of Projects at Infomind Solutions',
      'High-performing leadership and workplace collaboration'
    ]
  }
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-habtamu',
    author: 'Habtamu Alemayehu (MSc)',
    role: 'Lecturer of Computer Science & Final Year Project Advisor',
    institution: 'Wolkite University College of Computing and Informatics',
    quote: 'I witnessed first-hand Abreham\'s talents and capabilities. He chose to take on an ambitious project titled "Transport Management System" involving complex web application development. His work was so impressive that the university decided to adopt his application for use by faculty. He methodically approached the project and maintained a positive collaborative attitude.',
    contactEmail: 'habtamu.alemayehu@wku.edu.et'
  },
  {
    id: 'rec-wendosen',
    author: 'Wendosen Zina Zewdie',
    role: 'Senior Faculty Member, Information Systems Department',
    institution: 'Wolkite University College of Computing and Informatics',
    quote: 'Abreham is one of the most dynamic and enthusiastic students. He performed best in his academic and real-time project work that handles real-time problems. He has wonderful personality with competency, strong will, self-discipline, and punctual interpersonal communication.',
    contactEmail: 'wendosen.zina@wku.edu.et'
  },
  {
    id: 'rec-abdulmalik',
    author: 'Abdulmalik Johar (MSc)',
    role: 'Full Time Lecturer, Department of Information Systems',
    institution: 'Wolkite University College of Computing and Informatics',
    quote: 'Abreham is intelligent with good analytical skills. He fits into organizational and team tasks very well, bringing a sense of purpose and objectivity to whatever he does. Considering his already proven talent and skills, I wholeheartedly and strongly recommend him.',
    contactEmail: 'malikjohar95@gmail.com'
  }
];

export const EDUCATION = {
  institution: 'Wolkite University',
  degree: 'Bachelor of Science in Information Systems',
  graduationYear: '2023 (July 19, 2023)',
  exitExamScore: '77%',
  keyActivities: [
    'Competitor on the official WKU-ICPC team (13th place national finalist)',
    'Full Stack Developer in WKU ICT Incubation Center',
    'Member of the Innovation & Student Technology Committee'
  ]
};
