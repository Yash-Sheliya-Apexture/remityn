// import React from "react";

// import Image from "next/image";
// import { FaChartLine, FaHeadset } from "react-icons/fa6";
// import { FiGlobe } from "react-icons/fi";
// import { FaFastForward } from "react-icons/fa";

// const FeaturesSection: React.FC = () => {
//   return (
//     <div className="bg-white lg:py-10 py-5 dark:bg-background px-4">
//       <section
//         className="flex flex-col lg:gap-10 gap-8 container mx-auto"
//         id="features"
//       >
//         {/* Heading Section */}
//         <div className="flex flex-col gap-5">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Security, Speed,
//             <span className="text-primary"> Savings & Support </span>
//           </h1>
//         </div>

//         {/* Features Grid */}
//         <div className="grid gap-y-4 gap-x-4 md:grid-cols-2 md:grid-rows-6 lg:gap-x-8 lg:gap-y-8">
//           {/* Feature Card 1: Security (Large) */}
//           <div className="row-span-4 flex flex-col border dark:border-none shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-white/5">
//             <Image
//               src="/assets/images/colorful-illustration-colorful-padlock-with-colorful-leaves-flowers_1122354-15513.jpg"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />

//             <div className="flex flex-col gap-3 p-4">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span className="text-primary font-bold">Secure</span> Every
//                 Step of the Way
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We prioritize your security. Our advanced encryption and
//                 rigorous verification process protect your funds and personal
//                 information. Your peace of mind is our top priority.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 2: Speed (Small) */}
//           <div className="row-span-2 flex flex-col lg:gap-6 border dark:border-none shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-white/5 lg:p-6 p-4">
//             <FaFastForward className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Our transfers are{" "}
//                   <span className="text-primary font-bold">Speedy</span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Receive your money swiftly. Enjoy fast processing times and
//                 real-time tracking to know when your funds arrive.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 3: Support (Large) */}
//           <div className="row-span-4 flex flex-col border dark:border-none shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-white/5">
//             <Image
//               src="/assets/images/friendly-customer.jpg"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />

//             <div className="flex flex-col gap-3 p-4">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Need{" "}
//                   <span className="text-primary font-bold">Support &nbsp;</span>
//                   ? We’re here!
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our dedicated support team is available to answer all your
//                 questions and provide guidance throughout your transfer journey.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 4: Savings (Small) */}
//           <div className="row-span-2 flex flex-col lg:gap-6 border dark:border-none shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-white/5 lg:p-6 p-4">
//             <FaChartLine className="lg:size-8 size-6 text-mainheading  dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">Save</span> with high
//                   exchange rates
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Get the best value for your hard-earned money, so that more
//                 makes it back to your loved ones.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 5: Support (Large) */}
//           <div className="row-span-4 flex flex-col border dark:border-none shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-white/5">
//             <Image
//               src="/assets/images/dynamicRate.png"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />

//             <div className="flex flex-col gap-3 p-4">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Stay ahead with live &nbsp;
//                   <span className="text-primary font-bold capitalize">
//                     exchange rates. &nbsp;
//                   </span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Stay updated with real-time currency exchange rates. Track
//                 fluctuations and compare global currencies instantly to make
//                 informed financial decisions.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 6: Reach (Small) */}
//           <div className="row-span-2 flex flex-col border dark:border-none shadow-sm lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-white dark:bg-white/5 lg:p-6 p-4">
//             <FiGlobe className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">
//                     Worldwide Reach
//                   </span>{" "}
//                   , Local Touch
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our platform combines international reach with personalized
//                 service, making currency exchange feel just right—no matter
//                 where you are.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 7: Money (Large) */}
//           <div className="row-span-4 flex flex-col border dark:border-none shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-white/5">
//             <Image
//               src="/assets/images/withoutborder.png"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />

//             <div className="flex flex-col gap-3 p-4">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Exchange &nbsp;
//                   <span className="text-primary font-bold capitalize">
//                     Money &nbsp;
//                   </span>
//                   Without Borders
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Seamless global money transfers made simple. Instantly exchange
//                 currency across countries with transparent rates, no hidden
//                 fees, and total peace of mind.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 8: Reach (Small) */}
//           <div className="row-span-2 flex flex-col border dark:border-none shadow-sm lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-white dark:bg-white/5 lg:p-6 p-4">
//             <FaHeadset className="lg:size-8 size-6 text-mainheading  dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">24/7 Customer </span>
//                   Support
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We're here for you—day or night. Our dedicated support team is
//                 available 24/7 to assist with any questions, concerns, or
//                 issues, ensuring a smooth and stress-free currency exchange
//                 experience anytime, anywhere.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FeaturesSection;

