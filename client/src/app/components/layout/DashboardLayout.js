'use client'

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardHeader from '../section/DashboardHeader';

export default function DashboardLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login'); // Redirect to login if not authenticated
        }
    }, [user, loading, router]);

    if (loading) {
        return <p>Loading dashboard...</p>; // Or a spinner
    }

    if (!user) {
        return null; // Redirect is handled in useEffect, so return null here
    }

    return (
        <div className="dashboard-layout">
            <header>
                <DashboardHeader />
            </header>
            <aside>
                {/* Sidebar navigation */}
                <ul>
                    {/* <li><a href="/dashboard">Dashboard Home</a></li>
                    <li><a href="/dashboard/profile">Profile</a></li>
                    <li><a href="/dashboard/settings">Settings</a></li> */}
                    {/* ... other dashboard links */}
                </ul>
            </aside>
            {/* <main className="dashboard-content">{children}</main> */}
            <footer>
                {/* Footer content */}
            </footer>
        </div>
    );
}