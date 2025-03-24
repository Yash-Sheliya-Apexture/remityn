// // components/Filter.tsx
// import React, { useState, useRef, useEffect } from "react";
// import { LuSettings2 } from "react-icons/lu";
// import { motion, AnimatePresence } from "framer-motion";
// import { AiOutlineDown } from "react-icons/ai"; // Import react-icons chevron down

// interface FilterProps {
//   // Define props if needed, e.g., filter options, onFilterChange callback
// }

// const Filter: React.FC<FilterProps> = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const popupRef = useRef<HTMLDivElement>(null);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const toggleOpen = () => setIsOpen(!isOpen);

//   const closePopup = () => setIsOpen(false);

//   // Close popup when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         closePopup();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, popupRef]);

//   return (
//     <div>
//       <button
//         className="bg-primary text-secondary font-medium py-1 px-4 rounded-full flex items-center"
//         onClick={toggleOpen}
//         aria-expanded={isOpen}
//         aria-controls="filter-popup"
//       >
//         <LuSettings2 size={20} className="sm:mr-2 " />
//         <span className="sm:block hidden">Filters</span>
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             id="filter-popup"
//             ref={popupRef}
//             className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-lg border-l border-gray-100 z-50" // Modified classes for full height right sidebar
//             initial={{ x: "100%", opacity: 0 }}
//             animate={{ x: "0%", opacity: 1 }}
//             exit={{ x: "100%", opacity: 0 }}
//             transition={{ type: "tween", duration: 0.2 }}
//           >
//             <div className="flex flex-col">
//               <div className="p-6 shadow">
//                 <h3 className="font-semibold text-main text-xl">Filters</h3>
//               </div>
//               <div className="p-6 h-[calc(100vh-165px)] overflow-y-auto">
//                 {/* Date Input */}
//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-[1px] after:rounded-full after:bg-gray/15 after:mt-1">
//                     Date
//                   </h4>
//                   <div className="pt-4">
//                     <div className="flex items-center gap-2">
//                       <button className="text-sm text-secondary font-medium border border-secondary px-2 py-1 rounded-full">
//                         Last month
//                       </button>
//                       <button className="text-sm text-secondary font-medium border border-secondary px-2 py-1 rounded-full">
//                         Last quarter
//                       </button>
//                       <button className="text-sm text-secondary font-medium border border-secondary px-2 py-1 rounded-full">
//                         Last year
//                       </button>
//                     </div>

//                     {/* Date Input */}
//                     <div className="mt-4 space-y-4">
//                       <div>
//                         <div className="relative mt-1">
//                           <div className="bg-white border border-main rounded-lg shadow-sm focus:ring-0">
//                             <div className=" flex items-center justify-between">
//                               <input
//                                 type="text" // or 'date' if you want a date picker
//                                 className="block w-full px-3 py-3 text-gray-500 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 sm:text-sm border-none rounded-none shadow-none"
//                                 placeholder="From Choose a start date"
//                                 value={fromDate}
//                                 onChange={(e) => setFromDate(e.target.value)}
//                               />
//                               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                                 <AiOutlineDown
//                                   className="h-5 w-5 text-gray-400"
//                                   aria-hidden="true"
//                                 />
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div>
//                         <div className="relative mt-1">
//                           <div className="bg-white border border-main rounded-lg shadow-sm focus:ring-0">
//                             <div className=" flex items-center justify-between">
//                               <input
//                                 type="text" // or 'date' if you want a date picker
//                                 className="block w-full px-3 py-3 text-gray-500 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 sm:text-sm border-none rounded-none shadow-none"
//                                 placeholder="To Choose an end date"
//                                 value={toDate}
//                                 onChange={(e) => setToDate(e.target.value)}
//                               />
//                               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                                 <AiOutlineDown
//                                   className="h-5 w-5 text-gray-400"
//                                   aria-hidden="true"
//                                 />
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                 <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-[1px] after:rounded-full after:bg-gray/15 after:mt-1">
//                     Recipients
//                   </h4>
//                 </div>
//               </div>

//               <div className="shadow border-t border-t-gray-100 p-6">
//                 <div className="flex items-center">
//                   <button
//                     type="button"
//                     className="bg-white border border-secondary text-secondary font-medium py-3 px-4 rounded-full mr-2 w-full"
//                     onClick={closePopup}
//                   >
//                     Cancel all
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-primary text-secondary border border-primary font-medium py-3 px-4 rounded-full w-full"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Filter;

