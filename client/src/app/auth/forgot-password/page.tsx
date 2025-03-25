// import React from "react";

// const page = () => {
//   return <div>Reset password Feild</div>;
// };

// export default page;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill this field");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     setIsLoading(true);

//     // Simulate API call
//     try {
//       const response = await simulateResetRequest(email);

//       if (response.success) {
//         setSuccessMessage(
//           "If an account exists with that email, a password reset link has been sent to your email address."
//         );
//       } else {
//         setError(
//           "An error occurred while processing your request. Please try again."
//         );
//       }
//     } catch (err) {
//       console.error("Reset error:", err);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col bg-white justify-center items-center min-h-screen">
//       <div className="mb-8">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//         />
//       </div>

//       <h2 className="text-5xl capitalize font-black mb-6">Reset password</h2>
//       <p className="text-center text-gray max-w-md mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg">
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="text-base text-gray block capitalize"
//           >
//             Enter your email address
//           </label>
//           <input
//             className="border rounded-lg w-full block duration-300 ease-in-out mt-1 px-4 py-3 transition-shadow"
//             id="email"
//             type="email"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//           />
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-lightgreen hover:bg-lightgreen-hover text-green font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-gray-500 text-sm mt-6">
//         Need help? Read this{" "}
//         <a href="#" className="text-blue-500 hover:underline">
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// // Simulate reset request
// const simulateResetRequest = async (email: string) => {
//   return new Promise<{ success: boolean }>((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate a successful reset request
//       if (email.includes("@")) {
//         resolve({ success: true });
//       } else {
//         resolve({ success: false });
//       }
//     }, 1000); // Simulate a delay of 1 second
//   });
// };

// export default ResetPasswordForm;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const isValidEmail = (email: string) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);
//     }
//   };

//   return (
//     <div className="flex flex-col bg-white justify-center items-center mb-5 min-h-screen px-4">
//       <div className="mb-4">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//           className="lg:size-60 size-40"
//         />
//       </div>

//       <h2 className="text-3xl capitalize font-black mb-6 md:text-5xl">
//         Reset password
//       </h2>
//       <p className="text-center text-gray text-lg max-w-lg mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg mt-5">
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="text-base text-gray block capitalize"
//           >
//             Enter your email address
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
//               emailError
//                 ? "border-red-500 border-2 !shadow-none"
//                 : "border-[#c9cbce] hover:shadow-color"
//             }`}
//           />
//           {emailError && (
//             <p className="flex text-[#a8200d] text-base items-center mt-2.5">
//               <span className="mr-1">
//                 <IoMdCloseCircle className="size-5" />
//               </span>
//               {emailError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-lightgreen hover:bg-lightgreen-hover cursor-pointer text-green font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-base text-gray mt-6">
//         Need help? Read this{" "}
//         <a
//           href="#"
//           className="text-green font-medium underline underline-offset-4"
//         >
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// export default ResetPasswordForm;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false); // New state variable

//   const isValidEmail = (email: string) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);

//       // Simulate API call
//       try {
//         const response = await simulateResetRequest(email);

//         if (response.success) {
//           setEmailSent(true); // Set emailSent to true after successful simulation
//         } else {
//           setError(
//             "An error occurred while processing your request. Please try again."
//           );
//         }
//       } catch (err) {
//         console.error("Reset error:", err);
//         setError("An error occurred. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Render Check Your Email design
//   if (emailSent) {
//     return (
//       <div className="flex flex-col bg-gray-50 justify-center items-center mb-6 min-h-screen">
//         <div className="bg-white w-full max-w-md">
//           <div className="flex justify-center mb-6">
//             <Image
//               src="/assets/images/email-small@1x.webp"
//               width={400}
//               height={400}
//               alt="Email Icon"
//               priority
//               className="size-60"
//             />
//           </div>

//           <h2 className="text-3xl text-black text-center capitalize font-black mb-4 md:text-5xl">
//             Check your email
//           </h2>

//           <p className="text-base text-center text-gray mb-4">
//             We sent an email to{" "}
//             <span className="font-medium">
//               <span className="text-green font-medium"> {email}</span>
//             </span>
//           </p>

//           <p className="text-base text-center text-gray mb-4">
//             If the email hasn't arrived yet, please check your spam folder.
//             Alternatively, you can also request the email again:
//           </p>

