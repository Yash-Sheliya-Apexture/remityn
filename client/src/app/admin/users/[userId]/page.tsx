// // frontend/src/app/admin/users/[userId]/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import userAdminService from '../../../services/admin/user.admin';
// // Import specific types needed
// import type { AdminUserDetailResponse } from '../../../services/admin/user.admin';
// import type { KycMobile, KycStatus } from '../../../services/kyc';
// import type { Payment } from '@/types/payment';
// import type { Transfer } from '@/types/transfer';
// import { useAuth } from '../../../contexts/AuthContext';

// // Components
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator"; // <<<--- ADD THIS IMPORT

// // Icons
// import {
//     ArrowLeft, User, Mail, ShieldCheck, CalendarDays, Phone, Briefcase, UserCheck, UserX, HelpCircle,
//     BadgeDollarSign, Fingerprint, Globe, FileText, AlertCircle, Info, Workflow,
//     ExternalLink, Eye, Wallet, Send, Download, Landmark, Clock
// } from 'lucide-react';
// import { cn } from "@/lib/utils";

// // --- Helper Functions (Keep as they are) ---
// const formatDate = (dateInput?: string | Date | null, includeTime = false): string => {
//     if (!dateInput) return 'N/A';
//     try {
//         const date = new Date(dateInput);
//         if (isNaN(date.getTime())) return 'Invalid Date';
//         const options: Intl.DateTimeFormatOptions = {
//             year: 'numeric', month: 'short', day: 'numeric', // Changed month format
//             ...(includeTime && { hour: '2-digit', minute: '2-digit', hour12: true })
//         };
//         return date.toLocaleDateString('en-US', options);
//     } catch (e) {
//         return 'Invalid Date';
//     }
// };

// const formatMobile = (mobile?: KycMobile | null): string => {
//     if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim()) return 'N/A';
//     return `${mobile.countryCode} ${mobile.number}`;
// };

// const getKycStatusConfig = (status?: KycStatus | null) => {
//     const statusMap: Record<KycStatus | 'unknown', { color: string; icon: React.ElementType; label: string }> = {
//         verified: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: ShieldCheck, label: 'Verified' },
//         rejected: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', icon: UserX, label: 'Rejected' },
//         pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', icon: Clock, label: 'Pending' },
//         skipped: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', icon: ArrowLeft, label: 'Skipped' },
//         not_started: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', icon: HelpCircle, label: 'Not Started' },
//         unknown: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', icon: HelpCircle, label: 'Unknown' } // Fallback
//     };
//     return statusMap[status || 'not_started'] || statusMap.unknown;
// };

// const getTransactionStatusColor = (status?: string | null): string => {
//      switch (status?.toLowerCase()) {
//          case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400';
//          case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400';
//          case 'processing': case 'in progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400';
//          case 'failed': return 'text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400';
//          case 'canceled': case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400';
//          default: return 'text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400';
//      }
//  };

// const getInitials = (name?: string): string => {
//     if (!name) return '??';
//     return name.split(' ').map(part => part[0]).filter(Boolean).join('').substring(0, 2).toUpperCase();
// };

// const salaryDisplayMap: Record<string, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// // --- DetailItem Component (Keep as is) ---
// const DetailItem = ({ label, value, icon: Icon, isImportant = false, className = '' }: { label: string; value: React.ReactNode; icon?: React.ElementType; isImportant?: boolean; className?: string }) => (
//     <div className={cn("py-2.5 space-y-1", className)}>
//         <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
//             {Icon && <Icon className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/80" />} {label}
//         </dt>
//         <dd className={cn("text-sm min-h-[20px] break-words", isImportant ? "font-semibold text-foreground" : "text-foreground/90")}>
//             {value || <span className="italic text-muted-foreground/80">N/A</span>}
//         </dd>
//     </div>
// );

