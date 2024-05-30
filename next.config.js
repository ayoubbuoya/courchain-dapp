/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/*",
      },
      {
        protocol: "https",
        hostname: "orange-causal-puma-236.mypinata.cloud",
        port: "",
        pathname: "/ipfs/*",
      },
    ],
  },
};

module.exports = nextConfig;
