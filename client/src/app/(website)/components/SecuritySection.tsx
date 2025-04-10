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
import { LuLockKeyhole } from "react-icons/lu";
import { BsBank } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";

const SecuritySection = () => {
  return (
    <section className="Security-section py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Content */}
          <div className="w-full md:w-3/5 order-2 md:order-1">
            <div className="mb-10">
              <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold text-mainheading dark:text-white font-mont tracking-tight mb-8">
                Disappoint thieves
              </h1>
              <p className="text-gray-500 dark:text-gray-300 lg:text-xl">
                Every month, millions of our personal and business customers
                trust us to move over 1.1 trillion INR of their money.
              </p>
            </div>
            <div>
              <button className="bg-primary rounded-full px-6 py-3 h-14 hover:bg-primaryhover text-mainheading font-medium text-lg transition-colors duration-300 ease-in-out">
                <Link href={""} className="text-mainheading font-medium">
                  How we keep your money safe
                </Link>
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full md:w-2/5 h-auto order-1 md:order-2 flex md:justify-end justify-center">
            <Image
              // Use the imported 'img' variable here
              src="/assets/images/Protecation.png"
              alt="Padlock symbolizing security"
              width={500}
              height={500}
              className="w-[300px] lg:w-[500px] h-auto"
              priority // Optional: Add priority if this image is above the fold
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="p-4 bg-lightgray dark:bg-secondary dark:text-primary text-mainheading rounded-full inline-flex items-center ">
                <LuLockKeyhole size={32} aria-hidden="true" /> {/* Add aria-hidden to icon */}
              </div>
              <div>
                <p className="font-medium lg:text-lg text-gray-500 dark:text-gray-300">
                  Our dedicated fraud and security teams work to keep your money
                  safe
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-lightgray dark:bg-secondary dark:text-primary text-mainheading rounded-full inline-flex items-center ">
                <svg
                  aria-hidden="true" // Keep aria-hidden
                  focusable="false"
                  // Remove role="none" as aria-hidden="true" is sufficient for decorative icons
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 4.284a2.57 2.57 0 0 1 2.571-2.571h6.858A2.57 2.57 0 0 1 21 4.284v15.429a2.57 2.57 0 0 1-2.571 2.571h-6.764l-.094.002h-6A2.57 2.57 0 0 1 3 19.715v-6.853c0-.476.386-.862.861-.862h1.282v-1.285A3.43 3.43 0 0 1 9 7.313zm1.714 3.754q.147.119.282.252A3.43 3.43 0 0 1 12 10.715V12h1.281c.476 0 .862.386.862.862v6.853c0 .3-.052.587-.146.855h4.432a.857.857 0 0 0 .857-.857V4.284a.857.857 0 0 0-.857-.857h-1.83a.857.857 0 0 1-.742 1.286h-1.714a.857.857 0 0 1-.743-1.286h-1.829a.857.857 0 0 0-.857.857zm.911 12.532a.857.857 0 0 0 .804-.855v-6H4.714v6c0 .473.384.857.857.857h5.143v-.002zM7.36 9.502a1.714 1.714 0 0 1 2.927 1.213V12H6.857v-1.285c0-.455.18-.891.502-1.213m.355 6.355H9.43v2.572H7.714z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="font-medium lg:text-lg text-gray-500 dark:text-gray-300">
                  We use 2-factor authentication to protect your account
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-lightgray dark:bg-secondary dark:text-primary text-mainheading rounded-full inline-flex items-center ">
                <BsBank size={32} aria-hidden="true" /> {/* Add aria-hidden to icon */}
              </div>
              <div>
                <p className="font-medium lg:text-lg text-gray-500 dark:text-gray-300">
                  We hold your money with established financial institutions
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