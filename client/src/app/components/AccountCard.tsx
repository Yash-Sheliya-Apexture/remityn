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

// "use client";

// import React, { useState, useRef } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth"; // Import useAuth hook

// // Types for our props
// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null); // Ref to the membership number span
//   const router = useRouter();
//   const pathname = usePathname(); // Get current route
//   const { logout } = useAuth(); // Get logout function from useAuth

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText); // Use ref to get text
//         setCopyConfirmation(true);

//         // Hide confirmation after a short delay
//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000); // Adjust duration as needed
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//       // Optionally handle error (e.g., show a different error message)
//     }
//   };

//   const handleLogout = () => {
//     // Removed event parameter - button onClick doesn't need it directly
//     logout(); // Call the logout function from AuthContext
//     router.push("/auth/login"); // Redirect to login page after logout
//   };

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="p-6 bg-green/8 rounded-full flex items-center justify-center">
//               <FiUser className="size-6" />
//             </div>
//             <div className="absolute cursor-pointer bottom-0 -right-2 bg-lightgreen flex items-center justify-center size-8 rounded-full border-4 border-white">
//               <LiaCameraSolid className="size-5 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";

// import React, { useState, useRef } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth"; // Import useAuth hook
// import { IoClose } from "react-icons/io5";
// import { LiaUploadSolid } from "react-icons/lia";
// import { IoCloudUploadOutline } from "react-icons/io5";

// // Types for our props
// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null); // Ref to the membership number span
//   const router = useRouter();
//   const pathname = usePathname(); // Get current route
//   const { logout } = useAuth(); // Get logout function from useAuth

//   // New state variable to control the popup visibility
//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store selected file
//   const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText); // Use ref to get text
//         setCopyConfirmation(true);

//         // Hide confirmation after a short delay
//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000); // Adjust duration as needed
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//       // Optionally handle error (e.g., show a different error message)
//     }
//   };

