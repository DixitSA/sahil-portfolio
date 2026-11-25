import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80svh] w-full max-w-6xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <p className="eyebrow mb-6 !text-[var(--color-signal)]">404</p>
      <h1 className="display max-w-[16ch] text-[clamp(44px,7vw,96px)]">
        This page doesn&apos;t <span className="serif-em">exist</span>.
      </h1>
      <p className="mt-6 text-[17px] text-[var(--color-ink-muted)]">
        The link may be old, or the address mistyped.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 items-center rounded-full bg-[var(--color-ink)] px-7 text-[15px] font-medium text-[var(--color-canvas)] transition-opacity hover:opacity-85"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