// // components/Filter.tsx
// import React, { useState, useRef, useEffect } from "react";
// import { LuSettings2 } from "react-icons/lu";
// import { motion, AnimatePresence } from "framer-motion";
// import DateInput from "./Filter/DateInput";
// import Recipients from "./Filter/Recipients";

// interface FilterProps {
//   // Define props if needed
// }

// const Filter: React.FC<FilterProps> = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const popupRef = useRef<HTMLDivElement>(null);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [selectedRecipients, setSelectedRecipients] = useState<(string | number)[]>([]); // State to hold selected recipient IDs in Filter component

//   const toggleOpen = () => setIsOpen(!isOpen);
//   const closePopup = () => setIsOpen(false);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         closePopup();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, popupRef]);

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
//       accountHolderName: "Amit Patel",
//       accountNumber: "XXXX XXXX XXXX 5678",
//       countryCode: 'IN'
//     },
//     {
//       id: '4',
//       accountHolderName: "Sneha Reddy",
//       accountNumber: "XXXX XXXX XXXX 9012",
//       countryCode: 'IN'
//     },
//     {
//       id: '5',
//       accountHolderName: "Rahul Verma",
//       accountNumber: "XXXX XXXX XXXX 3456",
//       countryCode: 'IN'
//     },
//   ];

//   const handleRecipientSelectionChange = (recipientIds: (string | number)[]) => {
//     setSelectedRecipients(recipientIds);
//     console.log("Selected Recipient IDs in Filter:", recipientIds); // Example: Log the selected IDs in the parent component
//   };

//   const handleApplyFilters = () => {
//     // In a real application, you would use fromDate, toDate, and selectedRecipients to apply filters
//     console.log("Applying filters with:", {
//       fromDate,
//       toDate,
//       selectedRecipients,
//     });
//     closePopup(); // Close the filter popup after applying
//   };

//   return (
//     <div>
//       <button
//         className="bg-primary text-secondary font-medium py-3 px-6 rounded-full flex items-center"
//         onClick={toggleOpen}
//         aria-expanded={isOpen}
//         aria-controls="filter-popup"
//       >
//         <LuSettings2 size={22} className="sm:mr-2 " />
//         <span className="sm:block hidden">Filters</span>
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             id="filter-popup"
//             ref={popupRef}
//             className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-lg border-l border-gray-100 z-50"
//             initial={{ x: "100%", opacity: 0 }}
//             animate={{ x: "0%", opacity: 1 }}
//             exit={{ x: "100%", opacity: 0 }}
//             transition={{ type: "tween", duration: 0.2 }}
//           >
//             <div className="flex flex-col">
//               <div className="p-6 shadow">
//                 <h3 className="font-semibold text-main text-xl">Filters</h3>
//               </div>
//               <div className="p-6 h-[calc(100vh-165px)] overflow-y-auto scrollbar-hide">
//                 {/* Date Input */}
//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-[1px] after:rounded-full after:bg-gray/15 after:mt-1">
//                     Date
//                   </h4>
//                   <div className="pt-4">
//                   <DateInput
//                         placeholder="From Choose a start date"
//                         value={fromDate}
//                         onChange={(e) => setFromDate(e.target.value)}
//                       />
//                       <DateInput
//                         placeholder="To Choose an end date"
//                         value={toDate}
//                         onChange={(e) => setToDate(e.target.value)}
//                       />
//                   </div>
//                 </div>

//                 {/* Recipients */}
//                 <div>
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-[1px] after:rounded-full after:bg-gray/15 after:mt-1">
//                     Recipients
//                   </h4>
//                   <div className="pt-4">
//                     <Recipients
//                       recipients={sampleRecipients}
//                       onRecipientSelectionChange={handleRecipientSelectionChange} // Pass the callback
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="shadow border-t border-t-gray-100 p-6">
//                 <div className="flex items-center">
//                   <button
//                     type="button"
//                     className="bg-white border border-secondary text-secondary font-medium py-3 px-4 rounded-full mr-2 w-full"
//                     onClick={closePopup}
//                   >
//                     Cancel all
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-primary text-secondary border border-primary font-medium py-3 px-4 rounded-full w-full"
//                     onClick={handleApplyFilters} // Apply filters logic
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Filter;

