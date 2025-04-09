// // components/Filter/Recipients.tsx
// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// interface Recipient {
//   id: string | number; // Add a unique ID for each recipient
//   name: string;
//   accountInfo?: string;
//   initials: string;
//   countryCode?: string;
// }

// interface RecipientsProps {
//   recipients: Recipient[];
//   onRecipientSelectionChange?: (selectedRecipientIds: (string | number)[]) => void; // Optional callback to parent
// }

// const Recipients: React.FC<RecipientsProps> = ({ recipients, onRecipientSelectionChange }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<(string | number)[]>([]);

//   // Effect to call the parent callback when selectedRecipientIds changes
//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   const handleCheckboxChange = (recipientId: string | number, isChecked: boolean) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(selectedRecipientIds.filter((id) => id !== recipientId));
//     }
//   };

//   // Check if a recipient is selected
//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   return (
//     <div>
//       {recipients.map((recipient) => (
//         <div key={recipient.id} className="flex items-center justify-between py-3">
//           <div className="flex items-center">
//             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center relative">
//               <span className="font-bold text-main">{recipient.initials}</span>
//               {recipient.countryCode === 'IN' && (
//                 <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                   <Image src={"/assets/icon/inr.svg"} alt="inr flag" width={20} height={20}/>
//                 </div>
//               )}
//             </div>
//             <div className="ml-4">
//               <h5 className="font-medium text-main">{recipient.name}</h5>
//               {recipient.accountInfo && <p className="text-sm text-gray-600">{recipient.accountInfo}</p>}
//             </div>
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 focus:ring-0"
//               checked={isRecipientSelected(recipient.id)}
//               onChange={(e) => handleCheckboxChange(recipient.id, e.target.checked)}
//             />
//           </div>
//         </div>
//       ))}
//       {selectedRecipientIds.length > 0 && (
//         <p className="mt-4 text-sm text-gray-500">
//           {selectedRecipientIds.length} recipient(s) selected.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Recipients;

// // components/Filter/Recipients.tsx
// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// interface Recipient {
//   id: string | number;
//   accountHolderName: string;
//   accountNumber?: string;
//   countryCode?: string;
// }

// interface RecipientsProps {
//   onRecipientSelectionChange?: (selectedRecipientIds: (string | number)[]) => void;
//   selectedRecipientIds: (string | number)[]; // Prop to receive selected recipients from parent
// }

// const Recipients: React.FC<RecipientsProps> = ({ onRecipientSelectionChange, selectedRecipientIds: parentSelectedRecipientIds }) => { // Destructure selectedRecipientIds and rename to parentSelectedRecipientIds
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<(string | number)[]>(parentSelectedRecipientIds); // Initialize local state with prop

//   // Sample Recipients Data
//   const sampleRecipients = [
//     {
//       id: '1',
//       accountHolderName: "Nirav Ramani",
//       accountNumber: "XXXX XXXX XXXX 6009",
//       countryCode: 'IN'
//     },
//     {
//       id: '2',
//       accountHolderName: "kartavya pareshbhai patel",
//       accountNumber: "XXXX XXXX XXXX 1234",
//       countryCode: 'IN'
//     },
//     {
//       id: '3',
//       accountHolderName: "John Doe",
//       accountNumber: "XXXX XXXX XXXX 5678",
//       countryCode: 'IN'
//     },
//   ];

//   // Effect to call the parent callback when selectedRecipientIds changes
//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   // Effect to update local state when parent's selectedRecipientIds prop changes (for persistence)
//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (recipientId: string | number, isChecked: boolean) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(selectedRecipientIds.filter((id) => id !== recipientId));
//     }
//   };

//   // Check if a recipient is selected
//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   const getInitials = (accountHolderName: string): string => {
//     const nameParts = accountHolderName.split(" ");
//     if (nameParts.length >= 2) {
//       return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
//     } else if (nameParts.length === 1) {
//       return `${nameParts[0][0]}`.toUpperCase();
//     } else {
//       return "";
//     }
//   };

