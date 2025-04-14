// // // frontend/src/app/kyc/context/KycContext.tsx
// // 'use client';

// // import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
// // import type { KycMobile, KycSubmissionPayload } from '@/app/services/kyc'; // Adjust path

// // type KycStep = 'start' | 'personal' | 'details' | 'identity' | 'upload' | 'review' | 'pending' | 'rejected' | 'complete';

// // // Define the shape of the data stored during the KYC flow
// // // Make fields optional as they are filled progressively
// // interface KycProgressData {
// //     idType?: 'passport' | 'resident_permit' | null; // <-- Allow null here
// //     firstName?: string;
// //     lastName?: string;
// //     dateOfBirth?: string; // Store as ISO string
// //     mobile?: KycMobile;
// //     occupation?: string;
// //     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
// //     nationality?: string;
// //     idNumber?: string;
// //     idIssueDate?: string; // Store as ISO string
// //     idExpiryDate?: string; // Store as ISO string
// //     idFrontFile?: File | null; // Store File object transiently (not in localStorage)
// //     idBackFile?: File | null;  // Store File object transiently (not in localStorage)
// // }

// // interface KycContextType {
// //     currentStep: KycStep;
// //     kycData: KycProgressData;
// //     setKycData: (data: Partial<KycProgressData>) => void;
// //     goToStep: (step: KycStep) => void;
// //     nextStep: () => void;
// //     prevStep: () => void;
// //     resetKycProgress: () => void;
// //     setFile: (type: 'idFrontFile' | 'idBackFile', file: File | null) => void; // For handling file state separately
// // }

// // const KycContext = createContext<KycContextType | undefined>(undefined);

// // const KYC_PROGRESS_STORAGE_KEY = 'kycProgressData';

// // // Define the order of steps for navigation
// // const stepOrder: KycStep[] = ['personal', 'details', 'identity', 'upload', 'review'];

// // export const KycProvider = ({ children }: { children: ReactNode }) => {
// //     const [currentStep, setCurrentStep] = useState<KycStep>('start');
// //     const [kycData, setKycDataInternal] = useState<KycProgressData>({});
// //     // Separate state for files as they cannot be stringified in localStorage
// //     const [files, setFiles] = useState<{ idFrontFile: File | null, idBackFile: File | null }>({ idFrontFile: null, idBackFile: null });


// //     // Load initial data from localStorage on mount
// //     useEffect(() => {
// //         try {
// //             const storedData = localStorage.getItem(KYC_PROGRESS_STORAGE_KEY);
// //             if (storedData) {
// //                 setKycDataInternal(JSON.parse(storedData));
// //                 // Maybe set currentStep based on furthest completed data? More complex.
// //             }
// //         } catch (error) {
// //             console.error("Error loading KYC progress from localStorage:", error);
// //             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY); // Clear corrupted data
// //         }
// //     }, []);

// //     // Update localStorage whenever kycData changes (excluding files)
// //     const setKycData = useCallback((data: Partial<KycProgressData>) => {
// //         setKycDataInternal(prevData => {
// //             const newData = { ...prevData, ...data };
// //             try {
// //                  // Don't store File objects in localStorage
// //                 const { idFrontFile, idBackFile, ...storableData } = newData;
// //                 localStorage.setItem(KYC_PROGRESS_STORAGE_KEY, JSON.stringify(storableData));
// //             } catch (error) {
// //                 console.error("Error saving KYC progress to localStorage:", error);
// //             }
// //             return newData;
// //         });
// //     }, []);

// //      // Function to specifically update file state
// //     const setFile = useCallback((type: 'idFrontFile' | 'idBackFile', file: File | null) => {
// //         setFiles(prevFiles => ({ ...prevFiles, [type]: file }));
// //          // Update the main kycData state as well so components can react if needed
// //          // Note: This won't persist the File object itself, just signals its presence/absence
// //         setKycDataInternal(prevData => ({ ...prevData, [type]: file ? { name: file.name, type: file.type } : null }));
// //     }, []);


// //     const goToStep = useCallback((step: KycStep) => {
// //         // Add logic here if needed (e.g., check if previous steps are complete)
// //         setCurrentStep(step);
// //     }, []);

// //     const nextStep = useCallback(() => {
// //         const currentIndex = stepOrder.indexOf(currentStep);
// //         if (currentIndex >= 0 && currentIndex < stepOrder.length - 1) {
// //             setCurrentStep(stepOrder[currentIndex + 1]);
// //         } else if (currentStep === 'review') {
// //             // Logic after review (e.g., submission) should be handled in the review component
// //             console.log("Reached end of steps, ready for submission.");
// //         }
// //     }, [currentStep]);

// //     const prevStep = useCallback(() => {
// //         const currentIndex = stepOrder.indexOf(currentStep);
// //         if (currentIndex > 0) {
// //             setCurrentStep(stepOrder[currentIndex - 1]);
// //         } else if (currentStep === 'details') {
// //              setCurrentStep('personal'); // Explicitly go back from details
// //         }
// //          // Handle going back from other steps if needed
// //     }, [currentStep]);

// //     const resetKycProgress = useCallback(() => {
// //         setKycDataInternal({});
// //         setFiles({ idFrontFile: null, idBackFile: null });
// //         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
// //         setCurrentStep('start'); // Or 'personal'
// //         console.log("KYC progress reset.");
// //     }, []);

// //      // Combine file state with rest of data for consumers
// //     const combinedKycData = React.useMemo(() => ({
// //         ...kycData,
// //         idFrontFile: files.idFrontFile,
// //         idBackFile: files.idBackFile,
// //     }), [kycData, files]);


// //     const value = {
// //         currentStep,
// //         kycData: combinedKycData, // Provide combined data
// //         setKycData,
// //         goToStep,
// //         nextStep,
// //         prevStep,
// //         resetKycProgress,
// //         setFile, // Provide file setter
// //     };

// //     return <KycContext.Provider value={value}>{children}</KycContext.Provider>;
// // };

// // export const useKyc = (): KycContextType => {
// //     const context = useContext(KycContext);
// //     if (context === undefined) {
// //         throw new Error('useKyc must be used within a KycProvider');
// //     }
// //     return context;
// // };.



// // frontend/src/app/kyc/context/KycContext.tsx
// 'use client';

// import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
// import { useRouter } from 'next/navigation'; // Import useRouter
// import type { KycMobile, KycSubmissionPayload } from '@/app/services/kyc'; // Adjust path

// // Ensure KycStep includes all relevant page identifiers used in routing
// export type KycStep = 'start' | 'personal' | 'details' | 'identity' | 'upload' | 'review' | 'pending' | 'rejected' | 'complete';

// interface KycProgressData {
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string;
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit';
//     idNumber?: string;
//     idIssueDate?: string;
//     idExpiryDate?: string;
//     idFrontFile?: File | null;
//     idBackFile?: File | null;
// }

// interface KycContextType {
//     currentStep: KycStep;
//     kycData: KycProgressData;
//     setKycData: (data: Partial<KycProgressData>) => void;
//     goToStep: (step: KycStep) => void; // Keep for direct navigation if needed
//     nextStep: () => void;
//     prevStep: () => void;
//     resetKycProgress: () => void;
//     setFile: (type: 'idFrontFile' | 'idBackFile', file: File | null) => void;
// }

// const KycContext = createContext<KycContextType | undefined>(undefined);

// const KYC_PROGRESS_STORAGE_KEY = 'kycProgressData';

// // Define the order of form steps for navigation
// const stepOrder: KycStep[] = ['personal', 'details', 'identity', 'upload', 'review'];

// export const KycProvider = ({ children }: { children: ReactNode }) => {
//     const router = useRouter(); // <<< Add useRouter
//     // Determine initial step based on URL or fallback? For simplicity, start with 'start'
//     // You could parse window.location.pathname here if needed, but state is often better
//     const [currentStep, setCurrentStep] = useState<KycStep>('start');
//     const [kycData, setKycDataInternal] = useState<KycProgressData>({});
//     const [files, setFiles] = useState<{ idFrontFile: File | null, idBackFile: File | null }>({ idFrontFile: null, idBackFile: null });

//     // Load from localStorage
//     useEffect(() => {
//         try {
//             const storedData = localStorage.getItem(KYC_PROGRESS_STORAGE_KEY);
//             if (storedData) {
//                 setKycDataInternal(JSON.parse(storedData));
//             }
//         } catch (error) { console.error("Error loading KYC progress:", error); }
//     }, []);

//     // Update localStorage
//     const setKycData = useCallback((data: Partial<KycProgressData>) => {
//         setKycDataInternal(prevData => {
//             const newData = { ...prevData, ...data };
//             try {
//                 const { idFrontFile, idBackFile, ...storableData } = newData;
//                 localStorage.setItem(KYC_PROGRESS_STORAGE_KEY, JSON.stringify(storableData));
//             } catch (error) { console.error("Error saving KYC progress:", error); }
//             return newData;
//         });
//     }, []);

//     // Update file state
//     const setFile = useCallback((type: 'idFrontFile' | 'idBackFile', file: File | null) => {
//         setFiles(prevFiles => ({ ...prevFiles, [type]: file }));
//         setKycDataInternal(prevData => ({ ...prevData, [type]: file ? { name: file.name, type: file.type } : null }));
//     }, []);

//     // *** Modified goToStep to handle routing ***
//     const goToStep = useCallback((step: KycStep) => {
//         console.log(`Context: Navigating to step: ${step}`); // Debug log
//         setCurrentStep(step);
//         // Construct the URL based on the step ID
//         // Make sure these paths match your actual file structure under /kyc/
//         const path = `/kyc/${step}`;
//         router.push(path);
//     }, [router]); // Add router dependency

//     // *** Modified nextStep to use goToStep ***
//     const nextStep = useCallback(() => {
//         const currentIndex = stepOrder.indexOf(currentStep);
//         if (currentIndex >= 0 && currentIndex < stepOrder.length - 1) {
//             const nextStepId = stepOrder[currentIndex + 1];
//             goToStep(nextStepId); // Use goToStep for navigation
//         } else {
//             console.log("Already at the last step or current step not in order:", currentStep);
//             // Handle end of flow (e.g., maybe go to review or submit confirmation)
//             if (currentStep === 'review') {
//                  // Submission should happen in the review component, then navigate
//                  // goToStep('pending'); // Example if submitting from review
//             }
//         }
//     }, [currentStep, goToStep]); // Add goToStep dependency

//     // *** Modified prevStep to use goToStep ***
//     const prevStep = useCallback(() => {
//         const currentIndex = stepOrder.indexOf(currentStep);
//         if (currentIndex > 0) {
//             const prevStepId = stepOrder[currentIndex - 1];
//             goToStep(prevStepId); // Use goToStep for navigation
//         } else {
//              console.log("Already at the first step or current step not in order:", currentStep);
//               // Maybe navigate back to start page?
//               // goToStep('start');
//         }
//     }, [currentStep, goToStep]); // Add goToStep dependency

//     // Reset progress
//     const resetKycProgress = useCallback(() => {
//         setKycDataInternal({});
//         setFiles({ idFrontFile: null, idBackFile: null });
//         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         goToStep('start'); // Navigate back to start after reset
//         console.log("KYC progress reset.");
//     }, [goToStep]); // Add goToStep dependency

//     const combinedKycData = React.useMemo(() => ({
//         ...kycData,
//         idFrontFile: files.idFrontFile,
//         idBackFile: files.idBackFile,
//     }), [kycData, files]);

//     const value = {
//         currentStep,
//         kycData: combinedKycData,
//         setKycData,
//         goToStep, // Expose direct navigation if needed
//         nextStep,
//         prevStep,
//         resetKycProgress,
//         setFile,
//     };

//     return <KycContext.Provider value={value}>{children}</KycContext.Provider>;
// };

// export const useKyc = (): KycContextType => {
//     const context = useContext(KycContext);
//     if (context === undefined) {
//         throw new Error('useKyc must be used within a KycProvider');
//     }
//     return context;
// };

// // frontend/src/app/kyc/context/KycContext.tsx
// 'use client';

// import React, {
//     createContext,
//     useState,
//     useContext,
//     useEffect,
//     ReactNode,
//     useCallback,
//     useMemo,
//     startTransition,
// } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// // Corrected: Import the default export
// import kycService from '@/app/services/kyc';
// // Import types used by the context and service
// import type {
//     KycMobile,
//     KycSubmissionPayload,
//     KycStatusResponse,
//     KycDetails,
//     KycUpdateResponse
// } from '@/app/services/kyc';

// //--------------------------------------------------
// // Type Definitions (Context Specific)
// //--------------------------------------------------

// /** Defines the possible steps/pages in the KYC form flow */
// export type KycStepId = 'start' | 'personal' | 'details' | 'identity' | 'upload' | 'review';

// /** Defines the possible states derived from the backend API */
// export type KycBackendStatus =
//     | 'loading'
//     | 'not_started'
//     | 'skipped'
//     | 'pending'
//     | 'rejected'
//     | 'verified'
//     | 'error';

// /** Structure for data collected progressively during the form flow (stored in localStorage) */
// export interface KycProgressData {
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string; // Store as ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit';
//     idNumber?: string;
//     idIssueDate?: string; // Store as ISO string
//     idExpiryDate?: string; // Store as ISO string
// }

// /** Structure for transient File object state (not persisted) */
// export interface KycFileState {
//     idFrontFile: File | null;
//     idBackFile: File | null;
// }

// /** Defines the shape of the value provided by the KycContext */
// export interface KycContextType {
//     // State
//     currentUiStepId: KycStepId;
//     kycData: KycProgressData;
//     fileState: KycFileState;
//     backendStatus: KycBackendStatus;
//     rejectionReason: string | null;
//     isInitialized: boolean;
//     isLoadingStatus: boolean;
//     isSubmitting: boolean; // Added state for submission process
    
//     // Actions / Setters
//     setKycData: (data: Partial<KycProgressData>) => void;
//     setFile: (type: keyof KycFileState, file: File | null) => void;
//     updateCurrentUiStepId: (stepId: KycStepId) => void; // <<<< EXPORTED NAME
//     goToStep: (stepId: KycStepId | 'pending' | 'rejected' | 'complete' | 'start') => void;
//     nextStep: () => void;
//     prevStep: () => void;
//     fetchKycStatus: () => Promise<void>;
//     resetKycProgress: (navigateToStart?: boolean) => void;
//     submitKycData: () => Promise<boolean>; // Updated to integrate actual submission
// }

// //--------------------------------------------------
// // Context Definition
// //--------------------------------------------------

// const KycContext = createContext<KycContextType | undefined>(undefined);

// //--------------------------------------------------
// // Constants
// //--------------------------------------------------

// const KYC_PROGRESS_STORAGE_KEY = 'kycProgressData_v1';
// const formStepOrder: KycStepId[] = ['personal', 'details', 'identity', 'upload', 'review'];
// const statusPages: Record<Exclude<KycBackendStatus, 'loading' | 'error' | 'not_started' | 'skipped'>, string> = {
//     pending: '/kyc/pending',
//     rejected: '/kyc/rejected',
//     verified: '/kyc/complete',
// };

// //--------------------------------------------------
// // Provider Component
// //--------------------------------------------------

// interface KycProviderProps {
//     children: ReactNode;
// }

// export const KycProvider = ({ children }: KycProviderProps) => {
//     const router = useRouter();
//     const pathname = usePathname();

//     // --- State ---
//     const [currentUiStepId, setCurrentUiStepId] = useState<KycStepId>('start');
//     const [kycData, setKycDataInternal] = useState<KycProgressData>({});
//     const [fileState, setFileState] = useState<KycFileState>({ idFrontFile: null, idBackFile: null });
//     const [backendStatus, setBackendStatus] = useState<KycBackendStatus>('loading');
//     const [rejectionReason, setRejectionReason] = useState<string | null>(null);
//     const [isInitialized, setIsInitialized] = useState(false);
//     const [isLoadingStatus, setIsLoadingStatus] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false); // Track submission process

//     // --- Actions ---

//     const fetchKycStatus = useCallback(async () => {
//         console.log("KycContext: Fetching backend KYC status...");
//         setIsLoadingStatus(true);
//         try {
//              // Use the imported service object
//             const statusData = await kycService.getMyKycStatus();
//             console.log("KycContext: Received backend status:", statusData);
//             startTransition(() => {
//                 setBackendStatus(statusData.status);
//                 setRejectionReason(statusData.rejectionReason || null);
//             });
//         } catch (error: any) { // Catch specific type if possible
//             console.error("KycContext: Error fetching KYC status:", error.message);
//             startTransition(() => {
//                 setBackendStatus('error');
//                 setRejectionReason(null);
//             });
//             // TODO: Notify user via toast?
//         } finally {
//              startTransition(() => {
//                 setIsLoadingStatus(false);
//             });
//         }
//     }, []);

//     const loadPersistedData = useCallback(() => {
//         // console.log("KycContext: Loading persisted form data..."); // Less verbose
//         try {
//             const storedData = localStorage.getItem(KYC_PROGRESS_STORAGE_KEY);
//             if (storedData) {
//                 const parsedData = JSON.parse(storedData);
//                 if (typeof parsedData === 'object' && parsedData !== null) {
//                     setKycDataInternal(parsedData);
//                     // console.log("KycContext: Loaded persisted data:", parsedData); // Less verbose
//                 } else {
//                     localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                 }
//             }
//         } catch (error) {
//             console.error("KycContext: Error loading progress from localStorage:", error);
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         }
//     }, []);

//     const setKycData = useCallback((data: Partial<KycProgressData>) => {
//         setKycDataInternal(prevData => {
//             const newData = { ...prevData, ...data };
//             try {
//                 localStorage.setItem(KYC_PROGRESS_STORAGE_KEY, JSON.stringify(newData));
//             } catch (error) {
//                 console.error("KycContext: Error saving progress to localStorage:", error);
//             }
//             return newData;
//         });
//     }, []);

//     const setFile = useCallback((type: keyof KycFileState, file: File | null) => {
//         // console.log(`KycContext: Setting file state for ${type}:`, file?.name || 'null'); // Less verbose
//         setFileState(prevFiles => ({ ...prevFiles, [type]: file }));
//     }, []);

//     // --- Actions ---
//     const updateCurrentUiStepId = useCallback((stepId: KycStepId) => { // <<<< ACTUAL FUNCTION NAME
//         startTransition(() => {
//             if (currentUiStepId !== stepId) {
//                 setCurrentUiStepId(stepId);
//             }
//         });
//     }, [currentUiStepId]);

//     const goToStep = useCallback((stepId: KycStepId | 'pending' | 'rejected' | 'complete' | 'start') => {
//         const path = `/kyc/${stepId}`;
//         if (pathname !== path) {
//             console.log(`KycContext: Navigating (routing) to: ${path}`);
//             router.push(path);
//         }
//     }, [router, pathname]);

//     const nextStep = useCallback(() => {
//         const currentIndex = formStepOrder.indexOf(currentUiStepId);
//         if (currentIndex >= 0 && currentIndex < formStepOrder.length - 1) {
//             goToStep(formStepOrder[currentIndex + 1]);
//         }
//     }, [currentUiStepId, goToStep]);

//     const prevStep = useCallback(() => {
//         const currentIndex = formStepOrder.indexOf(currentUiStepId);
//         if (currentIndex > 0) {
//             goToStep(formStepOrder[currentIndex - 1]);
//         } else {
//             // Maybe navigate to dashboard or '/kyc/start' from first step
//             goToStep('start');
//         }
//     }, [currentUiStepId, goToStep]);

