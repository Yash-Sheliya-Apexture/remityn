// import { ArrowDownIcon, ArrowUpIcon, Key, UserIcon } from "lucide-react";
// import React from "react";
// import Link from "next/link";
// // Custom SVG component for the "Holding money" icon symbol

// interface TopicCardProps {
//   icon: React.ReactNode;
//   title: string;
//   description?: string;
//   descriptionParts?: Array<{ text: string; highlighted?: boolean }>;
// }

// const TopicCard: React.FC<TopicCardProps> = ({ icon, title, description }) => {
//   return (
//     <div className="p-6 space-y-3 text-center bg-primarybox hover:bg-[#2f373b] rounded-2xl flex flex-col justify-between items-center  transition-all duration-75 ease-linear cursor-pointer">
//       <div className="bg-secondarybox rounded-full p-3.5 inline-flex items-center justify-center">
//         {icon}
//       </div>

//       <h3 className="text-2xl font-semibold text-mainheadingWhite capitalize">
//         {title}
//       </h3>

//       <p className="text-subheadingWhite text-sm">{description}</p>
//     </div>
//   );
// };

// const HelpCenter: React.FC = () => {

//   const topicsData: TopicCardProps[] = [
//     {
//       icon: <ArrowUpIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Sending money",
//       description: "Setting up, paying for, editing, and cancelling transfers.",
//     },
//     {
//       icon: <UserIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Managing your account",
//       description: "Setting up your account and getting verified.",
//     },
//     {
//       icon: <Key className="w-6 h-6 rotate-45 text-primary" strokeWidth="2" />,
//       title: "Holding money",
//       description:
//         "Holding balances, setting up Direct Debits, and using Interest & Stocks.",
//     },
//     {
//       icon: <ArrowDownIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Receiving money",
//       description: "Using your account details to receive money.",
//     },
//     {
//       icon: <ArrowDownIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Add Recipiant",
//       description:
//         "Need help with your recipient or transfer? We're here to assist.",
//     },
//   ];

//   return (
//     <div className="max-w-3xl mx-auto px-4 lg:py-16 py-10 bg-background">

//       <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold capitalize text-center mb-12">
//         Hi, how can <span className="text-primary">we help? </span>
//       </h1>

