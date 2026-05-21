/* Pure-CSS infinite marquee — no JS animation library */
const ITEMS =
  "Strategy · AI Compliance · Consumer Analytics · SQL · Python · R · SAS · Next.js · Prisma · Twilio · Stripe · Tableau · PowerBI · Prediction Markets · Spotify API · SMS Automation · Vedic Astrology · A/B Testing · ";

const track = (cls: string) => (
  <div className="overflow-hidden border-t border-b border-white/[0.06] h-[60px] flex items-center">
    <div className={`flex whitespace-nowrap w-max ${cls}`}>
      {/* Duplicate for seamless loop */}
      {[ITEMS, ITEMS].map((t, i) => (
        <span
          key={i}
          className="text-xs text-white/50 tracking-widest uppercase px-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

export default function Marquee() {
  return (
    <div className="select-none pointer-events-none" aria-hidden="true">
      {track("marquee-track")}
      {track("marquee-track-reverse")}
    </div>
  );
}
