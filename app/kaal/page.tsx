import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import KaalApp from "@/components/kaal/KaalApp";
import { playfair, quattrocento } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Kaal live demo",
  description: "Compute a real Vedic birth chart with Kaal's production engine.",
};

export default function Page() {
  return (
    <div className={`${playfair.variable} ${quattrocento.variable} wrap max-w-3xl pt-[120px] pb-24`}>
      <Link href="/work/kaal" className="link mb-8 inline-flex min-h-11 items-center gap-2">
        <ArrowLeft size={16} aria-hidden />
        Kaal case study
      </Link>
      <h1 className="t-h2">Kaal&apos;s chart engine, running live</h1>
      <p className="t-lead mt-6 mb-12 max-w-[56ch] text-ink-2">
        Enter a birth date, time and place. The production engine computes the chart, and the
        same input returns the same output every time.
      </p>
      <div className="overflow-hidden rounded-[6px] border border-rule">
        <KaalApp />
      </div>
    </div>
  );
}
