"use client";
import { useRef } from "react";

const projects = [
  {
    title: "Cypress Automation Framework",
    desc: "Modular E2E framework with page objects, fixtures, and CI integration.",
    link: "#",
    badges: ["Cypress", "TypeScript", "CI/CD"],
  },
  {
    title: "Test Dashboard",
    desc: "Real-time test metrics, flaky test detection, and coverage trends.",
    link: "#",
    badges: ["React", "Charts", "Analytics"],
  },
  {
    title: "API Testing Suite",
    desc: "Contract testing and performance checks across microservices.",
    link: "#",
    badges: ["API", "Contracts", "Performance"],
  },
  {
    title: "CI/CD Pipeline",
    desc: "Highly parallelized pipelines with dynamic environments.",
    link: "#",
    badges: ["Jenkins", "Docker", "GitHub Actions"],
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  function onLeave() {
    const el = ref.current!;
    el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="transition-transform will-change-transform">
      {children}
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="text-2xl md:text-3xl font-bold text-cyber-blue animate-glow mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <TiltCard key={p.title}>
            <a href={p.link} className="block group glass rounded-2xl p-5 border border-white/10 hover:shadow-neon">
              <h3 className="text-lg font-semibold text-cyber-blue group-hover:text-cyber-green transition">{p.title}</h3>
              <p className="mt-2 text-sm text-white/80">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {p.badges.map((b) => (
                  <span key={b} className="px-2 py-1 rounded bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40">{b}</span>
                ))}
              </div>
            </a>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
