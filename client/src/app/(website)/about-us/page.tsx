// import React from 'react'
// import TrustedCurrencyPartner from '../components/About/TrustedCurrencyPartner'
// import CurrencyExchangeServices from '../components/About/CurrencyExchangeServices'
// import WhyChooseUs from '../components/About/WhyChooseUs'
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'About Remityn', // Becomes "About Remityn Clone | Remityn Clone"
//   description: 'Learn more about Remityn, our mission, and our commitment to providing affordable and reliable money transfer services.',
//   openGraph: {
//     title: 'About Remityn',
//     description: 'Learn more about our mission and commitment.',
//   },
//   // ... other specific metadata
// };

// const page = () => {
//   return (
//     <div className='AboutUs-Page'>
//         <TrustedCurrencyPartner />
//         <CurrencyExchangeServices />
//         <WhyChooseUs />
//     </div>
//   )
// }

// export default page

import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic"; // Import next/dynamic
import DebtManagementSection from "../components/DebtManagementSection";
import FinancialAssistPage from "../components/About/FinancialAssistPage";
// import FinancialAssistPage from '../components/About/FinancialAssistPage';

// Dynamically import components for this page
const TrustedCurrencyPartner = dynamic(
  () => import("../components/About/TrustedCurrencyPartner"),
  {
    // Optional: Add a loading skeleton or placeholder if initial render is too jarring
    // loading: () => <div className="h-96 bg-gray-800 rounded animate-pulse" />,
  }
);
const CurrencyExchangeServices = dynamic(
  () => import("../components/About/CurrencyExchangeServices"),
  {
    // loading: () => <div className="h-96 bg-gray-800 rounded animate-pulse" />,
  }
);
const WhyChooseUs = dynamic(() => import("../components/About/WhyChooseUs"), {
  // loading: () => <div className="h-96 bg-gray-800 rounded animate-pulse" />,
});

export const metadata: Metadata = {
  title: "About Remityn",
  description:
    "Learn more about Remityn, our mission, and our commitment to providing affordable and reliable money transfer services.",
  openGraph: {
    title: "About Remityn",
    description: "Learn more about our mission and commitment.",
  },
};

// Renamed component to avoid conflict with 'page' keyword if used elsewhere
const AboutUsPage = () => {
  return (
    <div className="AboutUs-Page">
      {/* Sections will be loaded as separate JavaScript chunks */}
      <TrustedCurrencyPartner />
      <CurrencyExchangeServices />
      <WhyChooseUs />
      {/* <FinancialAssistPage/> */}
    </div>
  );
};

export default AboutUsPage;
