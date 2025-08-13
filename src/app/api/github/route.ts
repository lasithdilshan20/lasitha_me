import { NextResponse } from "next/server";

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "lasithdilshan20";
const BASE = "https://api.github.com";

export async function GET() {
  try {
    const headers: Record<string, string> = {"Accept": "application/vnd.github+json"};
    if (process.env.GITHUB_TOKEN) headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;

    const [userRes, reposRes] = await Promise.all([
      fetch(`${BASE}/users/${USERNAME}`, { headers, next: { revalidate: 1800 } }),
      fetch(`${BASE}/users/${USERNAME}/repos?sort=updated&per_page=100`, { headers, next: { revalidate: 1800 } }),
    ]);

    if (!userRes.ok) throw new Error(`GitHub user error ${userRes.status}`);
    if (!reposRes.ok) throw new Error(`GitHub repos error ${reposRes.status}`);

    const profile = await userRes.json();
    const reposAll = await reposRes.json();

    // Sort by stars and take top 6
    const repositories = reposAll
      .filter((r: any) => !r.fork)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r: any) => ({
        id: r.id,
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        language: r.language,
        topics: r.topics,
        pushed_at: r.pushed_at,
      }));

    const totalStars = reposAll.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);

    return NextResponse.json({ profile, repositories, totalStars });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed", profile: null, repositories: [], totalStars: 0 }, { status: 200 });
  }
}