// // components/Filter.tsx
// import React, { useState, useRef, useEffect } from "react";
// import { LuSettings2 } from "react-icons/lu";
// import { motion, AnimatePresence } from "framer-motion";
// import DateInput from "./Filter/DateInput";
// import Recipients from "./Filter/Recipients";

// interface FilterProps {
//   // Define props if needed
// }

// const Filter: React.FC<FilterProps> = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const popupRef = useRef<HTMLDivElement>(null);
//   const [fromDate, setFromDate] = useState(""); // Persist fromDate
//   const [toDate, setToDate] = useState("");     // Persist toDate
//   const [selectedRecipients, setSelectedRecipients] = useState<(string | number)[]>([]); // Persist selectedRecipients

//   const toggleOpen = () => setIsOpen(!isOpen);
//   const closePopup = () => setIsOpen(false);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         closePopup();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, popupRef]);

//   const handleRecipientSelectionChange = (recipientIds: (string | number)[]) => {
//     setSelectedRecipients(recipientIds);
//     console.log("Selected Recipient IDs in Filter:", recipientIds);
//   };

//   const handleApplyFilters = () => {
//     console.log("Applying filters with:", {
//       fromDate,
//       toDate,
//       selectedRecipients,
//     });
//     closePopup();
//   };

//   const handleClearAllFilters = () => {
//     setFromDate(""); // Reset fromDate
//     setToDate("");   // Reset toDate
//     setSelectedRecipients([]); // Reset selectedRecipients
//     closePopup(); // Close popup after clearing
//   };

//   return (
//     <div>
//       <button
//         className="bg-primary text-secondary font-medium py-3 px-6 rounded-full flex items-center"
//         onClick={toggleOpen}
//         aria-expanded={isOpen}
//         aria-controls="filter-popup"
//       >
//         <LuSettings2 size={22} className="sm:mr-2 " />
//         <span className="sm:block hidden">Filters</span>
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             id="filter-popup"
//             ref={popupRef}
//             className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-lg border-l border-gray-100 z-50"
//             initial={{ x: "100%", opacity: 0 }}
//             animate={{ x: "0%", opacity: 1 }}
//             exit={{ x: "100%", opacity: 0 }}
//             transition={{ type: "tween", duration: 0.2 }}
//           >
//             <div className="flex flex-col">
//               <div className="p-6 shadow">
//                 <h3 className="font-semibold text-main text-xl">Filters</h3>
//               </div>
//               <div className="p-6 h-[calc(100vh-165px)] overflow-y-auto scrollbar-hide">
//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-[1px] after:rounded-full after:bg-gray/15 after:mt-1">
//                     Date
//                   </h4>
//                   <div className="pt-4">
//                   <DateInput
//                         placeholder="From Choose a start date"
//                         value={fromDate}
//                         onChange={(e) => setFromDate(e.target.value)}
//                       />
//                       <DateInput
//                         placeholder="To Choose an end date"
//                         value={toDate}
//                         onChange={(e) => setToDate(e.target.value)}
//                       />
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-[1px] after:rounded-full after:bg-gray/15 after:mt-1">
//                     Recipients
//                   </h4>
//                   <div className="pt-4">
//                     <Recipients
//                       onRecipientSelectionChange={handleRecipientSelectionChange}
//                       selectedRecipientIds={selectedRecipients} // Pass selected recipients to Recipients component
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="shadow border-t border-t-gray-100 p-6">
//                 <div className="flex items-center">
//                   <button
//                     type="button"
//                     className="bg-white border border-secondary text-secondary font-medium py-3 px-4 rounded-full mr-2 w-full"
//                     onClick={handleClearAllFilters} // Use handleClearAllFilters to reset and close
//                   >
//                     Cancel all
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-primary text-secondary border border-primary font-medium py-3 px-4 rounded-full w-full"
//                     onClick={handleApplyFilters}
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Filter;

// // components/Filter.tsx
// import React, { useState } from "react";
// import { LuSettings2 } from "react-icons/lu";
// import { motion, AnimatePresence } from "framer-motion";
// import DateInput from "./Filter/DateInput";
// import Recipients from "./Filter/Recipients";
// import { BsList } from "react-icons/bs";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// interface FilterProps {
//   onFiltersApply: (filters: {
//     selectedRecipients: (string | number)[];
//   }) => void;
// }

