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

// // app/dashboard/beneficiaries/[recipientId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { sampleRecipients, Recipient } from "@/app/data/transactions";
// import Image from "next/image";
// import NicknamePopup from "../../components/NicknamePopup"; // Import the component
// import { IoPencilOutline } from "react-icons/io5";

// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId;

//   // State to hold the current recipient data (mutable for nickname update)
//   const [currentRecipient, setCurrentRecipient] = useState<Recipient | undefined>(undefined);
//   const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState(""); // Initialize nicknameInput outside useEffect

//   useEffect(() => {
//     // Find the recipient based on recipientId
//     const recipient: Recipient | undefined = sampleRecipients.find(
//       (rec) => String(rec.id) === recipientId
//     );
//     setCurrentRecipient(recipient);

//     // Initialize nicknameInput only after currentRecipient is set
//     if (recipient) {
//       setNicknameInput(recipient.nickname || "");
//     } else {
//       setNicknameInput(""); // Ensure nicknameInput is set even if recipient is not found
//     }

//   }, [recipientId]); // nicknameInput removed from dependency array

//   if (!currentRecipient) {
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

//   const handleAddNicknameClick = () => {
//     setNicknameInput(currentRecipient.nickname || ""); // Reset input to current nickname when opening
//     setIsNicknamePopupOpen(true);
//   };

//   const handleCloseNicknamePopup = () => {
//     setIsNicknamePopupOpen(false);
//   };

//   const handleSaveNickname = () => {
//     // Find the index of the recipient in sampleRecipients
//     const recipientIndex = sampleRecipients.findIndex(rec => String(rec.id) === recipientId);

//     if (recipientIndex !== -1) {
//       // Update the nickname in sampleRecipients (for demonstration)
//       sampleRecipients[recipientIndex] = { ...sampleRecipients[recipientIndex], nickname: nicknameInput || undefined }; // Save as undefined if input is empty

//       // Update the local state to re-render with the new nickname
//       setCurrentRecipient({ ...currentRecipient, nickname: nicknameInput || undefined });
//     }
//     setIsNicknamePopupOpen(false);
//   };

//   return (
//     <div className="RecipientDetailsPage py-10">
//       <div className="container mx-auto">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
//             <span className="font-bold text-2xl text-gray-700">
//               {getInitials(currentRecipient.accountHolderName)}
//             </span>
//             {currentRecipient.countryCode === "INR" && (
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
//             {currentRecipient.nickname || currentRecipient.accountHolderName}
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
//                 {currentRecipient.accountHolderName}
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Nickname
//               </label>
//               {/* Nickname Display and Add/Edit Button */}
//               <div className="flex items-center gap-4">
//                 {currentRecipient.nickname ? (
//                   <div className="flex items-center gap-2">
//                     <p className="text-main font-medium">{currentRecipient.nickname}</p>
//                     <button
//                       className="cursor-pointer text-sm underline text-secondary font-medium"
//                       onClick={handleAddNicknameClick}
//                     >
//                       Edit
//                     </button>
//                   </div>

//                 ) : (
//                   <button
//                     className="cursor-pointer text-sm underline text-secondary font-medium"
//                     onClick={handleAddNicknameClick}
//                   >
//                     Add Nickname
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account type
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.accountType}
//               </p>{" "}
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.ifscCode}</p>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account number
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.accountNumber}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Email (Optional)
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.email || "-"}
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Bank name
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.bankName}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Address
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.address}</p>
//             </div>
//           </div>
//         </div>

//         {/* Nickname Popup Component */}
//         <NicknamePopup
//           isOpen={isNicknamePopupOpen}
//           onClose={handleCloseNicknamePopup}
//           title="Add nickname"
//           description="Add a nickname so you can easily find this account."
//         >
//           <div className="mb-4">
//             <label htmlFor="nickname" className="block text-sm font-semibold text-gray mb-1">
//               Account nickname
//             </label>
//             <input
//               type="text"
//               id="nickname"
//               className="bg-white text-main rounded-lg border border-lightborder focus:outline-none focus:ring-main focus:border-main block w-full py-3 px-4"
//               placeholder="Enter nickname"
//               maxLength={40}
//               value={nicknameInput}
//               onChange={(e) => setNicknameInput(e.target.value)}
//             />
//             <p className="mt-1 text-gray font-semibold text-xs">
//               {nicknameInput.length}/40
//             </p>
//           </div>
//           <button
//             className="bg-primary text-secondary font-medium rounded-full px-6 py-3 text-center w-full mt-4"
//             onClick={handleSaveNickname}
//           >
//             Save
//           </button>
//         </NicknamePopup>
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;

