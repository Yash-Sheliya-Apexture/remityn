
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

// // frontend/src/app/your-account/inbox/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useAuth } from '@/app/contexts/AuthContext';
// import inboxService from '../../../services/inbox'; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from '../../../services/inbox'; // Adjust path if necessary
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator"; // Import Separator
// import { Inbox, RefreshCw, MailWarning } from 'lucide-react'; // Added MailWarning icon
// import { cn } from '@/lib/utils'; // Adjust path if necessary

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from '../../components/inbox/InboxSkeleton';
// import { InboxEmptyState } from '../../components/inbox/InboxEmptyState';
// import { InboxErrorState } from '../../components/inbox/InboxErrorState';
// import { InboxMessageListItem } from '../../components/inbox/InboxMessageListItem';
// import { InboxMessageDetailView } from '../../components/inbox/InboxMessageDetailView';
// // REMOVE old pagination import
// // import { InboxPagination } from '../../components/inbox/InboxPagination';
// // ADD new pagination import (adjust path as necessary)
// import Pagination from '../../components/Pagination';

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
//     const fetchInbox = useCallback(async (page: number) => {
//         if (!user) {
//             setError("Authentication required.");
//             setLoading(false);
//             setInboxData(null);
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//             setInboxData(data);
//             if (data.currentPage !== page) {
//                  setTimeout(() => setCurrentPage(data.currentPage), 0);
//             }
//         } catch (err: any) {
//             console.error("Failed to fetch inbox:", err);
//             const errorMessage = err.response?.data?.message || err.message || "Could not load messages.";
//             setError(errorMessage);
//             setInboxData(null);
//         } finally {
//             setLoading(false);
//         }
//     }, [user]);

//     // Effect to fetch data based on auth state and page changes
//     useEffect(() => {
//         if (!authLoading && user) {
//             fetchInbox(currentPage);
//         } else if (!authLoading && !user) {
//             setError("Please log in to view your inbox.");
//             setLoading(false);
//             setInboxData(null);
//             setSelectedMessage(null);
//             // Optional: setCurrentPage(1);
//         } else {
//              if (!loading) setLoading(true);
//         }
//     }, [authLoading, user, currentPage, fetchInbox]);

//     // --- Action Handlers ---
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

//     const handleMarkRead = useCallback(async (message: InboxMessage) => {
//         if (message.isRead || actionLoading[message._id]) return;

//         handleActionStart(message._id);
//         const originalData = structuredClone(inboxData);
//         const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;

//         // Optimistic Update: Mark as read in the main data
//         setInboxData(prev => {
//             if (!prev) return null;
//             const newMessages = prev.messages.map(msg =>
//                 msg._id === message._id ? { ...msg, isRead: true } : msg
//             );
//             // Note: We don't need to recalculate totalPages etc here, just the message status
//             return { ...prev, messages: newMessages };
//         });
//          if (selectedMessage?._id === message._id) {
//             setSelectedMessage(prev => prev ? { ...prev, isRead: true } : null);
//          }

//         try {
//             await inboxService.markAsRead(message._id);
//             // No need to refetch, optimistic update handles UI change
//         } catch (err) {
//             console.error("Failed to mark as read:", err);
//             setError("Failed to update message status. Please try refreshing.");
//             // Revert optimistic update on error
//             setInboxData(originalData);
//             setSelectedMessage(originalSelectedMessage);
//         } finally {
//             handleActionEnd(message._id);
//         }
//     }, [inboxData, selectedMessage, actionLoading]);

//      const handleDelete = useCallback(async (messageId: string) => {
//          if (actionLoading[messageId]) return;

//          handleActionStart(messageId);
//          const originalData = structuredClone(inboxData);
//          const originalSelectedMessage = selectedMessage ? structuredClone(selectedMessage) : null;
//          const isDeletingSelected = selectedMessage?._id === messageId;

//          let pageToNavigateTo = currentPage;
//          let shouldRefetchCurrentPage = false; // Flag to indicate if a refetch is needed after deletion

//          // Optimistic Update: Remove message and recalculate totals/pages
//          setInboxData(prev => {
//              if (!prev) return null;
//              const messageToDelete = prev.messages.find(msg => msg._id === messageId);
//              if (!messageToDelete) return prev; // Should not happen, but safety check

//              const newMessages = prev.messages.filter(msg => msg._id !== messageId);
//              const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//              const newTotalPages = Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1;

//              // If we deleted the last item on a page > 1, plan to navigate back
//              if (newMessages.length === 0 && prev.messages.length > 0 && currentPage > 1) {
//                  pageToNavigateTo = Math.max(1, currentPage - 1);
//              }
//               // If we deleted an item, there are still messages overall, and the current page *might*
//               // need refilling from the next page's items, flag for refetch.
//               else if (newMessages.length < MESSAGES_PER_PAGE && newTotalMessages > newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE) {
//                 shouldRefetchCurrentPage = true;
//               }

//              return {
//                  ...prev,
//                  messages: newMessages,
//                  totalMessages: newTotalMessages,
//                  totalPages: newTotalPages,
//                  // Keep currentPage state reflecting the *API's* current page until navigation/refetch
//                  currentPage: (pageToNavigateTo !== currentPage) ? pageToNavigateTo : prev.currentPage,
//              };
//          });

//          if (isDeletingSelected) {
//              setSelectedMessage(null);
//          }

//          try {
//              await inboxService.deleteMessage(messageId);
//              // Success: Apply navigation or refetch logic AFTER API call confirms delete
//              if (pageToNavigateTo !== currentPage) {
//                  // Navigate to previous page if needed
//                  setTimeout(() => setCurrentPage(pageToNavigateTo), 0); // Defer state update slightly
//              } else if (shouldRefetchCurrentPage) {
//                  // Refetch the current page to pull in the next item
//                  setTimeout(() => fetchInbox(currentPage), 0); // Defer fetch slightly
//              }
//              // If neither of the above, the optimistic update is sufficient

//          } catch (err: any) {
//              console.error("Failed to delete message:", err);
//              setError(err.response?.data?.message || err.message || "Failed to delete message. Please try refreshing.");
//              // Revert optimistic update on error
//              setInboxData(originalData);
//              if(isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//          } finally {
//              handleActionEnd(messageId);
//          }
//      }, [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]);

//     const handleSelectMessage = useCallback((message: InboxMessage) => {
//         setSelectedMessage(message);
//         // Mark as read when selected (if not already)
//         if (!message.isRead) {
//             // Use setTimeout to ensure the detail view transition starts
//             // before the potential state update from marking read.
//             setTimeout(() => handleMarkRead(message), 50);
//         }
//     }, [handleMarkRead]);

//     // Updated handlePageChange to work with the new Pagination component's 'paginate' prop
//     const handlePageChange = (newPage: number) => {
//         // Guard against unnecessary changes or changes during loading
//         if (loading || newPage === currentPage || newPage < 1 || (inboxData && newPage > inboxData.totalPages)) {
//             return;
//         }
//         setSelectedMessage(null); // Clear detail view when changing pages
//         setCurrentPage(newPage); // This will trigger the useEffect to fetch new data
//     };

//      const handleRefresh = useCallback(() => {
//          if (loading) return;
//          setSelectedMessage(null);
//          fetchInbox(currentPage); // Fetch current page again
//      }, [loading, currentPage, fetchInbox]);

//     // --- Derived State for Rendering ---
//     // Filter messages from the current page's data into unread and read lists
//     const { unreadMessages, readMessages } = useMemo(() => {
//         const allMessages = inboxData?.messages ?? [];
//         const unread = allMessages.filter(msg => !msg.isRead);
//         const read = allMessages.filter(msg => msg.isRead);
//         return { unreadMessages: unread, readMessages: read };
//     }, [inboxData?.messages]); // Recalculate only when messages change

