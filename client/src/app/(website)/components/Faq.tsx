// import React, { useState, useRef, useEffect, useCallback } from 'react';

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data - Replace with your actual data or fetch from an API
// const faqData: FaqItemData[] = [
//   {
//     id: 'q1',
//     question: 'What is ScopeX?',
//     answer: 'ScopeX is a platform designed to simplify international money transfers, offering competitive rates and fast processing times. We focus on transparency and security for all your transactions.',
//   },
//   {
//     id: 'q2',
//     question: 'What documents do I need to verify my account?',
//     answer: 'Typically, you will need a government-issued photo ID (like a passport or driver\'s license) and sometimes proof of address (like a recent utility bill or bank statement). Requirements may vary slightly by region.',
//   },
//   {
//     id: 'q3',
//     question: 'How fast are ScopeX transfers?',
//     answer: 'Transfer speeds depend on the destination country and the recipient\'s bank. Many transfers are completed within minutes or hours, while some might take 1-2 business days. We always provide an estimated delivery time before you confirm the transfer.',
//   },
//   {
//     id: 'q4',
//     question: 'How much money can I transfer with ScopeX at once?',
//     answer: 'Transfer limits vary based on your verification level and the regulations of the sending and receiving countries. Please check your account details or contact support for specific limits applicable to you.',
//   },
//   {
//     id: 'q5',
//     question: 'What security measures does ScopeX take to safeguard my money?',
//     answer: 'We use industry-standard security protocols, including encryption for data transmission and storage, multi-factor authentication, and regular security audits. Your funds are held securely in segregated accounts with reputable financial institutions.',
//   },
// ];

// const FaqSection: React.FC = () => {
//   // State to track the currently open accordion item's ID (null means none are open)
//   const [openItemId, setOpenItemId] = useState<string | null>(null);

//   // Ref to store references to the content divs for height calculation
//   const contentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

//   // Function to toggle an item's open state
//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId(prevOpenId => (prevOpenId === id ? null : id));
//   }, []);

//   // Effect to calculate and set content height for animations
//   useEffect(() => {
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         // Temporarily remove hidden to measure scrollHeight if needed,
//         // but setting the style directly might be enough if initially rendered.
//         const scrollHeight = contentDiv.scrollHeight;
//         contentDiv.style.setProperty('--radix-accordion-content-height', `${scrollHeight}px`);
//       }
//     });
//     // Dependency array can be complex; recalculate if faqData changes or window resizes
//     // For simplicity, running once on mount and when openItemId changes might suffice
//     // Add other dependencies like faqData if it can change dynamically
//   }, [openItemId, faqData]); // Re-run if the open item changes or data changes

//   return (
//     <div
//       className="grid items-start gap-14 md:grid-cols-5 md:grid-rows-2"
//       id="faq" // Keep the ID if needed for navigation/linking
//     >
//       {/* Left Column: Title and Description */}
//       <div className="flex flex-col gap-5 self-start md:col-span-2">
//         <h2 className="text-2xl font-medium leading-[125%] text-gray-800 md:text-5xl">
//           Common Questions, <br /> Clear Answers
//         </h2>
//         <p className="text-[1rem] font-normal leading-[140%] text-gray-600 md:text-lg">
//           Find answers to your most frequently asked questions about sending money
//           with ScopeX. Can’t find what you are looking for? Contact our
//           support team.
//         </p>
//       </div>

//       {/* Right Column: Accordion Items */}
//       <div className="md:col-span-3 md:row-span-2">
//         {/* Accordion Container */}
//         <div
//           className="flex flex-col gap-3"
//           data-orientation="vertical" // Keep data attributes if styling relies on them
//         >
//           {faqData.map((item) => {
//             const isOpen = openItemId === item.id;
//             const uniqueTriggerId = `faq-trigger-${item.id}`;
//             const uniqueContentId = `faq-content-${item.id}`;

