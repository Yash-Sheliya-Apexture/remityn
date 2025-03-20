'use client'; // Make it a client component to use hooks

import { useState, useEffect } from 'react';
import userService from '../services/user'; // Import the user service

export default function HomePage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers(); // Call getAllUsers service function
                setUsers(response); // Update state with the data from the service
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.error('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1>Welcome to the Wise Website!</h1>
            <h2>Users from Backend API:</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.fullName} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
}