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
  // Ref to track if it's the very first load attempt after mount/auth
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
      if (!loading) setLoading(true);
      return;
    }

    // Auth is finished.
    if (user) {
      console.log("User found, fetching inbox for page:", currentPage);
      // User exists, fetch their data for the current page.
      // fetchInbox handles setting loading true/false internally for the API call duration.
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
    // Re-run when auth loading state changes.
    // Re-run when user logs in or out.
    // Re-run when the currentPage changes.
    // fetchInbox is memoized by useCallback and doesn't need to be here if its own dependencies are stable (which they are now).
  }, [authLoading, user, currentPage, fetchInbox]); // Removed 'loading' from dependencies

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
    setCurrentPage(newPage); // Triggers useEffect to fetch new data
  };

  // Refresh Handler
  const handleRefresh = useCallback(() => {
    if (loading) return; // Don't refresh if already loading
    console.log("Refresh triggered");
    setSelectedMessage(null); // Go back to list view on refresh
    isInitialLoad.current = false; // Ensure skeleton doesn't show on manual refresh
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
  // Show skeleton if auth is loading OR if it's the initial component load cycle AND
  // the main loading state is true (meaning fetch hasn't completed/failed yet)
  // AND we haven't determined there's an error yet.
  // Using !inboxData helps ensure skeleton shows until first data/error arrives.
  // console.log("Render check:", { authLoading, loading, isInitialLoad: isInitialLoad.current, inboxData: !!inboxData, error: !!error });
  if (authLoading || (loading && isInitialLoad.current && !error)) {
    console.log("Rendering InboxSkeleton");
    return <InboxSkeleton />;
  }

  // 2. Not Logged In State (After auth check is complete)
  if (!authLoading && !user) {
    console.log("Rendering Access Denied / Not Logged In");
    return (
      <section className="Your-Inbox py-8 md:py-12">
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
  console.log("Rendering Main Inbox Content Area");
  return (
    <section className="Your-Inbox py-5 md:py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-md">
              <Inbox className="text-neutral-900" size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-mainheading dark:text-white">
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

              {/* Show subtle loading indicator in header during non-initial loads */}
              {loading && !isInitialLoad.current && (
                <p className="text-sm text-primary flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Updating...</span>
                </p>
              )}
            </div>
          </div>

          {/* Refresh Button - Show only when NOT loading and in list view */}
          {!selectedMessage && !loading && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              // Disable based on generic loading state, not specific action state
              disabled={loading}
              className="flex items-center gap-2 h-9"
            >
              <RefreshCw
                className={cn(
                  "h-4 w-4",
                  loading && "animate-spin" // Spin if loading state is true
                )}
              />
              <span>Refresh</span>
            </Button>
          )}

          {/* Loading Spinner for Refresh/Page Change (Top Right)
              Show only when loading AFTER the initial load, and in list view */}
          {!selectedMessage && loading && !isInitialLoad.current && (
            <div className="flex items-center gap-2 text-primary h-9 px-3">
              {" "}
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          )}

        </div>

        {/* Error Display Area - Show if error exists and we are NOT in the initial loading phase */}
        {error && !loading && (
          <div className="mb-6">
            <InboxErrorState error={error} onRetry={handleRefresh} />
          </div>
        )}

        {/* Content Area: List or Detail */}
        {/* Add min-h-[300px] here if needed, or rely on content below */}
        <div className="relative">
          {/* Loading overlay - Show only during loading AFTER initial load, over the list view area */}
          {loading &&
            !isInitialLoad.current &&
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
            // Render list structure only when NOT loading OR when loading but it's NOT the initial load
            // (so the overlay can show above the potentially stale list)
            (!loading || !isInitialLoad.current) &&
            !error && (
              <>
                {/* Empty State - Show only if not loading, no error, and no messages AT ALL */}
                {!loading && !error && !hasMessagesInTotal ? (
                  <div className="bg-primarybox rounded-xl lg:p-6 p-4 text-center space-y-4 min-h-[350px] flex flex-col justify-center items-center">
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
                          <div className="bg-primarybox p-2 rounded-md">
                            <Bell className="text-white" size={28} />
                          </div>

                          <h2 className="text-xl font-medium text-white">
                            New Messages
                            <div className="ml-2 text-sm bg-primarybox text-white size-5 rounded-full inline-block">
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
                          <div className="bg-primarybox p-2 rounded-md">
                            <CheckCircle2 className="text-white" size={28} />
                          </div>
                          <h2 className="text-xl font-medium text-white">
                            Previous Messages
                            <div className="ml-2 text-sm bg-primarybox text-white size-5 rounded-full inline-block">
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





// // frontend/src/app/admin/inbox/page.tsx
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "../../../admin/messages/inbox/page";
// import type { InboxMessage, InboxListResponse } from "../inbox/InboxMessage";
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, X, Filter, RefreshCw, Inbox as InboxIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// // Import new components
// import InboxTable from "../inbox/InboxTable";
// import { InboxSortField } from "../inbox/InboxTableHeader";
// import InboxEditModal from "../inbox/InboxEditModal";
// import InboxDeleteModal from "../inbox/InboxDeleteModal";
// import { InboxSkeleton } from "../inbox/InboxSkeleton"; // Updated skeleton
// // import { InboxErrorState } from "../components/inbox/InboxErrorState"; // Can be used for general error display

// // Reusable components
// import GenericFilters, { FiltersState } from "../../../admin/components/GenericFilters";
// import Pagination from "../../../admin/components/Pagination"; // Corrected path assuming it's in root components

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     if (
//       !/^\d+$/.test(parts[0]) ||
//       !/^\d+$/.test(parts[1]) ||
//       !/^\d+$/.test(parts[2])
//     ) {
//       return null;
//     }

//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//     const year = parseInt(parts[2], 10);
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       return null;
//     }
//     const date = new Date(Date.UTC(year, month, day));
//     if (
//       date.getUTCFullYear() === year &&
//       date.getUTCMonth() === month &&
//       date.getUTCDate() === day
//     ) {
//       return date;
//     } else {
//       return null;
//     }
//   }
//   return null;
// }

// const AdminInboxPage: React.FC = () => {
//   const { user, token, loading: authLoading } = useAuth();
//   const [messages, setMessages] = useState<InboxMessage[]>([]);
//   const [totalMessagesCount, setTotalMessagesCount] = useState<number>(0);
//   const [filteredMessages, setFilteredMessages] = useState<InboxMessage[]>([]);
//   const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//   const isInitialLoad = useRef(true);

//   // Modal States
//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [showEditModal, setShowEditModal] = useState<boolean>(false);
//   const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
//   const [messageToEdit, setMessageToEdit] = useState<InboxMessage | null>(null);
//   const [messageToDelete, setMessageToDelete] = useState<InboxMessage | null>(
//     null
//   );
//   const [isUpdatingMessage, setIsUpdatingMessage] = useState<boolean>(false);
//   const [isDeletingMessage, setIsDeletingMessage] = useState<boolean>(false);

//   // Filter States (aligned with GenericFilters and Inbox needs)
//   const [searchTerm, setSearchTerm] = useState<string>(""); // General search (subject, sender)
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all"); // 'all', 'read', 'unread'
//   const [messageIdFilter, setMessageIdFilter] = useState<string>(""); // Specific ID filter
//   const [senderFilter, setSenderFilter] = useState<string>(""); // Filter by sender name

//   // Sorting State
//   const [sortField, setSortField] = useState<InboxSortField | null>(
//     "createdAt"
//   );
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

//   // Pagination State
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [messagesPerPage, setMessagesPerPage] = useState<number>(10);
//   const pageSizeOptions: number[] = [10, 25, 50];

//   const fetchMessages = useCallback(
//     async (
//       pageToFetch: number = currentPage,
//       pageSize: number = messagesPerPage
//     ) => {
//       if (!token) {
//         setError("Authentication required.");
//         setLoadingMessages(false);
//         setIsRefreshing(false);
//         setMessages([]);
//         setTotalMessagesCount(0);
//         return;
//       }
//       setLoadingMessages(true);
//       if (pageToFetch === currentPage) setIsRefreshing(true); // Only set refreshing if it's for the current view
//       setError(null);

//       try {
//         // The service fetches paginated, so we don't need to fetch ALL then paginate client-side.
//         // However, for client-side filtering on all data, we would need all data.
//         // For now, let's assume the service provides all data and we filter/paginate client-side for consistency with Transfers page example.
//         // If your inboxService.getMyMessages is strictly paginated, this approach needs to change.
//         // For this example, I'll simulate fetching all and then client-side processing.
//         // In a real scenario, you'd pass filter/sort params to the API.

//         // Simulate fetching all messages for client-side processing
//         // This is NOT ideal for large datasets. API should handle filtering/sorting/pagination.
//         // For now, let's assume `getMyMessages` when called with specific params can return all,
//         // or we iterate through pages. Let's just use the paginated response and apply client filters on THAT page.
//         // This means client-side filters will only apply to the currently fetched page of data.
//         // To match TransferPage which seems to fetch all then filter client-side:
//         const response = await inboxService.getAllMyMessages(); // You'll need a service method for this

//         const validatedData = response.map((msg: InboxMessage) => ({
//           ...msg,
//           _id: String(msg._id ?? ""),
//           subject: String(msg.subject ?? "No Subject"),
//           senderName: String(msg.senderName ?? (msg.senderType || "System")),
//           isRead: !!msg.isRead,
//           createdAt: msg.createdAt || new Date(0).toISOString(),
//         }));

//         setMessages(validatedData);
//         setTotalMessagesCount(validatedData.length); // If fetching all
//         if (isInitialLoad.current) isInitialLoad.current = false;
//       } catch (err: any) {
//         const message =
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to load messages.";
//         setError(message);
//         setMessages([]);
//         setTotalMessagesCount(0);
//         console.error("Error fetching messages:", err);
//         if (isInitialLoad.current) isInitialLoad.current = false;
//       } finally {
//         setLoadingMessages(false);
//         setIsRefreshing(false);
//       }
//     },
//     [token, currentPage, messagesPerPage]
//   ); // Removed messagesPerPage from dep if fetching all

//   useEffect(() => {
//     if (token && !authLoading) {
//       fetchMessages(1); // Fetch initial data
//     } else if (!authLoading && !token) {
//       setError("Authentication required.");
//       setLoadingMessages(false);
//       setMessages([]);
//       setTotalMessagesCount(0);
//       if (isInitialLoad.current) isInitialLoad.current = false;
//     }
//   }, [token, authLoading, fetchMessages]);

//   // Apply filters and sorting
//   useEffect(() => {
//     let results: InboxMessage[] = [...messages];

//     // General Search Term (subject, senderName)
//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase();
//       results = results.filter(
//         (msg) =>
//           msg.subject?.toLowerCase().includes(lowerSearchTerm) ||
//           msg.senderName?.toLowerCase().includes(lowerSearchTerm) ||
//           msg._id?.toLowerCase().includes(lowerSearchTerm) // Also search ID
//       );
//     }

//     // Message ID Filter
//     if (messageIdFilter) {
//       results = results.filter((msg) =>
//         msg._id.toLowerCase().includes(messageIdFilter.toLowerCase())
//       );
//     }

//     // Sender Filter
//     if (senderFilter) {
//       results = results.filter(
//         (msg) =>
//           (msg.senderName || "")
//             .toLowerCase()
//             .includes(senderFilter.toLowerCase()) ||
//           (msg.senderType || "")
//             .toLowerCase()
//             .includes(senderFilter.toLowerCase())
//       );
//     }

//     // Status Filter (isRead)
//     if (statusFilter !== "all") {
//       const targetReadStatus = statusFilter === "read";
//       results = results.filter((msg) => msg.isRead === targetReadStatus);
//     }

//     // Date Range Filter
//     const fromDateObj = parseDateString(fromDate);
//     const toDateObj = parseDateString(toDate);

//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0);
//       results = results.filter((msg) => {
//         try {
//           const msgDate = new Date(msg.createdAt);
//           return !isNaN(msgDate.getTime()) && msgDate >= fromDateObj;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999);
//       results = results.filter((msg) => {
//         try {
//           const msgDate = new Date(msg.createdAt);
//           return !isNaN(msgDate.getTime()) && msgDate <= toDateObj;
//         } catch {
//           return false;
//         }
//       });
//     }

//     // Apply Sorting
//     if (sortField) {
//       results.sort((a, b) => {
//         let valueA: any;
//         let valueB: any;

//         switch (sortField) {
//           case "_id":
//             valueA = a._id;
//             valueB = b._id;
//             break;
//           case "subject":
//             valueA = a.subject?.toLowerCase() ?? "";
//             valueB = b.subject?.toLowerCase() ?? "";
//             break;
//           case "senderName":
//             valueA = (a.senderName || a.senderType)?.toLowerCase() ?? "";
//             valueB = (b.senderName || b.senderType)?.toLowerCase() ?? "";
//             break;
//           case "isRead":
//             valueA = a.isRead;
//             valueB = b.isRead;
//             break;
//           case "createdAt":
//             valueA = new Date(a.createdAt).getTime() || 0;
//             valueB = new Date(b.createdAt).getTime() || 0;
//             break;
//           default:
//             valueA = "";
//             valueB = "";
//         }

//         let comparison = 0;
//         if (valueA < valueB) comparison = -1;
//         else if (valueA > valueB) comparison = 1;

//         // For boolean (isRead), false (unread) might be desired before true (read) or vice-versa
//         if (sortField === "isRead") {
//           // Example: Unread (false) first when ascending
//           comparison = valueA === valueB ? 0 : valueA ? 1 : -1;
//         }

//         return sortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }

//     setFilteredMessages(results);
//   }, [
//     messages,
//     searchTerm,
//     statusFilter,
//     fromDate,
//     toDate,
//     messageIdFilter,
//     senderFilter,
//     sortField,
//     sortDirection,
//   ]);

//   // Reset Page on Filter/Sort Change
//   useEffect(() => {
//     if (currentPage !== 1) {
//       setCurrentPage(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     searchTerm,
//     statusFilter,
//     fromDate,
//     toDate,
//     messageIdFilter,
//     senderFilter,
//     sortField,
//     sortDirection,
//     messagesPerPage,
//   ]);

//   const handleApplyFilters = useCallback((filters: FiltersState) => {
//     setSearchTerm(filters.searchTerm);
//     setFromDate(filters.fromDate);
//     setToDate(filters.toDate);
//     setStatusFilter(filters.statusFilter); // 'all', 'read', 'unread'
//     setMessageIdFilter(filters.idFilter); // Using idFilter from GenericFilters for messageId
//     setSenderFilter(filters.recipientFilter || ""); // Using recipientFilter for sender
//     // Amount and Currency filters are not used for inbox
//   }, []);

//   const handleClearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setFromDate("");
//     setToDate("");
//     setStatusFilter("all");
//     setMessageIdFilter("");
//     setSenderFilter("");
//     // Optionally reset sorting
//     // setSortField("createdAt");
//     // setSortDirection("desc");
//   }, []);

//   const handlePageSizeChange = (size: number) => {
//     setMessagesPerPage(size);
//     // setCurrentPage(1); // useEffect above handles this
//   };

//   const toggleSort = (field: InboxSortField) => {
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   const getStatusColor = (isRead: boolean) => {
//     return isRead
//       ? "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400" // Read
//       : "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400"; // Unread
//   };

//   const statusOptions = useMemo(() => {
//     return [
//       { value: "all", label: "All Statuses" },
//       { value: "read", label: "Read" },
//       { value: "unread", label: "Unread" },
//     ].map((opt) => opt.label); // GenericFilters expects string[]
//   }, []);

//   const refreshData = useCallback(() => {
//     if (isRefreshing || loadingMessages) return;
//     fetchMessages(currentPage); // Refetch current page
//     setSuccessMessage("Inbox refreshed.");
//     setTimeout(() => setSuccessMessage(null), 3000);
//   }, [fetchMessages, currentPage, isRefreshing, loadingMessages]);

//   const { currentMessagesOnPage, totalPages } = useMemo(() => {
//     const indexOfLastMessage = currentPage * messagesPerPage;
//     const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
//     const paginatedData = filteredMessages.slice(
//       indexOfFirstMessage,
//       indexOfLastMessage
//     );
//     const pages = Math.ceil(filteredMessages.length / messagesPerPage);
//     return {
//       currentMessagesOnPage: paginatedData,
//       totalPages: Math.max(pages, 1),
//     };
//   }, [filteredMessages, currentPage, messagesPerPage]);

//   useEffect(() => {
//     if (totalPages > 0 && currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const paginate = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     } else if (pageNumber < 1 && totalPages > 0) {
//       setCurrentPage(1);
//     } else if (pageNumber > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   };
//   const goToPreviousPage = () => paginate(currentPage - 1);
//   const goToNextPage = () => paginate(currentPage + 1);

//   const handleEditClick = (message: InboxMessage) => {
//     setMessageToEdit(message);
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (message: InboxMessage) => {
//     setMessageToDelete(message);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmToggleRead = async (
//     message: InboxMessage,
//     newReadState: boolean
//   ) => {
//     if (!message) return;
//     setIsUpdatingMessage(true);
//     try {
//       if (newReadState) {
//         // Mark as read
//         await inboxService.markAsRead(message._id);
//       } else {
//         // Mark as unread (assuming you have a service for this)
//         await inboxService.markAsUnread(message._id); // Create this service method
//       }
//       setMessages((prev) =>
//         prev.map((m) =>
//           m._id === message._id ? { ...m, isRead: newReadState } : m
//         )
//       );
//       setSuccessMessage(
//         `Message marked as ${newReadState ? "read" : "unread"}.`
//       );
//       setShowEditModal(false);
//       setMessageToEdit(null);
//     } catch (e: any) {
//       setError(e.message || "Failed to update message status.");
//     } finally {
//       setIsUpdatingMessage(false);
//       setTimeout(() => setSuccessMessage(null), 3000);
//     }
//   };

//   const handleConfirmDelete = async (messageId: string) => {
//     setIsDeletingMessage(true);
//     try {
//       await inboxService.deleteMessage(messageId);
//       setMessages((prev) => prev.filter((m) => m._id !== messageId));
//       setSuccessMessage("Message deleted successfully.");
//       setShowDeleteModal(false);
//       setMessageToDelete(null);
//       // Adjust current page if last item on page deleted
//       if (
//         currentMessagesOnPage.length === 1 &&
//         currentPage > 1 &&
//         messageId === currentMessagesOnPage[0]._id
//       ) {
//         setCurrentPage((prev) => Math.max(1, prev - 1));
//       }
//     } catch (e: any) {
//       setError(e.message || "Failed to delete message.");
//     } finally {
//       setIsDeletingMessage(false);
//       setTimeout(() => setSuccessMessage(null), 3000);
//     }
//   };

//   const currentFilterState: FiltersState = useMemo(
//     () => ({
//       searchTerm,
//       fromDate,
//       toDate,
//       statusFilter, // 'all', 'read', 'unread'
//       currencyFilter: "all", // Not used for inbox, provide default
//       idFilter: messageIdFilter,
//       amountFilter: "", // Not used
//       recipientFilter: senderFilter,
//     }),
//     [searchTerm, fromDate, toDate, statusFilter, messageIdFilter, senderFilter]
//   );

//   if (authLoading || (isInitialLoad.current && loadingMessages)) {
//     // Full page skeleton or a simpler loading state could be used during auth check
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <InboxSkeleton />
//       </div>
//     );
//   }

//   if (!user && !authLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <InboxIcon size={48} className="mx-auto mb-4 text-gray-400" />
//         <h1 className="text-xl font-semibold mb-2">Access Denied</h1>
//         <p className="text-gray-600 dark:text-gray-300">
//           Please log in to view your inbox.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="space-y-6">
//         <div className="flex flex-wrap justify-between items-center gap-4">
//           <h1 className="text-2xl font-bold text-mainheading dark:text-white">
//             Admin Inbox
//           </h1>
//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-base px-8 py-3 h-12.5 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-75 ease-linear"
//             >
//               <Filter size={18} />
//               Filters
//             </button>
//             <button
//               onClick={refreshData}
//               disabled={isRefreshing || loadingMessages}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh inbox data"
//             >
//               <RefreshCw
//                 className={cn(
//                   "size-5",
//                   (isRefreshing || loadingMessages) &&
//                     !isInitialLoad.current &&
//                     "animate-spin"
//                 )}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <Check
//                   className="text-green-600 dark:text-green-400"
//                   size={18}
//                 />
//                 <p className="text-sm font-medium text-green-800 dark:text-green-300">
//                   {successMessage}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSuccessMessage(null)}
//                 className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
//               >
//                 <X size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <X className="text-red-600 dark:text-red-400" size={18} />
//                 <p className="text-sm font-medium text-red-800 dark:text-red-300">
//                   {error}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setError(null)}
//                 className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
//               >
//                 <X size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="messagesPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="messagesPerPage"
//               value={messagesPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none bg-white dark:bg-primarybox dark:text-white cursor-pointer"
//             >
//               {pageSizeOptions.map((size) => (
//                 <option
//                   key={size}
//                   value={size}
//                   className="dark:bg-dropdowncolor"
//                 >
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {filteredMessages.length > 0
//               ? (currentPage - 1) * messagesPerPage + 1
//               : 0}
//             -{Math.min(currentPage * messagesPerPage, filteredMessages.length)}{" "}
//             of {filteredMessages.length} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         <InboxTable
//           filteredMessages={currentMessagesOnPage}
//           loadingMessages={loadingMessages && isInitialLoad.current} // Show skeleton only on initial load
//           getStatusColor={getStatusColor}
//           toggleSort={toggleSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//           onEdit={handleEditClick}
//           onDelete={handleDeleteClick}
//         />

//         {totalPages > 1 && !loadingMessages && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//         {filteredMessages.length === 0 && !loadingMessages && !error && (
//           <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//             <InboxIcon size={48} className="mx-auto mb-4" />
//             No messages to display.
//           </div>
//         )}
//       </div>

//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={currentFilterState}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearAllFilters}
//         currencyOptions={[]} // No currency for inbox
//         statusOptions={statusOptions} // ['All Statuses', 'Read', 'Unread']
//         idFilterLabel="Message ID"
//         idFilterPlaceholder="Filter by Message ID"
//         recipientFilterLabel="Sender Name/Type"
//         recipientFilterPlaceholder="Filter by Sender"
//         showRecipientFilter={true}
//         showIdFilter={true}
//         showAmountFilter={false} // No amount for inbox
//         showCurrencyFilter={false} // No currency for inbox
//         showStatusFilter={true}
//         showDateFilter={true}
//         allStatusesLabel="All Statuses" // Ensure CustomDropdown handles this
//       />

//       <InboxEditModal
//         isOpen={showEditModal}
//         onClose={() => {
//           setShowEditModal(false);
//           setMessageToEdit(null);
//         }}
//         message={messageToEdit}
//         onConfirmToggleRead={handleConfirmToggleRead}
//         isUpdating={isUpdatingMessage}
//       />

//       <InboxDeleteModal
//         isOpen={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setMessageToDelete(null);
//         }}
//         message={messageToDelete}
//         onConfirmDelete={handleConfirmDelete}
//         isDeleting={isDeletingMessage}
//       />
//     </div>
//   );
// };

// export default AdminInboxPage;



// // frontend/src/app/admin/inbox/page.tsx
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { useAuth } from "@/app/contexts/AuthContext";
// import inboxService from "@/services/inbox";
// import type { InboxMessage } from "@/services/inbox";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Check,
//   X,
//   Filter,
//   RefreshCw,
//   Inbox as InboxIconLucide,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// import InboxTable from "../components/inbox/InboxTable";
// import { InboxSortField } from "../components/inbox/InboxTableHeader";
// import InboxEditModal from "../components/inbox/InboxEditModal";
// import InboxDeleteModal from "../components/inbox/InboxDeleteModal";
// import { InboxSkeleton } from "../components/inbox/InboxSkeleton";

// import GenericFilters, { FiltersState } from "../components/GenericFilters";
// import Pagination from "@/components/Pagination";

// // Helper function to parse date string (dd-MM-yyyy) to Date object
// function parseDateString(dateString: string): Date | null {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     if (
//       !/^\d+$/.test(parts[0]) ||
//       !/^\d+$/.test(parts[1]) ||
//       !/^\d+$/.test(parts[2])
//     ) {
//       return null;
//     }
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//     const year = parseInt(parts[2], 10);
//     if (
//       day < 1 ||
//       day > 31 ||
//       month < 0 ||
//       month > 11 ||
//       year < 1900 ||
//       year > 3000
//     ) {
//       return null;
//     }
//     const date = new Date(Date.UTC(year, month, day));
//     if (
//       date.getUTCFullYear() === year &&
//       date.getUTCMonth() === month &&
//       date.getUTCDate() === day
//     ) {
//       return date;
//     } else {
//       return null;
//     }
//   }
//   return null;
// }

// // Placeholder for fetching user data to display recipient names
// // In a real app, this might come from context, a separate fetch, or be part of InboxMessage
// interface UserInfo {
//   _id: string;
//   fullName?: string;
//   email?: string;
// }

// const AdminInboxPage: React.FC = () => {
//   const { user, token, loading: authLoading } = useAuth();
//   const [messages, setMessages] = useState<InboxMessage[]>([]);
//   // const [usersMap, setUsersMap] = useState<Record<string, UserInfo>>({}); // For recipient names
//   const [filteredMessages, setFilteredMessages] = useState<InboxMessage[]>([]);
//   const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//   const isInitialLoad = useRef(true);

//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [showEditModal, setShowEditModal] = useState<boolean>(false);
//   const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
//   const [messageToEdit, setMessageToEdit] = useState<InboxMessage | null>(null);
//   const [messageToDelete, setMessageToDelete] = useState<InboxMessage | null>(
//     null
//   );
//   const [isUpdatingMessage, setIsUpdatingMessage] = useState<boolean>(false);
//   const [isDeletingMessage, setIsDeletingMessage] = useState<boolean>(false);

//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all"); // 'all', 'read', 'unread'
//   const [messageIdFilter, setMessageIdFilter] = useState<string>("");
//   const [senderFilter, setSenderFilter] = useState<string>("");
//   const [recipientFilter, setRecipientFilter] = useState<string>("");

//   const [sortField, setSortField] = useState<InboxSortField | null>(
//     "createdAt"
//   );
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [messagesPerPage, setMessagesPerPage] = useState<number>(10);
//   const pageSizeOptions: number[] = [10, 25, 50];

//   const fetchMessagesAndUsers = useCallback(async () => {
//     if (!token) {
//       setError("Authentication required.");
//       setLoadingMessages(false);
//       setIsRefreshing(false);
//       setMessages([]);
//       return;
//     }
//     setLoadingMessages(true);
//     setIsRefreshing(true);
//     setError(null);

//     try {
//       // Fetch all messages (as per Transfer page example for client-side filtering)
//       const allMessagesData = await inboxService.getAllMyMessages(); // Ensure this service exists and works

//       const validatedMessages = allMessagesData.map((msg: InboxMessage) => ({
//         ...msg,
//         _id: String(msg._id ?? ""),
//         userId: String(msg.userId ?? ""), // Ensure userId is a string
//         subject: String(msg.subject ?? "No Subject"),
//         senderName: String(msg.senderName ?? (msg.senderType || "System")),
//         isRead: !!msg.isRead,
//         createdAt: msg.createdAt || new Date(0).toISOString(),
//         // Add recipientName and recipientIdentifier if backend provides them
//         recipientName:
//           msg.recipientName || `User ${msg.userId?.substring(0, 6)}`, // Placeholder
//         recipientIdentifier: msg.recipientIdentifier || msg.userId, // Placeholder
//       }));
//       setMessages(validatedMessages);

//       // Example: Fetch users to map userId to names - This part is illustrative
//       // const userIds = new Set(validatedMessages.map(m => m.userId).filter(id => id));
//       // if (userIds.size > 0) {
//       //   // const usersData = await userService.getUsersByIds(Array.from(userIds)); // Fictional service
//       //   // const map: Record<string, UserInfo> = {};
//       //   // usersData.forEach(u => map[u._id] = u);
//       //   // setUsersMap(map);
//       // }

//       if (isInitialLoad.current) isInitialLoad.current = false;
//     } catch (err: any) {
//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to load messages.";
//       setError(message);
//       setMessages([]);
//       // setUsersMap({});
//       console.error("Error fetching messages:", err);
//       if (isInitialLoad.current) isInitialLoad.current = false;
//     } finally {
//       setLoadingMessages(false);
//       setIsRefreshing(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     if (token && !authLoading) {
//       fetchMessagesAndUsers();
//     } else if (!authLoading && !token) {
//       setError("Authentication required.");
//       setLoadingMessages(false);
//       setMessages([]);
//       if (isInitialLoad.current) isInitialLoad.current = false;
//     }
//   }, [token, authLoading, fetchMessagesAndUsers]);

//   // Function to get recipient display info (example)
//   const getRecipientDisplayInfo = useCallback(
//     (userId: string) => {
//       // const userDetail = usersMap[userId];
//       // return {
//       //   name: userDetail?.fullName || `User`,
//       //   idPart: userId.substring(Math.max(0, userId.length - 6)) // Last 6 chars of ID
//       // };
//       // For now, using placeholders from augmented message object
//       const message = messages.find((m) => m.userId === userId);
//       return {
//         name: message?.recipientName || `User`,
//         idPart:
//           message?.recipientIdentifier?.substring(
//             Math.max(0, (message.recipientIdentifier || "").length - 6)
//           ) || userId.substring(Math.max(0, userId.length - 6)),
//       };
//     },
//     [messages]
//   );

//   useEffect(() => {
//     let results: InboxMessage[] = [...messages];

//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase();
//       results = results.filter(
//         (msg) =>
//           msg._id.toLowerCase().includes(lowerSearchTerm) ||
//           (msg.recipientName || msg.userId)
//             .toLowerCase()
//             .includes(lowerSearchTerm) ||
//           (msg.senderName || msg.senderType || "")
//             .toLowerCase()
//             .includes(lowerSearchTerm) ||
//           msg.subject.toLowerCase().includes(lowerSearchTerm)
//       );
//     }
//     if (messageIdFilter) {
//       results = results.filter((msg) =>
//         msg._id.toLowerCase().includes(messageIdFilter.toLowerCase())
//       );
//     }
//     if (recipientFilter) {
//       // Filters by recipient user ID or name
//       results = results.filter(
//         (msg) =>
//           msg.userId.toLowerCase().includes(recipientFilter.toLowerCase()) ||
//           (msg.recipientName || "")
//             .toLowerCase()
//             .includes(recipientFilter.toLowerCase())
//       );
//     }
//     if (senderFilter) {
//       // Filters by sender name or type
//       results = results.filter(
//         (msg) =>
//           (msg.senderName || "")
//             .toLowerCase()
//             .includes(senderFilter.toLowerCase()) ||
//           (msg.senderType || "")
//             .toLowerCase()
//             .includes(senderFilter.toLowerCase())
//       );
//     }
//     if (statusFilter !== "all") {
//       const targetReadStatus = statusFilter === "read";
//       results = results.filter((msg) => msg.isRead === targetReadStatus);
//     }
//     const fromDateObj = parseDateString(fromDate);
//     const toDateObj = parseDateString(toDate);
//     if (fromDateObj) {
//       fromDateObj.setUTCHours(0, 0, 0, 0);
//       results = results.filter((msg) => new Date(msg.createdAt) >= fromDateObj);
//     }
//     if (toDateObj) {
//       toDateObj.setUTCHours(23, 59, 59, 999);
//       results = results.filter((msg) => new Date(msg.createdAt) <= toDateObj);
//     }

//     if (sortField) {
//       results.sort((a, b) => {
//         let valueA: any;
//         let valueB: any;
//         switch (sortField) {
//           case "_id":
//             valueA = a._id;
//             valueB = b._id;
//             break;
//           case "recipientId":
//             valueA = a.userId?.toLowerCase() ?? "";
//             valueB = b.userId?.toLowerCase() ?? "";
//             break; // Sort by userId
//           case "senderName":
//             valueA = (a.senderName || a.senderType)?.toLowerCase() ?? "";
//             valueB = (b.senderName || b.senderType)?.toLowerCase() ?? "";
//             break;
//           case "subject":
//             valueA = a.subject?.toLowerCase() ?? "";
//             valueB = b.subject?.toLowerCase() ?? "";
//             break;
//           case "isRead":
//             valueA = a.isRead;
//             valueB = b.isRead;
//             break;
//           case "createdAt":
//             valueA = new Date(a.createdAt).getTime();
//             valueB = new Date(b.createdAt).getTime();
//             break;
//           default:
//             valueA = "";
//             valueB = "";
//         }
//         let comparison = 0;
//         if (valueA < valueB) comparison = -1;
//         else if (valueA > valueB) comparison = 1;
//         if (sortField === "isRead")
//           comparison = valueA === valueB ? 0 : valueA ? 1 : -1; // false (unread) first
//         return sortDirection === "asc" ? comparison : comparison * -1;
//       });
//     }
//     setFilteredMessages(results);
//   }, [
//     messages,
//     searchTerm,
//     statusFilter,
//     fromDate,
//     toDate,
//     messageIdFilter,
//     senderFilter,
//     recipientFilter,
//     sortField,
//     sortDirection,
//   ]);

//   useEffect(() => {
//     if (currentPage !== 1) setCurrentPage(1);
//   }, [
//     searchTerm,
//     statusFilter,
//     fromDate,
//     toDate,
//     messageIdFilter,
//     senderFilter,
//     recipientFilter,
//     sortField,
//     sortDirection,
//     messagesPerPage,
//   ]);

//   const handleApplyFilters = useCallback((filters: FiltersState) => {
//     setSearchTerm(filters.searchTerm);
//     setFromDate(filters.fromDate);
//     setToDate(filters.toDate);
//     setStatusFilter(filters.statusFilter);
//     setMessageIdFilter(filters.idFilter);
//     setRecipientFilter(filters.recipientFilter || ""); // Use recipientFilter for Recipient (User) filtering
//     setSenderFilter(filters.senderFilter || ""); // Add senderFilter to FiltersState if needed, or repurpose another
//   }, []);

//   const handleClearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setFromDate("");
//     setToDate("");
//     setStatusFilter("all");
//     setMessageIdFilter("");
//     setSenderFilter("");
//     setRecipientFilter("");
//   }, []);

//   const handlePageSizeChange = (size: number) => setMessagesPerPage(size);
//   const toggleSort = (field: InboxSortField) => {
//     const newDirection =
//       sortField === field && sortDirection === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//   };

//   const getStatusColor = (isRead: boolean) => {
//     return isRead
//       ? "text-green-700 bg-green-100 dark:bg-green-700/20 dark:text-green-400"
//       : "text-yellow-700 bg-yellow-100 dark:bg-yellow-700/20 dark:text-yellow-400";
//   };

//   const statusOptionsForFilter = useMemo(() => ["all", "read", "unread"], []);

//   const refreshData = useCallback(() => {
//     if (isRefreshing || loadingMessages) return;
//     fetchMessagesAndUsers();
//     setSuccessMessage("Inbox refreshed.");
//     setTimeout(() => setSuccessMessage(null), 3000);
//   }, [fetchMessagesAndUsers, isRefreshing, loadingMessages]);

//   const { currentMessagesOnPage, totalPages } = useMemo(() => {
//     const indexOfLastMessage = currentPage * messagesPerPage;
//     const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
//     const paginatedData = filteredMessages.slice(
//       indexOfFirstMessage,
//       indexOfLastMessage
//     );
//     return {
//       currentMessagesOnPage: paginatedData,
//       totalPages: Math.max(
//         1,
//         Math.ceil(filteredMessages.length / messagesPerPage)
//       ),
//     };
//   }, [filteredMessages, currentPage, messagesPerPage]);

//   useEffect(() => {
//     if (totalPages > 0 && currentPage > totalPages) setCurrentPage(totalPages);
//   }, [currentPage, totalPages]);

//   const paginate = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
//     else if (pageNumber < 1 && totalPages > 0) setCurrentPage(1);
//     else if (pageNumber > totalPages && totalPages > 0)
//       setCurrentPage(totalPages);
//   };
//   const goToPreviousPage = () => paginate(currentPage - 1);
//   const goToNextPage = () => paginate(currentPage + 1);

//   const handleEditClick = (message: InboxMessage) => {
//     setMessageToEdit(message);
//     setShowEditModal(true);
//   };
//   const handleDeleteClick = (message: InboxMessage) => {
//     setMessageToDelete(message);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmToggleRead = async (
//     message: InboxMessage,
//     newReadState: boolean
//   ) => {
//     if (!message) return;
//     setIsUpdatingMessage(true);
//     try {
//       newReadState
//         ? await inboxService.markAsRead(message._id)
//         : await inboxService.markAsUnread(message._id);
//       setMessages((prev) =>
//         prev.map((m) =>
//           m._id === message._id ? { ...m, isRead: newReadState } : m
//         )
//       );
//       setSuccessMessage(
//         `Message marked as ${newReadState ? "read" : "unread"}.`
//       );
//       setShowEditModal(false);
//       setMessageToEdit(null);
//     } catch (e: any) {
//       setError(e.message || "Failed to update message status.");
//     } finally {
//       setIsUpdatingMessage(false);
//       setTimeout(() => setSuccessMessage(null), 3000);
//     }
//   };

//   const handleConfirmDelete = async (messageId: string) => {
//     setIsDeletingMessage(true);
//     try {
//       await inboxService.deleteMessage(messageId);
//       setMessages((prev) => prev.filter((m) => m._id !== messageId));
//       setSuccessMessage("Message deleted successfully.");
//       setShowDeleteModal(false);
//       setMessageToDelete(null);
//       if (
//         currentMessagesOnPage.length === 1 &&
//         currentPage > 1 &&
//         messageId === currentMessagesOnPage[0]._id
//       ) {
//         setCurrentPage((prev) => Math.max(1, prev - 1));
//       }
//     } catch (e: any) {
//       setError(e.message || "Failed to delete message.");
//     } finally {
//       setIsDeletingMessage(false);
//       setTimeout(() => setSuccessMessage(null), 3000);
//     }
//   };

//   const currentFilterState: FiltersState = useMemo(
//     () => ({
//       searchTerm,
//       fromDate,
//       toDate,
//       statusFilter,
//       currencyFilter: "all",
//       idFilter: messageIdFilter,
//       amountFilter: "",
//       recipientFilter: recipientFilter, // Filters messages FOR this recipient
//       senderFilter: senderFilter, // Custom prop for GenericFilters if you add it
//     }),
//     [
//       searchTerm,
//       fromDate,
//       toDate,
//       statusFilter,
//       messageIdFilter,
//       recipientFilter,
//       senderFilter,
//     ]
//   );

//   if (authLoading || (isInitialLoad.current && loadingMessages)) {
//     return (
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <InboxSkeleton />
//       </div>
//     );
//   }

//   if (!user && !authLoading) {
//     return (
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
//         <InboxIconLucide
//           size={48}
//           className="mx-auto mb-4 text-gray-400 dark:text-gray-500"
//         />
//         <h1 className="text-xl font-semibold mb-2 text-mainheading dark:text-white">
//           Access Denied
//         </h1>
//         <p className="text-gray-600 dark:text-gray-300">
//           Please log in to view the admin inbox.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
//       <div className="space-y-6">
//         <div className="flex flex-wrap justify-between items-center gap-4">
//           <h1 className="text-2xl font-bold text-mainheading dark:text-white">
//             Inbox Management
//           </h1>
//           <div className="flex items-center gap-3 justify-end sm:w-auto w-full">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-primary text-neutral-900 font-medium text-sm px-6 py-2.5 h-10 sm:w-auto w-full rounded-full hover:bg-primaryhover transition-all duration-150 ease-linear"
//             >
//               <Filter size={16} />
//               Filters
//             </button>
//             <button
//               onClick={refreshData}
//               disabled={isRefreshing || loadingMessages}
//               className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white font-medium text-sm px-6 py-2.5 h-10 sm:w-auto w-full rounded-full transition-all duration-150 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               title="Refresh inbox data"
//             >
//               <RefreshCw
//                 className={cn(
//                   "size-4",
//                   (isRefreshing ||
//                     (loadingMessages && !isInitialLoad.current)) &&
//                     "animate-spin"
//                 )}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <Check
//                   className="text-green-600 dark:text-green-400"
//                   size={18}
//                 />
//                 <p className="text-sm font-medium text-green-700 dark:text-green-300">
//                   {successMessage}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSuccessMessage(null)}
//                 className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 p-1 rounded-full"
//               >
//                 <X size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 flex justify-between items-center"
//             >
//               <div className="flex items-center gap-2">
//                 <X className="text-red-600 dark:text-red-400" size={18} />{" "}
//                 {/* Changed icon to X for error */}
//                 <p className="text-sm font-medium text-red-700 dark:text-red-300">
//                   {error}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setError(null)}
//                 className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 p-1 rounded-full"
//               >
//                 <X size={18} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="flex flex-wrap justify-between items-center gap-4">
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="messagesPerPage"
//               className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap"
//             >
//               Show:
//             </label>
//             <select
//               id="messagesPerPage"
//               value={messagesPerPage}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               className="block w-auto pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-800 dark:text-white cursor-pointer"
//             >
//               {pageSizeOptions.map((size) => (
//                 <option key={size} value={size} className="dark:bg-neutral-700">
//                   {size}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
//               entries
//             </span>
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Showing{" "}
//             {filteredMessages.length > 0
//               ? (currentPage - 1) * messagesPerPage + 1
//               : 0}
//             -{Math.min(currentPage * messagesPerPage, filteredMessages.length)}{" "}
//             of {filteredMessages.length} results
//             {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
//           </p>
//         </div>

//         <InboxTable
//           filteredMessages={currentMessagesOnPage}
//           loadingMessages={loadingMessages && isInitialLoad.current}
//           getStatusColor={getStatusColor}
//           toggleSort={toggleSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//           onEdit={handleEditClick}
//           onDelete={handleDeleteClick}
//           getRecipientDisplay={getRecipientDisplayInfo}
//         />

//         {totalPages > 1 && !loadingMessages && filteredMessages.length > 0 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             paginate={paginate}
//             goToPreviousPage={goToPreviousPage}
//             goToNextPage={goToNextPage}
//           />
//         )}
//         {filteredMessages.length === 0 && !loadingMessages && !error && (
//           <div className="text-center py-10 text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-neutral-700 rounded-lg">
//             <InboxIconLucide size={40} className="mx-auto mb-3 opacity-50" />
//             No messages found.
//           </div>
//         )}
//       </div>

//       <GenericFilters
//         showFilterModal={showFilterModal}
//         setShowFilterModal={setShowFilterModal}
//         initialFilters={currentFilterState}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearAllFilters}
//         currencyOptions={[]}
//         statusOptions={statusOptionsForFilter}
//         idFilterLabel="Message ID"
//         idFilterPlaceholder="Filter by Message ID"
//         // For recipient filtering (messages FOR this user)
//         recipientFilterLabel="Recipient (User ID/Name)"
//         recipientFilterPlaceholder="Filter by Recipient"
//         showRecipientFilter={true}
//         // Add sender filter configuration if GenericFilters supports it or extend it
//         // For now, sender is part of general search or you can add a custom field to GenericFilters
//         // senderFilterLabel="Sender"
//         // senderFilterPlaceholder="Filter by Sender"
//         // showSenderFilter={true}
//         showIdFilter={true}
//         showAmountFilter={false}
//         showCurrencyFilter={false}
//         showStatusFilter={true}
//         showDateFilter={true}
//         allStatusesLabel="All Statuses"
//       />

//       <InboxEditModal
//         isOpen={showEditModal}
//         onClose={() => {
//           setShowEditModal(false);
//           setMessageToEdit(null);
//         }}
//         message={messageToEdit}
//         onConfirmToggleRead={handleConfirmToggleRead}
//         isUpdating={isUpdatingMessage}
//       />

//       <InboxDeleteModal
//         isOpen={showDeleteModal}
//         onClose={() => {
//           setShowDeleteModal(false);
//           setMessageToDelete(null);
//         }}
//         message={messageToDelete}
//         onConfirmDelete={handleConfirmDelete}
//         isDeleting={isDeletingMessage}
//       />
//     </div>
//   );
// };

// export default AdminInboxPage;
