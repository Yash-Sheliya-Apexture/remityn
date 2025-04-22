// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { IoClose } from 'react-icons/io5';
// import { AiOutlineInfo } from "react-icons/ai";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     // --- START OF FIX ---
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState(''); // State for session expired message
//     // --- END OF FIX ---
//     const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');

//     // Check for query params from URL
//     useEffect(() => {
//         const urlParams = typeof window !== 'undefined'
//             ? new URLSearchParams(window.location.search)
//             : searchParams;

//         const autoLogout = urlParams.get('autoLogout');
//         // --- START OF FIX ---
//         const sessionExpired = urlParams.get('sessionExpired'); // Check for sessionExpired param
//         // --- END OF FIX ---

//         // --- START OF FIX ---
//         // Set the appropriate message and clear others
//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage(''); // Clear other message
//             // Optional: remove the query param from URL without reload (more complex)
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage(''); // Clear other message
//             // Optional: remove the query param
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         } else {
//             // Clear messages if neither param is present
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }
//         // --- END OF FIX ---

//     }, [searchParams]); // Re-run if searchParams change

//     useEffect(() => {
//         if (!loading && user) {
//             const timeoutId = setTimeout(() => {
//                 // Redirect to dashboard or intended page after successful login
//                 const redirectUrl = searchParams.get('redirect') || '/dashboard';
//                 console.log("User logged in, redirecting to:", redirectUrl);
//                 router.push(redirectUrl);
//             }, 500); // Short delay after login confirmation

//             return () => clearTimeout(timeoutId);
//         }
//     }, [user, loading, router, searchParams]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         // --- START OF FIX ---
//         // Clear notification messages on new attempt
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         // --- END OF FIX ---
//         setForgotPasswordSuccess('');

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             login(loggedInUser, token);
//             // Redirect is handled by the useEffect watching the `user` state
//         } catch (err) {
//             console.error("Login error in component:", err);
//             // More specific error handling based on backend response if available
//             if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
//                 setLoginError('Sorry, that email or password didn\'t work.');
//             } else {
//                 setLoginError(err.message || 'An unexpected error occurred during login.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseInactiveLogoutMessage = () => {
//         setInactiveLogoutMessage('');
//     };

//     // --- START OF FIX ---
//     const handleCloseSessionExpiredMessage = () => {
//         setSessionExpiredMessage(''); // Function to close the session expired message
//     };
//     // --- END OF FIX ---

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleCloseLoginError = () => {
//         setLoginError("");
//     };

//     const handleForgotPasswordSuccessDismiss = () => {
//         setForgotPasswordSuccess('');
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white">
//                     {/* Inactive logout message */}
//                     {inactiveLogoutMessage && (

//                         <div className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-gray justify-center rounded-full items-center lg:size-12 size-10">
//                                 <AiOutlineInfo className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray text-sm lg:text-base block max-w-60">{inactiveLogoutMessage}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-4"
//                                 onClick={handleCloseInactiveLogoutMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full text-gray fill-current hover:bg-green/8 size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     {/* Forgot Password Success Message (if redirected from forgot password flow) */}
//                     {forgotPasswordSuccess && (
//                         <div className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-green justify-center rounded-full items-center size-12">
//                                 <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray block max-w-60">{forgotPasswordSuccess}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-4 top-4"
//                                 onClick={handleForgotPasswordSuccessDismiss}
//                             >
//                                 <IoClose
//                                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-base text-center text-gray font-light mb-4">
//                             New to Wise?{" "}
//                             <Link
//                                 href="/auth/register"
//                                 className="text-secondary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         {loginError && (
//                             <div
//                                 className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative"
//                                 role="alert"
//                             >
//                                 <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
//                                     <IoClose className="p-0.5 text-white size-8" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray block max-w-60">{loginError}</span>
//                                 </div>

//                                 <button
//                                     className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
//                                     onClick={handleCloseLoginError}
//                                 >
//                                     <IoClose
//                                         className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                         role="button"
//                                     />
//                                 </button>
//                             </div>
//                         )}

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <a className="flex bg-white border border-gray justify-center rounded-lg text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </a>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray text-sm block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${emailError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-error text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray text-sm block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${passwordError
//                                             ? "border-error border-2 !shadow-none"
//                                             : "border-[#c9cbce] hover:shadow-color"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-secondary size-5" /> : <VscEye className="text-secondary size-5" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-error text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-secondary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex justify-center items-center">
//                                             <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// frontend/src/pages/auth/login/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { IoClose } from 'react-icons/io5';
// import { AiOutlineInfo } from "react-icons/ai";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { FiX } from 'react-icons/fi';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     // --- START OF FIX ---
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState(''); // State for session expired message
//     // --- END OF FIX ---
//     const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');

//     // Check for query params from URL
//     useEffect(() => {
//         const urlParams = typeof window !== 'undefined'
//             ? new URLSearchParams(window.location.search)
//             : searchParams;

//         const autoLogout = urlParams.get('autoLogout');
//         // --- START OF FIX ---
//         const sessionExpired = urlParams.get('sessionExpired'); // Check for sessionExpired param
//         // --- END OF FIX ---

//         // --- START OF FIX ---
//         // Set the appropriate message and clear others
//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage(''); // Clear other message
//             // Optional: remove the query param from URL without reload (more complex)
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage(''); // Clear other message
//             // Optional: remove the query param
//             // window.history.replaceState({}, document.title, window.location.pathname);
//         } else {
//             // Clear messages if neither param is present
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }
//         // --- END OF FIX ---

//     }, [searchParams]); // Re-run if searchParams change

//     useEffect(() => {
//         if (!loading && user) {
//             const timeoutId = setTimeout(() => {
//                 // Redirect to dashboard or intended page after successful login
//                 let redirectUrl = '/dashboard'; // Default for normal users
//                 if (user.role === 'admin') {
//                     redirectUrl = '/admin'; // Redirect for admins
//                 }
//                 console.log("User logged in, redirecting to:", redirectUrl);
//                 router.push(redirectUrl);
//             }, 500); // Short delay after login confirmation

//             return () => clearTimeout(timeoutId);
//         }
//     }, [user, loading, router, searchParams]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         // --- START OF FIX ---
//         // Clear notification messages on new attempt
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         // --- END OF FIX ---
//         setForgotPasswordSuccess('');

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             login(loggedInUser, token);
//             // Redirect is handled by the useEffect watching the `user` state
//         } catch (err) {
//             console.error("Login error in component:", err);
//             // More specific error handling based on backend response if available
//             if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
//                 setLoginError('Sorry, that email or password didn\'t work.');
//             } else {
//                 setLoginError(err.message || 'An unexpected error occurred during login.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseInactiveLogoutMessage = () => {
//         setInactiveLogoutMessage('');
//     };

