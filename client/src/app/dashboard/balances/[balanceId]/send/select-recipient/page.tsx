// // frontend/src/app/dashboard/balances/[balanceId]/send/select-recipient/page.tsx
// "use client";
// import React, { useState, ChangeEvent, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList"; // Re-use component
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io";
// import { useParams, useRouter } from "next/navigation";
// import { useAuth } from "../../../../../hooks/useAuth"; // Adjust path
// import recipientService from "../../../../../services/recipient"; // Adjust path
// import { MdCancel } from "react-icons/md";

// interface SelectRecipientParams {
//   balanceId: string;
// }

// export default function SelectRecipientPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const router = useRouter();
//   const params = useParams<SelectRecipientParams>();
//   const { balanceId } = params;
//   const { token } = useAuth();
//   const [recipients, setRecipients] = useState<any[]>([]); // Use 'any' for now, define interface later
//   const [loadingRecipients, setLoadingRecipients] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoadingRecipients(true);
//       setError(null);
//       try {
//         const data = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load recipients.");
//         console.error("Error fetching recipients:", err);
//       } finally {
//         setLoadingRecipients(false);
//       }
//     };

//     if (token) {
//       fetchRecipients();
//     } else {
//       router.push("/auth/login"); // Redirect if not authenticated
//     }
//   }, [token, router]);

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   const filteredRecipients = recipients.filter((recipient) => {
//     const recipientName = recipient.accountHolderName || recipient.nickname;
//     return recipientName?.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   const handleRecipientSelect = (recipientId: string) => {
//     // Navigate to the next step (Amount Page)
//     router.push(
//       `/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`
//     );
//   };

//   const handleAddRecipientClick = () => {
//     // Navigate to add recipient page, ideally passing a return URL
//     const returnUrl = `/dashboard/balances/${balanceId}/send/select-recipient`;
//     router.push(
//       `/dashboard/recipients/addrecipient?returnTo=${encodeURIComponent(
//         returnUrl
//       )}`
//     );
//   };

//   if (loadingRecipients) {
//     return <div className="container mx-auto py-10">Loading recipients...</div>;
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto py-10 text-red-500">Error: {error}</div>
//     );
//   }

//   return (
//     <section className="SelectRecipient-Page py-10">
//       {/* <DashboardHeader title="Send Money" /> Optional Header */}
//       <div className="container mx-auto">

//         <h1 className="text-2xl lg:text-3xl font-semibold text-mainheading  dark:text-white mb-6">
//           Who are you sending money to?
//         </h1>

//         <div className="mb-6 relative">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//             <FiSearch className="size-5 text-neutral-900 dark:text-white" aria-hidden="true" />
//           </div>
//           <input
//             type="text"
//             className="w-full rounded-full h-12.5 py-3 pl-12 pr-3 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//             placeholder="Search existing recipients"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           {searchTerm && (
//             <button
//               onClick={clearSearchTerm}
//               className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//             >
//               <MdCancel size={24} aria-hidden="true" />
//             </button>
//           )}
//         </div>

//         {/* Add Recipient Button/Link */}
//         <div
//           onClick={handleAddRecipientClick}
//           className="flex items-center p-4 -mx-4 rounded-2xl hover:bg-lightgray dark:hover:bg-primarybox transition-colors duration-200 ease-in-out cursor-pointer mb-4"
//         >
//           <div className="size-12 rounded-full bg-green-600/20 p-2 flex items-center justify-center">
//             <FaCirclePlus className="text-green-600" size={24} />
//           </div>
//           <div className="ml-4 flex-grow">
//             <h5 className="font-medium text-mainheading dark:text-white">Add a recipient</h5>
//           </div>
//           <IoIosArrowForward className="h-5 w-5 text-neutral-900 dark:text-white" />
//         </div>

//         {/* Recipient List */}
//         {filteredRecipients.length > 0 ? (
//           <div>
//             <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//               All
//             </h3>
//             <div className="space-y-1">
//               {filteredRecipients.map((recipient) => (
//                 // Wrap RecipientList or create a clickable div
//                 <div
//                   key={recipient._id}
//                   onClick={() => handleRecipientSelect(recipient._id)}
//                 >
//                   <RecipientList
//                     recipient={recipient}
//                     isSelected={false} // Not used here
//                     showCheckbox={false} // Don't show checkbox
//                     // No onCheckboxChange needed
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           searchTerm && (
//             <p className="text-center text-gray-500  rounded-2xl dark:text-gray-300 text-lg dark:bg-white/8 py-10">
//               No recipients found matching '{searchTerm}'.
//             </p>
//           )
//           // Optionally show a different message if list is empty initially
//         )}
//       </div>
//     </section>
//   );
// }



// // frontend/src/app/dashboard/balances/[balanceId]/send/select-recipient/page.tsx
// "use client";
// import React, { useState, ChangeEvent, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import RecipientList from "@/app/dashboard/components/RecipientList"; // Re-use component
// import { FaCirclePlus } from "react-icons/fa6";
// import { IoIosArrowForward } from "react-icons/io"; // Kept this, removed IoIosArrowBack
// import { useParams, useRouter } from "next/navigation";
// import { useAuth } from "../../../../../contexts/AuthContext"; // Adjust path
// import recipientService from "../../../../../services/recipient"; // Adjust path
// import { MdCancel } from "react-icons/md";
// // Removed unused imports: IoIosArrowBack, Link

// interface SelectRecipientParams {
//   balanceId: string;
// }

// // Define a type for the recipient object for better type safety
// interface Recipient {
//   _id: string;
//   accountHolderName?: string; // Optional if nickname is primary
//   nickname?: string; // Optional if accountHolderName is primary
//   // Add other relevant fields if used by RecipientList or elsewhere
//   // e.g., bankName?: string; accountNumberLast4?: string; currency?: string; type?: string;
// }

// export default function SelectRecipientPage() {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const router = useRouter();
//   const params = useParams<SelectRecipientParams>();
//   const { balanceId } = params;
//   const { token } = useAuth();
//   // Use the defined Recipient interface instead of 'any'
//   const [recipients, setRecipients] = useState<Recipient[]>([]);
//   const [loadingRecipients, setLoadingRecipients] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoadingRecipients(true);
//       setError(null);
//       try {
//         // Assume recipientService.getUserRecipients returns data matching Recipient[]
//         const data: Recipient[] = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//       } catch (err: unknown) { // Use 'unknown' instead of 'any' for better type safety
//         let errorMessage = "Failed to load recipients.";
//         // Type check the error before accessing properties
//         if (err instanceof Error) {
//           errorMessage = err.message;
//         }
//         setError(errorMessage);
//         console.error("Error fetching recipients:", err);
//       } finally {
//         setLoadingRecipients(false);
//       }
//     };

//     if (token) {
//       fetchRecipients();
//     } else {
//         // If no token, redirect to login. Consider adding a message or handling this state earlier.
//         console.log("No auth token found, redirecting to login.");
//         router.push("/auth/login");
//     }
//   }, [token, router]); // Added router to dependency array as it's used inside the effect

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const clearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   const filteredRecipients = recipients.filter((recipient) => {
//     // Use optional chaining and nullish coalescing for safer access
//     const recipientName = recipient.accountHolderName ?? recipient.nickname ?? "";
//     return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   const handleRecipientSelect = (recipientId: string) => {
//     // Navigate to the next step (Amount Page)
//     router.push(
//       `/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`
//     );
//   };

//   const handleAddRecipientClick = () => {
//     // Navigate to add recipient page, ideally passing a return URL
//     const returnUrl = `/dashboard/balances/${balanceId}/send/select-recipient`;
//     router.push(
//       `/dashboard/recipients/addrecipient?returnTo=${encodeURIComponent(
//         returnUrl
//       )}`
//     );
//   };

//   if (!token && !loadingRecipients) {
//       // Optional: Show a message or different UI while redirecting or if redirect fails
//       return <div className="container mx-auto py-10">Redirecting to login...</div>;
//   }

//   if (loadingRecipients) {
//     return <div className="container mx-auto py-10 text-center">Loading recipients...</div>;
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto py-10 text-red-500 text-center">Error: {error}</div>
//     );
//   }

//   return (
//     <section className="SelectRecipient-Page py-10">
//       {/* <DashboardHeader title="Send Money" /> Optional Header */}
//       <div className="container mx-auto">

//         <h1 className="text-2xl lg:text-3xl font-semibold text-mainheading dark:text-white mb-6">
//           Who are you sending money to?
//         </h1>

//         <div className="mb-6 relative">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//             <FiSearch className="size-5 text-neutral-900 dark:text-white" aria-hidden="true" />
//           </div>
//           <input
//             type="text"
//             className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//             placeholder="Search existing recipients"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           {searchTerm && (
//             <button
//               onClick={clearSearchTerm}
//               className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
//               aria-label="Clear search" // Add aria-label for accessibility
//             >
//               <MdCancel size={24} aria-hidden="true" />
//             </button>
//           )}
//         </div>

//         {/* Add Recipient Button/Link */}
//         <div
//           onClick={handleAddRecipientClick}
//           role="button" // Add role for accessibility
//           tabIndex={0} // Make it focusable
//           onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAddRecipientClick(); }} // Keyboard accessibility
//           className="flex items-center p-4 -mx-4 rounded-2xl hover:bg-lightgray dark:hover:bg-primarybox transition-colors duration-200 ease-in-out cursor-pointer mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-primarybox"
//         >
//           <div className="size-12 rounded-full bg-green-600/20 p-2 flex items-center justify-center shrink-0"> {/* Added shrink-0 */}
//             <FaCirclePlus className="text-green-600" size={24} />
//           </div>
//           <div className="ml-4 flex-grow">
//             <h5 className="font-medium text-mainheading dark:text-white">Add a recipient</h5>
//           </div>
//           <IoIosArrowForward className="h-5 w-5 text-neutral-900 dark:text-white shrink-0" /> {/* Added shrink-0 */}
//         </div>

//         {/* Recipient List */}
//         {recipients.length === 0 && !searchTerm ? (
//             <p className="text-center text-gray-500 rounded-2xl dark:text-gray-300 text-lg dark:bg-white/8 py-10">
//                 You haven&apos;t added any recipients yet. Click &apos;Add a recipient&apos; to get started.
//             </p>
//         ) : filteredRecipients.length > 0 ? (
//           <div>
//             <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//               All
//             </h3>
//             <div className="space-y-1">
//               {filteredRecipients.map((recipient) => (
//                 // Wrap RecipientList or create a clickable div
//                 <div
//                   key={recipient._id}
//                   onClick={() => handleRecipientSelect(recipient._id)}
//                   role="button" // Add role for accessibility
//                   tabIndex={0} // Make it focusable
//                   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRecipientSelect(recipient._id); }} // Keyboard accessibility
//                   className="rounded-lg" // Added focus styles wrapper
//                 >
//                   <RecipientList
//                     recipient={recipient}
//                     isSelected={false} // Not used here
//                     showCheckbox={false} // Don't show checkbox
//                     // No onCheckboxChange needed
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           searchTerm && (
//             <p className="text-center text-gray-500 rounded-2xl dark:text-gray-300 text-lg dark:bg-white/8 py-10">
//               {/* Escaped single quotes */}
//               No recipients found matching &apos;{searchTerm}&apos;.
//             </p>
//           )
//         )}
//       </div>
//     </section>
//   );
// }


// frontend/src/app/dashboard/balances/[balanceId]/send/select-recipient/page.tsx
"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import RecipientList from "@/app/dashboard/components/RecipientList";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../../../contexts/AuthContext"; // Adjust path if needed
import recipientService from "../../../../../services/recipient"; // Adjust path if needed
import { MdCancel } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";

// Define a type for the recipient object for better type safety
interface Recipient {
  _id: string;
  accountHolderName?: string; // Optional if nickname is primary
  nickname?: string; // Optional if accountHolderName is primary
  // Add other relevant fields if used by RecipientList or elsewhere
  // e.g., bankName?: string; accountNumberLast4?: string; currency?: string; type?: string;
}

export default function SelectRecipientPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const params = useParams(); // Use the default hook return type
  const balanceIdParam = params.balanceId; // Access the specific param

  const { token } = useAuth();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loadingRecipients, setLoadingRecipients] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isValidParam, setIsValidParam] = useState(false); // State to track param validity

  // Validate balanceIdParam early
  useEffect(() => {
    if (typeof balanceIdParam === 'string') {
      setIsValidParam(true);
    } else if (balanceIdParam) {
      // Handle cases where balanceId might be an array (e.g., [...balanceId]) if your routing allows it
      console.error("Invalid balanceId parameter type:", typeof balanceIdParam);
      setError("Invalid page URL."); // Set an error
      // Optional: Redirect if param is definitely wrong
      // router.replace("/dashboard/balances");
    } else {
        // Handle case where balanceId is missing entirely (might happen during SSR/initial render)
        // We'll rely on loading state for now, but could add specific handling
        console.log("balanceId parameter not yet available.");
    }
  }, [balanceIdParam, router]); // Add router if using it inside error handling

  useEffect(() => {
    // Only fetch if the param is valid and token exists
    if (!isValidParam || !token) {
        // If param invalid, error is already set.
        // If no token, set loading to false to potentially trigger redirect logic below.
        if (!token) setLoadingRecipients(false);
        return;
    }

    const fetchRecipients = async () => {
      setLoadingRecipients(true);
      setError(null);
      try {
        const data: Recipient[] = await recipientService.getUserRecipients(token);
        setRecipients(data);
      } catch (err: unknown) {
        let errorMessage = "Failed to load recipients.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        console.error("Error fetching recipients:", err);
      } finally {
        setLoadingRecipients(false);
      }
    };

    fetchRecipients();

  }, [token, isValidParam]); // Depend on token and param validity

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  // Use the validated balanceId (only if it's a string)
  const balanceId = typeof balanceIdParam === 'string' ? balanceIdParam : '';

  const filteredRecipients = recipients.filter((recipient) => {
    const recipientName = recipient.accountHolderName ?? recipient.nickname ?? "";
    return recipientName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleRecipientSelect = (recipientId: string) => {
    if (!balanceId) return; // Prevent navigation if balanceId isn't valid
    router.push(
      `/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`
    );
  };

  const handleAddRecipientClick = () => {
    if (!balanceId) return; // Prevent navigation if balanceId isn't valid
    const returnUrl = `/dashboard/balances/${balanceId}/send/select-recipient`;
    router.push(
      `/dashboard/recipients/addrecipient?returnTo=${encodeURIComponent(
        returnUrl
      )}`
    );
  };

  // --- Render Logic ---

  // Handle missing token after initial checks/loading
  if (!loadingRecipients && !token) {
    console.log("No auth token found, redirecting to login.");
    // Use replace to prevent user from navigating back to this page without login
    router.replace("/auth/login");
    // Render null or a message while redirecting
    return <div className="container mx-auto py-10 text-center">Redirecting to login...</div>;
  }

  // Handle loading state
  if (loadingRecipients) {
    return (
      <>
        <div className="flex justify-between">
          <Skeleton className="h-8 w-64 mb-4 rounded-full" />
        </div>

        <div className="mb-8 flex justify-between gap-4">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
        <div className="space-y-2">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="block">
                <div className="block p-2 sm:p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    {/* Icon Skeleton */}
                    <div className="relative flex-shrink-0">
                      <div className="flex items-center justify-center">
                        <Skeleton className="h-12 w-12 rounded-full" />
                      </div>
                    </div>
                    {/* Text and Button Skeletons */}
                    <div className="flex-grow flex flex-row justify-between items-center gap-4">
                      <div className="flex-grow">
                        <Skeleton className="h-4 w-40 mb-2" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <div className="shrink-0">
                        <Skeleton className="h-5 w-10 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    )
  }

  // Handle errors (fetch errors or invalid param errors)
  if (error) {
    return (
      <div className="container mx-auto py-10 text-red-500 text-center">Error: {error}</div>
    );
  }

  // Handle case where balanceId is fundamentally invalid after loading/checks
  if (!isValidParam) {
     return (
       <div className="container mx-auto py-10 text-red-500 text-center">
         Error: Invalid page parameters. Please return to your balances.
       </div>
     );
  }

  // --- Main Content Render ---
  return (
    <section className="SelectRecipient-Page py-10">
      <div className="container mx-auto">
        <h1 className="text-2xl lg:text-3xl font-semibold text-mainheading dark:text-white mb-6">
          Who are you sending money to?
        </h1>

        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <FiSearch className="size-5 text-neutral-900 dark:text-white" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="w-full rounded-full h-12.5 py-3 pl-12 pr-10 border transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
            placeholder="Search existing recipients"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              onClick={clearSearchTerm}
              className="absolute inset-y-0 right-3 flex items-center text-neutral-900 dark:text-primary focus:outline-none cursor-pointer"
              aria-label="Clear search"
            >
              <MdCancel size={24} aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          onClick={handleAddRecipientClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAddRecipientClick(); }}
          className="flex items-center p-4 -mx-4 rounded-2xl hover:bg-lightgray dark:hover:bg-primarybox transition-colors duration-200 ease-in-out cursor-pointer mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-primarybox"
        >
          <div className="size-12 rounded-full bg-green-600/20 p-2 flex items-center justify-center shrink-0">
            <FaCirclePlus className="text-green-600" size={24} />
          </div>
          <div className="ml-4 flex-grow">
            <h5 className="font-medium text-mainheading dark:text-white">Add a recipient</h5>
          </div>
          <IoIosArrowForward className="h-5 w-5 text-neutral-900 dark:text-white shrink-0" />
        </div>

        {recipients.length === 0 && !searchTerm ? (
          <p className="text-center text-gray-500 rounded-2xl dark:text-gray-300 text-lg dark:bg-white/8 py-10">
            You haven't added any recipients yet. Click 'Add a recipient' to get started.
          </p>
        ) : filteredRecipients.length > 0 ? (
          <div>
            <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
              All
            </h3>
            <div className="space-y-1">
              {filteredRecipients.map((recipient) => (
                <div
                  key={recipient._id}
                  onClick={() => handleRecipientSelect(recipient._id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRecipientSelect(recipient._id); }}
                  className="rounded-lg"
                >
                  <RecipientList
                    recipient={recipient}
                    isSelected={false}
                    showCheckbox={false}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          searchTerm && (
            <p className="text-center text-gray-500 rounded-2xl dark:text-gray-300 text-lg dark:bg-white/8 py-10">
              No recipients found matching '{searchTerm}'.
            </p>
          )
        )}
      </div>
    </section>
  );
}