// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt  } from "react-icons/ai";
// import { SlLock  } from "react-icons/sl";
// import { IoIosInformationCircleOutline } from "react-icons/io";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";

// const HeroSection: React.FC = () => {
//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">

//               <div className="flex items-center text-gray gap-2 text-lg">
//                 <PiCurrencyCircleDollar size={22} className="text-green" />
//                 <span className="font-medium text-main">Low fees</span>
//                 <span className="">- fees get cheaper the more you send</span>
//               </div>
//               <div className="flex items-center text-gray gap-2 text-lg">
//                 <AiOutlineThunderbolt size={22} className="text-green " />
//                 <span className="font-medium text-main">Lightning fast</span>
//                 <span className="">
//                   - money typically arrives in seconds{" "}
//                   <IoIosInformationCircleOutline size={18} className="inline-block ml-2" />
//                 </span>
//               </div>
//               <div className="flex items-center text-gray gap-2 text-lg">
//                 <SlLock size={22} className="text-green" />
//                 <span className="font-medium text-main">
//                   Perfectly predictable
//                 </span>
//                 <span className="">
//                   - lock in an exchange rate for up to 48 hours
//                 </span>
//               </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("80,000");
//   const [receiveAmount, setReceiveAmount] = useState("897.85");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("USD");

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSendAmount(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setReceiveAmount(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleSendCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedSendCurrency(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedReceiveCurrency(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   1 USD = 87.1878 INR
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-gray-500 dark:text-gray-300 mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full h-16 p-3 border rounded-lg shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full"
//                     />
//                     {/* Country Dropdown :- Change Country */}
//                     <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={INR}
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>INR</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full h-16 p-3 border border-gray-300 rounded-lg shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full"
//                     />

//                     {/* Country Dropdown :- Change Country */}
//                     <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={USD}
//                           alt="USD-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>USD</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-md flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-lg p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">1,337 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">381.57 INR</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                   <span>1,718.57 INR</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// import CountryDropdown from "../../components/CountryDropdown";

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("80,000");
//   const [receiveAmount, setReceiveAmount] = useState("897.85");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("USD");

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSendAmount(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setReceiveAmount(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleSendCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedSendCurrency(event.target.value);
//     //  Add logic here to update receiveAmount based on the new sendAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   const handleReceiveCurrencyChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedReceiveCurrency(event.target.value);
//     //  Add logic here to update sendAmount based on the new receiveAmount and currency
//     //  For a real application, you'd call an API or use a conversion function
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   1 USD = 87.1878 INR
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}
//                     {/* <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={INR}
//                           alt="INR-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>INR</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div> */}
//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={handleSendCurrencyChange}
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}
//                     {/* <div className="flex items-center gap-2 w-28">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           src={USD}
//                           alt="USD-Flag"
//                           width={24}
//                           height={24}
//                         />
//                         <p>USD</p>
//                       </div>
//                       <IoIosArrowDown size={18} />
//                     </div> */}
//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={handleReceiveCurrencyChange}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">1,337 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">381.57 INR</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                   <span>1,718.57 INR</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

















// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// import CountryDropdown from "../../components/CountryDropdown";

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("80,000");
//   const [receiveAmount, setReceiveAmount] = useState("897.85");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("USD");

//   // Placeholder exchange rates (replace with API call in a real application)
//   const exchangeRates: { [key: string]: { [key: string]: number } } = {
//     INR: {
//       USD: 0.012, // 1 INR = 0.012 USD
//       EUR: 0.011, // 1 INR = 0.011 EUR
//       GBP: 0.0095, // 1 INR = 0.0095 GBP
//       INR: 1, // 1 INR = 1 INR
//     },
//     USD: {
//       INR: 83.33, // 1 USD = 83.33 INR
//       EUR: 0.92, // 1 USD = 0.92 EUR
//       GBP: 0.79, // 1 USD = 0.79 GBP
//       USD: 1, // 1 USD = 1 USD
//     },
//     EUR: {
//       INR: 90.91, // 1 EUR = 90.90 INR
//       USD: 1.09, // 1 EUR = 1.09 USD
//       GBP: 0.86, // 1 EUR = 0.86 GBP
//       EUR: 1,
//     },
//     GBP: {
//       INR: 105.26, // 1 GBP = 105.26 INR
//       USD: 1.27, // 1 GBP = 1.27 USD
//       EUR: 1.17, //1 GBP = 1.17 EUR
//       GBP: 1, // 1 GBP = 1 GBP
//     },
//   };

//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "0.00"; // Or some other default/error handling
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);

//     const rate =
//       exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;
//     setReceiveAmount(convertAndFormat(newSendAmount, rate));
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     // Calculate the inverse rate for conversion
//     const rate =
//       exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//     setSendAmount(convertAndFormat(newReceiveAmount, rate));
//   };

//   // Generic currency change handler (used for both send and receive)
//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     // Use the selected currencies for rate lookup.  Default to 1 if not found.
//     const rate = isSendCurrency
//       ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//       : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;

//     if (isSendCurrency) {
//       setReceiveAmount(
//         convertAndFormat(
//           sendAmount,
//           exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         )
//       );
//     } else {
//       setSendAmount(
//         convertAndFormat(
//           receiveAmount,
//           exchangeRates[newCurrency]?.[selectedSendCurrency] || 1
//         )
//       );
//     }
//   };

//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   1 USD = 87.1878 INR
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">1,337 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">381.57 INR</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                   <span>1,718.57 INR</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;





// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState, useEffect } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg";
// import INR from "../../../../public/assets/icons/inr.svg";

// import CountryDropdown from "../../components/CountryDropdown";

// interface ExchangeRates {
//   [key: string]: number;
// }
// interface ApiResponse {
//     success: boolean;
//     timestamp: number;
//     base: string;
//     date: string;
//     rates: ExchangeRates
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState(""); // Default to empty
//   const [receiveAmount, setReceiveAmount] = useState(""); // Default to empty
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
//     useState("USD");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0); // For displayed locked-in rate
//     const [sendFee, setSendFee] = useState(0)
//     const [gst, setGst] = useState(0)


//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1&symbols=USD,INR,EUR,GBP"
//         );
//         const data:ApiResponse = await response.json();

//         if (data.success) {
//           // Transform to have all rates relative to each currency
//           const transformedRates: { [key: string]: { [key: string]: number } } = {};
//           const baseRate = data.rates; // Rates relative to EUR

//             //Add base rate to Transformed Rate
//            Object.keys(baseRate).forEach(baseCurrency => {
//             transformedRates[baseCurrency] = {};
//             Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//               });
//                transformedRates[baseCurrency][baseCurrency] = 1; //1:1 conversion
//             });

//             //Added EUR to object
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//             //console.log("Transformed Rates ", transformedRates);
//           setExchangeRates(transformedRates);


//             const initialRate =
//                 transformedRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;
//             setRate(initialRate)
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//           // Handle the error appropriately, perhaps set a default rate or show an error message
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//         // Handle network errors
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []); // Run only once on component mount


//     // Calculate fees (Simplified)
//     useEffect(() => {
//       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//       const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//       const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data


//         setSendFee(calculatedSendFee);
//         setGst(calculatedGST);
//     }, [sendAmount]);



//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return ""; // Return empty string for invalid input
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//     if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;

//       setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//     }
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     if (!loadingRates) {
//          const currentRate = exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//          setSendAmount(convertAndFormat(newReceiveAmount, 1/currentRate));
//     }
//   };

//   // Generic currency change handler (used for both send and receive)
//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     if (!loadingRates) {
//       // Use the selected currencies for rate lookup.  Default to 1 if not found.
//       const newRate = isSendCurrency
//         ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;

//          setRate(newRate);

//       if (isSendCurrency) {
//         setReceiveAmount(
//           convertAndFormat(sendAmount, newRate)
//         );
//       } else {
//           // Using newRate directly because we already looked it up
//         setSendAmount(
//           convertAndFormat(receiveAmount, 1/newRate)
//         );
//       }
//     }
//   };



//   // Helper Function to Display Rate
//   const displayRate = () => {
//       if (loadingRates) {
//           return "Loading...";
//       }

//       return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} ${selectedReceiveCurrency}`
//   }



//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore} // Replace with your App Store logo path
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store 1.5L reviews
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore} // Replace with your Google Play logo path
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play 11L reviews
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-3xl shadow-lg p-8 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 bg-cyan-100/30 rounded-md p-2">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main font-medium">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 INR</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main font-medium">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-medium">
//                   <span>Total included fees (2.15%)</span>
//                     <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;










// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { PiCurrencyCircleDollar } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosInformationCircleOutline,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState, useEffect } from "react";

// import appstore from "../../../../public/assets/images/app-store-logo.png";
// import playstore from "../../../../public/assets/images/play-store-logo.png";
// import USD from "../../../../public/assets/icons/usd.svg"; // You might not need these if you use the dropdown for all currencies
// import INR from "../../../../public/assets/icons/inr.svg"; // You might not need these if you use the dropdown for all currencies

// import CountryDropdown from "../../components/CountryDropdown";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number }; // Corrected: Nested object for rates
// }
// interface ApiResponse {
//   success: boolean;
//   timestamp: number;
//   base: string;
//   date: string;
//   rates: { [key: string]: number }; // Rates are relative to the base
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
//     useState("USD");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({}); // Initialize as empty object
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1" // Removed symbols, fetch all
//         );
//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           // Transform to have all rates relative to each currency
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates; // Rates relative to EUR (from the API)

//           // Build the transformed rates, including the base currency (EUR) itself.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // Add the 1:1 conversion
//           }
//             // Add EUR explicitly (it is already relative to itself)
//             transformedRates["EUR"] = {};
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//           setExchangeRates(transformedRates);

//           const initialRate =
//             transformedRates[selectedSendCurrency]?.[
//               selectedReceiveCurrency
//             ] || 1;
//           setRate(initialRate);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//           // Handle the error appropriately, perhaps set a default rate or show an error message.
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//         // Handle network errors.
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []); // Run only once on component mount.


//   // Calculate fees (Simplified)
//     useEffect(() => {
//       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//       const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//       const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data


//         setSendFee(calculatedSendFee);
//         setGst(calculatedGST);
//     }, [sendAmount]);



//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return ""; // Return empty string for invalid input
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//     if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;

//       setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//     }
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     if (!loadingRates) {
//          const currentRate = exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//          setSendAmount(convertAndFormat(newReceiveAmount, 1/currentRate));
//     }
//   };

//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     if (!loadingRates) {
//       const newRate = isSendCurrency
//         ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;
//       setRate(newRate);

//       if (isSendCurrency) {
//           // New send currency, update receive amount
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       } else {
//           // New receive currency, update send amount
//         setSendAmount(convertAndFormat(receiveAmount, 1/newRate));
//       }
//     }
//   };

//     // Helper Function to Display Rate
//   const displayRate = () => {
//       if (loadingRates) {
//           return "Loading...";
//       }

//       return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} ${selectedReceiveCurrency}`
//   }


//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5">
//             <div className="flex md:flex-row flex-col md:items-center gap-4">
//               <Link
//                 href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={appstore}
//                     alt="Download on the App Store"
//                     width={24}
//                     height={24}
//                     className=" rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on App Store <span className="text-gray">1.5L reviews</span>
//                 </span>
//               </Link>
//               <Link
//                 href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center"
//               >
//                 <div>
//                   <Image
//                     src={playstore}
//                     alt="Get it on Google Play"
//                     width={24}
//                     height={24}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-green ml-2">
//                   4.8 ★ on Google Play <span className="text-gray">11L reviews</span>
//                 </span>
//               </Link>
//             </div>

//             <div>
//               <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-main uppercase ">
//                 Send Money Globally For Less
//               </h1>
//             </div>

//             <div className="">
//               <p className="text-lg font-semibold text-gray leading-relaxed tracking-wider text-wrap ">
//                 Join over 12.8 million people sending money everywhere —{" "}
//                 <button className="text-green underline cursor-pointer">
//                   with fees as low as 0.1%.
//                 </button>
//               </p>
//               <div className="flex flex-col gap-4 mt-6">
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <PiCurrencyCircleDollar size={22} className="text-green" />
//                   <span className="font-medium text-main">Low fees</span>
//                   <span className="">- fees get cheaper the more you send</span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <AiOutlineThunderbolt size={22} className="text-green " />
//                   <span className="font-medium text-main">Lightning fast</span>
//                   <span className="">
//                     - money typically arrives in seconds{" "}
//                     <IoIosInformationCircleOutline
//                       size={18}
//                       className="inline-block ml-2"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray gap-2 text-lg">
//                   <SlLock size={22} className="text-green" />
//                   <span className="font-medium text-main">
//                     Perfectly predictable
//                   </span>
//                   <span className="">
//                     - lock in an exchange rate for up to 48 hours
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out"
//               >
//                 Open an account in minutes
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 bo relative">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                    {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div className="relative">
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="relative">
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                    <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (2.15%)</span>
//                    <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-hover:bg-button hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;














// "use client";
// import { SlLock } from "react-icons/sl";
// import {
//   IoIosArrowForward,
// } from "react-icons/io";
// import { CiBank } from "react-icons/ci";

// import { useState, useEffect } from "react";

// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number }; // Corrected: Nested object for rates
// }
// interface ApiResponse {
//   success: boolean;
//   timestamp: number;
//   base: string;
//   date: string;
//   rates: { [key: string]: number }; // Rates are relative to the base
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("INR");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
//     useState("USD");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({}); // Initialize as empty object
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);

//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1" // Removed symbols, fetch all
//         );
//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           // Transform to have all rates relative to each currency
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates; // Rates relative to EUR (from the API)

//           // Build the transformed rates, including the base currency (EUR) itself.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // Add the 1:1 conversion
//           }
//             // Add EUR explicitly (it is already relative to itself)
//             transformedRates["EUR"] = {};
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//           setExchangeRates(transformedRates);

//           const initialRate =
//             transformedRates[selectedSendCurrency]?.[
//               selectedReceiveCurrency
//             ] || 1;
//           setRate(initialRate);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//           // Handle the error appropriately, perhaps set a default rate or show an error message.
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//         // Handle network errors.
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []); // Run only once on component mount.


