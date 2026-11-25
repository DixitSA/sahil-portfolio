import type { Metadata } from "next";
import Link from "next/link";
import KaalApp from "@/components/kaal/KaalApp";

export const metadata: Metadata = {
  title: "Kaal live demo",
  description:
    "Kaal running live: compute a real Vedic birth chart against the production engine.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pt-32 pb-24 sm:px-8">
      <Link
        href="/work/kaal"
        className="mb-8 inline-flex min-h-11 items-center text-[14px] text-[var(--color-ink-subtle)] transition-colors hover:text-[var(--color-ink)]"
      >
        ← Kaal case study
      </Link>
      <p className="eyebrow mb-5 flex items-center gap-3">
        <span className="live-dot" aria-hidden />
        Live demo
      </p>
      <h1 className="display text-[clamp(40px,6vw,72px)]">
        Kaal, running <span className="serif-em">live</span>
      </h1>
      <p className="mt-6 mb-12 max-w-xl text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
        Compute a real Vedic birth chart against Kaal&apos;s production engine. Same input,
        same output, every time.
      </p>
      <div className="overflow-hidden rounded-3xl border border-[var(--color-line)]">
        <KaalApp />
      </div>
    </main>
  );
}
