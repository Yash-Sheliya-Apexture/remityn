// import React from "react";

// const CallToActionSection: React.FC = () => {
//   return (
//     <section className="CallToActionSection  py-10 lg:py-16">
//       <div className="container mx-auto px-4">
//         <div
//           className="rounded-3xl overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(160deg,rgba(102, 232, 250, 1) 0%, rgba(255, 255, 255, 0) 28%, rgba(255, 255, 255, 0) 72%, rgba(102, 232, 250, 1) 100%)",
//           }}
//         >
//           <div className="border-2 border-transparent bg-clip-padding">
//           <div className="bg-primary-foreground rounded-3xl p-8 md:p-12 lg:p-16 relative">
//               <div className="shep">
//                 <div className="absolute left-1 top-0">
//                   <img
//                     className="z-1"
//                     alt=""
//                     src="/assets/images/CollToAc_lect_Shep.svg"
//                   />
//                 </div>
//                 <div className="absolute right-1 bottom-0">
//                   <img
//                     className="z-1"
//                     alt=""
//                     src="/assets/images/CollToAc_Right_Shep.svg"
//                   />
//                 </div>
//               </div>
//             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
//               {/* Left Content Block: Headline and Paragraph */}
//               <div className="lg:w-2/3 text-center lg:text-left">
//                 <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl leading-tight text-mainheadingWhite">
//                   Start your financial journey with{" "}
//                   <span className="text-primary">Remityn today!</span>
//                 </h2>
//                 <p className="text-subheadingWhite md:text-lg text-base mt-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
//                   Ready to take control of your finances? Join Remityn now, and
//                   let us help you achieve your financial goals with our tailored
//                   solutions and exceptional customer service.
//                 </p>
//               </div>

//               {/* Right Content Block: Call to Action Button */}
//               <div className="flex-shrink-0">
//                 <a href="/faqs" className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                   Read more FAQs
//                 </a>
//               </div>
//             </div>
//           </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CallToActionSection;

// "use client"; // Keep "use client" if future interactions are planned (e.g., button click analytics).
// // If purely static, it could be a Server Component, but "use client" is safe.

// import React from "react";
// import Image from "next/image"; // Import next/image
// import Link from "next/link"; // Import next/link for internal navigation

// const CallToActionSection: React.FC = () => {
//   return (
//     <section className="CallToActionSection py-10 lg:py-16">
//       <div className="container mx-auto px-4">
//         <div
//           className="rounded-3xl overflow-hidden"
//           style={{
//             // Using a pseudo-element for the gradient border might be more robust
//             // or ensure p-[1px]/p-[2px] on this div if the gradient is meant as a border.
//             // Current style applies gradient as a background.
//             background:
//               "linear-gradient(160deg,rgba(102, 232, 250, 0.5) 0%, rgba(255, 255, 255, 0) 28%, rgba(255, 255, 255, 0) 72%, rgba(102, 232, 250, 0.5) 100%)",
//           }}
//         >
//           <div className="border-2 border-transparent bg-clip-padding">
//             {" "}
//             {/* This creates an invisible border area if parent has padding */}
//             <div className="bg-primary-foreground rounded-3xl p-8 md:p-10 lg:p-12 relative">
//               {/* Decorative Shapes */}
//               <div className="shep pointer-events-none">
//                 {" "}
//                 {/* Added pointer-events-none to prevent interaction with decorative elements */}
//                 <div className="absolute left-1 top-0">
//                   <Image
//                     className="z-1" // z-index might not be needed if positioned absolutely within a relative parent
//                     alt="" // Decorative image, empty alt
//                     src="/assets/images/CollToAc_lect_Shep.svg" // Ensure path is relative to /public
//                     width={150} // Provide appropriate width based on SVG's typical size or desired display
//                     height={200} // Provide appropriate height
//                     loading="lazy" // Decorative, likely below fold or not critical
//                   />
//                 </div>
//                 <div className="absolute right-1 bottom-0">
//                   <Image
//                     className="z-1"
//                     alt="" // Decorative image, empty alt
//                     src="/assets/images/CollToAc_Right_Shep.svg" // Ensure path is relative to /public
//                     width={180} // Provide appropriate width
//                     height={150} // Provide appropriate height
//                     loading="lazy"
//                   />
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
//                 {/* Left Content Block: Headline and Paragraph */}
//                 <div className="lg:w-2/3 text-center lg:text-left">
//                   <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl leading-tight text-mainheadingWhite">
//                     Start your financial journey with{" "}
//                     <span className="text-primary">Remityn today!</span>
//                   </h2>
//                   <p className="text-subheadingWhite md:text-lg text-base mt-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
//                     Ready to take control of your finances? Join Remityn now,
//                     and let us help you achieve your financial goals with our
//                     tailored solutions and exceptional customer service.
//                   </p>
//                 </div>

