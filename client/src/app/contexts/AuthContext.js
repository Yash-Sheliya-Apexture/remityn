// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';

// const AuthContext = createContext();
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();
//     const logoutTimerRef = useRef(null);
//     const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

//     // Logout function using useRef to maintain stable reference
//     const logout = useCallback((isBroadcastLogout = false) => {
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         if (!isBroadcastLogout && broadcastChannel) {
//             broadcastChannel.postMessage('logout');
//         }
//     }, [broadcastChannel]);

//     // Store logout in ref to maintain stable reference
//     const logoutRef = useRef(logout);
    
//     // Update ref when logout changes
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         logout();
//         router.push('/auth/login?loggedOutInactive=true');
//     }, [logout, router]);

//     // Create the debounced function ONCE using useRef
//     const resetInactivityTimerRef = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             logoutTimerRef.current = setTimeout(() => {
//                 logoutDueToInactivity();
//             }, INACTIVITY_TIMEOUT_MS);
//             console.log("debounced resetInactivityTimer called");
//         }, DEBOUNCE_WAIT_MS)
//     );

//     // Update the debounced function when dependencies change
//     useEffect(() => {
//         resetInactivityTimerRef.current = debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             logoutTimerRef.current = setTimeout(() => {
//                 logoutDueToInactivity();
//             }, INACTIVITY_TIMEOUT_MS);
//             console.log("debounced resetInactivityTimer called");
//         }, DEBOUNCE_WAIT_MS);
//     }, [logoutDueToInactivity]);

//     // Stable resetInactivityTimer function that uses the ref
//     const resetInactivityTimer = useCallback(() => {
//         resetInactivityTimerRef.current();
//     }, []);

//     const login = useCallback((userData, authToken) => {
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         resetInactivityTimer();
//     }, [resetInactivityTimer]);

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             setToken(storedToken);
//             setUser(JSON.parse(storedUser));
//             resetInactivityTimer();
//         }
//         setLoading(false);
//     }, [resetInactivityTimer]);

//     useEffect(() => {
//         if (user && token) {
//             resetInactivityTimer();
//         }
//         return () => { 
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         };
//     }, [user, token, resetInactivityTimer]);

//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event) => {
//             if (event.data === 'logout') {
//                 logoutRef.current(true);
//             }
//         };

//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//     }, [broadcastChannel]);

//     useEffect(() => {
//         if (!user || !token) return; // Only add listeners when logged in
        
//         const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         const handleActivity = resetInactivityTimer;

//         events.forEach(event => window.addEventListener(event, handleActivity));
//         return () => events.forEach(event => window.removeEventListener(event, handleActivity));
//     }, [resetInactivityTimer, user, token]);

//     const contextValue = {
//         user,
//         token,
//         loading,
//         login,
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
// export { AuthContext };



'use client';

import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const AuthContext = createContext();
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
const DEBOUNCE_WAIT_MS = 500;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const logoutTimerRef = useRef(null);
    const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

    // Logout function using useRef to maintain stable reference
    const logout = useCallback((isBroadcastLogout = false) => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
        if (!isBroadcastLogout && broadcastChannel) {
            broadcastChannel.postMessage('logout');
        }
    }, [broadcastChannel]);

    // Store logout in ref to maintain stable reference
    const logoutRef = useRef(logout);

    // Update ref when logout changes
    useEffect(() => {
        logoutRef.current = logout;
    }, [logout]);

    const logoutDueToInactivity = useCallback(() => {
        logout();
        router.push('/auth/login?loggedOutInactive=true');
    }, [logout, router]);

    // Create the debounced function ONCE using useRef
    const resetInactivityTimerRef = useRef(
        debounce(() => {
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = setTimeout(() => {
                logoutDueToInactivity();
            }, INACTIVITY_TIMEOUT_MS);
            console.log("debounced resetInactivityTimer called");
        }, DEBOUNCE_WAIT_MS)
    );

    // Update the debounced function when dependencies change
    useEffect(() => {
        resetInactivityTimerRef.current = debounce(() => {
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = setTimeout(() => {
                logoutDueToInactivity();
            }, INACTIVITY_TIMEOUT_MS);
            console.log("debounced resetInactivityTimer called");
        }, DEBOUNCE_WAIT_MS);
    }, [logoutDueToInactivity]);

    // Stable resetInactivityTimer function that uses the ref
    const resetInactivityTimer = useCallback(() => {
        resetInactivityTimerRef.current();
    }, []);

    const login = useCallback((userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        resetInactivityTimer();
    }, [resetInactivityTimer]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.warn("Error parsing stored user data from localStorage:", e);
                setUser(null);
                localStorage.removeItem('user');
            }
            resetInactivityTimer();
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [resetInactivityTimer]);

    useEffect(() => {
        if (user && token) {
            resetInactivityTimer();
        }
        return () => {
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        };
    }, [user, token, resetInactivityTimer]);

    useEffect(() => {
        if (!broadcastChannel) return;

        const handleBroadcastMessage = (event) => {
            if (event.data === 'logout') {
                logoutRef.current(true);
            }
        };

        broadcastChannel.addEventListener('message', handleBroadcastMessage);
        return () => broadcastChannel.removeEventListener('message', handleBroadcastMessage);
    }, [broadcastChannel]);

    useEffect(() => {
        if (!user || !token) return; // Only add listeners when logged in

        const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
        const handleActivity = resetInactivityTimer;

        events.forEach(event => window.addEventListener(event, handleActivity));
        return () => events.forEach(event => window.removeEventListener(event, handleActivity));
    }, [resetInactivityTimer, user, token]);

    const contextValue = {
        user,
        token,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };



// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';

// const AuthContext = createContext();
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();
//     const logoutTimerRef = useRef(null);
//     const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

//     // Logout function using useRef to maintain stable reference
//     const logout = useCallback((isBroadcastLogout = false) => {
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         if (!isBroadcastLogout && broadcastChannel) {
//             broadcastChannel.postMessage('logout');
//         }
//     }, [broadcastChannel]);

//     // Store logout in ref to maintain stable reference
//     const logoutRef = useRef(logout);
    
//     // Update ref when logout changes
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         logout();
//         router.push('/auth/login?loggedOutInactive=true');
//     }, [logout, router]);

//     // Create the debounced function ONCE using useRef
//     const resetInactivityTimerRef = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             logoutTimerRef.current = setTimeout(() => {
//                 logoutDueToInactivity();
//             }, INACTIVITY_TIMEOUT_MS);
//             console.log("debounced resetInactivityTimer called");
//         }, DEBOUNCE_WAIT_MS)
//     );

//     // Update the debounced function when dependencies change
//     useEffect(() => {
//         resetInactivityTimerRef.current = debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             logoutTimerRef.current = setTimeout(() => {
//                 logoutDueToInactivity();
//             }, INACTIVITY_TIMEOUT_MS);
//             console.log("debounced resetInactivityTimer called");
//         }, DEBOUNCE_WAIT_MS);
//     }, [logoutDueToInactivity]);

//     // Stable resetInactivityTimer function that uses the ref
//     const resetInactivityTimer = useCallback(() => {
//         resetInactivityTimerRef.current();
//     }, []);

//     const login = useCallback((userData, authToken) => {
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         resetInactivityTimer();
//     }, [resetInactivityTimer]);

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             try {
//                 setToken(storedToken);
//                 setUser(JSON.parse(storedUser));
//                 resetInactivityTimer();
//             } catch (error) {
//                 console.error("Error parsing user data from localStorage:", error);
//                 // Handle the error - e.g., clear the localStorage, logout, or display an error message
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');
//                 logout();
//             }
//         }
//         setLoading(false);
//     }, [resetInactivityTimer, logout]);

//     useEffect(() => {
//         if (user && token) {
//             resetInactivityTimer();
//         }
//         return () => { 
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         };
//     }, [user, token, resetInactivityTimer]);

//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event) => {
//             if (event.data === 'logout') {
//                 logoutRef.current(true);
//             }
//         };

//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//     }, [broadcastChannel]);

//     useEffect(() => {
//         if (!user || !token) return; // Only add listeners when logged in
        
//         const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         const handleActivity = resetInactivityTimer;

//         events.forEach(event => window.addEventListener(event, handleActivity));
//         return () => events.forEach(event => window.removeEventListener(event, handleActivity));
//     }, [resetInactivityTimer, user, token]);

//     const contextValue = {
//         user,
//         token,
//         loading,
//         login,
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
// export { AuthContext };