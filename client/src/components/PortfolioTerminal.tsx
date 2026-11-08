import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronRight, Maximize2, Minimize2, X } from "lucide-react";
import { resumeUrl } from "@/lib/assets";
import type { Page } from "@/lib/portfolio";

const aliases: Record<string, Page> = {
  home: "home",
  about: "about",
  whoami: "about",
  projects: "projects",
  ls: "projects",
  contact: "contact",
  contacts: "contact",
  blogs: "journal",
  blog: "journal",
  journal: "journal",
};
const pageFiles: Record<Page, string> = {
  home: "home.tsx",
  about: "about.md",
  projects: "projects.json",
  contact: "contact.sh",
  journal: "journal.md",
};
const starter = [
  {
    text: "Session ready. Explore the person behind the pixels.",
    kind: "welcome",
  },
];
type Line = { text: string; kind: string };

export default function PortfolioTerminal({
  navigate,
  onClose,
}: {
  navigate: (page: Page) => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [lines, setLines] = useState<Line[]>(starter);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const output = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (output.current) output.current.scrollTop = output.current.scrollHeight;
  }, [lines]);
  const execute = (raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    setHistory(h => [...h, raw]);
    setHistoryIndex(-1);
    setInput("");
    if (command === "clear") {
      setLines([]);
      return;
    }
    let response: string;
    if (aliases[command]) {
      navigate(aliases[command]);
      response = `→ Opening ${pageFiles[aliases[command]]}`;
    } else if (command === "help" || command === "?") {
      response =
        "Available commands: home · about · projects · contact · blogs · resume · github · linkedin · email · date · clear\nTip: ↑ / ↓ for command history. Ctrl / ⌘ + K opens the command palette.";
      setExpanded(true);
    } else if (command === "resume" || command === "cat resume") {
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
      response = "→ Opening Nandkishor_R_Resume.pdf";
    } else if (command === "github" || command === "linkedin") {
      window.open(
        command === "github"
          ? "https://github.com/nandkishorr"
          : "https://www.linkedin.com/in/nandkishorr/",
        "_blank",
        "noopener,noreferrer"
      );
      response = `→ Opening ${command} profile`;
    } else if (command === "email") {
      window.location.href = "mailto:iamnandkishorr@gmail.com";
      response = "→ iamnandkishorr@gmail.com";
    } else if (command === "date")
      response =
        new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "short",
        }) + " · IST";
    else if (command === "sudo")
      response = "Nice try. Curiosity doesn’t need root access.";
    else if (command === "hello")
      response =
        "Hey there. Glad you found your way here. Type “help” to look around.";
    else
      response = `Command not found: ${raw}. Type “help” for available commands.`;
    setLines(old => [
      ...old.slice(-28),
      { text: `nandkishor@portfolio ~ $ ${raw}`, kind: "command" },
      { text: response, kind: "response" },
    ]);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    execute(input);
  };
  return (
    <section
      className={`portfolio-terminal ${expanded ? "expanded" : ""}`}
      aria-label="Interactive portfolio terminal"
    >
      <div className="terminal-header">
        <div>
          <span className="terminal-active">TERMINAL</span>
          <span className="terminal-other">OUTPUT</span>
          <span className="terminal-header-note">
            a little closer to the source.
          </span>
        </div>
        <div>
          <span className="terminal-shell">zsh</span>
          <button
            onClick={() => setExpanded(v => !v)}
            aria-label={expanded ? "Minimize terminal" : "Expand terminal"}
          >
            {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button onClick={onClose} aria-label="Close terminal">
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="terminal-body">
        <div
          ref={output}
          className="terminal-output"
          aria-live="polite"
          aria-relevant="additions"
        >
          {lines.map((line, i) => (
            <div key={i} className={`terminal-line ${line.kind}`}>
              {line.kind === "welcome" && (
                <span className="terminal-check">✓ </span>
              )}
              {line.text}
              {line.kind === "welcome" && (
                <span className="terminal-help">
                  {" "}
                  Type <button onClick={() => execute("help")}>help</button> to
                  begin.
                </span>
              )}
            </div>
          ))}
        </div>
        <form className="terminal-input-line" onSubmit={submit}>
          <span className="terminal-user">
            nandkishor<span>@portfolio</span>
          </span>
          <span className="terminal-home">~</span>
          <ChevronRight size={13} />
          <input
            id="portfolio-command"
            aria-label="Portfolio terminal command"
            autoComplete="off"
            spellCheck={false}
            value={input}
            placeholder="type a command..."
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "ArrowUp" && history.length) {
                e.preventDefault();
                const next = Math.min(historyIndex + 1, history.length - 1);
                setHistoryIndex(next);
                setInput(history[history.length - 1 - next]);
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = Math.max(historyIndex - 1, -1);
                setHistoryIndex(next);
                setInput(next === -1 ? "" : history[history.length - 1 - next]);
              }
            }}
          />
          <button
            className="terminal-submit"
            type="submit"
            aria-label="Execute command"
          >
            ↵
          </button>
          <span className="terminal-shortcut">/ TO FOCUS</span>
        </form>
      </div>
    </section>
  );
}
