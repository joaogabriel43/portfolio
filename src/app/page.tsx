import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Specs } from "@/components/sections/Specs";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <FeaturedProject />
        <Specs />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
