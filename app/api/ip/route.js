export async function GET() {
  try {
    const res = await fetch("https://ipwho.is", {
      headers: { accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("IP API error:", res.status, await res.text());
      return Response.json(
        { error: "Failed to fetch IP location" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Error fetching IP location:", err);
    return Response.json(
      { error: "Failed to fetch IP location" },
      { status: 500 }
    );
  }
}