//             return (
//               <div
//                 key={item.id}
//                 data-state={isOpen ? 'open' : 'closed'}
//                 data-orientation="vertical"
//                 className="rounded-xl bg-white p-5"
//               >
//                 {/* Accordion Header/Trigger */}
//                 <h3
//                   data-orientation="vertical"
//                   data-state={isOpen ? 'open' : 'closed'}
//                   className="flex"
//                 >
//                   <button
//                     type="button"
//                     aria-controls={uniqueContentId}
//                     aria-expanded={isOpen}
//                     data-state={isOpen ? 'open' : 'closed'}
//                     data-orientation="vertical"
//                     id={uniqueTriggerId}
//                     className="flex w-full flex-1 items-center justify-between text-start text-lg font-medium text-[#182230] transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
//                     onClick={() => handleToggle(item.id)}
//                     data-radix-collection-item="" // Keep if needed
//                   >
//                     {item.question}
//                     {/* SVG Icon */}
//                     <svg
//                       width="15"
//                       height="15"
//                       viewBox="0 0 15 15"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
//                         // Using data attribute selector in className for rotation
//                         // Or keep the simple isOpen check: isOpen ? 'rotate-180' : ''
//                       }`}
//                       aria-hidden // Decorative icon
//                     >
//                       <path
//                         d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
//                         fill="currentColor"
//                         fillRule="evenodd"
//                         clipRule="evenodd"
//                       ></path>
//                     </svg>
//                   </button>
//                 </h3>
//                 {/* Accordion Content Panel */}
//                 <div
//                   ref={(el) => contentRefs.current.set(item.id, el)} // Assign ref to map
//                   data-state={isOpen ? 'open' : 'closed'}
//                   id={uniqueContentId}
//                   role="region"
//                   aria-labelledby={uniqueTriggerId}
//                   data-orientation="vertical"
//                   className="overflow-hidden text-lg leading-[140%] text-[#667085] transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
//                   // Style is needed for the CSS variable if using the specific keyframes
//                   style={{
//                       // The CSS variable is set dynamically via the useEffect hook
//                   }}
//                   hidden={!isOpen} // Controls visibility for non-JS/initial state & helps animation
//                 >
//                   {/* Inner div for padding, applied only when open */}
//                   <div className="pt-3">
//                      {item.answer}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FaqSection;

// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for each FAQ item
// interface FaqItemData {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Sample FAQ Data - Replace with your actual data or fetch from an API
// const faqData: FaqItemData[] = [
//   {
//     id: "1",
//     question: "What is currency exchange and how does it work? ",
//     answer:
//       "Currency exchange is the process of converting one currency into another, typically for travel, business, or international transactions. The amount you get depends on current exchange rates, which fluctuate based on global market conditions.",
//   },
//   {
//     id: "2",
//     question: "How are currency exchange rates calculated? ",
//     answer:
//       "Exchange rates are influenced by factors like interest rates, inflation, political stability, and market demand. These rates are constantly changing and are set by the foreign exchange (forex) market. Banks and exchange providers may also add a margin to the rate.",
//   },
//   {
//     id: "3",
//     question: "Where can I get the best currency exchange rates? ",
//     answer:
//       "You can get the best currency exchange rates from licensed online platforms, banks, or trusted currency exchange centers. Avoid airport kiosks and hotels, as they often charge higher fees. Always compare rates and check for hidden charges before exchanging.",
//   },
//   {
//     id: "4",
//     question: "Is it better to exchange currency before traveling or after? ",
//     answer:
//       "It’s usually smarter to exchange some currency before you travel to avoid high fees at airports or foreign ATMs. However, using a travel-friendly debit card abroad can also be convenient if it offers low or no foreign transaction fees.",
//   },
//   {
//     id: "5",
//     question: "Are there fees involved in currency exchange? ",
//     answer:
//       "Many banks and exchange services add hidden charges through transaction fees or marked-up rates. However, some modern platforms offer zero-fee currency exchange with transparent, real-time rates. To get truly fee-free service",
//   },
//   {
//     id: "6",
//     question: "What is the best time to exchange currency? ",
//     answer:
//       "The best time is when your local currency is strong compared to the foreign currency you need. Checking live exchange rates and avoiding weekends or holidays—when rates may be less favorable—can help you get better value",
//   }
// ];

// // React Functional Component for the FAQ Section using Accordion Pattern
// const FaqSection: React.FC = () => {
//   const [openItemId, setOpenItemId] = useState<string | null>(null);
//   const contentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

//   const handleToggle = useCallback((id: string) => {
//     setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   useEffect(() => {
//     contentRefs.current.forEach((contentDiv, id) => {
//       if (contentDiv) {
//         const scrollHeight = contentDiv.scrollHeight;
//         contentDiv.style.setProperty(
//           "--radix-accordion-content-height",
//           `${scrollHeight}px`
//         );
//       }
//     });
//   }, [openItemId, faqData]);

//   return (
//     <div className="py-10 bg-[#F2F4F7] dark:bg-background">
//       <section
//         className="grid items-start gap-14 md:grid-cols-5 md:grid-rows-2 container mx-auto px-4"
//         id="faq"
//       >
//         <div className="flex flex-col gap-5 self-start md:col-span-2">
//           <h1 className="text-5xl md:text-6xl xl:text-8xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Quick Currency
//             <span className="text-primary"> Exchange Help </span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm text-gray-500 leading-relaxed dark:text-gray-300 mt-5">
//             Get quick answers to common currency exchange questions — rates,
//             fees, timing, and more. Simple, clear, and reliable info at your
//             fingertips.
//           </p>
//         </div>

