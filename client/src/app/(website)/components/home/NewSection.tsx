// // src/components/NewSection.tsx

// import React from 'react';
// import type { IconType } from 'react-icons';
// import { FiDollarSign, FiLock, FiSettings, FiHeadphones } from 'react-icons/fi';
// import { IoAnalyticsSharp } from 'react-icons/io5';
// import { BsArrowLeftRight } from 'react-icons/bs';

// // Define the type for each feature card
// interface FeatureCard {
//   icon: IconType;
//   title: string;
//   description: string;
// }

// // Data for the feature cards, making it easy to add or modify content
// const features: FeatureCard[] = [
//   {
//     icon: FiDollarSign,
//     title: 'Instant Savings',
//     description: 'Get immediate savings on every purchase, powered by AI to optimize your transactions.',
//   },
//   {
//     icon: IoAnalyticsSharp,
//     title: 'Real-Time Insights',
//     description: 'Make smarter decisions with live data and actionable insights, delivered in real-time to stay ahead of the curve.',
//   },
//   {
//     icon: BsArrowLeftRight,
//     title: 'Flexible Plans',
//     description: 'Choose plans that adapt to your business needs, offering unparalleled scalability and cost-effectiveness.',
//   },
//   {
//     icon: FiLock,
//     title: 'Secure Transactions',
//     description: 'Prioritize safety with cutting-edge encryption and robust security features for every interaction.',
//   },
//   {
//     icon: FiSettings,
//     title: 'Adaptive Features',
//     description: 'Leverage AI-driven features that evolve with your business, ensuring efficiency and innovation at every step.',
//   },
//   {
//     icon: FiHeadphones,
//     title: 'Dedicated Support',
//     description: 'Access expert assistance 24/7 to ensure you\'re never alone on your growth journey.',
//   },
// ];

// export default function NewSection() {
//   return (
//     <section className="relative sm:py-16 py-10">

      
//       <div className="container mx-auto px-4 relative">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               // Parent div creates the gradient border.
//               // Changed from a diagonal gradient to a vertical one to create borders on the sides only.
//               className="
//                 relative p-[1px] rounded-2xl
//                 bg-gradient-to-b from-primary via-transparent to-transparent"
//             >
//               <div className='bg-background border-transparent rounded-2xl'>

//               {/* Inner div for the card content */}
//               <div 
//                 className="
//                   relative p-6 h-full rounded-[15px]
//                   bg-gradient-to-b from-primary-foreground to-transparent to-92%
//                 "
//               >
//                 {/* Icon Container */}
//                 <div className="
//                   w-12 h-12 mb-6 rounded-lg 
//                   flex items-center justify-center
//                   bg-mainheading 
//                 ">
//                   <feature.icon className="w-6 h-6 text-primary " />
//                 </div>
                
//                 {/* Text Content */}
//                 <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                 <p className="text-gray-400 leading-relaxed">{feature.description}</p>
//               </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// src/components/NewSection.tsx

import React from "react";
import type { IconType } from "react-icons";
import { AudioWaveform, Clock, Send, Shuffle, Wallet } from "lucide-react";
import { BiSupport } from "react-icons/bi";



// Define the type for each feature card
interface FeatureCard {
  id: number;
  icon: IconType;
  title: string;
  description: string;
}

// Data for the feature cards, making it easy to add or modify content
const features: FeatureCard[] = [
  {
    id: 1,
    icon: Clock,
    title: "Quick Sign-Up",
    description:
      "Start in two minutes.",
  },
  {
    id: 2,
    icon: Wallet,
    title: "Pay Any Way",
    description: "ACH, or wire transfer.",
  },
  {
    id: 3,
    icon: Send,
    title: "Fast INR Credit",
    description: "Funds land within hours.",
  },
  {
    id: 4,
    icon: Shuffle,
    title: "Best Rate · Zero Fee",
    description: "World-leading rate, absolutely free.",
  },
  {
    id: 5,
    icon: AudioWaveform,
    title: "Live Tracking",
    description: "Watch every step till it arrives.",
  },
  {
    id: 6,
    icon: BiSupport,
    title: "Dedicated Support",
    description:
      "24/7 assistance, you're never alone.",
  },
];

export default function NewSection() {
  return (
    <section className="relative sm:py-16 py-10">
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              // Parent div creates the gradient border.
              className=" relative p-[1px] rounded-2xl bg-gradient-to-b from-primary/80 via-transparent to-transparent"
            >
              <div className="bg-background border-transparent rounded-2xl">
                {/* Inner div for the card content */}
                <div className="relative p-6 h-full rounded-2xl bg-gradient-to-b from-primary-foreground to-transparent to-92%">
                  
                  {/* START: New Icon Box with Framer effect */}
                  <div className="relative size-16 mb-6 rounded-lg p-px">
                    {/* 1. Dark background for the icon (bottom layer) */}
                    <div className="w-full h-full rounded-lg bg-background flex items-center justify-center relative z-1">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>

                    {/* 2. First gradient overlay for the "stroke" effect */}
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(312deg, #66e8fa 0%, transparent 25%)",
                      }}
                    ></div>

                    {/* 3. Second gradient overlay for the "stroke" effect */}
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(138deg, #66e8fa -4%, transparent 25%)",
                      }}
                    ></div>
                  </div>
                  {/* END: New Icon Box */}

                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}