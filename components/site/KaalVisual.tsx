import { BrowserFrame, PhoneFrame } from "./Frames";

const DASH_ALT =
  "Kaal on iPhone, showing the current phase, today's guidance and a Wait decision for career.";
const LANDING_ALT =
  "Kaal on the web: the birth-details form under \"Know what's happening. Know what to do.\"";

/**
 * Kaal: web and iPhone from one codebase, shown rather than captioned.
 * "work" is the full-width composition; "hero" is the dashboard on its own.
 */
export default function KaalVisual({ variant = "work" }: { variant?: "hero" | "work" }) {
  if (variant === "hero") {
    return (
      <div className="stage h-[380px]">
        <PhoneFrame
          src="/previews/kaal-dashboard.png"
          alt={DASH_ALT}
          sizes="200px"
          className="absolute right-[8%] top-[10%] w-[36%] max-w-[260px]"
        />
      </div>
    );
  }
  return (
    <div className="stage h-[clamp(300px,42vw,620px)]">
      <BrowserFrame
        src="/previews/kaal-landing.png"
        w={1600}
        h={1280}
        alt={LANDING_ALT}
        url="getkaal.com"
        sizes="(min-width: 1440px) 800px, 58vw"
        className="absolute left-[5%] top-[8%] w-[58%]"
      />
      <PhoneFrame
        src="/previews/kaal-dashboard.png"
        alt={DASH_ALT}
        sizes="(min-width: 1440px) 300px, 36vw"
        className="absolute right-[8%] top-[10%] w-[36%] lg:w-[22%]"
      />
    </div>
  );
}
