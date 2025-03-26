// // app/dashboard/beneficiaries/[recipientId]/page.tsx
// "use client";
// import React from "react";
// import { useParams } from "next/navigation";
// import { sampleRecipients, Recipient } from "@/app/data/transactions";
// import Image from "next/image";

// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId;

//   // Find the recipient based on recipientId
//   const recipient: Recipient | undefined = sampleRecipients.find(
//     (rec) => String(rec.id) === recipientId
//   );

//   if (!recipient) {
//     return <div>Recipient not found</div>; // Handle case where recipient is not found
//   }

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
//     <div className="RecipientDetailsPage py-10">
//       <div className="container mx-auto">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
//             <span className="font-bold text-2xl text-gray-700">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             {recipient.countryCode === "INR" && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 <Image
//                   src={"/assets/icon/inr.svg"}
//                   alt="inr flag"
//                   width={24}
//                   height={24}
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="text-3xl font-semibold text-main capitalize">
//             {recipient.accountHolderName}
//           </h2>
//           <div className="flex items-center gap-4">
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-secondary text-secondary bg-white cursor-pointer">
//               Send
//             </button>
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-red-700 text-red-700 bg-white cursor-pointer">
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="mb-6 pb-4">
//           <h3 className="text-gray text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-6">
//             Account Details
//           </h3>
//           <div className="grid grid-cols-2 gap-8">
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-main font-medium capitalize">
//                 {recipient.accountHolderName}
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Nickname
//               </label>
//               {/* Add Nickname Button */}
//               <div className="flex items-center gap-4">
//                 <p className="text-main font-medium hidden">{recipient.nickname}</p>
//                 <button className="cursor-pointer text-sm underline text-secondary font-medium">
//                   Add Nickname
//                 </button>
//               </div>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account type
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.accountType}
//               </p>{" "}
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main font-medium">{recipient.ifscCode}</p>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account number
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.accountNumber}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Email (Optional)
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.email || "-"}
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Bank name
//               </label>
//               <p className="mt-1 text-main font-medium">{recipient.bankName}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Address
//               </label>
//               <p className="mt-1 text-main font-medium">{recipient.address}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;




// app/dashboard/beneficiaries/[recipientId]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { sampleRecipients, Recipient } from "@/app/data/transactions";
import Image from "next/image";
import NicknamePopup from "../../components/NicknamePopup"; // Import the component
import { IoPencilOutline } from "react-icons/io5";

interface RecipientDetailsPageProps {
  params: { recipientId: string };
}

