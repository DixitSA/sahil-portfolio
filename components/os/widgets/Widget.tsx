import type { ReactNode } from "react";

/**
 * Widget shell. The translucent rounded tile a Big Sur widget sits in.
 *
 * Lives on its own rather than inside a specific widget, so adding a second
 * tile does not mean importing from an unrelated one.
 */
export default function Widget({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section
      // Full width on a phone, fixed in the desktop widget column. A 228px
      // card on a 375px screen wastes both margins and makes the text narrow.
      className="w-full p-3.5 lg:w-[228px]"
      style={{
        background: "var(--color-chrome-window)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        boxShadow: "var(--shadow-dock)",
      }}
    >
      <header className="mb-2.5">
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-ink)",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.14em",
              color: "var(--color-ink-faint)",
            }}
          >
            {subtitle}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