//     const totalMessages = inboxData?.totalMessages ?? 0;
//     const totalPages = inboxData?.totalPages ?? 1;
//     // Use the state currentPage for pagination controls, as API might return a different page number if requested page was invalid
//     const displayPage = currentPage;
//     const hasAnyMessagesOnPage = unreadMessages.length > 0 || readMessages.length > 0;

//     // --- Render Logic ---

//     // Initial Loading State (Auth check or first fetch)
//     if (authLoading || (loading && !inboxData && !error && totalMessages === 0)) { // Check totalMessages too
//         return <InboxSkeleton />;
//     }

//     return (
//         <section className="Your-Inbox py-8 md:py-12">
//             <div className="max-w-4xl mx-auto px-4">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-6 md:mb-8">
//                     <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white flex items-center gap-2">
//                         <Inbox className="size-7 text-primary" /> Your Inbox
//                     </h1>
//                      {/* Refresh Button - Show unless viewing details */}
//                     { !selectedMessage && (
//                          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
//                              <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
//                              {loading ? 'Refreshing...' : 'Refresh'}
//                          </Button>
//                      )}
//                 </div>

//                 {/* Error Display Area */}
//                 {error && ( // Show error regardless of loading state if an error exists
//                     <div className="mb-6">
//                         <InboxErrorState error={error} onRetry={handleRefresh} />
//                     </div>
//                 )}

//                 {/* Content Area: List (Unread + Read) or Detail */}
//                 <div className="relative min-h-[300px]">
//                      {/* Subtle loading overlay ONLY when actively loading AND data might exist (i.e., refresh/page change) */}
//                      {loading && !error && (totalMessages > 0 || hasAnyMessagesOnPage) && (
//                         <div className="absolute inset-0 bg-background/50 dark:bg-background/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
//                              <RefreshCw className="size-6 animate-spin text-primary" />
//                         </div>
//                     )}

//                     {!selectedMessage ? (
//                         // ----- List View -----
//                         <>
//                              {/* Show Empty State if NOT loading, NO error, and NO messages AT ALL */}
//                              {!loading && !error && totalMessages === 0 ? (
//                                 <InboxEmptyState />
//                              ) : null}

//                              {/* Only render message sections if NOT loading and NO error */}
//                              {!loading && !error && totalMessages > 0 && (
//                                 <div className="space-y-6">

//                                     {/* --- Unread Section --- */}
//                                     {unreadMessages.length > 0 && (
//                                         <div className="space-y-3">
//                                             <div className="flex items-center gap-2 text-sm font-medium text-primary">
//                                                 <MailWarning className="size-4" />
//                                                 <span>New Message</span>
//                                             </div>
//                                             {unreadMessages.map((message) => (
//                                                 <InboxMessageListItem
//                                                     key={message._id}
//                                                     message={message}
//                                                     onSelect={handleSelectMessage}
//                                                     onDelete={handleDelete}
//                                                     isDeleting={!!actionLoading[message._id]}
//                                                 />
//                                             ))}
//                                         </div>
//                                     )}

//                                     {/* Divider if both sections have messages */}
//                                     {unreadMessages.length > 0 && readMessages.length > 0 && (
//                                         <Separator />
//                                     )}

//                                     {/* --- Read Messages Section (for current page) --- */}
//                                     {readMessages.length > 0 && (
//                                         <div className="space-y-3">
//                                             {/* Optional: Add a heading for read messages if needed */}
//                                              {unreadMessages.length > 0 && ( // Only show heading if unread also exists
//                                                  <p className="text-sm font-medium text-muted-foreground">
//                                                     Older Messages
//                                                  </p>
//                                              )}

//                                             {readMessages.map((message) => (
//                                                 <InboxMessageListItem
//                                                     key={message._id}
//                                                     message={message}
//                                                     onSelect={handleSelectMessage}
//                                                     onDelete={handleDelete}
//                                                     isDeleting={!!actionLoading[message._id]}
//                                                 />
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                              )}

//                             {/* Pagination - Show if multiple pages exist and no error */}
//                             {!error && totalPages > 1 && (
//                                  <Pagination
//                                      currentPage={displayPage} // Use the state page
//                                      totalPages={totalPages}
//                                      paginate={handlePageChange} // Pass the handler directly
//                                      goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                                      goToNextPage={() => handlePageChange(displayPage + 1)}
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

// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "../../../services/inbox"; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from "../../../services/inbox"; // Adjust path if necessary
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   Inbox,
//   RefreshCw,
//   Bell,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   MailX,
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // Adjust path if necessary

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
// import { InboxErrorState } from "../../components/inbox/InboxErrorState";
// import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem"; // Updated component
// import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
// import Pagination from "../../components/Pagination"; // Ensure this path is correct

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//   // --- Hooks & State ---
//   const { user, loading: authLoading } = useAuth();
//   const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Start true for initial auth check/load
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
//     null
//   );

//   // --- Data Fetching Logic ---
//   const fetchInbox = useCallback(
//     async (page: number) => {
//       if (!user) {
//         setLoading(false);
//         setInboxData(null);
//         setSelectedMessage(null); // Clear selection if user logs out
//         return;
//       }

//       setLoading(true);
//       setError(null); // Clear previous errors on new fetch

//       try {
//         const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//         setInboxData(data);
//         // Sync local page state if API corrected the page number
//         if (data.currentPage !== page) {
//           setTimeout(() => setCurrentPage(data.currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Failed to fetch inbox:", err);
//         const errorMessage =
//           err.response?.data?.message ||
//           err.message ||
//           "Could not load messages.";
//         setError(errorMessage);
//         setInboxData(null); // Clear data on error
//         setSelectedMessage(null); // Clear selection on error
//       } finally {
//         setLoading(false);
//       }
//     },
//     [user]
//   );

//   // Effect to fetch data based on auth state and page changes
//   useEffect(() => {
//     if (!authLoading) {
//       if (user) {
//         fetchInbox(currentPage);
//       } else {
//         setError("Please log in to view your inbox.");
//         setLoading(false);
//         setInboxData(null);
//         setSelectedMessage(null);
//       }
//     } else {
//       if (!loading) setLoading(true);
//     }
//   }, [authLoading, user, currentPage, fetchInbox, loading]);

//   // --- Action Handlers ---
//   const handleActionStart = (messageId: string) => {
//     setActionLoading((prev) => ({ ...prev, [messageId]: true }));
//   };

//   const handleActionEnd = (messageId: string) => {
//     setActionLoading((prev) => {
//       const newState = { ...prev };
//       delete newState[messageId];
//       return newState;
//     });
//   };

//   // Mark as Read with optimistic update
//   const handleMarkRead = useCallback(
//     async (message: InboxMessage) => {
//       if (!message || message.isRead || actionLoading[message._id]) return;

//       handleActionStart(message._id);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;

//       // Optimistic Update
//       setInboxData((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           messages: prev.messages.map((msg) =>
//             msg._id === message._id ? { ...msg, isRead: true } : msg
//           ),
//         };
//       });

//       if (selectedMessage?._id === message._id) {
//         setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
//       }

//       try {
//         await inboxService.markAsRead(message._id);
//         // Success: Optimistic update is already applied.
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//         setError("Failed to update message status. Please try refreshing.");
//         // Revert optimistic update on error
//         setInboxData(originalData);
//         setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(message._id);
//       }
//     },
//     [inboxData, selectedMessage, actionLoading]
//   );

//   // Delete Message with optimistic update
//   const handleDelete = useCallback(
//     async (messageId: string) => {
//       if (actionLoading[messageId]) return;

//       handleActionStart(messageId);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;
//       const isDeletingSelected = selectedMessage?._id === messageId;

//       let pageToNavigateTo = currentPage;
//       let shouldRefetchCurrentPage = false;

//       // Optimistic Update
//       setInboxData((prev) => {
//         if (!prev) return null;
//         const messageIndex = prev.messages.findIndex(
//           (msg) => msg._id === messageId
//         );
//         if (messageIndex === -1) return prev; // Message not found

//         const newMessages = prev.messages.filter(
//           (msg) => msg._id !== messageId
//         );
//         const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//         const newTotalPages =
//           Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1; // Ensure at least 1 page

