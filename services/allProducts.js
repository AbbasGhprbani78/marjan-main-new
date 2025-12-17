import { fetchWithAnalytics } from "@/utils/fetchWithAnalytics";

export const fetchAllProducts = async (lang) => {
  const res = await fetchWithAnalytics(
    `${process.env.NEXT_PUBLIC_API_URL}/product/api/all-products/`,
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