// // frontend/src/app/dashboard/recipients/[recipientId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
// import { IoPencilOutline } from "react-icons/io5";
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// // import DashboardHeader from '@/components/layout/DashboardHeader';

// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId;
//   const { token } = useAuth();

//   const [currentRecipient, setCurrentRecipient] = useState<any | null>(null); // Use 'any' for now, refine type later
//   const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState("");
//   const [loadingRecipient, setLoadingRecipient] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRecipientDetails = async () => {
//       setLoadingRecipient(true);
//       setError(null);
//       try {
//         const data = await recipientService.getRecipientById(recipientId, token);
//         setCurrentRecipient(data);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load recipient details.');
//         console.error("Error fetching recipient details:", err);
//       } finally {
//         setLoadingRecipient(false);
//       }
//     };

//     if (token && recipientId) {
//       fetchRecipientDetails();
//     }
//   }, [token, recipientId]);

//   if (loadingRecipient) {
//     return <div className="RecipientDetailsPage py-10"><div className="container mx-auto">Loading recipient details...</div></div>;
//   }

//   if (error || !currentRecipient) {
//     return <div className="RecipientDetailsPage py-10"><div className="container mx-auto text-red-500">Error loading recipient: {error || 'Recipient not found.'}</div></div>;
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

//   const handleAddNicknameClick = () => {
//     setNicknameInput(currentRecipient.nickname || "");
//     setIsNicknamePopupOpen(true);
//   };

//   const handleCloseNicknamePopup = () => {
//     setIsNicknamePopupOpen(false);
//   };

//   const handleSaveNickname = async () => {
//     try {
//       const updatedRecipient = await recipientService.updateRecipient(recipientId, { nickname: nicknameInput }, token);
//       setCurrentRecipient(updatedRecipient); // Update local state with updated recipient
//     } catch (err: any) {
//       setError(err.message || 'Failed to update nickname.');
//       console.error("Error updating nickname:", err);
//     }
//     setIsNicknamePopupOpen(false);
//   };

//   return (
//     <div className="RecipientDetailsPage py-10">
//       {/* <DashboardHeader title="Recipients" /> */}
//       <div className="container mx-auto px-4 max-w-2xl">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
//             <span className="font-bold text-2xl text-gray-700">
//               {getInitials(currentRecipient.accountHolderName)}
//             </span>
//             {currentRecipient.currency.code === "INR" && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 <Image
//                   src={`/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
//                   alt={`${currentRecipient.currency.code} flag`}
//                   width={24}
//                   height={24}
//                   onError={() => console.error(`Error loading image for ${currentRecipient.currency.code}`)}
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="text-3xl font-semibold text-main capitalize">
//             {currentRecipient.nickname || currentRecipient.accountHolderName}
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
//                 {currentRecipient.accountHolderName}
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Nickname
//               </label>
//               <div className="flex items-center gap-4">
//                 {currentRecipient.nickname ? (
//                   <div className="flex items-center gap-2">
//                     <p className="text-main font-medium">{currentRecipient.nickname}</p>
//                     <button
//                       className="cursor-pointer text-sm underline text-secondary font-medium"
//                       onClick={handleAddNicknameClick}
//                     >
//                       Edit
//                     </button>
//                   </div>

//                 ) : (
//                   <button
//                     className="cursor-pointer text-sm underline text-secondary font-medium"
//                     onClick={handleAddNicknameClick}
//                   >
//                     Add Nickname
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account type
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.accountType || "N/A"}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.ifscCode}</p>
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Account number
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.accountNumber}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-medium text-gray">
//                 Email (Optional)
//               </label>
//               <p className="mt-1 text-main font-medium">
//                 {currentRecipient.email || "-"}
//               </p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Bank name
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.bankName || "N/A"}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray">
//                 Address
//               </label>
//               <p className="mt-1 text-main font-medium">{currentRecipient.address || "N/A"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Nickname Popup Component */}
//         <NicknamePopup
//           isOpen={isNicknamePopupOpen}
//           onClose={handleCloseNicknamePopup}
//           title="Add nickname"
//           description="Add a nickname so you can easily find this account."
//         >
//           <div className="mb-4">
//             <label htmlFor="nickname" className="block text-sm font-semibold text-gray mb-1">
//               Account nickname
//             </label>
//             <input
//               type="text"
//               id="nickname"
//               className="bg-white text-main rounded-lg border border-lightborder focus:outline-none focus:ring-main focus:border-main block w-full py-3 px-4"
//               placeholder="Enter nickname"
//               maxLength={40}
//               value={nicknameInput}
//               onChange={(e) => setNicknameInput(e.target.value)}
//             />
//             <p className="mt-1 text-gray font-semibold text-xs">
//               {nicknameInput.length}/40
//             </p>
//           </div>
//           <button
//             className="bg-primary text-secondary font-medium rounded-full px-6 py-3 text-center w-full mt-4"
//             onClick={handleSaveNickname}
//           >
//             Save
//           </button>
//         </NicknamePopup>
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;

