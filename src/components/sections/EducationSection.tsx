import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { timeline, achievements } from "@/data";

export function EducationSection() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader
            label="05 · Background"
            title={<>Education &amp; <span className="gradient-text-cyan">journey</span></>}
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Timeline */}
          <div>
            <div className="font-mono text-[0.68rem] text-[var(--muted)] uppercase tracking-widest mb-6">
              Academic
            </div>
            <div className="relative pl-7 border-l border-gradient-to-b from-accent to-accent/0" style={{ borderImage: "linear-gradient(to bottom, #6366f1, rgba(99,102,241,0)) 1" }}>
              {timeline.map((item, i) => (
                <Reveal key={item.id} delay={i * 100}>
                  <div className="relative pb-10 last:pb-5">
                    {/* Dot */}
                    <div className="absolute -left-[1.85rem] top-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-[var(--bg)] shadow-[0_0_12px_rgba(99,102,241,0.6)]" />

                    <div className="font-mono text-[0.7rem] text-accent mb-1">{item.date}</div>
                    <h3 className="font-syne font-bold text-base mb-0.5">{item.title}</h3>
                    <p className="text-[var(--muted)] text-sm mb-2">{item.institution}</p>
                    <p className="text-[var(--muted)] text-sm leading-relaxed">{item.description}</p>
                    {item.badge && (
                      <Badge variant="accent" className="mt-2">{item.badge}</Badge>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="font-mono text-[0.68rem] text-[var(--muted)] uppercase tracking-widest mb-6">
              Achievements &amp; Involvement
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <Reveal key={a.id} delay={i * 60}>
                  <div
                    data-cursor="pointer"
                    className="group bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-start gap-3 hover:border-accent/35 hover:-translate-y-1 transition-all duration-300 cursor-none"
                  >
                    <div className="flex-none w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-lg">
                      {a.icon}
                    </div>
                    <div>
                      <div className="font-syne font-bold text-sm mb-1 group-hover:text-accent transition-colors">
                        {a.title}
                      </div>
                      <div className="text-[var(--muted)] text-xs leading-relaxed">
                        {a.description}
                      </div>
                      {a.year && (
                        <div className="font-mono text-[0.6rem] text-accent mt-1">{a.year}</div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
