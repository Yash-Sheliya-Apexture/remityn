// // frontend/src/components/AboutSection.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { motion } from "framer-motion";

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const leftBlockVariants = {
//   hidden: { opacity: 0, x: -100 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// const rightBlockVariants = {
//   hidden: { opacity: 0, x: 100 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// const TrustedCurrencyPartner = () => {
//   return (
//     <section
//       className="TrustedCurrencySection md:py-20 py-5 overflow-hidden"
//       id="about-us"
//     >
//       <div className="container mx-auto px-4">
//         <motion.div
//           className="flex flex-col lg:flex-row items-center gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ amount: 0.2, once: true }}
//         >
//           <motion.div
//             className="w-full lg:w-1/2 order-2 lg:order-1"
//             variants={leftBlockVariants}
//           >
//             <div className="space-y-4 text-center lg:text-left">
//               <div className="inline-block">
//                 <span className="text-subheadingWhite font-medium text-sm uppercase">
//                   <span className="text-subheadingWhite/30">[</span> About us{" "}
//                   <span className="text-subheadingWhite/30">]</span>
//                 </span>
//               </div>

//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Exchange with Confidence,{" "}
//                   <span className="text-primary">Worldwide</span>
//                 </h2>

//                 <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl">
//                   At Remityn, Experience seamless and secure currency exchange
//                   services no matter where you are. Whether you're traveling for
//                   business or leisure, our trusted global network ensures fast,
//                   transparent, and competitive rates—without hidden fees. Join
//                   thousands of satisfied customers who rely on us for safe,
//                   reliable money exchange solutions across borders.
//                 </p>
//               </div>

//               <div className="flex justify-center md:justify-start mt-8">
//                 <Link href="/auth/register" className="inline-block">
//                   <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     Create A Free Account
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             className="w-full lg:w-1/2 order-1 md:order-2"
//             variants={rightBlockVariants}
//           >
//             <div className="relative w-full flex justify-center">
//               <Image
//                 src="/assets/images/TrustedPartner.png"
//                 width={550}
//                 height={800}
//                 alt="Person smiling while using a laptop and wearing headphones"
//                 className="object-contain rounded-3xl"
//                 priority
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default TrustedCurrencyPartner;

// // frontend/src/components/AboutSection.tsx
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const TrustedCurrencyPartner = () => {
//   return (
//     <section
//       className="TrustedCurrencySection sm:py-16 py-10 overflow-hidden"
//       id="about-us"
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-8">
//           <div className="w-full lg:w-1/2 order-2 md:order-1">
//             <div className="space-y-4 text-center md:text-left">
//               <div className="sm:inline-block hidden">
//                 <span className="text-subheadingWhite font-medium text-sm uppercase">
//                   <span className="text-subheadingWhite/30">[</span> About us{" "}
//                   <span className="text-subheadingWhite/30">]</span>
//                 </span>
//               </div>

//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
//                   Exchange with Confidence,{" "}
//                   <span className="text-primary">Worldwide</span>
//                 </h2>

//                 <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//                   At Remityn, Experience seamless and secure currency exchange
//                   services no matter where you are. Whether you're traveling for
//                   business or leisure, our trusted global network ensures fast,
//                   transparent, and competitive rates—without hidden fees. Join
//                   thousands of satisfied customers who rely on us for safe,
//                   reliable money exchange solutions across borders.
//                 </p>
//               </div>

//               <div className="flex justify-center md:justify-start mt-8">
//                 <Link href="/auth/register" className="inline-block">
//                   <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     Create A Free Account
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2 lg:order-2 order-1">
//             <div className="sm:hidden block">
//               <span className="text-subheadingWhite font-medium text-sm mb-1 text-center md:text-left block uppercase">
//                 <span className="text-subheadingWhite/30">[</span> About us
//                 <span className="text-subheadingWhite/30">]</span>
//               </span>
//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Exchange with Confidence{" "}
//                   <span className="text-primary">Worldwide</span>
//                 </h3>
//               </div>
//             </div>

//             <div className="relative w-full flex justify-center">
//               <Image
//                 src="/assets/images/TrustedPartner.png"
//                 width={550}
//                 height={800}
//                 alt="Person smiling while using a laptop and wearing headphones"
//                 className="object-contain rounded-3xl"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrustedCurrencyPartner;

// // frontend/src/components/AboutSection.tsx
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { useAuth } from "@/app/contexts/AuthContext"; // Import useAuth

// const TrustedCurrencyPartner = () => {
//   const { user } = useAuth(); // Get user from AuthContext

//   const buttonText = user ? "Get Started" : "Create A Free Account";
//   const buttonLink = user ? "/dashboard/send/select-balance" : "/auth/register";

//   return (
//     <section
//       className="TrustedCurrencySection sm:py-16 py-10 overflow-hidden"
//       id="about-us"
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-8">
//           <div className="w-full lg:w-1/2 order-2 md:order-1">
//             <div className="space-y-4 text-center md:text-left">
//               <div className="sm:inline-block hidden">
//                 <span className="text-subheadingWhite font-medium text-sm uppercase">
//                   <span className="text-subheadingWhite/30">[</span> About us{" "}
//                   <span className="text-subheadingWhite/30">]</span>
//                 </span>
//               </div>

//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
//                   Exchange with Confidence,{" "}
//                   <span className="text-primary">Worldwide</span>
//                 </h2>

//                 <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//                   At Remityn, Experience seamless and secure currency exchange
//                   services no matter where you are. Whether you're traveling for
//                   business or leisure, our trusted global network ensures fast,
//                   transparent, and competitive rates—without hidden fees. Join
//                   thousands of satisfied customers who rely on us for safe,
//                   reliable money exchange solutions across borders.
//                 </p>
//               </div>

//               <div className="flex justify-center md:justify-start mt-8">
//                 <Link href={buttonLink} className="inline-block">
//                   {" "}
//                   {/* MODIFIED Link */}
//                   <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     {buttonText} {/* MODIFIED Text */}
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2 lg:order-2 order-1">
//             <div className="sm:hidden block">
//               <span className="text-subheadingWhite font-medium text-sm mb-1 text-center md:text-left block uppercase">
//                 <span className="text-subheadingWhite/30">[</span> About us
//                 <span className="text-subheadingWhite/30">]</span>
//               </span>
//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Exchange with Confidence{" "}
//                   <span className="text-primary">Worldwide</span>
//                 </h3>
//               </div>
//             </div>

//             <div className="relative w-full flex justify-center">
//               <Image
//                 src="/assets/images/TrustedPartner.png"
//                 width={550}
//                 height={800}
//                 alt="Person smiling while using a laptop and wearing headphones"
//                 className="object-contain rounded-3xl"
//                 priority
//                 sizes="(max-width: 767px) 100vw, (max-width: 1023px) 768px, (max-width: 1279px) 60vw, 768px"
//                 loading="eager"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrustedCurrencyPartner;

"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react"; // Import React for React.memo
import { useAuth } from "@/app/contexts/AuthContext";

const TrustedCurrencyPartner = () => {
  const { user } = useAuth();

  const buttonText = user ? "Go to Dashboard" : "Join Remityn Now";
  const buttonLink = user ? "/dashboard" : "/auth/register";

  return (
    <section className="TrustedCurrencySection lg:py-16 sm:pb-6 py-10" id="about-us">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center sm:gap-8">
          <div className="w-full lg:w-1/2 order-2 md:order-1">
            {/* ... (content remains the same) ... */}
            <div className="space-y-4 text-center md:text-left">
              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
                  Moving Your Money Powered{" "}
                  <span className="text-primary"> By Remityn </span>
                </h2>

                {/* Dicpription */}
                {/* <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
                  At Remittin, we believe that money should move freely quickly,
                  securely, and affordably across all borders. That’s why we’ve
                  created a seamless currency exchange platform. Backed by
                  real-time rates, <span className="text-primary capitalize font-medium">zero hidden fees</span> , and trusted support.
                </p> */}

                <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
                  At Remityn, we simplify the way you send money across borders.
                  With real-time exchange rates,{" "}
                  <span className="text-primary capitalize font-medium">
                    zero hidden fees
                  </span>{" "}
                  and top-tier security, our platform ensures your funds move
                  quickly, safely, and affordably.
                </p>
              </div>

              <div className="flex justify-center md:justify-start mt-7">
                <Link href={buttonLink} className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium py-3 px-8 h-12.5 lg:text-lg text-base rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    {buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:order-2 order-1">
            {/* ... (content remains the same) ... */}
            <div className="sm:hidden block">
              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
                  Moving Your Money Powered{" "}
                  <span className="text-primary"> By Remityn </span>
                </h3>
              </div>
            </div>
            <div className="image-container">
              <div className="relative">
                <Image
                  src="/assets/images/boy.jpg"
                  width={1000}
                  height={1000}
                  alt="Person smiling while using a laptop and wearing headphones"
                  className="object-contain rounded-2xl w-[85%] h-auto"
                  quality={100}
                  priority // Assuming this is the LCP for /about-us page. If not, set loading="lazy".
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 768px, (max-width: 1279px) 60vw, 768px"
                  // loading="eager" is implied by priority
                />
                {/* Send Amount */}
                <div className="absolute top-[40px] right-0 bg-primary-foreground h-fit sm:p-4 p-2 sm:rounded-2xl rounded-lg">
                  <div className="flex items-center gap-4">
                    <Image
                      src={"/assets/icon/flags/usd.svg"}
                      alt="USD Flag"
                      width={64}
                      height={64}
                      className="sm:size-16 size-10"
                    />
                    <div className="flex flex-col items-start ">
                      <span className="text-subheadingWhite font-medium sm:text-xl text-sm">
                        Send
                      </span>
                      <span className="text-mainheadingWhite font-bold sm:text-2xl text-base">
                        1,000 USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative bottom-[40px] flex justify-end">
                <Image
                  src="/assets/images/couple.webp"
                  width={1000}
                  height={1000}
                  alt="Person smiling while using a laptop and wearing headphones"
                  className="object-contain rounded-2xl w-[85%] h-auto"
                  quality={100}
                  priority // Assuming this is the LCP for /about-us page. If not, set loading="lazy".
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 768px, (max-width: 1279px) 60vw, 768px"
                  // loading="eager" is implied by priority
                />

                {/* Received Amount */}
                <div className="absolute bottom-[40px] left-0 bg-primary-foreground h-fit sm:p-4 p-2 sm:rounded-2xl rounded-lg">
                  <div className="flex items-center gap-4">
                    <Image
                      src={"/assets/icon/flags/inr.svg"}
                      alt="INR Flag"
                      width={64}
                      height={64}
                      className="sm:size-16 size-10"
                    />
                    <div className="flex flex-col items-start ">
                      <span className="text-subheadingWhite font-medium sm:text-xl text-sm">
                        Received
                      </span>
                      <span className="text-mainheadingWhite font-bold sm:text-2xl text-base">
                        86,828.02 INR
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TrustedCurrencyPartner); // Memoize component
