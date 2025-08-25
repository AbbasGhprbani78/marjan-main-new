export const fetchFaq = async (lang) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/faq/`, {
    method: "GET",
    headers: {
      "Accept-Language": lang,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
