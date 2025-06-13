// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';

// // --- A single source of truth for all features ---
// const allFeatures = [
//   "Flexible Payments",
//   "Real-Time Rate",
//   "24/7 Support",
//   "Secure Transaction",
//   "Zero Hidden Fees",
//   "Multiple Recipient",
//   "Live Tracking",
//   "Currency Wallet",
// ];

// // --- MAIN MARQUEE COMPONENT (Exported) ---
// export const FeatureMarquee = () => {
//   // Duplicate the array once to be used by both rows
//   const duplicatedFeatures = [...allFeatures, ...allFeatures];

//   // Animation variants for the left-scrolling row
//   const marqueeVariantsLeft = {
//     animate: {
//       x: ['0%', '-100%'],
//       transition: {
//         x: {
//           repeat: Infinity,
//           repeatType: 'loop',
//           // Increased duration because the list is longer
//           duration: 60, 
//           ease: 'linear',
//         },
//       },
//     },
//   };

//   // Animation variants for the right-scrolling row
//   const marqueeVariantsRight = {
//     animate: {
//       x: ['-100%', '0%'], // Animate in the opposite direction
//       transition: {
//         x: {
//           repeat: Infinity,
//           repeatType: 'loop',
//           // Slightly different duration for a nice parallax effect
//           duration: 65, 
//           ease: 'linear',
//         },
//       },
//     },
//   };
  
//   // Style for the feature tags
//   const tagStyle = "bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 text-white whitespace-nowrap shrink-0";

//   return (
//     <section className="py-12 w-full max-w-screen-xl mx-auto overflow-hidden">
//       <div className="flex flex-col gap-4">
//         {/* Row 1: Scrolls Left */}
//         <div className="relative w-full">
//           <motion.div
//             className="flex gap-4"
//             variants={marqueeVariantsLeft}
//             animate="animate"
//           >
//             {duplicatedFeatures.map((feature, index) => (
//               <div key={`r1-${index}`} className={tagStyle}>
//                 {feature}
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* Row 2: Scrolls Right */}
//         <div className="relative w-full">
//           <motion.div
//             className="flex gap-4"
//             variants={marqueeVariantsRight}
//             animate="animate"
//           >
//             {duplicatedFeatures.map((feature, index) => (
//               <div key={`r2-${index}`} className={tagStyle}>
//                 {feature}
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };



import React from 'react';

const allFeatures = [
  "Flexible Payments",
  "Real-Time Rate",
  "24/7 Support",
  "Secure Transaction",
  "Zero Hidden Fees",
  "Multiple Recipient",
  "Live Tracking",
  "Currency Wallet",
];

const FeatureTag = ({ text }: { text: string }) => (
  <div className="bg-primarybox rounded-full px-6 py-3 text-mainheadingWhite whitespace-nowrap shrink-0">
    {text}
  </div>
);

const MarqueeRow = ({ features, toRight = false }: { features: string[]; toRight?: boolean }) => (
  <div className="relative flex gap-6 overflow-hidden group">

    <div
      className={`flex gap-4 shrink-0 ${toRight ? 'animate-marquee-right' : 'animate-marquee-left'} `}
    >
      {features.map((feature, index) => (
        <FeatureTag key={index} text={feature} />
      ))}
    </div>

    {/* the duplicated content that makes the loop seamless */}
    <div
      aria-hidden="true"
      className={`flex gap-4 shrink-0 ${toRight ? 'animate-marquee-right' : 'animate-marquee-left'} `}
    >
      {features.map((feature, index) => (
        <FeatureTag key={index} text={feature} />
      ))}
    </div>
  </div>
);

const FeatureMarquee = () => {
  return (
    <section className="FeatureMarqueeSection bg-background sm:py-16 py-10 relative">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Row 1: Scrolls Left */}
          <MarqueeRow features={allFeatures} />
          {/* Row 2: Scrolls Right */}
          <MarqueeRow features={allFeatures} toRight />
        </div>

        {/* Add the gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background from-35% to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background from-35% to-transparent"></div>

      </div>
    </section>
  );
};

export default FeatureMarquee;