import { NextResponse } from "next/server";

const MEDIUM_RSS_JSON = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${process.env.NEXT_PUBLIC_MEDIUM_USERNAME || "lasithdilshan20"}`;

export async function GET() {
  try {
    const res = await fetch(MEDIUM_RSS_JSON, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(`Medium RSS error ${res.status}`);
    const data = await res.json();
    const items = (data.items || []).slice(0, 4).map((item: any) => ({
      id: item.guid,
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      thumbnail: item.thumbnail,
      description: item.description,
      categories: item.categories,
    }));
    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ items: [], error: e?.message || "Failed" }, { status: 200 });
  }
}
