import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Braces,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Copy,
  Database,
  ExternalLink,
  FileText,
  Github,
  GitBranch,
  GraduationCap,
  HeartPulse,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Network,
  ServerCog,
  ShieldCheck,
  Terminal,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { portraitUrl, resumeUrl } from "@/lib/assets";
import {
  community,
  education,
  experience,
  profile,
  projects,
  publication,
  skills,
  type Project,
  type ProjectCategory,
  type ProjectPreview,
} from "@/lib/portfolio";

const projectFilters: Array<"All" | ProjectCategory> = [
  "All",
  "Full stack",
  "Backend",
  "Open source",
];

function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-description">{description}</p>
    </header>
  );
}

function ProjectArt({ variant }: { variant: ProjectPreview }) {
  if (variant === "rule") {
    return (
      <div className="project-art rule-art" aria-hidden="true">
        <div className="rule-art-toolbar">
          <span />
          <span />
          <span />
        </div>
        <div className="rule-art-tree">
          <span className="rule-art-node rule-art-node-root">IF</span>
          <i className="rule-art-branch rule-art-branch-left" />
          <i className="rule-art-branch rule-art-branch-right" />
          <span className="rule-art-node rule-art-node-left">age &gt; 18</span>
          <span className="rule-art-node rule-art-node-right">income = 42</span>
          <i className="rule-art-branch rule-art-branch-bottom-left" />
          <i className="rule-art-branch rule-art-branch-bottom-right" />
          <span className="rule-art-node rule-art-node-bottom-left">ALLOW</span>
          <span className="rule-art-node rule-art-node-bottom-right">
            REVIEW
          </span>
        </div>
        <span className="project-art-caption">rule.evaluate(ast)</span>
      </div>
    );
  }

  if (variant === "weather") {
    return (
      <div className="project-art weather-art" aria-hidden="true">
        <div className="weather-art-header">
          <span>10 DAY / HOURLY</span>
          <Activity size={13} />
        </div>
        <div className="weather-art-grid">
          {["08", "12", "16", "20", "00"].map((hour, index) => (
            <div className="weather-art-column" key={hour}>
              <span>{hour}</span>
              <i className={`weather-art-bar weather-art-bar-${index + 1}`} />
              <b>{[31, 34, 33, 29, 27][index]}°</b>
            </div>
          ))}
        </div>
        <div className="weather-art-footer">
          <span>cron / 04:00 UTC</span>
          <span>● synced</span>
        </div>
      </div>
    );
  }

  if (variant === "security") {
    return (
      <div className="project-art security-art" aria-hidden="true">
        <div className="security-art-radar">
          <span />
          <i />
          <b />
        </div>
        <div className="security-art-copy">
          <span>REPORT CHANNEL</span>
          <strong>anonymous</strong>
          <small>telegram.bot // ready</small>
        </div>
        <div className="security-art-status">
          <ShieldCheck size={14} />
          <span>identity protected</span>
        </div>
      </div>
    );
  }

  return (
    <div className="project-art care-art" aria-hidden="true">
      <div className="care-art-network">
        <span className="care-art-node care-art-node-main">
          <HeartPulse size={17} />
        </span>
        <i className="care-art-line care-art-line-a" />
        <i className="care-art-line care-art-line-b" />
        <i className="care-art-line care-art-line-c" />
        <span className="care-art-node care-art-node-a">CCN</span>
        <span className="care-art-node care-art-node-b">API</span>
        <span className="care-art-node care-art-node-c">CARE</span>
      </div>
      <div className="care-art-footer">
        <span>encounter / open</span>
        <span>protocol bridge</span>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (
    project: Project,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}) {
  return (
    <button
      className="project-card"
      type="button"
      onClick={event => onOpen(project, event)}
      aria-label={`Open details for ${project.title}`}
    >
      <ProjectArt variant={project.preview} />
      <span className="project-body">
        <span className="project-index">
          {project.index} / {project.categories[0]}
        </span>
        <span className="project-card-title">{project.title}</span>
        <span className="project-card-description">{project.description}</span>
        <span className="project-card-footer">
          <span className="project-tags">
            {project.tags.slice(0, 3).map(tag => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </span>
          <ChevronRight size={17} aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLElement>(null);
  useEffect(() => {
    dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, []);
  return (
    <div
      className="project-detail-backdrop"
      role="presentation"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialog}
        className="project-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onKeyDown={event => {
          if (event.key !== "Tab") return;
          const elements = dialog.current?.querySelectorAll<HTMLElement>(
            'button, a[href], input, [tabindex="0"]'
          );
          if (!elements?.length) return;
          const first = elements[0];
          const last = elements[elements.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
          if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <div className="project-detail-topline">
          <span>PROJECT / {project.index}</span>
          <button
            className="close-button"
            type="button"
            onClick={onClose}
            aria-label="Close project details"
          >
            <X size={18} />
          </button>
        </div>
        <div className="project-detail-layout">
          <ProjectArt variant={project.preview} />
          <div className="project-detail-copy">
            <p className="section-label">{project.subtitle}</p>
            <h2 id="project-dialog-title">{project.title}</h2>
            <p className="project-detail-description">{project.description}</p>
            <ul className="project-detail-list">
              {project.details.map(detail => (
                <li key={detail}>
                  <CircleDot size={13} />
                  {detail}
                </li>
              ))}
            </ul>
            <div className="project-detail-stack">
              <span className="section-label">STACK</span>
              <div className="project-tags">
                {project.stack.map(item => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {project.sourceUrl ? (
              <a
                className="outline-button"
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                {project.sourceLabel ?? "View source"}
                <ExternalLink size={15} />
              </a>
            ) : (
              <p className="muted project-source-note">
                No public repository link is available for this project.
              </p>
            )}
            {project.sourceNote && (
              <p className="muted project-source-note">{project.sourceNote}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProjectsView() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      lastTrigger.current?.focus();
    };
  }, [activeProject]);

  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter(project => project.categories.includes(filter));

  return (
    <section className="view-page projects-view">
      <PageHeader
        eyebrow="// SELECTED WORK"
        title="Ideas, made real."
        description="A field log of products, integrations, and systems built with care for the details beneath the interface."
      />
      <div className="project-filters" aria-label="Filter projects">
        {projectFilters.map(item => (
          <button
            className={`filter-button${filter === item ? " active" : ""}`}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {visibleProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={(nextProject, event) => {
              lastTrigger.current = event.currentTarget;
              setActiveProject(nextProject);
            }}
          />
        ))}
      </div>
      {activeProject && (
        <ProjectDetail
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}

export function AboutView() {
  return (
    <section className="view-page about-view">
      <PageHeader
        eyebrow="// BEHIND THE CODE"
        title="A little more human."
        description="I like the part where a rough idea meets a real constraint: a useful product, a dependable API, and a team that can understand what happens next."
      />
      <div className="about-layout">
        <section className="about-bio">
          <p className="section-label">01 / APPROACH</p>
          <p>
            I am Nandkishor, a Product Engineer from Adoor,
            Kerala. My work lives between product intent and implementation
            detail: shaping services, improving quality, and making complicated
            workflows easier to inspect.
          </p>
          <p>
            Across open healthcare work and smaller independent builds, I have
            worked with Python, JavaScript, TypeScript, Node, Django, React, and
            data systems from Postgres to DynamoDB. I care about the seams —
            tests, integrations, background jobs, and the small decisions that
            let software stay useful after launch.
          </p>
          <a
            className="text-link"
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Read the résumé <ArrowUpRight size={15} />
          </a>
        </section>
        <section
          className="experience-list"
          aria-labelledby="experience-heading"
        >
          <p className="section-label" id="experience-heading">
            02 / EXPERIENCE
          </p>
          {experience.map(item => (
            <article
              className="experience-item"
              key={`${item.company}-${item.date}`}
            >
              <span className="experience-date">{item.date}</span>
              <div>
                <h2 className="experience-role">{item.role}</h2>
                <p className="experience-company">{item.company}</p>
                <p className="muted">{item.description}</p>
                <ul>
                  {item.highlights.map(highlight => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>
      </div>
      <div className="about-lower-grid">
        <section className="skills-list" aria-labelledby="skills-heading">
          <p className="section-label" id="skills-heading">
            03 / TOOLKIT
          </p>
          {skills.map(skillGroup => (
            <div className="skill-group" key={skillGroup.group}>
              <span>{skillGroup.group}</span>
              <div>
                {skillGroup.items.map(item => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
        <div className="about-side-stack">
          <section className="education-panel">
            <GraduationCap size={20} />
            <div>
              <p className="section-label">04 / EDUCATION</p>
              <h2>{education.institution}</h2>
              <p>{education.degree}</p>
              <span className="muted">
                {education.date} · {education.result}
              </span>
            </div>
          </section>
          <section className="community-panel">
            <p className="section-label">05 / COMMUNITY</p>
            <ul>
              {community.map(item => (
                <li key={item}>
                  <UsersRound size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

function CircuitDecoration() {
  return (
    <svg
      className="contact-circuit"
      viewBox="0 0 640 270"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d="M16 28h130l34 34h112l36-36h166l48 48h82" />
      <path d="M26 226h124l40-40h122l36 36h128l50-50h94" />
      <path d="M292 26v70l28 28v40" />
      <path d="M470 82v54l-24 24" />
      <circle cx="16" cy="28" r="4" />
      <circle cx="488" cy="26" r="4" />
      <circle cx="624" cy="74" r="4" />
      <circle cx="26" cy="226" r="4" />
      <circle cx="476" cy="172" r="4" />
      <circle cx="292" cy="26" r="4" />
    </svg>
  );
}

export function ContactView() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <section className="view-page contact-view">
      <PageHeader
        eyebrow="// OPEN CHANNEL"
        title="Let's make something useful."
        description="Have a product question, a backend knot, or a good problem to think through? The shortest route is email."
      />
      <div className="contact-layout">
        <div className="contact-copy">
          <div className="contact-portrait">
            <img src={portraitUrl} alt="Portrait of Nandkishor R" />
            <span className="contact-portrait-scan" />
          </div>
          <p className="section-label">CURRENTLY IN</p>
          <p className="contact-location">
            <MapPin size={16} />
            {profile.location}
          </p>
          <p className="muted">
            Available for thoughtful product and engineering conversations.
          </p>
        </div>
        <div className="contact-node-map">
          <CircuitDecoration />
          <div className="contact-nodes">
            <a
              className="contact-node contact-email"
              href={`mailto:${profile.email}`}
            >
              <Mail size={18} />
              <span>
                <small>EMAIL</small>
                <strong>{profile.email}</strong>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a
              className="contact-node"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
              <span>
                <small>CODE</small>
                <strong>github / nandkishorr</strong>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a
              className="contact-node"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} />
              <span>
                <small>NETWORK</small>
                <strong>linkedin / nandkishorr</strong>
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="contact-cta">
        <div>
          <p className="section-label">DIRECT LINE</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <button className="outline-button" type="button" onClick={copyEmail}>
          {copyState === "copied" ? <Check size={15} /> : <Copy size={15} />}{" "}
          {copyState === "copied" ? "Copied" : "Copy email"}
        </button>
        <span className="contact-copy-status" role="status" aria-live="polite">
          {copyState === "error"
            ? "Could not access the clipboard — use the email link instead."
            : copyState === "copied"
              ? "Email copied to clipboard."
              : ""}
        </span>
      </div>
    </section>
  );
}

export function JournalView() {
  return (
    <section className="view-page journal-view">
      <PageHeader
        eyebrow="// WORKBENCH NOTES"
        title="Notes from the workbench."
        description="A small, honest archive. No filler posts — just work worth returning to, and a pointer to where the thinking continues."
      />
      <div className="journal-list">
        <article className="journal-item journal-publication">
          <div className="journal-meta">
            <span>DEC 2024</span>
            <span>PUBLICATION</span>
          </div>
          <div className="journal-item-main">
            <div className="journal-item-icon">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="journal-title">{publication.title}</h2>
              <p className="journal-description">
                A publication on a secure blockchain-based decentralized
                application for government-issued documents, written with{" "}
                {publication.authors.join(", ")}.
              </p>
              <div className="journal-publication-details">
                <span>{publication.isbn}</span>
                <span>
                  <CalendarDays size={14} />
                  {publication.date}
                </span>
              </div>
              <a
                className="text-link"
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Read the publication reference in the résumé{" "}
                <FileText size={15} />
              </a>
            </div>
          </div>
        </article>
        <article className="journal-item journal-link">
          <div className="journal-meta">
            <span>ONGOING</span>
            <span>LINKEDIN</span>
          </div>
          <div className="journal-item-main">
            <div className="journal-item-icon">
              <Terminal size={20} />
            </div>
            <div>
              <h2 className="journal-title">
                More thoughts, over on LinkedIn.
              </h2>
              <p className="journal-description">
                Notes on backend systems, product decisions, open healthcare,
                and the things that only become clear after building.
              </p>
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Visit LinkedIn <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </article>
      </div>
      <div className="journal-empty">
        <GitBranch size={15} />
        The archive is intentionally small. More when there is something worth
        saying.
      </div>
    </section>
  );
}