//                 {/* Right Content Block: Call to Action Button */}
//                 <div className="flex-shrink-0">
//                   {/* Use Next.js Link component for internal navigation */}
//                   <Link href="/contact-us">
//                     <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                       Begin Your Financial Journey
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(CallToActionSection);

// "use client"; // Keep "use client" if future interactions are planned (e.g., button click analytics).
// // If purely static, it could be a Server Component, but "use client" is safe.

// import React from "react";
// import Image from "next/image"; // Import next/image
// import Link from "next/link"; // Import next/link for internal navigation

// const CallToActionSection: React.FC = () => {
//   return (
//     <section className="CallToActionSection py-10 lg:py-16">
//       <div className="container mx-auto px-4">
//         <div
//           className="rounded-3xl overflow-hidden"
//           style={{
//             // Using a pseudo-element for the gradient border might be more robust
//             // or ensure p-[1px]/p-[2px] on this div if the gradient is meant as a border.
//             // Current style applies gradient as a background.
//             background:
//               "linear-gradient(160deg,rgba(102, 232, 250, 0.5) 0%, rgba(255, 255, 255, 0) 28%, rgba(255, 255, 255, 0) 72%, rgba(102, 232, 250, 0.5) 100%)",
//           }}
//         >
//           <div className="border-2 border-transparent bg-clip-padding">
//             {" "}
//             {/* This creates an invisible border area if parent has padding */}
//             <div className="bg-primary-foreground rounded-3xl p-8 md:p-10 lg:p-12 relative">
//               {/* Decorative Shapes */}
//               <div className="shep pointer-events-none">
//                 {" "}
//                 {/* Added pointer-events-none to prevent interaction with decorative elements */}
//                 <div className="absolute left-1 top-0">
//                   <Image
//                     className="z-1" // z-index might not be needed if positioned absolutely within a relative parent
//                     alt="" // Decorative image, empty alt
//                     src="/assets/images/CollToAc_lect_Shep.svg" // Ensure path is relative to /public
//                     width={150} // Provide appropriate width based on SVG's typical size or desired display
//                     height={200} // Provide appropriate height
//                     loading="lazy" // Decorative, likely below fold or not critical
//                   />
//                 </div>
//                 <div className="absolute left-1 bottom-0">
//                   <Image
//                     className="z-1"
//                     alt="" // Decorative image, empty alt
//                     src="/assets/images/CollToAc_Right_Shep.svg" // Ensure path is relative to /public
//                     width={180} // Provide appropriate width
//                     height={150} // Provide appropriate height
//                     loading="lazy"
//                   />
//                 </div>
//               </div>

//               {/* Left-side Content */}
//               <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
//                 {/* Left Content Block: Headline and Paragraph */}
//                 <div className="lg:w-2/3 text-center lg:text-left space-y-6">
//                   <h2 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight text-mainheadingWhite">
//                     Start your financial journey with{" "}
//                     <span className="text-primary">Remityn today!</span>
//                   </h2>
//                   <p className="text-subheadingWhite md:text-lg text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
//                     Ready to take control of your finances? Join Remityn now,
//                     and let us help you achieve your financial goals with our
//                     tailored solutions and exceptional customer service.
//                   </p>

//                   {/* Right Content Block: Call to Action Button */}
//                   <Link href="/contact-us">
//                     <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                       Begin Your Financial Journey
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(CallToActionSection);

// "use client"; // Keep "use client" if future interactions are planned (e.g., button click analytics).
// // If purely static, it could be a Server Component, but "use client" is safe.

// import React from "react";
// import Image from "next/image"; // Import next/image
// import Link from "next/link"; // Import next/link for internal navigation