//     const resetKycProgress = useCallback((navigateToStart = true) => {
//         console.log("KycContext: Resetting all KYC progress.");
//         startTransition(() => {
//             setKycDataInternal({});
//             setFileState({ idFrontFile: null, idBackFile: null });
//             // No need to manually set backendStatus, fetch will correct it
//         });
//         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         fetchKycStatus(); // Fetch status again after reset
//         if (navigateToStart) {
//             goToStep('start');
//         }
//     }, [goToStep, fetchKycStatus]);

//     // --- ACTUAL SUBMISSION LOGIC ---
//     const submitKycData = useCallback(async (): Promise<boolean> => {
//         console.log("KycContext: Attempting to submit KYC data...");

//         // --- 1. Validation ---
//         const { idFrontFile, idBackFile } = fileState;
//         if (!idFrontFile) {
//             alert("Error: Front ID document is missing."); // Replace with better UI feedback
//             return false;
//         }
//         if (kycData.idType === 'resident_permit' && !idBackFile) {
//             alert("Error: Back ID document is required for Resident Permit."); // Replace alert
//             return false;
//         }
//         // Add checks for all required fields in kycData
//         const requiredFields: (keyof KycSubmissionPayload)[] = [
//             'firstName', 'lastName', 'dateOfBirth', 'mobile', 'nationality',
//             'idType', 'idNumber', 'idIssueDate', 'idExpiryDate'
//         ];
//         const missingFields = requiredFields.filter(field => !kycData[field as keyof KycProgressData]);
//         if (missingFields.length > 0) {
//             alert(`Error: Missing required information: ${missingFields.join(', ')}`); // Replace alert
//             return false;
//         }
//         // Ensure mobile is valid (basic check)
//         if (!kycData.mobile || !kycData.mobile.countryCode || !kycData.mobile.number) {
//              alert(`Error: Invalid mobile number format.`); // Replace alert
//              return false;
//         }

//         // --- 2. Prepare Payload ---
//         // Type assertion: We've checked required fields, assume they exist.
//         const payload: KycSubmissionPayload = {
//             firstName: kycData.firstName!,
//             lastName: kycData.lastName!,
//             dateOfBirth: kycData.dateOfBirth!, // Assuming it's already ISO string from DatePicker
//             mobile: kycData.mobile!,
//             occupation: kycData.occupation, // Optional
//             salaryRange: kycData.salaryRange, // Optional
//             nationality: kycData.nationality!,
//             idType: kycData.idType!,
//             idNumber: kycData.idNumber!,
//             idIssueDate: kycData.idIssueDate!, // Assuming ISO string
//             idExpiryDate: kycData.idExpiryDate!, // Assuming ISO string
//         };

//         // --- 3. Submit ---
//         setIsSubmitting(true);
//         try {
//             // Use the imported service object
//             const response = await kycService.submitKyc(payload, idFrontFile, idBackFile);
//             console.log("KYC Submitted Successfully via Context:", response.message);

//             // --- 4. Handle Success ---
//             startTransition(() => {
//                 // Update status based on response (though backend sets it to pending)
//                 setBackendStatus(response.kyc.status); // Should be 'pending'
//                 setRejectionReason(null);
//                 // Clear sensitive data after successful submission
//                 setKycDataInternal({});
//                 setFileState({ idFrontFile: null, idBackFile: null });
//             });
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY); // Clear storage
//             goToStep('pending'); // Navigate to pending page
//             return true;

//         } catch (error: any) { // Catch specific type if possible
//             // --- 5. Handle Failure ---
//             console.error("KYC Submission Failed via Context:", error.message);
//             // Display the error message from the service function
//             alert(`Submission Failed: ${error.message}`); // Replace with better UI feedback
//             return false;
//         } finally {
//             setIsSubmitting(false); // Ensure submission state is reset
//         }
//     }, [kycData, fileState, goToStep]); // Dependencies for the submission function

//     // --- Effects ---

//     useEffect(() => {
//         // console.log("KycContext: Initializing..."); // Less verbose
//         setIsLoadingStatus(true);
//         loadPersistedData();
//         fetchKycStatus().finally(() => {
//             setIsInitialized(true);
//             setIsLoadingStatus(false); // Ensure loading is off even if fetch failed
//             // console.log("KycContext: Initialization fetch attempt complete."); // Less verbose
//         });
//     }, [fetchKycStatus, loadPersistedData]);

//     useEffect(() => {
//         if (!isInitialized || isLoadingStatus || backendStatus === 'loading' || backendStatus === 'error') {
//             return; // Don't redirect during initial load or if status is loading/error
//         }

//         const targetStatusPage = statusPages[backendStatus as keyof typeof statusPages];

//         // Redirect to the correct status page if not already there
//         if (targetStatusPage && pathname !== targetStatusPage) {
//             console.log(`KycContext: Backend status is ${backendStatus}, redirecting from ${pathname} to ${targetStatusPage}`);
//             router.replace(targetStatusPage);
//         }
//         // Redirect from a status page back to start if status resets
//         else if (!targetStatusPage && Object.values(statusPages).includes(pathname)) {
//              if (backendStatus === 'not_started' || backendStatus === 'skipped') {
//                 console.log(`KycContext: Backend status is now ${backendStatus}, redirecting from ${pathname} to start.`);
//                  router.replace('/kyc/start');
//             }
//         }
//     }, [backendStatus, isInitialized, isLoadingStatus, pathname, router]);

//     // --- Memoized Context Value ---
//     const value = useMemo<KycContextType>(() => ({
//         currentUiStepId,
//         kycData,
//         fileState,
//         backendStatus,
//         rejectionReason,
//         isInitialized,
//         isLoadingStatus,
//         isSubmitting, // Provide submission status
//         setKycData,
//         setFile,
//         updateCurrentUiStepId,
//         goToStep,
//         nextStep,
//         prevStep,
//         fetchKycStatus,
//         resetKycProgress,
//         submitKycData,
//     }), [
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason, isInitialized, isLoadingStatus, isSubmitting, // State values
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, fetchKycStatus, resetKycProgress, submitKycData // Callbacks
//     ]);

//     // --- Render Provider ---
//     if (!isInitialized || (isLoadingStatus && !isSubmitting)) { // Show loader unless submitting
//         return <div>Loading KYC Information...</div>; // Replace with Spinner/Skeleton
//     }

//     // Handle critical error state (only if not already on a status page)
//     if (backendStatus === 'error' && !Object.values(statusPages).includes(pathname)) {
//         return <div>Error loading KYC status. Please <button onClick={() => fetchKycStatus()}>try again</button> or contact support.</div>;
//     }

//     // Render children - redirection handles navigation to status pages
//     // You might want to overlay a loading indicator during submission based on `isSubmitting`
//     return (
//         <KycContext.Provider value={value}>
//             {isSubmitting && (
//                 <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     <p style={{ color: 'white', fontSize: '1.5rem' }}>Submitting KYC...</p> {/* Replace with Spinner */}
//                 </div>
//             )}
//             {children}
//         </KycContext.Provider>
//     );
// };

// //--------------------------------------------------
// // Hook for Consuming Context
// //--------------------------------------------------

// export const useKyc = (): KycContextType => {
//     const context = useContext(KycContext);
//     if (context === undefined) {
//         throw new Error('useKyc must be used within a KycProvider');
//     }
//     return context;
// };


// // frontend/src/app/kyc/context/KycContext.tsx
// 'use client';

// import React, {
//     createContext,
//     useState,
//     useContext,
//     useEffect,
//     ReactNode,
//     useCallback,
//     useMemo,
//     startTransition,
// } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// // Corrected: Import the default export
// import kycService from '@/app/services/kyc';
// // Import types used by the context and service
// import type {
//     KycMobile,
//     KycSubmissionPayload,
//     KycStatusResponse,
//     KycDetails,
//     KycUpdateResponse
// } from '@/app/services/kyc';

// //--------------------------------------------------
// // Type Definitions (Context Specific)
// //--------------------------------------------------

// /** Defines the possible steps/pages in the KYC form flow */
// // NOTE: 'complete' is NOT included here by default. If you need to track it as a specific
// // step ID, you must add it to this type definition.
// export type KycStepId = 'start' | 'personal' | 'details' | 'identity' | 'upload' | 'review';

// /** Defines the possible states derived from the backend API */
// export type KycBackendStatus =
//     | 'loading'
//     | 'not_started'
//     | 'skipped'
//     | 'pending'
//     | 'rejected'
//     | 'verified'
//     | 'error';

// /** Structure for data collected progressively during the form flow (stored in localStorage) */
// export interface KycProgressData {
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string; // Store as ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit';
//     idNumber?: string;
//     idIssueDate?: string; // Store as ISO string
//     idExpiryDate?: string; // Store as ISO string
// }

// /** Structure for transient File object state (not persisted) */
// export interface KycFileState {
//     idFrontFile: File | null;
//     idBackFile: File | null;
// }

// /** Defines the shape of the value provided by the KycContext */
// export interface KycContextType {
//     // State
//     currentUiStepId: KycStepId;
//     kycData: KycProgressData;
//     fileState: KycFileState;
//     backendStatus: KycBackendStatus;
//     rejectionReason: string | null;
//     isInitialized: boolean;
//     isLoadingStatus: boolean;
//     isSubmitting: boolean;

//     // Actions / Setters
//     setKycData: (data: Partial<KycProgressData>) => void;
//     setFile: (type: keyof KycFileState, file: File | null) => void;
//     updateCurrentUiStepId: (stepId: KycStepId) => void; // Correct name
//     goToStep: (stepId: KycStepId | 'pending' | 'rejected' | 'complete' | 'start') => void;
//     nextStep: () => void;
//     prevStep: () => void;
//     fetchKycStatus: () => Promise<void>;
//     resetKycProgress: (navigateToStart?: boolean) => void;
//     submitKycData: () => Promise<boolean>;
// }

// //--------------------------------------------------
// // Context Definition
// //--------------------------------------------------

// const KycContext = createContext<KycContextType | undefined>(undefined);

// //--------------------------------------------------
// // Constants
// //--------------------------------------------------

// const KYC_PROGRESS_STORAGE_KEY = 'kycProgressData_v1';
// const formStepOrder: KycStepId[] = ['personal', 'details', 'identity', 'upload', 'review'];
// const statusPages: Record<Exclude<KycBackendStatus, 'loading' | 'error' | 'not_started' | 'skipped'>, string> = {
//     pending: '/kyc/pending',
//     rejected: '/kyc/rejected',
//     verified: '/kyc/complete',
// };

// //--------------------------------------------------
// // Provider Component
// //--------------------------------------------------

// interface KycProviderProps {
//     children: ReactNode;
// }

// export const KycProvider = ({ children }: KycProviderProps) => {
//     const router = useRouter();
//     const pathname = usePathname();

//     // --- State ---
//     const [currentUiStepId, setCurrentUiStepId] = useState<KycStepId>('start');
//     const [kycData, setKycDataInternal] = useState<KycProgressData>({});
//     const [fileState, setFileState] = useState<KycFileState>({ idFrontFile: null, idBackFile: null });
//     const [backendStatus, setBackendStatus] = useState<KycBackendStatus>('loading');
//     const [rejectionReason, setRejectionReason] = useState<string | null>(null);
//     const [isInitialized, setIsInitialized] = useState(false);
//     const [isLoadingStatus, setIsLoadingStatus] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // --- Actions ---

//     const fetchKycStatus = useCallback(async () => {
//         console.log("KycContext: Fetching backend KYC status...");
//         setIsLoadingStatus(true);
//         try {
//             const statusData = await kycService.getMyKycStatus();
//             console.log("KycContext: Received backend status:", statusData);
//             startTransition(() => {
//                 setBackendStatus(statusData.status);
//                 setRejectionReason(statusData.rejectionReason || null);
//             });
//         } catch (error: any) {
//             console.error("KycContext: Error fetching KYC status:", error.message);
//             startTransition(() => {
//                 setBackendStatus('error');
//                 setRejectionReason(null);
//             });
//         } finally {
//              startTransition(() => {
//                 setIsLoadingStatus(false);
//             });
//         }
//     }, []);

//     const loadPersistedData = useCallback(() => {
//         try {
//             const storedData = localStorage.getItem(KYC_PROGRESS_STORAGE_KEY);
//             if (storedData) {
//                 const parsedData = JSON.parse(storedData);
//                 if (typeof parsedData === 'object' && parsedData !== null) {
//                     setKycDataInternal(parsedData);
//                 } else {
//                     localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                 }
//             }
//         } catch (error) {
//             console.error("KycContext: Error loading progress from localStorage:", error);
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         }
//     }, []);

//     const setKycData = useCallback((data: Partial<KycProgressData>) => {
//         setKycDataInternal(prevData => {
//             const newData = { ...prevData, ...data };
//             try {
//                 localStorage.setItem(KYC_PROGRESS_STORAGE_KEY, JSON.stringify(newData));
//             } catch (error) {
//                 console.error("KycContext: Error saving progress to localStorage:", error);
//             }
//             return newData;
//         });
//     }, []);

//     const setFile = useCallback((type: keyof KycFileState, file: File | null) => {
//         setFileState(prevFiles => ({ ...prevFiles, [type]: file }));
//     }, []);

//     // Correct function name as defined in the interface
//     const updateCurrentUiStepId = useCallback((stepId: KycStepId) => {
//         startTransition(() => {
//             if (currentUiStepId !== stepId) {
//                 setCurrentUiStepId(stepId);
//             }
//         });
//     }, [currentUiStepId]);

//     const goToStep = useCallback((stepId: KycStepId | 'pending' | 'rejected' | 'complete' | 'start') => {
//         const path = `/kyc/${stepId}`;
//         if (pathname !== path) {
//             console.log(`KycContext: Navigating (routing) to: ${path}`);
//             router.push(path);
//         }
//     }, [router, pathname]);

//     const nextStep = useCallback(() => {
//         const currentIndex = formStepOrder.indexOf(currentUiStepId);
//         if (currentIndex >= 0 && currentIndex < formStepOrder.length - 1) {
//             goToStep(formStepOrder[currentIndex + 1]);
//         }
//     }, [currentUiStepId, goToStep]);

//     const prevStep = useCallback(() => {
//         const currentIndex = formStepOrder.indexOf(currentUiStepId);
//         if (currentIndex > 0) {
//             goToStep(formStepOrder[currentIndex - 1]);
//         } else {
//             goToStep('start');
//         }
//     }, [currentUiStepId, goToStep]);

//     const resetKycProgress = useCallback((navigateToStart = true) => {
//         console.log("KycContext: Resetting all KYC progress.");
//         startTransition(() => {
//             setKycDataInternal({});
//             setFileState({ idFrontFile: null, idBackFile: null });
//         });
//         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         fetchKycStatus();
//         if (navigateToStart) {
//             goToStep('start');
//         }
//     }, [goToStep, fetchKycStatus]);

//     const submitKycData = useCallback(async (): Promise<boolean> => {
//         console.log("KycContext: Attempting to submit KYC data...");
//         const { idFrontFile, idBackFile } = fileState;
//         if (!idFrontFile) {
//             alert("Error: Front ID document is missing.");
//             return false;
//         }
//         if (kycData.idType === 'resident_permit' && !idBackFile) {
//             alert("Error: Back ID document is required for Resident Permit.");
//             return false;
//         }
//         const requiredFields: (keyof KycSubmissionPayload)[] = [
//             'firstName', 'lastName', 'dateOfBirth', 'mobile', 'nationality',
//             'idType', 'idNumber', 'idIssueDate', 'idExpiryDate'
//         ];
//         const missingFields = requiredFields.filter(field => !kycData[field as keyof KycProgressData]);
//         if (missingFields.length > 0) {
//             alert(`Error: Missing required information: ${missingFields.join(', ')}`);
//             return false;
//         }
//         if (!kycData.mobile || !kycData.mobile.countryCode || !kycData.mobile.number) {
//              alert(`Error: Invalid mobile number format.`);
//              return false;
//         }

//         const payload: KycSubmissionPayload = {
//             firstName: kycData.firstName!, lastName: kycData.lastName!, dateOfBirth: kycData.dateOfBirth!,
//             mobile: kycData.mobile!, nationality: kycData.nationality!, idType: kycData.idType!,
//             idNumber: kycData.idNumber!, idIssueDate: kycData.idIssueDate!, idExpiryDate: kycData.idExpiryDate!,
//             occupation: kycData.occupation, salaryRange: kycData.salaryRange,
//         };

//         setIsSubmitting(true);
//         try {
//             const response = await kycService.submitKyc(payload, idFrontFile, idBackFile);
//             console.log("KYC Submitted Successfully via Context:", response.message);
//             startTransition(() => {
//                 setBackendStatus(response.kyc.status);
//                 setRejectionReason(null);
//                 setKycDataInternal({});
//                 setFileState({ idFrontFile: null, idBackFile: null });
//             });
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//             goToStep('pending');
//             return true;
//         } catch (error: any) {
//             console.error("KYC Submission Failed via Context:", error.message);
//             alert(`Submission Failed: ${error.message}`);
//             return false;
//         } finally {
//             setIsSubmitting(false);
//         }
//     }, [kycData, fileState, goToStep]);

//     // --- Effects ---

//     useEffect(() => {
//         setIsLoadingStatus(true);
//         loadPersistedData();
//         fetchKycStatus().finally(() => {
//             setIsInitialized(true);
//             setIsLoadingStatus(false);
//         });
//     }, [fetchKycStatus, loadPersistedData]);

//     useEffect(() => {
//         if (!isInitialized || isLoadingStatus || backendStatus === 'loading' || backendStatus === 'error') {
//             return;
//         }
//         const targetStatusPage = statusPages[backendStatus as keyof typeof statusPages];
//         if (targetStatusPage && pathname !== targetStatusPage) {
//             console.log(`KycContext: Backend status is ${backendStatus}, redirecting from ${pathname} to ${targetStatusPage}`);
//             router.replace(targetStatusPage);
//         }
//         else if (!targetStatusPage && Object.values(statusPages).includes(pathname)) {
//              if (backendStatus === 'not_started' || backendStatus === 'skipped') {
//                 console.log(`KycContext: Backend status is now ${backendStatus}, redirecting from ${pathname} to start.`);
//                  router.replace('/kyc/start');
//             }
//         }
//     }, [backendStatus, isInitialized, isLoadingStatus, pathname, router]);

//     // --- Memoized Context Value ---
//     const value = useMemo<KycContextType>(() => ({
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason, isInitialized, isLoadingStatus, isSubmitting, // State
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, fetchKycStatus, resetKycProgress, submitKycData // Actions (using correct function name)
//     }), [
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason, isInitialized, isLoadingStatus, isSubmitting, // State dependencies
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, fetchKycStatus, resetKycProgress, submitKycData // Action dependencies (using correct function name)
//     ]);

//     // --- Render Provider ---
//     // Simplified loading state for clarity
//     if (!isInitialized) {
//         return <div>Loading KYC Information...</div>; // Replace with a proper loading component/skeleton
//     }

//     // Handle critical error state (only if not already on a status page)
//     if (backendStatus === 'error' && !Object.values(statusPages).includes(pathname)) {
//         return <div>Error loading KYC status. Please <button onClick={() => fetchKycStatus()}>try again</button> or contact support.</div>;
//     }

