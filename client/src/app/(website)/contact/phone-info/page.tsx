// import React from "react";
// import { MessageSquareMore, Phone } from "lucide-react"; // Using an icon from lucide-react

// interface CallUsPageProps {}

// const CallUsPage: React.FC<CallUsPageProps> = () => {
//   return (
//     <div className="bg-background flex justify-center py-10 sm:py-16 px-4">
//       <div className="w-full max-w-xl space-y-10">
//         {/* 1. Main Title */}
//         <div className="text-center">
//           <h1 className="text-3xl sm:text-4xl font-bold text-mainheadingWhite">
//             Call <span className="text-primary">Us</span>
//           </h1>
//         </div>

//         {/* 3. Membership Number Box */}
//         <div className="bg-primarybox p-6 rounded-lg text-center">
//           <h1 className="text-2xl text-mainheadingWhite capitalize font-medium">
//             whatapp number: <span className="font-bold">8849498140</span>
//           </h1>

//           <p className="text-sm text-subheadingWhite mt-1">
//             We'll ask you for this number when you call.
//           </p>
//         </div>

//         {/* 4. Contact Information Block */}
//         <div className="text-center">
//           <p className="font-semibold text-mainheadingWhite">Personal</p>

//           <p className="text-xl font-bold cursor-pointer text-green-500 flex justify-center items-center gap-2 mt-1">
//             <Phone className="text-mainheadingWhite" />
//             <span className="underline">+91 9909151572</span>
//           </p>

//           <p className="text-sm text-subheadingWhite">
//             Available Sunday - Saturday, from 00:00 to 23:59 (SGT)
//           </p>

//           <p className="text-center text-green-500 font-medium capitalize mt-1">
//             open now
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CallUsPage;

// import React from "react";
// import { Phone } from "lucide-react"; // MessageSquareMore was not used, so removed for cleanliness

// interface CallUsPageProps {}

// const CallUsPage: React.FC<CallUsPageProps> = () => {
//   // Define phone numbers and WhatsApp number for easy management
//   const whatsAppNumber = "8849498140"; // Assuming this is an Indian number for wa.me link
//   const whatsAppNumberInternational = `91${whatsAppNumber}`; // For wa.me link
//   const personalPhoneNumber = "+919909151572";
//   const personalPhoneNumberDisplay = "+91 9909151572";

//   return (
//     <div className="bg-background flex justify-center py-10 sm:py-16 px-4">
//       <div className="w-full max-w-xl space-y-10">
//         {/* 1. Main Title */}
//         <div className="text-center">
//           <h1 className="text-3xl sm:text-4xl font-bold text-mainheadingWhite">
//             Call <span className="text-primary">Us</span>
//           </h1>
//         </div>

//         {/* 3. Membership Number Box -> WhatsApp Number Box */}
//         <div className="bg-primarybox p-6 rounded-lg text-center">
//           <a
//             href={`https://wa.me/${whatsAppNumberInternational}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block text-2xl text-mainheadingWhite capitalize font-medium transition-colors duration-200"
//             aria-label={`Chat with us on WhatsApp at ${whatsAppNumber}`}
//           >
//             WhatsApp number: <span className="font-bold">{whatsAppNumber}</span>
//           </a>
//           <p className="text-sm text-subheadingWhite mt-1">
//             Click above to chat with us on WhatsApp.
//           </p>
//         </div>

//         {/* 4. Contact Information Block */}
//         <div className="text-center">
//           <p className="font-semibold text-mainheadingWhite">Personal</p>

//           <a
//             href={`tel:${personalPhoneNumber}`}
//             className="text-xl font-bold text-green-500 flex justify-center items-center gap-2 mt-1 hover:text-green-400 transition-colors duration-200"
//             aria-label={`Call us at ${personalPhoneNumberDisplay}`}
//           >
//             <Phone className="text-mainheadingWhite w-5 h-5 sm:w-6 sm:h-6" />
//             <span className="underline">{personalPhoneNumberDisplay}</span>
//           </a>

//           <p className="text-sm text-subheadingWhite mt-1">
//             Available Sunday - Saturday, from 10:00 to 22:00 (SGT)
//           </p>

