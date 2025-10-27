export const fetchRepresentatives = async (lang) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/locations/`, {
    method: "GET",
    headers: {
      "Accept-Language": lang,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