// "use client"; // Required for Framer Motion

// import React from "react";
// import Image from "next/image";
// import { FaChartLine, FaHeadset, FaFastForward } from "react-icons/fa";
// import { FiGlobe } from "react-icons/fi";
// import { motion } from "framer-motion"; // Import motion

// // --- Animation Variants ---

// // Variants for the overall section container (to trigger animations)
// const sectionVariants = {
//   hidden: {}, // Container doesn't need its own visual animation
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger the direct children (heading container, grid container)
//     },
//   },
// };

// // Variants for the heading section
// const headingVariants = {
//   hidden: { opacity: 0, y: -30 }, // Start invisible and slightly above
//   visible: {
//     opacity: 1,
//     y: 0, // Animate to original position
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// // Variants for the grid container (to stagger the cards within)
// const gridContainerVariants = {
//   hidden: {}, // Grid container itself doesn't need visual animation
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Delay between each card animation starting
//       delayChildren: 0.2, // Start card animations slightly after heading appears
//     },
//   },
// };

// // Variants for each individual feature card
// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.9, y: 20 }, // Start invisible, slightly smaller, and down
//   visible: {
//     opacity: 1,
//     scale: 1, // Animate to full size
//     y: 0, // Animate to original vertical position
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };

// // --- FeaturesSection Component ---
// const FeaturesSection: React.FC = () => {
//   return (
//     // Add overflow-hidden to the main container if needed
//     <div className="bg-white lg:py-10 py-5 dark:bg-background px-4 overflow-hidden">
//       {/* Wrap the section content with motion for triggering */}
//       <motion.section
//         className="flex flex-col lg:gap-10 gap-8 container mx-auto"
//         id="features"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: false }} // Trigger when 10% visible, animate every time
//       >
//         {/* Heading Section - Apply motion */}
//         <motion.div
//           className="flex flex-col gap-5"
//           variants={headingVariants} // Apply heading animation
//         >
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Security, Speed,
//             <span className="text-primary"> Savings & Support </span>
//           </h1>
//         </motion.div>
//         {/* Features Grid - Apply motion container for staggering */}
//         <motion.div
//           className="grid gap-y-4 gap-x-4 md:grid-cols-2 md:grid-rows-6 lg:gap-x-8 lg:gap-y-8"
//           variants={gridContainerVariants} // Apply grid container variants for staggering
//         >
//           {/* Feature Card 1: Security (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30" // Adjusted dark bg/border
//             variants={cardVariants} // Apply card animation
//           >
//             <Image
//               src="/assets/images/colorful-illustration-colorful-padlock-with-colorful-leaves-flowers_1122354-15513.jpg"
//               width={500}
//               height={384} // Adjust height based on aspect ratio if known
//               alt="Secure padlock illustration"
//               className="w-full object-cover lg:h-96 md:h-60 h-42" // h-42 seems small, maybe h-48?
//               priority // If above the fold
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               {" "}
//               {/* Added lg:p-6 */}
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span className="text-primary font-bold">Secure</span> Every
//                 Step of the Way
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We prioritize your security. Our advanced encryption and
//                 rigorous verification process protect your funds and personal
//                 information. Your peace of mind is our top priority.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 2: Speed (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply card animation
//           >
//             <FaFastForward className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Our transfers are{" "}
//                   <span className="text-primary font-bold">Speedy</span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Receive your money swiftly. Enjoy fast processing times and
//                 real-time tracking to know when your funds arrive.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 3: Support (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply card animation
//           >
//             <Image
//               src="/assets/images/friendly-customer.jpg"
//               width={500}
//               height={384}
//               alt="Friendly customer support agent"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Need <span className="text-primary font-bold">Support </span>?
//                   We’re here!
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our dedicated support team is available to answer all your
//                 questions and provide guidance throughout your transfer journey.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 4: Savings (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply card animation
//           >
//             <FaChartLine className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">Save</span> with high
//                   exchange rates
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Get the best value for your hard-earned money, so that more
//                 makes it back to your loved ones.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 5: Rates (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply card animation
//           >
//             <Image
//               src="/assets/images/dynamicRate.png"
//               width={500}
//               height={384}
//               alt="Graph showing dynamic exchange rates"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Stay ahead with live
//                   <span className="text-primary font-bold capitalize">
//                     exchange rates
//                   </span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Stay updated with real-time currency exchange rates. Track
//                 fluctuations and compare global currencies instantly to make
//                 informed financial decisions.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 6: Reach (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col border dark:border-neutral-700/50 shadow-sm lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply card animation
//           >
//             <FiGlobe className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">
//                     Worldwide Reach
//                   </span>{" "}
//                   , Local Touch
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our platform combines international reach with personalized
//                 service, making currency exchange feel just right—no matter
//                 where you are.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 7: Money (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply card animation
//           >
//             <Image
//               src="/assets/images/withoutborder.png"
//               width={500}
//               height={384}
//               alt="Illustration of money exchange without borders"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Exchange
//                   <span className="text-primary font-bold capitalize">
//                     Money
//                   </span>
//                   Without Borders
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Seamless global money transfers made simple. Instantly exchange
//                 currency across countries with transparent rates, no hidden
//                 fees, and total peace of mind.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 8: 24/7 Support (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col border dark:border-neutral-700/50 shadow-sm lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply card animation
//           >
//             <FaHeadset className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">24/7 Customer </span>
//                   Support
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We're here for you—day or night. Our dedicated support team is
//                 available 24/7 to assist with any questions, concerns, or
//                 issues, ensuring a smooth and stress-free currency exchange
//                 experience anytime, anywhere.
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>{" "}
//       </motion.section>
//     </div>
//   );
// };

