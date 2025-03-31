// import Image from "next/image";
// import React from "react";
// import { HiArrowLeft } from "react-icons/hi";
// import { LuUser } from "react-icons/lu";

// export default function FullyReusableHeader() {
//   return (
//     <header className="Header shadow  py-4">
//       <div className="container mx-auto">
//         <div className="flex items-center justify-between">
//           {/* Icon */}
//           <Image
//             src={"/assets/icon/logo.svg"}
//             alt="logo"
//             width={120}
//             height={500}
//           />

//               {/* Back Button */}
//               <button className="focus:outline-none p-4 bg-primary/10 rounded-full text-secondary">
//             <HiArrowLeft className="size-5" />
//           </button>
          
//           {/* Process Bar */}
//           <div className="w-1/2 max-w-2xl">
//             <div className="rounded-full bg-gray-400 h-1.5">
//               {/* Line */}
//             </div>
//               <div className="flex justify-between font-semibold text-gray mt-2 -mx-10">
//                 {/* Steps */}
//                 <div className="text-left">New Email</div>
//                 <div className="text-center">Enter Password</div>
//                 <div className="text-right">Verify Email</div>
//               </div>
//           </div>

//           {/* User Icon */}
//           <div className="focus:outline-none p-4 bg-lightgray rounded-full text-secondary">
//             <LuUser className="size-5" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }







import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { LuUser } from "react-icons/lu";

export default function FullyReusableHeader({
  title,
  showBackButton = false,
  backButtonHref = "/",
  showProgressBar = false,
  progressSteps = [],
  currentStepIndex = 0,
  showUserIcon = true,
  userIconHref = "/",
  logoSrc = "/assets/icon/logo.svg",
  logoAlt = "logo",
  logoWidth = 120,
  logoHeight = 50,
  customLeftContent,
  customRightContent,
}) {
  let progressPercentage = 0;

  if (showProgressBar && progressSteps.length > 0) {
    if (currentStepIndex >= 1) {
      progressPercentage =
        ((currentStepIndex) / progressSteps.length) * 100;
    } else {
      progressPercentage = 0;
    }
  }

  return (
    <header className="Header shadow py-4 bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Content */}
          <div className="flex items-center">
            {customLeftContent ? (
              customLeftContent
            ) : (
              <>
                {showBackButton && (
                  <Link href={backButtonHref} className="mr-4">
                    <button className="focus:outline-none p-2 bg-primary/10 rounded-full text-secondary">
                      <HiArrowLeft className="size-5" />
                    </button>
                  </Link>
                )}
                <Link href="/">
                  <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={logoWidth}
                    height={logoHeight}
                    className="cursor-pointer"
                  />
                </Link>
              </>
            )}
          </div>

          {/* Center Content (Title or Progress Bar) */}
          <div className="flex-grow text-center">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {showProgressBar && progressSteps.length > 0 && (
              <div className="w-full max-w-2xl mx-auto mt-2">
                <div className="rounded-full bg-gray-300 h-1.5 relative">
                  {/* Progress Indicator with Animation */}
                  {progressSteps.length > 1 && (
                    <div
                      className="absolute top-0 left-0 h-1.5 bg-primary rounded-full transition-width duration-500 ease-in-out" // Added transition classes
                      style={{
                        width: `${progressPercentage}%`,
                      }}
                    ></div>
                  )}
                </div>
                <div className="flex justify-between font-semibold text-gray-500 mt-2 -mx-2 sm:-mx-4">
                  {progressSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`text-sm sm:text-base ${
                        index === 0
                          ? "text-left"
                          : index === progressSteps.length - 1
                          ? "text-right"
                          : "text-center"
                      } ${index <= currentStepIndex ? "text-secondary" : ""}`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="flex items-center">
            {customRightContent ? (
              customRightContent
            ) : (
              <>
                {showUserIcon && (
                  <Link href={userIconHref}>
                    <div className="focus:outline-none p-2 bg-gray-100 rounded-full text-secondary cursor-pointer">
                      <LuUser className="size-5" />
                    </div>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}