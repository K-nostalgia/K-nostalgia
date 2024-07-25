/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      },
      {
        protocol: 'https',
        hostname: 'kejbzqdwablccrontqrb.supabase.co'
      }
    ]
  }
};

export default nextConfig;
