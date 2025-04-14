// // frontend/src/app/kyc/start/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button'; // Assuming Shadcn UI
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc'; // Adjust path
// import { Loader2 } from 'lucide-react'; // Example loading icon

// export default function KycStartPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const [isLoading, setIsLoading] = React.useState(false);
//     const [error, setError] = React.useState<string | null>(null);

//     // Redirect verified users away from start page
//     useEffect(() => {
//         if (!authLoading && user?.kycStatus === 'verified') {
//             router.replace('/dashboard');
//         }
//          // Redirect pending users
//          if (!authLoading && user?.kycStatus === 'pending') {
//             router.replace('/kyc/pending');
//         }
//         // Rejected users might land here, handled by buttons below
//     }, [user, authLoading, router]);

//     const handleStartVerification = () => {
//         router.push('/kyc/personal'); // Navigate to the first step
//     };

//      const handleSkip = async () => {
//         if (!confirm("Are you sure you want to skip verification for now? You'll need to complete it later to use all features.")) {
//             return;
//         }
//         setIsLoading(true);
//         setError(null);
//         try {
//             await kycService.skipKyc();
//             await refetchUser(); // Update user status in context
//             router.push('/dashboard'); // Redirect to dashboard
//         } catch (err: any) {
//             console.error("Error skipping KYC:", err);
//             setError(err.message || "Could not skip verification. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (authLoading || isLoading) {
//         return (
//             <div className="flex justify-center items-center min-h-[300px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//         );
//     }

//      // Don't render content if redirecting
//      if (user?.kycStatus === 'verified' || user?.kycStatus === 'pending') {
//          return null;
//      }


//     return (
//         <div className="text-center">
//             <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-mainheading dark:text-white">
//                 Verify your identity
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
//                 To comply with regulations and keep your account secure, we need to verify your identity.
//                 This usually takes just a few minutes. You'll need a valid government-issued photo ID.
//             </p>

//             {user?.kycStatus === 'rejected' && (
//                  <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-200">
//                     <p className="font-medium">Verification Required</p>
//                     <p className="text-sm">Your previous verification attempt was rejected.</p>
//                      {user.kycRejectionReason && <p className="text-sm mt-1">Reason: {user.kycRejectionReason}</p>}
//                     <p className="text-sm mt-2">Please review the requirements and start the process again.</p>
//                 </div>
//             )}

//              {error && (
//                  <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-red-600 dark:text-red-200 text-sm">
//                     {error}
//                 </div>
//              )}


//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <Button
//                     onClick={handleStartVerification}
//                     size="lg"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                     {user?.kycStatus === 'rejected' ? 'Start Verification Again' : 'Start Verification'}
//                 </Button>
//                 {/* Only allow skipping if not started or rejected */}
//                 {(user?.kycStatus === 'not_started' || user?.kycStatus === 'rejected') && (
//                      <Button
//                         onClick={handleSkip}
//                         variant="outline"
//                         size="lg"
//                         disabled={isLoading}
//                     >
//                          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                         Skip for Now
//                     </Button>
//                 )}
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/kyc/start/page.tsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, AlertTriangle, Info, UserCheck, UserX, UserPlus, RotateCcw, LayoutDashboard, ShieldCheck, HelpCircle } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext'; // Import context
// import kycService from '@/app/services/kyc'; // For skip action

// // --- Component ---
// export default function KycStartPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const {
//         resetKycProgress, // To clear any stale data before starting
//         goToStep,         // To navigate to the first form step
//         updateCurrentUiStepId,
//         isInitialized: kycInitialized, // Check if KYC context is ready
//         backendStatus, // Get status directly from KYC context
//         isLoadingStatus: kycLoadingStatus, // Check if KYC status is loading
//         rejectionReason // Get rejection reason from context
//     } = useKyc();

//     // Local loading state for actions initiated on this page (Skip)
//     const [isSkipping, setIsSkipping] = useState(false);
//     const [actionError, setActionError] = useState<string | null>(null); // Errors from skip action

//     // Effect 1: Set the current UI step in context
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('start');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Handle redirection based on initial context status
//     // The KycContext provider handles ongoing status changes.
//     useEffect(() => {
//         if (authLoading || !kycInitialized || kycLoadingStatus) return; // Still loading, wait...
//         if (!user) {
//             // console.log("KYC Start: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/start');
//             return;
//         }