//         // Determine if page change or refetch is needed
//         if (
//           newMessages.length === 0 &&
//           prev.messages.length > 0 &&
//           currentPage > 1
//         ) {
//           // Deleted the last item on a page > 1, go to previous page
//           pageToNavigateTo = Math.max(1, currentPage - 1);
//         } else if (
//           newMessages.length < MESSAGES_PER_PAGE &&
//           newTotalMessages >
//             newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
//         ) {
//           // Deleted an item, current page is not full, and there are more messages on subsequent pages -> refetch to pull one up
//           shouldRefetchCurrentPage = true;
//         }

//         const optimisticCurrentPage =
//           pageToNavigateTo !== currentPage
//             ? pageToNavigateTo
//             : prev.currentPage;

//         return {
//           ...prev,
//           messages: newMessages,
//           totalMessages: newTotalMessages,
//           totalPages: newTotalPages,
//           currentPage: optimisticCurrentPage,
//         };
//       });

//       // Clear selection immediately if the selected message is deleted
//       if (isDeletingSelected) {
//         setSelectedMessage(null);
//       }

//       // Perform API call
//       try {
//         await inboxService.deleteMessage(messageId);

//         if (pageToNavigateTo !== currentPage) {
//           setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
//         } else if (shouldRefetchCurrentPage) {
//           setTimeout(() => fetchInbox(currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Failed to delete message:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete message. Please try refreshing."
//         );
//         // Revert optimistic update on error
//         setInboxData(originalData);
//         if (isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(messageId);
//       }
//     },
//     [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox]
//   );

//   // Select Message and mark as read
//   const handleSelectMessage = useCallback(
//     (message: InboxMessage) => {
//       setSelectedMessage(message);
//       // Automatically mark as read when selected, if it's currently unread
//       if (!message.isRead) {
//         setTimeout(() => handleMarkRead(message), 50);
//       }
//     },
//     [handleMarkRead]
//   );

//   // Page Change Handler
//   const handlePageChange = (newPage: number) => {
//     if (
//       loading ||
//       newPage === currentPage ||
//       newPage < 1 ||
//       (inboxData && newPage > inboxData.totalPages)
//     ) {
//       return; // Avoid unnecessary changes
//     }
//     setSelectedMessage(null); // Clear detail view when changing pages
//     setCurrentPage(newPage); // Triggers useEffect to fetch new data
//   };

//   // Refresh Handler
//   const handleRefresh = useCallback(() => {
//     if (loading) return; // Don't refresh if already loading
//     setSelectedMessage(null); // Go back to list view on refresh
//     fetchInbox(currentPage); // Fetch current page again
//   }, [loading, currentPage, fetchInbox]);

//   // --- Derived State for Rendering ---
//   const { unreadMessages, readMessages } = useMemo(() => {
//     const allMessages = inboxData?.messages ?? [];
//     const unread = allMessages.filter((msg) => !msg.isRead);
//     const read = allMessages.filter((msg) => msg.isRead);
//     return { unreadMessages: unread, readMessages: read };
//   }, [inboxData?.messages]);

//   const totalMessages = inboxData?.totalMessages ?? 0;
//   const totalPages = inboxData?.totalPages ?? 1;
//   const displayPage = currentPage;
//   const hasAnyMessagesOnPage =
//     unreadMessages.length > 0 || readMessages.length > 0;
//   const hasMessagesInTotal = totalMessages > 0;

//   // --- Render Logic ---

//   // 1. Initial Loading State
//   if (authLoading || (loading && !inboxData && !error && !hasMessagesInTotal)) {
//     return <InboxSkeleton />;
//   }

//   // 2. Not Logged In State
//   if (!authLoading && !user) {
//     return (
//       <section className="Your-Inbox py-8 md:py-12">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
//           <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
//             Access Denied
//           </h1>
//           <p className="text-muted-foreground">
//             {error || "Please log in to view your inbox."}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // 3. Logged In - Main Content Rendering
//   return (
//     <section className="Your-Inbox py-8 md:py-12">
//       <div className="max-w-5xl mx-auto px-4">
//         {/* Header with improved styling */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary/10 p-2 rounded-lg dark:bg-primary/20">
//               <Inbox className="size-7 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white">
//                 Your Inbox
//               </h1>

//               {hasMessagesInTotal && (
//                 <p className="text-sm text-muted-foreground">
//                   {unreadMessages.length > 0 ? (
//                     <>
//                       <span className="font-medium text-primary">
//                         {unreadMessages.length} new
//                       </span>
//                       {readMessages.length > 0 &&
//                         ` · ${readMessages.length} read`}
//                     </>
//                   ) : (
//                     `${readMessages.length} message${
//                       readMessages.length !== 1 ? "s" : ""
//                     }`
//                   )}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Refresh Button - Improved styling */}
//           {!selectedMessage && !loading && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleRefresh}
//               disabled={actionLoading.refresh}
//               className="flex items-center gap-2 h-9"
//             >
//               <RefreshCw
//                 className={cn(
//                   "h-4 w-4",
//                   actionLoading.refresh && "animate-spin"
//                 )}
//               />
//               <span>Refresh</span>
//             </Button>
//           )}

//           {/* Show spinner if loading during refresh/page change */}
//           {!selectedMessage && loading && hasMessagesInTotal && (
//             <div className="flex items-center gap-2 text-primary">
//               <Loader2 className="h-5 w-5 animate-spin" />
//               <span className="text-sm">Loading...</span>
//             </div>
//           )}
//         </div>

//         {/* Error Display Area */}
//         {error && !loading && (
//           <div className="mb-6">
//             <InboxErrorState error={error} onRetry={handleRefresh} />
//           </div>
//         )}

//         {/* Content Area: List or Detail */}
//         <div className="relative min-h-[300px]">
//           {/* Loading overlay */}
//           {loading && !error && !selectedMessage && hasMessagesInTotal && (
//             <div className="absolute inset-0 bg-background/50 dark:bg-background/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
//               <div className="flex flex-col items-center gap-2">
//                 <Loader2 className="size-8 animate-spin text-primary" />
//                 <span className="text-sm font-medium text-primary">
//                   Loading messages...
//                 </span>
//               </div>
//             </div>
//           )}

//           {!selectedMessage ? (
//             // ----- List View -----
//             <>
//               {/* Empty State */}
//               {!loading && !error && !hasMessagesInTotal ? (
//                 <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
//                   <MailX className="size-16 mx-auto text-muted-foreground mb-4" />
//                   <h2 className="text-xl font-semibold text-foreground mb-2">
//                     Your inbox is empty
//                   </h2>
//                   <p className="text-muted-foreground max-w-md mx-auto">
//                     You don't have any messages yet. When you receive
//                     notifications or important updates, they will appear here.
//                   </p>
//                 </div>
//               ) : null}

//               {/* Message Sections */}
//               {!loading && !error && hasMessagesInTotal && (
//                 <div className="space-y-8">
//                   {/* --- New Messages Section with enhanced styling --- */}
//                   {unreadMessages.length > 0 && (
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-2 mb-4">
//                         <div className="bg-primary/10 p-1.5 rounded-md dark:bg-primary/20">
//                           <Bell className="size-5 text-primary" />
//                         </div>
//                         <h2 className="text-lg font-semibold text-primary">
//                           New Messages
//                           <span className="ml-2 text-sm bg-primary/15 text-primary px-2 py-0.5 rounded-full">
//                             {unreadMessages.length}
//                           </span>
//                         </h2>
//                       </div>

//                       <div className="space-y-4">
//                         {unreadMessages.map((message) => (
//                           <InboxMessageListItem
//                             key={message._id}
//                             message={message}
//                             onSelect={handleSelectMessage}
//                             onDelete={handleDelete}
//                             isDeleting={!!actionLoading[message._id]}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Divider with improved styling */}
//                   {unreadMessages.length > 0 && readMessages.length > 0 && (
//                     <Separator className="my-8 bg-border/50" />
//                   )}

