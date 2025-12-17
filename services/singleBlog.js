import { fetchWithAnalytics } from "@/utils/fetchWithAnalytics";

export const fetchSingleBlog = async (lang, slug) => {
  const res = await fetchWithAnalytics(
    `${process.env.NEXT_PUBLIC_API_URL}/app/api/blog/${slug}`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
