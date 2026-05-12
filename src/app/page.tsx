import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeuralCanvas } from "@/components/effects/NeuralCanvas";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SectionTransition } from "@/components/ui/SectionTransition";
import dynamic from "next/dynamic";

// Dynamically import HeroSection with SSR disabled to prevent hydration errors
const HeroSection = dynamic(() => import("@/components/sections/HeroSection").then((mod) => mod.HeroSection), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[var(--muted)] font-mono text-sm">Loading...</p>
    </div>
  </div>,
});
import { StatsBar } from "@/components/sections/StatsBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <NeuralCanvas />
      <Navbar />
 
      <main>
        <HeroSection />
        <SectionTransition id="stats" delay={1}>
          <StatsBar />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="about" delay={2}>
          <AboutSection />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="projects" delay={3}>
          <ProjectsSection />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="publications" delay={4}>
          <PublicationsSection />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="blog" delay={5}>
          <BlogSection />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="education" delay={6}>
          <EducationSection />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="contact" delay={7}>
          <ContactSection />
        </SectionTransition>
      </main>
 
      <Footer />
    </>
  );
}
