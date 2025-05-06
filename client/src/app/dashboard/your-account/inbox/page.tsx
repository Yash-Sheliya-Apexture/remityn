// // frontend/src/app/your-account/inbox/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '@/app/contexts/AuthContext';
// import inboxService from '../../../services/inbox'; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from '../../../services/inbox'; // Adjust path if necessary
// import { Button } from "@/components/ui/button";
// import { Inbox, RefreshCw } from 'lucide-react';
// import { cn } from '@/lib/utils'; // Adjust path if necessary

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from '../../components/inbox/InboxSkeleton';
// import { InboxEmptyState } from '../../components/inbox/InboxEmptyState';
// import { InboxErrorState } from '../../components/inbox/InboxErrorState';
// import { InboxMessageListItem } from '../../components/inbox/InboxMessageListItem';
// import { InboxMessageDetailView } from '../../components/inbox/InboxMessageDetailView';
// import { InboxPagination } from '../../components/inbox/InboxPagination';

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//     // --- Hooks & State ---
//     const { user, loading: authLoading } = useAuth();
//     const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//     const [loading, setLoading] = useState<boolean>(true); // Start true for initial auth check/load
//     const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);

//     // --- Data Fetching Logic ---
//     // Updated fetchInbox: Simplified, always sets loading state
//     const fetchInbox = useCallback(async (page: number) => {
//         // This function now assumes it should show a loading indicator when called.
//         // The decision *whether* to call fetchInbox is made in the useEffect or handlers.
//         if (!user) {
//             // console.log("fetchInbox called without user, returning.");
//             setError("Authentication required.");
//             setLoading(false); // Ensure loading is off if called erroneously without user
//             setInboxData(null);
//             return;
//         }

//         // console.log(`Fetching inbox page ${page}`);
//         setLoading(true); // <<< Set loading true at the start of EVERY fetch attempt
//         setError(null); // Clear previous errors

//         try {
//             const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//             setInboxData(data);
//             // If the API returns a different page than requested (e.g., requested page 5, but only 3 exist, API returns 3)
//             // Update our state to match the actual page returned by the API.
//             if (data.currentPage !== page) {
//                 // console.log(`API returned page ${data.currentPage}, updating state from ${page}.`);
//                  // Use setTimeout to avoid potential state update conflicts if this fetch was triggered by setCurrentPage
//                  setTimeout(() => setCurrentPage(data.currentPage), 0);
//             }
//             // console.log("Inbox data received:", data);
//         } catch (err: any) {
//             console.error("Failed to fetch inbox:", err);
//             const errorMessage = err.response?.data?.message || err.message || "Could not load messages.";
//             setError(errorMessage);
//             setInboxData(null); // Clear potentially stale data on error
//         } finally {
//             setLoading(false); // <<< Always set loading false when fetch finishes (success or error)
//             // console.log("Loading indicator turned off.");
//         }
//     }, [user]); // Dependency: user. If user changes, we get a new fetch function instance.

//     // Effect to fetch data based on auth state and page changes
//     useEffect(() => {
//         // console.log("InboxPage useEffect triggered. AuthLoading:", authLoading, "User:", !!user, "CurrentPage:", currentPage);

//         // Condition 1: Auth check finished, user exists -> Fetch data
//         if (!authLoading && user) {
//             // console.log("User authenticated, calling fetchInbox for page:", currentPage);
//             fetchInbox(currentPage); // Call fetchInbox for the current page
//         }
//         // Condition 2: Auth check finished, but no user (logged out/unauthenticated)
//         else if (!authLoading && !user) {
//             // console.log("User not authenticated. Clearing state.");
//             setError("Please log in to view your inbox.");
//             setLoading(false); // Ensure loading indicator is off
//             setInboxData(null); // Clear any potential stale data
//             setSelectedMessage(null); // Clear selection
//             // Optional: Reset to page 1 if user logs out (or keep current page if you prefer)
//             // setCurrentPage(1); // Uncomment if you want to reset page on logout
//         }
//         // Condition 3: Auth is still loading - Do nothing here, loading state is already true initially
//         // The initial skeleton will be shown based on the initial state `loading: true`
//         else {
//             // console.log("Auth is loading...");
//             // Ensure loading is true if it somehow got set to false during auth check
//              if (!loading) setLoading(true);
//         }

