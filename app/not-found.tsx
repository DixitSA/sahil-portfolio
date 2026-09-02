import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p
        className="mb-4 text-[11px] uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-label)",
          letterSpacing: "0.22em",
        }}
      >
        {"// ERROR 404"}
      </p>

      <h1
        className="mb-6 uppercase"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(34px, 5vw, 60px)",
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: "var(--color-ink)",
        }}
      >
        No such file
      </h1>

      <p
        className="mb-8 max-w-md"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: 1.7,
          color: "var(--color-ink-muted)",
        }}
      >
        That path does not resolve to anything on this system.
      </p>

      <Link
        href="/"
        className="inline-block border px-6 py-3 underline-offset-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          color: "var(--color-primary)",
          borderColor: "var(--color-primary)",
        }}
      >
        {"> RETURN TO DESKTOP"}
      </Link>
    </div>
  );
}
