import React, { JSX } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCashStack, BsEmojiSmile } from "react-icons/bs";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import { GiWorld } from "react-icons/gi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

// Define an interface for the feature data structure for type safety
interface FeatureItem {
  title: string;
  description: string;
  icons: JSX.Element; // <--- Changed type from string to JSX.Element
}

// Array containing the data for the feature boxes
const featuresData: FeatureItem[] = [
  {
    title: "Global reach",
    description:
      "Send and receive money across 200+ countries and territories in over 170+ currencies. Receiving your money is easy. Connect a bank account or opt for cash pick-up at one of our 500,000 locations worldwide.",
    icons: <FaGlobe />,
  },
  {
    title: "Transparent prices",
    description:
      "With our transparent rates, you’ll always be in the know. You’ll never have to worry about surprises or sneaky deductions with our competitive exchange rates and minimal fees.",
    icons: <BsCashStack />,
  },
  {
    title: "Fast Money transfers",
    description:
      "We understand the value of your hard-earned money. That’s why we prioritize safe and speedy transfers. Send money within seconds and your recipient will receive it within 1-5 days.",
    icons: <RiMoneyDollarCircleLine />,
  },
  {
    title: "Easy to use",
    description:
      "Our app and website are designed with your financial needs in mind. Our currency tools and resources assist you in managing your money. Need extra help? Our customer service team is here to support you.",
    icons: <BsEmojiSmile />,
  },
];

const XeFeaturesSection: React.FC = () => {
  return (
    // Added dummy class names for styling context, replace with your actual ones
    <div className="bg-[#f2f4f7] dark:bg-background mb-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          {/* Removed empty h2, assuming the next one is the main heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl capitalize font-black text-mainheading dark:text-white mt-6">
            Find out why{" "}
            <span className="text-primary">millions choose Apexture</span>{" "}
          </h2>

          <p className="mt-4 text-lg leading-normal text-gray-500 dark:text-gray-300">
            For over 10 years, Apexture Corporation Inc. customers have been
            trusting us to manage and send international money transfers. It's
            what we do.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature) => (
            <div
              key={feature.title}
              // Added some potential styling classes
              className="bg-white dark:bg-white/5 rounded-lg p-4 space-y-3 h-full transition-shadow duration-300 border-t-4 border-primary"
            >
              {/* Ensure text-mainheading works correctly, consider icon size */}
              <div className="bg-primary p-2 rounded-full inline-block">
                <span className="text-mainheading text-2xl flex items-center justify-center size-8">
                  {feature.icons}
                </span>
              </div>
              <h3 className="text-xl font-medium dark:text-primary text-mainheading capitalize">
                {feature.title}
              </h3>
              <p className="text-base text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default XeFeaturesSection;

// "use client";

// import React, { useState } from "react";
// import { BsGlobe2, BsCashCoin } from "react-icons/bs";
// import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import { FiUserCheck } from "react-icons/fi";

// const XeFeaturesSection = () => {
//   const [hoveredFeature, setHoveredFeature] = useState(null);

//   const features = [
//     {
//       id: 1,
//       title: "Global Reach",
//       icon: <BsGlobe2 size={32} />,
//       highlight: "200+ countries, 170+ currencies",
//       description:
//         "Send and receive money across the globe with ease. Connect a bank account or collect cash at over 500,000 locations worldwide.",
//       color: "bg-emerald-500",
//     },
//     {
//       id: 2,
//       title: "Transparent Prices",
//       icon: <BsCashCoin size={32} />,
//       highlight: "No hidden fees, competitive rates",
//       description:
//         "Always know exactly what you're paying. Our transparent rates come with no surprises or sneaky deductions.",
//       color: "bg-blue-500",
//     },
//     {
//       id: 3,
//       title: "Fast Money Transfers",
//       icon: <RiMoneyDollarCircleLine size={32} />,
//       highlight: "Receive funds in 1-5 days",
//       description:
//         "We prioritize safe and speedy transfers for your hard-earned money, with recipients receiving funds in just 1-5 days.",
//       color: "bg-purple-500",
//     },
//     {
//       id: 4,
//       title: "Easy To Use",
//       icon: <FiUserCheck size={32} />,
//       highlight: "Designed for your convenience",
//       description:
//         "Our intuitive platform comes with currency tools and resources to simplify managing your finances, backed by our supportive team.",
//       color: "bg-amber-500",
//     },
//   ];

//   return (
//     <div className="bg-gray-900 text-white py-16">
//       {/* Header */}
//       <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
//         <h2 className="text-5xl font-bold mb-4">
//           Find Out Why <span className="text-lime-400">Millions</span>
//           <br />
//           <span className="text-lime-400">Choose Apexture</span>
//         </h2>
//         <p className="text-gray-300 max-w-2xl mx-auto text-lg">
//           For over 30 years, Xe Corporation Inc. customers have been trusting us
//           to manage and send international money transfers. It's what we do.
//         </p>
//       </div>

//       {/* Features Grid */}
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature) => (
//             <div
//               key={feature.id}
//               className="relative overflow-hidden rounded-xl bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
//               onMouseEnter={() => setHoveredFeature(feature.id)}
//               onMouseLeave={() => setHoveredFeature(null)}
//             >
//               {/* Background accent element */}
//               <div
//                 className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 transition-all duration-500 ${
//                   feature.color
//                 }
//                 ${hoveredFeature === feature.id ? "scale-150" : ""}`}
//               />

//               <div className="p-6 h-full flex flex-col relative z-10">
//                 {/* Icon */}
//                 <div
//                   className={`p-3 rounded-lg inline-flex items-center justify-center ${feature.color} mb-4 text-white`}
//                 >
//                   {feature.icon}
//                 </div>

//                 {/* Content */}
//                 <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//                 <p className="text-lime-400 font-medium mb-3">
//                   {feature.highlight}
//                 </p>
//                 <p className="text-gray-300 flex-grow">{feature.description}</p>

//                 {/* Bottom accent line */}
//                 <div
//                   className={`h-1 w-16 mt-4 transition-all duration-300 ${
//                     feature.color
//                   }
//                   ${hoveredFeature === feature.id ? "w-full" : ""}`}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Call to action */}
//       <div className="mt-16 text-center">
//         <button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
//           Get Started Today
//         </button>
//       </div>
//     </div>
//   );
// };

// export default XeFeaturesSection;
