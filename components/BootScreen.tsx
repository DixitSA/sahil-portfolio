"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "@/content";

/**
 * Lock screen.
 *
 * Replaces the old terminal boot sequence. macOS does not print a boot log,
 * it shows a wallpaper, the time, and who you are, so this does the same:
 * blurred wallpaper, large light-weight clock, avatar, name, unlock hint.
 *
 * It never blocks. It auto-dismisses, and any click or key press skips it,
 * because a recruiter should never be gated behind an animation. It also
 * runs on the first visit only, and never on a deep link, so someone who
 * lands on /work/kaal from a shared URL sees the case study immediately.
 */

const subscribeToBootFlag = () => () => {};
const readBootFlag = () => sessionStorage.getItem("booted") !== null;
const readBootFlagOnServer = () => true;

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function BootScreen() {
  // A deep link means someone followed a shared URL to specific content.
  // Making them watch an unlock animation first is a hostile pattern.
  const deepLink = usePathname() !== "/";
  const alreadyBooted = useSyncExternalStore(
    subscribeToBootFlag,
    readBootFlag,
    readBootFlagOnServer,
  );
  const [dismissed, setDismissed] = useState(false);
  // Lazy initialiser rather than a setState in the effect. Safe against
  // hydration because this subtree only renders once `show` is true, which
  // cannot happen during SSR.
  const [now, setNow] = useState<Date>(() => new Date());
  const reduce = useReducedMotion();

  const show = !alreadyBooted && !dismissed && !deepLink;

  useEffect(() => {
    if (!show) return;

    const tick = setInterval(() => setNow(new Date()), 1000);

    const dismiss = () => {
      sessionStorage.setItem("booted", "1");
      setDismissed(true);
    };

    // Any interaction skips straight through.
    window.addEventListener("pointerdown", dismiss, { once: true });
    window.addEventListener("keydown", dismiss, { once: true });

    const hold = reduce ? 0 : 2400;
    const timer = setTimeout(dismiss, hold);

    return () => {
      clearInterval(tick);
      clearTimeout(timer);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, [show, reduce]);

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
    <AnimatePresence>
      {show && (
        <motion.div
          key="lock"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          transition={reduce ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-between"
          style={{ zIndex: "var(--z-boot)" }}
          aria-hidden="true"
        >
          {/* Blurred wallpaper, the way a locked Mac dims its desktop. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "var(--wallpaper)",
              backgroundSize: "cover",
              filter: "blur(6px) saturate(120%) brightness(0.72)",
              transform: "scale(1.06)",
            }}
          />

          {/* Clock */}
          <div className="relative flex flex-col items-center pt-[12vh]">
            <p
              className="font-body"
              style={{
                fontSize: 17,
                fontWeight: 500,
                color: "rgba(255,255,255,0.86)",
                textShadow: "0 1px 6px rgba(0,0,0,0.5)",
              }}
            >
              {date}
            </p>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(72px, 11vw, 132px)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                textShadow: "0 4px 24px rgba(0,0,0,0.45)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {time}
            </p>
          </div>

          {/* Account */}
          <div className="relative flex flex-col items-center pb-[14vh]">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 84,
                height: 84,
                background: "linear-gradient(160deg, rgba(255,255,255,0.28), rgba(255,255,255,0.1))",
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: 26,
                letterSpacing: "0.06em",
              }}
            >
              {initialsOf(profile.name)}
            </div>

            <p
              className="font-body mt-3"
              style={{
                fontSize: 17,
                fontWeight: 500,
                color: "#ffffff",
                textShadow: "0 1px 6px rgba(0,0,0,0.5)",
              }}
            >
              {profile.name}
            </p>

            <p
              className="font-mono mt-6 uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.62)",
                textShadow: "0 1px 6px rgba(0,0,0,0.5)",
              }}
            >
              Click anywhere to unlock
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