// const CallToActionSection: React.FC = () => {
//   return (
//     <section className="CallToActionSection py-10 lg:py-16">
//       <div className="container mx-auto px-4">
//         <div
//           className="rounded-3xl overflow-hidden"
//           style={{
//             // Using a pseudo-element for the gradient border might be more robust
//             // or ensure p-[1px]/p-[2px] on this div if the gradient is meant as a border.
//             // Current style applies gradient as a background.
//             background:
//               "linear-gradient(160deg,rgba(102, 232, 250, 0.5) 0%, rgba(255, 255, 255, 0) 28%",
//           }}
//         >
//           <div className="border-2 border-transparent bg-clip-padding">
//             {" "}
//             {/* This creates an invisible border area if parent has padding */}
//             <div className="bg-primary-foreground rounded-3xl relative">
//               {/* Decorative Shapes */}
//               <div className="shep pointer-events-none">
//                 {" "}
//                 {/* Added pointer-events-none to prevent interaction with decorative elements */}
//                 <div className="absolute left-1 top-0">
//                   <Image
//                     className="z-1" // z-index might not be needed if positioned absolutely within a relative parent
//                     alt="" // Decorative image, empty alt
//                     src="/assets/images/CollToAc_lect_Shep.svg" // Ensure path is relative to /public
//                     width={150} // Provide appropriate width based on SVG's typical size or desired display
//                     height={200} // Provide appropriate height
//                     loading="lazy" // Decorative, likely below fold or not critical
//                   />
//                 </div>
//                 <div className="absolute left-1 bottom-0">
//                   <Image
//                     className="z-1"
//                     alt="" // Decorative image, empty alt
//                     src="/assets/images/CollToAc_Right_Shep.svg" // Ensure path is relative to /public
//                     width={150} // Provide appropriate width
//                     height={200} // Provide appropriate height
//                     loading="lazy"
//                   />
//                 </div>
//               </div>

//               {/* Main Content Area: Text on Left, Image on Right */}
//               <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
//                 {/* Left Content Block: Headline, Paragraph, and Button */}
//                 <div className="lg:w-1/2 text-center lg:text-left space-y-6 sm:p-8 p-6">
//                   <h2 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight text-mainheadingWhite">
//                     Start your financial journey with{" "}
//                     <span className="text-primary">Remityn today!</span>
//                   </h2>

//                   <p className="text-subheadingWhite md:text-lg text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
//                     Ready to take control of your finances? Join Remityn now,
//                     and let us help you achieve your financial goals with our
//                     tailored solutions and exceptional customer service.
//                   </p>

//                   {/* Call to Action Button */}
//                   <div className="flex justify-center lg:justify-start">
//                     <Link href="/contact-us">
//                       <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                         Begin Your Financial Journey
//                       </button>
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Right Image Block */}
//                 <div className="lg:w-1/2 mt-8 lg:mt-0 sm:block hidden">
//                   <Image
//                     src="/assets/images/CTA.webp" // EXAMPLE: Replace with your image path
//                     alt="Illustration of financial planning and success with Remityn" // EXAMPLE: Replace with descriptive alt text
//                     width={600} // Example width, adjust as needed
//                     height={600} // Example height, adjust as needed
//                     className="object-cover w-full h-full rounded-r-3xl rounded-br-3xl" // Ensures image is responsive within its container
//                     priority // Consider 'priority' if this image is critical for LCP
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(CallToActionSection);

// "use client"; // Keep "use client" if future interactions are planned (e.g., button click analytics).
// // If purely static, it could be a Server Component, but "use client" is safe.

// import React from "react";
// import Image from "next/image"; // Import next/image
// import Link from "next/link"; // Import next/link for internal navigation

// const CallToActionSection: React.FC = () => {
//   return (
//     <section className="CallToActionSection py-10 lg:py-16">
//       <div className="container mx-auto px-4">
//         <div
//           className="rounded-3xl overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(160deg,rgba(102, 232, 250, 0.5) 0%, rgba(255, 255, 255, 0) 28%)",
//           }}
//         >
//           <div className="border-2 border-transparent bg-clip-padding">
//             <div className="bg-primary-foreground rounded-3xl relative">
//               {/* Decorative Shapes */}
//               <div className="shep pointer-events-none">
//                 <div className="absolute left-1 top-0">
//                   <Image
//                     className="z-1" // Consider Tailwind's z-[1] or z-0 if you need it behind z-10 content. Default is z-auto.
//                     alt="" // Decorative image, empty alt
//                     src="/assets/images/CollToAc_lect_Shep.svg"
//                     width={150}
//                     height={200}
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="absolute left-1 bottom-0">
//                   <Image
//                     className="z-1" // Consider Tailwind's z-[1] or z-0
//                     alt="" // Decorative image, empty alt
//                     src="/assets/images/CollToAc_Right_Shep.svg"
//                     width={150}
//                     height={200}
//                     loading="lazy"
//                   />
//                 </div>
//               </div>

//               {/* Main Content Area: Text on Left, Image on Right */}
//               <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
//                 {/* Left Content Block: Headline, Paragraph, and Button */}
//                 <div className="lg:w-1/2 text-center lg:text-left space-y-6 sm:p-8 p-6">
//                   <h2 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight text-mainheadingWhite">
//                     Start your financial journey with{" "}
//                     <span className="text-primary">Remityn today!</span>
//                   </h2>