//       <h2 className="text-xl font-medium text-mainheadingWhite mb-6">
//         Explore all topics
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {topicsData.map((topic, index) => (
//           <TopicCard
//             key={index}
//             icon={topic.icon}
//             title={topic.title}
//             description={topic.description}
//             descriptionParts={topic.descriptionParts}
//           />
//         ))}
//       </div>

//       <div className="mt-10 flex flex-col sm:flex-row items-center justify-center">
//         <p className="text-subheadingWhite text-base">
//           Still need help? {"  "}
//           <Link
//             href="/contact-us"
//             className="text-primary font-semibold underline cursor-pointer"
//           >
//             Contact Us
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HelpCenter;

// import { ArrowDownIcon, ArrowUpIcon, Key, UserIcon } from "lucide-react"; // Make sure Key is imported if used
// import React from "react";
// import Link from "next/link";

// // Custom SVG component for the "Holding money" icon symbol (if you have one, otherwise Key from lucide is fine)

// interface TopicCardProps {
//   icon: React.ReactNode;
//   title: string;
//   description?: string;
//   href: string; // Added href for navigation
// }

// const TopicCard: React.FC<TopicCardProps> = ({
//   icon,
//   title,
//   description,
//   href,
// }) => {
//   return (
//     <Link
//       href={href}
//       className="p-6 space-y-4 text-center bg-primarybox hover:bg-[#2f373b] rounded-2xl flex flex-col justify-start items-center transition-all duration-150 ease-linear cursor-pointer no-underline min-h-[220px] " // Added min-height for consistency
//     >
//       <div className="bg-secondarybox rounded-full p-3.5 inline-flex items-center justify-center">
//         {icon}
//       </div>
//       <h3 className="text-xl md:text-2xl font-semibold text-mainheadingWhite capitalize">
//         {title}
//       </h3>
//       {description && (
//         <p className="text-subheadingWhite text-sm">{description}</p>
//       )}
//     </Link>
//   );
// };

// const HelpCenter: React.FC = () => {
//   const topicsData: TopicCardProps[] = [
//     {
//       icon: <ArrowUpIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Sending money",
//       description: "Setting up, paying for, editing, and cancelling transfers.",
//       href: "/help/sending-money",
//     },
//     {
//       icon: <UserIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Managing your account",
//       description: "Setting up your account and getting verified.",
//       href: "/help/managing-your-account",
//     },
//     {
//       icon: <Key className="w-6 h-6 rotate-45 text-primary" strokeWidth="2" />,
//       title: "Holding money",
//       description:
//         "Holding balances, setting up Direct Debits, and using Interest & Stocks.",
//       href: "/help/holding-money",
//     },
//     {
//       icon: <ArrowDownIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Receiving money",
//       description: "Using your account details to receive money.",
//       href: "/help/receiving-money",
//     },
//     {
//       icon: <ArrowDownIcon className="w-6 h-6 text-primary" strokeWidth="2" />, // Consider a UserPlusIcon or similar for "Add Recipient"
//       title: "Add Recipient",
//       description:
//         "Need help with your recipient or transfer? We're here to assist.",
//       href: "/help/add-recipient",
//     },
//   ];

//   return (
//     <div className="max-w-3xl mx-auto px-4 lg:py-16 py-10 bg-background min-h-screen">
//       <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold capitalize text-center mb-12 text-mainheadingWhite">
//         Hi, how can <span className="text-primary">we help? </span>
//       </h1>

//       <h2 className="text-xl font-medium text-mainheadingWhite mb-6">
//         Explore all topics
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {topicsData.map((topic, index) => (
//           <TopicCard
//             key={index}
//             icon={topic.icon}
//             title={topic.title}
//             description={topic.description}
//             href={topic.href}
//           />
//         ))}
//       </div>

//       <div className="mt-10 flex flex-col sm:flex-row items-center justify-center">
//         <p className="text-subheadingWhite text-base">
//           Still need help? {"  "}
//           <Link
//             href="/contact-us"
//             className="text-primary font-semibold underline cursor-pointer"
//           >
//             Contact Us
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HelpCenter;

// "use client"; // Add this at the top for Next.js App Router, as useRouter is a client hook

// import { ArrowDownIcon, ArrowUpIcon, Key, UserIcon, Users } from "lucide-react";
// import React from "react";
// import Link from "next/link"; // Still used for the "Contact Us" link
// import { useRouter } from "next/navigation"; // Import useRouter

// interface TopicCardProps {
//   icon: React.ReactNode;
//   title: string;
//   description?: string;
//   href: string;
// }

// const TopicCard: React.FC<TopicCardProps> = ({
//   icon,
//   title,
//   description,
//   href,
// }) => {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push(href);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
//     // Navigate on Enter or Space key press for accessibility
//     if (event.key === "Enter" || event.key === " ") {
//       event.preventDefault(); // Prevent default space scroll
//       router.push(href);
//     }
//   };

//   return (
//     <div
//       onClick={handleClick}
//       onKeyDown={handleKeyDown}
//       role="link" // Accessibility: inform assistive technologies this div behaves like a link
//       tabIndex={0} // Accessibility: make the div focusable
//       className="p-6 space-y-4 text-center bg-primarybox hover:bg-[#2f373b] rounded-2xl flex flex-col justify-start items-center transition-all duration-150 ease-linear cursor-pointer no-underline min-h-[220px]"
//     >
//       <div className="bg-secondarybox rounded-full p-3.5 inline-flex items-center justify-center">
//         {icon}
//       </div>
//       <h3 className="text-xl md:text-2xl font-semibold text-mainheadingWhite capitalize">
//         {title}
//       </h3>
//       {description && (
//         <p className="text-subheadingWhite text-sm">{description}</p>
//       )}
//     </div>
//   );
// };

// const HelpCenter: React.FC = () => {
//   const topicsData: TopicCardProps[] = [
//     {
//       icon: <ArrowUpIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Sending money",
//       description: "Set up, pay for, edit, or cancel your money transfers.",
//       href: "/help/sending-money",
//     },
//     {
//       icon: <UserIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Managing your account",
//       description: "Create your account and complete verification.",
//       href: "/help/managing-your-account",
//     },
//     {
//       icon: <Key className="w-6 h-6 rotate-45 text-primary" strokeWidth="2" />,
//       title: "Holding money",
//       description:
//         "Manage balances, set up Direct Debits, and explore Interest or Stock options",
//       href: "/help/holding-money",
//     },
//     {
//       icon: <ArrowDownIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Receiving money",
//       description: "Use your account details to receive funds securely.",
//       href: "/help/receiving-money",
//     },
//     {
//       icon: <Users className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Add Recipient",
//       description:
//         "Need help with your recipient or transfer? We're here to assist.",
//       href: "/help/add-recipient",
//     },
//   ];

//   return (
//     <div className="max-w-3xl mx-auto px-4 lg:py-16 py-10 bg-background min-h-screen">
//       <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold capitalize text-center mb-12 text-mainheadingWhite">
//         Hi, how can <span className="text-primary">we help? </span>
//       </h1>

//       <h2 className="text-xl font-medium text-mainheadingWhite mb-6">
//         Explore all topics
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {topicsData.map((topic, index) => (
//           <TopicCard
//             key={index}
//             icon={topic.icon}
//             title={topic.title}
//             description={topic.description}
//             href={topic.href}
//           />
//         ))}
//       </div>

//       <div className="mt-10 flex flex-col sm:flex-row items-center justify-center">
//         <p className="text-subheadingWhite text-base">
//           Still need help? {"  "}
//           <Link
//             href="/contact-us"
//             className="text-primary font-semibold underline cursor-pointer"
//           >
//             Contact Us
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HelpCenter;

// "use client"; // Add this at the top for Next.js App Router, as useRouter is a client hook

// import {
//   ArrowDownIcon,
//   ArrowUpIcon,
//   Users,
//   ChevronRightIcon,
//   CircleEllipsis, // Added for mobile list view
// } from "lucide-react";
// import React from "react";
// import Link from "next/link"; // Still used for the "Contact Us" link
// import { useRouter } from "next/navigation"; // Import useRouter

// interface TopicCardProps {
//   icon: React.ReactNode;
//   title: string;
//   description?: string;
//   href: string;
// }

// const TopicCard: React.FC<TopicCardProps> = ({
//   icon,
//   title,
//   description,
//   href,
// }) => {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push(href);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === "Enter" || event.key === " ") {
//       event.preventDefault(); // Prevent default space scroll
//       router.push(href);
//     }
//   };

//   const originalIconElement = icon as React.ReactElement;
//   const originalIconProps = originalIconElement.props;

//   // Extract non-size/color classes like 'rotate-45' from the original icon's className
//   const persistentClasses = originalIconProps.className
//     ?.split(" ")
//     .filter(
//       (cls: string) =>
//         !cls.startsWith("w-") &&
//         !cls.startsWith("h-") &&
//         !cls.startsWith("text-")
//     )
//     .join(" ");

//   const mobileIcon = React.cloneElement(originalIconElement, {
//     className: `w-5 h-5 text-primary ${persistentClasses || ""}`.trim(),
//     strokeWidth: originalIconProps.strokeWidth || "2", // Keep original or default to 2
//   });

//   // Desktop icon uses original props, but we reconstruct className to be sure
//   const desktopIcon = React.cloneElement(originalIconElement, {
//     className: `w-6 h-6 text-primary ${persistentClasses || ""}`.trim(), // text-primary from original
//     strokeWidth: originalIconProps.strokeWidth || "2",
//   });

//   return (
//     <div
//       onClick={handleClick}
//       onKeyDown={handleKeyDown}
//       role="link"
//       tabIndex={0}
//       className="
//         flex items-center p-3 mb-2 bg-primarybox rounded-lg cursor-pointer transition-colors duration-150 ease-linear no-underline
//         sm:flex-col sm:justify-start sm:items-center sm:p-6 sm:space-y-4 sm:text-center sm:bg-primarybox sm:hover:bg-[#2f373b] sm:rounded-2xl sm:min-h-[220px] sm:mb-0 sm:transition-all
//       "
//     >
//       {/* Icon Container - responsive background and icon */}
//       <div
//         className="
//           rounded-full p-2.5 inline-flex items-center justify-center
//           bg-secondarybox sm:p-3.5 text-primary"
//       >
//         <span className="sm:hidden">{mobileIcon}</span>
//         <span className="hidden sm:inline-flex">{desktopIcon}</span>
//       </div>

//       {/* Text Content */}
//       <div className="ml-4 flex-grow text-left sm:ml-0 sm:text-center">
//         <h3
//           className="
//             text-base font-semibold
//             sm:text-xl md:text-2xl sm:font-semibold text-mainheadingWhite sm:capitalize
//           "
//         >
//           {title}
//         </h3>
//         {description && (
//           <p
//             className="
//               text-xs text-gray-400 sm:mt-3 mt-0
//               sm:text-sm sm:text-subheadingWhite
//             "
//           >
//             {description}
//           </p>
//         )}
//       </div>

//       {/* Arrow Icon (visible on mobile, hidden on sm+) */}
//       <ChevronRightIcon className="w-5 h-5 text-mainheadingWhite ml-3 shrink-0 sm:hidden" />
//     </div>
//   );
// };

// const HelpCenter: React.FC = () => {
//   const topicsData: TopicCardProps[] = [
//     {
//       icon: <ArrowUpIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Send money",
//       description: "Set up, pay for, edit, or cancel your money transfers.", // Updated to match screenshot's phrasing style
//       href: "/help/sending-money",
//     },
//     {
//       icon: <ArrowDownIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Receive money",
//       description: "Securely receive funds using your account details.",
//       href: "/help/receiving-money",
//     },
//     {
//       icon: <Users className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Add Recipient", // Original data
//       description:
//         "Need help adding a recipient or managing a transfer? We’re here to help",
//       href: "/help/add-recipient",
//     },
//     {
//       icon: <CircleEllipsis className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Others", // Original data
//       description:
//         "Have a different issue? Explore other topics or reach out to our team for help.",
//       href: "/help/add-recipient",
//     },
//   ];

//   return (
//     <div className="max-w-3xl mx-auto px-4 lg:py-16 py-10 bg-background min-h-screen">
//       <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold capitalize text-center mb-12 text-mainheadingWhite">
//         Hi, how can <span className="text-primary">we help? </span>
//       </h1>

//       <h2 className="text-xl font-medium text-mainheadingWhite mb-6">
//         Explore all topics
//       </h2>

//       {/* This grid handles layout: 1 column on mobile, 2 on sm, 3 on lg */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-1.5">
//         {/* For mobile (grid-cols-1), TopicCard has mb-2 for spacing. */}
//         {/* For sm+, grid gap-4 provides spacing, and TopicCard's sm:mb-0 prevents double margin. */}
//         {topicsData.map((topic, index) => (
//           <TopicCard
//             key={index}
//             icon={topic.icon}
//             title={topic.title}
//             description={topic.description}
//             href={topic.href}
//           />
//         ))}
//       </div>

//       <div className="mt-10 flex flex-col sm:flex-row items-center justify-center">
//         <p className="text-subheadingWhite text-base">
//           Still need help? {"  "}
//           <Link
//             href="/contact-us"
//             className="text-primary font-semibold underline cursor-pointer"
//           >
//             Contact Us
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HelpCenter;

// "use client"; // Add this at the top for Next.js App Router, as useRouter is a client hook

// import {
//   ArrowDownIcon,
//   ArrowUpIcon,
//   Users,
//   ChevronRightIcon,
//   CircleEllipsis,
//   LucideProps, // Import LucideProps for typing icon props
// } from "lucide-react";
// import React, { isValidElement } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// interface TopicCardProps {
//   icon: React.ReactNode; // icon is expected to be a ReactElement<LucideProps> in practice
//   title: string;
//   description?: string;
//   href: string;
// }

// const TopicCard: React.FC<TopicCardProps> = ({
//   icon,
//   title,
//   description,
//   href,
// }) => {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push(href);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === "Enter" || event.key === " ") {
//       event.preventDefault();
//       router.push(href);
//     }
//   };

//   // Ensure icon is a valid React element and cast it to the specific props type.
//   // This helps React.cloneElement understand the props it can accept.
//   if (!isValidElement(icon)) {
//     // Or handle this case more gracefully, e.g., return null or a placeholder
//     console.error("Invalid icon passed to TopicCard:", icon);
//     return null;
//   }
//   // FIX: Type originalIconElement more specifically for React.cloneElement
//   const originalIconElement = icon as React.ReactElement<LucideProps>;
//   // originalIconElement.props is now correctly typed as LucideProps (or partial of it if that's how ReactElement stores it)
//   // To be absolutely sure for direct access, we can still assert:
//   const originalIconProps = originalIconElement.props;

//   const persistentClasses = originalIconProps.className
//     ?.split(" ")
//     .filter(
//       (cls: string) =>
//         !cls.startsWith("w-") &&
//         !cls.startsWith("h-") &&
//         !cls.startsWith("text-")
//     )
//     .join(" ");

//   const mobileIcon = React.cloneElement(originalIconElement, {
//     className: `w-5 h-5 text-primary ${persistentClasses || ""}`.trim(),
//     strokeWidth:
//       originalIconProps.strokeWidth !== undefined
//         ? String(originalIconProps.strokeWidth)
//         : "2",
//   });

//   const desktopIcon = React.cloneElement(originalIconElement, {
//     className: `w-6 h-6 text-primary ${persistentClasses || ""}`.trim(),
//     strokeWidth:
//       originalIconProps.strokeWidth !== undefined
//         ? String(originalIconProps.strokeWidth)
//         : "2",
//   });

//   return (
//     <div
//       onClick={handleClick}
//       onKeyDown={handleKeyDown}
//       role="link"
//       tabIndex={0}
//       className="
//         flex items-center p-3 mb-2 bg-primarybox rounded-lg cursor-pointer transition-colors duration-150 ease-linear no-underline
//         sm:flex-col sm:justify-start sm:items-center sm:p-6 sm:space-y-4 sm:text-center sm:bg-primarybox sm:hover:bg-[#2f373b] sm:rounded-2xl sm:min-h-[220px] sm:mb-0 sm:transition-all
//       "
//     >
//       <div
//         className="
//           rounded-full p-2.5 inline-flex items-center justify-center
//           bg-secondarybox sm:p-3.5 text-primary"
//       >
//         <span className="sm:hidden">{mobileIcon}</span>
//         <span className="hidden sm:inline-flex">{desktopIcon}</span>
//       </div>

//       <div className="ml-4 flex-grow text-left sm:ml-0 sm:text-center">
//         <h3
//           className="
//             text-base font-semibold
//             sm:text-xl md:text-2xl sm:font-semibold text-mainheadingWhite sm:capitalize
//           "
//         >
//           {title}
//         </h3>
//         {description && (
//           <p
//             className="
//               text-xs text-gray-400 sm:mt-3 mt-0
//               sm:text-sm sm:text-subheadingWhite
//             "
//           >
//             {description}
//           </p>
//         )}
//       </div>

//       <ChevronRightIcon className="w-5 h-5 text-mainheadingWhite ml-3 shrink-0 sm:hidden" />
//     </div>
//   );
// };

// const HelpCenter: React.FC = () => {
//   const topicsData: TopicCardProps[] = [
//     {
//       icon: <ArrowUpIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Send money",
//       description: "Set up, pay for, edit, or cancel your money transfers.",
//       href: "/help/sending-money",
//     },
//     {
//       icon: <ArrowDownIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Receive money",
//       description: "Securely receive funds using your account details.",
//       href: "/help/receiving-money",
//     },
//     {
//       icon: <Users className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Add Recipient",
//       description:
//         "Need help adding a recipient or managing a transfer? We’re here to help",
//       href: "/help/add-recipient",
//     },
//     {
//       icon: <CircleEllipsis className="w-6 h-6 text-primary" strokeWidth="2" />,
//       title: "Others",
//       description:
//         "Have a different issue? Explore other topics or reach out to our team for help.",
//       href: "/help/add-recipient",
//     },
//   ];

//   return (
//     <div className="max-w-3xl mx-auto px-4 lg:py-16 py-10 bg-background min-h-screen">
//       <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold capitalize text-center mb-12 text-mainheadingWhite">
//         Hi, how can <span className="text-primary">we help? </span>
//       </h1>

//       <h2 className="text-xl font-medium text-mainheadingWhite mb-6">
//         Explore all topics
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-1.5">
//         {topicsData.map((topic, index) => (
//           <TopicCard
//             key={topic.title} // Use a more stable key if possible, e.g., topic.href or a unique ID
//             icon={topic.icon}
//             title={topic.title}
//             description={topic.description}
//             href={topic.href}
//           />
//         ))}
//       </div>

//       <div className="mt-10 flex flex-col sm:flex-row items-center justify-center">
//         <p className="text-subheadingWhite text-base">
//           Still need help? {"  "}
//           <Link
//             href="/contact-us"
//             className="text-primary font-semibold underline cursor-pointer"
//           >
//             Contact Us
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HelpCenter;




// app/help/page.tsx
"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  Users,
  ChevronRightIcon,
  CircleEllipsis,
  LucideProps,
} from "lucide-react";
import React, { isValidElement } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TopicCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  href: string; // This href will now always point to /contact/channels with a topic
}

const TopicCard: React.FC<TopicCardProps> = ({
  icon,
  title,
  description,
  href,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push(href);
    }
  };

  if (!isValidElement(icon)) {
    console.error("Invalid icon passed to TopicCard:", icon);
    return null;
  }
  const originalIconElement = icon as React.ReactElement<LucideProps>;
  const originalIconProps = originalIconElement.props;

  const persistentClasses = originalIconProps.className
    ?.split(" ")
    .filter(
      (cls: string) =>
        !cls.startsWith("w-") &&
        !cls.startsWith("h-") &&
        !cls.startsWith("text-")
    )
    .join(" ");

  const mobileIcon = React.cloneElement(originalIconElement, {
    className: `w-5 h-5 text-primary ${persistentClasses || ""}`.trim(),
    strokeWidth:
      originalIconProps.strokeWidth !== undefined
        ? String(originalIconProps.strokeWidth)
        : "2",
  });

  const desktopIcon = React.cloneElement(originalIconElement, {
    className: `w-6 h-6 text-primary ${persistentClasses || ""}`.trim(),
    strokeWidth:
      originalIconProps.strokeWidth !== undefined
        ? String(originalIconProps.strokeWidth)
        : "2",
  });

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      className="
        flex items-center p-3 mb-2 bg-primarybox rounded-lg cursor-pointer transition-colors duration-150 ease-linear no-underline
        sm:flex-col sm:justify-start sm:items-center sm:p-6 sm:space-y-4 sm:text-center sm:bg-primarybox sm:hover:bg-[#2f373b] sm:rounded-2xl sm:min-h-[220px] sm:mb-0 sm:transition-all
      "
    >
      <div
        className="
          rounded-full p-2.5 inline-flex items-center justify-center
          bg-secondarybox sm:p-3.5 text-primary"
      >
        <span className="sm:hidden">{mobileIcon}</span>
        <span className="hidden sm:inline-flex">{desktopIcon}</span>
      </div>

      <div className="ml-4 flex-grow text-left sm:ml-0 sm:text-center">
        <h3
          className="
            text-base font-semibold
            sm:text-xl md:text-2xl sm:font-semibold text-mainheadingWhite sm:capitalize
          "
        >
          {title}
        </h3>
        {description && (
          <p
            className="
              text-xs text-subheadingWhite sm:mt-3 mt-0
              sm:text-sm
            "
          >
            {description}
          </p>
        )}
      </div>
      <ChevronRightIcon className="w-5 h-5 text-mainheadingWhite ml-3 shrink-0 sm:hidden" />
    </div>
  );
};

const HelpCenter: React.FC = () => {
  // Original topic details
  const rawTopics = [
    {
      icon: <ArrowUpIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
      title: "Send money",
      description: "Set up, pay for, edit, or cancel your money transfers.",
    },
    {
      icon: <ArrowDownIcon className="w-6 h-6 text-primary" strokeWidth="2" />,
      title: "Receive money",
      description: "Securely receive funds using your account details.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" strokeWidth="2" />,
      title: "Add Recipient",
      description:
        "Need help adding a recipient or managing a transfer? We’re here to help.",
    },
    {
      icon: <CircleEllipsis className="w-6 h-6 text-primary" strokeWidth="2" />,
      title: "Others",
      description:
        "Have a different issue? Explore other topics or reach out to our team for help.",
    },
  ];

  // MODIFIED: All topics now link to the contact channels page,
  // passing their title as the 'topic' query parameter.
  const topicsData: TopicCardProps[] = rawTopics.map((topic) => ({
    ...topic,
    href: `/contact/channels?topic=${encodeURIComponent(topic.title)}`,
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 lg:py-16 py-10 bg-background min-h-screen">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold capitalize text-center mb-12 text-mainheadingWhite">
        Hi, how can <span className="text-primary">we help? </span>
      </h1>

      <h2 className="text-xl font-medium text-mainheadingWhite mb-6">
        Explore all topics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-1.5">
        {topicsData.map((topic) => (
          <TopicCard
            key={topic.title} // Assuming titles are unique enough for keys here
            icon={topic.icon}
            title={topic.title}
            description={topic.description}
            href={topic.href}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center">
        <p className="text-subheadingWhite text-base">
          Still need help? {"  "}
          <Link
            // This link also goes to the contact channels page with a generic topic
            href={`/contact/channels?topic=${encodeURIComponent(
              "General Help Inquiry"
            )}`}
            className="text-primary font-semibold underline cursor-pointer hover:text-green-400"
          >
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;
