export const fetchSingleBlog = async (lang, slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/app/api/blog/${slug}`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