//   const handleLogout = () => {
//     // Removed event parameter - button onClick doesn't need it directly
//     logout(); // Call the logout function from AuthContext
//     router.push("/auth/login"); // Redirect to login page after logout
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null); // Clear selected file when closing popup
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     try {
//       // Replace 'your-upload-endpoint' with your actual upload endpoint
//       const response = await fetch("your-upload-endpoint", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("File uploaded successfully!");
//         handleClosePhotoPopup(); // Close popup after successful upload
//       } else {
//         alert("File upload failed.");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("An error occurred during file upload.");
//     }
//   };

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="p-6 bg-green/8 rounded-full flex items-center justify-center">
//               <FiUser className="size-6" />
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-2 bg-lightgreen flex items-center justify-center size-8 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-5 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {/* Photo Upload Popup */}
//       {showPhotoPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-2xl h-9/10 shadow-xl w-full max-w-xl">
//             <div className="flex items-center justify-between p-4">
//               <h2 className="text-xl font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10  text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="p-8">
//               <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                 <div className="p-3.5 bg-white rounded-full">
//                   <IoCloudUploadOutline className="size-8 text-main" />
//                 </div>
//                 <p className="text-main font-semibold text-xl capitalize mb-2">
//                   Drop your photo here to instantly upload it
//                 </p>
//                 {/* Hidden file input */}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileSelect}
//                   className="hidden"
//                   ref={fileInputRef}
//                 />
//                 <button
//                   onClick={triggerFileInput} // Trigger the file input on button click
//                   className="bg-primary hover:bg-primary-hover mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                 >
//                   Select file
//                 </button>

//                 {selectedFile && (
//                   <p className="mt-2 text-sm text-gray-500">
//                     Selected: {selectedFile.name}
//                   </p>
//                 )}

//               </div>

//               <p className="text-gray leading-relaxed text-center mb-10">
//                 It should be smaller than 2MB, and it should show your face.
//                 That way, your friends and family will know it's you.
//               </p>

//               <div className="flex flex-col justify-center">
//                 <button
//                   onClick={handleClosePhotoPopup}
//                   className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize">
//                   Remove current photo
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { LiaUploadSolid } from "react-icons/lia";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons

// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText);
//         setCopyConfirmation(true);

//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);

//       //Immediately show the loading screen
//       setUploading(true);

//       //Simulate loading for 1 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 1000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);

//     setShowPhotoPopup(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="bg-green/8 rounded-full flex items-center justify-center p-4">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full size-10 object-cover"
//                 />
//               ) : (
//                 <FiUser className="size-5" />
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-3 bg-lightgreen flex items-center justify-center size-7 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-4 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-2xl h-9/10 shadow-xl w-full max-w-xl">
//             <div className="flex items-center justify-between p-4">
//               <h2 className="text-xl font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10  text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="p-8">
//               {uploading ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Uploading...
//                   </p>
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : selectedFile ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center max-w-lg rounded-2xl py-6 mb-4">
//                   <div className="overflow-hidden rounded-full h-48 w-48 relative">
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Selected"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         transform: `scale(${zoom})`,
//                       }}
//                     />
//                   </div>

//                   {/* Zoom Controls */}
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={handleZoomOut}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoRemove />
//                     </button>
//                     <span className="text-sm text-gray-700 font-medium">
//                       {" "}
//                       Zoom{" "}
//                     </span>
//                     <button
//                       onClick={handleZoomIn}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoAdd />
//                     </button>
//                   </div>

//                   <p className="text-gray leading-relaxed text-center mb-4">
//                     Make sure your face is visible
//                   </p>
//                   <div className="flex flex-col justify-center w-full">
//                     <button
//                       onClick={handleUpload}
//                       className="bg-primary hover:bg-primary-hover transition-colors  ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={triggerFileInput}
//                       className="text-secondary cursor-pointer text-lg font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                     >
//                       Choose another photo
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="p-3.5 bg-white rounded-full">
//                     <IoCloudUploadOutline className="size-8 text-main" />
//                   </div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Drop your photo here to instantly upload it
//                   </p>
//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     ref={fileInputRef}
//                   />
//                   <button
//                     onClick={triggerFileInput} // Trigger the file input on button click
//                     className="bg-primary hover:bg-primary-hover mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Choose a photo
//                   </button>
//                 </div>
//               )}

//               {/* profile selector rule  */}
//               <div>
//                 {/* text */}
//                 <p className="text-gray leading-relaxed text-center mb-10">
//                   It should be smaller than 2MB, and it should show your face.
//                   That way, your friends and family will know it's you.
//                 </p>

//                 {/* buttons */}
//                 <div className="flex flex-col justify-center">
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize">
//                     Remove current photo
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { LiaUploadSolid } from "react-icons/lia";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons

// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText);
//         setCopyConfirmation(true);

//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);

//       //Immediately show the loading screen
//       setUploading(true);

//       //Simulate loading for 1 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 1000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);

//     setShowPhotoPopup(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="p-6 bg-green/8 rounded-full flex items-center justify-center">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full h-6 w-6 object-cover"
//                 />
//               ) : (
//                 <FiUser className="size-6" />
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-2 bg-lightgreen flex items-center justify-center size-8 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-5 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-2xl h-9/10 shadow-xl w-full max-w-xl">
//             <div className="flex items-center justify-between p-4">
//               <h2 className="text-xl font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10  text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="p-8">
//               {uploading ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Uploading...
//                   </p>
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-6 mb-4">
//                   {selectedFile && (
//                     <>
//                       {/* Zoom Controls */}
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={handleZoomOut}
//                           className="px-2 py-1 bg-gray-200 rounded-md"
//                         >
//                           <IoRemove />
//                         </button>
//                         <span className="text-sm text-gray-700 font-medium">
//                           {" "}
//                           Zoom{" "}
//                         </span>
//                         <button
//                           onClick={handleZoomIn}
//                           className="px-2 py-1 bg-gray-200 rounded-md"
//                         >
//                           <IoAdd />
//                         </button>
//                       </div>
//                       <div className="overflow-hidden rounded-full h-48 w-48 relative">
//                         <img
//                           src={URL.createObjectURL(selectedFile)}
//                           alt="Selected"
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                             transform: `scale(${zoom})`,
//                           }}
//                         />
//                       </div>
//                       <p className="text-gray leading-relaxed text-center mb-4">
//                         Make sure your face is visible
//                       </p>
//                       <div className="flex flex-col justify-center">
//                         <button
//                           onClick={handleUpload}
//                           className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={triggerFileInput}
//                           className="text-secondary cursor-pointer text-lg font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                         >
//                           Choose another photo
//                         </button>
//                       </div>
//                     </>
//                   )}

//                   {!selectedFile && (
//                     <>
//                       <div className="p-3.5 bg-white rounded-full">
//                         <IoCloudUploadOutline className="size-8 text-main" />
//                       </div>
//                       <p className="text-main font-semibold text-xl capitalize mb-2">
//                         Drop your photo here to instantly upload it
//                       </p>
//                       {/* Hidden file input */}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileSelect}
//                         className="hidden"
//                         ref={fileInputRef}
//                       />
//                       <button
//                         onClick={triggerFileInput} // Trigger the file input on button click
//                         className="bg-primary hover:bg-primary-hover mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                       >
//                         Choose a photo
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Profile Selector Rule Condinally Render */}
//               <div>
//                 <p className="text-gray leading-relaxed text-center mb-10">
//                   It should be smaller than 2MB, and it should show your face.
//                   That way, your friends and family will know it's you.
//                 </p>

//                 {/* buttons */}
//                 <div className="flex flex-col justify-center">
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize">
//                     Remove current photo
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { LiaUploadSolid } from "react-icons/lia";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons

// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level
//   const [photoUploaded, setPhotoUploaded] = useState(false); // Track if photo has been fully uploaded

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText);
//         setCopyConfirmation(true);

//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//     setPhotoUploaded(false); // Reset upload status when opening popup
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//     setPhotoUploaded(false); // Reset upload status when closing
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//       setPhotoUploaded(false); // Reset upload status when selecting new file

//       // Immediately show the loading screen
//       setUploading(true);

//       // Simulate loading for 1 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 1000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);
//     setPhotoUploaded(true); // Set upload status to true after successful upload
//     setShowPhotoPopup(false);
//   };

