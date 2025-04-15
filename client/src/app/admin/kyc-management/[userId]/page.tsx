// // frontend/src/app/admin/kyc-management/[userId]/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import kycAdminService from '../../../services/admin/kyc.admin';
// import type { AdminKycUserResponse, KycDetails } from '../../../services/admin/kyc.admin';

// // Icons (Keep using react-icons or similar)
// import {  LuArrowLeft, LuExternalLink } from 'react-icons/lu';
// import { FiAlertCircle ,FiCheckCircle ,FiXCircle } from "react-icons/fi";
// import { TbLoader2 } from "react-icons/tb";

// // --- Helper Functions (Keep as they are utility functions) ---
// const formatDate = (dateInput?: string | Date | null, includeTime = false): string => {
//     if (!dateInput) return 'N/A';
//     try {
//         const date = new Date(dateInput);
//         if (isNaN(date.getTime())) return 'Invalid Date';
//         const options: Intl.DateTimeFormatOptions = {
//             year: 'numeric', month: 'long', day: 'numeric',
//             ...(includeTime && { hour: 'numeric', minute: '2-digit', hour12: true })
//         };
//         return date.toLocaleDateString('en-US', options);
//     } catch (e) { return 'Invalid Date'; }
// };

// const formatMobile = (mobile?: KycDetails['mobile']): string => {
//     if (!mobile || !mobile.countryCode || !mobile.number) return 'N/A';
//     return `${mobile.countryCode} ${mobile.number}`;
// };

// // --- Custom Button Styling (Example) ---
// // Base styles can be applied directly or via a utility function/component if preferred
// const buttonBaseStyle = "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";
// const primaryButtonStyle = `${buttonBaseStyle} text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`; // Example primary
// const successButtonStyle = `${buttonBaseStyle} text-white bg-green-600 hover:bg-green-700 focus:ring-green-500`;
// const dangerButtonStyle = `${buttonBaseStyle} text-white bg-red-600 hover:bg-red-700 focus:ring-red-500`;
// const outlineButtonStyle = `${buttonBaseStyle} text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-indigo-500`;

// const KycUserDetailPage: React.FC = () => {
//     const params = useParams();
//     const router = useRouter();
//     const userId = params.userId as string;

//     // --- State Management (Keep as is) ---
//     const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [actionError, setActionError] = useState<string | null>(null);
//     const [isProcessingAction, setIsProcessingAction] = useState<boolean>(false);
//     const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//     const [rejectionReason, setRejectionReason] = useState<string>('');

//     // --- Fetching and Action Logic (Keep as is) ---
//     const fetchUserDetails = useCallback(async () => {
//         if (!userId) return;
//         setIsLoading(true);
//         setError(null);
//         setActionError(null);
//         try {
//             const data = await kycAdminService.getKycDetailsAdmin(userId);
//             setUserData(data);
//         } catch (err: any) {
//             setError(err.message || 'An unknown error occurred while fetching user details.');
//             setUserData(null);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [userId]);

//     useEffect(() => {
//         fetchUserDetails();
//     }, [fetchUserDetails]);

//     const handleApprove = async () => {
//         if (!userId || !userData || userData.kyc?.status !== 'pending') return;
//         setIsProcessingAction(true);
//         setActionError(null);
//         try {
//             await kycAdminService.updateKycStatusAdmin(userId, { status: 'verified' });
//             await fetchUserDetails(); // Refresh data
//         } catch (err: any) {
//             setActionError(err.message || 'Failed to approve KYC.');
//         } finally {
//             setIsProcessingAction(false);
//         }
//     };

//     const openRejectModal = () => {
//         setRejectionReason('');
//         setActionError(null);
//         setShowRejectionModal(true);
//     };

//     const submitRejection = async () => {
//         if (!userId || !userData || userData.kyc?.status !== 'pending') return;
//         if (!rejectionReason.trim()) {
//             setActionError("Rejection reason cannot be empty.");
//             return;
//         }
//         setIsProcessingAction(true);
//         setActionError(null);
//         try {
//             await kycAdminService.updateKycStatusAdmin(userId, { status: 'rejected', rejectionReason: rejectionReason.trim() });
//             setShowRejectionModal(false);
//             await fetchUserDetails(); // Refresh data
//         } catch (err: any) {
//             setActionError(err.message || 'Failed to reject KYC.');
//         } finally {
//             setIsProcessingAction(false);
//         }
//     };

//     // --- Custom Render Functions ---

//     // --- Custom Loading Skeleton ---
//     const renderLoading = () => (
//         <div className="space-y-6 animate-pulse">
//             {/* Back button area */}
//             <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
//             {/* Main content block */}
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//                 {/* Header */}
//                 <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
//                 <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
//                 {/* Content Sections */}
//                 <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {[...Array(6)].map((_, i) => <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>)}
//                     </div>
//                     <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-600 rounded mt-6 mb-2"></div> {/* Section header */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                        {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>)}
//                     </div>
//                     <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-600 rounded mt-6 mb-2"></div> {/* Section header */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                     </div>
//                     <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-600 rounded mt-6 mb-2"></div> {/* Section header */}
//                      <div className="h-10 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mt-6"></div> {/* Status area */}
//                 </div>
//             </div>
//         </div>
//     );

//     // --- Custom Error Message Display ---
//     const renderError = (message: string | null, isActionError = false) => {
//         if (!message) return null;
//         return (
//             <div className={`border-l-4 p-4 mb-4 ${isActionError ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30'}`} role="alert">
//                 <div className="flex items-center">
//                     <FiAlertCircle className={`h-5 w-5 mr-3 ${isActionError ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
//                     <div>
//                         <p className={`text-sm font-medium ${isActionError ? 'text-red-800 dark:text-red-300' : 'text-yellow-800 dark:text-yellow-300'}`}>
//                             {isActionError ? 'Action Failed' : 'Error Loading Details'}
//                         </p>
//                         <p className={`text-sm ${isActionError ? 'text-red-700 dark:text-red-400' : 'text-yellow-700 dark:text-yellow-400'}`}>{message}</p>
//                         {!isActionError && (
//                              <button onClick={fetchUserDetails} className={`${outlineButtonStyle} mt-3 text-xs px-3 py-1`}>
//                                 Retry
//                             </button>
//                          )}
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     // --- Custom Rejection Modal ---
//     const renderRejectionModal = () => {
//         if (!showRejectionModal) return null;

