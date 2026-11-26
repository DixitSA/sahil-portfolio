import Hero from "@/components/site/Hero";
import Work from "@/components/site/Work";
import Evidence from "@/components/site/Evidence";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";

/**
 * One page, ordered as an argument: claim (hero), proof of building (work),
 * proof of results at work (evidence), the person (about), the ask (contact).
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Work />
      <Evidence />
      <About />
      <Contact />
    </>
  );
}
