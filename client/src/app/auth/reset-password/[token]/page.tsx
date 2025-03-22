'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import authService from '../../../services/auth';
import { IoMdCloseCircle } from 'react-icons/io';
import { VscEye } from 'react-icons/vsc';
import { RiEyeCloseLine } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image'; // Import Image for logo

interface ResetPasswordPageProps {
    params: { token: string };
}

const NewPasswordPage = ({ params }: ResetPasswordPageProps) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [resetError, setResetError] = useState('');
    const [resetSuccess, setResetSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { token } = params;

    useEffect(() => {
        if (!token) {
            setResetError('Invalid reset link.');
        }
    }, [token]);

    const validatePassword = (pw: string) => {
        const errors: string[] = [];
        if (!pw) {
            errors.push('Password is required.');
        }
        if (pw.length < 9) {
            errors.push('Password must be 9 or more characters.');
        }
        if (!/[a-zA-Z]/.test(pw)) {
            errors.push('Password must contain a letter.');
        }
        if (!/\d/.test(pw)) {
            errors.push('Password must contain a number.');
        }
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setConfirmPasswordError('');
        setResetError('');
        setResetSuccess('');

        const passwordValidationErrors = validatePassword(password);
        if (passwordValidationErrors.length > 0) {
            setPasswordError(passwordValidationErrors.join(' '));
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);
        try {
            await authService.resetPassword({ token, password });
            setResetSuccess('Password reset successful! Redirecting to login...');
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (err: any) {
            setResetError(err.message || 'Password reset failed. Please try again.');
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


    return (
        <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-73px)] px-4">
            <div className="w-full max-w-md mt-10">
                <div className="bg-white">
                    <div className='py-3'>
                        <div className='flex justify-center mb-6'>
                            <Image
                                src="/assets/wise-logo-green.svg" // Path to your Wise logo
                                width={120}
                                height={40}
                                alt="Wise Logo"
                            />
                        </div>


                        <h2 className="lg:text-3xl text-2xl text-center text-main font-semibold mb-4">
                            Set your new password
                        </h2>

                        {resetError && (
                            <div
                                className="flex bg-green/8 p-6 rounded-2xl gap-4 items-center lg:gap-6 relative"
                                role="alert"
                            >
                                <div className="flex bg-[#a8200d] justify-center rounded-full items-center size-12">
                                    <IoMdCloseCircle className="p-0.5 text-white size-8" />
                                </div>

                                <div>
                                    <span className="text-gray block max-w-60">{resetError}</span>
                                </div>

                                <button
                                    className="absolute cursor-pointer right-4 top-4"
                                    onClick={handleCloseResetError}
                                >
                                    <IoMdCloseCircle
                                        className="p-1.5 rounded-full text-gray fill-current hover:bg-green/8 size-10"
                                        role="button"
                                    />
                                </button>
                            </div>
                        )}

                        {resetSuccess && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline"> {resetSuccess}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                            <div>
                                <label htmlFor="password" className="text-gray text-sm block capitalize font-medium">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${passwordError
                                            ? "border-red-500 border-2 !shadow-none"
                                            : "border-[#c9cbce] hover:shadow-color"
                                            }`}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
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
                                {!passwordError && password && (
                                    <ul className="mt-2 text-sm text-green-600 dark:text-green-500 list-disc pl-5">
                                        {validatePassword(password).map((err, index) => (
                                            <li key={index} className="text-red-600 dark:text-red-500">{err}</li>
                                        ))}
                                        {validatePassword(password).length === 0 && (
                                            <li className="text-green-600 dark:text-green-500">Password strength good</li>
                                        )}
                                    </ul>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="text-gray text-sm block capitalize font-medium">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirm-password"
                                        className={`mt-1 block px-4 py-3 border w-full rounded-lg transition-shadow ease-in-out duration-300 ${confirmPasswordError
                                            ? "border-red-500 border-2 !shadow-none"
                                            : "border-[#c9cbce] hover:shadow-color"
                                            }`}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="text-gray-500 -translate-y-1/2 absolute focus:outline-none hover:text-gray-700 right-3 top-1/2 transform"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? <RiEyeCloseLine className="text-secondary size-5" /> : <VscEye className="text-secondary size-5" />}
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
                                            Resetting...
                                        </div>
                                    ) : (
                                        'Reset password'
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Go back to <Link href="/auth/login" className="text-secondary font-medium hover:underline dark:text-primary-500">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPasswordPage;