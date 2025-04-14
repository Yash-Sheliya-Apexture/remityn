// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { Loader2, AlertTriangle } from 'lucide-react';

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();

//     // Redirect if status is not rejected or user not loaded
//     useEffect(() => {
//         if (!authLoading && user && user.kycStatus !== 'rejected') {
//             // Redirect based on actual status
//              if (user.kycStatus === 'verified') router.replace('/dashboard');
//              else if (user.kycStatus === 'not_started' || user.kycStatus === 'skipped') router.replace('/kyc/start');
//              else if (user.kycStatus === 'pending') router.replace('/kyc/pending');
//              else router.replace('/dashboard'); // Fallback
//         }
//     }, [user, authLoading, router]);

//     const handleRetryVerification = () => {
//         // Might want to reset context/localstorage here if needed before restart
//         // resetKycProgress(); // If using context reset
//         router.push('/kyc/start'); // Send back to the start page
//     };

//      const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };


//     if (authLoading) {
//         return (
//             <div className="flex justify-center items-center min-h-[300px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//         );
//     }

//      // Don't render if redirecting
//      if (!user || user.kycStatus !== 'rejected') {
//          return null;
//      }

//     return (
//         <div className="text-center max-w-md mx-auto">
//             <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
//             <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-mainheading dark:text-white">
//                 Verification Required
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 mb-4">
//                 Unfortunately, we couldn't verify your identity based on the information provided.
//             </p>

//             {user.kycRejectionReason && (
//                 <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-red-700 dark:text-red-200 text-sm">
//                     <p className="font-medium">Reason:</p>
//                     <p>{user.kycRejectionReason}</p>
//                 </div>
//             )}

//             <p className="text-gray-600 dark:text-gray-300 mb-8">
//                 Please review the requirements, ensure your documents are clear and valid, and try submitting again.
//             </p>

//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//                  <Button onClick={handleRetryVerification} size="lg">
//                     Retry Verification
//                 </Button>
//                 <Button onClick={handleGoToDashboard} variant="outline" size="lg">
//                     Go to Dashboard
//                 </Button>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard } from 'lucide-react'; // Import icons
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { useKyc } from '../../contexts/KycContext'; // Import to reset progress

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const { resetKycProgress } = useKyc(); // Get reset function

//     // Effect to redirect if the user's status is not 'rejected'
//     useEffect(() => {
//         if (authLoading) return; // Wait for user data

//         // Redirect if user is not logged in
//         if (!user) {
//             router.replace('/auth/login?redirect=/kyc/rejected');
//             return;
//         }

//         // Redirect if status is NOT rejected
//         if (user.kycStatus !== 'rejected') {
//             console.log(`KYC Rejected: Status is ${user.kycStatus}, redirecting...`);
//             switch (user.kycStatus) {
//                 case 'verified':
//                     router.replace('/dashboard');
//                     break;
//                 case 'pending':
//                     router.replace('/kyc/pending');
//                     break;
//                 case 'not_started':
//                 case 'skipped':
//                 default:
//                     router.replace('/kyc/start');
//                     break;
//             }
//         }
//         // If status IS rejected, stay on this page.

//     }, [user, authLoading, router]);

//     // Action to retry verification: reset progress and go to start
//     const handleRetryVerification = () => {
//         resetKycProgress(); // Clear any old data
//         router.push('/kyc/start'); // Navigate to the start page
//     };

//      // Action to go to the dashboard
//      const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // Loading state while checking auth/user status
//      if (authLoading || !user) {
//         return (
//             <div className="flex justify-center items-center min-h-[300px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-2">Checking verification status...</span>
//             </div>
//         );
//     }

//      // If the effect hasn't redirected yet but status is not rejected, show loading
//       if (user.kycStatus !== 'rejected') {
//           return (
//              <div className="flex justify-center items-center min-h-[300px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  <span className="ml-2">Redirecting...</span>
//              </div>
//          );
//      }

//     // Render content only if status is confirmed rejected
//     return (
//         <Card className="w-full max-w-md mx-auto shadow-md border-destructive/50">
//             <CardHeader className="text-center">
//                 <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-3" />
//                 <CardTitle className="text-2xl md:text-3xl font-semibold text-destructive">
//                     Verification Required
//                 </CardTitle>
//                 <CardDescription>
//                     Unfortunately, we couldn't verify your identity.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6">
//                 {/* Display rejection reason if available */}
//                 {user.kycRejectionReason && (
//                     <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
//                         <p className="font-semibold mb-1">Reason for Rejection:</p>
//                         <p>{user.kycRejectionReason}</p>
//                     </div>
//                 )}