//                   {/* --- Read Messages Section with enhanced styling --- */}
//                   {readMessages.length > 0 && (
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-2 mb-4">
//                         <div className="bg-muted p-1.5 rounded-md">
//                           <CheckCircle2 className="size-5 text-muted-foreground" />
//                         </div>
//                         <h2 className="text-lg font-medium text-muted-foreground">
//                           Previous Messages
//                           <span className="ml-2 text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
//                             {readMessages.length}
//                           </span>
//                         </h2>
//                       </div>

//                       <div className="space-y-4">
//                         {readMessages.map((message) => (
//                           <InboxMessageListItem
//                             key={message._id}
//                             message={message}
//                             onSelect={handleSelectMessage}
//                             onDelete={handleDelete}
//                             isDeleting={!!actionLoading[message._id]}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Empty Page Message */}
//                   {!loading &&
//                     !error &&
//                     !hasAnyMessagesOnPage &&
//                     hasMessagesInTotal && (
//                       <div className="text-center py-12 bg-muted/30 rounded-lg border border-border/50">
//                         <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
//                         <p className="text-lg font-medium text-foreground mb-1">
//                           No messages on this page
//                         </p>
//                         <p className="text-muted-foreground">
//                           Try navigating to a different page or refreshing your
//                           inbox.
//                         </p>
//                       </div>
//                     )}
//                 </div>
//               )}

//               {/* Pagination with improved styling */}
//               {!loading && !error && totalPages > 1 && (
//                 <div className="mt-8">
//                   <Pagination
//                     currentPage={displayPage}
//                     totalPages={totalPages}
//                     paginate={handlePageChange}
//                     goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                     goToNextPage={() => handlePageChange(displayPage + 1)}
//                   />
//                 </div>
//               )}
//             </>
//           ) : (
//             // ----- Detail View -----
//             <InboxMessageDetailView
//               message={selectedMessage}
//               onBack={() => setSelectedMessage(null)}
//               onDelete={handleDelete}
//               isDeleting={!!actionLoading[selectedMessage._id]}
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InboxPage;

// "use client";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react"; // Added useRef
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "../../../services/inbox"; // Adjust path if necessary
// import type { InboxMessage, InboxListResponse } from "../../../services/inbox"; // Adjust path if necessary
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   Inbox,
//   RefreshCw,
//   Bell,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   MailX,
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // Adjust path if necessary

// // Import the sub-components (adjust paths as needed)
// import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
// import { InboxErrorState } from "../../components/inbox/InboxErrorState";
// import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem"; // Updated component
// import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
// import Pagination from "../../components/Pagination"; // Ensure this path is correct
// import { GoDotFill } from "react-icons/go";

// const MESSAGES_PER_PAGE = 10;

// const InboxPage: React.FC = () => {
//   // --- Hooks & State ---
//   const { user, loading: authLoading } = useAuth();
//   const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
//   // Start loading true for initial auth check AND first data fetch
//   const [loading, setLoading] = useState<boolean>(true);
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
//     null
//   );
//   // Ref to track if it's the very first load attempt after mount/auth
//   const isInitialLoad = useRef(true);

//   // --- Data Fetching Logic ---
//   const fetchInbox = useCallback(
//     async (page: number) => {
//       // No need to check 'user' here again, useEffect handles that.
//       // Ensure loading is true *during* the fetch operation.
//       setLoading(true);
//       setError(null); // Clear previous errors on new fetch

//       try {
//         console.log(`Fetching inbox page ${page}...`);
//         const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
//         console.log("Inbox data received:", data);
//         setInboxData(data);
//         // Sync local page state if API corrected the page number
//         if (data.currentPage !== page) {
//           // Use setTimeout to avoid state update conflicts during render
//           setTimeout(() => setCurrentPage(data.currentPage), 0);
//         }
//         // Mark initial load as complete after the first successful fetch
//         isInitialLoad.current = false;
//       } catch (err: any) {
//         console.error("Failed to fetch inbox:", err);
//         const errorMessage =
//           err.response?.data?.message ||
//           err.message ||
//           "Could not load messages.";
//         setError(errorMessage);
//         setInboxData(null); // Clear data on error
//         setSelectedMessage(null); // Clear selection on error
//         // Also mark initial load as complete even on error, so skeleton hides
//         isInitialLoad.current = false;
//       } finally {
//         // Ensure loading is set to false *after* all state updates in try/catch
//         setLoading(false);
//         console.log("Fetch inbox finished, loading set to false.");
//       }
//     },
//     [] // No user dependency needed here, handled by useEffect caller
//   );

//   // Effect to fetch data based on auth state and page changes
//   useEffect(() => {
//     console.log("InboxPage Effect triggered:", {
//       authLoading,
//       user,
//       currentPage,
//     });

//     // If auth is still loading, do nothing yet. The initial 'loading' state is true.
//     if (authLoading) {
//       console.log("Auth is loading, waiting...");
//       // Keep loading true if it isn't already (e.g., if component re-mounted)
//       if (!loading) setLoading(true);
//       return;
//     }

//     // Auth is finished.
//     if (user) {
//       console.log("User found, fetching inbox for page:", currentPage);
//       // User exists, fetch their data for the current page.
//       // fetchInbox handles setting loading true/false internally for the API call duration.
//       fetchInbox(currentPage);
//     } else {
//       // No user.
//       console.log("No user found, setting error and stopping loading.");
//       setError("Please log in to view your inbox.");
//       setLoading(false); // Stop loading state
//       setInboxData(null); // Clear any potential old data
//       setSelectedMessage(null); // Clear selection
//       isInitialLoad.current = false; // Mark initial load attempt as done
//     }

//     // --- Dependencies ---
//     // Re-run when auth loading state changes.
//     // Re-run when user logs in or out.
//     // Re-run when the currentPage changes.
//     // fetchInbox is memoized by useCallback and doesn't need to be here if its own dependencies are stable (which they are now).
//   }, [authLoading, user, currentPage, fetchInbox]); // Removed 'loading' from dependencies

//   // --- Action Handlers (No changes needed in these handlers) ---
//   const handleActionStart = (messageId: string) => {
//     setActionLoading((prev) => ({ ...prev, [messageId]: true }));
//   };

//   const handleActionEnd = (messageId: string) => {
//     setActionLoading((prev) => {
//       const newState = { ...prev };
//       delete newState[messageId];
//       return newState;
//     });
//   };

//   // Mark as Read with optimistic update
//   const handleMarkRead = useCallback(
//     async (message: InboxMessage) => {
//       if (!message || message.isRead || actionLoading[message._id]) return;

//       handleActionStart(message._id);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;

//       // Optimistic Update
//       setInboxData((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           messages: prev.messages.map((msg) =>
//             msg._id === message._id ? { ...msg, isRead: true } : msg
//           ),
//         };
//       });

//       if (selectedMessage?._id === message._id) {
//         setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
//       }

//       try {
//         await inboxService.markAsRead(message._id);
//         // Success: Optimistic update is already applied.
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//         setError("Failed to update message status. Please try refreshing.");
//         // Revert optimistic update on error
//         setInboxData(originalData);
//         setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(message._id);
//       }
//     },
//     [inboxData, selectedMessage, actionLoading]
//   );

//   // Delete Message with optimistic update
//   const handleDelete = useCallback(
//     async (messageId: string) => {
//       if (actionLoading[messageId]) return;

//       handleActionStart(messageId);
//       const originalData = structuredClone(inboxData);
//       const originalSelectedMessage = selectedMessage
//         ? structuredClone(selectedMessage)
//         : null;
//       const isDeletingSelected = selectedMessage?._id === messageId;

//       let pageToNavigateTo = currentPage;
//       let shouldRefetchCurrentPage = false;

//       // Optimistic Update
//       setInboxData((prev) => {
//         if (!prev) return null;
//         const messageIndex = prev.messages.findIndex(
//           (msg) => msg._id === messageId
//         );
//         if (messageIndex === -1) return prev; // Message not found

