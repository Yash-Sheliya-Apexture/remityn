// import HeroSection from "./components/home/HeroSection";
// import CalculetingSection from "./components/home/CalculetingSection";
// import ClientTestimonialSection from "./components/home/ClientTestimonialSection";
// import SecuritySection from "./components/home/SecuritySection";
// import InternationalTransferSection from "./components/InternationalTransferSection";
// import CallToActionSection from "./components/CallToActionSection";
// import FeaturesList from "./components/FeaturesList";
// import StepCardContent from "./components/StepCard/StepContentCard";
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Fast & Secure International Money Transfers', // This will become "Fast & Secure... | Remityn Clone"
//   description: 'Join Remityn Clone for the best rates on international money transfers. Send money to family and friends worldwide with ease.',
//   openGraph: {
//     title: 'Fast & Secure International Money Transfers by Remityn Clone',
//     description: 'Join Remityn Clone for the best rates on international money transfers.',
//     // You can specify a unique Open Graph image for this page
//     // images: ['/og-homepage.png'],
//   },
//   twitter: {
//     title: 'Fast & Secure International Money Transfers by Remityn Clone',
//     description: 'Join Remityn Clone for the best rates on international money transfers.',
//     // images: ['/twitter-homepage.png'],
//   },
//   alternates: { // If you have canonical URLs or other language versions
//     canonical: '/', // Relative to metadataBase
//     // languages: {
//     //   'en-US': '/en-US',
//     //   'es-ES': '/es-ES',
//     // },
//   },
// };

// export default function Home() {
//   return (
//     <>
//       <HeroSection />
//       <CalculetingSection />
//       <InternationalTransferSection />
//       <SecuritySection />
//       <ClientTestimonialSection />
//       <FeaturesList />
//       <StepCardContent />
//       <CallToActionSection />
//     </>
//   );
// }

// // src/app/(website)/page.tsx
// import { Metadata } from 'next';
// import dynamic from 'next/dynamic';
// import HeroSection from "./components/home/HeroSection"; // Likely LCP, load eagerly
// import CalculetingSection from "./components/home/CalculetingSection"; // Core interactive element, load eagerly

// // Dynamic imports for sections below the fold or less critical for initial interaction
// const FeatureMarquee = dynamic(() => import("./components/home/FeatureMarquee"));
// const InternationalTransferSection = dynamic(() => import("./components/home/InternationalTransferSection"));
// const SecuritySection = dynamic(() => import("./components/home/SecuritySection"));
// const ClientTestimonialSection = dynamic(() => import("./components/home/ClientTestimonialSection"));
// const FeaturesList = dynamic(() => import("./components/home/FeaturesList"));
// const StepCardContent = dynamic(() => import("./components/home/StepCard/StepContentCard"));
// const CallToActionSection = dynamic(() => import("./components/home/CallToActionSection"));

// export const metadata: Metadata = {
//   title: 'Fast & Secure International Money Transfers',
//   description: 'Join Remityn for the best rates on international money transfers. Send money to family and friends worldwide with ease.',
//   openGraph: {
//     title: 'Fast & Secure International Money Transfers by Remityn',
//     description: 'Join Remityn for the best rates on international money transfers.',
//   },
//   twitter: {
//     title: 'Fast & Secure International Money Transfers by Remityn',
//     description: 'Join Remityn for the best rates on international money transfers.',
//   },
//   alternates: {
//     canonical: '/',
//   },
// };

// export default function Home() {
//   return (
//     <>
//       <HeroSection />
//       <CalculetingSection />
//       <FeatureMarquee/>
//       <InternationalTransferSection />
//       <SecuritySection />
//       <FeaturesList />
//       <ClientTestimonialSection />
//       <StepCardContent />
//       <CallToActionSection />
//     </>
//   );
// }



// src/app/(website)/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamic imports for sections below the fold or less critical for initial interaction
const HeroSection = dynamic(() => import("./components/home/HeroSection"));

const CalculetingSection = dynamic(
  () => import("./components/home/CalculetingSection")
);

const FeatureMarquee = dynamic(
  () => import("./components/home/FeatureMarquee")
);
const InternationalTransferSection = dynamic(
  () => import("./components/home/InternationalTransferSection")
);
const FeaturesList = dynamic(() => import("./components/home/FeaturesList"));
const ReviewSection = dynamic(() => import("./components/home/ReviewSection"));
const StepCardContent = dynamic(
  () => import("./components/home/StepCard/StepContentCard")
);
const CallToActionSection = dynamic(
  () => import("./components/home/CallToActionSection")
);

const BankStandOutSection = dynamic(
  () => import("./components/home/BankStandOutSection")
);


export const metadata: Metadata = {
  title: "Fast & Secure International Money Transfers",
  description:
    "Join Remityn for the best rates on international money transfers. Send money to family and friends worldwide with ease.",
  openGraph: {
    title: "Fast & Secure International Money Transfers by Remityn",
    description:
      "Join Remityn for the best rates on international money transfers. Send money to family and friends worldwide with ease.", // Added full description here for better social sharing
    images: [
      {
        url: "/assets/images/hero-preview-image.jpg", // <-- IMPORTANT: Replace with your actual desired image path
        width: 1200, // Recommended width for Open Graph images
        height: 630, // Recommended height for Open Graph images
        alt: "Fast and Secure International Money Transfers with Remityn", // Descriptive alt text
      },
    ],
  },
  twitter: {
    title: "Fast & Secure International Money Transfers by Remityn",
    description:
      "Join Remityn for the best rates on international money transfers. Send money to family and friends worldwide with ease.", // Added full description here for better social sharing
  },
  alternates: {
    canonical: "/",
  },
};



export default function Home() {
  return (
    <>
      <HeroSection />
      <CalculetingSection />
      <FeatureMarquee />
      <InternationalTransferSection />
      <BankStandOutSection />
      <FeaturesList />
      <ReviewSection />
      <StepCardContent />
      <CallToActionSection />
    </>
  );
}