//         // --- CORRECTED Dependency Array ---
//         // This effect should ONLY re-run if:
//         // - Authentication finishes (`authLoading` changes from true to false)
//         // - The logged-in user changes (`user` object reference changes - login/logout)
//         // - The desired page changes (`currentPage` state changes)
//         // - The fetch function itself changes (due to `user` dependency in useCallback)
//     }, [authLoading, user, currentPage, fetchInbox]); // <<< REMOVED inboxData


//     // --- Action Handlers ---
//     // (Keep handleActionStart and handleActionEnd as they are)
//     const handleActionStart = (messageId: string) => {
//         setActionLoading(prev => ({ ...prev, [messageId]: true }));
//     };

//     const handleActionEnd = (messageId: string) => {
//         setActionLoading(prev => {
//             const newState = { ...prev };
//             delete newState[messageId];
//             return newState;
//         });
//     };

//     // (Keep handleMarkRead as it is - optimistic update logic is fine)
//     const handleMarkRead = useCallback(async (message: InboxMessage) => {
//         if (message.isRead || actionLoading[message._id]) return;

//         handleActionStart(message._id);
//         const originalData = structuredClone(inboxData);
//         const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;

//         setInboxData(prev => {
//             if (!prev) return null;
//             const newMessages = prev.messages.map(msg =>
//                 msg._id === message._id ? { ...msg, isRead: true } : msg
//             );
//             return { ...prev, messages: newMessages };
//         });
//          if (selectedMessage?._id === message._id) {
//             setSelectedMessage(prev => prev ? { ...prev, isRead: true } : null);
//          }

//         try {
//             await inboxService.markAsRead(message._id);
//         } catch (err) {
//             console.error("Failed to mark as read:", err);
//             setError("Failed to update message status. Please try refreshing.");
//             setInboxData(originalData);
//             setSelectedMessage(originalSelectedMessage);
//         } finally {
//             handleActionEnd(message._id);
//         }
//     }, [inboxData, selectedMessage, actionLoading]);


//     // (Keep handleDelete as it is - optimistic update and page change logic is fine)
//      const handleDelete = useCallback(async (messageId: string) => {
//          if (actionLoading[messageId]) return;

//          handleActionStart(messageId);
//          const originalData = structuredClone(inboxData);
//          const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;
//          const isDeletingSelected = selectedMessage?._id === messageId;

//          let pageToNavigateTo = currentPage;
//          let shouldRefetchPage = false; // Flag to indicate if a refetch is needed after deletion

//          setInboxData(prev => {
//              if (!prev) return null;
//              const newMessages = prev.messages.filter(msg => msg._id !== messageId);
//              const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//              const newTotalPages = Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

//              // If we deleted the last item on a page > 1, plan to navigate back
//              if (newMessages.length === 0 && prev.messages.length > 0 && currentPage > 1) {
//                  pageToNavigateTo = Math.max(1, currentPage - 1);
//              }
//               // If we deleted an item but there are still items on the current page,
//               // AND the total number of messages means the last page might now be empty,
//               // we might need to refetch the *current* page to get the next item pulled in from the server.
//               // This handles the case where deleting item 1 on page 1 (of 2 total pages) should show item 11 (now the 10th item overall).
//               else if (newMessages.length < MESSAGES_PER_PAGE && newTotalMessages >= MESSAGES_PER_PAGE * (currentPage -1) + newMessages.length + 1) {
//                 // console.log("Potential need to refetch current page after delete");
//                 shouldRefetchPage = true;
//               }


