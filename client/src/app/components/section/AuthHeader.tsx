// components/AuthHeader.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface AuthHeaderProps {}

const AuthHeader: React.FC<AuthHeaderProps> = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="p-4 border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <Link href="/" className="text-xl font-semibold text-primary-500">
          {isMobile ? (
            <Image
              src="/assets/images/mobile-wise-logo.svg" // Replace with your mobile logo
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
        <Link href="/" className="text-neutral-500 cursor-pointer">
          <IoClose className="size-10 text-green p-1.5 rounded-full hover:bg-[#16330021]" />
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
