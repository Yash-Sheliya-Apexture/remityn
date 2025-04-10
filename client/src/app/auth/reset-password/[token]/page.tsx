// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import authService from "../../../services/auth";
// import { IoMdCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
// import { VscEye } from "react-icons/vsc";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { IoClose } from "react-icons/io5";
// import Link from "next/link";
// interface ResetPasswordPageProps {
//   params: { token: string };
// }

// const NewPasswordPage = ({ params }: ResetPasswordPageProps) => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState<string[]>([]);
//   const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
//   const [resetError, setResetError] = useState("");
//   const [resetSuccess, setResetSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();
//   const { token: tokenFromParams } = useParams();
//   const [validationCriteria, setValidationCriteria] = useState({
//     // State for criteria status
//     hasLetter: false,
//     hasNumber: false,
//     hasMinLength: false,
//   });

//   const token = tokenFromParams as string;

//   useEffect(() => {
//     if (!token) {
//       setResetError("Invalid reset link.");
//     }
//   }, [token]);

//   const validatePassword = (pw: string) => {
//     const errors: string[] = [];
//     let hasLetter = false;
//     let hasNumber = false;
//     let hasMinLength = false;

//     if (!pw) {
//       return {
//         errors: [],
//         hasLetter: false,
//         hasNumber: false,
//         hasMinLength: false,
//       };
//     } else {
//       if (pw.length >= 9) {
//         hasMinLength = true;
//       }
//       if (/[a-zA-Z]/.test(pw)) {
//         hasLetter = true;
//       }
//       if (/
//d/.test(pw)) {
//         hasNumber = true;
//       }
//     }
//     return { errors, hasLetter, hasNumber, hasMinLength };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setPasswordError([]);
//     setConfirmPasswordError("");
//     setResetError("");
//     setResetSuccess("");

//     let formIsValid = true;

//     if (!password) {
//       setPasswordError(["New Password is required."]);
//       formIsValid = false;
//     }

//     if (!confirmPassword) {
//       setConfirmPasswordError("Confirm New Password is required.");
//       formIsValid = false;
//     }

//     if (!formIsValid) {
//       return;
//     }