//   const handleRemovePhoto = () => {
//     setUploadedImage(null);
//     setSelectedFile(null);
//     setPhotoUploaded(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="p-6 bg-green/8 rounded-full flex items-center justify-center">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full h-6 w-6 object-cover"
//                 />
//               ) : (
//                 <FiUser className="size-6" />
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-2 bg-lightgreen flex items-center justify-center size-8 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-5 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-2xl h-9/10 shadow-xl w-full max-w-xl">
//             <div className="flex items-center justify-between p-4">
//               <h2 className="text-xl font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10  text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="p-8">
//               {uploading ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Uploading...
//                   </p>
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-6 mb-4">
//                   {selectedFile && (
//                     <>
//                       {/* Zoom Controls */}
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={handleZoomOut}
//                           className="px-2 py-1 bg-gray-200 rounded-md"
//                         >
//                           <IoRemove />
//                         </button>
//                         <span className="text-sm text-gray-700 font-medium">
//                           {" "}
//                           Zoom{" "}
//                         </span>
//                         <button
//                           onClick={handleZoomIn}
//                           className="px-2 py-1 bg-gray-200 rounded-md"
//                         >
//                           <IoAdd />
//                         </button>
//                       </div>
//                       <div className="overflow-hidden rounded-full h-48 w-48 relative">
//                         <img
//                           src={URL.createObjectURL(selectedFile)}
//                           alt="Selected"
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                             transform: `scale(${zoom})`,
//                           }}
//                         />
//                       </div>
//                       <p className="text-gray leading-relaxed text-center mb-4">
//                         Make sure your face is visible
//                       </p>
//                       <div className="flex flex-col justify-center">
//                         <button
//                           onClick={handleUpload}
//                           className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={triggerFileInput}
//                           className="text-secondary cursor-pointer text-lg font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                         >
//                           Choose another photo
//                         </button>
//                       </div>
//                     </>
//                   )}

//                   {!selectedFile && (
//                     <>
//                       <div className="p-3.5 bg-white rounded-full">
//                         <IoCloudUploadOutline className="size-8 text-main" />
//                       </div>
//                       <p className="text-main font-semibold text-xl capitalize mb-2">
//                         Drop your photo here to instantly upload it
//                       </p>
//                       {/* Hidden file input */}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileSelect}
//                         className="hidden"
//                         ref={fileInputRef}
//                       />
//                       <button
//                         onClick={triggerFileInput} // Trigger the file input on button click
//                         className="bg-primary hover:bg-primary-hover mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                       >
//                         Choose a photo
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Profile Selector Rule - Now conditionally rendered */}
//               {(selectedFile || !photoUploaded) && (
//                 <div>
//                   <p className="text-gray leading-relaxed text-center mb-10">
//                     It should be smaller than 2MB, and it should show your face.
//                     That way, your friends and family will know it's you.
//                   </p>

//                   {/* buttons */}
//                   <div className="flex flex-col justify-center">
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Cancel
//                     </button>
//                     {uploadedImage && (
//                       <button
//                         onClick={handleRemovePhoto}
//                         className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize"
//                       >
//                         Remove current photo
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { LiaUploadSolid } from "react-icons/lia";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons

// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText);
//         setCopyConfirmation(true);

//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);

//       //Immediately show the loading screen
//       setUploading(true);

//       //Simulate loading for 1 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 1000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);

//     setShowPhotoPopup(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="bg-green/8 rounded-full flex items-center justify-center p-4">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full size-10 object-cover"
//                 />
//               ) : (
//                 <FiUser className="size-5" />
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-3 bg-lightgreen flex items-center justify-center size-7 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-4 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-2xl h-9/10 shadow-xl w-full max-w-xl">
//             <div className="flex items-center justify-between p-4">
//               <h2 className="text-xl font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10  text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="p-8">
//               {uploading ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Uploading...
//                   </p>
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : selectedFile ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center max-w-lg rounded-2xl py-6 mb-4">
//                   <div className="overflow-hidden rounded-full h-48 w-48 relative">
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Selected"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         transform: `scale(${zoom})`,
//                       }}
//                     />
//                   </div>

//                   {/* Zoom Controls */}
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={handleZoomOut}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoRemove />
//                     </button>
//                     <span className="text-sm text-gray-700 font-medium">
//                       {" "}
//                       Zoom{" "}
//                     </span>
//                     <button
//                       onClick={handleZoomIn}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoAdd />
//                     </button>
//                   </div>

//                   <p className="text-gray leading-relaxed text-center mb-4">
//                     Make sure your face is visible
//                   </p>
//                   <div className="flex flex-col justify-center w-full">
//                     <button
//                       onClick={handleUpload}
//                       className="bg-primary hover:bg-primary-hover transition-colors  ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={triggerFileInput}
//                       className="text-secondary cursor-pointer text-lg font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                     >
//                       Choose another photo
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="p-3.5 bg-white rounded-full">
//                     <IoCloudUploadOutline className="size-8 text-main" />
//                   </div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Drop your photo here to instantly upload it
//                   </p>
//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     ref={fileInputRef}
//                   />
//                   <button
//                     onClick={triggerFileInput} // Trigger the file input on button click
//                     className="bg-primary hover:bg-primary-hover mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Choose a photo
//                   </button>
//                 </div>
//               )}

//               {/* profile selector rule  */}
//               {!selectedFile && (
//                 <div>
//                   {/* text */}
//                   <p className="text-gray leading-relaxed text-center mb-10">
//                     It should be smaller than 2MB, and it should show your face.
//                     That way, your friends and family will know it's you.
//                   </p>

//                   {/* buttons */}
//                   <div className="flex flex-col justify-center">
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize">
//                       Remove current photo
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { LiaUploadSolid } from "react-icons/lia";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons

// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText);
//         setCopyConfirmation(true);

//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);

//       //Immediately show the loading screen
//       setUploading(true);

//       //Simulate loading for 1 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 1000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);

//     setShowPhotoPopup(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   const handleChooseAnotherPhoto = () => {
//     setSelectedFile(null);
//     setZoom(1); // Reset zoom
//     triggerFileInput(); // Open file selector again
//   };

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="bg-green/8 rounded-full flex items-center justify-center p-4">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full size-10 object-cover"
//                 />
//               ) : (
//                 <FiUser className="size-5" />
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer -bottom-1 -right-3 bg-lightgreen flex items-center justify-center size-7 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-4 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-2xl h-9/10 shadow-xl w-full max-w-xl">
//             <div className="flex items-center justify-between p-4">
//               <h2 className="text-xl font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10  text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="p-8">
//               {uploading ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Uploading...
//                   </p>
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : selectedFile ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center max-w-lg rounded-2xl py-6 mb-4">
//                   <div className="overflow-hidden rounded-full size-36 relative">
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Selected"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         transform: `scale(${zoom})`,
//                       }}
//                     />
//                   </div>

