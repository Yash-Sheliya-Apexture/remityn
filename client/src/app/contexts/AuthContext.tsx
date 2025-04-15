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
// // --- START OF FIX ---
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes for inactivity logout
// // --- END OF FIX ---
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
//             console.log('Redirection block entered.'); // Debugging log
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             // Use window.location.assign for redirection
//             window.location.assign(redirectUrl); // <-- CHANGED TO assign
//         }
//     }, [broadcastChannel]);

//     // Keep the ref updated with the latest logout function
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.'); // Debugging log
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
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes for inactivity logout
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     // const router = useRouter(); // Remove if using window.location.href
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     // --- START OF FIX 1: Memoize broadcastChannel ---
//     // Memoize the broadcast channel initialization to prevent it from causing
//     // dependency changes in useCallback/useEffect hooks on every render.
//     const broadcastChannel = useMemo(() => {
//         if (typeof window !== 'undefined') {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         return null;
//     }, []); // Empty dependency array ensures it's created only once client-side
//     // --- END OF FIX 1 ---

//     // Use a ref for logout to avoid stale closures in interceptors/timers
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});

//     // --- START OF FIX 1 (Explanation): The `logout` function depends on `broadcastChannel`.
//     // By memoizing `broadcastChannel` above, this useCallback hook now has stable dependencies.
//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete axios.defaults.headers.common['Authorization']; // Clear auth header on logout

//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         // Redirect to login page - only if not triggered by broadcast
//         if (typeof window !== 'undefined' && !isBroadcastLogout) {
//             console.log('Redirection block entered.'); // Debugging log
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             // Use window.location.assign for redirection
//             window.location.assign(redirectUrl);
//         }
//     }, [broadcastChannel]); // Dependency on broadcastChannel is now stable
//     // --- END OF FIX 1 (Explanation) ---


//     // Keep the ref updated with the latest logout function
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.'); // Debugging log
//         logoutRef.current('inactivity');
//     }, []); // Dependency on logoutRef is implicit via the ref itself

//      // Debounced timer reset function using a ref
//      const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             // Only set timer if user is logged in
//             if (localStorage.getItem('token')) { // Check localStorage directly
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000}s)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;


//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; // Set auth header on login
//         resetInactivityTimerDebounced(); // Start inactivity timer on login
//     }, [resetInactivityTimerDebounced]);

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
//             // --- START OF FIX 2: Use the error variable in catch block ---
//             } catch (error) { // Changed 'e' to 'error' and log it
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//             // --- END OF FIX 2 ---
//                 logoutRef.current('manual', true); // Logout without redirect if user data is corrupted
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             // Ensure auth state is cleared if nothing found
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced]); // Add reset timer dependency


//     // Effect for Axios interceptor
//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 // Check specifically for 401 Unauthorized
//                 if (error.response && error.response.status === 401) {
//                     const errorMessage = error.response.data?.message || '';
//                     console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);

//                     // Check if we actually have a token stored. If not, it's not a session expiry issue.
//                     const currentToken = localStorage.getItem('token');
//                     if (!currentToken) {
//                         console.log('Caught 401, but no token was stored. Likely accessing protected route while logged out.');
//                          // Don't automatically logout here, let the route handler manage redirection.
//                          // Or, if preferred, redirect manually:
//                          // if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth/login')) {
//                          //    window.location.assign('/auth/login?unauthorized=true');
//                          // }
//                     }
//                     // If a token *is* present, then a 401 likely means it's invalid/expired
//                     else if (errorMessage.includes('token failed') || errorMessage.includes('User not found') || errorMessage.includes('Invalid token')) {
//                        console.log('Detected token failure or invalid token with 401. Logging out.');
//                        logoutRef.current('sessionExpired'); // Use ref to call logout with reason
//                     }
//                      // Handle 'no token' case specifically if backend sends it despite interceptor checking `currentToken`
//                      else if (errorMessage.includes('no token')) {
//                           console.log('Caught 401 with "no token" message, but a token might exist locally? Logging out to be safe.');
//                           logoutRef.current('sessionExpired');
//                      }
//                     else {
//                         console.log('401 error, but not a recognized token failure message. Passing error along.');
//                     }
//                 } else if (error.message === 'Network Error') {
//                      console.error('Network Error caught by interceptor. Could not connect to the server.');
//                      // Optionally handle network errors (e.g., show a notification)
//                 }
//                  else {
//                      console.log('Axios interceptor caught non-401 error or error without response.', error);
//                 }
//                 return Promise.reject(error); // Pass the error along
//             }
//         );

//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // Run only once on mount


//     // Effect for broadcast channel listener
//     // --- START OF FIX 1 (Explanation): This useEffect depends on `broadcastChannel`.
//     // By memoizing `broadcastChannel`, this hook now has stable dependencies.
//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 // Call logout directly, marking it as a broadcast event
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  // Optional: Handle login broadcast if needed (e.g., refresh data in other tabs)
//                  console.log('Received login message via BroadcastChannel. Reloading state from localStorage.');
//                  // Force reload from localStorage to sync state (might cause brief flicker)
//                  const storedToken = localStorage.getItem('token');
//                  const storedUser = localStorage.getItem('user');
//                  if (storedToken && storedUser) {
//                      try {
//                         const parsedUser = JSON.parse(storedUser);
//                         setUser(parsedUser);
//                         setToken(storedToken);
//                         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                         resetInactivityTimerDebounced(); // Start timer in this tab too
//                      } catch (error) {
//                         console.error('Failed to parse stored user after broadcast login.', error);
//                         logoutRef.current('manual', true);
//                      }
//                  }
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//             // Avoid closing the channel here, as other instances might still use it.
//             // It will be garbage collected when all references are gone.
//         };
//     }, [broadcastChannel, resetInactivityTimerDebounced]); // Dependency now stable. Added reset timer dependency.
//     // --- END OF FIX 1 (Explanation) ---


//     // Effect for user activity listeners
//     useEffect(() => {
//         // Only add listeners if the user is logged in
//         if (!user || !token) {
//              if (logoutTimerRef.current) {
//                  clearTimeout(logoutTimerRef.current);
//                  logoutTimerRef.current = null; // Clear timer ref
//                  console.log('Cleared inactivity timer because user is not logged in.');
//              }
//             return; // No need for listeners or timer if not logged in
//         };

//         console.log('Setting up user activity listeners.');
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

//         // Handler that resets the debounced timer function
//         const handleActivity = () => {
//             // console.log('User activity detected. Resetting inactivity timer.'); // Keep commented unless debugging noise
//             resetInactivityTimerDebounced();
//         };

//         // Initial timer start when listeners are added (covers page load/login)
//         resetInactivityTimerDebounced();

//         events.forEach(event => window.addEventListener(event, handleActivity, { passive: true }));

//         // Clean up listeners and the timer itself
//         return () => {
//             console.log('Removing user activity listeners.');
//             events.forEach(event => window.removeEventListener(event, handleActivity));
//              resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced call
//              if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current); // Clear the active timer
//                 logoutTimerRef.current = null; // Clear timer ref
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
//     }), [user, token, loading, login, isAdmin]); // Include login and isAdmin

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



// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// import { debounce } from 'lodash';
// import axios from 'axios';

// // Define a type for the User object
// interface User {
//     _id: string;
//     fullName: string; // Assuming this field exists based on previous context
//     email: string;
//     role: string; // 'admin' or other roles
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean; // Renamed from loadingAuth if that was intended
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual') => void;
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes for inactivity logout
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce activity checks

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true); // This is the loading state
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     // Memoize BroadcastChannel to stabilize dependencies
//     const broadcastChannel = useMemo(() => {
//         if (typeof window !== 'undefined') {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         return null;
//     }, []);

//     // Use a ref for logout to avoid stale closures
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});

//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete axios.defaults.headers.common['Authorization'];

//         // Broadcast logout to other tabs
//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         // Redirect only if not a broadcast logout and running in browser
//         if (typeof window !== 'undefined' && !isBroadcastLogout) {
//             console.log('Redirection block entered for logout.');
//             let redirectUrl = '/auth/login'; // Ensure this path is correct
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             window.location.assign(redirectUrl); // Use assign for redirection
//         }
//     }, [broadcastChannel]); // Stable dependency

//     // Keep logoutRef updated
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.');
//         logoutRef.current('inactivity');
//     }, []); // No external dependencies needed here

//     // Debounced timer reset function
//     const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             // Only set timer if user is actually logged in (check state or localStorage)
//             if (localStorage.getItem('token')) { // More reliable check
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             } else {
//                  console.log('Attempted to reset inactivity timer, but user is not logged in.');
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current; // .current gives the debounced function

//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         // Broadcast login to other tabs
//         if (broadcastChannel) {
//             console.log('Broadcasting login message');
//             broadcastChannel.postMessage('login');
//         }

//         resetInactivityTimerDebounced(); // Start/reset inactivity timer on login
//     }, [broadcastChannel, resetInactivityTimerDebounced]); // Add dependencies

//     // Effect to load initial state from localStorage
//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         setLoading(true); // Start loading
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser: User = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                 resetInactivityTimerDebounced(); // Start timer
//             } catch (error) {
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//                 // Call logout directly to clear state, mark as broadcast to prevent redirect loop if other tabs exist
//                 logoutRef.current('manual', true);
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             // Ensure clean state if nothing found
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false); // Finish loading
//     // Include resetInactivityTimerDebounced in dependency array
//     }, [resetInactivityTimerDebounced]);


//     // Effect for Axios response interceptor
//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response,
//             (error) => {
//                 if (error.response && error.response.status === 401) {
//                     const errorMessage = error.response.data?.message || error.message || '';
//                     console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
//                     const currentToken = localStorage.getItem('token');

//                     if (!currentToken) {
//                         console.log('Caught 401, but no token was stored locally. User likely needs to log in.');
//                         // Decide if redirection is needed here or handled by page/component logic
//                     } else {
//                         // If a token exists, 401 strongly implies it's invalid/expired
//                         console.log('Detected likely token failure (401 with existing local token). Logging out.');
//                         logoutRef.current('sessionExpired'); // Use ref for logout
//                     }
//                 } else if (error.message === 'Network Error') {
//                      console.error('Network Error caught by interceptor. Server connection failed.');
//                      // Potentially show a global notification about connection issues
//                 } else {
//                      console.log('Axios interceptor caught non-401 error or error without response:', error);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // Run only once

//     // Effect for broadcast channel listener
//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 // Logout this tab without causing another broadcast or redirect
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  console.log('Received login message via BroadcastChannel. Reloading state.');
//                  // Reload state from localStorage to sync
//                  const storedToken = localStorage.getItem('token');
//                  const storedUser = localStorage.getItem('user');
//                  setLoading(true); // Indicate loading during sync
//                  if (storedToken && storedUser) {
//                      try {
//                         const parsedUser = JSON.parse(storedUser);
//                         setUser(parsedUser);
//                         setToken(storedToken);
//                         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                         resetInactivityTimerDebounced(); // Start timer in this tab
//                      } catch (error) {
//                         console.error('Failed to parse stored user after broadcast login.', error);
//                         logoutRef.current('manual', true); // Logout if sync fails
//                      }
//                  } else {
//                      // If login broadcast received but no data found, logout this tab
//                      console.warn("Login broadcast received, but no auth data found in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  }
//                  setLoading(false);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//         };
//         // Add resetInactivityTimerDebounced as dependency
//     }, [broadcastChannel, resetInactivityTimerDebounced]);

//     // Effect for user activity listeners
//     useEffect(() => {
//         // Only attach listeners and timer if logged in
//         if (!token || !user) {
//             // Clear any existing timer if user logs out
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//                 logoutTimerRef.current = null;
//                 console.log('Cleared inactivity timer (user logged out).');
//             }
//             return;
//         }

//         console.log('Setting up user activity listeners.');
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

//         const handleActivity = () => {
//             // console.log('Activity detected'); // Reduce console noise
//             resetInactivityTimerDebounced();
//         };