// // --- Loading Skeleton Component (Keep as is) ---
// const LoadingSkeleton = () => (
//     <div className="space-y-6 animate-pulse">
//          <div className="flex items-center gap-2 mb-4">
//            <Skeleton className="h-6 w-6 rounded-full" />
//            <Skeleton className="h-5 w-36 bg-muted rounded" />
//          </div>
//          <Card className="shadow-sm">
//              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-border">
//                  <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
//                  <div className="space-y-2 flex-1">
//                      <Skeleton className="h-6 w-3/4 bg-muted rounded" />
//                      <Skeleton className="h-4 w-1/2 bg-muted rounded" />
//                      <Skeleton className="h-5 w-20 bg-muted rounded-md" />
//                  </div>
//                   <div className="space-y-1 text-right flex-shrink-0">
//                      <Skeleton className="h-3 w-28 bg-muted rounded" />
//                      <Skeleton className="h-3 w-24 bg-muted rounded" />
//                      <Skeleton className="h-3 w-32 bg-muted rounded" />
//                   </div>
//              </CardHeader>
//              <CardContent className="p-4 sm:p-6">
//                  <Skeleton className="h-4 w-1/4 bg-muted rounded mb-3" />
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                       {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full bg-muted rounded-md" />)}
//                   </div>
//              </CardContent>
//          </Card>
//           <Card className="shadow-sm"><CardHeader className="border-b border-border p-4"><Skeleton className="h-6 w-1/3 bg-muted rounded" /></CardHeader><CardContent className="p-4 sm:p-6"><Skeleton className="h-40 w-full bg-muted rounded-md" /></CardContent></Card>
//           <Card className="shadow-sm"><CardHeader className="border-b border-border p-4"><Skeleton className="h-6 w-1/2 bg-muted rounded" /></CardHeader><CardContent className="p-4 sm:p-6"><Skeleton className="h-32 w-full bg-muted rounded-md" /></CardContent></Card>
//           <Card className="shadow-sm"><CardHeader className="border-b border-border p-4"><Skeleton className="h-6 w-1/4 bg-muted rounded" /></CardHeader><CardContent className="p-0"><Skeleton className="h-48 w-full" /></CardContent></Card>
//           <Card className="shadow-sm"><CardHeader className="border-b border-border p-4"><Skeleton className="h-6 w-1/4 bg-muted rounded" /></CardHeader><CardContent className="p-0"><Skeleton className="h-48 w-full" /></CardContent></Card>
//     </div>
// );

// // --- Error Display Component (Keep as is) ---
// const ErrorDisplay = ({ error, onRetry }: { error: string | null, onRetry: () => void }) => (
//      <Alert variant="destructive" className="mt-6">
//        <AlertCircle className="h-4 w-4" />
//        <AlertTitle>Error Loading User Details</AlertTitle>
//        <AlertDescription>
//          {error || "An unexpected error occurred."}
//          <Button variant="destructive" size="sm" onClick={onRetry} className="mt-2 ml-auto block">
//            Retry
//          </Button>
//        </AlertDescription>
//      </Alert>
//  );

// // --- Transaction Table Component (Keep as is) ---
// const TransactionTable = ({ data, type }: { data: (Transfer | Payment)[], type: 'transfer' | 'payment' }) => {
//      if (!data || data.length === 0) {
//          return <p className="text-sm text-muted-foreground text-center py-6 px-4">No {type}s found for this user.</p>;
//      }

//      const isTransfer = (item: Transfer | Payment): item is Transfer => type === 'transfer';

//      return (
//          <div className="overflow-x-auto">
//              <Table>
//                  <TableHeader>
//                      <TableRow>
//                          <TableHead className="w-[100px]">ID</TableHead>
//                          {type === 'transfer' && <TableHead>Recipient</TableHead>}
//                          <TableHead>Amount</TableHead>
//                          <TableHead>Currency</TableHead>
//                          <TableHead>Status</TableHead>
//                          <TableHead>Date</TableHead>
//                          <TableHead className="text-right">Details</TableHead>
//                      </TableRow>
//                  </TableHeader>
//                  <TableBody>
//                      {data.slice(0, 5).map((item) => {
//                           const statusColor = getTransactionStatusColor(item.status);
//                           const amount = isTransfer(item) ? item.sendAmount : (item as Payment).amountToAdd;
//                            // Ensure currency objects exist before accessing code
//                            const currencyCode = isTransfer(item)
//                                ? (typeof item.sendCurrency === 'object' ? item.sendCurrency?.code : 'N/A')
//                                : (item as Payment).payInCurrency?.code;
//                           const recipientName = isTransfer(item) ? item.recipient?.accountHolderName : undefined;
//                           const detailLink = type === 'transfer'
//                                ? `/admin/transfers/${item._id}`
//                                : `/admin/payments`; // Maybe link to payment list for now

//                           return (
//                              <TableRow key={item._id} className="text-xs">
//                                  <TableCell>
//                                      <TooltipProvider delayDuration={100}>
//                                          <Tooltip>
//                                              <TooltipTrigger asChild>
//                                                  <span className="font-mono cursor-help underline decoration-dashed decoration-border">
//                                                      {item._id.substring(item._id.length - 6)}
//                                                  </span>
//                                              </TooltipTrigger>
//                                              <TooltipContent><p>{item._id}</p></TooltipContent>
//                                          </Tooltip>
//                                      </TooltipProvider>
//                                  </TableCell>
//                                   {type === 'transfer' && <TableCell className="max-w-[150px] truncate">{recipientName || 'N/A'}</TableCell>}
//                                  <TableCell className="font-medium">{amount != null ? Number(amount).toFixed(2) : 'N/A'}</TableCell>
//                                  <TableCell>{currencyCode || 'N/A'}</TableCell>
//                                  <TableCell>
//                                      <Badge variant="outline" className={cn("text-[11px] capitalize px-2 py-0.5", statusColor)}>
//                                          {item.status || 'Unknown'}
//                                      </Badge>
//                                  </TableCell>
//                                  <TableCell>{formatDate(item.createdAt, true)}</TableCell>
//                                  <TableCell className="text-right">
//                                       <Button asChild variant="ghost" size="icon" className="h-7 w-7" title={`View ${type} details`}>
//                                            <Link href={detailLink} target="_blank" rel="noopener noreferrer">
//                                                <ExternalLink className="h-3.5 w-3.5" />
//                                            </Link>
//                                       </Button>
//                                  </TableCell>
//                              </TableRow>
//                           );
//                       })}
//                  </TableBody>
//              </Table>
//          </div>
//      );
//  };

// // --- Main Detail Page Component ---
// const UserDetailPage: React.FC = () => {
//     const params = useParams();
//     const router = useRouter();
//     const { token, isAdmin, loading: authLoading } = useAuth();
//     const userId = params.userId as string;

//     const [userData, setUserData] = useState<AdminUserDetailResponse | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // Fetching Logic (Keep as is)
//     const fetchUserDetails = useCallback(async () => {
//          if (!isAdmin) {
//              setError("Access Denied: Administrator privileges required.");
//              setLoading(false);
//              return;
//          }
//         if (!userId) {
//             setError("User ID is missing from the URL.");
//             setLoading(false);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await userAdminService.getUserDetailsAdmin(userId);
//             setUserData(data);
//         } catch (err: any) {
//             setError(err.message || 'Failed to load user details.');
//             setUserData(null);
//         } finally {
//             setLoading(false);
//         }
//     }, [userId, isAdmin]);

//     useEffect(() => {
//         if (authLoading) return;

//         if (token && isAdmin) {
//             fetchUserDetails();
//         } else if (!token) {
//              router.push('/auth/login?message=login_required');
//         } else if (!isAdmin) {
//              setError("Access Denied: Administrator privileges required.");
//              setLoading(false);
//         }
//     }, [token, isAdmin, authLoading, userId, router, fetchUserDetails]);

//     // --- Render Logic ---
//     if (loading || authLoading) return <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8"><LoadingSkeleton /></div>;
//     if (error) return <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8"><ErrorDisplay error={error} onRetry={fetchUserDetails} /></div>;
//     if (!userData) return <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 text-center py-16 text-muted-foreground">User data could not be loaded.</div>;

//     const { kyc, accounts, transfers, payments } = userData;
//     const kycStatusConfig = getKycStatusConfig(kyc?.status);

//     return (
//         <div className="min-h-screen bg-background dark:bg-background pb-10">
//             <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
//                 {/* Back Navigation */}
//                 <Button asChild variant="outline" size="sm" className="gap-1.5 mb-4 h-8 px-3">
//                     <Link href="/admin/users">
//                         <ArrowLeft className="h-4 w-4" />
//                         Back to User List
//                     </Link>
//                 </Button>

//                 {/* User Profile Card */}
//                 <Card className="shadow-sm overflow-hidden border-border">
//                     <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-border">
//                         {/* ... (Avatar, Title, etc. - Keep as is) ... */}
//                          <div className="flex items-center gap-4">
//                             <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 border-2 border-border">
//                                 <AvatarFallback className="text-xl font-semibold bg-muted text-muted-foreground">
//                                     {getInitials(userData.fullName)}
//                                 </AvatarFallback>
//                             </Avatar>
//                             <div className="space-y-0.5">
//                                 <CardTitle className="text-lg sm:text-xl text-foreground">{userData.fullName}</CardTitle>
//                                 <CardDescription className="text-sm text-muted-foreground">{userData.email}</CardDescription>
//                                 <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'} className="mt-1.5 text-xs capitalize">
//                                      {userData.role} Account
//                                 </Badge>
//                             </div>
//                         </div>
//                          <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-muted-foreground flex-shrink-0 mt-2 sm:mt-0">
//                               <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3"/> Joined: {formatDate(userData.createdAt)}</span>
//                               <span className="flex items-center gap-1"><Clock className="h-3 w-3"/> Updated: {formatDate(userData.updatedAt)}</span>
//                               <TooltipProvider delayDuration={100}>
//                                   <Tooltip>
//                                       <TooltipTrigger asChild>
//                                           <span className="font-mono cursor-help underline decoration-dotted">ID: {userData._id.substring(userData._id.length - 8)}</span>
//                                       </TooltipTrigger>
//                                       <TooltipContent side="bottom"><p>{userData._id}</p></TooltipContent>
//                                   </Tooltip>
//                               </TooltipProvider>
//                          </div>
//                     </CardHeader>
//                      {/* Account Balances */}
//                      <CardContent className="p-4 sm:p-6 bg-muted/30 dark:bg-secondarybox/20">
//                           <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
//                               <Wallet className="h-4 w-4" /> Account Balances
//                           </h3>
//                           {accounts && accounts.length > 0 ? (
//                               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                                   {accounts.map(acc => (
//                                        <div key={acc._id} className="border border-border rounded-md p-3 bg-card shadow-sm">
//                                           <div className="flex items-center justify-between mb-0.5">
//                                              <span className="text-xs font-semibold text-foreground">{acc.currency?.code}</span>
//                                           </div>
//                                           <div className="text-base sm:text-lg font-bold text-foreground tracking-tight">
//                                                {acc.balance != null ? acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
//                                           </div>
//                                            {/* --- FIX: Use currencyName --- */}
//                                           <div className="text-[11px] text-muted-foreground truncate" title={acc.currency?.currencyName ?? ''}>
//                                               {acc.currency?.currencyName || 'Unknown Currency'} {/* <-- Use currencyName */}
//                                           </div>
//                                            {/* --- END FIX --- */}
//                                        </div>
//                                   ))}
//                               </div>
//                           ) : (
//                               <p className="text-sm text-muted-foreground italic py-2">No accounts found for this user.</p>
//                           )}
//                      </CardContent>
//                 </Card>

//                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Left Column (KYC + Documents) */}
//                     <div className="lg:col-span-1 space-y-6">
//                         {/* KYC Details Card */}
//                         <Card className="shadow-sm border-border">
//                              {/* ... (CardHeader with Status - Keep as is) ... */}
//                              <CardHeader className="border-b border-border p-4">
//                                 <CardTitle className="text-base font-semibold flex items-center gap-2">
//                                     <UserCheck className="h-5 w-5 text-primary" /> KYC Information
//                                 </CardTitle>
//                                 <CardDescription className="flex items-center gap-2 pt-1">
//                                     Status:
//                                     <Badge variant="outline" className={cn("text-xs capitalize px-2 py-0.5 font-medium", kycStatusConfig.color)}>
//                                         <kycStatusConfig.icon className="h-3 w-3 mr-1 flex-shrink-0" />
//                                         {kycStatusConfig.label}
//                                     </Badge>
//                                 </CardDescription>
//                                 {kyc?.status === 'rejected' && kyc.rejectionReason && (
//                                 <p className="text-xs text-destructive pt-1.5 !mt-1.5 border-t border-destructive/20">
//                                     <span className="font-medium">Rejection Reason:</span> {kyc.rejectionReason}
//                                 </p>
//                                 )}
//                             </CardHeader>
//                             <CardContent className="p-4 space-y-1">
//                                 {kyc ? (
//                                     <>
//                                         <DetailItem label="First Name" value={kyc.firstName} />
//                                         <DetailItem label="Last Name" value={kyc.lastName} />
//                                         <DetailItem label="Date of Birth" value={formatDate(kyc.dateOfBirth)} icon={CalendarDays} />
//                                         <DetailItem label="Mobile" value={formatMobile(kyc.mobile)} icon={Phone} />
//                                         <DetailItem label="Nationality" value={kyc.nationality} icon={Globe} />
//                                         <DetailItem label="Occupation" value={kyc.occupation} icon={Briefcase} />
//                                         <DetailItem label="Salary Range" value={kyc.salaryRange ? salaryDisplayMap[kyc.salaryRange] : undefined} icon={BadgeDollarSign} />
//                                         {/* --- FIX: Use Separator component --- */}
//                                         <Separator className="my-2.5" />
//                                         {/* --- END FIX --- */}
//                                         <DetailItem label="ID Type" value={<span className="capitalize">{kyc.idType?.replace("_", " ")}</span>} icon={Fingerprint} />
//                                         <DetailItem label="ID Number" value={kyc.idNumber} />
//                                         <DetailItem label="ID Issue Date" value={formatDate(kyc.idIssueDate)} icon={CalendarDays} />
//                                         <DetailItem label="ID Expiry Date" value={formatDate(kyc.idExpiryDate)} icon={CalendarDays} />
//                                          {/* --- FIX: Use Separator component --- */}
//                                         <Separator className="my-2.5" />
//                                          {/* --- END FIX --- */}
//                                         <DetailItem label="Submitted At" value={formatDate(kyc.submittedAt, true)} icon={Clock} />
//                                         <DetailItem label="Last Updated" value={formatDate(kyc.lastUpdatedAt, true)} icon={Clock} />
//                                     </>
//                                 ) : (
//                                     <p className="text-sm text-muted-foreground italic py-4 text-center">KYC details not submitted.</p>
//                                 )}
//                             </CardContent>
//                         </Card>

//                        {/* Documents Card (Keep as is) */}
//                        {kyc?.documents && kyc.documents.length > 0 && (
//                             <Card className="shadow-sm border-border">
//                                 <CardHeader className="p-4 border-b border-border">
//                                     <CardTitle className="text-base font-semibold flex items-center gap-2">
//                                         <FileText className="h-5 w-5 text-primary" /> Submitted Documents
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="p-4 space-y-4">
//                                     {kyc.documents.map((doc) => (
//                                         <div key={doc.public_id} className="border border-border rounded-lg overflow-hidden bg-card">
//                                             <div className="p-2 border-b bg-muted/50">
//                                                 <h4 className="text-xs font-medium capitalize">
//                                                     {doc.docType.replace('_', ' ')}
//                                                 </h4>
//                                             </div>
//                                             <div className="p-2 flex items-center justify-center aspect-video bg-muted overflow-hidden relative group">
//                                                 {doc.url ? (
//                                                         <>
//                                                         {doc.url.toLowerCase().endsWith('.pdf') ? (
//                                                             <FileText className="h-12 w-12 text-muted-foreground/50" />
//                                                         ) : (
//                                                             <Image
//                                                                 src={doc.url} alt={`${doc.docType} preview`} fill
//                                                                 className="object-contain" unoptimized
//                                                             />
//                                                         )}
//                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer"
//                                                             className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
//                                                             aria-label={`View full ${doc.docType.replace('_', ' ')} document`}>
//                                                             <Eye className="h-6 w-6 text-white" />
//                                                             </a>
//                                                         </>
//                                                     ) : (
//                                                         <p className="text-xs text-muted-foreground italic">No preview</p>
//                                                     )}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </CardContent>
//                             </Card>
//                         )}
//                     </div>

//                     {/* Right Column (Transactions - Keep as is) */}
//                     <div className="lg:col-span-2 space-y-6">
//                          <Card className="shadow-sm border-border">
//                              <CardHeader className="p-4 border-b border-border">
//                                  <CardTitle className="text-base font-semibold flex items-center gap-2">
//                                      <Send className="h-5 w-5 text-primary" /> Recent Transfers
//                                  </CardTitle>
//                                  <CardDescription>Last 5 transfers initiated by this user.</CardDescription>
//                              </CardHeader>
//                              <CardContent className="p-0">
//                                  <TransactionTable data={transfers} type="transfer" />
//                              </CardContent>
//                          </Card>
//                          <Card className="shadow-sm border-border">
//                              <CardHeader className="p-4 border-b border-border">
//                                  <CardTitle className="text-base font-semibold flex items-center gap-2">
//                                      <Landmark className="h-5 w-5 text-primary" /> Recent Payments (Add Money)
//                                  </CardTitle>
//                                 <CardDescription>Last 5 payment attempts by this user.</CardDescription>
//                              </CardHeader>
//                              <CardContent className="p-0">
//                                  <TransactionTable data={payments} type="payment" />
//                              </CardContent>
//                          </Card>
//                     </div>
//                  </div>
//             </div>
//         </div>
//     );
// };

// export default UserDetailPage;

// frontend/src/app/admin/users/[userId]/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import userAdminService from "../../../services/admin/user.admin";
// Import specific types needed
import type { AdminUserDetailResponse } from "../../../services/admin/user.admin";
import type { KycMobile, KycStatus } from "../../../services/kyc";
import type { Payment } from "@/types/payment";
import type { Transfer } from "@/types/transfer";
import { useAuth } from "../../../contexts/AuthContext";

// Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Removed CardFooter as it wasn't used
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator"; // <<<--- IMPORT CONFIRMED

// Icons
import {
  ArrowLeft,
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  Phone,
  Briefcase,
  UserCheck,
  UserX,
  HelpCircle,
  BadgeDollarSign,
  Fingerprint,
  Globe,
  FileText,
  AlertCircle,
  Info,
  Workflow,
  ExternalLink,
  Eye,
  Wallet,
  Send,
  Download,
  Landmark,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Helper Functions (Keep as they are) ---
const formatDate = (
  dateInput?: string | Date | null,
  includeTime = false
): string => {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Invalid Date";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
    };
    return date.toLocaleDateString("en-US", options);
  } catch (e) {
    return "Invalid Date";
  }
};