//         // Redirect based on the definitive status from KycContext
//         // console.log("KYC Start: Auth/KYC ready. Backend Status:", backendStatus);
//         switch (backendStatus) {
//             case 'verified':
//                 // console.log("KYC Start: Status is verified, redirecting to dashboard.");
//                 router.replace('/dashboard');
//                 break;
//             case 'pending':
//                 //  console.log("KYC Start: Status is pending, redirecting to pending page.");
//                 router.replace('/kyc/pending');
//                 break;
//             case 'rejected':
//                 // console.log("KYC Start: Status is rejected. Redirecting to rejected page.");
//                  // **Correction:** Rejected users should go to /kyc/rejected page
//                  router.replace('/kyc/rejected');
//                  break;
//              case 'skipped':
//                 // console.log("KYC Start: Status is skipped. Staying on start page.");
//                  // Stay here, show start verification option
//                 break;
//              case 'not_started':
//                 // console.log("KYC Start: Status is not_started. Staying on start page.");
//                  // Stay here, allow starting/skipping
//                 break;
//             case 'loading':
//             case 'error':
//                  // console.log("KYC Start: Status is loading/error, waiting for context resolution.");
//                  break; // Let context handle display/redirect
//             default:
//                  console.warn(`KYC Start: Unknown backend status "${backendStatus}", redirecting to dashboard as failsafe.`);
//                  router.replace('/dashboard');
//         }
//     // Only run when contexts/status initially stabilize or change
//     }, [user, authLoading, kycInitialized, backendStatus, kycLoadingStatus, router]);


//     // --- Action Handlers ---

//     const handleStartVerification = () => {
//         setActionError(null);
//         console.log("KYC Start: Initiating verification flow...");
//         resetKycProgress(false); // Reset state but don't navigate yet
//         goToStep('personal');    // Navigate to the first form step
//     };

//      const handleSkip = async () => {
//         if (!confirm("Skipping verification will limit access to certain features. You can complete it later from your profile. Are you sure?")) return;

//         setIsSkipping(true);
//         setActionError(null);
//         try {
//             console.log("KYC Start: Attempting to skip KYC via service...");
//             await kycService.skipKyc();
//             await refetchUser(); // Update AuthContext -> triggers KycContext update & redirect
//              console.log("KYC Start: Skip successful. Waiting for context status update and redirection.");
//              // Let context handle redirection
//         } catch (err: any) {
//             console.error("KYC Start: Error skipping KYC:", err);
//             setActionError(err.message || "Could not skip verification. Please try again later or start the verification process.");
//              setIsSkipping(false);
//         }
//     };

//     // --- Render Logic ---

//     if (authLoading || !kycInitialized || kycLoadingStatus) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Loading Verification Status...</span>
//             </div>
//         );
//     }

//      if (backendStatus === 'error') return null; // Provider handles the UI

//      // Prevent flicker if redirection is expected based on status
//      if (!user || backendStatus === 'verified' || backendStatus === 'pending' || backendStatus === 'rejected') {
//           return (
//               <div className="flex justify-center items-center min-h-[400px]">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                   <span className="ml-3 text-muted-foreground">Checking Status...</span>
//              </div>
//          );
//      }


//     // --- Content specific to user status (not_started, skipped) ---
//      let title = 'Verify Your Identity';
//      let description = 'To comply with regulations and ensure account security, please complete identity verification. It usually takes just a few minutes.';
//      let icon = <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />;
//      let requirements = "You'll need a valid government-issued photo ID (like a Passport or Resident Permit/National ID).";
//      let statusMessage = null;

//      if (backendStatus === 'skipped') {
//          title = 'Complete Your Verification';
//          description = 'You previously skipped identity verification. Complete it now to unlock full account features.';
//          icon = <UserCheck className="mx-auto h-12 w-12 text-blue-600 mb-4" />;
//          statusMessage = (
//              // FIX: Removed variant="info" as it's not a standard variant for shadcn Alert.
//              // The default variant is suitable for informational messages.
//              <Alert className="text-left">
//                  <Info className="h-4 w-4"/>
//                  <AlertTitle>Verification Recommended</AlertTitle>
//                  <AlertDescription>
//                      Complete verification now to access all account features and enhance security.
//                  </AlertDescription>
//              </Alert>
//          );
//      }
//       // Note: 'rejected' status is handled by redirecting to /kyc/rejected page now

//     return (
//          <Card className="w-full max-w-lg mx-auto shadow-md border border-border/30 animate-fadeIn">
//              <CardHeader className="text-center items-center p-6 md:p-8">
//                  {icon}
//                 <CardTitle className="text-2xl md:text-3xl font-semibold">
//                     {title}
//                 </CardTitle>
//                 <CardDescription className="mt-2 text-base">
//                     {description}
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6 px-6 md:px-8 pb-8">
//                 {statusMessage}

//                  <div className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/30">
//                       <p className='flex items-center justify-center gap-2'><ShieldCheck className='h-4 w-4 text-green-600' /> {requirements}</p>
//                  </div>

