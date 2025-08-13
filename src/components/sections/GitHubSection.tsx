"use client";
import useSWR from "swr";
import Link from "next/link";
import StatCard from "@/components/ui/StatCard";
import Skeleton from "@/components/ui/Skeleton";
import { compactNumber } from "@/utils/format";

export default function GitHubSection() {
  const { data, error, isLoading, mutate } = useSWR<any>("/api/github");

  const profile = data?.profile;
  const repositories = data?.repositories || [];
  const totalStars = data?.totalStars || 0;

  return (
    <section id="github" aria-labelledby="github-heading">
      <div className="flex items-center justify-between mb-6">
        <h2 id="github-heading" className="text-2xl md:text-3xl font-bold text-cyber-blue animate-glow">Open Source Contributions</h2>
        <a className="text-cyber-purple hover:underline" href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'lasithdilshan20'}`} target="_blank" rel="noreferrer">View Profile</a>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {error && (
        <div className="glass rounded-xl p-4 border border-[color:var(--panel-border)] mb-6">
          <p className="text-red-400">Failed to load GitHub data. <button className="underline" onClick={() => mutate()}>Retry</button></p>
        </div>
      )}

      {!isLoading && profile && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<span>👥</span>} label="Followers" value={compactNumber(profile.followers)} />
          <StatCard icon={<span>📁</span>} label="Repositories" value={compactNumber(profile.public_repos)} />
          <StatCard icon={<span>⭐</span>} label="Stars Received" value={compactNumber(totalStars)} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
        {!isLoading && repositories.map((repo: any) => (
          <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="group glass rounded-xl p-5 border border-[color:var(--panel-border)] hover:shadow-neon transition block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-cyber-blue group-hover:text-cyber-green transition">{repo.name}</h3>
                {repo.description && <p className="mt-1 text-sm text-neutral-700 dark:text-white/80 line-clamp-3">{repo.description}</p>}
              </div>
              <div className="text-sm text-neutral-600 dark:text-white/70 whitespace-nowrap">⭐ {compactNumber(repo.stargazers_count)}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {repo.language && (
                <span className="px-2 py-1 rounded bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/40">{repo.language}</span>
              )}
              {repo.topics?.slice(0,3).map((t: string) => (
                <span key={t} className="px-2 py-1 rounded bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