// const Filter: React.FC<FilterProps> = ({ onFiltersApply }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const popupRef = React.useRef<HTMLDivElement>(null);
//   const [fromDate, setFromDate] = React.useState("");
//   const [toDate, setToDate] = React.useState("");
//   const [selectedRecipients, setSelectedRecipients] = React.useState<
//     (string | number)[]
//   >([]);

//   const toggleOpen = () => setIsOpen(!isOpen);
//   const closePopup = () => setIsOpen(false);

//   React.useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         closePopup();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, popupRef]);

//   const handleRecipientSelectionChange = (
//     recipientIds: (string | number)[]
//   ) => {
//     setSelectedRecipients(recipientIds);
//     console.log("Selected Recipient IDs in Filter:", recipientIds);
//   };

//   const handleApplyFilters = () => {
//     console.log("Applying filters with:", {
//       fromDate,
//       toDate,
//       selectedRecipients,
//     });
//     onFiltersApply({ selectedRecipients });
//     closePopup();
//   };

//   const handleClearAllFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setSelectedRecipients([]);
//     onFiltersApply({ selectedRecipients: [] }); // Clear recipient filters in parent component
//     closePopup();
//   };


//   const [selectedDirection, setSelectedDirection] = useState<string>('all');

//   const handleDirectionChange = (direction: string) => {
//     setSelectedDirection(direction);
//   };

//   return (
//     <div>
//       <button
//         className="bg-primary text-secondary font-medium py-3 px-6 rounded-full flex items-center"
//         onClick={toggleOpen}
//         aria-expanded={isOpen}
//         aria-controls="filter-popup"
//       >
//         <LuSettings2 size={22} className="sm:mr-2 " />
//         <span className="sm:block hidden">Filters</span>
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             id="filter-popup"
//             ref={popupRef}
//             className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-lg border-l border-gray-100 z-50"
//             initial={{ x: "100%", opacity: 0 }}
//             animate={{ x: "0%", opacity: 1 }}
//             exit={{ x: "100%", opacity: 0 }}
//             transition={{ type: "tween", duration: 0.2 }}
//           >
//             <div className="flex flex-col">
//               <div className="p-6 shadow">
//                 <h3 className="font-semibold text-main text-xl">Filters</h3>
//               </div>
//               <div className="p-6 h-[calc(100vh-165px)] overflow-y-auto scrollbar-hide">
//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Date
//                   </h4>
//                   <div className="pt-4">
//                     <DateInput
//                       placeholder="From Choose a start date"
//                       value={fromDate}
//                       onChange={(e) => setFromDate(e.target.value)}
//                     />
//                     <DateInput
//                       placeholder="To Choose an end date"
//                       value={toDate}
//                       onChange={(e) => setToDate(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Recipients
//                   </h4>
//                   <div className="pt-4">
//                     <Recipients
//                       onRecipientSelectionChange={
//                         handleRecipientSelectionChange
//                       }
//                       selectedRecipientIds={selectedRecipients}
//                     />
//                   </div>
//                 </div>

//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Status
//                   </h4>
//                   <div className="pt-4 flex items-center gap-2">
//                     <button className="font-medium border border-secondary rounded-full px-4 py-1 text-secondary">
//                       Completed
//                     </button>
//                     <button className="font-medium border border-secondary rounded-full px-4 py-1 text-secondary">
//                       Cancel
//                     </button>
//                   </div>
//                 </div>

//                 {/* Direction */}
//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Direction
//                   </h4>
//                   <div className="pt-4">
//                     {/* All */}
//                     <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                       <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
//                         <BsList size={24} className="text-main" />
//                       </div>
//                       <span className="text-main font-semibold">All</span>
//                       <div className="ml-auto relative">
//                         <input
//                           type="radio"
//                           className="hidden"
//                           name="direction"
//                           value="all"
//                           checked={selectedDirection === "all"}
//                           onChange={() => handleDirectionChange("all")}
//                         />
//                         <div
//                           className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
//                             selectedDirection === "all"
//                               ? "border-primary"
//                               : ""
//                           }`}
//                         >
//                           {selectedDirection === "all" && (
//                             <div className="w-3 h-3 rounded-full bg-primary"></div>
//                           )}
//                         </div>
//                       </div>
//                     </label>