//         return (
//             // Modal Wrapper (Overlay + Content)
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-labelledby="rejection-modal-title" role="dialog" aria-modal="true">
//                 {/* Overlay */}
//                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" onClick={() => !isProcessingAction && setShowRejectionModal(false)}></div>

//                 {/* Modal Content */}
//                 <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all">
//                     {/* Header */}
//                     <h2 id="rejection-modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">Reject KYC Application</h2>
//                     <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
//                         Please provide a reason for rejecting this user's KYC application. This reason will be visible to the user.
//                     </p>

//                     {/* Body - Form */}
//                     <div className="mt-4 space-y-2">
//                         <label htmlFor="rejectionReasonInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Reason <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                             id="rejectionReasonInput"
//                             rows={4}
//                             value={rejectionReason}
//                             onChange={(e) => setRejectionReason(e.target.value)}
//                             placeholder="Enter reason for rejection..."
//                             className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
//                             aria-describedby="rejection-error"
//                         ></textarea>
//                          {/* Display modal-specific error */}
//                          {actionError && (
//                               <p id="rejection-error" className="text-sm text-red-600 dark:text-red-400">{actionError}</p>
//                           )}
//                     </div>

//                     {/* Footer - Actions */}
//                     <div className="mt-6 flex justify-end gap-3">
//                         <button
//                             type="button"
//                             onClick={() => setShowRejectionModal(false)}
//                             className={outlineButtonStyle}
//                             disabled={isProcessingAction}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="button"
//                             onClick={submitRejection}
//                             className={dangerButtonStyle}
//                             disabled={isProcessingAction || !rejectionReason.trim()}
//                         >
//                             {isProcessingAction && <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />}
//                             Confirm Rejection
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };


//     // --- Render User Details (Main Content) ---
//     const renderUserDetails = () => {
//         if (!userData) return <p className="text-center text-gray-500 dark:text-gray-400">No user data available.</p>;
//         const kyc = userData.kyc;

//         // Function to render a section
//         const renderSection = (title: string, children: React.ReactNode) => (
//             <section className="mt-8">
//                 <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200">{title}</h3>
//                 {children}
//             </section>
//         );

//         // Function to render key-value pairs
//         const renderDetailItem = (label: string, value: React.ReactNode) => (
//             <div>
//                 <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</span>
//                 <p className="mt-1 text-sm text-gray-900 dark:text-white">{value || 'N/A'}</p>
//             </div>
//         );

//         return (
//             // Replaces Card
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
//                 {/* Replaces CardHeader */}
//                 <div className="mb-6">
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Details: {userData.fullName}</h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Review submitted information for {userData.email}.</p>
//                 </div>

//                 {/* Replaces CardContent - Sections */}
//                  {renderError(actionError, true)} {/* Display action errors prominently */}

//                 {renderSection("Personal Information", (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
//                         {renderDetailItem("First Name", kyc?.firstName)}
//                         {renderDetailItem("Last Name", kyc?.lastName)}
//                         {renderDetailItem("Date of Birth", formatDate(kyc?.dateOfBirth))}
//                         {renderDetailItem("Mobile", formatMobile(kyc?.mobile))}
//                         {renderDetailItem("Nationality", kyc?.nationality)}
//                         {renderDetailItem("Occupation", kyc?.occupation)}
//                         {renderDetailItem("Salary Range", kyc?.salaryRange)}
//                     </div>
//                 ))}

//                 {renderSection("Identification", (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
//                         {renderDetailItem("ID Type", <span className="capitalize">{kyc?.idType?.replace('_', ' ')}</span>)}
//                         {renderDetailItem("ID Number", kyc?.idNumber)}
//                         {renderDetailItem("ID Issue Date", formatDate(kyc?.idIssueDate))}
//                         {renderDetailItem("ID Expiry Date", formatDate(kyc?.idExpiryDate))}
//                     </div>
//                 ))}

//                 {renderSection("Submitted Documents", (
//                     kyc?.documents && kyc.documents.length > 0 ? (
//                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             {kyc.documents.map((doc) => (
//                                 <a
//                                     key={doc.public_id}
//                                     href={doc.url}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-indigo-600 dark:text-indigo-400 font-medium"
//                                 >
//                                      <span className="capitalize">{doc.docType === 'id_front' ? 'ID Front' : 'ID Back'}</span>
//                                      <LuExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                                  </a>
//                              ))}
//                          </div>
//                      ) : (
//                          <p className="text-sm text-gray-500 dark:text-gray-400">No documents submitted.</p>
//                      )
//                 ))}