//     // Render children with optional submission overlay
//     return (
//         <KycContext.Provider value={value}>
//             {isSubmitting && (
//                 <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     {/* Replace with a nice Spinner component */}
//                     <p style={{ color: 'white', fontSize: '1.5rem' }}>Submitting KYC...</p>
//                 </div>
//             )}
//             {children}
//         </KycContext.Provider>
//     );
// };

// //--------------------------------------------------
// // Hook for Consuming Context
// //--------------------------------------------------

// export const useKyc = (): KycContextType => {
//     const context = useContext(KycContext);
//     if (context === undefined) {
//         throw new Error('useKyc must be used within a KycProvider');
//     }
//     return context;
// };



// // frontend/src/app/kyc/context/KycContext.tsx
// 'use client';

// import React, {
//     createContext,
//     useState,
//     useContext,
//     useEffect,
//     ReactNode,
//     useCallback,
//     useMemo,
//     startTransition,
// } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import kycService, {
//     type KycMobile,
//     type KycSubmissionPayload,
//     type KycStatusResponse,
//     type KycDetails,
//     type KycStatus, // Use the exported type from service
//     type SalaryRange,
//     type IdType,
// } from '@/app/services/kyc'; // Correct import path

// //--------------------------------------------------
// // Type Definitions (Context Specific)
// //--------------------------------------------------

// /** Defines the possible steps/pages in the KYC form flow */
// export type KycStepId = 'start' | 'personal' | 'details' | 'identity' | 'upload' | 'review' | 'pending' | 'rejected' | 'complete';

// /** Combined type for backend status + loading/error states */
// export type KycCombinedStatus = KycStatus | 'loading' | 'error';

// /** Structure for data collected progressively during the form flow (stored in localStorage) */
// export interface KycProgressData {
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string; // Store as ISO string (YYYY-MM-DD)
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: SalaryRange | null;
//     nationality?: string;
//     idType?: IdType;
//     idNumber?: string;
//     idIssueDate?: string; // Store as ISO string (YYYY-MM-DD)
//     idExpiryDate?: string; // Store as ISO string (YYYY-MM-DD)
// }

// /** Structure for transient File object state (not persisted) */
// export interface KycFileState {
//     idFrontFile: File | null;
//     idBackFile: File | null;
// }

// /** Defines the shape of the value provided by the KycContext */
// export interface KycContextType {
//     // State
//     currentUiStepId: KycStepId;
//     kycData: KycProgressData;
//     fileState: KycFileState;
//     backendStatus: KycCombinedStatus; // Includes loading/error states
//     rejectionReason: string | null;
//     isInitialized: boolean; // Tracks if initial status fetch & data load is complete
//     isLoadingStatus: boolean; // Tracks if actively fetching status (initial or subsequent)
//     isSubmitting: boolean; // Tracks if submitKycData is in progress

//     // Actions / Setters
//     setKycData: (data: Partial<KycProgressData>) => void;
//     setFile: (type: keyof KycFileState, file: File | null) => void;
//     updateCurrentUiStepId: (stepId: KycStepId) => void; // Set the *logical* current step (used by pages)
//     goToStep: (stepId: KycStepId) => void; // Navigate to a specific step/page path
//     nextStep: () => void;
//     prevStep: () => void;
//     fetchKycStatus: () => Promise<void>;
//     resetKycProgress: (navigateToStart?: boolean) => void;
//     submitKycData: () => Promise<boolean>; // Returns true on success, false on failure
// }

// //--------------------------------------------------
// // Context Definition
// //--------------------------------------------------

// const KycContext = createContext<KycContextType | undefined>(undefined);

// //--------------------------------------------------
// // Constants
// //--------------------------------------------------

// const KYC_PROGRESS_STORAGE_KEY = 'kycProgressData_v1'; // Use a versioned key

// /**
//  * Order of the actual form steps. Used for navigation (next/prev) and display.
//  * Exported for use in page components (e.g., for step indicators).
//  */
// export const formStepOrder: Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete'>[] = [
//     'personal', 'details', 'identity', 'upload', 'review'
// ];

// // Mapping backend statuses to their corresponding page paths
// const statusPageMap: Partial<Record<KycStatus, string>> = {
//     pending: '/kyc/pending',
//     rejected: '/kyc/rejected', // Rejected users land on /kyc/rejected page
//     verified: '/kyc/complete',
// };

// // Paths for different page types (used in redirection logic)
// const formStepPaths = formStepOrder.map(step => `/kyc/${step}`);
// const statusPagePaths = Object.values(statusPageMap);
// const startPagePath = '/kyc/start';
// const errorPagePath = '/kyc/error'; // Define an error page path if needed

// //--------------------------------------------------
// // Provider Component
// //--------------------------------------------------

// interface KycProviderProps {
//     children: ReactNode;
// }

// export const KycProvider = ({ children }: KycProviderProps) => {
//     const router = useRouter();
//     const pathname = usePathname(); // Current URL path

//     // --- State ---
//     const [currentUiStepId, setCurrentUiStepId] = useState<KycStepId>('start'); // Logical UI step
//     const [kycData, setKycDataInternal] = useState<KycProgressData>({});
//     const [fileState, setFileState] = useState<KycFileState>({ idFrontFile: null, idBackFile: null });
//     const [backendStatus, setBackendStatus] = useState<KycCombinedStatus>('loading');
//     const [rejectionReason, setRejectionReason] = useState<string | null>(null);
//     const [isInitialized, setIsInitialized] = useState(false); // Has initial load completed?
//     const [isLoadingStatus, setIsLoadingStatus] = useState(true); // Currently fetching status?
//     const [isSubmitting, setIsSubmitting] = useState(false); // KYC submission in progress?
//     // Local state for submission errors shown potentially outside Review page
//     const [submissionError, setSubmissionError] = useState<string | null>(null);


//     // --- Actions ---

//     /** Fetches KYC status from the backend and updates state */
//     const fetchKycStatus = useCallback(async () => {
//         console.log("KycContext: Fetching backend KYC status...");
//         setIsLoadingStatus(true);
//         setBackendStatus(prev => prev === 'error' ? 'error' : 'loading');

//         try {
//             const statusData = await kycService.getMyKycStatus();
//             console.log("KycContext: Received backend status:", statusData);
//             startTransition(() => {
//                 setBackendStatus(statusData.status);
//                 setRejectionReason(statusData.rejectionReason || null);
//                 if (statusData.status === 'verified' || statusData.status === 'pending') {
//                     if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) {
//                         console.log("KycContext: Clearing persisted data due to status:", statusData.status);
//                         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                         setKycDataInternal({});
//                         setFileState({ idFrontFile: null, idBackFile: null });
//                     }
//                 }
//             });
//         } catch (error: any) {
//             console.error("KycContext: Error fetching KYC status:", error.message);
//             startTransition(() => {
//                 setBackendStatus('error');
//                 setRejectionReason(null);
//             });
//         } finally {
//              startTransition(() => {
//                 setIsLoadingStatus(false);
//             });
//         }
//     }, []); // No dependencies

//     /** Loads KYC progress data from localStorage */
//     const loadPersistedData = useCallback(() => {
//         if (backendStatus === 'verified' || backendStatus === 'pending' || backendStatus === 'loading' || backendStatus === 'error') {
//              // console.log("KycContext: Skipping loadPersistedData due to backend status:", backendStatus);
//              if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) {
//                 localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//              }
//             return;
//         }
//         try {
//             const storedData = localStorage.getItem(KYC_PROGRESS_STORAGE_KEY);
//             if (storedData) {
//                 const parsedData: KycProgressData = JSON.parse(storedData);
//                 if (typeof parsedData === 'object' && parsedData !== null) {
//                      // console.log("KycContext: Loaded progress from localStorage:", parsedData);
//                     startTransition(() => { setKycDataInternal(parsedData); });
//                 } else {
//                     console.warn("KycContext: Invalid data found in localStorage, removing.");
//                     localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                 }
//             } else {
//                  // console.log("KycContext: No persisted KYC data found in localStorage.");
//             }
//         } catch (error) {
//             console.error("KycContext: Error loading progress from localStorage:", error);
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         }
//     }, [backendStatus]); // Depend on backendStatus

//     /** Updates a portion of the KYC data and persists to localStorage */
//     const setKycData = useCallback((data: Partial<KycProgressData>) => {
//         setKycDataInternal(prevData => {
//             const newData = { ...prevData, ...data };
//             try {
//                 if (backendStatus === 'not_started' || backendStatus === 'rejected' || backendStatus === 'skipped') {
//                     localStorage.setItem(KYC_PROGRESS_STORAGE_KEY, JSON.stringify(newData));
//                  } else {
//                      if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) {
//                         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                      }
//                  }
//             } catch (error) {
//                 console.error("KycContext: Error saving progress to localStorage:", error);
//             }
//             return newData;
//         });
//     }, [backendStatus]); // Depend on status

//     /** Updates the state for a specific file input */
//     const setFile = useCallback((type: keyof KycFileState, file: File | null) => {
//         // console.log(`KycContext: Setting file state for ${type}`, file?.name);
//         setFileState(prevFiles => ({ ...prevFiles, [type]: file }));
//     }, []);

//     /** Updates the logical UI step ID (used by pages to identify themselves) */
//     const updateCurrentUiStepId = useCallback((stepId: KycStepId) => {
//         startTransition(() => {
//             if (currentUiStepId !== stepId) {
//                 // console.log(`KycContext: Updating current UI step to: ${stepId}`);
//                 setCurrentUiStepId(stepId);
//             }
//         });
//     }, [currentUiStepId]); // Depend on current value

//     /** Navigates the user to a specific KYC page path */
//     const goToStep = useCallback((stepId: KycStepId) => {
//         const path = `/kyc/${stepId}`;
//         if (pathname !== path) {
//             console.log(`KycContext: Navigating (routing) to: ${path}`);
//              if (['pending', 'rejected', 'complete', 'start'].includes(stepId)) {
//                  router.replace(path); // Use replace for status jumps or going back to start
//              } else {
//                  router.push(path); // Use push for forward steps in the form
//              }
//         } else {
//             // console.log(`KycContext: Already on step ${stepId}, no navigation needed.`);
//         }
//     }, [router, pathname]); // Depend on router and current path

//     /** Navigates to the next step in the form sequence */
//     const nextStep = useCallback(() => {
//         const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete'>;
//         const currentIndex = formStepOrder.indexOf(currentFormStep);

//         if (currentIndex >= 0 && currentIndex < formStepOrder.length - 1) {
//             const nextStepId = formStepOrder[currentIndex + 1];
//             goToStep(nextStepId);
//         } else if (currentUiStepId === 'review') {
//              console.warn("KycContext: nextStep called on 'review'. Submission handled by submitKycData.");
//         } else {
//             console.warn(`KycContext: Could not determine next step from ${currentUiStepId}`);
//         }
//     }, [currentUiStepId, goToStep]);

//     /** Navigates to the previous step in the form sequence */
//     const prevStep = useCallback(() => {
//         const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete'>;
//         const currentIndex = formStepOrder.indexOf(currentFormStep);

//         if (currentIndex > 0) {
//             const prevStepId = formStepOrder[currentIndex - 1];
//             goToStep(prevStepId);
//         } else if (currentIndex === 0) {
//             //  console.log(`KycContext: Going back from first form step (${currentUiStepId}) to start.`);
//              goToStep('start');
//         } else {
//             // console.log(`KycContext: Cannot determine previous step from ${currentUiStepId}. Going back to start.`);
//             goToStep('start');
//         }
//     }, [currentUiStepId, goToStep]);

//     /** Resets KYC progress (state and localStorage) and optionally navigates */
//     const resetKycProgress = useCallback((navigateToStart = true) => {
//         console.log("KycContext: Resetting KYC progress state and storage.");
//         startTransition(() => {
//             setKycDataInternal({});
//             setFileState({ idFrontFile: null, idBackFile: null });
//             setSubmissionError(null);
//         });
//         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         fetchKycStatus();
//         if (navigateToStart) {
//             goToStep('start');
//         }
//     }, [goToStep, fetchKycStatus]); // Added fetchKycStatus dependency

//     /** Validates and submits the collected KYC data and files to the backend */
//     const submitKycData = useCallback(async (): Promise<boolean> => {
//         console.log("KycContext: Attempting to submit KYC data...");
//         setSubmissionError(null);

//         const { idFrontFile, idBackFile } = fileState;

//         // 1. File Validation
//         if (!idFrontFile) {
//             const errorMsg = "Submission Error: Front ID document file is required."; // More direct message
//             console.error("KycContext Check:", errorMsg);
//             setSubmissionError(errorMsg); // Set error for potential global display
//             alert(errorMsg); // Alert the user directly
//             goToStep('upload'); // Guide user back
//             return false;
//         }
//         if (kycData.idType === 'resident_permit' && !idBackFile) {
//             const errorMsg = "Submission Error: Back ID document file is required for Resident Permit.";
//             console.error("KycContext Check:", errorMsg);
//             setSubmissionError(errorMsg); alert(errorMsg); goToStep('upload'); return false;
//         }

//         // 2. Data Validation
//         const requiredFields: (keyof KycSubmissionPayload)[] = [
//             'firstName', 'lastName', 'dateOfBirth', 'mobile', 'nationality',
//             'idType', 'idNumber', 'idIssueDate', 'idExpiryDate'
//         ];
//         const missingFields = requiredFields.filter(field => {
//              if (field === 'mobile') return !kycData.mobile || !kycData.mobile.countryCode || !kycData.mobile.number;
//             const value = kycData[field as keyof KycProgressData];
//             return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
//         });

//         if (missingFields.length > 0) {
//              const missingLabels = missingFields.map(f => f === 'mobile' ? 'Mobile Number' : f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
//              const errorMsg = `Submission Error: Missing required information: ${missingLabels.join(', ')}. Please go back and complete these fields.`;
//              console.error(`KycContext Check: Missing required information: ${missingLabels.join(', ')}`);
//              setSubmissionError(errorMsg); alert(errorMsg);
//              if (missingLabels.some(l => ['First Name', 'Last Name', 'Date Of Birth', 'Mobile Number'].includes(l))) goToStep('personal');
//              else if (missingLabels.includes('Nationality')) goToStep('details');
//              else if (missingLabels.some(l => ['Id Type', 'Id Number', 'Id Issue Date', 'Id Expiry Date'].includes(l))) goToStep('identity');
//              else goToStep('review');
//             return false;
//         }

//         // 3. Payload Construction
//         const payload: KycSubmissionPayload = {
//             firstName: kycData.firstName!, lastName: kycData.lastName!, dateOfBirth: kycData.dateOfBirth!,
//             mobile: kycData.mobile!, nationality: kycData.nationality!, idType: kycData.idType!,
//             idNumber: kycData.idNumber!, idIssueDate: kycData.idIssueDate!, idExpiryDate: kycData.idExpiryDate!,
//             occupation: kycData.occupation || undefined, salaryRange: kycData.salaryRange || null,
//         };

//         // 4. API Call
//         setIsSubmitting(true);
//         try {
//             // Pass idBackFile directly, it will be null if not resident permit or not uploaded (which is handled by validation)
//             const response = await kycService.submitKyc(payload, idFrontFile, idBackFile);
//             console.log("KycContext: KYC Submitted Successfully:", response.message);
//             startTransition(() => {
//                 setBackendStatus(response.kyc?.status || 'pending');
//                 setRejectionReason(null);
//                 setKycDataInternal({});
//                 setFileState({ idFrontFile: null, idBackFile: null });
//             });
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//             goToStep('pending');
//             return true; // Success
//         } catch (error: any) {
//             console.error("KycContext: KYC Submission Failed:", error.message);
//             const errorMsg = error.message || "An unexpected error occurred during submission.";
//             setSubmissionError(errorMsg); alert(`Submission Failed: ${errorMsg}`);
//             return false; // Failure
//         } finally {
//             setIsSubmitting(false);
//         }
//     }, [kycData, fileState, goToStep]); // Dependencies


//     // --- Effects ---

//     // Effect 1: Initial Load - Fetch status and load persisted data
//     useEffect(() => {
//         console.log("KycContext: Initializing...");
//         setIsInitialized(false); setIsLoadingStatus(true);
//         fetchKycStatus().then(() => {
//             loadPersistedData();
//         }).finally(() => {
//             setIsLoadingStatus(false); setIsInitialized(true);
//             // console.log("KycContext: Initialization complete.");
//         });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Run only once on mount

//     // Effect 2: Redirection Logic - Navigate based on backendStatus changes
//     useEffect(() => {
//         if (!isInitialized || isLoadingStatus) return;
//         if (backendStatus === 'loading' || backendStatus === 'error') {
//              // console.log("KycContext: Redirection skipped, status is loading or error.");
//             return;
//         }

//         const targetStatusPath = statusPageMap[backendStatus as KycStatus];
//         const isOnStatusPage = statusPagePaths.includes(pathname);
//         const isOnFormPage = formStepPaths.includes(pathname);
//         const isOnStartPage = pathname === startPagePath;

//         // console.log(`KycContext: Redirection check - Path: ${pathname}, Status: ${backendStatus}, TargetPath: ${targetStatusPath ?? 'N/A'}, IsOnStatusPage: ${isOnStatusPage}, IsOnFormPage: ${isOnFormPage}, IsOnStartPage: ${isOnStartPage}`);

//         // Scenario 1: Status requires a specific status page (verified, pending, rejected)
//         if (targetStatusPath) {
//             if (pathname !== targetStatusPath) {
//                 console.log(`KycContext: Status (${backendStatus}) requires redirection from ${pathname} to ${targetStatusPath}`);
//                 router.replace(targetStatusPath);
//             }
//         }
//         // Scenario 2: Status is 'skipped'
//         else if (backendStatus === 'skipped') {
//             if ((isOnFormPage || isOnStatusPage) && !isOnStartPage) {
//                  console.log(`KycContext: Status is ${backendStatus}. User is on invalid page ${pathname}. Redirecting to ${startPagePath}`);
//                  router.replace(startPagePath);
//             }
//         }
//         // Scenario 3: Status is 'not_started' or 'rejected'
//         else if (backendStatus === 'not_started' || backendStatus === 'rejected') {
//              if (isOnStatusPage) { // Check if on /pending, /complete, /rejected (shouldn't be for not_started/rejected)
//                  console.log(`KycContext: Status is ${backendStatus}. User is on invalid status page ${pathname}. Redirecting to ${startPagePath}`);
//                  router.replace(startPagePath);
//              }
//              // Allow user to be on '/start' or any form page
//         }
//         // Scenario 4: Fallback/Unexpected state
//         else {
//             // console.warn(`KycContext: Unhandled redirection case - Status: ${backendStatus}, Path: ${pathname}.`);
//              if ( (isOnStatusPage || isOnFormPage) && !isOnStartPage ) {
//                  console.log(`KycContext: Fallback - User on unexpected page ${pathname}. Redirecting to ${startPagePath}`);
//                  router.replace(startPagePath);
//              }
//         }

//     }, [backendStatus, isInitialized, isLoadingStatus, pathname, router]);


//     // --- Memoized Context Value ---
//     const value = useMemo<KycContextType>(() => ({
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason, isInitialized, isLoadingStatus, isSubmitting,
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, fetchKycStatus, resetKycProgress, submitKycData
//     }), [
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason, isInitialized, isLoadingStatus, isSubmitting,
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, fetchKycStatus, resetKycProgress, submitKycData
//     ]);


//     // --- Render Provider ---

