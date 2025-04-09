// "use client"
// import React, { useState } from "react";

// export default function ChangeEmail() {
//   const [step, setStep] = useState(1);
//   const [newEmail, setNewEmail] = useState("");

//   const handleStep1Submit = (e) => {
//     e.preventDefault();
//     if (newEmail) {
//       setStep(2);
//     } else {
//       alert("Please enter your new email address.");
//     }
//   };

//   const handleStep2Submit = (e) => {
//     e.preventDefault();
//     alert("Password verification and email change logic would be implemented here.");
//   };

//   return (
//     <section className="chagepassword py-12">
//       <div className="container mx-auto">
//         {/* Step-1 */}
//         {step === 1 && (
//           <div>
//             <div className="max-w-lg mx-auto text-center space-y-6">
//               <h2 className="text-2xl text-center text-main font-semibold">
//                 Enter your new email address
//               </h2>
//               <p className="text-gray text-sm">
//                 Before your change is confirmed, we'll ask you to enter your
//                 password and verify your new email address. Please ensure that
//                 only you have access to this email to keep your account secure.
//               </p>
//               <form onSubmit={handleStep1Submit}>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="newEmail"
//                     className="text-main text-sm block capitalize text-left font-semibold mb-1"
//                   >
//                     Your new e-mail address
//                   </label>
//                   <input
//                     type="email"
//                     id="newEmail"
//                     className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                     placeholder="Your new e-mail address"
//                     value={newEmail}
//                     onChange={(e) => setNewEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="inline-flex items-center justify-center w-full px-6 py-3 text-secondary bg-primary hover:bg-primary/80 cursor-pointer font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out"
//                 >
//                   Continue
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Step-2 */}
//         {step === 2 && (
//           <div>
//             <div className="max-w-lg mx-auto text-center space-y-6">
//               <h2 className="text-2xl text-center text-main font-semibold">
//                 Password required
//               </h2>
//               <p className="text-gray text-sm">
//                 So we can change your email address, we require you to enter your
//                 password. You'll also need to verify your new email address before
//                 the change is applied
//               </p>
//               <form onSubmit={handleStep2Submit}>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="password"
//                     className="text-main text-sm block capitalize font-semibold mb-1"
//                   >
//                     Enter your password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                     placeholder="Enter your password"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="inline-flex items-center justify-center w-full px-6 py-3 text-secondary bg-primary hover:bg-primary/80 cursor-pointer font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out"
//                 >
//                   Continue
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }















// "use client"
// import React, { useState } from "react";
// import FullyReusableHeader from "../../../header/page";
// import { ChangeEvent, FormEvent } from 'react';
// import { BsExclamationLg } from "react-icons/bs";
// import { LuCheck } from "react-icons/lu";

// export default function ChangeEmail() {
//   const [step, setStep] = useState(1);
//   const [newEmail, setNewEmail] = useState("");
//   const [isCurrentEmail, setIsCurrentEmail] = useState(false);
//   const [isValidNewEmail, setIsValidNewEmail] = useState(false);
//   const currentEmail = "user@example.com"; // Replace with actual current email

//   const progressSteps = ["New Email", "Enter Password", "Verify Email"];

//   const handleStep1Submit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isValidNewEmail) { // Only proceed if the email is valid and not current
//       setStep(2);
//     }
//   };

//   const handleStep2Submit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     alert("Password verification and email change logic would be implemented here.\nNew email to be updated: " + newEmail);
//   };

//   const isValidEmailFormat = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const inputEmail = e.target.value;
//     setNewEmail(inputEmail);

//     if (inputEmail === currentEmail) {
//       setIsCurrentEmail(true);
//       setIsValidNewEmail(false);
//     } else if (isValidEmailFormat(inputEmail)) {
//       setIsCurrentEmail(false);
//       setIsValidNewEmail(true); // Valid new email if it's a valid format and not current email
//     } else {
//       setIsCurrentEmail(false);
//       setIsValidNewEmail(false);
//     }
//   };

