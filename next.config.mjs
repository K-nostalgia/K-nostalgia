/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kejbzqdwablccrontqrb.supabase.co'
      }
    ]
  }
};

export default nextConfig;