//   return (
//     <div>
//       {sampleRecipients.map((recipient) => (
//         <div key={recipient.id} className="flex items-center justify-between py-3">
//           <div className="flex items-center">
//             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center relative">
//               <span className="font-bold text-main">{getInitials(recipient.accountHolderName)}</span>
//               {recipient.countryCode === 'IN' && (
//                 <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                   <Image src={"/assets/icon/inr.svg"} alt="inr flag" width={20} height={20}/>
//                 </div>
//               )}
//             </div>
//             <div className="ml-4">
//               <h5 className="font-medium text-main capitalize">{recipient.accountHolderName}</h5>
//               {recipient.accountNumber && <p className="text-sm text-gray-600">Account ending in {recipient.accountNumber.slice(-4)}</p>}
//             </div>
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               className="h-5 w-5 rounded bg-mai border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={isRecipientSelected(recipient.id)}
//               onChange={(e) => handleCheckboxChange(recipient.id, e.target.checked)}
//             />
//           </div>
//         </div>
//       ))}
//       {selectedRecipientIds.length > 0 && (
//         <p className="mt-4 text-sm text-gray-500">
//           {selectedRecipientIds.length} recipient(s) selected.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Recipients;

// // components/Filter/Recipients.tsx
// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { sampleRecipients, Recipient } from "../../../../data/transactions"; // Import Recipient interface from data/transactions.ts

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   const getInitials = (accountHolderName: string): string => {
//     const nameParts = accountHolderName.split(" ");
//     if (nameParts.length >= 2) {
//       return `${nameParts[0][0]}${
//         nameParts[nameParts.length - 1][0]
//       }`.toUpperCase();
//     } else if (nameParts.length === 1) {
//       return `${nameParts[0][0]}`.toUpperCase();
//     } else {
//       return "";
//     }
//   };

//   return (
//     <>
//       <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//         Recipients
//       </h4>
//       <div className="pt-4">
//         {sampleRecipients.map((recipient) => (
//           <div
//             key={recipient.id}
//             className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out"
//           >
//             {/* Recipients List */}
//             <div className="flex items-center">
//               <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//                 <span className="font-bold text-main">
//                   {getInitials(recipient.accountHolderName)}
//                 </span>
//                 {recipient.countryCode === "INR" && (
//                   <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                     <Image
//                       src={"/assets/icon/inr.svg"}
//                       alt="inr flag"
//                       width={20}
//                       height={20}
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="ml-4">
//                 <h5 className="font-medium text-main capitalize">
//                   {recipient.accountHolderName}
//                 </h5>
//                 {recipient.accountNumber && (
//                   <p className="text-sm text-gray-600">
//                    {recipient.countryCode} Account ending in {recipient.accountNumber.slice(-4)}
//                   </p>
//                 )}
//               </div>
//             </div>
//             {/* Recipients List */}

//             <div className="pt-1.5">
//               <input
//                 type="checkbox"
//                 className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//                 checked={isRecipientSelected(recipient.id)}
//                 onChange={(e) =>
//                   handleCheckboxChange(recipient.id, e.target.checked)
//                 }
//               />
//             </div>
//           </div>
//         ))}
//         {selectedRecipientIds.length > 0 && (
//           <p className="mt-4 text-sm text-gray-500">
//             {selectedRecipientIds.length} recipient(s) selected.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Recipients;













// // components/Filter/Recipients.tsx
// import React, { useState, useEffect } from "react";
// import { sampleRecipients } from "../../../../data/transactions";
// import RecipientList from "../../RecipientList"; // Import the new RecipientListItem component

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   return (
//     <>
//       <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//         Recipients
//       </h4>
//       <div className="pt-4 space-y-2">
//         {sampleRecipients.map((recipient) => (
//           <RecipientList
//             key={recipient.id}
//             recipient={recipient}
//             isSelected={isRecipientSelected(recipient.id)}
//             onCheckboxChange={handleCheckboxChange}
//           />
//         ))}
//         {selectedRecipientIds.length > 0 && (
//           <p className="mt-4 text-sm text-gray-500">
//             {selectedRecipientIds.length} recipient(s) selected.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Recipients; 




// // Latest Updated Code
// // components/Filter/Recipients.tsx
// import React, { useState, useEffect } from "react";
// import { sampleRecipients } from "../../../../data/transactions";
// import RecipientList from "../../RecipientList"; // Import the new RecipientListItem component

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   return (
//     <>
//       <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//         Recipients
//       </h4>
//       <div className="pt-4 space-y-2">
//         {sampleRecipients.map((recipient) => (
//           <RecipientList
//             key={recipient.id}
//             recipient={recipient}
//             isSelected={isRecipientSelected(recipient.id)}
//             onCheckboxChange={handleCheckboxChange}
//           />
//         ))}
//         {selectedRecipientIds.length > 0 && (
//           <p className="mt-4 text-sm text-gray-500">
//             {selectedRecipientIds.length} recipient(s) selected.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Recipients;



// // components/Filter/Recipients.tsx
// import React, { useState, useEffect } from "react";
// import RecipientList from "../../RecipientList";
// import recipientService from "../../../../services/recipient"; // Import your recipient service
// import { useAuth } from "../../../../hooks/useAuth"; // Import useAuth hook

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);
//   const [recipients, setRecipients] = useState([]); // State to store recipients from API
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth(); // Get the token from AuthContext

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         if (!token) {
//           setError("Authentication token is missing.");
//           setLoading(false);
//           return;
//         }
//         const data = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message || "Failed to load recipients.");
//         setLoading(false);
//         console.error("Error fetching recipients:", err);
//       }
//     };

//     fetchRecipients();
//   }, [token]); // Fetch recipients when component mounts or token changes

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   if (loading) {
//     return <p>Loading recipients...</p>; // Or a loading spinner
//   }

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   return (
//     <>
//       <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//         Recipients
//       </h4>
//       <div className="pt-4 space-y-2">
//         {recipients.map((recipient: any) => ( // Type 'recipient' as 'any' initially, adjust if you have a specific type
//           <RecipientList
//             key={recipient._id} // Use _id from API data
//             recipient={recipient}
//             isSelected={isRecipientSelected(recipient._id)} // Use _id for selection
//             onCheckboxChange={handleCheckboxChange}
//           />
//         ))}
//         {selectedRecipientIds.length > 0 && (
//           <p className="mt-4 text-sm text-gray-500">
//             {selectedRecipientIds.length} recipient(s) selected.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Recipients;








// // components/Filter/Recipients.tsx
// import React, { useState, useEffect } from "react";
// import RecipientList from "../../RecipientList";
// import recipientService from "../../../../services/recipient"; // Import your recipient service
// import { useAuth } from "../../../../hooks/useAuth"; // Import useAuth hook

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);
//   const [recipients, setRecipients] = useState([]); // State to store recipients from API
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth(); // Get the token from AuthContext

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         if (!token) {
//           setError("Authentication token is missing.");
//           setLoading(false);
//           return;
//         }
//         const data = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message || "Failed to load recipients.");
//         setLoading(false);
//         console.error("Error fetching recipients:", err);
//       }
//     };

//     fetchRecipients();
//   }, [token]); // Fetch recipients when component mounts or token changes

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   if (loading) {
//     return <p>Loading recipients...</p>; // Or a loading spinner
//   }

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   return (
//     <>
//       {recipients.length > 0 && (
//         <>
//           <h4 className="text-gray-500 dark:text-gray-300 font-medium relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//             Recipients
//           </h4>
//           <div className="pt-4 space-y-2">
//             {recipients.map((recipient: any) => ( // Type 'recipient' as 'any' initially, adjust if you have a specific type
//               <RecipientList
//                 key={recipient._id} // Use _id from API data
//                 recipient={recipient}
//                 isSelected={isRecipientSelected(recipient._id)} // Use _id for selection
//                 onCheckboxChange={handleCheckboxChange}
//               />
//             ))}
//             {selectedRecipientIds.length > 0 && (
//               <p className="mt-4 text-sm dark:text-gray-300 text-gray-500">
//                 {selectedRecipientIds.length} recipient(s) selected.
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Recipients;



// // frontend/src/app/dashboard/components/RecipientList.tsx
// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { Checkbox } from "@/components/ui/checkbox"; // Import Shadcn Checkbox

// // Define a Recipient interface based on usage
// interface Recipient {
//   _id: string; // Assuming _id is always present and is a string
//   accountHolderName: string;
//   currency: {
//     code: string;
//   };
//   accountNumber?: string; // Optional based on usage
//   // Add other fields from your recipient data if needed
// }

// interface RecipientListProps {
//   recipient: Recipient; // Use the defined Recipient type
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string, isChecked: boolean) => void; // Use string for ID
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {
//   const getInitials = (accountHolderName: string = ""): string => { // Added default value and return type
//     const trimmedName = accountHolderName.trim(); // Trim leading/trailing spaces
//     if (!trimmedName) return "?"; // Handle empty name case

//     const nameParts = trimmedName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 1 && nameParts[0] !== "") {
//       initials += nameParts[0][0]; // First letter of the first word
//       if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") {
//         const lastNameInitial = nameParts[nameParts.length - 1][0];
//         // Add last initial only if different from first and exists
//         if (initials !== lastNameInitial) {
//              initials += lastNameInitial;
//         } else if (initials.length === 1 && nameParts.length === 1) {
//             // If only one word, just use the first letter
//             return initials;
//         }
//       } else if (initials.length === 1 && nameParts[0].length > 1) {
//            // If one word with more than one letter, use first two letters
//            initials += nameParts[0][1];
//       }
//     }
//     return initials || "?"; // Return initials or fallback
// };


//   const checkboxRef = useRef<HTMLButtonElement>(null); // Ref type for Shadcn Checkbox (button)
//   const router = useRouter();

//   const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
//      // Prevent checkbox toggle if clicking directly on the checkbox itself
//      const target = e.target as HTMLElement;
//      if (target.closest('[role="checkbox"]')) {
//          return;
//      }

//     if (!showCheckbox) {
//       router.push(`/dashboard/recipients/${recipient._id}`); // Navigate to recipient details page using _id from backend
//       return;
//     }

//     // Always toggle the checkbox state on div click when showCheckbox is true
//     if (onCheckboxChange) {
//       const newCheckedState = !isSelected; // Toggle the selected state
//       onCheckboxChange(recipient._id, newCheckedState);
//     }
//   };

//   // Handler for Shadcn's Checkbox onCheckedChange
//   const handleCheckboxStateChange = (checked: boolean | 'indeterminate') => {
//       if (typeof checked === 'boolean' && onCheckboxChange) {
//           onCheckboxChange(recipient._id, checked);
//       }
//   };


//   return (
//     <div
//       className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
//       onClick={handleItemClick}
//       role="listitem" // Added role
//     >
//       <div className="flex items-center justify-between gap-4">
//         <div className="flex items-center flex-grow min-w-0"> {/* Added flex-grow and min-w-0 */}
//           <div className="w-12 h-12 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative shrink-0"> {/* Added shrink-0 */}
//             <span className="font-bold text-neutral-900 dark:text-white">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden border-2 border-white dark:border-primarybox"> {/* Added border */}
//               <Image
//                 src={`/assets/icon/${recipient.currency.code.toLowerCase()}.svg`} // Use dynamic icon path
//                 alt={`${recipient.currency.code} flag`}
//                 width={16} // Match container size
//                 height={16} // Match container size
//                 onError={(e) => { // Improved error handling
//                    console.error(`Error loading image for ${recipient.currency.code}`);
//                    (e.target as HTMLImageElement).style.display = 'none'; // Hide broken image icon
//                 }}
//               />
//             </div>
//           </div>
//           <div className="ml-4 overflow-hidden"> {/* Added overflow-hidden */}
//             <h5
//               className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate" // Added truncate
//               title={recipient.accountHolderName} // Added title for full name on hover
//             >
//               {recipient.accountHolderName}
//             </h5>
//             {recipient.accountNumber && (
//               <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 truncate"> {/* Added truncate */}
//                 {recipient.currency.code} Account ending in{" "}
//                 {recipient.accountNumber.slice(-4)}{" "}
//               </p>
//             )}
//           </div>
//         </div>

//         {showCheckbox ? (
//           <div className="pt-1.5 pl-2 shrink-0"> {/* Added pl-2 and shrink-0 */}
//             <Checkbox
//               id={`recipient-checkbox-${recipient._id}`} // Added id for accessibility
//               ref={checkboxRef} // Ref for Shadcn Checkbox (button)
//               checked={isSelected}
//               onCheckedChange={handleCheckboxStateChange} // Use onCheckedChange and pass boolean value
//               aria-labelledby={`recipient-name-${recipient._id}`} // Link checkbox to name for screen readers
//             />
//              {/* Hidden label for screen readers */}
//              <span id={`recipient-name-${recipient._id}`} className="sr-only">
//                 Select {recipient.accountHolderName}
//             </span>
//           </div>
//         ) : (
//           <div className="ml-4 shrink-0"> {/* Added shrink-0 */}
//             <IoIosArrowForward className="size-5 text-neutral-900 dark:text-white" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// // frontend/src/app/dashboard/components/RecipientList.tsx
// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { Checkbox } from "@/components/ui/checkbox";

// // Define a Recipient interface based on usage
// interface Recipient {
//   _id: string;
//   accountHolderName: string; // Required based on usage
//   currency?: { // Make currency optional if it might be missing
//     code: string;
//   };
//   accountNumber?: string;
//   // Add other fields from your recipient data if needed
// }

// interface RecipientListProps {
//   recipient?: Recipient | null; // Allow recipient to be potentially undefined or null
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string, isChecked: boolean) => void;
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {

//   // --- !! Add this check at the beginning !! ---
//   if (!recipient || !recipient._id || !recipient.accountHolderName) {
//     // If the recipient data is incomplete or missing, don't render the item.
//     // You could also return a placeholder or log an error.
//     console.warn("RecipientList received invalid recipient prop:", recipient);
//     return null;
//   }
//   // --- End of check ---

//   // Ensure currency exists before accessing code, provide fallback
//   const currencyCode = recipient.currency?.code?.toLowerCase() || 'unknown';
//   const currencyCodeDisplay = recipient.currency?.code || 'N/A';

//   const getInitials = (accountHolderName: string = ""): string => {
//     // (Your existing getInitials logic - seems okay)
//     const trimmedName = accountHolderName.trim();
//     if (!trimmedName) return "?";
//     const nameParts = trimmedName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 1 && nameParts[0] !== "") {
//       initials += nameParts[0][0];
//       if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") {
//         const lastNameInitial = nameParts[nameParts.length - 1][0];
//         if (initials !== lastNameInitial) {
//           initials += lastNameInitial;
//         } else if (initials.length === 1 && nameParts.length === 1) {
//              return initials;
//         }
//       } else if (initials.length === 1 && nameParts[0].length > 1) {
//            initials += nameParts[0][1];
//       }
//     }
//     return initials || "?";
//   };


//   const checkboxRef = useRef<HTMLButtonElement>(null);
//   const router = useRouter();

//   const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
//      const target = e.target as HTMLElement;
//      if (target.closest('[role="checkbox"]')) {
//          return;
//      }

//     if (!showCheckbox) {
//       // Ensure recipient._id exists (checked above)
//       router.push(`/dashboard/recipients/${recipient._id}`);
//       return;
//     }

//     if (onCheckboxChange) {
//       const newCheckedState = !isSelected;
//       // Ensure recipient._id exists (checked above)
//       onCheckboxChange(recipient._id, newCheckedState);
//     }
//   };

//   const handleCheckboxStateChange = (checked: boolean | 'indeterminate') => {
//       // Ensure recipient._id exists (checked above)
//       if (typeof checked === 'boolean' && onCheckboxChange) {
//           onCheckboxChange(recipient._id, checked);
//       }
//   };


//   return (
//     <div
//       className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
//       onClick={handleItemClick}
//       role="listitem"
//     >
//       <div className="flex items-center justify-between gap-4">
//         <div className="flex items-center flex-grow min-w-0">
//           <div className="w-12 h-12 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative shrink-0">
//             <span className="font-bold text-neutral-900 dark:text-white">
//               {/* Already checked recipient.accountHolderName exists */}
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             {recipient.currency?.code && ( // Check if currency code exists
//               <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden border-2 border-white dark:border-primarybox">
//                 <Image
//                   src={`/assets/icon/${currencyCode}.svg`} // Use safe currencyCode
//                   alt={`${currencyCodeDisplay} flag`} // Use safe currencyCodeDisplay
//                   width={16}
//                   height={16}
//                   onError={(e) => {
//                      console.error(`Error loading image for ${currencyCodeDisplay}`);
//                      (e.target as HTMLImageElement).style.display = 'none';
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="ml-4 overflow-hidden">
//             <h5
//               className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate"
//               title={recipient.accountHolderName}
//             >
//               {recipient.accountHolderName}
//             </h5>
//             {recipient.accountNumber && (
//               <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 truncate">
//                 {currencyCodeDisplay} Account ending in{" "}
//                 {recipient.accountNumber.slice(-4)}{" "}
//               </p>
//             )}
//           </div>
//         </div>

//         {showCheckbox ? (
//           <div className="pt-1.5 pl-2 shrink-0">
//             <Checkbox
//               id={`recipient-checkbox-${recipient._id}`}
//               ref={checkboxRef}
//               checked={isSelected}
//               onCheckedChange={handleCheckboxStateChange}
//               aria-labelledby={`recipient-name-${recipient._id}`}
//             />
//              <span id={`recipient-name-${recipient._id}`} className="sr-only">
//                 Select {recipient.accountHolderName}
//             </span>
//           </div>
//         ) : (
//           <div className="ml-4 shrink-0">
//             <IoIosArrowForward className="size-5 text-neutral-900 dark:text-white" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// frontend/src/app/dashboard/components/RecipientList.tsx
"use client";
import Image from "next/image";
import React, { useRef } from "react"; // Keep useRef import
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation"; // Keep useRouter import
import { Checkbox } from "@/components/ui/checkbox";

// Define a Recipient interface based on usage
interface Recipient {
  _id: string;
  accountHolderName: string; // Required based on usage
  currency?: { // Make currency optional if it might be missing
    code: string;
  };
  accountNumber?: string;
  // Add other fields from your recipient data if needed
}

interface RecipientListProps {
  recipient?: Recipient | null; // Allow recipient to be potentially undefined or null
  isSelected: boolean;
  onCheckboxChange?: (recipientId: string, isChecked: boolean) => void;
  showCheckbox?: boolean;
}

export default function RecipientList({
  recipient,
  isSelected,
  onCheckboxChange,
  showCheckbox = true,
}: RecipientListProps) {

  // --- !! Call Hooks unconditionally at the top level !! ---
  const checkboxRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  // --- End of Hook calls ---

  // --- Now perform the check ---
  if (!recipient || !recipient._id || !recipient.accountHolderName) {
    // If the recipient data is incomplete or missing, don't render the item.
    // You could also return a placeholder or log an error.
    console.warn("RecipientList received invalid recipient prop:", recipient);
    return null; // Early return is now okay because hooks were already called
  }
  // --- End of check ---

  // Ensure currency exists before accessing code, provide fallback
  const currencyCode = recipient.currency?.code?.toLowerCase() || 'unknown';
  const currencyCodeDisplay = recipient.currency?.code || 'N/A';

  const getInitials = (accountHolderName: string = ""): string => {
    // (Your existing getInitials logic - seems okay)
    const trimmedName = accountHolderName.trim();
    if (!trimmedName) return "?";
    const nameParts = trimmedName.toUpperCase().split(" ");
    let initials = "";
    if (nameParts.length >= 1 && nameParts[0] !== "") {
      initials += nameParts[0][0];
      if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") {
        const lastNameInitial = nameParts[nameParts.length - 1][0];
        if (initials !== lastNameInitial) {
          initials += lastNameInitial;
        } else if (initials.length === 1 && nameParts.length === 1) {
             return initials;
        }
      } else if (initials.length === 1 && nameParts[0].length > 1) {
           initials += nameParts[0][1];
      }
    }
    return initials || "?";
  };

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
     const target = e.target as HTMLElement;
     // Prevent triggering item click when clicking the checkbox itself
     if (target.closest('[role="checkbox"]')) {
         return;
     }

    if (!showCheckbox) {
      // Ensure recipient._id exists (checked above)
      router.push(`/dashboard/recipients/${recipient._id}`);
      return;
    }

    // Trigger checkbox change when clicking the list item if checkbox is shown
    if (onCheckboxChange) {
      const newCheckedState = !isSelected;
      // Ensure recipient._id exists (checked above)
      onCheckboxChange(recipient._id, newCheckedState);
    }
  };

  const handleCheckboxStateChange = (checked: boolean | 'indeterminate') => {
      // Ensure recipient._id exists (checked above)
      if (typeof checked === 'boolean' && onCheckboxChange) {
          onCheckboxChange(recipient._id, checked);
      }
  };


  return (
    <div
      className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
      onClick={handleItemClick}
      role="listitem"
      // Add aria-selected for better accessibility when checkboxes are shown
      aria-selected={showCheckbox ? isSelected : undefined}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center flex-grow min-w-0">
          <div className="w-12 h-12 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative shrink-0">
            {/* Use a unique ID for the recipient name element for accessibility */}
            <span id={`recipient-name-${recipient._id}`} className="font-bold text-neutral-900 dark:text-white">
              {/* Already checked recipient.accountHolderName exists */}
              {getInitials(recipient.accountHolderName)}
            </span>
            {recipient.currency?.code && ( // Check if currency code exists
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden border-2 border-white dark:border-primarybox">
                <Image
                  src={`/assets/icon/${currencyCode}.svg`} // Use safe currencyCode
                  alt={`${currencyCodeDisplay} flag`} // Use safe currencyCodeDisplay
                  width={16}
                  height={16}
                  onError={(e) => {
                     console.error(`Error loading image for ${currencyCodeDisplay}`);
                     (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          <div className="ml-4 overflow-hidden">
            <h5
              className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate"
              title={recipient.accountHolderName}
              // Associate heading with checkbox via aria-labelledby if checkbox exists
              id={showCheckbox ? `recipient-heading-${recipient._id}` : undefined}
            >
              {recipient.accountHolderName}
            </h5>
            {recipient.accountNumber && (
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 truncate">
                {currencyCodeDisplay} Account ending in{" "}
                {recipient.accountNumber.slice(-4)}{" "}
              </p>
            )}
          </div>
        </div>

        {showCheckbox ? (
          <div className="pt-1.5 pl-2 shrink-0">
            <Checkbox
              id={`recipient-checkbox-${recipient._id}`}
              ref={checkboxRef}
              checked={isSelected}
              onCheckedChange={handleCheckboxStateChange}
              // Use aria-labelledby to link checkbox to the recipient name heading
              aria-labelledby={`recipient-heading-${recipient._id}`}
            />
             {/* Screen reader text moved to be associated with the checkbox via aria-labelledby */}
             {/* <span id={`recipient-name-${recipient._id}`} className="sr-only">
                Select {recipient.accountHolderName}
            </span> */}
          </div>
        ) : (
          <div className="ml-4 shrink-0">
            <IoIosArrowForward className="size-5 text-neutral-900 dark:text-white" />
          </div>
        )}
      </div>
    </div>
  );
}