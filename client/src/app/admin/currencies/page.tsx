// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import apiConfig from "../../config/apiConfig";
// import Image from "next/image";
// import {
//   Loader2,
//   PlusCircle,
//   Info,
//   Edit,
//   Trash2,
//   Save,
//   Percent,
// } from "lucide-react";
// import { IoClose} from "react-icons/io5";
// import { CiSearch } from "react-icons/ci";
// import { IoMdAdd, IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface Currency {
//   _id: string;
//   code: string;
//   currencyName: string;
//   flagImage?: string;
//   rateAdjustmentPercentage?: number; // Updated field name
// }

// // Interface for the form data
// interface NewCurrencyData {
//   code: string;
//   currencyName: string;
//   flagImage: string;
//   rateAdjustmentPercentage: string; // Use string for input
// }

// const AdminCurrenciesPage: React.FC = () => {
//   const [currencies, setCurrencies] = useState<Currency[]>([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
//     code: "",
//     currencyName: "",
//     flagImage: "",
//     rateAdjustmentPercentage: "",
//   });
//   const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
//     null
//   );
//   // State for inline editing - needs to use the new field name
//   const [editingFields, setEditingFields] = useState<{
//     code: string;
//     rateAdjustmentPercentage: string;
//   }>({ code: "", rateAdjustmentPercentage: "" });

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState<boolean>(false);
//   const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const { token } = useAuth();
//   const router = useRouter();

//   // Memoized filtered currencies
//   const filteredCurrencies = useMemo(() => {
//     if (!searchTerm) return currencies;
//     const lowerSearchTerm = searchTerm.toLowerCase();
//     return currencies.filter(
//       (currency) =>
//         currency.code.toLowerCase().includes(lowerSearchTerm) ||
//         currency.currencyName.toLowerCase().includes(lowerSearchTerm)
//     );
//   }, [currencies, searchTerm]);

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (768px as an example)
//     };

//     checkMobileScreen(); // Initial check on mount

//     window.addEventListener("resize", checkMobileScreen); // Add listener for resize

//     return () => {
//       window.removeEventListener("resize", checkMobileScreen); // Cleanup listener on unmount
//     };
//   }, []);

//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   const modalVariants = isMobile ? mobileVariants : desktopVariants;

//   useEffect(() => {
//     fetchCurrenciesList();
//   }, [token]); // Removed router dependency unless needed for redirect logic inside fetch