//     const validationResult = validatePassword(password);
//     if (validationResult.errors.length > 0) {
//       setPasswordError(validationResult.errors);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await authService.resetPassword({ token, password });
//       setResetSuccess("Password reset successful! Redirecting to login...");
//       setTimeout(() => {
//         router.push("/auth/login?forgotPasswordSuccess=true");
//       }, 2000);
//     } catch (err: any) {
//       if (err.message === "Invalid or expired password reset token.") {
//         setResetError(
//           "This password reset link has expired. Please request a new password reset link."
//         );
//       } else {
//         setResetError(
//           err.message || "Password reset failed. Please try again."
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const handleCloseResetError = () => {
//     setResetError("");
//   };

//   const validationResult = validatePassword(password);

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     const currentValidation = validatePassword(newPassword);
//     setValidationCriteria({
//       // Update criteria state on password change
//       hasLetter: currentValidation.hasLetter,
//       hasNumber: currentValidation.hasNumber,
//       hasMinLength: currentValidation.hasMinLength,
//     });
//     if (newPassword === "") {
//       setPasswordError(["New Password is required."]);
//     } else {
//       setPasswordError(currentValidation.errors);
//     }
//   };

//   useEffect(() => {
//     if (confirmPassword) {
//       setConfirmPasswordError("");
//     }
//   }, [confirmPassword]);

//   const shouldShowCriteriaList = () => {
//     return (
//       !passwordError.length &&
//       password &&
//       !(
//         validationCriteria.hasLetter &&
//         validationCriteria.hasNumber &&
//         validationCriteria.hasMinLength
//       )
//     );
//   };

//   return (
//     <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//       <div className="w-full max-w-md mt-10">
//         <div className="bg-white">
//           <div className="py-3">
//             <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//               Set your new password
//             </h2>

//             {resetError && (
//               <div
//                 className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative"
//                 role="alert"
//               >
//                 <div className="flex bg-error justify-center rounded-full items-center size-12">
//                   <IoClose className="p-0.5 text-white size-8" />
//                 </div>

//                 <div>
//                   <span className="text-gray block max-w-60">{resetError}</span>
//                 </div>
//                 <button
//                   className="absolute cursor-pointer right-4 top-4"
//                   onClick={handleCloseResetError}
//                 >
//                   <IoClose
//                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                     role="button"
//                   />
//                 </button>
//               </div>
//             )}

//             {resetSuccess && (
//               <div
//                 className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
//                 role="alert"
//               >
//                 <strong className="font-bold">Success!</strong>
//                 <span className="block sm:inline"> {resetSuccess}</span>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="mt-10 space-y-5">
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="text-gray text-sm block capitalize font-medium"
//                 >
//                   New Password <span className="text-error">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${
//                       passwordError.length > 0
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={handlePasswordChange}
//                   />
//                   <button
//                     type="button"
//                     className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? (
//                       <RiEyeCloseLine className="text-secondary size-5" />
//                     ) : (
//                       <VscEye className="text-secondary size-5" />
//                     )}
//                   </button>
//                 </div>
//                 {passwordError.includes("New Password is required.") && (
//                   <p className="flex text-error text-base items-center mt-0.5">
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {passwordError[0]}
//                   </p>
//                 )}
//                 {!passwordError.includes("New Password is required.") &&
//                   passwordError.length > 0 && (
//                     <ul className="mt-2 text-error list-disc pl-5">
//                       {passwordError.map((error, index) => (
//                         <li key={index} className="flex items-center">
//                           <IoMdCloseCircle className="mr-1 text-error size-5" />
//                           {error}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 {shouldShowCriteriaList() && ( // Conditionally render criteria list
//                   <ul className="mt-2 text-gray-500 list-disc">
//                     <li className="flex items-center mb-1">
//                       {validationCriteria.hasLetter ? (
//                         <IoIosCheckmarkCircle className="mr-1 text-green-500 size-5" />
//                       ) : (
//                         <IoMdCloseCircle className="mr-1 text-error size-5" />
//                       )}
//                       Contains a letter
//                     </li>
//                     <li className="flex items-center mb-1">
//                       {validationCriteria.hasNumber ? (
//                         <IoIosCheckmarkCircle className="mr-1 text-green-500 size-5" />
//                       ) : (
//                         <IoMdCloseCircle className="mr-1 text-error size-5" />
//                       )}
//                       Contains a number
//                     </li>
//                     <li className="flex items-center">
//                       {validationCriteria.hasMinLength ? (
//                         <IoIosCheckmarkCircle className="mr-1 text-green-500 size-5" />
//                       ) : (
//                         <IoMdCloseCircle className="mr-1 text-error size-5" />
//                       )}
//                       Has 9 or more characters
//                     </li>
//                   </ul>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="confirm-password"
//                   className="text-gray text-sm block capitalize font-medium"
//                 >
//                   Confirm New Password <span className="text-error">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirm-password"
//                     className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${
//                       confirmPasswordError
//                         ? "border-error border-2 !shadow-none"
//                         : "border-[#c9cbce] hover:shadow-color"
//                     }`}
//                     placeholder="••••••••"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-mdc"
//                     onClick={toggleConfirmPasswordVisibility}
//                   >
//                     {showConfirmPassword ? (
//                       <RiEyeCloseLine className="text-secondary size-5" />
//                     ) : (
//                       <VscEye className="text-secondary size-5" />
//                     )}
//                   </button>
//                 </div>
//                 {confirmPasswordError && (
//                   <p className="flex text-error items-center mt-0.5">
//                     <span className="mr-1">
//                       <IoMdCloseCircle className="size-5" />
//                     </span>
//                     {confirmPasswordError}
//                   </p>
//                 )}
//                 {confirmPasswordError === "" &&
//                   confirmPassword &&
//                   password !== confirmPassword && (
//                     <p className="flex text-error items-center mt-0.5">
//                       <span className="mr-1">
//                         <IoMdCloseCircle className="size-5" />
//                       </span>
//                       Passwords do not match.
//                     </p>
//                   )}
//               </div>

//               <div className="flex justify-between items-center mb-4">
//                 <button
//                   type="submit"
//                   className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                     ${
//                                       isSubmitting
//                                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                         : "bg-primary hover:bg-primary-hover text-secondary"
//                                     }
//                                 `}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex justify-center items-center">
//                       <svg
//                         className="h-5 text-green w-5 animate-spin mr-3"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Resetting...
//                     </div>
//                   ) : (
//                     "Reset password"
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="text-center mt-6">
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Go back to
//                 <Link
//                   href="/auth/login"
//                   className="text-secondary font-medium hover:underline dark:text-primary-500"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewPasswordPage;

"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import authService from "../../../services/auth";
import {
  IoMdCloseCircle,
  IoIosCheckmarkCircle,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { VscEye } from "react-icons/vsc";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { FiX } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";

// Interface definition removed as it's not used for props in this client component.

const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Store only the primary password error message (like "required")
  const [passwordRequiredError, setPasswordRequiredError] = useState<
    string | null
  >(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams(); // Get params object
  // Safely access token, handle potential array or undefined
  const tokenFromParams = params?.token;
  const token =
    typeof tokenFromParams === "string" ? tokenFromParams : undefined;

  const [validationCriteria, setValidationCriteria] = useState({
    hasLetter: false,
    hasNumber: false,
    hasMinLength: false,
  });

  useEffect(() => {
    if (!token) {
      setResetError("Invalid reset link or token missing.");
    }
  }, [token]);

  // Function to check if all validation criteria are met
  const areAllCriteriaMet = (criteria: typeof validationCriteria) => {
    return criteria.hasLetter && criteria.hasNumber && criteria.hasMinLength;
  };

  const validatePassword = (pw: string) => {
    let hasLetter = false;
    let hasNumber = false;
    let hasMinLength = false;

    if (!pw) {
      return {
        hasLetter: false,
        hasNumber: false,
        hasMinLength: false,
      };
    }

    if (pw.length >= 9) {
      hasMinLength = true;
    }
    if (/[a-zA-Z]/.test(pw)) {
      hasLetter = true;
    }
    if (/\d/.test(pw)) {
      hasNumber = true;
    }

    return { hasLetter, hasNumber, hasMinLength };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordRequiredError(null);
    setConfirmPasswordError("");
    setResetError("");
    setResetSuccess("");
    setIsSubmitting(true);

    let formIsValid = true;
    const currentCriteriaMet = areAllCriteriaMet(validationCriteria);

    if (!password) {
      setPasswordRequiredError("New Password is required.");
      formIsValid = false;
    } else if (!currentCriteriaMet) {
      formIsValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm New Password is required.");
      formIsValid = false;
    } else if (password && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      formIsValid = false;
    }

    if (!formIsValid || !token) {
      if (!token && !resetError) {
        setResetError("Invalid reset link or token missing.");
      }
      setIsSubmitting(false);
      return;
    }

    try {
      await authService.resetPassword({ token, password });
      setResetSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/login?resetSuccess=true"); // Changed query param for clarity
      }, 1500);
    } catch (err: unknown) {
      let errorMessage = "Password reset failed. Please try again.";
      if (err instanceof Error) {
        if (err.message.includes("Invalid or expired")) {
          errorMessage =
            "This password reset link is invalid or has expired. Please request a new password reset link.";
        } else if (err.message) {
          errorMessage = err.message;
        }
      }
      setResetError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseResetError = () => {
    setResetError("");
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const currentValidation = validatePassword(newPassword);
    setValidationCriteria(currentValidation);

    if (newPassword === "") {
      setPasswordRequiredError("New Password is required.");
    } else {
      setPasswordRequiredError(null);
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else if (confirmPassword && newPassword === confirmPassword) {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (!newConfirmPassword && !passwordRequiredError) {
      setConfirmPasswordError("");
    } else if (password && newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Determines if the criteria list should be shown
  const shouldShowCriteriaList = () => {
    return (
      password &&
      !passwordRequiredError &&
      !areAllCriteriaMet(validationCriteria)
    );
  };

  // Determine if the password input itself is invalid (for styling/aria)
  const isPasswordInputInvalid =
    !!passwordRequiredError || shouldShowCriteriaList();
  // Determine if the confirm password input is invalid
  const isConfirmPasswordInputInvalid = !!confirmPasswordError;

  // Determine if the submit button should be disabled
  const isSubmitDisabled =
    isSubmitting ||
    !token ||
    !!passwordRequiredError ||
    (password && !areAllCriteriaMet(validationCriteria)) ||
    !confirmPassword || // Disable if confirm password empty
    !!confirmPasswordError;

  // Framer Motion variants for animation
  // const errorVariants = {
  //   initial: { opacity: 0, y: -20 },
  //   animate: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.4, ease: "easeOut" },
  //   },
  //   exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  // };

  const errorVariants = {
    initial: {
      opacity: 0.5,
      y: 10, // Start slightly below to gently rise up
      scale: 0.95, // Start slightly smaller to subtly scale up
      rotate: "2deg", // A very slight initial rotation for a soft lean-in
    },
    animate: {
      opacity: 1,
      y: 0, // Move to its natural position
      scale: 1, // Scale to its normal size
      rotate: "0deg", // Rotate to straight position
      transition: {
        duration: 0.3, // Slightly longer duration for a smoother feel
        ease: "easeInOut", // Smooth start and end
        type: "spring", // Use spring for a gentle, bouncy settle
        stiffness: 95, // Adjust stiffness for desired bounce
        damping: 10, // Adjust damping to control oscillation
      },
    },
    exit: {
      opacity: 0,
      y: 10, // Move down slightly as it fades out
      scale: 0.95, // Scale down slightly as it fades out
      rotate: "-2deg", // Rotate slightly in the opposite direction for exit
      transition: {
        duration: 0.2, // Slightly faster exit
        ease: "easeIn", // Ease in for a smooth fade out
      },
    },
  };

  
  return (
    // --- Original Layout Structure ---
    <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
      <div className="w-full max-w-md mt-10">
        {/* --- Original bg-white Wrapper --- */}
        <div className="bg-white  dark:bg-background">
          {/* --- Original py-3 Wrapper --- */}
          <div className="py-3">
            <h2 className="lg:text-3xl text-2xl text-center text-mainheading  dark:text-white font-semibold mb-4">
              Set your new password
            </h2>

            {/* Reset Error Display (Original Styling) */}
            <AnimatePresence>
              {resetError && (
                <motion.div
                  className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative" // Original padding/gap
                  role="alert"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={errorVariants}
                >
                  <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
                    <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
                  </div>

                  <div>
                    <span className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">
                      {resetError}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reset Success Display (Original Styling) */}
            <AnimatePresence>
              {resetSuccess && (
                <motion.div
                  className="flex bg-lightgray dark:bg-secondary p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
                  role="alert"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={errorVariants}
                >
                  {/* Adjusted background/padding */}
                  <div className="flex bg-primary/20 justify-center rounded-full items-center size-12 shrink-0">
                    <FaCheck className="p-0.5 text-mainheading dark:text-primary size-8" />
                  </div>

                  <div className="flex-grow space-y-0.5">
                    <span className="text-mainheading dark:text-primary block font-medium">
                      Password Reset Successful!
                    </span>

                    {/* Improved text */}
                    <span className="text-gray-500 dark:text-gray-300 block text-sm">
                      Redirecting to login...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form (Conditionally rendered based on token) */}
            {token ? (
              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                {/* New Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
                  >
                    New Password <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      // --- Original Input Classes + Dynamic Error Class ---
                      className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg focus:outline-none transition-shadow ease-in-out duration-300 ${
                        isPasswordInputInvalid
                          ? "border-red-700 border-2 !shadow-none" // Keep error state visual
                          : "dark:hover:shadow-whitecolor hover:shadow-darkcolor" // Original normal/hover
                      }`}
                      placeholder="••••••••" // --- Original Placeholder ---
                      value={password}
                      onChange={handlePasswordChange}
                      aria-describedby={
                        shouldShowCriteriaList()
                          ? "password-criteria"
                          : passwordRequiredError
                          ? "password-required-error"
                          : undefined
                      }
                      // --- Fixed aria-invalid ---
                      aria-invalid={isPasswordInputInvalid ? "true" : undefined}
                    />
                    <button
                      type="button"
                      // --- Original Button Classes ---
                      className="text-gray-500 dark:text-gray-300 cursor-pointer -translate-y-1/2 absolute focus:outline-none right-1 top-1/2 transform dark:bg-background bg-white p-3 rounded-md"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {/* --- Original Icon Size --- */}
                      {showPassword ? (
                        <RiEyeCloseLine className="text-secondary dark:text-white size-5" />
                      ) : (
                        <VscEye className="text-secondary dark:text-white size-5" />
                      )}
                    </button>
                  </div>
                  {/* Password Required Error (Original Styling) */}
                  {passwordRequiredError && (
                    <p
                      id="password-required-error"
                      className="flex text-red-700 items-center mt-1"
                    >
                      {/* Original size/margin */}
                      <IoMdCloseCircle className="size-4 mr-1" />
                      {/* Original size */}
                      {passwordRequiredError}
                    </p>
                  )}
                  {/* Password Criteria List (Original Styling) */}
                  {shouldShowCriteriaList() && (
                    <ul
                      id="password-criteria"
                      className="mt-2 space-y-1.5 list-none pl-0"
                    >
                      {/* Original size/spacing */}
                      <li
                        className={`flex items-center ${
                          validationCriteria.hasMinLength
                            ? "text-green-500"
                            : "text-red-700"
                        }`}
                      >
                        {validationCriteria.hasMinLength ? (
                          <IoIosCheckmarkCircle className="mr-1 size-5" /> // Original size
                        ) : (
                          <IoMdCloseCircle className="mr-1 size-5" /> // Original size
                        )}
                        Has 9 or more characters
                      </li>
                      <li
                        className={`flex items-center ${
                          validationCriteria.hasLetter
                            ? "text-green-500"
                            : "text-red-700"
                        }`}
                      >
                        {validationCriteria.hasLetter ? (
                          <IoIosCheckmarkCircle className="mr-1 size-5" /> // Original size
                        ) : (
                          <IoMdCloseCircle className="mr-1 size-5" /> // Original size
                        )}
                        Contains a letter
                      </li>
                      <li
                        className={`flex items-center ${
                          validationCriteria.hasNumber
                            ? "text-green-500"
                            : "text-red-700"
                        }`}
                      >
                        {validationCriteria.hasNumber ? (
                          <IoIosCheckmarkCircle className="mr-1 size-5" /> // Original size
                        ) : (
                          <IoMdCloseCircle className="mr-1 size-5" /> // Original size
                        )}
                        Contains a number
                      </li>
                    </ul>
                  )}
                </div>

                {/* Confirm New Password Field */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="text-gray-500  dark:text-gray-300 block capitalize font-medium"
                  >
                    Confirm New Password <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      // --- Original Input Classes + Dynamic Error Class ---
                      className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg focus:outline-none transition-shadow ease-in-out duration-300 ${
                        isConfirmPasswordInputInvalid
                          ? "border-red-700 border-2 !shadow-none" // Keep error state visual
                          : "dark:hover:shadow-whitecolor hover:shadow-darkcolor" // Original normal/hover
                      }`}
                      placeholder="••••••••" // --- Original Placeholder ---
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      // --- Fixed aria-invalid ---
                      aria-invalid={
                        isConfirmPasswordInputInvalid ? "true" : undefined
                      }
                      aria-describedby={
                        confirmPasswordError
                          ? "confirm-password-error"
                          : undefined
                      }
                    />
                    <button
                      type="button"
                      // --- Original Button Classes ---
                      className="text-gray-500 dark:text-gray-300 cursor-pointer -translate-y-1/2 absolute focus:outline-none right-1 top-1/2 transform dark:bg-background bg-white p-3 rounded-md" // Restored original rounded-md
                      onClick={toggleConfirmPasswordVisibility}
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {/* --- Original Icon Size --- */}
                      {showConfirmPassword ? (
                        <RiEyeCloseLine className="text-secondary dark:text-white size-5" />
                      ) : (
                        <VscEye className="text-secondary dark:text-white size-5" />
                      )}
                    </button>
                  </div>
                  {/* Confirm Password Error (Original Styling) */}
                  {confirmPasswordError && (
                    <p
                      id="confirm-password-error"
                      className="flex text-red-700 items-center mt-1"
                    >
                      {/* Original size/margin */}
                      <IoMdCloseCircle className="size-5 mr-1" />
                      {/* Original size */}
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    // --- Original Button Classes + Dynamic Disabled State ---
                    className={`rounded-full text-lg w-full h-14 cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 transition-colors ${
                      isSubmitDisabled
                        ? "bg-lightgray dark:bg-background border text-mainheading dark:text-white cursor-not-allowed" // Original disabled style
                        : "bg-primary hover:bg-primaryhover font-medium text-secondary" // Original enabled style
                    }`}
                    disabled={isSubmitDisabled} // Use combined disabled logic
                  >
                    {isSubmitting ? (
                      <div className="flex justify-center items-center">
                        <svg
                          // --- Original Spinner Style ---
                          className="h-5 w-5 animate-spin mr-3 text-gray-500 dark:text-mainheading"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg" // Added xmlns
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Resetting...
                      </div>
                    ) : (
                      "Reset password"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // Show message if token is missing and not already showing success
              !resetSuccess && (
                <div className="mt-8 text-center">
                  {/* Error message (resetError) is displayed above */}
                  <p className="font-medium text-gray-500  dark:text-gray-300">
                    Please request a new password reset link.
                  </p>
                </div>
              )
            )}

            {/* Back to Login Link (Original Structure/Styling) */}
            {!resetSuccess && (
              <div className="text-center mt-6">
                <p className="text-gray-500 dark:text-gray-300">
                  {/* Kept dark mode class if it was there */}
                  Go back to&nbsp;
                  <Link
                    href="/auth/login"
                    className="text-primary font-medium underline underline-offset-4" // Kept dark mode class
                  >
                    Login
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
