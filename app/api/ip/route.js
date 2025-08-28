export async function GET(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0] || req.ip || "0.0.0.0";

  const parts = ip.split(".");
  const x = parts[0] || null;
  const y = parts[1] || null;

  return new Response(JSON.stringify({ ip, x, y }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
