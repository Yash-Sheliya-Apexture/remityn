// "use client";

// import React, { useState, useRef, useEffect } from "react";
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

// // Data structured according to the image sections (same as before)
// const faqSections: FAQSectionData[] = [
//   {
//     title: "About Wise",
//     items: [
//       {
//         id: "whatIsWise",
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
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [contentHeight, setContentHeight] = useState<string>("0px");

//   useEffect(() => {
//     if (contentRef.current) {
//       setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
//     }
//   }, [isOpen, contentRef]);

//   useEffect(() => {
//     if (isOpen && contentRef.current) {
//       requestAnimationFrame(() => {
//         if (contentRef.current) {
//           setContentHeight(`${contentRef.current.scrollHeight}px`);
//         }
//       });
//     } else if (!isOpen) {
//       setContentHeight("0px");
//     }
//   }, [isOpen]);

//   return (
//     // Outer div: Removed p-5, added overflow-hidden for safety
//     <div
//       data-state={isOpen ? "open" : "closed"}
//       data-orientation="vertical"
//       className="rounded-lg bg-lightgray dark:bg-white/5 mb-4 overflow-hidden" // Keep mb-4 for spacing
//     >
//       {/* H3: Can remain for semantic structure, removed flex class */}
//       <h3
//         data-orientation="vertical"
//         data-state={isOpen ? "open" : "closed"}
//         className="" // Removed flex as button handles layout now
//       >
//         {/* Button: Now has p-5 and handles the click for the entire header area */}
//         <button
//           type="button"
//           aria-controls={`radix-${item.id}-content`}
//           aria-expanded={isOpen}
//           data-state={isOpen ? "open" : "closed"}
//           data-orientation="vertical"
//           id={`radix-${item.id}-trigger`}
//           // *** ADDED p-5 HERE ***
//           className={`flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-mainheading dark:text-white  transition-colors duration-300 font-medium md:p-5 p-4`}
//           data-radix-collection-item=""
//           onClick={onToggle} // The click handler remains on the button
//         >
//           {item.question}
//           <SlArrowDown
//             className={`lg:size-3 size-2.5 shrink-0 text-gray-700 dark:text-gray-300 transition-transform duration-300 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//             aria-hidden // Add aria-hidden for decorative icons
//           />
//         </button>
//       </h3>
//       {/* Content Div (structure and logic remain the same) */}
//       <div
//         ref={contentRef}
//         data-state={isOpen ? "open" : "closed"}
//         id={`radix-${item.id}-content`}
//         role="region"
//         aria-labelledby={`radix-${item.id}-trigger`}
//         data-orientation="vertical"
//         // Added px-5 pb-5 for padding *only* on the content, not the header
//         className="overflow-hidden text-sm md:text-base px-4 pb-4 lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out"
//         style={{ height: contentHeight }}
//         hidden={!isOpen}
//       >
//         {isOpen && item.answer}
//       </div>
//     </div>
//   );
// };

// // Main FAQ Component (remains the same)
// const FAQPage: React.FC = () => {
//   const [openAccordionId, setOpenAccordionId] = useState<string | null>(
//     "whatIsWise"
//   );

//   const toggleAccordion = (id: string) => {
//     setOpenAccordionId(openAccordionId === id ? null : id);
//   };

//   return (
//     <>
//       {/* Header Section */}
//       <div className="bg-white dark:bg-background lg:py-10 px-4 py-5">
//         <div className="space-y-2.5 container mx-auto">
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Frequently Asked
//             <span className="text-primary"> Questions </span>
//           </h1>
//           <p className="lg:text-lg sm:text-base text-sm text-gray-700 max-w-2xl leading-relaxed dark:text-gray-300">
//             Got questions about currency exchange? We’ve got answers. Explore
//             our most common queries to understand how our services work,
//             exchange rates, transfer times, and more.
//           </p>
//         </div>
//       </div>

//       {/* FAQ Content Section */}
//       <div className="bg-white dark:bg-background min-h-screen">
//         <main className="mx-auto mb-10 container max-w-3xl px-4">
//           <div className="lg:space-y-8 space-y-5">
//             {faqSections.map((section) => (
//               <div key={section.title}>
//                 <h2 className="text-lg lg:text-2xl font-semibold text-mainheading dark:text-white lg:mb-10 mb-8 text-center">
//                   {section.title}
//                 </h2>
//                 <div className="flex flex-col gap-0">
//                   {" "}
//                   {/* Changed gap-4 to gap-0 as mb-4 on item handles spacing */}
//                   {section.items.map((item) => (
//                     <AccordionItem
//                       key={item.id}
//                       item={item}
//                       isOpen={openAccordionId === item.id}
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

// import React, { useState, useRef, useEffect, useCallback } from "react";
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
//         id: "whatIsWise", // This ID will be the default open item
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