//   // Calculate fees (Simplified)
//     useEffect(() => {
//       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//       const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//       const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data


//         setSendFee(calculatedSendFee);
//         setGst(calculatedGST);
//     }, [sendAmount]);



//   // Utility function to convert and format numbers
//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return ""; // Return empty string for invalid input
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//     if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.[selectedReceiveCurrency] || 1;

//       setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//     }
//   };

//   const handleReceiveAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newReceiveAmount = event.target.value;
//     setReceiveAmount(newReceiveAmount);

//     if (!loadingRates) {
//          const currentRate = exchangeRates[selectedReceiveCurrency]?.[selectedSendCurrency] || 1;
//          setSendAmount(convertAndFormat(newReceiveAmount, 1/currentRate));
//     }
//   };

//   const handleCurrencyChange = (
//     isSendCurrency: boolean,
//     newCurrency: string
//   ) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);
//     } else {
//       setSelectedReceiveCurrency(newCurrency);
//     }

//     if (!loadingRates) {
//       const newRate = isSendCurrency
//         ? exchangeRates[newCurrency]?.[selectedReceiveCurrency] || 1
//         : exchangeRates[selectedSendCurrency]?.[newCurrency] || 1;
//       setRate(newRate);

//       if (isSendCurrency) {
//           // New send currency, update receive amount
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       } else {
//           // New receive currency, update send amount
//         setSendAmount(convertAndFormat(receiveAmount, 1/newRate));
//       }
//     }
//   };

//     // Helper Function to Display Rate
//   const displayRate = () => {
//       if (loadingRates) {
//           return "Loading...";
//       }

//       return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} ${selectedReceiveCurrency}`
//   }


//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                    {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div>
//                   <div className=" w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus:outline-none focus:ring-green focus:border-main">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={receiveAmount}
//                       onChange={handleReceiveAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />

//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedReceiveCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(false, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                    <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (2.15%)</span>
//                    <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save up to 5,441.86 INR</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">by Wednesday</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

















// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image"; // Import Image from next/image
// import inr from "../../../../../public/assets/icons/inr.svg"; // Import INR SVG

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   success: boolean;
//   timestamp: number;
//   base: string;
//   date: string;
//   rates: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("USD"); // Default to USD
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);


