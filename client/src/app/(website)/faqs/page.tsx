// "use client";

// import React, { useState, useRef, useEffect } from "react";

// interface FAQItem {
//   id: string;
//   question: string;
//   answer: string;
// }

// const faqData: FAQItem[] = [
//   {
//     id: "aboutWise",
//     question: "What is ScopeX?",
//     answer:
//       "ScopeX is a modern money transfer platform using blockchain technology. Unlike traditional systems, we offer faster, more transparent, and secure transfers. Currently, we serve the Eurozone and India, with plans to expand soon.",
//   },
//   {
//     id: "whereOperate",
//     question: "Where does ScopeX operate?",
//     answer:
//       "We currently operate in the Eurozone and India. Check our website or app for the most up-to-date list of supported countries as we are continuously expanding our reach.",
//   },
//   {
//     id: "transferTime",
//     question: "How long does a transfer take with ScopeX?",
//     answer:
//       "Transfers with ScopeX are typically very fast, often completing within minutes. However, the exact time can vary based on factors like network conditions and recipient bank processing times.",
//   },
//   {
//     id: "transferAmount",
//     question: "How much money can be transferred at once with ScopeX?",
//     answer:
//       "Transfer limits may vary based on your account type and verification level. Please refer to your account settings or contact our support for detailed information on transaction limits.",
//   },
//   {
//     id: "transferSecurity",
//     question: "How does ScopeX ensure the security of my transfers?",
//     answer:
//       "ScopeX employs state-of-the-art blockchain technology, end-to-end encryption, and adheres to strict security protocols to ensure every transaction is secure and protected against fraud.",
//   },
//   {
//     id: "trackTransfer",
//     question: "How do I track my ScopeX transfer?",
//     answer:
//       "You can easily track your transfer in real-time using the ScopeX app or website. Simply log in to your account and navigate to the transaction history for live updates.",
//   },
//   {
//     id: "howSafe",
//     question: "How safe is ScopeX?",
//     answer:
//       "ScopeX is designed with multiple layers of security to protect your money and personal information. We use blockchain technology, encryption, and follow regulatory standards to ensure a safe transfer environment.",
//   },
//   {
//     id: "fraudsters",
//     question: "How do I stay away from fraudsters?",
//     answer:
//       "Be cautious of unsolicited communications asking for your ScopeX account details or financial information. Always verify requests through official ScopeX channels and never share sensitive information with unverified sources.",
//   },
//   {
//     id: "affiliatedBank",
//     question: "Is ScopeX affiliated with any bank?",
//     answer:
//       "ScopeX is an independent financial technology company and is not directly affiliated with any specific bank. We partner with various financial institutions to facilitate transactions, ensuring a wide reach and efficient service.",
//   },
//   {
//     id: "whatRemittance",
//     question: "What is remittance?",
//     answer:
//       "Remittance refers to the transfer of money, often by foreign workers to their family in their home country. It plays a crucial role in many economies, particularly in developing countries.",
//   },
//   {
//     id: "remittanceImpact",
//     question: "How does remittance impact economies?",
//     answer:
//       "Remittances are a significant source of income for many developing economies, contributing to household income, poverty reduction, and overall economic growth. They can also stabilize economies during financial crises.",
//   },
//   {
//     id: "remittanceParticipants",
//     question: "Who participates in a remittance transaction?",
//     answer:
//       "Typically, a remittance transaction involves three key participants: the sender (usually a migrant worker), the recipient (family member or friend in the home country), and the service provider (like ScopeX) facilitating the transfer.",
//   },
//   {
//     id: "deleteAccount",
//     question: "How do I delete my ScopeX account?",
//     answer:
//       "To delete your ScopeX account, please contact our customer support team. They will guide you through the necessary steps and confirm the account deletion once processed.",
//   },
//   {
//     id: "transactionReceipt",
//     question: "Do I get a receipt for my transactions?",
//     answer:
//       "Yes, ScopeX provides a receipt for every transaction. You can download or view your receipts in the transaction history section of your account on our app or website.",
//   },
//   {
//     id: "verificationDocuments",
//     question: "What documents are required for verification?",
//     answer:
//       "For account verification, you typically need to provide a government-issued ID (like passport or driver's license) and proof of address (like a utility bill or bank statement). The specific documents may vary based on your location and regulatory requirements.",
//   },
// ];

// const FAQSection: React.FC = () => {
//   const [openAccordionId, setOpenAccordionId] = useState<string | null>(
//     "aboutScopeX"
//   ); // Initialize first to open
//   const scrollToTopButtonRef = useRef<HTMLDivElement>(null);
//   const [isScrollToTopVisible, setScrollToTopVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollToTopVisible(window.scrollY > 300);
//     };
//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const toggleAccordion = (id: string) => {
//     setOpenAccordionId(openAccordionId === id ? null : id);
//   };

//   return (
//     <main className="font-landing mx-auto mb-10 mt-4 max-w-7xl space-y-10 px-8 md:px-16 xl:px-0">
//       <div className="relative">
//         <button className="absolute bottom-0 left-0 top-0 hidden pr-8 lg:block">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon icon-tabler icon-tabler-arrow-left"
//             width="32"
//             height="32"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//             <line x1="5" y1="12" x2="19" y2="12"></line>
//             <line x1="5" y1="12" x2="11" y2="18"></line>
//             <line x1="5" y1="12" x2="11" y2="6"></line>
//           </svg>
//         </button>
//         <h3 className="text-center text-3xl font-extrabold text-gray-900">
//           FAQ's
//         </h3>
//       </div>
//       <div>
//         <div className="flex flex-col gap-3" data-orientation="vertical">
//           <h1 className="mb-4 text-center text-2xl font-medium">
//             Frequently Asked Questions
//           </h1>
//           {faqData.map((item) => (
//             <div
//               key={item.id}
//               data-state={openAccordionId === item.id ? "open" : "closed"}
//               data-orientation="vertical"
//               className="rounded-xl bg-white p-5"
//             >
//               <h3
//                 data-orientation="vertical"
//                 data-state={openAccordionId === item.id ? "open" : "closed"}
//                 className="flex"
//               >
//                 <button
//                   type="button"
//                   aria-controls={`radix-${item.id}-content`}
//                   aria-expanded={openAccordionId === item.id}
//                   data-state={openAccordionId === item.id ? "open" : "closed"}
//                   data-orientation="vertical"
//                   id={`radix-${item.id}-trigger`}
//                   className="flex flex-1 items-center justify-between text-start text-lg font-medium text-[#182230] transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
//                   data-radix-collection-item=""
//                   onClick={() => toggleAccordion(item.id)}
//                 >
//                   {item.question}
//                   <svg
//                     width="15"
//                     height="15"
//                     viewBox="0 0 15 15"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
//                   >
//                     <path
//                       d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
//                       fill="currentColor"
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//               </h3>
//               <div
//                 data-state={openAccordionId === item.id ? "open" : "closed"}
//                 id={`radix-${item.id}-content`}
//                 role="region"
//                 aria-labelledby={`radix-${item.id}-trigger`}
//                 data-orientation="vertical"
//                 className={`overflow-hidden text-lg leading-[140%] text-[#667085] transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${
//                   openAccordionId === item.id
//                     ? "animate-accordion-down"
//                     : "animate-accordion-up"
//                 }`}
//                 style={{
//                   "--radix-accordion-content-height":
//                     "var(--radix-collapsible-content-height)",
//                   "--radix-accordion-content-width":
//                     "var(--radix-collapsible-content-width)",
//                 }}
//               >
//                 <div className="pt-3">{item.answer}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div
//         ref={scrollToTopButtonRef}
//         className={`fixed md:bottom-12 md:right-[6rem] bottom-24 right-[1rem] cursor-pointer rounded-full bg-gray-400 p-3 text-white shadow-lg transition-opacity duration-300 hover:bg-gray-300 ${
//           isScrollToTopVisible
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//         title="Scroll to Top"
//         onClick={scrollToTop}
//       >
//         <svg
//           stroke="currentColor"
//           fill="currentColor"
//           strokeWidth="0"
//           viewBox="0 0 384 512"
//           height="1em"
//           width="1em"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z"></path>
//         </svg>
//       </div>
//     </main>
//   );
// };

