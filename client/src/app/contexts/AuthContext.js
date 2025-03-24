<<<<<<< HEAD
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



=======
>>>>>>> 1b4c08eed72df2a3b4d3ca3da1db33d326afa53d
'use client';

import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const AuthContext = createContext();
<<<<<<< HEAD
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
=======
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minute for testing
>>>>>>> 1b4c08eed72df2a3b4d3ca3da1db33d326afa53d
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
<<<<<<< HEAD
        router.push('/auth/login?loggedOutInactive=true');
    }, [logout, router]);
=======
        console.log('logoutDueToInactivity called - redirecting to login with autoLogout=true');
        
        // Use window.location.href for a hard navigation instead of Next.js router
        // This ensures the query parameter is properly passed and the page fully reloads
        if (typeof window !== 'undefined') {
            window.location.href = '/auth/login?autoLogout=true';
        }
    }, [logout]);
>>>>>>> 1b4c08eed72df2a3b4d3ca3da1db33d326afa53d

    // Create the debounced function ONCE using useRef
    const resetInactivityTimerRef = useRef(
        debounce(() => {
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
<<<<<<< HEAD
            logoutTimerRef.current = setTimeout(() => {
                logoutDueToInactivity();
            }, INACTIVITY_TIMEOUT_MS);
            console.log("debounced resetInactivityTimer called");
=======
            if (user && token) { // Only set timer if user is logged in
                logoutTimerRef.current = setTimeout(() => {
                    logoutDueToInactivity();
                }, INACTIVITY_TIMEOUT_MS);
            }
>>>>>>> 1b4c08eed72df2a3b4d3ca3da1db33d326afa53d
        }, DEBOUNCE_WAIT_MS)
    );

    // Update the debounced function when dependencies change
    useEffect(() => {
        resetInactivityTimerRef.current = debounce(() => {
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
<<<<<<< HEAD
            logoutTimerRef.current = setTimeout(() => {
                logoutDueToInactivity();
            }, INACTIVITY_TIMEOUT_MS);
            console.log("debounced resetInactivityTimer called");
        }, DEBOUNCE_WAIT_MS);
    }, [logoutDueToInactivity]);
=======
            if (user && token) { // Only set timer if user is logged in
                logoutTimerRef.current = setTimeout(() => {
                    logoutDueToInactivity();
                }, INACTIVITY_TIMEOUT_MS);
            }
        }, DEBOUNCE_WAIT_MS);
    }, [logoutDueToInactivity, user, token]);
>>>>>>> 1b4c08eed72df2a3b4d3ca3da1db33d326afa53d

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
<<<<<<< HEAD
                console.warn("Error parsing stored user data from localStorage:", e);
                setUser(null);
                localStorage.removeItem('user');
            }
            resetInactivityTimer();
=======
                setUser(null);
                localStorage.removeItem('user');
            }
>>>>>>> 1b4c08eed72df2a3b4d3ca3da1db33d326afa53d
        } else {
            setUser(null);
        }
        setLoading(false);
<<<<<<< HEAD
    }, [resetInactivityTimer]);

=======
    }, []);

    // Separate effect to start timer after user/token are set
>>>>>>> 1b4c08eed72df2a3b4d3ca3da1db33d326afa53d
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
<<<<<<< HEAD
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
=======
export { AuthContext };
>>>>>>> 1b4c08eed72df2a3b4d3ca3da1db33d326afa53d
