"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  const items = [
    { year: "2025", text: "SDET focused on Cypress E2E, component, and API testing." },
    { year: "2023", text: "Built robust automation frameworks and CI/CD pipelines." },
    { year: "2021", text: "Shipped dashboards and tooling for test analytics." },
  ];
  return (
    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading" className="text-2xl md:text-3xl font-bold text-cyber-blue animate-glow mb-6">About</h2>
      <p className="text-white/80 max-w-3xl mb-8">Software Developer in Test specializing in Cypress automation. Passionate about quality engineering, observability, and developer experience. Crafting testable systems and sleek tooling with a cyberpunk aesthetic.</p>
      <div className="relative pl-6 border-l border-cyber-purple/40">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="mb-6">
            <div className="absolute -left-2.5 mt-1 h-4 w-4 rounded-full bg-cyber-purple shadow-neon" />
            <div className="text-sm text-cyber-green">{item.year}</div>
            <div className="text-white/90">{item.text}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
