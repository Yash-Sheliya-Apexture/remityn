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

// frontend/src/app/auth/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import authService from '../../services/auth'; // Assuming this service exists and is correctly implemented
import { useAuth } from '../../hooks/useAuth'; // Assuming this hook exists and is correctly implemented
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdCloseCircle } from 'react-icons/io';
import { VscEye } from 'react-icons/vsc';
import { RiEyeCloseLine } from 'react-icons/ri';
import { AiOutlineInfo } from "react-icons/ai";
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa6';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const { login, user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inactiveLogoutMessage, setInactiveLogoutMessage] = useState('');
    const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
    const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(searchParams.toString());
        const autoLogout = urlParams.get('autoLogout');
        const sessionExpired = urlParams.get('sessionExpired');

        if (sessionExpired === 'true') {
            setSessionExpiredMessage("Your session has expired. Please log in again.");
            setInactiveLogoutMessage('');
        } else if (autoLogout === 'true') {
            setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
            setSessionExpiredMessage('');
        } else {
            setInactiveLogoutMessage('');
            setSessionExpiredMessage('');
        }
    }, [searchParams]);

    useEffect(() => {
        if (!loading && user) {
            const timeoutId = setTimeout(() => {
                let redirectUrl = '/dashboard';
                if (user.role === 'admin') {
                    redirectUrl = '/admin';
                }
                console.log("User logged in, redirecting to:", redirectUrl);
                router.push(redirectUrl);
            }, 300);

            return () => clearTimeout(timeoutId);
        }
    }, [user, loading, router]);

    useEffect(() => {
        setIsLoginErrorVisible(!!loginError);
    }, [loginError]);

    useEffect(() => {
        setIsLoginSuccessVisible(loginSuccess);
    }, [loginSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setLoginError('');
        setIsLoginErrorVisible(false);
        setInactiveLogoutMessage('');
        setSessionExpiredMessage('');
        setLoginSuccess(false);
        setIsLoginSuccessVisible(false);

        let isValid = true;
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }
        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const { user: loggedInUser, token } = await authService.login({ email, password });
            console.log("Login successful in component");
            login(loggedInUser, token);
            setLoginSuccess(true);
        } catch (err) {
            console.error("Login error in component:", err);
            if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
                setLoginError('Invalid email address and password combination.');
            } else {
                setLoginError('Sorry, that email or password didn\'t work.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const errorVariants = {
        initial: { opacity: 0.5, y: 10, scale: 0.95, rotate: "2deg" },
        animate: { opacity: 1, y: 0, scale: 1, rotate: "0deg", transition: { duration: 0.3, ease: "easeInOut", type: "spring", stiffness: 95, damping: 10 } },
        exit: { opacity: 0, y: 10, scale: 0.95, rotate: "-2deg", transition: { duration: 0.2, ease: "easeIn" } },
    };

    const successVariants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
    };

    return (
        <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
            <div className="w-full max-w-md lg:mt-20 mt-10">
                <div className="bg-white dark:bg-background">

                    {/* User Inactive-LogoutMessage */}
                    <AnimatePresence>
                        {inactiveLogoutMessage && (
                            <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
                                role="alert"
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={errorVariants}
                            >
                                <div className="flex dark:bg-yellow-600/20 bg-black/80 justify-center rounded-full items-center lg:size-12 size-10">
                                    <AiOutlineInfo className="p-0.5 dark:text-yellow-600 text-white size-8" />
                                </div>
                                <div>
                                    <span className="text-gray-500 dark:text-gray-300 block max-w-60 leading-relaxed">{inactiveLogoutMessage}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* User SessionExpiredMessage */}
                    <AnimatePresence>
                        {sessionExpiredMessage && (
                            <motion.div className="bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4"
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
                                    <p className="font-medium">Session Expired Please Try Again!</p>
                                    <p className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{sessionExpiredMessage}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className='py-3'>
                        <h2 className="lg:text-3xl text-2xl text-center text-main dark:text-white  font-semibold mb-4">
                            Welcome back.
                        </h2>

                        <p className="text-center text-gray-500 dark:text-gray-300 font-light mb-4">
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
                                    className={`bg-lightgray dark:bg-white/5 rounded-2xl p-4 flex items-center gap-4 relative mb-4`}
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
                                        <span className="text-gray-500 dark:text-white block max-w-60 leading-relaxed">{loginError}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* User Success Message Display */}
                        <AnimatePresence>
                            {isLoginSuccessVisible && loginSuccess && (
                                <motion.div
                                    className="flex bg-lightgray dark:bg-secondary p-4 rounded-2xl gap-4 items-center lg:gap-6 relative mb-4"
                                    role="alert"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={successVariants}
                                >
                                    <div className="flex bg-primary/20 justify-center rounded-full items-center size-12 shrink-0">
                                        <FaCheck className="p-0.5 text-mainheading dark:text-primary size-8" />
                                    </div>
                                    <div className="flex-grow space-y-0.5">
                                        <span className="text-mainheading dark:text-primary block font-medium">
                                            Login successful!
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-300 block text-sm">
                                            Redirecting to dashboard...
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <button
                                    type="button" // Changed to button type for accessibility and preventing form submission
                                    className="flex bg-white dark:bg-background border justify-center rounded-lg text-mainheading dark:text-white  text-md w-full cursor-pointer font-medium gap-4 items-center px-4 py-3"
                                    onClick={() => alert('Continue with Google functionality not implemented.')} // Example action
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
                                    className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
                                >
                                    Your email address <span className="text-error">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder='Your Email'
                                    className={`mt-1 block px-4 py-3 h-14 w-full border rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${emailError
                                        ? "border-red-700 border-2 !shadow-none"
                                        : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
                                        }`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && (
                                    <p className="flex text-red-700 text-base items-center mt-0.5">
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
                                    className="text-gray-500 dark:text-gray-300 block capitalize font-medium"
                                >
                                    Your password <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        placeholder='Your Password'
                                        className={`mt-1 block px-4 py-3 h-14 border w-full rounded-lg transition-shadow focus:outline-none ease-in-out duration-300 ${passwordError
                                            ? "border-red-700 border-2 !shadow-none"
                                            : "hover:shadow-darkcolor dark:hover:shadow-whitecolor"
                                            }`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="text-gray-500 -translate-y-1/2 absolute cursor-pointer focus:outline-none hover:text-gray-700 right-1 top-1/2 transform dark:bg-background  bg-white p-3 rounded-md"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <RiEyeCloseLine className="text-mainheading size-5 dark:text-white" /> : <VscEye className="text-mainheading size-5 dark:text-white" />}
                                    </button>
                                </div>
                                {passwordError && (
                                    <p className="flex text-red-700 text-base items-center mt-0.5">
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
                                    className="text-mainheading dark:text-primary inline-block font-medium underline underline-offset-4"
                                >
                                    Forgot Password ?
                                </Link>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <button
                                    type="submit"
                                    className={`rounded-full text-mainheading text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-3 h-14 transition-colors
                                    ${isSubmitting ? 'bg-gray-300 dark:bg-background border dark:text-white text-mainheading cursor-not-allowed' : 'bg-primary hover:bg-primaryhover text-mainheading'}
                                `}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex gap-4 justify-center items-center">
                                            <svg className="size-5 text-mainheading dark:text-white font-medium animate-spin" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging in...
                                        </div>
                                    ) : (
                                        'Log in'
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