import type { CSSProperties, ReactNode } from "react";

/**
 * Content primitives for window bodies.
 *
 * Two problems these solve.
 *
 * 1. Structure. Content used to sit flush against the title bar as
 *    undifferentiated prose, which read as a text file dropped into a window
 *    rather than a Mac app's content view. macOS groups content into inset
 *    rounded boxes with hairline separators, and gives every view a real
 *    header. That is what `DocHeader`, `Group` and `Row` provide.
 *
 * 2. Voice. The display face was uppercase JetBrains Mono, which is the
 *    terminal register the shell no longer speaks. macOS uses one humanist
 *    sans everywhere and reserves mono for code, so display and body are now
 *    Geist and mono is kept for the things that are genuinely technical:
 *    tags, status, indices, paths, metrics.
 */

/* ── Type roles ──────────────────────────────────────────────────── */

export const title: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "clamp(28px, 3.4vw, 40px)",
  fontWeight: 500,
  lineHeight: 1.1,
  letterSpacing: "-0.025em",
  color: "var(--color-ink)",
};

export const sectionTitle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 19,
  fontWeight: 500,
  lineHeight: 1.3,
  letterSpacing: "-0.012em",
  color: "var(--color-ink)",
};

export const lead: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.6,
  color: "var(--color-ink-muted)",
};

export const body: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1.65,
  color: "var(--color-ink-muted)",
};

/** Mono is now a supporting voice: technical values, not headlines. */
export const mono: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  color: "var(--color-ink-subtle)",
};

export const label: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--color-ink-subtle)",
};

/* ── Layout ──────────────────────────────────────────────────────── */

/** Every window body gets the same inset. Content never touches the frame. */
export function Doc({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-2xl px-8 py-8">{children}</div>;
}

export function DocHeader({
  heading,
  subtitle,
  meta,
  as: As = "h1",
}: {
  heading: string;
  subtitle?: string;
  meta?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <header className="mb-8">
      <As style={title}>{heading}</As>
      {subtitle && (
        <p className="mt-2 max-w-xl" style={lead}>
          {subtitle}
        </p>
      )}
      {meta && <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">{meta}</div>}
    </header>
  );
}

/** Section heading above a Group. */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3" style={sectionTitle}>
      {children}
    </h2>
  );
}

/** macOS-style inset group box. Rows inside are separated by hairlines. */
export function Group({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        background: "var(--color-group)",
        border: "1px solid var(--color-group-border)",
        borderRadius: "var(--radius-group)",
      }}
    >
      {children}
    </div>
  );
}

/** One row in a Group. Dividers come from the row, not the container. */
export function Row({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`px-4 py-3 ${className}`}
      style={{ borderTop: "1px solid var(--color-row-divider)" }}
    >
      {children}
    </div>
  );
}

/** Label/value row, the macOS settings pattern. */
export function FieldRow({ name, value }: { name: string; value: ReactNode }) {
  return (
    <Row className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 first:border-t-0">
      <span style={{ ...body, fontSize: 14, color: "var(--color-ink-subtle)" }}>{name}</span>
      <span style={{ ...body, fontSize: 14, color: "var(--color-ink)" }}>{value}</span>
    </Row>
  );
}

/** Small technical chip. Mono lives here now, not in headlines. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      className="px-2 py-[3px]"
      style={{
        ...mono,
        fontSize: 11,
        borderRadius: 5,
        background: "var(--color-group)",
        border: "1px solid var(--color-group-border)",
        color: "var(--color-ink-subtle)",
      }}
    >
      {children}
    </span>
  );
}

/** Live status. Green stays reserved for genuinely live state. */
export function Status({ value }: { value: string }) {
  const live = value === "LIVE" || value === "ACTIVE";
  return (
    <span
      style={{
        ...mono,
        fontSize: 11,
        color: live ? "var(--color-primary)" : "var(--color-ink-subtle)",
      }}
    >
      <span aria-hidden="true">● </span>
      {value}
    </span>
  );
}

/** Outbound link, styled as a macOS accent link rather than a terminal path. */
export function DocLink({
  href,
  children,
  external = true,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="underline-offset-4 hover:underline"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 14,
        fontWeight: 500,
        color: "var(--link-accent)",
      }}
    >
      {children}
    </a>
  );
}
