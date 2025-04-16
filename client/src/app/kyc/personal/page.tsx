// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label"; // Still needed for custom layout (Mobile Number)
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Form, // *** RESTORED ***
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// // Icons
// import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

// // App specific imports
// import { useKyc } from '../../contexts/KycContext'; // Ensure path is correct
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // Zod schema (remains the same)
// const personalDetailsSchema = z.object({
//     firstName: z.string().min(1, { message: 'First name is required' }),
//     lastName: z.string().min(1, { message: 'Last name is required' }),
//     dateOfBirth: z.date({
//         required_error: "Date of birth is required.",
//         invalid_type_error: "That's not a valid date!",
//     }).max(new Date(), { message: "Date of birth must be in the past" }),
//     mobileCountryCode: z.string().min(1, { message: 'Code is required' }).max(5, { message: 'Too long' }),
//     mobileNumber: z.string().min(5, { message: 'Valid mobile number required' }),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// export default function KycPersonalPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const { kycData, setKycData, nextStep, goToStep } = useKyc();
//     const [isLoading, setIsLoading] = useState(true);
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // useForm hook remains the same
//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: { /* ... as before ... */
//             firstName: kycData.firstName || '',
//             lastName: kycData.lastName || '',
//             dateOfBirth: kycData.dateOfBirth ? new Date(kycData.dateOfBirth) : undefined,
//             mobileCountryCode: kycData.mobile?.countryCode || '+1',
//             mobileNumber: kycData.mobile?.number || '',
//         },
//     });

//     // useEffect for fetching details remains the same
//     useEffect(() => {
//         if (authLoading) {
//             setIsLoading(true); return;
//         }
//         const fetchDetails = async () => { /* ... fetch logic as before ... */
//             setIsLoading(true);
//             setFormError(null);
//             try {
//                 const details = await kycService.getMyKycDetails();
//                 const newDefaultValues: Partial<PersonalDetailsFormData> = {};
//                  if (details && details.status !== 'not_started') {
//                     newDefaultValues.firstName = details.firstName || '';
//                     newDefaultValues.lastName = details.lastName || '';
//                     newDefaultValues.dateOfBirth = details.dateOfBirth ? new Date(details.dateOfBirth) : undefined;
//                     newDefaultValues.mobileCountryCode = details.mobile?.countryCode || '+1';
//                     newDefaultValues.mobileNumber = details.mobile?.number || '';
//                     setKycData({ /* ... */ });
//                  } else if (user && user.fullName) {
//                     const nameParts = user.fullName.split(' ');
//                     newDefaultValues.firstName = nameParts[0] || '';
//                     newDefaultValues.lastName = nameParts.slice(1).join(' ') || '';
//                     newDefaultValues.mobileCountryCode = newDefaultValues.mobileCountryCode || '+1';
//                     newDefaultValues.mobileNumber = newDefaultValues.mobileNumber || '';
//                 } else {
//                      newDefaultValues.firstName = newDefaultValues.firstName || '';
//                      newDefaultValues.lastName = newDefaultValues.lastName || '';
//                      newDefaultValues.mobileCountryCode = newDefaultValues.mobileCountryCode || '+1';
//                      newDefaultValues.mobileNumber = newDefaultValues.mobileNumber || '';
//                  }
//                  form.reset(newDefaultValues);
//             } catch (error: any) {
//                 console.error("fetchDetails: Failed:", error);
//                 setFormError(`Could not load details: ${error.message}.`);
//             } finally {
//                 setIsLoading(false);
//             }
//          };
//         fetchDetails();
//         goToStep('personal');
//     }, [authLoading, user, form.reset, setKycData, goToStep]);

//     // Handle Form Submission (Navigation logic fix applied here)
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         let proceedToNext = false;
//         try {
//             setIsSubmitting(true);
//             setFormError(null);
//             console.log("Step 1 Saving Data:", data);
//             setKycData({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 dateOfBirth: data.dateOfBirth.toISOString(),
//                 mobile: {
//                     countryCode: data.mobileCountryCode,
//                     number: data.mobileNumber,
//                 },
//             });
//             proceedToNext = true;
//         } catch (error) {
//             console.error("Error saving progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false); // Set false only on error
//         }

//         if (proceedToNext) {
//             nextStep(); // Navigate via context
//             // If navigation happens, unmounting should handle cleanup.
//             // If for some reason you stayed on the page, you'd need:
//             // setIsSubmitting(false);
//         }
//     };

//     // Handle Skip (remains the same)
//     const handleSkip = async () => { /* ... as before ... */
//          if (!confirm("Are you sure?")) return;
//         setIsSubmitting(true); setFormError(null);
//         try { await kycService.skipKyc(); await refetchUser(); router.push('/dashboard'); }
//         catch (err: any) { setFormError(err.message); setIsSubmitting(false); }
//     };

//     // Loading state render (remains the same)
//     if (isLoading) {
//         return ( <div className="flex justify-center items-center min-h-[300px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Loading...</span></div> );
//     }

//     // Main Form Render
//     return (
//          <Card className="w-full max-w-2xl mx-auto">
//              <CardHeader>
//                 <CardTitle className="text-xl">Personal Details</CardTitle>
//                 <CardDescription>Enter your information exactly as it appears on your government-issued ID.</CardDescription>
//             </CardHeader>
//              <CardContent>
//                  {formError && <p className="mb-4 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{formError}</p>}

