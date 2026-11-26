import { Suspense } from "react";
import { ArrowDown } from "lucide-react";
import { profile } from "@/content";
import ContourField from "./ContourField";
import DescentPath from "./DescentPath";
import ForCompany from "./ForCompany";
import { BrowserFrame } from "./Frames";

const LINES = ["Put AI to work.", "Check its work.", "Ship what passes."];

const CONTEXT =
  "Now: Strategy & Management Analyst at Bank of America, Charlotte. Before: Capital One, Alliant Insurance Services.";

export default function Hero() {
  return (
    <section
      data-cf-host
      data-cf-intro="load"
      aria-label="Introduction"
      className="cf-host relative overflow-hidden"
    >
      <ContourField tone="paper" className="cf-mask-hero" />
      <div className="wrap relative z-10 flex min-h-[100svh] flex-col pt-[88px] pb-6 lg:pt-[112px] lg:pb-12">
        <Suspense fallback={null}>
          <ForCompany />
        </Suspense>

        <h1 className="t-hero">
          {LINES.map((line, i) => (
            <span key={line} className="hl">
              <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
            </span>
          ))}
        </h1>

        <DescentPath className="my-3 h-[104px] lg:absolute lg:right-12 lg:top-[12%] lg:my-0 lg:h-[40%] lg:w-[24%] xl:right-16" />

        <p
          className="t-meta enter-fade mb-4 text-center lg:absolute lg:top-[50%] lg:right-12 lg:mb-0 lg:max-w-[24%] lg:text-right xl:right-16"
          style={{ animationDelay: "900ms" }}
        >
          <span className="hint-fine">Move to disturb the surface. Click to start a new descent.</span>
          <span className="hint-touch">Tap to start a new descent.</span>
        </p>

        <BrowserFrame
          src="/previews/vazaar.jpg"
          w={1920}
          h={1080}
          alt="Vazaar landing page: The underwriting AI market, in one place."
          url="vazaar-site.vercel.app"
          sizes="(min-width:1024px) 52vw, 100vw"
          eager
          className="enter-print w-full lg:absolute lg:bottom-[-56px] lg:right-12 lg:w-[min(52%,calc((100svh_-_400px)*1.6))] xl:right-16"
        />

        <div className="mt-6 lg:mt-auto lg:max-w-[560px]">
          <p className="t-lead enter-fade max-w-[46ch] text-ink-2" style={{ animationDelay: "480ms" }}>
            I&rsquo;m Sahil Dixit. I put AI models to work and build the checks that make them hold up. At Bank of
            America, a governed Copilot workflow cut slide turnaround from hours to{" "}
            <span className="answer" data-land>
              about 15 minutes
            </span>
            . Next: an AI strategy role at a startup.
          </p>

          <div className="enter-fade mt-8 flex gap-3" style={{ animationDelay: "560ms" }}>
            <a href="#work" className="btn btn-primary flex-1 sm:flex-none">
              See the work
              <ArrowDown aria-hidden className="nudge h-4 w-4" />
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-secondary flex-1 sm:flex-none">
              Email me
            </a>
          </div>

          <p className="t-meta enter-fade mt-6 max-w-[52ch]" style={{ animationDelay: "640ms" }}>
            {CONTEXT}
          </p>
        </div>
      </div>
    </section>
  );
}