//                   <p className="text-subheadingWhite md:text-lg text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
//                     Ready to take control of your finances? Join Remityn now,
//                     and let us help you achieve your financial goals with our
//                     tailored solutions and exceptional customer service.
//                   </p>

//                   {/* Call to Action Button */}
//                   <div className="flex justify-center lg:justify-start">
//                     <Link href="/contact-us">
//                       <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                         Begin Your Financial Journey
//                       </button>
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Right Image Block */}
//                 {/* This container is hidden by default, shown from 'sm' breakpoint up. */}
//                 {/* On lg screens, it takes 1/2 width. Below lg (but >= sm), it's a block, so takes full width. */}
//                 <div className="lg:w-1/2 w-full mt-8 lg:mt-0 sm:block hidden">
//                   <Image
//                     src="/assets/images/CTA.webp"
//                     alt="Illustration of financial planning and success with Remityn"
//                     // IMPORTANT: The width and height props MUST match the aspect ratio of your actual CTA.webp image.
//                     // If CTA.webp is 600x600px (1:1 ratio), these are correct.
//                     // If CTA.webp is, e.g., 800x450px (16:9 ratio), use width={800} height={450} or width={16} height={9}.
//                     width={600}
//                     height={600}
//                     // - `w-full`: Image will take full width of its parent container.
//                     // - `h-auto`: Height will adjust automatically to maintain the aspect ratio defined by width/height props.
//                     // - `object-cover`: Ensures the image content covers the element's box. Since the box now has the correct aspect ratio, no cropping of the image content will occur.
//                     // - `rounded-r-3xl`: Applies rounding to the right corners of the image, fitting the card design.
//                     className="w-full h-auto object-cover"
//                     priority // Retained 'priority' as it was there; assess if this image is truly LCP critical.
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(CallToActionSection);

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { FaExchangeAlt, FaLock } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const CallToActionSection: React.FC = () => {
  return (
    <section className="CallToActionSection py-10 lg:py-16">
      <div className="container mx-auto px-4">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg,rgba(102, 232, 250, 0.5) 0%, rgba(255, 255, 255, 0) 28%)",
          }}
        >
          <div className="border-2 border-transparent bg-clip-padding">
            <div className="bg-primary-foreground rounded-3xl relative">
              {/* Decorative Shapes */}
              <div className="shep pointer-events-none">
                <div className="absolute left-1 top-0">
                  <Image
                    className="z-[1]"
                    alt=""
                    src="/assets/images/CollToAc_lect_Shep.svg"
                    width={150}
                    height={200}
                    loading="lazy"
                  />
                </div>
                <div className="absolute left-1 bottom-0">
                  <Image
                    className="z-[1]"
                    alt=""
                    src="/assets/images/CollToAc_Right_Shep.svg"
                    width={150}
                    height={200}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
                {/* Left Content */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-6 sm:p-8 p-6">
                  <h2 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight text-mainheadingWhite">
                    Start your financial journey with{" "}
                    <span className="text-primary">Remityn today!</span>
                  </h2>

                  <p className="text-subheadingWhite md:text-lg text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Ready to take control of your finances? Join Remityn now,
                    and let us help you achieve your financial goals with our
                    tailored solutions and exceptional customer service.
                  </p>

                  {/* 🔰 Feature Tags
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <span className="bg-secondarybox text-mainheadingWhite font-medium flex items-center gap-2 text-sm px-4 py-2 rounded-full">
                      Secure Transfers
                    </span>
                    <span className="bg-secondarybox text-mainheadingWhite font-medium flex items-center gap-2 text-sm px-4 py-2 rounded-full">
                      Best Exchange Rates
                    </span>
                    <span className="bg-secondarybox text-mainheadingWhite flex items-center gap-2 font-medium text-sm px-4 py-2 rounded-full">
                      24/7 Support
                    </span>
                  </div> */}

                  {/* CTA Button */}
                  <div className="flex justify-center lg:justify-start">
                    <Link href="/contact-us">
                      <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center mt-4">
                        Begin Your Financial Journey
                      </button>
                    </Link>
                  </div>
                </div>
                

                {/* Right Image */}
                <div className="lg:w-1/2 w-full mt-8 lg:mt-0 sm:block hidden">
                  <Image
                    src="/assets/images/CTA.webp"
                    alt="Illustration of financial planning and success with Remityn"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CallToActionSection);
