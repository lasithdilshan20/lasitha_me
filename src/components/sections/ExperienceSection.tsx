"use client";
import { motion } from "framer-motion";

const experience = [
  {
    company: "Tech QA Labs",
    role: "Software Developer in Test",
    period: "2023 — Present",
    details: [
      "Built Cypress E2E and component testing frameworks",
      "Implemented API contract testing and coverage gates",
      "Integrated tests into CI/CD with parallelization",
    ],
  },
  {
    company: "Quality Forge",
    role: "QA Engineer",
    period: "2021 — 2023",
    details: [
      "Created test dashboards and flaky test detection",
      "Led shift-left testing initiatives",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="text-2xl md:text-3xl font-bold text-cyber-blue animate-glow mb-6">Experience</h2>
      <div className="relative pl-6 border-l border-cyber-green/40">
        {experience.map((e, i) => (
          <motion.div key={e.company} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="mb-8">
            <div className="absolute -left-2.5 mt-1 h-4 w-4 rounded-full bg-cyber-green shadow-neon" />
            <div className="flex flex-wrap items-baseline gap-2">
              <div className="text-white/90 font-semibold">{e.role}</div>
              <div className="text-cyber-purple">@ {e.company}</div>
              <div className="text-xs text-white/60 ml-auto">{e.period}</div>
            </div>
            <ul className="mt-2 list-disc pl-5 text-white/85 space-y-1">
              {e.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