const formatMobile = (mobile?: KycMobile | null): string => {
  if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
    return "N/A";
  return `${mobile.countryCode} ${mobile.number}`;
};

const getKycStatusConfig = (status?: KycStatus | null) => {
  const statusMap: Record<
    KycStatus | "unknown",
    { color: string; icon: React.ElementType; label: string }
  > = {
    verified: {
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-700/50",
      icon: ShieldCheck,
      label: "Verified",
    },
    rejected: {
      color:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-700/50",
      icon: UserX,
      label: "Rejected",
    },
    pending: {
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50",
      icon: Clock,
      label: "Pending",
    },
    skipped: {
      color:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700/50",
      icon: ArrowLeft,
      label: "Skipped",
    },
    not_started: {
      color:
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600/50",
      icon: HelpCircle,
      label: "Not Started",
    },
    unknown: {
      color:
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600/50",
      icon: HelpCircle,
      label: "Unknown",
    }, // Fallback
  };
  return statusMap[status || "not_started"] || statusMap.unknown;
};

const getTransactionStatusColor = (status?: string | null): string => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400 border-green-200 dark:border-green-600/30";
    case "pending":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-600/30";
    case "processing":
    case "in progress":
      return "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400 border-blue-200 dark:border-blue-600/30";
    case "failed":
      return "text-rose-600 bg-rose-100 dark:bg-rose-600/20 dark:text-rose-400 border-rose-200 dark:border-rose-600/30";
    case "canceled":
    case "cancelled":
      return "text-red-600 bg-red-100 dark:bg-red-600/20 dark:text-red-400 border-red-200 dark:border-red-600/30";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400 border-gray-200 dark:border-gray-600/30";
  }
};

