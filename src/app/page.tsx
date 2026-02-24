import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeuralCanvas } from "@/components/effects/NeuralCanvas";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
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
        <StatsBar />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <PublicationsSection />
        <div className="section-divider" />
        <BlogSection />
        <div className="section-divider" />
        <EducationSection />
        <div className="section-divider" />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