//                   {/* Zoom Controls */}
//                   <div className="flex items-center space-x-5 mb-5">
//                     <button
//                       onClick={handleZoomOut}
//                       className="px-2 py-1 bg-green/5 rounded-md"
//                     >
//                       <IoRemove />
//                     </button>
//                     <span className="text-sm text-gray-700 font-medium">
//                       {" "}
//                       Zoom{" "}
//                     </span>
//                     <button
//                       onClick={handleZoomIn}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoAdd />
//                     </button>
//                   </div>

//                   <p className="text-gray leading-relaxed text-center text-lg mb-4">
//                     Make sure your face is visible
//                   </p>
//                   <div className="flex flex-col justify-center w-full mt-5">
//                     <button
//                       onClick={handleUpload}
//                       className="bg-primary hover:bg-primary-hover transition-colors  ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleChooseAnotherPhoto}
//                       className="text-secondary cursor-pointer text-lg font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                     >
//                       Choose another photo
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="p-3.5 bg-white rounded-full">
//                     <IoCloudUploadOutline className="size-8 text-main" />
//                   </div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Drop your photo here to instantly upload it
//                   </p>
//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     ref={fileInputRef}
//                   />
//                   <button
//                     onClick={triggerFileInput} // Trigger the file input on button click
//                     className="bg-primary hover:bg-primary-hover mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Choose a photo
//                   </button>
//                 </div>
//               )}

//               {/* profile selector rule  */}
//               {!selectedFile && (
//                 <div>
//                   {/* text */}
//                   <p className="text-gray leading-relaxed text-center mb-10">
//                     It should be smaller than 2MB, and it should show your face.
//                     That way, your friends and family will know it's you.
//                   </p>

//                   {/* buttons */}
//                   <div className="flex flex-col justify-center">
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize">
//                       Remove current photo
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { LiaUploadSolid } from "react-icons/lia";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons

// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText);
//         setCopyConfirmation(true);

//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//     setUploadedImage(null); // Clear uploaded image as well
//     setZoom(1);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);

//       //Immediately show the loading screen
//       setUploading(true);

//       //Simulate loading for 1 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 1000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);

//     setShowPhotoPopup(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   const handleChooseAnotherPhoto = () => {
//     setSelectedFile(null);
//     setZoom(1); // Reset zoom
//     triggerFileInput(); // Open file selector again
//   };

//   const handleRemovePhoto = () => {
//     setUploadedImage(null); // Remove the uploaded image
//     setSelectedFile(null); // Clear the selected file as well
//     setZoom(1);
//   };

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="bg-green/8 rounded-full flex items-center justify-center p-4">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full size-10 object-cover"
//                 />
//               ) : (
//                 <FiUser className="size-5" />
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-3 bg-lightgreen flex items-center justify-center size-7 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-4 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-2xl h-9/10 shadow-xl w-full max-w-xl">
//             <div className="flex items-center justify-between p-4">
//               <h2 className="text-xl font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10  text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="p-8">
//               {uploading ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Uploading...
//                   </p>
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : selectedFile ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center max-w-lg rounded-2xl py-6 mb-4">
//                   <div className="overflow-hidden rounded-full h-48 w-48 relative">
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Selected"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         transform: `scale(${zoom})`,
//                       }}
//                     />
//                   </div>

//                   {/* Zoom Controls */}
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={handleZoomOut}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoRemove />
//                     </button>
//                     <span className="text-sm text-gray-700 font-medium">
//                       {" "}
//                       Zoom{" "}
//                     </span>
//                     <button
//                       onClick={handleZoomIn}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoAdd />
//                     </button>
//                   </div>

//                   <p className="text-gray leading-relaxed text-center mb-4">
//                     Make sure your face is visible
//                   </p>
//                   <div className="flex flex-col justify-center w-full">
//                     <button
//                       onClick={handleUpload}
//                       className="bg-primary hover:bg-primary-hover transition-colors  ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleChooseAnotherPhoto}
//                       className="text-secondary cursor-pointer text-lg font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                     >
//                       Choose another photo
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="p-3.5 bg-white rounded-full">
//                     <IoCloudUploadOutline className="size-8 text-main" />
//                   </div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Drop your photo here to instantly upload it
//                   </p>
//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     ref={fileInputRef}
//                   />
//                   <button
//                     onClick={triggerFileInput} // Trigger the file input on button click
//                     className="bg-primary hover:bg-primary-hover mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Choose a photo
//                   </button>
//                 </div>
//               )}

//               {/* profile selector rule  */}
//               {!selectedFile && (
//                 <div>
//                   {/* text */}
//                   <p className="text-gray leading-relaxed text-center mb-10">
//                     It should be smaller than 2MB, and it should show your face.
//                     That way, your friends and family will know it's you.
//                   </p>

//                   {/* buttons */}
//                   <div className="flex flex-col justify-center">
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleRemovePhoto}
//                       className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize"
//                     >
//                       Remove current photo
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { LiaUploadSolid } from "react-icons/lia";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons

// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level
//   const popupRef = useRef<HTMLDivElement>(null); // Ref for the popup content

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText);
//         setCopyConfirmation(true);

//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//     setUploadedImage(null); // Clear uploaded image as well
//     setZoom(1);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);

