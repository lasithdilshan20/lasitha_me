import { NextResponse } from "next/server";

const USERNAME = process.env.NEXT_PUBLIC_NPM_USERNAME || "lasithdilshan20";

export async function GET() {
  try {
    // Use NPM search API to list packages by maintainer
    const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=maintainer:${USERNAME}&size=20`, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(`NPM search error ${res.status}`);
    const data = await res.json();
    const packages = (data.objects || []).map((o: any) => ({
      name: o.package.name,
      version: o.package.version,
      description: o.package.description,
      keywords: o.package.keywords,
      date: o.package.date,
      links: o.package.links,
    }));
    return NextResponse.json({ packages });
  } catch (e: any) {
    return NextResponse.json({ packages: [], error: e?.message || "Failed" }, { status: 200 });
  }
}
