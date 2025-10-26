import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization");
  const r = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/me", {
    headers: { authorization: token || "" },
    cache: "no-store",
  });
  const body = await r.text();
  return new NextResponse(body, { status: r.status });
}