//                  {/* *** RESTORED Shadcn <Form> Wrapper *** */}
//                 <Form {...form}>
//                     {/* Pass handleSubmit to the actual form element */}
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         {/* FormFields remain the same */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="Enter first name" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                             <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Enter last name" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                         </div>
//                          <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                                 <FormLabel>Date of Birth</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear()} /></PopoverContent>
//                                 </Popover>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />
//                          <div className="space-y-1">
//                              {/* Use Shadcn FormLabel here too for consistency if desired */}
//                              <Label>Mobile Number</Label>
//                              <div className="flex items-start gap-2">
//                                 <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (<FormItem className="w-1/4 shrink-0"><FormControl><Input placeholder="+1" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                                 <FormField control={form.control} name="mobileNumber" render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input type="tel" placeholder="Enter mobile number" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                             </div>
//                         </div>
//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700 mt-8">
//                             <Button type="button" variant="outline" onClick={handleSkip} disabled={isSubmitting}> Skip for Now </Button>
//                             <Button type="submit" disabled={isSubmitting}> {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Continue </Button>
//                         </div>
//                     </form>
//                  </Form> {/* *** END Shadcn <Form> Wrapper *** */}
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// // Icons
// import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

// // App specific imports
// import { useKyc } from '../../contexts/KycContext'; // Ensure path is correct
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // Zod schema
// const personalDetailsSchema = z.object({
//     firstName: z.string().min(1, { message: 'First name is required' }),
//     lastName: z.string().min(1, { message: 'Last name is required' }),
//     dateOfBirth: z.date({ required_error: "Date of birth is required." /* ... */ }).max(new Date(), { message: "Date of birth must be in the past" }),
//     mobileCountryCode: z.string().min(1, { message: 'Code is required' }).max(5, { message: 'Too long' }),
//     mobileNumber: z.string().min(5, { message: 'Valid mobile number required' }),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// export default function KycPersonalPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const { kycData, setKycData, nextStep, goToStep } = useKyc(); // nextStep now handles navigation
//     const [isLoading, setIsLoading] = useState(true);
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: { /* ... */
//              firstName: kycData.firstName || '',
//             lastName: kycData.lastName || '',
//             dateOfBirth: kycData.dateOfBirth ? new Date(kycData.dateOfBirth) : undefined,
//             mobileCountryCode: kycData.mobile?.countryCode || '+1',
//             mobileNumber: kycData.mobile?.number || '',
//         },
//     });

//     // useEffect for fetching details (remains mostly the same)
//     useEffect(() => {
//         if (authLoading) { setIsLoading(true); return; }
//         const fetchDetails = async () => {
//             setIsLoading(true); setFormError(null);
//             try {
//                 const details = await kycService.getMyKycDetails();
//                 const newDefaultValues: Partial<PersonalDetailsFormData> = {};
//                  if (details && details.status !== 'not_started') {
//                     newDefaultValues.firstName = details.firstName || '';
//                     newDefaultValues.lastName = details.lastName || '';
//                     newDefaultValues.dateOfBirth = details.dateOfBirth ? new Date(details.dateOfBirth) : undefined;
//                     newDefaultValues.mobileCountryCode = details.mobile?.countryCode || '+1';
//                     newDefaultValues.mobileNumber = details.mobile?.number || '';
//                     // It's often better to let context be the source of truth,
//                     // but pre-filling context here is okay too if needed elsewhere.
//                     // setKycData({ ... });
//                  } else if (user && user.fullName) {
//                     const nameParts = user.fullName.split(' ');
//                     newDefaultValues.firstName = nameParts[0] || '';
//                     newDefaultValues.lastName = nameParts.slice(1).join(' ') || '';
//                     newDefaultValues.mobileCountryCode = newDefaultValues.mobileCountryCode || '+1';
//                     newDefaultValues.mobileNumber = newDefaultValues.mobileNumber || '';
//                  } else { /* ... set minimal defaults ... */
//                      newDefaultValues.firstName = newDefaultValues.firstName || '';
//                      newDefaultValues.lastName = newDefaultValues.lastName || '';
//                      newDefaultValues.mobileCountryCode = newDefaultValues.mobileCountryCode || '+1';
//                      newDefaultValues.mobileNumber = newDefaultValues.mobileNumber || '';
//                  }
//                  form.reset(newDefaultValues);
//             } catch (error: any) { setFormError(`Could not load details: ${error.message}.`); }
//             finally { setIsLoading(false); }
//          };
//         fetchDetails();
//         // It might be better to set the current step based on the loaded data
//         // or when navigating *to* the page, rather than inside this effect.
//         // For now, keeping it simple:
//         goToStep('personal'); // Set step marker for stepper UI
//     }, [authLoading, user, form.reset, setKycData, goToStep]); // Note: setKycData might cause loops if not careful


//     // *** Simplified onSubmit ***
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         try {
//             setIsSubmitting(true); // Show loading indicator
//             setFormError(null);
//             console.log("Step 1 Saving Data:", data);

//             // Update context state synchronously
//             setKycData({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 dateOfBirth: data.dateOfBirth.toISOString(),
//                 mobile: {
//                     countryCode: data.mobileCountryCode,
//                     number: data.mobileNumber,
//                 },
//             });

//             // Trigger navigation via context function
//             // This will internally call router.push
//             nextStep();

//             // Let the navigation handle the state. If navigation is successful,
//             // this component unmounts, and isSubmitting state is gone.
//             // If navigation fails, the user stays here, and we need to handle it.
//             // For now, assume navigation works. Consider adding error handling
//             // to nextStep/goToStep if needed.

//         } catch (error) {
//             console.error("Error saving progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false); // Reset loading state *only on error*
//         }
//         // No finally block needed here to reset isSubmitting if navigation occurs
//     };

//     // Handle Skip (remains the same)
//     const handleSkip = async () => { /* ... as before ... */
//         if (!confirm("Are you sure?")) return;
//         setIsSubmitting(true); setFormError(null);
//         try { await kycService.skipKyc(); await refetchUser(); router.push('/dashboard'); }
//         catch (err: any) { setFormError(err.message); setIsSubmitting(false); }
//     };

//     // Loading state render
//     if (isLoading) {
//         return ( <div className="flex justify-center items-center min-h-[300px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Loading...</span></div> );
//     }

//     // Main Form Render (Structure remains the same)
//     return (
//          <Card className="w-full max-w-2xl mx-auto">
//              <CardHeader>
//                 <CardTitle className="text-xl">Personal Details</CardTitle>
//                 <CardDescription>Enter your information exactly as it appears on your government-issued ID.</CardDescription>
//             </CardHeader>
//              <CardContent>
//                  {formError && <p className="mb-4 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{formError}</p>}
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                        {/* ... FormFields ... */}
//                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="Enter first name" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Enter last name" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                        </div>
//                        <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                            <FormItem className="flex flex-col">
//                                <FormLabel>Date of Birth</FormLabel>
//                                <Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear()} /></PopoverContent></Popover>
//                                <FormMessage />
//                            </FormItem>
//                        )} />
//                        <div className="space-y-1">
//                            <Label>Mobile Number</Label>
//                            <div className="flex items-start gap-2">
//                                <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (<FormItem className="w-1/4 shrink-0"><FormControl><Input placeholder="+1" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                                <FormField control={form.control} name="mobileNumber" render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input type="tel" placeholder="Enter mobile number" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                            </div>
//                        </div>
//                        {/* Navigation Buttons */}
//                        <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700 mt-8">
//                            <Button type="button" variant="outline" onClick={handleSkip} disabled={isSubmitting}> Skip for Now </Button>
//                            {/* Button type is submit, handled by form's onSubmit */}
//                            <Button type="submit" disabled={isSubmitting}> {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Continue </Button>
//                        </div>
//                     </form>
//                 </Form>
//             </CardContent>
//         </Card>
//     );
// }



// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, subYears, startOfDay } from "date-fns";
// import { cn } from "@/lib/utils";
// // --- Correct v2 Import ---
// import * as countryCodes from 'country-codes-list'; // <-- Use namespace import for v2+

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
// } from "@/components/ui/command";
// import { Check, ChevronsUpDown, Calendar as CalendarIcon, Loader2, User, Phone, AlertTriangle } from 'lucide-react';

// // App specific imports
// import { useKyc } from '../../contexts/KycContext';
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // Zod schema remains the same
// const personalDetailsSchema = z.object({
//     firstName: z.string().trim().min(1, { message: 'First name is required' }),
//     lastName: z.string().trim().min(1, { message: 'Last name is required' }),
//     dateOfBirth: z.date({
//         required_error: "Date of birth is required.",
//         invalid_type_error: "Invalid date!",
//     })
//     .max(startOfDay(subYears(new Date(), 18)), { message: "You must be at least 18 years old" })
//     .min(new Date("1900-01-01"), { message: "Date of birth seems too old" }),
//     mobileCountryCode: z.string().trim().min(1, { message: 'Code is required' }).regex(/^\+\d{1,4}$/, {message: 'Invalid code format (e.g., +1, +44)'}),
//     mobileNumber: z.string().trim().min(5, { message: 'Valid mobile number required' }).regex(/^\d{5,}$/, {message: 'Enter numbers only'}),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// type CountryCodeOption = {
//     value: string; // e.g., "+1"
//     label: string; // e.g., "United States (+1)" - This will be unique
// };

// export default function KycPersonalPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const {
//         kycData,
//         setKycData,
//         nextStep,
//         updateCurrentUiStepId,
//         isInitialized,
//         resetKycProgress
//      } = useKyc();
//     const [isPageLoading, setIsPageLoading] = useState(true);
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: {
//             firstName: '', lastName: '', dateOfBirth: undefined,
//             mobileCountryCode: '+1',
//             mobileNumber: '',
//         },
//         mode: 'onChange',
//     });

//     // Prepare Country Code Options using the correct import
//     const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//         // --- Use the imported namespace 'countryCodes' ---
//         const codesObject = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
//         return Object.entries(codesObject)
//             .map(([name, code]) => ({
//                 value: code, // The code itself (e.g., "+1", "+44") - can be duplicate
//                 label: `${name} (${code})`, // Label including name (e.g., "United States (+1)") - should be unique
//             }))
//              // Optional: Filter out entries without a valid code or name if needed (defensive coding)
//             .filter(option => option.value && option.value !== '+' && option.label && option.label.trim() !== `(${option.value})`)
//             .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically by label
//     }, []);


//     // Effect to set the current step in the context
//      useEffect(() => {
//         if (isInitialized && typeof updateCurrentUiStepId === 'function') {
//              updateCurrentUiStepId('personal');
//         } else if (isInitialized) {
//             // console.warn("PersonalPage: KycContext initialized, but updateCurrentUiStepId is not available or not a function.");
//         }
//     }, [isInitialized, updateCurrentUiStepId]);

//     // Effect to load initial/persisted data
//     useEffect(() => {
//         if (!isInitialized || authLoading) {
//             setIsPageLoading(true);
//             return;
//         }
//         setIsPageLoading(true);
//         let initialValues: Partial<PersonalDetailsFormData> = {};

//         if (kycData && Object.keys(kycData).length > 0 && kycData.firstName !== undefined) {
//             initialValues = {
//                 firstName: kycData.firstName || '',
//                 lastName: kycData.lastName || '',
//                 dateOfBirth: kycData.dateOfBirth ? new Date(kycData.dateOfBirth) : undefined,
//                 mobileCountryCode: kycData.mobile?.countryCode || '+1',
//                 mobileNumber: kycData.mobile?.number || '',
//             };
//             if (initialValues.dateOfBirth && isNaN(initialValues.dateOfBirth.getTime())) {
//                  initialValues.dateOfBirth = undefined;
//             }
//         } else if (user && (!initialValues.firstName || !initialValues.lastName)) {
//             const nameParts = user.fullName.trim().split(' ');
//             initialValues.firstName = initialValues.firstName || nameParts[0] || '';
//             initialValues.lastName = initialValues.lastName || nameParts.slice(1).join(' ') || '';
//             initialValues.mobileCountryCode = initialValues.mobileCountryCode || '+1';
//             initialValues.mobileNumber = initialValues.mobileNumber || '';
//             initialValues.dateOfBirth = initialValues.dateOfBirth || undefined;
//         }

//         const defaultCode = initialValues.mobileCountryCode || '+1';
//         if (!countryCodeOptions.some(opt => opt.value === defaultCode)) {
//             initialValues.mobileCountryCode = '+1';
//         } else {
//              initialValues.mobileCountryCode = defaultCode;
//         }

//         form.reset(initialValues);
//         setIsPageLoading(false);

//     }, [isInitialized, authLoading, user, kycData.firstName, kycData.lastName, kycData.dateOfBirth, kycData.mobile, form.reset, countryCodeOptions]);


//     // Handle Form Submission
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         setIsSubmitting(true);
//         setFormError(null);
//         console.log("Step 1 (Personal) Saving Data:", data);
//         try {
//             setKycData({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 dateOfBirth: data.dateOfBirth.toISOString(),
//                 mobile: {
//                     countryCode: data.mobileCountryCode,
//                     number: data.mobileNumber,
//                 },
//             });
//             nextStep();
//         } catch (error) {
//             console.error("Error saving personal details progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false);
//         }
//     };

//     // Handle Skip for Now action
//     const handleSkip = async () => {
//          if (!confirm("Are you sure? Skipping verification will limit account features.")) return;
//         setIsSubmitting(true);
//         setFormError(null);
//         try {
//             console.log("Attempting to skip KYC...");
//             await kycService.skipKyc();
//             await refetchUser();
//             resetKycProgress();
//             router.push('/dashboard');
//         } catch (err: any) {
//             console.error("Error skipping KYC:", err);
//             setFormError(err.message || "Could not skip verification. Please try again.");
//              setIsSubmitting(false);
//         }
//     };

//     if (isPageLoading || authLoading || !isInitialized) {
//         return (
//              <div className="flex justify-center items-center min-h-[300px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  <span className="ml-2 text-muted-foreground">Loading details...</span>
//              </div>
//          );
//     }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     <User className="h-6 w-6 text-primary" />
//                     Personal Details
//                 </CardTitle>
//                 <CardDescription>Enter your information exactly as it appears on your government-issued ID.</CardDescription>
//             </CardHeader>
//             <CardContent>
//                  {formError && (
//                     <div role="alert" className="mb-4 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/30 flex items-center gap-2">
//                         <AlertTriangle className="h-4 w-4"/> {formError}
//                      </div>
//                   )}

//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         {/* First Name and Last Name */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//                             <FormField control={form.control} name="firstName" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>First Name *</FormLabel>
//                                     <FormControl><Input placeholder="e.g., Jane" {...field} /></FormControl>
//                                     <FormMessage />
//                                 </FormItem>)}
//                             />
//                             <FormField control={form.control} name="lastName" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Last Name *</FormLabel>
//                                     <FormControl><Input placeholder="e.g., Doe" {...field} /></FormControl>
//                                     <FormMessage />
//                                 </FormItem>)}
//                             />
//                         </div>

//                         {/* Date of Birth */}
//                          <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                                 <FormLabel>Date of Birth *</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <FormControl>
//                                             <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
//                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                 {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                             </Button>
//                                         </FormControl>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0" align="start">
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value}
//                                             onSelect={(date) => {
//                                                 field.onChange(date);
//                                                 form.trigger("dateOfBirth");
//                                             }}
//                                             disabled={(date) =>
//                                                 date > startOfDay(subYears(new Date(), 18)) || date < new Date("1900-01-01")
//                                             }
//                                             initialFocus
//                                             defaultMonth={field.value || subYears(new Date(), 30)}
//                                             fromYear={1900}
//                                             toYear={new Date().getFullYear() - 18}
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <FormDescription>You must be 18 years or older.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                          )} />

//                         {/* Mobile Number with Combobox for Country Code */}
//                          <div className="space-y-2">
//                              <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
//                              <div className="flex items-start gap-2">
//                                 <FormField
//                                     control={form.control}
//                                     name="mobileCountryCode"
//                                     render={({ field }) => (
//                                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                                         <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
//                                             <PopoverTrigger asChild>
//                                                 <FormControl>
//                                                     <Button
//                                                         variant="outline"
//                                                         role="combobox"
//                                                         aria-expanded={countryCodePopoverOpen}
//                                                         className={cn(
//                                                             "w-full justify-between",
//                                                             !field.value && "text-muted-foreground"
//                                                         )}
//                                                     >
//                                                         {field.value
//                                                           ? countryCodeOptions.find(
//                                                               (option) => option.value === field.value
//                                                             )?.value // Display just the code in the button
//                                                           : "Code"}
//                                                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                     </Button>
//                                                 </FormControl>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-[300px] p-0">
//                                                 <Command>
//                                                     <CommandInput placeholder="Search country..." />
//                                                     <CommandList>
//                                                         <CommandEmpty>No country found.</CommandEmpty>
//                                                         <CommandGroup>
//                                                             {countryCodeOptions.map((option) => (
//                                                                 <CommandItem
//                                                                     // --- FIX: Use the unique label as the key ---
//                                                                     key={option.label}
//                                                                     value={option.label} // Search is performed against this label
//                                                                     onSelect={() => {
//                                                                         form.setValue("mobileCountryCode", option.value); // Set the code value
//                                                                         form.trigger("mobileCountryCode");
//                                                                         setCountryCodePopoverOpen(false);
//                                                                     }}
//                                                                 >
//                                                                     <Check
//                                                                         className={cn(
//                                                                             "mr-2 h-4 w-4",
//                                                                             option.value === field.value
//                                                                                 ? "opacity-100" // Still check against the actual value for the checkmark
//                                                                                 : "opacity-0"
//                                                                         )}
//                                                                     />
//                                                                     {option.label} {/* Display the full label in the list */}
//                                                                 </CommandItem>
//                                                             ))}
//                                                         </CommandGroup>
//                                                     </CommandList>
//                                                 </Command>
//                                             </PopoverContent>
//                                         </Popover>
//                                         <FormMessage />
//                                     </FormItem>
//                                     )}
//                                 />
//                                 <FormField control={form.control} name="mobileNumber" render={({ field }) => (
//                                     <FormItem className="flex-grow">
//                                         <FormControl><Input type="tel" inputMode="numeric" placeholder="Enter mobile number" {...field} /></FormControl>
//                                         <FormMessage />
//                                     </FormItem>)}
//                                 />
//                             </div>
//                              <FormDescription>Used for verification and communication.</FormDescription>
//                         </div>
//                          {/* --- End Mobile Number Section --- */}


//                         {/* Navigation Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-gray-700 mt-8 gap-4">
//                              {(user?.kycStatus === 'not_started' || user?.kycStatus === 'rejected') ? (
//                                  <Button type="button" variant="ghost" onClick={handleSkip} disabled={isSubmitting} className="text-muted-foreground hover:text-foreground">
//                                      Skip for Now
//                                  </Button>
//                              ) : <div/> }

//                             <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
//                                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                                 Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//             </CardContent>
//         </Card>
//     );
// }



// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, subYears, startOfDay, isValid as isDateValid, parseISO } from "date-fns";
// import { cn } from "@/lib/utils";
// import * as countryCodes from 'country-codes-list';

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Check, ChevronsUpDown, Calendar as CalendarIcon, Loader2, User, Phone, AlertTriangle, ArrowRight } from 'lucide-react';

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // --- Zod Validation Schema ---
// const personalDetailsSchema = z.object({
//     firstName: z.string().trim().min(1, { message: 'First name is required' }).max(100, { message: 'First name cannot exceed 100 characters' }),
//     lastName: z.string().trim().min(1, { message: 'Last name is required' }).max(100, { message: 'Last name cannot exceed 100 characters' }),
//     dateOfBirth: z.date({ required_error: "Date of birth is required.", invalid_type_error: "Please enter a valid date." })
//         .max(startOfDay(subYears(new Date(), 18)), { message: "You must be at least 18 years old." })
//         .min(new Date("1900-01-01"), { message: "Date of birth seems incorrect (before 1900)." }),
//     mobileCountryCode: z.string().trim().min(2, { message: 'Code required' }).regex(/^\+\d{1,4}$/, {message: 'Invalid format (e.g., +1, +44)'}),
//     mobileNumber: z.string().trim().min(5, { message: 'Minimum 5 digits required' }).max(15, { message: 'Maximum 15 digits allowed' }).regex(/^\d+$/, {message: 'Enter only numbers'}),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
// type CountryCodeOption = { value: string; label: string; };
// const DEFAULT_COUNTRY_CODE = '+1';

