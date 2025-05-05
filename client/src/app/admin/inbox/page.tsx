// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// // import Link from "next/link"; // No longer needed for this snippet
// import { toast } from "sonner";
// import { format, formatDistanceToNow } from 'date-fns';

// // Auth & Services
// import { useAuth } from "@/app/contexts/AuthContext"; // Adjust path if needed
// import inboxAdminService from "../../services/admin/inbox"; // Use correct path
// import type { AdminInboxMessage, AdminInboxListResponse } from "../../services/admin/inbox"; // Match service file

// // Shadcn UI Components (keep non-dropdown ones)
// import {
//     Table, TableBody, TableCell, TableHead, TableHeader, TableRow
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // Remove Shadcn Dropdown imports if no longer used elsewhere
// // import {
// //     DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
// // } from "@/components/ui/dropdown-menu";
// import {
//     Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose
// } from "@/components/ui/dialog";
// import Pagination from "../components/Pagination"; // Keep your Pagination

// // --- Import the Custom Dropdown ---
// import CustomDropdown from '../components/CustomDropdown'; // Adjust path if needed

// // Icons (keep as is)
// import {
//     Inbox, Trash2, AlertCircle, RefreshCw, Eye, User, Mail, MessageSquare, MoreHorizontal, CheckCircle2, XCircle, Circle
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // Adjust path if needed

// const ITEMS_PER_PAGE = 15;

// // formatDate function (keep as is)
// const formatDate = (dateInput?: string | Date | null): string => {
//     if (!dateInput) return "N/A";
//     try {
//         const date = new Date(dateInput);
//         if (isNaN(date.getTime())) return "Invalid Date";
//         return format(date, "MMM d, yyyy HH:mm");
//     } catch (e) {
//         return "Invalid Date";
//     }
// };

// const AdminInboxPage: React.FC = () => {
//     // Hooks and State (keep as is)
//     const router = useRouter();
//     const { token, isAdmin, loading: authLoading } = useAuth();
//     const [inboxData, setInboxData] = useState<AdminInboxListResponse | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [deletingId, setDeletingId] = useState<string | null>(null);
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState<AdminInboxMessage | null>(null);

//     // Fetching Logic & Effects (keep as is)
//     const fetchInboxMessages = useCallback(async (page: number) => {
//         // ... (implementation unchanged)
//         if (!isAdmin) {
//             setError("Access Denied: Administrator privileges required.");
//             setLoading(false);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await inboxAdminService.getAllMessagesAdmin(page, ITEMS_PER_PAGE);
//             setInboxData(data);
//              if (data.currentPage !== page) {
//                  setTimeout(() => setCurrentPage(data.currentPage), 0);
//              }
//         } catch (err: any) {
//             console.error("Fetch admin inbox error:", err);
//             setError(err.message || "Failed to load inbox messages.");
//             setInboxData(null);
//         } finally {
//             setLoading(false);
//         }
//     }, [isAdmin]);

//     useEffect(() => {
//         // ... (implementation unchanged)
//         if (authLoading) return;
//         if (!token) {
//             router.push("/auth/login?message=login_required");
//             return;
//         }
//         if (!isAdmin) {
//              setError("Access Denied: Administrator privileges required.");
//              setLoading(false);
//              return;
//         }
//         fetchInboxMessages(currentPage);
//     }, [token, isAdmin, authLoading, currentPage, router, fetchInboxMessages]);

//     // Handlers (keep as is, including pagination handlers)
//     const goToPage = (newPage: number) => {
//         if (newPage > 0 && newPage !== currentPage && (!inboxData || newPage <= inboxData.totalPages)) {
//             setCurrentPage(newPage);
//         }
//     };
//     const paginate = (pageNumber: number) => goToPage(pageNumber);
//     const goToPreviousPage = () => goToPage(currentPage - 1);
//     const goToNextPage = () => goToPage(currentPage + 1);
//     const handleRefresh = () => { if (!loading) fetchInboxMessages(currentPage); };
//     const openDeleteConfirmation = (message: AdminInboxMessage) => setShowDeleteConfirm(message);
//     const closeDeleteConfirmation = () => setShowDeleteConfirm(null);
//     const handleDeleteMessage = async () => {
//         // ... (implementation unchanged)
//         if (!showDeleteConfirm) return;
//         const messageIdToDelete = showDeleteConfirm._id;
//         setDeletingId(messageIdToDelete);
//         closeDeleteConfirmation();
//         try {
//             await inboxAdminService.deleteMessageAdmin(messageIdToDelete);
//             toast.success(`Message (${messageIdToDelete.slice(-6)}) deleted successfully.`);
//             fetchInboxMessages(currentPage);
//              if (inboxData && inboxData.messages.length === 1 && currentPage > 1) {
//                 goToPreviousPage();
//              }
//         } catch (err: any) {
//             console.error("Delete message error:", err);
//             toast.error("Failed to delete message", { description: err.message });
//         } finally {
//             setDeletingId(null);
//         }
//     };