//                 {renderSection("Status & Actions", (
//                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
//                          {/* Status Display */}
//                          <div>
//                             <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Status</span>
//                             <p className={`mt-1 text-lg font-semibold capitalize ${
//                                 kyc?.status === 'verified' ? 'text-green-600 dark:text-green-400' :
//                                 kyc?.status === 'rejected' ? 'text-red-600 dark:text-red-400' :
//                                 kyc?.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
//                                 kyc?.status === 'skipped' ? 'text-blue-600 dark:text-blue-400' :
//                                 'text-gray-500 dark:text-gray-300'
//                             }`}>
//                                 {kyc?.status?.replace('_', ' ') || 'Not Started'}
//                             </p>
//                             {/* Timestamps and Reason */}
//                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
//                                 {kyc?.status === 'verified' && kyc?.verifiedAt && <p>Verified on: {formatDate(kyc.verifiedAt, true)}</p>}
//                                 {kyc?.status === 'rejected' && kyc?.rejectedAt && <p>Rejected on: {formatDate(kyc.rejectedAt, true)}</p>}
//                                 {kyc?.submittedAt && !['verified', 'rejected'].includes(kyc?.status || '') && <p>Submitted on: {formatDate(kyc.submittedAt, true)}</p>}
//                                 {kyc?.status === 'rejected' && kyc?.rejectionReason && <p className="text-red-600 dark:text-red-400 font-medium">Reason: {kyc.rejectionReason}</p>}
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         {kyc?.status === 'pending' && (
//                              <div className="flex gap-3 flex-shrink-0 mt-4 sm:mt-0">
//                                 <button
//                                     type="button"
//                                     onClick={openRejectModal}
//                                     className={dangerButtonStyle}
//                                     disabled={isProcessingAction}
//                                 >
//                                      {isProcessingAction ? <TbLoader2 className="mr-2 h-4 w-4 animate-spin" /> : <FiXCircle className="mr-2 h-4 w-4" />}
//                                      Reject
//                                  </button>
//                                  <button
//                                      type="button"
//                                      onClick={handleApprove}
//                                      className={successButtonStyle}
//                                      disabled={isProcessingAction}
//                                  >
//                                      {isProcessingAction ? <TbLoader2 className="mr-2 h-4 w-4 animate-spin" /> : <FiCheckCircle className="mr-2 h-4 w-4" />}
//                                      Approve
//                                  </button>
//                              </div>
//                          )}
//                     </div>
//                 ))}
//             </div> // End main content div
//         );
//     };


//     // --- Main Component Return ---
//     return (
//         // Use Tailwind for overall page layout and padding
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
//             <div className="max-w-4xl mx-auto"> {/* Center content */}
//                  {/* Back Button */}
//                  <Link href="/admin/kyc-management" className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6 font-medium">
//                     <LuArrowLeft className="h-4 w-4" />
//                     Back to KYC List
//                 </Link>

//                  {/* Main Content Area - Render based on state */}
//                  {isLoading ? renderLoading() : error ? renderError(error) : renderUserDetails()}

//                  {/* Modal */}
//                  {renderRejectionModal()}
//             </div>
//         </div>
//     );
// };

// export default KycUserDetailPage;


// // frontend/src/app/admin/kyc-management/[userId]/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, Fragment } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image'; // For potential image previews
// import kycAdminService from '@/app/services/admin/kyc.admin'; // Corrected import path assuming standard structure
// import type { AdminKycUserResponse, KycDetails, SalaryRange } from '@/app/services/admin/kyc.admin'; // Corrected import path and added SalaryRange

// // Icons
// import {
//     ArrowLeft, ExternalLink, CheckCircle, XCircle, Clock, AlertCircle,
//     FileText, User, CalendarDays, Phone, Mail, Briefcase, BadgeDollarSign,
//     Fingerprint, Eye, Loader2, Globe
// } from 'lucide-react';
// import { cn } from '@/lib/utils'; // For conditional classes
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components
// import { Textarea } from '@/components/ui/textarea'; // Import Textarea
// import { Label } from '@/components/ui/label'; // Import Label

// // --- Helper Functions ---
// const formatDate = (dateInput?: string | Date | null, includeTime = false): string => {
//     if (!dateInput) return 'N/A';
//     try {
//         const date = new Date(dateInput);
//         // Check if the date is valid after parsing
//         if (isNaN(date.getTime())) {
//              console.warn("formatDate received invalid dateInput:", dateInput);
//              return 'Invalid Date';
//         }
//         const options: Intl.DateTimeFormatOptions = {
//             year: 'numeric', month: 'long', day: 'numeric',
//             ...(includeTime && { hour: '2-digit', minute: '2-digit', hour12: true /* Adjust timezone as needed */ })
//         };
//         return date.toLocaleDateString('en-US', options);
//     } catch (e) {
//         console.error("Error formatting date:", e, "Input:", dateInput);
//         return 'Invalid Date';
//     }
// };

// const formatMobile = (mobile?: KycDetails['mobile']): string => {
//     if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim()) return 'N/A';
//     return `${mobile.countryCode} ${mobile.number}`;
// };

// // Ensure SalaryRange type is correctly imported or defined if not exported from kyc.admin.ts
// const salaryDisplayMap: Record<SalaryRange, string> = {
//   '0-1000': 'Below $10,000',
//   '10000-50000': '$10,000 - $49,999',
//   '50000-100000': '$50,000 - $99,999',
//   '100000+': '$100,000 or more',
// };


// // --- Main Detail Page Component ---
// const KycUserDetailPage: React.FC = () => {
//     const params = useParams();
//     const router = useRouter();
//     const userId = params.userId as string; // Get userId from URL parameters

//     const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null); // For data fetching errors
//     const [actionError, setActionError] = useState<string | null>(null); // For approve/reject action errors
//     const [isProcessingAction, setIsProcessingAction] = useState<false | 'approve' | 'reject'>(false); // Track which action is processing
//     const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//     const [rejectionReason, setRejectionReason] = useState<string>('');

//     // --- Fetching Logic ---
//     const fetchUserDetails = useCallback(async () => {
//         if (!userId) {
//             setError("User ID is missing from the URL.");
//             setIsLoading(false);
//             return;
//         };
//         console.log(`Fetching details for user: ${userId}`);
//         setIsLoading(true);
//         setError(null);
//         setActionError(null); // Clear previous action errors on refetch
//         try {
//             const data = await kycAdminService.getKycDetailsAdmin(userId);
//             setUserData(data);
//              console.log("User data fetched:", data);
//         } catch (err: any) {
//             console.error("Error fetching user details:", err);
//             setError(err.message || 'An unknown error occurred while fetching user details.');
//             setUserData(null); // Clear potentially stale data
//         } finally {
//             setIsLoading(false);
//         }
//     }, [userId]); // Dependency: userId ensures refetch if navigating between user pages

//     useEffect(() => {
//         fetchUserDetails();
//     }, [fetchUserDetails]); // Fetch on mount and if fetchUserDetails changes (due to userId change)

//     // --- Action Handlers ---
//     const handleApprove = async () => {
//         if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
//         setIsProcessingAction('approve');
//         setActionError(null);
//         console.log(`Attempting to approve KYC for user: ${userId}`);
//         try {
//             await kycAdminService.updateKycStatusAdmin(userId, { status: 'verified' });
//             console.log(`Successfully approved KYC for user: ${userId}`);
//             await fetchUserDetails(); // Refresh data to show updated status
//         } catch (err: any) {
//              console.error("Error approving KYC:", err);
//             setActionError(err.message || 'Failed to approve KYC status.');
//         } finally {
//             setIsProcessingAction(false);
//         }
//     };

//     const openRejectModal = () => {
//         setRejectionReason(''); // Clear previous reason
//         setActionError(null); // Clear previous modal errors
//         setShowRejectionModal(true);
//     };

//     const submitRejection = async () => {
//         if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
//         if (!rejectionReason.trim()) {
//             setActionError("Rejection reason cannot be empty."); // Show error within modal
//             return;
//         }
//         setIsProcessingAction('reject');
//         setActionError(null); // Clear previous error before new attempt
//         console.log(`Attempting to reject KYC for user: ${userId} with reason: ${rejectionReason}`);
//         try {
//             await kycAdminService.updateKycStatusAdmin(userId, { status: 'rejected', rejectionReason: rejectionReason.trim() });
//             console.log(`Successfully rejected KYC for user: ${userId}`);
//             setShowRejectionModal(false); // Close modal on success
//             await fetchUserDetails(); // Refresh data
//         } catch (err: any) {
//             console.error("Error rejecting KYC:", err);
//             // Show error within the modal for immediate feedback
//             setActionError(err.message || 'Failed to reject KYC status.');
//         } finally {
//             // Ensure processing state is reset even if error occurs
//             setIsProcessingAction(false);
//         }
//     };


//     // --- Render Functions ---

//     // Loading Skeleton
//     const renderLoading = () => (
//         <div className="space-y-8 animate-pulse">
//             <div className="h-5 w-36 bg-muted rounded mb-6"></div>
//             <Card className="shadow-sm">
//                 <CardHeader className="flex flex-row justify-between items-center p-4 border-b">
//                      <div className="h-8 w-24 bg-muted rounded"></div>
//                      <div className="flex gap-3">
//                         <div className="h-9 w-24 bg-muted rounded"></div>
//                         <div className="h-9 w-24 bg-muted rounded"></div>
//                      </div>
//                 </CardHeader>
//             </Card>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <Card className="lg:col-span-2 shadow-sm">
//                     <CardHeader className="p-5 border-b"> <div className="h-6 w-1/3 bg-muted rounded"></div> </CardHeader>
//                     <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
//                         {[...Array(7)].map((_, i) => <div key={`detail-skel-${i}`}><div className="h-4 w-1/4 bg-muted rounded mb-1"></div><div className="h-5 w-3/4 bg-muted rounded"></div></div>)}
//                     </CardContent>
//                     <CardHeader className="p-5 border-t"> <div className="h-6 w-1/3 bg-muted rounded"></div> </CardHeader>
//                     <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
//                         {[...Array(4)].map((_, i) => <div key={`id-skel-${i}`}><div className="h-4 w-1/4 bg-muted rounded mb-1"></div><div className="h-5 w-3/4 bg-muted rounded"></div></div>)}
//                     </CardContent>
//                 </Card>
//                 <Card className="shadow-sm">
//                     <CardHeader className="p-5 border-b"> <div className="h-6 w-1/2 bg-muted rounded"></div> </CardHeader>
//                     <CardContent className="p-5 space-y-4">
//                          <div className="border border-muted rounded-md p-3">
//                             <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
//                             <div className="h-4 w-1/2 bg-muted rounded"></div>
//                          </div>
//                         <div className="border border-muted rounded-md p-3">
//                             <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
//                             <div className="h-4 w-1/2 bg-muted rounded"></div>
//                          </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );

//     // Error Message Display
//     const renderErrorDisplay = (message: string | null, isActionError = false) => {
//         if (!message) return null;
//         return (
//             <div className={cn("border-l-4 p-4 rounded-md mb-6", isActionError ? "border-destructive bg-destructive/10" : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20")} role="alert">
//                 <div className="flex items-center">
//                     <AlertCircle className={cn("h-5 w-5 mr-3 flex-shrink-0", isActionError ? "text-destructive" : "text-yellow-600 dark:text-yellow-400")} />
//                     <div>
//                         <p className={cn("text-sm font-medium", isActionError ? "text-destructive/90 dark:text-red-300" : "text-yellow-700 dark:text-yellow-300")}>
//                             {isActionError ? "Action Error" : "Error"}
//                         </p>
//                         <p className={cn("text-sm", isActionError ? "text-destructive/80 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400")}>
//                             {message}
//                         </p>
//                         {!isActionError && message.toLowerCase().includes("fetching") && // Only show retry for fetch errors
//                             <button onClick={fetchUserDetails} className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline">Retry Fetch</button>
//                         }
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     // Rejection Modal
//     const renderRejectionModal = () => {
//          if (!showRejectionModal) return null;
//          return (
//              // Modal backdrop
//              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" aria-labelledby="rejection-modal-title" role="dialog" aria-modal="true">
//                  {/* Modal content */}
//                  <Card className="relative w-full max-w-lg shadow-xl border-border" onClick={(e) => e.stopPropagation()}>
//                     <CardHeader>
//                         <CardTitle id="rejection-modal-title" className="text-lg">Reject KYC Application</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <p className="text-sm text-muted-foreground">
//                              Provide a clear reason for rejection. This will be shown to the user.
//                         </p>
//                         {/* Modal-specific Action Error */}
//                         {actionError && (
//                             <p className="text-sm text-destructive font-medium flex items-center gap-1.5"><AlertCircle className="h-4 w-4"/> {actionError}</p>
//                         )}
//                         <div className="space-y-1">
//                             <Label htmlFor="rejectionReasonInput" className="text-sm">
//                                 Reason <span className="text-destructive">*</span>
//                             </Label>
//                             <Textarea
//                                 id="rejectionReasonInput"
//                                 rows={4}
//                                 value={rejectionReason}
//                                 onChange={(e) => {
//                                     setRejectionReason(e.target.value);
//                                     // Clear error when user starts typing
//                                     if(actionError && e.target.value.trim()) setActionError(null);
//                                 }}
//                                 placeholder="E.g., ID document blurry, Information mismatch, Expired document..."
//                                 className="w-full text-sm"
//                                 aria-describedby="rejection-error"
//                             />
//                         </div>
//                         <div className="mt-6 flex justify-end gap-3">
//                             <Button variant="outline" onClick={() => setShowRejectionModal(false)} disabled={isProcessingAction === 'reject'}>Cancel</Button>
//                             <Button
//                                 variant="destructive"
//                                 onClick={submitRejection}
//                                 disabled={isProcessingAction === 'reject' || !rejectionReason.trim()}
//                             >
//                                 {isProcessingAction === 'reject' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                                 Confirm Rejection
//                             </Button>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//          );
//     };

//     // Detail Item Renderer
//     const DetailItem = ({ label, value, icon: Icon }: { label: string, value: React.ReactNode, icon?: React.ElementType }) => (
//         <div className="py-2">
//             <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
//                 {Icon && <Icon className="h-3.5 w-3.5" />} {label}
//             </dt>
//             <dd className="text-sm font-medium text-foreground break-words min-h-[20px]"> {/* Ensure minimum height */}
//                 {value || <span className="italic text-muted-foreground/80">Not Provided</span>}
//             </dd>
//         </div>
//     );

//     // --- Main Content ---
//     if (isLoading) return <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{renderLoading()}</div>;
//     // Render fetch error prominently if it occurred
//     if (error) return <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{renderErrorDisplay(error)}</div>;
//     if (!userData) return <div className="max-w-6xl mx-auto text-center py-16 text-muted-foreground">User data could not be loaded or user not found.</div>;

//     const { kyc } = userData; // Destructure kyc for easier access, handle potential null/undefined
//     const canTakeAction = kyc?.status === 'pending';

//     return (
//         <div className="min-h-screen bg-muted/30 dark:bg-background p-4 sm:p-6 lg:p-8">
//              {renderRejectionModal()}

//              <div className="max-w-6xl mx-auto space-y-6">
//                  {/* Back Navigation */}
//                  <div>
//                      <Link href="/admin/kyc-management" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors">
//                         <ArrowLeft className="h-4 w-4" />
//                         Back to KYC Management List
//                     </Link>
//                  </div>

//                  {/* Status Bar & Actions Card */}
//                  <Card className="shadow-sm overflow-hidden">
//                     <CardHeader className="bg-card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b">
//                         <div>
//                             <span className="block text-xs text-muted-foreground font-medium">Verification Status</span>
//                              <span className={cn(
//                                  "text-lg font-bold capitalize px-2 py-0.5 rounded inline-flex items-center gap-1.5 mt-1", // Use inline-flex for icon alignment
//                                  kyc?.status === 'verified' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
//                                  kyc?.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
//                                  kyc?.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
//                                  kyc?.status === 'skipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
//                                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
//                              )}>
//                                 {kyc?.status === 'verified' && <CheckCircle className="h-4 w-4" />}
//                                 {kyc?.status === 'rejected' && <XCircle className="h-4 w-4" />}
//                                 {kyc?.status === 'pending' && <Clock className="h-4 w-4" />}
//                                 {kyc?.status === 'skipped' && <ArrowLeft className="h-4 w-4" />} {/* Example icon for skipped */}
//                                 {!kyc?.status && <AlertCircle className="h-4 w-4" />} {/* Icon for not started/null */}
//                                 {kyc?.status?.replace('_', ' ') || 'Not Started'}
//                             </span>
//                              {/* Display Timestamps */}
//                               <div className="mt-2 text-xs text-muted-foreground space-y-0.5 sm:space-y-0 sm:space-x-3">
//                                  {kyc?.submittedAt && <span>Submitted: {formatDate(kyc.submittedAt, true)}</span>}
//                                  {kyc?.verifiedAt && <span>Verified: {formatDate(kyc.verifiedAt, true)}</span>}
//                                  {kyc?.rejectedAt && <span>Rejected: {formatDate(kyc.rejectedAt, true)}</span>}
//                              </div>
//                         </div>
//                          {/* Action Buttons */}
//                          {canTakeAction && (
//                              <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
//                                  <Button
//                                      variant="destructive"
//                                      size="sm" // Smaller buttons might fit better
//                                      onClick={openRejectModal}
//                                      disabled={!!isProcessingAction}
//                                      className="flex-1 sm:flex-none"
//                                  >
//                                      {isProcessingAction === 'reject' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
//                                      Reject
//                                  </Button>
//                                  <Button
//                                      variant="default" // Use standard button, but style it green
//                                      size="sm"
//                                      onClick={handleApprove}
//                                      disabled={!!isProcessingAction}
//                                      className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800" // Explicit green styling
//                                  >
//                                      {isProcessingAction === 'approve' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
//                                      Approve
//                                  </Button>
//                              </div>
//                          )}
//                      </CardHeader>
//                     {/* Display general action errors below the header within the card */}
//                      {actionError && !showRejectionModal && (
//                          <CardContent className="p-4 border-t border-border">
//                             {renderErrorDisplay(actionError, true)}
//                          </CardContent>
//                      )}
//                  </Card>

//                  {/* Main Details Grid */}
//                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//                      {/* Column 1 & 2: User and ID Details */}
//                      <Card className="lg:col-span-2 shadow-sm overflow-hidden">
//                          <CardHeader className="p-5 border-b">
//                              <CardTitle className="text-lg flex items-center gap-2"><User className="h-5 w-5 text-primary" /> User Information</CardTitle>
//                          </CardHeader>
//                          <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                             <DetailItem label="Full Name" value={userData.fullName} />
//                             <DetailItem label="Email Address" value={userData.email} icon={Mail}/>
//                             <DetailItem label="Date of Birth" value={formatDate(kyc?.dateOfBirth)} icon={CalendarDays}/>
//                             <DetailItem label="Mobile Number" value={formatMobile(kyc?.mobile)} icon={Phone}/>
//                             <DetailItem label="Nationality" value={kyc?.nationality} icon={Globe}/>
//                             <DetailItem label="Occupation" value={kyc?.occupation} icon={Briefcase}/>
//                             <DetailItem label="Salary Range" value={kyc?.salaryRange ? salaryDisplayMap[kyc.salaryRange] : undefined} icon={BadgeDollarSign}/>
//                          </CardContent>

//                          <CardHeader className="p-5 border-t">
//                              <CardTitle className="text-lg flex items-center gap-2"><Fingerprint className="h-5 w-5 text-primary" /> Identity Document</CardTitle>
//                          </CardHeader>
//                           <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                              <DetailItem label="ID Type" value={<span className="capitalize">{kyc?.idType?.replace('_', ' ')}</span>}/>
//                              <DetailItem label="ID Number" value={kyc?.idNumber} />
//                              <DetailItem label="Date of Issue" value={formatDate(kyc?.idIssueDate)} icon={CalendarDays}/>
//                              <DetailItem label="Date of Expiry" value={formatDate(kyc?.idExpiryDate)} icon={CalendarDays}/>
//                              {/* Show rejection reason if applicable */}
//                              {kyc?.status === 'rejected' && kyc.rejectionReason && (
//                                  <div className="md:col-span-2 mt-2">
//                                       <DetailItem label="Rejection Reason" value={<span className="text-destructive font-medium">{kyc.rejectionReason}</span>} icon={AlertCircle}/>
//                                  </div>
//                              )}
//                          </CardContent>
//                      </Card>

//                      {/* Column 3: Submitted Documents */}
//                      <Card className="shadow-sm">
//                           <CardHeader className="p-5 border-b">
//                              <CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Submitted Documents</CardTitle>
//                          </CardHeader>
//                          <CardContent className="p-5 space-y-4">
//                             {kyc?.documents && kyc.documents.length > 0 ? (
//                                 kyc.documents.map((doc) => (
//                                     <div key={doc.public_id} className="border border-border rounded-md p-3 hover:bg-muted/30 transition-colors">
//                                         <p className="text-sm font-medium text-foreground capitalize mb-2">{doc.docType === 'id_front' ? 'ID Front' : 'ID Back'}</p>
//                                         <a
//                                             href={doc.url}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
//                                             title="View document in new tab"
//                                         >
//                                             <Eye className="h-3.5 w-3.5" /> View Document <ExternalLink className="h-3 w-3 opacity-70"/>
//                                         </a>
//                                         {/* Optional: Add simple image preview for image types */}
//                                         {doc.url && !doc.url.toLowerCase().endsWith('.pdf') && (
//                                              <div className="mt-2 aspect-video relative overflow-hidden rounded bg-muted border">
//                                                 <Image src={doc.url} alt={`${doc.docType} preview`} layout="fill" objectFit="contain" unoptimized />
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-sm text-muted-foreground italic p-3 text-center">No documents were submitted or found.</p>
//                             )}
//                          </CardContent>
//                      </Card>
//                  </div>
//              </div>
//         </div>
//     );
// };

// export default KycUserDetailPage;








'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import kycAdminService from '@/app/services/admin/kyc.admin';
import type { AdminKycUserResponse, KycDetails, SalaryRange } from '@/app/services/admin/kyc.admin';

// Icons
import {
  ArrowLeft, ExternalLink, CheckCircle, XCircle, Clock, AlertCircle,
  FileText, User, CalendarDays, Phone, Mail, Briefcase, BadgeDollarSign,
  Fingerprint, Eye, Loader2, Globe, FileCheck, Info, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// --- Helper Functions ---
const formatDate = (dateInput?: string | Date | null, includeTime = false): string => {
  if (!dateInput) return 'N/A';
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      console.warn("formatDate received invalid dateInput:", dateInput);
      return 'Invalid Date';
    }
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'long', day: 'numeric',
      ...(includeTime && { hour: '2-digit', minute: '2-digit', hour12: true })
    };
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    console.error("Error formatting date:", e, "Input:", dateInput);
    return 'Invalid Date';
  }
};

