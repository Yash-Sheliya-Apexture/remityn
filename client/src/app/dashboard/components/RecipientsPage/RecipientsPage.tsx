// import React from "react";
// import { FiSearch } from "react-icons/fi";

// interface Recipient {
//   initials: string;
//   name: string;
//   accountDetails: string;
//   currencyFlag?: string;
// }

// const recipientsData: Recipient[] = [
//   {
//     initials: "JK",
//     name: "JOSEPHINE KHARMAWPHLANG",
//     accountDetails: "AED account ending in 3838",
//     currencyFlag: "ae",
//   },
//   {
//     initials: "K",
//     name: "Kartavya",
//     accountDetails: "INR account ending in 1416",
//     currencyFlag: "in",
//   },
//   {
//     initials: "NR",
//     name: "Nirav Ramani",
//     accountDetails: "INR account ending in 6009",
//     currencyFlag: "in",
//   },
// ];

// export default function BeneficiariesPage() {
//   return (
//     <div className="Beneficiaries-Page py-10">
//       <div className="container mx-auto">
//         <div className="mb-8">
//           {/* Recipients Title */}
//           <h1 className="text-3xl font-semibold text-main">Recipients</h1>
//         </div>

//         {/* Search and Add Recipient */}
//         <div className="flex items-center space-x-4 mb-6">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-14 pr-3 py-3 border border-lightborder0 rounded-full focus:outline-none focus:ring-main focus:border-main"
//               placeholder="Search existing recipients"
//             />
//           </div>
//           <button
//             type="button"
//             className="inline-flex items-center px-10 py-3 border border-primary rounded-full font-medium text-primary *:focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Add recipient
//           </button>
//         </div>

//         {/* All Label */}
//         <div>
//           <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//             All
//           </h3>

//         {/* Recipients List */}
//           <div className="pt-4">

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Latest Updated Code
// // BeneficiariesPage.tsx
// "use client"
// import React, { useState, ChangeEvent } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList";
// import { sampleRecipients } from "../../../data/transactions";

// export default function BeneficiariesPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredRecipients = sampleRecipients.filter((recipient) => {
//     const recipientName = recipient.accountHolderName; // Get recipient's name
//     if (recipientName) { // Check if recipientName is not undefined or null
//       return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
//     }
//     return false; // If recipientName is undefined, don't include in filtered results
//   });

//   return (
//     <div className="Beneficiaries-Page py-10">
//       <div className="container mx-auto">
//         <div className="mb-8">
//           {/* Recipients Title */}
//           <h1 className="text-3xl font-semibold text-main">Recipients</h1>
//         </div>

//         {/* Search and Add Recipient */}
//         <div className="flex items-center space-x-4 mb-6">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-14 pr-3 py-3 border border-lightborder0 rounded-full focus:outline-none focus:ring-main focus:border-main"
//               placeholder="Search existing recipients"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <button
//             type="button"
//             className="inline-flex items-center px-10 py-3 border border-primary rounded-full font-medium text-primary focus:outline-none focus:ring-primary focus:border-primary cursor-pointer"
//           >
//             Add recipient
//           </button>
//         </div>

//         {/* All Label */}
//         <div>
//           <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//             All
//           </h3>

//         {/* Recipients List */}
//           <div className="pt-4 space-y-2">
//             {filteredRecipients.map((recipient) => (
//               <RecipientList
//                 key={recipient.id}
//                 recipient={recipient}
//                 isSelected={false} // default value
//                 showCheckbox={false} // hide checkbox
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// RecipientsPage.tsx
"use client";
import React, { useState, ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";
import RecipientList from "@/app/dashboard/components/RecipientList";
import { sampleRecipients } from "../../../data/transactions";
import { CiBank } from "react-icons/ci";
import { FaCirclePlus  } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/navigation'; // Import useRouter hook

export default function RecipientsPag() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter(); // Initialize useRouter hook for navigation

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipients = sampleRecipients.filter((recipient) => {
    const recipientName = recipient.accountHolderName;
    if (recipientName) {
      return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  const handleAddRecipientClick = () => {
    // Navigate to the add recipient page when the button is clicked
    router.push('/dashboard/recipients/addrecipient'); // Assuming your add recipient page is located at /dashboard/recipients/add
  };

  return (
    <section className="Beneficiaries-Page py-10">
      <div className="container mx-auto">
        <div className="mb-8">
          {/* Recipients Title */}
          <h1 className="text-3xl font-semibold text-main">Recipients</h1>
        </div>

        {/* Search and Add Recipient */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-14 pr-3 py-3 border border-lightborder rounded-full focus:outline-none focus:ring-main focus:border-main"
              placeholder="Search existing recipients"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {/* Add recipient button with onClick handler */}
          <button
            type="button"
            className="inline-flex items-center px-10 py-3 border border-primary rounded-full font-medium text-primary focus:outline-none focus:ring-primary focus:border-primary cursor-pointer"
            onClick={handleAddRecipientClick} // Call handleAddRecipientClick function on button click
          >
            Add recipient
          </button>
        </div>

        {/* Conditional Rendering of Sections */}
        {filteredRecipients.length > 0 ? (
          <div>
            {/* All Label */}
            <div>
              <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
                All
              </h3>

              {/* Recipients List */}
              <div className="pt-4 space-y-2">
                {filteredRecipients.map((recipient) => (
                  <RecipientList
                    key={recipient.id}
                    recipient={recipient}
                    isSelected={false}
                    showCheckbox={false}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Can't find Label */}
            <div>
              <h3 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
                Can't find your recipient?
              </h3>

              <div className="mt-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
                      <CiBank size={24}/>

                      <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
                        <FaCirclePlus className="text-green-400 bg-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium text-main capitalize">
                        Enter their bank detials
                      </h5>

                      <p className="text-sm text-gray-600">
                        you'll need their acoount information
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <IoIosArrowForward className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}