//         // Start the timer initially when listeners are added
//         resetInactivityTimerDebounced();

//         events.forEach(event => window.addEventListener(event, handleActivity, { passive: true }));

//         return () => {
//             console.log('Removing user activity listeners.');
//             events.forEach(event => window.removeEventListener(event, handleActivity));
//             resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced call
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current); // Clear the active timer
//                 logoutTimerRef.current = null;
//                 console.log('Cleared inactivity timer on cleanup.');
//             }
//         };
//         // Rerun when login state changes or the debounced function ref changes (should be stable)
//     }, [user, token, resetInactivityTimerDebounced]);


//     // Memoize isAdmin check
//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // Memoize context value
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading, // Use the correct 'loading' state
//         login,
//         logout: logoutRef.current, // Provide the stable logout function via ref
//         isAdmin,
//     }), [user, token, loading, login, isAdmin]); // Add dependencies

//     // Don't render children until initial loading from localStorage is complete
//     return (
//         <AuthContext.Provider value={contextValue}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the auth context
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) { // Check for undefined specifically
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Export context for potential direct use (though hook is preferred)
// export { AuthContext };


// 'use client';

// import React from 'react';
// import { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// // Ensure you have run: npm install --save-dev @types/lodash OR yarn add --dev @types/lodash
// import debounce from 'lodash/debounce'; // Keep original import, but ensure types are installed
// // Alternatively, try: import { debounce } from 'lodash';
// import axios from 'axios';

// // Define a type for the User object
// interface User {
//     name: string;
//     _id: string;
//     fullName: string; // Assuming this field exists based on previous context
//     email: string;
//     role: string; // 'admin' or other roles
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void; // Added optional flag type
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes for inactivity logout
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce activity checks

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     const broadcastChannel = useMemo(() => {
//         if (typeof window !== 'undefined') {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         return null;
//     }, []);

//     const logoutRef = useRef<AuthContextType['logout']>(() => {});

//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) {
//             // FIX: clearTimeout takes only one argument
//             clearTimeout(logoutTimerRef.current);
//         }
//         logoutTimerRef.current = null;
//         delete axios.defaults.headers.common['Authorization'];

//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         if (typeof window !== 'undefined' && !isBroadcastLogout) {
//             console.log('Redirection block entered for logout.');
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             window.location.assign(redirectUrl);
//         }
//     }, [broadcastChannel]);

//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.');
//         logoutRef.current('inactivity');
//     }, []); // logoutRef is stable, dependency not strictly needed but harmless

//     const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) {
//                 // FIX: clearTimeout takes only one argument
//                 clearTimeout(logoutTimerRef.current);
//             }
//             if (localStorage.getItem('token')) {
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             } else {
//                  console.log('Attempted to reset inactivity timer, but user is not logged in.');
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         if (broadcastChannel) {
//             console.log('Broadcasting login message');
//             broadcastChannel.postMessage('login');
//         }

//         resetInactivityTimerDebounced();
//     }, [broadcastChannel, resetInactivityTimerDebounced]);

//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser: User = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                 resetInactivityTimerDebounced();
//             } catch (error) {
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//                 // Call logout via ref, mark as broadcast to prevent redirect loop
//                 logoutRef.current('manual', true);
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced, logoutRef]); // Added logoutRef dependency


//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response,
//             (error) => {
//                 if (error.response && error.response.status === 401) {
//                     const errorMessage = error.response.data?.message || error.message || '';
//                     console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
//                     const currentToken = localStorage.getItem('token');

//                     if (!currentToken) {
//                         console.log('Caught 401, but no token was stored locally. User likely needs to log in.');
//                     } else {
//                         console.log('Detected likely token failure (401 with existing local token). Logging out.');
//                         logoutRef.current('sessionExpired'); // Use ref for logout
//                     }
//                 } else if (error.message === 'Network Error') {
//                      console.error('Network Error caught by interceptor. Server connection failed.');
//                 } else {
//                      console.log('Axios interceptor caught non-401 error or error without response:', error);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, [logoutRef]);

//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  console.log('Received login message via BroadcastChannel. Reloading state.');
//                  const storedToken = localStorage.getItem('token');
//                  const storedUser = localStorage.getItem('user');
//                  setLoading(true);
//                  if (storedToken && storedUser) {
//                      try {
//                         const parsedUser = JSON.parse(storedUser);
//                         setUser(parsedUser);
//                         setToken(storedToken);
//                         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                         resetInactivityTimerDebounced();
//                      } catch (error) {
//                         console.error('Failed to parse stored user after broadcast login.', error);
//                         logoutRef.current('manual', true);
//                      }
//                  } else {
//                      console.warn("Login broadcast received, but no auth data found in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  }
//                  setLoading(false);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//         };
//     }, [broadcastChannel, resetInactivityTimerDebounced, logoutRef]);

//     useEffect(() => {
//         if (!token || !user) {
//             if (logoutTimerRef.current) {
//                 // FIX: clearTimeout takes only one argument
//                 clearTimeout(logoutTimerRef.current);
//                 logoutTimerRef.current = null;
//                 console.log('Cleared inactivity timer (user logged out).');
//             }
//             return;
//         }

//         console.log('Setting up user activity listeners.');
//         const events: (keyof WindowEventMap | string)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

//         const handleActivity = () => {
//             resetInactivityTimerDebounced();
//         };

//         resetInactivityTimerDebounced();

//         events.forEach(event => window.addEventListener(event as keyof WindowEventMap, handleActivity, { passive: true })); // Cast to satisfy TS for string union

//         return () => {
//             console.log('Removing user activity listeners.');
//             events.forEach(event => window.removeEventListener(event as keyof WindowEventMap, handleActivity)); // Cast to satisfy TS for string union
//             resetInactivityTimerDebounced.cancel();
//             if (logoutTimerRef.current) {
//                 // FIX: clearTimeout takes only one argument
//                 clearTimeout(logoutTimerRef.current);
//                 logoutTimerRef.current = null;
//                 console.log('Cleared inactivity timer on cleanup.');
//             }
//         };
//     }, [user, token, resetInactivityTimerDebounced]);


//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current,
//         isAdmin,
//     }), [user, token, loading, login, isAdmin, logoutRef]);

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext };





// 'use client';

// import React from 'react';
// import { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// // Ensure you have run: npm install --save-dev @types/lodash OR yarn add --dev @types/lodash
// import debounce from 'lodash/debounce'; // Keep original import, but ensure types are installed
// // Alternatively, try: import { debounce } from 'lodash';
// import axios from 'axios';
// // ... imports (React, useState, useEffect, etc.)
// import { useRouter } from 'next/navigation'; // Import useRouter

// // Define a type for the User object
// interface User {
//     name: string;
//     _id: string;
//     fullName: string; // Assuming this field exists based on previous context
//     email: string;
//     role: string; // 'admin' or 'user'
//     kycStatus: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped'; // Add KYC status
//     kycRejectionReason?: string | null; // Optional rejection reason
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void; // Added optional flag type
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>; // Add a function to refetch user data if needed
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes for inactivity logout
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce activity checks

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     const broadcastChannel = useMemo(() => {
//         if (typeof window !== 'undefined') {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         return null;
//     }, []);

//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter(); // <<< Add useRouter

//      // --- Logout Function (Consider KYC redirection logic here too) ---
//      const logout = useCallback(/* ... existing logout logic ... */ (reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) {
//             clearTimeout(logoutTimerRef.current);
//         }
//         logoutTimerRef.current = null;
//         delete axios.defaults.headers.common['Authorization'];

//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         // Redirect logic depends on whether it's a broadcast or direct logout
//         if (typeof window !== 'undefined' && !isBroadcastLogout) {
//             let redirectUrl = '/auth/login'; // Default redirect
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                 redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             // Use router.push for Next.js navigation instead of window.location.assign
//             router.push(redirectUrl);
//         }
//     }, [broadcastChannel, router]); // <<< Add router dependency

//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.');
//         logoutRef.current('inactivity');
//     }, []); // logoutRef is stable, dependency not strictly needed but harmless

//     const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) {
//                 // FIX: clearTimeout takes only one argument
//                 clearTimeout(logoutTimerRef.current);
//             }
//             if (localStorage.getItem('token')) {
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             } else {
//                  console.log('Attempted to reset inactivity timer, but user is not logged in.');
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//     // --- Login Function ---
//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email, 'KYC Status:', userData.kycStatus);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData)); // Store updated user object
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         if (broadcastChannel) {
//             console.log('Broadcasting login message');
//             broadcastChannel.postMessage('login');
//         }

//         // --- KYC Redirection Logic ---
//         // Redirect based on KYC status AFTER successful login
//         // This logic might be better placed in a component that consumes the context
//         // or immediately after the login call completes in the login page.
//         // We'll handle redirection in the login page effect for clarity.

//         resetInactivityTimerDebounced();
//     }, [broadcastChannel, resetInactivityTimerDebounced]);

    
//     // --- Add Refetch User Function ---
//     // Useful if KYC status changes and needs to be updated without full re-login
//     const refetchUser = useCallback(async () => {
//         const storedToken = localStorage.getItem('token');
//         if (!storedToken) {
//             console.log("Refetch failed: No token found.");
//             logoutRef.current('sessionExpired', true); // Logout if token is missing
//             return;
//         }
//         try {
//             setLoading(true);
//              // Assume you have an endpoint like /api/users/me to get current user data
//              // This endpoint MUST return the updated User structure including kycStatus
//             const response = await axios.get('/api/users/me', { // CREATE THIS ENDPOINT
//                  headers: { Authorization: `Bearer ${storedToken}` }
//             });
//             const updatedUserData: User = response.data;
//             console.log("Refetched user data:", updatedUserData);
//             setUser(updatedUserData);
//             localStorage.setItem('user', JSON.stringify(updatedUserData));
//             setLoading(false);
//         } catch (error) {
//             console.error("Failed to refetch user data:", error);
//             // If refetch fails (e.g., 401), log out
//             logoutRef.current('sessionExpired'); // Trigger logout with redirect
//             setLoading(false);
//         }
//     }, [logoutRef]);

//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser: User = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                 resetInactivityTimerDebounced();
//             } catch (error) {
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//                 // Call logout via ref, mark as broadcast to prevent redirect loop
//                 logoutRef.current('manual', true);
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced, logoutRef]); // Added logoutRef dependency


//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response,
//             (error) => {
//                 if (error.response && error.response.status === 401) {
//                     const errorMessage = error.response.data?.message || error.message || '';
//                     console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
//                     const currentToken = localStorage.getItem('token');

//                     if (!currentToken) {
//                         console.log('Caught 401, but no token was stored locally. User likely needs to log in.');
//                     } else {
//                         console.log('Detected likely token failure (401 with existing local token). Logging out.');
//                         logoutRef.current('sessionExpired'); // Use ref for logout
//                     }
//                 } else if (error.message === 'Network Error') {
//                      console.error('Network Error caught by interceptor. Server connection failed.');
//                 } else {
//                      console.log('Axios interceptor caught non-401 error or error without response:', error);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, [logoutRef]);

//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  console.log('Received login message via BroadcastChannel. Reloading state.');
//                  const storedToken = localStorage.getItem('token');
//                  const storedUser = localStorage.getItem('user');
//                  setLoading(true);
//                  if (storedToken && storedUser) {
//                      try {
//                         const parsedUser = JSON.parse(storedUser);
//                         setUser(parsedUser);
//                         setToken(storedToken);
//                         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                         resetInactivityTimerDebounced();
//                      } catch (error) {
//                         console.error('Failed to parse stored user after broadcast login.', error);
//                         logoutRef.current('manual', true);
//                      }
//                  } else {
//                      console.warn("Login broadcast received, but no auth data found in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  }
//                  setLoading(false);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//         };
//     }, [broadcastChannel, resetInactivityTimerDebounced, logoutRef]);

//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser: User = JSON.parse(storedUser);
//                 // Ensure kycStatus exists, provide default if upgrading from old structure
//                 if (!parsedUser.kycStatus) {
//                     parsedUser.kycStatus = 'not_started';
//                 }
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                 resetInactivityTimerDebounced();
//             } catch (error) {
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//                 logoutRef.current('manual', true);
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//              // Ensure user/token are null if nothing is stored
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced]); // Removed logoutRef dep here as it's stable


