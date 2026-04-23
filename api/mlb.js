export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");
  if (!path) return new Response("no path", { status: 400 });
  const mlbRes = await fetch(`https://statsapi.mlb.com/api/v1/${path}`);
  const data = await mlbRes.text();
  return new Response(data, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