// export default FeaturesSection; // Ensure export name matches component name

// "use client"; // Required for Framer Motion

// import React from "react";
// import Image from "next/image";
// import { FaChartLine, FaHeadset, FaFastForward } from "react-icons/fa";
// import { FiGlobe } from "react-icons/fi";
// import { motion } from "framer-motion"; // Import motion

// // Variants for the overall section container
// const sectionVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// // Variants for the heading section
// const headingVariants = {
//   hidden: { opacity: 0, y: -30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// // Variants for the grid container (to stagger the cards within)
// const gridContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Increase stagger slightly for flip effect
//       delayChildren: 0.2,
//     },
//   },
// };

// // NEW Variants for each individual feature card (3D Flip)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     rotateY: -90, // Start rotated 90 degrees back on Y-axis
//     scale: 0.9, // Start slightly smaller
//     transformOrigin: "center left", // Rotate from the left edge (adjust if needed)
//   },
//   visible: {
//     opacity: 1,
//     rotateY: 0, // Animate to normal rotation
//     scale: 1, // Animate to full size
//     transition: {
//       duration: 0.6, // Give the flip some time
//       ease : "easeOut"
//     },
//   },
// };

// // --- FeaturesSection Component ---
// const FeaturesSection: React.FC = () => {
//   return (
//     <div className="bg-white lg:py-10 py-5 dark:bg-background px-4 overflow-hidden">
//       {/* Wrap the section content with motion for triggering */}
//       <motion.section
//         className="flex flex-col lg:gap-10 gap-8 container mx-auto"
//         id="features"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: false }}
//       >
//         {/* Heading Section - Apply motion */}
//         <motion.div className="flex flex-col gap-5" variants={headingVariants}>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Security, Speed,
//             <span className="text-primary"> Savings & Support </span>
//           </h1>
//         </motion.div>
//         {/* Features Grid - Apply motion container for staggering */}
//         <motion.div
//           className="grid gap-y-4 gap-x-4 md:grid-cols-2 md:grid-rows-6 lg:gap-x-8 lg:gap-y-8"
//           variants={gridContainerVariants}
//         >
//           {/* --- Apply motion to EACH feature card --- */}