//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current,
//         isAdmin,
//         refetchUser, // Provide refetch function
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Added refetchUser

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {/* Don't render children until loading is false */}
//             {!loading ? children : <p>Loading application...</p>} {/* Or a global spinner */}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext };



// // frontend/src/app/contexts/AuthContext.tsx
// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// import debounce from 'lodash/debounce';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import apiConfig from '../config/apiConfig'; // Ensure path is correct

// // Define a type for the User object (matching backend structure)
// export interface User {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kyc: { // Embed the KYC subdocument structure
//         status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//         rejectionReason?: string | null;
//         // Include other KYC fields if needed directly in AuthContext user state
//         // firstName?: string;
//         // lastName?: string;
//     };
//     createdAt: string; // Or Date
//     updatedAt: string; // Or Date
// }

// // Simpler type for context value, deriving kycStatus/Reason
// interface UserContextState {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kycStatus: User['kyc']['status']; // Derived status
//     kycRejectionReason?: string | null; // Derived reason
// }

// interface AuthContextType {
//     user: UserContextState | null; // Use the simpler state type here
//     token: string | null;
//     loading: boolean;
//     login: (backendUser: User, authToken: string) => void; // Expect full User object from backend
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// // Axios instance configured for API calls
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<UserContextState | null>(null); // Store simplified state
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter();

//     // Initialize BroadcastChannel only once on the client
//     useEffect(() => {
//         if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         // Cleanup function to close the channel
//         return () => {
//             if (broadcastChannelRef.current) {
//                 console.log('Closing BroadcastChannel');
//                 broadcastChannelRef.current.close();
//                 broadcastChannelRef.current = null;
//             }
//         };
//     }, []);


//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         const wasLoggedIn = !!localStorage.getItem('token'); // Check if user was actually logged in before clearing

//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user'); // Clear stored user data
//         if (logoutTimerRef.current) {
//             clearTimeout(logoutTimerRef.current);
//         }
//         logoutTimerRef.current = null;
//         delete apiClient.defaults.headers.common['Authorization']; // Clear token from axios instance

//         // Broadcast logout only if it wasn't triggered by a broadcast message
//         if (!isBroadcastLogout && broadcastChannelRef.current) {
//             console.log('Broadcasting logout message');
//             try {
//                 broadcastChannelRef.current.postMessage('logout');
//             } catch (error) {
//                 console.error("Broadcast channel postMessage error:", error);
//             }
//         }

//         // Redirect logic: only redirect if the logout wasn't from a broadcast
//         // and if the user was actually logged in before this call.
//         if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn) {
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
//             else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
//             console.log(`Redirecting to: ${redirectUrl}`);
//             router.push(redirectUrl); // Use Next.js router
//         }
//     }, [router]); // No dependency on broadcastChannelRef as it's stable via useRef


//     // Keep logout function reference up-to-date
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached.');
//         logoutRef.current('inactivity');
//     }, []); // logoutRef is stable

//     // Debounced function to reset the inactivity timer
//     const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//             }
//             // Only reset timer if a token exists (user is logged in)
//             if (localStorage.getItem('token')) {
//                  // console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                  logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;


//      // Login function: Expects the full User object from the backend
//      const login = useCallback((backendUser: User, authToken: string) => {
//         if (!backendUser || !backendUser._id || !backendUser.kyc) {
//              console.error("Login failed: Invalid user data received from backend.", backendUser);
//              // Optionally logout or show an error
//              logoutRef.current('manual', true); // Logout without redirect
//              return;
//         }
//         console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status);

//         // Prepare the simplified state for the context
//         const userContextData: UserContextState = {
//             _id: backendUser._id,
//             fullName: backendUser.fullName,
//             email: backendUser.email,
//             role: backendUser.role,
//             kycStatus: backendUser.kyc.status,
//             kycRejectionReason: backendUser.kyc.rejectionReason,
//         };

//         setUser(userContextData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         // Store the full backend user object in localStorage for rehydration
//         localStorage.setItem('user', JSON.stringify(backendUser));

//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; // Set token for axios instance

//         if (broadcastChannelRef.current) {
//             console.log('Broadcasting login message');
//              try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error(e); }
//         }

//         resetInactivityTimerDebounced(); // Start inactivity timer
//         // Redirection logic is handled in the login page component after calling login()
//     }, [resetInactivityTimerDebounced]); // Removed broadcastChannelRef dep


//      // Function to refetch user data from the backend
//      const refetchUser = useCallback(async () => {
//         const storedToken = localStorage.getItem('token');
//         if (!storedToken) {
//             console.log("Refetch failed: No token found.");
//             // logoutRef.current('sessionExpired', true); // Logout without redirect if no token
//             return;
//         }
//         console.log("AuthContext: Refetching user data...");
//         setLoading(true); // Indicate loading during refetch
//         try {
//             // Use the specific /api/dashboard/users/me endpoint
//             const response = await apiClient.get<User>('/dashboard/users/me', {
//                  headers: { Authorization: `Bearer ${storedToken}` }
//             });
//             const updatedBackendUser: User = response.data;

//             if (!updatedBackendUser || !updatedBackendUser._id || !updatedBackendUser.kyc) {
//                  throw new Error("Invalid user data structure received from /users/me");
//             }

//             console.log("Refetched user data:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);

//              // Prepare simplified state
//              const userContextData: UserContextState = {
//                 _id: updatedBackendUser._id,
//                 fullName: updatedBackendUser.fullName,
//                 email: updatedBackendUser.email,
//                 role: updatedBackendUser.role,
//                 kycStatus: updatedBackendUser.kyc.status,
//                 kycRejectionReason: updatedBackendUser.kyc.rejectionReason,
//             };

//             setUser(userContextData); // Update context state
//             // Update the full user object in localStorage
//             localStorage.setItem('user', JSON.stringify(updatedBackendUser));

//         } catch (error: any) {
//             console.error("Failed to refetch user data:", error.response?.data || error.message);
//             // If refetch fails (e.g., 401 Unauthorized), log the user out
//             if (error.response?.status === 401) {
//                 logoutRef.current('sessionExpired'); // Logout with redirect
//             }
//         } finally {
//             setLoading(false); // Finish loading indicator
//         }
//     }, []); // Removed logoutRef dep

//     // Effect for initializing state from localStorage on mount
//     useEffect(() => {
//         console.log('AuthProvider initializing...');
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         const storedUserString = localStorage.getItem('user');
//         let initialUser: UserContextState | null = null;

//         if (storedToken && storedUserString) {
//             console.log('Found token and user in localStorage.');
//             try {
//                 const parsedBackendUser: User = JSON.parse(storedUserString);
//                  // Validate essential fields after parsing
//                 if (parsedBackendUser?._id && parsedBackendUser?.kyc) {
//                     // Prepare the simplified state
//                      initialUser = {
//                         _id: parsedBackendUser._id,
//                         fullName: parsedBackendUser.fullName,
//                         email: parsedBackendUser.email,
//                         role: parsedBackendUser.role,
//                         kycStatus: parsedBackendUser.kyc.status || 'not_started', // Default if missing
//                         kycRejectionReason: parsedBackendUser.kyc.rejectionReason,
//                     };
//                     setToken(storedToken);
//                     apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                     resetInactivityTimerDebounced(); // Start timer
//                 } else {
//                      throw new Error("Stored user data is incomplete or invalid.");
//                 }
//             } catch (error) {
//                 console.error('Failed to parse stored user data. Clearing auth state.', error);
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');
//                 // No need to call logout here, state is already null initially
//             }
//         } else {
//             console.log('No valid token/user found in localStorage.');
//             // Ensure defaults are null
//             setToken(null);
//             delete apiClient.defaults.headers.common['Authorization'];
//         }

//         setUser(initialUser); // Set the initial user state
//         setLoading(false); // Initial load complete
//         console.log('AuthProvider initialization complete. Loading:', false, 'User:', initialUser?.email || 'null');
//     }, [resetInactivityTimerDebounced]); // Only depends on the timer reset function


//      // Effect for handling Axios 401 errors
//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = apiClient.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response?.status === 401) {
//                     console.log(`Axios interceptor caught 401: ${error.config.url}`);
//                     // Check if the error was on the '/users/me' refetch endpoint specifically
//                     // to avoid logout loops if the initial token load fails validation immediately.
//                     const isRefetchError = error.config.url?.endsWith('/dashboard/users/me');

//                     // Only trigger logout if a token *was* present, indicating a likely expired/invalid token
//                     if (localStorage.getItem('token')) {
//                         console.log('Detected token failure (401). Logging out.');
//                         // Trigger logout *with* redirect if it's not an immediate refetch error upon loading
//                         logoutRef.current('sessionExpired', isRefetchError);
//                     } else {
//                          console.log('Caught 401, but no token was present locally.');
//                     }
//                 } else {
//                      // console.log('Axios interceptor caught non-401 error:', error);
//                 }
//                 return Promise.reject(error); // Important to reject the promise
//             }
//         );

//         // Cleanup function to eject the interceptor
//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             apiClient.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // No dependency on logoutRef needed


//     // Effect for handling BroadcastChannel messages
//     useEffect(() => {
//         const channel = broadcastChannelRef.current; // Get the current channel instance
//         if (!channel) return; // Exit if channel is not initialized

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 // Call logout but mark as broadcast to prevent redirect loop
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  console.log('Received login message via BroadcastChannel. Reloading state from localStorage.');
//                  // Re-read from localStorage as the source of truth after another tab logged in
//                  const storedToken = localStorage.getItem('token');
//                  const storedUserString = localStorage.getItem('user');
//                  setLoading(true);
//                  if (storedToken && storedUserString) {
//                      try {
//                         const parsedBackendUser: User = JSON.parse(storedUserString);
//                          if (parsedBackendUser?._id && parsedBackendUser?.kyc) {
//                              const userContextData: UserContextState = { /* ... prepare state ... */
//                                 _id: parsedBackendUser._id,
//                                 fullName: parsedBackendUser.fullName,
//                                 email: parsedBackendUser.email,
//                                 role: parsedBackendUser.role,
//                                 kycStatus: parsedBackendUser.kyc.status || 'not_started',
//                                 kycRejectionReason: parsedBackendUser.kyc.rejectionReason,
//                              };
//                             setUser(userContextData);
//                             setToken(storedToken);
//                             apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                             resetInactivityTimerDebounced();
//                          } else { throw new Error("Invalid stored user data on broadcast login."); }
//                      } catch (error) {
//                         console.error('Failed to process stored data after broadcast login.', error);
//                         logoutRef.current('manual', true); // Logout this tab if data is bad
//                      }
//                  } else {
//                      console.warn("Login broadcast received, but no auth data found in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true); // Logout if data is missing
//                  }
//                  setLoading(false);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         channel.addEventListener('message', handleBroadcastMessage);
//         // Cleanup listener on unmount or channel change
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             channel.removeEventListener('message', handleBroadcastMessage);
//         };
//     }, [resetInactivityTimerDebounced]); // Removed broadcastChannelRef dep, depends on timer

//     // Add activity listeners to reset the timer
//     useEffect(() => {
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         console.log('Adding activity listeners for inactivity timer.');
//         events.forEach(event => window.addEventListener(event, resetInactivityTimerDebounced));

//         // Cleanup listeners
//         return () => {
//             console.log('Removing activity listeners.');
//             events.forEach(event => window.removeEventListener(event, resetInactivityTimerDebounced));
//             resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced calls
//         };
//     }, [resetInactivityTimerDebounced]);


