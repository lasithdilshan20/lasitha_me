"use client";
import useSWR from "swr";
import NPMPackageCard from "@/components/ui/NPMPackageCard";
import Skeleton from "@/components/ui/Skeleton";

function NpmPkgItem({ pkgName, description, version, links }: { pkgName: string; description?: string; version?: string; links?: any }) {
  const { data, isLoading } = useSWR<any>(`/api/npm/${encodeURIComponent(pkgName)}`);
  const downloads = data?.downloads || 0;
  return (
    <div>
      {isLoading ? (
        <div className="glass rounded-2xl p-5">
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ) : (
        <NPMPackageCard name={pkgName} description={description} version={version} downloads={downloads} links={{ npm: links?.npm, repository: links?.repository, homepage: links?.homepage }} />
      )}
    </div>
  );
}

export default function AchievementsSection() {
  const featuredName = "cypress-intercept-search";
  const featured = useSWR<any>(`/api/npm/${featuredName}`);
  const userPkgs = useSWR<any>("/api/npm/user");

  return (
    <section id="achievements" aria-labelledby="achievements-heading">
      <h2 id="achievements-heading" className="text-2xl md:text-3xl font-bold text-cyber-blue animate-glow mb-6">Professional Achievements</h2>

      <div className="mb-10">
        <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-3">Featured NPM Package</h3>
        {featured.isLoading ? (
          <Skeleton className="h-28 w-full" />
        ) : (
          <NPMPackageCard
            name={featuredName}
            description="A Cypress plugin for searching and asserting values in intercepted requests"
            version={undefined}
            downloads={featured.data?.downloads || 10000}
            featured
            links={{ npm: `https://www.npmjs.com/package/${featuredName}`, repository: "https://github.com/lasithdilshan20/cypress-intercept-search" }}
          />
        )}
      </div>

      <div>
        <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-3">Other Packages</h3>
        {userPkgs.isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        )}
        {userPkgs.error && (
          <div className="glass rounded-xl p-4 border border-white/10">
            <p className="text-red-400">Failed to load NPM packages.</p>
          </div>
        )}
        {!userPkgs.isLoading && !userPkgs.error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPkgs.data?.packages?.filter((p: any) => p.name !== featuredName).slice(0, 9).map((p: any) => (
              <NpmPkgItem key={p.name} pkgName={p.name} description={p.description} version={p.version} links={p.links} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
