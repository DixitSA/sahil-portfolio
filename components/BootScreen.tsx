"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  { text: "LOADING SAHIL_DIXIT_OS v1.0...", delay: 0 },
  { text: "INITIALIZING MODULES...",        delay: 0.8 },
  { text: "READY.",                         delay: 1.4 },
];

export default function BootScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) return;

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("booted", "1");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex flex-col items-center justify-center gap-3"
          aria-hidden="true"
        >
          {lines.map((line) => (
            <motion.p
              key={line.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: line.delay, ease: "easeOut" }}
              style={{
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontSize: "14px",
                color: "#00ff41",
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