//     // Render Logic (keep skeleton and error renderers)
//     const renderSkeleton = () => (
//         // ... (implementation unchanged)
//         <div className="space-y-4">
//              <div className="flex justify-between items-center mb-6">
//                  <Skeleton className="h-8 w-48" />
//                  <Skeleton className="h-9 w-24" />
//             </div>
//             <div className="border rounded-lg">
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             {[...Array(6)].map((_, i) => <TableHead key={i}><Skeleton className="h-5 w-20" /></TableHead>)}
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
//                             <TableRow key={i}>
//                                 {[...Array(6)].map((_, j) => <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>)}
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </div>
//              <div className="flex justify-center mt-6"><Skeleton className="h-9 w-64" /></div>
//         </div>
//     );

//     const renderError = () => (
//         // ... (implementation unchanged)
//          <Alert variant="destructive" className="mt-6">
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Error Loading Messages</AlertTitle>
//             <AlertDescription>
//                 {error || "An unexpected error occurred."}
//                 <Button variant="secondary" size="sm" onClick={handleRefresh} className="mt-2 ml-auto block">
//                      <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> Retry
//                  </Button>
//             </AlertDescription>
//         </Alert>
//     );

//     const renderContent = () => {
//         const totalPages = inboxData?.totalPages ?? 0;
//         if (!inboxData || inboxData.messages.length === 0) {
//             if (!loading) {
//                return <p className="text-center text-muted-foreground py-12">No inbox messages found.</p>;
//             }
//             return null;
//         }

//         return (
//             <>
//                  <div className="border rounded-lg overflow-hidden">
//                     <Table>
//                         <TableHeader className="bg-muted/50">
//                             {/* ... (Table Header unchanged) ... */}
//                             <TableRow>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead>Recipient</TableHead>
//                                 <TableHead>Sender</TableHead>
//                                 <TableHead>Subject</TableHead>
//                                 <TableHead>Sent At</TableHead>
//                                 <TableHead className="text-right">Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {inboxData.messages.map((msg) => (
//                                 <TableRow key={msg._id} className={cn(!msg.isRead && "bg-primary/5")}>
//                                     {/* ... (Other TableCells unchanged) ... */}
//                                     <TableCell>
//                                         <Badge variant={msg.isRead ? "secondary" : "default"} className={cn("capitalize w-[80px] justify-center", msg.isRead ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200")}>
//                                              {msg.isRead ? <CheckCircle2 className="size-3 mr-1" /> : <Circle className="size-3 mr-1 fill-current"/>}
//                                              {msg.isRead ? 'Read' : 'Unread'}
//                                          </Badge>
//                                     </TableCell>
//                                     <TableCell>
//                                         <div className="font-medium truncate max-w-[200px]" title={msg.userId?.email ?? 'N/A'}>
//                                              {msg.userId?.fullName || msg.userId?.email || <span className="italic text-muted-foreground">Unknown User</span>}
//                                         </div>
//                                          <div className="text-xs text-muted-foreground">ID: {msg.userId?._id?.slice(-6) ?? 'N/A'}</div>
//                                     </TableCell>
//                                     <TableCell className="truncate max-w-[200px]">{msg.sender}</TableCell>
//                                     <TableCell className="font-medium truncate max-w-[250px]">{msg.subject}</TableCell>
//                                     <TableCell>
//                                          <span className="whitespace-nowrap">{formatDate(msg.sentAt)}</span>
//                                         <div className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(msg.sentAt), { addSuffix: true })}</div>
//                                      </TableCell>

