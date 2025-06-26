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




"use client"; // Keep "use client" if future interactions are planned (e.g., button click analytics).
// If purely static, it could be a Server Component, but "use client" is safe.

import React from "react";
import Image from "next/image"; // Import next/image
import Link from "next/link"; // Import next/link for internal navigation

const CallToActionSection: React.FC = () => {
  return (
    <section className="CallToActionSection py-10 lg:py-16">
      <div className="container mx-auto px-4">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            // Using a pseudo-element for the gradient border might be more robust
            // or ensure p-[1px]/p-[2px] on this div if the gradient is meant as a border.
            // Current style applies gradient as a background.
            background:
              "linear-gradient(160deg,rgba(102, 232, 250, 0.5) 0%, rgba(255, 255, 255, 0) 28%, rgba(255, 255, 255, 0) 72%, rgba(102, 232, 250, 0.5) 100%)",
          }}
        >
          <div className="border-2 border-transparent bg-clip-padding">
            {" "}
            {/* This creates an invisible border area if parent has padding */}
            <div className="bg-primary-foreground rounded-3xl p-10 md:p-12 lg:p-14 relative">
              {/* Decorative Shapes */}
              <div className="shep pointer-events-none">
                {" "}
                {/* Added pointer-events-none to prevent interaction with decorative elements */}
                <div className="absolute left-1 top-0">
                  <Image
                    className="z-1" // z-index might not be needed if positioned absolutely within a relative parent
                    alt="" // Decorative image, empty alt
                    src="/assets/images/CollToAc_lect_Shep.svg" // Ensure path is relative to /public
                    width={150} // Provide appropriate width based on SVG's typical size or desired display
                    height={200} // Provide appropriate height
                    loading="lazy" // Decorative, likely below fold or not critical
                  />
                </div>
                <div className="absolute right-1 bottom-0">
                  <Image
                    className="z-1"
                    alt="" // Decorative image, empty alt
                    src="/assets/images/CollToAc_Right_Shep.svg" // Ensure path is relative to /public
                    width={180} // Provide appropriate width
                    height={150} // Provide appropriate height
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                {/* Left Content Block: Headline and Paragraph */}
                <div className="lg:w-2/3 text-center lg:text-left">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl leading-tight text-mainheadingWhite">
                    Start your financial journey with{" "}
                    <span className="text-primary">Remityn today!</span>
                  </h2>
                  <p className="text-subheadingWhite md:text-lg text-base mt-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Ready to take control of your finances? Join Remityn now,
                    and let us help you achieve your financial goals with our
                    tailored solutions and exceptional customer service.
                  </p>
                </div>

                {/* Right Content Block: Call to Action Button */}
                <div className="flex-shrink-0">
                  {/* Use Next.js Link component for internal navigation */}
                  <Link href="/contact-us">
                    <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                      Begin Your Financial Journey
                    </button>
                  </Link>
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
