// import Link from "next/link";
// import React from "react";
// import { BsExclamationLg } from "react-icons/bs";

// export default function ChangePassword() {
//   return (
//     <section className="ChangePasswor py-10">
//       <div className="container mx-auto">
//         <h2 className="text-3xl text-main font-semibold">Change password</h2>

//         <div className="space-y-4">
//           <div className="bg-lightgray rounded-xl p-4 flex items-start gap-4 mt-8">
//             <div className="p-3 bg-yellow-400 rounded-full">
//               <BsExclamationLg size={24} className="text-main" />
//             </div>

//             <div className="flex flex-col gap-3">
//               <p className="text-gray">
//                 We will never send you a temporary password by phone, email or
//                 text message. When changing your password, always use something
//                 that’s only known by you.
//               </p>

//               <Link
//                 href={""}
//                 className="text-secondary w-fit text-lg font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-secondary after:mt-1"
//               >
//                 Learn how to keep your account safe
//               </Link>
//             </div>
//           </div>

//           <div>
//             <form className="space-y-6 max-w-sm">
//               <div className="">
//                 <label
//                   htmlFor="accountNumber"
//                   className="text-main text-sm block capitalize font-semibold mb-1"
//                 >
//                   Current password
//                 </label>
//                 <input
//                   type="text"
//                   id="accountNumber"
//                   className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                   placeholder="Enter a current password"
//                 />
//               </div>

//               <div className="">
//                 <label
//                   htmlFor="ifscCode"
//                   className="text-main text-sm block capitalize font-semibold mb-1"
//                 >
//                   Your new password
//                 </label>
//                 <input
//                   type="text"
//                   id="ifscCode"
//                   className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                   placeholder="Enter a new password"

//                 />
//               </div>

//                 {/* Save Button */}
//               <div className="w-full text-center">
//                 <button
//                   type="submit"
//                   className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-secondary font-medium rounded-full border border-transparent hover:bg-primary/80 cursor-pointer transition-colors duration-150 ease-in-out "
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
















// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { BsExclamationLg } from "react-icons/bs";
// import { ChangeEvent, FormEvent } from "react"; // Import ChangeEvent and FormEvent from React
// import { FiX } from "react-icons/fi";
// import { LuCheck } from "react-icons/lu";

// export default function ChangePassword() {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const isSaveButtonDisabled = !currentPassword || !newPassword;

//   const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     // Explicitly type 'e' as ChangeEvent<HTMLInputElement>
//     setCurrentPassword(e.target.value);
//   };

//   const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     // Explicitly type 'e' as ChangeEvent<HTMLInputElement>
//     setNewPassword(e.target.value);
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     // Explicitly type 'e' as FormEvent<HTMLFormElement>
//     e.preventDefault();
//     if (!isSaveButtonDisabled) {
//       // Handle form submission logic here (e.g., API call to change password)
//       console.log("Form submitted with:", { currentPassword, newPassword });
//       // Reset form fields after submission if needed
//       setCurrentPassword("");
//       setNewPassword("");
//     }
//   };

//   return (
//     <section className="ChangePasswor py-10">
//       <div className="container mx-auto">
//         <h2 className="text-3xl text-main font-semibold">Change password</h2>

//         <div className="space-y-4 max-w-md">
//           <div className="bg-lightgray rounded-xl p-4 flex items-start gap-4 mt-8">
//             <div className="p-3 bg-yellow-400 rounded-full">
//               <BsExclamationLg size={24} className="text-main" />
//             </div>

//             <div className="flex flex-col gap-3">
//               <p className="text-gray">
//                 We will never send you a temporary password by phone, email or
//                 text message. When changing your password, always use something
//                 that’s only known by you.
//               </p>

//               <Link
//                 href={""}
//                 className="text-secondary w-fit font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-secondary after:mt-1"
//               >
//                 Learn how to keep your account safe
//               </Link>
//             </div>
//           </div>

//           {/* Error Message :- Current Password */}
//           <div className="bg-lightgray rounded-xl p-4 flex items-center gap-4">
//             <div className="p-1 bg-red-700 rounded-full">
//               <FiX size={24} className="text-lightgray" />
//             </div>

//             <p className="text-gray">Invalid current password</p>
//           </div>

//           {/* Error Message :- Don't allow same password */}
//           <div className="bg-lightgray rounded-xl p-4 flex items-center gap-4">
//             <div className="p-1 bg-red-700 rounded-full">
//               <FiX size={24} className="text-lightgray" />
//             </div>

