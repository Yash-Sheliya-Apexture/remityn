'use client'

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
        <div className="admin-layout">
            <header>
                <h1>Admin Panel</h1>
                {/* Admin navigation */}
            </header>
            <aside>
                {/* Admin sidebar navigation */}
                <ul>
                    <li><a href="/admin">Admin Dashboard</a></li>
                    <li><a href="/admin/users">User Management</a></li>
                    <li><a href="/admin/content">Content Management</a></li>
                    {/* ... other admin links */}
                </ul>
            </aside>
            <main className="admin-content">{children}</main>
            <footer>
                {/* Admin footer */}
            </footer>
        </div>
    );
}