// // --- Component ---
// export default function KycPersonalPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const {
//         kycData, setKycData, nextStep, updateCurrentUiStepId, goToStep,
//         isInitialized: kycInitialized, backendStatus, resetKycProgress
//      } = useKyc();

//     const [isPageLoading, setIsPageLoading] = useState(true);
//     const [formActionError, setFormActionError] = useState<string | null>(null);
//     const [isSubmittingForm, setIsSubmittingForm] = useState(false);
//     const [isSkipping, setIsSkipping] = useState(false);
//     const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' },
//         mode: 'onChange',
//     });

//     const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//         try {
//             const codesObject = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
//             return Object.entries(codesObject)
//                 .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
//                 .filter(option => option.value && option.value !== '+' && option.label && option.label.trim() !== `(${option.value})`)
//                  .sort((a, b) => a.label.localeCompare(b.label));
//         } catch (error) { console.error("Error generating country code list:", error); return [{ value: '+1', label: 'United States (+1)' }]; }
//     }, []);

//     // Effect 1: Set UI step
//     useEffect(() => { if (kycInitialized) updateCurrentUiStepId('personal'); }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Load initial/persisted data
//     useEffect(() => {
//         if (!kycInitialized || authLoading) { setIsPageLoading(true); return; }
//         if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//             setIsPageLoading(false); return;
//         }
//         setIsPageLoading(true);
//         let initialValues: Partial<PersonalDetailsFormData> = {};
//         if (kycData && Object.keys(kycData).length > 0 && (kycData.firstName || kycData.lastName)) {
//             const parsedDate = kycData.dateOfBirth ? parseISO(kycData.dateOfBirth) : undefined;
//             initialValues = { firstName: kycData.firstName || '', lastName: kycData.lastName || '', dateOfBirth: parsedDate && isDateValid(parsedDate) ? parsedDate : undefined, mobileCountryCode: kycData.mobile?.countryCode || DEFAULT_COUNTRY_CODE, mobileNumber: kycData.mobile?.number || '' };
//         } else if (user && backendStatus === 'not_started') {
//             const nameParts = user.fullName?.trim().split(' ') || [];
//             initialValues = { firstName: nameParts[0] || '', lastName: nameParts.slice(1).join(' ') || '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' };
//         } else { initialValues = { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' }; }
//         const finalCountryCode = initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
//         initialValues.mobileCountryCode = countryCodeOptions.some(opt => opt.value === finalCountryCode) ? finalCountryCode : DEFAULT_COUNTRY_CODE;
//         form.reset(initialValues);
//         setIsPageLoading(false);
//     }, [kycInitialized, authLoading, user, backendStatus, kycData, form.reset, countryCodeOptions]);