//     // --- START OF FIX ---
//     const handleCloseSessionExpiredMessage = () => {
//         setSessionExpiredMessage(''); // Function to close the session expired message
//     };
//     // --- END OF FIX ---

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleCloseLoginError = () => {
//         setLoginError("");
//     };

//     const handleForgotPasswordSuccessDismiss = () => {
//         setForgotPasswordSuccess('');
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white dark:bg-background">
//                     {/* Inactive logout message */}
//                     {inactiveLogoutMessage && (

//                         <div className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-gray justify-center rounded-full items-center lg:size-12 size-10">
//                                 <AiOutlineInfo className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray text-sm lg:text-base block max-w-60">{inactiveLogoutMessage}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-4"
//                                 onClick={handleCloseInactiveLogoutMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full text-gray fill-current hover:bg-green/8 size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}
//                     {/* Session expired message */}
//                     {sessionExpiredMessage && (
//                         <div className="flex bg-red-200 border-l-4 border-red-500 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative" role="alert">
//                             <div className="flex bg-red-500 justify-center rounded-full items-center lg:size-12 size-10">
//                                 <IoClose className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <p className="font-bold">Session Expired</p>
//                                 <p className="text-sm lg:text-base block max-w-60">{sessionExpiredMessage}</p>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-4"
//                                 onClick={handleCloseSessionExpiredMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full text-red-500 fill-current hover:bg-red-200 size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     {/* Forgot Password Success Message (if redirected from forgot password flow) */}
//                     {forgotPasswordSuccess && (
//                         <div className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-green justify-center rounded-full items-center size-12">
//                                 <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray block max-w-60">{forgotPasswordSuccess}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-4 top-4"
//                                 onClick={handleForgotPasswordSuccessDismiss}
//                             >
//                                 <IoClose
//                                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-center text-gray-500 dark:text-gray-300 font-light mb-4">
//                             New to Wise?{" "}
//                             <Link
//                                 href="/auth/register"
//                                 className="text-primary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         {loginError && (
//                             <div
//                                 className="bg-lightgray dark:bg-red-600/20 border rounded-xl p-4 flex items-center gap-4 relative"
//                                 role="alert"
//                             >
//                                 <div className="p-1 bg-red-700 rounded-full">
//                                     <FiX size={24} className="text-lightgray" />
//                                 </div>

//                                 <div>
//                                     <span className="text-gray-500 dark:text-white  block max-w-60">{loginError}</span>
//                                 </div>
//                             </div>
//                         )}

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <a className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3">
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </a>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${emailError
//                                         ? "border-error border-2 !shadow-none"
//                                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-error text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${passwordError
//                                             ? "border-error border-2 !shahdow-none"
//                                             : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> : <VscEye className="text-mainheading size-5 dark:text-white" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-error text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-mainheading dark:text-primary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed' : 'bg-primary hover:bg-primaryhover text-mainheading'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex gap-4 justify-center items-center">
//                                             <svg className="size-5 text-mainheading font-medium animate-spin" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { IoClose } from 'react-icons/io5';
// import { AiOutlineInfo } from "react-icons/ai";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { FiX } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
//     const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
//     const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);

//     useEffect(() => {
//         const urlParams = typeof window !== 'undefined'
//             ? new URLSearchParams(window.location.search)
//             : searchParams;

//         const autoLogout = urlParams.get('autoLogout');
//         const sessionExpired = urlParams.get('sessionExpired');

//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage('');
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage('');
//         } else {
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }

//     }, [searchParams]);

//     useEffect(() => {
//         if (!loading && user) {
//             const timeoutId = setTimeout(() => {
//                 let redirectUrl = '/dashboard';
//                 if (user.role === 'admin') {
//                     redirectUrl = '/admin';
//                 }
//                 console.log("User logged in, redirecting to:", redirectUrl);
//                 router.push(redirectUrl);
//             }, 500);

//             return () => clearTimeout(timeoutId);
//         }
//     }, [user, loading, router, searchParams]);

//     useEffect(() => {
//         if (loginError) {
//             setIsLoginErrorVisible(true);
//         } else {
//             setIsLoginErrorVisible(false);
//         }
//     }, [loginError]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         setIsLoginErrorVisible(false); // Ensure error is hidden before new submission
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         setForgotPasswordSuccess('');

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             login(loggedInUser, token);
//         } catch (err) {
//             console.error("Login error in component:", err);
//             if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
//                 setLoginError('Invalid email address and password combination.');
//             } else {
//                 setLoginError('Sorry, that email or password didn\'t work.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseInactiveLogoutMessage = () => {
//         setInactiveLogoutMessage('');
//     };

//     const handleCloseSessionExpiredMessage = () => {
//         setSessionExpiredMessage('');
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleCloseLoginError = () => {
//         setLoginError("");
//         setIsLoginErrorVisible(false); // Hide error message when close button is clicked
//     };

//     const handleForgotPasswordSuccessDismiss = () => {
//         setForgotPasswordSuccess('');
//     };

//     // Framer Motion variants for animation
//     const errorVariants = {
//         initial: { opacity: 0, y: -20, },
//         animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
//         exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white dark:bg-background">

//                     {inactiveLogoutMessage && (
//                         <div className="flex bg-lightgray dark:bg-white/5 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex dark:bg-white bg-black/80  justify-center rounded-full items-center lg:size-12 size-10">
//                                 <AiOutlineInfo className="p-0.5 dark:text-mainheading text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray-500 dark:text-gray-300 text-sm lg:text-base block max-w-70">{inactiveLogoutMessage}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-3"
//                                 onClick={handleCloseInactiveLogoutMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full dark:text-white text-mainheading fill-current hover:bg-lightborder dark:hover:bg-primarybox size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     {sessionExpiredMessage && (
//                         <div className="flex bg-red-200 border-l-4 border-red-700 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative" role="alert">
//                             <div className="flex bg-red-500 justify-center rounded-full items-center lg:size-12 size-10">
//                                 <IoClose className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <p className="font-bold">Session Expired</p>
//                                 <p className="text-sm lg:text-base block max-w-60">{sessionExpiredMessage}</p>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-3 top-4"
//                                 onClick={handleCloseSessionExpiredMessage}
//                             >
//                                 <IoClose
//                                     className="lg:p-1.5 p-0.5 rounded-full text-red-500 fill-current hover:bg-red-200 size-6 lg:size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     {forgotPasswordSuccess && (
//                         <div className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative">
//                             <div className="flex bg-green justify-center rounded-full items-center size-12">
//                                 <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
//                             </div>
//                             <div>
//                                 <span className="text-gray block max-w-60">{forgotPasswordSuccess}</span>
//                             </div>
//                             <button
//                                 className="absolute cursor-pointer right-4 top-4"
//                                 onClick={handleForgotPasswordSuccessDismiss}
//                             >
//                                 <IoClose
//                                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-center text-gray-500 dark:text-gray-300 font-light mb-4">
//                             New to Wise?{" "}
//                             <Link
//                                 href="/auth/register"
//                                 className="text-primary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         <AnimatePresence> {/* AnimatePresence to handle exit animation */}
//                             {isLoginErrorVisible && loginError && (
//                                 <motion.div // Use motion.div for animation
//                                     className={`bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4`}
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={errorVariants}
//                                 >
//                                     <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                     </div>

//                                     <div>
//                                         <span className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{loginError}</span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <a className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3">
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </a>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${emailError
//                                         ? "border-red-700 border-2 !shadow-none"
//                                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${passwordError
//                                             ? "border-red-700 border-2 !shahdow-none"
//                                             : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> : <VscEye className="text-mainheading size-5 dark:text-white" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-mainheading dark:text-primary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed' : 'bg-primary hover:bg-primaryhover text-mainheading'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex gap-4 justify-center items-center">
//                                             <svg className="size-5 text-mainheading font-medium animate-spin" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/auth/login/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { IoClose } from 'react-icons/io5';
// import { AiOutlineInfo } from "react-icons/ai";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { FiX } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
// import { FaCheck } from 'react-icons/fa6'; // Import FaCheck icon

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
//     const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
//     const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
//     const [loginSuccess, setLoginSuccess] = useState(false); // State for login success
//     const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false); // State to control login success visibility

//     useEffect(() => {
//         const urlParams = typeof window !== 'undefined'
//             ? new URLSearchParams(window.location.search)
//             : searchParams;

//         const autoLogout = urlParams.get('autoLogout');
//         const sessionExpired = urlParams.get('sessionExpired');

//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage('');
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage('');
//         } else {
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }

//     }, [searchParams]);

//     useEffect(() => {
//         if (!loading && user) {
//             const timeoutId = setTimeout(() => {
//                 let redirectUrl = '/dashboard';
//                 if (user.role === 'admin') {
//                     redirectUrl = '/admin';
//                 }
//                 console.log("User logged in, redirecting to:", redirectUrl);
//                 router.push(redirectUrl);
//             }, 300); // delay for success message

//             return () => clearTimeout(timeoutId);
//         }
//     }, [user, loading, router, searchParams]);

//     useEffect(() => {
//         if (loginError) {
//             setIsLoginErrorVisible(true);
//             setIsLoginSuccessVisible(false); // Hide success message if error occurs
//         } else {
//             setIsLoginErrorVisible(false);
//         }
//     }, [loginError]);

//     useEffect(() => {
//         if (loginSuccess) {
//             setIsLoginSuccessVisible(true);
//             setIsLoginErrorVisible(false); // Hide error message if success occurs
//         } else {
//             setIsLoginSuccessVisible(false);
//         }
//     }, [loginSuccess]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         setIsLoginErrorVisible(false); // Ensure error is hidden before new submission
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         setForgotPasswordSuccess('');
//         setLoginSuccess(false); // Reset loginSuccess on new submission
//         setIsLoginSuccessVisible(false); // Ensure success message is hidden before new submission

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             login(loggedInUser, token);
//             setLoginSuccess(true); // Set login success state
//         } catch (err) {
//             console.error("Login error in component:", err);
//             if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
//                 setLoginError('Invalid email address and password combination.');
//             } else {
//                 setLoginError('Sorry, that email or password didn\'t work.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCloseInactiveLogoutMessage = () => {
//         setInactiveLogoutMessage('');
//     };

//     const handleCloseSessionExpiredMessage = () => {
//         setSessionExpiredMessage('');
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleCloseLoginError = () => {
//         setLoginError("");
//         setIsLoginErrorVisible(false); // Hide error message when close button is clicked
//     };

//     const handleForgotPasswordSuccessDismiss = () => {
//         setForgotPasswordSuccess('');
//     };

//     // // Framer Motion variants for animation
//     // const errorVariants = {
//     //     initial: { opacity: 0, y: -20, },
//     //     animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
//     //     exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
//     // };

//     const errorVariants = {
//         initial: {
//             opacity: 0.5,
//             y: 10,         // Start slightly below to gently rise up
//             scale: 0.95,   // Start slightly smaller to subtly scale up
//             rotate: "2deg", // A very slight initial rotation for a soft lean-in
//         },
//         animate: {
//             opacity: 1,
//             y: 0,          // Move to its natural position
//             scale: 1,      // Scale to its normal size
//             rotate: "0deg", // Rotate to straight position
//             transition: {
//                 duration: 0.3,       // Slightly longer duration for a smoother feel
//                 ease: "easeInOut",   // Smooth start and end
//                 type: "spring",      // Use spring for a gentle, bouncy settle
//                 stiffness: 95,       // Adjust stiffness for desired bounce
//                 damping: 10,        // Adjust damping to control oscillation
//             },
//         },
//         exit: {
//             opacity: 0,
//             y: 10,         // Move down slightly as it fades out
//             scale: 0.95,   // Scale down slightly as it fades out
//             rotate: "-2deg",// Rotate slightly in the opposite direction for exit
//             transition: {
//                 duration: 0.2,       // Slightly faster exit
//                 ease: "easeIn",      // Ease in for a smooth fade out
//             },
//         },
//     };

//     const successVariants = {
//         initial: { opacity: 0, y: -20 },
//         animate: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.3, ease: "easeOut" },
//         },
//         exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white dark:bg-background">

//                     {/* User Inactive-LogoutMessage */}
//                     <AnimatePresence>
//                         {inactiveLogoutMessage && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex dark:bg-yellow-600/20 bg-black/80 justify-center rounded-full items-center lg:size-12 size-10">
//                                     <AiOutlineInfo className="p-0.5 dark:text-yellow-600 text-white size-8" />
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500 dark:text-gray-300 block max-w-60 leading-relaxed">{inactiveLogoutMessage}</span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* User SessionExpiredMessage */}
//                     <AnimatePresence>
//                         {sessionExpiredMessage && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                     <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                 </div>

//                                 <div>
//                                     <p className="font-medium">Session Expired Please Try Again!</p>
//                                     <p className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{sessionExpiredMessage}</p>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* User ForgotPasswordSuccess Massage */}
//                     <AnimatePresence>
//                         {forgotPasswordSuccess && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4 "
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex bg-primary/20 justify-center rounded-full items-center size-12 shrink-0">
//                                     <FaCheck className="p-0.5 text-mainheading dark:text-primary size-8" />
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500 dark:text-gray-300 block max-w-60 leading-relaxed">{forgotPasswordSuccess}</span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-center text-gray-500 dark:text-gray-300 font-light mb-4">
//                             New to Wise?{" "}
//                             <Link
//                                 href="/auth/register"
//                                 className="text-primary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         {/* User LoginError Massage */}
//                         <AnimatePresence>
//                             {isLoginErrorVisible && loginError && (
//                                 <motion.div
//                                     className={`bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4`}
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={errorVariants}
//                                 >
//                                     <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                     </div>

//                                     <div>
//                                         <span className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{loginError}</span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {/* User Success Message Display */}
//                         <AnimatePresence>
//                             {isLoginSuccessVisible && loginSuccess && (
//                                 <motion.div
//                                     className="flex bg-lightgray dark:bg-secondary p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={successVariants}
//                                 >
//                                     {/* Adjusted background/padding */}
//                                     <div className="flex bg-primary/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FaCheck className="p-0.5 text-mainheading dark:text-primary size-8" />
//                                     </div>
//                                     <div className="flex-grow space-y-0.5">
//                                         <span className="text-mainheading dark:text-primary block font-medium">
//                                             Login successful!
//                                         </span>
//                                         {/* Improved text */}
//                                         <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                                             Redirecting to dashboard...
//                                         </span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <a className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3">
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </a>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${emailError
//                                         ? "border-red-700 border-2 !shadow-none"
//                                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${passwordError
//                                             ? "border-red-700 border-2 !shahdow-none"
//                                             : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> : <VscEye className="text-mainheading size-5 dark:text-white" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-mainheading dark:text-primary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed' : 'bg-primary hover:bg-primaryhover text-mainheading'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex gap-4 justify-center items-center">
//                                             <svg className="size-5 text-mainheading dark:text-white font-medium animate-spin" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/auth/login/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth'; // Assuming this service exists and is correctly implemented
// import { useAuth } from '../../contexts/AuthContext'; // Assuming this hook exists and is correctly implemented
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { AiOutlineInfo } from "react-icons/ai";
// import { FiX } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaCheck } from 'react-icons/fa6';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login, user, loading, isAdmin } = useAuth(); // Get user and loading state
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
//     const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
//     const [loginSuccess, setLoginSuccess] = useState(false);
//     const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

//     useEffect(() => {
//         const urlParams = new URLSearchParams(searchParams.toString());
//         const autoLogout = urlParams.get('autoLogout');
//         const sessionExpired = urlParams.get('sessionExpired');

//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage('');
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
//             setSessionExpiredMessage('');
//         } else {
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }
//     }, [searchParams]);

//     useEffect(() => {
//         // This effect handles redirection *after* the user state is updated by login()
//         if (!loading && user) {
//             console.log("Login successful, checking KYC status:", user.kycStatus);

//             let redirectUrl = '';

//             // Determine redirect based on role and KYC status
//             if (isAdmin) {
//                 redirectUrl = '/admin'; // Admins go straight to admin panel
//             } else {
//                 switch (user.kycStatus) {
//                     case 'not_started':
//                     case 'rejected':
//                     case 'skipped': // Treat skipped like not_started for initial flow
//                         redirectUrl = '/kyc/start'; // Start the KYC flow
//                         break;
//                     case 'pending':
//                         redirectUrl = '/kyc/pending'; // Go to a pending status page
//                         break;
//                     case 'verified':
//                         redirectUrl = '/dashboard'; // Go to the main dashboard
//                         break;
//                     default:
//                         redirectUrl = '/dashboard'; // Fallback to dashboard
//                 }
//             }

//             console.log("Redirecting logged-in user to:", redirectUrl);
//              // Delay redirection slightly to allow success message to show
//              const timeoutId = setTimeout(() => {
//                 router.push(redirectUrl);
//             }, 500); // Adjust delay as needed

//             return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
//         }
//     }, [user, loading, router, isAdmin]); // Depend on user, loading, router, isAdmin

//     useEffect(() => {
//         setIsLoginErrorVisible(!!loginError);
//     }, [loginError]);

//     useEffect(() => {
//         setIsLoginSuccessVisible(loginSuccess);
//     }, [loginSuccess]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         setIsLoginErrorVisible(false);
//         setInactiveLogoutMessage('');
//         setSessionExpiredMessage('');
//         setLoginSuccess(false);
//         setIsLoginSuccessVisible(false);

//         let isValid = true;
//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             // The login function updates the AuthContext state (user)
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             console.log("Login successful in component");
//             setLoginSuccess(true); // Show success message
//             login(loggedInUser, token); // This triggers the useEffect above
//             // **Remove direct redirection from here**
//         } catch (err) {
//             console.error("Login error in component:", err);
//              const message = err.message || 'Sorry, that email or password didn\'t work.';
//              if (message.toLowerCase().includes('invalid credentials')) {
//                  setLoginError('Invalid email address and password combination.');
//              } else {
//                  setLoginError(message);
//              }
//              setIsLoginErrorVisible(true);
//              setLoginSuccess(false);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const errorVariants = {
//         initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
//         animate: { opacity: 1, y: 0, scale: 1, rotate: "0deg", transition: { duration: 0.3, ease: "easeInOut", type: "spring", stiffness: 95, damping: 10 } },
//         exit: { opacity: 0, y: 10, scale: 0.95, rotate: "-2deg", transition: { duration: 0.2, ease: "easeIn" } },
//     };

//     const successVariants = {
//         initial: { opacity: 0, y: -20 },
//         animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
//         exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white dark:bg-background">

//                     {/* User Inactive-LogoutMessage */}
//                     <AnimatePresence>
//                         {inactiveLogoutMessage && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex dark:bg-yellow-600/20 bg-black/80 justify-center rounded-full items-center lg:size-12 size-10">
//                                     <AiOutlineInfo className="p-0.5 dark:text-yellow-600 text-white size-8" />
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500 dark:text-gray-300 block max-w-60 leading-relaxed">{inactiveLogoutMessage}</span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* User SessionExpiredMessage */}
//                     <AnimatePresence>
//                         {sessionExpiredMessage && (
//                             <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
//                                 role="alert"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={errorVariants}
//                             >
//                                 <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                     <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                 </div>
//                                 <div>
//                                     <p className="font-medium">Session Expired Please Try Again!</p>
//                                     <p className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{sessionExpiredMessage}</p>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
//                             Welcome back.
//                         </h2>

//                         <p className="text-center text-gray-500 dark:text-gray-300 font-light mb-4">
//                             New to Wise?{" "}
//                             <Link
//                                 href="/auth/register"
//                                 className="text-primary font-medium underline underline-offset-4"
//                             >
//                                 Sign up
//                             </Link>
//                         </p>

//                         {/* User LoginError Massage */}
//                         <AnimatePresence>
//                             {isLoginErrorVisible && loginError && (
//                                 <motion.div
//                                     className={`bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4`}
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={errorVariants}
//                                 >
//                                     <div className="flex bg-red-600/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FiX className="p-0.5 text-lightgray dark:text-red-600 size-8" />
//                                     </div>
//                                     <div>
//                                         <span className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{loginError}</span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {/* User Success Message Display */}
//                         <AnimatePresence>
//                             {isLoginSuccessVisible && loginSuccess && (
//                                 <motion.div
//                                     className="flex bg-lightgray dark:bg-secondary p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
//                                     role="alert"
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     variants={successVariants}
//                                 >
//                                     <div className="flex bg-primary/20 justify-center rounded-full items-center size-12 shrink-0">
//                                         <FaCheck className="p-0.5 text-mainheading dark:text-primary size-8" />
//                                     </div>
//                                     <div className="flex-grow space-y-0.5">
//                                         <span className="text-mainheading dark:text-primary block font-medium">
//                                             Login successful!
//                                         </span>
//                                         {/* <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                                             Redirecting to dashboard...
//                                         </span> */}
//                                         <span className="text-gray-500 dark:text-gray-300 block text-sm">
//                                             Checking account status... {/* Updated message */}
//                                         </span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                             <div>
//                                 <button
//                                     type="button" // Changed to button type for accessibility and preventing form submission
//                                     className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3"
//                                     onClick={() => alert('Continue with Google functionality not implemented.')} // Example action
//                                 >
//                                     <Image
//                                         src="/assets/icon/google.svg"
//                                         width={30}
//                                         height={30}
//                                         alt="Continue with Google"
//                                     />
//                                     Continue with Google
//                                 </button>
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your email address <span className="text-error">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     placeholder='Your Email'
//                                     className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${emailError
//                                         ? "border-red-700 border-2 !shadow-none"
//                                         : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 {emailError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="password"
//                                     className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
//                                 >
//                                     Your password <span className="text-error">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         placeholder='Your Password'
//                                         className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${passwordError
//                                             ? "border-red-700 border-2 !shadow-none"
//                                             : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> : <VscEye className="text-mainheading size-5 dark:text-white" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p className="flex text-red-700 text-base items-center mt-0.5">
//                                         <span className="mr-1">
//                                             <IoMdCloseCircle className="size-5" />
//                                         </span>
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="text-right">
//                                 <Link
//                                     href="/auth/forgot-password"
//                                     className="text-mainheading dark:text-primary inline-block font-medium underline underline-offset-4"
//                                 >
//                                     Forgot Password ?
//                                 </Link>
//                             </div>

//                             <div className="flex justify-between items-center mb-4">
//                                 <button
//                                     type="submit"
//                                     className={`rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed' : 'bg-primary hover:bg-primaryhover text-mainheading'}
//                                 `}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <div className="flex gap-4 justify-center items-center">
//                                             <svg className="size-5 text-mainheading dark:text-white font-medium animate-spin" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                             Logging in...
//                                         </div>
//                                     ) : (
//                                         'Log in'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// frontend/src/app/auth/login/page.tsx
"use client";

import { useState, useEffect, FormEvent } from "react"; // Import FormEvent
import authService from "../../services/auth"; // Assuming this service exists and is correctly implemented
import { useAuth } from "../../contexts/AuthContext"; // Assuming this hook exists and is correctly implemented
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { VscEye } from "react-icons/vsc";
import { RiEyeCloseLine } from "react-icons/ri";
import { AiOutlineInfo } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa6";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const { login, user, loading, isAdmin } = useAuth(); // Get user and loading state
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState("");
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
  const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const autoLogout = urlParams.get("autoLogout");
    const sessionExpired = urlParams.get("sessionExpired");

    if (sessionExpired === "true") {
      setSessionExpiredMessage(
        "Your session has expired. Please log in again."
      );
      setInactiveLogoutMessage("");
    } else if (autoLogout === "true") {
      setInactiveLogoutMessage(
        "We logged you out because you were inactive for a while — it's to help keep your account secure."
      );
      setSessionExpiredMessage("");
    } else {
      setInactiveLogoutMessage("");
      setSessionExpiredMessage("");
    }
  }, [searchParams]);

  useEffect(() => {
    // This effect handles redirection *after* the user state is updated by login()
    if (!loading && user) {
      console.log("Login successful, checking KYC status:", user.kyc?.status);

      let redirectUrl = "";

      // Determine redirect based on role and KYC status
      if (isAdmin) {
        redirectUrl = "/admin"; // Admins go straight to admin panel
      } else {
        switch (user.kyc?.status) {
          case "not_started":
          case "rejected":
          case "skipped": // Treat skipped like not_started for initial flow
            redirectUrl = "/kyc/start"; // Start the KYC flow
            break;
          case "pending":
            redirectUrl = "/kyc/pending"; // Go to a pending status page
            break;
          case "verified":
            redirectUrl = "/dashboard"; // Go to the main dashboard
            break;
          default:
            redirectUrl = "/dashboard"; // Fallback to dashboard
        }
      }

      console.log("Redirecting logged-in user to:", redirectUrl);
      // Delay redirection slightly to allow success message to show
      const timeoutId = setTimeout(() => {
        router.push(redirectUrl);
      }, 500); // Adjust delay as needed

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    }
  }, [user, loading, router, isAdmin]); // Depend on user, loading, router, isAdmin

  useEffect(() => {
    setIsLoginErrorVisible(!!loginError);
  }, [loginError]);

  useEffect(() => {
    setIsLoginSuccessVisible(loginSuccess);
  }, [loginSuccess]);

  // Fix 1: Add type React.FormEvent<HTMLFormElement> to 'e'
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    setIsLoginErrorVisible(false);
    setInactiveLogoutMessage("");
    setSessionExpiredMessage("");
    setLoginSuccess(false);
    setIsLoginSuccessVisible(false);

    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      // The login function updates the AuthContext state (user)
      const { user: loggedInUser, token } = await authService.login({
        email,
        password,
      });
      console.log("Login successful in component");
      setLoginSuccess(true); // Show success message
      login(loggedInUser, token); // This triggers the useEffect above
      // **Remove direct redirection from here**
    } catch (err) {
      // 'err' is initially 'unknown'
      console.error("Login error in component:", err);

      // Fix 2: Check the type of 'err' before accessing properties
      let message = "Sorry, that email or password didn't work."; // Default message
      if (err instanceof Error) {
        // If it's an Error instance, use its message
        message = err.message || message;
      } else if (typeof err === "string") {
        // If it's just a string, use the string as the message
        message = err;
      }
      // Potentially add more checks here if your authService can throw other types of errors

      // Now use the determined message
      if (message.toLowerCase().includes("invalid credentials")) {
        setLoginError("Invalid email address and password combination.");
      } else {
        setLoginError(message);
      }
      setIsLoginErrorVisible(true);
      setLoginSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const errorVariants = {
    initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: "0deg",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        type: "spring",
        stiffness: 95,
        damping: 10,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      rotate: "-2deg",
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const successVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="bg-white dark:bg-background">
      <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
        <div className="w-full max-w-md lg:mt-20 mt-10">
          {/* User Inactive-LogoutMessage */}

          <AnimatePresence>
            {inactiveLogoutMessage && (
              <motion.div
                className="bg-gray/10 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
                role="alert"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={errorVariants}
              >
                <div className="flex dark:bg-yellow-600/20 bg-main/60 justify-center rounded-full items-center lg:size-12 size-10">
                  <AiOutlineInfo className="p-0.5 dark:text-yellow-600 text-white size-8" />
                </div>

                <div>
                  <span className="text-gray-500 dark:text-gray-300 text-sm lg:text-base block max-w-60 leading-relaxed">
                    {inactiveLogoutMessage}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* User SessionExpiredMessage */}
          <AnimatePresence>
            {sessionExpiredMessage && (
              <motion.div
                className="bg-gray/10 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
                role="alert"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={errorVariants}
              >
                <div className="flex dark:bg-red-600/20 bg-red-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
                  <FiX className="p-0.5 text-mainheading dark:text-red-600 lg:size-8 size-6" />
                </div>
                <div>
                  <p className="font-medium">
                    Session Expired Please Try Again!
                  </p>
                  <p className="text-mainheading dark:text-whit text-sm lg:text-base block max-w-60 leading-relaxed">
                    {sessionExpiredMessage}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="py-3">
            <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
              Welcome back.
            </h2>

            <p className="text-center text-gray-700 dark:text-gray-300 font-light mb-4">
              New to Wise?{" "}
              <Link
                href="/auth/register"
                className="text-primary font-medium underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>

            {/* User LoginError Massage */}
            <AnimatePresence>
              {isLoginErrorVisible && loginError && (
                <motion.div
                  className={`dark:bg-white/5 bg-gray/10 rounded-2xl p-4 flex items-center gap-4 relative`}
                  role="alert"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={errorVariants}
                >
                  <div className="flex dark:bg-red-600/20 bg-red-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
                    <FiX className="p-0.5 text-mainheading dark:text-red-600 lg:size-8 size-6" />
                  </div>
                  <div>
                    <span className="text-mainheading dark:text-white text-sm lg:text-base block max-w-60 leading-relaxed">
                      {loginError}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* User Success Message Display */}
            <AnimatePresence>
              {isLoginSuccessVisible && loginSuccess && (
                <motion.div
                  className="flex bg-gray/10 dark:bg-white/5 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
                  role="alert"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={successVariants}
                >
                  <div className="flex dark:bg-primary/20 bg-green-300 justify-center rounded-full items-center lg:size-12 size-10 shrink-0">
                    <FaCheck className="p-0.5 text-white dark:text-primary lg:size-8 size-6" />
                  </div>
                  <div className="flex-grow space-y-0.5">
                    <span className="text-mainheading dark:text-primary block font-medium">
                      Login successful!
                    </span>
                    <span className="text-mainheading dark:text-gray-300 block text-sm">
                      Checking account status... {/* Updated message */}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
              <div>
                <button
                  type="button" // Changed to button type for accessibility and preventing form submission
                  className="flex dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3 text-sm lg:text-base"
                  onClick={() =>
                    alert("Continue with Google functionality not implemented.")
                  } // Example action
                >
                  <Image
                    src="/assets/icon/google.svg"
                    width={30}
                    height={30}
                    alt="Continue with Google"
                  />
                  Continue with Google
                </button>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
                >
                  Your email address <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className={`mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
                    emailError
                      ? "border-red-700 border-2 !shadow-none"
                      : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!emailError} // Added for accessibility
                  aria-describedby={emailError ? "email-error" : undefined} // Added for accessibility
                />
                {emailError && (
                  <p
                    id="email-error"
                    className="flex text-red-700 text-base items-center mt-0.5"
                  >
                    {" "}
                    {/* Added id */}
                    <span className="mr-1">
                      <IoMdCloseCircle className="size-5" />
                    </span>
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
                >
                  Your password <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Your Password"
                    className={`mt-1 block px-4 dark:bg-background py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${
                      passwordError
                        ? "border-red-700 border-2 !shadow-none"
                        : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!passwordError} // Added for accessibility
                    aria-describedby={
                      passwordError ? "password-error" : undefined
                    } // Added for accessibility
                  />
                  <button
                    type="button"
                    className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    } // Added for accessibility
                  >
                    {showPassword ? (
                      <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" />
                    ) : (
                      <VscEye className="text-mainheading size-5 dark:text-white" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p
                    id="password-error"
                    className="flex text-red-700 text-base items-center mt-0.5"
                  >
                    {" "}
                    {/* Added id */}
                    <span className="mr-1">
                      <IoMdCloseCircle className="size-5" />
                    </span>
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-mainheading dark:text-primary inline-block font-medium underline text-sm lg:text-base underline-offset-4"
                >
                  Forgot Password ?
                </Link>
              </div>

              <div className="flex justify-between items-center mb-4">
                <button
                  type="submit"
                  className={`rounded-full text-mainheading w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium lg:py-3 py-2 lg:h-12.5 transition-colors
                                    ${
                                      isSubmitting
                                        ? "bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed"
                                        : "bg-primary hover:bg-primaryhover text-mainheading"
                                    }
                                `}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex gap-4 justify-center items-center">
                      <svg
                        className="size-5 text-mainheading dark:text-white font-medium animate-spin"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        {" "}
                        {/* Added aria-hidden */}
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
                      Logging in...
                    </div>
                  ) : (
                    "Log in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// // frontend/src/app/auth/login/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// // Assuming authService makes the API call and returns { user: UserObject, token: string }
// import authService from '../../services/auth';
// // Assuming useAuth provides { login, user, loading, isAdmin }
// import { useAuth } from '../../contexts/AuthContext'; // *** Corrected path assumption ***
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { AiOutlineInfo } from "react-icons/ai";
// import { FiX } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaCheck } from 'react-icons/fa6';
// // --- START: Add Missing Imports ---
// import { Button } from "@/components/ui/button"; // Import Button
// import { Loader2, AlertTriangle  } from 'lucide-react'; // Import Loader2, AlertTriangle, and rename FaCheck import if needed to avoid clash
// // --- END: Add Missing Imports ---
// // --- Assuming a simple Auth service interface ---
// // You might have this defined elsewhere
// // interface AuthService {
// //   login: (credentials: { email: string, password: string }) => Promise<{ user: any, token: string }>;
// // }
// // const authService: AuthService = { /* ... implementation */ };
// // ---

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const { login: contextLogin, user, loading, isAdmin } = useAuth(); // Renamed context login to avoid clash
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // State for messages
//     const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
//     const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
//     const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
//     const [loginSuccess, setLoginSuccess] = useState(false);
//     const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

//     // Effect to show logout/session expired messages from URL params
//     useEffect(() => {
//         const autoLogout = searchParams.get('autoLogout');
//         const sessionExpired = searchParams.get('sessionExpired');

//         if (sessionExpired === 'true') {
//             setSessionExpiredMessage("Your session has expired. Please log in again.");
//             setInactiveLogoutMessage('');
//         } else if (autoLogout === 'true') {
//             setInactiveLogoutMessage("We logged you out due to inactivity to keep your account secure.");
//             setSessionExpiredMessage('');
//         } else {
//             setInactiveLogoutMessage('');
//             setSessionExpiredMessage('');
//         }
//          // Clear params after reading them (optional, prevents message re-showing on refresh)
//          // router.replace('/auth/login', { scroll: false }); // Careful with this, might interfere
//     }, [searchParams, router]); // Added router to deps if using replace

//     // --- Effect for REDIRECTION after successful login ---
//     useEffect(() => {
//         // Only run if loading is complete AND user object exists in context
//         if (!loading && user) {
//              // Check if we are still showing the success message
//              if (isLoginSuccessVisible) {
//                  console.log("Login successful, checking KYC status:", user.kycStatus);

//                 let redirectUrl = '';

//                 // Determine redirect based on role and KYC status
//                 if (isAdmin) {
//                     redirectUrl = '/admin/dashboard'; // Example admin route
//                 } else {
//                     switch (user.kycStatus) {
//                         case 'not_started':
//                         case 'rejected':
//                         case 'skipped':
//                             redirectUrl = '/kyc/start';
//                             break;
//                         case 'pending':
//                             redirectUrl = '/kyc/pending';
//                             break;
//                         case 'verified':
//                             redirectUrl = '/dashboard';
//                             break;
//                         default:
//                             console.warn("Unknown KYC status for redirection:", user.kycStatus)
//                             redirectUrl = '/dashboard'; // Fallback
//                     }
//                 }

//                 console.log("Redirecting logged-in user to:", redirectUrl);
//                  // Delay redirection slightly to allow success message to show
//                  const timeoutId = setTimeout(() => {
//                     router.push(redirectUrl);
//                 }, 500); // Adjust delay (e.g., 500ms)

//                 // Cleanup timeout if the component unmounts before redirect happens
//                 return () => clearTimeout(timeoutId);
//             }
//         }
//     }, [user, loading, isAdmin, router, isLoginSuccessVisible]); // Depend on user, loading, isAdmin, router, and success visibility

//     // Effect to control visibility of login error message
//     useEffect(() => {
//         setIsLoginErrorVisible(!!loginError);
//     }, [loginError]);

//     // Effect to control visibility of login success message
//      useEffect(() => {
//         setIsLoginSuccessVisible(loginSuccess);
//          // Optional: auto-hide success message after a while if redirect fails?
//          // if (loginSuccess) {
//          //     const timer = setTimeout(() => setIsLoginSuccessVisible(false), 5000); // Hide after 5s
//          //     return () => clearTimeout(timer);
//          // }
//     }, [loginSuccess]);

//     // --- Handle Form Submission ---
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');
//         setIsLoginErrorVisible(false);
//         setInactiveLogoutMessage(''); // Clear previous messages on new attempt
//         setSessionExpiredMessage('');
//         setLoginSuccess(false);       // Reset success state
//         setIsLoginSuccessVisible(false);

//         // Basic client-side validation
//         let isValid = true;
//         if (!email.trim()) {
//             setEmailError('Email is required');
//             isValid = false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) { // Simple email format check
//              setEmailError('Please enter a valid email address');
//              isValid = false;
//         }
//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//         if (!isValid) return;

//         setIsSubmitting(true);
//         try {
//             // 1. Call the API service
//             // Ensure authService.login returns { user: UserObject, token: string }
//             const response = await authService.login({ email, password });

//             // ** Debug Log: Check the structure **
//             console.log("API Login Response in Component:", response);

//             // 2. Validate the response structure
//             if (response && response.user && response.token) {
//                 console.log("Login API call successful.");
//                 // 3. Update AuthContext (this triggers the redirection useEffect)
//                 contextLogin(response.user, response.token);
//                  // 4. Show success message
//                  setLoginSuccess(true);
//                  // Redirection is handled by the useEffect hook watching the `user` state
//             } else {
//                  // Handle cases where the backend response is missing user/token
//                  console.error("Login failed: API response missing 'user' or 'token'.", response);
//                  throw new Error("Login failed: Invalid response from server."); // Throw error to be caught below
//             }

//         } catch (err: any) {
//             console.error("Login error in component handleSubmit:", err);
//             // Extract error message (prefer backend message)
//              const message = err.response?.data?.message || err.message || 'An unexpected error occurred.';

//              // Set user-friendly error message based on common patterns
//              if (message.toLowerCase().includes('invalid credentials') || message.toLowerCase().includes('invalid email or password')) {
//                  setLoginError('Invalid email address or password.');
//              } else if (message.includes('server error')) {
//                   setLoginError('Login failed due to a server issue. Please try again later.');
//              }
//               else {
//                  setLoginError(message); // Display other messages directly
//              }
//              setIsLoginErrorVisible(true);
//              setLoginSuccess(false); // Ensure success is false on error
//         } finally {
//             setIsSubmitting(false); // Stop loading indicator
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     // Animation variants (keep as they are)
//     const errorVariants = { /* ... */ };
//     const successVariants = { /* ... */ };

//     return (
//         // --- JSX Structure (keep mostly as it is) ---
//         // Ensure error/success messages use the new state variables
//         // Ensure submit button uses `isSubmitting` state
//         // Ensure form calls `handleSubmit` on onSubmit

//         <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md lg:mt-20 mt-10">
//                 <div className="bg-white dark:bg-background p-6 md:p-8 rounded-lg shadow-md"> {/* Added padding & rounded */}

//                     {/* Inactive Logout Message */}
//                     <AnimatePresence>
//                         {inactiveLogoutMessage && (
//                             <motion.div /* ... */ className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 flex items-start gap-3 relative mb-4 text-yellow-800 dark:text-yellow-200">
//                                 <AiOutlineInfo className="size-5 mt-0.5 shrink-0" />
//                                 <span className="text-sm">{inactiveLogoutMessage}</span>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* Session Expired Message */}
//                     <AnimatePresence>
//                         {sessionExpiredMessage && (
//                             <motion.div /* ... */ className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 flex items-start gap-3 relative mb-4 text-red-700 dark:text-red-200">
//                                 <IoMdCloseCircle className="size-5 mt-0.5 shrink-0" />
//                                 <span className="text-sm">{sessionExpiredMessage}</span>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <div className='py-3'>
//                         <h2 className="lg:text-3xl text-2xl text-center text-mainheading dark:text-white font-semibold mb-4">
//                             Welcome back
//                         </h2>
//                         <p className="text-center text-gray-500 dark:text-gray-300 text-sm mb-6"> {/* Adjusted size */}
//                             New to Wise Clone?{" "}
//                             <Link href="/auth/register" className="text-primary font-medium hover:underline">
//                                 Sign up
//                             </Link>
//                         </p>

//                         {/* Login Error Message */}
//                         <AnimatePresence>
//                             {isLoginErrorVisible && loginError && (
//                                 <motion.div /* ... */ className={`bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-start gap-3 relative mb-4 text-destructive text-sm font-medium`}>
//                                     <AlertTriangle className="size-5 mt-0.5 shrink-0" /> {/* Changed icon */}
//                                     <span>{loginError}</span>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {/* Login Success Message */}
//                         <AnimatePresence>
//                             {isLoginSuccessVisible && loginSuccess && (
//                                 <motion.div /* ... */ className="flex bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 p-4 rounded-lg gap-3 items-center relative mb-4">
//                                     <FaCheck className="size-5 text-green-600 dark:text-green-400 shrink-0" />
//                                     <div className="flex-grow">
//                                         <span className="text-green-700 dark:text-green-300 block font-medium text-sm">
//                                             Login successful! Checking account status...
//                                         </span>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {/* Login Form */}
//                         <form className="space-y-5" onSubmit={handleSubmit} noValidate> {/* Added noValidate */}
//                              {/* Google Button (Keep example action) */}
//                              <div>
//                                  <button
//                                      type="button"
//                                      className="flex border border-gray-300 dark:border-gray-700 bg-white dark:bg-secondary justify-center rounded-lg text-mainheading dark:text-white text-sm w-full cursor-pointer font-medium gap-3 items-center px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                                      onClick={() => alert('Continue with Google not implemented.')}
//                                  >
//                                      <Image src="/assets/icon/google.svg" width={20} height={20} alt="Google logo"/>
//                                      Continue with Google
//                                  </button>
//                              </div>
//                              {/* Divider (Optional) */}
//                              <div className="relative my-6">
//                                 <div className="absolute inset-0 flex items-center">
//                                     <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
//                                 </div>
//                                 <div className="relative flex justify-center text-xs uppercase">
//                                     <span className="bg-white dark:bg-background px-2 text-gray-500 dark:text-gray-400">
//                                     Or continue with email
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Email Input */}
//                             <div>
//                                 <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300 block font-medium mb-1">
//                                     Email address
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className={`mt-1 block px-4 py-2.5 w-full border rounded-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-secondary dark:border-gray-600 ${emailError
//                                         ? "border-destructive focus:ring-destructive/50"
//                                         : "border-gray-300 dark:border-gray-600 hover:shadow-sm"
//                                         }`}
//                                     value={email}
//                                     onChange={(e) => { setEmail(e.target.value); setEmailError(''); setLoginError(''); }} // Clear errors on change
//                                     aria-invalid={!!emailError}
//                                     aria-describedby="email-error"
//                                 />
//                                 {emailError && (
//                                     <p id="email-error" className="flex text-destructive text-xs items-center mt-1">
//                                         <IoMdCloseCircle className="size-4 mr-1 shrink-0" />
//                                         {emailError}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* Password Input */}
//                             <div>
//                                 <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-300 block font-medium mb-1">
//                                     Password
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         className={`mt-1 block px-4 py-2.5 w-full border rounded-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-secondary dark:border-gray-600 pr-10 ${passwordError
//                                             ? "border-destructive focus:ring-destructive/50"
//                                             : "border-gray-300 dark:border-gray-600 hover:shadow-sm"
//                                             }`}
//                                         value={password}
//                                         onChange={(e) => { setPassword(e.target.value); setPasswordError(''); setLoginError(''); }} // Clear errors on change
//                                         aria-invalid={!!passwordError}
//                                         aria-describedby="password-error"
//                                     />
//                                     <button
//                                         type="button"
//                                         title={showPassword ? "Hide password" : "Show password"}
//                                         className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
//                                         onClick={togglePasswordVisibility}
//                                         aria-label={showPassword ? "Hide password" : "Show password"}
//                                     >
//                                         {showPassword ? <RiEyeCloseLine className="size-5" /> : <VscEye className="size-5" />}
//                                     </button>
//                                 </div>
//                                 {passwordError && (
//                                     <p id="password-error" className="flex text-destructive text-xs items-center mt-1">
//                                         <IoMdCloseCircle className="size-4 mr-1 shrink-0" />
//                                         {passwordError}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* Forgot Password Link */}
//                             <div className="text-right text-sm">
//                                 <Link href="/auth/forgot-password" className="text-primary hover:underline font-medium">
//                                     Forgot password?
//                                 </Link>
//                             </div>

//                             {/* Submit Button */}
//                             <Button type="submit" className="w-full h-11" disabled={isSubmitting || isLoginSuccessVisible}>
//                                 {isSubmitting ? (
//                                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                                 ) : null}
//                                 {isSubmitting ? 'Logging in...' : 'Log in'}
//                             </Button>

//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
