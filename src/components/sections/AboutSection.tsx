"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import dynamic from "next/dynamic";
import { SkillConstellation } from "@/components/effects/SkillConstellation";

// Dynamically import Canvas with SSR disabled
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[var(--card)]/50" />,
});

export function AboutSection() {
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
                I&apos;m <strong className="text-[var(--text)]">Om Narayan Pandit</strong> — an AI/ML
                engineer focused on building systems that work{" "}
                <strong className="text-[var(--text)]">beyond the lab</strong>. My work spans{" "}
                <strong className="text-[var(--text)]">
                  computer vision, NLP, generative AI,
                </strong>{" "}
                and{" "}
                <strong className="text-[var(--text)]">reinforcement learning</strong> — always
                with an eye on feasibility, not just accuracy.
              </p>
              <p>
                What sets me apart: I combine{" "}
                <strong className="text-[var(--text)]">technical depth</strong> with{" "}
                <strong className="text-[var(--text)]">business thinking</strong>. Alongside my
                B.Tech in AIML, I study{" "}
                <strong className="text-[var(--text)]">Business Management</strong> — because the
                best AI solutions understand the problem before the model.
              </p>
              <p>
                Currently exploring{" "}
                <strong className="text-[var(--text)]">NLP for cybersecurity</strong>,{" "}
                <strong className="text-[var(--text)]">Industry 5.0</strong>, and{" "}
                <strong className="text-[var(--text)]">spatial intelligence</strong>.
              </p>
            </div>
          </Reveal>

          {/* Skills - replaced with 3D Skill Constellation */}
          <Reveal delay={200}>
            <div className="w-full h-[300px] md:h-[400px]">
              <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 3] }}>
                <SkillConstellation />
              </Canvas>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