//           {/* Feature Card 1: Security (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <Image
//               src="/assets/images/colorful-illustration-colorful-padlock-with-colorful-leaves-flowers_1122354-15513.jpg"
//               width={500}
//               height={384}
//               alt="Secure padlock illustration"
//               className="w-full object-cover lg:h-96 md:h-60 h-48" // Increased min height slightly
//               priority
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span className="text-primary font-bold">Secure</span> Every
//                 Step of the Way
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We prioritize your security...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 2: Speed (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4" // Added justify-center
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <FaFastForward className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Our transfers are{" "}
//                   <span className="text-primary font-bold">Speedy</span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Receive your money swiftly...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 3: Support (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <Image
//               src="/assets/images/friendly-customer.jpg"
//               width={500}
//               height={384}
//               alt="Friendly customer support agent"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Need <span className="text-primary font-bold">Support </span>?
//                   We’re here!
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our dedicated support team is available...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 4: Savings (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <FaChartLine className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">Save</span> with high
//                   exchange rates
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Get the best value for your hard-earned money...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 5: Rates (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <Image
//               src="/assets/images/dynamicRate.png"
//               width={500}
//               height={384}
//               alt="Graph showing dynamic exchange rates"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Stay ahead with live
//                   <span className="text-primary font-bold capitalize">
//                     exchange rates
//                   </span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Stay updated with real-time currency exchange rates...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 6: Reach (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <FiGlobe className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">
//                     Worldwide Reach
//                   </span>{" "}
//                   , Local Touch
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our platform combines international reach...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 7: Money (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <Image
//               src="/assets/images/withoutborder.png"
//               width={500}
//               height={384}
//               alt="Illustration of money exchange without borders"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Exchange
//                   <span className="text-primary font-bold capitalize">
//                     Money
//                   </span>
//                   Without Borders
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Seamless global money transfers made simple...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 8: 24/7 Support (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <FaHeadset className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">24/7 Customer </span>
//                   Support
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We're here for you—day or night...
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>{" "}
//         {/* End Features Grid */}
//       </motion.section>
//     </div>
//   );
// };

// export default FeaturesSection;

// "use client"; // Required for Framer Motion

// import React from "react";
// import Image from "next/image";
// import { FaChartLine, FaHeadset, FaFastForward } from "react-icons/fa";
// import { FiGlobe } from "react-icons/fi";
// import { motion } from "framer-motion"; // Import motion

// // --- Animation Variants ---

// // Variants for the overall section container
// const sectionVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// // Variants for the heading section
// const headingVariants = {
//   hidden: { opacity: 0, y: -30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// // Variants for the grid container (to stagger the cards within)
// const gridContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Adjust stagger time as needed
//       delayChildren: 0.2,
//     },
//   },
// };

// // NEW Variants for each individual feature card (Gentle Spring Slide-Up)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 50, // Start 50px below the final position
//   },
//   visible: {
//     opacity: 1,
//     y: 0, // Animate to the final vertical position
//     transition: {
//       type: "spring", // Use spring physics for a subtle bounce
//       damping: 15, // Controls how quickly the spring settles (higher = less bounce)
//       stiffness: 100, // Controls the spring's strength/speed
//       // Optional: add duration if needed, but spring physics often handle timing implicitly
//       // duration: 0.6
//     },
//   },
// };

// // --- FeaturesSection Component ---
// const FeaturesSection: React.FC = () => {
//   return (
//     <div className="bg-white lg:py-10 py-5 dark:bg-background px-4 overflow-hidden">
//       {" "}
//       {/* Keep overflow hidden */}
//       <motion.section
//         className="flex flex-col lg:gap-10 gap-8 container mx-auto"
//         id="features"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: false }}
//       >
//         {/* Heading Section - Apply motion */}
//         <motion.div className="flex flex-col gap-5" variants={headingVariants}>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Security, Speed,
//             <span className="text-primary"> Savings & Support </span>
//           </h1>
//         </motion.div>

//         {/* Features Grid - Apply motion container for staggering */}
//         <motion.div
//           className="grid gap-y-4 gap-x-4 md:grid-cols-2 md:grid-rows-6 lg:gap-x-8 lg:gap-y-8"
//           variants={gridContainerVariants}
//         >
//           {/* --- Apply motion to EACH feature card --- */}

//           {/* Feature Card 1: Security (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW Spring Slide-Up animation
//             // No perspective needed here
//           >
//             <Image
//               src="/assets/images/colorful-illustration-colorful-padlock-with-colorful-leaves-flowers_1122354-15513.jpg"
//               width={500}
//               height={384}
//               alt="Secure padlock illustration"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//               priority
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span className="text-primary font-bold">Secure</span> Every
//                 Step of the Way
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We prioritize your security...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 2: Speed (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW Spring Slide-Up animation
//           >
//             <FaFastForward className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Our transfers are{" "}
//                   <span className="text-primary font-bold">Speedy</span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Receive your money swiftly...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 3: Support (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW Spring Slide-Up animation
//           >
//             <Image
//               src="/assets/images/friendly-customer.jpg"
//               width={500}
//               height={384}
//               alt="Friendly customer support agent"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Need <span className="text-primary font-bold">Support </span>?
//                   We’re here!
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our dedicated support team is available...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 4: Savings (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW Spring Slide-Up animation
//           >
//             <FaChartLine className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">Save</span> with high
//                   exchange rates
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Get the best value for your hard-earned money...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 5: Rates (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW Spring Slide-Up animation
//           >
//             <Image
//               src="/assets/images/dynamicRate.png"
//               width={500}
//               height={384}
//               alt="Graph showing dynamic exchange rates"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Stay ahead with live
//                   <span className="text-primary font-bold capitalize">
//                     exchange rates
//                   </span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Stay updated with real-time currency exchange rates...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 6: Reach (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW Spring Slide-Up animation
//           >
//             <FiGlobe className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">
//                     Worldwide Reach
//                   </span>{" "}
//                   , Local Touch
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our platform combines international reach...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 7: Money (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW Spring Slide-Up animation
//           >
//             <Image
//               src="/assets/images/withoutborder.png"
//               width={500}
//               height={384}
//               alt="Illustration of money exchange without borders"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Exchange
//                   <span className="text-primary font-bold capitalize">
//                     Money
//                   </span>
//                   Without Borders
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Seamless global money transfers made simple...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 8: 24/7 Support (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW Spring Slide-Up animation
//           >
//             <FaHeadset className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">24/7 Customer </span>
//                   Support
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We're here for you—day or night...
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>{" "}
//         {/* End Features Grid */}
//       </motion.section>
//     </div>
//   );
// };

// export default FeaturesSection;

"use client"; // Required for Framer Motion

import React from "react";
import Image from "next/image";
import { FaChartLine, FaHeadset, FaFastForward } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion"; // Import motion

// --- Animation Variants ---

// Variants for the overall section container
const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Variants for the heading section
const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Variants for the grid container (to stagger the cards within)
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // Adjust stagger slightly
      delayChildren: 0.2,
    },
  },
};

// NEW Variants for each individual feature card (Elegant Reveal)
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85, // Start slightly smaller
    rotate: 3, // Start slightly rotated clockwise
    y: 40, // Start slightly lower
  },
  visible: {
    opacity: 1,
    scale: 1, // Animate to full size
    rotate: 0, // Animate to straight rotation
    y: 0, // Animate to final vertical position
    transition: {
      duration: 0.7, // Give it a bit more time to feel smooth
      ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic bezier for smooth acceleration/deceleration
      // Alternative standard ease: "circOut" can also feel quite nice
    },
  },
};

// --- FeaturesSection Component ---
const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-white lg:py-10 py-5 dark:bg-background px-4 overflow-hidden">
      {" "}
      {/* Keep overflow hidden */}
      <motion.section
        className="flex flex-col lg:gap-10 gap-8 container mx-auto"
        id="features"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1, once: false }} // Trigger earlier, repeat animation
      >
        {/* Heading Section - Apply motion */}
        <motion.div className="flex flex-col gap-5" variants={headingVariants}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
            Security, Speed,
            <span className="text-primary"> Savings & Support </span>
          </h1>
        </motion.div>
        {/* Features Grid - Apply motion container for staggering */}
        <motion.div
          className="grid gap-y-4 gap-x-4 md:grid-cols-2 md:grid-rows-6 lg:gap-x-8 lg:gap-y-8"
          variants={gridContainerVariants}
        >
          {/* --- Apply motion to EACH feature card --- */}

          {/* Feature Card 1: Security (Large) */}
          <motion.div
            className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
            variants={cardVariants} // Apply NEW Elegant Reveal animation
          >
            <Image
              src="/assets/images/colorful-illustration-colorful-padlock-with-colorful-leaves-flowers_1122354-15513.jpg"
              width={500}
              height={384}
              alt="Secure padlock illustration"
              className="w-full object-cover lg:h-96 md:h-60 h-48"
              priority
            />
            <div className="flex flex-col gap-3 p-4 lg:p-6">
              <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
                <span className="text-primary font-bold">Secure</span> Every
                Step of the Way
              </h3>
              <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
                We prioritize your security...
              </p>
            </div>
          </motion.div>

          {/* Feature Card 2: Speed (Small) */}
          <motion.div
            className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
            variants={cardVariants} // Apply NEW Elegant Reveal animation
          >
            <FaFastForward className="lg:size-8 size-6 text-mainheading dark:text-primary" />
            <div className="flex flex-col gap-3">
              <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
                <span>
                  Our transfers are{" "}
                  <span className="text-primary font-bold">Speedy</span>
                </span>
              </h3>
              <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
                Receive your money swiftly...
              </p>
            </div>
          </motion.div>

          {/* Feature Card 3: Support (Large) */}
          <motion.div
            className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
            variants={cardVariants} // Apply NEW Elegant Reveal animation
          >
            <Image
              src="/assets/images/friendly-customer.jpg"
              width={500}
              height={384}
              alt="Friendly customer support agent"
              className="w-full object-cover lg:h-96 md:h-60 h-48"
            />
            <div className="flex flex-col gap-3 p-4 lg:p-6">
              <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
                <span>
                  Need <span className="text-primary font-bold">Support </span>?
                  We’re here!
                </span>
              </h3>
              <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
                Our dedicated support team is available...
              </p>
            </div>
          </motion.div>

          {/* Feature Card 4: Savings (Small) */}
          <motion.div
            className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
            variants={cardVariants} // Apply NEW Elegant Reveal animation
          >
            <FaChartLine className="lg:size-8 size-6 text-mainheading dark:text-primary" />
            <div className="flex flex-col gap-3">
              <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
                <span>
                  <span className="text-primary font-bold">Save</span> with high
                  exchange rates
                </span>
              </h3>
              <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
                Get the best value for your hard-earned money...
              </p>
            </div>
          </motion.div>

          {/* Feature Card 5: Rates (Large) */}
          <motion.div
            className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
            variants={cardVariants} // Apply NEW Elegant Reveal animation
          >
            <Image
              src="/assets/images/dynamicRate.png"
              width={500}
              height={384}
              alt="Graph showing dynamic exchange rates"
              className="w-full object-cover lg:h-96 md:h-60 h-48"
            />
            <div className="flex flex-col gap-3 p-4 lg:p-6">
              <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
                <span>
                  Stay ahead with live 
                  <span className="text-primary font-bold capitalize">
                    exchange rates 
                  </span>
                </span>
              </h3>
              <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
                Stay updated with real-time currency exchange rates...
              </p>
            </div>
          </motion.div>

          {/* Feature Card 6: Reach (Small) */}
          <motion.div
            className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
            variants={cardVariants} // Apply NEW Elegant Reveal animation
          >
            <FiGlobe className="lg:size-8 size-6 text-mainheading dark:text-primary" />
            <div className="flex flex-col gap-3">
              <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
                <span>
                  <span className="text-primary font-bold">
                    Worldwide Reach
                  </span>{" "}
                  , Local Touch
                </span>
              </h3>
              <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
                Our platform combines international reach...
              </p>
            </div>
          </motion.div>

          {/* Feature Card 7: Money (Large) */}
          <motion.div
            className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
            variants={cardVariants} // Apply NEW Elegant Reveal animation
          >
            <Image
              src="/assets/images/withoutborder.png"
              width={500}
              height={384}
              alt="Illustration of money exchange without borders"
              className="w-full object-cover lg:h-96 md:h-60 h-48"
            />
            <div className="flex flex-col gap-3 p-4 lg:p-6">
              <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
                <span>
                  Exchange 
                  <span className="text-primary font-bold capitalize">
                    Money 
                  </span>
                  Without Borders
                </span>
              </h3>
              <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
                Seamless global money transfers made simple...
              </p>
            </div>
          </motion.div>

          {/* Feature Card 8: 24/7 Support (Small) */}
          <motion.div
            className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
            variants={cardVariants} // Apply NEW Elegant Reveal animation
          >
            <FaHeadset className="lg:size-8 size-6 text-mainheading dark:text-primary" />
            <div className="flex flex-col gap-3">
              <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
                <span>
                  <span className="text-primary font-bold">24/7 Customer </span>
                  Support
                </span>
              </h3>
              <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
                We're here for you—day or night...
              </p>
            </div>
          </motion.div>
        </motion.div>{" "}
      </motion.section>
    </div>
  );
};

export default FeaturesSection;
