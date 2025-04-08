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
//       if (/\d/.test(pw)) {
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
//                 Go back to{" "}
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

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import authService from "../../../services/auth";
import { IoMdCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
import { VscEye } from "react-icons/vsc";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

// Interface definition remains useful for understanding page structure,
// even if not used directly as props in this client component.
interface ResetPasswordPageProps {
  params: { token: string };
}

// Remove the unused 'params' prop from the component signature.
// The token is obtained via the `useParams` hook.
const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { token: tokenFromParams } = useParams(); // Correctly gets token via hook
  const [validationCriteria, setValidationCriteria] = useState({
    hasLetter: false,
    hasNumber: false,
    hasMinLength: false,
  });

  const token = tokenFromParams as string; // Type assertion is fine here as useParams can return string | string[]

  useEffect(() => {
    if (!token) {
      // This might happen if the route param isn't captured correctly, though usually Next.js handles this.
      setResetError("Invalid reset link or token missing.");
    }
  }, [token]);

  const validatePassword = (pw: string) => {
    const errors: string[] = []; // Keep errors array for potential future detailed messages
    let hasLetter = false;
    let hasNumber = false;
    let hasMinLength = false;

    if (!pw) {
      // Return initial state if password is empty
      return {
        errors: [],
        hasLetter: false,
        hasNumber: false,
        hasMinLength: false,
      };
    }

    // Check criteria
    if (pw.length >= 9) {
      hasMinLength = true;
    }
    if (/[a-zA-Z]/.test(pw)) {
      hasLetter = true;
    }
    if (/\d/.test(pw)) {
      hasNumber = true;
    }

    // Populate errors array if needed (though currently just using boolean criteria state)
    // Example: if (!hasMinLength) errors.push("Password must be at least 9 characters.");
    // Example: if (!hasLetter) errors.push("Password must contain a letter.");
    // Example: if (!hasNumber) errors.push("Password must contain a number.");

    return { errors, hasLetter, hasNumber, hasMinLength };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError([]); // Reset errors
    setConfirmPasswordError("");
    setResetError("");
    setResetSuccess("");
    setIsSubmitting(true); // Set submitting early

    let formIsValid = true;
    const currentValidation = validatePassword(password); // Validate the current password

    // Check required fields first
    if (!password) {
      setPasswordError(["New Password is required."]);
      formIsValid = false;
    } else if (
      !currentValidation.hasLetter ||
      !currentValidation.hasNumber ||
      !currentValidation.hasMinLength
    ) {
      // Password exists but doesn't meet criteria (UI already shows this, but double-check)
      // No need to set passwordError here as the criteria list handles the feedback
      formIsValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm New Password is required.");
      formIsValid = false;
    } else if (password && password !== confirmPassword) {
      // Check match only if both fields are potentially valid
      setConfirmPasswordError("Passwords do not match.");
      formIsValid = false;
    }

    if (!formIsValid) {
      setIsSubmitting(false); // Stop submission if form is invalid
      return;
    }

    // If form is valid, proceed with API call
    try {
      await authService.resetPassword({ token, password });
      setResetSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/login?forgotPasswordSuccess=true");
      }, 2000);
    } catch (err: unknown) { // Use 'unknown' instead of 'any' for type safety
      let errorMessage = "Password reset failed. Please try again."; // Default error
      if (err instanceof Error) { // Type check: ensure err is an Error object
        if (err.message === "Invalid or expired password reset token.") {
          errorMessage = "This password reset link has expired. Please request a new password reset link.";
        } else if (err.message) {
            errorMessage = err.message; // Use message from Error object
        }
      }
      // Handle cases where err might not be an Error object (less common)
      // else if (typeof err === 'string') { errorMessage = err; }

      setResetError(errorMessage);
    } finally {
      setIsSubmitting(false); // Ensure submitting state is reset
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

  // Removed the unused 'validationResult' variable declaration here.
  // The necessary validation happens within handlePasswordChange and handleSubmit.

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const currentValidation = validatePassword(newPassword);
    setValidationCriteria({ // Update criteria state on password change
      hasLetter: currentValidation.hasLetter,
      hasNumber: currentValidation.hasNumber,
      hasMinLength: currentValidation.hasMinLength,
    });

    // Update error state based on input presence
    if (newPassword === "") {
      setPasswordError(["New Password is required."]);
    } else {
      setPasswordError([]); // Clear the "required" error if user starts typing
      // Note: We don't set specific criteria errors here anymore,
      // as the criteria list handles showing unmet requirements.
    }

     // Also clear confirm password mismatch error if password changes
     if (confirmPassword && newPassword !== confirmPassword) {
        // Optional: If you want immediate feedback on mismatch while typing password
        // setConfirmPasswordError("Passwords do not match.");
     } else if (confirmPassword && newPassword === confirmPassword) {
         setConfirmPasswordError(""); // Clear mismatch if they now match
     }
  };

   // Effect to clear confirm password *specific* errors when confirm password changes
   useEffect(() => {
    if (confirmPassword && password && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else if (confirmPassword === "" && !password) {
         // If both are empty, clear errors potentially set by submit
         setConfirmPasswordError("");
    } else {
        // Clear error if they match or if confirm is empty (but password might exist)
        setConfirmPasswordError("");
    }
  }, [confirmPassword, password]);


  // Determines if the criteria list should be shown
  const shouldShowCriteriaList = () => {
    // Show if password has content but doesn't meet all criteria,
    // AND there isn't a "password required" error already showing.
    return (
      password &&
      !passwordError.includes("New Password is required.") &&
      !(
        validationCriteria.hasLetter &&
        validationCriteria.hasNumber &&
        validationCriteria.hasMinLength
      )
    );
  };

  return (
    <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
      <div className="w-full max-w-md mt-10">
        <div className="bg-white">
          <div className="py-3">
            <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
              Set your new password
            </h2>

            {/* Reset Error Display */}
            {resetError && (
              <div
                className="flex bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg gap-4 items-center relative mb-4" // Adjusted styling for clarity
                role="alert"
              >
                <div className="flex bg-error justify-center rounded-full items-center size-8 flex-shrink-0"> {/* Adjusted size */}
                  <IoClose className="text-white size-6" /> {/* Adjusted size */}
                </div>
                <div className="flex-grow"> {/* Allow text to take space */}
                  <span className="block text-sm">{resetError}</span> {/* Adjusted text size */}
                </div>
                <button
                  className="absolute cursor-pointer right-2 top-2 p-1" // Adjusted position/padding
                  onClick={handleCloseResetError}
                  aria-label="Close error message" // Added aria-label
                >
                  <IoClose
                    className="text-red-700 hover:text-red-900 size-6" // Adjusted size/color
                    role="button"
                  />
                </button>
              </div>
            )}

            {/* Reset Success Display */}
            {resetSuccess && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {resetSuccess}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="text-gray text-sm block capitalize font-medium"
                >
                  New Password <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${
                      // Show error border if "required" error exists OR if criteria list is shown (meaning it's invalid)
                      passwordError.includes("New Password is required.") || shouldShowCriteriaList()
                        ? "border-error border-2 !shadow-none"
                        : "border-[#c9cbce] hover:shadow-color"
                    }`}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    aria-describedby={shouldShowCriteriaList() ? "password-criteria" : undefined} // Link input to criteria list for accessibility
                    aria-invalid={passwordError.includes("New Password is required.") || shouldShowCriteriaList()} // Indicate invalid state
                  />
                  <button
                    type="button"
                    className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
                  >
                    {showPassword ? (
                      <RiEyeCloseLine className="text-secondary size-5" />
                    ) : (
                      <VscEye className="text-secondary size-5" />
                    )}
                  </button>
                </div>
                {/* Password Required Error */}
                {passwordError.includes("New Password is required.") && (
                  <p className="flex text-error text-sm items-center mt-1"> {/* Adjusted size/margin */}
                    <IoMdCloseCircle className="size-4 mr-1" /> {/* Adjusted size */}
                    {passwordError[0]}
                  </p>
                )}
                {/* Password Criteria List */}
                {shouldShowCriteriaList() && (
                  <ul id="password-criteria" className="mt-2 text-sm space-y-1 list-none pl-0"> {/* Adjusted size/spacing */}
                    <li className={`flex items-center ${validationCriteria.hasLetter ? 'text-green-600' : 'text-error'}`}>
                      {validationCriteria.hasLetter ? (
                        <IoIosCheckmarkCircle className="mr-1 size-4" />
                      ) : (
                        <IoMdCloseCircle className="mr-1 size-4" />
                      )}
                      Contains a letter
                    </li>
                    <li className={`flex items-center ${validationCriteria.hasNumber ? 'text-green-600' : 'text-error'}`}>
                      {validationCriteria.hasNumber ? (
                        <IoIosCheckmarkCircle className="mr-1 size-4" />
                      ) : (
                        <IoMdCloseCircle className="mr-1 size-4" />
                      )}
                      Contains a number
                    </li>
                    <li className={`flex items-center ${validationCriteria.hasMinLength ? 'text-green-600' : 'text-error'}`}>
                      {validationCriteria.hasMinLength ? (
                        <IoIosCheckmarkCircle className="mr-1 size-4" />
                      ) : (
                        <IoMdCloseCircle className="mr-1 size-4" />
                      )}
                      Has 9 or more characters
                    </li>
                  </ul>
                )}
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="text-gray text-sm block capitalize font-medium"
                >
                  Confirm New Password <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${
                      confirmPasswordError
                        ? "border-error border-2 !shadow-none"
                        : "border-[#c9cbce] hover:shadow-color"
                    }`}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                     aria-invalid={!!confirmPasswordError} // Indicate invalid state
                     aria-describedby={confirmPasswordError ? "confirm-password-error" : undefined}
                  />
                  <button
                    type="button"
                    className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md" // Fixed typo rounded-mdc -> rounded-md
                    onClick={toggleConfirmPasswordVisibility}
                     aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} // Accessibility
                  >
                    {showConfirmPassword ? (
                      <RiEyeCloseLine className="text-secondary size-5" />
                    ) : (
                      <VscEye className="text-secondary size-5" />
                    )}
                  </button>
                </div>
                {/* Confirm Password Error */}
                {confirmPasswordError && (
                  <p id="confirm-password-error" className="flex text-error text-sm items-center mt-1"> {/* Adjusted size/margin */}
                    <IoMdCloseCircle className="size-4 mr-1" /> {/* Adjusted size */}
                    {confirmPasswordError}
                  </p>
                )}
                {/* This redundant check is handled by the useEffect now */}
                {/* {confirmPasswordError === "" &&
                  confirmPassword &&
                  password !== confirmPassword && (
                    <p className="flex text-error items-center mt-0.5">
                      <span className="mr-1">
                        <IoMdCloseCircle className="size-5" />
                      </span>
                      Passwords do not match.
                    </p>
                  )} */}
              </div>

              {/* Submit Button */}
              <div className="pt-2"> {/* Added padding-top for spacing */}
                <button
                  type="submit"
                  className={`rounded-full text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 transition-colors ${ // Adjusted padding
                    // Disable button if submitting OR if password is required OR if criteria not met OR if passwords don't match and confirm pass exists
                     isSubmitting || passwordError.includes("New Password is required.") || shouldShowCriteriaList() || confirmPasswordError
                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                       : "bg-primary hover:bg-primary-hover text-secondary"
                   }`}
                  disabled={isSubmitting || passwordError.includes("New Password is required.") || shouldShowCriteriaList() || !!confirmPasswordError}
                >
                  {isSubmitting ? (
                    <div className="flex justify-center items-center">
                      <svg
                        className="h-5 w-5 animate-spin mr-3 text-gray-500" // Adjusted color
                        viewBox="0 0 24 24"
                        fill="none" // Added fill none for spinner outline
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

            {/* Back to Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Go back to{" "}
                <Link
                  href="/auth/login"
                  className="text-secondary font-medium hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;