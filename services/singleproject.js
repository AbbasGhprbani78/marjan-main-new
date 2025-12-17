import { fetchWithAnalytics } from "@/utils/fetchWithAnalytics";

export const fetchSingleProjects = async (lang, slug) => {
  const res = await fetchWithAnalytics(
    `${process.env.NEXT_PUBLIC_API_URL}/app/project-detail/${slug}`,
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
