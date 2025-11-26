/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  // Ensure proper routing on Vercel
  trailingSlash: false
};

export default nextConfig;