//                                     {/* --- Updated Actions Cell --- */}
//                                     <TableCell className="text-right">
//                                          <CustomDropdown
//                                              disabled={deletingId === msg._id}
//                                              trigger={
//                                                  <Button
//                                                      variant="ghost"
//                                                      size="icon"
//                                                      className="h-8 w-8"
//                                                      // Disabled state is handled by CustomDropdown based on prop
//                                                      aria-label="Actions" // Add aria-label
//                                                  >
//                                                      {deletingId === msg._id ? <RefreshCw className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
//                                                      {/* No need for sr-only span here, button itself can have aria-label */}
//                                                  </Button>
//                                              }
//                                          >
//                                              {/* Custom Item */}
//                                              <button
//                                                  onClick={() => openDeleteConfirmation(msg)}
//                                                  disabled={deletingId === msg._id}
//                                                  className={cn(
//                                                      "flex w-full items-center px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none",
//                                                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent" // Style disabled state
//                                                  )}
//                                                  role="menuitem" // Add role
//                                              >
//                                                  <Trash2 className="mr-2 h-4 w-4" /> Delete Message
//                                              </button>
//                                               {/* Add more items here if needed later */}
//                                               {/* <button className="flex w-full items-center px-3 py-1.5 text-sm text-foreground hover:bg-muted ..."> <Eye className="mr-2 h-4 w-4" /> View Details </button> */}
//                                          </CustomDropdown>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>

//                  {/* Pagination Usage (keep as is) */}
//                 {totalPages > 0 && (
//                      <Pagination
//                          currentPage={currentPage}
//                          totalPages={totalPages}
//                          paginate={paginate}
//                          goToPreviousPage={goToPreviousPage}
//                          goToNextPage={goToNextPage}
//                      />
//                  )}
//             </>
//         );
//     };

//     // Main Return and Dialog (keep as is)
//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* ... (Header unchanged) ... */}
//              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//                 <div>
//                     <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
//                          <MessageSquare className="size-7 text-primary" /> Admin Inbox - All Messages
//                     </h1>
//                      <p className="text-muted-foreground text-sm mt-1">View and manage all messages sent to users.</p>
//                  </div>
//                  <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
//                      <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
//                      {loading ? 'Refreshing...' : 'Refresh'}
//                  </Button>
//             </div>

//             {/* Conditional Rendering Logic */}
//             {loading && !inboxData ? renderSkeleton() : null}
//             {error ? renderError() : null}
//             {!loading && !error ? renderContent() : null}

//              {/* Delete Confirmation Dialog (keep as is) */}
//              <Dialog open={!!showDeleteConfirm} onOpenChange={(isOpen) => !isOpen && closeDeleteConfirmation()}>
//                  {/* ... (Dialog Content unchanged) ... */}
//                  <DialogContent>
//                      <DialogHeader>
//                          <DialogTitle>Confirm Deletion</DialogTitle>
//                          <DialogDescription>
//                             Are you sure you want to permanently delete this message?
//                             <br />
//                             <strong className="block mt-2">Subject: {showDeleteConfirm?.subject}</strong>
//                              <span className="text-xs block text-muted-foreground">To: {showDeleteConfirm?.userId?.fullName ?? showDeleteConfirm?.userId?.email ?? 'Unknown'} | Sent: {formatDate(showDeleteConfirm?.sentAt)}</span>
//                          </DialogDescription>
//                      </DialogHeader>
//                      <DialogFooter>
//                          <DialogClose asChild>
//                              <Button type="button" variant="outline">Cancel</Button>
//                          </DialogClose>
//                          <Button
//                              type="button"
//                              variant="destructive"
//                              onClick={handleDeleteMessage}
//                              disabled={deletingId === showDeleteConfirm?._id}
//                          >
//                              {deletingId === showDeleteConfirm?._id ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
//                              Delete Message
//                          </Button>
//                      </DialogFooter>
//                  </DialogContent>
//              </Dialog>
//         </div>
//     );
// };

// export default AdminInboxPage;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";

// Auth & Services
import { useAuth } from "@/app/contexts/AuthContext";
import inboxAdminService, {
  AdminUpdatePayload,
} from "../../services/admin/inbox"; // Import payload type
import type {
  AdminInboxMessage,
  AdminInboxListResponse,
} from "../../services/admin/inbox";

// Shadcn UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // <-- Add Input
import { Textarea } from "@/components/ui/textarea"; // <-- Add Textarea
import { Label } from "@/components/ui/label"; // <-- Add Label
import Pagination from "../components/Pagination";

