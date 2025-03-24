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














// components/Filter/Recipients.tsx
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { sampleRecipients, Recipient } from "../../../../data/transactions"; // Import Recipient interface from data/transactions.ts


interface RecipientsProps {
  onRecipientSelectionChange?: (selectedRecipientIds: (string | number)[]) => void;
  selectedRecipientIds: (string | number)[];
}


const Recipients: React.FC<RecipientsProps> = ({ onRecipientSelectionChange, selectedRecipientIds: parentSelectedRecipientIds }) => {
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<(string | number)[]>(parentSelectedRecipientIds);


  useEffect(() => {
    if (onRecipientSelectionChange) {
      onRecipientSelectionChange(selectedRecipientIds);
    }
  }, [selectedRecipientIds, onRecipientSelectionChange]);

  useEffect(() => {
    setSelectedRecipientIds(parentSelectedRecipientIds);
  }, [parentSelectedRecipientIds]);


  const handleCheckboxChange = (recipientId: string | number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
    } else {
      setSelectedRecipientIds(selectedRecipientIds.filter((id) => id !== recipientId));
    }
  };

  const isRecipientSelected = (recipientId: string | number) => {
    return selectedRecipientIds.includes(recipientId);
  };

  const getInitials = (accountHolderName: string): string => {
    const nameParts = accountHolderName.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    } else if (nameParts.length === 1) {
      return `${nameParts[0][0]}`.toUpperCase();
    } else {
      return "";
    }
  };


  return (
    <div>
      {sampleRecipients.map((recipient) => (
        <div key={recipient.id} className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
              <span className="font-bold text-main">{getInitials(recipient.accountHolderName)}</span>
              {recipient.countryCode === 'IN' && (
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
                  <Image src={"/assets/icon/inr.svg"} alt="inr flag" width={20} height={20}/>
                </div>
              )}
            </div>
            <div className="ml-4">
              <h5 className="font-medium text-main capitalize">{recipient.accountHolderName}</h5>
              {recipient.accountNumber && <p className="text-sm text-gray-600">Account ending in {recipient.accountNumber.slice(-4)}</p>}
            </div>
          </div>
          <div className="pt-1.5">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
              checked={isRecipientSelected(recipient.id)}
              onChange={(e) => handleCheckboxChange(recipient.id, e.target.checked)}
            />
          </div>
        </div>
      ))}
      {selectedRecipientIds.length > 0 && (
        <p className="mt-4 text-sm text-gray-500">
          {selectedRecipientIds.length} recipient(s) selected.
        </p>
      )}
    </div>
  );
};

export default Recipients;