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

// A good practice is to check the environment. Some settings might differ.
const isProd = process.env.NODE_ENV === 'production';

// --- 1. Define Security Headers ---
// Create a Content Security Policy (CSP).
// This is a powerful feature, but it needs to be configured correctly for your site.
// **YOU WILL NEED TO CUSTOMIZE THIS** for any external scripts, images, or APIs you use.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' ${isProd ? '' : "'unsafe-eval'"} 'unsafe-inline' https://vercel.live;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim(); // Tidy up the string

const securityHeaders = [
  // Instructs browsers to prefer HTTPS. The max-age is set to 2 years.
  // Be careful with this: once a browser sees this, it will NOT access your site via HTTP.
  // Only enable this when you are confident your HTTPS setup is permanent.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevents the browser from trying to guess the content type of a response.
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Prevents your site from being rendered in a frame, iframe, embed, or object, which helps prevent clickjacking.
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // A legacy header to protect against XSS. Modern browsers use CSP, but this is good for older ones.
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Controls how much referrer information is sent with requests.
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // Apply the Content Security Policy.
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
];


// --- 2. Define the Main Next.js Configuration ---
const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Obscurity: Disable the "x-powered-by: Next.js" header.
  poweredByHeader: false,
  
  // Obscurity: Change the asset path from /_next to /static.
  // IMPORTANT: This requires a reverse proxy (like Nginx) to rewrite requests
  // from /static/... to /_next/... for this to work.
  // assetPrefix: isProd ? '/static' : '',

  // Real Security: Apply the security headers to all routes.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  
  // Add any other Next.js configurations here
};

// --- 3. Conditionally Apply the Bundle Analyzer ---
// This part remains the same, but it now wraps our enhanced 'nextConfig'.
let configToExport: NextConfig = nextConfig;

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  configToExport = withBundleAnalyzer(nextConfig);
}

export default configToExport;