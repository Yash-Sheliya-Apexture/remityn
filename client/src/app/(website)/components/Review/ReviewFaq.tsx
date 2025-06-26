// import React from "react";

// const ReviewFaq = () => {
//   return (
//     <section className="lg:py-20 py-5">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold capitalize mb-6 max-w-2xl leading-tight text-mainheadingWhite">
//           Your questions, <span className="text-primary">answered.</span>
//         </h2>

//         <p className="text-subheadingWhite md:text-lg text-base lg:max-w-3xl max-w-full">
//           Find clear, concise answers to the most common questions about our
//           services. Whether you're new or a returning customer, we've covered
//           everything you need to know — from how it works to what sets us apart.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default ReviewFaq;

// "use client";
// import React, { useState, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "How do I know the reviews are genuine?",
//     answer:
//       "We only accept reviews from customers who have completed a currency exchange transaction through our platform. Each review is verified and monitored to ensure authenticity and transparency.",
//   },

//   {
//     id: "2",
//     question: "Why do some customers mention different exchange rates in reviews?",
//     answer:"Exchange rates can vary based on market fluctuations and transaction times. Customer reviews reflect their personal experience at the time of exchange, which may differ slightly depending on when they made the transaction."
//   },
//   {
//     id: "3",
//     question: "What should I include in my review to help others?",
//     answer:
//       "It's helpful to mention the currency you exchanged, the speed of the transaction, the clarity of the process, the customer support experience, and how satisfied you were overall. This gives future users a well-rounded picture.",
//   },
//   {
//     id: "4",
//     question: "Do negative reviews get published too?",
//     answer:
//       "Yes. We believe in transparency. Both positive and negative reviews are published as long as they follow our community guidelines. This helps us improve and gives new customers a fair understanding.",
//   },
//   {
//     id: "5",
//     question: "How often are the reviews updated?",
//     answer:
//       "Reviews are submitted in real time by users and appear on the site after moderation. This means our review section is constantly updated with fresh feedback from recent users.",
//   },
// ];

// const answerVariants = {
//   initial: { opacity: 0, height: 0, marginTop: 0 },
//   animate: {
//     opacity: 1,
//     height: "auto",
//     marginTop: "8px",
//     transition: {
//       height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
//       opacity: { duration: 0.2, delay: 0.05 },
//       marginTop: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
//     },
//   },
//   exit: {
//     opacity: 0,
//     height: 0,
//     marginTop: 0,
//     transition: {
//       height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
//       opacity: { duration: 0.15 },
//       marginTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
//     },
//   },
// };

// const ReviewFaq: React.FC = () => {
//   const [openItemId, setOpenItemId] = useState<string | null>(
//     faqData.length > 0 ? faqData[0].id : null
//   );

//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   return (
//     <section className="lg:py-20 py-5 overflow-hidden" id="faq">
//       <div className="container mx-auto px-4">
//         <div className="mb-12 md:mb-16 lg:mb-20">
//           <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold capitalize mb-6 lg:max-w-2xl max-w-full leading-tight text-mainheadingWhite">
//             Your questions, <span className="text-primary">answered.</span>
//           </h3>

//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Find clear, concise answers to the most common questions about our
//             services. Whether you're new or a returning customer, we've covered
//             everything you need to know — from how it works to what sets us
//             apart. Quick, reliable support made simple.
//           </p>
//         </div>

//         <div className="flex flex-col" data-orientation="vertical">
//           {faqData.map((item) => {
//             const isOpen = openItemId === item.id;
//             const uniqueTriggerId = `faq-trigger-${item.id}`;
//             const uniqueContentId = `faq-content-${item.id}`;

