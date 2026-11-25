import Hero from "@/components/site/Hero";
import Proof from "@/components/site/Proof";
import Work from "@/components/site/Work";
import Experience from "@/components/site/Experience";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";

/**
 * One page, ordered as an argument: claim (hero), evidence (numbers), proof
 * of building (work), proof of institutional trust (experience), the person
 * (about), the ask (contact). A recruiter who stops after the first screen
 * still leaves with the thesis, the employer and the numbers.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Proof />
      <Work />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
