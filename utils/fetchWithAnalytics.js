import { headers } from "next/headers";

export const fetchWithAnalytics = async (url, options = {}) => {
  const headersList = headers();

  const referer = headersList.get("referer");

  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const cfConnectingIp = headersList.get("cf-connecting-ip");

  let userIp = null;

  if (forwardedFor) {
    userIp = forwardedFor.split(",")[0].trim();
  } else if (realIp) {
    userIp = realIp;
  } else if (cfConnectingIp) {
    userIp = cfConnectingIp;
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(referer ? { Referer: referer } : {}),
      ...(userIp ? { "x-forwarded-for": userIp } : {}),
    },
    cache: "no-store",
  });
};
