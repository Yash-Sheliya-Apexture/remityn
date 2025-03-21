// 'use client';
// import { useState, useEffect } from 'react';
// import authService from '../../services/auth';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
// import Modal from '../../components/ui/Modal'; // Assuming you have a Modal component
// import Link from 'next/link';
// import Image from 'next/image';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login, user, loading } = useAuth(); // Get user and loading from useAuth
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [inactiveLogoutModalOpen, setInactiveLogoutModalOpen] = useState(false);

//     useEffect(() => {
//         const loggedOutInactive = searchParams.get('loggedOutInactive');
//         if (loggedOutInactive === 'true') {
//             setInactiveLogoutModalOpen(true);
//         }
//     }, [searchParams]);

//     // Redirect if user is already logged in
//     useEffect(() => {
//         if (!loading && user) { // Check if not loading AND user is logged in
//             router.push('/dashboard'); // Redirect to dashboard
//         }
//     }, [user, loading, router]); // Add user, loading, router to dependency array

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         try {
//             const { user, token } = await authService.login({ email, password });
//             login(user, token);
//             router.push('/dashboard');
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const closeModal = () => {
//         setInactiveLogoutModalOpen(false);
//         router.replace('/auth/login'); // Remove the query param from URL
//     };


//     return (
//         <div className="flex flex-col justify-center items-center lg:px-8 min-h-screen px-4 py-12 sm:px-6">
//             <div className="w-full max-w-lg">
//                 <div className="bg-white rounded-lg mb-4 pb-8 pt-6 px-8">

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


//                     <h2 className="text-3xl text-center text-main font-semibold mb-4">
//                         Welcome back.
//                     </h2>

//                     <p className="text-base text-center text-gray mb-4">
//                         New to Wise?{" "}
//                         <Link
//                             href="/register"
//                             className="text-green font-medium underline underline-offset-4"
//                         >
//                             Sign up
//                         </Link>
//                     </p>

//                     <form className="space-y-5" onSubmit={handleSubmit}>
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="text-base text-gray block capitalize"
//                             >
//                                 Your email address
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:shadow-color mt-1 px-4 py-3 transition-shadow"
//                             />
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="text-base text-gray block capitalize"
//                             >
//                                 Your password
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:shadow-color mt-1 px-4 py-3 transition-shadow"
//                                 />
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             className="bg-lightgreen rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium hover:bg-lightgreen-hover py-2.5 transition-colors"

//                         >
//                             Log in
//                         </button>

//                         <div className="">
//                             <Link
//                                 href="/forgot-password"
//                                 className="text-base text-green block font-medium md:text-lg underline underline-offset-4"
//                             >
//                                 Trouble logging in ?
//                             </Link>
//                         </div>
//                     </form>
//                     <div className="mt-4">
//                         <p className="text-base text-gray mb-3">Or log in with</p>
//                         <div className="mt-4">
//                             <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                 <Image
//                                     src="/assets/icon/google.svg"
//                                     width={30}
//                                     height={30}
//                                     alt="Picture of the author"
//                                 />
//                                 Continue with Google
//                             </button>
//                         </div>
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
// import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
// import Modal from '../../components/ui/Modal'; // Assuming you have a Modal component
// import Link from 'next/link';
// import Image from 'next/image';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login, user, loading } = useAuth(); // Get user and loading from useAuth
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [inactiveLogoutModalOpen, setInactiveLogoutModalOpen] = useState(false);

//     useEffect(() => {
//         const loggedOutInactive = searchParams.get('loggedOutInactive');
//         if (loggedOutInactive === 'true') {
//             setInactiveLogoutModalOpen(true);
//         }
//     }, [searchParams]);

//     // Redirect if user is already logged in
//     useEffect(() => {
//         if (!loading && user) { // Check if not loading AND user is logged in
//             router.push('/dashboard'); // Redirect to dashboard
//         }
//     }, [user, loading, router]); // Add user, loading, router to dependency array

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         try {
//             const { user, token } = await authService.login({ email, password });
//             login(user, token);
//             router.push('/dashboard');
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const closeModal = () => {
//         setInactiveLogoutModalOpen(false);
//         router.replace('/auth/login'); // Remove the query param from URL
//     };


//     return (
//         <div className="flex flex-col justify-center items-center lg:px-8 min-h-screen px-4 sm:px-6">
//             <div className="w-full max-w-lg">
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


//                     <h2 className="text-3xl text-center text-main font-semibold mb-4">
//                         Welcome back.
//                     </h2>

//                     <p className="text-base text-center text-gray mb-4">
//                         New to Wise?{" "}
//                         <Link
//                             href="/register"
//                             className="text-green font-medium underline underline-offset-4"
//                         >
//                             Sign up
//                         </Link>
//                     </p>

//                     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//                     <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="text-base text-gray block capitalize"
//                             >
//                                 Your email address
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:shadow-color mt-1 px-4 py-3 transition-shadow"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="text-base text-gray block capitalize"
//                             >
//                                 Your password
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:shadow-color mt-1 px-4 py-3 transition-shadow"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex justify-between items-center mb-4">
//                             <button
//                                 type="submit"
//                                 className="bg-lightgreen rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium hover:bg-lightgreen-hover py-2.5 transition-colors"
//                             >
//                                 Log in
//                             </button>
//                         </div>

//                         <div className="mt-4">
//                             <Link
//                                 href="/forgot-password"
//                                 className="text-base text-green block font-medium md:text-lg underline underline-offset-4"
//                             >
//                                 Trouble logging in ?
//                             </Link>
//                         </div>
//                     </form>

//                     <div className="mt-4">
//                         <p className="text-base text-gray mb-3">Or log in with</p>
//                         <div className="mt-4">
//                             <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                 <Image
//                                     src="/assets/icon/google.svg"
//                                     width={30}
//                                     height={30}
//                                     alt="Picture of the author"
//                                 />
//                                 Continue with Google
//                             </button>
//                         </div>
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
// import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
// import Modal from '../../components/ui/Modal'; // Assuming you have a Modal component
// import Link from 'next/link';
// import Image from 'next/image';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { VscEye } from 'react-icons/vsc';
// import { RiEyeCloseLine } from 'react-icons/ri';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [loginError, setLoginError] = useState(''); // General login error
//     const { login, user, loading } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [inactiveLogoutModalOpen, setInactiveLogoutModalOpen] = useState(false);

//     useEffect(() => {
//         const loggedOutInactive = searchParams.get('loggedOutInactive');
//         if (loggedOutInactive === 'true') {
//             setInactiveLogoutModalOpen(true);
//         }
//     }, [searchParams]);

//     useEffect(() => {
//         if (!loading && user) {
//             router.push('/dashboard');
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
//             return; // Don't proceed with login if validation fails
//         }

//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             login(loggedInUser, token);
//             router.push('/dashboard');
//         } catch (err) {
//             setLoginError(err); // Set a general login error message
//         }
//     };

//     const closeModal = () => {
//         setInactiveLogoutModalOpen(false);
//         router.replace('/auth/login');
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <div className="flex flex-col justify-center items-center lg:px-8 min-h-screen px-4 sm:px-6">
//             <div className="w-full max-w-lg">
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


//                     <h2 className="text-3xl text-center text-main font-semibold mb-4">
//                         Welcome back.
//                     </h2>

//                     <p className="text-base text-center text-gray mb-4">
//                         New to Wise?{" "}
//                         <Link
//                             href="/register"
//                             className="text-green font-medium underline underline-offset-4"
//                         >
//                             Sign up
//                         </Link>
//                     </p>

//                     {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}

//                     <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="text-base text-gray block capitalize"
//                             >
//                                 Your email address
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 className={`border-2 rounded-lg w-full block duration-300 ease-in-out hover:shadow-color mt-1 px-4 py-3 transition-shadow ${emailError ? 'border-red-500' : 'border-[#c9cbce]'}`}
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
//                                 className="text-base text-gray block capitalize"
//                             >
//                                 Your password
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     id="password"
//                                     className={`border-2 rounded-lg w-full block duration-300 ease-in-out hover:shadow-color mt-1 px-4 py-3 transition-shadow ${passwordError ? 'border-red-500' : 'border-[#c9cbce]'}`}
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

//                         <div className="flex justify-between items-center mb-4">
//                             <button
//                                 type="submit"
//                                 className="bg-lightgreen rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium hover:bg-lightgreen-hover py-2.5 transition-colors"
//                             >
//                                 Log in
//                             </button>
//                         </div>

//                         <div className="mt-4">
//                             <Link
//                                 href="/forgot-password"
//                                 className="text-base text-green block font-medium md:text-lg underline underline-offset-4"
//                             >
//                                 Trouble logging in ?
//                             </Link>
//                         </div>
//                     </form>

//                     <div className="mt-4">
//                         <p className="text-base text-gray mb-3">Or log in with</p>
//                         <div className="mt-4">
//                             <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                 <Image
//                                     src="/assets/icon/google.svg"
//                                     width={30}
//                                     height={30}
//                                     alt="Continue with Google"
//                                 />
//                                 Continue with Google
//                             </button>
//                         </div>
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

//     useEffect(() => {
//         const loggedOutInactive = searchParams.get('loggedOutInactive');
//         if (loggedOutInactive === 'true') {
//             setInactiveLogoutModalOpen(true);
//         }
//     }, [searchParams]);

//     useEffect(() => {
//         if (!loading && user) {
//             router.push('/dashboard');
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

//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             login(loggedInUser, token);
//             router.push('/dashboard');
//         } catch (err) {
//             setLoginError(err.message || 'Invalid email or password');
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
//         <div className="flex flex-col justify-center items-center lg:px-8 min-h-screen px-4 sm:px-6">
//             <div className="w-full max-w-lg">
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

//                     <h2 className="text-3xl text-center text-main font-semibold mb-4">
//                         Welcome back.
//                     </h2>

//                     <p className="text-base text-center text-gray mb-4">
//                         New to Wise?{" "}
//                         <Link
//                             href="/register"
//                             className="text-green font-medium underline underline-offset-4"
//                         >
//                             Sign up
//                         </Link>
//                     </p>

//                     {loginError && (
//                         <div
//                             className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 mb-4 relative"
//                             role="alert"
//                         >
//                             <div className="flex bg-[#a8200d] justify-center rounded-full items-center size-10">
//                                 <IoClose className="p-0.5 text-white size-6" />
//                             </div>

//                             <div>
//                                 <span className="text-gray block max-w-60">{loginError}</span>
//                                 <Link
//                                     href="/forgot-password"
//                                     className="text-base text-green block font-medium md:text-lg mt-1.5 underline underline-offset-4"
//                                 >
//                                     Reset password
//                                 </Link>
//                             </div>

//                             <button
//                                 className="absolute cursor-pointer right-2 top-2"
//                                 onClick={handleCloseLoginError}
//                             >
//                                 <IoClose
//                                     className="p-1.5 rounded-full text-gray fill-current hover:bg-[#16330021] size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="text-base text-gray block capitalize"
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
//                                 className="text-base text-gray block capitalize"
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

//                         <div className="flex justify-between items-center mb-4">
//                             <button
//                                 type="submit"
//                                 className="bg-lightgreen rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium hover:bg-lightgreen-hover py-2.5 transition-colors"
//                             >
//                                 Log in
//                             </button>
//                         </div>

//                         <div className="mt-4">
//                             <Link
//                                 href="/forgot-password"
//                                 className="text-base text-green block font-medium md:text-lg underline underline-offset-4"
//                             >
//                                 Trouble logging in ?
//                             </Link>
//                         </div>
//                     </form>

//                     <div className="mt-4">
//                         <p className="text-base text-gray mb-3">Or log in with</p>
//                         <div className="mt-4">
//                             <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                 <Image
//                                     src="/assets/icon/google.svg"
//                                     width={30}
//                                     height={30}
//                                     alt="Continue with Google"
//                                 />
//                                 Continue with Google
//                             </button>
//                         </div>
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
//     const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

//     useEffect(() => {
//         const loggedOutInactive = searchParams.get('loggedOutInactive');
//         if (loggedOutInactive === 'true') {
//             setInactiveLogoutModalOpen(true);
//         }
//     }, [searchParams]);

//     useEffect(() => {
//         if (!loading && user) {
//             router.push('/dashboard');
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

//         setIsSubmitting(true); // Set loading to true on submit
//         try {
//             const { user: loggedInUser, token } = await authService.login({ email, password });
//             login(loggedInUser, token);
//             router.push('/dashboard');
//         } catch (err) {
//             setLoginError(err.message || 'Invalid email or password');
//         } finally {
//             setIsSubmitting(false); // Set loading back to false
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
//         <div className="flex flex-col justify-center items-center lg:px-8 min-h-screen px-4 sm:px-6">
//             <div className="w-full max-w-lg">
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

//                     <h2 className="text-3xl text-center text-main font-semibold mb-4">
//                         Welcome back.
//                     </h2>

//                     <p className="text-base text-center text-gray mb-4">
//                         New to Wise?{" "}
//                         <Link
//                             href="/register"
//                             className="text-green font-medium underline underline-offset-4"
//                         >
//                             Sign up
//                         </Link>
//                     </p>



//                     {loginError && (
//                         <div
//                             className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 mb-4 relative"
//                             role="alert"
//                         >
//                             <div className="flex bg-[#a8200d] justify-center rounded-full items-center size-10">
//                                 <IoClose className="p-0.5 text-white size-6" />
//                             </div>

//                             <div>
//                                 <span className="text-gray block max-w-60">{loginError}</span>
//                                 <Link
//                                     href="/forgot-password"
//                                     className="text-base text-green block font-medium md:text-lg mt-1.5 underline underline-offset-4"
//                                 >
//                                     Reset password
//                                 </Link>
//                             </div>

//                             <button
//                                 className="absolute cursor-pointer right-2 top-2"
//                                 onClick={handleCloseLoginError}
//                             >
//                                 <IoClose
//                                     className="p-1.5 rounded-full text-gray fill-current hover:bg-[#16330021] size-10"
//                                     role="button"
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="text-base text-gray block capitalize"
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
//                                 className="text-base text-gray block capitalize"
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

//                         <div className="mt-4">
//                             <Link
//                                 href="/forgot-password"
//                                 className="text-base text-green block font-medium md:text-lg underline underline-offset-4"
//                             >
//                                 Trouble logging in ?
//                             </Link>
//                         </div>
//                     </form>

//                     <div className="mt-4">
//                         <p className="text-base text-gray mb-3">Or log in with</p>
//                         <div className="mt-4">
//                             <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                                 <Image
//                                     src="/assets/icon/google.svg"
//                                     width={30}
//                                     height={30}
//                                     alt="Continue with Google"
//                                 />
//                                 Continue with Google
//                             </button>
//                         </div>
//                     </div>
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
import Modal from '../../components/ui/Modal';
import { IoClose } from 'react-icons/io5';

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
    const [inactiveLogoutModalOpen, setInactiveLogoutModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loggedOutInactive = searchParams.get('loggedOutInactive');
        if (loggedOutInactive === 'true') {
            setInactiveLogoutModalOpen(true);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!loading && user) {
            //Added delay before redirecting to dashboard
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
            //router.push('/dashboard'); // Removed immediate push
        } catch (err) {
            setLoginError(err.message || 'Sorry, that email or password didn\'t work.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setInactiveLogoutModalOpen(false);
        router.replace('/auth/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleCloseLoginError = () => {
        setLoginError("");
    };



    return (
        <div className="flex flex-col justify-center items-center lg:px-8 min-h-screen px-4">
            <div className="w-full max-w-md">
                <div className="bg-white">

                    {inactiveLogoutModalOpen && (
                        <Modal isOpen={inactiveLogoutModalOpen} onClose={closeModal}>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex bg-gray-100 h-12 justify-center rounded-full w-12 items-center">
                                        <svg className="h-6 text-gray-500 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m-1-1h2.01v2H9.78v-2zm-2-4h2v2H7.78v-2z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6-2H6m12 0h-2m-6 0h-2m6 0H6m6 0h-2M12 6v2m-6-2H6m12 0h-2" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-left mt-3">
                                    <h3 className="text-gray-900 text-lg font-medium leading-6">
                                        Logged out due to inactivity
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-gray-500 text-sm">
                                            We logged you out because you were inactive for 5 minutes — it’s to help keep your account secure.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    <button onClick={closeModal} type="button" className="bg-transparent rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:text-gray-500">
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    )}

                    <h2 className="text-3xl text-center text-main font-semibold mb-4">
                        Welcome back.
                    </h2>

                    <p className="text-base text-center text-gray font-light mb-4">
                        New to Wise?{" "}
                        <Link
                            href="/auth/register"
                            className="text-green font-medium underline underline-offset-4"
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

                    <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
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
                                    {showPassword ? <RiEyeCloseLine className="text-green size-5" /> : <VscEye className="text-green size-5" />}
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

                        <div className="flex justify-between items-center mb-4">
                            <button
                                type="submit"
                                className={`rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium py-2.5 transition-colors
                                    ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-lightgreen hover:bg-lightgreen-hover text-green'}
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

                        <div className="mt-4">
                            <Link
                                href="/forgot-password"
                                className="text-base text-green block font-medium underline underline-offset-4"
                            >
                                Forgot Password ?
                            </Link>
                        </div>
                    </form>

                    <div className="mt-5">
                        <p className="text-base text-gray mb-3">Or log in with</p>
                        <div className="mt-4">
                            <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
                                <Image
                                    src="/assets/icon/google.svg"
                                    width={30}
                                    height={30}
                                    alt="Continue with Google"
                                />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


