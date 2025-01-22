import { withContentCollections } from '@content-collections/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return process.env.NODE_ENV === 'production'
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:8000/:path*',
          },
        ]
      : [];
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'helpdesk.alphaspiderman.dev'],
    },
  },
};

export default withContentCollections(nextConfig);