//   return (
//     <>
//       <FullyReusableHeader
//         title="Change Email"
//         showProgressBar={true}
//         progressSteps={progressSteps}
//         currentStepIndex={step - 1}
//       />
//       <section className="chagepassword py-12">
//         <div className="container mx-auto">
//           {/* Step-1 */}
//           {step === 1 && (
//             <div>
//               <div className="max-w-lg mx-auto text-center space-y-6">
//                 <h2 className="text-2xl text-center text-main font-semibold">
//                   Enter your new email address
//                 </h2>
//                 <p className="text-gray text-sm">
//                   Before your change is confirmed, we'll ask you to enter your
//                   password and verify your new email address. Please ensure that
//                   only you have access to this email to keep your account
//                   secure.
//                 </p>

//                 <form onSubmit={handleStep1Submit}>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="newEmail"
//                       className="text-main text-sm block capitalize text-left font-semibold mb-1"
//                     >
//                       Your new e-mail address
//                     </label>
//                     <input
//                       type="email"
//                       id="newEmail"
//                       className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                       placeholder="Your new e-mail address"
//                       value={newEmail}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     {isCurrentEmail && (
//                       <div className="flex items-start gap-4 mt-4">
//                         <div className="p-1 bg-yellow-400 rounded-full mt-1">
//                           <BsExclamationLg size={12} className="text-main" />
//                         </div>
//                         <p className="text-gray text-sm">
//                           This is your current email address!
//                         </p>
//                       </div>
//                     )}

//                     {isValidNewEmail && !isCurrentEmail && (
//                       <div className="flex items-start gap-4 mt-4">
//                         <div className="p-1 bg-green rounded-full">
//                           <LuCheck size={12} className="text-white" />
//                         </div>
//                         <p className="text-gray text-sm">
//                           Now that's a proper e-mail!
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     type="submit"
//                     className={`inline-flex items-center justify-center w-full px-6 py-3 text-secondary font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out ${
//                       isValidNewEmail
//                         ? "bg-primary hover:bg-primary/80 cursor-pointer"
//                         : "bg-lightgray cursor-not-allowed"
//                     }`}
//                     disabled={!isValidNewEmail}
//                   >
//                     Continue
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}

//           {/* Step-2 */}
//           {step === 2 && (
//             <div>
//               <div className="max-w-lg mx-auto text-center space-y-6">
//                 <h2 className="text-2xl text-center text-main font-semibold">
//                   Password required
//                 </h2>
//                 <p className="text-gray text-sm">
//                   So we can change your email address, we require you to enter
//                   your password. You'll also need to verify your new email
//                   address before the change is applied
//                 </p>
//                 <form onSubmit={handleStep2Submit}>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="password"
//                       className="text-main text-sm block capitalize font-semibold mb-1"
//                     >
//                       Enter your password
//                     </label>
//                     <input
//                       type="password"
//                       id="password"
//                       className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                       placeholder="Enter your password"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="inline-flex items-center justify-center w-full px-6 py-3 text-secondary bg-primary hover:bg-primary/80 cursor-pointer font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out"
//                   >
//                     Continue
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }


// "use client"
// import React, { useState } from "react";
// import FullyReusableHeader from "../../../header/page";
// import { ChangeEvent, FormEvent } from 'react';
// import { BsExclamationLg } from "react-icons/bs";
// import { LuCheck } from "react-icons/lu";

// export default function ChangeEmail() {
//   const [step, setStep] = useState(1);
//   const [newEmail, setNewEmail] = useState("");
//   const [isCurrentEmail, setIsCurrentEmail] = useState(false);
//   const [isValidNewEmail, setIsValidNewEmail] = useState(false);
//   const currentEmail = "user@example.com"; // Replace with actual current email
//   const [password, setPassword] = useState("");
//   const [isPasswordValid, setIsPasswordValid] = useState(false);