// // Accordion Item Component (With Smooth Animation)
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
//   const contentRef = useRef<HTMLDivElement>(null);
//   const uniqueTriggerId = `faq-trigger-${item.id}`;
//   const uniqueContentId = `faq-content-${item.id}`;

//   // Effect to handle the smooth transition (height, opacity, visibility)
//   useEffect(() => {
//     const contentEl = contentRef.current;
//     if (contentEl) {
//       const transitionDuration = 300; // Match CSS duration in milliseconds

//       if (isOpen) {
//         // Open animation
//         contentEl.style.visibility = "visible";
//         contentEl.style.opacity = "1";
//         requestAnimationFrame(() => {
//           if (contentRef.current && isOpen) {
//             // Check again inside rAF
//             contentEl.style.height = `${contentEl.scrollHeight}px`;
//           }
//         });
//       } else {
//         // Close animation
//         contentEl.style.height = "0px";
//         contentEl.style.opacity = "0";
//         const timer = setTimeout(() => {
//           if (contentRef.current && !isOpen) {
//             // Check if still closed
//             contentEl.style.visibility = "hidden";
//           }
//         }, transitionDuration);
//         return () => clearTimeout(timer); // Cleanup timer
//       }
//     }
//   }, [isOpen]);

//   return (
//     <div
//       data-state={isOpen ? "open" : "closed"}
//       data-orientation="vertical"
//       className="rounded-lg bg-lightgray dark:bg-white/5 mb-4 overflow-hidden"
//     >
//       <h3
//         data-orientation="vertical"
//         data-state={isOpen ? "open" : "closed"}
//         className="m-0 flex"
//       >
//         <button
//           type="button"
//           aria-controls={uniqueContentId}
//           aria-expanded={isOpen}
//           data-state={isOpen ? "open" : "closed"}
//           data-orientation="vertical"
//           id={uniqueTriggerId}
//           className="flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-mainheading dark:text-white transition-colors duration-300 font-medium md:p-5 p-4"
//           data-radix-collection-item=""
//           onClick={onToggle}
//         >
//           {item.question}
//           <SlArrowDown
//             className={`lg:size-3 size-2.5 shrink-0 text-gray-700 dark:text-gray-300 transition-transform duration-300 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//             aria-hidden
//           />
//         </button>
//       </h3>
//       <div
//         ref={contentRef}
//         id={uniqueContentId}
//         role="region"
//         aria-labelledby={uniqueTriggerId}
//         data-state={isOpen ? "open" : "closed"}
//         data-orientation="vertical"
//         className="overflow-hidden text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out"
//         style={{
//           height: "0px",
//           visibility: "hidden",
//           opacity: "0",
//         }}
//       >
//         {/* Inner div for content padding */}
//         <div className="pt-0 pb-4 md:px-5 px-4">{item.answer}</div>
//       </div>
//     </div>
//   );
// };

// // Main FAQ Component (Manages State, Renders Sections)
// const FAQPage: React.FC = () => {
//   // Initialize state with the ID of the first FAQ item, defaults to null if no data
//   const [openAccordionId, setOpenAccordionId] = useState<string | null>(
//     faqSections[0]?.items[0]?.id ?? null // <- Ensures first item is open by default
//   );

//   const toggleAccordion = useCallback((id: string) => {
//     setOpenAccordionId((prevOpenId) => (prevOpenId === id ? null : id));
//   }, []);

//   return (
//     <>
//       {/* Header Section */}
//       <div className="bg-white dark:bg-background lg:py-10 px-4 py-5">
//         <div className="space-y-2.5 container mx-auto">
//           <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Frequently Asked
//             <span className="text-primary"> Questions </span>
//           </h1>
//           <p className="lg:text-lg sm:text-base text-sm text-gray-700 max-w-2xl leading-relaxed dark:text-gray-300">
//             Got questions about currency exchange? We’ve got answers. Explore
//             our most common queries to understand how our services work,
//             exchange rates, transfer times, and more.
//           </p>
//         </div>
//       </div>

//       {/* FAQ Content Section */}
//       <div className="bg-white dark:bg-background min-h-screen">
//         <main className="mx-auto mb-10 container max-w-3xl px-4">
//           <div className="lg:space-y-8 space-y-5">
//             {faqSections.map((section) => (
//               <div key={section.title}>
//                 <h2 className="text-lg lg:text-2xl font-semibold text-mainheading dark:text-white lg:mb-10 mb-8 text-center">
//                   {section.title}
//                 </h2>
//                 <div>
//                   {section.items.map((item) => (
//                     <AccordionItem
//                       key={item.id}
//                       item={item}
//                       isOpen={openAccordionId === item.id} // Determines if this item is open
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

import React, { useState, useRef, useEffect, useCallback } from "react";
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

