import { Fragment, Suspense } from "react";
import { ArrowDown } from "lucide-react";
import { profile } from "@/content";
import HeroShader from "./HeroShader";
import ForCompany from "./ForCompany";
import { BrowserFrame, PhoneFrame } from "./Frames";

const HEADLINE = "Startup growth, from the SQL query to the shipped app.".split(" ");

const CONTEXT =
  "Now: Strategy & Management Analyst at Bank of America, Charlotte. Before: Capital One, Alliant Insurance Services.";

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="min-h-[100svh] pt-[88px] pb-6 lg:pt-[120px] lg:pb-14"
    >
      <div className="wrap lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col lg:col-span-6">
          <Suspense fallback={null}>
            <ForCompany />
          </Suspense>

          <h1 className="t-display">
            {HEADLINE.map((word, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="mask">
                  <span className="enter-word" style={{ "--i": i } as React.CSSProperties}>
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
          </h1>

          <p className="t-lead enter-fade mt-6 max-w-[44ch] text-ink-2" style={{ animationDelay: "380ms" }}>
            I&rsquo;m Sahil Dixit. I find the number that matters, test it, and write the code myself.
            Kaal is live on web and iOS after <span className="answer answer--draw">277 commits</span>.
            Next: a technical growth role at a startup.
          </p>

          <div className="enter-fade mt-8 flex gap-3" style={{ animationDelay: "440ms" }}>
            <a href="#work" className="btn btn-primary flex-1 sm:flex-none">
              See the work
              <ArrowDown aria-hidden className="nudge h-4 w-4" />
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-secondary flex-1 sm:flex-none">
              Email me
            </a>
          </div>

          <p className="t-meta mt-auto hidden max-w-[52ch] pt-8 lg:block">{CONTEXT}</p>
        </div>

        <div className="mt-8 lg:col-span-6 lg:mt-0">
          <div className="stage enter-stage h-[260px] sm:h-[380px] lg:h-[clamp(520px,calc(100svh_-_176px),720px)]">
            <HeroShader />
            <BrowserFrame
              src="/previews/vazaar.jpg"
              w={1920}
              h={1080}
              alt="Vazaar landing page: The underwriting AI market, in one place."
              url="vazaar-site.vercel.app"
              sizes="(min-width: 1024px) 40vw, 80vw"
              eager
              className="absolute left-[4%] top-[8%] w-[80%] lg:left-[5%] lg:top-[9%] lg:w-[70%]"
            />
            <PhoneFrame
              src="/previews/kaal-dashboard.png"
              alt="Kaal on iPhone, showing the current phase, today's guidance and a Wait decision for career."
              sizes="(min-width: 1024px) 20vw, 42vw"
              eager
              className="absolute right-[5%] top-[12%] w-[42%] lg:right-[6%] lg:w-[32%]"
            />
          </div>
          <p className="t-meta mt-5 lg:hidden">{CONTEXT}</p>
        </div>
      </div>
    </section>
  );
}
