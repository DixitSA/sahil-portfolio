import { BrowserFrame, PhoneFrame } from "./Frames";

const DASH_ALT =
  "Kaal on iPhone, showing the current phase, today's guidance and a Wait decision for career.";
const LANDING_ALT =
  "Kaal on the web: the birth-details form under \"Know what's happening. Know what to do.\"";

function Composition() {
  return (
    <>
      <BrowserFrame
        src="/previews/kaal-landing.png"
        w={1600}
        h={1280}
        alt={LANDING_ALT}
        url="getkaal.com"
        sizes="(min-width: 1440px) 800px, 58vw"
        className="absolute left-[6%] top-[9%] w-[60%]"
      />
      <PhoneFrame
        src="/previews/kaal-dashboard.png"
        alt={DASH_ALT}
        sizes="(min-width: 1440px) 300px, 36vw"
        className="absolute right-[7%] top-[16%] w-[26%]"
      />
    </>
  );
}

/**
 * Kaal: web and iPhone from one codebase, shown rather than captioned.
 * "work" is the composition; fill makes it fill a pinned-stage layer (the parent is the stage),
 * otherwise it is a self-contained inline stage. "hero" is the dashboard on its own.
 */
export default function KaalVisual({
  variant = "work",
  fill = false,
  className = "",
}: {
  variant?: "hero" | "work";
  fill?: boolean;
  className?: string;
}) {
  if (variant === "hero") {
    return (
      <div className={`stage h-[380px] ${className}`}>
        <PhoneFrame
          src="/previews/kaal-dashboard.png"
          alt={DASH_ALT}
          sizes="200px"
          className="absolute right-[8%] top-[10%] w-[36%] max-w-[260px]"
        />
      </div>
    );
  }
  if (fill) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <Composition />
      </div>
    );
  }
  return (
    <div className={`stage h-[260px] sm:h-[380px] ${className}`}>
      <Composition />
    </div>
  );
}