// // frontend/src/app/dashboard/recipients/[recipientId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
// import { useAuth } from '../../../hooks/useAuth';
// import recipientService from '../../../services/recipient';
// import DashboardHeader from '../../../components/layout/DashboardHeader';
// import DeleteRecipientModal from "@/app/dashboard/components/DeleteRecipientModal"; // Import DeleteRecipientModal

// interface RecipientDetailsPageProps {
//     params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//     const params = useParams();
//     const recipientId = params.recipientId;
//     const { token } = useAuth();
//     const router = useRouter();

//     const [currentRecipient, setCurrentRecipient] = useState<any | null>(null);
//     const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//     const [nicknameInput, setNicknameInput] = useState("");
//     const [loadingRecipient, setLoadingRecipient] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal

//     useEffect(() => {
//         const fetchRecipientDetails = async () => {
//             setLoadingRecipient(true);
//             setError(null);
//             try {
//                 const data = await recipientService.getRecipientById(recipientId, token);
//                 setCurrentRecipient(data);
//             } catch (err: any) {
//                 setError(err.message || 'Failed to load recipient details.');
//                 console.error("Error fetching recipient details:", err);
//             } finally {
//                 setLoadingRecipient(false);
//             }
//         };

//         if (token && recipientId) {
//             fetchRecipientDetails();
//         }
//     }, [token, recipientId]);

//     if (loadingRecipient) {
//         return <div className="RecipientDetailsPage py-10"><div className="container mx-auto">Loading recipient details...</div></div>;
//     }

//     if (error || !currentRecipient) {
//         return <div className="RecipientDetailsPage py-10"><div className="container mx-auto text-red-500">Error loading recipient: {error || 'Recipient not found.'}</div></div>;
//     }

//     const getInitials = (accountHolderName: string) => {
//         const nameParts = accountHolderName.toUpperCase().split(" ");
//         let initials = "";
//         if (nameParts.length >= 2) {
//             initials = nameParts[0][0] + nameParts[1][0];
//         } else if (nameParts.length === 1) {
//             initials = nameParts[0].slice(0, 2);
//         }
//         return initials;
//     };

//     const handleAddNicknameClick = () => {
//         setNicknameInput(currentRecipient.nickname || "");
//         setIsNicknamePopupOpen(true);
//     };

//     const handleCloseNicknamePopup = () => {
//         setIsNicknamePopupOpen(false);
//     };

//     const handleSaveNickname = async () => {
//         try {
//             const updatedRecipient = await recipientService.updateRecipient(recipientId, { nickname: nicknameInput }, token);
//             setCurrentRecipient(updatedRecipient);
//         } catch (err: any) {
//             setError(err.message || 'Failed to update nickname.');
//             console.error("Error updating nickname:", err);
//         }
//         setIsNicknamePopupOpen(false);
//     };

//     const handleDeleteRecipientClick = () => {
//         setIsDeleteModalOpen(true); // Open delete confirmation modal
//     };

//     const handleCancelDeleteRecipient = () => {
//         setIsDeleteModalOpen(false); // Close delete confirmation modal
//     };

//     const handleConfirmDeleteRecipient = async () => {
//         setIsDeleteModalOpen(false); // Close modal after initiating delete
//         setLoadingRecipient(true); // Start loading state during deletion
//         setError(null); // Clear any previous errors
//         try {
//             await recipientService.deleteRecipient(recipientId, token);
//             router.push('/dashboard/recipients'); // Redirect to recipients list after successful deletion
//         } catch (err: any) {
//             setError(err.message || 'Failed to delete recipient.');
//             console.error("Error deleting recipient:", err);
//             setLoadingRecipient(false); // Stop loading state in case of error
//         }
//     };

