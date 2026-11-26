import { ArrowDown } from "lucide-react";
import { profile, roles } from "@/content";

function Result({ result, answer }: { result: string; answer: string }) {
  if (!result.includes(answer)) {
    throw new Error(`Evidence result "${result}" does not contain answer "${answer}"`);
  }
  const i = result.indexOf(answer);
  return (
    <>
      {result.slice(0, i)}
      <span className="answer">{answer}</span>
      {result.slice(i + answer.length)}
    </>
  );
}

export default function Evidence() {
  const { education } = profile;

  return (
    <section id="evidence" aria-labelledby="evidence-title" className="on-field py-[88px] lg:py-32">
      <div className="wrap">
        <h2 id="evidence-title" className="t-h2 max-w-[22ch]">
          Experiments and analysis at work
        </h2>
        <p className="t-lead mt-4 max-w-[60ch]">
          Before the products, the same loop inside large companies: find the friction in the data,
          test a change, get it adopted.
        </p>

        <ol className="mt-12">
          {profile.evidence.map((e) => (
            <li
              key={e.result}
              className="grid gap-2 border-t border-rule-field py-7 lg:grid-cols-12 lg:gap-6"
            >
              <p className="t-result lg:col-span-5">
                <Result result={e.result} answer={e.answer} />
              </p>
              <p className="max-w-[68ch] lg:col-span-5 lg:col-start-6">{e.method}</p>
              <p className="t-meta lg:col-span-2 lg:text-right">{e.where}</p>
            </li>
          ))}
        </ol>

        <h3 className="t-result mt-16">Roles</h3>
        <ul className="mt-6">
          {roles.map((r) => (
            <li
              key={r.id}
              className="grid gap-x-6 gap-y-1 border-t border-rule-field py-4 md:grid-cols-[2fr_3fr_2fr]"
            >
              <span className="font-semibold text-on-field">{r.company}</span>
              <span>{r.title}</span>
              <span className="t-meta md:text-right">{r.period}</span>
            </li>
          ))}
          <li className="grid gap-x-6 gap-y-1 border-t border-b border-rule-field py-4 md:grid-cols-[2fr_3fr_2fr]">
            <span className="font-semibold text-on-field">{education.school}</span>
            <span>{education.degree}</span>
            <span className="t-meta md:text-right">{education.graduated}</span>
          </li>
        </ul>

        <a
          href="/Sahil_Dixit_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-8 inline-flex min-h-[44px] items-center gap-2"
        >
          Get the full résumé (PDF)
          <ArrowDown size={16} aria-hidden className="nudge" />
        </a>
      </div>
    </section>
  );
}
