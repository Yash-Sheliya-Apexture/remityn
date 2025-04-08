// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';

// const AuthContext = createContext();
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minute for testing
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
//         console.log('logoutDueToInactivity called - redirecting to login with autoLogout=true');

//         // Use window.location.href for a hard navigation instead of Next.js router
//         // This ensures the query parameter is properly passed and the page fully reloads
//         if (typeof window !== 'undefined') {
//             window.location.href = '/auth/login?autoLogout=true';
//         }
//     }, [logout]);

//     // Create the debounced function ONCE using useRef
//     const resetInactivityTimerRef = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             if (user && token) { // Only set timer if user is logged in
//                 logoutTimerRef.current = setTimeout(() => {
//                     logoutDueToInactivity();
//                 }, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     );

//     // Update the debounced function when dependencies change
//     useEffect(() => {
//         resetInactivityTimerRef.current = debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             if (user && token) { // Only set timer if user is logged in
//                 logoutTimerRef.current = setTimeout(() => {
//                     logoutDueToInactivity();
//                 }, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS);
//     }, [logoutDueToInactivity, user, token]);

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
//             try {
//                 setUser(JSON.parse(storedUser));
//             } catch (e) {
//                 setUser(null);
//                 localStorage.removeItem('user');
//             }
//         } else {
//             setUser(null);
//         }
//         setLoading(false);
//     }, []);

//     // Separate effect to start timer after user/token are set
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



// 'use client'; // THIS LINE IS CRUCIAL - Mark this as a client component

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef,useMemo  } from 'react';
// import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';

// // Define a type for the User object for better type safety (as in your previous corrected code)
// interface User {
//     id: string;
//     fullName: string;
//     email: string;
//     role: string;
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: () => void;
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const router = useRouter();
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

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

//     const logoutRef = useRef(logout);

//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         logout();
//         console.log('logoutDueToInactivity called - redirecting to login with autoLogout=true');

//         if (typeof window !== 'undefined') {
//             window.location.href = '/auth/login?autoLogout=true';
//         }
//     }, [logout]);

//     const resetInactivityTimerRef = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             if (user && token) {
//                 logoutTimerRef.current = setTimeout(() => {
//                     logoutDueToInactivity();
//                 }, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     );

//     useEffect(() => {
//         resetInactivityTimerRef.current = debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             if (user && token) {
//                 logoutTimerRef.current = setTimeout(() => {
//                     logoutDueToInactivity();
//                 }, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS);
//     }, [logoutDueToInactivity, user, token]);

//     const resetInactivityTimer = useCallback(() => {
//         resetInactivityTimerRef.current();
//     }, []);

//     const login = useCallback((userData: User, authToken: string) => {
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
//             try {
//                 setUser(JSON.parse(storedUser));
//             } catch (e) {
//                 setUser(null);
//                 localStorage.removeItem('user');
//             }
//         } else {
//             setUser(null);
//         }
//         setLoading(false);
//     }, []);

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

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 logoutRef.current(true);
//             }
//         };

//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//     }, [broadcastChannel]);

//     useEffect(() => {
//         if (!user || !token) return;

//         const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         const handleActivity = resetInactivityTimer;

//         events.forEach(event => window.addEventListener(event, handleActivity));
//         return () => events.forEach(event => window.removeEventListener(event, handleActivity));
//     }, [resetInactivityTimer, user, token]);

//     const isAdmin = useMemo(() => user && user.role === 'admin', [user]);

//     const contextValue: AuthContextType = {
//         user,
//         token,
//         loading,
//         login,
//         logout,
//         isAdmin,
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>
//     );
// };

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext };



// 'use client'; // THIS LINE IS CRUCIAL - Mark this as a client component

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// // Remove useRouter import if using window.location.href for redirects
// // import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';
// import axios from 'axios'; // Import axios

// // Define a type for the User object
// interface User {
//     // Ensure your user object matches the structure returned by your backend login
//     _id: string; // Changed id to _id to match backend model typically
//     fullName: string;
//     email: string;
//     role: string;
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual') => void; // Add reason parameter
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24 hours (matches token expiration) - Adjust as needed
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     // const router = useRouter(); // Remove if using window.location.href
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

//     // Use a ref for logout to avoid stale closures in interceptors/timers
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});

//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;

//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         // Redirect to login page
//         if (typeof window !== 'undefined' && !isBroadcastLogout) { // Only redirect primary tab
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             // Use window.location.href for a full page reload, ensuring clean state
//             window.location.href = redirectUrl;
//         }
//     }, [broadcastChannel]);

//     // Keep the ref updated with the latest logout function
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out.');
//         logoutRef.current('inactivity');
//     }, []); // Dependency on logoutRef is implicit via the ref itself

//      // Debounced timer reset function using a ref
//      const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             // Only set timer if user is logged in
//             if (localStorage.getItem('token')) { // Check localStorage directly as state might not be updated yet
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000}s)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current; // Get the debounced function from the ref