//       //Immediately show the loading screen
//       setUploading(true);

//       //Simulate loading for 1 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 1000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);

//     setShowPhotoPopup(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   const handleChooseAnotherPhoto = () => {
//     setSelectedFile(null);
//     setZoom(1); // Reset zoom
//     triggerFileInput(); // Open file selector again
//   };

//   const handleRemovePhoto = () => {
//     setUploadedImage(null); // Remove the uploaded image
//     setSelectedFile(null); // Clear the selected file as well
//     setZoom(1);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node)
//       ) {
//         handleClosePhotoPopup();
//       }
//     };

//     if (showPhotoPopup) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPhotoPopup]);

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="bg-green/8 rounded-full flex items-center justify-center p-4">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full size-10 object-cover"
//                 />
//               ) : (
//                 <FiUser className="size-5" />
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-3 bg-lightgreen flex items-center justify-center size-7 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-4 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//           <div
//             className="relative bg-white rounded-2xl h-9/10 shadow-xl w-full max-w-xl"
//             ref={popupRef}
//           >
//             <div className="flex items-center justify-between p-4">
//               <h2 className="text-xl font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10  text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="p-8">
//               {uploading ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Uploading...
//                   </p>
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : selectedFile ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center max-w-lg rounded-2xl py-6 mb-4">
//                   <div className="overflow-hidden rounded-full h-48 w-48 relative">
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Selected"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         transform: `scale(${zoom})`,
//                       }}
//                     />
//                   </div>

//                   {/* Zoom Controls */}
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={handleZoomOut}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoRemove />
//                     </button>
//                     <span className="text-sm text-gray-700 font-medium">
//                       {" "}
//                       Zoom{" "}
//                     </span>
//                     <button
//                       onClick={handleZoomIn}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoAdd />
//                     </button>
//                   </div>

//                   <p className="text-gray leading-relaxed text-center mb-4">
//                     Make sure your face is visible
//                   </p>
//                   <div className="flex flex-col justify-center w-full">
//                     <button
//                       onClick={handleUpload}
//                       className="bg-primary hover:bg-primary-hover transition-colors  ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleChooseAnotherPhoto}
//                       className="text-secondary cursor-pointer text-lg font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                     >
//                       Choose another photo
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="p-3.5 bg-white rounded-full">
//                     <IoCloudUploadOutline className="size-8 text-main" />
//                   </div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Drop your photo here to instantly upload it
//                   </p>
//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     ref={fileInputRef}
//                   />
//                   <button
//                     onClick={triggerFileInput} // Trigger the file input on button click
//                     className="bg-primary hover:bg-primary-hover mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Choose a photo
//                   </button>
//                 </div>
//               )}

//               {/* profile selector rule  */}
//               {!selectedFile && (
//                 <div>
//                   {/* text */}
//                   <p className="text-gray leading-relaxed text-center mb-10">
//                     It should be smaller than 2MB, and it should show your face.
//                     That way, your friends and family will know it's you.
//                   </p>

//                   {/* buttons */}
//                   <div className="flex flex-col justify-center">
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleRemovePhoto}
//                       className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize"
//                     >
//                       Remove current photo
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { LiaUploadSolid } from "react-icons/lia";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons

// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level
//   const popupRef = useRef<HTMLDivElement>(null); // Ref for the popup content

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText);
//         setCopyConfirmation(true);

//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//     setUploadedImage(null); // Clear uploaded image as well
//     setZoom(1);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);

//       //Immediately show the loading screen
//       setUploading(true);

//       //Simulate loading for 1 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 1000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);

//     setShowPhotoPopup(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   const handleChooseAnotherPhoto = () => {
//     setSelectedFile(null);
//     setZoom(1); // Reset zoom
//     triggerFileInput(); // Open file selector again
//   };

//   const handleRemovePhoto = () => {
//     setUploadedImage(null); // Remove the uploaded image
//     setSelectedFile(null); // Clear the selected file as well
//     setZoom(1);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node)
//       ) {
//         handleClosePhotoPopup();
//       }
//     };

//     if (showPhotoPopup) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPhotoPopup]);

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4 ">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="bg-green/8 rounded-full flex items-center justify-center p-5 overflow-hidden">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full size-12 object-cover"
//                   style={{ maxWidth: "100%", maxHeight: "100%" }}
//                 />
//               ) : (
//                 <FiUser className="size-5" />
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-2 bg-lightgreen flex items-center justify-center size-7 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-4 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//           <div
//             className="relative bg-white rounded-2xl h-9/10 shadow-xl w-full max-w-xl"
//             ref={popupRef}
//           >
//             <div className="flex items-center justify-between p-4">
//               <h2 className="text-xl font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10  text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="p-8">
//               {uploading ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Uploading...
//                   </p>
//                   <button
//                     onClick={handleClosePhotoPopup}
//                     className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : selectedFile ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center max-w-lg rounded-2xl py-6 mb-4">
//                   <div className="overflow-hidden rounded-full h-48 w-48 relative">
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Selected"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         transform: `scale(${zoom})`,
//                       }}
//                     />
//                   </div>

//                   {/* Zoom Controls */}
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={handleZoomOut}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoRemove />
//                     </button>
//                     <span className="text-sm text-gray-700 font-medium">
//                       {" "}
//                       Zoom{" "}
//                     </span>
//                     <button
//                       onClick={handleZoomIn}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoAdd />
//                     </button>
//                   </div>