const getInitials = (name?: string): string => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const salaryDisplayMap: Record<string, string> = {
  "0-1000": "Below $10,000",
  "10000-50000": "$10,000 - $49,999",
  "50000-100000": "$50,000 - $99,999",
  "100000+": "$100,000 or more",
};

// --- DetailItem Component (Minor styling adjustments) ---
const DetailItem = ({
  label,
  value,
  icon: Icon,
  isImportant = false,
  className = "",
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
  isImportant?: boolean;
  className?: string;
}) => (
  <div className={cn("py-2 space-y-0.5", className)}>
    {/* Reduced vertical padding slightly */}
    <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
      {Icon && (
        <Icon className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/80" />
      )}
      {label}
    </dt>
    <dd
      className={cn(
        "text-sm min-h-[20px] break-words",
        isImportant ? "font-semibold text-foreground" : "text-foreground/90"
      )}
    >
      {value || <span className="italic text-muted-foreground/80">N/A</span>}
    </dd>
  </div>
);

// --- Loading Skeleton Component (Keep as is, fits the theme) ---
const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8 relative">
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-8 w-8 rounded-full bg-muted" />
        {/* Slightly larger icon */}
        <Skeleton className="h-5 w-36 bg-muted rounded" />
      </div>
      {/* Card Skeleton - Use background colors matching the non-shadowed style */}
      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-border">
          <Skeleton className="h-16 w-16 rounded-full flex-shrink-0 bg-muted" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4 bg-muted rounded" />
            <Skeleton className="h-4 w-1/2 bg-muted rounded" />
            <Skeleton className="h-5 w-20 bg-muted rounded-md" />
          </div>
          <div className="space-y-1 text-right flex-shrink-0">
            <Skeleton className="h-3 w-28 bg-muted rounded" />
            <Skeleton className="h-3 w-24 bg-muted rounded" />
            <Skeleton className="h-3 w-32 bg-muted rounded" />
          </div>
        </div>
        <div className="p-4 sm:p-6 bg-muted/30 dark:bg-card">
          {/* Match balance section bg */}
          <Skeleton className="h-4 w-1/4 bg-muted rounded mb-3" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full bg-muted rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* Other Section Skeletons - Using border structure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-border rounded-lg bg-card">
            <div className="border-b border-border p-4">
              <Skeleton className="h-6 w-1/2 bg-muted rounded" />
            </div>
            <div className="p-4 sm:p-6">
              <Skeleton className="h-40 w-full bg-muted rounded-md" />
            </div>
          </div>
          <div className="border border-border rounded-lg bg-card">
            <div className="border-b border-border p-4">
              <Skeleton className="h-6 w-1/3 bg-muted rounded" />
            </div>
            <div className="p-4 sm:p-6">
              <Skeleton className="h-32 w-full bg-muted rounded-md" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-border rounded-lg bg-card">
            <div className="border-b border-border p-4">
              <Skeleton className="h-6 w-1/4 bg-muted rounded" />
            </div>
            <div className="p-0">
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
          <div className="border border-border rounded-lg bg-card">
            <div className="border-b border-border p-4">
              <Skeleton className="h-6 w-1/4 bg-muted rounded" />
            </div>
            <div className="p-0">
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Error Display Component (Keep as is) ---
const ErrorDisplay = ({
  error,
  onRetry,
}: {
  error: string | null;
  onRetry: () => void;
}) => (
  <Alert variant="destructive" className="mt-6">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error Loading User Details</AlertTitle>
    <AlertDescription>
      {error || "An unexpected error occurred."}
      <Button
        variant="destructive"
        size="sm"
        onClick={onRetry}
        className="mt-2 ml-auto block"
      >
        Retry
      </Button>
    </AlertDescription>
  </Alert>
);

