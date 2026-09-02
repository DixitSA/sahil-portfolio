"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { profile } from "@/content";
import { useIsCompact } from "@/lib/os/useIsCompact";

/**
 * Lock screen. macOS on a desktop, iOS on a phone.
 *
 * The two platforms lock differently, and copying one onto the other is the
 * kind of detail that gives a simulation away. macOS shows an account: avatar,
 * name, click to unlock. iOS shows none of that. It shows a padlock, the date,
 * an enormous thin clock, and swipe up to open.
 *
 * It never blocks. It auto-dismisses, any tap, key or upward swipe skips it,
 * it runs on the first visit only, and it never appears on a deep link, so
 * someone following a shared link to a case study sees the case study.
 *
 * Dismissal deliberately does NOT use AnimatePresence. An exit animation that
 * stalls would leave this mounted over the whole site with no way past it,
 * which is the same failure that broke mobile navigation. The fade is a CSS
 * class and the unmount is a timeout, so the two cannot deadlock.
 */

const subscribeToBootFlag = () => () => {};
const readBootFlag = () => sessionStorage.getItem("booted") !== null;
const readBootFlagOnServer = () => true;

const HOLD_MS = 2600;
const FADE_MS = 520;
/** Upward travel that counts as a deliberate swipe rather than a scroll nudge. */
const SWIPE_PX = 55;

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function BootScreen() {
  const deepLink = usePathname() !== "/";
  const compact = useIsCompact();
  const alreadyBooted = useSyncExternalStore(
    subscribeToBootFlag,
    readBootFlag,
    readBootFlagOnServer,
  );

  const [dismissed, setDismissed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());
  const reduce = useReducedMotion();
  const touchStartY = useRef<number | null>(null);

  const show = !alreadyBooted && !dismissed && !deepLink;

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem("booted", "1");
    } catch {
      /* private window. It simply shows again next load. */
    }
    setLeaving(true);
    // Unmount on a timer, never on animationend: a fade that never fires must
    // not be able to strand the lock screen on screen.
    window.setTimeout(() => setDismissed(true), reduce ? 0 : FADE_MS);
  }, [reduce]);

  useEffect(() => {
    if (!show || leaving) return;

    const tick = setInterval(() => setNow(new Date()), 1000);
    const timer = setTimeout(dismiss, reduce ? 0 : HOLD_MS);

    const onPointer = () => dismiss();
    const onKey = () => dismiss();
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStartY.current;
      const end = e.changedTouches[0]?.clientY;
      if (start != null && end != null && start - end > SWIPE_PX) dismiss();
      touchStartY.current = null;
    };

    window.addEventListener("pointerdown", onPointer, { once: true });
    window.addEventListener("keydown", onKey, { once: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      clearInterval(tick);
      clearTimeout(timer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [show, leaving, reduce, dismiss]);

  if (!show) return null;

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`fixed inset-0 ${leaving ? "lock-leave" : ""}`}
      style={{ zIndex: "var(--z-boot)" }}
      aria-hidden="true"
    >
      {/* Blurred wallpaper, the way a locked device dims what is behind it. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--wallpaper)",
          backgroundSize: "cover",
          filter: "blur(6px) saturate(120%) brightness(0.7)",
          transform: "scale(1.06)",
        }}
      />

      {compact ? <IOSLock time={time} date={date} /> : <MacLock time={time} date={date} />}
    </div>
  );
}

/* ── iOS ──────────────────────────────────────────────────────────── */

function IOSLock({ time, date }: { time: string; date: string }) {
  return (
    <div
      className="relative flex h-full flex-col items-center justify-between"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 20px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 18px)",
      }}
    >
      <div className="flex flex-col items-center pt-[9vh]">
        {/* Closed padlock. iOS leads with this, not with an account. */}
        <svg width="17" height="22" viewBox="0 0 17 22" fill="none" aria-hidden="true">
          <rect x="1.5" y="9" width="14" height="11.5" rx="3.2" fill="#fff" fillOpacity="0.92" />
          <path
            d="M4.6 9V5.9a3.9 3.9 0 0 1 7.8 0V9"
            stroke="#fff"
            strokeOpacity="0.92"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>

        <p
          className="mt-4"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 20,
            fontWeight: 500,
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 1px 8px rgba(0,0,0,0.45)",
          }}
        >
          {date}
        </p>

        {/* The clock is the whole screen on iOS. Very large, very light. */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(76px, 24vw, 108px)",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: "#fff",
            textShadow: "0 4px 26px rgba(0,0,0,0.4)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {time}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "rgba(255,255,255,0.72)",
            textShadow: "0 1px 6px rgba(0,0,0,0.5)",
          }}
        >
          Swipe up to open
        </p>

        {/* Home indicator. Drawn here because the lock screen covers the real
            one, unlike the rest of the site where the phone draws its own. */}
        <span
          className="block"
          style={{
            width: 134,
            height: 5,
            borderRadius: 999,
            background: "rgba(255,255,255,0.85)",
          }}
        />
      </div>
    </div>
  );
}

/* ── macOS ────────────────────────────────────────────────────────── */

function MacLock({ time, date }: { time: string; date: string }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-between">
      <div className="flex flex-col items-center pt-[12vh]">
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            fontWeight: 500,
            color: "rgba(255,255,255,0.86)",
            textShadow: "0 1px 6px rgba(0,0,0,0.5)",
          }}
        >
          {date}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(72px, 11vw, 132px)",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#fff",
            textShadow: "0 4px 24px rgba(0,0,0,0.45)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {time}
        </p>
      </div>

      <div className="flex flex-col items-center pb-[14vh]">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 84,
            height: 84,
            background: "linear-gradient(160deg, rgba(255,255,255,0.28), rgba(255,255,255,0.1))",
            border: "1px solid rgba(255,255,255,0.35)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: 26,
            letterSpacing: "0.06em",
          }}
        >
          {initialsOf(profile.name)}
        </div>

        <p
          className="mt-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            fontWeight: 500,
            color: "#fff",
            textShadow: "0 1px 6px rgba(0,0,0,0.5)",
          }}
        >
          {profile.name}
        </p>

        <p
          className="mt-6 uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.62)",
            textShadow: "0 1px 6px rgba(0,0,0,0.5)",
          }}
        >
          Click anywhere to unlock
        </p>
      </div>
    </div>
  );
}
