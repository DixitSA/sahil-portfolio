import { profile } from "@/content";

function splitTheme(item: string): [string, string] {
  const i = item.indexOf(". ");
  return i === -1 ? ["", item] : [item.slice(0, i + 1), item.slice(i + 2)];
}

export default function About() {
  const [, proof, ...rest] = profile.bio;

  return (
    <section id="about" aria-labelledby="about-title" className="py-[88px] lg:py-32">
      <div className="wrap">
        <h2 id="about-title" className="t-h2">
          How I work
        </h2>

        <div className="mt-10 grid gap-16 lg:mt-14 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <p className="t-statement text-[clamp(20px,1vw+14px,28px)]! text-ink">{proof}</p>
            <div className="mt-8 max-w-[60ch] space-y-6">
              {rest.map((p) => (
                <p key={p} className="text-ink-2">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            {profile.now && (
              <>
                <h3 className="t-result">Now</h3>
                <p className="t-meta mt-1">Updated {profile.now.updated}</p>
                <ul className="mt-5 space-y-4">
                  {profile.now.items.map((item) => {
                    const [theme, body] = splitTheme(item);
                    return (
                      <li key={item} className="text-ink-2">
                        {theme && <span className="font-semibold text-ink">{theme} </span>}
                        {body}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            <h3 className="t-result mt-12">Tools</h3>
            <dl>
              {profile.skills.map((g) => (
                <div key={g.group}>
                  <dt className="mt-5 text-[15px] font-semibold text-ink">{g.group}</dt>
                  <dd className="text-ink-2">{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