// --- Transaction Table Component (Add subtle borders, adjust padding) ---
const TransactionTable = ({
  data,
  type,
}: {
  data: (Transfer | Payment)[];
  type: "transfer" | "payment";
}) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8 px-4">
        No {type}s found for this user.
      </p>
    );
  }

  const isTransfer = (item: Transfer | Payment): item is Transfer =>
    type === "transfer";

  return (
    <div className="overflow-x-auto">
      <Table className="text-xs">
        {/* Apply text-xs globally */}
        <TableHeader className="bg-muted/50 dark:bg-muted/30">
          <TableRow className="border-b-border">
            <TableHead className="w-[100px] px-3 py-2 h-9">ID</TableHead>
            {/* Reduced padding/height */}
            {type === "transfer" && (
              <TableHead className="px-3 py-2 h-9">Recipient</TableHead>
            )}
            <TableHead className="px-3 py-2 h-9">Amount</TableHead>
            <TableHead className="px-3 py-2 h-9">Currency</TableHead>
            <TableHead className="px-3 py-2 h-9">Status</TableHead>
            <TableHead className="px-3 py-2 h-9">Date</TableHead>
            <TableHead className="text-right px-3 py-2 h-9">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, 5).map((item) => {
            const statusColor = getTransactionStatusColor(item.status);
            const amount = isTransfer(item)
              ? item.sendAmount
              : (item as Payment).amountToAdd;
            const currencyCode = isTransfer(item)
              ? typeof item.sendCurrency === "object"
                ? item.sendCurrency?.code
                : "N/A"
              : (item as Payment).payInCurrency?.code;
            const recipientName = isTransfer(item)
              ? item.recipient?.accountHolderName
              : undefined;
            const detailLink =
              type === "transfer"
                ? `/admin/transfer/${item._id}`
                : `/admin/add-money`; // Maybe link to payment list for now

            return (
              <TableRow
                key={item._id}
                className="border-b-border hover:bg-muted/30 dark:hover:bg-muted/20"
              >
                <TableCell className="px-3 py-2">
                  {/* Reduced padding */}
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-mono cursor-help underline decoration-dashed decoration-border">
                          {item._id.substring(item._id.length - 6)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item._id}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                {type === "transfer" && (
                  <TableCell className="max-w-[150px] truncate px-3 py-2">
                    {recipientName || "N/A"}
                  </TableCell>
                )}
                <TableCell className="font-medium px-3 py-2">
                  {amount != null ? Number(amount).toFixed(2) : "N/A"}
                </TableCell>
                <TableCell className="px-3 py-2">
                  {currencyCode || "N/A"}
                </TableCell>
                <TableCell className="px-3 py-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] capitalize px-1.5 py-0.5 border",
                      statusColor
                    )}
                  >
                    {/* Adjusted badge style/size */}
                    {item.status || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell className="px-3 py-2 whitespace-nowrap">
                  {formatDate(item.createdAt, true)}
                </TableCell>
                <TableCell className="text-right px-3 py-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    title={`View ${type} details`}
                  >
                    {/* Smaller button */}
                    <Link
                      href={detailLink}
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

// --- Main Detail Page Component ---
const UserDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { token, isAdmin, loading: authLoading } = useAuth();
  const userId = params.userId as string;

  const [userData, setUserData] = useState<AdminUserDetailResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetching Logic (Keep as is)
  const fetchUserDetails = useCallback(async () => {
    if (!isAdmin) {
      setError("Access Denied: Administrator privileges required.");
      setLoading(false);
      return;
    }
    if (!userId) {
      setError("User ID is missing from the URL.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await userAdminService.getUserDetailsAdmin(userId);
      setUserData(data);
    } catch (err: any) {
      setError(err.message || "Failed to load user details.");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, [userId, isAdmin]);

  useEffect(() => {
    if (authLoading) return;

    if (token && isAdmin) {
      fetchUserDetails();
    } else if (!token) {
      router.push("/auth/login?message=login_required");
    } else if (!isAdmin) {
      setError("Access Denied: Administrator privileges required.");
      setLoading(false);
    }
  }, [token, isAdmin, authLoading, userId, router, fetchUserDetails]);

  // --- Render Logic ---
  if (loading || authLoading)
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <LoadingSkeleton />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <ErrorDisplay error={error} onRetry={fetchUserDetails} />
      </div>
    );
  if (!userData)
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 text-center py-16 text-muted-foreground">
        User data could not be loaded.
      </div>
    );

  const { kyc, accounts, transfers, payments } = userData;
  const kycStatusConfig = getKycStatusConfig(kyc?.status);

  return (
    // Use background for overall page, spacing handled by container/elements
  <div className="container mx-auto px-4 py-8 relative">
    <div className="pb-10">
      <div className="space-y-6">
        {/* Back Navigation */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 mb-4 h-8 px-3 bg-card hover:bg-muted"
          onClick={() => router.push("/admin/users")} // Use onClick instead
        >
          <ArrowLeft className="h-4 w-4" />
          Back to User List
        </Button>

        {/* User Profile Card - Use border instead of shadow */}
        <Card className="overflow-hidden border border-border bg-card shadow-none">
          {/* Explicitly bg-card, no shadow */}
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-border">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 border-2 border-border">
                <AvatarFallback className="text-xl font-semibold bg-muted text-muted-foreground">
                  {getInitials(userData.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <CardTitle className="text-lg sm:text-xl text-foreground">
                  {userData.fullName}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {userData.email}
                </CardDescription>
                <Badge
                  variant={userData.role === "admin" ? "default" : "secondary"}
                  className={cn(
                    "mt-1.5 text-xs capitalize",
                    userData.role === "admin"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {userData.role} Account
                </Badge>
              </div>
            </div>
            {/* Meta Info */}
            <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-muted-foreground flex-shrink-0 mt-2 sm:mt-0">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3" /> Joined:
                {formatDate(userData.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Updated:
                {formatDate(userData.updatedAt)}
              </span>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="font-mono cursor-help underline decoration-dotted decoration-border">
                      ID: {userData._id.substring(userData._id.length - 8)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{userData._id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          {/* Account Balances - Use subtle background difference */}
          <CardContent className="p-4 sm:p-6 bg-muted/30 dark:bg-muted/20">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
              <Wallet className="h-4 w-4" /> Account Balances
            </h3>
            {accounts && accounts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {accounts.map((acc) => (
                  <div
                    key={acc._id}
                    className="border border-border/70 rounded-md p-3 bg-card"
                  >
                    {/* Use card bg for contrast */}
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-foreground">
                        {acc.currency?.code}
                      </span>
                      {/* Optional: Add a country flag if available */}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                      {acc.balance != null
                        ? acc.balance.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "N/A"}
                    </div>
                    <div
                      className="text-[11px] text-muted-foreground truncate"
                      title={acc.currency?.currencyName ?? ""}
                    >
                      {acc.currency?.currencyName || "Unknown Currency"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic py-2">
                No accounts found for this user.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (KYC + Documents) - Combine into one bordered block */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-border bg-card shadow-none">
              {/* Single card for KYC + Docs */}
              <CardHeader className="border-b border-border p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary" /> KYC
                    Information
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs capitalize px-2 py-0.5 font-medium border",
                      kycStatusConfig.color
                    )}
                  >
                    <kycStatusConfig.icon className="h-3 w-3 mr-1 flex-shrink-0" />
                    {kycStatusConfig.label}
                  </Badge>
                </div>
                {kyc?.status === "rejected" && kyc.rejectionReason && (
                  <p className="text-xs text-destructive pt-2 mt-2 border-t border-destructive/20">
                    <span className="font-medium">Rejection Reason:</span>
                    {kyc.rejectionReason}
                  </p>
                )}
              </CardHeader>
              <CardContent className="p-4 space-y-1">
                {/* Consistent padding */}
                {kyc ? (
                  <>
                    {/* Group personal details */}
                    <DetailItem label="First Name" value={kyc.firstName} />
                    <DetailItem label="Last Name" value={kyc.lastName} />
                    <DetailItem
                      label="Date of Birth"
                      value={formatDate(kyc.dateOfBirth)}
                      icon={CalendarDays}
                    />
                    <DetailItem
                      label="Mobile"
                      value={formatMobile(kyc.mobile)}
                      icon={Phone}
                    />
                    <DetailItem
                      label="Nationality"
                      value={kyc.nationality}
                      icon={Globe}
                    />
                    <DetailItem
                      label="Occupation"
                      value={kyc.occupation}
                      icon={Briefcase}
                    />
                    <DetailItem
                      label="Salary Range"
                      value={
                        kyc.salaryRange
                          ? salaryDisplayMap[kyc.salaryRange]
                          : undefined
                      }
                      icon={BadgeDollarSign}
                    />
                    <Separator className="my-3" /> {/* Use Separator */}
                    {/* Group ID details */}
                    <DetailItem
                      label="ID Type"
                      value={
                        <span className="capitalize">
                          {kyc.idType?.replace("_", " ")}
                        </span>
                      }
                      icon={Fingerprint}
                    />
                    <DetailItem label="ID Number" value={kyc.idNumber} />
                    <DetailItem
                      label="ID Issue Date"
                      value={formatDate(kyc.idIssueDate)}
                      icon={CalendarDays}
                    />
                    <DetailItem
                      label="ID Expiry Date"
                      value={formatDate(kyc.idExpiryDate)}
                      icon={CalendarDays}
                    />
                    <Separator className="my-3" /> {/* Use Separator */}
                    {/* Group Timestamps */}
                    <DetailItem
                      label="Submitted At"
                      value={formatDate(kyc.submittedAt, true)}
                      icon={Clock}
                    />
                    <DetailItem
                      label="Last Updated"
                      value={formatDate(kyc.lastUpdatedAt, true)}
                      icon={Clock}
                    />
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground italic py-4 text-center">
                    KYC details not submitted.
                  </p>
                )}
              </CardContent>
              {/* Documents Section (within the same card if they exist) */}
              {kyc?.documents && kyc.documents.length > 0 && (
                <>
                  <Separator className="mx-4" />
                  {/* Separator before documents section */}
                  <div className="p-4">
                    {/* Padding for the documents section */}
                    <h3 className="text-base font-semibold flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-primary" /> Submitted
                      Documents
                    </h3>
                    <div className="space-y-4">
                      {kyc.documents.map((doc) => (
                        <div
                          key={doc.public_id}
                          className="border border-border rounded-lg overflow-hidden bg-muted/30 dark:bg-muted/20"
                        >
                          <div className="p-2 border-b border-border bg-muted/60 dark:bg-muted/40">
                            <h4 className="text-xs font-medium capitalize">
                              {doc.docType.replace("_", " ")}
                            </h4>
                          </div>
                          <div className="p-2 flex items-center justify-center aspect-video bg-background/50 dark:bg-muted/10 overflow-hidden relative group">
                            {doc.url ? (
                              <>
                                {doc.url.toLowerCase().endsWith(".pdf") ? (
                                  <FileText className="h-12 w-12 text-muted-foreground/50" />
                                ) : (
                                  <Image
                                    src={doc.url}
                                    alt={`${doc.docType} preview`}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                  />
                                )}
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                  aria-label={`View full ${doc.docType.replace(
                                    "_",
                                    " "
                                  )} document`}
                                >
                                  <Eye className="h-6 w-6 text-white" />
                                </a>
                              </>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">
                                No preview
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Right Column (Transactions) - Use border instead of shadow */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border bg-card shadow-none">
              <CardHeader className="p-4 border-b border-border">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" /> Recent Transfers
                </CardTitle>
                <CardDescription className="text-xs !mt-1">
                  Last 5 transfers initiated by this user.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {/* Remove padding to let table fill */}
                <TransactionTable data={transfers} type="transfer" />
              </CardContent>
            </Card>

            <Card className="border border-border bg-card shadow-none">
              <CardHeader className="p-4 border-b border-border">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-primary" /> Recent Payments
                  (Add Money)
                </CardTitle>
                <CardDescription className="text-xs !mt-1">
                  Last 5 payment attempts by this user.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {/* Remove padding */}
                <TransactionTable data={payments} type="payment" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default UserDetailPage;
