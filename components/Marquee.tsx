/* Styled ticker marquee — pure-CSS animation, no JS library.
   Per the texture contract the marquee is ghost type: it is aria-hidden
   decoration, so it carries the ornament color and neither signal color.
   Green is live state only and this is not live; amber is a structural label
   and this is not one. */

const items = [
  { ticker: "AXIRA",             tag: "MULTI_AGENT" },
  { ticker: "KAAL",              tag: "WEB+IOS"     },
  { ticker: "VIBEQUEUE",         tag: "CONSUMER"    },
  { ticker: "MANIFEST",          tag: "LOGISTICS"   },
  { ticker: "POLYMARKET_TRADER", tag: "AUTOMATION"  },
  { ticker: "MODEL_RISK",        tag: "GOVERNANCE"  },
  { ticker: "SQL",               tag: null          },
  { ticker: "PYTHON",            tag: null          },
  { ticker: "R",                 tag: null          },
  { ticker: "SAS",               tag: null          },
  { ticker: "TABLEAU",           tag: null          },
  { ticker: "POWER_BI",          tag: null          },
  { ticker: "NEXT.JS",           tag: null          },
  { ticker: "TYPESCRIPT",        tag: null          },
];

function TickerItem({ ticker, tag }: { ticker: string; tag: string | null }) {
  return (
    <span
      className="font-mono inline-flex items-center gap-2 mr-10 text-[11px]"
      style={{ color: "var(--color-ornament)" }}
    >
      <span>{ticker}</span>
      <span>▲</span>
      {tag && <span>+{tag}</span>}
      <span style={{ marginLeft: "16px" }}>·</span>
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
        background:   "var(--color-surface-1)",
        borderTop:    "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      {/* LIVE_FEED label — absolute left edge with fade-out gradient */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3"
        style={{
          background:
            "linear-gradient(to right, var(--color-surface-1) 110px, transparent)",
        }}
      >
        <span
          className="font-mono text-[10px] uppercase"
          style={{ color: "var(--color-ornament)", letterSpacing: "0.14em" }}
        >
          LIVE_FEED
        </span>
      </div>

      {/* Row 1: left */}
      <div style={{ borderBottom: "1px solid var(--color-hairline)" }}>
        <Track cls="marquee-track" />
      </div>

      {/* Row 2: right */}
      <Track cls="marquee-track-reverse" />
    </div>
  );
}
