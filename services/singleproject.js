export const fetchSingleProjects = async (lang, slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/app/project-detail/${slug}`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      return null; // Return null for 404 errors instead of throwing
    }
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