//     if (!isInitialized && isLoadingStatus) {
//         return (
//             <div className="flex justify-center items-center h-screen" aria-label="Loading KYC information">
//                 <div className="text-center">
//                     {/* Placeholder for Loader/Spinner */}
//                     <p className="text-lg font-semibold animate-pulse">Loading KYC Process...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (backendStatus === 'error' && pathname !== errorPagePath) {
//         return (
//             <div className="flex flex-col justify-center items-center h-screen text-center p-4" role="alert">
//                  <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading KYC Status</h2>
//                 <p className="text-muted-foreground mb-4">Could not retrieve verification status. Please check connection and try again.</p>
//                  <button
//                      onClick={() => fetchKycStatus()}
//                      className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
//                      disabled={isLoadingStatus}
//                  >
//                      {isLoadingStatus ? 'Retrying...' : 'Try Again'}
//                  </button>
//                  <p className="text-xs text-muted-foreground mt-4">Contact support if problem persists.</p>
//              </div>
//         );
//     }

//     return (
//         <KycContext.Provider value={value}>
//             {isSubmitting && (
//                 <div
//                     style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center' }}
//                     role="alertdialog" aria-live="assertive" aria-busy="true" aria-label="Submitting KYC information"
//                  >
//                     <div>
//                          {/* Placeholder for Loader/Spinner */}
//                         <p className="text-xl font-semibold">Submitting KYC Information...</p>
//                         <p className="text-sm">Please wait...</p>
//                     </div>
//                 </div>
//             )}
//             {children}
//         </KycContext.Provider>
//     );
// };

// //--------------------------------------------------
// // Hook for Consuming Context
// //--------------------------------------------------

// export const useKyc = (): KycContextType => {
//     const context = useContext(KycContext);
//     if (context === undefined) {
//         throw new Error('useKyc must be used within a KycProvider');
//     }
//     return context;
// };


// // frontend/src/app/kyc/context/KycContext.tsx
// 'use client';

// import React, {
//     createContext,
//     useState,
//     useContext,
//     useEffect,
//     ReactNode,
//     useCallback,
//     useMemo,
//     startTransition,
// } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import kycService, {
//     type KycMobile,
//     type KycSubmissionPayload,
//     type KycStatusResponse,
//     type KycDetails,
//     type KycStatus, // Use the exported type from service
//     type SalaryRange,
//     type IdType,
// } from '@/app/services/kyc'; // Adjust import path as necessary
// import { Loader2 } from 'lucide-react'; // For loading indicators

// //--------------------------------------------------
// // Type Definitions (Context Specific)
// //--------------------------------------------------

// /** Defines the possible steps/pages in the KYC form flow */
// export type KycStepId = 'start' | 'personal' | 'details' | 'identity' | 'upload' | 'review' | 'pending' | 'rejected' | 'complete' | 'error';

// /** Combined type for backend status + loading/error states */
// export type KycCombinedStatus = KycStatus | 'loading' | 'error';

// /** Structure for data collected progressively during the form flow (stored in localStorage) */
// export interface KycProgressData {
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string; // Store as ISO string (YYYY-MM-DD)
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: SalaryRange | null;
//     nationality?: string;
//     idType?: IdType | null; // Allow null for initial state
//     idNumber?: string;
//     idIssueDate?: string; // Store as ISO string (YYYY-MM-DD)
//     idExpiryDate?: string; // Store as ISO string (YYYY-MM-DD)
// }

// /** Structure for transient File object state (not persisted) */
// export interface KycFileState {
//     idFrontFile: File | null;
//     idBackFile: File | null;
// }

// /** Defines the shape of the value provided by the KycContext */
// export interface KycContextType {
//     // State
//     currentUiStepId: KycStepId;
//     kycData: KycProgressData;
//     fileState: KycFileState;
//     backendStatus: KycCombinedStatus; // Includes loading/error states
//     rejectionReason: string | null;
//     isInitialized: boolean; // Tracks if initial status fetch & data load is complete
//     isLoadingStatus: boolean; // Tracks if actively fetching status (initial or subsequent)
//     isSubmitting: boolean; // Tracks if submitKycData is in progress

//     // Actions / Setters
//     setKycData: (data: Partial<KycProgressData>) => void;
//     setFile: (type: keyof KycFileState, file: File | null) => void;
//     updateCurrentUiStepId: (stepId: KycStepId) => void; // Set the *logical* current step (used by pages)
//     goToStep: (stepId: KycStepId) => void; // Navigate to a specific step/page path
//     nextStep: () => void;
//     prevStep: () => void;
//     fetchKycStatus: (isRetry?: boolean) => Promise<void>; // Added isRetry flag
//     resetKycProgress: (navigateToStart?: boolean) => void;
//     submitKycData: () => Promise<boolean>; // Returns true on success, false on failure
// }

// //--------------------------------------------------
// // Context Definition
// //--------------------------------------------------

// const KycContext = createContext<KycContextType | undefined>(undefined);

// //--------------------------------------------------
// // Constants
// //--------------------------------------------------

// const KYC_PROGRESS_STORAGE_KEY = 'kycProgressData_v1'; // Use a versioned key

// /**
//  * Order of the actual form steps. Used for navigation (next/prev) and display.
//  * Exported for use in page components (e.g., for step indicators).
//  */
// export const formStepOrder: Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error'>[] = [
//     'personal', 'details', 'identity', 'upload', 'review'
// ];

// // Mapping backend statuses to their corresponding page paths
// const statusPageMap: Partial<Record<KycStatus, string>> = {
//     pending: '/kyc/pending',
//     rejected: '/kyc/rejected', // Rejected users land on /kyc/rejected page
//     verified: '/kyc/complete',
// };

// // Paths for different page types (used in redirection logic)
// const formStepPaths = formStepOrder.map(step => `/kyc/${step}`);
// const statusPagePaths = Object.values(statusPageMap);
// const startPagePath = '/kyc/start';
// const errorPagePath = '/kyc/error'; // Defined error page path

// //--------------------------------------------------
// // Provider Component
// //--------------------------------------------------

// interface KycProviderProps {
//     children: ReactNode;
// }

// export const KycProvider = ({ children }: KycProviderProps) => {
//     const router = useRouter();
//     const pathname = usePathname(); // Current URL path

//     // --- State ---
//     const [currentUiStepId, setCurrentUiStepId] = useState<KycStepId>('start'); // Logical UI step
//     const [kycData, setKycDataInternal] = useState<KycProgressData>({});
//     const [fileState, setFileState] = useState<KycFileState>({ idFrontFile: null, idBackFile: null });
//     const [backendStatus, setBackendStatus] = useState<KycCombinedStatus>('loading');
//     const [rejectionReason, setRejectionReason] = useState<string | null>(null);
//     const [isInitialized, setIsInitialized] = useState(false); // Has initial load completed?
//     const [isLoadingStatus, setIsLoadingStatus] = useState(true); // Currently fetching status?
//     const [isSubmitting, setIsSubmitting] = useState(false); // KYC submission in progress?
//     const [submissionError, setSubmissionError] = useState<string | null>(null); // For displaying submission errors


//     // --- Actions ---

//     /** Fetches KYC status from the backend and updates state */
//     const fetchKycStatus = useCallback(async (isRetry = false) => {
//         console.log(`KycContext: Fetching backend KYC status... (Retry Mode: ${isRetry})`);
//         // Only set loading if not already in a definitive state or if forcing a retry refresh
//         if (backendStatus === 'loading' || backendStatus === 'error' || isRetry) {
//             startTransition(() => { setIsLoadingStatus(true); });
//         }
//         // Set status to loading only if it's currently in error, otherwise keep current status while loading
//         if (backendStatus === 'error') {
//             startTransition(() => { setBackendStatus('loading'); });
//         }

//         try {
//             const statusData = await kycService.getMyKycStatus();
//             console.log("KycContext: Received backend status:", statusData);
//             startTransition(() => {
//                 setBackendStatus(statusData.status);
//                 setRejectionReason(statusData.rejectionReason || null);
//                 // Clear persisted data if now verified/pending
//                 if (statusData.status === 'verified' || statusData.status === 'pending') {
//                     if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) {
//                         console.log("KycContext: Clearing persisted data due to status:", statusData.status);
//                         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                         setKycDataInternal({}); // Clear form data state too
//                         setFileState({ idFrontFile: null, idBackFile: null }); // Clear file state
//                     }
//                 }
//             });
//         } catch (error: any) {
//             console.error("KycContext: Error fetching KYC status:", error.message);
//             startTransition(() => {
//                 setBackendStatus('error');
//                 setRejectionReason(null);
//             });
//         } finally {
//              startTransition(() => {
//                 setIsLoadingStatus(false);
//             });
//         }
//     }, [backendStatus]); // Dependency on backendStatus


//     /** Loads KYC progress data from localStorage */
//     const loadPersistedData = useCallback(() => {
//         // Only load if status allows starting/retrying
//         if (!['not_started', 'rejected', 'skipped'].includes(backendStatus as string)) {
//              // console.log("KycContext: Skipping loadPersistedData due to backend status:", backendStatus);
//              if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) {
//                 localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY); // Clean up stale data if status prevents it
//              }
//             return;
//         }
//         try {
//             const storedData = localStorage.getItem(KYC_PROGRESS_STORAGE_KEY);
//             if (storedData) {
//                 const parsedData: KycProgressData = JSON.parse(storedData);
//                 if (typeof parsedData === 'object' && parsedData !== null) {
//                      console.log("KycContext: Loaded progress from localStorage:", parsedData);
//                     startTransition(() => { setKycDataInternal(parsedData); });
//                 } else {
//                     console.warn("KycContext: Invalid data found in localStorage, removing.");
//                     localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                      startTransition(() => { setKycDataInternal({}); }); // Reset state if data was invalid
//                 }
//             } else {
//                  console.log("KycContext: No persisted KYC data found in localStorage.");
//                   startTransition(() => { setKycDataInternal({}); }); // Ensure state is empty if no data
//             }
//         } catch (error) {
//             console.error("KycContext: Error loading progress from localStorage:", error);
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//              startTransition(() => { setKycDataInternal({}); }); // Reset state on error
//         }
//     }, [backendStatus]); // Depend on backendStatus


//     /** Updates a portion of the KYC data and persists to localStorage */
//     const setKycData = useCallback((data: Partial<KycProgressData>) => {
//         setKycDataInternal(prevData => {
//             const newData = { ...prevData, ...data };
//             try {
//                 // Only persist if status allows starting/retrying
//                 if (['not_started', 'rejected', 'skipped'].includes(backendStatus as string)) {
//                     localStorage.setItem(KYC_PROGRESS_STORAGE_KEY, JSON.stringify(newData));
//                  } else {
//                      // Clean up stale data if status prevents saving
//                      if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) {
//                         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                      }
//                  }
//             } catch (error) {
//                 console.error("KycContext: Error saving progress to localStorage:", error);
//             }
//             return newData;
//         });
//     }, [backendStatus]); // Depend on status


//     /** Updates the state for a specific file input */
//     const setFile = useCallback((type: keyof KycFileState, file: File | null) => {
//         console.log(`KycContext: Setting file state for ${type}`, file?.name);
//         setFileState(prevFiles => ({ ...prevFiles, [type]: file }));
//     }, []);


//     /** Updates the logical UI step ID (used by pages to identify themselves) */
//     const updateCurrentUiStepId = useCallback((stepId: KycStepId) => {
//         startTransition(() => {
//             if (currentUiStepId !== stepId) {
//                 // console.log(`KycContext: Updating current UI step to: ${stepId}`);
//                 setCurrentUiStepId(stepId);
//             }
//         });
//     }, [currentUiStepId]); // Depend on current value


//     /** Navigates the user to a specific KYC page path */
//     const goToStep = useCallback((stepId: KycStepId) => {
//         const path = `/kyc/${stepId}`;
//         if (pathname !== path) {
//             console.log(`KycContext: Navigating (routing) to: ${path}`);
//              if (['pending', 'rejected', 'complete', 'start', 'error'].includes(stepId)) {
//                  router.replace(path); // Use replace for status jumps or going back to start/error
//              } else {
//                  router.push(path); // Use push for forward steps in the form
//              }
//         } else {
//             // console.log(`KycContext: Already on step ${stepId}, no navigation needed.`);
//         }
//     }, [router, pathname]); // Depend on router and current path


//     /** Navigates to the next step in the form sequence */
//     const nextStep = useCallback(() => {
//         const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error'>;
//         const currentIndex = formStepOrder.indexOf(currentFormStep);

//         if (currentIndex >= 0 && currentIndex < formStepOrder.length - 1) {
//             const nextStepId = formStepOrder[currentIndex + 1];
//             goToStep(nextStepId);
//         } else if (currentUiStepId === 'review') {
//              console.warn("KycContext: nextStep called on 'review'. Submission handled by submitKycData.");
//         } else {
//             console.warn(`KycContext: Could not determine next step from ${currentUiStepId}`);
//         }
//     }, [currentUiStepId, goToStep]);


//     /** Navigates to the previous step in the form sequence */
//     const prevStep = useCallback(() => {
//         const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error'>;
//         const currentIndex = formStepOrder.indexOf(currentFormStep);

//         if (currentIndex > 0) {
//             const prevStepId = formStepOrder[currentIndex - 1];
//             goToStep(prevStepId);
//         } else if (currentIndex === 0) {
//              // console.log(`KycContext: Going back from first form step (${currentUiStepId}) to start.`);
//              goToStep('start');
//         } else {
//             // console.log(`KycContext: Cannot determine previous step from ${currentUiStepId}. Going back to start.`);
//             goToStep('start');
//         }
//     }, [currentUiStepId, goToStep]);


//     /** Resets KYC progress (state and localStorage) and optionally navigates */
//     const resetKycProgress = useCallback((navigateToStart = true) => {
//         console.log("KycContext: Resetting KYC progress state and storage.");
//         startTransition(() => {
//             // 1. Clear local form data and file state
//             setKycDataInternal({});
//             setFileState({ idFrontFile: null, idBackFile: null });
//             setSubmissionError(null);

//             // 2. **CRITICAL FIX:** Immediately set backendStatus to 'not_started'
//             // This reflects the user's intent to restart the process.
//             console.log("KycContext: Setting backendStatus to 'not_started' during reset.");
//             setBackendStatus('not_started');
//             setRejectionReason(null); // Clear rejection reason on reset

//             // 3. Clear loading/error states related to submission/status check
//             // setIsSubmitting(false); // Reset submission state if needed
//         });

//         // 4. Clear persisted data from localStorage
//         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);

//         // 5. Navigate to the start page if requested
//         if (navigateToStart) {
//             console.log("KycContext: Navigating to 'start' page after reset.");
//             goToStep('start');
//         }
//         // 6. Optional: Fetch status again *after* navigation to ensure consistency,
//         // although the start page should ideally handle its own status check on load.
//         // setTimeout(() => fetchKycStatus(true), 100); // isRetry=true ensures loading state is set
//     }, [goToStep]); // Only depends on goToStep for navigation


//     /** Validates and submits the collected KYC data and files to the backend */
//     const submitKycData = useCallback(async (): Promise<boolean> => {
//         console.log("KycContext: Attempting to submit KYC data...");
//         setSubmissionError(null); // Clear previous submission errors

//         const { idFrontFile, idBackFile } = fileState;

//         // 1. File Validation
//         if (!idFrontFile) {
//             const errorMsg = "Submission Error: Front ID document file is required.";
//             console.error("KycContext Check:", errorMsg);
//             setSubmissionError(errorMsg); alert(errorMsg); goToStep('upload'); return false;
//         }
//         if (kycData.idType === 'resident_permit' && !idBackFile) {
//             const errorMsg = "Submission Error: Back ID document file is required for Resident Permit.";
//             console.error("KycContext Check:", errorMsg); setSubmissionError(errorMsg); alert(errorMsg); goToStep('upload'); return false;
//         }

//         // 2. Data Validation
//         const requiredFields: (keyof KycSubmissionPayload)[] = [
//             'firstName', 'lastName', 'dateOfBirth', 'mobile', 'nationality',
//             'idType', 'idNumber', 'idIssueDate', 'idExpiryDate'
//         ];
//         const missingFields = requiredFields.filter(field => {
//              if (field === 'mobile') return !kycData.mobile || !kycData.mobile.countryCode || !kycData.mobile.number;
//              // Check idType specifically for being null/undefined
//              if (field === 'idType') return !kycData.idType;
//              const value = kycData[field as keyof KycProgressData];
//              return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
//         });

//         if (missingFields.length > 0) {
//              const missingLabels = missingFields.map(f => f === 'mobile' ? 'Mobile Number' : f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
//              const errorMsg = `Submission Error: Missing required information: ${missingLabels.join(', ')}. Please go back and complete these fields.`;
//              console.error(`KycContext Check: Missing required information: ${missingLabels.join(', ')}`);
//              setSubmissionError(errorMsg); alert(errorMsg);
//              // Navigate to the first step with missing data
//              if (missingLabels.some(l => ['First Name', 'Last Name', 'Date Of Birth', 'Mobile Number'].includes(l))) goToStep('personal');
//              else if (missingLabels.includes('Nationality')) goToStep('details');
//              else if (missingLabels.some(l => ['Id Type', 'Id Number', 'Id Issue Date', 'Id Expiry Date'].includes(l))) goToStep('identity');
//              else goToStep('review'); // Default back to review if step unclear
//             return false;
//         }

//         // 3. Payload Construction (Ensure idType is not null here)
//         const payload: KycSubmissionPayload = {
//             firstName: kycData.firstName!, lastName: kycData.lastName!, dateOfBirth: kycData.dateOfBirth!,
//             mobile: kycData.mobile!, nationality: kycData.nationality!, idType: kycData.idType!,
//             idNumber: kycData.idNumber!, idIssueDate: kycData.idIssueDate!, idExpiryDate: kycData.idExpiryDate!,
//             occupation: kycData.occupation || undefined, salaryRange: kycData.salaryRange || null,
//         };

//         // 4. API Call
//         startTransition(() => { setIsSubmitting(true); });
//         try {
//             const response = await kycService.submitKyc(payload, idFrontFile, idBackFile);
//             console.log("KycContext: KYC Submitted Successfully:", response.message);
//             startTransition(() => {
//                 setBackendStatus(response.kyc?.status || 'pending');
//                 setRejectionReason(null);
//                 setKycDataInternal({}); // Clear form data
//                 setFileState({ idFrontFile: null, idBackFile: null }); // Clear files
//             });
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY); // Clear storage
//             goToStep('pending'); // Navigate to pending page on success
//             return true; // Success
//         } catch (error: any) {
//             console.error("KycContext: KYC Submission Failed:", error.message);
//             const errorMsg = error.message || "An unexpected error occurred during submission.";
//             setSubmissionError(errorMsg); alert(`Submission Failed: ${errorMsg}`); // Show error
//             return false; // Failure
//         } finally {
//             startTransition(() => { setIsSubmitting(false); }); // Ensure state update is transitioned
//         }
//     }, [kycData, fileState, goToStep]); // Dependencies


//     // --- Effects ---

//     // Effect 1: Initial Load - Fetch status and load persisted data
//     useEffect(() => {
//         console.log("KycContext: Initializing...");
//         setIsInitialized(false);
//         startTransition(() => { setIsLoadingStatus(true); });
//         fetchKycStatus().then(() => {
//              // Load persisted data *after* initial status is fetched and set
//              loadPersistedData();
//         }).finally(() => {
//             startTransition(() => {
//                 setIsLoadingStatus(false); setIsInitialized(true);
//             });
//             console.log("KycContext: Initialization complete.");
//         });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Run only once on mount