//                     {/* Money in */}
//                     <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                       <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
//                         <LuPlus size={24} className="text-main" />
//                       </div>
//                       <span className="text-main font-semibold">Add Money</span>
//                       <div className="ml-auto relative">
//                         <input
//                           type="radio"
//                           className="hidden"
//                           name="direction"
//                           value="in"
//                           checked={selectedDirection === "in"}
//                           onChange={() => handleDirectionChange("in")}
//                         />
//                         <div
//                           className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
//                             selectedDirection === "in" ? "border-primary" : ""
//                           }`}
//                         >
//                           {selectedDirection === "in" && (
//                             <div className="w-3 h-3 rounded-full bg-primary"></div>
//                           )}
//                         </div>
//                       </div>
//                     </label>

//                     {/* Money out */}
//                     <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                       <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
//                         <GoArrowUp size={24} className="text-main" />
//                       </div>
//                       <span className="text-main font-semibold">Send Money</span>
//                       <div className="ml-auto relative">
//                         <input
//                           type="radio"
//                           className="hidden"
//                           name="direction"
//                           value="out"
//                           checked={selectedDirection === "out"}
//                           onChange={() => handleDirectionChange("out")}
//                         />
//                         <div
//                           className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
//                             selectedDirection === "out"
//                               ? "border-primary"
//                               : ""
//                           }`}
//                         >
//                           {selectedDirection === "out" && (
//                             <div className="w-3 h-3 rounded-full bg-primary"></div>
//                           )}
//                         </div>
//                       </div>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="shadow border-t border-t-gray-100 p-6">
//                 <div className="flex items-center">
//                   <button
//                     type="button"
//                     className="bg-white border border-secondary text-secondary font-medium py-3 px-4 rounded-full mr-2 w-full"
//                     onClick={handleClearAllFilters} // Modified onClick handler
//                   >
//                     Cancel all
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-primary text-secondary border border-primary font-medium py-3 px-4 rounded-full w-full"
//                     onClick={handleApplyFilters}
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Filter;










// // components/Filter.tsx
// import React, { useState } from "react";
// import { LuSettings2 } from "react-icons/lu";
// import { motion, AnimatePresence } from "framer-motion";
// import DateInput from "./Filter/DateInput";
// import Recipients from "./Filter/Recipients";
// import DirectionFilter from "./Filter/DirectionFilter"; // Import DirectionFilter

// interface FilterProps {
//   onFiltersApply: (filters: {
//     selectedRecipients: (string | number)[];
//     selectedDirection?: string; // Add selectedDirection to filters if needed in parent component
//   }) => void;
// }

// const Filter: React.FC<FilterProps> = ({ onFiltersApply }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const popupRef = React.useRef<HTMLDivElement>(null);
//   const [fromDate, setFromDate] = React.useState("");
//   const [toDate, setToDate] = React.useState("");
//   const [selectedRecipients, setSelectedRecipients] = React.useState<
//     (string | number)[]
//   >([]);
//   const [selectedDirection, setSelectedDirection] = useState<string>('all'); // State for Direction

//   const toggleOpen = () => setIsOpen(!isOpen);
//   const closePopup = () => setIsOpen(false);

//   React.useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         closePopup();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, popupRef]);

//   const handleRecipientSelectionChange = (
//     recipientIds: (string | number)[]
//   ) => {
//     setSelectedRecipients(recipientIds);
//     console.log("Selected Recipient IDs in Filter:", recipientIds);
//   };

//   const handleDirectionChange = (direction: string) => {
//     setSelectedDirection(direction);
//   };

//   const handleApplyFilters = () => {
//     console.log("Applying filters with:", {
//       fromDate,
//       toDate,
//       selectedRecipients,
//       selectedDirection, // Include selectedDirection in apply filters
//     });
//     onFiltersApply({ selectedRecipients, selectedDirection }); // Pass selectedDirection to parent
//     closePopup();
//   };

//   const handleClearAllFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setSelectedRecipients([]);
//     setSelectedDirection('all'); // Reset direction filter as well
//     onFiltersApply({ selectedRecipients: [], selectedDirection: 'all' }); // Clear recipient and direction filters in parent
//     closePopup();
//   };