//         const newMessages = prev.messages.filter(
//           (msg) => msg._id !== messageId
//         );
//         const newTotalMessages = Math.max(0, prev.totalMessages - 1);
//         const newTotalPages =
//           Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1; // Ensure at least 1 page

//         // Determine if page change or refetch is needed
//         if (
//           newMessages.length === 0 &&
//           prev.messages.length > 0 &&
//           currentPage > 1
//         ) {
//           // Deleted the last item on a page > 1, go to previous page
//           pageToNavigateTo = Math.max(1, currentPage - 1);
//         } else if (
//           newMessages.length < MESSAGES_PER_PAGE &&
//           newTotalMessages >
//             newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
//         ) {
//           // Deleted an item, current page is not full, and there are more messages on subsequent pages -> refetch to pull one up
//           shouldRefetchCurrentPage = true;
//         }

//         const optimisticCurrentPage =
//           pageToNavigateTo !== currentPage
//             ? pageToNavigateTo
//             : prev.currentPage;

//         return {
//           ...prev,
//           messages: newMessages,
//           totalMessages: newTotalMessages,
//           totalPages: newTotalPages,
//           currentPage: optimisticCurrentPage,
//         };
//       });

//       // Clear selection immediately if the selected message is deleted
//       if (isDeletingSelected) {
//         setSelectedMessage(null);
//       }

//       // Perform API call
//       try {
//         await inboxService.deleteMessage(messageId);

//         if (pageToNavigateTo !== currentPage) {
//           setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
//         } else if (shouldRefetchCurrentPage) {
//           // Use fetchInbox directly instead of relying only on useEffect trigger
//           setTimeout(() => fetchInbox(currentPage), 0);
//         }
//       } catch (err: any) {
//         console.error("Failed to delete message:", err);
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete message. Please try refreshing."
//         );
//         // Revert optimistic update on error
//         setInboxData(originalData);
//         if (isDeletingSelected) setSelectedMessage(originalSelectedMessage);
//       } finally {
//         handleActionEnd(messageId);
//       }
//     },
//     [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox] // Added fetchInbox dependency
//   );

//   // Select Message and mark as read
//   const handleSelectMessage = useCallback(
//     (message: InboxMessage) => {
//       setSelectedMessage(message);
//       // Automatically mark as read when selected, if it's currently unread
//       if (!message.isRead) {
//         // Delay slightly to allow UI to update first if needed
//         setTimeout(() => handleMarkRead(message), 50);
//       }
//     },
//     [handleMarkRead]
//   );

//   // Page Change Handler
//   const handlePageChange = (newPage: number) => {
//     if (
//       loading || // Prevent change if already loading new data
//       newPage === currentPage ||
//       newPage < 1 ||
//       (inboxData && newPage > inboxData.totalPages)
//     ) {
//       return; // Avoid unnecessary changes
//     }
//     setSelectedMessage(null); // Clear detail view when changing pages
//     setCurrentPage(newPage); // Triggers useEffect to fetch new data
//   };

//   // Refresh Handler
//   const handleRefresh = useCallback(() => {
//     if (loading) return; // Don't refresh if already loading
//     console.log("Refresh triggered");
//     setSelectedMessage(null); // Go back to list view on refresh
//     isInitialLoad.current = false; // Ensure skeleton doesn't show on manual refresh
//     fetchInbox(currentPage); // Fetch current page again
//   }, [loading, currentPage, fetchInbox]);

//   // --- Derived State for Rendering ---
//   const { unreadMessages, readMessages } = useMemo(() => {
//     const allMessages = inboxData?.messages ?? [];
//     const unread = allMessages.filter((msg) => !msg.isRead);
//     const read = allMessages.filter((msg) => msg.isRead);
//     return { unreadMessages: unread, readMessages: read };
//   }, [inboxData?.messages]);

//   const totalMessages = inboxData?.totalMessages ?? 0;
//   const totalPages = inboxData?.totalPages ?? 1;
//   const displayPage = inboxData?.currentPage ?? currentPage; // Use API's current page if available
//   const hasAnyMessagesOnPage =
//     unreadMessages.length > 0 || readMessages.length > 0;
//   const hasMessagesInTotal = totalMessages > 0;

//   // --- Render Logic ---

//   // 1. Initial Loading State (Skeleton)
//   // Show skeleton if auth is loading OR if it's the initial component load cycle AND
//   // the main loading state is true (meaning fetch hasn't completed/failed yet)
//   // AND we haven't determined there's an error yet.
//   // Using !inboxData helps ensure skeleton shows until first data/error arrives.
//   // console.log("Render check:", { authLoading, loading, isInitialLoad: isInitialLoad.current, inboxData: !!inboxData, error: !!error });
//   if (authLoading || (loading && isInitialLoad.current && !error)) {
//     console.log("Rendering InboxSkeleton");
//     return <InboxSkeleton />;
//   }

//   // 2. Not Logged In State (After auth check is complete)
//   if (!authLoading && !user) {
//     console.log("Rendering Access Denied / Not Logged In");
//     return (
//       <section className="Your-Inbox py-8 md:py-12">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
//           <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
//             Access Denied
//           </h1>
//           <p className="text-muted-foreground">
//             {error || "Please log in to view your inbox."}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // 3. Logged In - Main Content Rendering
//   console.log("Rendering Main Inbox Content Area");
//   return (
//     <section className="Your-Inbox py-5 md:py-10">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary p-2 rounded-md">
//               <Inbox className="text-neutral-900" size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white">
//                 Your Inbox
//               </h1>

//               {/* Show message count only after initial load and if there's data */}
//               {!loading && inboxData && hasMessagesInTotal && (
//                 <p className="text-sm text-muted-foreground">
//                   {unreadMessages.length > 0 ? (
//                     <div className="flex items-center gap-1">
//                       <span className="font-medium text-primary">
//                         {unreadMessages.length} new
//                       </span>
//                       <GoDotFill size={12} />
//                       {readMessages.length > 0 &&
//                         `  ${readMessages.length} read`}
//                     </div>
//                   ) : (
//                     `${readMessages.length} message${
//                       readMessages.length !== 1 ? "s" : ""
//                     }`
//                   )}
//                 </p>
//               )}

//               {/* Show subtle loading indicator in header during non-initial loads */}
//               {loading && !isInitialLoad.current && (
//                 <p className="text-sm text-primary flex items-center gap-1">
//                   <Loader2 className="h-3 w-3 animate-spin" />
//                   <span>Updating...</span>
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Refresh Button - Show only when NOT loading and in list view */}
//           {!selectedMessage && !loading && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleRefresh}
//               // Disable based on generic loading state, not specific action state
//               disabled={loading}
//               className="flex items-center gap-2 h-9"
//             >
//               <RefreshCw
//                 className={cn(
//                   "h-4 w-4",
//                   loading && "animate-spin" // Spin if loading state is true
//                 )}
//               />
//               <span>Refresh</span>
//             </Button>
//           )}

//           {/* Loading Spinner for Refresh/Page Change (Top Right)
//               Show only when loading AFTER the initial load, and in list view */}
//           {!selectedMessage && loading && !isInitialLoad.current && (
//             <div className="flex items-center gap-2 text-primary h-9 px-3">
//               {" "}
//               <Loader2 className="h-5 w-5 animate-spin" />
//               <span className="text-sm">Loading...</span>
//             </div>
//           )}

//         </div>

//         {/* Error Display Area - Show if error exists and we are NOT in the initial loading phase */}
//         {error && !loading && (
//           <div className="mb-6">
//             <InboxErrorState error={error} onRetry={handleRefresh} />
//           </div>
//         )}

