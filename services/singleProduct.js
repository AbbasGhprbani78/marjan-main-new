export const fetchSingleProduct = async (lang, slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/api/product/${slug}`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