//     return (
//         <div className="RecipientDetailsPage py-10">
//             <DashboardHeader title="Recipients" />
//             <div className="container mx-auto px-4 max-w-2xl">
//                 {/* Profile Section */}
//                 <div className="flex flex-col mb-8 space-y-4">
//                     <div className="relative w-20 h-20 rounded-full bg-lightborder flex items-center justify-center">
//                         <span className="font-bold text-2xl text-gray-700">
//                             {getInitials(currentRecipient.accountHolderName)}
//                         </span>
//                         {currentRecipient.currency.code === "INR" && (
//                             <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                                 <Image
//                                     src={`/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
//                                     alt={`${currentRecipient.currency.code} flag`}
//                                     width={24}
//                                     height={24}
//                                     onError={() => console.error(`Error loading image for ${currentRecipient.currency.code}`)}
//                                 />
//                             </div>
//                         )}
//                     </div>
//                     <h2 className="text-3xl font-semibold text-main capitalize">
//                         {currentRecipient.nickname || currentRecipient.accountHolderName}
//                     </h2>
//                     <div className="flex items-center gap-4">
//                         <button className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-secondary text-secondary bg-white cursor-pointer">
//                             Send
//                         </button>
//                         <button
//                             className="font-medium border rounded-full w-32 h-10 flex items-center justify-center border-red-700 text-red-700 bg-white cursor-pointer"
//                             onClick={handleDeleteRecipientClick} // Open delete modal on click
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 </div>

//                 {/* Account Details Section */}
//                 <div className="mb-6 pb-4">
//                     <h3 className="text-gray text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1 mb-6">
//                         Account Details
//                     </h3>
//                     <div className="grid grid-cols-2 gap-8">
//                         {/* ... (rest of Account Details section remains the same) */}
//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 Account holder name
//                             </label>
//                             <p className="mt-1 text-main font-medium capitalize">
//                                 {currentRecipient.accountHolderName}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray">
//                                 Nickname
//                             </label>
//                             <div className="flex items-center gap-4">
//                                 {currentRecipient.nickname ? (
//                                     <div className="flex items-center gap-2">
//                                         <p className="text-main font-medium">{currentRecipient.nickname}</p>
//                                         <button
//                                             className="cursor-pointer text-sm underline text-secondary font-medium"
//                                             onClick={handleAddNicknameClick}
//                                         >
//                                             Edit
//                                         </button>
//                                     </div>

//                                 ) : (
//                                     <button
//                                         className="cursor-pointer text-sm underline text-secondary font-medium"
//                                         onClick={handleAddNicknameClick}
//                                     >
//                                         Add Nickname
//                                     </button>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 Account type
//                             </label>
//                             <p className="mt-1 text-main font-medium">
//                                 {currentRecipient.accountType || "N/A"}
//                             </p>
//                         </div>
//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 IFSC code
//                             </label>
//                             <p className="mt-1 text-main font-medium">{currentRecipient.ifscCode}</p>
//                         </div>

//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 Account number
//                             </label>
//                             <p className="mt-1 text-main font-medium">
//                                 {currentRecipient.accountNumber}
//                             </p>
//                         </div>
//                         <div className="">
//                             <label className="block text-sm font-medium text-gray">
//                                 Email (Optional)
//                             </label>
//                             <p className="mt-1 text-main font-medium">
//                                 {currentRecipient.email || "-"}
//                             </p>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray">
//                                 Bank name
//                             </label>
//                             <p className="mt-1 text-main font-medium">{currentRecipient.bankName || "N/A"}</p>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray">
//                                 Address
//                             </label>
//                             <p className="mt-1 text-main font-medium">{currentRecipient.address || "N/A"}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Nickname Popup Component */}
//                 <NicknamePopup
//                     isOpen={isNicknamePopupOpen}
//                     onClose={handleCloseNicknamePopup}
//                     title="Add nickname"
//                     description="Add a nickname so you can easily find this account."
//                 >
//                     <div className="mb-4">
//                         <label htmlFor="nickname" className="block text-sm font-semibold text-gray mb-1">
//                             Account nickname
//                         </label>
//                         <input
//                             type="text"
//                             id="nickname"
//                             className="bg-white text-main rounded-lg border border-lightborder focus:outline-none focus:ring-main focus:border-main block w-full py-3 px-4"
//                             placeholder="Enter nickname"
//                             maxLength={40}
//                             value={nicknameInput}
//                             onChange={(e) => setNicknameInput(e.target.value)}
//                         />
//                         <p className="mt-1 text-gray font-semibold text-xs">
//                             {nicknameInput.length}/40
//                         </p>
//                     </div>
//                     <button
//                         className="bg-primary text-secondary font-medium rounded-full px-6 py-3 text-center w-full mt-4"
//                         onClick={handleSaveNickname}
//                     >
//                         Save
//                     </button>
//                 </NicknamePopup>

//                 {/* Delete Recipient Modal */}
//                 <DeleteRecipientModal
//                     isOpen={isDeleteModalOpen}
//                     onClose={handleCancelDeleteRecipient}
//                     recipientName={currentRecipient.accountHolderName}
//                     onConfirmDelete={handleConfirmDeleteRecipient}
//                 />
//             </div>
//         </div>
//     );
// };