//         {/* Content Area: List or Detail */}
//         {/* Add min-h-[300px] here if needed, or rely on content below */}
//         <div className="relative">
//           {/* Loading overlay - Show only during loading AFTER initial load, over the list view area */}
//           {loading &&
//             !isInitialLoad.current &&
//             !error &&
//             !selectedMessage &&
//             hasMessagesInTotal && (
//               <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-20 min-h-[200px]">
//                 <div className="flex flex-col items-center gap-2">
//                   <Loader2 className="size-8 animate-spin text-primary" />
//                   <span className="text-sm font-medium text-primary">
//                     Loading messages...
//                   </span>
//                 </div>
//               </div>
//             )}

//           {/* Detail View takes priority */}
//           {selectedMessage ? (
//             <InboxMessageDetailView
//               message={selectedMessage}
//               onBack={() => setSelectedMessage(null)}
//               onDelete={handleDelete}
//               isDeleting={!!actionLoading[selectedMessage._id]}
//             />
//           ) : (
//             // ----- List View -----
//             // Render list structure only when NOT loading OR when loading but it's NOT the initial load
//             // (so the overlay can show above the potentially stale list)
//             (!loading || !isInitialLoad.current) &&
//             !error && (
//               <>
//                 {/* Empty State - Show only if not loading, no error, and no messages AT ALL */}
//                 {!loading && !error && !hasMessagesInTotal ? (
//                   <div className="bg-primarybox rounded-xl lg:p-6 p-4 text-center space-y-4 min-h-[350px] flex flex-col justify-center items-center">
//                     <MailX className="lg:size-16 size-14 mx-auto text-primary" />
//                     <h2 className="lg:text-2xl text-xl font-medium text-neutral-900 dark:text-white">
//                       Your inbox is empty
//                     </h2>
//                     <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto">
//                       You don't have any messages yet. When you receive
//                       notifications or important updates, they will appear here.
//                     </p>
//                   </div>
//                 ) : null}

//                 {/* Message Sections - Show if not loading OR loading non-initially, no error, and has messages */}
//                 {hasMessagesInTotal && (
//                   <div className="space-y-4">
//                     {/* --- New Messages Section --- */}
//                     {unreadMessages.length > 0 && (
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-4">
//                           <div className="bg-primarybox p-2 rounded-md">
//                             <Bell className="text-white" size={28} />
//                           </div>

//                           <h2 className="text-xl font-medium text-white">
//                             New Messages
//                             <div className="ml-2 text-sm bg-primarybox text-white size-5 rounded-full inline-block">
//                               <span className="flex items-center justify-center">
//                                 {unreadMessages.length}
//                               </span>
//                             </div>
//                           </h2>
//                         </div>

//                         <div className="space-y-4">
//                           {unreadMessages.map((message) => (
//                             <InboxMessageListItem
//                               key={message._id}
//                               message={message}
//                               onSelect={handleSelectMessage}
//                               onDelete={handleDelete}
//                               isDeleting={!!actionLoading[message._id]}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Divider */}
//                     {unreadMessages.length > 0 && readMessages.length > 0 && (
//                       <Separator className="sm:my-8 my-5 bg-border/50" />
//                     )}

//                     {/* --- Read Messages Section --- */}
//                     {readMessages.length > 0 && (
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-2 mb-4">
//                           <div className="bg-primarybox p-2 rounded-md">
//                             <CheckCircle2 className="text-white" size={28} />
//                           </div>
//                           <h2 className="text-xl font-medium text-white">
//                             Previous Messages
//                             <div className="ml-2 text-sm bg-primarybox text-white size-5 rounded-full inline-block">
//                               <span className="flex items-center justify-center">
//                                 {readMessages.length}
//                               </span>
//                             </div>
//                           </h2>
//                         </div>
//                         <div className="space-y-4">
//                           {readMessages.map((message) => (
//                             <InboxMessageListItem
//                               key={message._id}
//                               message={message}
//                               onSelect={handleSelectMessage}
//                               onDelete={handleDelete}
//                               isDeleting={!!actionLoading[message._id]}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Empty Page Message - Show if NOT loading, has messages total, but none on THIS page */}
//                     {!loading &&
//                       !error &&
//                       !hasAnyMessagesOnPage &&
//                       hasMessagesInTotal && (
//                         <div className="text-center py-12 bg-muted/30 rounded-lg border border-border/50 min-h-[200px] flex flex-col justify-center items-center">
//                           <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
//                           <p className="text-lg font-medium text-foreground mb-1">
//                             No messages on this page
//                           </p>
//                           <p className="text-muted-foreground">
//                             Try navigating to a different page or refreshing
//                             your inbox.
//                           </p>
//                         </div>
//                       )}
//                   </div>
//                 )}

//                 {/* Pagination - Show if NOT loading, no error, and more than one page */}
//                 {!loading && !error && totalPages > 1 && (
//                   <div className="mt-8">
//                     <Pagination
//                       currentPage={displayPage}
//                       totalPages={totalPages}
//                       paginate={handlePageChange}
//                       goToPreviousPage={() => handlePageChange(displayPage - 1)}
//                       goToNextPage={() => handlePageChange(displayPage + 1)}
//                     />
//                   </div>
//                 )}
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InboxPage;


"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react"; // Added useRef
import { useAuth } from "@/app/contexts/AuthContext";
import inboxService from "../../../services/inbox"; // Adjust path if necessary
import type { InboxMessage, InboxListResponse } from "../../../services/inbox"; // Adjust path if necessary
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Inbox,
  RefreshCw,
  Bell,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MailX,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Adjust path if necessary

// Import the sub-components (adjust paths as needed)
import { InboxSkeleton } from "../../components/inbox/InboxSkeleton";
import { InboxErrorState } from "../../components/inbox/InboxErrorState";
import { InboxMessageListItem } from "../../components/inbox/InboxMessageListItem"; // Updated component
import { InboxMessageDetailView } from "../../components/inbox/InboxMessageDetailView";
import Pagination from "../../components/Pagination"; // Ensure this path is correct
import { GoDotFill } from "react-icons/go";
import { FaComments } from "react-icons/fa";

const MESSAGES_PER_PAGE = 10;