//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; // Set auth header on login
//         resetInactivityTimerDebounced(); // Start inactivity timer on login
//     }, [resetInactivityTimerDebounced]); // Include dependency

//     // Effect to load initial state from localStorage
//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`; // Set auth header on initial load
//                 resetInactivityTimerDebounced(); // Start timer if logged in from storage
//             } catch (e) {
//                 console.error('Failed to parse stored user. Clearing auth state.');
//                 logoutRef.current('manual', true); // Logout without redirect if user data is corrupted
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization']; // Clear auth header if not logged in
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced]); // Add reset timer dependency


//     // Effect for Axios interceptor
//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response && error.response.status === 401) {
//                     // Check if the error is due to token issues (backend message helps)
//                     const errorMessage = error.response.data?.message || '';
//                      console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
//                     // Trigger logout if token failed or no token provided
//                     if (errorMessage.includes('token failed') || errorMessage.includes('no token') || errorMessage.includes('User not found') ) {
//                        console.log('Detected token failure or missing token. Logging out.');
//                        logoutRef.current('sessionExpired'); // Use ref to call logout with reason
//                     } else {
//                         console.log('401 error, but not a token failure message. Passing error along.');
//                     }
//                 } else {
//                      console.log('Axios interceptor caught non-401 error or error without response.');
//                 }
//                 return Promise.reject(error); // Pass the error along for specific API call handling
//             }
//         );

//         // Clean up the interceptor when the component unmounts
//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // Empty dependency array: Run only once on mount


//     // Effect for broadcast channel listener
//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 // Call logout directly, ensuring it knows it's a broadcast event to prevent redirect loops
//                 logoutRef.current('manual', true);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//             // Consider closing the channel if appropriate, though usually not needed
//             // broadcastChannel.close();
//         };
//     }, [broadcastChannel]);


//     // Effect for user activity listeners
//     useEffect(() => {
//         // Only add listeners if the user is logged in
//         if (!user || !token) {
//             // Ensure timer is cleared if user logs out manually or token expires
//              if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             return;
//         };

//         console.log('Setting up user activity listeners.');
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

//         const handleActivity = () => {
//             // console.log('User activity detected. Resetting inactivity timer.'); // Too noisy, comment out
//             resetInactivityTimerDebounced();
//         };

//         events.forEach(event => window.addEventListener(event, handleActivity, { passive: true }));

//         // Clean up listeners
//         return () => {
//             console.log('Removing user activity listeners.');
//             events.forEach(event => window.removeEventListener(event, handleActivity));
//              resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced call
//              if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current); // Clear the timer on cleanup
//                 console.log('Cleared inactivity timer on activity listener cleanup.');
//             }
//         };
//     }, [user, token, resetInactivityTimerDebounced]); // Rerun if user/token state changes


//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Provide the ref's current function
//         isAdmin,
//     }), [user, token, loading, login, isAdmin]); // Include login in dependencies

//     // Render children only when not loading initial state
//     return (
//         <AuthContext.Provider value={contextValue}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the auth context
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext }; // Export context for direct use if needed


'use client'; // THIS LINE IS CRUCIAL - Mark this as a client component

import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// Remove useRouter import if using window.location.href for redirects
// import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import axios from 'axios'; // Import axios

// Define a type for the User object
interface User {
    // Ensure your user object matches the structure returned by your backend login
    _id: string; // Changed id to _id to match backend model typically
    fullName: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (userData: User, authToken: string) => void;
    logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual') => void; // Add reason parameter
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// --- START OF FIX ---
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes for inactivity logout
// --- END OF FIX ---
const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
const DEBOUNCE_WAIT_MS = 500;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    // const router = useRouter(); // Remove if using window.location.href
    const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

    // Use a ref for logout to avoid stale closures in interceptors/timers
    const logoutRef = useRef<AuthContextType['logout']>(() => {});

    const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
        console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;

        if (!isBroadcastLogout && broadcastChannel) {
            console.log('Broadcasting logout message');
            broadcastChannel.postMessage('logout');
        }