//   const progressSteps = ["New Email", "Enter Password", "Verify Email"];

//   const handleStep1Submit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isValidNewEmail) { // Only proceed if the email is valid and not current
//       setStep(2);
//     }
//   };

//   const handleStep2Submit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isPasswordValid) {
//       setStep(3); // Assuming Step 3 is for email verification - adjust if needed
//     } else {
//       alert("Please enter a valid password."); // Or handle invalid password in a better way
//     }
//   };

//   const isValidEmailFormat = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const isValidPassword = (password: string) => {
//     const hasLetter = /[a-zA-Z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const isLongEnough = password.length >= 9;
//     return hasLetter && hasNumber && isLongEnough;
//   };


//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.id === "newEmail") {
//       const inputEmail = e.target.value;
//       setNewEmail(inputEmail);

//       if (inputEmail === currentEmail) {
//         setIsCurrentEmail(true);
//         setIsValidNewEmail(false);
//       } else if (isValidEmailFormat(inputEmail)) {
//         setIsCurrentEmail(false);
//         setIsValidNewEmail(true); // Valid new email if it's a valid format and not current email
//       } else {
//         setIsCurrentEmail(false);
//         setIsValidNewEmail(false);
//       }
//     } else if (e.target.id === "password") {
//       const inputPassword = e.target.value;
//       setPassword(inputPassword);
//       setIsPasswordValid(isValidPassword(inputPassword));
//     }
//   };

//   return (
//     <>
//       <FullyReusableHeader
//         title="Change Email"
//         showProgressBar={true}
//         progressSteps={progressSteps}
//         currentStepIndex={step - 1}
//       />
//       <section className="chagepassword py-12">
//         <div className="container mx-auto">
//           {/* Step-1 */}
//           {step === 1 && (
//             <div>
//               <div className="max-w-lg mx-auto space-y-6">
//                 <h2 className="text-2xl text-center text-main font-semibold">
//                   Enter your new email address
//                 </h2>
//                 <p className="text-gray text-sm">
//                   Before your change is confirmed, we'll ask you to enter your
//                   password and verify your new email address. Please ensure that
//                   only you have access to this email to keep your account
//                   secure.
//                 </p>

//                 <form onSubmit={handleStep1Submit}>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="newEmail"
//                       className="text-main text-sm block capitalize text-left font-semibold mb-1"
//                     >
//                       Your new e-mail address
//                     </label>
//                     <input
//                       type="email"
//                       id="newEmail"
//                       className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                       placeholder="Your new e-mail address"
//                       value={newEmail}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     {isCurrentEmail && (
//                       <div className="flex items-start gap-4 mt-4">
//                         <div className="p-1 bg-yellow-400 rounded-full">
//                           <BsExclamationLg size={12} className="text-main" />
//                         </div>
//                         <p className="text-gray text-sm">
//                           This is your current email address!
//                         </p>
//                       </div>
//                     )}

//                     {isValidNewEmail && !isCurrentEmail && (
//                       <div className="flex items-start gap-4 mt-4">
//                         <div className="p-1 bg-green rounded-full">
//                           <LuCheck size={12} className="text-white" />
//                         </div>
//                         <p className="text-gray text-sm">
//                           Now that's a proper e-mail!
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     type="submit"
//                     className={`inline-flex items-center justify-center w-full px-6 py-3 text-secondary font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out ${
//                       isValidNewEmail
//                         ? "bg-primary hover:bg-primary/80 cursor-pointer"
//                         : "bg-lightgray cursor-not-allowed"
//                     }`}
//                     disabled={!isValidNewEmail}
//                   >
//                     Continue
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}