//              return {
//                  ...prev,
//                  messages: newMessages,
//                  totalMessages: newTotalMessages,
//                  totalPages: newTotalPages,
//                  currentPage: prev.currentPage // Keep current page in state for now
//              };
//          });

//          if (isDeletingSelected) {
//              setSelectedMessage(null);
//          }

//          try {
//              await inboxService.deleteMessage(messageId);
//              // Success: Apply navigation or refetch logic
//              if (pageToNavigateTo !== currentPage) {
//                  // console.log(`Last item deleted on page ${currentPage}, navigating to page ${pageToNavigateTo}`);
//                  setTimeout(() => setCurrentPage(pageToNavigateTo), 0); // Defer state update slightly
//              } else if (shouldRefetchPage) {
//                  // console.log(`Refetching current page ${currentPage} after deletion.`);
//                  // Refetch the current page to potentially pull in the next item
//                  setTimeout(() => fetchInbox(currentPage), 0); // Defer fetch slightly
//              } else if (originalData?.messages.length === 1 && currentPage === 1) {
//                  // Last overall message deleted, UI updated optimistically. No action needed.
//              }

//          } catch (err: any) {
//              console.error("Failed to delete message:", err);
//              setError(err.response?.data?.message || err.message || "Failed to delete message. Please try refreshing.");
//              setInboxData(originalData); // Revert UI
//              if(isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//          } finally {
//              handleActionEnd(messageId);
//          }
//      }, [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]); // Added fetchInbox dependency


//     // (Keep handleSelectMessage as it is)
//     const handleSelectMessage = useCallback((message: InboxMessage) => {
//         setSelectedMessage(message);
//         if (!message.isRead) {
//             handleMarkRead(message);
//         }
//     }, [handleMarkRead]);

//     // (Keep handlePageChange as it is)
//     const handlePageChange = (newPage: number) => {
//         if (loading || newPage === currentPage || newPage < 1 || (inboxData && newPage > inboxData.totalPages)) {
//             return;
//         }
//         setSelectedMessage(null);
//         setCurrentPage(newPage); // Triggers the main useEffect
//     };

//     // Updated handleRefresh: Use the simplified fetchInbox
//      const handleRefresh = useCallback(() => {
//          if (loading) return;
//          // console.log("Refreshing inbox page:", currentPage);
//          setSelectedMessage(null);
//          fetchInbox(currentPage); // Fetch current page again
//      }, [loading, currentPage, fetchInbox]); // Added fetchInbox dependency


//     // --- Render Logic ---

//     // Initial Loading State (Auth check or first fetch)
//     // Show skeleton if auth is loading OR if the main loading flag is true AND we have no data/error yet.
//     if (authLoading || (loading && !inboxData && !error)) {
//         // console.log("Rendering: Skeleton (Initial Load or Auth)");
//         return <InboxSkeleton />;
//     }

//     // Derived state for rendering ease
//     const messages = inboxData?.messages ?? [];
//     const totalMessages = inboxData?.totalMessages ?? 0;
//     const totalPages = inboxData?.totalPages ?? 1;
//     // Use the state currentPage for consistency, as API might return a different page number if requested page was invalid
//     const displayPage = currentPage;

//     // console.log("Rendering: Main Content. Selected:", !!selectedMessage, "Loading:", loading, "Error:", !!error, "Data:", !!inboxData, "Msg Count:", messages.length);

//     return (
//         <section className="Your-Inbox py-8 md:py-12">
//             <div className="max-w-4xl mx-auto px-4">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-6 md:mb-8">
//                     <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white flex items-center gap-2">
//                         <Inbox className="size-7 text-primary" /> Your Inbox
//                     </h1>
//                      {/* Refresh Button - Show unless viewing details and no error */}
//                     { (!selectedMessage || error) && (
//                          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
//                              <RefreshCw className={cn("mr-2 h-4 w-4", loading && !error && "animate-spin")} />
//                              {loading && !error ? 'Refreshing...' : 'Refresh'}
//                          </Button>
//                      )}
//                 </div>

