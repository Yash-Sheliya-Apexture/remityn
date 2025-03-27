// // components/Filter/RecipientListItem.tsx
// "use client";
// import Image from "next/image";
// import React from "react";
// import { Recipient } from "../../data/transactions";

// interface RecipientListProps {
//   recipient: Recipient;
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {
//   const getInitials = (accountHolderName: string) => {
//     const nameParts = accountHolderName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 2) {
//       initials = nameParts[0][0] + nameParts[1][0];
//     } else if (nameParts.length === 1) {
//       initials = nameParts[0].slice(0, 2);
//     }
//     return initials;
//   };

//   return (
//     <div className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//       {/* Recipients List */}
//       <div className="flex items-center">
//         <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//           <span className="font-bold text-main">
//             {getInitials(recipient.accountHolderName)}
//           </span>
//           {recipient.countryCode === "INR" && (
//             <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//               <Image
//                 src={"/assets/icon/inr.svg"}
//                 alt="inr flag"
//                 width={20}
//                 height={20}
//               />
//             </div>
//           )}
//         </div>
//         <div className="ml-4">
//           <h5 className="font-medium text-main capitalize">
//             {recipient.accountHolderName}
//           </h5>
//           {recipient.accountNumber && (
//             <p className="text-sm text-gray-600">
//               {recipient.countryCode} Account ending in {recipient.accountNumber.slice(-4)}
//             </p>
//           )}
//         </div>
//       </div>
//       {/* Recipients List */}

//       {showCheckbox && (
//         <div className="pt-1.5">
//           <input
//             type="checkbox"
//             className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//             checked={isSelected}
//             onChange={(e) =>
//               onCheckboxChange && onCheckboxChange(recipient.id, e.target.checked)
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// }





// // Latest Updated Code
// // components/Filter/RecipientListItem.tsx
// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { Recipient } from "../../data/transactions";
// import { IoIosArrowForward } from "react-icons/io"; // Import the icon

// interface RecipientListProps {
//   recipient: Recipient;
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {
//   const getInitials = (accountHolderName: string) => {
//     const nameParts = accountHolderName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 2) {
//       initials = nameParts[0][0] + nameParts[1][0];
//     } else if (nameParts.length === 1) {
//       initials = nameParts[0].slice(0, 2);
//     }
//     return initials;
//   };

//   const checkboxRef = useRef<HTMLInputElement>(null);

//   const handleItemClick = () => {
//     if (showCheckbox && onCheckboxChange && checkboxRef.current) {
//       checkboxRef.current.click(); // Programmatically trigger checkbox click
//     }
//   };


//   const handleCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onCheckboxChange && onCheckboxChange(recipient.id, e.target.checked);
//   };

//   return (
//     <div
//       className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer"
//       onClick={handleItemClick}
//     >
//       <div className="flex items-center justify-between">
//         {/* Recipients List */}
//         <div className="flex items-center">
//           <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//             <span className="font-bold text-main">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             {recipient.countryCode === "INR" && (
//               <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                 <Image
//                   src={"/assets/icon/inr.svg"}
//                   alt="inr flag"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="ml-4">
//             <h5 className="font-medium text-main capitalize">
//               {recipient.accountHolderName}
//             </h5>
//             {recipient.accountNumber && (
//               <p className="text-sm text-gray-600">
//                 {recipient.countryCode} Account ending in {recipient.accountNumber.slice(-4)}
//               </p>
//             )}
//           </div>
//         </div>
//         {/* Recipients List */}

//         {showCheckbox ? ( // If showCheckbox is true, render checkbox
//           <div className="pt-1.5">
//             <input
//               ref={checkboxRef}
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={isSelected}
//               onChange={handleCheckboxInputChange}
//             />
//           </div>
//         ) : ( // If showCheckbox is false, render icon
//           <div className="">
//             <IoIosArrowForward className="h-5 w-5 text-gray-500" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }









// // components/Filter/RecipientListItem.tsx
// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { Recipient } from "../../data/transactions";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from 'next/navigation'; // Import useRouter

// interface RecipientListProps {
//   recipient: Recipient;
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {
//   const getInitials = (accountHolderName: string) => {
//     const nameParts = accountHolderName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 2) {
//       initials = nameParts[0][0] + nameParts[1][0];
//     } else if (nameParts.length === 1) {
//       initials = nameParts[0].slice(0, 2);
//     }
//     return initials;
//   };

//   const checkboxRef = useRef<HTMLInputElement>(null);
//   const router = useRouter(); // Initialize useRouter

//   const handleItemClick = () => {
//     if (!showCheckbox) {
//       router.push(`/dashboard/recipients/${recipient.id}`); // Navigate to recipient details page
//       return;
//     }
//     if (showCheckbox && onCheckboxChange && checkboxRef.current) {
//       checkboxRef.current.click(); // Programmatically trigger checkbox click
//     }
//   };


//   const handleCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onCheckboxChange && onCheckboxChange(recipient.id, e.target.checked);
//   };

//   return (
//     <div
//       className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer"
//       onClick={handleItemClick}
//     >
//       <div className="flex items-center justify-between">
//         {/* Recipients List */}
//         <div className="flex items-center">
//           <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//             <span className="font-bold text-main">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             {recipient.countryCode === "INR" && (
//               <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                 <Image
//                   src={"/assets/icon/inr.svg"}
//                   alt="inr flag"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="ml-4">
//             <h5 className="font-medium text-main capitalize">
//               {recipient.accountHolderName}
//             </h5>
//             {recipient.accountNumber && (
//               <p className="text-sm text-gray-600">
//                 {recipient.countryCode} Account ending in {recipient.accountNumber.slice(-4)}
//               </p>
//             )}
//           </div>
//         </div>
//         {/* Recipients List */}

//         {showCheckbox ? ( // If showCheckbox is true, render checkbox
//           <div className="pt-1.5">
//             <input
//               ref={checkboxRef}
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={isSelected}
//               onChange={handleCheckboxInputChange}
//             />
//           </div>
//         ) : ( // If showCheckbox is false, render icon
//           <div className="">
//             <IoIosArrowForward className="h-5 w-5 text-gray-500" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// frontend/src/app/dashboard/components/RecipientList.tsx
"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/navigation';

interface RecipientListProps {
  recipient: any; // Type this properly with your Recipient type from backend if possible
  isSelected: boolean;
  onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
  showCheckbox?: boolean;
}

export default function RecipientList({
  recipient,
  isSelected,
  onCheckboxChange,
  showCheckbox = true,
}: RecipientListProps) {
  const getInitials = (accountHolderName: string) => {
    const trimmedName = accountHolderName.trim(); // Trim leading/trailing spaces
    const nameParts = trimmedName.toUpperCase().split(" ");
    let initials = "";
    if (nameParts.length >= 1 && nameParts[0] !== "") { // Ensure there's a word after trimming
      initials += nameParts[0][0]; // First letter of the first word
      if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") { // Ensure there's a last word after trimming
        initials += nameParts[nameParts.length - 1][0]; // First letter of the last word
      }
    }
    return initials;
  };

  const checkboxRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleItemClick = () => {
    if (!showCheckbox) {
      router.push(`/dashboard/recipients/${recipient._id}`); // Navigate to recipient details page using _id from backend
      return;
    }
    if (showCheckbox && onCheckboxChange && checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  const handleCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange && onCheckboxChange(recipient._id, e.target.checked); // Use recipient._id
  };

  return (
    <div
      className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer"
      onClick={handleItemClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
            <span className="font-bold text-main">
              {getInitials(recipient.accountHolderName)}
            </span>
            {recipient.currency.code === "INR" && ( // Access currency code from populated object
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
                <Image
                  src={`/assets/icon/${recipient.currency.code.toLowerCase()}.svg`} // Use dynamic icon path
                  alt={`${recipient.currency.code} flag`}
                  width={20}
                  height={20}
                  onError={() => console.error(`Error loading image for ${recipient.currency.code}`)}
                />
              </div>
            )}
          </div>
          <div className="ml-4">
            <h5 className="font-medium text-main capitalize">
              {recipient.accountHolderName}
            </h5>
            {recipient.accountNumber && (
              <p className="text-sm text-gray-600">
                {recipient.currency.code} Account ending in {recipient.accountNumber.slice(-4)} {/* Use dynamic currency code */}
              </p>
            )}
          </div>
        </div>

        {showCheckbox ? (
          <div className="pt-1.5">
            <input
              ref={checkboxRef}
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
              checked={isSelected}
              onChange={handleCheckboxInputChange}
            />
          </div>
        ) : (
          <div className="">
            <IoIosArrowForward className="h-5 w-5 text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}