import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { portraitUrl, resumeUrl } from "@/lib/assets";
import type { Page } from "@/lib/portfolio";

export default function Home({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <div className="home-view view-page">
      <div className="home-topline">
        <span>PERSONAL PORTFOLIO / V.2026</span>
        <span className="topline-location">
          <MapPin size={12} /> KERALA, INDIA · UTC +05:30
        </span>
      </div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-cross">+</span> HELLO, WORLD.
          </p>
          <p className="hero-greeting">Hi there, I’m</p>
          <h1 id="hero-title">
            Nandkishor
            <span className="name-last">
              R<span className="name-period">.</span>
              <span className="typing-cursor" aria-hidden="true" />
            </span>
          </h1>
          <div className="hero-role">
            <span className="code-bracket">&lt;</span> Product & Backend
            Engineer <span className="code-bracket">/&gt;</span>
          </div>
          <p className="hero-description">
            Turning complex problems into thoughtful software.
            <br className="desktop-br" /> Building across the stack, with a soft
            spot for
            <br className="desktop-br" /> open source and things that make a
            difference.
          </p>
          <div className="hero-actions">
            <a
              className="outline-button primary-button"
              href={resumeUrl}
              download="Nandkishor_R_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={15} /> Get my resume <ArrowUpRight size={15} />
            </a>
            <button className="text-link" onClick={() => navigate("contact")}>
              Let’s talk <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="hero-note">
            <span className="status-dot" /> BASED IN KERALA. BUILDING FOR
            EVERYWHERE.
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-coordinates">
            <span>FIG. 01</span>
            <span>9.15° N / 76.73° E</span>
          </div>
          <div className="portrait-frame">
            <div className="portrait-cross corner-tl">+</div>
            <div className="portrait-cross corner-tr">+</div>
            <div className="portrait-cross corner-bl">+</div>
            <div className="portrait-cross corner-br">+</div>
            <img
              className="hero-portrait"
              src={portraitUrl}
              alt="Layered grayscale portrait of Nandkishor R wearing headphones"
            />
            <div className="portrait-scanline" aria-hidden="true" />
            <div className="portrait-metadata">
              <span>THE HUMAN BEHIND THE CODE</span>
              <span>[ NR ]</span>
            </div>
          </div>
          <div className="portrait-bottom">
            <span>LESS NOISE. MORE SIGNAL.</span>
            <span>↳ A WORK IN PROGRESS</span>
          </div>
          <svg
            className="hero-circuit"
            viewBox="0 0 440 430"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 330H32V370H85V395H175M370 0V38H414V108H440M390 340H423V375H440"
              stroke="currentColor"
            />
            <rect
              x="172"
              y="392"
              width="6"
              height="6"
              fill="currentColor"
              transform="rotate(45 175 395)"
            />
          </svg>
        </div>
      </section>
      <div className="home-divider">
        <span>01 / INTRODUCTION</span>
        <button onClick={() => navigate("about")}>
          THERE’S MORE BELOW <ArrowDown size={12} />
        </button>
      </div>
      <section className="home-snapshot" aria-label="At a glance">
        <div className="snapshot-intro">
          <span className="eyebrow">// A LITTLE CONTEXT</span>
          <p>
            Curiosity is the
            <br />
            constant.
          </p>
        </div>
        <button className="snapshot-item" onClick={() => navigate("about")}>
          <span className="snapshot-number">01</span>
          <div>
            <h2>Built for real people.</h2>
            <p>
              Product engineering at the
              <br />
              Open Healthcare Network.
            </p>
          </div>
          <ArrowUpRight size={16} />
        </button>
        <button className="snapshot-item" onClick={() => navigate("projects")}>
          <span className="snapshot-number">02</span>
          <div>
            <h2>Open by default.</h2>
            <p>
              Healthcare, thoughtful APIs,
              <br />
              and open-source contributions.
            </p>
          </div>
          <ArrowUpRight size={16} />
        </button>
        <button className="snapshot-item" onClick={() => navigate("about")}>
          <span className="snapshot-number">03</span>
          <div>
            <h2>Always learning.</h2>
            <p>
              Computer Science graduate.
              <br />
              Community builder. Tinkerer.
            </p>
          </div>
          <ArrowUpRight size={16} />
        </button>
      </section>
    </div>
  );
}