//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // Memoize the context value
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Provide the stable logout function
//         isAdmin,
//         refetchUser,
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Added refetchUser dependency

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {/* Optionally show a global loading indicator */}
//             {loading ? <GlobalLoadingIndicator /> : children}
//         </AuthContext.Provider>
//     );
// };

// // Hook to use the auth context
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Simple global loading component (optional)
// const GlobalLoadingIndicator = () => (
//      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
//          <p>Loading Application...</p>
//          {/* You could use a spinner icon here */}
//      </div>
//  );

// export { AuthContext }; // Export context for direct consumption if needed



// // frontend/src/app/contexts/AuthContext.tsx
// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// import debounce from 'lodash/debounce';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import apiConfig from '../config/apiConfig'; // Ensure path is correct
// import { Loader2 } from 'lucide-react'; // For loading indicator

// // --- Types ---

// // Full User object structure from backend (used internally for fetching)
// export interface User {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kyc: {
//         status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//         rejectionReason?: string | null;
//     };
//     createdAt: string; // Or Date
//     updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context
// // IMPORTANT: This is now only held in React state, NOT localStorage
// interface UserContextState {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kycStatus: User['kyc']['status'];
//     kycRejectionReason?: string | null;
// }

// // AuthContext structure
// interface AuthContextType {
//     user: UserContextState | null; // Still holds the user data in React state
//     token: string | null;          // Token is still managed
//     loading: boolean;              // Indicates if auth state is being determined (fetching user)
//     login: (backendUser: User, authToken: string) => void; // Login still receives full user initially
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>; // Function to manually refresh user data
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// // --- Axios Instance ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
//     const [token, setToken] = useState<string | null>(null);          // Token in React state
//     const [loading, setLoading] = useState<boolean>(true);           // Initial loading is true
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter();

//     // Initialize BroadcastChannel
//     useEffect(() => {
//         if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
//             try {
//                 broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//                  console.log('BroadcastChannel initialized:', BROADCAST_CHANNEL_NAME);
//             } catch (error) {
//                  console.error("Failed to initialize BroadcastChannel:", error);
//             }
//         }
//         return () => {
//             if (broadcastChannelRef.current) {
//                 broadcastChannelRef.current.close();
//                 broadcastChannelRef.current = null;
//                  console.log('BroadcastChannel closed.');
//             }
//         };
//     }, []);

//     // --- Logout Function ---
//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         const wasLoggedIn = !!localStorage.getItem('token'); // Check *before* clearing

//         // Clear React state
//         setUser(null);
//         setToken(null);

//         // Clear localStorage (only token)
//         localStorage.removeItem('token');

//         // Clear timer and Axios header
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete apiClient.defaults.headers.common['Authorization'];

//         // Broadcast if not caused by broadcast
//         if (!isBroadcastLogout && broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting logout message');
//             try { broadcastChannelRef.current.postMessage('logout'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         // Redirect if appropriate
//         if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn) {
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
//             else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
//             console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
//             router.push(redirectUrl);
//         }
//     }, [router]); // router dependency

//     // Keep logout reference updated
//     useEffect(() => { logoutRef.current = logout; }, [logout]);

//     // --- Inactivity Handling ---
//     const logoutDueToInactivity = useCallback(() => {
//         console.log('AuthContext: Inactivity timeout reached.');
//         logoutRef.current('inactivity');
//     }, []); // Stable ref

//     // Debounced function to reset inactivity timer
//     const resetInactivityTimerDebounced = useRef(
//         debounce((currentToken: string | null) => { // Pass current token to check
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//             }
//             // Only reset timer if a token exists
//             if (currentToken) {
//                  // console.log(`AuthContext: Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                  logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;


//     // --- Refetch User Data ---
//     // Used for manual refreshes or broadcast updates
//     const refetchUser = useCallback(async () => {
//         const currentToken = token; // Use token from state
//         if (!currentToken) {
//             console.log("AuthContext: Refetch skipped - no token in state.");
//             if (user !== null) setUser(null); // Ensure user state is cleared if no token
//             return;
//         }
//         console.log("AuthContext: Refetching user data manually...");
//         setLoading(true); // Indicate loading
//         try {
//             const response = await apiClient.get<User>('/dashboard/users/me', {
//                  headers: { Authorization: `Bearer ${currentToken}` }
//             });
//             const updatedBackendUser: User = response.data;
//             if (!updatedBackendUser?._id || !updatedBackendUser?.kyc) {
//                  throw new Error("Invalid user data structure received from /users/me");
//             }
//             console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);
//              const userContextData: UserContextState = {
//                 _id: updatedBackendUser._id,
//                 fullName: updatedBackendUser.fullName,
//                 email: updatedBackendUser.email,
//                 role: updatedBackendUser.role,
//                 kycStatus: updatedBackendUser.kyc.status,
//                 kycRejectionReason: updatedBackendUser.kyc.rejectionReason,
//              };
//             setUser(userContextData); // Update context state
//         } catch (error: any) {
//             console.error("AuthContext: Failed to refetch user data:", error.response?.data?.message || error.message);
//              if (error.response?.status === 401) {
//                 logoutRef.current('sessionExpired'); // Logout with redirect
//              }
//              // Consider clearing user state on other errors too?
//              // else { setUser(null); }
//         } finally {
//             setLoading(false); // Finish loading indicator
//         }
//     }, [token, user]); // Depends on current token and user state

//     // --- Login Function ---
//     const login = useCallback((backendUser: User, authToken: string) => {
//         if (!backendUser?._id || !backendUser?.kyc) {
//              console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//              logoutRef.current('manual', true); // Logout without redirect
//              return;
//         }
//         console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status);

//         const userContextData: UserContextState = {
//             _id: backendUser._id,
//             fullName: backendUser.fullName,
//             email: backendUser.email,
//             role: backendUser.role,
//             kycStatus: backendUser.kyc.status,
//             kycRejectionReason: backendUser.kyc.rejectionReason,
//         };

//         // Update React state
//         setUser(userContextData);
//         setToken(authToken);

//         // Store ONLY token in localStorage
//         localStorage.setItem('token', authToken);

//         // Set Axios header
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         // Broadcast login
//         if (broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting login message');
//              try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         resetInactivityTimerDebounced(authToken); // Pass token to timer reset
//     }, [resetInactivityTimerDebounced]); // Dependencies


//     // --- Initialization Effect (Mount) ---
//     useEffect(() => {
//         console.log('AuthProvider: Initializing state (Mount)...');
//         let isMounted = true; // Flag to prevent state updates after unmount
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');

//         const initializeAuth = async () => {
//             if (storedToken && isMounted) {
//                 console.log('AuthProvider: Found token. Setting token state and fetching user.');
//                 // Set token in state and Axios header *before* fetching
//                 setToken(storedToken);
//                 apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

//                 try {
//                     console.log('AuthProvider: Fetching initial user data...');
//                     // Fetch user data *directly* using the token/header set above
//                     const response = await apiClient.get<User>('/dashboard/users/me');
//                     const fetchedUser: User = response.data;

//                     if (!fetchedUser?._id || !fetchedUser?.kyc) {
//                         throw new Error("Invalid user data structure during init.");
//                     }

//                     if (isMounted) {
//                         const userContextData: UserContextState = {
//                             _id: fetchedUser._id,
//                             fullName: fetchedUser.fullName,
//                             email: fetchedUser.email,
//                             role: fetchedUser.role,
//                             kycStatus: fetchedUser.kyc.status,
//                             kycRejectionReason: fetchedUser.kyc.rejectionReason,
//                         };
//                         setUser(userContextData);
//                         console.log('AuthProvider: Initial user fetch successful.');
//                         resetInactivityTimerDebounced(storedToken); // Start timer after successful fetch
//                     }
//                 } catch (error: any) {
//                     console.error("AuthProvider: Failed to fetch user during init:", error.response?.data?.message || error.message);
//                     if (isMounted) {
//                          // Clear potentially invalid token and state if initial fetch fails
//                         localStorage.removeItem('token');
//                         setToken(null);
//                         setUser(null);
//                         delete apiClient.defaults.headers.common['Authorization'];
//                     }
//                      // Redirect if 401 during init, preventing loops
//                      if (error.response?.status === 401 && typeof window !== 'undefined') {
//                         // Avoid redirecting if already on login page
//                         if (!window.location.pathname.startsWith('/auth/login')) {
//                              console.log("AuthProvider: Redirecting to login due to 401 during init fetch.");
//                              router.push('/auth/login?sessionExpired=true');
//                         }
//                      }
//                 } finally {
//                      if (isMounted) {
//                         console.log("AuthProvider: Initial fetch process complete, setting loading false.");
//                         setLoading(false);
//                      }
//                 }
//             } else {
//                 console.log('AuthProvider: No token found.');
//                 if (isMounted) {
//                      // Ensure clean state if no token
//                      setUser(null);
//                      setToken(null);
//                      delete apiClient.defaults.headers.common['Authorization'];
//                      setLoading(false); // No fetch needed, loading finished
//                 }
//             }
//         };

//         initializeAuth();

//         // Cleanup function
//         return () => {
//             console.log("AuthProvider: Unmounting initialization effect.");
//             isMounted = false;
//         };

//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Empty dependency array for mount effect


//     // --- Axios 401 Interceptor ---
//     useEffect(() => {
//         console.log('AuthProvider: Setting up Axios response interceptor.');
//         const responseInterceptor = apiClient.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response?.status === 401) {
//                     const requestUrl = error.config?.url || 'Unknown URL';
//                     console.log(`Axios interceptor caught 401: ${requestUrl}`);
//                     // Check if a token was actually present when the 401 occurred
//                     // Using localStorage check is okay here for quick verification
//                     if (localStorage.getItem('token')) {
//                         console.log('AuthProvider: Detected token failure (401). Logging out.');
//                         // Use 'sessionExpired' to trigger appropriate message on login page
//                         logoutRef.current('sessionExpired'); // Always redirect on 401 if token was present
//                     } else {
//                          console.log('AuthProvider: Caught 401, but no token was present locally. Ignoring logout.');
//                     }
//                 }
//                 return Promise.reject(error); // Important to reject the promise
//             }
//         );
//         return () => {
//             console.log('AuthProvider: Ejecting Axios response interceptor.');
//             apiClient.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // No dependency on logoutRef needed as it uses the stable ref


//     // --- BroadcastChannel Listener ---
//     useEffect(() => {
//         const channel = broadcastChannelRef.current;
//         if (!channel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('AuthProvider: Received logout message via BroadcastChannel.');
//                  if (user !== null) { // Only logout if currently logged in this tab
//                      logoutRef.current('manual', true); // Logout this tab without redirect
//                  }
//             } else if (event.data === 'login') {
//                  console.log('AuthProvider: Received login message via BroadcastChannel.');
//                  const currentLocalToken = localStorage.getItem('token');
//                  // Refetch if:
//                  // 1. This tab has no token but localStorage now does.
//                  // 2. This tab's token differs from localStorage's token.
//                  if (currentLocalToken && (!token || token !== currentLocalToken)) {
//                      console.log("AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user.");
//                      setToken(currentLocalToken); // Update local token state first
//                      apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentLocalToken}`;
//                      refetchUser(); // Fetch user for the new token
//                  } else if (!currentLocalToken && token) {
//                      // Logged in this tab, but localStorage cleared? Logout this tab.
//                      console.warn("AuthProvider: Login broadcast, but no token in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  } else if (currentLocalToken && token === currentLocalToken && !user) {
//                      // Token matches, but user state is somehow null? Refetch.
//                      console.log("AuthProvider: Token matches after login broadcast, but user state is null. Refetching.");
//                      refetchUser();
//                  }
//             }
//         };

//         console.log('AuthProvider: Adding BroadcastChannel message listener.');
//         channel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('AuthProvider: Removing BroadcastChannel message listener.');
//             if (channel) { // Check if channel still exists before removing listener
//                 channel.removeEventListener('message', handleBroadcastMessage);
//             }
//         };
//     }, [user, token, refetchUser]); // Dependencies