//           {/* Step-2 */}
//           {step === 2 && (
//             <div>
//               <div className="max-w-lg mx-auto space-y-6">
//                 <h2 className="text-2xl text-center text-main font-semibold">
//                   Enter your password
//                 </h2>
//                 <p className="text-gray text-sm">
//                   To proceed with changing your email address, please enter your
//                   current password for security verification.
//                 </p>
//                 <form onSubmit={handleStep2Submit}>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="password"
//                       className="text-main text-sm block capitalize font-semibold mb-1"
//                     >
//                       Enter your password
//                     </label>
//                     <input
//                       type="password"
//                       id="password"
//                       className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
//                       placeholder="Enter your password"
//                       value={password}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     {!isPasswordValid && password.length > 0 && (
//                       <div className="flex items-start gap-4 mt-4">
//                         <div className="p-1 bg-yellow-400 rounded-full">
//                           <BsExclamationLg size={12} className="text-main" />
//                         </div>

//                         <p className="text-gray text-sm">
//                           Password must contain a{" "}
//                           <span className="line-through font-semibold">
//                              letter 
//                           </span>
//                           and<span className="font-semibold"> a number</span>,
//                           and be minimum of
//                           <span className="font-semibold"> 9 characters</span>
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                   <button
//                     type="submit"
//                     className={`inline-flex items-center justify-center w-full px-6 py-3 text-secondary font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out ${
//                       isPasswordValid
//                         ? "bg-primary hover:bg-primary/80 cursor-pointer"
//                         : "bg-lightgray cursor-not-allowed"
//                     }`}
//                     disabled={!isPasswordValid}
//                   >
//                     Continue
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}

//           {/* Step-3 (Example - You'll need to implement actual email verification) */}
//           {step === 3 && (
//             <div>
//               <div className="max-w-lg mx-auto text-center space-y-6">
//                 <h2 className="text-2xl text-center text-main font-semibold">
//                   Verify your new email
//                 </h2>
//                 <p className="text-gray text-sm">
//                   We've sent a verification link to your new email address (
//                   {newEmail}). Please click on the link in that email to
//                   complete the email change process.
//                 </p>
//                 {/* You would typically have logic here to check for verification status or resend verification email */}
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }


"use client"
import React, { useState } from "react";
import { ChangeEvent, FormEvent } from 'react';
import { BsExclamationLg } from "react-icons/bs";
import { LuCheck } from "react-icons/lu";