//                 <p className="text-gray-600 dark:text-gray-300">
//                     Please review the requirements, ensure your documents are clear, valid, and match your profile details, then try submitting again.
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                      <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto">
//                          <RotateCcw className="mr-2 h-4 w-4" />
//                         Retry Verification
//                     </Button>
//                     <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto">
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Go to Dashboard
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }


// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning } from 'lucide-react'; // Added FileWarning
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Use Alert component
// import { useKyc } from '../../contexts/KycContext'; // Adjusted path

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     // Get reset function and context state
//     const { resetKycProgress, updateCurrentStepId, isInitialized } = useKyc();

//      // Set current step in context
//     useEffect(() => {
//         updateCurrentStepId('rejected');
//     }, [updateCurrentStepId]);

//     // Effect to redirect if status changes or user logs out
//     useEffect(() => {
//         // Wait for auth context AND KycContext initialization
//         if (authLoading || !isInitialized) return;

//         if (!user) {
//             console.log("KYC Rejected Page: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/rejected');
//             return;
//         }

//         // Redirect if status is NOT rejected
//         if (user.kycStatus !== 'rejected') {
//             console.log(`KYC Rejected Page: Status is ${user.kycStatus}, redirecting...`);
//             switch (user.kycStatus) {
//                 case 'verified':
//                     router.replace('/kyc/complete'); // Use complete page
//                     break;
//                 case 'pending':
//                     router.replace('/kyc/pending');
//                     break;
//                 case 'not_started':
//                 case 'skipped':
//                 default:
//                     router.replace('/kyc/start');
//                     break;
//             }
//         }
//         // If status IS rejected, stay.

//     }, [user, authLoading, isInitialized, router]);

//     // Action to retry verification
//     const handleRetryVerification = () => {
//         console.log("Retrying verification, resetting progress...");
//         resetKycProgress(); // Clear local storage, files, and context state, then navigates to 'start'
//         // No need to router.push here, resetKycProgress handles it via goToStep('start')
//     };

//      // Action to go to the dashboard (no change)
//      const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // Loading state
//      if (authLoading || !isInitialized || !user) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                 <span className="ml-3 text-lg text-muted-foreground">Checking status...</span>
//             </div>
//         );
//     }

//      // Brief loading if redirect is needed
//       if (user.kycStatus !== 'rejected') {
//           return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Redirecting...</span>
//              </div>
//          );
//      }

//     // Render content only if status is confirmed rejected
//     return (
//         <Card className="w-full max-w-lg mx-auto shadow-lg border border-destructive/50 mt-10 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20">
//             <CardHeader className="text-center items-center pt-8">
//                 <AlertTriangle className="mx-auto h-14 w-14 text-destructive mb-4 stroke-[1.5]" />
//                 <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                     Action Required
//                 </CardTitle>
//                 <CardDescription className="text-base text-muted-foreground pt-1">
//                     Unfortunately, we couldn't verify your identity.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6 pb-8">
//                 {/* Display rejection reason if available */}
//                 {user.kycRejectionReason && (
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle>Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {user.kycRejectionReason}
//                         </AlertDescription>
//                     </Alert>
//                 )}

//                 <p className="text-foreground/90 dark:text-foreground/80 px-4">
//                     Please review the reason above (if provided) and ensure your documents are clear, valid, and match the details you entered. You can restart the verification process.
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                      <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto">
//                          <RotateCcw className="mr-2 h-4 w-4" />
//                         Retry Verification
//                     </Button>
//                     <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto">
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Go to Dashboard
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }



// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning } from 'lucide-react'; // Added FileWarning
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Use Alert component
// import { useKyc } from '../../contexts/KycContext'; // Adjusted path

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     // Get reset function and context state
//     const { resetKycProgress, updateCurrentStepId, isInitialized } = useKyc();

//      // Set current step in context
//     useEffect(() => {
//         updateCurrentStepId('rejected');
//     }, [updateCurrentStepId]);

