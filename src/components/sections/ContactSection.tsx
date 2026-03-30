"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import type { ContactFormData } from "@/types";

export function ContactSection() {
  const [form, setForm] = useState<ContactFormData>({
    name: "", email: "", subject: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const socials = [
    { label: "GitHub", href: "https://github.com/Emperor2004", icon: "⟡" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/om-narayan-pandit", icon: "⟡" },
    { label: "Research Gate", href: "https://www.researchgate.net/profile/Om-Pandit-2?ev=hdr_xprf", icon: "⟡" },
    { label: "Instagram", href: "https://www.instagram.com/the_om.narayan.pandit", icon: "⟡" },
    { label: "Download CV", href: "/assets/cv/resume_cv.pdf", icon: "⟡" },
  ];

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 md:p-14 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <SectionHeader
                label="06 · Contact"
                title={<>Let&apos;s build something <span className="gradient-text-cyan">remarkable</span></>}
                subtitle="Open to research collaborations, internships, full-time roles, and interesting AI conversations."
                centered
              />

              <div className="grid md:grid-cols-2 gap-10 mt-10">
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[0.68rem] text-[var(--muted)] uppercase tracking-widest block mb-1.5">Name</label>
                      <input
                        name="name" value={form.name} onChange={handleChange} required
                        placeholder="Your name"
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[0.68rem] text-[var(--muted)] uppercase tracking-widest block mb-1.5">Email</label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="your@email.com"
                        className="admin-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[0.68rem] text-[var(--muted)] uppercase tracking-widest block mb-1.5">Subject</label>
                    <input
                      name="subject" value={form.subject} onChange={handleChange} required
                      placeholder="What's this about?"
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[0.68rem] text-[var(--muted)] uppercase tracking-widest block mb-1.5">Message</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Tell me about your project, idea, or opportunity..."
                      className="admin-input resize-none"
                    />
                  </div>

                  {status === "success" && (
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
                      <CheckCircle size={14} /> Message sent! I&apos;ll get back to you soon.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 font-mono text-sm">
                      <AlertCircle size={14} /> {errorMsg}
                    </div>
                  )}

                  <Button type="submit" variant="primary" size="lg" loading={status === "loading"} className="w-full gap-2">
                    <Send size={14} /> Send Message
                  </Button>
                </form>

                {/* Social Links */}
                <div className="flex flex-col justify-center gap-3">
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                    Prefer a direct reach? Find me on these platforms. Always up for a good conversation about AI, research, or building things that matter.
                  </p>
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href !== "/cv.pdf" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 font-mono text-[0.78rem] text-[var(--muted)] border border-[var(--border)] px-4 py-3 rounded-xl hover:text-[var(--accent2)] hover:border-[var(--accent2)] hover:bg-cyan-glow/5 hover:-translate-y-0.5 transition-all cursor-none"
                    >
                      <span className="text-accent">{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