//   return (
//     <div>
//       <button
//         className="bg-primary text-secondary font-medium py-3 px-6 rounded-full flex items-center"
//         onClick={toggleOpen}
//         aria-expanded={isOpen}
//         aria-controls="filter-popup"
//       >
//         <LuSettings2 size={22} className="sm:mr-2 " />
//         <span className="sm:block hidden">Filters</span>
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             id="filter-popup"
//             ref={popupRef}
//             className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-lg border-l border-gray-100 z-50"
//             initial={{ x: "100%", opacity: 0 }}
//             animate={{ x: "0%", opacity: 1 }}
//             exit={{ x: "100%", opacity: 0 }}
//             transition={{ type: "tween", duration: 0.2 }}
//           >
//             <div className="flex flex-col">
//               <div className="p-6 shadow">
//                 <h3 className="font-semibold text-main text-xl">Filters</h3>
//               </div>
//               <div className="p-6 h-[calc(100vh-165px)] overflow-y-auto scrollbar-hide">
//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Date
//                   </h4>
//                   <div className="pt-4">
//                     <DateInput
//                       placeholder="From Choose a start date"
//                       value={fromDate}
//                       onChange={(e) => setFromDate(e.target.value)}
//                     />
//                     <DateInput
//                       placeholder="To Choose an end date"
//                       value={toDate}
//                       onChange={(e) => setToDate(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Recipients
//                   </h4>
//                   <div className="pt-4">
//                     <Recipients
//                       onRecipientSelectionChange={
//                         handleRecipientSelectionChange
//                       }
//                       selectedRecipientIds={selectedRecipients}
//                     />
//                   </div>
//                 </div>

//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Status
//                   </h4>
//                   <div className="pt-4 flex items-center gap-2">
//                     <button className="font-medium border border-secondary rounded-full px-4 py-1 text-secondary">
//                       Completed
//                     </button>
//                     <button className="font-medium border border-secondary rounded-full px-4 py-1 text-secondary">
//                       Cancel
//                     </button>
//                   </div>
//                 </div>

//                 {/* Direction Component */}
//                 <div className="pb-16">
//                   <DirectionFilter
//                     selectedDirection={selectedDirection}
//                     onDirectionChange={handleDirectionChange}
//                   />
//                 </div>
//               </div>

//               <div className="shadow border-t border-t-gray-100 p-6">
//                 <div className="flex items-center">
//                   <button
//                     type="button"
//                     className="bg-white border border-secondary text-secondary font-medium py-3 px-4 rounded-full mr-2 w-full"
//                     onClick={handleClearAllFilters}
//                   >
//                     Cancel all
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-primary text-secondary border border-primary font-medium py-3 px-4 rounded-full w-full"
//                     onClick={handleApplyFilters}
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Filter;











// // components/Filter.tsx
// import React, { useState } from "react";
// import { LuSettings2 } from "react-icons/lu";
// import { motion, AnimatePresence } from "framer-motion";
// import DateInput from "./Filter/DateInput";
// import Recipients from "./Filter/Recipients";
// import DirectionFilter from "./Filter/DirectionFilter";
// import Status from "./Filter/Status"; // Import the new Status component
// import Image from "next/image";

// interface FilterProps {
//   onFiltersApply: (filters: {
//     selectedRecipients: (string | number)[];
//     selectedDirection?: string;
//     selectedStatus?: string | null; // Add selectedStatus to filters
//   }) => void;
// }

// const Filter: React.FC<FilterProps> = ({ onFiltersApply }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const popupRef = React.useRef<HTMLDivElement>(null);
//   const [fromDate, setFromDate] = React.useState("");
//   const [toDate, setToDate] = React.useState("");
//   const [selectedRecipients, setSelectedRecipients] = React.useState<
//     (string | number)[]
//   >([]);
//   const [selectedDirection, setSelectedDirection] = useState<string>('all');
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // State for Status

//   const toggleOpen = () => setIsOpen(!isOpen);
//   const closePopup = () => setIsOpen(false);

//   React.useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         closePopup();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, popupRef]);

//   const handleRecipientSelectionChange = (
//     recipientIds: (string | number)[]
//   ) => {
//     setSelectedRecipients(recipientIds);
//     console.log("Selected Recipient IDs in Filter:", recipientIds);
//   };

//   const handleDirectionChange = (direction: string) => {
//     setSelectedDirection(direction);
//   };

