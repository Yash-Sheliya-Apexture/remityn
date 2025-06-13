// // app/contact/channels/page.tsx
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   ChevronRightIcon,
//   MessageCircle as MessageCircleIcon, // Renamed to avoid conflict if MessageCircle component exists
//   Phone as PhoneIcon,
//   Mail as MailIcon,
//   HelpCircle as HelpCircleIcon,
// } from "lucide-react";
// import { useSearchParams } from "next/navigation";

// const ContactChannelsPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const queryTopic = searchParams.get("topic") || "Changing your address"; // Default or from URL

//   const [selectedLanguage, setSelectedLanguage] = useState("English");

//   const contactOptions = [
//     {
//       id: "chat",
//       icon: <MessageCircleIcon className="w-6 h-6 text-white/90" />,
//       label: "Chat",
//       href: `/contact/chat-interface?topic=${encodeURIComponent(
//         queryTopic
//       )}&lang=${selectedLanguage}`, // Example actual chat link
//     },
//     {
//       id: "phone",
//       icon: <PhoneIcon className="w-6 h-6 text-white/90" />,
//       label: "Phone",
//       href: "/contact/phone-info", // Example page with phone numbers
//     },
//     {
//       id: "email",
//       icon: <MailIcon className="w-6 h-6 text-white/90" />,
//       label: "Email",
//       href: `mailto:support@example.com?subject=Help Request: ${encodeURIComponent(
//         queryTopic
//       )}`, // Example mailto link
//     },
//   ];

//   return (
//     <div className="bg-background py-10 sm:py-16 px-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Breadcrumbs */}
//         <nav className="sm:mb-10 mb-8" aria-label="Breadcrumb">
//           <ol className="list-none p-0 inline-flex space-x-1 items-center">
//             <li>
//               <Link href="/help" className="text-primary underline font-medium">
//                 Help Home
//               </Link>
//             </li>
//             <li>
//               <ChevronRightIcon className="h-5 w-5 text-mainheadingWhite" />
//             </li>
//             <li>
//               {/* Assuming /contact/channels is the main contact page for these options */}
//               <Link href="/contact/channels" className="text-mainheadingWhite font-medium">
//                 Contact
//               </Link>
//             </li>
//           </ol>
//         </nav>

//         {/* Title */}
//         <div className="text-center sm:mb-10 mb-8">
//           <h3 className="sm:text-4xl text-2xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Talk with <span className="text-primary">our team</span>
//           </h3>
//         </div>

//         {/* Preferred Options */}
//         <div>
//           <h2 className="text-xl font-semibold text-mainheadingWhite mb-5 py-2 border-b ">
//             Your preferred option
//           </h2>

//           <div className="space-y-4">
//             {contactOptions.map((option) => (
//               <Link
//                 href={option.href}
//                 key={option.id}
//                 className="flex items-center gap-4 hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group"
//               >
//                 <div className="bg-secondarybox p-3 rounded-full relative">
//                   <span className="size-6 text-white">{option.icon}</span>
//                 </div>
//                 <div className="flex-grow">
//                   <span className="flex items-center font-medium leading-relaxed text-mainheadingWhite text-base sm:text-xl">
//                     {option.label}
//                   </span>
//                 </div>
//                 <ChevronRightIcon className="w-6 h-6 text-white" />
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactChannelsPage;


// app/contact/channels/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  ChevronRightIcon,
  MessageCircle as MessageCircleIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

// The 'declare global' block for Tawk_API has been moved to src/types/tawk.d.ts

const ContactChannelsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const queryTopic = searchParams.get("topic") || "Changing your address";
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleOpenTawkTo = useCallback(() => {
    console.log("Contact option: Attempting to open Tawk.to chat");
    if (typeof window !== "undefined" && window.Tawk_API) {
      if (typeof window.Tawk_API.maximize === "function") {
        window.Tawk_API.maximize();
      } else if (typeof window.Tawk_API.toggle === "function") {
        window.Tawk_API.toggle();
      } else {
        console.warn(
          "Tawk_API.maximize() or Tawk_API.toggle() is not available."
        );
      }
    } else {
      console.warn(
        "Tawk_API is not initialized or not available on window. Cannot open chat."
      );
    }
  }, []);

  const contactOptions = [
    {
      id: "chat",
      icon: <MessageCircleIcon className="w-6 h-6 text-white/90" />,
      label: "Chat",
      href: `/contact/chat-interface?topic=${encodeURIComponent(
        queryTopic
      )}&lang=${selectedLanguage}`, // href is still here but click is overridden
      action: handleOpenTawkTo,
    },
    {
      id: "phone",
      icon: <PhoneIcon className="w-6 h-6 text-white/90" />,
      label: "Phone",
      href: "/contact/phone-info",
    },
    {
      id: "email",
      icon: <MailIcon className="w-6 h-6 text-white/90" />,
      label: "Email",
      href: `mailto:support@example.com?subject=Help Request: ${encodeURIComponent(
        queryTopic
      )}`,
    },
  ];

  return (
    <div className="bg-background py-10 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <nav className="sm:mb-10 mb-8" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex space-x-1 items-center">
            <li>
              <Link href="/help" className="text-primary underline font-medium">
                Help Home
              </Link>
            </li>
            <li>
              <ChevronRightIcon className="h-5 w-5 text-mainheadingWhite" />
            </li>
            <li>
              <Link
                href="/contact/channels"
                className="text-mainheadingWhite font-medium"
              >
                Contact
              </Link>
            </li>
          </ol>
        </nav>

        <div className="text-center sm:mb-10 mb-8">
          <h3 className="sm:text-4xl text-2xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Talk with <span className="text-primary">our team</span>
          </h3>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-mainheadingWhite mb-5 py-2 border-b ">
            Your preferred option
          </h2>
          <div className="space-y-4">
            {contactOptions.map((option) => {
              if (option.id === "chat" && option.action) {
                return (
                  <div
                    key={option.id}
                    onClick={(e) => {
                      e.preventDefault();
                      if (option.action) {
                        option.action();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (option.action) {
                          option.action();
                        }
                      }
                    }}
                    className="flex items-center gap-4 hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group"
                  >
                    <div className="bg-secondarybox p-3 rounded-full relative">
                      <span className="size-6 text-white">{option.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <span className="flex items-center font-medium leading-relaxed text-mainheadingWhite text-base sm:text-xl">
                        {option.label}
                      </span>
                    </div>
                    <ChevronRightIcon className="w-6 h-6 text-white" />
                  </div>
                );
              }
              return (
                <Link
                  href={option.href}
                  key={option.id}
                  className="flex items-center gap-4 hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group"
                >
                  <div className="bg-secondarybox p-3 rounded-full relative">
                    <span className="size-6 text-white">{option.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <span className="flex items-center font-medium leading-relaxed text-mainheadingWhite text-base sm:text-xl">
                      {option.label}
                    </span>
                  </div>
                  <ChevronRightIcon className="w-6 h-6 text-white" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactChannelsPage;
