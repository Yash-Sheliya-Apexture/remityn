// import React from "react";

// const MoneyMethod = () => {
//   return (
//     <section className="py-16 px-4 bg-white dark:bg-background max-w-7xl mx-auto">
//       <h2 className="text-2xl font-semibold text-cente mb-10">
//         Choose Your Preferred Method
//       </h2>
//       <div className="grid md:grid-cols-3 gap-6">
//         {[
//           {
//             title: "Bank Transfer",
//             desc: "Add money directly via bank account.",
//           },
//           {
//             title: "Credit/Debit Card",
//             desc: "Instantly add funds using your card.",
//           },
//           {
//             title: "UPI & Mobile Wallets",
//             desc: "Fast and easy via UPI or popular wallets.",
//           },
//         ].map((item, idx) => (
//           <div
//             key={idx}
//             className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
//           >
//             <h3 className="text-lg text-mainheading font-bold mb-2">{item.title}</h3>
//             <p className="text-mainheading">{item.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MoneyMethod;

// import React from "react";
// import { FaUniversity, FaCreditCard, FaMobileAlt } from "react-icons/fa";
// import { MdAccountBalanceWallet } from "react-icons/md";

// type Method = {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// };

// const methods: Method[] = [
//   {
//     icon: <FaUniversity className="text-blue-600 text-3xl" />,
//     title: "Bank Transfer",
//     description:
//       "Add funds securely via your bank account with NEFT, RTGS, or IMPS.",
//   },
//   {
//     icon: <FaCreditCard className="text-purple-600 text-3xl" />,
//     title: "Credit / Debit Card",
//     description: "Instantly add money using any major credit or debit card.",
//   },
//   {
//     icon: <FaMobileAlt className="text-green-600 text-3xl" />,
//     title: "UPI Payments",
//     description:
//       "Use your favorite UPI apps like Google Pay, PhonePe, or Paytm for quick transfers.",
//   },
//   {
//     icon: <MdAccountBalanceWallet className="text-yellow-600 text-3xl" />,
//     title: "Mobile Wallets",
//     description:
//       "Seamlessly add money from wallets like Paytm, MobiKwik, and more.",
//   },
// ];

// const AddMoneyMethods: React.FC = () => {
//   return (
//     <section className="py-16 px-4 bg-white dark:bg-background max-w-7xl mx-auto">
//       <div className="text-center mb-12 space-y-1">
//         <p className="text-gray dark:text-gray-300 font-medium">
//           How it works?
//         </p>

//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//           Just few
//           <span className="text-primary"> steps to start</span>
//         </h1>

//         <p className="lg:text-xl text-sm text-gray-700 dark:text-gray-300">
//           It's easier than you think. Follow 3 simple easy steps
//         </p>
//       </div>

//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//         {methods.map((method, index) => (
//           <div
//             key={index}
//             className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition-all text-center flex flex-col items-center"
//           >
//             <div className="mb-4">{method.icon}</div>
//             <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
//             <p className="text-gray-600 text-sm">{method.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default AddMoneyMethods;

// import React from "react";
// import { FaUniversity, FaCreditCard, FaMobileAlt } from "react-icons/fa";
// import { MdAccountBalanceWallet } from "react-icons/md";

// // The data definition remains the same
// type Method = {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// };

// const AddMoneyMethods: React.FC = () => {
//   return (
//     <section className="py-16 px-4 bg-white dark:bg-background max-w-8xl ">
//       {/* Heading section remains the same */}
//       <div className="container mx-auto ">

//         <div className="text-center mb-10 space-y-1">
//           <p className="text-gray dark:text-gray-300 font-medium">
//             How it works?
//           </p>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Just few
//             <span className="text-primary"> steps to start</span>
//           </h1>
//           <p className="lg:text-xl text-sm text-gray-700 dark:text-gray-300">
//             It's easier than you think. Follow 3 simple easy steps
//           </p>
//         </div>

//         {/* Grid container remains the same */}
//         <div className="flex gap-6 relative">
//           {/* Method 1: Bank Transfer */}
//           <div className="bg-lightgray dark:bg-white/5 p-6 rounded-2xl shadow hover:shadow-md transition-all text-center flex flex-col items-center">
//             <div className="mb-4">
//               <FaUniversity className="size-10" />
//             </div>
//             <h3 className="text-lg text-primary font-semibold mb-2">
//               Bank Transfer
//             </h3>
//             <p className="text-gray-700 dark:text-gray-300">
//               Add funds securely via your bank account with NEFT, RTGS, or IMPS
//             </p>
//           </div>