//                   <p className="text-gray leading-relaxed text-center mb-4">
//                     Make sure your face is visible
//                   </p>
//                   <div className="flex flex-col justify-center w-full">
//                     <button
//                       onClick={handleUpload}
//                       className="bg-primary hover:bg-primary-hover transition-colors  ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleChooseAnotherPhoto}
//                       className="text-secondary cursor-pointer text-lg font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                     >
//                       Choose another photo
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="p-3.5 bg-white rounded-full">
//                     <IoCloudUploadOutline className="size-8 text-main" />
//                   </div>
//                   <p className="text-main font-semibold text-xl capitalize mb-2">
//                     Drop your photo here to instantly upload it
//                   </p>
//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     ref={fileInputRef}
//                   />
//                   <button
//                     onClick={triggerFileInput} // Trigger the file input on button click
//                     className="bg-primary hover:bg-primary-hover mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Choose a photo
//                   </button>
//                 </div>
//               )}

//               {/* profile selector rule  */}
//               {!selectedFile && (
//                 <div>
//                   {/* text */}
//                   <p className="text-gray leading-relaxed text-center mb-10">
//                     It should be smaller than 2MB, and it should show your face.
//                     That way, your friends and family will know it's you.
//                   </p>

//                   {/* buttons */}
//                   <div className="flex flex-col justify-center">
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleRemovePhoto}
//                       className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize"
//                     >
//                       Remove current photo
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import { IoClose } from "react-icons/io5";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons\
// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   const [copyConfirmation, setCopyConfirmation] = useState(false);
//   const membershipNumberRef = useRef<HTMLSpanElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const [showPhotoPopup, setShowPhotoPopup] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State for uploading indicator
//   const [zoom, setZoom] = useState(1); // Initial zoom level
//   const popupRef = useRef<HTMLDivElement>(null); // Ref for the popup content

//   const handleCopyClick = async () => {
//     try {
//       if (membershipNumberRef.current) {
//         const membershipNumberText =
//           membershipNumberRef.current.textContent || "";
//         await navigator.clipboard.writeText(membershipNumberText);
//         setCopyConfirmation(true);

//         setTimeout(() => {
//           setCopyConfirmation(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

//   const handleOpenCameraPopup = () => {
//     setShowPhotoPopup(true);
//   };

//   const handleClosePhotoPopup = () => {
//     setShowPhotoPopup(false);
//     setSelectedFile(null);
//     setUploadedImage(null); // Clear uploaded image as well
//     setZoom(1);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);

//       //Immediately show the loading screen
//       setUploading(true);

//       //Simulate loading for 2 second
//       setTimeout(() => {
//         setUploading(false);
//       }, 2000);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Create a temporary URL for the selected file
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setUploadedImage(imageUrl);

//     setShowPhotoPopup(false);
//   };

//   useEffect(() => {
//     // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
//     return () => {
//       if (uploadedImage) {
//         URL.revokeObjectURL(uploadedImage);
//       }
//     };
//   }, [uploadedImage]); // Only run when uploadedImage changes

//   const handleZoomIn = () => {
//     setZoom(zoom + 0.1);
//   };

//   const handleZoomOut = () => {
//     setZoom(zoom - 0.1);
//   };

//   const handleChooseAnotherPhoto = () => {
//     setSelectedFile(null);
//     setZoom(1); // Reset zoom
//     triggerFileInput(); // Open file selector again
//   };

//   const handleRemovePhoto = () => {
//     setUploadedImage(null); // Remove the uploaded image
//     setSelectedFile(null); // Clear the selected file as well
//     setZoom(1);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node)
//       ) {
//         handleClosePhotoPopup();
//       }
//     };

//     if (showPhotoPopup) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPhotoPopup]);

//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           {/* Camera Icon */}
//           <div className="relative">
//             <div className="bg-green/8 rounded-full flex items-center justify-center overflow-hidden">
//               {uploadedImage ? (
//                 <img
//                   src={uploadedImage}
//                   alt="Profile"
//                   className="rounded-full size-20 object-cover"
//                   style={{ maxWidth: "100%", maxHeight: "100%" }}
//                 />
//               ) : (
//                 <div className="p-5">
//                   <FiUser className="size-6" />
//                 </div>
//               )}
//             </div>
//             <div
//               className="absolute cursor-pointer bottom-0 -right-2 bg-lightgreen flex items-center justify-center size-7 rounded-full border-4 border-white"
//               onClick={handleOpenCameraPopup}
//             >
//               <LiaCameraSolid className="size-4 text-secondary" />
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

//       <div className="text-center my-7 flex justify-center items-center gap-1">
//         <span className="lg:text-lg text-gray">
//           Membership number:
//           <span
//             className="hover:underline underline-offset-1"
//             ref={membershipNumberRef}
//           >
//             {membershipNumber}
//           </span>
//         </span>
//         <IoMdCopy
//           className="text-gray cursor-pointer"
//           onClick={handleCopyClick}
//         />
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//       {copyConfirmation && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
//           Membership number copied!
//         </div>
//       )}

//       {showPhotoPopup && (
//         <div
//           className="fixed top-0 left-0 w-full h-full  bg-black/50 backdrop-blur-xs flex items-center justify-center
//         "
//         >
//           <div
//             className="relative bg-white lg:rounded-2xl lg:h-9/10 shadow-xl w-full h-full max-w-xl"
//             ref={popupRef}
//           >
//             <div className="flex items-center justify-between p-2 mt-5">
//               <h2 className="lg:text-xl text-lg font-semibold text-center text-main">
//                 Add a personal account photo
//               </h2>

//               {/* Close button */}
//               <button
//                 onClick={handleClosePhotoPopup}
//                 className="text-gray hover:text-gray-800 cursor-pointer"
//               >
//                 <IoClose className="size-10 text-green p-1.5 rounded-full hover:bg-green/8" />
//               </button>
//             </div>

