"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const LINES = [
  "Hello World, I'm Lasitha Wijenayake",
  "Software Developer in Test | Cypress Automation Expert",
  "Crafting Quality Through Code & Testing Excellence",
];

function useTyping(lines: string[], speed = 30) {
  const [display, setDisplay] = useState<string[]>(() => Array.from({ length: lines.length }, () => ""));
  useEffect(() => {
    let line = 0;
    let idx = 0;
    const iv = setInterval(() => {
      if (line >= lines.length) {
        clearInterval(iv);
        return;
      }
      setDisplay((d) => {
        const next = [...d];
        const current = lines[line] ?? "";
        next[line] = current.slice(0, idx + 1);
        return next;
      });
      idx++;
      const currentLen = (lines[line] ?? "").length;
      if (idx >= currentLen) {
        line++;
        idx = 0;
        if (line >= lines.length) {
          clearInterval(iv);
        }
      }
    }, Math.max(0, speed));
    return () => clearInterval(iv);
  }, [lines, speed]);
  return display;
}

function TerminalSimulator() {
  const [logs, setLogs] = useState<string[]>([]);
  const counter = useRef(0);
  const steps = useMemo(
    () => [
      "> npx cypress run --browser chrome",
      "[cypress] Launching Cypress...",
      "[cypress] Found 24 specs",
      "[spec 1] login.cy.ts - PASS (1.2s)",
      "[spec 2] checkout.cy.ts - PASS (2.4s)",
      "[api] contracts.cy.ts - PASS (0.9s)",
      "[coverage] Statements: 92% Branches: 88% Functions: 95% Lines: 93%",
      "All specs passed! ✅",
    ],
    []
  );
  useEffect(() => {
    const t = setInterval(() => {
      setLogs((l) => {
        if (l.length >= steps.length) return l;
        return [...l, steps[counter.current++]];
      });
    }, 500);
    return () => clearInterval(t);
  }, [steps]);
  return (
    <div className="glass rounded-xl p-4 md:p-6 text-xs md:text-sm font-mono text-cyber-blue shadow-neon border border-[color:var(--panel-border)]">
      <div className="flex items-center gap-2 mb-3 text-neutral-600 dark:text-white/70">
        <span className="h-3 w-3 rounded-full bg-red-500/70"></span>
        <span className="h-3 w-3 rounded-full bg-yellow-500/70"></span>
        <span className="h-3 w-3 rounded-full bg-green-500/70"></span>
        <span className="ml-2 text-xs uppercase tracking-widest">Terminal</span>
      </div>
      <div className="space-y-1 max-h-40 overflow-auto pr-1">
        {logs.map((l, i) => (
          <div key={i} className="text-neutral-900 dark:text-white/90">
            {l}
          </div>
        ))}
        <div className="opacity-70 typing-caret">&nbsp;</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const display = useTyping(LINES, 18);
  return (
    <section id="hero" className="relative min-h-[88vh] md:min-h-[92vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(138,43,226,0.12),transparent_40%)]" />
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight">
            <span className="block text-cyber-blue typing-caret">{display[0]}</span>
            <span className="block mt-2 text-cyber-green/90">{display[1]}</span>
            <span className="block mt-2 text-cyber-purple/90">{display[2]}</span>
          </motion.h1>
          <div className="mt-6 flex gap-4">
            <a href="#contact" className="px-5 py-3 rounded-lg bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40 hover:bg-cyber-blue/30 transition shadow-neon">Contact</a>
            <a href="#projects" className="px-5 py-3 rounded-lg bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/40 hover:bg-cyber-purple/30 transition shadow-neon">Projects</a>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <TerminalSimulator />
        </motion.div>
      </div>
    </section>
  );
}
