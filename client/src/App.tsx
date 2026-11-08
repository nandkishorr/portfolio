import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  Command,
  FileCode2,
  FileText,
  GitBranch,
  Github,
  Minus,
  Search,
  TerminalSquare,
  X,
} from "lucide-react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {
  AboutView,
  ContactView,
  JournalView,
  ProjectsView,
} from "./components/PortfolioViews";
import PortfolioTerminal from "./components/PortfolioTerminal";
import { resumeUrl } from "./lib/assets";
import type { Page } from "./lib/portfolio";

const navigation: { id: Page; label: string; file: string; ext: string }[] = [
  { id: "home", label: "HOME", file: "home", ext: "tsx" },
  { id: "about", label: "ABOUT", file: "about", ext: "md" },
  { id: "projects", label: "PROJECTS", file: "projects", ext: "json" },
  { id: "contact", label: "CONTACTS", file: "contact", ext: "sh" },
  { id: "journal", label: "BLOGS", file: "journal", ext: "md" },
];
const matrix = Array.from({ length: 37 }, (_, row) =>
  Array.from({ length: 97 }, (_, col) =>
    (row * 13 + col * 7 + Math.floor(col / 9) * row) % 23 < 6 ? " " : "X"
  ).join("")
).join("\n");

// The terminal flow is intentionally disabled for now; flip this back to true to restore it.
const TERMINAL_ENABLED = false;