const InboxPage: React.FC = () => {
  // --- Hooks & State ---
  const { user, loading: authLoading } = useAuth();
  const [inboxData, setInboxData] = useState<InboxListResponse | null>(null);
  // Start loading true for initial auth check AND first data fetch
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(
    null
  );
  // Ref to track if it's the very first load attempt after mount/auth or a manual refresh
  const isInitialLoad = useRef(true);

  // --- Data Fetching Logic ---
  const fetchInbox = useCallback(
    async (page: number) => {
      // No need to check 'user' here again, useEffect handles that.
      // Ensure loading is true *during* the fetch operation.
      setLoading(true);
      setError(null); // Clear previous errors on new fetch

      try {
        console.log(`Fetching inbox page ${page}...`);
        const data = await inboxService.getMyMessages(page, MESSAGES_PER_PAGE);
        console.log("Inbox data received:", data);
        setInboxData(data);
        // Sync local page state if API corrected the page number
        if (data.currentPage !== page) {
          // Use setTimeout to avoid state update conflicts during render
          setTimeout(() => setCurrentPage(data.currentPage), 0);
        }
        // Mark initial load as complete after the first successful fetch
        // This will be set to false even if it was a refresh that set isInitialLoad.current to true
        isInitialLoad.current = false;
      } catch (err: any) {
        console.error("Failed to fetch inbox:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Could not load messages.";
        setError(errorMessage);
        setInboxData(null); // Clear data on error
        setSelectedMessage(null); // Clear selection on error
        // Also mark initial load as complete even on error, so skeleton hides
        isInitialLoad.current = false;
      } finally {
        // Ensure loading is set to false *after* all state updates in try/catch
        setLoading(false);
        console.log("Fetch inbox finished, loading set to false.");
      }
    },
    [] // No user dependency needed here, handled by useEffect caller
  );

  // Effect to fetch data based on auth state and page changes
  useEffect(() => {
    console.log("InboxPage Effect triggered:", {
      authLoading,
      user,
      currentPage,
    });

    // If auth is still loading, do nothing yet. The initial 'loading' state is true.
    if (authLoading) {
      console.log("Auth is loading, waiting...");
      // Keep loading true if it isn't already (e.g., if component re-mounted)
      // and ensure isInitialLoad is true for skeleton
      if (!loading) setLoading(true);
      isInitialLoad.current = true; // Ensure skeleton shows during auth loading
      return;
    }

    // Auth is finished.
    if (user) {
      console.log("User found, fetching inbox for page:", currentPage);
      // User exists, fetch their data for the current page.
      // fetchInbox handles setting loading true/false internally for the API call duration.
      // If it's not already an "initial load" (e.g. page change), isInitialLoad remains false.
      // If it *is* an initial load (isInitialLoad.current is true), fetchInbox will handle it.
      fetchInbox(currentPage);
    } else {
      // No user.
      console.log("No user found, setting error and stopping loading.");
      setError("Please log in to view your inbox.");
      setLoading(false); // Stop loading state
      setInboxData(null); // Clear any potential old data
      setSelectedMessage(null); // Clear selection
      isInitialLoad.current = false; // Mark initial load attempt as done
    }

    // --- Dependencies ---
  }, [authLoading, user, currentPage, fetchInbox]);

  // --- Action Handlers (No changes needed in these handlers) ---
  const handleActionStart = (messageId: string) => {
    setActionLoading((prev) => ({ ...prev, [messageId]: true }));
  };

  const handleActionEnd = (messageId: string) => {
    setActionLoading((prev) => {
      const newState = { ...prev };
      delete newState[messageId];
      return newState;
    });
  };

  // Mark as Read with optimistic update
  const handleMarkRead = useCallback(
    async (message: InboxMessage) => {
      if (!message || message.isRead || actionLoading[message._id]) return;

      handleActionStart(message._id);
      const originalData = structuredClone(inboxData);
      const originalSelectedMessage = selectedMessage
        ? structuredClone(selectedMessage)
        : null;

      // Optimistic Update
      setInboxData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: prev.messages.map((msg) =>
            msg._id === message._id ? { ...msg, isRead: true } : msg
          ),
        };
      });

      if (selectedMessage?._id === message._id) {
        setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
      }

      try {
        await inboxService.markAsRead(message._id);
        // Success: Optimistic update is already applied.
      } catch (err) {
        console.error("Failed to mark as read:", err);
        setError("Failed to update message status. Please try refreshing.");
        // Revert optimistic update on error
        setInboxData(originalData);
        setSelectedMessage(originalSelectedMessage);
      } finally {
        handleActionEnd(message._id);
      }
    },
    [inboxData, selectedMessage, actionLoading]
  );

  // Delete Message with optimistic update
  const handleDelete = useCallback(
    async (messageId: string) => {
      if (actionLoading[messageId]) return;

      handleActionStart(messageId);
      const originalData = structuredClone(inboxData);
      const originalSelectedMessage = selectedMessage
        ? structuredClone(selectedMessage)
        : null;
      const isDeletingSelected = selectedMessage?._id === messageId;

      let pageToNavigateTo = currentPage;
      let shouldRefetchCurrentPage = false;

      // Optimistic Update
      setInboxData((prev) => {
        if (!prev) return null;
        const messageIndex = prev.messages.findIndex(
          (msg) => msg._id === messageId
        );
        if (messageIndex === -1) return prev; // Message not found

        const newMessages = prev.messages.filter(
          (msg) => msg._id !== messageId
        );
        const newTotalMessages = Math.max(0, prev.totalMessages - 1);
        const newTotalPages =
          Math.ceil(newTotalMessages / MESSAGES_PER_PAGE) || 1; // Ensure at least 1 page

        // Determine if page change or refetch is needed
        if (
          newMessages.length === 0 &&
          prev.messages.length > 0 &&
          currentPage > 1
        ) {
          // Deleted the last item on a page > 1, go to previous page
          pageToNavigateTo = Math.max(1, currentPage - 1);
        } else if (
          newMessages.length < MESSAGES_PER_PAGE &&
          newTotalMessages >
            newMessages.length + (currentPage - 1) * MESSAGES_PER_PAGE
        ) {
          // Deleted an item, current page is not full, and there are more messages on subsequent pages -> refetch to pull one up
          shouldRefetchCurrentPage = true;
        }

        const optimisticCurrentPage =
          pageToNavigateTo !== currentPage
            ? pageToNavigateTo
            : prev.currentPage;

        return {
          ...prev,
          messages: newMessages,
          totalMessages: newTotalMessages,
          totalPages: newTotalPages,
          currentPage: optimisticCurrentPage,
        };
      });

      // Clear selection immediately if the selected message is deleted
      if (isDeletingSelected) {
        setSelectedMessage(null);
      }

      // Perform API call
      try {
        await inboxService.deleteMessage(messageId);

        if (pageToNavigateTo !== currentPage) {
          setTimeout(() => setCurrentPage(pageToNavigateTo), 0);
        } else if (shouldRefetchCurrentPage) {
          // Use fetchInbox directly instead of relying only on useEffect trigger
          setTimeout(() => fetchInbox(currentPage), 0);
        }
      } catch (err: any) {
        console.error("Failed to delete message:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to delete message. Please try refreshing."
        );
        // Revert optimistic update on error
        setInboxData(originalData);
        if (isDeletingSelected) setSelectedMessage(originalSelectedMessage);
      } finally {
        handleActionEnd(messageId);
      }
    },
    [inboxData, selectedMessage, currentPage, actionLoading, fetchInbox] // Added fetchInbox dependency
  );

  // Select Message and mark as read
  const handleSelectMessage = useCallback(
    (message: InboxMessage) => {
      setSelectedMessage(message);
      // Automatically mark as read when selected, if it's currently unread
      if (!message.isRead) {
        // Delay slightly to allow UI to update first if needed
        setTimeout(() => handleMarkRead(message), 50);
      }
    },
    [handleMarkRead]
  );

  // Page Change Handler
  const handlePageChange = (newPage: number) => {
    if (
      loading || // Prevent change if already loading new data
      newPage === currentPage ||
      newPage < 1 ||
      (inboxData && newPage > inboxData.totalPages)
    ) {
      return; // Avoid unnecessary changes
    }
    setSelectedMessage(null); // Clear detail view when changing pages
    // For page changes, we don't want the full skeleton, so ensure isInitialLoad is false.
    // fetchInbox will set it to false anyway, but this is for clarity if setLoading(true) was outside fetchInbox.
    // isInitialLoad.current = false; // This line is not strictly needed as fetchInbox handles it.
    setCurrentPage(newPage); // Triggers useEffect to fetch new data
  };

  // Refresh Handler
  const handleRefresh = useCallback(() => {
    if (loading) return; // Don't refresh if already loading
    console.log("Refresh triggered, preparing for skeleton.");
    setSelectedMessage(null); // Go back to list view on refresh

    // --- MODIFICATION START ---
    // Treat refresh as an "initial load" for skeleton display purposes
    isInitialLoad.current = true;
    // Explicitly set loading to true here so the skeleton condition is met immediately
    // before fetchInbox also sets it. This can help prevent a flicker.
    setLoading(true);
    // --- MODIFICATION END ---

    fetchInbox(currentPage); // Fetch current page again
  }, [loading, currentPage, fetchInbox]);

  // --- Derived State for Rendering ---
  const { unreadMessages, readMessages } = useMemo(() => {
    const allMessages = inboxData?.messages ?? [];
    const unread = allMessages.filter((msg) => !msg.isRead);
    const read = allMessages.filter((msg) => msg.isRead);
    return { unreadMessages: unread, readMessages: read };
  }, [inboxData?.messages]);

  const totalMessages = inboxData?.totalMessages ?? 0;
  const totalPages = inboxData?.totalPages ?? 1;
  const displayPage = inboxData?.currentPage ?? currentPage; // Use API's current page if available
  const hasAnyMessagesOnPage =
    unreadMessages.length > 0 || readMessages.length > 0;
  const hasMessagesInTotal = totalMessages > 0;

  // --- Render Logic ---

  // 1. Initial Loading State (Skeleton)
  // Show skeleton if auth is loading OR if it's an "initial-like" load (first load or manual refresh)
  // AND the main loading state is true (meaning fetch hasn't completed/failed yet)
  // AND we haven't determined there's an error yet.
  console.log("Render check for Skeleton:", {
    authLoading,
    loading,
    isInitialLoad: isInitialLoad.current,
    error: !!error,
  });

  if (authLoading || (loading && isInitialLoad.current && !error)) {
    console.log(
      "Rendering InboxSkeleton due to initial load, auth, or refresh."
    );
    return <InboxSkeleton />;
  }

  // 2. Not Logged In State (After auth check is complete)
  if (!authLoading && !user) {
    console.log("Rendering Access Denied / Not Logged In");
    return (
      <section className="Your-Inbox py-5 md:py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Inbox className="size-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-xl font-semibold text-mainheading dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            {error || "Please log in to view your inbox."}
          </p>
        </div>
      </section>
    );
  }

  // 3. Logged In - Main Content Rendering
  console.log(
    "Rendering Main Inbox Content Area. isInitialLoad.current:",
    isInitialLoad.current,
    "loading:",
    loading
  );
  return (
    <section className="Your-Inbox py-5 md:py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-md">
              <Inbox className="text-neutral-900" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-nowrap text-mainheading dark:text-white">
                Your Inbox
              </h1>

              {/* Show message count only after initial load and if there's data */}
              {!loading && inboxData && hasMessagesInTotal && (
                <p className="text-sm text-muted-foreground">
                  {unreadMessages.length > 0 ? (
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-primary">
                        {unreadMessages.length} new
                      </span>
                      <GoDotFill size={12} />
                      {readMessages.length > 0 &&
                        `  ${readMessages.length} read`}
                    </div>
                  ) : (
                    `${readMessages.length} message${
                      readMessages.length !== 1 ? "s" : ""
                    }`
                  )}
                </p>
              )}

              {/* Show subtle loading indicator in header during non-initial loads (e.g., pagination, NOT refresh) */}
              {loading &&
                !isInitialLoad.current && ( // This will be false during refresh, so skeleton shows instead
                  <p className="text-sm text-primary flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Updating...</span>
                  </p>
                )}
            </div>
          </div>

          {/* Refresh Button - Show only when NOT loading and in list view */}
          {/* The `loading` state will be true during refresh if skeleton is shown, so this button will hide */}
          {!selectedMessage && !loading && (
              <button
                onClick={handleRefresh}
                disabled={loading} // Redundant if !loading is already a condition for rendering
                className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={cn(
                    "size-5 "
                    // loading && "animte-spin" // Spin if loading state is true - not needed if button hides
                  )}
                />
                <span>Refresh</span>
              </button>
          )}

          {/* Loading Spinner for Refresh/Page Change (Top Right)
              Show only when loading AFTER the initial load/refresh, and in list view */}
          {!selectedMessage &&
            loading &&
            !isInitialLoad.current && ( // This will be false during refresh
              <div className="flex items-center gap-2 text-primary h-9 px-3">
                {" "}
                {/* Match button height/padding */}
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            )}
        </div>

        {/* Error Display Area - Show if error exists and we are NOT in the initial loading phase */}
        {error &&
          !loading && ( // This condition is fine, error state should show after loading attempt
            <div className="mb-6">
              <InboxErrorState error={error} onRetry={handleRefresh} />
            </div>
          )}

        {/* Content Area: List or Detail */}
        <div className="relative">
          {/* Loading overlay - Show only during loading AFTER initial load/refresh, over the list view area */}
          {loading &&
            !isInitialLoad.current && // This will be false during refresh
            !error &&
            !selectedMessage &&
            hasMessagesInTotal && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-20 min-h-[200px]">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="size-8 animate-spin text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Loading messages...
                  </span>
                </div>
              </div>
            )}

          {/* Detail View takes priority */}
          {selectedMessage ? (
            <InboxMessageDetailView
              message={selectedMessage}
              onBack={() => setSelectedMessage(null)}
              onDelete={handleDelete}
              isDeleting={!!actionLoading[selectedMessage._id]}
            />
          ) : (
            // ----- List View -----
            // Render list structure only when NOT loading OR when loading but it's NOT the initial load/refresh
            // (so the overlay can show above the potentially stale list)
            // This condition means the list itself won't render if skeleton is showing.
            (!loading || !isInitialLoad.current) &&
            !error && (
              <>
                {/* Empty State - Show only if not loading, no error, and no messages AT ALL */}
                {!loading && !error && !hasMessagesInTotal ? (
                  <div className="rounded-xl lg:p-6 p-4 text-center space-y-4 min-h-[350px] flex flex-col justify-center items-center">
                    <MailX className="lg:size-16 size-14 mx-auto text-primary" />
                    <h2 className="lg:text-2xl text-xl font-medium text-neutral-900 dark:text-white">
                      Your inbox is empty
                    </h2>
                    <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto">
                      You don't have any messages yet. When you receive
                      notifications or important updates, they will appear here.
                    </p>
                  </div>
                ) : null}

                {/* Message Sections - Show if not loading OR loading non-initially, no error, and has messages */}
                {hasMessagesInTotal && (
                  <div className="space-y-4">
                    {/* --- New Messages Section --- */}
                    {unreadMessages.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="dark:bg-primarybox bg-lightgray p-2 rounded-md">
                            <Bell className="dark:text-white text-neutral-900" size={28} />
                          </div>

                          <h2 className="text-xl font-medium dark:text-white">
                            New Messages
                            <div className="ml-2 text-sm dark:bg-primarybox bg-lightgray dark:text-white text-neutral-900 size-5 rounded-full inline-block">
                              <span className="flex items-center justify-center">
                                {unreadMessages.length}
                              </span>
                            </div>
                          </h2>
                        </div>

                        <div className="space-y-4">
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
                      </div>
                    )}

                    {/* Divider */}
                    {unreadMessages.length > 0 && readMessages.length > 0 && (
                      <Separator className="sm:my-8 my-5 bg-border/50" />
                    )}

                    {/* --- Read Messages Section --- */}
                    {readMessages.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="dark:bg-primarybox bg-lightgray p-2 rounded-md">
                            <FaComments  className="dark:text-white text-neutral-900" size={28} />
                          </div>
                          <h2 className="text-xl font-medium dark:text-white text-mainheading">
                            Previous Messages
                            <div className="ml-2 text-sm dark:bg-primarybox bg-lightgray dark:text-white text-neutral-900 size-5 rounded-full inline-block">
                              <span className="flex items-center justify-center">
                                {readMessages.length}
                              </span>
                            </div>
                          </h2>
                        </div>
                        
                        <div className="space-y-4">
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
                      </div>
                    )}

                    {/* Empty Page Message - Show if NOT loading, has messages total, but none on THIS page */}
                    {!loading &&
                      !error &&
                      !hasAnyMessagesOnPage &&
                      hasMessagesInTotal && (
                        <div className="text-center py-12 bg-muted/30 rounded-lg border border-border/50 min-h-[200px] flex flex-col justify-center items-center">
                          <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
                          <p className="text-lg font-medium text-foreground mb-1">
                            No messages on this page
                          </p>
                          <p className="text-muted-foreground">
                            Try navigating to a different page or refreshing
                            your inbox.
                          </p>
                        </div>
                      )}
                  </div>
                )}

                {/* Pagination - Show if NOT loading, no error, and more than one page */}
                {/* Also ensure it's not an initialLoad phase where skeleton might be showing */}
                {!loading && !error && totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={displayPage}
                      totalPages={totalPages}
                      paginate={handlePageChange}
                      goToPreviousPage={() => handlePageChange(displayPage - 1)}
                      goToNextPage={() => handlePageChange(displayPage + 1)}
                    />
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default InboxPage;
