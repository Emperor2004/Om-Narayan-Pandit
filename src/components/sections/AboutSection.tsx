import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { skillCategories } from "@/data";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const colorMap = {
    accent: "bg-accent/8 border-accent/20 text-[var(--text)] hover:bg-accent/20 hover:border-accent hover:text-accent",
    cyan: "bg-cyan-glow/8 border-cyan-glow/20 text-[var(--text)] hover:bg-cyan-glow/20 hover:border-cyan-glow hover:text-cyan-glow",
    pink: "bg-pink-glow/8 border-pink-glow/20 text-[var(--text)] hover:bg-pink-glow/20 hover:border-pink-glow hover:text-pink-glow",
  };

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader
            label="01 · About Me"
            title={<>AI researcher &amp; <span className="gradient-text-cyan">builder</span></>}
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <Reveal delay={100}>
            <div className="space-y-4 text-[var(--muted)] leading-relaxed">
              <p>
                I&apos;m <strong className="text-[var(--text)]">Om Narayan Pandit</strong>, an aspiring
                AI/ML engineer passionate about building intelligent systems that solve real problems —
                not just impressive demos. My work spans{" "}
                <strong className="text-[var(--text)]">deep learning, computer vision, GANs</strong>,
                and <strong className="text-[var(--text)]">reinforcement learning</strong>.
              </p>
              <p>
                I care deeply about the <strong className="text-[var(--text)]">why</strong> behind AI
                systems — conceptual intuition, ethical responsibility, and feasibility under real
                constraints. I&apos;m particularly excited about{" "}
                <strong className="text-[var(--text)]">NLP for cybersecurity</strong>,{" "}
                <strong className="text-[var(--text)]">Industry 5.0</strong>, and{" "}
                <strong className="text-[var(--text)]">spatial intelligence</strong>.
              </p>
              <p>
                Currently in my final year of B.Tech, bridging research and real-world deployment.
                I believe great AI should be both{" "}
                <strong className="text-[var(--text)]">novel and actually useful</strong>.
              </p>
            </div>
          </Reveal>

          {/* Skills */}
          <Reveal delay={200}>
            <div className="space-y-6">
              {skillCategories.map((cat) => (
                <div key={cat.name}>
                  <div className="font-mono text-[0.68rem] text-[var(--muted)] uppercase tracking-widest mb-2">
                    {cat.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        data-cursor="pointer"
                        className={cn(
                          "font-mono text-[0.7rem] px-2.5 py-1 rounded-md border transition-all duration-200 cursor-none",
                          colorMap[cat.color]
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