//         <div className="md:col-span-3 md:row-span-2">
//           <div className="flex flex-col gap-3" data-orientation="vertical">
//             {faqData.map((item) => {
//               const isOpen = openItemId === item.id;
//               const uniqueTriggerId = `faq-trigger-${item.id}`;
//               const uniqueContentId = `faq-content-${item.id}`;

//               return (
//                 <div
//                   key={item.id}
//                   data-state={isOpen ? "open" : "closed"}
//                   data-orientation="vertical"
//                   className="rounded-xl bg-white p-5"
//                 >
//                   <h3
//                     data-orientation="vertical"
//                     data-state={isOpen ? "open" : "closed"}
//                     className="flex m-0"
//                   >
//                     <button
//                       type="button"
//                       aria-controls={uniqueContentId}
//                       aria-expanded={isOpen}
//                       data-state={isOpen ? "open" : "closed"}
//                       data-orientation="vertical"
//                       id={uniqueTriggerId}
//                       className="flex w-full cursor-pointer flex-1 items-center justify-between text-start text-xl text-mainheading transition-all font-medium [&[data-state=open]>svg]:rotate-180"
//                       onClick={() => handleToggle(item.id)}
//                       data-radix-collection-item=""
//                     >
//                       {item.question}
//                       <SlArrowDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
//                     </button>
//                   </h3>
//                   <div
//                     ref={(el) => {
//                       if (el) {
//                         contentRefs.current.set(item.id, el);
//                       } else {
//                         contentRefs.current.delete(item.id);
//                       }
//                     }}
//                     data-state={isOpen ? "open" : "closed"}
//                     id={uniqueContentId}
//                     role="region"
//                     aria-labelledby={uniqueTriggerId}
//                     data-orientation="vertical"
//                     className="overflow-hidden text-lg leading-relaxed text-gray-500 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
//                     style={{}} // CSS variable is set via JS
//                     hidden={!isOpen}
//                   >
//                     <div className="pt-5 pb-1">{item.answer}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FaqSection;

"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaTelegram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";

// Define the structure for each FAQ item
interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

// Sample FAQ Data - Replace with your actual data or fetch from an API
const faqData: FaqItemData[] = [
  {
    id: "1",
    question: "What is Apexture?",
    answer:
      "Apexture is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
  },
  {
    id: "2",
    question: "What documents do I need to verify my account? ",
    answer:
      "To verify your account, you’ll need to submit a valid government-issued ID, proof of address, and any additional documents required to meet compliance and security standards",
  },
  {
    id: "3",
    question: "How fast are Apexture transfers? ",
    answer:
      "Apexture transfers are typically processed within minutes, with most transactions completed the same day, depending on the currency and destination",
  },
  {
    id: "4",
    question: "How much money can I transfer with Apexture at once? ",
    answer:
      "With Apexture, transfer limits vary based on account type and verification level, but high-value transfers are supported with enhanced security and compliance checks",
  },
  {
    id: "5",
    question: "What security measures does Apexture take to safeguard my money? ",
    answer:
      "Apexture uses advanced encryption, two-factor authentication, and strict regulatory compliance to ensure your money and personal data are always protected",
  },
];