function CommandPalette({
  onClose,
  navigate,
}: {
  onClose: () => void;
  navigate: (page: Page) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const items = [
    ...navigation.map(item => ({
      label: `Open ${item.label.toLowerCase()}`,
      detail: `${item.file}.${item.ext}`,
      run: () => navigate(item.id),
    })),
    {
      label: "Download resume",
      detail: "resume.pdf",
      run: () => window.open(resumeUrl, "_blank", "noopener,noreferrer"),
    },
    {
      label: "Visit GitHub",
      detail: "github.com/nandkishorr",
      run: () =>
        window.open(
          "https://github.com/nandkishorr",
          "_blank",
          "noopener,noreferrer"
        ),
    },
  ].filter(item =>
    `${item.label} ${item.detail}`.toLowerCase().includes(query.toLowerCase())
  );
  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    input.current?.focus();
    return () => {
      previousFocus.current?.focus();
    };
  }, []);
  return (
    <div className="palette-backdrop" onClick={onClose}>
      <section
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={e => e.stopPropagation()}
        onKeyDown={e => {
          if (e.key === "Escape") onClose();
          if (e.key === "Tab") {
            e.preventDefault();
            input.current?.focus();
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelected(i => Math.min(i + 1, items.length - 1));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelected(i => Math.max(i - 1, 0));
          }
          if (e.key === "Enter" && items[selected]) {
            items[selected].run();
            onClose();
          }
        }}
      >
        <div className="palette-search">
          <Search size={18} />
          <input
            ref={input}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-options"
            aria-activedescendant={
              items[selected] ? `palette-option-${selected}` : undefined
            }
            aria-label="Search portfolio commands"
            placeholder="Where would you like to go?"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelected(0);
            }}
          />
          <button aria-label="Close command palette" onClick={onClose}>
            <kbd>ESC</kbd>
          </button>
        </div>
        <div
          className="palette-results"
          id="palette-options"
          role="listbox"
          aria-label="Portfolio commands"
        >
          <span className="palette-label">PORTFOLIO COMMANDS</span>
          {items.length ? (
            items.map((item, index) => (
              <button
                key={item.label}
                id={`palette-option-${index}`}
                role="option"
                aria-selected={index === selected}
                tabIndex={-1}
                className={index === selected ? "selected" : ""}
                onMouseEnter={() => setSelected(index)}
                onClick={() => {
                  item.run();
                  onClose();
                }}
              >
                <ChevronRight size={15} />
                <span>{item.label}</span>
                <small>{item.detail}</small>
                <ArrowUpRight size={14} />
              </button>
            ))
          ) : (
            <p className="palette-no-results">
              No matching commands. Try “projects”.
            </p>
          )}
        </div>
        <div className="palette-footer">
          <span>↑ ↓ to navigate</span>
          <span>↵ to open</span>
          <span>esc to close</span>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [palette, setPalette] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(true);
  const [booting, setBooting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const contentRef = useRef<HTMLElement>(null);
  const navigate = useCallback((next: Page) => {
    setPage(next);
    window.location.hash = next === "home" ? "" : next;
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/index.html"
    ) {
      setNotFound(true);
      return;
    }
    const readHash = () => {
      const id = window.location.hash.slice(1);
      setPage(navigation.find(item => item.id === id)?.id ?? "home");
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);
  useEffect(() => {
    document.title =
      page === "home"
        ? "Nandkishor R — Product & Backend Engineer"
        : `${navigation.find(n => n.id === page)?.label} — Nandkishor R`;
  }, [page]);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      if (
        !sessionStorage.getItem("nk-booted") &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setBooting(true);
        let percentage = 0;
        interval = setInterval(() => {
          percentage = Math.min(100, percentage + 17);
          setProgress(percentage);
          if (percentage === 100) {
            clearInterval(interval);
            timeout = setTimeout(() => setBooting(false), 180);
          }
        }, 95);
        sessionStorage.setItem("nk-booted", "1");
      }
    } catch {
      setBooting(false);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      const isTyping =
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement)?.tagName
        ) || (e.target as HTMLElement)?.isContentEditable;
      if (document.querySelector('[role="dialog"]') && !palette) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette(open => !open);
      }
      if (TERMINAL_ENABLED && (e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setTerminalVisible(open => !open);
      }
      if (e.key === "Escape") setPalette(false);
      if (TERMINAL_ENABLED && !isTyping && !palette && e.key === "/") {
        e.preventDefault();
        setTerminalVisible(true);
        setTimeout(
          () => document.getElementById("portfolio-command")?.focus(),
          0
        );
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [palette]);
  if (notFound) return <NotFound />;
  const current = navigation.find(item => item.id === page)!;
  return (
    <div className="portfolio-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="workspace-header">
        <button
          className="header-brand"
          onClick={() => navigate("home")}
          aria-label="Go to homepage"
        >
          <span>
            nandkishor<span className="brand-divider">/</span>
            <span className="brand-secondary">portfolio</span>
            <span className="brand-dot">.</span>
          </span>
        </button>
        <div className="header-center">
          <span className="status-dot" /> PERSONAL WORKSPACE{" "}
          <span className="header-version">V.2026</span>
        </div>
        <button
          className="command-trigger"
          aria-label="Open command palette"
          onClick={() => setPalette(true)}
        >
          <Search size={14} />
          <span>Go anywhere</span>
          <kbd>
            <Command size={10} /> K
          </kbd>
        </button>
      </header>
      <aside className="navigation-rail" aria-label="Portfolio navigation">
        <div className="rail-top" aria-hidden="true" />
        <nav>
          {navigation.map((item, index) => (
            <a
              href={item.id === "home" ? "#" : `#${item.id}`}
              key={item.id}
              className={`rail-item ${page === item.id ? "active" : ""}`}
              aria-current={page === item.id ? "page" : undefined}
              onClick={e => {
                e.preventDefault();
                navigate(item.id);
              }}
            >
              <span className="rail-index">0{index + 1}</span>
              <span className="rail-label">{item.label}</span>
              <span className="rail-active-dot" />
            </a>
          ))}
        </nav>
        {TERMINAL_ENABLED && (
          <button
            className={`rail-terminal ${terminalVisible ? "active" : ""}`}
            aria-label={terminalVisible ? "Hide terminal" : "Show terminal"}
            onClick={() => setTerminalVisible(v => !v)}
          >
            <TerminalSquare size={19} />
          </button>
        )}
      </aside>
      <div className="workspace">
        <div className="editor-tabs">
          <div className="editor-label">
            <ChevronDown size={12} /> EXPLORER
          </div>
          {navigation.map(item => (
            <button
              key={item.id}
              className={`editor-tab ${page === item.id ? "active" : ""}`}
              onClick={() => navigate(item.id)}
            >
              {item.ext === "tsx" ? (
                <FileCode2 size={13} />
              ) : (
                <FileText size={13} />
              )}
              <span>
                {item.file}
                <span className="file-extension">.{item.ext}</span>
              </span>
              {page === item.id && <span className="file-modified" />}
            </button>
          ))}
          <div className="editor-tabs-end">
            <Code2 size={14} />
          </div>
        </div>
        <main
          id="main-content"
          className="editor-content"
          ref={contentRef}
          tabIndex={-1}
        >
          <div className="breadcrumb">
            <span>portfolio</span>
            <ChevronRight size={11} />
            <span>src</span>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">
              {current.file}.{current.ext}
            </span>
            <span className="breadcrumb-right">
              {String(
                navigation.findIndex(item => item.id === page) + 1
              ).padStart(2, "0")}{" "}
              — {current.label}
            </span>
          </div>
          <div className="ambient-matrix" aria-hidden="true">
            <pre>{matrix}</pre>
          </div>
          <div className="page-content" key={page}>
            {page === "home" && <Home navigate={navigate} />}
            {page === "about" && <AboutView />}
            {page === "projects" && <ProjectsView />}
            {page === "contact" && <ContactView />}
            {page === "journal" && <JournalView />}
          </div>
          <footer className="content-footer">
            <span>© 2026 NANDKISHOR R</span>
            <span>MADE OF CURIOSITY & A FEW LINES OF CODE.</span>
            <a
              href="https://github.com/nandkishorr"
              target="_blank"
              rel="noreferrer"
              aria-label="Nandkishor on GitHub"
            >
              <Github size={14} />
              <ArrowUpRight size={11} />
            </a>
          </footer>
        </main>
        {TERMINAL_ENABLED && terminalVisible && (
          <PortfolioTerminal
            navigate={navigate}
            onClose={() => setTerminalVisible(false)}
          />
        )}
      </div>
      <footer className="workspace-status">
        <div>
          <GitBranch size={12} />
          <span>main*</span>
          <span className="status-divider" />
          <Check size={11} />
          <span>all systems thoughtful</span>
        </div>
        <div>
          <span className="status-page">
            {current.file}.{current.ext}
          </span>
          <span>UTF-8</span>
          <span>TypeScript</span>
          {TERMINAL_ENABLED && (
            <button
              aria-label={terminalVisible ? "Hide terminal" : "Show terminal"}
              onClick={() => setTerminalVisible(v => !v)}
            >
              <TerminalSquare size={11} />
              <span>terminal</span>
            </button>
          )}
          <span className="status-dot" /> ONLINE
        </div>
      </footer>
      {palette && (
        <CommandPalette onClose={() => setPalette(false)} navigate={navigate} />
      )}
      {booting && (
        <div
          className="boot-screen"
          role="status"
          aria-label="Initializing portfolio"
        >
          <div className="boot-meta">
            <span>INITIALIZING PERSONAL WORKSPACE</span>
            <span>NK / 2026</span>
          </div>
          <span className="boot-progress">
            {progress}
            <span>%</span>
          </span>
          <div className="boot-bar" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