//     // Effect to redirect if status changes or user logs out
//     useEffect(() => {
//         // Wait for auth context AND KycContext initialization
//         if (authLoading || !isInitialized) return;

//         if (!user) {
//             console.log("KYC Rejected Page: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/rejected');
//             return;
//         }

//         // Redirect if status is NOT rejected
//         if (user.kycStatus !== 'rejected') {
//             console.log(`KYC Rejected Page: Status is ${user.kycStatus}, redirecting...`);
//             switch (user.kycStatus) {
//                 case 'verified':
//                     router.replace('/kyc/complete'); // Use complete page
//                     break;
//                 case 'pending':
//                     router.replace('/kyc/pending');
//                     break;
//                 case 'not_started':
//                 case 'skipped':
//                 default:
//                     router.replace('/kyc/start');
//                     break;
//             }
//         }
//         // If status IS rejected, stay.

//     }, [user, authLoading, isInitialized, router]);

//     // Action to retry verification
//     const handleRetryVerification = () => {
//         console.log("Retrying verification, resetting progress...");
//         resetKycProgress(); // Clear local storage, files, and context state, then navigates to 'start'
//         // No need to router.push here, resetKycProgress handles it via goToStep('start')
//     };

//      // Action to go to the dashboard (no change)
//      const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // Loading state
//      if (authLoading || !isInitialized || !user) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                 <span className="ml-3 text-lg text-muted-foreground">Checking status...</span>
//             </div>
//         );
//     }

//      // Brief loading if redirect is needed
//       if (user.kycStatus !== 'rejected') {
//           return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Redirecting...</span>
//              </div>
//          );
//      }

//     // Render content only if status is confirmed rejected
//     return (
//         <Card className="w-full max-w-lg mx-auto shadow-lg border border-destructive/50 mt-10 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20">
//             <CardHeader className="text-center items-center pt-8">
//                 <AlertTriangle className="mx-auto h-14 w-14 text-destructive mb-4 stroke-[1.5]" />
//                 <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                     Action Required
//                 </CardTitle>
//                 <CardDescription className="text-base text-muted-foreground pt-1">
//                     Unfortunately, we couldn't verify your identity.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6 pb-8">
//                 {/* Display rejection reason if available */}
//                 {user.kycRejectionReason && (
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle>Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {user.kycRejectionReason}
//                         </AlertDescription>
//                     </Alert>
//                 )}