//   const fetchCurrenciesList = async () => {
//     if (!token) {
//       router.push("/auth/login"); // Redirect if no token early
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.get<Currency[]>("/admin/currencies", {
//         // Expect array of Currency
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrencies(response.data);
//     } catch (err: any) {
//       console.error("Error fetching currencies:", err);
//       if (err.response?.status === 403 || err.response?.status === 401) {
//         router.push("/auth/login");
//       } else {
//         toast.error(err.response?.data?.message || "Failed to load currencies");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewCurrencyData((prev) => ({
//       ...prev,
//       // Convert code to uppercase immediately
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   // handleCreateCurrency - updated validation and payload
//   const handleCreateCurrency = async () => {
//     if (!newCurrencyData.code || !newCurrencyData.currencyName) {
//       toast.error("Currency code and name are required.");
//       return;
//     }
//     if (newCurrencyData.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0; // Default to 0
//     if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error(
//           "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1)."
//         );
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: newCurrencyData.code,
//         currencyName: newCurrencyData.currencyName,
//         flagImage: newCurrencyData.flagImage.trim() || null,
//         rateAdjustmentPercentage: adjustmentValue, // Send parsed number
//       };
//       await axios.post("/admin/currencies", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCurrencyData({
//         code: "",
//         currencyName: "",
//         flagImage: "",
//         rateAdjustmentPercentage: "",
//       });
//       setIsCreateModalOpen(false);
//       await fetchCurrenciesList();
//       toast.success("Currency added successfully!");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to create currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Inline Editing Handlers ---
//   const startEditing = (currency: Currency) => {
//     setEditingCurrencyId(currency._id);
//     setEditingFields({
//       code: currency.code,
//       rateAdjustmentPercentage:
//         currency.rateAdjustmentPercentage?.toString() ?? "0", // Default to '0' string if null/undefined
//     });
//   };

//   const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingFields((prev) => ({
//       ...prev,
//       [name]: name === "code" ? value.toUpperCase() : value,
//     }));
//   };

//   const handleUpdateCurrency = async () => {
//     if (!editingCurrencyId) return;

//     if (!editingFields.code || editingFields.code.length !== 3) {
//       toast.error("Currency code must be 3 letters.");
//       return;
//     }

//     let adjustmentValue: number = 0;
//     if (editingFields.rateAdjustmentPercentage.trim() !== "") {
//       adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
//       if (isNaN(adjustmentValue)) {
//         toast.error("Rate Adjustment must be a valid number.");
//         return;
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         code: editingFields.code,
//         rateAdjustmentPercentage: adjustmentValue,
//       };
//       await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingCurrencyId(null);
//       setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//       await fetchCurrenciesList();
//       toast.success("Currency updated successfully!");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to update currency");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingCurrencyId(null);
//     setEditingFields({ code: "", rateAdjustmentPercentage: "" });
//   };
//   // --- End Inline Editing Handlers ---

//   const handleDeleteCurrency = async () => {
//     if (!currencyToDeleteId) return;
//     setIsSubmitting(true);
//     try {
//       await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // Close confirmation, reset ID, fetch list, show success
//       setIsDeleteConfirmationOpen(false);
//       setCurrencyToDeleteId(null);
//       await fetchCurrenciesList();
//       toast.success("Currency deleted successfully!");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to delete currency");
//       // Keep modal open on error to show message
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- RENDER ---
//   return (
//     <div className="min-h-screen p-4 bg-gray-50 dark:bg-background dark:text-white">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       {/* Header Section */}
//       <div className="py-6 mb-6 border-b">
//         <h1 className="lg:text-3xl text-2xl font-bold text-neutral-900 dark:text-white mb-2.5">
//           Currency Management
//         </h1>
//         <p className="text-gray-500 dark:text-gray-300 capitalize">
//           Manage currency options and custom rates for your application
//         </p>
//       </div>

//       {/* Action Bar */}
//       <div className="flex justify-end flex-col lg:flex-row w-full  md:items-center mb-6 space-y-3 lg:space-y-0 gap-4">
//         <div>
//         <button
//           onClick={() => {
//             setIsCreateModalOpen(true);
//           }} // Clear error on open
//           className="bg-primary text-neutral-900 flex hover:bg-primaryhover text-nowrap font-medium rounded-full text-center lg:px-6 p-2 lg:py-3 lg:h-12.5  items-center gap-1 cursor-pointer transition-all duration-75 ease-linear"
//         >
//           <IoMdAdd  
//             className="size-8"
//             title={isMobile ? "Add Currency" : undefined} // Tooltip for mobile
//           />
//           {!isMobile && <span>Add Currency</span>}
//           {/* Conditionally render text */}
//         </button>
//         <div className="text-white ml-2 mt-2 lg:hidden">Add</div>
//         </div>

//         {/* Search Bar */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search currencies..."
//             className="rounded-full pl-10 pr-3 lg:h-12.5 h-12 border w-full transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-none focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <CiSearch className="size-5 absolute top-3.5 left-3 text-neutral-900 dark:text-white" />
//         </div>
//       </div>

//       {/* Currency List / Loading / Empty State */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <Loader2 size={60} className="text-neutral-900 animate-spin" />
//         </div>
//       ) : filteredCurrencies.length === 0 ? (
//         <div className="p-8 text-center rounded-lg shadow-sm border">
//           <div className="flex justify-center items-center">
//             {/* <IoWarningOutline className="text-error size-20  mx-auto mb-6" /> */}
//             <Image
//               src="/assets/images/money-bag-removebg-preview.png"
//               width={250}
//               height={250}
//               alt="Picture of the author"
//             />
//           </div>
//           <p className="text-neutral-900 font-medium text-xl dark:text-white capitalize">
//             No currencies found You Can Choose Anthor currencies.
//           </p>
//         </div>
//       ) : (
//         // --- Currency    ---
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredCurrencies.map((currency) => (
//             <div
//               key={currency._id}
//               className="rounded-xl overflow-hidden transition-all duration-300 border flex flex-col"
//             >
//               <div className="lg:p-5 p-4 flex-grow">
//                 {/* Top Section: Flag, Code, Name */}
//                 <div className="flex items-center gap-4 mb-4">
//                   {/* Flag Image */}
//                   {currency.flagImage ? (
//                     <img
//                       src={currency.flagImage}
//                       alt={`${currency.currencyName} Flag`}
//                       className="size-14 object-contain rounded-full"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).style.display =
//                           "none"; /* Hide on error */
//                       }}
//                     />
//                   ) : (
//                     <div className="size-12 border bg-gray-100  rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
//                       No flag
//                     </div>
//                   )}

//                   {/* Code and Name */}
//                   <div className="flex-1">
//                     {editingCurrencyId === currency._id ? (
//                       <input
//                         type="text"
//                         name="code"
//                         value={editingFields.code}
//                         onChange={handleEditingInputChange}
//                         className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
//                         autoFocus
//                         maxLength={3}
//                       />
//                     ) : (
//                       <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        
//                         {currency.code}
//                       </h3>
//                     )}
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-0.5">
                      
//                       {currency.currencyName}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Rate Adjustment Section - UPDATED */}
//                 <div className="p-3 space-y-2 rounded-lg border">
//                   <label className="font-medium text-gray-500 dark:text-gray-300 mb-1 flex items-center gap-1">
//                     Our Rates
//                   </label>

//                   {editingCurrencyId === currency._id ? (
//                     <input
//                       type="number"
//                       name="rateAdjustmentPercentage" // Correct name
//                       value={editingFields.rateAdjustmentPercentage}
//                       onChange={handleEditingInputChange}
//                       placeholder="e.g., 0.5 or +0.1"
//                       step="any"
//                       className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5"
//                     />
//                   ) : (
//                     <p
//                       className={`text-lg font-bold ${
//                         currency.rateAdjustmentPercentage != null
//                           ? "text-neutral-900 font-medium dark:text-white"
//                           : "text-gray-400 italic dark:text-gray-500"
//                       }`}
//                     >
//                       {currency.rateAdjustmentPercentage != null
//                         ? `${currency.rateAdjustmentPercentage.toLocaleString(
//                             undefined,
//                             {
//                               minimumFractionDigits: 0,
//                               maximumFractionDigits: 2,
//                             }
//                           )}%`
//                         : "Not Set"}
//                     </p>
//                   )}
//                   <p className="text-gray-500 dark:text-gray-300 mt-1">
//                     Our Rates vs market rate.
//                   </p>
//                 </div>
//               </div>

//               {/* Actions Footer */}
//               <div className=" border-t p-3">
//                 {editingCurrencyId === currency._id ? (
//                   // --- Save/Cancel Buttons ---
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleUpdateCurrency}
//                       disabled={isSubmitting}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       {isSubmitting ? (
//                         <Loader2 size={20} className="animate-spin" />
//                       ) : (
//                         <Save size={20} />
//                       )}
//                       Save
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       <IoMdCloseCircle size={20} /> Cancel
//                     </button>
//                   </div>
//                 ) : (
//                   // --- Details/Edit/Delete Buttons ---
//                   <div className="flex flex-row gap-2">
//                     <Link
//                       href={`/admin/currencies/${currency._id}`}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       <Info size={20} /> Details
//                     </Link>
//                     <button
//                       onClick={() => startEditing(currency)}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       <Edit size={20} /> Edit
//                     </button>
//                     <button
//                       onClick={() => {
//                         setCurrencyToDeleteId(currency._id);
//                         setIsDeleteConfirmationOpen(true);
//                       }}
//                       className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
//                     >
//                       <Trash2 size={20} /> Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Add Currency Modal */}
//       <AnimatePresence>
//         {isCreateModalOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsCreateModalOpen(false)}
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl w-full sm:max-w-xl relative"
//               onClick={(e) => e.stopPropagation()}
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//             >
//               <button
//                 className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                 onClick={() => setIsCreateModalOpen(false)}
//                 aria-label="Close modal"
//               >
//                 <IoClose className="size-8 text-neutral-900 " />
//               </button>

//               <div className="lg:p-6 p-4">
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="lg:text-xl font-medium text-neutral-900 dark:text-white">
                    
//                     Add New Currency
//                   </h2>
//                 </div>

//                 {/* Modal Form */}
//                 <div className="space-y-5">
//                   {/* Code */}
//                   <div>
//                     <label
//                       htmlFor="create-code"
//                       className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1"
//                     >
                      
//                       Currency Code <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-code"
//                       name="code"
//                       value={newCurrencyData.code}
//                       onChange={handleCreateInputChange}
//                       maxLength={3}
//                       placeholder="e.g., USD"
//                       className="w-full rounded-lg border dark:text-white px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300"
//                     />
//                     <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
//                       3-letter uppercase code.
//                     </p>
//                   </div>
//                   {/* Name */}
//                   <div>
//                     <label
//                       htmlFor="create-currencyName"
//                       className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2"
//                     >
                      
//                       Currency Name <span className="text-red-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="create-currencyName"
//                       name="currencyName"
//                       value={newCurrencyData.currencyName}
//                       onChange={handleCreateInputChange}
//                       placeholder="e.g., US Dollar"
//                       className="w-full rounded-lg border dark:text-white px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300"
//                     />
//                   </div>
//                   {/* Flag Image Path */}
//                   <div>
//                     <label
//                       htmlFor="create-flagImage"
//                       className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2"
//                     >
                      
//                       Flag Image Path
//                     </label>
//                     <input
//                       type="text"
//                       id="create-flagImage"
//                       name="flagImage"
//                       value={newCurrencyData.flagImage}
//                       onChange={handleCreateInputChange}
//                       placeholder="/assets/icon/flags/usd.png"
//                       className="w-full rounded-lg border dark:text-white px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300"
//                     />
//                     <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
//                       Relative path to the image.
//                     </p>
//                   </div>
//                   {/* Rate Adjustment Percentage - UPDATED */}
//                   <div>
//                     <label
//                       htmlFor="create-rateAdjustmentPercentage"
//                       className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2 flex items-center gap-1"
//                     >
//                       <Percent size={14} className="dark:text-gray-300" /> Rate
//                       Adjustment
//                     </label>
//                     <input
//                       id="create-rateAdjustmentPercentage"
//                       name="rateAdjustmentPercentage" // Correct name
//                       value={newCurrencyData.rateAdjustmentPercentage}
//                       onChange={handleCreateInputChange}
//                       step="any"
//                       placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
//                       className="w-full rounded-lg border dark:text-white px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300"
//                     />
//                     <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
//                       Enter percentage adjustment. Default is 0%.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Modal Actions */}
//                 <div className="flex flex-col gap-2.5 mt-8">
//                   <button
//                     onClick={handleCreateCurrency}
//                     disabled={
//                       isSubmitting ||
//                       !newCurrencyData.code ||
//                       !newCurrencyData.currencyName
//                     }
//                     className="bg-primary flex capitalize justify-center items-center gap-2 text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     {isSubmitting ? "Adding..." : "Add Currency"}
//                   </button>
//                   <button
//                     onClick={() => setIsCreateModalOpen(false)}
//                     className="bg-neutral-900 capitalize flex justify-center items-center gap-2 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {isDeleteConfirmationOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center" // Added padding and inset-0
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsDeleteConfirmationOpen(false)}
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl p-10 w-full sm:max-w-xl relative" // Added dark mode, padding adjustments, shadow
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//             >
//               <button
//                 className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                 onClick={() => setIsDeleteConfirmationOpen(false)}
//                 aria-label="Close modal"
//               >
//                 <IoClose className="text-neutral-900 dark:text-white size-7" />
//               </button>
//               {/* Icon and Title */}
//               <div className="text-left">
//                 <h3 className="text-3xl font-medium text-neutral-900 dark:text-white mb-6">
//                   Delete Currency ?
//                 </h3>
//                 <div>
//                   <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                     Are you sure you want to delete this currency? This action
//                     cannot be undone.
//                   </p>
//                 </div>
//               </div>
//               {/* Buttons */}
//               <div className="mt-6 flex flex-col gap-4">
//                 <button
//                   onClick={handleDeleteCurrency}
//                   disabled={isSubmitting}
//                   type="button"
//                   className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                 >
//                   {isSubmitting ? (
//                     <Loader2 size={20} className="animate-spin" />
//                   ) : (
//                     "Delete"
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setIsDeleteConfirmationOpen(false)}
//                   type="button"
//                   className="bg-neutral-900 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center border border-gray w-full cursor-pointer transition-all duration-75 ease-linear"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdminCurrenciesPage;




"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react"; // Added useCallback
import { useAuth } from "../../hooks/useAuth";
import axios, { AxiosError } from "axios"; // Import AxiosError
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiConfig from "../../config/apiConfig";
import Image from "next/image"; // Keep Image from next/image
import {
  Loader2,
  // PlusCircle, // Removed unused import
  Info,
  Edit,
  Trash2,
  Save,
  Percent,
} from "lucide-react";
import { IoClose} from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
// Removed IoMdAddCircle as it's unused
import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

axios.defaults.baseURL = apiConfig.baseUrl;

interface Currency {
  _id: string;
  code: string;
  currencyName: string;
  flagImage?: string;
  rateAdjustmentPercentage?: number; // Updated field name
}

// Interface for the form data
interface NewCurrencyData {
  code: string;
  currencyName: string;
  flagImage: string;
  rateAdjustmentPercentage: string; // Use string for input
}

// Define a type for Axios error responses if needed, or use AxiosError directly
interface ApiErrorResponse {
    message: string;
    // Add other potential fields if your API returns them
}


const AdminCurrenciesPage: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [newCurrencyData, setNewCurrencyData] = useState<NewCurrencyData>({
    code: "",
    currencyName: "",
    flagImage: "",
    rateAdjustmentPercentage: "",
  });
  const [editingCurrencyId, setEditingCurrencyId] = useState<string | null>(
    null
  );
  // State for inline editing - needs to use the new field name
  const [editingFields, setEditingFields] = useState<{
    code: string;
    rateAdjustmentPercentage: string;
  }>({ code: "", rateAdjustmentPercentage: "" });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [currencyToDeleteId, setCurrencyToDeleteId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { token } = useAuth();
  const router = useRouter();

  // Memoized filtered currencies
  const filteredCurrencies = useMemo(() => {
    if (!searchTerm) return currencies;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(lowerSearchTerm) ||
        currency.currencyName.toLowerCase().includes(lowerSearchTerm)
    );
  }, [currencies, searchTerm]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (768px as an example)
    };

    checkMobileScreen(); // Initial check on mount

    window.addEventListener("resize", checkMobileScreen); // Add listener for resize

    return () => {
      window.removeEventListener("resize", checkMobileScreen); // Cleanup listener on unmount
    };
  }, []);

  const mobileVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
    exit: { y: 50, opacity: 0 },
  };

  const desktopVariants = {
    initial: { y: -30, opacity: 0, scale: 0.95 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { y: -30, opacity: 0, scale: 0.95 },
  };

  const modalVariants = isMobile ? mobileVariants : desktopVariants;

  // Wrap fetchCurrenciesList in useCallback
  const fetchCurrenciesList = useCallback(async () => {
    if (!token) {
      router.push("/auth/login"); // Redirect if no token early
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get<Currency[]>("/admin/currencies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrencies(response.data);
    } catch (error: unknown) { // Use unknown for catch block
      console.error("Error fetching currencies:", error);
      if (axios.isAxiosError<ApiErrorResponse>(error)) { // Type guard for AxiosError
        if (error.response?.status === 403 || error.response?.status === 401) {
          router.push("/auth/login");
        } else {
          toast.error(error.response?.data?.message || "Failed to load currencies");
        }
      } else if (error instanceof Error) { // Handle generic errors
          toast.error(error.message);
      } else { // Handle unknown errors
          toast.error("An unexpected error occurred while fetching currencies.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, router]); // Add dependencies for useCallback


  useEffect(() => {
    if (token) { // Only fetch if token exists
        fetchCurrenciesList();
    }
  }, [fetchCurrenciesList, token]); // Add fetchCurrenciesList to dependency array


  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCurrencyData((prev) => ({
      ...prev,
      // Convert code to uppercase immediately
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  // handleCreateCurrency - updated validation and payload
  const handleCreateCurrency = async () => {
    if (!newCurrencyData.code || !newCurrencyData.currencyName) {
      toast.error("Currency code and name are required.");
      return;
    }
    if (newCurrencyData.code.length !== 3) {
      toast.error("Currency code must be 3 letters.");
      return;
    }

    let adjustmentValue: number = 0; // Default to 0
    if (newCurrencyData.rateAdjustmentPercentage.trim() !== "") {
      adjustmentValue = parseFloat(newCurrencyData.rateAdjustmentPercentage);
      if (isNaN(adjustmentValue)) {
        toast.error(
          "Rate Adjustment must be a valid number (e.g., 0.5 or -0.1)."
        );
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const payload = {
        code: newCurrencyData.code,
        currencyName: newCurrencyData.currencyName,
        flagImage: newCurrencyData.flagImage.trim() || null,
        rateAdjustmentPercentage: adjustmentValue, // Send parsed number
      };
      await axios.post("/admin/currencies", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCurrencyData({
        code: "",
        currencyName: "",
        flagImage: "",
        rateAdjustmentPercentage: "",
      });
      setIsCreateModalOpen(false);
      await fetchCurrenciesList();
      toast.success("Currency added successfully!");
    } catch (error: unknown) { // Use unknown for catch block
        if (axios.isAxiosError<ApiErrorResponse>(error)) { // Type guard
            toast.error(error.response?.data?.message || "Failed to create currency");
        } else if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("An unexpected error occurred while creating the currency.");
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Inline Editing Handlers ---
  const startEditing = (currency: Currency) => {
    setEditingCurrencyId(currency._id);
    setEditingFields({
      code: currency.code,
      rateAdjustmentPercentage:
        currency.rateAdjustmentPercentage?.toString() ?? "0", // Default to '0' string if null/undefined
    });
  };

  const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingFields((prev) => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  const handleUpdateCurrency = async () => {
    if (!editingCurrencyId) return;

    if (!editingFields.code || editingFields.code.length !== 3) {
      toast.error("Currency code must be 3 letters.");
      return;
    }

    let adjustmentValue: number = 0;
    if (editingFields.rateAdjustmentPercentage.trim() !== "") {
      adjustmentValue = parseFloat(editingFields.rateAdjustmentPercentage);
      if (isNaN(adjustmentValue)) {
        toast.error("Rate Adjustment must be a valid number.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const payload = {
        code: editingFields.code,
        rateAdjustmentPercentage: adjustmentValue,
      };
      await axios.put(`/admin/currencies/${editingCurrencyId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingCurrencyId(null);
      setEditingFields({ code: "", rateAdjustmentPercentage: "" });
      await fetchCurrenciesList();
      toast.success("Currency updated successfully!");
    } catch (error: unknown) { // Use unknown for catch block
        if (axios.isAxiosError<ApiErrorResponse>(error)) { // Type guard
            toast.error(error.response?.data?.message || "Failed to update currency");
        } else if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("An unexpected error occurred while updating the currency.");
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEditing = () => {
    setEditingCurrencyId(null);
    setEditingFields({ code: "", rateAdjustmentPercentage: "" });
  };
  // --- End Inline Editing Handlers ---

  const handleDeleteCurrency = async () => {
    if (!currencyToDeleteId) return;
    setIsSubmitting(true);
    try {
      await axios.delete(`/admin/currencies/${currencyToDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Close confirmation, reset ID, fetch list, show success
      setIsDeleteConfirmationOpen(false);
      setCurrencyToDeleteId(null);
      await fetchCurrenciesList();
      toast.success("Currency deleted successfully!");
    } catch (error: unknown) { // Use unknown for catch block
        if (axios.isAxiosError<ApiErrorResponse>(error)) { // Type guard
            toast.error(error.response?.data?.message || "Failed to delete currency");
        } else if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("An unexpected error occurred while deleting the currency.");
        }
      // Keep modal open on error to show message
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-background dark:text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Header Section */}
      <div className="py-6 mb-6 border-b">
        <h1 className="lg:text-3xl text-2xl font-bold text-neutral-900 dark:text-white mb-2.5">
          Currency Management
        </h1>
        <p className="text-gray-500 dark:text-gray-300 capitalize">
          Manage currency options and custom rates for your application
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex justify-end flex-col lg:flex-row w-full  md:items-center mb-6 space-y-3 lg:space-y-0 gap-4">
        <div>
        <button
          onClick={() => {
            setIsCreateModalOpen(true);
          }} // Clear error on open
          className="bg-primary text-neutral-900 flex hover:bg-primaryhover text-nowrap font-medium rounded-full text-center lg:px-6 p-2 lg:py-3 lg:h-12.5  items-center gap-1 cursor-pointer transition-all duration-75 ease-linear"
        >
          <IoMdAdd
            className="size-8"
            title={isMobile ? "Add Currency" : undefined} // Tooltip for mobile
          />
          {!isMobile && <span>Add Currency</span>}
          {/* Conditionally render text */}
        </button>
        <div className="text-white ml-2 mt-2 lg:hidden">Add</div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search currencies..."
            className="rounded-full pl-10 pr-3 lg:h-12.5 h-12 border w-full transition-shadow ease-in-out duration-300 border-neutral-900 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-none focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-900 dark:placeholder:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch className="size-5 absolute top-3.5 left-3 text-neutral-900 dark:text-white" />
        </div>
      </div>

      {/* Currency List / Loading / Empty State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 size={60} className="text-neutral-900 animate-spin" />
        </div>
      ) : filteredCurrencies.length === 0 ? (
        <div className="p-8 text-center rounded-lg shadow-sm border">
          <div className="flex justify-center items-center">
            {/* <IoWarningOutline className="text-error size-20  mx-auto mb-6" /> */}
            <Image
              src="/assets/images/money-bag-removebg-preview.png"
              width={250}
              height={250}
              alt="No currencies found illustration" // Improved alt text
            />
          </div>
          <p className="text-neutral-900 font-medium text-xl dark:text-white capitalize">
            No currencies found. You can add one using the button above.
          </p>
        </div>
      ) : (
        // --- Currency Cards ---
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCurrencies.map((currency) => (
            <div
              key={currency._id}
              className="rounded-xl overflow-hidden transition-all duration-300 border flex flex-col"
            >
              <div className="lg:p-5 p-4 flex-grow">
                {/* Top Section: Flag, Code, Name */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Flag Image - Replaced <img> with next/image <Image> */}
                  {currency.flagImage ? (
                    <Image
                      src={currency.flagImage}
                      alt={`${currency.currencyName} Flag`}
                      width={56} // size-14 = 3.5rem = 56px
                      height={56} // size-14 = 3.5rem = 56px
                      className="object-contain rounded-full"
                      // onError is handled differently in next/image, consider a placeholder if needed
                    />
                  ) : (
                    <div className="size-14 border bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                      No flag
                    </div>
                  )}

                  {/* Code and Name */}
                  <div className="flex-1">
                    {editingCurrencyId === currency._id ? (
                      <input
                        type="text"
                        name="code"
                        value={editingFields.code}
                        onChange={handleEditingInputChange}
                        className="text-lg font-bold text-main dark:text-white border-b border-primary focus:outline-none bg-primary/8 dark:bg-transparent px-1 py-0.5 w-20"
                        autoFocus
                        maxLength={3}
                      />
                    ) : (
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {currency.code}
                      </h3>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-0.5">
                      {currency.currencyName}
                    </p>
                  </div>
                </div>

                {/* Rate Adjustment Section - UPDATED */}
                <div className="p-3 space-y-2 rounded-lg border">
                  <label className="font-medium text-gray-500 dark:text-gray-300 mb-1 flex items-center gap-1">
                    Our Rates
                  </label>

                  {editingCurrencyId === currency._id ? (
                    <input
                      type="number"
                      name="rateAdjustmentPercentage" // Correct name
                      value={editingFields.rateAdjustmentPercentage}
                      onChange={handleEditingInputChange}
                      placeholder="e.g., 0.5 or +0.1"
                      step="any"
                      className="text-base font-semibold text-gray-800 dark:text-white border-b border-primary focus:outline-none bg-transparent w-full py-0.5"
                    />
                  ) : (
                    <p
                      className={`text-lg font-bold ${
                        currency.rateAdjustmentPercentage != null
                          ? "text-neutral-900 font-medium dark:text-white"
                          : "text-gray-400 italic dark:text-gray-500"
                      }`}
                    >
                      {currency.rateAdjustmentPercentage != null
                        ? `${currency.rateAdjustmentPercentage.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }
                          )}%`
                        : "Not Set"}
                    </p>
                  )}
                  <p className="text-gray-500 dark:text-gray-300 mt-1">
                    Our Rates vs market rate.
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className=" border-t p-3">
                {editingCurrencyId === currency._id ? (
                  // --- Save/Cancel Buttons ---
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateCurrency}
                      disabled={isSubmitting}
                      className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
                    >
                      {isSubmitting ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Save size={20} />
                      )}
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
                    >
                      <IoMdCloseCircle size={20} /> Cancel
                    </button>
                  </div>
                ) : (
                  // --- Details/Edit/Delete Buttons ---
                  <div className="flex flex-row gap-2">
                    <Link
                      href={`/admin/currencies/${currency._id}`}
                      className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border  text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
                    >
                      <Info size={20} /> Details
                    </Link>
                    <button
                      onClick={() => startEditing(currency)}
                      className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-gray-700 dark:text-gray-300 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
                    >
                      <Edit size={20} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setCurrencyToDeleteId(currency._id);
                        setIsDeleteConfirmationOpen(true);
                      }}
                      className="flex-1 flex cursor-pointer justify-center items-center gap-1.5 border text-red-600 font-medium lg:px-6 px-4 py-3 h-10 lg:h-12.5 rounded-full transition duration-200 focus:outline-none"
                    >
                      <Trash2 size={20} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Currency Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreateModalOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl w-full sm:max-w-xl relative"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <button
                className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
                onClick={() => setIsCreateModalOpen(false)}
                aria-label="Close modal"
              >
                <IoClose className="size-8 text-neutral-900 dark:text-white" /> {/* Added dark mode text color */}
              </button>

              <div className="lg:p-6 p-4">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="lg:text-xl font-medium text-neutral-900 dark:text-white">
                    Add New Currency
                  </h2>
                </div>

                {/* Modal Form */}
                <div className="space-y-5">
                  {/* Code */}
                  <div>
                    <label
                      htmlFor="create-code"
                      className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1"
                    >
                      Currency Code <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="create-code"
                      name="code"
                      value={newCurrencyData.code}
                      onChange={handleCreateInputChange}
                      maxLength={3}
                      placeholder="e.g., USD"
                      className="w-full rounded-lg border dark:text-white dark:bg-gray-800 dark:border-gray-600 px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300" // Added dark mode styles
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">
                      3-letter uppercase code.
                    </p>
                  </div>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="create-currencyName"
                      className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2"
                    >
                      Currency Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="create-currencyName"
                      name="currencyName"
                      value={newCurrencyData.currencyName}
                      onChange={handleCreateInputChange}
                      placeholder="e.g., US Dollar"
                      className="w-full rounded-lg border dark:text-white dark:bg-gray-800 dark:border-gray-600 px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300" // Added dark mode styles
                    />
                  </div>
                  {/* Flag Image Path */}
                  <div>
                    <label
                      htmlFor="create-flagImage"
                      className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2"
                    >
                      Flag Image Path
                    </label>
                    <input
                      type="text"
                      id="create-flagImage"
                      name="flagImage"
                      value={newCurrencyData.flagImage}
                      onChange={handleCreateInputChange}
                      placeholder="/assets/icon/flags/usd.png"
                      className="w-full rounded-lg border dark:text-white dark:bg-gray-800 dark:border-gray-600 px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300" // Added dark mode styles
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                      Relative path to the image.
                    </p>
                  </div>
                  {/* Rate Adjustment Percentage - UPDATED */}
                  <div>
                    <label
                      htmlFor="create-rateAdjustmentPercentage"
                      className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2 flex items-center gap-1"
                    >
                      <Percent size={14} className="dark:text-gray-300" /> Rate
                      Adjustment
                    </label>
                    <input
                      type="number" // Ensure type is number for step validation
                      id="create-rateAdjustmentPercentage"
                      name="rateAdjustmentPercentage" // Correct name
                      value={newCurrencyData.rateAdjustmentPercentage}
                      onChange={handleCreateInputChange}
                      step="any"
                      placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
                      className="w-full rounded-lg border dark:text-white dark:bg-gray-800 dark:border-gray-600 px-4 py-3 h-12.5 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-none transition-shadow ease-in-out duration-300" // Added dark mode styles
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                      Enter percentage adjustment. Default is 0%.
                    </p>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col gap-2.5 mt-8">
                  <button
                    onClick={handleCreateCurrency}
                    disabled={
                      isSubmitting ||
                      !newCurrencyData.code ||
                      !newCurrencyData.currencyName
                    }
                    className="bg-primary flex capitalize justify-center items-center gap-2 text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                  >
                    {isSubmitting ? (
                         <Loader2 className="animate-spin mr-2" size={20}/> // Added loader
                    ) : null}
                    {isSubmitting ? "Adding..." : "Add Currency"}
                  </button>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="bg-neutral-900 capitalize flex justify-center items-center gap-2 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteConfirmationOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center" // Added padding and inset-0
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDeleteConfirmationOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl p-10 w-full sm:max-w-xl relative" // Added dark mode, padding adjustments, shadow
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <button
                className="absolute top-2 right-4 p-2 mt-1 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
                onClick={() => setIsDeleteConfirmationOpen(false)}
                aria-label="Close modal"
              >
                <IoClose className="text-neutral-900 dark:text-white size-7" />
              </button>
              {/* Icon and Title */}
              <div className="text-left">
                <h3 className="text-3xl font-medium text-neutral-900 dark:text-white mb-6">
                  Delete Currency ?
                </h3>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium mb-6"> {/* Adjusted text color */}
                    Are you sure you want to delete this currency? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-4">
                <button
                  onClick={handleDeleteCurrency}
                  disabled={isSubmitting}
                  type="button"
                  className="bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed" // Changed to red, added loader handling
                >
                  {isSubmitting ? (
                    <Loader2 size={20} className="animate-spin mr-2" /> // Added loader
                  ) : null}
                  {isSubmitting ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => setIsDeleteConfirmationOpen(false)}
                  type="button"
                  disabled={isSubmitting} // Disable cancel while deleting
                  className="bg-neutral-900 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center border border-gray-300 dark:border-gray-600 w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles and border colors
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCurrenciesPage;