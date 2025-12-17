import { fetchWithAnalytics } from "@/utils/fetchWithAnalytics";

export const fetchhome = async (lang) => {
  const res = await fetchWithAnalytics(
    `${process.env.NEXT_PUBLIC_API_URL}/app/home-page/`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  if (!res.ok) {
    let message = "خطای ناشناخته از سرور";

    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch {
      const errorText = await res.text();
      message = errorText || message;
    }

    console.error("Server error:", message);
    throw new Error(message);
  }

  return res.json();
};