//                  {actionError && (
//                      <Alert variant="destructive">
//                          <AlertTriangle className="h-4 w-4"/>
//                          <AlertTitle>Action Failed</AlertTitle>
//                          <AlertDescription>{actionError}</AlertDescription>
//                      </Alert>
//                  )}

//                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                     <Button onClick={handleStartVerification} size="lg" disabled={isSkipping} className="flex-1">
//                         {/* Icon only for retry, which is now on rejected page */}
//                         {/* {backendStatus === 'rejected' ? <RotateCcw className="mr-2 h-4 w-4" /> : null} */}
//                         Start Verification
//                     </Button>

//                      {/* Show Skip button only if not_started */}
//                      {(backendStatus === 'not_started') && (
//                          <Button onClick={handleSkip} variant="outline" size="lg" disabled={isSkipping} className="flex-1">
//                              {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                             Skip for Now
//                         </Button>
//                     )}
//                 </div>
//                  {/* Optional: Link to support */}
//                  <p className="text-xs text-muted-foreground pt-4">
//                      Need help? <a href="/support" className="underline hover:text-primary">Contact support</a> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                  </p>
//             </CardContent>
//         </Card>
//     );
// }


'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// --- UI Components ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, AlertTriangle, Info, UserCheck, UserX, UserPlus, RotateCcw, LayoutDashboard, ShieldCheck, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components

// --- App Specific Imports ---
import { useAuth } from '@/app/contexts/AuthContext';
import { useKyc } from '../../contexts/KycContext'; // Import context
import kycService from '@/app/services/kyc'; // For skip action