//                 {/* Error Display Area */}
//                 {error && !loading && ( // Show error only if not actively loading
//                     <div className="mb-6">
//                         <InboxErrorState error={error} onRetry={handleRefresh} />
//                     </div>
//                 )}

//                 {/* Content Area: List or Detail */}
//                 <div className="relative min-h-[300px]"> {/* Added min-height */}
//                     {!selectedMessage ? (
//                         // ----- List View -----
//                         <>
//                             {/* Subtle loading overlay ONLY when actively loading AND data already exists (i.e., refresh/page change) */}
//                             {loading && !error && messages.length > 0 && (
//                                 <div className="absolute inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
//                                      <RefreshCw className="size-6 animate-spin text-primary" />
//                                 </div>
//                             )}

//                              {/* Show Empty State if NOT loading, NO error, and NO messages */}
//                              {!loading && !error && messages.length === 0 && totalMessages === 0 ? (
//                                 <InboxEmptyState />
//                              ) : null}

//                              {/* Show Message List if NOT loading, NO error, AND messages exist */}
//                              {!loading && !error && messages.length > 0 ? (
//                                 <div className='space-y-3'>
//                                     {messages.map((message) => (
//                                         <InboxMessageListItem
//                                             key={message._id}
//                                             message={message}
//                                             onSelect={handleSelectMessage}
//                                             onDelete={handleDelete}
//                                             isDeleting={!!actionLoading[message._id]}
//                                         />
//                                     ))}
//                                 </div>
//                              ) : null }

//                              {/* Edge case: Loading finished, no error, but messages array is empty (e.g., after deleting last item on a page before navigation/refetch completes)
//                                  Avoid showing Empty State here briefly. The loading overlay or subsequent render will handle it.
//                                  The min-height on the container prevents layout collapse. */}


//                             {/* Pagination - Show if multiple pages exist and no error */}
//                             {totalMessages > 0 && totalPages > 1 && !error && (
//                                  <InboxPagination
//                                      currentPage={displayPage} // Display current state page
//                                      totalPages={totalPages}
//                                      totalMessages={totalMessages}
//                                      onPageChange={handlePageChange}
//                                      isLoading={loading} // Disable during main load/refresh
//                                  />
//                              )}
//                         </>
//                     ) : (
//                         // ----- Detail View -----
//                         <InboxMessageDetailView
//                             message={selectedMessage}
//                             onBack={() => setSelectedMessage(null)}
//                             onDelete={handleDelete}
//                             isDeleting={!!actionLoading[selectedMessage._id]}
//                         />
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default InboxPage;


// frontend/src/app/your-account/inbox/page.tsx
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import inboxService from '../../../services/inbox'; // Adjust path if necessary
import type { InboxMessage, InboxListResponse } from '../../../services/inbox'; // Adjust path if necessary
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; // Import Separator
import { Inbox, RefreshCw, MailWarning } from 'lucide-react'; // Added MailWarning icon
import { cn } from '@/lib/utils'; // Adjust path if necessary

// Import the sub-components (adjust paths as needed)
import { InboxSkeleton } from '../../components/inbox/InboxSkeleton';
import { InboxEmptyState } from '../../components/inbox/InboxEmptyState';
import { InboxErrorState } from '../../components/inbox/InboxErrorState';
import { InboxMessageListItem } from '../../components/inbox/InboxMessageListItem';
import { InboxMessageDetailView } from '../../components/inbox/InboxMessageDetailView';
// REMOVE old pagination import
// import { InboxPagination } from '../../components/inbox/InboxPagination';
// ADD new pagination import (adjust path as necessary)
import Pagination from '../../components/Pagination';

