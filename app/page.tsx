import BootScreen from "@/components/BootScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] overflow-x-hidden">
      <BootScreen />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Work />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