const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
  const params = useParams();
  const recipientId = params.recipientId;

  // State to hold the current recipient data (mutable for nickname update)
  const [currentRecipient, setCurrentRecipient] = useState<Recipient | undefined>(undefined);
  const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(""); // Initialize nicknameInput outside useEffect

  useEffect(() => {
    // Find the recipient based on recipientId
    const recipient: Recipient | undefined = sampleRecipients.find(
      (rec) => String(rec.id) === recipientId
    );
    setCurrentRecipient(recipient);

    // Initialize nicknameInput only after currentRecipient is set
    if (recipient) {
      setNicknameInput(recipient.nickname || "");
    } else {
      setNicknameInput(""); // Ensure nicknameInput is set even if recipient is not found
    }

  }, [recipientId]); // nicknameInput removed from dependency array


  if (!currentRecipient) {
    return <div>Recipient not found</div>; // Handle case where recipient is not found
  }

  const getInitials = (accountHolderName: string) => {
    const nameParts = accountHolderName.toUpperCase().split(" ");
    let initials = "";
    if (nameParts.length >= 2) {
      initials = nameParts[0][0] + nameParts[1][0];
    } else if (nameParts.length === 1) {
      initials = nameParts[0].slice(0, 2);
    }
    return initials;
  };


  const handleAddNicknameClick = () => {
    setNicknameInput(currentRecipient.nickname || ""); // Reset input to current nickname when opening
    setIsNicknamePopupOpen(true);
  };

  const handleCloseNicknamePopup = () => {
    setIsNicknamePopupOpen(false);
  };

  const handleSaveNickname = () => {
    // Find the index of the recipient in sampleRecipients
    const recipientIndex = sampleRecipients.findIndex(rec => String(rec.id) === recipientId);

    if (recipientIndex !== -1) {
      // Update the nickname in sampleRecipients (for demonstration)
      sampleRecipients[recipientIndex] = { ...sampleRecipients[recipientIndex], nickname: nicknameInput || undefined }; // Save as undefined if input is empty

      // Update the local state to re-render with the new nickname
      setCurrentRecipient({ ...currentRecipient, nickname: nicknameInput || undefined });
    }
    setIsNicknamePopupOpen(false);
  };

  return (
    <div className="RecipientDetailsPage py-10">
      <div className="container mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col mb-8 space-y-4">
          <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
            <span className="font-bold text-2xl text-gray-700">
              {getInitials(currentRecipient.accountHolderName)}
            </span>
            {currentRecipient.countryCode === "INR" && (
              <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
                <Image
                  src={"/assets/icon/inr.svg"}
                  alt="inr flag"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
          <h2 className="text-3xl font-semibold text-main capitalize">
            {currentRecipient.nickname || currentRecipient.accountHolderName}
          </h2>
          <div className="flex items-center gap-4">
            <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-secondary text-secondary bg-white cursor-pointer">
              Send
            </button>
            <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-red-700 text-red-700 bg-white cursor-pointer">
              Delete
            </button>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="mb-6 pb-4">
          <h3 className="text-gray text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-6">
            Account Details
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="">
              <label className="block text-sm font-medium text-gray">
                Account holder name
              </label>
              <p className="mt-1 text-main font-medium capitalize">
                {currentRecipient.accountHolderName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray">
                Nickname
              </label>
              {/* Nickname Display and Add/Edit Button */}
              <div className="flex items-center gap-4">
                {currentRecipient.nickname ? (
                  <div className="flex items-center gap-2">
                    <p className="text-main font-medium">{currentRecipient.nickname}</p>
                    <button
                      className="cursor-pointer text-sm underline text-secondary font-medium"
                      onClick={handleAddNicknameClick}
                    >
                      Edit
                    </button>
                  </div>

                ) : (
                  <button
                    className="cursor-pointer text-sm underline text-secondary font-medium"
                    onClick={handleAddNicknameClick}
                  >
                    Add Nickname
                  </button>
                )}
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray">
                Account type
              </label>
              <p className="mt-1 text-main font-medium">
                {currentRecipient.accountType}
              </p>{" "}
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray">
                IFSC code
              </label>
              <p className="mt-1 text-main font-medium">{currentRecipient.ifscCode}</p>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray">
                Account number
              </label>
              <p className="mt-1 text-main font-medium">
                {currentRecipient.accountNumber}
              </p>
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray">
                Email (Optional)
              </label>
              <p className="mt-1 text-main font-medium">
                {currentRecipient.email || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray">
                Bank name
              </label>
              <p className="mt-1 text-main font-medium">{currentRecipient.bankName}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray">
                Address
              </label>
              <p className="mt-1 text-main font-medium">{currentRecipient.address}</p>
            </div>
          </div>
        </div>

        {/* Nickname Popup Component */}
        <NicknamePopup
          isOpen={isNicknamePopupOpen}
          onClose={handleCloseNicknamePopup}
          title="Add nickname"
          description="Add a nickname so you can easily find this account."
        >
          <div className="mb-4">
            <label htmlFor="nickname" className="block text-sm font-semibold text-gray mb-1">
              Account nickname
            </label>
            <input
              type="text"
              id="nickname"
              className="bg-white text-main rounded-lg border border-lightborder focus:outline-none focus:ring-main focus:border-main block w-full py-3 px-4"
              placeholder="Enter nickname"
              maxLength={40}
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
            />
            <p className="mt-1 text-gray font-semibold text-xs">
              {nicknameInput.length}/40
            </p>
          </div>
          <button
            className="bg-primary text-secondary font-medium rounded-full px-6 py-3 text-center w-full mt-4"
            onClick={handleSaveNickname}
          >
            Save
          </button>
        </NicknamePopup>
      </div>
    </div>
  );
};

export default RecipientDetailsPage;




// // app/dashboard/beneficiaries/[recipientId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react"; // Import useEffect
// import { useParams } from "next/navigation";
// import { sampleRecipients as initialSampleRecipients, Recipient } from "@/app/data/transactions"; // Alias import
// import Image from "next/image";

// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// // Create a mutable version of sampleRecipients for local state management in this component
// let sampleRecipients = [...initialSampleRecipients];

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId;

//   // State to hold the recipient data, initialized from sampleRecipients
//   const [recipients, setRecipients] = useState<Recipient[]>(sampleRecipients);
//   const [recipient, setRecipient] = useState<Recipient | undefined>(() => {
//     return recipients.find((rec) => String(rec.id) === recipientId);
//   });

//   const [isEditingNickname, setIsEditingNickname] = useState(false);
//   const [editedNickname, setEditedNickname] = useState<string>(recipient?.accountHolderName.split(" ")[0] || "");

//   // Update recipient state when recipients state changes or recipientId changes (for route changes)
//   useEffect(() => {
//     setRecipient(recipients.find((rec) => String(rec.id) === recipientId));
//   }, [recipients, recipientId]);

//   if (!recipient) {
//     return <div>Recipient not found</div>; // Handle case where recipient is not found
//   }

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

//   const handleEditNickname = () => {
//     setIsEditingNickname(true);
//     setEditedNickname(recipient.accountHolderName.split(" ")[0] || ""); // Initialize with current nickname
//   };

//   const handleSaveNickname = () => {
//     // Find the index of the recipient to update in the recipients state
//     const recipientIndex = recipients.findIndex((rec) => String(rec.id) === recipientId);

//     if (recipientIndex !== -1) {
//       const updatedRecipients = [...recipients]; // Create a copy of the recipients array
//       const updatedRecipient = {
//         ...recipient, // Copy existing recipient data
//         accountHolderName: editedNickname + (recipient.accountHolderName.split(" ").length > 1 ? " " + recipient.accountHolderName.split(" ").slice(1).join(" ") : ""),
//       };
//       updatedRecipients[recipientIndex] = updatedRecipient;

//       // Update the recipients state, which will re-render the component
//       setRecipients(updatedRecipients);
//       setRecipient(updatedRecipient); // Update the single recipient state as well for immediate UI update
//       setIsEditingNickname(false);

//       // Optionally update the global sampleRecipients if you want changes to persist across page navigations within this example (not recommended for real apps)
//       sampleRecipients = updatedRecipients;
//     }
//   };

//   return (
//     <div className="RecipientDetailsPage py-10">
//       <div className="container mx-auto">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
//             <span className="font-bold text-2xl text-gray-700">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             {recipient.countryCode === "INR" && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 <Image
//                   src={"/assets/icon/inr.svg"}
//                   alt="inr flag"
//                   width={24}
//                   height={24}
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="text-3xl font-semibold text-main capitalize">
//             {recipient.accountHolderName.split(" ")[0]}
//           </h2>
//           <div className="flex items-center gap-4">
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-secondary text-secondary bg-white cursor-pointer">
//               Send
//             </button>
//             <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-red-700 text-red-700 bg-white cursor-pointer">
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="mb-6 pb-4">
//           <h3 className="text-gray text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-6">
//             Account Details
//           </h3>
//           <div className="grid grid-cols-2 gap-8">
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-main font-medium capitalize">
//                 {recipient.accountHolderName}
//               </p>
//             </div>
//             <div className="flex items-end gap-6">
//              <div>
//              <label className="block text-sm font-medium text-gray">
//                 Nickname
//               </label>
//               {isEditingNickname ? (
//                 <div className="relative mt-1">
//                   <input
//                     type="text"
//                     id="nickname"
//                     name="nickname"
//                     className="border-gray-300 py-1 focus:border-b-2 focus:border-secondary transition-colors focus:outline-none peer bg-inherit font-medium capitalize text-main"
//                     value={editedNickname}
//                     onChange={(e) => setEditedNickname(e.target.value)}
//                   />
//                 </div>
//               ) : (
//                 <p className="mt-1 text-main font-medium capitalize">
//                   {recipient.accountHolderName.split(" ")[0]}
//                 </p>
//               )}
//              </div>
//              {/* Edit Button */}
//               <div>
//                 {isEditingNickname ? (
//                   <button
//                     onClick={handleSaveNickname}
//                     className="cursor-pointer text-sm underline text-secondary font-medium"
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleEditNickname}
//                     className="cursor-pointer text-sm underline text-secondary font-medium"
//                   >
//                     Edit
//                   </button>
//                 )}
//               </div>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account type
//               </label>
//               <p className="mt-1 text-main font-medium">{recipient.accountType}</p>{" "}
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.ifscCode}
//               </p>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account number
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.accountNumber}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Email (Optional)
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.email || "-"}
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Bank name
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.bankName}
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Address
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {recipient.address}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;