//     // --- Inactivity Event Listeners ---
//     useEffect(() => {
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         // Create the function inside useEffect to capture the current token value
//         const resetTimer = () => resetInactivityTimerDebounced(token);
//         // console.log('AuthProvider: Adding activity listeners.');
//         events.forEach(event => window.addEventListener(event, resetTimer));
//         return () => {
//             // console.log('AuthProvider: Removing activity listeners.');
//             events.forEach(event => window.removeEventListener(event, resetTimer));
//             resetInactivityTimerDebounced.cancel(); // Cancel pending debounced calls
//         };
//     }, [resetInactivityTimerDebounced, token]); // Depend on token now


//     // --- Derived State ---
//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // --- Context Value ---
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Use the stable ref
//         isAdmin,
//         refetchUser,
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Added refetchUser

//     // --- Render ---
//     return (
//         <AuthContext.Provider value={contextValue}>
//              {/* You can keep the GlobalLoadingIndicator or remove it */}
//              {/* It might show briefly during the initial token check/fetch */}
//              {loading && <GlobalLoadingIndicator />}
//              {!loading && children}
//              {/* Or simply: {children} and let consumers check context.loading */}
//         </AuthContext.Provider>
//     );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Optional Global Loading Indicator
// const GlobalLoadingIndicator = () => (
//      <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/90 backdrop-blur-sm">
//          <div className="text-center">
//              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
//              {/* <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p> */}
//          </div>
//      </div>
//  );

// export { AuthContext }; // Export context for direct consumption if needed


// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// import debounce from 'lodash/debounce';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import apiConfig from '../config/apiConfig'; // Ensure path is correct
// import { Loader2 } from 'lucide-react'; // For loading indicator

// // --- Types ---

// // Full User object structure from backend (used internally for fetching)
// export interface User {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kyc: {
//         status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//         rejectionReason?: string | null;
//     };
//     createdAt: string; // Or Date
//     updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context
// // IMPORTANT: This is now only held in React state, NOT localStorage
// interface UserContextState {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kycStatus: User['kyc']['status'];
//     kycRejectionReason?: string | null;
// }

// // AuthContext structure
// interface AuthContextType {
//     user: UserContextState | null; // Still holds the user data in React state
//     token: string | null;          // Token is still managed
//     loading: boolean;              // Indicates if auth state is being determined (fetching user)
//     login: (backendUser: User, authToken: string) => void; // Login still receives full user initially
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>; // Function to manually refresh user data
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// // --- Axios Instance ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
//     const [token, setToken] = useState<string | null>(null);          // Token in React state
//     const [loading, setLoading] = useState<boolean>(true);           // Initial loading is true
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter();

//     // Initialize BroadcastChannel
//     useEffect(() => {
//         if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
//             try {
//                 broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//                  console.log('BroadcastChannel initialized:', BROADCAST_CHANNEL_NAME);
//             } catch (error) {
//                  console.error("Failed to initialize BroadcastChannel:", error);
//             }
//         }
//         return () => {
//             if (broadcastChannelRef.current) {
//                 broadcastChannelRef.current.close();
//                 broadcastChannelRef.current = null;
//                  console.log('BroadcastChannel closed.');
//             }
//         };
//     }, []);

//     // --- Logout Function ---
//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         const wasLoggedIn = !!localStorage.getItem('token'); // Check *before* clearing

//         // Clear React state
//         setUser(null);
//         setToken(null);

//         // Clear localStorage (only token)
//         localStorage.removeItem('token');

//         // Clear timer and Axios header
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete apiClient.defaults.headers.common['Authorization'];

//         // Broadcast if not caused by broadcast
//         if (!isBroadcastLogout && broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting logout message');
//             try { broadcastChannelRef.current.postMessage('logout'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         // Redirect if appropriate (not broadcast, was logged in, and not already on login)
//         if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith('/auth/login')) {
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
//             else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
//             console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
//             router.push(redirectUrl);
//         } else if (!isBroadcastLogout && wasLoggedIn) {
//              console.log(`AuthContext: Logout occurred but already on login page or no window access. No redirect needed.`);
//         }
//     }, [router]); // router dependency

//     // Keep logout reference updated
//     useEffect(() => { logoutRef.current = logout; }, [logout]);

//     // --- Inactivity Handling ---
//     const logoutDueToInactivity = useCallback(() => {
//         console.log('AuthContext: Inactivity timeout reached.');
//         logoutRef.current('inactivity');
//     }, []); // Stable ref

//     // Debounced function to reset inactivity timer
//     const resetInactivityTimerDebounced = useRef(
//         debounce((currentToken: string | null) => { // Pass current token to check
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//             }
//             // Only reset timer if a token exists
//             if (currentToken) {
//                  // console.log(`AuthContext: Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                  logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;


//     // --- Refetch User Data ---
//     // Used for manual refreshes or broadcast updates
//     const refetchUser = useCallback(async () => {
//         const currentToken = token; // Use token from state
//         if (!currentToken) {
//             console.log("AuthContext: Refetch skipped - no token in state.");
//             if (user !== null) {
//                  console.log("AuthContext: Clearing user state as token is missing during refetch.");
//                  setUser(null); // Ensure user state is cleared if no token
//             }
//             return;
//         }
//         console.log("AuthContext: Refetching user data manually...");
//         setLoading(true); // Indicate loading
//         try {
//             // Ensure Authorization header is set for this specific request, just in case
//              apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
//             const response = await apiClient.get<User>('/dashboard/users/me');
//             const updatedBackendUser: User = response.data;

//             if (!updatedBackendUser?._id || !updatedBackendUser?.email || !updatedBackendUser?.kyc) { // Added email check
//                  throw new Error("Invalid user data structure received from /users/me during refetch");
//             }
//             console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);
//              const userContextData: UserContextState = {
//                 _id: updatedBackendUser._id,
//                 fullName: updatedBackendUser.fullName,
//                 email: updatedBackendUser.email,
//                 role: updatedBackendUser.role,
//                 kycStatus: updatedBackendUser.kyc.status,
//                 kycRejectionReason: updatedBackendUser.kyc.rejectionReason,
//              };
//             setUser(userContextData); // Update context state
//         } catch (error: any) {
//             console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
//              if (error.response?.status === 401) {
//                  console.error("AuthContext: 401 error during refetch, initiating logout.");
//                 logoutRef.current('sessionExpired'); // Logout with redirect
//              } else {
//                 // For other errors during refetch, maybe don't clear user state immediately
//                 // as it might be a temporary network issue. Log it.
//                 console.error("AuthContext: Non-401 error during refetch. User state preserved for now.");
//              }
//         } finally {
//             setLoading(false); // Finish loading indicator
//         }
//     }, [token, user]); // Depends on current token and user state

//     // --- Login Function ---
//     const login = useCallback((backendUser: User, authToken: string) => {
//         if (!backendUser?._id || !backendUser?.email || !backendUser?.kyc) { // Added email check
//              console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//              logoutRef.current('manual', true); // Logout without redirect
//              return;
//         }
//         console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status);

//         const userContextData: UserContextState = {
//             _id: backendUser._id,
//             fullName: backendUser.fullName,
//             email: backendUser.email,
//             role: backendUser.role,
//             kycStatus: backendUser.kyc.status,
//             kycRejectionReason: backendUser.kyc.rejectionReason,
//         };

//         // Update React state
//         setUser(userContextData);
//         setToken(authToken);

//         // Store ONLY token in localStorage
//         localStorage.setItem('token', authToken);

//         // Set Axios header
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         // Broadcast login
//         if (broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting login message');
//              try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         resetInactivityTimerDebounced(authToken); // Pass token to timer reset
//     }, [resetInactivityTimerDebounced]); // Dependencies


//     // --- Initialization Effect (Mount) ---
//     useEffect(() => {
//         console.log('AuthProvider: Initializing state (Mount)...');
//         let isMounted = true; // Flag to prevent state updates after unmount
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         console.log(`AuthProvider: Found token in localStorage? ${storedToken ? 'Yes' : 'No'}`);

//         const initializeAuth = async () => {
//             if (storedToken && isMounted) {
//                 console.log('AuthProvider: Token found. Setting token state and Axios header.');
//                 // Set token in state and Axios header *before* fetching
//                 setToken(storedToken);
//                 apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

//                 try {
//                     console.log('AuthProvider: Attempting to fetch initial user data from /dashboard/users/me...');
//                     const response = await apiClient.get<User>('/dashboard/users/me'); // No headers needed, default is set
//                     const fetchedUser: User = response.data;
//                     console.log('AuthProvider: Initial user fetch API call successful.');

//                     if (!fetchedUser?._id || !fetchedUser?.email || !fetchedUser?.kyc) { // Added email check
//                         throw new Error("AuthProvider: Invalid user data structure received during init.");
//                     }

//                     if (isMounted) {
//                         const userContextData: UserContextState = {
//                             _id: fetchedUser._id,
//                             fullName: fetchedUser.fullName,
//                             email: fetchedUser.email,
//                             role: fetchedUser.role,
//                             kycStatus: fetchedUser.kyc.status,
//                             kycRejectionReason: fetchedUser.kyc.rejectionReason,
//                         };
//                         setUser(userContextData);
//                         console.log('AuthProvider: User state updated successfully:', userContextData.email, 'KYC:', userContextData.kycStatus);
//                         resetInactivityTimerDebounced(storedToken); // Start timer after successful fetch
//                     } else {
//                          console.log('AuthProvider: Component unmounted before user state could be set.');
//                     }
//                 } catch (error: any) {
//                     console.error("AuthProvider: Failed to fetch user during init:", error.response?.status, error.response?.data?.message || error.message);
//                     if (isMounted) {
//                          console.log('AuthProvider: Clearing token and user state due to fetch error.');
//                         localStorage.removeItem('token');
//                         setToken(null);
//                         setUser(null);
//                         delete apiClient.defaults.headers.common['Authorization'];
//                         // Redirect if 401 during init, preventing loops
//                          if (error.response?.status === 401 && typeof window !== 'undefined') {
//                             // Avoid redirecting if already on login page
//                             if (!window.location.pathname.startsWith('/auth/login')) {
//                                  console.log("AuthProvider: Redirecting to login due to 401 during init fetch.");
//                                  router.push('/auth/login?sessionExpired=true');
//                             } else {
//                                 console.log("AuthProvider: 401 during init, but already on login page. No redirect.");
//                             }
//                          }
//                     } else {
//                         console.log('AuthProvider: Component unmounted before error handling could complete.');
//                     }
//                 } finally {
//                      if (isMounted) {
//                         console.log("AuthProvider: Initial fetch process complete, setting loading = false.");
//                         setLoading(false);
//                      }
//                 }
//             } else {
//                 console.log('AuthProvider: No token found in localStorage. Setting loading = false.');
//                 if (isMounted) {
//                      // Ensure clean state if no token
//                      setUser(null);
//                      setToken(null);
//                      delete apiClient.defaults.headers.common['Authorization'];
//                      setLoading(false); // No fetch needed, loading finished
//                 }
//             }
//         };

//         initializeAuth();

//         // Cleanup function
//         return () => {
//             console.log("AuthProvider: Unmounting initialization effect.");
//             isMounted = false;
//         };
//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Empty dependency array for mount effect


//     // --- Axios 401 Interceptor ---
//     useEffect(() => {
//         console.log('AuthProvider: Setting up Axios response interceptor.');
//         const responseInterceptor = apiClient.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response?.status === 401) {
//                     const requestUrl = error.config?.url || 'Unknown URL';
//                     console.log(`Axios interceptor caught 401 from request to: ${requestUrl}`);
//                     // Check if a token was actually present when the 401 occurred
//                     // Using localStorage check is okay here for quick verification
//                     if (localStorage.getItem('token')) {
//                         console.log('AuthProvider: Detected token failure (401). Logging out.');
//                         // Use 'sessionExpired' to trigger appropriate message on login page
//                         logoutRef.current('sessionExpired'); // Always redirect on 401 if token was present
//                     } else {
//                          console.log('AuthProvider: Caught 401, but no token was present locally. Ignoring logout.');
//                     }
//                 }
//                 return Promise.reject(error); // Important to reject the promise
//             }
//         );
//         return () => {
//             console.log('AuthProvider: Ejecting Axios response interceptor.');
//             apiClient.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // No dependency on logoutRef needed as it uses the stable ref


