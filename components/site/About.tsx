import { profile } from "@/content";
import Reveal, { SectionHead } from "./Reveal";

const cardCls =
  "rounded-2xl border border-[var(--color-line)] bg-[var(--color-raised)] p-6 sm:p-7";

function splitTheme(item: string): [string, string] {
  const i = item.indexOf(". ");
  return i === -1 ? ["", item] : [item.slice(0, i + 1), item.slice(i + 2)];
}

export default function About() {
  const paras = profile.bio.slice(1);
  const closer = paras.length > 1 ? paras[paras.length - 1] : undefined;
  const body = closer ? paras.slice(0, -1) : paras;
  const ribbon = profile.skills.flatMap((g) => g.items);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-[var(--color-line)] py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="03"
          eyebrow="About"
          title={
            <span id="about-title">
              Where finance, regulation and code have to <span className="serif-em">agree</span>
            </span>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="space-y-6">
            {body.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[17px] leading-[1.7] text-[var(--color-ink-muted)]">{p}</p>
              </Reveal>
            ))}
            {closer && (
              <Reveal delay={body.length * 0.06}>
                <p className="border-l-2 border-[var(--color-signal)] pt-1 pb-1 pl-5 text-[clamp(20px,2.4vw,26px)] leading-[1.3] font-normal tracking-[-0.03em] text-[var(--color-ink)]">
                  {closer}
                </p>
              </Reveal>
            )}
          </div>

          <div className="space-y-5">
            {profile.now && (
              <Reveal>
                <div className={cardCls}>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <p className="eyebrow flex items-center gap-2.5">
                      <span className="live-dot" aria-hidden />
                      Now
                    </p>
                    <p className="font-mono text-[11px] text-[var(--color-ink-subtle)]">
                      Updated {profile.now.updated}
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {profile.now.items.map((item) => {
                      const [theme, rest] = splitTheme(item);
                      return (
                        <li key={item} className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                          {theme && <span className="font-medium text-[var(--color-ink)]">{theme} </span>}
                          {rest}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.08}>
              <div className={cardCls}>
                <p className="eyebrow mb-4">Education</p>
                <p className="text-[17px] text-[var(--color-ink)]">{profile.education.school}</p>
                <p className="mt-1 text-[14.5px] text-[var(--color-ink-muted)]">{profile.education.degree}</p>
                <p className="mt-1 text-[14.5px] text-[var(--color-ink-muted)]">{profile.education.detail}</p>
                <p className="mt-3 font-mono text-[12px] text-[var(--color-ink-subtle)]">
                  Graduated {profile.education.graduated}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className={cardCls}>
                <p className="eyebrow mb-5">Toolkit</p>
                <div className="space-y-5">
                  {profile.skills.map((g) => (
                    <div key={g.group}>
                      <p className="eyebrow mb-2.5">{g.group}</p>
                      <ul className="flex flex-wrap gap-2">
                        {g.items.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-[13px] text-[var(--color-ink-muted)]"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div
        className="group mt-20 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div className="flex w-max [animation:marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              aria-label={copy === 0 ? "Skills" : undefined}
              className="flex shrink-0 items-center"
            >
              {ribbon.map((s, i) => (
                <li key={s} className="flex items-center">
                  <span
                    className={`display px-6 text-[clamp(28px,4vw,40px)] whitespace-nowrap text-[var(--color-ink-subtle)] ${
                      i % 2 === 1 ? "serif-em" : ""
                    }`}
                  >
                    {s}
                  </span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--color-line-strong)]" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
