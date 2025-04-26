// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const GetStartedSection: React.FC = () => {
//   return (
//     <div className="px-4 bg-white dark:bg-background lg:py-10 py-5">
//       <section className="bg-lightgray dark:bg-white/5 rounded-2xl container mx-auto lg:py-10 py-5 relative">
//         <div className="grid grid-cols-1">
//           <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
//             <div className="space-y-2 text-white lg:mb-0 lg:ml-8 ml-6 text-left">
//               <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//                 Ready to <br />
//                 <span className="text-primary">get started? </span>
//               </h1>

//               <p className="md:text-lg text-mainheading dark:text-white text-sm max-w-lg ">
//                 Open your free Wise account in just minutes—fast, secure, and
//                 ready when you are.
//               </p>

//               <Link
//                 className="inline-block bg-primary hover:bg-primaryhover text-mainheading font-medium lg:py-3 py-2.5 px-6 lg:text-lg text-sm rounded-full transition-colors duration-300"
//                 href="/auth/register"
//               >
//                 Open an Account
//               </Link>
//             </div>

//             <Image
//               src="/assets/images/get-start.png"
//               width={500}
//               height={500}
//               className="absolute xl:size-[450px] -bottom-5 right-0 lg:block hidden"
//               alt="Picture of the author"
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default GetStartedSection;


// app/(website)/components/GetStartedSection.tsx  <-- Adjust path if needed

"use client"; // <--- Add this line to make it a Client Component

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/app/contexts/AuthContext"; // <--- Import useAuth (adjust path if needed)

const GetStartedSection: React.FC = () => {
  // Get user state from AuthContext
  const { user } = useAuth();

  // Determine button properties based on auth state
  const buttonText = user ? "Go to Dashboard" : "Open an Account"; // Or "Send Money" if preferred when logged in
  const buttonLink = user ? "/dashboard" : "/auth/register";     // Link to dashboard or registration

  return (
    <div className="px-4 bg-white dark:bg-background lg:py-10 py-5">
      {/* Main section container with background and rounded corners */}
      <section className="bg-lightgray dark:bg-white/5 rounded-2xl container mx-auto lg:py-10 py-5 relative overflow-hidden"> {/* Added overflow-hidden */}
        <div className="grid grid-cols-1">
          <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left z-10 relative"> {/* Added z-10 and relative */}
            {/* Text and Button Content */}
            <div className="space-y-4 lg:space-y-6 text-white lg:mb-0 lg:ml-8 ml-6 text-left px-4 lg:px-0"> {/* Added padding for mobile */}
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
                Ready to <br />
                <span className="text-primary">get started? </span>
              </h1>

              <p className="md:text-lg text-mainheading dark:text-white text-sm max-w-lg ">
                {user
                  ? "Manage your transfers, recipients, and balances easily from your dashboard." // Text for logged-in users
                  : "Open your free Wise account in just minutes—fast, secure, and ready when you are." // Text for logged-out users
                }
              </p>

              {/* Dynamic Link/Button */}
              <Link
                href={buttonLink} // <-- Use dynamic link
                className="inline-block bg-primary hover:bg-primaryhover text-mainheading font-medium lg:py-3 py-2.5 px-6 lg:text-lg text-sm rounded-full transition-colors duration-300"
              >
                {buttonText} {/* <-- Use dynamic text */}
              </Link>
            </div>

            {/* Image - positioned absolutely */}
            {/* Ensure the parent 'section' has relative positioning */}
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-end justify-center mt-8 lg:mt-0 pointer-events-none"> {/* Container for positioning */}
               <Image
                 src="/assets/images/get-start.png" // Ensure this image exists
                 width={500} // Adjust as needed
                 height={500} // Adjust as needed
                 className="lg:absolute lg:-bottom-5 lg:right-0 w-[300px] h-auto md:w-[400px] xl:w-[450px] lg:w-auto lg:h-auto" // Adjusted sizes and positioning
                 alt="Get started illustration"
                 style={{ objectFit: 'contain' }} // Ensure image scales nicely
               />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStartedSection;
