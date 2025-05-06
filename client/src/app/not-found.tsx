// // src/app/not-found.tsx
// "use client"; // Keep as a client component to use hooks

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation"; // <-- Import usePathname
// import { TbExternalLink } from "react-icons/tb";
// // No longer need useAuth or Loader2 for this logic

// export default function NotFound() {
//   const pathname = usePathname(); // <-- Get the current path (the one that wasn't found)
//   const [homeHref, setHomeHref] = useState<string>("/"); // Default to public home
//   const [buttonText, setButtonText] = useState<string>("Go to Homepage"); // Default text

//   useEffect(() => {
//     // Determine the correct redirect path based on the pathname
//     if (pathname) { // Ensure pathname is available
//       if (pathname.startsWith("/admin/")) {
//         setHomeHref("/admin"); // <-- Adjust if your admin base path is different
//         setButtonText("Go to Admin Dashboard");
//       } else if (pathname.startsWith("/dashboard/")) {
//         setHomeHref("/dashboard");
//         setButtonText("Go to Dashboard");
//       } else {
//         setHomeHref("/");
//         setButtonText("Go to Homepage");
//       }
//     }
//   }, [pathname]); // Re-run effect if the pathname changes (though unlikely on a 404 page)

//   return (
//     <>
//       <div className="flex justify-center items-center min-h-screen bg-background p-4">
//         <div className="flex flex-col justify-center items-center max-w-lg text-center">
//           {/* Image */}
//           <div className="mb-8">
//             <Image
//               src="/assets/images/construction-fence-medium@1x.webp"
//               alt="Page Not Found Illustration"
//               width={250}
//               height={250}
//               priority
//               className="md:size-60 size-40"
//             />
//           </div>

//           {/* Title */}
//           <h1 className="lg:text-3xl text-xl font-semibold text-mainheading dark:text-white mb-4">
//             Oops! Page Not Found
//           </h1>

//           {/* Subtitle */}
//           <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 text-center">
//             The page you were looking for doesn't seem to exist. Let’s get you back on track.
//           </p>

//           {/* Go to Home/Dashboard/Admin Button */}
//           {/* No loading state needed as pathname is available immediately */}
//           <Link
//             href={homeHref} // Use the state variable determined by pathname
//             className="bg-primary hover:bg-primaryhover text-mainheading text-lg font-medium lg:py-3 py-2 w-full inline-block rounded-full transition-colors duration-200"
//           >
//             {buttonText} {/* Use the dynamic button text */}
//           </Link>

//           {/* Try these tips link */}
//           <div className="mt-6 flex items-center gap-2 text-gray-600 dark:text-gray-400">
//             <Link
//               href="/faqs"
//               className="font-medium text-primary dark:text-primary hover:underline underline-offset-4"
//             >
//               Need help? Visit our FAQs
//             </Link>
//             <TbExternalLink className="size-5" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   TbExternalLink,
//   TbCurrencyDollar,
//   TbCurrencyEuro,
// } from "react-icons/tb";

// export default function NotFound() {
//   const pathname = usePathname();
//   const [homeHref, setHomeHref] = useState<string>("/");
//   const [buttonText, setButtonText] = useState<string>(
//     "Go to Exchange Homepage"
//   );

//   // Currency animation state
//   const [animatedCurrencies, setAnimatedCurrencies] = useState<string[]>([
//     "$",
//     "€",
//     "£",
//     "¥",
//     "₹",
//     "₿",
//     "₽",
//     "₸",
//     "₺",
//     "₴",
//   ]);

//   useEffect(() => {
//     // Determine the correct redirect path based on the pathname
//     if (pathname) {
//       if (pathname.startsWith("/admin/")) {
//         setHomeHref("/admin");
//         setButtonText("Return to Admin Dashboard");
//       } else if (pathname.startsWith("/dashboard/")) {
//         setHomeHref("/dashboard");
//         setButtonText("Return to Dashboard");
//       } else {
//         setHomeHref("/");
//         setButtonText("Return to Exchange Homepage");
//       }
//     }

//     // Currency animation interval
//     const interval = setInterval(() => {
//       setAnimatedCurrencies((prev) => {
//         const newArray = [...prev];
//         // Move the first element to the end
//         newArray.push(newArray.shift() as string);
//         return newArray;
//       });
//     }, 800);

//     return () => clearInterval(interval);
//   }, [pathname]);

//   return (
//     <div className="min-h-screen bg-white dark:bg-background flex justify-center items-center p-4">
//       <div className="max-w-2xl w-full mx-auto">
//         {/* Currency symbols floating animation */}
//         <div className="relative lg:h-20 h-16 mb-6">
//           {animatedCurrencies.map((currency, index) => (
//             <div
//               key={index}
//               className="absolute text-3xl font-bold animate-bounce opacity-70"
//               style={{
//                 left: `${(index * 10) % 100}%`,
//                 animationDelay: `${index * 0.2}s`,
//                 color: index % 2 === 0 ? "#3B82F6" : "#adfa1d",
//                 opacity: 0.7 - index * 0.05,
//               }}
//             >
//               {currency}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white dark:bg-background rounded-2xl overflow-hidden border">
//           {/* 404 Error Display */}
//           <div className="relative dark:bg-primarybox bg-lightgray p-6 text-white text-center">