//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.exchangeratesapi.io/v1/latest?access_key=048c243975abcd8ac5214d8f8107922b&format=1"
//         );
//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1;
//           }
//            transformedRates["EUR"] = {};
//            Object.keys(baseRate).forEach(targetCurrency => {
//               transformedRates["EUR"][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate["EUR"];
//               });
//                transformedRates["EUR"]["EUR"] = 1; //1:1 conversion

//           setExchangeRates(transformedRates);

//           const initialRate =
//             transformedRates[selectedSendCurrency]?.["INR"] || 1; // INR is fixed for receive
//           setRate(initialRate);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []);

//   // useEffect(() => {
//   //     const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//   //     const feePercentage = 0.0215; // 2.15% as stated in the requirements
//   //     const calculatedSendFee = numericSendAmount * (1337/80000); // Example calculation based on sample data
//   //     const calculatedGST = numericSendAmount * (381.57/80000) // Example calculation based on sample data


//   //       setSendFee(calculatedSendFee);
//   //       setGst(calculatedGST);
//   // }, [sendAmount]);

//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;
//     setSendAmount(newSendAmount);
//       if (!loadingRates) {
//         const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//         setReceiveAmount(convertAndFormat(newSendAmount, currentRate));
//       }
//   };


//  const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };


//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//      const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//         setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };


//     return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                    {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//                 <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                    <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                    <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold">&nbsp;2.2%&nbsp;</span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;







// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icons/inr.svg";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   date: string;
//   base: string;
//   rates: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("USD");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);


//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await fetch(
//           "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=87da35d4dd2e48fd8c736c5fc4cfc359"
//         );
//         const data: ApiResponse = await response.json();

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []);



//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);


//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   //  useEffect(() => {
//   //       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//   //       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//   //       const calculatedSendFee = numericSendAmount * (1337 / 80000); // Example calculation based on sample data
//   //       const calculatedGST = numericSendAmount * (381.57 / 80000) // Example calculation based on sample data


//   //         setSendFee(calculatedSendFee);
//   //         setGst(calculatedGST);
//   //   }, [sendAmount]);


//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };


//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
















// Last Complete Code
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icons/inr.svg";

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   date: string;
//   base: string;
//   rates: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState("USD");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);


//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         // Access the API key from the environment variable
//         const apiKey = process.env.NEXT_PUBLIC_CURRENCY_FREAKS_API_KEY;

//         if (!apiKey) {
//           console.error("API key is not defined in environment variables.");
//           // Handle the missing API key appropriately, e.g., display an error message.
//           setLoadingRates(false); // Stop loading even if there's an error.
//           return;  // Exit the function
//         }


//         const response = await fetch(
//           `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`
//         );
//         const data: ApiResponse = await response.json();

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;

//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, []);



//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);


//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };

//   //  useEffect(() => {
//   //       const numericSendAmount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
//   //       const feePercentage = 0.0215; // 2.15% as stated in the requirements
//   //       const calculatedSendFee = numericSendAmount * (1337 / 80000); // Example calculation based on sample data
//   //       const calculatedGST = numericSendAmount * (381.57 / 80000) // Example calculation based on sample data