//     // Effect 2: Redirection Logic - Navigate based on backendStatus changes
//     useEffect(() => {
//         if (!isInitialized || isLoadingStatus) {
//             // console.log("KycContext: Redirection skipped, not initialized or loading status.");
//             return; // Wait until ready
//         }
//         if (backendStatus === 'loading') {
//             // console.log("KycContext: Redirection skipped, status is 'loading'.");
//             return; // Let loading state handle itself
//         }

//         const targetStatusPath = statusPageMap[backendStatus as KycStatus]; // Path for verified, pending, rejected
//         const isOnStatusPage = statusPagePaths.includes(pathname);
//         const isOnFormPage = formStepPaths.includes(pathname);
//         const isOnStartPage = pathname === startPagePath;
//         const isOnErrorPage = pathname === errorPagePath;

//         // console.log(`KycContext: Redirection Check - Path: ${pathname}, Status: ${backendStatus}, TargetPath: ${targetStatusPath ?? 'N/A'}, IsOnStatusPage: ${isOnStatusPage}, IsOnFormPage: ${isOnFormPage}, IsOnStartPage: ${isOnStartPage}, IsOnErrorPage: ${isOnErrorPage}`);

//         // Scenario 0: Handle Error State
//         if (backendStatus === 'error') {
//             if (!isOnErrorPage) {
//                 console.log(`KycContext: Status is error. Redirecting from ${pathname} to ${errorPagePath}`);
//                 router.replace(errorPagePath);
//             }
//             return; // Stop further checks if in error state
//         }

//         // Scenario 1: Status requires a specific page (verified, pending, rejected)
//         if (targetStatusPath) {
//             if (pathname !== targetStatusPath) {
//                 console.log(`KycContext: Status (${backendStatus}) requires redirection from ${pathname} to ${targetStatusPath}`);
//                 router.replace(targetStatusPath); // Use replace to avoid history buildup
//             }
//         }
//         // Scenario 2: Status is 'skipped'
//         else if (backendStatus === 'skipped') {
//             // If skipped, user should generally be on the start page or dashboard.
//             // Redirect from form/status pages (except maybe rejected) back to start.
//             if ((isOnFormPage || (isOnStatusPage && pathname !== statusPageMap.rejected)) && !isOnStartPage && !isOnErrorPage) {
//                  console.log(`KycContext: Status is ${backendStatus}. User is on invalid page ${pathname}. Redirecting to ${startPagePath}`);
//                  router.replace(startPagePath);
//             }
//             // Allow staying on '/kyc/start', '/kyc/rejected' (if they retry from there) or '/kyc/error'
//         }
//         // Scenario 3: Status is 'not_started'
//         else if (backendStatus === 'not_started') {
//              // If not started, user should be on start or form pages.
//              // Redirect from invalid status pages (like pending/complete) back to start.
//              // Allow user to be on the 'rejected' page if they got there and then reset.
//             if (isOnStatusPage && ![statusPageMap.rejected, errorPagePath].includes(pathname)) {
//                  console.log(`KycContext: Status is ${backendStatus}. User is on invalid status page ${pathname}. Redirecting to ${startPagePath}`);
//                  router.replace(startPagePath);
//              }
//              // Allow staying on '/kyc/start', form pages, '/kyc/rejected', or '/kyc/error'
//         }
//         // Scenario 4: Fallback/Unexpected state (Should ideally not happen)
//         else {
//             console.warn(`KycContext: Unhandled redirection case - Status: ${backendStatus}, Path: ${pathname}. Defaulting to start page if necessary.`);
//              if ((isOnStatusPage || isOnFormPage) && !isOnStartPage && !isOnErrorPage) { // Check !isOnErrorPage
//                  console.log(`KycContext: Fallback - User on potentially invalid page ${pathname} for status ${backendStatus}. Redirecting to ${startPagePath}`);
//                  router.replace(startPagePath);
//              }
//         }

//     }, [backendStatus, isInitialized, isLoadingStatus, pathname, router]); // Dependencies


//     // --- Memoized Context Value ---
//     const value = useMemo<KycContextType>(() => ({
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason, isInitialized, isLoadingStatus, isSubmitting,
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, fetchKycStatus, resetKycProgress, submitKycData
//     }), [
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason, isInitialized, isLoadingStatus, isSubmitting,
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, fetchKycStatus, resetKycProgress, submitKycData
//     ]);


//     // --- Render Provider ---

//     // Initial loading overlay before context is fully initialized
//     if (!isInitialized && isLoadingStatus) {
//         return (
//             <div className="fixed inset-0 z-50 flex justify-center items-center bg-background/80 backdrop-blur-sm" aria-label="Loading KYC information">
//                 <div className="text-center">
//                     <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 mx-auto" />
//                     <p className="text-lg font-semibold text-muted-foreground">Loading KYC Process...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Handle the error state explicitly within the provider render if needed
//     // (Although the redirection effect usually handles this by navigating to errorPagePath)
//     if (backendStatus === 'error' && pathname !== errorPagePath) {
//         // If redirection hasn't happened yet, show an inline error or loading indicator
//         return (
//             <div className="flex flex-col justify-center items-center h-screen text-center p-4" role="alert">
//                  <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading KYC</h2>
//                  <p className="text-muted-foreground mb-4">Redirecting to error page...</p>
//                  <Loader2 className="h-8 w-8 animate-spin text-destructive" />
//             </div>
//         );
//     }

//     // Main provider rendering
//     return (
//         <KycContext.Provider value={value}>
//             {/* Submission Loading Overlay */}
//             {isSubmitting && (
//                 <div
//                     className="fixed inset-0 z-[100] flex justify-center items-center bg-black/60 backdrop-blur-sm"
//                     role="alertdialog" aria-live="assertive" aria-busy="true" aria-label="Submitting KYC information"
//                  >
//                     <div className="text-center text-white">
//                         <Loader2 className="h-10 w-10 animate-spin text-white mb-3 mx-auto" />
//                         <p className="text-xl font-semibold">Submitting KYC Information...</p>
//                         <p className="text-sm">Please wait...</p>
//                     </div>
//                 </div>
//             )}
//             {/* Render children (the actual page components) */}
//             {children}
//         </KycContext.Provider>
//     );
// };

// //--------------------------------------------------
// // Hook for Consuming Context
// //--------------------------------------------------

// export const useKyc = (): KycContextType => {
//     const context = useContext(KycContext);
//     if (context === undefined) {
//         throw new Error('useKyc must be used within a KycProvider');
//     }
//     return context;
// };


// // frontend/src/app/kyc/context/KycContext.tsx
// 'use client';

// import React, {
//     createContext,
//     useState,
//     useContext,
//     useEffect,
//     ReactNode,
//     useCallback,
//     useMemo,
//     startTransition,
// } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import kycService, {
//     type KycMobile,
//     type KycSubmissionPayload,
//     type KycStatusResponse,
//     type KycDetails,
//     type KycStatus, // Use the exported type from service
//     type SalaryRange,
//     type IdType,
// } from '@/app/services/kyc'; // Adjust import path as necessary
// import { Loader2 } from 'lucide-react'; // For loading indicators

// //--------------------------------------------------
// // Type Definitions (Context Specific)
// //--------------------------------------------------
// export type KycStepId = 'start' | 'personal' | 'details' | 'identity' | 'upload' | 'review' | 'pending' | 'rejected' | 'complete' | 'error';
// export type KycCombinedStatus = KycStatus | 'loading' | 'error';
// export interface KycProgressData {
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string; // Store as ISO string (YYYY-MM-DD)
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: SalaryRange | null;
//     nationality?: string;
//     idType?: IdType | null; // Allow null for initial state
//     idNumber?: string;
//     idIssueDate?: string; // Store as ISO string (YYYY-MM-DD)
//     idExpiryDate?: string; // Store as ISO string (YYYY-MM-DD)
// }
// export interface KycFileState {
//     idFrontFile: File | null;
//     idBackFile: File | null;
// }
// export interface KycContextType {
//     currentUiStepId: KycStepId;
//     kycData: KycProgressData;
//     fileState: KycFileState;
//     backendStatus: KycCombinedStatus;
//     rejectionReason: string | null;
//     isInitialized: boolean;
//     isLoadingStatus: boolean;
//     isSubmitting: boolean;
//     setKycData: (data: Partial<KycProgressData>) => void;
//     setFile: (type: keyof KycFileState, file: File | null) => void;
//     updateCurrentUiStepId: (stepId: KycStepId) => void;
//     goToStep: (stepId: KycStepId) => void;
//     nextStep: () => void;
//     prevStep: () => void;
//     fetchKycStatus: (isRetry?: boolean) => Promise<void>;
//     resetKycProgress: (navigateToStart?: boolean) => void;
//     submitKycData: () => Promise<boolean>;
// }

// //--------------------------------------------------
// // Context Definition & Constants
// //--------------------------------------------------
// const KycContext = createContext<KycContextType | undefined>(undefined);
// const KYC_PROGRESS_STORAGE_KEY = 'kycProgressData_v1';
// export const formStepOrder: Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error'>[] = [
//     'personal', 'details', 'identity', 'upload', 'review'
// ];
// const statusPageMap: Partial<Record<KycStatus, string>> = {
//     pending: '/kyc/pending',
//     rejected: '/kyc/rejected',
//     verified: '/kyc/complete',
// };
// const formStepPaths = formStepOrder.map(step => `/kyc/${step}`);
// const statusPagePaths = Object.values(statusPageMap);
// const startPagePath = '/kyc/start';
// const errorPagePath = '/kyc/error';

// //--------------------------------------------------
// // Provider Component
// //--------------------------------------------------
// interface KycProviderProps { children: ReactNode; }

// export const KycProvider = ({ children }: KycProviderProps) => {
//     const router = useRouter();
//     const pathname = usePathname();

//     // --- State ---
//     const [currentUiStepId, setCurrentUiStepId] = useState<KycStepId>('start');
//     const [kycData, setKycDataInternal] = useState<KycProgressData>({});
//     const [fileState, setFileState] = useState<KycFileState>({ idFrontFile: null, idBackFile: null });
//     const [backendStatus, setBackendStatus] = useState<KycCombinedStatus>('loading');
//     const [rejectionReason, setRejectionReason] = useState<string | null>(null);
//     const [isInitialized, setIsInitialized] = useState(false);
//     const [isLoadingStatus, setIsLoadingStatus] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submissionError, setSubmissionError] = useState<string | null>(null);

//     // --- Actions ---

//     /** Fetches KYC status from the backend and updates state */
//     const fetchKycStatus = useCallback(async (isRetry = false) => {
//         console.log(`KycContext: Fetching backend KYC status... (Retry Mode: ${isRetry})`);
//         if (backendStatus === 'loading' || backendStatus === 'error' || isRetry) {
//             startTransition(() => { setIsLoadingStatus(true); });
//         }
//         if (backendStatus === 'error') {
//             startTransition(() => { setBackendStatus('loading'); }); // Reset error state when fetching
//         }

//         try {
//             const statusData = await kycService.getMyKycStatus();
//             console.log("KycContext: Received backend status:", statusData);
//             startTransition(() => {
//                 setBackendStatus(statusData.status);
//                 setRejectionReason(statusData.rejectionReason || null);
//                 if (statusData.status === 'verified' || statusData.status === 'pending') {
//                     if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) {
//                         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                         setKycDataInternal({});
//                         setFileState({ idFrontFile: null, idBackFile: null });
//                     }
//                 }
//             });
//         } catch (error: any) {
//             console.error("KycContext: Error fetching KYC status:", error.message);
//             startTransition(() => { setBackendStatus('error'); setRejectionReason(null); });
//         } finally {
//              startTransition(() => { setIsLoadingStatus(false); });
//         }
//     }, [backendStatus]); // Dependency

//     /** Loads KYC progress data from localStorage */
//     const loadPersistedData = useCallback(() => {
//         if (!['not_started', 'rejected', 'skipped'].includes(backendStatus as string)) {
//             if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//             return;
//         }
//         try {
//             const storedData = localStorage.getItem(KYC_PROGRESS_STORAGE_KEY);
//             if (storedData) {
//                 const parsedData: KycProgressData = JSON.parse(storedData);
//                 if (typeof parsedData === 'object' && parsedData !== null) {
//                     startTransition(() => { setKycDataInternal(parsedData); });
//                 } else {
//                     localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY); startTransition(() => { setKycDataInternal({}); });
//                 }
//             } else { startTransition(() => { setKycDataInternal({}); }); }
//         } catch (error) {
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY); startTransition(() => { setKycDataInternal({}); });
//         }
//     }, [backendStatus]); // Dependency

//     /** Updates KYC data and persists */
//     const setKycData = useCallback((data: Partial<KycProgressData>) => {
//         setKycDataInternal(prevData => {
//             const newData = { ...prevData, ...data };
//             try {
//                 if (['not_started', 'rejected', 'skipped'].includes(backendStatus as string)) {
//                     localStorage.setItem(KYC_PROGRESS_STORAGE_KEY, JSON.stringify(newData));
//                  } else { if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY); }
//             } catch (error) { console.error("KycContext: Error saving progress:", error); }
//             return newData;
//         });
//     }, [backendStatus]); // Dependency

//     /** Updates file state */
//     const setFile = useCallback((type: keyof KycFileState, file: File | null) => {
//         setFileState(prevFiles => ({ ...prevFiles, [type]: file }));
//     }, []);

//     /** Updates logical UI step */
//     const updateCurrentUiStepId = useCallback((stepId: KycStepId) => {
//         startTransition(() => { if (currentUiStepId !== stepId) setCurrentUiStepId(stepId); });
//     }, [currentUiStepId]);

//     /** Navigates router */
//     const goToStep = useCallback((stepId: KycStepId) => {
//         const path = `/kyc/${stepId}`;
//         if (pathname !== path) {
//             if (['pending', 'rejected', 'complete', 'start', 'error'].includes(stepId)) router.replace(path);
//              else router.push(path);
//         }
//     }, [router, pathname]);

//     /** Navigates to next form step */
//     const nextStep = useCallback(() => {
//         const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error'>;
//         const currentIndex = formStepOrder.indexOf(currentFormStep);
//         if (currentIndex >= 0 && currentIndex < formStepOrder.length - 1) goToStep(formStepOrder[currentIndex + 1]);
//         else if (currentUiStepId === 'review') console.warn("KycContext: nextStep called on review");
//         else console.warn(`KycContext: Could not determine next step from ${currentUiStepId}`);
//     }, [currentUiStepId, goToStep]);

//     /** Navigates to previous form step */
//     const prevStep = useCallback(() => {
//         const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error'>;
//         const currentIndex = formStepOrder.indexOf(currentFormStep);
//         if (currentIndex > 0) goToStep(formStepOrder[currentIndex - 1]);
//         else goToStep('start');
//     }, [currentUiStepId, goToStep]);

//     /** Resets KYC progress */
//     const resetKycProgress = useCallback((navigateToStart = true) => {
//         console.log("KycContext: Resetting KYC progress state and storage.");
//         startTransition(() => {
//             setKycDataInternal({});
//             setFileState({ idFrontFile: null, idBackFile: null });
//             setSubmissionError(null);
//             console.log("KycContext: Setting backendStatus to 'not_started' during reset.");
//             setBackendStatus('not_started'); // <<< CRITICAL FIX FOR RETRY
//             setRejectionReason(null);
//         });
//         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         if (navigateToStart) {
//             console.log("KycContext: Navigating to 'start' page after reset.");
//             goToStep('start');
//         }
//     }, [goToStep]); // Dependency

//     /** Submits KYC data */
//     const submitKycData = useCallback(async (): Promise<boolean> => {
//         console.log("KycContext: Attempting to submit KYC data...");
//         setSubmissionError(null);
//         const { idFrontFile, idBackFile } = fileState;

//         // File Validation
//         if (!idFrontFile) { setSubmissionError("Submission Error: Front ID document file is required."); alert("Submission Error: Front ID document file is required."); goToStep('upload'); return false; }
//         if (kycData.idType === 'resident_permit' && !idBackFile) { setSubmissionError("Submission Error: Back ID document file is required for Resident Permit."); alert("Submission Error: Back ID document file is required for Resident Permit."); goToStep('upload'); return false; }

//         // Data Validation
//         const requiredFields: (keyof KycSubmissionPayload)[] = [ 'firstName', 'lastName', 'dateOfBirth', 'mobile', 'nationality', 'idType', 'idNumber', 'idIssueDate', 'idExpiryDate' ];
//         const missingFields = requiredFields.filter(field => {
//              if (field === 'mobile') return !kycData.mobile || !kycData.mobile.countryCode || !kycData.mobile.number;
//              if (field === 'idType') return !kycData.idType;
//              const value = kycData[field as keyof KycProgressData];
//              return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
//         });
//         if (missingFields.length > 0) {
//              const missingLabels = missingFields.map(f => f === 'mobile' ? 'Mobile Number' : f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
//              const errorMsg = `Submission Error: Missing required information: ${missingLabels.join(', ')}. Please go back and complete these fields.`;
//              setSubmissionError(errorMsg); alert(errorMsg);
//              if (missingLabels.some(l => ['First Name', 'Last Name', 'Date Of Birth', 'Mobile Number'].includes(l))) goToStep('personal');
//              else if (missingLabels.includes('Nationality')) goToStep('details');
//              else if (missingLabels.some(l => ['Id Type', 'Id Number', 'Id Issue Date', 'Id Expiry Date'].includes(l))) goToStep('identity');
//              else goToStep('review');
//             return false;
//         }

//         // Payload Construction
//         const payload: KycSubmissionPayload = {
//             firstName: kycData.firstName!, lastName: kycData.lastName!, dateOfBirth: kycData.dateOfBirth!,
//             mobile: kycData.mobile!, nationality: kycData.nationality!, idType: kycData.idType!,
//             idNumber: kycData.idNumber!, idIssueDate: kycData.idIssueDate!, idExpiryDate: kycData.idExpiryDate!,
//             occupation: kycData.occupation || undefined, salaryRange: kycData.salaryRange || null,
//         };

//         // API Call
//         startTransition(() => { setIsSubmitting(true); });
//         try {
//             const response = await kycService.submitKyc(payload, idFrontFile, idBackFile);
//             startTransition(() => {
//                 setBackendStatus(response.kyc?.status || 'pending'); setRejectionReason(null);
//                 setKycDataInternal({}); setFileState({ idFrontFile: null, idBackFile: null });
//             });
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//             goToStep('pending');
//             return true;
//         } catch (error: any) {
//             const errorMsg = error.message || "An unexpected error occurred during submission.";
//             setSubmissionError(errorMsg); alert(`Submission Failed: ${errorMsg}`);
//             return false;
//         } finally { startTransition(() => { setIsSubmitting(false); }); }
//     }, [kycData, fileState, goToStep]); // Dependencies

//     // --- Effects ---

//     // Effect 1: Initial Load
//     useEffect(() => {
//         setIsInitialized(false); startTransition(() => { setIsLoadingStatus(true); });
//         fetchKycStatus().then(loadPersistedData).finally(() => {
//             startTransition(() => { setIsLoadingStatus(false); setIsInitialized(true); });
//         });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Run only once

//     // Effect 2: Redirection Logic
//     useEffect(() => {
//         if (!isInitialized || isLoadingStatus || backendStatus === 'loading') return;