// export default RecipientDetailsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
// import { useAuth } from "../../../hooks/useAuth";
// import recipientService from "../../../services/recipient";
// import DashboardHeader from "../../../components/layout/DashboardHeader";
// import DeleteRecipientModal from "@/app/dashboard/components/DeleteRecipientModal";

// interface RecipientDetailsPageProps {
//   params: { recipientId: string };
// }

// const RecipientDetailsPage: React.FC<RecipientDetailsPageProps> = () => {
//   const params = useParams();
//   const recipientId = params.recipientId;
//   const { token } = useAuth();
//   const router = useRouter();

//   const [currentRecipient, setCurrentRecipient] = useState<any | null>(null);
//   const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState("");
//   const [loadingRecipient, setLoadingRecipient] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchRecipientDetails = async () => {
//       setLoadingRecipient(true);
//       setError(null);
//       try {
//         const data = await recipientService.getRecipientById(
//           recipientId,
//           token
//         );
//         setCurrentRecipient(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load recipient details.");
//         console.error("Error fetching recipient details:", err);
//       } finally {
//         setLoadingRecipient(false);
//       }
//     };

//     if (token && recipientId) {
//       fetchRecipientDetails();
//     }
//   }, [token, recipientId]);

//   if (loadingRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <div className="container mx-auto">Loading recipient details...</div>
//       </div>
//     );
//   }

//   if (error || !currentRecipient) {
//     return (
//       <div className="RecipientDetailsPage py-10">
//         <div className="container mx-auto text-red-500">
//           Error loading recipient: {error || "Recipient not found."}
//         </div>
//       </div>
//     );
//   }

//   const getInitials = (accountHolderName: string) => {
//     const trimmedName = accountHolderName.trim(); // Trim leading/trailing spaces
//     const nameParts = trimmedName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 1 && nameParts[0] !== "") { // Ensure there's a word after trimming
//       initials += nameParts[0][0]; // First letter of the first word
//       if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") { // Ensure there's a last word after trimming
//         initials += nameParts[nameParts.length - 1][0]; // First letter of the last word
//       }
//     }
//     return initials;
//   };

//   const handleAddNicknameClick = () => {
//     setNicknameInput(currentRecipient.nickname || "");
//     setIsNicknamePopupOpen(true);
//   };

//   const handleCloseNicknamePopup = () => {
//     setIsNicknamePopupOpen(false);
//   };

//   const handleSaveNickname = async () => {
//     try {
//       const updatedRecipient = await recipientService.updateRecipient(
//         recipientId,
//         { nickname: nicknameInput },
//         token
//       );
//       setCurrentRecipient(updatedRecipient);
//     } catch (err: any) {
//       setError(err.message || "Failed to update nickname.");
//       console.error("Error updating nickname:", err);
//     }
//     setIsNicknamePopupOpen(false);
//   };

//   const handleDeleteRecipientClick = () => {
//     setIsDeleteModalOpen(true);
//   };

//   const handleCancelDeleteRecipient = () => {
//     setIsDeleteModalOpen(false);
//   };

//   const handleConfirmDeleteRecipient = async () => {
//     setIsDeleteModalOpen(false);
//     setLoadingRecipient(true);
//     setError(null);
//     try {
//       await recipientService.deleteRecipient(recipientId, token);
//       router.push("/dashboard/recipients");
//     } catch (err: any) {
//       setError(err.message || "Failed to delete recipient.");
//       console.error("Error deleting recipient:", err);
//       setLoadingRecipient(false);
//     }
//   };

//   return (
//     <div className="RecipientDetailsPage py-10">
//       <DashboardHeader title="Recipients" />
//       <div className="container mx-auto">
//         {/* Profile Section */}
//         <div className="flex flex-col mb-8 space-y-4">
//           <div className="relative w-20 h-20 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
//             <span className="font-bold text-2xl text-neutral-900 dark:text-white">
//               {getInitials(
//                 currentRecipient.nickname || currentRecipient.accountHolderName
//               )}
//             </span>
//             {currentRecipient.currency.code === "INR" && (
//               <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
//                 <Image
//                   src={`/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
//                   alt={`${currentRecipient.currency.code} flag`}
//                   width={24}
//                   height={24}
//                   onError={() =>
//                     console.error(
//                       `Error loading image for ${currentRecipient.currency.code}`
//                     )
//                   }
//                 />
//               </div>
//             )}
//           </div>
//           <h2 className="sm:text-[26px] text-xl font-semibold text-mainheading dark:text-white">
//             {currentRecipient.nickname || currentRecipient.accountHolderName}
//           </h2>
//           <div className="flex items-center gap-4">
//             <button className="font-medium bg-primary text-neutral-900 rounded-full w-32 h-10 flex items-center justify-center cursor-pointer">
//               Send
//             </button>
//             <button
//               className="font-medium bg-red-600 text-white rounded-full w-32 h-10 flex items-center justify-center cursor-pointer"
//               onClick={handleDeleteRecipientClick}
//             >
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Account Details Section */}
//         <div className="mb-6 pb-4">
//           <h3 className="text-lg font-medium text-gray-600 dark:text-white mb-6 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//             Account Details
//           </h3>
//           <div className="grid sm:grid-cols-2 gap-8 mb-8">
//             <div className="">
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account holder name
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.accountHolderName}
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Nickname
//               </label>
//               <div className="flex items-center gap-4 mt-1">
//                 {currentRecipient.nickname ? (
//                   <div className="flex items-center gap-2">
//                     <p className="text-main dark:text-gray-300">
//                       {currentRecipient.nickname}
//                     </p>
//                     <button
//                       className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary"
//                       onClick={handleAddNicknameClick}
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary"
//                     onClick={handleAddNicknameClick}
//                   >
//                     Add Nickname
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="">
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account type
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.accountType}
//               </p>
//             </div>
//             <div className="">
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 IFSC code
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.ifscCode}
//               </p>
//             </div>

