// // components/AuthHeader.tsx
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { IoClose } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// interface AuthHeaderProps {}

// const AuthHeader: React.FC<AuthHeaderProps> = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     // Set initial value
//     handleResize();

//     // Listen for window resize events
//     window.addEventListener("resize", handleResize);

//     // Clean up the event listener on unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div className="p-4 border-b border-gray-300">
//       <div className="container mx-auto flex justify-between items-center max-w-6xl">
//         <Link href="/" className="text-xl font-semibold text-primary-500">
//           {isMobile ? (
//             <Image
//               src="/assets/images/mobile-wise-logo.svg" // Replace with your mobile logo
//               width={30} // Adjust as needed
//               height={30} // Adjust as needed
//               alt="Wise Logo (Mobile)"
//             />
//           ) : (
//             <Image
//               src="/assets/images/wise-logo.svg"
//               width={100}
//               height={100}
//               alt="Wise Logo"
//             />
//           )}
//         </Link>
//         <Link href="/" className="text-neutral-500 cursor-pointer">
//           <IoClose className="size-10 text-green p-1.5 rounded-full hover:bg-[#16330021]" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AuthHeader;



// components/AuthHeader.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import React from "react"; 

const AuthHeader: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Ensure window is defined (for server-side rendering safety, although "use client" mitigates this)
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    // Set initial value
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <div className="p-4 bg-white dark:bg-background border-b">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <Link href="/" className="text-xl font-semibold text-primary">
          {isMobile ? (
            <Image
              src="/assets/images/wise-logo2.svg" // Replace with your mobile logo
              width={30} // Adjust as needed
              height={30} // Adjust as needed
              alt="Wise Logo (Mobile)"
            />
          ) : (
            <Image
              src="/assets/images/wise-logo.svg"
              width={100}
              height={100}
              alt="Wise Logo"
            />
          )}
        </Link>
        <Link href="/" >
          <IoClose className="lg:size-10 size-8 p-1.5 bg-gray/10 dark:bg-secondary text-mainheading dark:text-primary rounded-full transition-colors" />
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;