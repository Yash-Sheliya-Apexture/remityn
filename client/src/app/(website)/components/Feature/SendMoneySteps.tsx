// import React from "react";
// import { UserPlus, Wallet, Send, CheckCircle } from "lucide-react";

// const SendMoneySteps = () => {
//   const steps = [
//     {
//       id: 1,
//       icon: <UserPlus className="w-6 h-6 text-primary" />,
//       title: "Create Your Account",
//       description: "Sign up quickly with minimal information.",
//     },
//     {
//       id: 2,
//       icon: <Wallet className="w-6 h-6 text-primary" />,
//       title: "Fund Your Wallet",
//       description: "Add money in your local currency.",
//     },
//     {
//       id: 3,
//       icon: <Send className="w-6 h-6 text-primary" />,
//       title: "Initiate Transfer to India",
//       description: "Enter recipient details and amount in INR.",
//     },
//     {
//       id: 4,
//       icon: <CheckCircle className="w-6 h-6 text-primary" />,
//       title: "Money Received",
//       description:
//         "Recipient gets funds directly in their Indian bank account.",
//     },
//   ];

//   return (
//     <div className="SendMoneyStep py-20">
//       {" "}
//       {/* Assuming this class might set a theme, e.g., dark background */}
//       <div className="container mx-auto px-4">
//         <div className="space-y-4 text-center md:text-left">
//           <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Send Money in <span className="text-primary">4 Simple Steps</span>
//           </h3>
//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Our straightforward process makes sending money to India quicker
//             than ever.
//           </p>
//         </div>

//         {/* Steps Container */}
//         <div className="lg:mt-25 mt-16">

//           {steps.map((step, index) => (
//             <div key={step.id} className="relative">

//               {/* Step Content */}
//               <div className="flex items-start gap-8">

//                 <div className="flex justify-center">
//                   <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
//                     <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
//                       {step.icon}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex-1 pt-2">
//                   <h3 className="text-2xl text-mainheadingWhite font-semibold">
//                     {step.title}
//                   </h3>
//                   <p className="text-subheadingWhite lg:text-lg text-base">
//                     {step.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendMoneySteps;

import React from "react";
import { Wallet, Send, UserRoundCheck, Users } from "lucide-react";
import Image from "next/image";

const SendMoneySteps = () => {
  const steps = [
    {
      id: 1,
      icon: <UserRoundCheck className="size-7 text-primary" />,
      title: "Sign Up and Get Verified",
      description:
        "Quickly create your account and complete secure KYC verification in minutes.",
    },
    {
      id: 2,
      icon: <Wallet className="size-7 text-primary" />,
      title: "Create & Fund Your Currency Wallet",
      description:
        "Open your currency wallet and fund it easily to start sending money right away.",
    },
    {
      id: 3,
      icon: <Users className="size-7 text-primary" />,
      title: "Add Your Recipient",
      description:
        "Add recipient details securely and manage multiple beneficiaries effortlessly.",
    },
    {
      id: 4,
      icon: <Send className="size-7 text-primary" />,
      title: "Transfer Money",
      description:
        "Transfer money confidently and track each transaction in real time from wallet to recipient.",
    },
  ];

  return (
    <div className="SendMoneyStep sm:py-16 py-10">
      {" "}
      {/* Assuming this class might set a theme, e.g., dark background */}
      <div className="container mx-auto px-4">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Send Money in <span className="text-primary">4 Simple Steps</span>
          </h3>

          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
            Send money quickly and securely in just four easy steps. From
            setting up your account to your recipient receiving funds in India,
            our streamlined process ensures a smooth and hassle-free experience.
          </p>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col xl:flex-row items-center xl:gap-0 gap-8 lg:mt-16 mt-10">
          <div className="Steps-Container w-full xl:w-2/5">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative ${
                  index < steps.length - 1 ? "pb-12" : ""
                }`}
              >
                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute w-0.5 bg-primary z-[1]"
                    style={{
                      left: "2.5rem",
                      top: "2.5rem",
                      bottom: "-2.5rem",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Step Content Wrapper (Icon + Text Block) */}
                <div className="flex items-start sm:gap-8 gap-6 relative z-[2]">
                  {/* Left Side - Icon Container */}
                  <div className="flex justify-center bg-background shrink-0">
                    <div className="size-20 rounded-full icon-outer-wrapper flex items-center justify-center">
                      <div className="size-14 rounded-full icon-inner-background flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex-1 pt-2 space-y-1">
                    <h3 className="sm:text-2xl text-xl text-mainheadingWhite font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-subheadingWhite lg:text-lg text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full xl:w-3/5">
            <div className="relative w-full flex xl:justify-end justify-center items-center">
              <Image
                src="/assets/images/steps.svg"
                width={2000}
                height={2000}
                alt="Padlock symbolizing security"
                className="lg:w-[70%] w-auto rounded-3xl "
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 550px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneySteps;
