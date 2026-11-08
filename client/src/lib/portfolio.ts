export type Page = "home" | "about" | "projects" | "contact" | "journal";

export const profile = {
  name: "Nandkishor R",
  role: "Product & Backend Engineer",
  email: "iamnandkishorr@gmail.com",
  phone: "+91 9447351280",
  location: "Adoor, Kerala, India",
  github: "https://github.com/nandkishorr",
  linkedin: "https://www.linkedin.com/in/nandkishorr/",
} as const;

export type ProjectCategory = "Full stack" | "Backend" | "Open source";
export type ProjectPreview = "rule" | "weather" | "care" | "security";

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  categories: ProjectCategory[];
  tags: string[];
  stack: string[];
  preview: ProjectPreview;
  sourceUrl?: string;
  sourceLabel?: string;
  sourceNote?: string;
}

export const projects: Project[] = [
  {
    id: "care-open-source",
    index: "01",
    title: "CARE / Open Healthcare Network",
    subtitle: "Product engineering · open source",
    description:
      "Contributions to CARE, an open-source healthcare platform, spanning quality improvements and protocol-facing workflows.",
    details: [
      "Worked on quality improvements across CARE and integrated Beckn Protocol and CCN workflows.",
      "Built encounter auto-close plugins and supported CARE Experience sandbox generation for repeatable testing.",
      "The repository is the public platform source; the work described here is a contribution to the wider project.",
    ],
    categories: ["Backend", "Open source"],
    tags: ["Django", "Python", "Healthcare", "Beckn", "CCN"],
    stack: ["Django", "Python", "CARE", "Beckn Protocol"],
    preview: "care",
    sourceUrl: "https://github.com/ohcnetwork/care",
    sourceLabel: "View CARE repository",
    sourceNote: "Public platform repository",
  },
  {
    id: "rule-engine",
    index: "02",
    title: "Rule Engine with AST",
    subtitle: "Rules, evaluated in real time",
    description:
      "A full-stack rule system that turns human-readable conditions into editable, visualizable ASTs and evaluates them through a REST API.",
    details: [
      "Create, modify, and visualize rules built from conditions such as age, department, and income.",
      "The React interface keeps rule editing close to the evaluation loop, while the Node and Express API persists and evaluates the tree.",
      "Designed as a small, inspectable system for understanding how dynamic rules become executable structure.",
    ],
    categories: ["Full stack", "Backend"],
    tags: ["React", "Node", "Express", "MongoDB", "AST"],
    stack: ["React", "Node.js", "Express", "MongoDB", "REST"],
    preview: "rule",
    sourceUrl: "https://github.com/nandkishorr/RuleEngine-Frontend",
    sourceLabel: "View source on GitHub",
  },
  {
    id: "weather-monitoring",
    index: "03",
    title: "Weather monitoring",
    subtitle: "Forecasts, reduced to signal",
    description:
      "A scheduled weather monitor that fetches forecasts, condenses the next ten days into hourly summaries, and surfaces them through a focused dashboard.",
    details: [
      "Cron jobs fetch OpenWeatherMap data and prepare eight-hour summaries from ten-day forecasts.",
      "React, Node, Express, and MongoDB keep the dashboard, service layer, and persisted observations separate.",
      "The project is containerized with Docker so scheduled collection and local development share the same shape.",
    ],
    categories: ["Full stack", "Backend"],
    tags: ["React", "Node", "MongoDB", "Cron", "Docker"],
    stack: ["React", "Node.js", "Express", "MongoDB", "OpenWeatherMap"],
    preview: "weather",
    sourceUrl: "https://github.com/nandkishorr/WeatherApp-frontend",
    sourceLabel: "View source on GitHub",
  },
  {
    id: "urfine",
    index: "04",
    title: "UrFine palliative care",
    subtitle: "Care coordination with a human edge",
    description:
      "A palliative-care backend that brings care records, realtime notifications, and Gemini-assisted meal recommendations into one MVC service.",
    details: [
      "The Node and Express API uses MongoDB and Firebase to support care workflows and realtime notifications.",
      "Gemini-powered meal recommendations are framed as a supporting tool inside a broader care experience.",
      "API documentation and a clear MVC boundary make the service easier to hand off and extend.",
    ],
    categories: ["Full stack", "Backend"],
    tags: ["Node", "Express", "MongoDB", "Firebase", "Gemini AI"],
    stack: ["Node.js", "Express", "MongoDB", "Firebase", "MVC"],
    preview: "care",
    sourceUrl: "https://github.com/UrFine-withus/urfine_backend",
    sourceLabel: "View backend source",
  },
  {
    id: "guardi",
    index: "05",
    title: "Guardi",
    subtitle: "A quieter route to reporting",
    description:
      "A cyber and personal-security reporting flow for anonymous accounts of fraud, harassment, identity theft, and violence.",
    details: [
      "Reports move from a React interface through a Node, Express, and MongoDB service.",
      "Telegram bot notifications create a direct operational handoff without exposing the reporter's identity.",
      "ChatGPT 3.5 was used as part of the reporting workflow, with the backend source available for inspection.",
    ],
    categories: ["Full stack", "Backend"],
    tags: ["React", "Node", "MongoDB", "Telegram", "Safety"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Telegram Bot"],
    preview: "security",
    sourceUrl: "https://github.com/nandkishorr/Refracto-backend",
    sourceLabel: "View backend source",
  },
];

export interface SkillGroup {
  group: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "C", "C++"],
  },
  {
    group: "Backend",
    items: [
      "Django",
      "Django Ninja",
      "FastAPI",
      "Node.js",
      "Express",
      "Celery",
    ],
  },
  {
    group: "Data & cloud",
    items: ["Postgres", "MySQL", "MongoDB", "AWS", "RDS", "DynamoDB", "Redis"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Redux", "Tailwind", "Recoil"],
  },
  {
    group: "Workflow",
    items: ["Git", "GitHub Actions", "Docker", "Postman", "Jest", "Locust"],
  },
];

