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
'use client';

import { useState, useEffect } from 'react';
import authService from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdCloseCircle } from 'react-icons/io';
import { VscEye } from 'react-icons/vsc';
import { RiEyeCloseLine } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { AiOutlineInfo } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


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
    // --- START OF FIX ---
    const [sessionExpiredMessage, setSessionExpiredMessage] = useState(''); // State for session expired message
    // --- END OF FIX ---
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');

    // Check for query params from URL
    useEffect(() => {
        const urlParams = typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : searchParams;

        const autoLogout = urlParams.get('autoLogout');
        // --- START OF FIX ---
        const sessionExpired = urlParams.get('sessionExpired'); // Check for sessionExpired param
        // --- END OF FIX ---

        // --- START OF FIX ---
        // Set the appropriate message and clear others
        if (sessionExpired === 'true') {
            setSessionExpiredMessage("Your session has expired. Please log in again.");
            setInactiveLogoutMessage(''); // Clear other message
            // Optional: remove the query param from URL without reload (more complex)
            // window.history.replaceState({}, document.title, window.location.pathname);
        } else if (autoLogout === 'true') {
            setInactiveLogoutMessage("We logged you out because you were inactive for a while — it's to help keep your account secure.");
            setSessionExpiredMessage(''); // Clear other message
            // Optional: remove the query param
            // window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            // Clear messages if neither param is present
            setInactiveLogoutMessage('');
            setSessionExpiredMessage('');
        }
        // --- END OF FIX ---

    }, [searchParams]); // Re-run if searchParams change

    useEffect(() => {
        if (!loading && user) {
            const timeoutId = setTimeout(() => {
                // Redirect to dashboard or intended page after successful login
                let redirectUrl = '/dashboard'; // Default for normal users
                if (user.role === 'admin') {
                    redirectUrl = '/admin'; // Redirect for admins
                }
                console.log("User logged in, redirecting to:", redirectUrl);
                router.push(redirectUrl);
            }, 500); // Short delay after login confirmation

            return () => clearTimeout(timeoutId);
        }
    }, [user, loading, router, searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setLoginError('');
        // --- START OF FIX ---
        // Clear notification messages on new attempt
        setInactiveLogoutMessage('');
        setSessionExpiredMessage('');
        // --- END OF FIX ---
        setForgotPasswordSuccess('');


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
            // Redirect is handled by the useEffect watching the `user` state
        } catch (err) {
            console.error("Login error in component:", err);
            // More specific error handling based on backend response if available
            if (err.message && err.message.toLowerCase().includes('invalid credentials')) {
                setLoginError('Sorry, that email or password didn\'t work.');
            } else {
                setLoginError(err.message || 'An unexpected error occurred during login.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseInactiveLogoutMessage = () => {
        setInactiveLogoutMessage('');
    };

    // --- START OF FIX ---
    const handleCloseSessionExpiredMessage = () => {
        setSessionExpiredMessage(''); // Function to close the session expired message
    };
    // --- END OF FIX ---

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCloseLoginError = () => {
        setLoginError("");
    };

    const handleForgotPasswordSuccessDismiss = () => {
        setForgotPasswordSuccess('');
    };


    return (
        <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
            <div className="w-full max-w-md lg:mt-20 mt-10">
                <div className="bg-white">
                    {/* Inactive logout message */}
                    {inactiveLogoutMessage && (

                        <div className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
                            <div className="flex bg-gray justify-center rounded-full items-center lg:size-12 size-10">
                                <AiOutlineInfo className="p-0.5 text-white size-8" />
                            </div>
                            <div>
                                <span className="text-gray text-sm lg:text-base block max-w-60">{inactiveLogoutMessage}</span>
                            </div>
                            <button
                                className="absolute cursor-pointer right-3 top-4"
                                onClick={handleCloseInactiveLogoutMessage}
                            >
                                <IoClose
                                    className="lg:p-1.5 p-0.5 rounded-full text-gray fill-current hover:bg-green/8 size-6 lg:size-10"
                                    role="button"
                                />
                            </button>
                        </div>
                    )}
                    {/* Session expired message */}
                    {sessionExpiredMessage && (
                        <div className="flex bg-red-200 border-l-4 border-red-500 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative" role="alert">
                            <div className="flex bg-red-500 justify-center rounded-full items-center lg:size-12 size-10">
                                <IoClose className="p-0.5 text-white size-8" />
                            </div>
                            <div>
                                <p className="font-bold">Session Expired</p>
                                <p className="text-sm lg:text-base block max-w-60">{sessionExpiredMessage}</p>
                            </div>
                            <button
                                className="absolute cursor-pointer right-3 top-4"
                                onClick={handleCloseSessionExpiredMessage}
                            >
                                <IoClose
                                    className="lg:p-1.5 p-0.5 rounded-full text-red-500 fill-current hover:bg-red-200 size-6 lg:size-10"
                                    role="button"
                                />
                            </button>
                        </div>
                    )}

                    {/* Forgot Password Success Message (if redirected from forgot password flow) */}
                    {forgotPasswordSuccess && (
                        <div className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative">
                            <div className="flex bg-green justify-center rounded-full items-center size-12">
                                <IoMdCheckmarkCircleOutline className="p-0.5 text-white size-8" />
                            </div>
                            <div>
                                <span className="text-gray block max-w-60">{forgotPasswordSuccess}</span>
                            </div>
                            <button
                                className="absolute cursor-pointer right-4 top-4"
                                onClick={handleForgotPasswordSuccessDismiss}
                            >
                                <IoClose
                                    className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
                                    role="button"
                                />
                            </button>
                        </div>
                    )}

                    <div className='py-3'>
                        <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
                            Welcome back.
                        </h2>

                        <p className="text-base text-center text-gray font-light mb-4">
                            New to Wise?{" "}
                            <Link
                                href="/auth/register"
                                className="text-secondary font-medium underline underline-offset-4"
                            >
                                Sign up
                            </Link>
                        </p>

                        {loginError && (
                            <div
                                className="flex bg-green/8 lg:p-6 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative"
                                role="alert"
                            >
                                <div className="flex bg-error justify-center rounded-full items-center lg:size-12">
                                    <IoClose className="p-0.5 text-white size-8" />
                                </div>

                                <div>
                                    <span className="text-gray block max-w-60">{loginError}</span>
                                </div>

                                <button
                                    className="absolute cursor-pointer md:right-4 right-2 top-2 md:top-4"
                                    onClick={handleCloseLoginError}
                                >
                                    <IoClose
                                        className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
                                        role="button"
                                    />
                                </button>
                            </div>
                        )}

                        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <a className="flex bg-white border border-gray justify-center rounded-lg text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
                                    <Image
                                        src="/assets/icon/google.svg"
                                        width={30}
                                        height={30}
                                        alt="Continue with Google"
                                    />
                                    Continue with Google
                                </a>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-gray text-sm block capitalize font-medium"
                                >
                                    Your email address <span className="text-error">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${emailError
                                        ? "border-error border-2 !shadow-none"
                                        : "border-[#c9cbce] hover:shadow-color"
                                        }`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && (
                                    <p className="flex text-error text-base items-center mt-0.5">
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
                                    className="text-gray text-sm block capitalize font-medium"
                                >
                                    Your password <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${passwordError
                                            ? "border-error border-2 !shadow-none"
                                            : "border-[#c9cbce] hover:shadow-color"
                                            }`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-1 top-1/2 transform bg-white p-3 rounded-md"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <RiEyeCloseLine className="text-secondary size-5" /> : <VscEye className="text-secondary size-5" />}
                                    </button>
                                </div>
                                {passwordError && (
                                    <p className="flex text-error text-base items-center mt-0.5">
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
                                    className="text-secondary inline-block font-medium underline underline-offset-4"
                                >
                                    Forgot Password ?
                                </Link>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <button
                                    type="submit"
                                    className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
                                    ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-secondary'}
                                `}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex justify-center items-center">
                                            <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
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