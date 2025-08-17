/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "marjanapi.nobinco.com",
        // port: "7200",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