//           {/* Method 2: Credit / Debit Card */}
//           <div className="bg-lightgray dark:bg-white/5 p-6 rounded-2xl shadow hover:shadow-md transition-all text-center flex flex-col items-center">
//             <div className="mb-4">
//               <FaCreditCard className="size-10" />
//             </div>
//             <h3 className="text-lg text-primary font-semibold mb-2">
//               Credit / Debit Card
//             </h3>
//             <p className="text-gray-700 dark:text-gray-300">
//               Instantly add money using any major credit or debit card.
//             </p>
//           </div>

//           {/* Method 3: UPI Payments */}
//           <div className="bg-lightgray dark:bg-white/5 p-6 rounded-2xl shadow hover:shadow-md transition-all text-center flex flex-col items-center">
//             <div className="mb-4">
//               <FaMobileAlt className="size-10" />
//             </div>
//             <h3 className="text-lg text-primary font-semibold mb-2">
//               UPI Payments
//             </h3>
//             <p className="text-gray-700 dark:text-gray-300">
//               Use your favorite UPI apps like Google Pay, PhonePe, or Paytm for
//               quick transfers.
//             </p>
//           </div>

//           {/* Method 4: Mobile Wallets */}
//           <div className="bg-lightgray dark:bg-white/5 p-6 rounded-2xl shadow hover:shadow-md transition-all text-center flex flex-col items-center">
//             <div className="mb-4">
//               <MdAccountBalanceWallet className="size-10" />
//             </div>
//             <h3 className="text-lg text-primary font-semibold mb-2">
//               Mobile Wallets
//             </h3>
//             <p className="text-gray-700 dark:text-gray-300">
//               Seamlessly add money from wallets like Paytm, MobiKwik, and more.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddMoneyMethods;

import React from "react";
import { BiTransfer } from "react-icons/bi";
import {
  FaUniversity,
  FaCreditCard,
  FaMobileAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdAccountBalanceWallet, MdReceiptLong } from "react-icons/md";

const AddMoneyMethods = () => {
  const methods = [
    {
      step: 1,
      icon: <FiEdit className="text-white" />,
      title: "Enter Amount to Add Money",
      description:
        "In this step, you can securely enter the amount you wish to add to your account. Simply type in the desired value, ensuring it meets any applicable minimum or maximum limits.",
    },
    {
      step: 2,
      icon: <FaUniversity className="text-white" />,
      title: "Choose a Payment Method",
      description:
        "In this step, select your preferred payment method to continue with the transaction. We offer a variety of secure and convenient options, including bank transfers.",
    },
    {
      step: 3,
      icon: <MdReceiptLong className="text-white" />,
      title: "Review Your Payment Summary",
      description:
        "Before finalizing your transaction, take a moment to carefully review your payment summary. This section provides a clear breakdown of the amount you’re adding now's.",
    },
    {
      step: 4,
      icon: <BiTransfer className="text-white" />,
      title: "Make a Bank Transfer Free",
      description:
        "Use the provided account details to complete your transfer. You can copy and paste the IBAN, reference code , and bank details to your online banking platform use money.",
    },
  ];

  return (
    <section className="lg:py-16 py-5 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Heading section */}
        <div className="text-center mb-10 space-y-2">
          <p className="text-gray dark:text-gray-300 font-medium">
            How it works?
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
            Just few
            <span className="text-primary"> steps to start</span>
          </h1>
          <p className="lg:text-xl text-sm text-gray-700 dark:text-gray-300">
            It's easier than you think. Follow 3 simple easy steps
          </p>
        </div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methods.map((method, index) => (
              <div key={index}>
                {/* Step number circle */}
                <div className="flex flex-col items-center">
                  {/* Card */}
                  <div className="bg-white dark:bg-white/5 rounded-2xl border lg:p-6 p-4 lg:h-[350px] w-full hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                    <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
                      <div className="p-3 bg-gray lg:text-2xl text-xl dark:bg-white/5 rounded-full">
                        {method.icon}
                      </div>
                      <h3 className="lg:text-xl text-lg font-medium text-gray-900 dark:text-primary">
                        {method.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMoneyMethods;