//             <div className="border-t border-gray-300"></div>

//             <div className="lg:p-8 p-4">
//               {uploading ? (
//                 <>
//                   <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                     <div className="animate-spin rounded-full size-16 border-t-2 border-b-2 border-primary"></div>
//                     <p className="text-main font-semibold text-xl capitalize mb-2">
//                       Uploading...
//                     </p>
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                   <div>
//                     {/* text */}
//                     <p className="text-gray leading-relaxed text-center mb-10">
//                       It should be smaller than 2MB, and it should show your
//                       face. That way, your friends and family will know it's
//                       you.
//                     </p>

//                     {/* buttons */}
//                     <div className="flex flex-col justify-center">
//                       <button
//                         onClick={handleClosePhotoPopup}
//                         className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleRemovePhoto}
//                         className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize"
//                       >
//                         Remove current photo
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : selectedFile ? (
//                 <div className="flex flex-col items-center space-y-4 justify-center max-w-lg rounded-2xl py-6 mb-4">
//                   <div className="overflow-hidden rounded-full lg:size-36 size-24 relative">
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Selected"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         transform: `scale(${zoom})`,
//                       }}
//                     />
//                   </div>

//                   {/* Zoom Controls */}
//                   <div className="flex items-center space-x-3">
//                     <button
//                       onClick={handleZoomOut}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoRemove />
//                     </button>
//                     <span className="text-sm text-gray-700 font-medium">
//                       {" "}
//                       Zoom{" "}
//                     </span>
//                     <button
//                       onClick={handleZoomIn}
//                       className="px-2 py-1 bg-gray-200 rounded-md"
//                     >
//                       <IoAdd />
//                     </button>
//                   </div>

//                   <p className="text-gray leading-relaxed text-center mb-4">
//                     Make sure your face is visible
//                   </p>
//                   <div className="flex flex-col justify-center w-full">
//                     <button
//                       onClick={handleUpload}
//                       className="bg-primary hover:bg-primary-hover transition-colors  ease-in-out duration-300 cursor-pointer text-secondary rounded-full lg:py-3 py-2 text-lg px-6 font-medium"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleChooseAnotherPhoto}
//                       className="text-secondary cursor-pointer lg:text-lg text-base font-medium text-center mt-6 underline underline-offset-4 capitalize"
//                     >
//                       Choose another photo
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
//                   <div className="lg:p-3.5 p-2 bg-white rounded-full">
//                     <IoCloudUploadOutline className="lg:size-8 size-6 text-main" />
//                   </div>
//                   <p className="text-main font-semibold lg:text-xl text-lg text-center capitalize mb-2">
//                     Drop your photo here to instantly upload it
//                   </p>
//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     ref={fileInputRef}
//                   />
//                   <button
//                     onClick={triggerFileInput} // Trigger the file input on button click
//                     className="bg-primary hover:bg-primary-hover text-sm mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 lg:text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
//                   >
//                     Choose a photo
//                   </button>
//                 </div>
//               )}

//               {/* profile selector rule  */}
//               {!selectedFile && (
//                 <div>
//                   {/* text */}
//                   <p className="text-gray leading-relaxed text-center mb-10 text-sm lg:text-base">
//                     It should be smaller than 2MB, and it should show your face.
//                     That way, your friends and family will know it's you.
//                   </p>

//                   {/* buttons */}
//                   <div className="flex flex-col justify-center">
//                     <button
//                       onClick={handleClosePhotoPopup}
//                       className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full lg:py-3 py-2 text-lg px-6 font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleRemovePhoto}
//                       className="text-secondary cursor-pointer lg:text-lg text-base font-medium text-center lg:mt-8 mt-5 underline underline-offset-4 capitalize"
//                     >
//                       Remove current photo
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AccountCard;


"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { LiaCameraSolid } from "react-icons/lia";
import { IoMdCopy } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { IoClose } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoRemove, IoAdd } from "react-icons/io5"; // Import plus and minus icons\
type AccountCardProps = {
  username: string;
};

