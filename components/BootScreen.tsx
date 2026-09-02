"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const lines = [
  { text: "LOADING SAHIL_DIXIT_OS v1.0...", delay: 0 },
  { text: "INITIALIZING MODULES...",        delay: 0.8 },
  { text: "READY.",                         delay: 1.4 },
];

/* sessionStorage is an external store, so it is read through
   useSyncExternalStore rather than copied into state inside an effect. The
   server snapshot reports "already booted" so nothing renders during SSR. */
const subscribeToBootFlag = () => () => {};
const readBootFlag = () => sessionStorage.getItem("booted") !== null;
const readBootFlagOnServer = () => true;

export default function BootScreen() {
  const alreadyBooted = useSyncExternalStore(
    subscribeToBootFlag,
    readBootFlag,
    readBootFlagOnServer,
  );
  const [dismissed, setDismissed] = useState(false);
  const reduce = useReducedMotion();

  const show = !alreadyBooted && !dismissed;

  useEffect(() => {
    if (!show) return;

    // Reduced motion skips the sequence outright rather than replaying it fast.
    const hold = reduce ? 0 : 2200;
    const timer = setTimeout(() => {
      sessionStorage.setItem("booted", "1");
      setDismissed(true);
    }, hold);

    return () => clearTimeout(timer);
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: "var(--color-canvas)", zIndex: "var(--z-boot)" }}
          aria-hidden="true"
        >
          {lines.map((line) => (
            <motion.p
              key={line.text}
              className="font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.25, delay: line.delay, ease: "easeOut" }
              }
              style={{
                fontSize:      "14px",
                color:         "var(--color-primary)",
                letterSpacing: "0.05em",
              }}
            >
              {line.text}
            </motion.p>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