const MESSAGES_PER_PAGE = 10;

const InboxPage: React.FC = () => {
    // --- Hooks & State ---
    const { user, loading: authLoading } = useAuth();
    const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Start true for initial auth check/load
    const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);

    // --- Data Fetching Logic ---
    const fetchInbox = useCallback(async (page: number) => {
        if (!user) {
            setError("Authentication required.");
            setLoading(false);
            setInboxData(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
            setInboxData(data);
            if (data.currentPage !== page) {
                 setTimeout(() => setCurrentPage(data.currentPage), 0);
            }
        } catch (err: any) {
            console.error("Failed to fetch inbox:", err);
            const errorMessage = err.response?.data?.message || err.message || "Could not load messages.";
            setError(errorMessage);
            setInboxData(null);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Effect to fetch data based on auth state and page changes
    useEffect(() => {
        if (!authLoading && user) {
            fetchInbox(currentPage);
        } else if (!authLoading && !user) {
            setError("Please log in to view your inbox.");
            setLoading(false);
            setInboxData(null);
            setSelectedMessage(null);
            // Optional: setCurrentPage(1);
        } else {
             if (!loading) setLoading(true);
        }
    }, [authLoading, user, currentPage, fetchInbox]);

    // --- Action Handlers ---
    const handleActionStart = (messageId: string) => {
        setActionLoading(prev => ({ ...prev, [messageId]: true }));
    };

    const handleActionEnd = (messageId: string) => {
        setActionLoading(prev => {
            const newState = { ...prev };
            delete newState[messageId];
            return newState;
        });
    };

    const handleMarkRead = useCallback(async (message: InboxMessage) => {
        if (message.isRead || actionLoading[message._id]) return;

        handleActionStart(message._id);
        const originalData = structuredClone(inboxData);
        const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;

        // Optimistic Update: Mark as read in the main data
        setInboxData(prev => {
            if (!prev) return null;
            const newMessages = prev.messages.map(msg =>
                msg._id === message._id ? { ...msg, isRead: true } : msg
            );
            // Note: We don't need to recalculate totalPages etc here, just the message status
            return { ...prev, messages: newMessages };
        });
         if (selectedMessage?._id === message._id) {
            setSelectedMessage(prev => prev ? { ...prev, isRead: true } : null);
         }

        try {
            await inboxService.markAsRead(message._id);
            // No need to refetch, optimistic update handles UI change
        } catch (err) {
            console.error("Failed to mark as read:", err);
            setError("Failed to update message status. Please try refreshing.");
            // Revert optimistic update on error
            setInboxData(originalData);
            setSelectedMessage(originalSelectedMessage);
        } finally {
            handleActionEnd(message._id);
        }
    }, [inboxData, selectedMessage, actionLoading]);


     const handleDelete = useCallback(async (messageId: string) => {
         if (actionLoading[messageId]) return;

         handleActionStart(messageId);
         const originalData = structuredClone(inboxData);
         const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;
         const isDeletingSelected = selectedMessage?._id === messageId;

         let pageToNavigateTo = currentPage;
         let shouldRefetchCurrentPage = false; // Flag to indicate if a refetch is needed after deletion

         // Optimistic Update: Remove message and recalculate totals/pages
         setInboxData(prev => {
             if (!prev) return null;
             const messageToDelete = prev.messages.find(msg => msg._id === messageId);
             if (!messageToDelete) return prev; // Should not happen, but safety check

             const newMessages = prev.messages.filter(msg => msg._id !== messageId);
             const newTotalMessages = Math.max(0, prev.totalMessages - 1);
             const newTotalPages = Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

             // If we deleted the last item on a page > 1, plan to navigate back
             if (newMessages.length === 0 && prev.messages.length > 0 && currentPage > 1) {
                 pageToNavigateTo = Math.max(1, currentPage - 1);
             }
              // If we deleted an item, there are still messages overall, and the current page *might*
              // need refilling from the next page's items, flag for refetch.
              else if (newMessages.length < MESSAGES_PER_PAGE && newTotalMessages > newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE) {
                shouldRefetchCurrentPage = true;
              }

             return {
                 ...prev,
                 messages: newMessages,
                 totalMessages: newTotalMessages,
                 totalPages: newTotalPages,
                 // Keep currentPage state reflecting the *API's* current page until navigation/refetch
                 currentPage: (pageToNavigateTo !== currentPage) ? pageToNavigateTo : prev.currentPage,
             };
         });

         if (isDeletingSelected) {
             setSelectedMessage(null);
         }

         try {
             await inboxService.deleteMessage(messageId);
             // Success: Apply navigation or refetch logic AFTER API call confirms delete
             if (pageToNavigateTo !== currentPage) {
                 // Navigate to previous page if needed
                 setTimeout(() => setCurrentPage(pageToNavigateTo), 0); // Defer state update slightly
             } else if (shouldRefetchCurrentPage) {
                 // Refetch the current page to pull in the next item
                 setTimeout(() => fetchInbox(currentPage), 0); // Defer fetch slightly
             }
             // If neither of the above, the optimistic update is sufficient

         } catch (err: any) {
             console.error("Failed to delete message:", err);
             setError(err.response?.data?.message || err.message || "Failed to delete message. Please try refreshing.");
             // Revert optimistic update on error
             setInboxData(originalData);
             if(isDeletingSelected) setSelectedMessage(originalSelectedMessage);
         } finally {
             handleActionEnd(messageId);
         }
     }, [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]);


    const handleSelectMessage = useCallback((message: InboxMessage) => {
        setSelectedMessage(message);
        // Mark as read when selected (if not already)
        if (!message.isRead) {
            // Use setTimeout to ensure the detail view transition starts
            // before the potential state update from marking read.
            setTimeout(() => handleMarkRead(message), 50);
        }
    }, [handleMarkRead]);

    // Updated handlePageChange to work with the new Pagination component's 'paginate' prop
    const handlePageChange = (newPage: number) => {
        // Guard against unnecessary changes or changes during loading
        if (loading || newPage === currentPage || newPage < 1 || (inboxData && newPage > inboxData.totalPages)) {
            return;
        }
        setSelectedMessage(null); // Clear detail view when changing pages
        setCurrentPage(newPage); // This will trigger the useEffect to fetch new data
    };

     const handleRefresh = useCallback(() => {
         if (loading) return;
         setSelectedMessage(null);
         fetchInbox(currentPage); // Fetch current page again
     }, [loading, currentPage, fetchInbox]);


    // --- Derived State for Rendering ---
    // Filter messages from the current page's data into unread and read lists
    const { unreadMessages, readMessages } = useMemo(() => {
        const allMessages = inboxData?.messages ?? [];
        const unread = allMessages.filter(msg => !msg.isRead);
        const read = allMessages.filter(msg => msg.isRead);
        return { unreadMessages: unread, readMessages: read };
    }, [inboxData?.messages]); // Recalculate only when messages change

    const totalMessages = inboxData?.totalMessages ?? 0;
    const totalPages = inboxData?.totalPages ?? 1;
    // Use the state currentPage for pagination controls, as API might return a different page number if requested page was invalid
    const displayPage = currentPage;
    const hasAnyMessagesOnPage = unreadMessages.length > 0 || readMessages.length > 0;


    // --- Render Logic ---

    // Initial Loading State (Auth check or first fetch)
    if (authLoading || (loading && !inboxData && !error && totalMessages === 0)) { // Check totalMessages too
        return <InboxSkeleton />;
    }

    return (
        <section className="Your-Inbox py-8 md:py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white flex items-center gap-2">
                        <Inbox className="size-7 text-primary" /> Your Inbox
                    </h1>
                     {/* Refresh Button - Show unless viewing details */}
                    { !selectedMessage && (
                         <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
                             <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
                             {loading ? 'Refreshing...' : 'Refresh'}
                         </Button>
                     )}
                </div>

                {/* Error Display Area */}
                {error && ( // Show error regardless of loading state if an error exists
                    <div className="mb-6">
                        <InboxErrorState error={error} onRetry={handleRefresh} />
                    </div>
                )}

                {/* Content Area: List (Unread + Read) or Detail */}
                <div className="relative min-h-[300px]">
                     {/* Subtle loading overlay ONLY when actively loading AND data might exist (i.e., refresh/page change) */}
                     {loading && !error && (totalMessages > 0 || hasAnyMessagesOnPage) && (
                        <div className="absolute inset-0 bg-background/50 dark:bg-background/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
                             <RefreshCw className="size-6 animate-spin text-primary" />
                        </div>
                    )}

                    {!selectedMessage ? (
                        // ----- List View -----
                        <>
                             {/* Show Empty State if NOT loading, NO error, and NO messages AT ALL */}
                             {!loading && !error && totalMessages === 0 ? (
                                <InboxEmptyState />
                             ) : null}

                             {/* Only render message sections if NOT loading and NO error */}
                             {!loading && !error && totalMessages > 0 && (
                                <div className="space-y-6">
                                    {/* --- Unread Section --- */}
                                    {unreadMessages.length > 0 && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                                <MailWarning className="size-4" />
                                                <span>New Message</span>
                                            </div>
                                            {unreadMessages.map((message) => (
                                                <InboxMessageListItem
                                                    key={message._id}
                                                    message={message}
                                                    onSelect={handleSelectMessage}
                                                    onDelete={handleDelete}
                                                    isDeleting={!!actionLoading[message._id]}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Divider if both sections have messages */}
                                    {unreadMessages.length > 0 && readMessages.length > 0 && (
                                        <Separator />
                                    )}

                                    {/* --- Read Messages Section (for current page) --- */}
                                    {readMessages.length > 0 && (
                                        <div className="space-y-3">
                                            {/* Optional: Add a heading for read messages if needed */}
                                             {unreadMessages.length > 0 && ( // Only show heading if unread also exists
                                                 <p className="text-sm font-medium text-muted-foreground">
                                                    Older Messages
                                                 </p>
                                             )}
                                            {readMessages.map((message) => (
                                                <InboxMessageListItem
                                                    key={message._id}
                                                    message={message}
                                                    onSelect={handleSelectMessage}
                                                    onDelete={handleDelete}
                                                    isDeleting={!!actionLoading[message._id]}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Optional: Message if current page has only unread, but there are read messages elsewhere */}
                                    {/* {unreadMessages.length > 0 && readMessages.length === 0 && totalMessages > unreadMessages.length && (
                                        <p className="text-center text-sm text-muted-foreground pt-4">No older messages on this page.</p>
                                    )} */}
                                </div>
                             )}


                            {/* Pagination - Show if multiple pages exist and no error */}
                            {!error && totalPages > 1 && (
                                 <Pagination
                                     currentPage={displayPage} // Use the state page
                                     totalPages={totalPages}
                                     paginate={handlePageChange} // Pass the handler directly
                                     goToPreviousPage={() => handlePageChange(displayPage - 1)}
                                     goToNextPage={() => handlePageChange(displayPage + 1)}
                                     // Note: The Pagination component internally handles disabling buttons
                                     // based on currentPage/totalPages. The handlePageChange function
                                     // also prevents action if loading=true.
                                 />
                             )}
                        </>
                    ) : (
                        // ----- Detail View -----
                        <InboxMessageDetailView
                            message={selectedMessage}
                            onBack={() => setSelectedMessage(null)}
                            onDelete={handleDelete}
                            isDeleting={!!actionLoading[selectedMessage._id]}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default InboxPage;