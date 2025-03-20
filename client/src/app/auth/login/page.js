'use client';

import { useState, useEffect } from 'react';
import authService from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import Modal from '../../components/ui/Modal'; // Assuming you have a Modal component

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user, loading } = useAuth(); // Get user and loading from useAuth
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inactiveLogoutModalOpen, setInactiveLogoutModalOpen] = useState(false);

    useEffect(() => {
        const loggedOutInactive = searchParams.get('loggedOutInactive');
        if (loggedOutInactive === 'true') {
            setInactiveLogoutModalOpen(true);
        }
    }, [searchParams]);

    // Redirect if user is already logged in
    useEffect(() => {
        if (!loading && user) { // Check if not loading AND user is logged in
            router.push('/dashboard'); // Redirect to dashboard
        }
    }, [user, loading, router]); // Add user, loading, router to dependency array

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { user, token } = await authService.login({ email, password });
            login(user, token);
            router.push('/dashboard');
        } catch (err) {
            setError(err);
        }
    };

    const closeModal = () => {
        setInactiveLogoutModalOpen(false);
        router.replace('/auth/login'); // Remove the query param from URL
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4">

                    {inactiveLogoutModalOpen && (
                        <Modal isOpen={inactiveLogoutModalOpen} onClose={closeModal}>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m-1-1h2.01v2H9.78v-2zm-2-4h2v2H7.78v-2z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6-2H6m12 0h-2m-6 0h-2m6 0H6m6 0h-2M12 6v2m-6-2H6m12 0h-2" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-3 text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Logged out due to inactivity
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            We logged you out because you were inactive for 5 minutes — it’s to help keep your account secure.
                                        </p>
                                    </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <button onClick={closeModal} type="button" className="bg-transparent rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    )}


                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Welcome back.</h2>
                    <p className="text-gray-600 text-center mb-4">New to Wise? <a href="/auth/register" className="text-green-500 hover:underline">Sign up</a></p>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Your email address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Your password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                type="submit"
                            >
                                Log in
                            </button>
                        </div>
                        <div className="text-center">
                            <a className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800" href="#">
                                Trouble logging in?
                            </a>
                        </div>
                    </form>

                    <div className="border-t border-gray-300 pt-6">
                        <p className="text-gray-600 text-center mb-4">Or log in with</p>
                        <div className="flex justify-center space-x-4">
                            <button className="p-2 rounded-full border hover:shadow-md">
                                <FaGoogle className="text-red-500" />
                            </button>
                            <button className="p-2 rounded-full border hover:shadow-md">
                                <FaFacebook className="text-blue-600" />
                            </button>
                            <button className="p-2 rounded-full border hover:shadow-md">
                                <FaApple className="text-gray-800" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}