//             return (
//               <div
//                 key={item.id}
//                 className="flex flex-col overflow-hidden py-6 md:py-8 lg:py-10 border-t border-t-gray-600/50"
//               >
//                 <h3
//                   data-orientation="vertical"
//                   data-state={isOpen ? "open" : "closed"}
//                   className="flex m-0"
//                 >
//                   <button
//                     type="button"
//                     aria-controls={uniqueContentId}
//                     aria-expanded={isOpen}
//                     data-state={isOpen ? "open" : "closed"}
//                     data-orientation="vertical"
//                     id={uniqueTriggerId}
//                     className={`flex w-full cursor-pointer flex-1 gap-4 items-start justify-between text-start xl:text-[28px] text-xl font-medium transition-all ease-linear duration-75 ${
//                       isOpen
//                         ? "text-primary hover:text-primaryhover"
//                         : "text-mainheadingWhite hover:text-[#92A6B0]"
//                     }`}
//                     onClick={() => handleToggle(item.id)}
//                   >
//                     {item.question}
//                     <div
//                       className="xl:size-6 size-4 shrink-0 relative mt-2"
//                       aria-hidden="true"
//                     >
//                       <motion.div
//                         className="absolute bg-current"
//                         style={{
//                           width: "2px",
//                           height: "100%",
//                           left: "50%",
//                           top: "0%",
//                           translateX: "-50%",
//                         }}
//                         animate={{ rotate: isOpen ? 90 : 0 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                       />
//                       <motion.div
//                         className="absolute bg-current"
//                         style={{
//                           width: "100%",
//                           height: "2px",
//                           left: "0%",
//                           top: "50%",
//                           translateY: "-50%",
//                         }}
//                         animate={{
//                           rotate: isOpen ? 90 : 0,
//                           opacity: isOpen ? 0 : 1,
//                         }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                       />
//                     </div>
//                   </button>
//                 </h3>

//                 <AnimatePresence initial={false}>
//                   {isOpen && (
//                     <motion.div
//                       key="content"
//                       id={uniqueContentId}
//                       role="region"
//                       aria-labelledby={uniqueTriggerId}
//                       variants={answerVariants}
//                       initial="initial"
//                       animate="animate"
//                       exit="exit"
//                       className="overflow-hidden"
//                     >
//                       <p className="text-subheadingWhite xl:text-xl text-base leading-relaxed pt-2">
//                         {item.answer}
//                       </p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewFaq;



"use client";

import React, { useState, useCallback } from "react"; // Explicitly import React for FC, useState, useCallback
import { motion, AnimatePresence } from "framer-motion";

interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

// Static FAQ data. If this data were dynamic (e.g., fetched),
// it would be passed as props.
const faqData: FaqItemData[] = [
  {
    id: "faq-1", // Made IDs slightly more descriptive
    question: "Why should I trust the reviews on your platform? ",
    answer:
      "All reviews are written by real users who’ve completed verified transactions. We don’t allow fake reviews or paid promotions each review goes through an automated and manual validation process to ensure authenticity.",
  },
  {
    id: "faq-2",
    question: "How do I know the reviews are genuine?",
    answer:
      "We only accept reviews from real users who’ve completed a currency exchange transaction through our platform. Each review goes through a strict verification process to ensure it’s authentic, honest, and helpful.",
  },
  {
    id: "faq-3",
    question: "Are exchange rates the same for everyone who leaves a review?",
    answer:
      "Not necessarily. Rates may vary slightly depending on the transaction time, currency type, and market fluctuations. That’s why you might see different rates mentioned in different reviews.",
  },
  {
    id: "faq-4",
    question: "What should I include in my review to help others?",
    answer:
      "You can mention how easy the process was, how quickly the money was delivered, customer support response, exchange rates, and overall satisfaction. Real details help others make confident decisions.",
  },
  {
    id: "faq-5",
    question: "How often are the reviews updated?",
    answer:
      "Our review section updates in real time. As soon as a customer submits a verified review, it appears on our website after approval. This keeps our feedback accurate and current.",
  },
];

// Framer Motion variants for the answer animation
const answerVariants = {
  initial: { opacity: 0, height: 0, marginTop: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    marginTop: "8px", // Tailwind's mt-2
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, // Custom cubic-bezier for smooth height transition
      opacity: { duration: 0.2, delay: 0.05 },
      marginTop: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.15 },
      marginTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
    },
  },
};