// --- Component ---
export default function KycStartPage() {
    const router = useRouter();
    const { user, loading: authLoading, refetchUser } = useAuth();
    const {
        resetKycProgress, // To clear any stale data before starting
        goToStep,         // To navigate to the first form step
        updateCurrentUiStepId,
        isInitialized: kycInitialized, // Check if KYC context is ready
        backendStatus, // Get status directly from KYC context
        isLoadingStatus: kycLoadingStatus, // Check if KYC status is loading
        rejectionReason // Get rejection reason from context
    } = useKyc();

    // Local loading state for actions initiated on this page (Skip)
    const [isSkipping, setIsSkipping] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null); // Errors from skip action

    // Effect 1: Set the current UI step in context
    useEffect(() => {
        if (kycInitialized) {
            updateCurrentUiStepId('start');
        }
    }, [kycInitialized, updateCurrentUiStepId]);

    // Effect 2: Handle redirection based on initial context status
    // The KycContext provider handles ongoing status changes.
    useEffect(() => {
        if (authLoading || !kycInitialized || kycLoadingStatus) return; // Still loading, wait...
        if (!user) {
            console.log("KYC Start: No user found, redirecting to login.");
            router.replace('/auth/login?redirect=/kyc/start');
            return;
        }

        // Redirect based on the definitive status from KycContext
        // The KycContext provider's effect handles redirection,
        // this effect primarily ensures we don't render content prematurely.
        console.log("KYC Start: Auth/KYC ready. Backend Status:", backendStatus);
        switch (backendStatus) {
            case 'verified':
            case 'pending':
                // Context will redirect, prevent flicker by returning null or loader here
                console.log(`KYC Start: Status is ${backendStatus}, waiting for context redirect...`);
                break;
            case 'rejected': // Let the context handle redirection to /kyc/rejected if needed
                 console.log("KYC Start: Status is rejected. Content will render for retry.");
                 // Ensure rejectionReason is potentially available
                 break;
             case 'skipped':
             case 'not_started':
                console.log(`KYC Start: Status is ${backendStatus}. Ready to display start options.`);
                 // Stay here, allow starting/skipping/retrying
                break;
            case 'loading':
            case 'error':
                 console.log("KYC Start: Status is loading/error, context will handle display/redirect.");
                 break; // Let context handle display/redirect
            default:
                 console.warn(`KYC Start: Unknown backend status "${backendStatus}", context should redirect.`);
                 // Render loader as failsafe while context redirects
        }
    // Only run when contexts/status initially stabilize or change
    }, [user, authLoading, kycInitialized, backendStatus, kycLoadingStatus, router]);


    // --- Action Handlers ---

    const handleStartVerification = () => {
        setActionError(null);
        console.log("KYC Start: Initiating verification flow...");
        // Reset progress IS NOT needed here if starting fresh or retrying
        // If retrying, resetKycProgress was called on the rejected page.
        // If starting fresh/skipped, context data is already clean or will be loaded.
        // resetKycProgress(false); // Remove this line
        goToStep('personal');    // Navigate directly to the first form step
    };

     const handleSkip = async () => {
        if (!confirm("Skipping verification will limit access to certain features. You can complete it later from your profile. Are you sure?")) return;

        setIsSkipping(true);
        setActionError(null);
        try {
            console.log("KYC Start: Attempting to skip KYC via service...");
            await kycService.skipKyc();
            await refetchUser(); // Update AuthContext -> might trigger KycContext fetch & redirect
             console.log("KYC Start: Skip successful. Waiting for context status update and redirection.");
             // Let context handle potential redirection based on new 'skipped' status
        } catch (err: any) {
            console.error("KYC Start: Error skipping KYC:", err);
            setActionError(err.message || "Could not skip verification. Please try again later or start the verification process.");
        } finally {
            setIsSkipping(false);
        }
    };

    // --- Render Logic ---

    if (authLoading || !kycInitialized || kycLoadingStatus) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading Verification Status...</span>
            </div>
        );
    }

     // If status is pending/verified, context handles redirect, show loader to prevent flicker
     if (backendStatus === 'verified' || backendStatus === 'pending') {
          return (
              <div className="flex justify-center items-center min-h-[400px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Checking Status...</span>
             </div>
         );
     }

     // If status requires user action (not_started, skipped, rejected)
     if (backendStatus === 'error') {
        // Error handled by context provider generally
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                 <AlertTriangle className="h-8 w-8 text-destructive" />
                 <span className="ml-3 text-destructive">Error loading status.</span>
            </div>
        );
     }

    // --- Content specific to user status (not_started, skipped, rejected) ---
     let title = 'Verify Your Identity';
     let description = 'To comply with regulations and ensure account security, please complete identity verification. It usually takes just a few minutes.';
     let icon = <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />;
     let requirements = "You'll need a valid government-issued photo ID (like a Passport or Resident Permit/National ID).";
     let statusMessage = null;
     let startButtonText = "Start Verification";

     if (backendStatus === 'skipped') {
         title = 'Complete Your Verification';
         description = 'You previously skipped identity verification. Complete it now to unlock full account features.';
         icon = <UserCheck className="mx-auto h-12 w-12 text-blue-600 mb-4" />;
         statusMessage = (
             <Alert className="text-left border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 [&>svg]:text-blue-600">
                 <Info className="h-4 w-4"/> <AlertTitle className="text-blue-800 dark:text-blue-200">Verification Recommended</AlertTitle>
                 <AlertDescription className="text-blue-700 dark:text-blue-300">Complete verification now to access all account features and enhance security.</AlertDescription>
             </Alert>
         );
         startButtonText = "Complete Verification";
     } else if (backendStatus === 'rejected') {
         title = 'Retry Verification';
         description = 'Your previous verification attempt needs correction. Please review the rejection reason and resubmit.';
         icon = <RotateCcw className="mx-auto h-12 w-12 text-destructive mb-4" />;
         statusMessage = (
            <Alert variant="destructive" className="text-left">
                 <AlertTriangle className="h-4 w-4"/> <AlertTitle>Action Required</AlertTitle>
                 <AlertDescription>Reason: {rejectionReason || "Please ensure documents are clear, valid, and match your details."}</AlertDescription>
             </Alert>
         );
         startButtonText = "Retry Verification Process";
     }

    return (
         <Card className="w-full max-w-lg mx-auto shadow-md border border-border/30 animate-fadeIn">
             <CardHeader className="text-center items-center p-6 md:p-8">
                 {icon}
                <CardTitle className="text-2xl md:text-3xl font-semibold">{title}</CardTitle>
                <CardDescription className="mt-2 text-base">{description}</CardDescription>
             </CardHeader>
             <CardContent className="text-center space-y-6 px-6 md:px-8 pb-8">
                 {statusMessage}

                 <div className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/30">
                      <p className='flex items-center justify-center gap-2'><ShieldCheck className='h-4 w-4 text-green-600' /> {requirements}</p>
                 </div>

                 {actionError && (
                     <Alert variant="destructive">
                         <AlertTriangle className="h-4 w-4"/>
                         <AlertTitle>Action Failed</AlertTitle>
                         <AlertDescription>{actionError}</AlertDescription>
                     </Alert>
                 )}

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    {/* Button now reflects the status */}
                    <Button onClick={handleStartVerification} size="lg" disabled={isSkipping} className="flex-1">
                        {startButtonText}
                    </Button>
                     {/* Show Skip button only if status allows (not rejected) */}
                     {(backendStatus === 'not_started' || backendStatus === 'skipped') && (
                         <Button onClick={handleSkip} variant="outline" size="lg" disabled={isSkipping || backendStatus === 'skipped'} className="flex-1">
                             {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Skip for Now
                        </Button>
                    )}
                </div>
                 {/* Optional: Link to support */}
                 <p className="text-xs text-muted-foreground pt-4">
                     Need help? <a href="/support" className="underline hover:text-primary">Contact support</a> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
                 </p>
            </CardContent>
        </Card>
    );
}