//   //         setSendFee(calculatedSendFee);
//   //         setGst(calculatedGST);
//   //   }, [sendAmount]);


//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };


//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;












// // New Latest Code
// // app/components/Home/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; //correct path
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../layout"; // Import the context hook.
// import exchangeRateService from '../../../services/exchangeRate'; // Import the service

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// interface ApiResponse {
//   rates: {
//     date: string;
//     base: string;
//     rates: { [key: string]: number };
//   }
// }

// const HeroSection: React.FC = () => {
//     const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext(); //get context
//     const [sendAmount, setSendAmount] = useState("");

//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("INR"); // Fixed to INR
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee, setSendFee] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);


//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await exchangeRateService.getExchangeRatesForCurrencies();
//         const data = response.rates; // Access the rates from the service response

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;


//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates: No rates data in response", data); // More specific error log
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", JSON.stringify(error, null, 2)); // Log full error object
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, [selectedSendCurrency]);  // Add selectedSendCurrency as a dependency



//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);


//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);  //Use the setter from context

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };



//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };


//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown  //CountryDropdown is not defined in this file its in down of this page
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; //correct path
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../layout"; // Import the context hook.
// import exchangeRateService from '../../../services/exchangeRate'; // Import the service

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// // Removed unused ApiResponse interface

// const HeroSection: React.FC = () => {
//     const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext(); //get context
//     const [sendAmount, setSendAmount] = useState("");

//   const [receiveAmount, setReceiveAmount] = useState("");
//   // Removed unused selectedReceiveCurrency state and its setter
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee] = useState(0); // Removed unused setSendFee
//   const [gst] = useState(0); // Removed unused setGst
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);


//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await exchangeRateService.getExchangeRatesForCurrencies();
//         const data = response.rates; // Access the rates from the service response

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;


//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates: No rates data in response", data); // More specific error log
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", JSON.stringify(error, null, 2)); // Log full error object
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, [selectedSendCurrency]);  // Add selectedSendCurrency as a dependency



//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);


//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);  //Use the setter from context

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };



//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };


//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   {/* Fixed unescaped entity */}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown"; //correct path
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../../contexts/WebsiteAppContext"; // Import the context hook.
// import exchangeRateService from '../../../services/exchangeRate'; // Import the service

// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// // Removed unused ApiResponse interface

// const HeroSection: React.FC = () => {
//     const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext(); //get context
//     const [sendAmount, setSendAmount] = useState("");

//   const [receiveAmount, setReceiveAmount] = useState("");
//   // Removed unused selectedReceiveCurrency state and its setter
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0);
//   const [sendFee] = useState(0); // Removed unused setSendFee
//   const [gst] = useState(0); // Removed unused setGst
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);


//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         const response = await exchangeRateService.getExchangeRatesForCurrencies();
//         const data = response.rates; // Access the rates from the service response

//         if (data && data.rates) {
//           const transformedRates: ExchangeRates = {};
//           const baseRate = data.rates;


//           // Build the exchange rates object in the desired format.
//           for (const baseCurrency of Object.keys(baseRate)) {
//             transformedRates[baseCurrency] = {};
//             for (const targetCurrency of Object.keys(baseRate)) {
//               transformedRates[baseCurrency][targetCurrency] =
//                 baseRate[targetCurrency] / baseRate[baseCurrency];
//             }
//             transformedRates[baseCurrency][baseCurrency] = 1; // 1:1 for same currency
//           }

//             //Corrected USD to INR Initialization
//           const initialRate = transformedRates[selectedSendCurrency]?.["INR"] || 87.2; // Default to a reasonable value if INR is missing.  Use the correct data structure.
//           setRate(initialRate);
//           setExchangeRates(transformedRates);
//         } else {
//           console.error("Failed to fetch exchange rates: No rates data in response", data); // More specific error log
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", JSON.stringify(error, null, 2)); // Log full error object
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//   }, [selectedSendCurrency]);  // Add selectedSendCurrency as a dependency



//   const convertAndFormat = (amount: string, rate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount)) {
//       return "";
//     }
//     const convertedAmount = numericAmount * rate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;

//     // Remove non-numeric characters except for the decimal point
//         const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
//         setSendAmount(sanitizedAmount);


//     if (!loadingRates) {
//        const currentRate = exchangeRates[selectedSendCurrency]?.["INR"] || 1; // Always convert to INR
//       setReceiveAmount(convertAndFormat(sanitizedAmount, currentRate));
//     }
//   };

//   const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency) {
//       setSelectedSendCurrency(newCurrency);  //Use the setter from context

//       if (!loadingRates) {
//         // Only update send currency and recalculate
//         const newRate = exchangeRates[newCurrency]?.["INR"] || 1;  // Always INR
//         setRate(newRate);
//         setReceiveAmount(convertAndFormat(sendAmount, newRate));
//       }
//     }
//     // No else needed, receive currency is fixed
//   };



