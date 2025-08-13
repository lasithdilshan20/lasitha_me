import React from "react";

export default function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-4 border border-[color:var(--panel-border)] shadow-neon">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-sm text-neutral-600 dark:text-white/70">{label}</div>
          <div className="text-xl font-semibold text-cyber-blue">{value}</div>
        </div>
      </div>
    </div>
  );
}
