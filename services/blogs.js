export const fetchBlogs = async (lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/app/api/blog-data/`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
