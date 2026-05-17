import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeuralCanvas } from "@/components/effects/NeuralCanvas";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { HeroSection } from "@/components/sections/HeroSection";
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
