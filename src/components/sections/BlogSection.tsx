"use client";
import useSWR from "swr";
import Image from "next/image";
import { fetcher } from "@/utils/fetcher";
import { formatDate, estimateReadTime } from "@/utils/format";
import Skeleton from "@/components/ui/Skeleton";

export default function BlogSection() {
  const { data, error, isLoading, mutate } = useSWR<{ items: any[] }>("/api/medium", fetcher);
  const items = data?.items || [];

  return (
    <section id="blog" aria-labelledby="blog-heading">
      <div className="flex items-center justify-between mb-6">
        <h2 id="blog-heading" className="text-2xl md:text-3xl font-bold text-cyber-blue animate-glow">Latest from Medium</h2>
        <a className="text-cyber-purple hover:underline" href={`https://${process.env.NEXT_PUBLIC_MEDIUM_USERNAME || 'lasithdilshan20'}.medium.com/`} target="_blank" rel="noreferrer">View All</a>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass rounded-xl p-4">
              <Skeleton className="w-full h-40 mb-3" />
              <Skeleton className="w-3/4 h-5 mb-2" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="glass rounded-xl p-4 border border-[color:var(--panel-border)]">
          <p className="text-red-400">Failed to load articles. <button className="underline" onClick={() => mutate()}>Retry</button></p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((article) => (
            <a key={article.id || article.link} href={article.link} target="_blank" rel="noreferrer" className="group glass rounded-xl overflow-hidden border border-[color:var(--panel-border)] hover:shadow-neon transition block">
              <div className="relative w-full h-40">
                {article.thumbnail ? (
                  <Image src={article.thumbnail} alt={article.title} fill className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw" />
                ) : (
                  <div className="w-full h-full bg-cyber-blue/10" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-cyber-green transition min-h-[48px]">{article.title}</h3>
                <div className="mt-2 text-xs text-neutral-600 dark:text-white/70 flex items-center gap-2">
                  <span>{formatDate(article.pubDate)}</span>
                  <span>•</span>
                  <span>{estimateReadTime(article.description || "")}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
