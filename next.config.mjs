/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "marjantileco.com",
        pathname: "/api/images/**",
      },
      {
        protocol: "https",
        hostname: "marjantileco.com",
        pathname: "/api/media/**",
      },
    ],
  },
};

export default nextConfig;
