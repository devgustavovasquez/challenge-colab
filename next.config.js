/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["randomuser.me"],
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    staticFolder: "/static",
    API_USERS_URL: process.env.API_USERS_URL,
  },
};

module.exports = nextConfig;
