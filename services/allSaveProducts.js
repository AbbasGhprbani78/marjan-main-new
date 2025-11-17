export const fetchAllSaveProducts = async (lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/api/favorites/`,

    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("API Error:", text);
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