//           <button
//             onClick={() => setEmailSent(false)} // Go back to the form
//             className="bg-lightgreen rounded-full text-green w-full block duration-300 ease-in-out focus:outline-none focus:shadow-outline font-medium hover:bg-lightgreen-hover mb-3 mx-auto px-6 py-3 transition-colors"
//           >
//             Send email again
//           </button>

//           <p className="text-base text-center text-gray mt-5">
//             Still need help?{" "}
//             <a href="#" className="text-green underline underline-offset-4">
//               Read this article.
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Render Reset Password Form
//   return (
//     <div className="flex flex-col bg-white justify-center items-center mb-5 min-h-screen">
//       <div className="mb-8">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//         />
//       </div>

//       <h2 className="text-5xl capitalize font-black mb-6">Reset password</h2>
//       <p className="text-center text-gray text-lg max-w-lg mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg mt-5">
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="text-base text-gray block capitalize"
//           >
//             Enter your email address
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
//               emailError
//                 ? "border-red-500 border-2 !shadow-none"
//                 : "border-[#c9cbce] hover:shadow-color"
//             }`}
//           />
//           {emailError && (
//             <p className="flex text-[#a8200d] text-base items-center mt-2.5">
//               <span className="mr-1">
//                 <IoMdCloseCircle className="size-5" />
//               </span>
//               {emailError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-lightgreen hover:bg-lightgreen-hover cursor-pointer text-green font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-base text-gray mt-6">
//         Need help? Read this{" "}
//         <a
//           href="#"
//           className="text-green font-medium underline underline-offset-4"
//         >
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// // Simulate reset request
// const simulateResetRequest = async (email: string) => {
//   return new Promise<{ success: boolean }>((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate a successful reset request
//       if (email.includes("@")) {
//         resolve({ success: true });
//       } else {
//         resolve({ success: false });
//       }
//     }, 1000); // Simulate a delay of 1 second
//   });
// };

// export default ResetPasswordForm;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { IoMdCheckmark } from "react-icons/io";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false); // New state variable
//   const [emailResent, setEmailResent] = useState(false);

//   const isValidEmail = (email: string) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);

//       // Simulate API call
//       try {
//         const response = await simulateResetRequest(email);

//         if (response.success) {
//           setEmailSent(true); // Set emailSent to true after successful simulation
//         } else {
//           setError(
//             "An error occurred while processing your request. Please try again."
//           );
//         }
//       } catch (err) {
//         console.error("Reset error:", err);
//         setError("An error occurred. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleSendAgain = async () => {
//     setEmailResent(true);
//     setIsLoading(true);

//     try {
//       const response = await simulateResetRequest(email);
//       if (response.success) {
//         setSuccessMessage(
//           "A new password reset link has been sent to your email address."
//         );
//       } else {
//         setError(
//           "An error occurred while processing your request. Please try again."
//         );
//       }
//     } catch (err) {
//       console.error("Reset error:", err);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render Check Your Email design
//   if (emailSent) {
//     return (
//       <div className="flex flex-col justify-center items-center mb-6 min-h-screen">
//         <div className="bg-white w-full max-w-md">
//           <div className="flex justify-center mb-6">
//             <Image
//               src="/assets/images/email-small@1x.webp"
//               width={400}
//               height={400}
//               alt="Email Icon"
//               priority
//               className="size-60"
//             />
//           </div>

//           <h2 className="text-3xl text-black text-center capitalize font-black mb-4 md:text-5xl">
//             Check your email
//           </h2>

//           <p className="text-base text-center text-gray mb-4">
//             We sent an email to{" "}
//             <span className="font-medium">
//               <span className="text-green font-medium"> {email}</span>
//             </span>
//           </p>

//           <p className="text-base text-center text-gray mb-4">
//             If the email hasn't arrived yet, please check your spam folder.
//             Alternatively, you can also request the email again:
//           </p>

//           {emailResent && (
//             <div className="flex bg-green/8 p-6 rounded-2xl cursor-pointer gap-4 items-center mb-4">
//               <div className="flex bg-[#2f5711] justify-center rounded-full items-center size-12">
//                 <IoMdCheckmark className="text-white size-6" />
//               </div>
//               <p className="text-gray text-lg">
//                 Please check your email inbox again.
//               </p>
//             </div>
//           )}

//           <button
//             onClick={handleSendAgain}
//             disabled={isLoading}
//             className={`bg-lightgreen rounded-full text-green text-lg w-full block duration-300 ease-in-out focus:outline-none focus:shadow-outline font-medium hover:bg-lightgreen-hover mb-3 mx-auto px-6 py-3 transition-colors ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Sending..." : "Send email again"}
//           </button>

//           <p className="text-base text-center text-gray mt-5">
//             Still need help?{" "}
//             <a href="#" className="text-green underline underline-offset-4">
//               Read this article.
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Render Reset Password Form
//   return (
//     <div className="flex flex-col bg-white justify-center items-center mb-5 min-h-screen">
//       <div className="max-w-xl mb-8">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//         />
//       </div>

//       <h2 className="text-5xl capitalize font-black mb-6">Reset password</h2>
//       <p className="text-center text-gray text-lg max-w-lg mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg mt-5">
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="text-base text-gray block capitalize"
//           >
//             Enter your email address
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
//               emailError
//                 ? "border-red-500 border-2 !shadow-none"
//                 : "border-[#c9cbce] hover:shadow-color"
//             }`}
//           />
//           {emailError && (
//             <p className="flex text-[#a8200d] text-base items-center mt-2.5">
//               <span className="mr-1">
//                 <IoMdCloseCircle className="size-5" />
//               </span>
//               {emailError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-lightgreen hover:bg-lightgreen-hover cursor-pointer text-green font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-base text-gray mt-6">
//         Need help? Read this{" "}
//         <a
//           href="#"
//           className="text-green font-medium underline underline-offset-4"
//         >
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// // Simulate reset request
// const simulateResetRequest = async (email: string) => {
//   return new Promise<{ success: boolean }>((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate a successful reset request
//       if (email.includes("@")) {
//         resolve({ success: true });
//       } else {
//         resolve({ success: false });
//       }
//     }, 1000); // Simulate a delay of 1 second
//   });
// };

// export default ResetPasswordForm;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { IoMdCheckmark } from "react-icons/io";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false); // New state variable
//   const [emailResent, setEmailResent] = useState(false);
//   const [showCheckAgainMessage, setShowCheckAgainMessage] = useState(false); // State to control paragraph visibility

//   const isValidEmail = (email: string) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form fields
//     let isValid = true;

//     setError("");
//     setSuccessMessage("");

//     if (!email) {
//       setEmailError("Please fill email address field");
//       isValid = false;
//     } else if (!isValidEmail(email)) {
//       setEmailError("Please enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (isValid) {
//       setIsLoading(true);

//       // Simulate API call
//       try {
//         const response = await simulateResetRequest(email);

//         if (response.success) {
//           setEmailSent(true); // Set emailSent to true after successful simulation
//         } else {
//           setError(
//             "An error occurred while processing your request. Please try again."
//           );
//         }
//       } catch (err) {
//         console.error("Reset error:", err);
//         setError("An error occurred. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleSendAgain = async () => {
//     setEmailResent(true);
//     setIsLoading(true);
//     setShowCheckAgainMessage(false); // Hide paragraph before sending again

//     try {
//       const response = await simulateResetRequest(email);
//       if (response.success) {
//         setSuccessMessage(
//           "A new password reset link has been sent to your email address."
//         );
//         setShowCheckAgainMessage(true); // Show paragraph after successful re-send
//       } else {
//         setError(
//           "An error occurred while processing your request. Please try again."
//         );
//       }
//     } catch (err) {
//       console.error("Reset error:", err);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render Check Your Email design
//   if (emailSent) {
//     return (
//       <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//         <div className="bg-white w-full max-w-md">
//           <div className="flex justify-center mb-6">
//             <Image
//               src="/assets/images/email-small@1x.webp"
//               width={400}
//               height={400}
//               alt="Email Icon"
//               priority
//               className="lg:size-48 size-40"
//             />
//           </div>

//           <h2 className="lg:text-5xl text-center text-3xl capitalize font-black mb-6">
//             Check your email
//           </h2>

//           <p className="lg:text-base text-sm text-center text-gray text-nowrap mb-6">
//             We sent an email to{" "}
//             <span className="font-semibold text-secondary">{email}</span>{" "}
//           </p>

//           <p className="lg:text-base  text-sm text-center text-gray mb-6">
//             If the email hasn't arrived yet, please check your spam folder.
//             Alternatively, you can also request the email again:
//           </p>

//           {showCheckAgainMessage && (
//             <div className="flex bg-green/8 lg:p-6 p-4 rounded-2xl cursor-pointer lg:gap-4 gap-2 items-center mb-4">
//               <div className="flex bg-green justify-center rounded-full items-center lg:size-12 size-8">
//                 <IoMdCheckmark className="text-white size-6" />
//               </div>
//               <p className="text-gray text-lg">
//                 Please check your email inbox again.
//               </p>
//             </div>
//           )}

//           <button
//             onClick={handleSendAgain}
//             disabled={isLoading}
//             className={`bg-primary hover:bg-primary-hover cursor-pointer rounded-full text-secondary text-lg w-full block duration-300 ease-in-out focus:outline-none focus:shadow-outline font-medium mb-3 mx-auto py-3 transition-colors ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Sending..." : "Send email again"}
//           </button>

//           <p className="text-base text-center text-gray mt-5">
//             Still need help?{" "}
//             <a
//               href="#"
//               className="text-secondary underline font-medium underline-offset-4"
//             >
//               Read this article.
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Render Reset Password Form
//   return (
//     <div className="flex flex-col bg-white justify-center items-center lg:h-[calc(100vh-73px)] px-4 pt-10">
//       <div className="max-w-lg mb-8">
//         <Image
//           src="/assets/images/key-medium@1x.webp"
//           width={250}
//           height={250}
//           alt="Picture of the author"
//           className="lg:size-48 size-40"
//         />
//       </div>

//       <h2 className="lg:text-5xl text-3xl capitalize font-black mb-4">
//         Reset password
//       </h2>
//       <p className="text-center text-gray lg:text-lg text-base max-w-lg mb-4">
//         Just enter the email address you registered with and we'll send you a
//         link to reset your password.
//       </p>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div
//           className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{successMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full max-w-lg mt-2 lg:mt-5">
//         <div className="mb-4">
//           <label htmlFor="email" className="text-sm text-gray block capitalize">
//             Enter your email address
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
//               emailError
//                 ? "border-red-500 border-2 !shadow-none"
//                 : "border-[#c9cbce] hover:shadow-color"
//             }`}
//           />
//           {emailError && (
//             <p className="flex text-[#a8200d] text-base items-center mt-2.5">
//               <span className="mr-1">
//                 <IoMdCloseCircle className="size-5" />
//               </span>
//               {emailError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className={`bg-primary hover:bg-primary-hover cursor-pointer text-secondary font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send password reset link"}
//           </button>
//         </div>
//       </form>

//       <p className="text-base text-gray my-6">
//         Need help? Read this{" "}
//         <a
//           href="#"
//           className="text-secondary font-medium underline underline-offset-4"
//         >
//           Help Centre article.
//         </a>
//       </p>
//     </div>
//   );
// };

// // Simulate reset request
// const simulateResetRequest = async (email: string) => {
//   return new Promise<{ success: boolean }>((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate a successful reset request
//       if (email.includes("@")) {
//         resolve({ success: true });
//       } else {
//         resolve({ success: false });
//       }
//     }, 1000); // Simulate a delay of 1 second
//   });
// };

// export default ResetPasswordForm;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoMdCloseCircle, IoMdCheckmark } from "react-icons/io";
import authService from "../../services/auth"; // Correct import path using alias

