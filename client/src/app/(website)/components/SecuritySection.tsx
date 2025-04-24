// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import img from "../../../../public/assets/images/lock.webp";
// import { LuLockKeyhole } from "react-icons/lu";
// import { BsBank } from "react-icons/bs";

// const SecuritySection = () => {
//   return (
//     <section className="Security-section py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           {/* Left Content */}
//           <div className="w-full md:w-3/5 order-2 md:order-1">
//             <div className="mb-10">
//               <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold text-main font-mont tracking-tight mb-8">
//                 Disappoint thieves
//               </h1>
//               <p className="text-gray lg:text-xl">
//                 Every month, millions of our personal and business customers
//                 trust us to move over 1.1 trillion INR of their money.
//               </p>
//             </div>
//             <div>
//               <button className="bg-lightgreen rounded-full px-6 py-3 hover:bg-lightgreen-hover transition-colors duration-150 ease-in-out">
//                 <Link href={""} className="text-green font-medium">
//                   How we keep your money safe
//                 </Link>
//               </button>
//             </div>
//           </div>

//           {/* Right Image Section */}
//           <div className="w-full md:w-2/5 h-auto order-1 md:order-2 flex md:justify-end justify-center">
//             <Image
//               src="/assets/images/lock.webp"
//               alt="Image-1"
//               width={500}
//               height={500}
//               className="w-[300px] lg:w-[500px] h-auto"
//             />
//           </div>
//         </div>

//         <div className="mt-10">
//           <div className="grid md:grid-cols-3 gap-12">
//             <div className="space-y-4">
//               <div className="p-4 bg-green/10 text-green rounded-full inline-flex items-center ">
//                 <LuLockKeyhole size={32} />
//               </div>
//               <div>
//                 <p className="font-medium lg:text-lg text-gray">
//                   Our dedicated fraud and security teams work to keep your money
//                   safe
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="p-4 bg-green/10 text-green rounded-full inline-flex items-center ">
//                 <svg
//                   aria-hidden="true"
//                   focusable="false"
//                   role="none"
//                   width="32"
//                   height="32"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M9 4.284a2.57 2.57 0 0 1 2.571-2.571h6.858A2.57 2.57 0 0 1 21 4.284v15.429a2.57 2.57 0 0 1-2.571 2.571h-6.764l-.094.002h-6A2.57 2.57 0 0 1 3 19.715v-6.853c0-.476.386-.862.861-.862h1.282v-1.285A3.43 3.43 0 0 1 9 7.313zm1.714 3.754q.147.119.282.252A3.43 3.43 0 0 1 12 10.715V12h1.281c.476 0 .862.386.862.862v6.853c0 .3-.052.587-.146.855h4.432a.857.857 0 0 0 .857-.857V4.284a.857.857 0 0 0-.857-.857h-1.83a.857.857 0 0 1-.742 1.286h-1.714a.857.857 0 0 1-.743-1.286h-1.829a.857.857 0 0 0-.857.857zm.911 12.532a.857.857 0 0 0 .804-.855v-6H4.714v6c0 .473.384.857.857.857h5.143v-.002zM7.36 9.502a1.714 1.714 0 0 1 2.927 1.213V12H6.857v-1.285c0-.455.18-.891.502-1.213m.355 6.355H9.43v2.572H7.714z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//               </div>
//               <div>
//                 <p className="font-medium lg:text-lg text-gray">
//                   We use 2-factor authentication to protect your account
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="p-4 bg-green/10 text-green rounded-full inline-flex items-center ">
//                 <BsBank size={32} />
//               </div>
//               <div>
//                 <p className="font-medium lg:text-lg text-gray">
//                   We hold your money with established financial institutions
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SecuritySection;

import React from "react";
import Image from "next/image";
import Link from "next/link";
// Import the image correctly
import { FaLock } from "react-icons/fa6";
import { FaShieldAlt, FaUniversity } from "react-icons/fa";

const SecuritySection = () => {
  return (
    <section className="Security-section md:py-10 py-5 bg-white dark:bg-background px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-3/5 order-2 md:order-1">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
                Secure Currency Exchange
                <span className="text-primary"> You Can Trust </span>
              </h1>

              <p className="lg:text-lg sm:text-base text-sm text-gray-700 leading-relaxed dark:text-gray-300 mt-5">
                Experience fast, reliable, and secure currency exchange with
                full transparency and top-level protection for your
                money—trusted by thousands worldwide
              </p>
            </div>
            <div>
              <Link
                href="/faqs"
                className="bg-primary rounded-full px-6 md:py-3 py-2.5 lg:h-12.5 lg:text-lg text-sm hover:bg-primaryhover text-mainheading font-medium cursor-pointer transition-colors duration-300 ease-in-out"
              >
                <button className="text-mainheading font-medium">
                  How we keep your money safe
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-2/5 h-auto order-1 md:order-2 flex md:justify-end justify-center">
            <Image
              src="/assets/images/secure.svg"
              alt="Padlock symbolizing security"
              width={500}
              height={500}
              className="md:w-[300px] w-[250px] lg:w-[400px] h-auto md:mb-0 mb-5"
              priority 
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-10 gap-8">
            <div className="space-y-4">
              <div className="lg:p-3 p-2.5 bg-gray dark:bg-white/5 dark:text-primary text-white rounded-full inline-flex items-center ">
                <FaLock className="lg:size-8 size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium lg:text-lg text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  We use 256-bit encryption to protect your data and
                  transactions—just like the biggest banks
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="lg:p-3 p-2.5 bg-gray dark:bg-white/5 dark:text-primary text-white rounded-full inline-flex items-center ">
                <FaShieldAlt className="lg:size-8 size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium lg:text-lg text-base text-gray-700 dark:text-gray-300">
                  Real-time monitoring detects suspicious activity instantly to
                  stop fraud before it happens.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="lg:p-3 p-2.5 bg-gray dark:bg-white/5 dark:text-primary text-white rounded-full inline-flex items-center">
                <FaUniversity className="lg:size-8 size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium lg:text-lg text-base text-gray-700 dark:text-gray-300">
                  Your money is stored with top-tier, FDIC-insured partner banks
                  for added security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SecuritySection;
