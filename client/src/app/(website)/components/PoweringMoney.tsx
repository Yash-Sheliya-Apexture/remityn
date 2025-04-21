// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// interface AboutSectionProps {}

// const AboutSection: React.FC<AboutSectionProps> = () => {
//   return (
//     <section className="bg-[#f2f4f7] dark:bg-background md:py-20 py-5 px-4">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
//           <div className="space-y-6 text-center md:text-left">
//             <p className="font-semibold uppercase tracking-wider text-gray dark:text-gray-300">
//               About us
//             </p>
//             <h1 className="text-5xl md:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//               Your Trusted Partner in
//               <span className="text-primary"> Global Currency Exchange</span>
//             </h1>
//             <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-300 pt-2">
//               At Apexture, we make international currency exchange simple,
//               secure, and reliable. With competitive rates, fast transfers, and
//               a customer-first approach, we help individuals and businesses move
//               money across borders with confidence
//             </p>
//             <div className="pt-4">
//               <Link
//                 href="/auth/login"
//                 className="inline-flex items-center justify-center rounded-md bg-primary capitalize text-mainheading px-6 py-3 h-12.5 font-medium transition-colors duration-300 ease-in-out hover:bg-primaryhover focus:outline-none "
//               >
//                 Create a free account
//               </Link>
//             </div>
//           </div>

//           <div className="flex justify-center md:justify-end">
//             <div className="w-full lg:max-w-lg">
//               <Image
//                 src="/assets/images/Tech-recruiter-524x525.jpg"
//                 width={400}
//                 height={400}
//                 alt="Person smiling while using a laptop and wearing headphones"
//                 className="aspect-[4/3] w-full rounded-xl object-cover md:aspect-square lg:aspect-[4/3]"
//               />

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// interface AboutSectionProps {
//   title?: string;
//   subtitle?: string;
//   description?: string;
//   buttonText?: string;
//   buttonLink?: string;
//   imageSrc?: string;
//   imageAlt?: string;
// }

// const AboutSection: React.FC<AboutSectionProps> = ({
//   title = "YOUR TRUSTED PARTNER IN",
//   subtitle = "GLOBAL CURRENCY EXCHANGE",
//   description = "At Apexture, we make international currency exchange simple, secure, and reliable. With competitive rates, fast transfers, and a customer-first approach, we help individuals and businesses move money across borders with confidence",
//   buttonText = "Create A Free Account",
//   buttonLink = "/auth/login",
//   imageSrc = "/assets/images/Tech-recruiter-524x525.jpg",
//   imageAlt = "Person smiling while using a laptop and wearing headphones",
// }) => {
//   return (
//     <section className="relative bg-[#f2f4f7] dark:bg-background md:py-12 py-10 overflow-hidden">
//       <div className="container mx-auto px-4 relative z-20">
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           {/* Content Area */}
//           <div className="w-full md:w-1/2 space-y-6">
//             <div className="space-y-6 text-center md:text-left">
//               <span className="font-semibold uppercase tracking-wider text-xs md:text-base text-gray dark:text-gray-300">
//                 ABOUT US
//               </span>

//               <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-mainheading dark:text-white md:mt-6 mt-4">
//                 {title}  <span className="text-primary">{subtitle}</span>
//               </h2>

//               <p className="text-gray-500 dark:text-gray-300 md:text-lg text-base max-w-prose">
//                 {description}
//               </p>

//               <div className="">
//                 <Link
//                   href={buttonLink}
//                   className="inline-flex items-center justify-center rounded-md bg-primary hover:bg-primaryhover text-mainheading px-6 md:py-3 py-2 md:h-12.5 duration-300 transition-colors ease-in-out font-medium"
//                 >
//                   {buttonText}
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Image Area with animation */}
//           <div className="w-full md:w-1/2 md:mt-8 mt-0">
//             <div className="relative rounded-2xl overflow-hidden border group transition-all duration-500">
//               {/* Image overlay for glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-lime-400/30 z-10"></div>

//               {/* Image with aspect ratio */}
//               <div className="relative aspect-[3/2] overflow-hidden">
//                 <Image
//                   src={imageSrc}
//                   alt={imageAlt}
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;


// frontend/src/components/AboutSection.tsx <--- Or wherever your component file is

'use client'; // <--- Add this line

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/app/contexts/AuthContext"; // <--- Import useAuth

// Remove buttonText and buttonLink from props
interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  // buttonText?: string; // Removed
  // buttonLink?: string; // Removed
  imageSrc?: string;
  imageAlt?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title = "YOUR TRUSTED PARTNER IN",
  subtitle = "GLOBAL CURRENCY EXCHANGE",
  description = "At Apexture, we make international currency exchange simple, secure, and reliable. With competitive rates, fast transfers, and a customer-first approach, we help individuals and businesses move money across borders with confidence",
  // Remove default values for buttonText and buttonLink
  imageSrc = "/assets/images/Tech-recruiter-524x525.jpg",
  imageAlt = "Person smiling while using a laptop and wearing headphones",
}) => {
  // Get user state from AuthContext
  const { user } = useAuth();

  // Determine button properties based on auth state
  const buttonText = user ? "Go to Dashboard" : "Create A Free Account";
  const buttonLink = user ? "/dashboard" : "/auth/register"; // Link to register or dashboard

  return (
    <section className="relative bg-[#f2f4f7] dark:bg-background md:py-12 py-10 overflow-hidden">
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Content Area */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-6 text-center md:text-left">
              <span className="font-semibold uppercase tracking-wider text-xs md:text-base text-gray dark:text-gray-300">
                ABOUT US
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-mainheading dark:text-white md:mt-6 mt-4">
                {title} <span className="text-primary">{subtitle}</span>
              </h2>

              <p className="text-gray-500 dark:text-gray-300 md:text-lg text-base max-w-prose">
                {description}
              </p>

              {/* Use the dynamic button properties */}
              <div className="inline-block">
                <Link
                  href={buttonLink} // <-- Use dynamic link
                  className="bg-primary hover:bg-primaryhover cursor-pointer font-medium py-2 text-sm lg:text-base px-8 md:h-12.5 rounded-full transition-colors duration-300 ease-in-out text-mainheading flex items-center justify-center"
                >
                  {buttonText} {/* <-- Use dynamic text */}
                </Link>
              </div>
            </div>
          </div>

          {/* Image Area with animation */}
          <div className="w-full md:w-1/2 md:mt-8 mt-0">
            <div className="relative rounded-2xl overflow-hidden border group transition-all duration-500">
              {/* Image overlay for glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-lime-400/30 z-10"></div>

              {/* Image with aspect ratio */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority // Keep priority if it's above the fold
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;