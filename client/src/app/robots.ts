// import type { MetadataRoute } from 'next'
 
// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: {
//       userAgent: '*',
//       allow: '*',
//       // Corrected: Removed space before /_next/
//       disallow: ['/api/','/auth/', '/admin/', '/dashboard/', '/add-money/', '/send-money/', '/transactions/', '/your-account/', '/kyc/', '/_next/' ],
//     },
//     sitemap: 'https://www.remityn.com/sitemap.xml',
//   }
// }

// robots.ts

// import type { MetadataRoute } from 'next' 

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: {
//       userAgent: '*',
//       allow: '*',
//       // Change ' /_next/' to '/_next/'
//       disallow: ['/api/','/auth/', '/admin/', '/dashboard/', '/add-money/', '/send-money/', '/transactions/', '/your-account/', '/kyc/', '/_next/' ],
//     },
//     sitemap: 'https://www.remityn.com/sitemap.xml',
//   }
// }



// app/robots.ts
import type { MetadataRoute } from 'next' 

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // Allow crawling of the homepage and its assets (e.g., CSS, JS)
      allow: '/', 
      // Disallow everything else
      disallow: [
        // Application and private routes
        '/api/',
        '/auth/',
        '/admin/',
        '/dashboard/',
        '/add-money/',
        '/send-money/',
        '/transactions/',
        '/your-account/',
        '/kyc/',
        // Next.js internal directory
        '/_next/',
      ],
    },
    sitemap: 'https://www.remityn.com/sitemap.xml',
  }
}