//     // --- Event Handlers ---
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         setIsSubmittingForm(true); setFormActionError(null);
//         try { setKycData({ firstName: data.firstName, lastName: data.lastName, dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"), mobile: { countryCode: data.mobileCountryCode, number: data.mobileNumber } }); nextStep();
//         } catch (error: any) { console.error("PersonalPage: Error saving progress:", error); setFormActionError(error.message || "Failed to save progress."); setIsSubmittingForm(false); }
//     };
//     const handleSkip = async () => {
//          if (!confirm("Are you sure you want to skip identity verification for now? Some account features will be limited.")) return;
//         setIsSkipping(true); setFormActionError(null);
//         try { await kycService.skipKyc(); await refetchUser(); } catch (err: any) { console.error("PersonalPage: Error skipping KYC:", err); setFormActionError(err.message || "Could not skip verification."); setIsSkipping(false); }
//     };

//     // --- Render Logic ---
//     if (isPageLoading || authLoading || !kycInitialized) { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> ); }
//     if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Updating status...</span></div> ); }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2"><User className="h-6 w-6 text-primary" /> Personal Details (Step {formStepOrder.indexOf('personal') + 1} of {formStepOrder.length})</CardTitle>
//                 <CardDescription>Enter your legal name and date of birth exactly as they appear on your ID. Provide a valid mobile number.</CardDescription>
//             </CardHeader>
//             <CardContent className="p-6 md:p-8">
//                  {formActionError && ( <Alert variant="destructive" className="mb-6"> <AlertTriangle className="h-4 w-4" /> <AlertTitle>Action Failed</AlertTitle> <AlertDescription>{formActionError}</AlertDescription> </Alert> )}
//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         {/* First Name & Last Name Fields */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//                            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Legal First Name *</FormLabel><FormControl><Input placeholder="e.g., Jane" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Legal Last Name *</FormLabel><FormControl><Input placeholder="e.g., Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                         </div>

