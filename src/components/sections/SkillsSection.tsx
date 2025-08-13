"use client";
import { motion } from "framer-motion";

const skills = [
  { group: "Primary", items: [ { name: "Cypress", level: 95 }, { name: "E2E", level: 92 }, { name: "API Testing", level: 90 } ] },
  { group: "Testing", items: [ { name: "Selenium", level: 75 }, { name: "Jest", level: 85 }, { name: "Mocha", level: 80 }, { name: "TestNG", level: 70 } ] },
  { group: "Languages", items: [ { name: "JavaScript", level: 90 }, { name: "TypeScript", level: 88 }, { name: "Python", level: 75 }, { name: "Java", level: 70 } ] },
  { group: "Frameworks", items: [ { name: "React", level: 85 }, { name: "Node.js", level: 80 }, { name: "Express", level: 78 } ] },
  { group: "Tools", items: [ { name: "Git", level: 90 }, { name: "Docker", level: 75 }, { name: "Jenkins", level: 70 }, { name: "Postman", level: 88 } ] },
  { group: "Methodologies", items: [ { name: "Agile", level: 90 }, { name: "TDD", level: 80 }, { name: "BDD", level: 78 } ] },
];

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-2xl md:text-3xl font-bold text-cyber-blue animate-glow mb-6">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((g) => (
          <div key={g.group} className="glass rounded-xl p-5 border border-[color:var(--panel-border)]">
            <h3 className="text-lg font-semibold text-cyber-purple mb-4">{g.group}</h3>
            <div className="space-y-3">
              {g.items.map((s, i) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-700 dark:text-white/80">{s.name}</span>
                    <span className="text-cyber-green">{s.level}%</span>
                  </div>
                  <div className="h-2 bg-neutral-200 dark:bg-white/10 rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="h-full bg-gradient-to-r from-cyber-blue to-cyber-green shadow-neon"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