//           <p className="text-center text-green-500 font-medium capitalize mt-1">
//             open now
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CallUsPage;

"use client";

import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";

interface CallUsPageProps {}

const CallUsPage: React.FC<CallUsPageProps> = () => {
  // Define phone numbers and WhatsApp number for easy management
  const whatsAppNumber = "8849498140";
  const whatsAppNumberInternational = `91${whatsAppNumber}`; // Assuming +91 for India
  const personalPhoneNumber = "+919909151572";
  const personalPhoneNumberDisplay = "+91 9909151572";

  // Availability hours in SGT (UTC+8)
  const openHourSGT = 9; // 10:00 SGT
  const closeHourSGT = 18; // 22:00 SGT (meaning open until 21:59:59 SGT)

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTimeSGT, setCurrentTimeSGT] = useState<string>(""); // Optional: for display/debug

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      try {
        // Get current hour in SGT
        const sgtTimeFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Singapore",
          hour: "numeric",
          hour12: false, // Use 24-hour format
        });
        const currentSgtHour = parseInt(sgtTimeFormatter.format(now), 10);

        // Optional: For debugging or displaying current SGT
        const fullSgtTimeFormatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Singapore",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setCurrentTimeSGT(fullSgtTimeFormatter.format(now));

        if (currentSgtHour >= openHourSGT && currentSgtHour < closeHourSGT) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } catch (error) {
        console.error(
          "Error determining SGT time. Defaulting to 'closed'.",
          error
        );
        // Fallback in case of error with Intl.DateTimeFormat (e.g., unsupported timezone string on very old browsers)
        setIsOpen(false);
        setCurrentTimeSGT("Error determining SGT");
      }
    };

    checkOpenStatus();

    // Optional: Set an interval to re-check status periodically if users might stay on the page for long
    // const intervalId = setInterval(checkOpenStatus, 60000); // Check every minute
    // return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="bg-background flex justify-center py-10 sm:py-16 px-4 min-h-screen">
      <div className="w-full max-w-xl space-y-6 sm:space-y-10">
        {/* 1. Main Title */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-mainheadingWhite">
            Call <span className="text-primary">Us</span>
          </h1>
        </div>

        {/* 3. WhatsApp Number Box */}
        <div className="bg-primarybox sm:p-6 p-4 rounded-lg text-center">
          <a
            href={`https://wa.me/${whatsAppNumberInternational}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block sm:text-2xl text-xl text-mainheadingWhite capitalize font-medium"
            aria-label={`Chat with us on WhatsApp at ${whatsAppNumber}`}
          >
            WhatsApp Number:{" "}
            <span className="font-bold hover:text-green-500 transition-all ease-linear duration-75">
              {whatsAppNumber}
            </span>
          </a>
          <p className="text-sm text-subheadingWhite mt-1">
            Click above to chat with us on WhatsApp.
          </p>
        </div>

        {/* 4. Contact Information Block */}
        <div className="text-center">
          <p className="font-semibold text-mainheadingWhite">Personal</p>

          <a
            href={`tel:${personalPhoneNumber}`}
            className="sm:text-xl text-lg font-bold text-green-500 flex justify-center items-center gap-2 mt-1 hover:text-green-400 transition-colors duration-200"
            aria-label={`Call us at ${personalPhoneNumberDisplay}`}
          >
            <Phone className="text-mainheadingWhite w-5 h-5 sm:w-6 sm:h-6" />
            <span className="underline">{personalPhoneNumberDisplay}</span>
          </a>

          <p className="text-sm text-subheadingWhite mt-1">
            Available Sunday - Saturday, from{" "}
            {String(openHourSGT).padStart(2, "0")}:00 to{" "}
            {String(closeHourSGT).padStart(2, "0")}:00 (SGT)
          </p>

          <p
            className={`text-center text-sm font-medium capitalize mt-1 ${
              isOpen ? "text-green-500" : "text-red-500"
            }`}
          >
            {isOpen ? "Open Now" : "Closed Now"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallUsPage;