export default function ChangeEmail() {
  const [step, setStep] = useState(1);
  const [newEmail, setNewEmail] = useState("");
  const [isCurrentEmail, setIsCurrentEmail] = useState(false);
  const [isValidNewEmail, setIsValidNewEmail] = useState(false);
  const currentEmail = "user@example.com"; // Replace with actual current email
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const progressSteps = ["New Email", "Enter Password", "Verify Email"];

  const handleStep1Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidNewEmail) { // Only proceed if the email is valid and not current
      setStep(2);
    }
  };

  const handleStep2Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPasswordValid) {
      setStep(3); // Assuming Step 3 is for email verification - adjust if needed
    } else {
      alert("Please enter a valid password."); // Or handle invalid password in a better way
    }
  };

  const isValidEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 9;
    return hasLetter && hasNumber && isLongEnough;
  };


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "newEmail") {
      const inputEmail = e.target.value;
      setNewEmail(inputEmail);

      if (inputEmail === currentEmail) {
        setIsCurrentEmail(true);
        setIsValidNewEmail(false);
      } else if (isValidEmailFormat(inputEmail)) {
        setIsCurrentEmail(false);
        setIsValidNewEmail(true); // Valid new email if it's a valid format and not current email
      } else {
        setIsCurrentEmail(false);
        setIsValidNewEmail(false);
      }
    } else if (e.target.id === "password") {
      const inputPassword = e.target.value;
      setPassword(inputPassword);
      setIsPasswordValid(isValidPassword(inputPassword));
    }
  };

  return (
    <>
      <section className="chagepassword py-12">
        <div className="container mx-auto">
          {/* Step-1 */}
          {step === 1 && (
            <div>
              <div className="max-w-lg mx-auto space-y-6">
                <h2 className="text-2xl text-center text-main font-semibold">
                  Enter your new email address
                </h2>
                {/* FIX: Replaced ' with ' */}
                <p className="text-gray text-sm">
                  Before your change is confirmed, we&apos;ll ask you to enter your
                  password and verify your new email address. Please ensure that
                  only you have access to this email to keep your account
                  secure.
                </p>

                <form onSubmit={handleStep1Submit}>
                  <div className="mb-4">
                    <label
                      htmlFor="newEmail"
                      className="text-main text-sm block capitalize text-left font-semibold mb-1"
                    >
                      Your new e-mail address
                    </label>
                    <input
                      type="email"
                      id="newEmail"
                      className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                      placeholder="Your new e-mail address"
                      value={newEmail}
                      onChange={handleInputChange}
                      required
                    />
                    {isCurrentEmail && (
                      <div className="flex items-start gap-4 mt-4">
                        <div className="p-1 bg-yellow-400 rounded-full">
                          <BsExclamationLg size={12} className="text-main" />
                        </div>
                        <p className="text-gray text-sm">
                          This is your current email address!
                        </p>
                      </div>
                    )}

                    {isValidNewEmail && !isCurrentEmail && (
                      <div className="flex items-start gap-4 mt-4">
                        <div className="p-1 bg-green rounded-full">
                          <LuCheck size={12} className="text-white" />
                        </div>
                         {/* FIX: Replaced ' with ' */}
                        <p className="text-gray text-sm">
                          Now that&apos;s a proper e-mail!
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`inline-flex items-center justify-center w-full px-6 py-3 text-secondary font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out ${
                      isValidNewEmail
                        ? "bg-primary hover:bg-primary/80 cursor-pointer"
                        : "bg-lightgray cursor-not-allowed"
                    }`}
                    disabled={!isValidNewEmail}
                  >
                    Continue
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Step-2 */}
          {step === 2 && (
            <div>
              <div className="max-w-lg mx-auto space-y-6">
                <h2 className="text-2xl text-center text-main font-semibold">
                  Enter your password
                </h2>
                <p className="text-gray text-sm">
                  To proceed with changing your email address, please enter your
                  current password for security verification.
                </p>
                <form onSubmit={handleStep2Submit}>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="text-main text-sm block capitalize font-semibold mb-1"
                    >
                      Enter your password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handleInputChange}
                      required
                    />
                    {!isPasswordValid && password.length > 0 && (
                      <div className="flex items-start gap-4 mt-4">
                        <div className="p-1 bg-yellow-400 rounded-full">
                          <BsExclamationLg size={12} className="text-main" />
                        </div>

                        <p className="text-gray text-sm">
                          Password must contain a{" "}
                          <span className="line-through font-semibold">
                             letter  {/* Using   for non-breaking space */}
                          </span>
                          and<span className="font-semibold"> a number</span>,
                          and be minimum of
                          <span className="font-semibold"> 9 characters</span> {/* Using   for non-breaking space */}
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className={`inline-flex items-center justify-center w-full px-6 py-3 text-secondary font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out ${
                      isPasswordValid
                        ? "bg-primary hover:bg-primary/80 cursor-pointer"
                        : "bg-lightgray cursor-not-allowed"
                    }`}
                    disabled={!isPasswordValid}
                  >
                    Continue
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Step-3 (Example - You'll need to implement actual email verification) */}
          {step === 3 && (
            <div>
              <div className="max-w-lg mx-auto text-center space-y-6">
                <h2 className="text-2xl text-center text-main font-semibold">
                  Verify your new email
                </h2>
                 {/* FIX: Replaced ' with ' */}
                <p className="text-gray text-sm">
                  We&apos;ve sent a verification link to your new email address (
                  {newEmail}). Please click on the link in that email to
                  complete the email change process.
                </p>
                {/* You would typically have logic here to check for verification status or resend verification email */}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}