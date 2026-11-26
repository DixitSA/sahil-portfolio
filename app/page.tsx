import Hero from "@/components/site/Hero";
import Thesis from "@/components/site/Thesis";
import { profile } from "@/content";
import Work from "@/components/site/Work";
import Evidence from "@/components/site/Evidence";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";

/**
 * One page, ordered as an argument: claim (hero), thesis, proof of building (work),
 * proof of results at work (evidence), the person (about), the ask (contact).
 */
export default function Page() {
  return (
    <>
      <Hero />
      <section id="thesis" aria-labelledby="thesis-title" className="py-[96px] lg:py-[18svh]">
        <div className="wrap">
          <h2 id="thesis-title" className="sr-only">
            What I do
          </h2>
          <Thesis text={profile.bio[0]} />
        </div>
      </section>
      <Work />
      <Evidence />
      <About />
      <Contact />
    </>
  );
}