//     // --- BroadcastChannel Listener ---
//     useEffect(() => {
//         const channel = broadcastChannelRef.current;
//         if (!channel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('AuthProvider: Received logout message via BroadcastChannel.');
//                  if (user !== null) { // Only logout if currently logged in this tab
//                      console.log('AuthProvider: Performing logout in this tab due to broadcast.');
//                      logoutRef.current('manual', true); // Logout this tab without redirect
//                  } else {
//                       console.log('AuthProvider: Received logout broadcast, but already logged out in this tab.');
//                  }
//             } else if (event.data === 'login') {
//                  console.log('AuthProvider: Received login message via BroadcastChannel.');
//                  const currentLocalToken = localStorage.getItem('token');
//                  // Refetch if:
//                  // 1. This tab has no token but localStorage now does.
//                  // 2. This tab's token differs from localStorage's token.
//                  if (currentLocalToken && (!token || token !== currentLocalToken)) {
//                      console.log("AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user.");
//                      setToken(currentLocalToken); // Update local token state first
//                      apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentLocalToken}`;
//                      refetchUser(); // Fetch user for the new token
//                  } else if (!currentLocalToken && token) {
//                      // Logged in this tab, but localStorage cleared? Logout this tab.
//                      console.warn("AuthProvider: Login broadcast received, but no token in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  } else if (currentLocalToken && token === currentLocalToken && !user) {
//                      // Token matches, but user state is somehow null? Refetch.
//                      console.log("AuthProvider: Token matches after login broadcast, but user state is null. Refetching.");
//                      refetchUser();
//                  } else {
//                      console.log("AuthProvider: Received login broadcast, state seems consistent. No action needed.");
//                  }
//             }
//         };

//         console.log('AuthProvider: Adding BroadcastChannel message listener.');
//         channel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('AuthProvider: Removing BroadcastChannel message listener.');
//             if (channel) { // Check if channel still exists before removing listener
//                 channel.removeEventListener('message', handleBroadcastMessage);
//             }
//         };
//     }, [user, token, refetchUser]); // Dependencies


//     // --- Inactivity Event Listeners ---
//     useEffect(() => {
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         // Create the function inside useEffect to capture the current token value
//         const resetTimer = () => resetInactivityTimerDebounced(token);
//         // console.log('AuthProvider: Adding activity listeners.');
//         events.forEach(event => window.addEventListener(event, resetTimer));
//         return () => {
//             // console.log('AuthProvider: Removing activity listeners.');
//             events.forEach(event => window.removeEventListener(event, resetTimer));
//             resetInactivityTimerDebounced.cancel(); // Cancel pending debounced calls
//         };
//     }, [resetInactivityTimerDebounced, token]); // Depend on token now


//     // --- Derived State ---
//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // --- Context Value ---
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Use the stable ref
//         isAdmin,
//         refetchUser,
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Added refetchUser

//     // --- Render ---
//     return (
//         <AuthContext.Provider value={contextValue}>
//              {/* Global Loading Indicator - shows during initial check */}
//              {loading && <GlobalLoadingIndicator />}
//              {/* Render children only when loading is complete */}
//              {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Optional Global Loading Indicator
// const GlobalLoadingIndicator = () => (
//      <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/90 backdrop-blur-sm" aria-label="Loading session">
//          <div className="text-center">
//              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
//              {/* <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p> */}
//          </div>
//      </div>
//  );

// export { AuthContext }; // Export context for direct consumption if needed


// 'use client';

// import React, {
//     createContext,
//     useState,
//     useEffect,
//     useContext,
//     useCallback,
//     useRef,
//     useMemo,
//     ReactNode // Import ReactNode
// } from 'react';
// import debounce from 'lodash/debounce';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import apiConfig from '../config/apiConfig'; // Ensure path is correct
// import { Loader2 } from 'lucide-react'; // For loading indicator

// // --- Types ---

// // Full User object structure from backend (used internally for fetching)
// export interface User {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kyc: { // Ensure this structure matches your backend response
//         status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//         rejectionReason?: string | null;
//     };
//     createdAt: string; // Or Date
//     updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context
// // IMPORTANT: This is now only held in React state, NOT localStorage
// interface UserContextState {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kycStatus: User['kyc']['status']; // Correctly typed
//     kycRejectionReason?: string | null; // Correctly typed
// }

// // AuthContext structure
// interface AuthContextType {
//     user: UserContextState | null; // Still holds the user data in React state
//     token: string | null;          // Token is still managed
//     loading: boolean;              // Indicates if auth state is being determined (fetching user)
//     login: (backendUser: User, authToken: string) => void; // Login still receives full user initially
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>; // Function to manually refresh user data
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// // --- Axios Instance ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => { // Use ReactNode
//     const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
//     const [token, setToken] = useState<string | null>(null);          // Token in React state
//     const [loading, setLoading] = useState<boolean>(true);           // Initial loading is true
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter();

//     // Initialize BroadcastChannel
//     useEffect(() => {
//         if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
//             try {
//                 broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//                  console.log('BroadcastChannel initialized:', BROADCAST_CHANNEL_NAME);
//             } catch (error) {
//                  console.error("Failed to initialize BroadcastChannel:", error);
//             }
//         }
//         return () => {
//             if (broadcastChannelRef.current) {
//                 broadcastChannelRef.current.close();
//                 broadcastChannelRef.current = null;
//                  console.log('BroadcastChannel closed.');
//             }
//         };
//     }, []);

//     // --- Logout Function ---
//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         const wasLoggedIn = !!localStorage.getItem('token'); // Check *before* clearing

//         // Clear React state
//         setUser(null);
//         setToken(null);

//         // Clear localStorage (only token)
//         localStorage.removeItem('token');

//         // Clear timer and Axios header
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete apiClient.defaults.headers.common['Authorization'];

//         // Broadcast if not caused by broadcast
//         if (!isBroadcastLogout && broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting logout message');
//             try { broadcastChannelRef.current.postMessage('logout'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         // Redirect if appropriate (not broadcast, was logged in, and not already on login)
//         if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith('/auth/login')) {
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
//             else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
//             console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
//             router.push(redirectUrl);
//         } else if (!isBroadcastLogout && wasLoggedIn) {
//              console.log(`AuthContext: Logout occurred but already on login page or no window access. No redirect needed.`);
//         }
//     }, [router]); // router dependency

//     // Keep logout reference updated
//     useEffect(() => { logoutRef.current = logout; }, [logout]);

//     // --- Inactivity Handling ---
//     const logoutDueToInactivity = useCallback(() => {
//         console.log('AuthContext: Inactivity timeout reached.');
//         logoutRef.current('inactivity');
//     }, []); // Stable ref

//     // Debounced function to reset inactivity timer
//     const resetInactivityTimerDebounced = useRef(
//         debounce((currentToken: string | null) => { // Pass current token to check
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//             }
//             // Only reset timer if a token exists
//             if (currentToken) {
//                  // console.log(`AuthContext: Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                  logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;


//     // --- Refetch User Data ---
//     // Used for manual refreshes or broadcast updates
//     const refetchUser = useCallback(async () => {
//         const currentToken = token; // Use token from state
//         if (!currentToken) {
//             console.log("AuthContext: Refetch skipped - no token in state.");
//             if (user !== null) {
//                  console.log("AuthContext: Clearing user state as token is missing during refetch.");
//                  setUser(null); // Ensure user state is cleared if no token
//             }
//             return;
//         }
//         console.log("AuthContext: Refetching user data manually...");
//         // Indicate loading ONLY IF not already loading (prevents flicker if called rapidly)
//         if (!loading) setLoading(true);
//         try {
//             // Ensure Authorization header is set for this specific request, just in case
//              apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
//             const response = await apiClient.get<User>('/dashboard/users/me');
//             const updatedBackendUser: User = response.data;

//             // ---- VERIFY THIS PART (Checks kyc and kyc.status) ----
//             if (!updatedBackendUser?._id || !updatedBackendUser?.email || !updatedBackendUser?.kyc?.status) { // Added email check
//                  throw new Error("Invalid user data structure received from /users/me during refetch");
//             }
//             console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);
//              const userContextData: UserContextState = {
//                 _id: updatedBackendUser._id,
//                 fullName: updatedBackendUser.fullName,
//                 email: updatedBackendUser.email,
//                 role: updatedBackendUser.role,
//                 kycStatus: updatedBackendUser.kyc.status, // Make sure this is assigned
//                 kycRejectionReason: updatedBackendUser.kyc.rejectionReason, // Make sure this is assigned
//              };
//             setUser(userContextData); // Update context state
//             // ---- END VERIFY ----
//         } catch (error: any) {
//             console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
//              if (error.response?.status === 401) {
//                  console.error("AuthContext: 401 error during refetch, initiating logout.");
//                 logoutRef.current('sessionExpired'); // Logout with redirect
//              } else {
//                 // For other errors during refetch, maybe don't clear user state immediately
//                 // as it might be a temporary network issue. Log it.
//                 console.error("AuthContext: Non-401 error during refetch. User state preserved for now.");
//              }
//         } finally {
//             setLoading(false); // Finish loading indicator
//         }
//      // Dependencies: token ensures it runs with the current token,
//      // loading prevents unnecessary setLoading(true) calls.
//      // user is not strictly needed unless logic *inside* depended on the *previous* user state.
//     }, [token, loading]);

//     // --- Login Function ---
//     const login = useCallback((backendUser: User, authToken: string) => {
//         if (!backendUser?._id || !backendUser?.email || !backendUser?.kyc?.status) { // Added email & kyc.status check
//              console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//              logoutRef.current('manual', true); // Logout without redirect
//              return;
//         }
//         console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status);

//         const userContextData: UserContextState = {
//             _id: backendUser._id,
//             fullName: backendUser.fullName,
//             email: backendUser.email,
//             role: backendUser.role,
//             kycStatus: backendUser.kyc.status,
//             kycRejectionReason: backendUser.kyc.rejectionReason,
//         };

//         // Update React state
//         setUser(userContextData);
//         setToken(authToken);

//         // Store ONLY token in localStorage
//         localStorage.setItem('token', authToken);

//         // Set Axios header
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         // Broadcast login
//         if (broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting login message');
//              try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         resetInactivityTimerDebounced(authToken); // Pass token to timer reset
//     }, [resetInactivityTimerDebounced]); // Dependencies


//     // --- Initialization Effect (Mount) ---
//     useEffect(() => {
//         console.log('AuthProvider: Initializing state (Mount)...');
//         let isMounted = true; // Flag to prevent state updates after unmount
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         console.log(`AuthProvider: Found token in localStorage? ${storedToken ? 'Yes' : 'No'}`);

//         const initializeAuth = async () => {
//             if (storedToken && isMounted) {
//                 console.log('AuthProvider: Token found. Setting token state and Axios header.');
//                 // Set token in state and Axios header *before* fetching
//                 setToken(storedToken);
//                 apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

//                 try {
//                     console.log('AuthProvider: Attempting to fetch initial user data from /dashboard/users/me...');
//                     const response = await apiClient.get<User>('/dashboard/users/me'); // No headers needed, default is set
//                     const fetchedUser: User = response.data;
//                     console.log('AuthProvider: Initial user fetch API call successful.');

//                     if (!fetchedUser?._id || !fetchedUser?.email || !fetchedUser?.kyc?.status) { // Added email & kyc.status check
//                         throw new Error("AuthProvider: Invalid user data structure received during init.");
//                     }