//             <p className="text-gray">
//               Your new password can't be the same as the current one.
//             </p>
//           </div>

//           <div>
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Current Password */}
//               <div className="">
//                 <label
//                   htmlFor="currentPassword"
//                   className="text-main text-sm block capitalize font-semibold mb-1"
//                 >
//                   Current password
//                 </label>
//                 <input
//                   type="password"
//                   id="currentPassword"
//                   className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                   placeholder="Enter a current password"
//                   value={currentPassword}
//                   onChange={handleCurrentPasswordChange}
//                 />
//               </div>

//               {/* New Password */}
//               <div className="">
//                 <label
//                   htmlFor="newPassword"
//                   className="text-main text-sm block capitalize font-semibold mb-1"
//                 >
//                   Your new password
//                 </label>
//                 <input
//                   type="password"
//                   id="newPassword"
//                   className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                   placeholder="Enter a new password"
//                   value={newPassword}
//                   onChange={handleNewPasswordChange}
//                 />
//               </div>

//               {/* Password Message */}
//               <div className="flex items-start gap-4 mt-4">
//                 <div className="p-1 bg-yellow-400 rounded-full mt-1">
//                   <BsExclamationLg size={12} className="text-main" />
//                 </div>

//                 <p className="text-gray text-sm">
//                   Password must contain a{" "}
//                   <span className="line-through font-semibold">
//                     &nbsp;letter&nbsp;
//                   </span>
//                   and<span className="font-semibold">&nbsp;a number</span>, and
//                   be minimum of
//                   <span className="font-semibold">&nbsp;9 characters</span>
//                 </p>
//               </div>

//               {/* Sorted Message */}
//               <div className="flex items-start gap-4">
//                 <div className="p-1 bg-green rounded-full mt-1">
//                   <LuCheck size={12} className="text-white" />
//                 </div>
//                 <p className="text-gray text-sm">
//                   That’s your password sorted.
//                 </p>
//               </div>