const AccountCard: React.FC<AccountCardProps> = ({
  username,
}) => {
  const [copyConfirmation, setCopyConfirmation] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store the uploaded image URL
  const [uploading, setUploading] = useState(false); // State for uploading indicator
  const [zoom, setZoom] = useState(1); // Initial zoom level
  const popupRef = useRef<HTMLDivElement>(null); // Ref for the popup content

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleOpenCameraPopup = () => {
    setShowPhotoPopup(true);
  };

  const handleClosePhotoPopup = () => {
    setShowPhotoPopup(false);
    setSelectedFile(null);
    setUploadedImage(null); // Clear uploaded image as well
    setZoom(1);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);

      //Immediately show the loading screen
      setUploading(true);

      //Simulate loading for 2 second
      setTimeout(() => {
        setUploading(false);
      }, 2000);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    // Create a temporary URL for the selected file
    const imageUrl = URL.createObjectURL(selectedFile);
    setUploadedImage(imageUrl);

    setShowPhotoPopup(false);
  };

  useEffect(() => {
    // Cleanup function to revoke the URL when the component unmounts or when a new file is selected
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]); // Only run when uploadedImage changes

  const handleZoomIn = () => {
    setZoom(zoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom(zoom - 0.1);
  };

  const handleChooseAnotherPhoto = () => {
    setSelectedFile(null);
    setZoom(1); // Reset zoom
    triggerFileInput(); // Open file selector again
  };

  const handleRemovePhoto = () => {
    setUploadedImage(null); // Remove the uploaded image
    setSelectedFile(null); // Clear the selected file as well
    setZoom(1);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClosePhotoPopup();
      }
    };

    if (showPhotoPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPhotoPopup]);

  return (
    <>
      <div className="bg-green/8 p-8 rounded-3xl overflow-hidden">
        <div className="flex flex-col items-center mb-4">
          {/* Camera Icon */}
          <div className="relative">
            <div className="bg-green/8 rounded-full flex items-center justify-center overflow-hidden">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Profile"
                  className="rounded-full size-20 object-cover"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              ) : (
                <div className="p-5">
                  <FiUser className="size-6" />
                </div>
              )}
            </div>
            <div
              className="absolute cursor-pointer bottom-0 -right-2 bg-lightgreen flex items-center justify-center size-7 rounded-full border-4 border-white"
              onClick={handleOpenCameraPopup}
            >
              <LiaCameraSolid className="size-4 text-secondary" />
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

      <div className="text-center mt-6">
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

      {showPhotoPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full  bg-black/50 backdrop-blur-xs flex items-center justify-center
        "
        >
          <div
            className="relative bg-white lg:rounded-2xl lg:h-9/10 shadow-xl w-full h-full max-w-xl"
            ref={popupRef}
          >
            <div className="flex items-center justify-between p-2 mt-5">
              <h2 className="lg:text-xl text-lg font-semibold text-center text-main">
                Add a personal account photo
              </h2>

              {/* Close button */}
              <button
                onClick={handleClosePhotoPopup}
                className="text-gray hover:text-gray-800 cursor-pointer"
              >
                <IoClose className="size-10 text-green p-1.5 rounded-full hover:bg-green/8" />
              </button>
            </div>

            <div className="border-t border-gray-300"></div>

            <div className="lg:p-8 p-4">
              {uploading ? (
                <>
                  <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
                    <div className="animate-spin rounded-full size-16 border-t-2 border-b-2 border-primary"></div>
                    <p className="text-main font-semibold text-xl capitalize mb-2">
                      Uploading...
                    </p>
                    <button
                      onClick={handleClosePhotoPopup}
                      className="bg-gray-300 hover:bg-gray-400 mt-4 cursor-pointer text-gray-700 rounded-full py-2 px-6 text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    {/* text */}
                    <p className="text-gray leading-relaxed text-center mb-10">
                      It should be smaller than 2MB, and it should show your
                      face. That way, your friends and family will know it's
                      you.
                    </p>

                    {/* buttons */}
                    <div className="flex flex-col justify-center">
                      <button
                        onClick={handleClosePhotoPopup}
                        className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full py-3 text-lg px-6 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleRemovePhoto}
                        className="text-secondary cursor-pointer text-lg font-medium text-center mt-8 underline underline-offset-4 capitalize"
                      >
                        Remove current photo
                      </button>
                    </div>
                  </div>
                </>
              ) : selectedFile ? (
                <div className="flex flex-col items-center space-y-4 justify-center max-w-lg rounded-2xl py-6 mb-4">
                  <div className="overflow-hidden rounded-full lg:size-36 size-24 relative">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: `scale(${zoom})`,
                      }}
                    />
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleZoomOut}
                      className="px-2 py-1 bg-gray-200 rounded-md"
                    >
                      <IoRemove />
                    </button>
                    <span className="text-sm text-gray-700 font-medium">
                      {" "}
                      Zoom{" "}
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="px-2 py-1 bg-gray-200 rounded-md"
                    >
                      <IoAdd />
                    </button>
                  </div>

                  <p className="text-gray leading-relaxed text-center mb-4">
                    Make sure your face is visible
                  </p>
                  <div className="flex flex-col justify-center w-full">
                    <button
                      onClick={handleUpload}
                      className="bg-primary hover:bg-primary-hover transition-colors  ease-in-out duration-300 cursor-pointer text-secondary rounded-full lg:py-3 py-2 text-lg px-6 font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleChooseAnotherPhoto}
                      className="text-secondary cursor-pointer lg:text-lg text-base font-medium text-center mt-6 underline underline-offset-4 capitalize"
                    >
                      Choose another photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 justify-center bg-green/10 max-w-lg rounded-2xl py-10 mb-4">
                  <div className="lg:p-3.5 p-2 bg-white rounded-full">
                    <IoCloudUploadOutline className="lg:size-8 size-6 text-main" />
                  </div>
                  <p className="text-main font-semibold lg:text-xl text-lg text-center capitalize mb-2">
                    Drop your photo here to instantly upload it
                  </p>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    onClick={triggerFileInput} // Trigger the file input on button click
                    className="bg-primary hover:bg-primary-hover text-sm mt-4 cursor-pointer text-secondary rounded-full py-2 px-6 lg:text-lg capitalize transition-colors duration-300 ease-in-out font-medium"
                  >
                    Choose a photo
                  </button>
                </div>
              )}

              {/* profile selector rule  */}
              {!selectedFile && (
                <div>
                  {/* text */}
                  <p className="text-gray leading-relaxed text-center mb-10 text-sm lg:text-base">
                    It should be smaller than 2MB, and it should show your face.
                    That way, your friends and family will know it's you.
                  </p>

                  {/* buttons */}
                  <div className="flex flex-col justify-center">
                    <button
                      onClick={handleClosePhotoPopup}
                      className="bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-300 cursor-pointer text-secondary rounded-full lg:py-3 py-2 text-lg px-6 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRemovePhoto}
                      className="text-secondary cursor-pointer lg:text-lg text-base font-medium text-center lg:mt-8 mt-5 underline underline-offset-4 capitalize"
                    >
                      Remove current photo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountCard;