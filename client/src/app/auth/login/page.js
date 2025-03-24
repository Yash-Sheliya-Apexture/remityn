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
// import Modal from '../../components/ui/Modal';
// import { IoClose } from 'react-icons/io5';

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
//     const [inactiveLogoutModalOpen, setInactiveLogoutModalOpen] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     useEffect(() => {
//         const loggedOutInactive = searchParams.get('loggedOutInactive');
//         if (loggedOutInactive === 'true') {
//             setInactiveLogoutModalOpen(true);
//         }
//     }, [searchParams]);

//     useEffect(() => {
//         if (!loading && user) {
//             //Added delay before redirecting to dashboard
//             const timeoutId = setTimeout(() => {
//                 router.push('/dashboard');
//             }, 1000); // 1 second delay

//             return () => clearTimeout(timeoutId); // Cleanup on unmount or user change
//         }
//     }, [user, loading, router]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailError('');
//         setPasswordError('');
//         setLoginError('');

//         let isValid = true;

//         if (!email) {
//             setEmailError('Email is required');
//             isValid = false;
//         }

//         if (!password) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }

//         if (!isValid) {
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             login(loggedInUser, token);
//             //router.push('/dashboard'); // Removed immediate push
//         } catch (err) {
//             setLoginError(err.message || 'Sorry, that email or password didn\'t work.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const closeModal = () => {
//         setInactiveLogoutModalOpen(false);
//         router.replace('/auth/login');
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };


//     const handleCloseLoginError = () => {
//         setLoginError("");
//     };



//     return (
//         <div className="flex flex-col justify-center items-center lg:px-8 lg:h-[calc(100vh-73px)] px-4">
//             <div className="w-full max-w-md mt-10">
//                 <div className="bg-white">

//                     {inactiveLogoutModalOpen && (
//                         <Modal isOpen={inactiveLogoutModalOpen} onClose={closeModal}>
//                             <div className="flex items-start space-x-4">
//                                 <div className="flex-shrink-0">
//                                     <div className="flex bg-gray-100 h-12 justify-center rounded-full w-12 items-center">
//                                         <svg className="h-6 text-gray-500 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m-1-1h2.01v2H9.78v-2zm-2-4h2v2H7.78v-2z" />
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6-2H6m12 0h-2m-6 0h-2m6 0H6m6 0h-2M12 6v2m-6-2H6m12 0h-2" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                                 <div className="text-left mt-3">
//                                     <h3 className="text-gray-900 text-lg font-medium leading-6">
//                                         Logged out due to inactivity
//                                     </h3>
//                                     <div className="mt-2">
//                                         <p className="text-gray-500 text-sm">
//                                             We logged you out because you were inactive for 5 minutes — it’s to help keep your account secure.
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex-shrink-0 ml-4">
//                                     <button onClick={closeModal} type="button" className="bg-transparent rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:text-gray-500">
//                                         <span className="sr-only">Close</span>
//                                         <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </div>
//                         </Modal>
//                     )}

//                     <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
//                         Welcome back.
//                     </h2>

//                     <p className="text-base text-center text-gray font-light mb-4">
//                         New to Wise?{" "}
//                         <Link
//                             href="/auth/register"
//                             className="text-green font-medium underline underline-offset-4"
//                         >
//                             Sign up
//                         </Link>
//                     </p>



//                     {loginError && (
//                         <div
//                             className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative"
//                             role="alert"
//                         >
//                             <div className="flex bg-[#a8200d] justify-center rounded-full items-center size-12">
//                                 <IoClose className="p-0.5 text-white size-8" />
//                             </div>

//                             <div>
//                                 <span className="text-gray block max-w-60">{loginError}</span>
//                             </div>

//                             <button
//                                 className="absolute cursor-pointer right-4 top-4"
//                                 onClick={handleCloseLoginError}
//                             >
//                                 <IoClose
//                                     className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
//                         <div>
//                             <a className="flex bg-white border border-gray justify-center rounded-lg text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                 <Image
//                                     src="/assets/icon/google.svg"
//                                     width={30}
//                                     height={30}
//                                     alt="Continue with Google"
//                                 />
//                                 Continue with Google
//                             </a>
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="text-gray text-sm block capitalize font-medium"
//                             >
//                                 Your email address
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${emailError
//                                     ? "border-red-500 border-2 !shadow-none"
//                                     : "border-[#c9cbce] hover:shadow-color"
//                                     }`}
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {emailError && (
//                                 <p className="flex text-[#a8200d] text-base items-center mt-0.5">
//                                     <span className="mr-1">
//                                         <IoMdCloseCircle className="size-5" />
//                                     </span>
//                                     {emailError}
//                                 </p>
//                             )}
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="text-gray text-sm block capitalize font-medium"
//                             >
//                                 Your password
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     id="password"
//                                     className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${passwordError
//                                         ? "border-red-500 border-2 !shadow-none"
//                                         : "border-[#c9cbce] hover:shadow-color"
//                                         }`}
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 <button
//                                     type="button"
//                                     className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
//                                     onClick={togglePasswordVisibility}
//                                 >
//                                     {showPassword ? <RiEyeCloseLine className="text-green size-5" /> : <VscEye className="text-green size-5" />}
//                                 </button>
//                             </div>
//                             {passwordError && (
//                                 <p className="flex text-[#a8200d] text-base items-center mt-0.5">
//                                     <span className="mr-1">
//                                         <IoMdCloseCircle className="size-5" />
//                                     </span>
//                                     {passwordError}
//                                 </p>
//                             )}
//                         </div>

//                         <div className="text-right">
//                             <Link
//                                 href="/auth/forgot-password"
//                                 className="text-green inline-block font-medium underline underline-offset-4"
//                             >
//                                 Forgot Password ?
//                             </Link>
//                         </div>

//                         <div className="flex justify-between items-center mb-4">
//                             <button
//                                 type="submit"
//                                 className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
//                                     ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-lightgreen hover:bg-lightgreen-hover text-green'}
//                                 `}
//                                 disabled={isSubmitting}
//                             >
//                                 {isSubmitting ? (
//                                     <div className="flex justify-center items-center">
//                                         <svg className="h-5 text-green w-5 animate-spin mr-3" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Logging in...
//                                     </div>
//                                 ) : (
//                                     'Log in'
//                                 )}
//                             </button>
//                         </div>

//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

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

    // Check for autoLogout param from URL
    useEffect(() => {
        // Get the autoLogout parameter directly from window.location if available
        // This is more reliable than Next.js searchParams in some cases
        const urlParams = typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : searchParams;

        const autoLogout = urlParams.get('autoLogout');
        console.log('URL params:', window.location.search);
        console.log('autoLogout query param:', autoLogout);

        if (autoLogout === 'true') {
            console.log('Setting inactive logout message');
            setInactiveLogoutMessage("We logged you out because you were inactive for 5 minute — it's to help keep your account secure.");
        }
    }, [searchParams]);

    useEffect(() => {
        if (!loading && user) {
            // Added delay before redirecting to dashboard
            const timeoutId = setTimeout(() => {
                router.push('/dashboard');
            }, 1000); // 1 second delay

            return () => clearTimeout(timeoutId); // Cleanup on unmount or user change
        }
    }, [user, loading, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setLoginError('');

        let isValid = true;

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        setIsSubmitting(true);
        try {
            const { user: loggedInUser, token } = await authService.login({ email, password });
            login(loggedInUser, token);
            // router.push('/dashboard'); // Removed immediate push
        } catch (err) {
            setLoginError(err.message || 'Sorry, that email or password didn\'t work.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseInactiveLogoutMessage = () => {
        setInactiveLogoutMessage(''); // Function to close the inactivity message
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCloseLoginError = () => {
        setLoginError("");
    };

    // For debugging - add an effect to always log the current message state
    useEffect(() => {
        console.log('Current inactiveLogoutMessage state:', inactiveLogoutMessage);
    }, [inactiveLogoutMessage]);

    return (
        <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
            <div className="w-full max-w-md lg:mt-20 mt-10">
                <div className="bg-white">
                    {/* Render inactivity message if it exists */}
                    {inactiveLogoutMessage && (

                        <div className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative">
                            <div className="flex bg-primary justify-center rounded-full items-center lg:size-12 size-10">
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
                                className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative"
                                role="alert"
                            >
                                <div className="flex bg-[#a8200d] justify-center rounded-full items-center size-12">
                                    <IoClose className="p-0.5 text-white size-8" />
                                </div>

                                <div>
                                    <span className="text-gray block max-w-60">{loginError}</span>
                                </div>

                                <button
                                    className="absolute cursor-pointer right-4 top-4"
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
                                    Your email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`mt-1 block px-4 py-3 w-full border rounded-lg transition-shadow ease-in-out duration-300 ${emailError
                                        ? "border-red-500 border-2 !shadow-none"
                                        : "border-[#c9cbce] hover:shadow-color"
                                        }`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && (
                                    <p className="flex text-[#a8200d] text-base items-center mt-0.5">
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
                                    Your password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${passwordError
                                            ? "border-red-500 border-2 !shadow-none"
                                            : "border-[#c9cbce] hover:shadow-color"
                                            }`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <RiEyeCloseLine className="text-secondary size-5" /> : <VscEye className="text-secondary size-5" />}
                                    </button>
                                </div>
                                {passwordError && (
                                    <p className="flex text-[#a8200d] text-base items-center mt-0.5">
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