//               {/* Save Button */}
//               <div className="w-full text-center">
//                 <button
//                   type="submit"
//                   disabled={isSaveButtonDisabled}
//                   className={`inline-flex items-center justify-center w-full px-6 py-3 text-secondary font-medium rounded-full border border-transparent transition-colors duration-150 ease-in-out ${
//                     isSaveButtonDisabled
//                       ? "bg-lightgray cursor-not-allowed"
//                       : "bg-primary hover:bg-primary/80 cursor-pointer"
//                   }`}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { ChangeEvent, FormEvent } from "react";
import { FiX } from "react-icons/fi";
import { LuCheck, LuEye, LuEyeClosed } from "react-icons/lu"; // Import LuEye and LuEyeClosed

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showSamePasswordError, setShowSamePasswordError] = useState(false);
  const [showInvalidCurrentPasswordError, setShowInvalidCurrentPasswordError] =
    useState(false);
  const [showPasswordMessage, setShowPasswordMessage] = useState(true);
  const [showSortedMessage, setShowSortedMessage] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false); // State for password visibility

  // Declare isNewPasswordValid function BEFORE isSaveButtonDisabled
  const isNewPasswordValid = () => {
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const isLongEnough = newPassword.length >= 9;
    return hasLetter && hasNumber && isLongEnough;
  };

  const isSaveButtonDisabled =
    !currentPassword || !newPassword || !isNewPasswordValid();
  const correctCurrentPassword = "kartavya27";

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
    setShowInvalidCurrentPasswordError(false);
    setShowSamePasswordError(false);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setNewPassword(passwordValue);
    setShowSamePasswordError(false);
    setShowInvalidCurrentPasswordError(false);
    validateNewPassword(passwordValue);
  };

  const validateNewPassword = (password: string) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 9;

    if (hasLetter && hasNumber && isLongEnough) {
      setShowPasswordMessage(false);
      setShowSortedMessage(true);
    } else {
      setShowPasswordMessage(true);
      setShowSortedMessage(false);
    }
  };

  useEffect(() => {
    validateNewPassword(newPassword);
  }, [newPassword]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSamePasswordError(false);
    setShowInvalidCurrentPasswordError(false);

    if (!isSaveButtonDisabled) {
      if (currentPassword === newPassword) {
        setShowSamePasswordError(true);
        setShowInvalidCurrentPasswordError(false);
      } else if (currentPassword !== correctCurrentPassword) {
        setShowInvalidCurrentPasswordError(true);
        setShowSamePasswordError(false);
      } else {
        console.log("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setShowPasswordMessage(true);
        setShowSortedMessage(false);
      }
    }
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleCopyPassword = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <section className="ChangePasswor py-10">
      <div className="container mx-auto">
        <h2 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Change password</h2>

        <div className="space-y-4 w-full md:max-w-lg">
          <div className="bg-lightgray dark:bg-primarybox rounded-xl p-4 flex items-start gap-4 mt-8">
            <div className="p-3 bg-yellow-400 rounded-full">
              <BsExclamationLg size={24} className="text-main" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-gray-500 dark:text-gray-300">
                We will never send you a temporary password by phone, email or
                text message. When changing your password, always use something
                that’s only known by you.
              </p>

              <Link
                href={""}
                className="text-neutral-900 dark:text-white w-fit font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-neutral-900 dark:after:bg-white after:mt-1"
              >
                Learn how to keep your account safe
              </Link>
            </div>
          </div>

          {/* Error Message :- Current Password */}
          {showInvalidCurrentPasswordError && (
            <div className="bg-lightgray dark:bg-red-600/20 border rounded-xl p-4 flex items-center gap-4">
              <div className="p-1 bg-red-700 rounded-full">
                <FiX size={24} className="text-lightgray" />
              </div>
              <p className="text-gray-500 dark:text-white">Invalid current password</p>
            </div>
          )}

          {/* Error Message :- Don't allow same password */}
          {showSamePasswordError && (
            <div className="bg-lightgray dark:bg-red-600/20 border rounded-xl p-4 flex items-center gap-4">
              <div className="p-1 bg-red-700 rounded-full">
                <FiX size={24} className="text-lightgray" />
              </div>
              <p className="text-gray-500 dark:text-white">
                Your new password can't be the same as the current one.
              </p>
            </div>
          )}

          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Current Password */}
              <div className="">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                >
                  Current password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80"
                  placeholder="Enter a current password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />  
              </div>

              {/* New Password */}
              <div className="relative"> {/* Make position relative for icon positioning */}
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                >
                  Your new password
                </label>
                <input
                  type={isNewPasswordVisible ? "text" : "password"} // Conditional type
                  id="newPassword"
                  className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80"
                  placeholder="Enter a new password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  onCopy={handleCopyPassword} // Disable copy
                  onCut={handleCopyPassword} // Disable cut (optional, for extra precaution)
                  />
                <button
                  type="button" // Important: type="button" to prevent form submission
                  className="absolute right-4 top-10 focus:outline-none"
                  onClick={toggleNewPasswordVisibility}
                >
                  {isNewPasswordVisible ? (
                    <LuEye size={20} className="text-gray-500 dark:text-gray-300" />
                  ) : (
                    <LuEyeClosed size={20} className="text-gray-500 dark:text-gray-300" />
                  )}
                </button>
              </div>

              {/* Password Message */}
              {showPasswordMessage && (
                <div className="flex items-start gap-4 mt-4">
                  <div className="p-1 bg-yellow-400 rounded-full">
                    <BsExclamationLg size={14} className="text-main" />
                  </div>

                  <p className="text-neutral-900 dark:text-white text-sm">
                    Password must contain a{" "}
                    <span className="line-through font-semibold">
                       letter 
                    </span>
                    and<span className="font-semibold"> a number</span>, and
                    be minimum of
                    <span className="font-semibold"> 9 characters</span>
                  </p>
                </div>
              )}

              {/* Sorted Message */}
              {showSortedMessage && (
                <div className="flex items-start gap-4">
                  <div className="p-1 bg-green dark:bg-green-600/20 rounded-full">
                    <LuCheck size={14} className="text-lightgray dark:text-green-600 " />
                  </div>
                  <p className="text-neutral-900 dark:text-white text-sm">
                    That’s your password sorted.
                  </p>
                </div>
              )}

              {/* Save Button */}
              <div className="w-full text-center">
                <button
                  type="submit"
                  disabled={isSaveButtonDisabled}
                  className={`inline-flex items-center justify-center w-full px-6 py-3 h-12.5 text-secondary font-medium rounded-full border border-transparent transition-colors duration-150 ease-in-out ${
                    isSaveButtonDisabled
                      ? "bg-lightborder cursor-not-allowed opacity-60"
                      : "bg-primary text-neutral-900 hover:bg-primaryhover cursor-pointer"
                  }`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}