// export default FAQSection;

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { FaArrowUp } from "react-icons/fa6";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for a single FAQ item
// interface FAQItem {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Define the structure for a section containing FAQ items
// interface FAQSectionData {
//   title: string;
//   items: FAQItem[];
// }

// // Data structured according to the image sections
// const faqSections: FAQSectionData[] = [
//   {
//     title: "About ScopeX",
//     items: [
//       {
//         id: "whatIsScopeX",
//         question: "What is ScopeX?",
//         answer:
//           "ScopeX is a modern money transfer platform using blockchain technology. Unlike traditional systems, we offer faster, more transparent, and secure transfers. Currently, we serve the Eurozone and India, with plans to expand soon.",
//       },
//       {
//         id: "whereOperate",
//         question: "Where does ScopeX operate?",
//         answer:
//           "We currently operate in the Eurozone and India. Check our website or app for the most up-to-date list of supported countries as we are continuously expanding our reach.",
//       },
//     ],
//   },
//   {
//     title: "Using ScopeX",
//     items: [
//       {
//         id: "transferTime",
//         question: "How long does a transfer take with ScopeX?",
//         answer:
//           "Transfers with ScopeX are typically very fast, often completing within minutes. However, the exact time can vary based on factors like network conditions and recipient bank processing times.",
//       },
//       {
//         id: "transferAmount",
//         question: "How much money can be transferred at once with ScopeX?",
//         answer:
//           "Transfer limits may vary based on your account type and verification level. Please refer to your account settings or contact our support for detailed information on transaction limits.",
//       },
//       {
//         id: "transferSecurity",
//         question: "How does ScopeX ensure the security of my transfers?",
//         answer:
//           "ScopeX employs state-of-the-art blockchain technology, end-to-end encryption, and adheres to strict security protocols to ensure every transaction is secure and protected against fraud.",
//       },
//       {
//         id: "trackTransfer",
//         question: "How do I track my ScopeX transfer?",
//         answer:
//           "You can easily track your transfer in real-time using the ScopeX app or website. Simply log in to your account and navigate to the transaction history for live updates.",
//       },
//     ],
//   },
//   {
//     title: "Safety and Security",
//     items: [
//       {
//         id: "howSafe",
//         question: "How safe is ScopeX?",
//         answer:
//           "ScopeX is designed with multiple layers of security to protect your money and personal information. We use blockchain technology, encryption, and follow regulatory standards to ensure a safe transfer environment.",
//       },
//       {
//         id: "fraudsters",
//         question: "How do I stay away from fraudsters?",
//         answer:
//           "Be cautious of unsolicited communications asking for your ScopeX account details or financial information. Always verify requests through official ScopeX channels and never share sensitive information with unverified sources.",
//       },
//       {
//         id: "affiliatedBank",
//         question: "Is ScopeX affiliated with any bank?",
//         answer:
//           "ScopeX is an independent financial technology company and is not directly affiliated with any specific bank. We partner with various financial institutions to facilitate transactions, ensuring a wide reach and efficient service.",
//       },
//     ],
//   },
//   {
//     title: "General Information",
//     items: [
//       {
//         id: "whatRemittance",
//         question: "What is remittance?",
//         answer:
//           "Remittance refers to the transfer of money, often by foreign workers to their family in their home country. It plays a crucial role in many economies, particularly in developing countries.",
//       },
//       {
//         id: "remittanceImpact",
//         question: "How does remittance impact economies?",
//         answer:
//           "Remittances are a significant source of income for many developing economies, contributing to household income, poverty reduction, and overall economic growth. They can also stabilize economies during financial crises.",
//       },
//       {
//         id: "remittanceParticipants",
//         question: "Who participates in a remittance transaction?",
//         answer:
//           "Typically, a remittance transaction involves three key participants: the sender (usually a migrant worker), the recipient (family member or friend in the home country), and the service provider (like ScopeX) facilitating the transfer.",
//       },
//     ],
//   },
//   {
//     title: "Account Management",
//     items: [
//       {
//         id: "deleteAccount",
//         question: "How do I delete my ScopeX account?",
//         answer:
//           "To delete your ScopeX account, please contact our customer support team. They will guide you through the necessary steps and confirm the account deletion once processed.",
//       },
//       {
//         id: "transactionReceipt",
//         question: "Do I get a receipt for my transactions?",
//         answer:
//           "Yes, ScopeX provides a receipt for every transaction. You can download or view your receipts in the transaction history section of your account on our app or website.",
//       },
//       {
//         id: "verificationDocuments",
//         question: "What documents are required for verification?",
//         answer:
//           "For account verification, you typically need to provide a government-issued ID (like passport or driver's license) and proof of address (like a utility bill or bank statement). The specific documents may vary based on your location and regulatory requirements.",
//       },
//     ],
//   },
// ];