//                     if (isMounted) {
//                         const userContextData: UserContextState = {
//                             _id: fetchedUser._id,
//                             fullName: fetchedUser.fullName,
//                             email: fetchedUser.email,
//                             role: fetchedUser.role,
//                             kycStatus: fetchedUser.kyc.status,
//                             kycRejectionReason: fetchedUser.kyc.rejectionReason,
//                         };
//                         setUser(userContextData);
//                         console.log('AuthProvider: User state updated successfully:', userContextData.email, 'KYC:', userContextData.kycStatus);
//                         resetInactivityTimerDebounced(storedToken); // Start timer after successful fetch
//                     } else {
//                          console.log('AuthProvider: Component unmounted before user state could be set.');
//                     }
//                 } catch (error: any) {
//                     console.error("AuthProvider: Failed to fetch user during init:", error.response?.status, error.response?.data?.message || error.message);
//                     if (isMounted) {
//                          console.log('AuthProvider: Clearing token and user state due to fetch error.');
//                         localStorage.removeItem('token');
//                         setToken(null);
//                         setUser(null);
//                         delete apiClient.defaults.headers.common['Authorization'];
//                         // Redirect if 401 during init, preventing loops
//                          if (error.response?.status === 401 && typeof window !== 'undefined') {
//                             // Avoid redirecting if already on login page
//                             if (!window.location.pathname.startsWith('/auth/login')) {
//                                  console.log("AuthProvider: Redirecting to login due to 401 during init fetch.");
//                                  router.push('/auth/login?sessionExpired=true');
//                             } else {
//                                 console.log("AuthProvider: 401 during init, but already on login page. No redirect.");
//                             }
//                          }
//                     } else {
//                         console.log('AuthProvider: Component unmounted before error handling could complete.');
//                     }
//                 } finally {
//                      if (isMounted) {
//                         console.log("AuthProvider: Initial fetch process complete, setting loading = false.");
//                         setLoading(false);
//                      }
//                 }
//             } else {
//                 console.log('AuthProvider: No token found in localStorage. Setting loading = false.');
//                 if (isMounted) {
//                      // Ensure clean state if no token
//                      setUser(null);
//                      setToken(null);
//                      delete apiClient.defaults.headers.common['Authorization'];
//                      setLoading(false); // No fetch needed, loading finished
//                 }
//             }
//         };

//         initializeAuth();

//         // Cleanup function
//         return () => {
//             console.log("AuthProvider: Unmounting initialization effect.");
//             isMounted = false;
//         };
//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Empty dependency array for mount effect


//     // --- Axios 401 Interceptor ---
//     useEffect(() => {
//         console.log('AuthProvider: Setting up Axios response interceptor.');
//         const responseInterceptor = apiClient.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response?.status === 401) {
//                     const requestUrl = error.config?.url || 'Unknown URL';
//                     console.log(`Axios interceptor caught 401 from request to: ${requestUrl}`);
//                     // Check if a token was actually present when the 401 occurred
//                     // Using localStorage check is okay here for quick verification
//                     if (localStorage.getItem('token')) {
//                         console.log('AuthProvider: Detected token failure (401). Logging out.');
//                         // Use 'sessionExpired' to trigger appropriate message on login page
//                         logoutRef.current('sessionExpired'); // Always redirect on 401 if token was present
//                     } else {
//                          console.log('AuthProvider: Caught 401, but no token was present locally. Ignoring logout.');
//                     }
//                 }
//                 return Promise.reject(error); // Important to reject the promise
//             }
//         );
//         return () => {
//             console.log('AuthProvider: Ejecting Axios response interceptor.');
//             apiClient.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // No dependency on logoutRef needed as it uses the stable ref


//     // --- BroadcastChannel Listener ---
//     useEffect(() => {
//         const channel = broadcastChannelRef.current;
//         if (!channel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('AuthProvider: Received logout message via BroadcastChannel.');
//                  if (user !== null) { // Only logout if currently logged in this tab
//                      console.log('AuthProvider: Performing logout in this tab due to broadcast.');
//                      logoutRef.current('manual', true); // Logout this tab without redirect
//                  } else {
//                       console.log('AuthProvider: Received logout broadcast, but already logged out in this tab.');
//                  }
//             } else if (event.data === 'login') {
//                  console.log('AuthProvider: Received login message via BroadcastChannel.');
//                  const currentLocalToken = localStorage.getItem('token');
//                  // Refetch if:
//                  // 1. This tab has no token but localStorage now does.
//                  // 2. This tab's token differs from localStorage's token.
//                  if (currentLocalToken && (!token || token !== currentLocalToken)) {
//                      console.log("AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user.");
//                      setToken(currentLocalToken); // Update local token state first
//                      apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentLocalToken}`;
//                      refetchUser(); // Fetch user for the new token
//                  } else if (!currentLocalToken && token) {
//                      // Logged in this tab, but localStorage cleared? Logout this tab.
//                      console.warn("AuthProvider: Login broadcast received, but no token in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  } else if (currentLocalToken && token === currentLocalToken && !user) {
//                      // Token matches, but user state is somehow null? Refetch.
//                      console.log("AuthProvider: Token matches after login broadcast, but user state is null. Refetching.");
//                      refetchUser();
//                  } else {
//                      console.log("AuthProvider: Received login broadcast, state seems consistent. No action needed.");
//                  }
//             }
//         };

//         console.log('AuthProvider: Adding BroadcastChannel message listener.');
//         channel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('AuthProvider: Removing BroadcastChannel message listener.');
//             if (channel) { // Check if channel still exists before removing listener
//                 channel.removeEventListener('message', handleBroadcastMessage);
//             }
//         };
//     }, [user, token, refetchUser]); // Dependencies


//     // --- Inactivity Event Listeners ---
//     useEffect(() => {
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         // Create the function inside useEffect to capture the current token value
//         const resetTimer = () => resetInactivityTimerDebounced(token);
//         // console.log('AuthProvider: Adding activity listeners.');
//         events.forEach(event => window.addEventListener(event, resetTimer));
//         return () => {
//             // console.log('AuthProvider: Removing activity listeners.');
//             events.forEach(event => window.removeEventListener(event, resetTimer));
//             resetInactivityTimerDebounced.cancel(); // Cancel pending debounced calls
//         };
//     }, [resetInactivityTimerDebounced, token]); // Depend on token now


//     // --- Derived State ---
//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // --- Context Value ---
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Use the stable ref
//         isAdmin,
//         refetchUser, // Include refetchUser in the context value
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Add refetchUser dependency

//     // --- Render ---
//     return (
//         <AuthContext.Provider value={contextValue}>
//              {/* Global Loading Indicator - shows during initial check */}
//              {loading && <GlobalLoadingIndicator />}
//              {/* Render children only when loading is complete */}
//              {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Optional Global Loading Indicator
// const GlobalLoadingIndicator = () => (
//      <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/90 backdrop-blur-sm" aria-label="Loading session">
//          <div className="text-center">
//              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
//              {/* <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p> */}
//          </div>
//      </div>
//  );

// export { AuthContext }; // Export context for direct consumption if needed


'use client';

import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
    useRef,
    useMemo,
    ReactNode // Import ReactNode
} from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import apiConfig from '../config/apiConfig'; // Ensure path is correct
import { Loader2 } from 'lucide-react'; // For loading indicator

// --- Types ---

// Full User object structure from backend (used internally for fetching)
export interface User {
    _id: string;
    fullName: string;
    email: string;
    role: 'user' | 'admin';
    kyc: { // Ensure this structure matches your backend response
        status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
        rejectionReason?: string | null;
    };
    createdAt: string; // Or Date
    updatedAt: string; // Or Date
}

// Simplified User state exposed by the context
// IMPORTANT: This is now only held in React state, NOT localStorage
interface UserContextState {
    _id: string;
    fullName: string;
    email: string;
    role: 'user' | 'admin';
    kycStatus: User['kyc']['status']; // Correctly typed
    kycRejectionReason?: string | null; // Correctly typed
}

// AuthContext structure
interface AuthContextType {
    user: UserContextState | null; // Still holds the user data in React state
    token: string | null;          // Token is still managed
    loading: boolean;              // Indicates if auth state is being determined (fetching user)
    login: (backendUser: User, authToken: string) => void; // Login still receives full user initially
    logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
    isAdmin: boolean;
    refetchUser: () => Promise<void>; // Function to manually refresh user data
}

// --- Context Setup ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// --- Axios Instance ---
const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
});

