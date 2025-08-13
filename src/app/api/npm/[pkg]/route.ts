import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { pkg: string } }) {
  try {
    const pkg = params.pkg;
    const res = await fetch(`https://api.npmjs.org/downloads/point/last-month/${pkg}`, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(`NPM error ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ downloads: 0, error: e?.message || "Failed" }, { status: 200 });
  }
}