// // Accordion Item Component
// interface AccordionItemProps {
//   item: FAQItem;
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const AccordionItem: React.FC<AccordionItemProps> = ({
//   item,
//   isOpen,
//   onToggle,
// }) => {
//   // Use a ref for the content div to calculate height for animation
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [contentHeight, setContentHeight] = useState<string>("0px");

//   useEffect(() => {
//     // Adjust height when isOpen changes or contentRef is available
//     if (contentRef.current) {
//       setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
//     }
//   }, [isOpen, contentRef]);

//   return (
//     <div
//       data-state={isOpen ? "open" : "closed"}
//       data-orientation="vertical"
//       className="rounded-2xl bg-white dark:bg-white/5 p-5 mb-4"
//     >
//       {" "}
//       {/* Added border and margin */}
//       <h3
//         data-orientation="vertical"
//         data-state={isOpen ? "open" : "closed"}
//         className="flex"
//       >
//         <button
//           type="button"
//           aria-controls={`radix-${item.id}-content`}
//           aria-expanded={isOpen}
//           data-state={isOpen ? "open" : "closed"}
//           data-orientation="vertical"
//           id={`radix-${item.id}-trigger`}
//           className={`flex w-full flex-1 items-center justify-between text-start text-base md:text-lg font-medium text-mainheading dark:text-white transition-all hover:underline ${
//             isOpen ? "" : ""
//           }`}
//           data-radix-collection-item=""
//           onClick={onToggle}
//         >
//           {item.question}
//           <SlArrowDown
//             className={`size-3 shrink-0 text-muted-foreground transition-transform duration-300 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//           />
//         </button>
//       </h3>
//       {/* Content Div with dynamic height for animation */}
//       <div
//         ref={contentRef}
//         data-state={isOpen ? "open" : "closed"}
//         id={`radix-${item.id}-content`}
//         role="region"
//         aria-labelledby={`radix-${item.id}-trigger`}
//         data-orientation="vertical"
//         className="overflow-hidden text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-300 transition-all duration-300 ease-in-out" // Added transition classes
//         style={{ height: contentHeight }} // Apply dynamic height
//         hidden={!isOpen && contentHeight === "0px"} // Hide when closed and height is 0
//       >
//         {/* Add padding-top only when open */}
//         <div
//           className={`pt-3 ${
//             isOpen ? "opacity-100" : "opacity-0"
//           } transition-opacity duration-300 delay-100`}
//         >
//           {item.answer}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main FAQ Component
// const FAQPage: React.FC = () => {
//   const [openAccordionId, setOpenAccordionId] = useState<string | null>(null); // Initialize to null - no item open by default
//   const scrollToTopButtonRef = useRef<HTMLDivElement>(null);
//   const [isScrollToTopVisible, setScrollToTopVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollToTopVisible(window.scrollY > 300);
//     };
//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Initial check
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const toggleAccordion = (id: string) => {
//     setOpenAccordionId(openAccordionId === id ? null : id);
//   };

//   return (
//     <div className="bg-[#f2f4f7] dark:bg-background min-h-screen">
//       <main className="mx-auto mb-10 max-w-5xl px-4">
//         <div className="relative py-6 text-center mb-6">
//           <h1 className="text-2xl md:text-3xl font-black text-mainheading dark:text-primary">
//             FAQ's
//           </h1>
//         </div>

//         {/* FAQ Sections */}
//         <div className="space-y-8">
//           {faqSections.map((section) => (
//             <div key={section.title}>
//               <h2 className="text-xl md:text-2xl font-semibold text-mainheading dark:text-white mb-10 text-center">
//                 {section.title}
//               </h2>
//               <div className="flex flex-col gap-0">
//                 {section.items.map((item) => (
//                   <AccordionItem
//                     key={item.id}
//                     item={item}
//                     isOpen={openAccordionId === item.id}
//                     onToggle={() => toggleAccordion(item.id)}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Scroll to Top Button */}
//       <div
//         ref={scrollToTopButtonRef}
//         className={`fixed md:bottom-12 md:right-12 bottom-6 right-6 cursor-pointer rounded-full bg-primary hover:bg-primaryhover p-3 text-mainheading transition-opacity duration-300 ${
//           isScrollToTopVisible
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//         title="Scroll to Top"
//         onClick={scrollToTop}
//       >
//         <FaArrowUp className="size-5" />
//       </div>
//     </div>
//   );
// };

// export default FAQPage;

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { FaArrowUp } from "react-icons/fa6";
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for a single FAQ item
// interface FAQItem {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Define the structure for a section containing FAQ items
// interface FAQSectionData {
//   title: string;
//   items: FAQItem[];
// }

// // Data structured according to the image sections
// const faqSections: FAQSectionData[] = [
//   {
//     title: "About ScopeX",
//     items: [
//       {
//         id: "whatIsScopeX", // This is the ID we need
//         question: "What is ScopeX?",
//         answer:
//           "ScopeX is a modern money transfer platform using blockchain technology. Unlike traditional systems, we offer faster, more transparent, and secure transfers. Currently, we serve the Eurozone and India, with plans to expand soon.",
//       },
//       {
//         id: "whereOperate",
//         question: "Where does ScopeX operate?",
//         answer:
//           "We currently operate in the Eurozone and India. Check our website or app for the most up-to-date list of supported countries as we are continuously expanding our reach.",
//       },
//     ],
//   },
//   {
//     title: "Using ScopeX",
//     items: [
//       {
//         id: "transferTime",
//         question: "How long does a transfer take with ScopeX?",
//         answer:
//           "Transfers with ScopeX are typically very fast, often completing within minutes. However, the exact time can vary based on factors like network conditions and recipient bank processing times.",
//       },
//       {
//         id: "transferAmount",
//         question: "How much money can be transferred at once with ScopeX?",
//         answer:
//           "Transfer limits may vary based on your account type and verification level. Please refer to your account settings or contact our support for detailed information on transaction limits.",
//       },
//       {
//         id: "transferSecurity",
//         question: "How does ScopeX ensure the security of my transfers?",
//         answer:
//           "ScopeX employs state-of-the-art blockchain technology, end-to-end encryption, and adheres to strict security protocols to ensure every transaction is secure and protected against fraud.",
//       },
//       {
//         id: "trackTransfer",
//         question: "How do I track my ScopeX transfer?",
//         answer:
//           "You can easily track your transfer in real-time using the ScopeX app or website. Simply log in to your account and navigate to the transaction history for live updates.",
//       },
//     ],
//   },
//   {
//     title: "Safety and Security",
//     items: [
//       {
//         id: "howSafe",
//         question: "How safe is ScopeX?",
//         answer:
//           "ScopeX is designed with multiple layers of security to protect your money and personal information. We use blockchain technology, encryption, and follow regulatory standards to ensure a safe transfer environment.",
//       },
//       {
//         id: "fraudsters",
//         question: "How do I stay away from fraudsters?",
//         answer:
//           "Be cautious of unsolicited communications asking for your ScopeX account details or financial information. Always verify requests through official ScopeX channels and never share sensitive information with unverified sources.",
//       },
//       {
//         id: "affiliatedBank",
//         question: "Is ScopeX affiliated with any bank?",
//         answer:
//           "ScopeX is an independent financial technology company and is not directly affiliated with any specific bank. We partner with various financial institutions to facilitate transactions, ensuring a wide reach and efficient service.",
//       },
//     ],
//   },
//   {
//     title: "General Information",
//     items: [
//       {
//         id: "whatRemittance",
//         question: "What is remittance?",
//         answer:
//           "Remittance refers to the transfer of money, often by foreign workers to their family in their home country. It plays a crucial role in many economies, particularly in developing countries.",
//       },
//       {
//         id: "remittanceImpact",
//         question: "How does remittance impact economies?",
//         answer:
//           "Remittances are a significant source of income for many developing economies, contributing to household income, poverty reduction, and overall economic growth. They can also stabilize economies during financial crises.",
//       },
//       {
//         id: "remittanceParticipants",
//         question: "Who participates in a remittance transaction?",
//         answer:
//           "Typically, a remittance transaction involves three key participants: the sender (usually a migrant worker), the recipient (family member or friend in the home country), and the service provider (like ScopeX) facilitating the transfer.",
//       },
//     ],
//   },
//   {
//     title: "Account Management",
//     items: [
//       {
//         id: "deleteAccount",
//         question: "How do I delete my ScopeX account?",
//         answer:
//           "To delete your ScopeX account, please contact our customer support team. They will guide you through the necessary steps and confirm the account deletion once processed.",
//       },
//       {
//         id: "transactionReceipt",
//         question: "Do I get a receipt for my transactions?",
//         answer:
//           "Yes, ScopeX provides a receipt for every transaction. You can download or view your receipts in the transaction history section of your account on our app or website.",
//       },
//       {
//         id: "verificationDocuments",
//         question: "What documents are required for verification?",
//         answer:
//           "For account verification, you typically need to provide a government-issued ID (like passport or driver's license) and proof of address (like a utility bill or bank statement). The specific documents may vary based on your location and regulatory requirements.",
//       },
//     ],
//   },
// ];

// // Accordion Item Component
// interface AccordionItemProps {
//   item: FAQItem;
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const AccordionItem: React.FC<AccordionItemProps> = ({
//   item,
//   isOpen,
//   onToggle,
// }) => {
//   // Use a ref for the content div to calculate height for animation
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [contentHeight, setContentHeight] = useState<string>("0px");

//   useEffect(() => {
//     // Adjust height when isOpen changes or contentRef is available
//     if (contentRef.current) {
//       setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
//     }
//   }, [isOpen, contentRef]); // Recalculate height if contentRef changes (unlikely but good practice)

//   // Ensure initial height is set correctly if starting open
//   useEffect(() => {
//     if (isOpen && contentRef.current) {
//       setContentHeight(`${contentRef.current.scrollHeight}px`);
//     }
//   }, []); // Run only once on mount

//   return (
//     <div
//       data-state={isOpen ? "open" : "closed"}
//       data-orientation="vertical"
//       className="rounded-2xl bg-white dark:bg-white/5 p-5 mb-4"
//     >
//       <h3
//         data-orientation="vertical"
//         data-state={isOpen ? "open" : "closed"}
//         className="flex"
//       >
//         <button
//           type="button"
//           aria-controls={`radix-${item.id}-content`}
//           aria-expanded={isOpen}
//           data-state={isOpen ? "open" : "closed"}
//           data-orientation="vertical"
//           id={`radix-${item.id}-trigger`}
//           className={`flex w-full flex-1 items-center justify-between text-start text-xs md:text-lg font-medium cursor-pointer text-mainheading dark:text-white transition-all hover:underline`}
//           data-radix-collection-item=""
//           onClick={onToggle}
//         >
//           {item.question}
//           <SlArrowDown
//             className={`size-3 shrink-0 text-muted-foreground transition-transform duration-300 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//             aria-hidden // Add aria-hidden for decorative icons
//           />
//         </button>
//       </h3>
//       {/* Content Div with dynamic height for animation */}
//       <div
//         ref={contentRef}
//         data-state={isOpen ? "open" : "closed"}
//         id={`radix-${item.id}-content`}
//         role="region"
//         aria-labelledby={`radix-${item.id}-trigger`}
//         data-orientation="vertical"
//         className="overflow-hidden text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-300 transition-all duration-300 ease-in-out"
//         style={{ height: contentHeight }}
//         // Use hidden attribute for better accessibility when closed
//         hidden={!isOpen}
//       >
//         {/* Add padding-top only when open and content is visible */}
//         <div
//           className={`pt-3 transition-opacity duration-300 ${
//             isOpen && contentHeight !== "0px" ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {item.answer}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main FAQ Component
// const FAQPage: React.FC = () => {
//   // Initialize state with the ID of the item you want open by default
//   const [openAccordionId, setOpenAccordionId] = useState<string | null>(
//     "whatIsScopeX"
//   );
//   const scrollToTopButtonRef = useRef<HTMLDivElement>(null);
//   const [isScrollToTopVisible, setScrollToTopVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollToTopVisible(window.scrollY > 300);
//     };
//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Initial check
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Toggle function: close if clicking the open one, otherwise open the clicked one
//   const toggleAccordion = (id: string) => {
//     setOpenAccordionId(openAccordionId === id ? null : id);
//   };

//   return (
//     <>
//       <div className="bg-[#f2f4f7] dark:bg-background py-10">
//         <div className="space-y-2.5 container mx-auto px-4 ">
//           {/* Assume text-primary is defined in your Tailwind config for dark mode */}
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Frequently Asked
//             <span className="text-primary"> Questions </span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm text-gray-500 max-w-2xl leading-relaxed dark:text-gray-300">
//             Got questions about currency exchange? We’ve got answers. Explore
//             our most common queries to understand how our services work,
//             exchange rates, transfer times, and more.
//           </p>
//         </div>
//       </div>
//       <div className="bg-[#f2f4f7] dark:bg-background min-h-screen">
//         <main className="mx-auto mb-10 container max-w-3xl px-4">
//           {/* FAQ Sections */}
//           <div className="lg:space-y-8 space-y-5">
//             {faqSections.map((section) => (
//               <div key={section.title}>
//                 <h2 className="text-lg lg:text-2xl font-semibold text-mainheading dark:text-white lg:mb-10 mb-8 text-center">
//                   {section.title}
//                 </h2>
//                 <div className="flex flex-col gap-0">
//                   {/* Reduced gap */}
//                   {section.items.map((item) => (
//                     <AccordionItem
//                       key={item.id}
//                       item={item}
//                       // Pass the check result to determine if this item should be open
//                       isOpen={openAccordionId === item.id}
//                       // Pass the toggle function with the specific item's ID
//                       onToggle={() => toggleAccordion(item.id)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>

//         {/* Scroll to Top Button */}
//         <div
//           ref={scrollToTopButtonRef}
//           // Assume bg-primary and bg-primaryhover are defined in your Tailwind config
//           className={`fixed md:bottom-10 md:right-5 bottom-6 right-6 cursor-pointer rounded-full bg-primary hover:bg-primaryhover p-2.5 text-mainheading transition-opacity duration-300 ${
//             isScrollToTopVisible
//               ? "opacity-100 pointer-events-auto"
//               : "opacity-0 pointer-events-none"
//           }`}
//           title="Scroll to Top"
//           onClick={scrollToTop}
//         >
//           <FaArrowUp className="size-4" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default FAQPage;

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// // Removed FaArrowUp as it's no longer used for scroll-to-top
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for a single FAQ item
// interface FAQItem {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Define the structure for a section containing FAQ items
// interface FAQSectionData {
//   title: string;
//   items: FAQItem[];
// }

// // Data structured according to the image sections
// const faqSections: FAQSectionData[] = [
//   {
//     title: "About Wise",
//     items: [
//       {
//         id: "whatIsScopeX", // This is the ID we need
//         question: "What is Wise? ",
//         answer:
//           "wise is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
//       },
//       {
//         id: "whereOperate",
//         question: "Where does Wise operate?",
//         answer:
//           "Wise operates in more than USD, AED, AUD, CAD, EUR, INR, allowing you to send, spend and receive money internationally with free fees and real exchange rates. If you visit them,",
//       },
//     ],
//   },
//   {
//     title: "Using Wise",
//     items: [
//       {
//         id: "transferTime",
//         question: "How long does a transfer take with Wise?",
//         answer:
//           "Transfer times with Wise vary by destination, but most transfers arrive within minutes to 1–2 business days, depending on the currency and payment method.",
//       },
//       {
//         id: "transferAmount",
//         question: "How much money can be transferred at once with Wise?",
//         answer:
//           "Wise lets you transfer large amounts of money, but the exact limits depend on the currency and the countries involved. Personal account limits may vary, typically ranging from a few thousand to hundreds of thousands, depending on the payment method, regulatory requirements, and destination.",
//       },
//       {
//         id: "transferSecurity",
//         question: "How does Wise ensure the security of my transfers?",
//         answer:
//           "Wise uses advanced security measures like encryption, two-factor authentication, and strict regulatory compliance to keep your money and data safe throughout every transfer.",
//       },
//       {
//         id: "trackTransfer",
//         question: "How do I track my Wise transfer?",
//         answer:
//           "You can easily track your Wise transfer in real time through the Wise app or website, with updates provided at every step until the money reaches its destination.",
//       },
//     ],
//   },
//   {
//     title: "Safety and Security",
//     items: [
//       {
//         id: "howSafe",
//         question: "How safe is Wise?",
//         answer:
//           "Wise is fully regulated by financial authorities around the world and uses bank-level encryption, making it a safe and trusted platform for sending and receiving money globally.",
//       },
//       {
//         id: "fraudsters",
//         question: "How do I stay away from fraudsters?",
//         answer:
//           "To avoid fraud, always double-check recipient details, beware of unexpected messages or requests, and never share your Wise login or security codes. Wise will never ask for sensitive info via email or phone.",
//       },
//       {
//         id: "affiliatedBank",
//         question: "Is Wise affiliated with any bank?",
//         answer:
//           "Wise is not a bank, but it is regulated like one. It operates independently while partnering with licensed financial institutions and holding customer funds in safeguarded accounts for maximum security.",
//       },
//     ],
//   },
//   {
//     title: "General Information",
//     items: [
//       {
//         id: "whatRemittance",
//         question: "What is remittance?",
//         answer:
//           "Remittance refers to the transfer of money, typically by a foreign worker, back to their home country to support family members or friends. It’s a key part of global financial systems and is often done via money transfer services like Wise.",
//       },
//       {
//         id: "remittanceImpact",
//         question: "How does remittance impact economies?",
//         answer:
//           "Remittances play a crucial role in supporting the economies of developing countries by providing families with vital financial resources. They help improve living standards, boost local businesses, and contribute to poverty reduction. In many countries, remittances are a significant source of foreign income.",
//       },
//       {
//         id: "remittanceParticipants",
//         question: "Who participates in a remittance transaction?",
//         answer:
//           "A remittance transaction typically involves three key participants: the sender (who sends the money), the recipient (who receives the funds), and the service provider (such as Wise, which facilitates the transfer). The sender and recipient can be in different countries, while the service provider ensures the safe and timely transfer of funds.",
//       },
//     ],
//   },
//   {
//     title: "Account Management",
//     items: [
//       {
//         id: "deleteAccount",
//         question: "How do I delete my Wise account?",
//         answer:
//           'To delete your Wise account, simply log in to your account, go to the "Settings" section, and follow the prompts to close your account. Make sure all transactions are completed, and there are no pending balances before proceeding. For security reasons, Wise may ask you to verify your identity.',
//       },
//       {
//         id: "transactionReceipt",
//         question: "Do I get a receipt for my transactions?",
//         answer:
//           'Yes, Wise provides a receipt for every transaction. You can easily view and download your receipts directly from your account under the "Transaction History" section, which includes all the details like the amount sent, fees, and exchange rate.',
//       },
//       {
//         id: "verificationDocuments",
//         question: "What documents are required for verification?",
//         answer:
//           "To verify your account with Wise, you may need to provide a government-issued ID (like a passport or Permanent Residency ID) and proof of address (such as a utility bill or bank statement). These documents help ensure the security of your account and comply with financial regulations.",
//       },
//     ],
//   },
// ];

// // Accordion Item Component
// interface AccordionItemProps {
//   item: FAQItem;
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const AccordionItem: React.FC<AccordionItemProps> = ({
//   item,
//   isOpen,
//   onToggle,
// }) => {
//   // Use a ref for the content div to calculate height for animation
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [contentHeight, setContentHeight] = useState<string>("0px");

//   useEffect(() => {
//     // Adjust height when isOpen changes or contentRef is available
//     if (contentRef.current) {
//       setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
//     }
//   }, [isOpen, contentRef]); // Recalculate height if contentRef changes (unlikely but good practice)

//   // Ensure initial height is set correctly if starting open
//   useEffect(() => {
//     if (isOpen && contentRef.current) {
//       setContentHeight(`${contentRef.current.scrollHeight}px`);
//     }
//   }, []); // Run only once on mount

//   return (
//     <div
//       data-state={isOpen ? "open" : "closed"}
//       data-orientation="vertical"
//       className="rounded-2xl bg-white dark:bg-white/5 p-5 mb-4"
//     >
//       <h3
//         data-orientation="vertical"
//         data-state={isOpen ? "open" : "closed"}
//         className="flex"
//       >
//         <button
//           type="button"
//           aria-controls={`radix-${item.id}-content`}
//           aria-expanded={isOpen}
//           data-state={isOpen ? "open" : "closed"}
//           data-orientation="vertical"
//           id={`radix-${item.id}-trigger`}
//           className={`flex w-full flex-1 items-center justify-between text-start text-xs md:text-lg font-medium cursor-pointer text-mainheading dark:text-white transition-all hover:underline`}
//           data-radix-collection-item=""
//           onClick={onToggle}
//         >
//           {item.question}
//           <SlArrowDown
//             className={`size-3 shrink-0 text-muted-foreground transition-transform duration-300 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//             aria-hidden // Add aria-hidden for decorative icons
//           />
//         </button>
//       </h3>
//       {/* Content Div with dynamic height for animation */}
//       <div
//         ref={contentRef}
//         data-state={isOpen ? "open" : "closed"}
//         id={`radix-${item.id}-content`}
//         role="region"
//         aria-labelledby={`radix-${item.id}-trigger`}
//         data-orientation="vertical"
//         className="overflow-hidden text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-300 transition-all duration-300 ease-in-out"
//         style={{ height: contentHeight }}
//         // Use hidden attribute for better accessibility when closed
//         hidden={!isOpen}
//       >
//         {/* Add padding-top only when open and content is visible */}
//         <div
//           className={`pt-3 transition-opacity duration-300 ${
//             isOpen && contentHeight !== "0px" ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {item.answer}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main FAQ Component
// const FAQPage: React.FC = () => {
//   // Initialize state with the ID of the item you want open by default
//   const [openAccordionId, setOpenAccordionId] = useState<string | null>(
//     "whatIsWise"
//   );

//   // REMOVED: Scroll-to-top related state, ref, useEffect, and handler function

//   // Toggle function: close if clicking the open one, otherwise open the clicked one
//   const toggleAccordion = (id: string) => {
//     setOpenAccordionId(openAccordionId === id ? null : id);
//   };

//   return (
//     <>
//       <div className="bg-[#f2f4f7] dark:bg-background py-10">
//         <div className="space-y-2.5 container mx-auto px-4 ">
//           {/* Assume text-primary is defined in your Tailwind config for dark mode */}
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Frequently Asked
//             <span className="text-primary"> Questions </span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm text-gray-500 max-w-2xl leading-relaxed dark:text-gray-300">
//             Got questions about currency exchange? We’ve got answers. Explore
//             our most common queries to understand how our services work,
//             exchange rates, transfer times, and more.
//           </p>
//         </div>
//       </div>
//       <div className="bg-[#f2f4f7] dark:bg-background min-h-screen">
//         <main className="mx-auto mb-10 container max-w-3xl px-4">
//           {/* FAQ Sections */}
//           <div className="lg:space-y-8 space-y-5">
//             {faqSections.map((section) => (
//               <div key={section.title}>
//                 <h2 className="text-lg lg:text-2xl font-semibold text-mainheading dark:text-white lg:mb-10 mb-8 text-center">
//                   {section.title}
//                 </h2>
//                 <div className="flex flex-col gap-0">
//                   {/* Reduced gap */}
//                   {section.items.map((item) => (
//                     <AccordionItem
//                       key={item.id}
//                       item={item}
//                       // Pass the check result to determine if this item should be open
//                       isOpen={openAccordionId === item.id}
//                       // Pass the toggle function with the specific item's ID
//                       onToggle={() => toggleAccordion(item.id)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default FAQPage;

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// // Removed FaArrowUp as it's no longer used for scroll-to-top
// import { SlArrowDown } from "react-icons/sl";

// // Define the structure for a single FAQ item
// interface FAQItem {
//   id: string;
//   question: string;
//   answer: string;
// }

// // Define the structure for a section containing FAQ items
// interface FAQSectionData {
//   title: string;
//   items: FAQItem[];
// }

// // Data structured according to the image sections
// const faqSections: FAQSectionData[] = [
//   {
//     title: "About Wise",
//     items: [
//       {
//         id: "whatIsWise", // <<< This is the ID for the first item
//         question: "What is Wise? ",
//         answer:
//           "wise is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
//       },
//       {
//         id: "whereOperate",
//         question: "Where does Wise operate?",
//         answer:
//           "Wise operates in more than USD, AED, AUD, CAD, EUR, INR, allowing you to send, spend and receive money internationally with free fees and real exchange rates. If you visit them,",
//       },
//     ],
//   },
//   {
//     title: "Using Wise",
//     items: [
//       {
//         id: "transferTime",
//         question: "How long does a transfer take with Wise?",
//         answer:
//           "Transfer times with Wise vary by destination, but most transfers arrive within minutes to 1–2 business days, depending on the currency and payment method.",
//       },
//       {
//         id: "transferAmount",
//         question: "How much money can be transferred at once with Wise?",
//         answer:
//           "Wise lets you transfer large amounts of money, but the exact limits depend on the currency and the countries involved. Personal account limits may vary, typically ranging from a few thousand to hundreds of thousands, depending on the payment method, regulatory requirements, and destination.",
//       },
//       {
//         id: "transferSecurity",
//         question: "How does Wise ensure the security of my transfers?",
//         answer:
//           "Wise uses advanced security measures like encryption, two-factor authentication, and strict regulatory compliance to keep your money and data safe throughout every transfer.",
//       },
//       {
//         id: "trackTransfer",
//         question: "How do I track my Wise transfer?",
//         answer:
//           "You can easily track your Wise transfer in real time through the Wise app or website, with updates provided at every step until the money reaches its destination.",
//       },
//     ],
//   },
//   {
//     title: "Safety and Security",
//     items: [
//       {
//         id: "howSafe",
//         question: "How safe is Wise?",
//         answer:
//           "Wise is fully regulated by financial authorities around the world and uses bank-level encryption, making it a safe and trusted platform for sending and receiving money globally.",
//       },
//       {
//         id: "fraudsters",
//         question: "How do I stay away from fraudsters?",
//         answer:
//           "To avoid fraud, always double-check recipient details, beware of unexpected messages or requests, and never share your Wise login or security codes. Wise will never ask for sensitive info via email or phone.",
//       },
//       {
//         id: "affiliatedBank",
//         question: "Is Wise affiliated with any bank?",
//         answer:
//           "Wise is not a bank, but it is regulated like one. It operates independently while partnering with licensed financial institutions and holding customer funds in safeguarded accounts for maximum security.",
//       },
//     ],
//   },
//   {
//     title: "General Information",
//     items: [
//       {
//         id: "whatRemittance",
//         question: "What is remittance?",
//         answer:
//           "Remittance refers to the transfer of money, typically by a foreign worker, back to their home country to support family members or friends. It’s a key part of global financial systems and is often done via money transfer services like Wise.",
//       },
//       {
//         id: "remittanceImpact",
//         question: "How does remittance impact economies?",
//         answer:
//           "Remittances play a crucial role in supporting the economies of developing countries by providing families with vital financial resources. They help improve living standards, boost local businesses, and contribute to poverty reduction. In many countries, remittances are a significant source of foreign income.",
//       },
//       {
//         id: "remittanceParticipants",
//         question: "Who participates in a remittance transaction?",
//         answer:
//           "A remittance transaction typically involves three key participants: the sender (who sends the money), the recipient (who receives the funds), and the service provider (such as Wise, which facilitates the transfer). The sender and recipient can be in different countries, while the service provider ensures the safe and timely transfer of funds.",
//       },
//     ],
//   },
//   {
//     title: "Account Management",
//     items: [
//       {
//         id: "deleteAccount",
//         question: "How do I delete my Wise account?",
//         answer:
//           'To delete your Wise account, simply log in to your account, go to the "Settings" section, and follow the prompts to close your account. Make sure all transactions are completed, and there are no pending balances before proceeding. For security reasons, Wise may ask you to verify your identity.',
//       },
//       {
//         id: "transactionReceipt",
//         question: "Do I get a receipt for my transactions?",
//         answer:
//           'Yes, Wise provides a receipt for every transaction. You can easily view and download your receipts directly from your account under the "Transaction History" section, which includes all the details like the amount sent, fees, and exchange rate.',
//       },
//       {
//         id: "verificationDocuments",
//         question: "What documents are required for verification?",
//         answer:
//           "To verify your account with Wise, you may need to provide a government-issued ID (like a passport or Permanent Residency ID) and proof of address (such as a utility bill or bank statement). These documents help ensure the security of your account and comply with financial regulations.",
//       },
//     ],
//   },
// ];

// // Accordion Item Component
// interface AccordionItemProps {
//   item: FAQItem;
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const AccordionItem: React.FC<AccordionItemProps> = ({
//   item,
//   isOpen,
//   onToggle,
// }) => {
//   // Use a ref for the content div to calculate height for animation
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [contentHeight, setContentHeight] = useState<string>("0px");

//   useEffect(() => {
//     // Adjust height when isOpen changes or contentRef is available
//     if (contentRef.current) {
//       setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
//     }
//   }, [isOpen, contentRef]); // Recalculate height if contentRef changes

//   // Ensure initial height is set correctly if starting open
//   // This useEffect handles the case where the component mounts already open
//   useEffect(() => {
//     if (isOpen && contentRef.current) {
//       // Use requestAnimationFrame to ensure layout has happened before measuring scrollHeight
//       requestAnimationFrame(() => {
//         if (contentRef.current) {
//           setContentHeight(`${contentRef.current.scrollHeight}px`);
//         }
//       });
//     } else if (!isOpen) {
//       setContentHeight("0px"); // Ensure it's closed if isOpen becomes false
//     }
//     // We only want this to run when `isOpen` changes or initially mounts.
//     // Adding contentRef.current dependency might cause unnecessary runs if ref instance changes.
//   }, [isOpen]);

//   return (
//     <div
//       data-state={isOpen ? "open" : "closed"}
//       data-orientation="vertical"
//       className="rounded-2xl bg-white dark:bg-white/5 p-5 mb-4" // Keep mb-4 for spacing between items
//     >
//       <h3
//         data-orientation="vertical"
//         data-state={isOpen ? "open" : "closed"}
//         className="flex"
//       >
//         <button
//           type="button"
//           aria-controls={`radix-${item.id}-content`}
//           aria-expanded={isOpen}
//           data-state={isOpen ? "open" : "closed"}
//           data-orientation="vertical"
//           id={`radix-${item.id}-trigger`}
//           className={`flex w-full flex-1 items-center justify-between text-start text-sm md:text-lg font-medium cursor-pointer text-mainheading dark:text-white transition-all hover:underline`}
//           data-radix-collection-item=""
//           onClick={onToggle}
//         >
//           {item.question}
//           <SlArrowDown
//             className={`size-3 shrink-0 text-muted-foreground transition-transform duration-300 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//             aria-hidden // Add aria-hidden for decorative icons
//           />
//         </button>
//       </h3>
//       {/* Content Div with dynamic height for animation */}
//       <div
//         ref={contentRef}
//         data-state={isOpen ? "open" : "closed"}
//         id={`radix-${item.id}-content`}
//         role="region"
//         aria-labelledby={`radix-${item.id}-trigger`}
//         data-orientation="vertical"
//         className="overflow-hidden text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-300 transition-all duration-300 ease-in-out"
//         style={{ height: contentHeight }}
//         // Use hidden attribute for better accessibility when closed
//         hidden={!isOpen}
//       >
//         {/* Add padding-top only when open and content is visible */}
//         {/* The conditional rendering here ensures the content only appears when open */}
//         {isOpen && (
//           <div
//             className={`pt-3 transition-opacity duration-300 ${
//               contentHeight !== "0px" ? "opacity-100" : "opacity-0" // Fade in based on height calculation
//             }`}
//           >
//             {item.answer}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Main FAQ Component
// const FAQPage: React.FC = () => {
//   // Initialize state with the ID of the item you want open by default
//   const [openAccordionId, setOpenAccordionId] = useState<string | null>(
//     "whatIsWise" // <<< Set the ID of the first FAQ item here
//   );

//   // Toggle function: close if clicking the open one, otherwise open the clicked one
//   const toggleAccordion = (id: string) => {
//     setOpenAccordionId(openAccordionId === id ? null : id);
//   };

//   return (
//     <>
//       {/* Header Section */}
//       <div className="bg-[#f2f4f7] dark:bg-background py-10">
//         <div className="space-y-2.5 container mx-auto px-4 ">
//           {/* Title */}
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Frequently Asked
//             {/* Highlighted part */}
//             <span className="text-primary"> Questions </span>
//           </h1>
//           {/* Subtitle */}
//           <p className="lg:text-lg sm:text-base text-sm text-gray-500 max-w-2xl leading-relaxed dark:text-gray-300">
//             Got questions about currency exchange? We’ve got answers. Explore
//             our most common queries to understand how our services work,
//             exchange rates, transfer times, and more.
//           </p>
//         </div>
//       </div>

//       {/* FAQ Content Section */}
//       <div className="bg-[#f2f4f7] dark:bg-background min-h-screen">
//         <main className="mx-auto mb-10 container max-w-3xl px-4">
//           {/* Map through each FAQ section */}
//           <div className="lg:space-y-8 space-y-5">
//             {faqSections.map((section) => (
//               <div key={section.title}>
//                 {/* Section Title */}
//                 <h2 className="text-lg lg:text-2xl font-semibold text-mainheading dark:text-white lg:mb-10 mb-8 text-center">
//                   {section.title}
//                 </h2>
//                 {/* Container for accordion items in this section */}
//                 <div className="flex flex-col gap-0">
//                   {/* Map through each item within the section */}
//                   {section.items.map((item) => (
//                     <AccordionItem
//                       key={item.id}
//                       item={item}
//                       // Determine if this item should be open based on the state
//                       isOpen={openAccordionId === item.id}
//                       // Pass the toggle function, specific to this item's ID
//                       onToggle={() => toggleAccordion(item.id)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default FAQPage;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";

// Define the structure for a single FAQ item
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Define the structure for a section containing FAQ items
interface FAQSectionData {
  title: string;
  items: FAQItem[];
}

// Data structured according to the image sections (same as before)
const faqSections: FAQSectionData[] = [
  {
    title: "About Wise",
    items: [
      {
        id: "whatIsWise", // <<< This is the ID for the first item
        question: "What is Wise? ",
        answer:
          "wise is a digital banking platform providing powerful APIs for real-time currency exchange, helping financial institutions and websites deliver secure, modern FX services",
      },
      {
        id: "whereOperate",
        question: "Where does Wise operate?",
        answer:
          "Wise operates in more than USD, AED, AUD, CAD, EUR, INR, allowing you to send, spend and receive money internationally with free fees and real exchange rates. If you visit them,",
      },
    ],
  },
  {
    title: "Using Wise",
    items: [
      {
        id: "transferTime",
        question: "How long does a transfer take with Wise?",
        answer:
          "Transfer times with Wise vary by destination, but most transfers arrive within minutes to 1–2 business days, depending on the currency and payment method.",
      },
      {
        id: "transferAmount",
        question: "How much money can be transferred at once with Wise?",
        answer:
          "Wise lets you transfer large amounts of money, but the exact limits depend on the currency and the countries involved. Personal account limits may vary, typically ranging from a few thousand to hundreds of thousands, depending on the payment method, regulatory requirements, and destination.",
      },
      {
        id: "transferSecurity",
        question: "How does Wise ensure the security of my transfers?",
        answer:
          "Wise uses advanced security measures like encryption, two-factor authentication, and strict regulatory compliance to keep your money and data safe throughout every transfer.",
      },
      {
        id: "trackTransfer",
        question: "How do I track my Wise transfer?",
        answer:
          "You can easily track your Wise transfer in real time through the Wise app or website, with updates provided at every step until the money reaches its destination.",
      },
    ],
  },
  {
    title: "Safety and Security",
    items: [
      {
        id: "howSafe",
        question: "How safe is Wise?",
        answer:
          "Wise is fully regulated by financial authorities around the world and uses bank-level encryption, making it a safe and trusted platform for sending and receiving money globally.",
      },
      {
        id: "fraudsters",
        question: "How do I stay away from fraudsters?",
        answer:
          "To avoid fraud, always double-check recipient details, beware of unexpected messages or requests, and never share your Wise login or security codes. Wise will never ask for sensitive info via email or phone.",
      },
      {
        id: "affiliatedBank",
        question: "Is Wise affiliated with any bank?",
        answer:
          "Wise is not a bank, but it is regulated like one. It operates independently while partnering with licensed financial institutions and holding customer funds in safeguarded accounts for maximum security.",
      },
    ],
  },
  {
    title: "General Information",
    items: [
      {
        id: "whatRemittance",
        question: "What is remittance?",
        answer:
          "Remittance refers to the transfer of money, typically by a foreign worker, back to their home country to support family members or friends. It’s a key part of global financial systems and is often done via money transfer services like Wise.",
      },
      {
        id: "remittanceImpact",
        question: "How does remittance impact economies?",
        answer:
          "Remittances play a crucial role in supporting the economies of developing countries by providing families with vital financial resources. They help improve living standards, boost local businesses, and contribute to poverty reduction. In many countries, remittances are a significant source of foreign income.",
      },
      {
        id: "remittanceParticipants",
        question: "Who participates in a remittance transaction?",
        answer:
          "A remittance transaction typically involves three key participants: the sender (who sends the money), the recipient (who receives the funds), and the service provider (such as Wise, which facilitates the transfer). The sender and recipient can be in different countries, while the service provider ensures the safe and timely transfer of funds.",
      },
    ],
  },
  {
    title: "Account Management",
    items: [
      {
        id: "deleteAccount",
        question: "How do I delete my Wise account?",
        answer:
          'To delete your Wise account, simply log in to your account, go to the "Settings" section, and follow the prompts to close your account. Make sure all transactions are completed, and there are no pending balances before proceeding. For security reasons, Wise may ask you to verify your identity.',
      },
      {
        id: "transactionReceipt",
        question: "Do I get a receipt for my transactions?",
        answer:
          'Yes, Wise provides a receipt for every transaction. You can easily view and download your receipts directly from your account under the "Transaction History" section, which includes all the details like the amount sent, fees, and exchange rate.',
      },
      {
        id: "verificationDocuments",
        question: "What documents are required for verification?",
        answer:
          "To verify your account with Wise, you may need to provide a government-issued ID (like a passport or Permanent Residency ID) and proof of address (such as a utility bill or bank statement). These documents help ensure the security of your account and comply with financial regulations.",
      },
    ],
  },
];

// Accordion Item Component
interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>("0px");

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen, contentRef]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      requestAnimationFrame(() => {
        if (contentRef.current) {
          setContentHeight(`${contentRef.current.scrollHeight}px`);
        }
      });
    } else if (!isOpen) {
      setContentHeight("0px");
    }
  }, [isOpen]);

  return (
    // Outer div: Removed p-5, added overflow-hidden for safety
    <div
      data-state={isOpen ? "open" : "closed"}
      data-orientation="vertical"
      className="rounded-lg bg-gray/10 dark:bg-white/5 mb-4 overflow-hidden" // Keep mb-4 for spacing
    >
      {/* H3: Can remain for semantic structure, removed flex class */}
      <h3
        data-orientation="vertical"
        data-state={isOpen ? "open" : "closed"}
        className="" // Removed flex as button handles layout now
      >
        {/* Button: Now has p-5 and handles the click for the entire header area */}
        <button
          type="button"
          aria-controls={`radix-${item.id}-content`}
          aria-expanded={isOpen}
          data-state={isOpen ? "open" : "closed"}
          data-orientation="vertical"
          id={`radix-${item.id}-trigger`}
          // *** ADDED p-5 HERE ***
          className={`flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-mainheading dark:text-gray-100 transition-colors duration-200 font-medium dark:hover:bg-white/5 md:p-5 p-4`}
          data-radix-collection-item=""
          onClick={onToggle} // The click handler remains on the button
        >
          {item.question}
          <SlArrowDown
            className={`lg:size-3 size-2.5 shrink-0 text-gray-500 dark:text-gray-300 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden // Add aria-hidden for decorative icons
          />
        </button>
      </h3>
      {/* Content Div (structure and logic remain the same) */}
      <div
        ref={contentRef}
        data-state={isOpen ? "open" : "closed"}
        id={`radix-${item.id}-content`}
        role="region"
        aria-labelledby={`radix-${item.id}-trigger`}
        data-orientation="vertical"
        // Added px-5 pb-5 for padding *only* on the content, not the header
        className="overflow-hidden text-sm md:text-base ps-6 pb-4 lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out"
        style={{ height: contentHeight }}
        hidden={!isOpen}
      >
        {/* No extra div needed here, padding is handled above */}
        {/* Content only renders when open */}
        {isOpen && item.answer}
        {/* Removed inner div with pt-3 and opacity logic - simplified */}
      </div>
    </div>
  );
};

// Main FAQ Component (remains the same)
const FAQPage: React.FC = () => {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(
    "whatIsWise"
  );

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  return (
    <>
      {/* Header Section */}
      <div className="bg-white dark:bg-background py-10">
        <div className="space-y-2.5 container mx-auto px-4 ">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
            Frequently Asked
            <span className="text-primary"> Questions </span>
          </h1>
          <p className="lg:text-lg sm:text-base text-sm text-gray-500 max-w-2xl leading-relaxed dark:text-gray-300">
            Got questions about currency exchange? We’ve got answers. Explore
            our most common queries to understand how our services work,
            exchange rates, transfer times, and more.
          </p>
        </div>
      </div>

      {/* FAQ Content Section */}
      <div className="bg-white dark:bg-background min-h-screen">
        <main className="mx-auto mb-10 container max-w-3xl px-4">
          <div className="lg:space-y-8 space-y-5">
            {faqSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg lg:text-2xl font-semibold text-mainheading dark:text-white lg:mb-10 mb-8 text-center">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-0">
                  {" "}
                  {/* Changed gap-4 to gap-0 as mb-4 on item handles spacing */}
                  {section.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      isOpen={openAccordionId === item.id}
                      onToggle={() => toggleAccordion(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default FAQPage;
