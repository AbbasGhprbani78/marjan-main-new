import { headers } from "next/headers";

export const fetchWithAnalytics = async (url, options = {}) => {
  const headersList = headers();
  const referer = headersList.get("referer");

  console.log("🟢 [SSR] Fetching URL:", url);
  console.log("🟢 [SSR] Incoming Referer:", referer);
  console.log("🟢 [SSR] Outgoing Headers:", {
    ...options.headers,
    ...(referer ? { Referer: referer } : {}),
  });

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(referer ? { Referer: referer } : {}),
    },
    cache: "no-store",
  });
};
