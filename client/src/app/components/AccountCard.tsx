// import React from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";

// // Types for our props
// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           <div className="relative">
//             <div className="p-5 bg-green/8 rounded-full flex items-center justify-center">
//               <FiUser className="size-6" />
//             </div>
//             {/* Camera Icon */}
//             <div className="absolute bottom-0 right-0 bg-lightgreen flex items-center justify-center size-6 rounded-full border-2 border-white">
//               <LiaCameraSolid  />
//             </div>
//           </div>
//         </div>

//         <h1 className="text-4xl font-black tracking-tighter text-center mb-2">
//           {username}
//         </h1>
//         <p className="text-center font-medium capitalize mb-6">
//           Your personal account
//         </p>
//       </div>
//       <div className="text-center my-5 flex justify-center items-center gap-1">
//         <span className="text-base text-gray">
//           Membership number:{" "}
//           <span className="hover:underline underline-offset-1">
//             {" "}
//             {membershipNumber}{" "}
//           </span>
//         </span>
//         <IoMdCopy className="text-gray" />
//       </div>

//       <div className="text-center">
//         <button className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium">
//           Log Out
//         </button>
//       </div>
//     </>
//   );
// };

// export default AccountCard;

"use client";

import React, { useState, useRef } from "react";
import { FiUser } from "react-icons/fi";
import { LiaCameraSolid } from "react-icons/lia";
import { IoMdCopy } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth"; // Import useAuth hook

// Types for our props
type AccountCardProps = {
  username: string;
  membershipNumber: string;
};

const AccountCard: React.FC<AccountCardProps> = ({
  username,
  membershipNumber,
}) => {
  const [copyConfirmation, setCopyConfirmation] = useState(false);
  const membershipNumberRef = useRef<HTMLSpanElement>(null); // Ref to the membership number span
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const { logout } = useAuth(); // Get logout function from useAuth

  const handleCopyClick = async () => {
    try {
      if (membershipNumberRef.current) {
        const membershipNumberText =
          membershipNumberRef.current.textContent || "";
        await navigator.clipboard.writeText(membershipNumberText); // Use ref to get text
        setCopyConfirmation(true);

        // Hide confirmation after a short delay
        setTimeout(() => {
          setCopyConfirmation(false);
        }, 2000); // Adjust duration as needed
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      // Optionally handle error (e.g., show a different error message)
    }
  };

  const handleLogout = () => {
    // Removed event parameter - button onClick doesn't need it directly
    logout(); // Call the logout function from AuthContext
    router.push("/auth/login"); // Redirect to login page after logout
  };

  return (
    <>
      <div className="bg-green/8 p-8 rounded-3xl">
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <div className="p-5 bg-green/8 rounded-full flex items-center justify-center">
              <FiUser className="size-6" />
            </div>
            {/* Camera Icon */}
            <div className="absolute bottom-0 right-0 bg-lightgreen flex items-center justify-center size-6 rounded-full border-2 border-white">
              <LiaCameraSolid />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-black tracking-tighter text-center mb-2">
          {username}
        </h1>
        <p className="text-center font-medium capitalize mb-6">
          Your personal account
        </p>
      </div>
      <div className="text-center my-5 flex justify-center items-center gap-1">
        <span className="text-base text-gray">
          Membership number:
          <span
            className="hover:underline underline-offset-1"
            ref={membershipNumberRef} // Attach the ref
          >
            {membershipNumber}
          </span>
        </span>
        <IoMdCopy
          className="text-gray cursor-pointer"
          onClick={handleCopyClick}
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleLogout}
          className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
        >
          Log Out
        </button>
      </div>
      {copyConfirmation && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
          Membership number copied!
        </div>
      )}
    </>
  );
};

export default AccountCard;

// "use client";
// import React, { useState } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { motion } from "framer-motion";

// // Types for our props
// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const Backdrop = ({
//   children,
//   onClick,
// }: {
//   children: React.ReactNode;
//   onClick: () => void;
// }) => {
//   return (
//     <motion.div
//       className="fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-md flex items-center justify-center"
//       onClick={onClick}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// const UploadModal = ({ onClose }: { onClose: () => void }) => {
//   return (
//     <motion.div
//       className="bg-white rounded-xl p-6 w-[min(90%,400px)]"
//       initial={{ opacity: 0, scale: 0.5 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.5 }}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Add a personal account photo</h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           X
//         </button>
//       </div>

//       <div className="bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center space-y-4">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="w-6 h-6 text-gray-500"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
//           />
//         </svg>
//         <p className="text-gray-700">
//           Drop your photo here to instantly upload it
//         </p>
//         <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full">
//           Select file
//         </button>
//       </div>

//       <p className="text-sm text-gray-500 mt-4">
//         It should be smaller than 2MB, and it should show your face. That way,
//         your friends and family will know it's you.
//       </p>

//       <div className="mt-6">
//         <button
//           onClick={onClose}
//           className="bg-white hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-full border w-full"
//         >
//           Cancel
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       {isModalOpen && (
//         <Backdrop onClick={closeModal}>
//           <UploadModal onClose={closeModal} />
//         </Backdrop>
//       )}

//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           <div className="relative">
//             <div className="p-5 bg-green/8 rounded-full flex items-center justify-center">
//               <FiUser className="size-6" />
//             </div>
//             {/* Camera Icon */}
//             <button
//               onClick={openModal}
//               className="absolute bottom-0 cursor-pointer right-0 bg-lightgreen flex items-center justify-center size-6 rounded-full border-2 border-white"
//             >
//               <LiaCameraSolid className="" />
//             </button>
//           </div>
//         </div>

//         <h1 className="text-4xl font-black tracking-tighter text-center mb-2">
//           {username}
//         </h1>
//         <p className="text-center font-medium capitalize mb-6">
//           Your personal account
//         </p>
//       </div>
//       <div className="text-center my-5 flex justify-center items-center gap-1">
//         <span className="text-base text-gray">
//           Membership number:{" "}
//           <span className="hover:underline underline-offset-1">
//             {" "}
//             {membershipNumber}{" "}
//           </span>
//         </span>
//         <IoMdCopy className="text-gray" />
//       </div>

//       <div className="text-center">
//         <button className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium">
//           Log Out
//         </button>
//       </div>
//     </>
//   );
// };

// export default AccountCard;