// React Functional Component for the FAQ Section using Accordion Pattern
const FaqSection: React.FC = () => {
  // Initialize state with the ID of the first FAQ item, if faqData is not empty
  const [openItemId, setOpenItemId] = useState<string | null>(
    faqData.length > 0 ? faqData[0].id : null
  );
  const contentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const handleToggle = useCallback((id: string) => {
    setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
  }, []);

  useEffect(() => {
    // Calculate and set the height for the content div when it's open or when data changes
    contentRefs.current.forEach((contentDiv, id) => {
      if (contentDiv) {
        // Always recalculate scrollHeight in case content changes dynamically
        const scrollHeight = contentDiv.scrollHeight;
        contentDiv.style.setProperty(
          "--radix-accordion-content-height", // Ensure this matches your CSS animation if you use one
          `${scrollHeight}px`
        );

        // Additionally, explicitly set height for the initially open item without animation interference
        // Note: The animation classes might override this, so ensure your CSS handles the initial state correctly
        if (id === openItemId) {
          contentDiv.style.height = `${scrollHeight}px`;
        } else if (contentDiv.style.height !== "0px") {
          // Only set to 0 if not already closed by animation
          contentDiv.style.height = "0px";
        }
      }
    });
  }, [openItemId, faqData]); // Rerun effect if open item or data changes

  // Ensure initial height is set correctly for the first item on mount
  useEffect(() => {
    if (openItemId && contentRefs.current.has(openItemId)) {
      const initialOpenContent = contentRefs.current.get(openItemId);
      if (initialOpenContent) {
        const scrollHeight = initialOpenContent.scrollHeight;
        initialOpenContent.style.setProperty(
          "--radix-accordion-content-height",
          `${scrollHeight}px`
        );
        initialOpenContent.style.height = `${scrollHeight}px`; // Set initial height directly
      }
    }
    // Set other items' height to 0 initially
    contentRefs.current.forEach((contentDiv, id) => {
      if (id !== openItemId && contentDiv) {
        contentDiv.style.height = "0px";
      }
    });
  }, []); // Run only once on mount

  return (
    <div className="lg:py-10 py-5 bg-[#F2F4F7] dark:bg-background border-b">
      <section
        className="grid items-start lg:gap-14 gap-10 lg:grid-cols-5 container mx-auto px-4"
        id="faq"
      >
        <div className="flex flex-col gap-5 self-start md:col-span-2">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
            Quick Currency
            <span className="text-primary"> Exchange Help </span>
          </h1>

          <p className="lg:text-lg sm:text-base text-sm text-gray-500 leading-relaxed dark:text-gray-300">
            Get quick answers to common currency exchange questions — rates,
            fees, timing, and more. Simple, clear, and reliable info at your
            fingertips.
          </p>
        </div>

        <div className="md:col-span-3 md:row-span-2">
          <div className="flex flex-col gap-3" data-orientation="vertical">
            {faqData.map((item) => {
              const isOpen = openItemId === item.id;
              const uniqueTriggerId = `faq-trigger-${item.id}`;
              const uniqueContentId = `faq-content-${item.id}`;

              return (
                <div
                  key={item.id}
                  data-state={isOpen ? "open" : "closed"}
                  data-orientation="vertical"
                  className="rounded-xl bg-white md:p-6 p-4 dark:bg-white/5" // Added dark mode bg and shadow
                >
                  <h3
                    data-orientation="vertical"
                    data-state={isOpen ? "open" : "closed"}
                    className="flex m-0"
                  >
                    <button
                      type="button"
                      aria-controls={uniqueContentId}
                      aria-expanded={isOpen}
                      data-state={isOpen ? "open" : "closed"}
                      data-orientation="vertical"
                      id={uniqueTriggerId}
                      className="flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-base text-mainheading dark:text-gray-100 transition-all font-medium [&[data-state=open]>svg]:rotate-180" // Adjusted text size and dark mode color
                      onClick={() => handleToggle(item.id)}
                      data-radix-collection-item=""
                    >
                      {item.question}
                      <SlArrowDown
                        className={`size-3 shrink-0 text-gray-500 dark:text-gray-300 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    ref={(el) => {
                      if (el) {
                        contentRefs.current.set(item.id, el);
                      } else {
                        contentRefs.current.delete(item.id);
                      }
                    }}
                    data-state={isOpen ? "open" : "closed"}
                    id={uniqueContentId}
                    role="region"
                    aria-labelledby={uniqueTriggerId}
                    data-orientation="vertical"
                    // Updated className for smooth transition using height and opacity
                    className={`overflow-hidden md:text-base text-sm lg:text-lg leading-relaxed text-[#667085] dark:text-gray-300 transition-all duration-300 ease-in-out ${
                      isOpen ? "mt-4" : "mt-0"
                    }`}
                    style={{
                      height: isOpen ? "auto" : "0px", // Start with auto height when open to let content flow naturally
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    {/* Add padding within the content div itself */}
                    <div
                      className={`lg:pt-2 pt-2 pb-1 ${
                        isOpen ? "visible" : "invisible"
                      }`}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2 md:self-end sticky top-0">
          <div className="flex flex-col items-start gap-5 rounded-2xl bg-white dark:bg-white/5 p-5 md:p-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                More questions?
              </h3>
              <p className="mt-1 text-lg font-normal text-gray-500 dark:text-gray-300">
                We're always ready to help you out.
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center justify-between gap-4 md:flex-nowrap">
              <div className="flex gap-2.5">
                <a href="">
                  <IoLogoWhatsapp className="size-8 text-[#25D366]" />
                </a>
                <a href="">
                  <FaTelegram className="size-8 text-[#3390EC]" />
                </a>
              </div>
              <Link
                href="/faqs"
                className="px-4 py-1.5
                 rounded-full font-medium text-mainheading dark:text-primary hover:bg-gray/5 dark:bg-secondary transition-colors duration-300"
              >
                Read more FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqSection;