// --- Import the Custom Dropdown ---
import CustomDropdown from "../components/CustomDropdown";

// Icons
import {
  Inbox,
  Trash2,
  AlertCircle,
  RefreshCw,
  Eye,
  User,
  Mail,
  MessageSquare,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Circle,
  Pencil, // <-- Add Pencil
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 15;

const formatDate = (dateInput?: string | Date | null): string => {
  // ... (implementation unchanged)
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Invalid Date";
    return format(date, "MMM d, yyyy HH:mm");
  } catch (e) {
    return "Invalid Date";
  }
};

const AdminInboxPage: React.FC = () => {
  // Hooks and State
  const router = useRouter();
  const { token, isAdmin, loading: authLoading } = useAuth();
  const [inboxData, setInboxData] = useState<AdminInboxListResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // --- Deletion State ---
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState<AdminInboxMessage | null>(null);

  // --- Editing State ---
  const [editingMessage, setEditingMessage] =
    useState<AdminInboxMessage | null>(null);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [editSubject, setEditSubject] = useState<string>("");
  const [editBody, setEditBody] = useState<string>("");
  const [updatingId, setUpdatingId] = useState<string | null>(null); // For loading state during update

  // Fetching Logic & Effects
  const fetchInboxMessages = useCallback(
    async (page: number) => {
      // ... (implementation unchanged)
      if (!isAdmin) {
        setError("Access Denied: Administrator privileges required.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await inboxAdminService.getAllMessagesAdmin(
          page,
          ITEMS_PER_PAGE
        );
        // IMPORTANT: Ensure your service actually returns the 'body' for editing
        if (data.messages.length > 0 && data.messages[0].body === undefined) {
          console.warn(
            "Warning: Message 'body' is not being fetched. Editing will not work correctly."
          );
          // Optionally show a persistent warning to the admin
        }
        setInboxData(data);
        if (data.currentPage !== page) {
          setTimeout(() => setCurrentPage(data.currentPage), 0);
        }
      } catch (err: any) {
        console.error("Fetch admin inbox error:", err);
        setError(err.message || "Failed to load inbox messages.");
        setInboxData(null);
      } finally {
        setLoading(false);
      }
    },
    [isAdmin]
  ); // Added isAdmin dependency

  useEffect(() => {
    // ... (implementation unchanged)
    if (authLoading) return;
    if (!token) {
      router.push("/auth/login?message=login_required");
      return;
    }
    if (!isAdmin) {
      setError("Access Denied: Administrator privileges required.");
      setLoading(false);
      return;
    }
    fetchInboxMessages(currentPage);
  }, [token, isAdmin, authLoading, currentPage, router, fetchInboxMessages]);

  // --- Pagination and Refresh Handlers ---
  const goToPage = (newPage: number) => {
    // ... (implementation unchanged)
    if (
      newPage > 0 &&
      newPage !== currentPage &&
      (!inboxData || newPage <= inboxData.totalPages)
    ) {
      setCurrentPage(newPage);
    }
  };
  const paginate = (pageNumber: number) => goToPage(pageNumber);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);
  const handleRefresh = () => {
    if (!loading) fetchInboxMessages(currentPage);
  };

  // --- Delete Handlers ---
  const openDeleteConfirmation = (message: AdminInboxMessage) =>
    setShowDeleteConfirm(message);
  const closeDeleteConfirmation = () => setShowDeleteConfirm(null);
  const handleDeleteMessage = async () => {
    // ... (implementation unchanged)
    if (!showDeleteConfirm) return;
    const messageIdToDelete = showDeleteConfirm._id;
    setDeletingId(messageIdToDelete);
    closeDeleteConfirmation(); // Close dialog immediately
    try {
      await inboxAdminService.deleteMessageAdmin(messageIdToDelete);
      toast.success(
        `Message (${messageIdToDelete.slice(-6)}) deleted successfully.`
      );
      // Check if it was the last item on the page
      const wasLastItem = inboxData?.messages.length === 1 && currentPage > 1;
      fetchInboxMessages(wasLastItem ? currentPage - 1 : currentPage);
      if (wasLastItem) {
        // setCurrentPage(currentPage - 1); // Let fetchInbox handle setting correct page
      }
    } catch (err: any) {
      console.error("Delete message error:", err);
      toast.error("Failed to delete message", { description: err.message });
    } finally {
      setDeletingId(null);
    }
  };

  // --- Edit Handlers ---
  const openEditDialog = (message: AdminInboxMessage) => {
    setEditingMessage(message);
    setEditSubject(message.subject);
    // IMPORTANT: Make sure message.body exists and is fetched from the API
    setEditBody(message.body || ""); // Default to empty string if body is missing
    setShowEditDialog(true);
  };

  const closeEditDialog = () => {
    setShowEditDialog(false);
    setEditingMessage(null);
    setEditSubject("");
    setEditBody("");
    setUpdatingId(null); // Reset updating state on close
  };

  const handleUpdateMessage = async () => {
    if (!editingMessage || updatingId) return; // Prevent double-submit

    setUpdatingId(editingMessage._id);
    try {
      const payload: AdminUpdatePayload = {
        subject: editSubject.trim(),
        body: editBody.trim(),
      };
      if (!payload.subject || !payload.body) {
        toast.error("Validation Error", {
          description: "Subject and body cannot be empty.",
        });
        setUpdatingId(null); // Stop loading indicator
        return;
      }

      await inboxAdminService.updateMessageAdmin(editingMessage._id, payload);
      toast.success(
        `Message (${editingMessage._id.slice(-6)}) updated successfully.`
      );
      closeEditDialog();
      // Optimistic update could be done here, but refetching is simpler for now
      fetchInboxMessages(currentPage); // Refresh the list
    } catch (err: any) {
      console.error("Update message error:", err);
      toast.error("Failed to update message", { description: err.message });
      setUpdatingId(null); // Stop loading indicator on error
    }
    // No finally block needed here if we stop loading on error/success within try/catch
  };

  // Render Logic (keep skeleton and error renderers)
  const renderSkeleton = () => (
    // ... (implementation unchanged)
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {[...Array(6)].map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-5 w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-6">
        <Skeleton className="h-9 w-64" />
      </div>
    </div>
  );

  const renderError = () => (
    // ... (implementation unchanged)
    <Alert variant="destructive" className="mt-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error Loading Messages</AlertTitle>
      <AlertDescription>
        {error || "An unexpected error occurred."}
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRefresh}
          className="mt-2 ml-auto block"
        >
          <RefreshCw
            className={cn("mr-2 h-4 w-4", loading && "animate-spin")}
          />{" "}
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );

  const renderContent = () => {
    const totalPages = inboxData?.totalPages ?? 0;
    if (!inboxData || inboxData.messages.length === 0) {
      // ... (no messages text unchanged) ...
      if (!loading) {
        return (
          <p className="text-center text-muted-foreground py-12">
            No inbox messages found.
          </p>
        );
      }
      return null;
    }

    return (
      <>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              {/* ... (Table Header unchanged) ... */}
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inboxData.messages.map((msg) => {
                const isDeleting = deletingId === msg._id;
                const isUpdating = updatingId === msg._id;
                const isDisabled = isDeleting || isUpdating; // Disable actions if either process is running

                return (
                  <TableRow
                    key={msg._id}
                    className={cn(!msg.isRead && "bg-primary/5")}
                  >
                    {/* ... (Other TableCells unchanged) ... */}
                    <TableCell>
                      {/* Status Badge */}
                      <Badge
                        variant={msg.isRead ? "secondary" : "default"}
                        className={cn(
                          "capitalize w-[80px] justify-center",
                          msg.isRead
                            ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        )}
                      >
                        {msg.isRead ? (
                          <CheckCircle2 className="size-3 mr-1" />
                        ) : (
                          <Circle className="size-3 mr-1 fill-current" />
                        )}
                        {msg.isRead ? "Read" : "Unread"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {/* Recipient Info */}
                      <div
                        className="font-medium truncate max-w-[200px]"
                        title={msg.userId?.email ?? "N/A"}
                      >
                        {msg.userId?.fullName || msg.userId?.email || (
                          <span className="italic text-muted-foreground">
                            Unknown User
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ID: {msg.userId?._id?.slice(-6) ?? "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      {msg.sender}
                    </TableCell>
                    <TableCell className="font-medium truncate max-w-[250px]">
                      {msg.subject}
                    </TableCell>
                    <TableCell>
                      {/* Sent At Info */}
                      <span className="whitespace-nowrap">
                        {formatDate(msg.sentAt)}
                      </span>
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(msg.sentAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </TableCell>

                    {/* --- Updated Actions Cell --- */}
                    <TableCell className="text-right">
                      <CustomDropdown
                        disabled={isDisabled} // Disable dropdown trigger if deleting/updating
                        trigger={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={isDisabled} // Also disable button itself
                            aria-label="Message Actions"
                          >
                            {/* Show spinner if deleting OR updating */}
                            {isDisabled ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <MoreHorizontal className="h-4 w-4" />
                            )}
                          </Button>
                        }
                      >
                        {/* Edit Item */}
                        <button
                          onClick={() => openEditDialog(msg)}
                          // No need for disabled prop here if CustomDropdown handles it, but explicit doesn't hurt
                          // disabled={isDisabled}
                          className={cn(
                            "flex w-full items-center px-3 py-1.5 text-sm text-foreground hover:bg-muted focus:bg-muted focus:outline-none",
                            // CustomDropdown likely handles disabled styling, but you can add yours:
                            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                          )}
                          role="menuitem"
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Edit Message
                        </button>

                        {/* Delete Item */}
                        <button
                          onClick={() => openDeleteConfirmation(msg)}
                          // disabled={isDisabled}
                          className={cn(
                            "flex w-full items-center px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none",
                            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                          )}
                          role="menuitem"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Message
                        </button>
                        {/* Add more items here if needed later */}
                      </CustomDropdown>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Usage (keep as is) */}
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        )}
      </>
    );
  };

  // Main Return
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (Header unchanged) ... */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="size-7 text-primary" /> Admin Inbox - All
            Messages
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            View and manage all messages sent to users.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw
            className={cn("mr-2 h-4 w-4", loading && "animate-spin")}
          />
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Conditional Rendering Logic */}
      {loading && !inboxData ? renderSkeleton() : null}
      {error ? renderError() : null}
      {!loading && !error ? renderContent() : null}

      {/* --- Edit Message Dialog --- */}
      <Dialog
        open={showEditDialog}
        onOpenChange={(isOpen) => !isOpen && closeEditDialog()}
      >
        <DialogContent className="sm:max-w-[525px]">
          {" "}
          {/* Adjust width if needed */}
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
            <DialogDescription>
              Update the subject and body of the message.
              <span className="text-xs block text-muted-foreground mt-1">
                Message ID: {editingMessage?._id?.slice(-6)} | To:{" "}
                {editingMessage?.userId?.fullName ??
                  editingMessage?.userId?.email ??
                  "N/A"}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Subject Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-subject" className="text-right">
                Subject
              </Label>
              <Input
                id="edit-subject"
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value)}
                className="col-span-3"
                disabled={updatingId === editingMessage?._id}
                maxLength={200} // Optional: Add max length
              />
            </div>
            {/* Body Input */}
            <div className="grid grid-cols-4 items-start gap-4">
              {" "}
              {/* items-start for label alignment */}
              <Label htmlFor="edit-body" className="text-right pt-2">
                Body
              </Label>{" "}
              {/* Adjust padding */}
              <Textarea
                id="edit-body"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="col-span-3 min-h-[150px]" // Make textarea taller
                disabled={updatingId === editingMessage?._id}
                placeholder="Enter the message body..."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={updatingId === editingMessage?._id}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleUpdateMessage}
              disabled={
                updatingId === editingMessage?._id ||
                !editSubject.trim() ||
                !editBody.trim()
              } // Disable if updating or fields empty
            >
              {updatingId === editingMessage?._id ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              )}
              {updatingId === editingMessage?._id
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Delete Confirmation Dialog (Unchanged Structure) --- */}
      <Dialog
        open={!!showDeleteConfirm}
        onOpenChange={(isOpen) => !isOpen && closeDeleteConfirmation()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete this message? This
              action cannot be undone.
              <br />
              <strong className="block mt-2">
                Subject: {showDeleteConfirm?.subject}
              </strong>
              <span className="text-xs block text-muted-foreground">
                To:{" "}
                {showDeleteConfirm?.userId?.fullName ??
                  showDeleteConfirm?.userId?.email ??
                  "Unknown"}{" "}
                | Sent: {formatDate(showDeleteConfirm?.sentAt)}
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteMessage}
              disabled={deletingId === showDeleteConfirm?._id}
            >
              {deletingId === showDeleteConfirm?._id ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInboxPage;