//         const targetStatusPath = statusPageMap[backendStatus as KycStatus];
//         const isOnStatusPage = statusPagePaths.includes(pathname);
//         const isOnFormPage = formStepPaths.includes(pathname);
//         const isOnStartPage = pathname === startPagePath;
//         const isOnErrorPage = pathname === errorPagePath;

//         // Handle Error State
//         if (backendStatus === 'error') { if (!isOnErrorPage) router.replace(errorPagePath); return; }

//         // Handle Specific Statuses
//         if (targetStatusPath) { if (pathname !== targetStatusPath) router.replace(targetStatusPath); }
//         // Handle Skipped
//         else if (backendStatus === 'skipped') { if ((isOnFormPage || (isOnStatusPage && pathname !== statusPageMap.rejected)) && !isOnStartPage && !isOnErrorPage) router.replace(startPagePath); }
//         // Handle Not Started
//         else if (backendStatus === 'not_started') { if (isOnStatusPage && ![statusPageMap.rejected, errorPagePath].includes(pathname)) router.replace(startPagePath); }
//         // Fallback
//         else { if ((isOnStatusPage || isOnFormPage) && !isOnStartPage && !isOnErrorPage) router.replace(startPagePath); }

//     }, [backendStatus, isInitialized, isLoadingStatus, pathname, router]); // Dependencies

//     // --- Memoized Context Value ---
//     const value = useMemo<KycContextType>(() => ({
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason, isInitialized, isLoadingStatus, isSubmitting,
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, fetchKycStatus, resetKycProgress, submitKycData
//     }), [
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason, isInitialized, isLoadingStatus, isSubmitting,
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, fetchKycStatus, resetKycProgress, submitKycData
//     ]);

//     // --- Render Provider ---
//     if (!isInitialized && isLoadingStatus) {
//         return ( /* ... Initial loading overlay ... */
//              <div className="fixed inset-0 z-50 flex justify-center items-center bg-background/80 backdrop-blur-sm" aria-label="Loading KYC information">
//                  <div className="text-center">
//                      <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 mx-auto" />
//                      <p className="text-lg font-semibold text-muted-foreground">Loading KYC Process...</p>
//                  </div>
//              </div>
//         );
//     }
//     if (backendStatus === 'error' && pathname !== errorPagePath) {
//         return ( /* ... Error loading overlay ... */
//              <div className="flex flex-col justify-center items-center h-screen text-center p-4" role="alert">
//                  <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading KYC</h2>
//                  <p className="text-muted-foreground mb-4">Redirecting to error page...</p>
//                  <Loader2 className="h-8 w-8 animate-spin text-destructive" />
//              </div>
//         );
//     }

//     return (
//         <KycContext.Provider value={value}>
//             {isSubmitting && ( /* ... Submission overlay ... */
//                 <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/60 backdrop-blur-sm" role="alertdialog" aria-live="assertive" aria-busy="true" aria-label="Submitting KYC information">
//                      <div className="text-center text-white">
//                          <Loader2 className="h-10 w-10 animate-spin text-white mb-3 mx-auto" />
//                          <p className="text-xl font-semibold">Submitting KYC Information...</p>
//                          <p className="text-sm">Please wait...</p>
//                      </div>
//                 </div>
//             )}
//             {children}
//         </KycContext.Provider>
//     );
// };

// //--------------------------------------------------
// // Hook for Consuming Context
// //--------------------------------------------------
// export const useKyc = (): KycContextType => {
//     const context = useContext(KycContext);
//     if (context === undefined) throw new Error('useKyc must be used within a KycProvider');
//     return context;
// };

// // frontend/src/app/contexts/KycContext.tsx
// 'use client';

// import React, {
//     createContext,
//     useState,
//     useContext,
//     useEffect,
//     ReactNode,
//     useCallback,
//     useMemo,
//     startTransition,
//     useRef // Import useRef for preventing double-fetches
// } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import kycService, {
//     type KycMobile,
//     type KycSubmissionPayload,
//     type KycStatusResponse,
//     type KycDetails,
//     type KycStatus, // Use the exported type from service
//     type SalaryRange,
//     type IdType,
// } from '@/app/services/kyc'; // Adjust import path as necessary
// import { useAuth } from '@/app/contexts/AuthContext'; // Import AuthContext hook
// import { Loader2 } from 'lucide-react'; // For loading indicators

// //--------------------------------------------------
// // Type Definitions (Context Specific)
// //--------------------------------------------------

// /** Possible UI states or steps within the KYC flow. */
// export type KycStepId =
//     | 'start'
//     | 'personal'
//     | 'details'
//     | 'identity'
//     | 'upload'
//     | 'review'
//     | 'pending'
//     | 'rejected'
//     | 'complete'
//     | 'error'
//     | 'unauthenticated'; // State when user is not logged in

// /** Combined status including backend states and UI loading/error states. */
// export type KycCombinedStatus = KycStatus | 'loading' | 'error' | 'unauthenticated';

// /** Data collected during the KYC process, stored temporarily. */
// export interface KycProgressData {
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string; // Store as ISO string (YYYY-MM-DD)
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: SalaryRange | null;
//     nationality?: string;
//     idType?: IdType | null; // Allow null for initial state
//     idNumber?: string;
//     idIssueDate?: string; // Store as ISO string (YYYY-MM-DD)
//     idExpiryDate?: string; // Store as ISO string (YYYY-MM-DD)
// }

// /** State of uploaded files. */
// export interface KycFileState {
//     idFrontFile: File | null;
//     idBackFile: File | null;
// }

// /** The shape of the KYC context provided to consumers. */
// export interface KycContextType {
//     currentUiStepId: KycStepId;
//     kycData: KycProgressData;
//     fileState: KycFileState;
//     backendStatus: KycCombinedStatus;
//     rejectionReason: string | null;
//     isInitialized: boolean; // True if KYC context has run its initial auth check and setup
//     isAuthLoading: boolean; // True if the authentication context is loading
//     isLoadingStatus: boolean; // True if fetching KYC status from backend
//     isSubmitting: boolean; // True if KYC data is being submitted to backend
//     setKycData: (data: Partial<KycProgressData>) => void;
//     setFile: (type: keyof KycFileState, file: File | null) => void;
//     updateCurrentUiStepId: (stepId: KycStepId) => void;
//     goToStep: (stepId: KycStepId) => void;
//     nextStep: () => void;
//     prevStep: () => void;
//     fetchKycStatus: (isRetry?: boolean) => Promise<void>;
//     resetKycProgress: (navigateToStart?: boolean) => void;
//     submitKycData: () => Promise<boolean>; // Returns true on success, false on failure
//     startKycFlow: () => void; // Action to initiate the flow from start/skipped
// }

// //--------------------------------------------------
// // Context Definition & Constants
// //--------------------------------------------------

// const KycContext = createContext<KycContextType | undefined>(undefined);
// const KYC_PROGRESS_STORAGE_KEY = 'kycProgressData_v1'; // Key for localStorage

// /** Order of the main form steps. */
// export const formStepOrder: Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error' | 'unauthenticated'>[] = [
//     'personal', 'details', 'identity', 'upload', 'review'
// ];

// /** Mapping of final backend statuses to their corresponding page paths. */
// const statusPageMap: Partial<Record<KycStatus, string>> = {
//     pending: '/kyc/pending',
//     rejected: '/kyc/rejected',
//     verified: '/kyc/complete', // Often redirects to dashboard or a profile page eventually
// };

// // Pre-calculated paths for easier checks
// const formStepPaths = formStepOrder.map(step => `/kyc/${step}`);
// const statusPagePaths = Object.values(statusPageMap);
// const startPagePath = '/kyc/start';
// const errorPagePath = '/kyc/error';
// const loginPagePath = '/auth/login'; // Define login path

// //--------------------------------------------------
// // Loading Component (Internal)
// //--------------------------------------------------

// /** A simple loading overlay component. */
// const LoadingOverlay: React.FC<{ message: string }> = ({ message }) => (
//     <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/80 backdrop-blur-sm" aria-live="polite" aria-busy="true" aria-label={message}>
//         <div className="text-center p-6 bg-card rounded-lg shadow-lg border">
//             <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 mx-auto" />
//             <p className="text-lg font-semibold text-muted-foreground">{message}</p>
//         </div>
//     </div>
// );

// //--------------------------------------------------
// // Provider Component
// //--------------------------------------------------

// interface KycProviderProps { children: ReactNode; }

// export const KycProvider = ({ children }: KycProviderProps) => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { user, loading: authLoading } = useAuth(); // Get authentication state

//     // --- State ---
//     const [currentUiStepId, setCurrentUiStepId] = useState<KycStepId>('start');
//     const [kycData, setKycDataInternal] = useState<KycProgressData>({});
//     const [fileState, setFileState] = useState<KycFileState>({ idFrontFile: null, idBackFile: null });
//     // Initialize status based on auth loading state
//     const [backendStatus, setBackendStatus] = useState<KycCombinedStatus>(authLoading ? 'loading' : 'unauthenticated');
//     const [rejectionReason, setRejectionReason] = useState<string | null>(null);
//     const [isInitialized, setIsInitialized] = useState(false); // Has the KYC context run its init?
//     const [isLoadingStatus, setIsLoadingStatus] = useState(true); // Loading KYC status?
//     const [isSubmitting, setIsSubmitting] = useState(false); // Submitting to backend?
//     const [submissionError, setSubmissionError] = useState<string | null>(null);
//     const isFetchingRef = useRef(false); // Prevent simultaneous fetches

//     // --- Actions ---

//     /** Fetches KYC status from the backend and updates state. Requires user to be logged in. */
//     const fetchKycStatus = useCallback(async (isRetry = false) => {
//         if (!user) {
//             // console.log("KycContext: Skipping fetchKycStatus - user not authenticated.");
//             if (backendStatus !== 'unauthenticated') startTransition(() => setBackendStatus('unauthenticated'));
//             startTransition(() => setIsLoadingStatus(false));
//             return;
//         }
//         if (isFetchingRef.current && !isRetry) {
//              // console.log("KycContext: Fetch already in progress, skipping.");
//              return;
//         }

//         isFetchingRef.current = true;
//         // console.log(`KycContext: Fetching KYC status... (Retry: ${isRetry})`);
//         startTransition(() => { setIsLoadingStatus(true); });
//         // Only set to loading if coming from error/unauth to avoid flicker
//         if (backendStatus === 'error' || backendStatus === 'unauthenticated') {
//             startTransition(() => setBackendStatus('loading'));
//         }

//         try {
//             const statusData = await kycService.getMyKycStatus();
//             // console.log("KycContext: Received status:", statusData.status);
//             startTransition(() => {
//                 setBackendStatus(statusData.status);
//                 setRejectionReason(statusData.rejectionReason || null);
//                 // Clear progress data if verified or pending (no longer resumable)
//                 if (['verified', 'pending'].includes(statusData.status)) {
//                     if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) {
//                         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                         setKycDataInternal({});
//                         setFileState({ idFrontFile: null, idBackFile: null });
//                     }
//                 }
//             });
//         } catch (error: any) {
//             console.error("KycContext: Error fetching KYC status:", error.response?.status, error.message);
//             startTransition(() => { setBackendStatus('error'); setRejectionReason(null); });
//         } finally {
//             startTransition(() => setIsLoadingStatus(false));
//             isFetchingRef.current = false;
//         }
//     }, [user, backendStatus]); // Include backendStatus to conditionally set 'loading'

//     /** Loads KYC progress data from localStorage if status allows. Requires user to be logged in. */
//     const loadPersistedData = useCallback(() => {
//         if (!user) {
//             if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//             startTransition(() => setKycDataInternal({}));
//             return;
//         }

//         // Only load if status allows resuming (not started, rejected, or skipped)
//         if (['not_started', 'rejected', 'skipped'].includes(backendStatus as string)) {
//             try {
//                 const storedData = localStorage.getItem(KYC_PROGRESS_STORAGE_KEY);
//                 if (storedData) {
//                     const parsedData: KycProgressData = JSON.parse(storedData);
//                     if (typeof parsedData === 'object' && parsedData !== null) {
//                         startTransition(() => setKycDataInternal(parsedData));
//                     } else { localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY); startTransition(() => setKycDataInternal({})); }
//                 } else { startTransition(() => setKycDataInternal({})); }
//             } catch (error) {
//                 console.error("KycContext: Error loading persisted data:", error);
//                 localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//                 startTransition(() => setKycDataInternal({}));
//             }
//         } else {
//             // If status doesn't allow resuming, clear any potentially stale persisted data
//             if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         }
//     }, [user, backendStatus]);

//     /** Updates KYC data in state and persists to localStorage if status allows. Requires user to be logged in. */
//     const setKycData = useCallback((data: Partial<KycProgressData>) => {
//         if (!user) {
//             console.warn("KycContext: Attempted to setKycData while unauthenticated.");
//             return;
//         }
//         setKycDataInternal(prevData => {
//             const newData = { ...prevData, ...data };
//             // Persist ONLY if the status allows resuming (not started, rejected, skipped)
//             if (['not_started', 'rejected', 'skipped'].includes(backendStatus as string)) {
//                 try { localStorage.setItem(KYC_PROGRESS_STORAGE_KEY, JSON.stringify(newData)); }
//                 catch (error) { console.error("KycContext: Error saving progress:", error); }
//             } else {
//                 // Otherwise, ensure it's cleared from storage
//                 if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//             }
//             return newData;
//         });
//     }, [user, backendStatus]);

//     /** Updates file state. */
//     const setFile = useCallback((type: keyof KycFileState, file: File | null) => {
//         setFileState(prevFiles => ({ ...prevFiles, [type]: file }));
//     }, []);

//     /** Updates the logical UI step ID in the context state. */
//     const updateCurrentUiStepId = useCallback((stepId: KycStepId) => {
//         startTransition(() => {
//             if (currentUiStepId !== stepId) {
//                 setCurrentUiStepId(stepId);
//             }
//         });
//     }, [currentUiStepId]);

//     /** Navigates the user to a specific KYC step using the router. Requires user to be logged in for most steps. */
//     const goToStep = useCallback((stepId: KycStepId) => {
//         if (!user && stepId !== 'unauthenticated') {
//             // console.warn("KycContext: Attempted goToStep while unauthenticated.");
//             if (pathname !== loginPagePath && !pathname.startsWith('/auth/login')) {
//                 router.replace(`${loginPagePath}?redirect=${encodeURIComponent(pathname)}`);
//             }
//             return;
//         }
//         const path = `/kyc/${stepId}`;
//         if (pathname !== path) {
//              // Use replace for status/end pages to avoid back button loops
//              if (['pending', 'rejected', 'complete', 'start', 'error', 'unauthenticated'].includes(stepId)) {
//                 router.replace(path);
//             } else {
//                 router.push(path); // Use push for form steps
//             }
//         }
//     }, [router, pathname, user]);

//     /** Navigates to the next step in the defined form order. */
//     const nextStep = useCallback(() => {
//         const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error' | 'unauthenticated'>;
//         const currentIndex = formStepOrder.indexOf(currentFormStep);
//         if (currentIndex >= 0 && currentIndex < formStepOrder.length - 1) {
//             goToStep(formStepOrder[currentIndex + 1]);
//         } else if (currentUiStepId === 'review') {
//             console.warn("KycContext: nextStep called on review step. Should call submitKycData.");
//         } else {
//             console.warn(`KycContext: Could not determine next step from ${currentUiStepId}`);
//         }
//     }, [currentUiStepId, goToStep]);

//     /** Navigates to the previous step in the defined form order, or back to start. */
//     const prevStep = useCallback(() => {
//         const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error' | 'unauthenticated'>;
//         const currentIndex = formStepOrder.indexOf(currentFormStep);
//         if (currentIndex > 0) {
//             goToStep(formStepOrder[currentIndex - 1]);
//         } else {
//             // From the first form step ('personal'), go back to start
//             goToStep('start');
//         }
//     }, [currentUiStepId, goToStep]);

//     /** Resets the KYC progress state and clears localStorage. Optionally navigates to the start page. */
//     const resetKycProgress = useCallback((navigateToStart = true) => {
//         console.log("KycContext: Resetting KYC progress.");
//         startTransition(() => {
//             setKycDataInternal({});
//             setFileState({ idFrontFile: null, idBackFile: null });
//             setSubmissionError(null);
//             // **Reset backend status to not_started to allow restart**
//             setBackendStatus('not_started');
//             setCurrentUiStepId('start'); // Reset UI step
//             setRejectionReason(null);
//             setIsLoadingStatus(false); // Assume not loading after reset
//             setIsSubmitting(false);
//         });
//         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         if (navigateToStart) {
//             goToStep('start');
//         }
//     }, [goToStep]);

//      /** Initiates the KYC flow from start/skipped/rejected state */
//      const startKycFlow = useCallback(() => {
//         console.log("KycContext: Starting KYC flow.");
//         startTransition(() => {
//             // Clear any previous progress data
//             setKycDataInternal({});
//             setFileState({ idFrontFile: null, idBackFile: null });
//             setSubmissionError(null);
//             // **Crucially set status to not_started**
//             setBackendStatus('not_started');
//             // Set the UI step to the *first form step* immediately
//             setCurrentUiStepId('personal');
//             setRejectionReason(null); // Clear any old rejection reason
//             setIsLoadingStatus(false); // Ensure loading is off
//             setIsSubmitting(false); // Ensure submitting is off
//         });
//         // Clear storage associated with previous attempts
//         localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//         // Navigation will be handled by the component calling this action (goToStep('personal'))
//     }, []); // No dependencies needed, it's a state reset/initiation action

//     /** Validates data and submits the KYC information to the backend. Requires user to be logged in. */
//     const submitKycData = useCallback(async (): Promise<boolean> => {
//         if (!user) {
//             console.error("KycContext: Cannot submit KYC data, user is not authenticated.");
//             setSubmissionError("Authentication required to submit KYC.");
//              if (pathname !== loginPagePath && !pathname.startsWith('/auth/login')) {
//                  router.replace(`${loginPagePath}?redirect=${encodeURIComponent(pathname)}`);
//             }
//             return false;
//         }

//         // console.log("KycContext: Attempting to submit KYC data...");
//         setSubmissionError(null);
//         startTransition(() => { setIsSubmitting(true); }); // Start submitting state

//         const { idFrontFile, idBackFile } = fileState;

//         // --- Validation --- (Keep existing validation logic)
//         // File Validation
//         if (!idFrontFile) {
//              const errorMsg = "Submission Error: Front ID document file is required.";
//              setSubmissionError(errorMsg); alert(errorMsg); goToStep('upload');
//              startTransition(() => { setIsSubmitting(false); }); return false;
//         }
//         if (kycData.idType === 'resident_permit' && !idBackFile) {
//             const errorMsg = "Submission Error: Back ID document file is required for Resident Permit.";
//             setSubmissionError(errorMsg); alert(errorMsg); goToStep('upload');
//              startTransition(() => { setIsSubmitting(false); }); return false;
//         }
//         // Data Validation
//         const requiredFields: (keyof KycSubmissionPayload)[] = [ 'firstName', 'lastName', 'dateOfBirth', 'mobile', 'nationality', 'idType', 'idNumber', 'idIssueDate', 'idExpiryDate' ];
//         const missingFields = requiredFields.filter(field => {
//              if (field === 'mobile') return !kycData.mobile || !kycData.mobile.countryCode || !kycData.mobile.number;
//              if (field === 'idType') return !kycData.idType; // Ensure ID type itself is selected
//              const value = kycData[field as keyof KycProgressData];
//              return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
//         });
//         if (missingFields.length > 0) {
//              const missingLabels = missingFields.map(f => f === 'mobile' ? 'Mobile Number' : f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
//              const errorMsg = `Submission Error: Missing required information: ${missingLabels.join(', ')}. Please go back and complete these fields.`;
//              setSubmissionError(errorMsg); alert(errorMsg);
//              // Attempt to navigate to the first relevant step with missing data
//              if (missingLabels.some(l => ['First Name', 'Last Name', 'Date Of Birth', 'Mobile Number'].includes(l))) goToStep('personal');
//              else if (missingLabels.includes('Nationality')) goToStep('details');
//              else if (missingLabels.some(l => ['Id Type', 'Id Number', 'Id Issue Date', 'Id Expiry Date'].includes(l))) goToStep('identity');
//              else if (missingLabels.includes('Front ID Document') || missingLabels.includes('Back ID Document')) goToStep('upload');
//              else goToStep('review'); // Default to review if specific step unclear
//              startTransition(() => { setIsSubmitting(false); }); return false;
//         }
//         // --- End Validation ---

//         // Payload Construction (Keep existing logic)
//         const payload: KycSubmissionPayload = {
//             firstName: kycData.firstName!, lastName: kycData.lastName!, dateOfBirth: kycData.dateOfBirth!,
//             mobile: kycData.mobile!, nationality: kycData.nationality!, idType: kycData.idType!,
//             idNumber: kycData.idNumber!, idIssueDate: kycData.idIssueDate!, idExpiryDate: kycData.idExpiryDate!,
//             // Optional fields
//             occupation: kycData.occupation || undefined, salaryRange: kycData.salaryRange || null,
//         };

//         // API Call (Keep existing logic)
//         try {
//             const response = await kycService.submitKyc(payload, idFrontFile, idBackFile);
//             // console.log("KycContext: Submission successful, backend status:", response.kyc?.status);
//             startTransition(() => {
//                 // Update state based on response
//                 setBackendStatus(response.kyc?.status || 'pending');
//                 setRejectionReason(null);
//                 // Clear local progress data after successful submission
//                 setKycDataInternal({});
//                 setFileState({ idFrontFile: null, idBackFile: null });
//                 // Update UI step to match the new status
//                 setCurrentUiStepId('pending');
//             });
//             localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//             // Navigation is now handled by the redirection effect based on the new 'pending' status
//             startTransition(() => { setIsSubmitting(false); }); // Stop submitting state on success
//             return true;
//         } catch (error: any) {
//             console.error("KycContext: Submission failed:", error);
//             const errorMsg = error.message || "An unexpected error occurred during submission.";
//             setSubmissionError(errorMsg);
//             alert(`Submission Failed: ${errorMsg}`); // Show error to user
//             startTransition(() => { setIsSubmitting(false); }); // Stop submitting state on error
//             return false;
//         }
//     }, [user, kycData, fileState, goToStep, router, pathname]); // Depend on user, data, files, navigation


//     // --- Effects ---

//     /** Effect 1: Initialization - Handles auth changes and triggers initial KYC fetch */
//     useEffect(() => {
//         // console.log("KycContext: Init Effect Check. Auth Loading:", authLoading);
//         if (authLoading) {
//             startTransition(() => {
//                 setIsInitialized(false);
//                 setIsLoadingStatus(true); // Show KYC loading while auth is loading
//                 setBackendStatus('loading');
//             });
//             return;
//         }

//         if (!user) {
//             // console.log("KycContext: Init Effect - User not authenticated.");
//             startTransition(() => {
//                 setBackendStatus('unauthenticated');
//                 setIsInitialized(true); // Init done (auth status known)
//                 setIsLoadingStatus(false);
//                 setKycDataInternal({});
//                 setFileState({ idFrontFile: null, idBackFile: null });
//                 if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
//             });
//             // Redirection to login will be handled by Effect 2 or KycLayoutComponent
//             return;
//         }

//         // User is authenticated, proceed with KYC initialization
//         // console.log("KycContext: Init Effect - User authenticated. Fetching initial status.");
//         startTransition(() => {
//              setIsInitialized(false); // Mark as not initialized until fetch completes
//         });

//         // Fetch KYC status for the logged-in user
//         fetchKycStatus() // Fetch initial status
//             .then(() => loadPersistedData()) // Load data *after* status is known
//             .catch(err => console.error("KycContext: Error in initial fetch/load sequence:", err))
//             .finally(() => {
//                 startTransition(() => setIsInitialized(true)); // Mark init complete
//                 // console.log("KycContext: Init Effect - Sequence complete.");
//             });

//     }, [authLoading, user, fetchKycStatus, loadPersistedData]); // Dependencies trigger re-init on auth change


//     /** Effect 2: Redirection Logic - Ensures user is on the correct page based on status */
//     useEffect(() => {
//         // Wait conditions: Exit if auth loading, KYC not initialized, or KYC status is loading
//         if (authLoading || !isInitialized || isLoadingStatus) {
//             // console.log(`KycContext: Redirection Check Deferred - AuthLoading: ${authLoading}, Initialized: ${isInitialized}, KYCStatusLoading: ${isLoadingStatus}`);
//             return;
//         }

//         // Define current location checks within the effect to ensure they are up-to-date
//         const isOnFormPage = formStepPaths.includes(pathname);
//         const isOnStartPage = pathname === startPagePath;
//         const isOnErrorPage = pathname === errorPagePath;
//         const isOnLoginPage = pathname.startsWith(loginPagePath); // Check if already on login or related auth page

//         // Handle Unauthenticated State
//         if (backendStatus === 'unauthenticated') {
//             if (!isOnLoginPage) { // Redirect only if NOT already on a login/auth page
//                 // console.log(`KycContext: (Redirect Effect) Backend status unauthenticated (Path: ${pathname}). Ensuring redirect to login.`);
//                 router.replace(`${loginPagePath}?redirect=${encodeURIComponent(pathname || '/')}`);
//             }
//             return; // Stop processing for unauthenticated user
//         }

//         // --- KYC Status Based Redirection (User is Authenticated) ---
//         const targetStatusPath = statusPageMap[backendStatus as KycStatus]; // Path for verified, pending, rejected
//         const isOnSpecificStatusPage = targetStatusPath && pathname === targetStatusPath;
//         const isOnAnyStatusPage = statusPagePaths.includes(pathname); // Includes pending, rejected, verified paths

//         // console.log(`KycContext: Redirection Check - Path: ${pathname}, Status: ${backendStatus}, TargetStatusPath: ${targetStatusPath}`);

//         // 1. Error State -> Error Page
//         if (backendStatus === 'error') {
//             if (!isOnErrorPage) {
//                 // console.log(`KycContext: Status is error. Redirecting to error page.`);
//                 router.replace(errorPagePath);
//             }
//             return; // Stop processing
//         }

//         // 2. Final/Status States (Verified, Pending, Rejected) -> Go TO Specific Status Page
//         if (targetStatusPath) { // If status is verified, pending, or rejected
//             if (!isOnSpecificStatusPage) { // If not ALREADY on the correct status page
//                 // console.log(`KycContext: Status is ${backendStatus}. Redirecting to specific status page: ${targetStatusPath}`);
//                 router.replace(targetStatusPath);
//             }
//             // If already on the correct status page, do nothing more.
//             return; // Stop processing
//         }

//         // 4. Not Started State -> Allow on Start or Form pages. Redirect *AWAY* from Status pages.
//         if (backendStatus === 'not_started') {
//             // If user lands on a final status page (pending/rejected/verified) but backend says 'not_started', redirect to start.
//             if (isOnAnyStatusPage && !isOnErrorPage) {
//                 // console.log(`KycContext: Status is not_started (Path: ${pathname}, which is a status page). Redirecting TO start page.`);
//                 router.replace(startPagePath);
//             }
//             // *** Explicitly DO NOTHING if on start or a form page. Allows starting/continuing the process. ***
//             // console.log(`KycContext: Status is not_started (Path: ${pathname}, which is start/form page). Allowing access.`);
//             return; // Stop processing for 'not_started' status
//         }

//         // 5. Fallback (Should be rare) -> Go TO Start Page
//         // Only redirect if not already on a known valid page type for *any* possible status
//         if (!isOnStartPage && !isOnErrorPage && !isOnFormPage && !isOnAnyStatusPage && !isOnLoginPage) {
//              console.warn(`KycContext: Reached fallback redirection. Status: ${backendStatus}, Path: ${pathname}. Redirecting to Start.`);
//              router.replace(startPagePath);
//         }

//     }, [authLoading, user, backendStatus, isInitialized, isLoadingStatus, pathname, router]); // Depend on all relevant states


//     // --- Memoized Context Value ---
//     const value = useMemo<KycContextType>(() => ({
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason,
//         isInitialized,
//         isAuthLoading: authLoading,
//         isLoadingStatus, // Use the refined isLoadingStatus state
//         isSubmitting,
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, startKycFlow, // Include action refs
//         fetchKycStatus, resetKycProgress, submitKycData
//     }), [
//         currentUiStepId, kycData, fileState, backendStatus, rejectionReason,
//         isInitialized, authLoading, isLoadingStatus, isSubmitting,
//         setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, startKycFlow,
//         fetchKycStatus, resetKycProgress, submitKycData
//     ]);

//     // --- Render Provider ---

//     // 1. Show overlay if Authentication is loading
//     if (authLoading) {
//         return <LoadingOverlay message="Loading Session..." />;
//     }

//     // 2. Show overlay if KYC status is actively loading *after* authentication is complete AND context is initialized
//     // Prevents showing KYC loading before the initial fetch has even started.
//     if (user && isLoadingStatus && isInitialized) {
//          return <LoadingOverlay message="Loading KYC Status..." />;
//     }

//     // 3. Handle error state UI (redirect effect will navigate, show overlay during transition)
//     if (user && isInitialized && backendStatus === 'error' && pathname !== errorPagePath) {
//         // Render minimal loading while redirect effect runs
//         return <LoadingOverlay message="Error Loading KYC..." />;
//     }

//     // 4. Render children if unauthenticated (Layout/Redirect effect handles redirect)
//     // or if authenticated & ready (initialized and not loading status).
//     // Check isInitialized ensures auth check is done before rendering for !user case.
//     if ((!user && isInitialized) || (user && isInitialized && !isLoadingStatus)) {
//         return (
//             <KycContext.Provider value={value}>
//                 {isSubmitting && (
//                     // Submission Overlay
//                     <div className="fixed inset-0 z-[210] flex justify-center items-center bg-black/60 backdrop-blur-sm" role="alertdialog" aria-live="assertive" aria-busy="true" aria-label="Submitting KYC information">
//                         <div className="text-center text-white p-6 bg-card rounded-lg shadow-lg border border-primary">
//                             <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 mx-auto" />
//                             <p className="text-xl font-semibold text-foreground">Submitting Information...</p>
//                             <p className="text-sm text-muted-foreground">Please wait...</p>
//                         </div>
//                     </div>
//                 )}
//                 {/* Render children when conditions are met */}
//                 {children}
//             </KycContext.Provider>
//         );
//     }

//     // 5. Fallback / Intermediate Loading State
//     // This covers the brief period after auth completes but before KYC initialization finishes
//     // or if none of the above conditions are met (should be unlikely).
//     return <LoadingOverlay message="Initializing KYC..." />;


// };

// //--------------------------------------------------
// // Hook for Consuming Context
// //--------------------------------------------------

// /**
//  * Custom hook to consume the KycContext.
//  * Throws an error if used outside of a KycProvider.
//  */
// export const useKyc = (): KycContextType => {
//     const context = useContext(KycContext);
//     if (context === undefined) {
//         throw new Error('useKyc must be used within a KycProvider');
//     }
//     return context;
// };

'use client';

import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
    useCallback,
    useMemo,
    startTransition,
    useRef
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import kycService, {
    type KycMobile,
    type KycSubmissionPayload,
    type KycStatusResponse,
    type KycDetails,
    type KycStatus,
    type SalaryRange,
    type IdType,
} from '@/app/services/kyc';
// ----- CHANGE 1: Import useAuth -----
import { useAuth } from '@/app/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

//--------------------------------------------------
// Type Definitions (Context Specific)
//--------------------------------------------------

/** Possible UI states or steps within the KYC flow. */
export type KycStepId =
    | 'start'
    | 'personal'
    | 'details'
    | 'identity'
    | 'upload'
    | 'review'
    | 'pending'
    | 'rejected'
    | 'verified'
    | 'complete'
    | 'error'
    | 'unauthenticated'; // State when user is not logged in

/** Combined status including backend states and UI loading/error states. */
export type KycCombinedStatus = KycStatus | 'loading' | 'error' | 'unauthenticated';

/** Data collected during the KYC process, stored temporarily. */
export interface KycProgressData {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; // Store as ISO string (YYYY-MM-DD)
    mobile?: KycMobile;
    occupation?: string;
    salaryRange?: SalaryRange | null;
    nationality?: string;
    idType?: IdType | null; // Allow null for initial state
    idNumber?: string;
    idIssueDate?: string; // Store as ISO string (YYYY-MM-DD)
    idExpiryDate?: string; // Store as ISO string (YYYY-MM-DD)
}

/** State of uploaded files. */
export interface KycFileState {
    idFrontFile: File | null;
    idBackFile: File | null;
}

/** The shape of the KYC context provided to consumers. */
export interface KycContextType {
    currentUiStepId: KycStepId;
    kycData: KycProgressData;
    fileState: KycFileState;
    backendStatus: KycCombinedStatus;
    rejectionReason: string | null;
    isInitialized: boolean; // True if KYC context has run its initial auth check and setup
    isAuthLoading: boolean; // True if the authentication context is loading
    isLoadingStatus: boolean; // True if fetching KYC status from backend
    isSubmitting: boolean; // True if KYC data is being submitted to backend
    setKycData: (data: Partial<KycProgressData>) => void;
    setFile: (type: keyof KycFileState, file: File | null) => void;
    updateCurrentUiStepId: (stepId: KycStepId) => void;
    goToStep: (stepId: KycStepId) => void;
    nextStep: () => void;
    prevStep: () => void;
    fetchKycStatus: (isRetry?: boolean) => Promise<void>;
    resetKycProgress: (navigateToStart?: boolean) => void;
    submitKycData: () => Promise<boolean>; // Returns true on success, false on failure
    startKycFlow: () => void; // Action to initiate the flow from start/skipped
}

//--------------------------------------------------
// Context Definition & Constants
//--------------------------------------------------

const KycContext = createContext<KycContextType | undefined>(undefined);
const KYC_PROGRESS_STORAGE_KEY = 'kycProgressData_v1'; // Key for localStorage

/** Order of the main form steps. */
export const formStepOrder: Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error' | 'unauthenticated'>[] = [
    'personal', 'details', 'identity', 'upload', 'review'
];

/** Mapping of final backend statuses to their corresponding page paths. */
const statusPageMap: Partial<Record<KycStatus, string>> = {
    pending: '/kyc/pending',
    rejected: '/kyc/rejected',
    verified: '/kyc/complete', // Often redirects to dashboard or a profile page eventually
};

// Pre-calculated paths for easier checks
const formStepPaths = formStepOrder.map(step => `/kyc/${step}`);
const statusPagePaths = Object.values(statusPageMap);
const startPagePath = '/kyc/start';
const errorPagePath = '/kyc/error';
const loginPagePath = '/auth/login'; // Define login path

//--------------------------------------------------
// Loading Component (Internal)
//--------------------------------------------------

/** A simple loading overlay component. */
const LoadingOverlay: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/80 backdrop-blur-sm" aria-live="polite" aria-busy="true" aria-label={message}>
        <div className="text-center p-6 bg-card rounded-lg shadow-lg border">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 mx-auto" />
            <p className="text-lg font-semibold text-muted-foreground">{message}</p>
        </div>
    </div>
);

//--------------------------------------------------
// Provider Component
//--------------------------------------------------

interface KycProviderProps { children: ReactNode; }

export const KycProvider = ({ children }: KycProviderProps) => {
    const router = useRouter();
    const pathname = usePathname();
    // ----- CHANGE 2: Get Auth context and refetchUser -----
    const { user, loading: authLoading, refetchUser } = useAuth();

    // --- State ---
    const [currentUiStepId, setCurrentUiStepId] = useState<KycStepId>('start');
    const [kycData, setKycDataInternal] = useState<KycProgressData>({});
    const [fileState, setFileState] = useState<KycFileState>({ idFrontFile: null, idBackFile: null });
    const [backendStatus, setBackendStatus] = useState<KycCombinedStatus>(authLoading ? 'loading' : 'unauthenticated');
    const [rejectionReason, setRejectionReason] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false); // Has the KYC context run its init?
    const [isLoadingStatus, setIsLoadingStatus] = useState(true); // Loading KYC status?
    const [isSubmitting, setIsSubmitting] = useState(false); // Submitting to backend?
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const isFetchingRef = useRef(false); // Prevent simultaneous fetches

    // --- Actions ---

    /** Fetches KYC status from the backend and updates state. Requires user to be logged in. */
    const fetchKycStatus = useCallback(async (isRetry = false) => {
        if (!user) {
            if (backendStatus !== 'unauthenticated') startTransition(() => setBackendStatus('unauthenticated'));
            startTransition(() => setIsLoadingStatus(false));
            return;
        }
        if (isFetchingRef.current && !isRetry) return;

        isFetchingRef.current = true;
        startTransition(() => { setIsLoadingStatus(true); });
        if (backendStatus === 'error' || backendStatus === 'unauthenticated') {
            startTransition(() => setBackendStatus('loading'));
        }

        const previousStatus = backendStatus; // Store previous status before fetch

        try {
            const statusData = await kycService.getMyKycStatus();
            console.log("KycContext: Received status:", statusData.status);

            startTransition(() => {
                setBackendStatus(statusData.status);
                setRejectionReason(statusData.rejectionReason || null);
                // Clear progress data if verified or pending (no longer resumable)
                if (['verified', 'pending'].includes(statusData.status)) {
                    if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) {
                        localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
                        setKycDataInternal({});
                        setFileState({ idFrontFile: null, idBackFile: null });
                        console.log("KycContext: Cleared persisted data due to final status:", statusData.status);
                    }
                }
            });

            // ----- CHANGE 3: Refetch Auth user data AFTER successful status fetch IF status changed -----
            if (statusData.status !== previousStatus) {
                console.log(`KycContext: Backend status changed (${previousStatus} -> ${statusData.status}). Triggering AuthContext refetch.`);
                refetchUser(); // Call refetchUser from AuthContext
            } else {
                // console.log(`KycContext: Backend status (${statusData.status}) unchanged after fetch. No AuthContext refetch needed.`);
            }

        } catch (error: any) {
            console.error("KycContext: Error fetching KYC status:", error.response?.status, error.message);
            startTransition(() => { setBackendStatus('error'); setRejectionReason(null); });
        } finally {
            startTransition(() => setIsLoadingStatus(false));
            isFetchingRef.current = false;
        }
        // ----- CHANGE 4: Add refetchUser to dependencies -----
    }, [user, backendStatus, refetchUser]); // Added refetchUser

    /** Loads KYC progress data from localStorage if status allows. Requires user to be logged in. */
    const loadPersistedData = useCallback(() => {
        if (!user) {
            if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
            startTransition(() => setKycDataInternal({}));
            return;
        }

        if (['not_started', 'rejected', 'skipped'].includes(backendStatus as string)) {
            try {
                const storedData = localStorage.getItem(KYC_PROGRESS_STORAGE_KEY);
                if (storedData) {
                    const parsedData: KycProgressData = JSON.parse(storedData);
                    if (typeof parsedData === 'object' && parsedData !== null) {
                        startTransition(() => setKycDataInternal(parsedData));
                        console.log("KycContext: Loaded persisted KYC data.");
                    } else { localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY); startTransition(() => setKycDataInternal({})); }
                } else { startTransition(() => setKycDataInternal({})); }
            } catch (error) {
                console.error("KycContext: Error loading persisted data:", error);
                localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
                startTransition(() => setKycDataInternal({}));
            }
        } else {
            if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
        }
    }, [user, backendStatus]);

    /** Updates KYC data in state and persists to localStorage if status allows. Requires user to be logged in. */
    const setKycData = useCallback((data: Partial<KycProgressData>) => {
        if (!user) {
            console.warn("KycContext: Attempted to setKycData while unauthenticated.");
            return;
        }
        setKycDataInternal(prevData => {
            const newData = { ...prevData, ...data };
            if (['not_started', 'rejected', 'skipped'].includes(backendStatus as string)) {
                try { localStorage.setItem(KYC_PROGRESS_STORAGE_KEY, JSON.stringify(newData)); }
                catch (error) { console.error("KycContext: Error saving progress:", error); }
            } else {
                if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
            }
            return newData;
        });
    }, [user, backendStatus]);

    /** Updates file state. */
    const setFile = useCallback((type: keyof KycFileState, file: File | null) => {
        setFileState(prevFiles => ({ ...prevFiles, [type]: file }));
    }, []);

    /** Updates the logical UI step ID in the context state. */
    const updateCurrentUiStepId = useCallback((stepId: KycStepId) => {
        startTransition(() => {
            if (currentUiStepId !== stepId) {
                 console.log(`KycContext: Updating UI step ID from ${currentUiStepId} to ${stepId}`);
                setCurrentUiStepId(stepId);
            }
        });
    }, [currentUiStepId]); // Dependency is correct

    /** Navigates the user to a specific KYC step using the router. Requires user to be logged in for most steps. */
    const goToStep = useCallback((stepId: KycStepId) => {
        if (!user && stepId !== 'unauthenticated') {
            if (pathname !== loginPagePath && !pathname.startsWith('/auth/login')) {
                 console.log(`KycContext: goToStep(${stepId}) blocked (unauthenticated), redirecting to login.`);
                router.replace(`${loginPagePath}?redirect=${encodeURIComponent(pathname || '/kyc/start')}`); // Redirect to start if no pathname
            }
            return;
        }
        const path = `/kyc/${stepId}`;
        if (pathname !== path) {
             console.log(`KycContext: Navigating to step ${stepId} (Path: ${path})`);
             if (['pending', 'rejected', 'complete', 'start', 'error', 'unauthenticated'].includes(stepId)) {
                router.replace(path); // Use replace for terminal/entry steps
            } else {
                router.push(path); // Use push for form steps
            }
            // Update UI step *after* navigation is initiated
            updateCurrentUiStepId(stepId);
        }
    }, [router, pathname, user, updateCurrentUiStepId]); // Added updateCurrentUiStepId dependency

    /** Navigates to the next step in the defined form order. */
    const nextStep = useCallback(() => {
        const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error' | 'unauthenticated'>;
        const currentIndex = formStepOrder.indexOf(currentFormStep);
        if (currentIndex >= 0 && currentIndex < formStepOrder.length - 1) {
            goToStep(formStepOrder[currentIndex + 1]);
        } else if (currentUiStepId === 'review') {
            console.warn("KycContext: nextStep called on review step. Should call submitKycData.");
            // Optionally call submitKycData here if that's the desired flow
            // submitKycData();
        } else {
            console.warn(`KycContext: Could not determine next step from ${currentUiStepId}`);
        }
    }, [currentUiStepId, goToStep]);

    /** Navigates to the previous step in the defined form order, or back to start. */
    const prevStep = useCallback(() => {
        const currentFormStep = currentUiStepId as Exclude<KycStepId, 'start' | 'pending' | 'rejected' | 'complete' | 'error' | 'unauthenticated'>;
        const currentIndex = formStepOrder.indexOf(currentFormStep);
        if (currentIndex > 0) {
            goToStep(formStepOrder[currentIndex - 1]);
        } else {
            // From the first form step ('personal'), go back to start
            goToStep('start');
        }
    }, [currentUiStepId, goToStep]);

    /** Resets the KYC progress state and clears localStorage. Optionally navigates to the start page. */
    const resetKycProgress = useCallback((navigateToStart = true) => {
        console.log("KycContext: Resetting KYC progress.");
        startTransition(() => {
            setKycDataInternal({});
            setFileState({ idFrontFile: null, idBackFile: null });
            setSubmissionError(null);
            // Reset backend status to not_started to allow restart
            // Note: The *actual* backend status doesn't change here, only the local context state.
            // fetchKycStatus would be needed to confirm the real backend state.
            setBackendStatus('not_started');
            setCurrentUiStepId('start'); // Reset UI step
            setRejectionReason(null);
            setIsLoadingStatus(false);
            setIsSubmitting(false);
        });
        localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);

        // ----- CHANGE 5: Optional: Refetch user after reset -----
        // This ensures AuthContext reflects the 'not_started' assumption locally
        // console.log("KycContext: Triggering AuthContext refetch after reset (optional).");
        // refetchUser(); // Uncomment if you want AuthContext updated immediately

        if (navigateToStart) {
            goToStep('start');
        }
        // ----- CHANGE 6: Add refetchUser dependency if uncommented -----
    }, [goToStep /*, refetchUser */]);

     /** Initiates the KYC flow from start/skipped/rejected state */
     const startKycFlow = useCallback(() => {
        console.log("KycContext: Starting KYC flow.");
        startTransition(() => {
            // Clear any previous progress data
            setKycDataInternal({});
            setFileState({ idFrontFile: null, idBackFile: null });
            setSubmissionError(null);
            // Crucially set local status to not_started to allow form progression
            setBackendStatus('not_started');
            // Set the UI step to the *first form step* immediately
            setCurrentUiStepId('personal');
            setRejectionReason(null);
            setIsLoadingStatus(false);
            setIsSubmitting(false);
        });
        localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
        // Navigate to the first form step explicitly
        goToStep('personal');
    }, [goToStep]); // Added goToStep dependency

    /** Validates data and submits the KYC information to the backend. Requires user to be logged in. */
    const submitKycData = useCallback(async (): Promise<boolean> => {
        if (!user) {
            console.error("KycContext: Cannot submit KYC data, user is not authenticated.");
            setSubmissionError("Authentication required to submit KYC.");
             if (pathname !== loginPagePath && !pathname.startsWith('/auth/login')) {
                 router.replace(`${loginPagePath}?redirect=${encodeURIComponent(pathname || '/kyc/review')}`); // Redirect to review after login
            }
            return false;
        }

        console.log("KycContext: Attempting to submit KYC data...");
        setSubmissionError(null);
        startTransition(() => { setIsSubmitting(true); });

        const { idFrontFile, idBackFile } = fileState;

        // --- Validation ---
        if (!idFrontFile) {
             const errorMsg = "Submission Error: Front ID document file is required.";
             console.error(errorMsg); setSubmissionError(errorMsg); alert(errorMsg); goToStep('upload');
             startTransition(() => { setIsSubmitting(false); }); return false;
        }
        if (kycData.idType === 'resident_permit' && !idBackFile) {
            const errorMsg = "Submission Error: Back ID document file is required for Resident Permit.";
            console.error(errorMsg); setSubmissionError(errorMsg); alert(errorMsg); goToStep('upload');
             startTransition(() => { setIsSubmitting(false); }); return false;
        }
        const requiredFields: (keyof KycSubmissionPayload)[] = [ 'firstName', 'lastName', 'dateOfBirth', 'mobile', 'nationality', 'idType', 'idNumber', 'idIssueDate', 'idExpiryDate' ];
        const missingFields = requiredFields.filter(field => {
             if (field === 'mobile') return !kycData.mobile || !kycData.mobile.countryCode || !kycData.mobile.number;
             if (field === 'idType') return !kycData.idType;
             const value = kycData[field as keyof KycProgressData];
             return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
        });
        if (missingFields.length > 0) {
             const missingLabels = missingFields.map(f => f === 'mobile' ? 'Mobile Number' : f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
             const errorMsg = `Submission Error: Missing required information: ${missingLabels.join(', ')}. Please go back and complete these fields.`;
             console.error(errorMsg); setSubmissionError(errorMsg); alert(errorMsg);
             if (missingLabels.some(l => ['First Name', 'Last Name', 'Date Of Birth', 'Mobile Number'].includes(l))) goToStep('personal');
             else if (missingLabels.includes('Nationality')) goToStep('details');
             else if (missingLabels.some(l => ['Id Type', 'Id Number', 'Id Issue Date', 'Id Expiry Date'].includes(l))) goToStep('identity');
             else if (missingLabels.includes('Front ID Document') || missingLabels.includes('Back ID Document')) goToStep('upload');
             else goToStep('review');
             startTransition(() => { setIsSubmitting(false); }); return false;
        }
        // --- End Validation ---

        // Payload Construction
        const payload: KycSubmissionPayload = {
            firstName: kycData.firstName!, lastName: kycData.lastName!, dateOfBirth: kycData.dateOfBirth!,
            mobile: kycData.mobile!, nationality: kycData.nationality!, idType: kycData.idType!,
            idNumber: kycData.idNumber!, idIssueDate: kycData.idIssueDate!, idExpiryDate: kycData.idExpiryDate!,
            occupation: kycData.occupation || undefined, salaryRange: kycData.salaryRange || null,
        };

        // API Call
        try {
            const response = await kycService.submitKyc(payload, idFrontFile, idBackFile);
            console.log("KycContext: Submission successful, backend status:", response.kyc?.status);

            const newBackendStatus = response.kyc?.status || 'pending';

            startTransition(() => {
                setBackendStatus(newBackendStatus);
                setRejectionReason(null);
                setKycDataInternal({});
                setFileState({ idFrontFile: null, idBackFile: null });
                // Don't set UI step here, let redirection effect handle it based on new status
                // setCurrentUiStepId('pending'); // REMOVED - let effect handle navigation
            });
            localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);

            // ----- CHANGE 7: Refetch Auth user data AFTER successful submission -----
            console.log("KycContext: Triggering AuthContext refetch after successful submission.");
            refetchUser(); // Trigger AuthContext update

            // No explicit navigation here - Effect 2 will handle redirection based on the new 'pending' status

            startTransition(() => { setIsSubmitting(false); }); // Stop submitting state on success
            return true;
        } catch (error: any) {
            console.error("KycContext: Submission failed:", error);
            const errorMsg = error.response?.data?.message || error.message || "An unexpected error occurred during submission.";
            setSubmissionError(errorMsg);
            alert(`Submission Failed: ${errorMsg}`);
            startTransition(() => { setIsSubmitting(false); }); // Stop submitting state on error
            return false;
        }
        // ----- CHANGE 8: Add refetchUser to dependencies -----
    }, [user, kycData, fileState, goToStep, router, pathname, refetchUser]); // Added refetchUser


    // --- Effects ---

    /** Effect 1: Initialization - Handles auth changes and triggers initial KYC fetch */
    useEffect(() => {
        // console.log("KycContext: Init Effect Check. Auth Loading:", authLoading);
        if (authLoading) {
            startTransition(() => {
                setIsInitialized(false);
                setIsLoadingStatus(true);
                setBackendStatus('loading');
            });
            return;
        }

        if (!user) {
            // console.log("KycContext: Init Effect - User not authenticated.");
            startTransition(() => {
                setBackendStatus('unauthenticated');
                setIsInitialized(true);
                setIsLoadingStatus(false);
                setKycDataInternal({});
                setFileState({ idFrontFile: null, idBackFile: null });
                if (localStorage.getItem(KYC_PROGRESS_STORAGE_KEY)) localStorage.removeItem(KYC_PROGRESS_STORAGE_KEY);
            });
            return;
        }

        // console.log("KycContext: Init Effect - User authenticated. Fetching initial status.");
        startTransition(() => {
             setIsInitialized(false); // Mark as not initialized until fetch completes
        });

        fetchKycStatus()
            .then(() => loadPersistedData()) // Load data *after* status is known
            .catch(err => console.error("KycContext: Error in initial fetch/load sequence:", err))
            .finally(() => {
                startTransition(() => setIsInitialized(true));
                // console.log("KycContext: Init Effect - Sequence complete.");
            });

    }, [authLoading, user, fetchKycStatus, loadPersistedData]); // Dependencies trigger re-init on auth change


    /** Effect 2: Redirection Logic - Ensures user is on the correct page based on status */
    useEffect(() => {
        if (authLoading || !isInitialized || isLoadingStatus) {
            // console.log(`KycContext: Redirection Check Deferred - AuthLoading: ${authLoading}, Initialized: ${isInitialized}, KYCStatusLoading: ${isLoadingStatus}`);
            return;
        }

        const isOnFormPage = formStepPaths.includes(pathname);
        const isOnStartPage = pathname === startPagePath;
        const isOnErrorPage = pathname === errorPagePath;
        const isOnLoginPage = pathname.startsWith(loginPagePath);

        // Handle Unauthenticated State
        if (backendStatus === 'unauthenticated') {
            if (!isOnLoginPage && !authLoading) {
               console.log(`KycContext: (Redirect Effect) Backend status unauthenticated (Path: ${pathname}). Ensuring redirect to login.`);
               router.replace(`${loginPagePath}?redirect=${encodeURIComponent(pathname || '/')}`);
           }
           return;
       }

        // --- KYC Status Based Redirection (User is Authenticated) ---
        const targetStatusPath = statusPageMap[backendStatus as KycStatus];
        const isOnSpecificStatusPage = targetStatusPath && pathname === targetStatusPath;
        const isOnAnyStatusPage = statusPagePaths.includes(pathname);

        // console.log(`KycContext: Redirection Check - Path: ${pathname}, Status: ${backendStatus}, TargetStatusPath: ${targetStatusPath}`);

        // 1. Error State -> Error Page
        if (backendStatus === 'error') {
            if (!isOnErrorPage) {
                 console.log(`KycContext: Status is error. Redirecting to error page.`);
                router.replace(errorPagePath);
            }
            return;
        }

        // 2. Final/Status States (Verified, Pending, Rejected) -> Go TO Specific Status Page
        if (targetStatusPath) {
            if (!isOnSpecificStatusPage) {
                console.log(`KycContext: Status is ${backendStatus}. Redirecting to specific status page: ${targetStatusPath}`);
                router.replace(targetStatusPath);
            }
            // Update UI step to match the status page we are on/going to
            // Ensure backendStatus is a valid KycStepId before updating
            const validStatusSteps: KycStepId[] = ['pending', 'rejected', 'verified', 'complete']; // 'verified' and 'complete' might map to the same place
            if (validStatusSteps.includes(backendStatus as KycStepId) && currentUiStepId !== backendStatus) {
                updateCurrentUiStepId(backendStatus as KycStepId);
            }
            return; // Stop processing
        }

        // 3. Not Started / Skipped State -> Allow on Start or Form pages. Redirect AWAY from Status pages.
        if (backendStatus === 'not_started' || backendStatus === 'skipped') {
            if (isOnAnyStatusPage && !isOnErrorPage) { // On pending/rejected/verified page?
                console.log(`KycContext: Status is ${backendStatus} (Path: ${pathname}, which is a status page). Redirecting TO start page.`);
                router.replace(startPagePath);
                if (currentUiStepId !== 'start') updateCurrentUiStepId('start');
                return;
            }

           // --- FIX IS HERE ---
           // If on a form page, update the UI step to match the current path if needed
           const possibleStep = pathname.split('/').pop();
           // Check if it's a form page AND the extracted step is one of the valid form steps
           if (isOnFormPage && possibleStep && formStepOrder.some(s => s === possibleStep)) {
               // Now TypeScript knows possibleStep is one of the formStepOrder types
               const validFormStep = possibleStep as (typeof formStepOrder)[number];
               if (currentUiStepId !== validFormStep) {
                   updateCurrentUiStepId(validFormStep);
               }
           } else if (isOnStartPage && currentUiStepId !== 'start') {
                updateCurrentUiStepId('start');
           }
           return; // Stop processing
       }

         // 4. Fallback (Should be rare) -> Go TO Start Page
         if (!isOnStartPage && !isOnErrorPage && !isOnFormPage && !isOnAnyStatusPage && !isOnLoginPage) {
            console.warn(`KycContext: Reached fallback redirection. Status: ${backendStatus}, Path: ${pathname}. Redirecting to Start.`);
            router.replace(startPagePath);
       }

   }, [authLoading, user, backendStatus, isInitialized, isLoadingStatus, pathname, router, currentUiStepId, updateCurrentUiStepId]);


    // --- Memoized Context Value ---
    // ----- CHANGE 9: Ensure callbacks with new dependency are in value -----
    const value = useMemo<KycContextType>(() => ({
        currentUiStepId, kycData, fileState, backendStatus, rejectionReason,
        isInitialized,
        isAuthLoading: authLoading,
        isLoadingStatus,
        isSubmitting,
        setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, startKycFlow,
        fetchKycStatus, resetKycProgress, submitKycData // These now depend on refetchUser implicitly via useCallback
    }), [
        currentUiStepId, kycData, fileState, backendStatus, rejectionReason,
        isInitialized, authLoading, isLoadingStatus, isSubmitting,
        setKycData, setFile, updateCurrentUiStepId, goToStep, nextStep, prevStep, startKycFlow,
        fetchKycStatus, resetKycProgress, submitKycData // Include the updated callbacks
    ]);

    // --- Render Provider ---
     if (authLoading) { return <LoadingOverlay message="Loading Session..." />; }
     // Show KYC loading only if authenticated, initialized, and status is actually loading
     if (user && isInitialized && isLoadingStatus) { return <LoadingOverlay message="Loading KYC Status..." />; }
     // Handle error state UI (redirect effect navigates, show overlay during transition)
     if (user && isInitialized && backendStatus === 'error' && pathname !== errorPagePath) { return <LoadingOverlay message="Error Loading KYC..." />; }

     // Render children when conditions are met
     if ((!user && isInitialized) || (user && isInitialized && !isLoadingStatus)) {
         return (
             <KycContext.Provider value={value}>
                 {isSubmitting && (
                     <div className="fixed inset-0 z-[210] flex justify-center items-center bg-black/60 backdrop-blur-sm" role="alertdialog" aria-live="assertive" aria-busy="true" aria-label="Submitting KYC information">
                         <div className="text-center text-white p-6 bg-card rounded-lg shadow-lg border border-primary">
                             <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 mx-auto" />
                             <p className="text-xl font-semibold text-foreground">Submitting Information...</p>
                             <p className="text-sm text-muted-foreground">Please wait...</p>
                         </div>
                     </div>
                 )}
                 {children}
             </KycContext.Provider>
         );
     }
     // Fallback / Intermediate Loading State
     return <LoadingOverlay message="Initializing KYC..." />;
};

//--------------------------------------------------
// Hook for Consuming Context
//--------------------------------------------------

export const useKyc = (): KycContextType => {
    const context = useContext(KycContext);
    if (context === undefined) {
        throw new Error('useKyc must be used within a KycProvider');
    }
    return context;
};