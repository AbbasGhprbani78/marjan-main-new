export const fetchSingleBlog = async (lang, id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/app/api/blog/${id}`,
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