//   const handleStatusChange = (status: string | null) => {
//     setSelectedStatus(status);
//     console.log("Selected Status in Filter:", status);
//   };


//   const handleApplyFilters = () => {
//     console.log("Applying filters with:", {
//       fromDate,
//       toDate,
//       selectedRecipients,
//       selectedDirection,
//       selectedStatus, // Include selectedStatus in apply filters
//     });
//     onFiltersApply({ selectedRecipients, selectedDirection, selectedStatus }); // Pass selectedStatus to parent
//     closePopup();
//   };

//   const handleClearAllFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setSelectedRecipients([]);
//     setSelectedDirection('all');
//     setSelectedStatus(null); // Reset status filter as well
//     onFiltersApply({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null }); // Clear status filter in parent
//     closePopup();
//   };


//   return (
//     <div>
//       <button
//         className="bg-primary text-secondary font-medium py-3 px-6 rounded-full flex items-center"
//         onClick={toggleOpen}
//         aria-expanded={isOpen}
//         aria-controls="filter-popup"
//       >
//         <LuSettings2 size={22} className="sm:mr-2 " />
//         <span className="sm:block hidden">Filters</span>
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             id="filter-popup"
//             ref={popupRef}
//             className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-lg border-l border-gray-100 z-50"
//             initial={{ x: "100%", opacity: 0 }}
//             animate={{ x: "0%", opacity: 1 }}
//             exit={{ x: "100%", opacity: 0 }}
//             transition={{ type: "tween", duration: 0.2 }}
//           >
//             <div className="flex flex-col">
//               <div className="p-6 shadow">
//                 <h3 className="font-semibold text-main text-xl">Filters</h3>
//               </div>
//               <div className="p-6 h-[calc(100vh-165px)] overflow-y-auto scrollbar-hide">
//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Date
//                   </h4>
//                   <div className="pt-4">
//                     <DateInput
//                       placeholder="From Choose a start date"
//                       value={fromDate}
//                       onChange={(e) => setFromDate(e.target.value)}
//                     />
//                     <DateInput
//                       placeholder="To Choose an end date"
//                       value={toDate}
//                       onChange={(e) => setToDate(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Recipients
//                   </h4>
//                   <div className="pt-4">
//                     <Recipients
//                       onRecipientSelectionChange={
//                         handleRecipientSelectionChange
//                       }
//                       selectedRecipientIds={selectedRecipients}
//                     />
//                   </div>
//                 </div>

//                 {/* Status Component */}
//                 <div className="pb-16">
//                   <Status
//                     selectedStatus={selectedStatus}
//                     onStatusChange={handleStatusChange}
//                   />
//                 </div>

//                 {/* Direction Component */}
//                 <div className="pb-16">
//                   <DirectionFilter
//                     selectedDirection={selectedDirection}
//                     onDirectionChange={handleDirectionChange}
//                   />
//                 </div>

//                 {/* Balance Component */}
//                 <div className="pb-16">
//                   <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//                     Balance
//                   </h4>
//                   <div className="pt-4">
//                     <div className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                       <div className="flex items-center">
//                         <div className="relative">
//                           <Image src={"/assets/icon/eur.svg"} alt="Euro Flag" width={48} height={48}/>
//                         </div>
//                         <div className="ml-4">
//                           <h5 className="font-medium text-main capitalize">
//                             Euro Balance
//                           </h5>
//                         </div>
//                       </div>
//                       <div className="pt-1.5">
//                         <input
//                           type="checkbox"
//                           className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="shadow border-t border-t-gray-100 p-6">
//                 <div className="flex items-center">
//                   <button
//                     type="button"
//                     className="bg-white border border-secondary text-secondary font-medium py-3 px-4 rounded-full mr-2 w-full"
//                     onClick={handleClearAllFilters}
//                   >
//                     Cancel all
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-primary text-secondary border border-primary font-medium py-3 px-4 rounded-full w-full"
//                     onClick={handleApplyFilters}
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Filter;






