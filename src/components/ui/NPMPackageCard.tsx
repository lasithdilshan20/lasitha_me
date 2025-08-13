import React from "react";
import { useCountUp } from "@/utils/useCountUp";
import { compactNumber } from "@/utils/format";

export default function NPMPackageCard({
  name,
  description,
  version,
  downloads,
  featured = false,
  links,
}: {
  name: string;
  description?: string;
  version?: string;
  downloads?: number;
  featured?: boolean;
  links?: { npm?: string; repository?: string; homepage?: string };
}) {
  const count = useCountUp(downloads || 0, 1200);
  return (
    <div className={`glass rounded-2xl p-5 border border-white/10 shadow-neon hover:shadow-glow transition ${featured ? 'ring-1 ring-cyber-blue/40' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg md:text-xl font-semibold text-cyber-blue">{name}</div>
          {version && <div className="text-xs text-white/60">v{version}</div>}
        </div>
        {featured && <div className="text-2xl" aria-hidden>🏆</div>}
      </div>
      {description && <p className="mt-3 text-sm text-white/80">{description}</p>}
      {typeof downloads === 'number' && (
        <div className="mt-4">
          <div className="text-xs text-white/60">Total Downloads</div>
          <div className="text-2xl font-bold text-cyber-green" aria-live="polite">{compactNumber(count)}</div>
        </div>
      )}
      <div className="mt-4 flex gap-3 text-sm">
        {links?.npm && <a className="text-cyber-purple hover:underline" href={links.npm} target="_blank" rel="noreferrer">NPM</a>}
        {links?.repository && <a className="text-cyber-purple hover:underline" href={links.repository} target="_blank" rel="noreferrer">Repo</a>}
        {links?.homepage && <a className="text-cyber-purple hover:underline" href={links.homepage} target="_blank" rel="noreferrer">Docs</a>}
      </div>
    </div>
  );
}