//             <div className="">
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Account number
//               </label>
//               <p className="mt-1 text-main dark:text-gray-300">
//                 {currentRecipient.accountNumber}
//               </p>
//             </div>
//             {currentRecipient.email && (
//               <div className="">
//                 <label className="block text-sm font-semibold text-gray dark:text-white">
//                   Email (Optional)
//                 </label>
//                 <p className="mt-1 text-main dark:text-gray-300">
//                   {currentRecipient.email}
//                 </p>
//               </div>
//             )}
//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Bank name
//               </label>
//               {currentRecipient.bankName && ( // Conditionally render if bankName exists
//                 <p className="mt-1 text-main dark:text-gray-300">
//                   {currentRecipient.bankName}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray dark:text-white">
//                 Address
//               </label>
//               {currentRecipient.address && ( // Conditionally render if address exists
//                 <p className="mt-1 text-main dark:text-gray-300">
//                   {currentRecipient.address}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Nickname Popup Component */}
//         <NicknamePopup
//           isOpen={isNicknamePopupOpen}
//           onClose={handleCloseNicknamePopup}
//           title="Add nickname"
//           description="Add a nickname so you can easily find this account."
//         >
//           <div className="mb-4">
//             <label
//               htmlFor="nickname"
//               className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//             >
//               Account nickname
//             </label>
//             <input
//               type="text"
//               id="nickname"
//               className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//               placeholder="Enter nickname"
//               maxLength={40}
//               value={nicknameInput}
//               onChange={(e) => setNicknameInput(e.target.value)}
//             />
//             <p className="mt-2 text-gray dark:text-gray-300 font-semibold text-xs">
//               {nicknameInput.length}/40
//             </p>
//           </div>
//           <button
//             className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//             onClick={handleSaveNickname}
//           >
//             Save
//           </button>
//         </NicknamePopup>

//         {/* Delete Recipient Modal */}
//         <DeleteRecipientModal
//           isOpen={isDeleteModalOpen}
//           onClose={handleCancelDeleteRecipient}
//           recipientName={currentRecipient.accountHolderName}
//           onConfirmDelete={handleConfirmDeleteRecipient}
//         />
//       </div>
//     </div>
//   );
// };

// export default RecipientDetailsPage;




"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import NicknamePopup from "@/app/dashboard/components/NicknamePopup";
import { useAuth } from "../../../hooks/useAuth"; // Adjust path if needed
import recipientService from "../../../services/recipient"; // Adjust path if needed
import DashboardHeader from "../../../components/layout/DashboardHeader"; // Adjust path if needed
import DeleteRecipientModal from "@/app/dashboard/components/DeleteRecipientModal";

