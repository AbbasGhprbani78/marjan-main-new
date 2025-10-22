/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "marjanapi.nobinco.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "marjanapi.nobinco.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
