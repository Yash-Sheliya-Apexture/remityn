// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth'; // Correct import path using alias
// import { useRouter } from 'next/navigation';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useAuth } from '../../hooks/useAuth'; // Import useAuth
// import Link from "next/link";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { FaExclamation } from "react-icons/fa6";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { VscEye } from "react-icons/vsc";

// export default function RegisterPage() {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const router = useRouter();
//     const { user, loading } = useAuth(); // Get user and loading from AuthContext

//     // Redirect if user is already logged in
//     useEffect(() => {
//         if (!loading && user) {
//             router.push('/dashboard');
//         }
//     }, [user, loading, router]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (password !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }

//         try {
//             await authService.register({ fullName, email, password });
//             router.push('/auth/login?registerSuccess=true');
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     if (loading) { // Add loading state handling
//         return <p>Loading...</p>; // Or a loading spinner
//     }

//     if (user) { // User is already logged in
//         return null; // Redirect is handled by useEffect
//     }


//     return (
//         <div className="flex justify-center items-center min-h-screen px-4">
//             <div className="w-full max-w-md mt-10">
//                 <h2 className="text-3xl text-center text-main font-semibold mb-4">
//                     Create your Wise account
//                 </h2>

//                 <p className="text-base text-center text-gray mb-4">
//                     Already have an account?{" "}
//                     <Link
//                         href="/login"
//                         className="text-green font-medium underline underline-offset-4"
//                     >
//                         Log in
//                     </Link>
//                 </p>


//                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}



//                 <form onSubmit={handleSubmit} className="mt-10 space-y-4">
//                     <div>
//                         <label
//                             htmlFor="fullName"
//                             className="text-base text-gray block capitalize"
//                         >
//                             Full Name
//                         </label>
//                         <input
//                             type="text"
//                             id="fullName"
//                             className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:outline-none hover:shadow-color mt-1 px-4 py-3 transition-shadow"
//                             value={fullName}
//                             onChange={(e) => setFullName(e.target.value)}
//                         />
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="email"
//                             className="text-base text-gray block capitalize"
//                         >
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:outline-none hover:shadow-color mt-1 px-4 py-3 transition-shadow"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="password"
//                             className="text-base text-gray block capitalize"
//                         >
//                             Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:outline-none hover:shadow-color mt-1 px-4 py-3 transition-shadow"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
//                                 onClick={togglePasswordVisibility}
//                             >
//                                 {showPassword ? (
//                                     <RiEyeCloseLine className="text-green size-5" />
//                                 ) : (
//                                     <VscEye className="text-green size-5" />
//                                 )}
//                             </button>
//                         </div>
//                     </div>



//                     <div>
//                         <label
//                             htmlFor="confirmPassword"
//                             className="text-base text-gray block capitalize"
//                         >
//                             Confirm Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 id="confirmPassword"
//                                 className="border border-[#c9cbce] rounded-lg w-full block duration-300 ease-in-out hover:outline-none hover:shadow-color mt-1 px-4 py-3 transition-shadow"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
//                                 onClick={toggleConfirmPasswordVisibility}
//                             >
//                                 {showConfirmPassword ? (
//                                     <RiEyeCloseLine className="text-green size-5" />
//                                 ) : (
//                                     <VscEye className="text-green size-5" />
//                                 )}
//                             </button>
//                         </div>
//                     </div>


//                     {/* Next Button */}
//                     <button
//                         type="submit"
//                         className="bg-lightgreen rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium hover:bg-lightgreen-hover py-2.5 transition-colors"
//                     >
//                         Next
//                     </button>
//                 </form>

//                 <div className="mt-4">
//                     <p className="text-base text-gray mb-3">Or log in with</p>
//                     <div className="mt-4">
//                         <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                             <Image
//                                 src="/assets/icon/google.svg"
//                                 width={30}
//                                 height={30}
//                                 alt="Continue with Google"
//                             />
//                             Continue with Google
//                         </button>
//                     </div>
//                 </div>

//                 <p className="text-center text-gray my-5">
//                     By registering, you accept our{" "}
//                     <Link
//                         href="/terms-and-conditions"
//                         className="text-green font-medium underline underline-offset-4"
//                     >
//                         Terms of use
//                     </Link>{" "}
//                     and{" "}
//                     <Link
//                         href="/privacy-policy-en"
//                         className="text-green font-medium underline underline-offset-4"
//                     >
//                         Privacy Policy
//                     </Link>
//                 </p>

//             </div>
//         </div>
//     );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import authService from '../../services/auth'; // Correct import path using alias
// import { useRouter } from 'next/navigation';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useAuth } from '../../hooks/useAuth'; // Import useAuth
// import Link from "next/link";
// import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
// import { FaExclamation } from "react-icons/fa6";
// import { RiEyeCloseLine } from "react-icons/ri";
// import { VscEye } from "react-icons/vsc";

// export default function RegisterPage() {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const router = useRouter();
//     const { user, loading } = useAuth(); // Get user and loading from AuthContext

//     const [fullNameError, setFullNameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');


//     // Redirect if user is already logged in
//     useEffect(() => {
//         if (!loading && user) {
//             router.push('/dashboard');
//         }
//     }, [user, loading, router]);

//     const validateForm = () => {
//         let isValid = true;

//         if (!fullName.trim()) {
//             setFullNameError('Full Name is required');
//             isValid = false;
//         } else {
//             setFullNameError('');
//         }

//         if (!email.trim()) {
//             setEmailError('Email is required');
//             isValid = false;
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             setEmailError('Invalid email format');
//             isValid = false;
//         } else {
//             setEmailError('');
//         }

//         if (!password.trim()) {
//             setPasswordError('Password is required');
//             isValid = false;
//         } else if (password.length < 6) {
//             setPasswordError('Password must be at least 6 characters');
//             isValid = false;
//         } else {
//             setPasswordError('');
//         }

//         if (!confirmPassword.trim()) {
//             setConfirmPasswordError('Confirm Password is required');
//             isValid = false;
//         } else if (password !== confirmPassword) {
//             setConfirmPasswordError('Passwords do not match');
//             isValid = false;
//         } else {
//             setConfirmPasswordError('');
//         }

//         return isValid;
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (!validateForm()) {
//             return;
//         }


//         try {
//             await authService.register({ fullName, email, password });
//             router.push('/auth/login?registerSuccess=true');
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     if (loading) { // Add loading state handling
//         return <p>Loading...</p>; // Or a loading spinner
//     }

//     if (user) { // User is already logged in
//         return null; // Redirect is handled by useEffect
//     }


//     return (
//         <div className="flex justify-center items-center min-h-screen px-4">
//             <div className="w-full max-w-md mt-10">
//                 <h2 className="text-3xl text-center text-main font-semibold mb-4">
//                     Create your Wise account
//                 </h2>

//                 <p className="text-base text-center text-gray mb-4">
//                     Already have an account?{" "}
//                     <Link
//                         href="/login"
//                         className="text-green font-medium underline underline-offset-4"
//                     >
//                         Log in
//                     </Link>
//                 </p>


//                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}



//                 <form onSubmit={handleSubmit} className="mt-5 space-y-4">
//                     <div>
//                         <label
//                             htmlFor="fullName"
//                             className="text-base text-gray block capitalize"
//                         >
//                             Full Name
//                         </label>
//                         <input
//                             type="text"
//                             id="fullName"
//                             className={`mt-1 block px-4 py-3 w-full border rounded-lg ${fullNameError ? 'border-red-500' : 'border-[#c9cbce]'} hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300`}
//                             value={fullName}
//                             onChange={(e) => setFullName(e.target.value)}
//                         />
//                         {fullNameError && (
//                             <p className="flex text-[#a8200d] text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {fullNameError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="email"
//                             className="text-base text-gray block capitalize"
//                         >
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             className={`mt-1 block px-4 py-3 w-full border rounded-lg ${emailError ? 'border-red-500' : 'border-[#c9cbce]'} hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300`}
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         {emailError && (
//                             <p className="flex text-[#a8200d] text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {emailError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="password"
//                             className="text-base text-gray block capitalize"
//                         >
//                             Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg ${passwordError ? 'border-red-500' : 'border-[#c9cbce]'} hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300`}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
//                                 onClick={togglePasswordVisibility}
//                             >
//                                 {showPassword ? (
//                                     <RiEyeCloseLine className="text-green size-5" />
//                                 ) : (
//                                     <VscEye className="text-green size-5" />
//                                 )}
//                             </button>
//                         </div>
//                         {passwordError && (
//                             <p className="flex text-[#a8200d] text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {passwordError}
//                             </p>
//                         )}
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="confirmPassword"
//                             className="text-base text-gray block capitalize"
//                         >
//                             Confirm Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 id="confirmPassword"
//                                 className={`mt-1 block px-4 py-3 w-full border rounded-lg ${confirmPasswordError ? 'border-red-500' : 'border-[#c9cbce]'} hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300`}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
//                                 onClick={toggleConfirmPasswordVisibility}
//                             >
//                                 {showConfirmPassword ? (
//                                     <RiEyeCloseLine className="text-green size-5" />
//                                 ) : (
//                                     <VscEye className="text-green size-5" />
//                                 )}
//                             </button>
//                         </div>
//                         {confirmPasswordError && (
//                             <p className="flex text-[#a8200d] text-base items-center mt-0.5">
//                                 <span className="mr-1">
//                                     <IoMdCloseCircle className="size-5" />
//                                 </span>
//                                 {confirmPasswordError}
//                             </p>
//                         )}
//                     </div>


//                     {/* Next Button */}
//                     <button
//                         type="submit"
//                         className="bg-lightgreen rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium hover:bg-lightgreen-hover py-2.5 transition-colors"
//                     >
//                         Next
//                     </button>
//                 </form>

//                 <div className="mt-4">
//                     <p className="text-base text-gray mb-3">Or log in with</p>
//                     <div className="mt-4">
//                         <button className="flex bg-white border border-gray justify-center rounded-full text-gray text-md w-full cursor-pointer font-medium gap-4 hover:bg-gray-100 items-center px-4 py-2">
//                             <Image
//                                 src="/assets/icon/google.svg"
//                                 width={30}
//                                 height={30}
//                                 alt="Continue with Google"
//                             />
//                             Continue with Google
//                         </button>
//                     </div>
//                 </div>

//                 <p className="text-center text-gray my-5">
//                     By registering, you accept our{" "}
//                     <Link
//                         href="/terms-and-conditions"
//                         className="text-green font-medium underline underline-offset-4"
//                     >
//                         Terms of use
//                     </Link>{" "}
//                     and{" "}
//                     <Link
//                         href="/privacy-policy-en"
//                         className="text-green font-medium underline underline-offset-4"
//                     >
//                         Privacy Policy
//                     </Link>
//                 </p>

//             </div>
//         </div>
//     );
// }


'use client';

import { useState, useEffect } from 'react';
import authService from '../../services/auth'; // Correct import path using alias
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth'; // Import useAuth
import Link from "next/link";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";
import { FaExclamation } from "react-icons/fa6";
import { RiEyeCloseLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";
import { IoClose } from 'react-icons/io5';


export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const { user, loading } = useAuth(); // Get user and loading from AuthContext

    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const inputBaseClasses = "mt-1 block px-4 py-3 w-full border rounded-lg hover:shadow-color hover:outline-none transition-shadow ease-in-out duration-300";


    // Redirect if user is already logged in
    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    const validateForm = () => {
        let isValid = true;

        if (!fullName.trim()) {
            setFullNameError('Full Name is required');
            isValid = false;
        } else {
            setFullNameError('');
        }

        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirm Password is required');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }


        try {
            await authService.register({ fullName, email, password });
            router.push('/auth/login?registerSuccess=true');
        } catch (err) {
            setError(err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    if (loading) { // Add loading state handling
        return <p>Loading...</p>; // Or a loading spinner
    }

    if (user) { // User is already logged in
        return null; // Redirect is handled by useEffect
    }

    const handleCloseLoginError = () => {
        setLoginError("");
    };


    return (
        <div className="flex justify-center items-center lg:h-[calc(100vh-73px)] px-4">
            <div className="w-full max-w-md lg:mt-20 mt-10 ">
                <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mt-5 mb-4">
                    Create your Wise account
                </h2>

                <p className="text-base text-center text-gray mb-4">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="text-green font-medium underline underline-offset-4"
                    >
                        Log in
                    </Link>
                </p>

                {error && (
                    <div
                        className="flex bg-green/8 p-4 rounded-2xl gap-4 items-center lg:gap-6 relative"
                        role="alert"
                    >
                        <div className="flex bg-[#a8200d] justify-center rounded-full items-center size-12">
                            <IoClose className="p-0.5 text-white size-8" />
                        </div>

                        <div>
                            <span className="text-gray block max-w-60">{error}</span>
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


                <form onSubmit={handleSubmit} className="mt-10 space-y-4">
                    <div>
                        <div className="mt-4">
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
                    </div>
                    <div>
                        <label
                            htmlFor="fullName"
                            className="text-gray text-sm block capitalize"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${fullNameError
                                ? "border-red-500 border-2"
                                : "border-[#c9cbce] hover:shadow-color"
                                }`}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        {fullNameError && (
                            <p className="flex text-[#a8200d] text-base items-center mt-0.5">
                                <span className="mr-1">
                                    <IoMdCloseCircle className="size-5" />
                                </span>
                                {fullNameError}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="text-gray text-sm block capitalize"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${emailError
                                ? "border-red-500 border-2"
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
                            className="text-gray text-sm block capitalize"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${passwordError
                                    ? "border-red-500 border-2"
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
                                {showPassword ? (
                                    <RiEyeCloseLine className="text-green size-5" />
                                ) : (
                                    <VscEye className="text-green size-5" />
                                )}
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

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="text-gray text-sm block capitalize"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                className={`mt-1 block px-4 py-3 w-full border rounded-lg hover:outline-none transition-shadow ease-in-out duration-300 ${confirmPasswordError
                                    ? "border-red-500 border-2"
                                    : "border-[#c9cbce] hover:shadow-color"
                                    }`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? (
                                    <RiEyeCloseLine className="text-green size-5" />
                                ) : (
                                    <VscEye className="text-green size-5" />
                                )}
                            </button>
                        </div>
                        {confirmPasswordError && (
                            <p className="flex text-[#a8200d] text-base items-center mt-0.5">
                                <span className="mr-1">
                                    <IoMdCloseCircle className="size-5" />
                                </span>
                                {confirmPasswordError}
                            </p>
                        )}
                    </div>


                    {/* Next Button */}
                    <button
                        type="submit"
                        className="bg-lightgreen rounded-full text-green text-lg w-full cursor-pointer duration-300 ease-in-out focus:outline-none font-medium hover:bg-lightgreen-hover py-2.5 transition-colors"
                    >
                        Next
                    </button>
                </form>

                <p className="text-center text-gray my-3 text-sm">
                    By registering, you accept our{" "}
                    <Link
                        href="/terms-and-conditions"
                        className="text-green font-medium underline underline-offset-4"
                    >
                        Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy-policy-en"
                        className="text-green font-medium underline underline-offset-4"
                    >
                        Privacy Policy
                    </Link>
                </p>

            </div>
        </div>
    );
}