//   useEffect(() => {
//     // Example: Arrives in 1-3 business days
//     const today = new Date();
//     const arrival = new Date(today);
//     arrival.setDate(today.getDate() + 2); // +2 for "Wednesday" example

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`; // Always show INR
//   };


//   return (
//     <section className="Hero-Section py-12 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto">
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-1 text-green font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} className="" />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1">
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                     <input
//                       type="text"
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                     />
//                     {/* Country Part :- For Change Country */}

//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?{" "}
//                   {/* Fixed unescaped entity */}
//                   <button className="underline cursor-pointer font-medium">
//                     We'll discount our fee {/* Changed ' to ' */}
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between">
//                   <input
//                     type="text"
//                     placeholder="0"
//                     value={receiveAmount}
//                     readOnly // Make the input read-only
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none"
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 w-24 pr-2">
//                     <Image src={inr} alt="INR-Flag" width={24} height={24} />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-main mb-1">
//                   Paying with
//                 </label>
//                 <div className="hover:bg-green/10 p-3 h-16 border border-green hover:border-green rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-main font-semibold">Bank transfer</span>
//                   </div>
//                   <button className="text-green font-medium bg-green/10 px-3 py-2 rounded-full text-sm inline-flex items-center gap-2">
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between text-">
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray">0 {selectedSendCurrency}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 text-gray-300" />
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//               <div className="mt-2 text-sm text-gray">
//                 <p>You could save<span className="text-main font-bold"> 2.2% </span>on the payment you make.</p>
//                 <p>
//                   Should arrive{" "}
//                   <span className="text-main font-medium">{arrivalDate}</span>
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-2">
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border hover:bg-lightgreen hover:border-transparent font-medium rounded-full text-green bg-white hover:bg-button transition-colors duration-150 ease-in-out">
//                   Compare fees
//                 </button>
//                 <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-green bg-lightgreen hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import { SlLock } from "react-icons/sl";
// import { IoIosArrowForward } from "react-icons/io";
// import { CiBank } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import CountryDropdown from "../../../components/ui/CountryDropdown";
// import HeroText from "./HeroText";
// import Image from "next/image";
// import inr from "../../../../../public/assets/icon/inr.svg";
// import { useAppContext } from "../../../contexts/WebsiteAppContext";
// import exchangeRateService from '../../../services/exchangeRate'; // Corrected path assuming it's in src/app/services

// // Define an interface for the expected structure of the rates object
// interface RatesMap {
//   [key: string]: number;
// }

// // Define an interface for the expected service response structure
// interface ExchangeRateResponse {
//   // Adjust this based on the actual structure returned by your service
//   // Common examples include: base, date, success, timestamp etc.
//   // The crucial part is the 'rates' property.
//   rates: RatesMap;
//   // Add other properties if they exist, e.g., base?: string;
// }


// interface ExchangeRates {
//   [key: string]: { [key: string]: number };
// }

// const HeroSection: React.FC = () => {
//   const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
//   const [sendAmount, setSendAmount] = useState("");
//   const [receiveAmount, setReceiveAmount] = useState("");
//   const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
//   const [loadingRates, setLoadingRates] = useState(true);
//   const [rate, setRate] = useState(0); // Rate: 1 SendCurrency = X INR
//   const [sendFee] = useState(0);
//   const [gst] = useState(0);
//   const [arrivalDate, setArrivalDate] = useState<string | null>(null);


//   useEffect(() => {
//     const fetchExchangeRates = async () => {
//       setLoadingRates(true);
//       try {
//         // Assume the service returns an object like { rates: { USD: 1, INR: 83.5, ... } }
//         // Adding a type assertion here helps TypeScript, but ideally, the service function
//         // should have a specific return type (Promise<ExchangeRateResponse>).
//         const response = await exchangeRateService.getExchangeRatesForCurrencies() as ExchangeRateResponse; // Type assertion

//         // Access the rates map directly
//         const fetchedRates = response?.rates; // Use optional chaining for safety

//         if (fetchedRates && typeof fetchedRates === 'object' && Object.keys(fetchedRates).length > 0) {
//           const transformedRates: ExchangeRates = {};
//           const baseCurrencyRates = fetchedRates; // This is the map like { "USD": 1, "EUR": 0.9, "INR": 83 }

//           // Build the cross-rates object
//           // This assumes the fetchedRates are relative to a single base (e.g., USD or EUR)
//           // Let's find the base currency if not explicitly provided (often it's USD or EUR in free APIs)
//           // For simplicity, let's assume the API gives rates relative to USD or you know the base.
//           // If the API provides rates relative to EUR, adjust calculations accordingly.

//           // Example: Assuming fetchedRates are relative to a base (like USD)
//           // We want to calculate rate from ANY currency to ANY OTHER currency
//           const allCurrencies = Object.keys(baseCurrencyRates);

//           for (const fromCurrency of allCurrencies) {
//             transformedRates[fromCurrency] = {};
//             for (const toCurrency of allCurrencies) {
//                 // Rate formula: (Rate of ToCurrency / Rate of FromCurrency)
//                 // Example: USD to INR = (INR rate / USD rate)
//                 // Example: GBP to INR = (INR rate / GBP rate)
//                 transformedRates[fromCurrency][toCurrency] =
//                     (baseCurrencyRates[toCurrency] || 0) / (baseCurrencyRates[fromCurrency] || 1); // Avoid division by zero
//             }
//             transformedRates[fromCurrency][fromCurrency] = 1; // 1:1 for same currency
//           }

//           setExchangeRates(transformedRates);

//           // Set the initial rate based on the *selected* send currency to INR
//           const initialRateToINR = transformedRates[selectedSendCurrency]?.["INR"];

//           if (initialRateToINR) {
//              setRate(initialRateToINR);
//              // Recalculate receive amount if send amount already exists
//               if (sendAmount) {
//                  setReceiveAmount(convertAndFormat(sendAmount, initialRateToINR));
//               }
//           } else {
//              console.warn(`Rate from ${selectedSendCurrency} to INR not found. Defaulting.`);
//              // Provide a fallback or handle the error appropriately
//              setRate(87.2); // Fallback default
//              if (sendAmount) {
//                  setReceiveAmount(convertAndFormat(sendAmount, 87.2));
//              }
//           }

//         } else {
//           console.error("Failed to fetch exchange rates: 'rates' property missing or invalid in response", response);
//           // Handle error state, maybe set a default rate
//            setRate(87.2); // Fallback default on error
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error); // Log the actual error
//         // Handle error state
//          setRate(87.2); // Fallback default on error
//       } finally {
//         setLoadingRates(false);
//       }
//     };

//     fetchExchangeRates();
//     // Re-fetch when selectedSendCurrency changes
//   }, [selectedSendCurrency]); // Dependency array is correct


//   const convertAndFormat = (amount: string, conversionRate: number) => {
//     const numericAmount = parseFloat(amount.replace(/,/g, ""));
//     if (isNaN(numericAmount) || !conversionRate) { // Also check if rate is valid
//       return "0.00"; // Return formatted zero or empty string
//     }
//     const convertedAmount = numericAmount * conversionRate;
//     return convertedAmount.toFixed(2);
//   };

//   const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSendAmount = event.target.value;
//     const sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, ''); // Allow only numbers and one dot
//     // Prevent multiple dots
//     if (sanitizedAmount.split('.').length > 2) {
//         return;
//     }
//     setSendAmount(sanitizedAmount);

//     if (!loadingRates && exchangeRates[selectedSendCurrency]) {
//        const currentRateToINR = exchangeRates[selectedSendCurrency]?.["INR"] || 0; // Get rate to INR
//        setRate(currentRateToINR); // Update the displayed rate
//        setReceiveAmount(convertAndFormat(sanitizedAmount, currentRateToINR));
//     } else if (!loadingRates) {
//         // Handle case where rates are loaded but the specific currency pair isn't available
//         console.warn(`Rate for ${selectedSendCurrency} to INR not available.`);
//         setReceiveAmount("0.00");
//         setRate(0); // Reset rate display
//     }
//   };

//  const handleCurrencyChange = (isSendCurrency: boolean, newCurrency: string) => {
//     if (isSendCurrency && newCurrency !== selectedSendCurrency) { // Prevent unnecessary updates
//       setSelectedSendCurrency(newCurrency); // Update context

//       // Recalculation will happen automatically via the useEffect hook
//       // triggered by the change in selectedSendCurrency.
//       // We can also update the rate display immediately if rates are available:
//       if (!loadingRates && exchangeRates[newCurrency]) {
//           const newRateToINR = exchangeRates[newCurrency]?.["INR"] || 0;
//           setRate(newRateToINR);
//           setReceiveAmount(convertAndFormat(sendAmount, newRateToINR)); // Recalculate with new rate
//       } else if (!loadingRates) {
//            console.warn(`Rates not loaded or rate for ${newCurrency} to INR not available.`);
//            setRate(0); // Reset rate display
//            setReceiveAmount("0.00"); // Reset receive amount
//       }
//     }
//     // Receive currency is fixed to INR, so no 'else' block needed.
//   };


//   useEffect(() => {
//     const today = new Date();
//     const arrival = new Date(today);
//     // Basic estimate: add 2 business days (skipping weekends)
//     let daysToAdd = 2;
//     let currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
//     while (daysToAdd > 0) {
//         arrival.setDate(arrival.getDate() + 1);
//         currentDay = arrival.getDay();
//         if (currentDay !== 0 && currentDay !== 6) { // If not Sunday or Saturday
//             daysToAdd--;
//         }
//     }

//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     setArrivalDate(arrival.toLocaleDateString(undefined, options));
//   }, []); // Run only once on mount

//   const displayRate = () => {
//     if (loadingRates) {
//       return "Loading...";
//     }
//     if (rate > 0) {
//         // Show rate from selected Send Currency to INR
//         return `1 ${selectedSendCurrency} = ${rate.toFixed(4)} INR`;
//     }
//     return "Rate unavailable"; // Handle case where rate couldn't be determined
//   };


//   return (
//     <section className="Hero-Section py-12 bg-white dark:bg-background">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* Left Column: Text Content */}
//           <div className="lg:w-1/2 space-y-5 p-4">
//             <HeroText />
//           </div>

//           {/* Right Column: card */}
//           <div className="lg:w-xl lg:ml-auto"> {/* Consider max-w-xl instead of w-xl */}
//             <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
//               {/* Rate Guaranteed */}
//               <div className="flex flex-col justify-center items-center gap-2 text-primary font-medium text-center mb-4 ">
//                 <div className="flex justify-center items-center gap-2">
//                   <SlLock size={22} />
//                   <span>Rate guaranteed (24h)</span>
//                 </div>
//                 <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1 text-sm"> {/* Adjusted text size */}
//                   {displayRate()}
//                 </span>
//               </div>

//               {/* You Send */}
//               <div className="mb-3">
//                 <label htmlFor="sendAmountInput" className="block font-medium text-main mb-1">
//                   You send exactly
//                 </label>
//                 <div>
//                   <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus-within:border-green focus-within:ring-1 focus-within:ring-green"> {/* Added focus styles */}
//                     <input
//                       id="sendAmountInput"
//                       type="text" // Use text to allow formatting, validation handles numbers
//                       inputMode="decimal" // Hint for mobile keyboards
//                       placeholder="0"
//                       value={sendAmount}
//                       onChange={handleSendAmountChange}
//                       className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl" // Ensure input bg is transparent
//                     />
//                     <CountryDropdown
//                       selectedCurrency={selectedSendCurrency}
//                       onCurrencyChange={(newCurrency) =>
//                         handleCurrencyChange(true, newCurrency)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
//                   Sending over 20,000 GBP or equivalent?
//                   <button type="button" className="underline cursor-pointer font-medium">
//                     We&apos;ll discount our fee
//                   </button>
//                 </p>
//               </div>

//               {/* Recipient Gets */}
//               <div className="mb-3">
//                 <label htmlFor="receiveAmountInput" className="block font-medium text-main mb-1">
//                   Recipient gets
//                 </label>
//                 <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between bg-gray-50"> {/* Added subtle bg for readonly */}
//                   <input
//                     id="receiveAmountInput"
//                     type="text" // Display only, so text is fine
//                     placeholder="0.00" // Show decimal format
//                     value={receiveAmount || "0.00"} // Display 0.00 if empty
//                     readOnly
//                     className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl" // Ensure input bg is transparent
//                   />
//                   {/* Fixed INR Display */}
//                   <div className="flex items-center gap-2 min-w-[7rem] justify-center pr-3 pl-1"> {/* Adjusted padding/width */}
//                     <Image src={inr} alt="INR Flag" width={24} height={24} className="flex-shrink-0" />
//                     <p className="text-main font-semibold">INR</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Paying With */}
//               <div className="mb-4">
//                 <label className="block font-medium text-gray-500 dark:text-gray-300 mb-1">
//                   Paying with
//                 </label>
//                 <div className="bg-lightgray dark:bg-background p-3 h-16 border rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
//                   <div className="flex items-center gap-2">
//                     <CiBank size={24} />
//                     <span className="text-mainheading dark:text-white font-semibold">Bank transfer</span>
//                   </div>
//                   <button type="button" className="text-green font-medium bg-green/10 hover:bg-green/20 px-3 py-2 rounded-full text-sm inline-flex items-center gap-1 transition-colors"> {/* Adjusted gap */}
//                     Change
//                     <IoIosArrowForward size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Fee Details */}
//               <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
//                 <div className="flex justify-between"> {/* Removed text- alignment */}
//                   <span className="text-main ">
//                     Bank transfer fee
//                   </span>
//                   <span className="text-gray-600">0 {selectedSendCurrency}</span> {/* Adjusted color */}
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">Our fee</span>
//                   <span className="text-gray-600">{sendFee.toFixed(2)} {selectedSendCurrency} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-main ">GST</span>
//                   <span className="text-gray-600">{gst.toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//                 <hr className="my-2 border-gray-200" /> {/* Adjusted color */}
//                 <div className="flex justify-between text-main font-semibold">
//                   <span>Total included fees (0%)</span>
//                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
//                 </div>
//               </div>

//               {/* Savings & Arrival */}
//                <div className="mt-3 text-sm text-gray-600 space-y-1"> {/* Adjusted margin/color/spacing */}
//                 <p>You could save<span className="text-main font-bold mx-1">2.2%</span>on the payment you make.</p> {/* Use mx-1 for spacing */}
//                 <p>
//                   Should arrive by
//                   <span className="text-main font-medium">{arrivalDate || '...'}</span> {/* Fallback for arrival date */}
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex sm:flex-row flex-col items-center gap-3"> {/* Adjusted gap */}
//                 <button type="button" className="w-full inline-flex items-center justify-center px-6 py-3 border border-green font-medium rounded-full text-green bg-white hover:bg-green/10 transition-colors duration-150 ease-in-out"> {/* Adjusted hover */}
//                   Compare fees
//                 </button>
//                 <button type="button" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-white bg-green hover:bg-green-dark transition-colors duration-150 ease-in-out"> {/* Standard green button */}
//                   Send money
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



// app/(website)/components/Hero/HeroSection.tsx
"use client";
import { SlLock } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { CiBank } from "react-icons/ci";
import { useState, useEffect, useCallback } from "react"; // Added useCallback
import CountryDropdown from "../../../components/ui/CountryDropdown";
import HeroText from "./HeroText";
import Image from "next/image";
import inr from "../../../../../public/assets/icon/inr.svg";
import { useAppContext } from "../../../contexts/WebsiteAppContext";
import exchangeRateService from '../../../services/exchangeRate';

// --- Interfaces (keep as they are) ---
interface RatesMap {
  [key: string]: number;
}

interface ExchangeRateResponse {
  rates: RatesMap;
  // Add other potential properties if needed, e.g., base?: string;
}

interface ExchangeRates {
  [key: string]: { [key: string]: number };
}

// --- Default Fallback Rate ---
const DEFAULT_FALLBACK_RATE_INR = 87.2; // Define as a constant

const HeroSection: React.FC = () => {
  const { selectedSendCurrency, setSelectedSendCurrency } = useAppContext();
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loadingRates, setLoadingRates] = useState(true);
  const [rate, setRate] = useState(0); // Rate: 1 SendCurrency = X INR
  const [sendFee] = useState(0); // Assuming these are placeholders for now
  const [gst] = useState(0);     // Assuming these are placeholders for now
  const [arrivalDate, setArrivalDate] = useState<string | null>(null);

  // --- Helper Function for Conversion (using useCallback for stability if passed down) ---
  const convertAndFormat = useCallback((amount: string, conversionRate: number): string => {
    const numericAmount = parseFloat(amount.replace(/,/g, ""));
    // Ensure rate is valid and numericAmount is a number
    if (isNaN(numericAmount) || !conversionRate || conversionRate <= 0) {
      return "0.00";
    }
    const convertedAmount = numericAmount * conversionRate;
    return convertedAmount.toFixed(2);
  }, []); // No dependencies, pure function

  // --- Effect 1: Fetch Exchange Rates on Currency Change ---
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoadingRates(true);
      setRate(0); // Reset rate while loading new currency
      try {
        const response = await exchangeRateService.getExchangeRatesForCurrencies() as ExchangeRateResponse;
        const fetchedRates = response?.rates;

        if (fetchedRates && typeof fetchedRates === 'object' && Object.keys(fetchedRates).length > 0) {
          const transformedRates: ExchangeRates = {};
          const baseCurrencyRates = fetchedRates;
          const allCurrencies = Object.keys(baseCurrencyRates);

          // Build the cross-rates object (assuming rates relative to a common base)
          for (const fromCurrency of allCurrencies) {
            transformedRates[fromCurrency] = {};
            for (const toCurrency of allCurrencies) {
              const fromRateToBase = baseCurrencyRates[fromCurrency];
              const toRateToBase = baseCurrencyRates[toCurrency];
              // Avoid division by zero or invalid rates
              if (fromRateToBase && toRateToBase && fromRateToBase !== 0) {
                 transformedRates[fromCurrency][toCurrency] = toRateToBase / fromRateToBase;
              } else {
                 transformedRates[fromCurrency][toCurrency] = 0; // Mark as unavailable
              }
            }
            transformedRates[fromCurrency][fromCurrency] = 1;
          }

          setExchangeRates(transformedRates);

          // Set the specific rate for the *selected* send currency to INR
          const initialRateToINR = transformedRates[selectedSendCurrency]?.["INR"];
          if (initialRateToINR && initialRateToINR > 0) {
            setRate(initialRateToINR);
            // Note: receiveAmount recalculation is handled by the second useEffect
          } else {
            console.warn(`Rate from ${selectedSendCurrency} to INR not found or invalid. Using fallback.`);
            setRate(DEFAULT_FALLBACK_RATE_INR); // Use fallback
          }

        } else {
          console.error("Failed to fetch exchange rates: Invalid response structure", response);
          setRate(DEFAULT_FALLBACK_RATE_INR); // Use fallback on structure error
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setRate(DEFAULT_FALLBACK_RATE_INR); // Use fallback on fetch error
      } finally {
        setLoadingRates(false);
      }
    };

    fetchExchangeRates();
    // Dependency: Only re-run when the selected send currency changes.
  }, [selectedSendCurrency]);

  // --- Effect 2: Calculate Receive Amount when Send Amount or Rate changes ---
  useEffect(() => {
    // This effect is now responsible for updating the receive amount
    // whenever the inputs for the calculation change.
    setReceiveAmount(convertAndFormat(sendAmount, rate));
    // Dependencies: Re-run calculation if sendAmount or rate changes.
  }, [sendAmount, rate, convertAndFormat]); // Include convertAndFormat due to useCallback

  // --- Effect 3: Calculate Arrival Date (runs once on mount) ---
  useEffect(() => {
    const calculateArrival = () => {
        const today = new Date();
        const arrival = new Date(today);
        let daysToAdd = 2; // Estimate: 2 business days
        let currentDay = today.getDay();

        while (daysToAdd > 0) {
            arrival.setDate(arrival.getDate() + 1);
            currentDay = arrival.getDay();
            // Skip weekends (Sunday=0, Saturday=6)
            if (currentDay !== 0 && currentDay !== 6) {
                daysToAdd--;
            }
        }

        const options: Intl.DateTimeFormatOptions = { weekday: 'long' }; // Example format
        setArrivalDate(arrival.toLocaleDateString(undefined, options));
    };
    calculateArrival();
  }, []); // Empty dependency array: runs only once

  // --- Event Handlers ---
  const handleSendAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSendAmount = event.target.value;
    // Basic validation: allow numbers and at most one decimal point
    let sanitizedAmount = newSendAmount.replace(/[^0-9.]/g, '');
    const parts = sanitizedAmount.split('.');
    if (parts.length > 2) {
      // If more than one dot, keep only the first part and the part after the first dot
      sanitizedAmount = `${parts[0]}.${parts.slice(1).join('')}`;
    }
    // Only update state if sanitized value is different to prevent infinite loops if validation modifies it
    if (sanitizedAmount !== sendAmount) {
      setSendAmount(sanitizedAmount);
    }
    // No need to setReceiveAmount here, the useEffect [sendAmount, rate] handles it.
  };

  const handleCurrencyChange = (newCurrency: string) => {
    // Update context only if the currency actually changed
    if (newCurrency !== selectedSendCurrency) {
      setSelectedSendCurrency(newCurrency);
      // The fetch useEffect will trigger automatically due to selectedSendCurrency change
      // It will update the rate, and then the calculation useEffect will update receiveAmount.
    }
  };

  // --- Display Functions ---
  const displayRate = () => {
    if (loadingRates) {
      return "Loading rate...";
    }
    if (rate && rate > 0) {
      // Display rate from selected Send Currency to INR
      return `1 ${selectedSendCurrency} ≈ ${rate.toFixed(4)} INR`; // Use ≈ for approximation
    }
    return "Rate unavailable"; // Handle case where rate couldn't be determined
  };

  // --- JSX ---
  return (
    <section className="Hero-Section py-12 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2 space-y-5 p-4">
            <HeroText />
          </div>

          {/* Right Column: Calculator Card */}
          <div className="lg:max-w-xl lg:ml-auto w-full"> {/* Use max-w-xl and w-full */}
            <div className="bg-white rounded-3xl shadow-lg md:p-8 p-4 border border-gray-50">
              {/* Rate Guaranteed */}
              <div className="flex flex-col justify-center items-center gap-2 text-primary font-medium text-center mb-4 ">
                <div className="flex justify-center items-center gap-2">
                  <SlLock size={22} />
                  <span>Rate guaranteed (24h)</span>
                </div>
                <span className="bg-green/10 rounded-full py-1 px-2 inline-block mt-1 text-sm min-h-[24px]"> {/* Added min-height */}
                  {displayRate()}
                </span>
              </div>

              {/* You Send Input */}
              <div className="mb-3">
                <label htmlFor="sendAmountInput" className="block font-medium text-main mb-1">
                  You send exactly
                </label>
                <div>
                  <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between focus-within:border-green focus-within:ring-1 focus-within:ring-green transition-colors">
                    <input
                      id="sendAmountInput"
                      type="text"
                      inputMode="decimal"
                      placeholder="0"
                      value={sendAmount}
                      onChange={handleSendAmountChange}
                      className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl appearance-none" // Added appearance-none
                      autoComplete="off" // Prevent browser autocomplete
                    />
                    {/* Pass only necessary props to CountryDropdown */}
                    <CountryDropdown
                      selectedCurrency={selectedSendCurrency}
                      onCurrencyChange={handleCurrencyChange} // Simplified handler call
                    />
                  </div>
                </div>
                {/* Optional: Discount message */}
                <p className="text-cyan-900 mt-1 text-sm bg-cyan-100/30 rounded-lg px-2 py-1">
                  Sending over 20,000 GBP or equivalent?
                  <button type="button" className="underline cursor-pointer font-medium ml-1">
                    We&apos;ll discount our fee
                  </button>
                </p>
              </div>

              {/* Recipient Gets Display */}
              <div className="mb-3">
                <label htmlFor="receiveAmountInput" className="block font-medium text-main mb-1">
                  Recipient gets
                </label>
                <div className="w-full border border-gray-300 rounded-xl shadow-sm flex items-center justify-between bg-gray-50">
                  <input
                    id="receiveAmountInput"
                    type="text"
                    placeholder="0.00"
                    value={receiveAmount} // Directly use state
                    readOnly
                    className="block w-full h-16 p-3 text-main text-xl font-semibold focus:outline-none bg-transparent rounded-l-xl appearance-none" // Added appearance-none
                  />
                  {/* Fixed INR Display */}
                  <div className="flex items-center gap-2 min-w-[7rem] justify-center pr-3 pl-1 flex-shrink-0"> {/* Added flex-shrink-0 */}
                    <Image src={inr} alt="INR Flag" width={24} height={24} className="flex-shrink-0" />
                    <p className="text-main font-semibold">INR</p>
                  </div>
                </div>
              </div>

              {/* Paying With Section */}
              <div className="mb-4">
                <label className="block font-medium text-gray-500 dark:text-gray-300 mb-1">
                  Paying with
                </label>
                <div className="bg-lightgray dark:bg-background p-3 h-16 border rounded-xl flex items-center justify-between transition-colors duration-200 ease-in-out">
                  <div className="flex items-center gap-2">
                    <CiBank size={24} />
                    <span className="text-mainheading dark:text-white font-semibold">Bank transfer</span>
                  </div>
                  <button type="button" className="text-green font-medium bg-green/10 hover:bg-green/20 px-3 py-2 rounded-full text-sm inline-flex items-center gap-1 transition-colors">
                    Change
                    <IoIosArrowForward size={18} />
                  </button>
                </div>
              </div>

              {/* Fee Details Section */}
              <div className="text-sm border border-gray-300 rounded-xl p-4 space-y-2.5">
                 {/* Fee details remain the same */}
                 <div className="flex justify-between">
                   <span className="text-main ">Bank transfer fee</span>
                   <span className="text-gray-600">0 {selectedSendCurrency}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-main ">Our fee</span>
                   <span className="text-gray-600">{sendFee.toFixed(2)} {selectedSendCurrency}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-main ">GST</span>
                   <span className="text-gray-600">{gst.toFixed(2)} {selectedSendCurrency}</span>
                 </div>
                 <hr className="my-2 border-gray-200" />
                 <div className="flex justify-between text-main font-semibold">
                   <span>Total included fees (0%)</span>
                   <span>{(sendFee + gst).toFixed(2)} {selectedSendCurrency}</span>
                 </div>
              </div>

              {/* Savings & Arrival Info */}
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>You could save<span className="text-main font-bold mx-1">2.2%</span>on the payment you make.</p>
                <p>
                  Should arrive by
                  <span className="text-main font-medium">{arrivalDate || 'calculating...'}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex sm:flex-row flex-col items-center gap-3">
                <button type="button" className="w-full inline-flex items-center justify-center px-6 py-3 border border-green font-medium rounded-full text-green bg-white hover:bg-green/10 transition-colors duration-150 ease-in-out">
                  Compare fees
                </button>
                <button type="button" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-white bg-green hover:bg-green-dark transition-colors duration-150 ease-in-out">
                  Send money
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;