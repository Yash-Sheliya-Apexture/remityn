// frontend/src/components/layout/AdminLayout.tsx
'use client'

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader'; // Import AdminHeader

export default function AdminLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/auth/login'); // Redirect to login if not admin or not authenticated
        }
    }, [user, loading, router]);

    if (loading) {
        return <p>Loading admin panel...</p>; // Or a spinner
    }

    if (!user || user.role !== 'admin') {
        return null; // Redirect is handled in useEffect
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar /> {/* Include Sidebar */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader /> {/* Include Header */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6"> {/* Increased padding for main content */}
                    <div className="container mx-auto">
                        {children}
                    </div>
                </main>
                <footer className="bg-gray-300 text-gray-700 p-4 text-center">
                    <p>© {new Date().getFullYear()} Wise Admin Panel. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}