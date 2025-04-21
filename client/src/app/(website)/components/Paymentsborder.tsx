// import React from "react";
// import { FaFingerprint, FaRocket } from "react-icons/fa6";
// import { FaExchangeAlt, FaMoneyBillAlt } from "react-icons/fa";

// const RemittanceFeature: React.FC = () => {
//   return (
//     <section className="remittance more-feature bg-[#f2f4f7] dark:bg-background px-4 lg:py-20 py-10">
//       <div className="container mx-auto">
//         <div className="row flex justify-center">
//           <div className="col-md-7 md:w-7/12">
//             <div className="section-header text-center">
//               {/* sub-title */}
//               <p className="sub-title text-base font-medium text-gray-500 dark:text-gray-300 mb-2">
//                 Payments without borders
//               </p>
//               {/* title */}
//               <h1 className="text-4xl md:text-5xl lgt:ext-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//                 Freedom to Received
//                 <span className="text-primary"> Money Anywhere.</span>
//               </h1>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-6 flex-wrap lg:mt-14 mt-5">
//           <div className="bg-white dark:bg-white/5 lg:p-6 p-4 rounded-2xl">
//             <div className="flex items-center gap-6">
//               <FaFingerprint className="size-20 dark:text-primary text-mainheading" />
//               <div className="space-y-1">
//                 <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//                   Always at Your Fingertips
//                 </h5>
//                 <p className="text-gray-500 text-xs lg:text-base dark:text-gray-300">
//                   Send money anytime, anywhere—right from your phone. With
//                   lightning-fast transfers, real-time exchange rates, and total
//                   security, global payments are now just a tap away.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-white/5 lg:p-6 p-4 rounded-2xl">
//             <div className="flex items-center gap-6">
//               <FaExchangeAlt className="size-20 dark:text-primary text-mainheading" />
//               <div className="space-y-1">
//                 <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//                   Get the exchange rate right time
//                 </h5>
//                 <p className="text-gray-500 text-xs lg:text-base dark:text-gray-300">
//                   The cost of sending money abroad is constantly shifting. But
//                   with the Bankio app, you’ll always know the exchange rate and
//                   exactly how much remittance costs you.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-white/5 lg:p-6 p-4 rounded-2xl">
//             <div className="flex items-center gap-6">
//               <FaMoneyBillAlt className="size-20 dark:text-primary text-mainheading" />
//               <div className="space-y-1">
//                 <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//                   No additional fees. Ever
//                 </h5>
//                 <p className="text-gray-500 text-xs lg:text-base dark:text-gray-300">
//                   Exchange rates already make remitting money back home more
//                   expensive. Stilt will never charge you anything extra to send
//                   money to your family. Ever.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-white/5 lg:p-6 p-4 rounded-2xl">
//             <div className="flex items-center gap-6">
//               <FaRocket className="size-20 dark:text-primary text-mainheading" />
//               <div className="space-y-1">
//                 <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//                   Send with speed
//                 </h5>
//                 <p className="text-gray-500 text-xs lg:text-base dark:text-gray-300">
//                   When you send money abroad with the Bankio app’s remittance
//                   feature, your payments arrive instantly. No waiting and no
//                   instant transfer-fees. get 24/7 support.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RemittanceFeature;

import React from "react";
import { FaFingerprint, FaRocket } from "react-icons/fa6";
import { FaExchangeAlt, FaMoneyBillAlt } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { HiOutlineClock } from "react-icons/hi";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white dark:bg-white/5 lg:p-6 p-4 rounded-2xl">
      {/* Added shadow-sm for subtle lift */}
      <div className="flex items-center gap-6">
        <span className="text-primary dark:text-primary">{icon}</span>
        <div className="space-y-1">
          <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
            {title}
          </h5>
          <p className="text-gray-500 text-xs lg:text-base dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const RemittanceFeature: React.FC = () => {
  return (
    <section className="bg-gray-100 dark:bg-background px-4 lg:py-10 py-5">
      {/* Replaced bg-[#f2f4f7] with bg-gray-100 for Tailwind consistency */}
      <div className="container mx-auto">
        <div className="flex justify-center">
          {/* Removed 'row' and used flex directly for simpler layout */}
          <div className="md:w-7/12 w-full">
            {/* Removed 'col-md-7' and used md:w-7/12 directly */}
            <div className="text-center">
              {/* sub-title */}
              <p className="text-base font-medium text-gray-500 dark:text-gray-300 mb-2">
                Payments without borders
              </p>
              {/* title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
                {/* Fixed typo lgt:ext-6xl to lg:text-6xl */}
                Freedom to Received
                <span className="text-primary"> Money Anywhere.</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-6 lg:mt-10 mt-5">
          <FeatureItem
            icon={<FaFingerprint className="size-10" />}
            title="Always at Your Fingertips"
            description="Send money anytime, anywhere—right from your phone. With
                  lightning-fast transfers, real-time exchange rates, and total
                  security, global payments are now just a tap away."
          />
          <FeatureItem
            icon={<FaExchangeAlt className="size-10" />}
            title="Get the exchange rate right time"
            description="The cost of sending money abroad is constantly shifting. But
                  with the Bankio app, you’ll always know the exchange rate and
                  exactly how much remittance costs you."
          />
          <FeatureItem
            icon={<FaMoneyBillAlt className="size-10" />}
            title="No additional fees. Ever"
            description="Exchange rates already make remitting money back home more
                  expensive. Stilt will never charge you anything extra to send
                  money to your family. Ever."
          />
          <FeatureItem
            icon={<FaRocket className="size-10" />}
            title="Send with speed"
            description="When you send money abroad with the Bankio app’s remittance
                  feature, your payments arrive instantly. No waiting and no
                  instant transfer-fees. get 24/7 support."
          />
          <FeatureItem
            icon={<FiRepeat className="size-10" />}
            title="Multiple Payout Options"
            description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
             to choose how you receive your money—straight into your bank account, picked
             up in cash at a nearby location, or instantly into your mobile wallet."
          />
          <FeatureItem
            icon={<HiOutlineClock className="size-10" />}
            title="24/7 Availability"
            description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
             to choose how you receive your money—straight into your bank account, picked
             up in cash at a nearby location, or instantly into your mobile wallet."
          />
        </div>
      </div>
    </section>
  );
};

export default RemittanceFeature;