//                 <p className="text-foreground/90 dark:text-foreground/80 px-4">
//                     Please review the reason above (if provided) and ensure your documents are clear, valid, and match the details you entered. You can restart the verification process.
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                      <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto">
//                          <RotateCcw className="mr-2 h-4 w-4" />
//                         Retry Verification
//                     </Button>
//                     <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto">
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Go to Dashboard
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning, HelpCircle } from 'lucide-react';

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         resetKycProgress, // Function to clear state and navigate to start
//         updateCurrentUiStepId,
//         goToStep, // Potentially useful if we want to jump to a specific edit step later
//         backendStatus,
//         rejectionReason, // Get rejection reason from context
//         isInitialized: kycInitialized,
//         isLoadingStatus: kycLoadingStatus
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('rejected');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status and redirect if necessary
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) {
//             console.log("KYC Rejected: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/rejected');
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Redirect if status changes away from 'rejected' (handled by KycContext provider now)

//     // --- Action Handlers ---
//     const handleRetryVerification = () => {
//         console.log("KYC Rejected: Retrying verification...");
//         // Reset progress and navigate to the 'start' page using the context function
//         // This ensures context state is clean before restarting the flow.
//         resetKycProgress(true); // `true` should navigate to the start page '/kyc/start'
//     };

//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // --- Render Logic ---

//     // Primary loading state
//     if (authLoading || !kycInitialized) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Initializing...</p>
//             </div>
//         );
//     }

//     // If user is definitely not logged in
//     if (!user) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-3" />
//                 <p className="text-muted-foreground">Redirecting to login...</p>
//             </div>
//         );
//     }

//     // If status is being checked or is not yet 'rejected'
//     if (kycLoadingStatus || (backendStatus !== 'rejected' && backendStatus !== 'error')) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Checking Verification Status...</p>
//             </div>
//         );
//     }

//     // Render only if status is definitively 'rejected'
//     if (backendStatus !== 'rejected') {
//          console.warn(`KYC Rejected Page: Render attempted with status ${backendStatus}. Waiting for context redirect.`);
//          return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Updating Status...</p>
//              </div>
//          );
//     }

//     // --- Main Rejected Content ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8"> {/* Added padding and vertical centering */}
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-destructive/50 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-destructive/10 dark:bg-destructive/20 border-b border-destructive/20 dark:border-red-800/60">
//                     <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full mb-4 border border-destructive/30 dark:border-red-800/50 shadow-inner">
//                         <AlertTriangle className="h-10 w-10 text-destructive stroke-[1.5]" />
//                     </div>
//                     <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                         Verification Action Required
//                     </CardTitle>
//                     <CardDescription className="text-base text-destructive/90 dark:text-red-300/90 pt-1 max-w-md mx-auto">
//                         Unfortunately, we couldn't verify your identity with the information provided.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle className="font-semibold">Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {rejectionReason || "No specific reason provided. Common issues include unclear images, expired documents, or mismatched information. Please ensure your documents are valid and uploaded clearly."}
//                         </AlertDescription>
//                     </Alert>
//                     <p className="text-foreground/90 dark:text-foreground/80 px-2 text-base">
//                         Please review the reason above. You can restart the verification process with updated information or corrected documents.
//                     </p>
//                     <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                         <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1">
//                             <RotateCcw className="mr-2 h-4 w-4" /> Retry Verification
//                         </Button>
//                         <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto flex-1">
//                             <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
//                         </Button>
//                     </div>
//                     <p className="text-xs text-muted-foreground pt-4">
//                         Need help? <a href="/support" className="underline hover:text-primary">Contact support</a> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                     </p>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning, HelpCircle } from 'lucide-react';

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         resetKycProgress, // Function to clear state and navigate to start
//         updateCurrentUiStepId,
//         // goToStep, // Keep commented unless needed for specific step navigation
//         backendStatus,
//         rejectionReason, // Get rejection reason from context
//         isInitialized: kycInitialized,
//         isLoadingStatus: kycLoadingStatus
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('rejected');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status and redirect if necessary
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) {
//             console.log("KYC Rejected: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/rejected');
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Redirect if status changes away from 'rejected' (handled by KycContext provider now)

//     // --- Action Handlers ---
//     const handleRetryVerification = () => {
//         console.log("KYC Rejected: Retrying verification...");
//         // Reset progress and navigate to the 'start' page using the context function
//         resetKycProgress(true); // `true` ensures navigation to '/kyc/start' after reset
//     };

//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // --- Render Logic ---

//     // Primary loading state
//     if (authLoading || !kycInitialized) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Initializing...</p>
//             </div>
//         );
//     }

//     // If user is definitely not logged in
//     if (!user) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-3" />
//                 <p className="text-muted-foreground">Redirecting to login...</p>
//             </div>
//         );
//     }

//     // If status is being checked or is not yet 'rejected'
//     if (kycLoadingStatus || (backendStatus !== 'rejected' && backendStatus !== 'error')) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Checking Verification Status...</p>
//             </div>
//         );
//     }

//     // Render only if status is definitively 'rejected'
//     if (backendStatus !== 'rejected') {
//          console.warn(`KYC Rejected Page: Render attempted with status ${backendStatus}. Waiting for context redirect.`);
//          return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Updating Status...</p>
//              </div>
//          );
//     }

//     // --- Main Rejected Content ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8"> {/* Added padding and vertical centering */}
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-destructive/50 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-destructive/10 dark:bg-destructive/20 border-b border-destructive/20 dark:border-red-800/60">
//                     <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full mb-4 border border-destructive/30 dark:border-red-800/50 shadow-inner">
//                         <AlertTriangle className="h-10 w-10 text-destructive stroke-[1.5]" />
//                     </div>
//                     <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                         Verification Action Required
//                     </CardTitle>
//                     <CardDescription className="text-base text-destructive/90 dark:text-red-300/90 pt-1 max-w-md mx-auto">
//                         Unfortunately, we couldn't verify your identity with the information provided.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle className="font-semibold">Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {rejectionReason || "No specific reason provided. Common issues include unclear images, expired documents, or mismatched information. Please ensure your documents are valid and uploaded clearly."}
//                         </AlertDescription>
//                     </Alert>
//                     <p className="text-foreground/90 dark:text-foreground/80 px-2 text-base">
//                         Please review the reason above. You can restart the verification process with updated information or corrected documents.
//                     </p>
//                     <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                         <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1">
//                             <RotateCcw className="mr-2 h-4 w-4" /> Retry Verification
//                         </Button>
//                         <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto flex-1">
//                             <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
//                         </Button>
//                     </div>
//                     <p className="text-xs text-muted-foreground pt-4">
//                         Need help? <a href="/support" className="underline hover:text-primary">Contact support</a> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                     </p>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }


// frontend/src/app/kyc/rejected/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning, HelpCircle } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useKyc } from '../../contexts/KycContext'; // Correct path
import Link from 'next/link';

export default function KycRejectedPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const {
        resetKycProgress, // Use this for retry
        updateCurrentUiStepId,
        backendStatus,
        rejectionReason,
        isInitialized: kycInitialized,
        isLoadingStatus: kycLoadingStatus
    } = useKyc();

    // Effect 1: Set UI step
    useEffect(() => {
        if (kycInitialized) {
            updateCurrentUiStepId('rejected');
        }
    }, [kycInitialized, updateCurrentUiStepId]);

    // Effect 2: Check login status
    useEffect(() => {
        if (!authLoading && !user && kycInitialized) {
            router.replace('/auth/login?redirect=/kyc/rejected');
        }
    }, [user, authLoading, kycInitialized, router]);

    // Effect 3: Rely on KycContext provider for redirection if status changes

    // --- Action Handlers ---
    const handleRetryVerification = () => {
        console.log("KYC Rejected: Retrying verification...");
        // *** Call resetKycProgress with true to navigate to start ***
        resetKycProgress(true);
    };

    const handleGoToDashboard = () => {
        router.push('/dashboard');
    };

    // --- Render Logic ---
    if (authLoading || !kycInitialized) {
        return ( /* ... Loading indicator ... */
             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                 <p className="text-muted-foreground text-lg">Initializing...</p>
             </div>
        );
    }
    if (!user) {
        return ( /* ... Redirecting to login indicator ... */
             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
                 <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-3" />
                 <p className="text-muted-foreground">Redirecting to login...</p>
             </div>
        );
    }
    if (kycLoadingStatus || (backendStatus !== 'rejected' && backendStatus !== 'error')) {
        return ( /* ... Checking status indicator ... */
             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                 <p className="text-muted-foreground text-lg">Checking Verification Status...</p>
             </div>
        );
    }
    if (backendStatus !== 'rejected') {
        // Should be redirected by KycContext, show loading as fallback
        return ( /* ... Updating status indicator ... */
             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                 <p className="text-muted-foreground text-lg">Updating Status...</p>
             </div>
         );
    }

    // --- Main Rejected Content ---
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
            <Card className="w-full max-w-lg mx-auto shadow-xl border border-destructive/50 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20 animate-fadeIn overflow-hidden">
                <CardHeader className="text-center items-center p-6 md:p-8 bg-destructive/10 dark:bg-destructive/20 border-b border-destructive/20 dark:border-red-800/60">
                    <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full mb-4 border border-destructive/30 dark:border-red-800/50 shadow-inner">
                        <AlertTriangle className="h-10 w-10 text-destructive stroke-[1.5]" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
                        Verification Action Required
                    </CardTitle>
                    <CardDescription className="text-base text-destructive/90 dark:text-red-300/90 pt-1 max-w-md mx-auto">
                        Unfortunately, we couldn't verify your identity.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8 text-center space-y-6">
                    <Alert variant="destructive" className="text-left">
                        <FileWarning className="h-4 w-4" />
                        <AlertTitle className="font-semibold">Reason for Rejection</AlertTitle>
                        <AlertDescription>
                            {rejectionReason || "No specific reason provided. Common issues include unclear images, expired documents, or mismatched information. Please ensure your documents are valid and uploaded clearly."}
                        </AlertDescription>
                    </Alert>
                    <p className="text-foreground/90 dark:text-foreground/80 px-2 text-base">
                        Please review the reason above. You can restart the verification process with updated information or corrected documents.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1">
                            <RotateCcw className="mr-2 h-4 w-4" /> Retry Verification
                        </Button>
                        <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto flex-1">
                            <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground pt-4">
                        Need help? <Link href="/support" className="underline hover:text-primary">Contact support</Link> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}