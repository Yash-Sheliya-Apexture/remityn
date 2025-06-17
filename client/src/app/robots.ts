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

import type { MetadataRoute } from 'next' 

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '*',
      // Change ' /_next/' to '/_next/'
      disallow: ['/api/','/auth/', '/admin/', '/dashboard/', '/add-money/', '/send-money/', '/transactions/', '/your-account/', '/kyc/', '/_next/' ],
    },
    sitemap: 'https://www.remityn.com/sitemap.xml',
  }
}