const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [emailResent, setEmailResent] = useState<boolean>(false); // ADDED: Define setEmailResent state
  const [showCheckAgainMessage, setShowCheckAgainMessage] =
    useState<boolean>(false);
  const [resendError, setResendError] = useState<string>(""); // State for resend error message
  const [resendAttemptFailed, setResendAttemptFailed] =
    useState<boolean>(false); // Track if resend has already failed

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    setError("");
    setSuccessMessage("");
    setEmailSent(false); // Reset emailSent on new submission

    if (!email) {
      setEmailError("Please fill email address field");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (isValid) {
      setIsLoading(true);
      try {
        await authService.forgotPassword({ email });
        setEmailSent(true);
        setResendAttemptFailed(false); // Reset resend attempt status on successful send
      } catch (err: any) {
        setError(
          err.message ||
            "An error occurred while processing your request. Please try again."
        );
        setEmailSent(false); // Ensure emailSent is false if initial send fails
        setResendAttemptFailed(false); // Reset resend attempt status even if initial send fails to allow resend attempt
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendAgain = async () => {
    if (resendAttemptFailed) {
      return; // Prevent further resend attempts if already failed
    }

    setEmailResent(true);
    setIsLoading(true);
    setShowCheckAgainMessage(false);
    setResendError(""); // Clear any previous resend errors

    try {
      await authService.forgotPassword({ email });
      setSuccessMessage(
        "A new password reset link has been sent to your email address."
      );
      setShowCheckAgainMessage(true);
      setResendAttemptFailed(false); // Reset resend attempt status on successful resend
    } catch (err: any) {
      setResendError(
        err.message || "Failed to send email again. Please try again later."
      );
      setResendAttemptFailed(true); // Set resend attempt to failed
      setShowCheckAgainMessage(false); // Hide success message if resend fails
      setSuccessMessage(""); // Clear success message if resend fails
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
        <div className="bg-white w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/images/email-small@1x.webp"
              width={400}
              height={400}
              alt="Email Icon"
              priority
              className="lg:size-48 size-40"
            />
          </div>

          <h2 className="lg:text-5xl text-center text-3xl capitalize font-black mb-6">
            Check your email
          </h2>

          <p className="lg:text-base text-sm text-center text-gray text-nowrap mb-6">
            We sent an email to{" "}
            <span className="font-semibold text-secondary">{email}</span>{" "}
          </p>

          <p className="lg:text-base  text-sm text-center text-gray mb-6">
            If the email hasn't arrived yet, please check your spam folder.
            Alternatively, you can also request the email again:
          </p>

          {showCheckAgainMessage && (
            <div className="flex bg-green/8 lg:p-6 p-4 rounded-2xl cursor-pointer lg:gap-4 gap-2 items-center mb-4">
              <div className="flex bg-green justify-center rounded-full items-center lg:size-12 size-8">
                <IoMdCheckmark className="text-white size-6" />
              </div>
              <p className="text-gray lg:text-lg text-base">
                Please check your email inbox again.
              </p>
            </div>
          )}

          {resendError && ( // Display resend error message
            <div
              className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
              role="alert"
            >
              <div className="flex bg-[#a8200d] justify-center rounded-full items-center size-12">
                <IoMdCloseCircle className="p-0.5 text-white size-8" />
              </div>
              <div>
                <span className="text-gray block max-w-60">{resendError}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleSendAgain}
            disabled={isLoading || resendAttemptFailed} // Disable button if loading or resend failed
            className={`bg-primary hover:bg-primary-hover cursor-pointer rounded-full text-secondary text-lg w-full block duration-300 ease-in-out focus:outline-none focus:shadow-outline font-medium mb-3 mx-auto py-3 transition-colors
                            ${
                              isLoading || resendAttemptFailed
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
          >
            {isLoading ? "Sending..." : "Send email again"}
          </button>

          {resendAttemptFailed && ( // Show message if resend failed
            <p className="text-center text-red-500 text-sm mt-2">
              Couldn't send email again. Please try again later.
            </p>
          )}

          <p className="text-base text-center text-gray mt-5">
            Still need help?{" "}
            <a
              href="#"
              className="text-secondary underline font-medium underline-offset-4"
            >
              Read this article.
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white justify-center items-center lg:h-[calc(100vh-73px)] px-4 pt-10">
      <div className="max-w-lg mb-8">
        <Image
          src="/assets/images/key-medium@1x.webp"
          width={250}
          height={250}
          alt="Key Icon"
          className="lg:size-48 size-40"
        />
      </div>

      <h2 className="lg:text-5xl text-3xl capitalize font-black mb-4">
        Reset password
      </h2>
      <p className="text-center text-gray lg:text-lg text-base max-w-lg mb-4">
        Just enter the email address you registered with and we'll send you a
        link to reset your password.
      </p>

      {error && (
        <div
          className="bg-red-100 border border-red-400 rounded text-red-700 mb-4 px-4 py-3 relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 rounded text-green-700 mb-4 px-4 py-3 relative"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-lg mt-2 lg:mt-5">
        <div className="mb-4">
          <label htmlFor="email" className="text-sm text-gray block capitalize">
            Enter your email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${
              emailError
                ? "border-red-500 border-2 !shadow-none"
                : "border-[#c9cbce] hover:shadow-color"
            }`}
          />
          {emailError && (
            <p className="flex text-[#a8200d] text-base items-center mt-2.5">
              <span className="mr-1">
                <IoMdCloseCircle className="size-5" />
              </span>
              {emailError}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            className={`bg-primary hover:bg-primary-hover cursor-pointer text-secondary font-medium text-lg py-3 w-full px-4 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send password reset link"}
          </button>
        </div>
      </form>

      <p className="text-base text-gray my-6">
        Need help? Read this{" "}
        <a
          href="#"
          className="text-secondary font-medium underline underline-offset-4"
        >
          Help Centre article.
        </a>
      </p>
    </div>
  );
};

export default ResetPasswordForm;