//             <div className="flex justify-center items-center gap-4">
//               <TbCurrencyDollar className="lg:text-5xl text-mainheading text-3xl animate-pulse" />
//               <h1 className="lg:text-5xl text-3xl font-bold text-mainheading dark:text-primary">
//                 404
//               </h1>
//               <TbCurrencyEuro className="lg:text-5xl text-mainheading text-3xl animate-pulse" />
//             </div>
//           </div>

//           <div className="lg:p-6 p-4">
//             <div className="text-center">
//               <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold capitalize text-gray-700 dark:text-gray-300 mb-3">
//                 This currency page is not found
//               </h2>

//               <p className="text-gray-500 dark:text-gray-300">
//                 The exchange rate you're looking for seems to have fluctuated
//                 out of existence. Let's get you back to a stable market.
//               </p>
//             </div>

//             {/* Currency Exchange Illustration */}
//             <div className="flex justify-center">
//               <div className="relative lg:size-74 size-52">
//                 <div className="absolute inset-0 flex justify-center items-center">
//                   <div className="lg:size-38 size-28 relative rounded-full border border-dashed animate-wiggle">
//                     <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 dark:bg-background border rounded-full flex justify-center items-center text-white">
//                       ₹
//                     </div>
//                     <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 dark:bg-background border rounded-full flex justify-center items-center text-white">
//                       $
//                     </div>
//                     <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-green-500 dark:bg-background border rounded-full flex justify-center items-center text-white">
//                       €
//                     </div>
//                     <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-500 dark:bg-background border rounded-full flex justify-center items-center text-white">
//                       £
//                     </div>
//                   </div>
//                   <div className="absolute flex justify-center items-center lg:size-26 size-20 bg-red-500 rounded-full text-white text-2xl font-bold">
//                     404
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col gap-4 mt-5">
//               <Link
//                 href={homeHref}
//                 className="text-mainheading text-center font-medium bg-primary lg:text-lg text-sm hover:bg-primaryhover lg:py-3 py-2 px-6 rounded-full transition-colors duration-300"
//               >
//                 {buttonText}
//               </Link>

//               <div className="flex text-nowrap justify-center gap-4 lg:text-base text-xs">
//                 <Link
//                   href="/"
//                   className="dark:text-primary text-mainheading font-bold flex items-center gap-1"
//                 >
//                   <span>View Exchange Rates</span>
//                   <TbExternalLink />
//                 </Link>

//                 <Link
//                   href="/faqs"
//                   className="dark:text-primary text-mainheading font-bold flex items-center gap-1"
//                 >
//                   <span>Contact Support</span>
//                   <TbExternalLink />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-4 text-gray-700 dark:text-gray-300 font-medium text-sm">
//           &copy; {new Date().getFullYear()} Currency Exchange Wise Services Ltd.
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/components/Error404Page.tsx
// import Image from "next/image";
// import React from "react";
// import { FiHelpCircle, FiSend } from "react-icons/fi";
// import { MdLockOutline } from "react-icons/md";

// const Error404Page: React.FC = () => {
//   return (
//     <div className="container mx-auto px-4">
//       <section className="Error-Page flex items-center justify-center min-h-screen bg-white dark:bg-background py-10">
//         <div className="overflow-hidden max-w-6xl w-full flex flex-col md:flex-row gap-10">
//           {/* Left Column: Content */}
//           <div className="w-full md:w-1/2 space-y-4 flex flex-col justify-center">
//             <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//               Oops! <span className="text-primary">Something Went Wrong!</span>
//             </h1>

//             <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//               Looks like this page missed the currency route! But don’t worry —
//               your funds and support are just a click away.
//             </p>

//             <ul className="space-y-4 ">
//               <li className="flex items-center gap-2.5">
//                 {/* Example Unicode */}
//                 <FiHelpCircle
//                   size={22}
//                   className="text-neutral-900 dark:text-primary"
//                 />
//                 <a href="/faqs" className="hover:underline">
//                   Question and answers
//                 </a>
//               </li>

//               <li className="flex items-center gap-2.5">
//                 {/* Example Unicode */}
//                 <MdLockOutline
//                   size={22}
//                   className="text-neutral-900  dark:text-primary"
//                 />
//                 <a href="/privacy-policy" className="hover:underline">
//                   Privacy & Policy
//                 </a>
//               </li>

//               <li className="flex items-center gap-2.5">
//                 {/* Example Unicode */}
//                 <FiSend
//                   size={22}
//                   className="text-neutral-900  dark:text-primary"
//                 />
//                 <a href="/support" className="hover:underline">
//                   Send support request
//                 </a>
//               </li>
//             </ul>

//             <div className="inline-block">
//               {/* Pushes button down if needed, though flex-col center handles it */}
//               <a
//                 href="/live-support" // Change link as needed
//                 className="bg-primary hover:bg-primaryhover text-neutral-900 w-fit cursor-pointer font-medium text-sm lg:text-base py-3 px-10 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center"
//               >
//                 Live Support
//               </a>
//             </div>
//           </div>

//           {/* Right Column: Illustration */}
//           <div className="w-full md:w-1/2 justify-center flex items-center">
//             <Image
//               src="/assets/images/Group 8.png"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="max-w-full object-contain sm:aspect-square max-h-[500px] dark:hidden block"
//             />

//             <Image
//               src="/assets/images/Group 7.png"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="max-w-full object-contain sm:aspect-square max-h-[500px] hidden dark:block"
//             />

//             {/* --- End Image --- */}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Error404Page;

// src/components/Error404Page.tsx
"use client"; // <--- ADD THIS LINE AT THE VERY TOP

import Image from "next/image";
import React from "react";
import { FiHelpCircle, FiSend } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { motion } from "framer-motion"; // Import motion

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3, // Start animating children after 0.3s
      staggerChildren: 0.2, // Stagger child animations by 0.2s
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", // Optional: adds a little bounce
      stiffness: 100,
      duration: 0.5 // Can use duration instead of spring
    },
  },
};

const imageVariants = {
  // Slide in from the right and fade in
  hidden: { x: 200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      delay: 0.5, // Delay image slightly after text starts
      duration: 0.7 // Alternative timing
    },
  },
};

// Important: Wrap Next.js Image for Framer Motion compatibility
// No need to redefine if it's implicitly handled by motion on the parent
// const MotionImage = motion(Image); // Keep this if you animate images individually later

const Error404Page: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Use motion.section for the main container */}
      <motion.section
        className="Error-Page flex items-center justify-center min-h-screen bg-white dark:bg-background py-10"
        // Apply container variants for overall page load animation (optional, can be on inner div too)
        initial="hidden"
        animate="visible"
        variants={containerVariants} // You could apply stagger here too
      >
        {/* Inner container for layout and staggering */}
        <motion.div
          className="overflow-hidden max-w-6xl w-full flex flex-col md:flex-row gap-10"
          // Apply variants here to control stagger within this container
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left Column: Content */}
          {/* Wrap the content container for its own entrance (optional but good for structure) */}
          {/* No extra variants needed here if containerVariants handles stagger */}
          <div className="w-full md:w-1/2 space-y-4 flex flex-col justify-center">
            {/* Apply itemVariants to individual animated elements */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase"
            >
              Oops! <span className="text-primary">Something Went Wrong!</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 dark:text-gray-300 lg:text-lg text-base"
            >
              Looks like this page missed the currency route! But don’t worry —
              your funds and support are just a click away.
            </motion.p>

            {/* Apply itemVariants to the UL to animate it as one block, or to each LI */}
            {/* Animating UL as one block is simpler */}
            <motion.ul variants={itemVariants} className="space-y-4">
              {/* You could also wrap each LI in motion.li with itemVariants if you want finer control */}
              <li className="flex items-center gap-2.5">
                <FiHelpCircle
                  size={22}
                  className="text-neutral-900 dark:text-primary"
                />
                <a href="/faqs" className="hover:underline">
                  Question and answers
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MdLockOutline
                  size={22}
                  className="text-neutral-900 dark:text-primary"
                />
                <a href="/privacy-policy" className="hover:underline">
                  Privacy & Policy
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiSend
                  size={22}
                  className="text-neutral-900 dark:text-primary"
                />
                <a href="/support" className="hover:underline">
                  Send support request
                </a>
              </li>
            </motion.ul>

            <motion.div variants={itemVariants} className="inline-block">
              <a
                href="/live-support" // Change link as needed
                className="bg-primary hover:bg-primaryhover text-neutral-900 w-fit cursor-pointer font-medium text-sm lg:text-base py-3 px-10 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center"
              >
                Live Support
              </a>
            </motion.div>
          </div>

          {/* Right Column: Illustration */}
          {/* Use a motion.div wrapper for the image animation */}
          <motion.div
            className="w-full md:w-1/2 justify-center flex items-center"
            variants={imageVariants} // Apply image specific animation
            initial="hidden" // Ensure these are set if not inherited
            animate="visible" // Ensure these are set if not inherited
          >
            {/* Use the regular Image component inside the animated div */}
            <Image
              src="/assets/images/Group 8.png"
              width={500}
              height={500}
              alt="404 Error Illustration Light"
              className="max-w-full object-contain sm:aspect-square max-h-[500px] dark:hidden block"
              priority // Good practice for LCP images
            />

            <Image
              src="/assets/images/Group 7.png"
              width={500}
              height={500}
              alt="404 Error Illustration Dark"
              className="max-w-full object-contain sm:aspect-square max-h-[500px] hidden dark:block"
              priority // Good practice for LCP images
            />
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Error404Page;