const ReviewFaq: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<string | null>(
    // Default the first FAQ item to be open, if data exists
    faqData.length > 0 ? faqData[0].id : null
  );

  // useCallback memoizes the handleToggle function so it's not recreated on every render
  // unless its dependencies change (which are none in this case).
  const handleToggle = useCallback((id: string) => {
    setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
  }, []); // Empty dependency array: function doesn't depend on props or other state from parent scope

  return (
    <section className="sm:py-16 py-10 overflow-hidden" id="faq">
      {" "}
      {/* Added sm:py-16 */}
      <div className="container mx-auto px-4">
        <div className="mb-4 lg:mb-6 text-center md:text-left">
          {" "}
          {/* Added text-center md:text-left */}
          <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold capitalize mb-6 leading-tight text-mainheadingWhite">
            Honest Answers for{" "}
            <span className="text-primary">Smart Travelers.</span>
          </h3>
          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full mx-auto md:mx-0">
            {" "}
            {/* Added mx-auto md:mx-0 for centering on mobile */}
            Find clear, concise answers to the most common questions about our
            services. Whether you're new or a returning customer, we've covered
            everything you need to know — from how it works to what sets us
            apart. Quick, reliable support made simple.
          </p>
        </div>

        <div className="flex flex-col" data-orientation="vertical">
          {faqData.map((item) => {
            const isOpen = openItemId === item.id;
            // Ensure ARIA IDs are unique across the page if this component is used multiple times
            const uniqueTriggerId = `faq-trigger-${item.id}`;
            const uniqueContentId = `faq-content-${item.id}`;

            return (
              <div
                key={item.id} // Essential for React list rendering
                className="flex flex-col overflow-hidden py-6 lg:py-10 border-t border-t-gray-600/50 first:border-t-0" // Removed top border for the first item
              >
                <h3 // Using h3 for semantic structure, though button inside handles interaction
                  data-orientation="vertical"
                  data-state={isOpen ? "open" : "closed"}
                  className="m-0" // Removed `flex` from h3 as button is flex
                >
                  <button
                    type="button"
                    aria-controls={uniqueContentId}
                    aria-expanded={isOpen}
                    data-state={isOpen ? "open" : "closed"}
                    data-orientation="vertical"
                    id={uniqueTriggerId}
                    className={`flex w-full cursor-pointer flex-1 gap-4 items-start justify-between text-start text-lg sm:text-xl xl:text-[28px] font-medium transition-colors duration-150 ease-linear ${
                      // Standardized text sizes, adjusted transition
                      isOpen
                        ? "text-primary hover:text-primary/80" // Slightly different hover for open state
                        : "text-mainheadingWhite hover:text-gray-300"
                    }`}
                    onClick={() => handleToggle(item.id)}
                  >
                    {item.question}
                    <div
                      className="xl:size-6 size-5 shrink-0 relative mt-1 sm:mt-1.5" // Adjusted icon size and margin
                      aria-hidden="true"
                    >
                      {/* Vertical line of the plus/minus icon */}
                      <motion.div
                        className="absolute bg-current" // bg-current inherits text color
                        style={{
                          width: "2px",
                          height: "100%",
                          left: "50%",
                          top: "0%",
                          transform: "translateX(-50%)", // GSAP-like transform for precision
                        }}
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }} // Slightly faster transition
                      />
                      {/* Horizontal line of the plus/minus icon */}
                      <motion.div
                        className="absolute bg-current"
                        style={{
                          width: "100%",
                          height: "2px",
                          left: "0%",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                        animate={{
                          rotate: isOpen ? 90 : 0,
                          opacity: isOpen ? 0 : 1, // Fades out when open (forms the minus)
                        }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      />
                    </div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`${item.id}-content`} // Key for AnimatePresence child, more specific
                      id={uniqueContentId}
                      role="region"
                      aria-labelledby={uniqueTriggerId}
                      variants={answerVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="overflow-hidden" // Important for height animation
                    >
                      <p className="text-subheadingWhite text-base sm:text-lg xl:text-xl leading-relaxed pt-2 md:pt-3">
                        {" "}
                        {/* Standardized text sizes, added md:pt-3 */}
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ReviewFaq);