// Change the component definition to not expect props directly
const RecipientDetailsPage: React.FC = () => {
  // Use useParams hook inside the client component
  const params = useParams();
  // Ensure recipientId is treated as a string (useParams can return string | string[])
  const recipientId = typeof params.recipientId === 'string' ? params.recipientId : undefined;
  const { token } = useAuth();
  const router = useRouter();

  const [currentRecipient, setCurrentRecipient] = useState<any | null>(null);
  const [isNicknamePopupOpen, setIsNicknamePopupOpen] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");
  const [loadingRecipient, setLoadingRecipient] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipientDetails = async () => {
      // Check if recipientId is valid before fetching
      if (!recipientId) {
          setError("Recipient ID is missing or invalid.");
          setLoadingRecipient(false);
          return;
      }
      setLoadingRecipient(true);
      setError(null);
      try {
        const data = await recipientService.getRecipientById(
          recipientId,
          token
        );
        setCurrentRecipient(data);
      } catch (err: any) {
        setError(err.message || "Failed to load recipient details.");
        console.error("Error fetching recipient details:", err);
      } finally {
        setLoadingRecipient(false);
      }
    };

    // Add recipientId as a dependency and check its existence
    if (token && recipientId) {
      fetchRecipientDetails();
    } else if (!recipientId && !loadingRecipient) {
        // Handle the case where recipientId might become undefined after initial load
        // or wasn't available initially
        setError("Recipient ID is missing.");
    }
    // Add recipientId to dependency array
  }, [token, recipientId, loadingRecipient]); // Added loadingRecipient to prevent potential loops if ID changes

  // Add a specific check for missing recipientId before loading state
  if (!recipientId && !loadingRecipient && !error) {
      return (
          <div className="RecipientDetailsPage py-10">
              <div className="container mx-auto text-red-500">
                  Error: Recipient ID not found in URL.
              </div>
          </div>
      );
  }

  if (loadingRecipient) {
    return (
      <div className="RecipientDetailsPage py-10">
        {/* Consider adding DashboardHeader here too for consistency */}
        {/* <DashboardHeader title="Recipients" /> */}
        <div className="container mx-auto">Loading recipient details...</div>
      </div>
    );
  }

  if (error || !currentRecipient) {
    return (
      <div className="RecipientDetailsPage py-10">
         <DashboardHeader title="Recipients" />
        <div className="container mx-auto text-red-500">
          Error loading recipient: {error || "Recipient not found."}
        </div>
      </div>
    );
  }

  // --- Rest of your component logic remains the same ---

  const getInitials = (accountHolderName: string) => {
    // ... (keep existing implementation)
    const trimmedName = accountHolderName?.trim() ?? ''; // Add nullish coalescing for safety
    if (!trimmedName) return ''; // Handle empty/null names
    const nameParts = trimmedName.toUpperCase().split(" ");
    let initials = "";
    if (nameParts.length >= 1 && nameParts[0] !== "") {
      initials += nameParts[0][0];
      if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") {
        initials += nameParts[nameParts.length - 1][0];
      } else if (initials.length === 1 && nameParts[0].length > 1) {
        // Fallback for single long word names like "Username" -> "U"
        // You might want "US" - depends on preference. Let's keep it simple for now.
      }
    }
    return initials;
  };

  const handleAddNicknameClick = () => {
    setNicknameInput(currentRecipient.nickname || "");
    setIsNicknamePopupOpen(true);
  };

  const handleCloseNicknamePopup = () => {
    setIsNicknamePopupOpen(false);
  };

  const handleSaveNickname = async () => {
    if (!recipientId) {
        setError("Cannot save nickname: Recipient ID is missing.");
        return;
    }
    try {
      const updatedRecipient = await recipientService.updateRecipient(
        recipientId,
        { nickname: nicknameInput },
        token
      );
      setCurrentRecipient(updatedRecipient);
    } catch (err: any) {
      setError(err.message || "Failed to update nickname.");
      console.error("Error updating nickname:", err);
    }
    setIsNicknamePopupOpen(false);
  };

  const handleDeleteRecipientClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelDeleteRecipient = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteRecipient = async () => {
    if (!recipientId) {
        setError("Cannot delete recipient: Recipient ID is missing.");
        setIsDeleteModalOpen(false);
        return;
    }
    setIsDeleteModalOpen(false);
    setLoadingRecipient(true); // Use a different loading state if needed for deletion
    setError(null);
    try {
      await recipientService.deleteRecipient(recipientId, token);
      router.push("/dashboard/recipients");
      // No need to setLoadingRecipient(false) here as we are navigating away
    } catch (err: any) {
      setError(err.message || "Failed to delete recipient.");
      console.error("Error deleting recipient:", err);
      setLoadingRecipient(false); // Set loading false only on error
    }
  };


  // --- Rest of your JSX remains the same ---
  return (
    <div className="RecipientDetailsPage py-10">
      <DashboardHeader title="Recipients" />
      <div className="container mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col mb-8 space-y-4">
          <div className="relative w-20 h-20 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
            <span className="font-bold text-2xl text-neutral-900 dark:text-white">
              {getInitials(
                currentRecipient.nickname || currentRecipient.accountHolderName
              )}
            </span>
            {/* Optional Chaining for safety */}
            {currentRecipient.currency?.code === "INR" && (
              <div className="absolute bottom-1 right-0 w-6 h-6 rounded-full overflow-hidden border border-white">
                <Image
                  src={`/assets/icon/${currentRecipient.currency.code.toLowerCase()}.svg`}
                  alt={`${currentRecipient.currency.code} flag`}
                  width={24}
                  height={24}
                  onError={() =>
                    console.error(
                      `Error loading image for ${currentRecipient.currency.code}`
                    )
                  }
                />
              </div>
            )}
          </div>
          <h2 className="sm:text-[26px] text-xl font-semibold text-mainheading dark:text-white">
            {currentRecipient.nickname || currentRecipient.accountHolderName}
          </h2>
          <div className="flex items-center gap-4">
            <button className="font-medium bg-primary text-neutral-900 rounded-full w-32 h-10 flex items-center justify-center cursor-pointer">
              Send {/* Add onClick handler later */}
            </button>
            <button
              className="font-medium bg-red-600 text-white rounded-full w-32 h-10 flex items-center justify-center cursor-pointer"
              onClick={handleDeleteRecipientClick}
              disabled={loadingRecipient} // Disable while any loading is happening
            >
              Delete
            </button>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="mb-6 pb-4">
          <h3 className="text-lg font-medium text-gray-600 dark:text-white mb-6 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
            Account Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            {/* Account holder name */}
            <div>
              <label className="block text-sm font-semibold text-gray dark:text-white">
                Account holder name
              </label>
              <p className="mt-1 text-main dark:text-gray-300">
                {currentRecipient.accountHolderName ?? 'N/A'}
              </p>
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-sm font-semibold text-gray dark:text-white">
                Nickname
              </label>
              <div className="flex items-center gap-4 mt-1">
                {currentRecipient.nickname ? (
                  <div className="flex items-center gap-2">
                    <p className="text-main dark:text-gray-300">
                      {currentRecipient.nickname}
                    </p>
                    <button
                      className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary"
                      onClick={handleAddNicknameClick}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <button
                    className="cursor-pointer text-sm underline text-secondary font-medium dark:text-primary"
                    onClick={handleAddNicknameClick}
                  >
                    Add Nickname
                  </button>
                )}
              </div>
            </div>

            {/* Account type */}
            <div>
              <label className="block text-sm font-semibold text-gray dark:text-white">
                Account type
              </label>
              <p className="mt-1 text-main dark:text-gray-300">
                {currentRecipient.accountType ?? 'N/A'}
              </p>
            </div>

             {/* IFSC code */}
            <div>
              <label className="block text-sm font-semibold text-gray dark:text-white">
                IFSC code
              </label>
              <p className="mt-1 text-main dark:text-gray-300">
                {currentRecipient.ifscCode ?? 'N/A'}
              </p>
            </div>

             {/* Account number */}
            <div>
              <label className="block text-sm font-semibold text-gray dark:text-white">
                Account number
              </label>
              <p className="mt-1 text-main dark:text-gray-300">
                {currentRecipient.accountNumber ?? 'N/A'}
              </p>
            </div>

            {/* Email */}
            {currentRecipient.email && ( // Only render block if email exists
              <div>
                <label className="block text-sm font-semibold text-gray dark:text-white">
                  Email (Optional)
                </label>
                <p className="mt-1 text-main dark:text-gray-300">
                  {currentRecipient.email}
                </p>
              </div>
            )}

            {/* Bank name */}
             {currentRecipient.bankName && ( // Only render block if bankName exists
                <div>
                    <label className="block text-sm font-semibold text-gray dark:text-white">
                    Bank name
                    </label>
                    <p className="mt-1 text-main dark:text-gray-300">
                    {currentRecipient.bankName}
                    </p>
                </div>
             )}

            {/* Address */}
            {currentRecipient.address && ( // Only render block if address exists
                <div>
                    <label className="block text-sm font-semibold text-gray dark:text-white">
                    Address
                    </label>
                    <p className="mt-1 text-main dark:text-gray-300">
                    {currentRecipient.address}
                    </p>
                </div>
            )}
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
            <label
              htmlFor="nickname"
              className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
            >
              Account nickname
            </label>
            <input
              type="text"
              id="nickname"
              className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
              placeholder="Enter nickname"
              maxLength={40}
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
            />
            <p className="mt-2 text-gray dark:text-gray-300 font-semibold text-xs">
              {nicknameInput.length}/40
            </p>
          </div>
          <button
            className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
            onClick={handleSaveNickname}
          >
            Save
          </button>
        </NicknamePopup>

        {/* Delete Recipient Modal */}
        {/* Ensure recipientName is passed safely */}
        <DeleteRecipientModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDeleteRecipient}
          recipientName={currentRecipient?.accountHolderName ?? 'this recipient'}
          onConfirmDelete={handleConfirmDeleteRecipient}
        />
      </div>
    </div>
  );
};

export default RecipientDetailsPage;