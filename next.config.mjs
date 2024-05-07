/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: process.env.NEXT_PUBLIC_API + '/:path*', // Include '/:path*' in the destination
        },
      ];
    },
  };
  
  export default nextConfig;