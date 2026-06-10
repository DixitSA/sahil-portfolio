/* Styled ticker marquee — pure-CSS animation, no JS library */
import type { CSSProperties } from "react";

const items = [
  { ticker: "SCRIBE",            tag: "AI"         },
  { ticker: "TRACE",             tag: "COMPLIANCE" },
  { ticker: "AXIRA_LITE",        tag: "SAAS"       },
  { ticker: "VIBEQUEUE",         tag: "CONSUMER"   },
  { ticker: "KAAL",              tag: "FINTECH"    },
  { ticker: "POLYMARKET_TRADER", tag: "AUTOMATION" },
  { ticker: "SQL",               tag: null         },
  { ticker: "PYTHON",            tag: null         },
  { ticker: "NEXT.JS",           tag: null         },
  { ticker: "PRISMA",            tag: null         },
  { ticker: "TWILIO",            tag: null         },
];

const MONO: CSSProperties = {
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
  fontSize: "11px",
};

function TickerItem({ ticker, tag }: { ticker: string; tag: string | null }) {
  return (
    <span className="inline-flex items-center gap-2 mr-10" style={MONO}>
      <span style={{ color: "#f0b429" }}>{ticker}</span>
      <span style={{ color: "#00ff41" }}>▲</span>
      {tag && <span style={{ color: "#555" }}>+{tag}</span>}
      <span style={{ color: "#333", marginLeft: "16px" }}>·</span>
    </span>
  );
}

function Track({ cls }: { cls: string }) {
  return (
    <div
      className="overflow-hidden flex items-center"
      style={{ height: "40px" }}
    >
      <div className={`flex whitespace-nowrap w-max ${cls}`}>
        {/* Duplicate for seamless loop */}
        {[0, 1].map((pass) =>
          items.map((item) => (
            <TickerItem key={`${pass}-${item.ticker}`} {...item} />
          ))
        )}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative select-none pointer-events-none"
      aria-hidden="true"
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* LIVE_FEED label — absolute left edge with fade-out gradient */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3"
        style={{
          background: "linear-gradient(to right, #0d0d0d 110px, transparent)",
        }}
      >
        <span
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#333" }}
        >
          LIVE_FEED
        </span>
      </div>

      {/* Row 1: left */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Track cls="marquee-track" />
      </div>

      {/* Row 2: right */}
      <Track cls="marquee-track-reverse" />
    </div>
  );
}