// --- Auth Provider Component ---
export const AuthProvider = ({ children }: { children: ReactNode }) => { // Use ReactNode
    const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
    const [token, setToken] = useState<string | null>(null);          // Token in React state
    const [loading, setLoading] = useState<boolean>(true);           // Initial loading is true
    const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
    const logoutRef = useRef<AuthContextType['logout']>(() => {});
    const router = useRouter();

    // Initialize BroadcastChannel
    useEffect(() => {
        if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
            try {
                broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
                 console.log('AuthContext: BroadcastChannel initialized:', BROADCAST_CHANNEL_NAME);
            } catch (error) {
                 console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
            }
        }
        return () => {
            if (broadcastChannelRef.current) {
                broadcastChannelRef.current.close();
                broadcastChannelRef.current = null;
                 console.log('AuthContext: BroadcastChannel closed.');
            }
        };
    }, []);

    // --- Logout Function ---
    const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
        console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
        const wasLoggedIn = !!localStorage.getItem('token'); // Check *before* clearing

        // Clear React state
        setUser(null);
        setToken(null);

        // Clear localStorage (only token)
        localStorage.removeItem('token');

        // Clear timer and Axios header
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
        delete apiClient.defaults.headers.common['Authorization'];

        // Broadcast if not caused by broadcast
        if (!isBroadcastLogout && broadcastChannelRef.current) {
            console.log('AuthContext: Broadcasting logout message');
            try { broadcastChannelRef.current.postMessage('logout'); } catch (e) { console.error("AuthContext: BC postMessage error:", e); }
        }

        // Redirect if appropriate (not broadcast, was logged in, and not already on login)
        if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith('/auth/login')) {
            let redirectUrl = '/auth/login';
            if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
            else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
            console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
            router.push(redirectUrl);
        } else if (!isBroadcastLogout && wasLoggedIn) {
             console.log(`AuthContext: Logout occurred but already on login page or no window access. No redirect needed.`);
        }
    }, [router]); // router dependency

    // Keep logout reference updated
    useEffect(() => { logoutRef.current = logout; }, [logout]);

    // --- Inactivity Handling ---
    const logoutDueToInactivity = useCallback(() => {
        console.log('AuthContext: Inactivity timeout reached.');
        logoutRef.current('inactivity');
    }, []); // Stable ref

    // Debounced function to reset inactivity timer
    const resetInactivityTimerDebounced = useRef(
        debounce((currentToken: string | null) => { // Pass current token to check
            if (logoutTimerRef.current) {
                clearTimeout(logoutTimerRef.current);
            }
            // Only reset timer if a token exists
            if (currentToken) {
                 // console.log(`AuthContext: Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
            }
        }, DEBOUNCE_WAIT_MS)
    ).current;


    // --- Refetch User Data ---
    // Used for manual refreshes or broadcast updates
    const refetchUser = useCallback(async () => {
        const currentToken = token; // Use token from state at the time of call
        if (!currentToken) {
            console.log("AuthContext: Refetch skipped - no token in state.");
            if (user !== null) {
                 console.log("AuthContext: Clearing user state as token is missing during refetch.");
                 setUser(null); // Ensure user state is cleared if no token
            }
            return;
        }
        console.log("AuthContext: Refetching user data...");
        // Indicate loading ONLY IF not already loading (prevents flicker if called rapidly)
        if (!loading) setLoading(true);
        try {
            // Ensure Authorization header is set for this specific request
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
            const response = await apiClient.get<User>('/dashboard/users/me');
            const updatedBackendUser: User = response.data;

             // Validate the received structure (important!)
             if (!updatedBackendUser?._id || !updatedBackendUser?.email || !updatedBackendUser?.kyc || typeof updatedBackendUser?.kyc?.status === 'undefined') {
                 throw new Error("Invalid user data structure received from /users/me during refetch");
            }
            console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status, "Reason:", updatedBackendUser.kyc.rejectionReason);

             // Create the state structure directly from the FULL fetched user data
             const userContextData: UserContextState = {
                _id: updatedBackendUser._id,
                fullName: updatedBackendUser.fullName,
                email: updatedBackendUser.email,
                role: updatedBackendUser.role,
                kycStatus: updatedBackendUser.kyc.status, // Direct assignment
                kycRejectionReason: updatedBackendUser.kyc.rejectionReason, // Direct assignment
             };
            setUser(userContextData); // Update context state WITH THE LATEST DATA
            // --- End Refetch Update ---

        } catch (error: any) {
            console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
             if (error.response?.status === 401) {
                 console.error("AuthContext: 401 error during refetch, initiating logout.");
                logoutRef.current('sessionExpired'); // Logout with redirect
             } else {
                // For other errors during refetch, log it but maybe don't clear state immediately
                console.error("AuthContext: Non-401 error during refetch. User state preserved for now.");
             }
        } finally {
             // Ensure loading is false even if called when already loading=false
             setLoading(false);
        }
     // Dependencies: token ensures it runs with the current token state.
     // loading helps prevent rapid setLoading(true) calls.
     // user is NOT needed as a dependency here; we only care about the token.
    }, [token, loading]);

    // --- Login Function ---
    const login = useCallback((backendUser: User, authToken: string) => {
         // Validate the incoming user object rigorously
         if (!backendUser?._id || !backendUser?.email || !backendUser?.kyc || typeof backendUser?.kyc?.status === 'undefined') {
             console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
             logoutRef.current('manual', true); // Logout without redirect (internal error)
             return;
        }
        console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status, 'Reason:', backendUser.kyc.rejectionReason);

         // Create state directly from the provided full User object
         const userContextData: UserContextState = {
            _id: backendUser._id,
            fullName: backendUser.fullName,
            email: backendUser.email,
            role: backendUser.role,
            kycStatus: backendUser.kyc.status,
            kycRejectionReason: backendUser.kyc.rejectionReason,
        };

        // Update React state
        setUser(userContextData);
        setToken(authToken);

        // Store ONLY token in localStorage
        localStorage.setItem('token', authToken);

        // Set Axios header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

        // Broadcast login
        if (broadcastChannelRef.current) {
            console.log('AuthContext: Broadcasting login message');
             try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error("AuthContext: BC postMessage error:", e); }
        }

        resetInactivityTimerDebounced(authToken); // Pass token to timer reset
    }, [resetInactivityTimerDebounced]); // Dependencies


    // --- Initialization Effect (Mount) ---
    useEffect(() => {
        console.log('AuthProvider: Initializing state (Mount)...');
        let isMounted = true; // Flag to prevent state updates after unmount
        setLoading(true);
        const storedToken = localStorage.getItem('token');
        console.log(`AuthProvider: Found token in localStorage? ${storedToken ? 'Yes' : 'No'}`);

        const initializeAuth = async () => {
            if (storedToken && isMounted) {
                console.log('AuthProvider: Token found. Setting token state and Axios header.');
                // Set token in state and Axios header *before* fetching
                setToken(storedToken);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

                try {
                    console.log('AuthProvider: Attempting to fetch initial user data from /dashboard/users/me...');
                    const response = await apiClient.get<User>('/dashboard/users/me');
                    const fetchedUser: User = response.data;
                    console.log('AuthProvider: Initial user fetch API call successful.');

                     // Validate the received structure (important!)
                     if (!fetchedUser?._id || !fetchedUser?.email || !fetchedUser?.kyc || typeof fetchedUser?.kyc?.status === 'undefined') {
                        throw new Error("AuthProvider: Invalid user data structure received during init.");
                    }

                    if (isMounted) {
                         // Create state directly from the fetched user data
                         const userContextData: UserContextState = {
                            _id: fetchedUser._id,
                            fullName: fetchedUser.fullName,
                            email: fetchedUser.email,
                            role: fetchedUser.role,
                            kycStatus: fetchedUser.kyc.status,
                            kycRejectionReason: fetchedUser.kyc.rejectionReason,
                        };
                        setUser(userContextData);
                        console.log('AuthProvider: User state updated successfully:', userContextData.email, 'KYC:', userContextData.kycStatus);
                        resetInactivityTimerDebounced(storedToken); // Start timer after successful fetch
                    } else {
                         console.log('AuthProvider: Component unmounted before user state could be set.');
                    }
                } catch (error: any) {
                    console.error("AuthProvider: Failed to fetch user during init:", error.response?.status, error.response?.data?.message || error.message);
                    if (isMounted) {
                         console.log('AuthProvider: Clearing token and user state due to fetch error.');
                        localStorage.removeItem('token');
                        setToken(null);
                        setUser(null);
                        delete apiClient.defaults.headers.common['Authorization'];
                        // Redirect if 401 during init, preventing loops
                         if (error.response?.status === 401 && typeof window !== 'undefined') {
                            if (!window.location.pathname.startsWith('/auth/login')) {
                                 console.log("AuthProvider: Redirecting to login due to 401 during init fetch.");
                                 router.push('/auth/login?sessionExpired=true');
                            } else {
                                console.log("AuthProvider: 401 during init, but already on login page. No redirect.");
                            }
                         }
                    } else {
                        console.log('AuthProvider: Component unmounted before error handling could complete.');
                    }
                } finally {
                     if (isMounted) {
                        console.log("AuthProvider: Initial fetch process complete, setting loading = false.");
                        setLoading(false);
                     }
                }
            } else {
                console.log('AuthProvider: No token found in localStorage. Setting loading = false.');
                if (isMounted) {
                     // Ensure clean state if no token
                     setUser(null);
                     setToken(null);
                     delete apiClient.defaults.headers.common['Authorization'];
                     setLoading(false); // No fetch needed, loading finished
                }
            }
        };

        initializeAuth();

        // Cleanup function
        return () => {
            console.log("AuthProvider: Unmounting initialization effect.");
            isMounted = false;
        };
    // Run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array for mount effect


    // --- Axios 401 Interceptor ---
    useEffect(() => {
        console.log('AuthProvider: Setting up Axios response interceptor.');
        const responseInterceptor = apiClient.interceptors.response.use(
            (response) => response, // Pass through successful responses
            (error) => {
                if (error.response?.status === 401) {
                    const requestUrl = error.config?.url || 'Unknown URL';
                    console.log(`Axios interceptor caught 401 from request to: ${requestUrl}`);
                    // Check if a token was actually present when the 401 occurred
                    // Using localStorage check is okay here for quick verification
                    if (localStorage.getItem('token')) {
                        console.log('AuthProvider: Detected token failure (401). Logging out.');
                        // Use 'sessionExpired' to trigger appropriate message on login page
                        logoutRef.current('sessionExpired'); // Always redirect on 401 if token was present
                    } else {
                         console.log('AuthProvider: Caught 401, but no token was present locally. Ignoring logout.');
                    }
                }
                return Promise.reject(error); // Important to reject the promise
            }
        );
        return () => {
            console.log('AuthProvider: Ejecting Axios response interceptor.');
            apiClient.interceptors.response.eject(responseInterceptor);
        };
    }, []); // No dependency on logoutRef needed as it uses the stable ref


    // --- BroadcastChannel Listener ---
    useEffect(() => {
        const channel = broadcastChannelRef.current;
        if (!channel) return;

        const handleBroadcastMessage = (event: MessageEvent) => {
             const localTokenBeforeAction = token; // Capture token state before potential async update
             const localUserBeforeAction = user; // Capture user state

            if (event.data === 'logout') {
                console.log('AuthProvider: Received logout message via BroadcastChannel.');
                 // Use captured state to check if logout is needed
                 if (localUserBeforeAction !== null) {
                     console.log('AuthProvider: Performing logout in this tab due to broadcast.');
                     logoutRef.current('manual', true); // Logout this tab without redirect
                 } else {
                      console.log('AuthProvider: Received logout broadcast, but already logged out in this tab.');
                 }
            } else if (event.data === 'login') {
                 console.log('AuthProvider: Received login message via BroadcastChannel.');
                 const currentLocalTokenInStorage = localStorage.getItem('token');
                 // Refetch if:
                 // 1. This tab has no token BUT localStorage now does.
                 // 2. This tab's token differs from localStorage's token.
                 // Use captured token state for comparison
                 if (currentLocalTokenInStorage && (!localTokenBeforeAction || localTokenBeforeAction !== currentLocalTokenInStorage)) {
                     console.log("AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user.");
                     // Update local token state FIRST to match storage, then refetch
                     setToken(currentLocalTokenInStorage);
                     apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentLocalTokenInStorage}`;
                     refetchUser(); // Fetch user for the new token
                 } else if (!currentLocalTokenInStorage && localTokenBeforeAction) {
                     // Logged in this tab, but localStorage cleared? Logout this tab.
                     console.warn("AuthProvider: Login broadcast received, but no token in localStorage. Logging out this tab.");
                     logoutRef.current('manual', true);
                 } else if (currentLocalTokenInStorage && localTokenBeforeAction === currentLocalTokenInStorage && !localUserBeforeAction) {
                     // Token matches, but user state is somehow null? Refetch.
                     console.log("AuthProvider: Token matches after login broadcast, but user state is null. Refetching.");
                     refetchUser();
                 } else {
                     console.log("AuthProvider: Received login broadcast, state seems consistent. No action needed.");
                 }
            }
        };

        console.log('AuthProvider: Adding BroadcastChannel message listener.');
        channel.addEventListener('message', handleBroadcastMessage);
        return () => {
            console.log('AuthProvider: Removing BroadcastChannel message listener.');
            if (broadcastChannelRef.current) { // Use ref.current in cleanup
                broadcastChannelRef.current.removeEventListener('message', handleBroadcastMessage);
            }
        };
    // Dependencies ensure listener is updated if critical state/functions change
    }, [user, token, refetchUser]);


    // --- Inactivity Event Listeners ---
    useEffect(() => {
        const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
        // Create the function inside useEffect to capture the current token value
        const resetTimer = () => resetInactivityTimerDebounced(token);
        // Add listeners only if running in a browser environment
        if (typeof window !== 'undefined') {
            // console.log('AuthProvider: Adding activity listeners.');
            events.forEach(event => window.addEventListener(event, resetTimer));
        }
        return () => {
            if (typeof window !== 'undefined') {
                // console.log('AuthProvider: Removing activity listeners.');
                events.forEach(event => window.removeEventListener(event, resetTimer));
            }
            resetInactivityTimerDebounced.cancel(); // Cancel pending debounced calls
        };
    }, [resetInactivityTimerDebounced, token]); // Depend on token now


    // --- Derived State ---
    const isAdmin = useMemo(() => user?.role === 'admin', [user]);

    // --- Context Value ---
    const contextValue: AuthContextType = useMemo(() => ({
        user,
        token,
        loading,
        login,
        logout: logoutRef.current, // Use the stable ref
        isAdmin,
        refetchUser, // Include refetchUser in the context value
    }), [user, token, loading, login, isAdmin, refetchUser]); // Add refetchUser dependency

    // --- Render ---
    return (
        <AuthContext.Provider value={contextValue}>
             {/* Global Loading Indicator - shows during initial check */}
             {loading && <GlobalLoadingIndicator />}
             {/* Render children only when loading is complete */}
             {!loading && children}
        </AuthContext.Provider>
    );
};

// --- Hook & Global Loader ---
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Optional Global Loading Indicator
const GlobalLoadingIndicator = () => (
     <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/90 backdrop-blur-sm" aria-label="Loading session">
         <div className="text-center">
             <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
             {/* <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p> */}
         </div>
     </div>
 );

export { AuthContext }; // Export context for direct consumption if needed