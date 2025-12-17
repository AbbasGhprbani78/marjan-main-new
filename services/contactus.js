import { fetchWithAnalytics } from "@/utils/fetchWithAnalytics";

export const fetchContactUs = async (lang) => {
  const res = await fetchWithAnalytics(
    `${process.env.NEXT_PUBLIC_API_URL}/app/api/contact-us/`,
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
