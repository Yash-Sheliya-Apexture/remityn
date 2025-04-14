// components/ProtectionSection.tsx
import { FaClock, FaGlobe } from "react-icons/fa6";
import { MdSyncAlt } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";

const ProtectionSection = () => {
  return (
    <section className="Protection-Section md:py-12 py-5 bg-[#f2f4f7] dark:bg-background" id="protect">
      <div className="container mx-auto px-4">
        <div className="md:pt-10 pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">

          {/* Real-Time Exchange Rates */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary  dark:bg-primarybox flex items-center justify-center">
              <MdSyncAlt className="w-8 h-8 text-white dark:text-primary" />
            </div>
            <h3 className="text-xl font-medium text-mainheading dark:text-white">
              Real-Time Exchange Rates
            </h3>
            <p className="text-gray-500 dark:text-gray-300 leading-relaxed">
              Get the most accurate and up-to-date exchange rates sourced from
              global financial markets.
            </p>
          </div>


          {/* Multi-Currency Support */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary dark:bg-primarybox flex items-center justify-center">
              <FaGlobe className="w-8 h-8 text-white dark:text-primary" />
            </div>
            <h3 className="text-xl font-medium text-mainheading dark:text-white">
              Multi-Currency Support
            </h3>
            <p className="text-gray-500 dark:text-gray-300 leading-relaxed">
              Exchange between dozens of global currencies including USD, EUR,
              GBP, JPY, INR, and more.
            </p>
          </div>

        
          {/* Fast Processing */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary dark:bg-primarybox flex items-center justify-center">
              <FaClock className="w-8 h-8 text-white dark:text-primary" />
            </div>
            <h3 className="text-xl font-medium text-mainheading dark:text-white">
              Fast Processing
            </h3>
            <p className="text-gray-500 dark:text-gray-300 leading-relaxed">
              Instant conversions with real-time confirmation — no more waiting
              hours for currency updates.
            </p>
          </div>

          {/* 24/7 Customer Support */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary dark:bg-primarybox flex items-center justify-center">
              <RiCustomerService2Fill className="w-8 h-8 text-white dark:text-primary" />
            </div>
            <h3 className="text-xl font-medium text-mainheading dark:text-white">
              24/7 Customer Support
            </h3>
            <p className="text-gray-500 dark:text-gray-300 leading-relaxed">
              Round-the-clock support to help you with your currency-related
              queries and transactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtectionSection;
