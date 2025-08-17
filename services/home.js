export const fetchhome = async (lang) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/home-page/`, {
    method: "GET",
    headers: {
      "Accept-Language": lang,
    },
  });

  if (!res.ok) {
    try {
      const errorData = await res.json();
      console.error("Server error:", errorData); // لاگ خطای سرور
      throw new Error(errorData.message || "خطای ناشناخته از سرور");
    } catch {
      const errorText = await res.text();
      console.error("Server error (text):", errorText); // لاگ خطا به صورت متن ساده
      throw new Error(errorText || "خطای ناشناخته از سرور");
    }
  }

  return res.json();
};