export interface ExperienceItem {
  date: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    date: "Jun 2026 — Oct 2026",
    role: "Product Engineer",
    company: "Open Healthcare Network Foundation",
    description:
      "Product engineering on CARE, an open-source healthcare platform.",
    highlights: [
      "Improved quality across CARE and worked with Beckn Protocol and CCN integrations.",
      "Built encounter auto-close plugins and CARE Experience sandbox generation workflows.",
    ],
  },
  {
    date: "May 2025 — Jun 2026",
    role: "Junior Backend Developer",
    company: "Pupilfirst",
    description:
      "Backend work around CARE, test confidence, and protocol integrations.",
    highlights: [
      "Expanded CARE test coverage and used Locust for load testing.",
      "Worked with CCM, UHI, and Beckn integrations in an open healthcare context.",
    ],
  },
  {
    date: "May 2024 — Jan 2025",
    role: "Backend Engineer (Part-Time)",
    company: "Panpalz",
    description: "Backend delivery with a remote India–California team.",
    highlights: [
      "Built with Node and Express across AWS RDS and DynamoDB-backed services.",
      "Maintained Jest test coverage at 100% for the project scope.",
    ],
  },
  {
    date: "Sep 2023 — Apr 2024",
    role: "Software Developer Intern",
    company: "Motiv8",
    description:
      "Product-facing full-stack work across dashboard and service layers.",
    highlights: [
      "Built a React and TypeScript dashboard backed by Node and MongoDB.",
      "Worked with Recoil, JWT and Google authentication, and AWS deployment workflows.",
    ],
  },
];

export const education = {
  institution: "College of Engineering Chengannur",
  degree: "B.Tech Computer Science & Engineering",
  date: "2021 — 2025",
  result: "GPA 8.6",
} as const;

export const community = [
  "FOCES chair — organized and volunteered at 30+ events.",
  "Postman student leader — led sessions for 300+ students.",
  "JavaScript mentor — supported a bootcamp that produced 150+ student projects.",
] as const;

export const publication = {
  title:
    "DeLock: Secure Blockchain Based Decentralized Application For Government Issued Documents",
  date: "December 2024",
  authors: ["Athul M E", "Alvin Johns", "Aparna Pradeep", "Nandkishor R"],
  isbn: "ISBN 978-81-982913-9-4",
} as const;
