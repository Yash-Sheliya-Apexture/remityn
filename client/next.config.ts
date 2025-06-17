// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// // next.config.ts
// import { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   // Add any other Next.js configurations here
// };

// // Conditionally apply the bundle analyzer
// if (process.env.ANALYZE === 'true') {
//   const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: true, // Explicitly enable it here
//   });
//   module.exports = withBundleAnalyzer(nextConfig);
// } else {
//   module.exports = nextConfig;
// }

// next.config.ts
import { NextConfig } from 'next';

// A more robust Content Security Policy (adjust as needed for your third-party scripts)
// Note: Tawk.to and Brevo require several domains. Check their documentation for the latest CSP requirements.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://embed.tawk.to https://*.brevo.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
  frame-src https://embed.tawk.to https://*.brevo.com;
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // 1. Disable the x-powered-by header
  poweredByHeader: false, 

  // 2. Add crucial security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Add any other Next.js configurations here
};

// Conditionally apply the bundle analyzer
if (process.env.ANALYZE === 'true') {
  console.log('Bundle Analyzer is enabled.');
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}