//                         {/* Date of Birth Field */}
//                         <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                                 <FormLabel>Date of Birth *</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                          {/* ***** FIX: Removed FormControl wrapper ***** */}
//                                         <Button
//                                             variant={"outline"}
//                                             className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
//                                         >
//                                             <CalendarIcon className="mr-2 h-4 w-4" />
//                                             {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                         </Button>
//                                          {/* ***** END FIX ***** */}
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0" align="start">
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value && isDateValid(field.value) ? field.value : undefined}
//                                             onSelect={(date) => { field.onChange(date || undefined); form.trigger("dateOfBirth"); }}
//                                             disabled={(date) => date > startOfDay(subYears(new Date(), 18)) || date < new Date("1900-01-01")}
//                                             initialFocus
//                                             defaultMonth={field.value && isDateValid(field.value) ? field.value : subYears(new Date(), 30)}
//                                             captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear() - 18}
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <FormDescription>You must be 18 years or older.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         {/* Mobile Number Fields */}
//                         <div className="space-y-2">
//                              <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
//                              <div className="flex items-start gap-2">
//                                 {/* Country Code */}
//                                 <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (
//                                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                                         <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
//                                             <PopoverTrigger asChild>
//                                                 {/* ***** FIX: Removed FormControl wrapper ***** */}
//                                                 <Button
//                                                     variant="outline" role="combobox" aria-expanded={countryCodePopoverOpen}
//                                                     className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
//                                                     aria-label="Select country calling code"
//                                                 >
//                                                     {field.value ? field.value : "Code"}
//                                                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                 </Button>
//                                                  {/* ***** END FIX ***** */}
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-[300px] p-0">
//                                                 <Command filter={(value, search) => { const option = countryCodeOptions.find(opt => opt.label.toLowerCase() === value.toLowerCase()); if (!option) return 0; const searchTerm = search.toLowerCase(); const isInLabel = option.label.toLowerCase().includes(searchTerm); const codeSearchTerm = searchTerm.startsWith('+') ? searchTerm : searchTerm.replace(/^\+/, ''); const isInCode = option.value.replace(/^\+/, '').includes(codeSearchTerm); return isInLabel || isInCode ? 1 : 0; }}>
//                                                     <CommandInput placeholder="Search country or code..." />
//                                                     <CommandList><CommandEmpty>No country found.</CommandEmpty><CommandGroup>
//                                                         {countryCodeOptions.map((option) => ( <CommandItem key={option.label} value={option.label} onSelect={(currentValue) => { const selectedOption = countryCodeOptions.find(opt => opt.label === currentValue); if (selectedOption) { form.setValue("mobileCountryCode", selectedOption.value, { shouldValidate: true }); } setCountryCodePopoverOpen(false); }}> <Check className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")} /> {option.label} </CommandItem> ))}
//                                                     </CommandGroup></CommandList>
//                                                 </Command>
//                                             </PopoverContent>
//                                         </Popover>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )} />
//                                 {/* Number Input */}
//                                 <FormField control={form.control} name="mobileNumber" render={({ field }) => (
//                                     <FormItem className="flex-grow">
//                                         {/* FormControl is correct here as Input is the control */}
//                                         <FormControl><Input type="tel" inputMode="numeric" placeholder="Enter number" {...field} /></FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )} />
//                              </div>
//                              <FormDescription>Used for verification and important communications.</FormDescription>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-border/50 mt-8 gap-4">
//                              {(backendStatus === 'not_started' || backendStatus === 'rejected') ? ( // <<<--- CONDITION HERE
//                                  <Button type="button" variant="ghost" onClick={handleSkip} disabled={isSubmittingForm || isSkipping} className="text-muted-foreground hover:text-foreground">
//                                      {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                                      Skip for Now
//                                  </Button>
//                              ) : <div/> /* Placeholder for alignment */}
//                             <Button type="submit" disabled={isSubmittingForm || isSkipping || !form.formState.isValid}>
//                                 {isSubmittingForm ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
//                                 Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, subYears, startOfDay, isValid as isDateValid, parseISO } from "date-fns";
// import { cn } from "@/lib/utils";
// import * as countryCodes from 'country-codes-list';

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Check, ChevronsUpDown, Calendar as CalendarIcon, Loader2, User, Phone, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react'; // Added ArrowLeft

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // --- Zod Validation Schema ---
// const personalDetailsSchema = z.object({
//     firstName: z.string().trim().min(1, { message: 'First name is required' }).max(100, { message: 'First name cannot exceed 100 characters' }),
//     lastName: z.string().trim().min(1, { message: 'Last name is required' }).max(100, { message: 'Last name cannot exceed 100 characters' }),
//     dateOfBirth: z.date({ required_error: "Date of birth is required.", invalid_type_error: "Please enter a valid date." })
//         .max(startOfDay(subYears(new Date(), 18)), { message: "You must be at least 18 years old." })
//         .min(new Date("1900-01-01"), { message: "Date of birth seems incorrect (before 1900)." }),
//     mobileCountryCode: z.string().trim().min(2, { message: 'Code required' }).regex(/^\+\d{1,4}$/, {message: 'Invalid format (e.g., +1, +44)'}),
//     mobileNumber: z.string().trim().min(5, { message: 'Minimum 5 digits required' }).max(15, { message: 'Maximum 15 digits allowed' }).regex(/^\d+$/, {message: 'Enter only numbers'}),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
// type CountryCodeOption = { value: string; label: string; };
// const DEFAULT_COUNTRY_CODE = '+1'; // Default or most common code

// // --- Component ---
// export default function KycPersonalPage() {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const {
//         kycData, setKycData, nextStep, prevStep, // Add prevStep
//         updateCurrentUiStepId, goToStep,
//         isInitialized: kycInitialized, backendStatus,
//         fetchKycStatus, isLoadingStatus: kycLoadingStatus // Get loading status
//      } = useKyc();

//     const [isPageLoading, setIsPageLoading] = useState(true); // Controls local loading state
//     const [formActionError, setFormActionError] = useState<string | null>(null);
//     const [isSubmittingForm, setIsSubmittingForm] = useState(false);
//     const [isSkipping, setIsSkipping] = useState(false); // State for skip button
//     const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' },
//         mode: 'onChange',
//     });

//     // Memoize country code options
//     const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//         try {
//             const codesObject = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
//             return Object.entries(codesObject)
//                 .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
//                 .filter(option => option.value && option.value !== '+' && option.label && option.label.trim() !== `(${option.value})`)
//                  .sort((a, b) => a.label.localeCompare(b.label));
//         } catch (error) { console.error("Error generating country code list:", error); return [{ value: '+1', label: 'United States (+1)' }]; }
//     }, []);

//     // Effect 1: Set UI step in context if on the correct page
//     useEffect(() => {
//         if (kycInitialized && pathname === '/kyc/personal') {
//              updateCurrentUiStepId('personal');
//         }
//     }, [kycInitialized, updateCurrentUiStepId, pathname]);

//     // Effect 2: Load initial/persisted data OR pre-fill from user profile
//     useEffect(() => {
//         // Wait for context/auth to be ready
//         if (!kycInitialized || authLoading) {
//             setIsPageLoading(true);
//             return;
//         }

//         // Check if the status allows being on this form page
//         if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//             // If status is pending, verified, etc., rely on context redirection effect
//             // console.log(`PersonalPage: Status is ${backendStatus}, skipping form load. Context should redirect.`);
//             setIsPageLoading(false); // Don't show loading, let context redirect
//             return;
//         }

//         // Proceed with loading form data
//         setIsPageLoading(true);
//         let initialValues: Partial<PersonalDetailsFormData> = {};

//         // Try loading persisted data first (if resuming after rejection/skip with saved progress)
//         const storedData = localStorage.getItem('kycProgressData_v1'); // Using context's key
//         if (storedData && (backendStatus === 'rejected' || backendStatus === 'skipped')) {
//              try {
//                 const parsedData = JSON.parse(storedData);
//                 if (parsedData && typeof parsedData === 'object') {
//                     const parsedDate = parsedData.dateOfBirth ? parseISO(parsedData.dateOfBirth) : undefined;
//                     initialValues = {
//                         firstName: parsedData.firstName || '',
//                         lastName: parsedData.lastName || '',
//                         dateOfBirth: parsedDate && isDateValid(parsedDate) ? parsedDate : undefined,
//                         mobileCountryCode: parsedData.mobile?.countryCode || DEFAULT_COUNTRY_CODE,
//                         mobileNumber: parsedData.mobile?.number || ''
//                     };
//                      console.log("PersonalPage: Loaded persisted data.");
//                 }
//              } catch (e) { console.error("PersonalPage: Failed to parse persisted data", e); }
//         }

//         // If no persisted data OR status is 'not_started', try pre-filling from user profile
//         if (Object.keys(initialValues).length === 0 && user && (backendStatus === 'not_started' || backendStatus === 'skipped')) {
//             const nameParts = user.fullName?.trim().split(' ') || [];
//             initialValues = {
//                 firstName: nameParts[0] || '',
//                 lastName: nameParts.slice(1).join(' ') || '',
//                 dateOfBirth: undefined, // DOB usually not in basic profile
//                 mobileCountryCode: DEFAULT_COUNTRY_CODE, // Use default country code
//                 mobileNumber: '' // Mobile usually not in basic profile or needs confirmation
//             };
//              console.log("PersonalPage: Pre-filled from user profile.");
//         }

//         // Ensure default values if nothing else loaded
//         if (Object.keys(initialValues).length === 0) {
//              initialValues = { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' };
//              console.log("PersonalPage: Using default empty values.");
//         }

//         // Validate and set country code
//         const finalCountryCode = initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
//         initialValues.mobileCountryCode = countryCodeOptions.some(opt => opt.value === finalCountryCode) ? finalCountryCode : DEFAULT_COUNTRY_CODE;

//         // Reset the form with the determined initial values
//         form.reset(initialValues);
//         setIsPageLoading(false);

//     }, [kycInitialized, authLoading, user, backendStatus, form.reset, countryCodeOptions]); // Add form.reset and countryCodeOptions

//     // --- Event Handlers ---
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         setIsSubmittingForm(true); setFormActionError(null);
//         try {
//             // Format date correctly before saving to context
//             const formattedDOB = format(data.dateOfBirth, "yyyy-MM-dd");
//             setKycData({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 dateOfBirth: formattedDOB, // Save as YYYY-MM-DD string
//                 mobile: { countryCode: data.mobileCountryCode, number: data.mobileNumber }
//             });
//              console.log("PersonalPage: Data saved to context. Proceeding to next step.");
//             nextStep(); // Navigate to the next step via context
//         } catch (error: any) {
//             console.error("PersonalPage: Error saving progress:", error);
//             setFormActionError(error.message || "Failed to save progress.");
//              setIsSubmittingForm(false); // Reset submitting state only on error
//         }
//         // Do not reset isSubmittingForm here on success, page navigation will unmount
//     };

//     // Handle Skip (Only available if status is 'not_started')
//     const handleSkip = async () => {
//          if (!confirm("Are you sure you want to skip identity verification for now? Some account features will be limited.")) return;

//          // Double-check status before API call
//          if (backendStatus !== 'not_started') {
//             console.warn(`Attempted to skip KYC when status is '${backendStatus}'. Aborting.`);
//             setFormActionError(`Cannot skip KYC in current status: ${backendStatus}.`);
//             setIsSkipping(false);
//             return;
//          }

//         setIsSkipping(true); setFormActionError(null);
//         try {
//             await kycService.skipKyc();
//             await refetchUser(); // Refetch user data which might include KYC status
//             await fetchKycStatus(true); // Force fetch KYC status to trigger context update/redirect
//             // Context redirection logic should handle moving away (to start page)
//             // Resetting skip state might happen after unmount, which is fine.
//         } catch (err: any) {
//             console.error("PersonalPage: Error skipping KYC:", err);
//             const message = err?.response?.data?.message || err.message || "Could not skip verification.";
//             setFormActionError(message);
//              setIsSkipping(false); // Reset loading state only on error
//         }
//     };

//     // --- Render Logic ---
//     // Show main loading overlay if page is loading data OR context is loading
//     if (isPageLoading || authLoading || !kycInitialized || kycLoadingStatus) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className='ml-2 text-muted-foreground'>Loading Personal Details...</span>
//             </div>
//         );
//     }

//     // If status is definitively finalized (pending, verified, etc.), show loading while context redirects
//     // Keep showing the form for not_started, rejected, skipped
//     if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-2 text-muted-foreground">Checking status ({backendStatus})...</span>
//             </div>
//         );
//     }

//     // --- Render the Form ---
//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     <User className="h-6 w-6 text-primary" /> Personal Details (Step {formStepOrder.indexOf('personal') + 1} of {formStepOrder.length})
//                  </CardTitle>
//                 <CardDescription>Enter your legal name and date of birth exactly as they appear on your ID. Provide a valid mobile number.</CardDescription>
//             </CardHeader>
//             <CardContent className="p-6 md:p-8">
//                  {formActionError && (
//                      <Alert variant="destructive" className="mb-6">
//                          <AlertTriangle className="h-4 w-4" />
//                          <AlertTitle>Action Failed</AlertTitle>
//                          <AlertDescription>{formActionError}</AlertDescription>
//                      </Alert>
//                  )}
//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                          {/* First Name & Last Name Fields */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//                            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Legal First Name *</FormLabel><FormControl><Input placeholder="e.g., Jane" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Legal Last Name *</FormLabel><FormControl><Input placeholder="e.g., Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                         </div>

//                         {/* Date of Birth Field */}
//                         <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                                 <FormLabel>Date of Birth *</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <FormControl>
//                                             <Button
//                                                 variant={"outline"}
//                                                 className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
//                                             >
//                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                 {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                             </Button>
//                                         </FormControl>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0" align="start">
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value && isDateValid(field.value) ? field.value : undefined}
//                                             onSelect={(date) => { field.onChange(date || undefined); form.trigger("dateOfBirth"); }} // Trigger validation on change
//                                             disabled={(date) => date > startOfDay(subYears(new Date(), 18)) || date < new Date("1900-01-01")}
//                                             initialFocus
//                                             defaultMonth={field.value && isDateValid(field.value) ? field.value : subYears(new Date(), 30)} // Sensible default view
//                                             captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear() - 18}
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <FormDescription>You must be 18 years or older.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         {/* Mobile Number Fields */}
//                         <div className="space-y-2">
//                              <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
//                              <div className="flex items-start gap-2">
//                                 {/* Country Code */}
//                                 <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (
//                                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                                         <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
//                                             <PopoverTrigger asChild>
//                                                 <FormControl>
//                                                     <Button
//                                                         variant="outline" role="combobox" aria-expanded={countryCodePopoverOpen}
//                                                         className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
//                                                         aria-label="Select country calling code"
//                                                     >
//                                                         {field.value ? field.value : "Code"}
//                                                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                     </Button>
//                                                 </FormControl>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-[300px] p-0">
//                                                 <Command filter={(value, search) => { /* Custom filter for label and code */ const option = countryCodeOptions.find(opt => opt.label.toLowerCase() === value.toLowerCase()); if (!option) return 0; const searchTerm = search.toLowerCase(); const isInLabel = option.label.toLowerCase().includes(searchTerm); const codeSearchTerm = searchTerm.startsWith('+') ? searchTerm.slice(1) : searchTerm; const isInCode = option.value.slice(1).includes(codeSearchTerm); return isInLabel || isInCode ? 1 : 0; }}>
//                                                     <CommandInput placeholder="Search country or code..." />
//                                                     <CommandList><CommandEmpty>No country found.</CommandEmpty><CommandGroup>
//                                                         {countryCodeOptions.map((option) => ( <CommandItem key={option.label} value={option.label} onSelect={(currentValue) => { const selectedOption = countryCodeOptions.find(opt => opt.label === currentValue); if (selectedOption) { form.setValue("mobileCountryCode", selectedOption.value, { shouldValidate: true }); } setCountryCodePopoverOpen(false); }}> <Check className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")} /> {option.label} </CommandItem> ))}
//                                                     </CommandGroup></CommandList>
//                                                 </Command>
//                                             </PopoverContent>
//                                         </Popover>
//                                         <FormMessage /> {/* Show validation errors for country code */}
//                                     </FormItem>
//                                 )} />
//                                 {/* Number Input */}
//                                 <FormField control={form.control} name="mobileNumber" render={({ field }) => (
//                                     <FormItem className="flex-grow">
//                                         <FormControl><Input type="tel" inputMode="numeric" placeholder="Enter number" {...field} /></FormControl>
//                                         <FormMessage /> {/* Show validation errors for number */}
//                                     </FormItem>
//                                 )} />
//                              </div>
//                              <FormDescription>Used for verification and important communications.</FormDescription>
//                         </div>


//                         {/* Navigation Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-border/50 mt-8 gap-4">
//                              {/* Back Button */}
//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 onClick={prevStep} // Go back using context's prevStep
//                                 disabled={isSubmittingForm || isSkipping}
//                              >
//                                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                              </Button>

//                              {/* Skip Button (Only show if status is 'not_started') */}
//                              {backendStatus === 'not_started' && (
//                                  <Button
//                                      type="button"
//                                      variant="ghost"
//                                      onClick={handleSkip}
//                                      disabled={isSubmittingForm || isSkipping}
//                                      className="text-muted-foreground hover:text-foreground order-first sm:order-none" // Adjust order for mobile
//                                  >
//                                      {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                                      Skip for Now
//                                  </Button>
//                              )}

//                             {/* Continue Button */}
//                             <Button type="submit" disabled={isSubmittingForm || isSkipping || !form.formState.isValid}>
//                                 {isSubmittingForm ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
//                                 Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//             </CardContent>
//         </Card>
//     );
// }

// frontend/src/app/kyc/personal/page.tsx
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, subYears, startOfDay, isValid as isDateValid, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import * as countryCodes from 'country-codes-list';

// --- UI Components ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, ChevronsUpDown, Calendar as CalendarIcon, Loader2, User, Phone, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

// --- App Specific Imports ---
import { useKyc, formStepOrder } from '../../contexts/KycContext';
import { useAuth } from '@/app/contexts/AuthContext';
import kycService from '@/app/services/kyc';

// --- Zod Validation Schema ---
const personalDetailsSchema = z.object({
    firstName: z.string().trim().min(1, { message: 'First name is required' }).max(100, { message: 'First name cannot exceed 100 characters' }),
    lastName: z.string().trim().min(1, { message: 'Last name is required' }).max(100, { message: 'Last name cannot exceed 100 characters' }),
    dateOfBirth: z.date({ required_error: "Date of birth is required.", invalid_type_error: "Please enter a valid date." })
        .max(startOfDay(subYears(new Date(), 18)), { message: "You must be at least 18 years old." })
        .min(new Date("1900-01-01"), { message: "Date of birth seems incorrect (before 1900)." }),
    mobileCountryCode: z.string().trim().min(2, { message: 'Code required' }).regex(/^\+\d{1,4}$/, {message: 'Invalid format (e.g., +1, +44)'}),
    mobileNumber: z.string().trim().min(5, { message: 'Minimum 5 digits required' }).max(15, { message: 'Maximum 15 digits allowed' }).regex(/^\d+$/, {message: 'Enter only numbers'}),
});

type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
type CountryCodeOption = { value: string; label: string; };
const DEFAULT_COUNTRY_CODE = '+1';

// --- Component ---
export default function KycPersonalPage() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading: authLoading, refetchUser } = useAuth();
    const {
        kycData, setKycData, nextStep, prevStep,
        updateCurrentUiStepId, goToStep,
        isInitialized: kycInitialized, backendStatus,
        fetchKycStatus,
        isLoadingStatus: kycLoadingStatus
     } = useKyc();

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [formActionError, setFormActionError] = useState<string | null>(null);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [isSkipping, setIsSkipping] = useState(false);
    const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

    const form = useForm<PersonalDetailsFormData>({
        resolver: zodResolver(personalDetailsSchema),
        defaultValues: { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' },
        mode: 'onChange',
    });

    const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
        try {
            const codesObject = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
            return Object.entries(codesObject)
                .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
                .filter(option => option.value && option.value !== '+' && option.label && option.label.trim() !== `(${option.value})`)
                 .sort((a, b) => a.label.localeCompare(b.label));
        } catch (error) { console.error("Error generating country code list:", error); return [{ value: '+1', label: 'United States (+1)' }]; }
    }, []);

    // Effect 1: Set UI step in context
    useEffect(() => {
        if (kycInitialized && pathname === '/kyc/personal') {
             updateCurrentUiStepId('personal');
        }
    }, [kycInitialized, updateCurrentUiStepId, pathname]);

    // Effect 2: Load initial/persisted data OR pre-fill
    useEffect(() => {
        if (!kycInitialized || authLoading) {
            setIsPageLoading(true); return;
        }
        if (!["not_started", "rejected", "skipped", "loading"].includes(backendStatus as string)) {
             setIsPageLoading(false); return;
        }

        setIsPageLoading(true);
        let initialValues: Partial<PersonalDetailsFormData> = {};
        const parsedDate = kycData.dateOfBirth ? parseISO(kycData.dateOfBirth) : undefined;
        initialValues = {
            firstName: kycData.firstName || '',
            lastName: kycData.lastName || '',
            dateOfBirth: parsedDate && isDateValid(parsedDate) ? parsedDate : undefined,
            mobileCountryCode: kycData.mobile?.countryCode || DEFAULT_COUNTRY_CODE,
            mobileNumber: kycData.mobile?.number || ''
        };

        if (!kycData.firstName && !kycData.lastName && user && (backendStatus === 'not_started' || backendStatus === 'skipped')) {
            const nameParts = user.fullName?.trim().split(' ') || [];
            initialValues.firstName = nameParts[0] || '';
            initialValues.lastName = nameParts.slice(1).join(' ') || '';
        }

        const finalCountryCode = initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
        initialValues.mobileCountryCode = countryCodeOptions.some(opt => opt.value === finalCountryCode) ? finalCountryCode : DEFAULT_COUNTRY_CODE;

        form.reset(initialValues);
        setIsPageLoading(false);

    }, [kycInitialized, authLoading, user, backendStatus, kycData, form.reset, countryCodeOptions]);

    // --- Event Handlers ---
    const onSubmit = useCallback((data: PersonalDetailsFormData) => {
        setIsSubmittingForm(true); setFormActionError(null);
        try {
            const formattedDOB = format(data.dateOfBirth, "yyyy-MM-dd");
            setKycData({
                firstName: data.firstName, lastName: data.lastName, dateOfBirth: formattedDOB,
                mobile: { countryCode: data.mobileCountryCode, number: data.mobileNumber }
            });
            nextStep();
        } catch (error: any) {
            setFormActionError(error.message || "Failed to save progress.");
            setIsSubmittingForm(false);
        }
    }, [setKycData, nextStep]); // Removed form.getValues dependency

    const handleSkip = useCallback(async () => {
         if (!confirm("Skip identity verification for now? Some features will be limited.")) return;
         if (backendStatus !== 'not_started') { setFormActionError("Cannot skip now."); return; }

        setIsSkipping(true); setFormActionError(null);
        try {
            await kycService.skipKyc();
            await refetchUser();
            await fetchKycStatus(true);
            router.push('/dashboard');
        } catch (err: any) {
            setFormActionError(err?.response?.data?.message || err.message || "Skip failed.");
            setIsSkipping(false);
        }
    }, [backendStatus, refetchUser, fetchKycStatus, router]);

    // --- Render Logic ---
    if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
        return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
    }
    if (!["not_started", "rejected", "skipped", "loading"].includes(backendStatus as string)) {
        return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2"> <User className="h-6 w-6 text-primary" /> Personal Details (Step {formStepOrder.indexOf('personal') + 1} of {formStepOrder.length}) </CardTitle>
                <CardDescription>Enter your legal name, date of birth, and mobile number.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                 {formActionError && ( <Alert variant="destructive" className="mb-6"> <AlertTriangle className="h-4 w-4" /> <AlertTitle>Action Failed</AlertTitle> <AlertDescription>{formActionError}</AlertDescription> </Alert> )}
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* First Name & Last Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                           <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Legal First Name *</FormLabel><FormControl><Input placeholder="e.g., Jane" {...field} /></FormControl><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Legal Last Name *</FormLabel><FormControl><Input placeholder="e.g., Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>

                        {/* Date of Birth Field */}
                        <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of Birth *</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        {/* FIX: Removed FormControl wrapper */}
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value && isDateValid(field.value) ? field.value : undefined}
                                            onSelect={(date) => { field.onChange(date || undefined); form.trigger("dateOfBirth"); }}
                                            disabled={(date) => date > startOfDay(subYears(new Date(), 18)) || date < new Date("1900-01-01")}
                                            initialFocus
                                            defaultMonth={field.value && isDateValid(field.value) ? field.value : subYears(new Date(), 30)}
                                            captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear() - 18}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>You must be 18 years or older.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Mobile Number Fields */}
                        <div className="space-y-2">
                             <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
                             <div className="flex items-start gap-2">
                                {/* Country Code */}
                                <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (
                                    <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
                                        <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
                                            <PopoverTrigger asChild>
                                                {/* FIX: Removed FormControl wrapper */}
                                                <Button
                                                    variant="outline" role="combobox" aria-expanded={countryCodePopoverOpen}
                                                    className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                                    aria-label="Select country calling code"
                                                >
                                                    {field.value ? field.value : "Code"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0">
                                                <Command filter={(value, search) => { const option = countryCodeOptions.find(opt => opt.label.toLowerCase() === value.toLowerCase()); if (!option) return 0; const searchTerm = search.toLowerCase(); const isInLabel = option.label.toLowerCase().includes(searchTerm); const codeSearchTerm = searchTerm.startsWith('+') ? searchTerm.slice(1) : searchTerm; const isInCode = option.value.slice(1).includes(codeSearchTerm); return isInLabel || isInCode ? 1 : 0; }}>
                                                    <CommandInput placeholder="Search country or code..." />
                                                    <CommandList><CommandEmpty>No country found.</CommandEmpty><CommandGroup> {countryCodeOptions.map((option) => ( <CommandItem key={option.label} value={option.label} onSelect={(currentValue) => { const selectedOption = countryCodeOptions.find(opt => opt.label === currentValue); if (selectedOption) { form.setValue("mobileCountryCode", selectedOption.value, { shouldValidate: true }); } setCountryCodePopoverOpen(false); }}> <Check className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")} /> {option.label} </CommandItem> ))} </CommandGroup></CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                {/* Number Input */}
                                <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                                    <FormItem className="flex-grow">
                                        {/* FormControl is correct here as it wraps the actual Input */}
                                        <FormControl><Input type="tel" inputMode="numeric" placeholder="Enter number" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                             </div>
                             <FormDescription>Used for verification and communications.</FormDescription>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-border/50 mt-8 gap-4">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmittingForm || isSkipping}> <ArrowLeft className="mr-2 h-4 w-4" /> Back </Button>
                            {backendStatus === 'not_started' && (
                                <Button type="button" variant="ghost" onClick={handleSkip} disabled={isSubmittingForm || isSkipping} className="text-muted-foreground hover:text-foreground order-first sm:order-none" > {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Skip for Now </Button>
                            )}
                            <Button type="submit" disabled={isSubmittingForm || isSkipping || !form.formState.isValid}> {isSubmittingForm ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />} Continue </Button>
                        </div>
                    </form>
                 </Form>
            </CardContent>
        </Card>
    );
}