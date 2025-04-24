// import React from "react";

// const Security = () => {
//   return (
//     <section className="py-16 px-4 bg-white dark:bg-background text-center">
//       <h2 className="text-2xl font-semibold mb-6">
//         Your Security is Our Priority
//       </h2>
//       <p className="max-w-2xl mx-auto text-gray-">
//         We use bank-level encryption and comply with international financial
//         regulations to ensure your transactions are secure and reliable.
//       </p>
//     </section>
//   );
// };

// export default Security;

// import { ShieldCheck } from "lucide-react";

// export default function SecuritySection() {
//   return (
//     <section className="w-full bg-lightgray dark:bg-background py-16 px-4">
//       <div className="max-w-5xl mx-auto text-center">
//         <div className="flex items-center justify-center mb-4">
//           <div className="bg-white text-green-600 p-4 rounded-full shadow-md">
//             <ShieldCheck className="w-8 h-8" />
//           </div>
//         </div>
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-primary mb-4">
//           Your Security is Our Priority
//         </h2>
//         <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
//           We use industry-leading encryption and secure payment technologies to
//           protect your data at every step. From login to transaction, your
//           personal and financial information is always safe with us. Our systems
//           are regularly audited to ensure compliance with global security
//           standards. You can trust us to keep your money and information
//           protected.
//         </p>
//       </div>
//     </section>
//   );
// }

// // src/components/OurSolutions.tsx
// import React from "react";
// import { BsShieldLock } from "react-icons/bs";
// import { HiOutlineLockClosed } from "react-icons/hi";
// import { MdOutlineMonitorHeart } from "react-icons/md";
// import { RiSecurePaymentLine } from "react-icons/ri";

// // Data structure for solution items (optional but good practice)
// interface SolutionItem {
//   id: number;
//   icons: string;
//   title: string;
//   description: string;
// }

// const solutionItems: SolutionItem[] = [
//   {
//     id: 1,
//     icons: <BsShieldLock />,
//     title: "Payments",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipiscing elit posuere vel venenatis, eu sit massa. Volutpat massa rhoncus odio.",
//   },
//   {
//     id: 2,
//     icons: <RiSecurePaymentLine />,
//     title: "Collections",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipiscing elit posuere vel venenatis, eu sit massa. Volutpat massa rhoncus odio.",
//   },
//   {
//     id: 3,
//     icons: <MdOutlineMonitorHeart />,
//     title: "Conversions",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipiscing elit posuere vel venenatis, eu sit massa. Volutpat massa rhoncus odio.",
//   },
//   {
//     id: 4,
//     icons: <HiOutlineLockClosed /> ,
//     title: "Global Account",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipiscing elit posuere vel venenatis, eu sit massa. Volutpat massa rhoncus odio.",
//   },
// ];

// const OurSolutions: React.FC = () => {
//   return (
//     <section className="our-solutions">
//       {/* Assuming 'overlay' implies a background color and padding */}
//       <div className="bg-white dark:bg-background">
//         {/* Replicates Bootstrap 'container' */}
//         <div className="container mx-auto px-4">
//           <div className="text-center space-y-2">
//             {/* Replicates 'sub-title' styling */}
//             <h5 className="text-gray dark:text-gray-300 font-medium">
//               High speeds. Low fees. No hassle.
//             </h5>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//               All Your Payments <br />
//               <span className="text-primary"> In One Place</span>
//             </h1>

//             <p className="lg:text-xl text-sm text-gray-700 dark:text-gray-300">
//               Get used to low fees and great exchange rates on international
//               money transfers.
//             </p>
//           </div>

//           {/* Added mt-16 for spacing between header and items grid */}
//           <div className="flex flex-wrap mt-10">
//             {solutionItems.map((item) => (
//               <div key={item.id} className="w-1/2 xl:w-1/4 px-4 mb-8">
//                 {/* Replicates 'single-item' styling */}
//                 <div className="text-center border rounded-2xl p-4">
//                   <div>{item.icons}</div>
//                   <h5 className="text-lg font-semibold dark:text-white text-mainheading mb-2">
//                     {item.title}
//                   </h5>
//                   <p className="text-gray-700 dark:text-gray-300 text-sm">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurSolutions;

// src/components/OurSolutions.tsx
// Ensure this file has the .tsx extension

import React from "react"; // React needs to be in scope for JSX
import { BsShieldLock } from "react-icons/bs";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { JSX } from "react/jsx-runtime";

// Data structure for solution items
interface SolutionItem {
  id: number;
  // Use JSX.Element for React components
  icons: JSX.Element;
  title: string;
  description: string;
}

const solutionItems: SolutionItem[] = [
  {
    id: 1,
    icons: (
      <BsShieldLock className="lg:size-8 size-6 inline-block text-white" />
    ),
    title: "Bank-Level Data Encryption",
    description:
      "Every step of your transaction is secured with 256-bit SSL encryption, ensuring your personal and financial information remains confidential and protected",
  },
  {
    id: 2,
    icons: (
      <RiSecurePaymentLine className="lg:size-8 size-6 inline-block text-white" />
    ),
    title: "Trusted & Certified Providers",
    description:
      "We use only PCI-DSS compliant payment gateways, ensuring that your funds are processed through secure and regulated financial channels",
  },
  {
    id: 3,
    icons: (
      <MdOutlineMonitorHeart className="lg:size-8 size-6 inline-block text-white" />
    ),
    title: "24/7 Fraud Detection",
    description:
      "Our systems constantly monitor transactions for suspicious activity, so any unusual behavior is detected and stopped before it can cause harm.",
  },
  {
    id: 4,
    icons: (
      <HiOutlineLockClosed className="lg:size-8 size-6 inline-block text-white" />
    ),
    title: "Data Privacy by Default",
    description:
      "We never share your personal data without consent and comply fully with international data protection standards like GDPR and secure money.",
  },
];

const OurSolutions: React.FC = () => {
  return (
    <section className="our-solutions lg:py-10 py-5">
      <div className="bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2">
            {/* Replicates 'sub-title' styling */}
            <h5 className="text-gray dark:text-gray-300 md:text-base text-sm font-medium">
              Secure & Protected
            </h5>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
              Secure Payments
              <br />
              <span className="text-primary"> You Can Trust</span>
            </h1>

            <p className="lg:text-lg text-sm max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              When you add money to your account, your security is our top
              priority. Every transaction is protected by advanced encryption,
              monitored in real-time for fraud.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {solutionItems.map((item) => (
              <div key={item.id} className="solution-item">
                <div className="md:text-center text-left dark:border-none rounded-2xl lg:p-6 p-4 space-y-3 bg-lightgray dark:bg-white/5 h-full flex flex-col">
                  {/* Render the icon element directly */}
                  <div className="rounded-full p-2.5 w-fit bg-gray dark:bg-white/5 flex items-center justify-center md:mx-auto">
                    <span>{item.icons}</span>
                  </div>
                  <h5 className="lg:text-xl text-base font-medium text-subheading dark:text-primary">
                    {item.title}
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm flex-grow">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSolutions;