const formatMobile = (mobile?: KycDetails['mobile']): string => {
  if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim()) return 'N/A';
  return `${mobile.countryCode} ${mobile.number}`;
};

const salaryDisplayMap: Record<SalaryRange, string> = {
  '0-1000': 'Below $10,000',
  '10000-50000': '$10,000 - $49,999',
  '50000-100000': '$50,000 - $99,999',
  '100000+': '$100,000 or more',
};

const getStatusConfig = (status?: string) => {
  const statusMap = {
    verified: {
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      icon: CheckCircle,
      label: 'Verified'
    },
    rejected: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      icon: XCircle,
      label: 'Rejected'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      icon: Clock,
      label: 'Pending'
    },
    skipped: {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      icon: ArrowLeft,
      label: 'Skipped'
    },
    default: {
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      icon: AlertCircle,
      label: 'Not Started'
    }
  };
  
  return statusMap[status as keyof typeof statusMap] || statusMap.default;
};

const getInitials = (name?: string): string => {
  if (!name) return '??';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

// --- Main Detail Page Component ---
const KycUserDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState<false | 'approve' | 'reject'>(false);
  const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState<string>('');

  // --- Fetching Logic ---
  const fetchUserDetails = useCallback(async () => {
    if (!userId) {
      setError("User ID is missing from the URL.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    setActionError(null);
    try {
      const data = await kycAdminService.getKycDetailsAdmin(userId);
      setUserData(data);
    } catch (err: any) {
      console.error("Error fetching user details:", err);
      setError(err.message || 'An unknown error occurred while fetching user details.');
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  // --- Action Handlers ---
  const handleApprove = async () => {
    if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
    setIsProcessingAction('approve');
    setActionError(null);
    try {
      await kycAdminService.updateKycStatusAdmin(userId, { status: 'verified' });
      await fetchUserDetails();
    } catch (err: any) {
      setActionError(err.message || 'Failed to approve KYC status.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  const openRejectModal = () => {
    setRejectionReason('');
    setActionError(null);
    setShowRejectionModal(true);
  };

  const submitRejection = async () => {
    if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
    if (!rejectionReason.trim()) {
      setActionError("Rejection reason cannot be empty.");
      return;
    }
    setIsProcessingAction('reject');
    setActionError(null);
    try {
      await kycAdminService.updateKycStatusAdmin(userId, { 
        status: 'rejected', 
        rejectionReason: rejectionReason.trim() 
      });
      setShowRejectionModal(false);
      await fetchUserDetails();
    } catch (err: any) {
      setActionError(err.message || 'Failed to reject KYC status.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  // --- Render Functions ---
  const renderLoading = () => (
    <div className="space-y-8 animate-pulse">
      <div className="h-5 w-36 bg-muted rounded mb-6"></div>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row justify-between items-center p-4 border-b">
          <div className="h-8 w-24 bg-muted rounded"></div>
          <div className="flex gap-3">
            <div className="h-9 w-24 bg-muted rounded"></div>
            <div className="h-9 w-24 bg-muted rounded"></div>
          </div>
        </CardHeader>
      </Card>
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="p-5 border-b"><div className="h-6 w-1/3 bg-muted rounded"></div></CardHeader>
          <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={`detail-skel-${i}`}>
                <div className="h-4 w-1/4 bg-muted rounded mb-1"></div>
                <div className="h-5 w-3/4 bg-muted rounded"></div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="p-5 border-b"><div className="h-6 w-1/2 bg-muted rounded"></div></CardHeader>
          <CardContent className="p-5 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={`doc-skel-${i}`} className="border border-muted rounded-md p-3">
                <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-muted rounded"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderErrorDisplay = (message: string | null, isActionError = false) => {
    if (!message) return null;
    return (
      <div 
        className={cn(
          "border-l-4 p-4 rounded-md mb-6",
          isActionError ? "border-destructive bg-destructive/10" : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
        )} 
        role="alert"
      >
        <div className="flex items-center">
          <AlertCircle className={cn(
            "h-5 w-5 mr-3 flex-shrink-0", 
            isActionError ? "text-destructive" : "text-yellow-600 dark:text-yellow-400"
          )} />
          <div>
            <p className={cn(
              "text-sm font-medium", 
              isActionError ? "text-destructive/90 dark:text-red-300" : "text-yellow-700 dark:text-yellow-300"
            )}>
              {isActionError ? "Action Error" : "Error"}
            </p>
            <p className={cn(
              "text-sm", 
              isActionError ? "text-destructive/80 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"
            )}>
              {message}
            </p>
            {!isActionError && message.toLowerCase().includes("fetching") && (
              <button 
                onClick={fetchUserDetails} 
                className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline"
              >
                Retry Fetch
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderRejectionModal = () => {
    if (!showRejectionModal) return null;
    
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" 
        aria-labelledby="rejection-modal-title" 
        role="dialog" 
        aria-modal="true"
      >
        <Card className="relative w-full max-w-lg shadow-xl border-border" onClick={(e) => e.stopPropagation()}>
          <CardHeader>
            <CardTitle id="rejection-modal-title" className="text-lg">Reject KYC Application</CardTitle>
            <CardDescription>
              Provide a clear reason for rejection. This will be visible to the user.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {actionError && (
              <p className="text-sm text-destructive font-medium flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4"/> {actionError}
              </p>
            )}
            <div className="space-y-1">
              <Label htmlFor="rejectionReasonInput" className="text-sm">
                Reason <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="rejectionReasonInput"
                rows={4}
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value);
                  if(actionError && e.target.value.trim()) setActionError(null);
                }}
                placeholder="E.g., ID document blurry, Information mismatch, Expired document..."
                className="w-full text-sm"
                aria-describedby="rejection-error"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={() => setShowRejectionModal(false)} 
              disabled={isProcessingAction === 'reject'}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={submitRejection}
              disabled={isProcessingAction === 'reject' || !rejectionReason.trim()}
            >
              {isProcessingAction === 'reject' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Rejection
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const DetailItem = ({ 
    label, 
    value, 
    icon: Icon, 
    isImportant = false 
  }: { 
    label: string, 
    value: React.ReactNode, 
    icon?: React.ElementType,
    isImportant?: boolean 
  }) => (
    <div className="py-2 space-y-2">
      <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5" />} {label}
      </dt>
      <dd className={cn(
        "text-sm break-words min-h-[20px]",
        isImportant ? "font-semibold text-foreground" : "font-medium text-foreground"
      )}>
        {value || <span className="italic text-muted-foreground/80">Not Provided</span>}
      </dd>
    </div>
  );

  // --- Main Content ---
  if (isLoading) return <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{renderLoading()}</div>;
  if (error) return <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{renderErrorDisplay(error)}</div>;
  if (!userData) return (
    <div className="max-w-6xl mx-auto text-center py-16 text-muted-foreground">
      User data could not be loaded or user not found.
    </div>
  );

  const { kyc } = userData;
  const canTakeAction = kyc?.status === 'pending';
  const statusConfig = getStatusConfig(kyc?.status);

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background p-4 sm:p-6 lg:p-8">
      {renderRejectionModal()}

      <div className="container mx-auto space-y-6">
        {/* Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/admin/kyc-management"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to KYC Management
          </Link>

          <span className="text-xs text-right sm:w-auto w-full text-gray-500 dark:text-gray-300">
            User ID:{" "}
            <code className="bg-muted px-1 py-0.5 rounded">{userId}</code>
          </span>
        </div>

        {/* User Profile Card */}
        <Card className="shadow-sm overflow-hidden">
          <CardHeader className="flex md:items-center items-start justify-between">
            <div className="flex sm:flex-row flex-col sm:items-center gap-4">
              <Avatar className="h-16 w-16 flex-shrink-0">
                <AvatarFallback
                  className={cn(
                    "text-lg font-medium", // Base styles
                    statusConfig.color // Dynamic status color from config
                  )}
                >
                  {getInitials(userData.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <CardTitle className="text-xl text-neutral-900 dark:text-white">
                  {userData.fullName || "Unnamed User"}
                </CardTitle>
                <CardDescription className="flex flex-wrap flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <Mail className="h-5 w-5" /> {userData.email}
                  </span>
                  {kyc?.mobile && (
                    <span className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      {formatMobile(kyc?.mobile)}
                    </span>
                  )}
                </CardDescription>
              </div>
            </div>

            {/* Status Badge */}

              <Badge
                className={cn(
                  "px-4 py-2 text-sm flex items-center gap-1.5",
                  statusConfig.color
                )}
              >
                <statusConfig.icon className="h-4 w-4" />
                {statusConfig.label}
              </Badge>
          
          </CardHeader>

          {/* Status Timeline */}
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 sm:text-base text-sm text-gray-500 dark:text-gray-300">
              {kyc?.submittedAt && (
                <span className="flex items-center gap-1">
                  <Clock className="size-5" /> Submitted:{" "}
                  {formatDate(kyc.submittedAt, true)}
                </span>
              )}
              {kyc?.verifiedAt && (
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle className="size-5" /> Verified:{" "}
                  {formatDate(kyc.verifiedAt, true)}
                </span>
              )}
              {kyc?.rejectedAt && (
                <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                  <XCircle className="size-5" /> Rejected:{" "}
                  {formatDate(kyc.rejectedAt, true)}
                </span>
              )}
            </div>
          </CardContent>

          {/* Action Buttons for Pending Applications */}
          {canTakeAction && (
            <CardFooter className="border-t  bg-muted/30">
              <div className="flex sm:flex-row flex-col gap-3 w-full sm:justify-end">
                <Button
                  onClick={openRejectModal}
                  disabled={!!isProcessingAction}
                  className="gap-0 text-base bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3  h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center"
                >
                  {isProcessingAction === "reject" ? (
                    <Loader2 className="mr-2 size-5 animate-spin" />
                  ) : (
                    <XCircle className="mr-2 size-5" />
                  )}
                  Reject Application
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={!!isProcessingAction}
                  className="gap-0 text-base bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center"
                >
                  {isProcessingAction === "approve" ? (
                    <Loader2 className="mr-2 size-5 animate-spin" />
                  ) : (
                    <CheckCircle className="mr-2 size-5 " />
                  )}
                  Approve Application
                </Button>
              </div>
            </CardFooter>
          )}

          {/* Display action errors */}
          {actionError && !showRejectionModal && (
            <div className="px-4 pb-4">
              {renderErrorDisplay(actionError, true)}
            </div>
          )}
        </Card>

        <div className="flex lg:flex-row flex-col justify-between gap-4">
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Rejection Reason (if applicable) */}
            {kyc?.status === "rejected" && kyc.rejectionReason && (
              <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-1.5 text-red-700 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" /> Rejection Reason
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {kyc.rejectionReason}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Personal Information */}
            <Card className="shadow-sm gap-0 overflow-hidden">
              <CardHeader className="inline-flex items-center w-full border-b bg-lightgray dark:bg-secondarybox p-6 h-[97px]">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-6 w-6 text-primary" /> Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
                <DetailItem
                  label="Full Name"
                  value={userData.fullName}
                  isImportant={true}
                />
                <DetailItem
                  label="Email Address"
                  value={userData.email}
                  icon={Mail}
                  isImportant={true}
                />
                <DetailItem
                  label="Date of Birth"
                  value={formatDate(kyc?.dateOfBirth)}
                  icon={CalendarDays}
                />
                <DetailItem
                  label="Mobile Number"
                  value={formatMobile(kyc?.mobile)}
                  icon={Phone}
                />
                <DetailItem
                  label="Nationality"
                  value={kyc?.nationality}
                  icon={Globe}
                />
                <DetailItem
                  label="Occupation"
                  value={kyc?.occupation}
                  icon={Briefcase}
                />
                <DetailItem
                  label="Salary Range"
                  value={
                    kyc?.salaryRange
                      ? salaryDisplayMap[kyc.salaryRange]
                      : undefined
                  }
                  icon={BadgeDollarSign}
                />
              </CardContent>
            </Card>

            {/* Identity Information */}
            <Card className="shadow-sm gap-0 overflow-hidden">
              <CardHeader className="border-b bg-lightgray dark:bg-secondarybox p-6">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Fingerprint className="h-6 w-6 text-primary" /> Identity
                  Document Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
                <DetailItem
                  label="ID Type"
                  value={
                    <span className="capitalize">
                      {kyc?.idType?.replace("_", " ")}
                    </span>
                  }
                  isImportant={true}
                />
                <DetailItem
                  label="ID Number"
                  value={kyc?.idNumber}
                  isImportant={true}
                />
                <DetailItem
                  label="Date of Issue"
                  value={formatDate(kyc?.idIssueDate)}
                  icon={CalendarDays}
                />
                <DetailItem
                  label="Date of Expiry"
                  value={formatDate(kyc?.idExpiryDate)}
                  icon={CalendarDays}
                />
              </CardContent>
            </Card>
          </div>

          {/* Submitted Documents */}
          <Card className="shadow-sm w-full lg:w-1/3 h-fit gap-0  overflow-hidden">
            <CardHeader className="border-b bg-lightgray dark:bg-secondarybox p-6">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" /> Submitted
                Documents
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-300">
                Review identification documents submitted by the user
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              {kyc?.documents && kyc.documents.length > 0 ? (
                <div className="">
                  {kyc.documents.map((doc) => (
                    <Card
                      key={doc.public_id}
                      className="border overflow-hidden"
                    >
                      <CardHeader className="bg-muted/50 p-5 border-b">
                        <CardTitle className="text-sm capitalize flex items-center gap-1.5">
                          <FileText className="h-4 w-4" />
                          {doc.docType === "id_front" ? "ID Front" : "ID Back"}
                        </CardTitle>
                      </CardHeader>
                      {doc.url && !doc.url.toLowerCase().endsWith(".pdf") ? (
                        <div className="aspect-[16/10] relative bg-muted">
                          <Image
                            src={doc.url}
                            alt={`${doc.docType} preview`}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <CardContent className="flex items-center justify-center py-8">
                          <FileText className="h-12 w-12 text-muted-foreground/50" />
                        </CardContent>
                      )}
                      <CardFooter>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                size="sm"
                                className="w-full h-10"
                              >
                                <Link
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className=""
                                >
                                  <Eye className="h-3.5 w-3.5" /> View Full
                                  Document{" "}
                                  <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Open document in new tab</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardFooter>

                      <CardFooter>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Link href={doc.url} target='_blank' rel='noopener noreferrer'>
                              
                              </Link>
                            </TooltipTrigger>
                          </Tooltip>
                        </TooltipProvider>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 px-4">
                  <Info className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No documents were submitted or found for this user.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KycUserDetailPage;