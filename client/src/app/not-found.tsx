// src/app/not-found.tsx
"use client"; // Keep as a client component to use hooks

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // <-- Import usePathname
import { TbExternalLink } from "react-icons/tb";
// No longer need useAuth or Loader2 for this logic

export default function NotFound() {
  const pathname = usePathname(); // <-- Get the current path (the one that wasn't found)
  const [homeHref, setHomeHref] = useState<string>("/"); // Default to public home
  const [buttonText, setButtonText] = useState<string>("Go to Homepage"); // Default text

  useEffect(() => {
    // Determine the correct redirect path based on the pathname
    if (pathname) { // Ensure pathname is available
      if (pathname.startsWith("/admin/")) {
        setHomeHref("/admin"); // <-- Adjust if your admin base path is different
        setButtonText("Go to Admin Dashboard");
      } else if (pathname.startsWith("/dashboard/")) {
        setHomeHref("/dashboard");
        setButtonText("Go to Dashboard");
      } else {
        setHomeHref("/");
        setButtonText("Go to Homepage");
      }
    }
  }, [pathname]); // Re-run effect if the pathname changes (though unlikely on a 404 page)

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-background p-4">
        <div className="flex flex-col justify-center items-center max-w-lg text-center">
          {/* Image */}
          <div className="mb-8">
            <Image
              src="/assets/images/construction-fence-medium@1x.webp"
              alt="Page Not Found Illustration"
              width={250}
              height={250}
              priority
              className="md:size-60 size-40"
            />
          </div>

          {/* Title */}
          <h1 className="lg:text-3xl text-xl font-semibold text-mainheading dark:text-white mb-4">
            Oops! Page Not Found
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 text-center">
            The page you were looking for doesn't seem to exist. Let’s get you back on track.
          </p>

          {/* Go to Home/Dashboard/Admin Button */}
          {/* No loading state needed as pathname is available immediately */}
          <Link
            href={homeHref} // Use the state variable determined by pathname
            className="bg-primary hover:bg-primaryhover text-mainheading text-lg font-medium lg:py-3 py-2 w-full inline-block rounded-full transition-colors duration-200"
          >
            {buttonText} {/* Use the dynamic button text */}
          </Link>

          {/* Try these tips link */}
          <div className="mt-6 flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Link
              href="/faqs"
              className="font-medium text-primary dark:text-primary hover:underline underline-offset-4"
            >
              Need help? Visit our FAQs
            </Link>
            <TbExternalLink className="size-5" />
          </div>
        </div>
      </div>
    </>
  );
}