// Data structured according to the image sections
const faqSections: FAQSectionData[] = [
  {
    title: "About Wise",
    items: [
      {
        id: "whatIsWise", // This ID will be the default open item
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

// Accordion Item Component (Modified for No Initial Animation)
interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean; // This prop dictates the *target* state (open or closed)
  onToggle: () => void;
  isInitiallyOpen: boolean; // Track if this specific item was open on load
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  isInitiallyOpen, // Receive the initial state
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false); // Track if component has mounted
  const uniqueTriggerId = `faq-trigger-${item.id}`;
  const uniqueContentId = `faq-content-${item.id}`;

  // Effect to handle animations *after* the initial mount
  useEffect(() => {
    // Only run animation logic *after* the component has mounted
    if (isMounted.current && contentRef.current) {
      const contentEl = contentRef.current;
      const transitionDuration = 300; // Match CSS duration

      if (isOpen) {
        // Start open animation
        contentEl.style.visibility = "visible";
        contentEl.style.opacity = "1";
        // Use rAF to get correct scrollHeight after potential style changes
        requestAnimationFrame(() => {
          if (contentRef.current && isOpen) {
            // Check state again inside rAF
            contentEl.style.height = `${contentEl.scrollHeight}px`;
          }
        });
      } else {
        // Start close animation
        contentEl.style.height = "0px";
        contentEl.style.opacity = "0";
        // Hide visibility after transition ends
        const timer = setTimeout(() => {
          if (contentRef.current && !isOpen) {
            // Check state again before hiding
            contentEl.style.visibility = "hidden";
          }
        }, transitionDuration);
        return () => clearTimeout(timer); // Cleanup timer
      }
    } else {
      // Set mounted ref to true after the first render cycle completes
      isMounted.current = true;
    }
  }, [isOpen]); // Dependency: only run when isOpen state changes

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      data-orientation="vertical"
      className="rounded-lg bg-lightgray dark:bg-white/5 mb-4 overflow-hidden"
    >
      <h3
        data-orientation="vertical"
        data-state={isOpen ? "open" : "closed"}
        className="m-0 flex"
      >
        <button
          type="button"
          aria-controls={uniqueContentId}
          aria-expanded={isOpen}
          data-state={isOpen ? "open" : "closed"}
          data-orientation="vertical"
          id={uniqueTriggerId}
          // Apply transition *only after mount* by conditionally adding the class
          className={`flex w-full cursor-pointer flex-1 gap-2 items-center justify-between text-start lg:text-xl md:text-lg text-sm text-mainheading dark:text-white font-medium md:p-5 p-4 ${
            isMounted.current ? "transition-colors duration-300" : ""
          }`} // Button color transition
          data-radix-collection-item=""
          onClick={onToggle}
        >
          {item.question}
          <SlArrowDown
            // Apply transition *only after mount*
            className={`lg:size-3 size-2.5 shrink-0 text-gray-700 dark:text-gray-300 ${
              isMounted.current ? "transition-transform duration-300" : ""
            } ${isOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </h3>
      <div
        ref={contentRef}
        id={uniqueContentId}
        role="region"
        aria-labelledby={uniqueTriggerId}
        data-state={isOpen ? "open" : "closed"}
        data-orientation="vertical"
        // Apply transition class *only after mount*
        className={`overflow-hidden text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300 ${
          isMounted.current ? "transition-all duration-300 ease-in-out" : ""
        }`}
        style={
          // Set initial styles directly based on `isInitiallyOpen`
          // This ensures the default item starts open without animation
          isInitiallyOpen
            ? { height: "auto", visibility: "visible", opacity: "1" }
            : { height: "0px", visibility: "hidden", opacity: "0" }
        }
      >
        {/* Inner div for content padding */}
        <div className="pt-0 pb-4 md:px-5 px-4">{item.answer}</div>
      </div>
    </div>
  );
};

// Main FAQ Component (Manages State, Renders Sections)
const FAQPage: React.FC = () => {
  const initialOpenId = faqSections[0]?.items[0]?.id ?? null;
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(
    initialOpenId
  );

  const toggleAccordion = useCallback((id: string) => {
    setOpenAccordionId((prevOpenId) => (prevOpenId === id ? null : id));
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="bg-white dark:bg-background lg:py-10 px-4 py-5">
        <div className="space-y-2.5 container mx-auto">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
            Frequently Asked
            <span className="text-primary"> Questions </span>
          </h1>
          <p className="lg:text-lg sm:text-base text-sm text-gray-700 max-w-2xl leading-relaxed dark:text-gray-300">
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
                <div>
                  {section.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      isOpen={openAccordionId === item.id}
                      onToggle={() => toggleAccordion(item.id)}
                      // Pass whether this item was the one initially open
                      isInitiallyOpen={item.id === initialOpenId}
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