        // Redirect to login page
        if (typeof window !== 'undefined' && !isBroadcastLogout) { // Only redirect primary tab
            console.log('Redirection block entered.'); // Debugging log
            let redirectUrl = '/auth/login';
            if (reason === 'sessionExpired') {
                redirectUrl += '?sessionExpired=true';
            } else if (reason === 'inactivity') {
                 redirectUrl += '?autoLogout=true';
            }
            console.log(`Redirecting to: ${redirectUrl}`);
            // Use window.location.assign for redirection
            window.location.assign(redirectUrl); // <-- CHANGED TO assign
        }
    }, [broadcastChannel]);

    // Keep the ref updated with the latest logout function
    useEffect(() => {
        logoutRef.current = logout;
    }, [logout]);

    const logoutDueToInactivity = useCallback(() => {
        console.log('Inactivity timeout reached. Logging out due to inactivity.'); // Debugging log
        logoutRef.current('inactivity');
    }, []); // Dependency on logoutRef is implicit via the ref itself

     // Debounced timer reset function using a ref
     const resetInactivityTimerDebounced = useRef(
        debounce(() => {
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
            // Only set timer if user is logged in
            if (localStorage.getItem('token')) { // Check localStorage directly as state might not be updated yet
                console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000}s)`);
                logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
            }
        }, DEBOUNCE_WAIT_MS)
    ).current; // Get the debounced function from the ref


    const login = useCallback((userData: User, authToken: string) => {
        console.log('Logging in user:', userData.email);
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; // Set auth header on login
        resetInactivityTimerDebounced(); // Start inactivity timer on login
    }, [resetInactivityTimerDebounced]); // Include dependency

    // Effect to load initial state from localStorage
    useEffect(() => {
        console.log('AuthProvider mounting. Checking localStorage...');
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            console.log('Found token and user in localStorage.');
            setToken(storedToken);
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`; // Set auth header on initial load
                resetInactivityTimerDebounced(); // Start timer if logged in from storage
            } catch (e) {
                console.error('Failed to parse stored user. Clearing auth state.');
                logoutRef.current('manual', true); // Logout without redirect if user data is corrupted
            }
        } else {
            console.log('No token/user found in localStorage.');
            setUser(null);
            setToken(null);
            delete axios.defaults.headers.common['Authorization']; // Clear auth header if not logged in
        }
        setLoading(false);
    }, [resetInactivityTimerDebounced]); // Add reset timer dependency


    // Effect for Axios interceptor
    useEffect(() => {
        console.log('Setting up Axios response interceptor.');
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response, // Pass through successful responses
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Check if the error is due to token issues (backend message helps)
                    const errorMessage = error.response.data?.message || '';
                     console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
                    // Trigger logout if token failed or no token provided
                    if (errorMessage.includes('token failed') || errorMessage.includes('no token') || errorMessage.includes('User not found') ) {
                       console.log('Detected token failure or missing token. Logging out.');
                       logoutRef.current('sessionExpired'); // Use ref to call logout with reason
                    } else {
                        console.log('401 error, but not a token failure message. Passing error along.');
                    }
                } else {
                     console.log('Axios interceptor caught non-401 error or error without response.');
                }
                return Promise.reject(error); // Pass the error along for specific API call handling
            }
        );

        // Clean up the interceptor when the component unmounts
        return () => {
            console.log('Ejecting Axios response interceptor.');
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []); // Empty dependency array: Run only once on mount


    // Effect for broadcast channel listener
    useEffect(() => {
        if (!broadcastChannel) return;

        const handleBroadcastMessage = (event: MessageEvent) => {
            if (event.data === 'logout') {
                console.log('Received logout message via BroadcastChannel.');
                // Call logout directly, ensuring it knows it's a broadcast event to prevent redirect loops
                logoutRef.current('manual', true);
            }
        };

        console.log('Adding BroadcastChannel message listener.');
        broadcastChannel.addEventListener('message', handleBroadcastMessage);
        return () => {
            console.log('Removing BroadcastChannel message listener.');
            broadcastChannel.removeEventListener('message', handleBroadcastMessage);
            // Consider closing the channel if appropriate, though usually not needed
            // broadcastChannel.close();
        };
    }, [broadcastChannel]);


    // Effect for user activity listeners
    useEffect(() => {
        // Only add listeners if the user is logged in
        if (!user || !token) {
            // Ensure timer is cleared if user logs out manually or token expires
             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
            return;
        };

        console.log('Setting up user activity listeners.');
        const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

        const handleActivity = () => {
            // console.log('User activity detected. Resetting inactivity timer.'); // Too noisy, comment out
            resetInactivityTimerDebounced();
        };

        events.forEach(event => window.addEventListener(event, handleActivity, { passive: true }));

        // Clean up listeners
        return () => {
            console.log('Removing user activity listeners.');
            events.forEach(event => window.removeEventListener(event, handleActivity));
             resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced call
             if (logoutTimerRef.current) {
                clearTimeout(logoutTimerRef.current); // Clear the timer on cleanup
                console.log('Cleared inactivity timer on activity listener cleanup.');
            }
        };
    }, [user, token, resetInactivityTimerDebounced]); // Rerun if user/token state changes


    const isAdmin = useMemo(() => user?.role === 'admin', [user]);

    const contextValue: AuthContextType = useMemo(() => ({
        user,
        token,
        loading,
        login,
        logout: logoutRef.current, // Provide the ref's current function
        isAdmin,
    }), [user, token, loading, login, isAdmin]); // Include login in dependencies

    // Render children only when not loading initial state
    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthContext }; // Export context for direct use if needed