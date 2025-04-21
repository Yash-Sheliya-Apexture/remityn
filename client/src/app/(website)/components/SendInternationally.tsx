// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const RemittanceSection: React.FC = () => {
//   return (
//     <section className="py-10 bg-[#f2f4f7] dark:bg-background px-4">
//       <div className="container mx-auto flex gap-10 flex-col md:flex-row items-center justify-end">
//         {/* Left Content Section */}
//         <div className="md:w-1/2 w-full text-center md:text-left space-y-2.5">
//           <p className="lg:text-base text-sm text-gray-500 dark:text-gray-300 font-medium">
//             Send Money Across Borders with Confidence
//           </p>

//           {/* Main Heading */}
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//             Send Money Across
//             <span className="text-primary"> Borders with Confidence </span>
//           </h1>

//           {/* Description */}
//           <p className="text-sm md:text-lg text-gray-500 dark:text-gray-300">
//             Experience hassle-free money transfers to over 100 countries
//             worldwide. Whether you're supporting loved ones, paying bills, or
//             handling business payments, our platform ensures your money gets
//             where it needs to go—quickly and safely. With competitive exchange
//             rates, low fees, and 24/7 customer support, sending money has never
//             been this simple.
//           </p>

//           {/* Download Buttons */}
//           <div className="flex justify-center md:justify-start">
//             <Link href="/dashboard/send/select-balance" className="inline-block mt-3">
//               <button className="bg-primary px-10 lg:py-3 py-2 lg:h-12.5 lg:text-base text-sm cursor-pointer hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading font-medium rounded-full">
//                 Send Money
//               </button>
//             </Link>
//           </div>

//           {/* User avatars and star rating */}
//           <div className="flex items-center gap-4 mt-5">
//             <div className="flex items-center -space-x-2">
//               <Image
//                 src="/assets/images/user1.png"
//                 width={500}
//                 height={500}
//                 alt="Picture of the author"
//                 className="md:size-10 size-7 rounded-full"
//                 style={{ color: "transparent" }}
//               />
//               <Image
//                 src="/assets/images/user2.png"
//                 width={500}
//                 height={500}
//                 alt="Picture of the author"
//                 className="md:size-10 size-7 rounded-full"
//                 style={{ color: "transparent" }}
//               />
//               <Image
//                 src="/assets/images/user3.png"
//                 width={500}
//                 height={500}
//                 alt="Picture of the author"
//                 className="md:size-10 size-7 rounded-full"
//                 style={{ color: "transparent" }}
//               />
//               <Image
//                 src="/assets/images/Lisa-Carter.jpg"
//                 width={500}
//                 height={500}
//                 alt="Picture of the author"
//                 className="md:size-10 size-7 rounded-full border-2 border-white"
//                 style={{ color: "transparent" }}
//               />
//               <Image
//                 src="/assets/images/Emily.jpg"
//                 width={500}
//                 height={500}
//                 alt="Picture of the author"
//                 className="md:size-10 size-7 rounded-full border-2 border-white"
//                 style={{ color: "transparent" }}
//               />
//             </div>

//             {/* Star rating and user count */}
//             <p className="font-normal text-mainheading lg:text-base text-sm text-nowrap dark:text-white capitalize">
//               <span className="text-primary font-bold"> 500K+ </span> People
//               already trusted us.
//             </p>
//           </div>
//         </div>

//         {/* Right Image Section */}
//         <div className="md:w-1/2 w-full flex justify-center">
//           <Image
//             src="/assets/images/secure.svg"
//             width={500}
//             height={500}
//             alt="Picture of the author"
//             className="lg:w-3/5 w-3/4"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RemittanceSection;





// app/(website)/components/RemittanceSection.tsx  <-- Adjust path if needed

'use client'; // <--- Add this line

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/app/contexts/AuthContext"; // <--- Import useAuth

const RemittanceSection: React.FC = () => {
  // Get user state from AuthContext
  const { user } = useAuth();

  // Determine button properties based on auth state
  const buttonText = user ? "Send Money" : "Create A Free Account";
  const buttonLink = user ? "/dashboard/send/select-balance" : "/auth/register"; // Link to register or send money flow

  return (
    <section className="py-10 bg-[#f2f4f7] dark:bg-background px-4">
      <div className="container mx-auto flex gap-10 flex-col md:flex-row items-center justify-end">
        {/* Left Content Section */}
        <div className="md:w-1/2 w-full text-center md:text-left space-y-2.5">
          <p className="lg:text-base text-sm text-gray-500 dark:text-gray-300 font-medium">
            Send Money Across Borders with Confidence
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
            Send Money Across
            <span className="text-primary"> Borders with Confidence </span>
          </h1>

          {/* Description */}
          <p className="text-sm md:text-lg text-gray-500 dark:text-gray-300">
            Experience hassle-free money transfers to over 100 countries
            worldwide. Whether you're supporting loved ones, paying bills, or
            handling business payments, our platform ensures your money gets
            where it needs to go—quickly and safely. With competitive exchange
            rates, low fees, and 24/7 customer support, sending money has never
            been this simple.
          </p>

          {/* Dynamic Button */}
          <div className="flex justify-center md:justify-start">
            <Link
              href={buttonLink} // <-- Use dynamic link
              className="inline-block mt-3"
            >
              <button className="bg-primary px-10 lg:py-3 py-2 lg:h-12.5 lg:text-base text-sm cursor-pointer hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading font-medium rounded-full">
                {buttonText} {/* <-- Use dynamic text */}
              </button>
            </Link>
          </div>

          {/* User avatars and star rating */}
          <div className="flex items-center justify-center md:justify-start gap-4 mt-5"> {/* Added justify-center for mobile */}
            <div className="flex items-center -space-x-2">
              {/* Kept only a few images for brevity, add back as needed */}
              <Image
                src="/assets/images/user1.png"
                width={40} // Consistent smaller size
                height={40}
                alt="User avatar 1"
                className="rounded-full border-2 border-white dark:border-background"
              />
              <Image
                src="/assets/images/user2.png"
                 width={40}
                 height={40}
                 alt="User avatar 2"
                 className="rounded-full border-2 border-white dark:border-background"
              />
              <Image
                src="/assets/images/user3.png"
                 width={40}
                 height={40}
                 alt="User avatar 3"
                 className="rounded-full border-2 border-white dark:border-background"
              />
              <Image
                src="/assets/images/Lisa-Carter.jpg"
                 width={40}
                 height={40}
                 alt="User avatar 4"
                 className="rounded-full border-2 border-white dark:border-background"
              />
              <Image
                src="/assets/images/Emily.jpg"
                 width={40}
                 height={40}
                 alt="User avatar 5"
                 className="rounded-full border-2 border-white dark:border-background"
              />
            </div>

            {/* Star rating and user count */}
            <p className="font-normal text-mainheading lg:text-base text-sm text-nowrap dark:text-white capitalize">
              <span className="text-primary font-bold"> 500K+ </span> People
              already trusted us.
            </p>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 w-full flex justify-center mt-8 md:mt-0"> {/* Added margin-top for mobile */}
          <Image
            src="/assets/images/secure.svg" // Assuming this is the correct secure transfer image
            width={500} // Adjust width/height as needed for responsiveness
            height={500}
            alt="Secure money transfer illustration"
            className="lg:w-3/5 w-3/4" // Adjust classes for desired size
          />
        </div>
      </div>
    </section>
  );
};

export default RemittanceSection;