// components/Filter.tsx
import React, { useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import DateInput from "./Filter/DateInput";
import Recipients from "./Filter/Recipients";
import DirectionFilter from "./Filter/DirectionFilter";
import Status from "./Filter/Status";
import Image from "next/image";
import Balance from "./Filter/Balance"; // Import the new Balance component

interface FilterProps {
  onFiltersApply: (filters: {
    selectedRecipients: (string | number)[];
    selectedDirection?: string;
    selectedStatus?: string | null;
    selectedBalance?: string | null; // Add selectedBalance to filters
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFiltersApply }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [selectedRecipients, setSelectedRecipients] = React.useState<
    (string | number)[]
  >([]);
  const [selectedDirection, setSelectedDirection] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedBalance, setSelectedBalance] = useState<string | null>(null); // State for Balance

  const toggleOpen = () => setIsOpen(!isOpen);
  const closePopup = () => setIsOpen(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, popupRef]);

  const handleRecipientSelectionChange = (
    recipientIds: (string | number)[]
  ) => {
    setSelectedRecipients(recipientIds);
    console.log("Selected Recipient IDs in Filter:", recipientIds);
  };

  const handleDirectionChange = (direction: string) => {
    setSelectedDirection(direction);
  };

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status);
    console.log("Selected Status in Filter:", status);
  };

  const handleBalanceChange = (isSelected: boolean) => {
    setSelectedBalance(isSelected ? 'EUR' : null); // Example: Assuming EUR is the only balance for now
    console.log("Selected Balance in Filter:", isSelected ? 'EUR' : null);
  };


  const handleApplyFilters = () => {
    console.log("Applying filters with:", {
      fromDate,
      toDate,
      selectedRecipients,
      selectedDirection,
      selectedStatus,
      selectedBalance, // Include selectedBalance in apply filters
    });
    onFiltersApply({
      selectedRecipients,
      selectedDirection,
      selectedStatus,
      selectedBalance // Pass selectedBalance to parent
    });
    closePopup();
  };

  const handleClearAllFilters = () => {
    setFromDate("");
    setToDate("");
    setSelectedRecipients([]);
    setSelectedDirection('all');
    setSelectedStatus(null);
    setSelectedBalance(null); // Reset balance filter as well
    onFiltersApply({
      selectedRecipients: [],
      selectedDirection: 'all',
      selectedStatus: null,
      selectedBalance: null // Clear balance filter in parent
    });
    closePopup();
  };


  return (
    <div>
      <button
        className="bg-primary text-secondary font-medium py-3 px-6 rounded-full flex items-center"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls="filter-popup"
      >
        <LuSettings2 size={22} className="sm:mr-2 " />
        <span className="sm:block hidden">Filters</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="filter-popup"
            ref={popupRef}
            className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-lg border-l border-gray-100 z-50"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="flex flex-col">
              <div className="p-6 shadow">
                <h3 className="font-semibold text-main text-xl">Filters</h3>
              </div>
              <div className="p-6 h-[calc(100vh-165px)] overflow-y-auto scrollbar-hide">
                <div className="pb-16">
                  <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
                    Date
                  </h4>
                  <div className="pt-4">
                    <DateInput
                      placeholder="From Choose a start date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                    <DateInput
                      placeholder="To Choose an end date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pb-16">
                  <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
                    Recipients
                  </h4>
                  <div className="pt-4">
                    <Recipients
                      onRecipientSelectionChange={
                        handleRecipientSelectionChange
                      }
                      selectedRecipientIds={selectedRecipients}
                    />
                  </div>
                </div>

                {/* Status Component */}
                <div className="pb-16">
                  <Status
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStatusChange}
                  />
                </div>

                {/* Direction Component */}
                <div className="pb-16">
                  <DirectionFilter
                    selectedDirection={selectedDirection}
                    onDirectionChange={handleDirectionChange}
                  />
                </div>

                {/* Balance Component */}
                <div className="pb-16">
                  <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
                    Balance
                  </h4>
                  <div className="pt-4">
                    <Balance
                      currency="EUR"
                      onBalanceChange={handleBalanceChange}
                      isSelected={selectedBalance === 'EUR'}
                    />
                  </div>
                </div>

              </div>

              <div className="shadow border-t border-t-gray-100 p-6">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-white border border-secondary text-secondary font-medium py-3 px-4 rounded-full mr-2 w-full"
                    onClick={handleClearAllFilters}
                  >
                    Cancel all
                  </button>
                  <button
                    type="button"
                    className="bg-primary text-secondary border border-primary font-medium py-3 px-4 rounded-full w-full"
                    onClick={handleApplyFilters}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;