// // frontend/src/app/kyc/details/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useKyc } from '../../contexts/KycContext'; // Ensure path is correct
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Loader2 } from 'lucide-react';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// // Zod schema for this step (Corrected salaryRange enum)
// const detailsSchema = z.object({
//     occupation: z.string().optional(), // Keep optional if intended
//     // *** REMOVED '' from enum ***
//     salaryRange: z.enum(['0-1000', '10000-50000', '50000-100000', '100000+'])
//                    .nullable() // Allow null for no selection
//                    .refine(val => val !== null, { message: 'Please select a salary range' }), // Require a selection (not null)
//     nationality: z.string().min(2, { message: 'Nationality is required' }),
// });

// type DetailsFormData = z.infer<typeof detailsSchema>;

// // Define options explicitly with type annotation
// const salaryOptions: { value: Exclude<DetailsFormData['salaryRange'], null | undefined>; label: string }[] = [
//     { value: '0-1000', label: '$0 - $10,000' },
//     { value: '10000-50000', label: '$10,000 - $50,000' },
//     { value: '50000-100000', label: '$50,000 - $100,000' },
//     { value: '100000+', label: '$100,000+' },
// ];

// // Define occupation options with type
// const occupationOptions: string[] = ['Student', 'Employee', 'Self-Employed', 'Business Owner', 'Retired', 'Unemployed', 'Other'];

// export default function KycDetailsPage() {
//     const { kycData, setKycData, nextStep, prevStep, goToStep } = useKyc();
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // useForm hook with corrected type
//     const form = useForm<DetailsFormData>({
//         resolver: zodResolver(detailsSchema),
//         defaultValues: {
//             occupation: kycData.occupation || '', // Default to empty string for optional field
//             salaryRange: kycData.salaryRange || null, // Default to null if not selected
//             nationality: kycData.nationality || '',
//         },
//     });

//     // useEffect hooks remain the same
//      useEffect(() => {
//          goToStep('details');
//      }, [goToStep]);

//      useEffect(() => {
//         form.reset({
//              occupation: kycData.occupation || '',
//              // Ensure salaryRange reset uses null if value from context is invalid/empty
//              salaryRange: salaryOptions.some(o => o.value === kycData.salaryRange) ? kycData.salaryRange : null,
//              nationality: kycData.nationality || '',
//          });
//      }, [kycData.occupation, kycData.salaryRange, kycData.nationality, form.reset]);

//     // onSubmit remains largely the same, ensure salaryRange can be null
//     const onSubmit = (data: DetailsFormData) => {
//         let proceedToNext = false;
//         try {
//             setIsSubmitting(true);
//             setFormError(null);
//             console.log("Step 2 Saving Data:", data);
//             // Update context, allowing null for salaryRange
//             setKycData({
//                 occupation: data.occupation || undefined, // Store undefined if empty string
//                 salaryRange: data.salaryRange, // Can be null
//                 nationality: data.nationality,
//             });
//             proceedToNext = true;
//         } catch (error) {
//             console.error("Error saving progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false);
//         }
//         if (proceedToNext) {
//             nextStep();
//         }
//     };

//     return (
//         <Card className="w-full max-w-2xl mx-auto">
//              <CardHeader>
//                 <CardTitle className="text-xl">Additional Details</CardTitle>
//                 <CardDescription>Help us understand a bit more about you.</CardDescription>
//             </CardHeader>
//              <CardContent>
//                  {formError && <p className="mb-4 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{formError}</p>}
//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//                         {/* Occupation Select */}
//                         <FormField
//                             control={form.control}
//                             name="occupation"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Occupation (Optional)</FormLabel>
//                                     {/* Pass value explicitly, defaulting to '' if null/undefined */}
//                                     <Select onValueChange={field.onChange} value={field.value || ''} >
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select your occupation" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             {/* *** REMOVED SelectItem with value="" *** */}
//                                             {occupationOptions.map(opt => (
//                                                 <SelectItem key={opt} value={opt}>{opt}</SelectItem>
//                                             ))}
//                                             {/* Option for 'Other' might need special handling if needed */}
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         {/* Salary Range Select */}
//                         <FormField
//                             control={form.control}
//                             name="salaryRange"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Approximate Annual Salary</FormLabel>
//                                     {/* Handle null for value prop */}
//                                     <Select onValueChange={field.onChange} value={field.value ?? ""} >
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 {/* Placeholder is shown when value is "" or undefined */}
//                                                 <SelectValue placeholder="Select salary range" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             {/* *** REMOVED SelectItem with value="" and disabled *** */}
//                                             {salaryOptions.map(opt => (
//                                                 <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         {/* Nationality Input */}
//                          <FormField
//                             control={form.control}
//                             name="nationality"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Nationality</FormLabel>
//                                     <FormControl>
//                                         <Input {...field} placeholder="Enter nationality (e.g., US, GB)" />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                          />

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700 mt-8">
//                             <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//                                 Back
//                             </Button>
//                             <Button type="submit" disabled={isSubmitting}>
//                                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                                 Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//              </CardContent>
//         </Card>
//     );
// }


// // frontend/src/app/kyc/details/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useKyc } from '../../contexts/KycContext'; // Adjusted path
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Loader2, Briefcase, BadgeDollarSign, Globe, AlertTriangle } from 'lucide-react'; // Added icons
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Added FormDescription
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// // Zod schema (Salary range enum defined)
// const salaryRangeEnum = z.enum(['0-1000', '10000-50000', '50000-100000', '100000+']);
// const detailsSchema = z.object({
//     occupation: z.string().trim().optional(),
//     // Ensure salaryRange allows null OR one of the enum values if provided
//     salaryRange: salaryRangeEnum.nullable().optional(),
//     nationality: z.string().trim().min(2, { message: 'Nationality is required (e.g., Indian, American, British)' }), // Updated message
// });

// type DetailsFormData = z.infer<typeof detailsSchema>;

// // Define options for Select components
// const salaryOptions: { value: z.infer<typeof salaryRangeEnum>; label: string }[] = [
//     { value: '0-1000', label: 'Below $10,000' },
//     { value: '10000-50000', label: '$10,000 - $50,000' },
//     { value: '50000-100000', label: '$50,000 - $100,000' },
//     { value: '100000+', label: 'Over $100,000' },
// ];

// // Define occupation options (could be fetched)
// const occupationOptions: string[] = ['Student', 'Employee', 'Self-Employed', 'Business Owner', 'Investor', 'Retired', 'Unemployed', 'Other'];

// export default function KycDetailsPage() {
//     const { kycData, setKycData, nextStep, prevStep, updateCurrentStepId, isInitialized } = useKyc();
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isPageLoading, setIsPageLoading] = useState(true);

//     // Initialize react-hook-form
//     const form = useForm<DetailsFormData>({
//         resolver: zodResolver(detailsSchema),
//         defaultValues: {
//             occupation: '', // Start empty, load from context below
//             salaryRange: null,
//             nationality: '',
//         },
//         mode: 'onChange', // Validate as user types/selects
//     });

//     // Effect to set the current step in the context
//     useEffect(() => {
//         updateCurrentStepId('details');
//     }, [updateCurrentStepId]);

//     // Effect to load data from context after initialization
//     useEffect(() => {
//         if (!isInitialized) {
//             setIsPageLoading(true);
//             return; // Wait for context to load data from localStorage
//         }

//         console.log("DetailsPage: Context initialized. Loading data:", kycData);
//         // Reset form with context data (or defaults if context is empty)
//         form.reset({
//              occupation: kycData.occupation || '',
//              salaryRange: kycData.salaryRange || null, // Use null if undefined/empty in context
//              nationality: kycData.nationality || '',
//          });
//         setIsPageLoading(false); // Loading complete

//     // Depend on initialization status and specific context fields for this step
//     }, [isInitialized, kycData.occupation, kycData.salaryRange, kycData.nationality, form.reset]);

//     // Handle Form Submission
//     const onSubmit = (data: DetailsFormData) => {
//          console.log("Step 2 (Details) Form submitted with data:", data); // Log 1: Submission start
//         setIsSubmitting(true);
//         setFormError(null);
//         try {
//             console.log("Step 2 (Details) Calling setKycData..."); // Log 2: Before context update
//             // Update KycContext state
//             setKycData({
//                 occupation: data.occupation || undefined, // Store undefined if empty string
//                 salaryRange: data.salaryRange, // Store null if explicitly selected or empty
//                 nationality: data.nationality,
//             });
//             console.log("Step 2 (Details) Calling nextStep()..."); // Log 3: Before navigation
//             // Navigate to the next step
//             nextStep();
//             console.log("Step 2 (Details) nextStep() called successfully."); // Log 4: After navigation call

//         } catch (error) {
//             console.error("Error saving details progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false); // Stop submitting ONLY on error
//         }
//         // DO NOT set isSubmitting(false) here on success, page navigation handles it
//     };

//     // Loading state display
//     if (isPageLoading) {
//          return (
//              <div className="flex justify-center items-center min-h-[300px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  <span className="ml-2 text-muted-foreground">Loading details...</span>
//              </div>
//          );
//     }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40">
//              <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     {/* You can add an icon here too */}
//                     Additional Details
//                 </CardTitle>
//                 <CardDescription>Help us understand a bit more about you. This information helps us comply with regulations.</CardDescription>
//             </CardHeader>
//              <CardContent>
//                  {formError && (
//                     <Alert variant="destructive" className="mb-4">
//                         <AlertTriangle className="h-4 w-4" />
//                         <AlertTitle>Error</AlertTitle>
//                         <AlertDescription>{formError}</AlertDescription>
//                      </Alert>
//                   )}
//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//                         {/* Occupation Select (Optional) */}
//                         <FormField
//                             control={form.control}
//                             name="occupation"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-muted-foreground"/> Occupation</FormLabel>
//                                     {/* Use `value={field.value ?? ''}` to handle null/undefined for Select */}
//                                     <Select onValueChange={field.onChange} value={field.value ?? ''} >
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 {/* Show selected value or placeholder */}
//                                                 <SelectValue placeholder="Select your occupation (Optional)" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             {/* Optional: Add an explicit "None" or "Prefer not to say" option */}
//                                             {/* <SelectItem value="">-- Prefer not to say --</SelectItem> */}
//                                             {occupationOptions.map(opt => (
//                                                 <SelectItem key={opt} value={opt}>{opt}</SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                     <FormDescription>Your primary source of income generation.</FormDescription>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         {/* Salary Range Select (Optional) */}
//                         <FormField
//                             control={form.control}
//                             name="salaryRange"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-1.5"><BadgeDollarSign className="h-4 w-4 text-muted-foreground"/> Approximate Annual Income</FormLabel>
//                                     {/* Handle null value for Select. Use empty string '' for placeholder selection */}
//                                     <Select onValueChange={field.onChange} value={field.value ?? ''}>
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select income range (Optional)" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                              {/* Optional: Add explicit empty selection */}
//                                              {/* <SelectItem value="">-- Prefer not to say --</SelectItem> */}
//                                              {salaryOptions.map(opt => (
//                                                 <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                      <FormDescription>Helps us understand transaction patterns.</FormDescription>
//                                      <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         {/* Nationality Input (Required) */}
//                          <FormField
//                             control={form.control}
//                             name="nationality"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-muted-foreground"/> Nationality *</FormLabel>
//                                     <FormControl>
//                                         {/* TODO: Consider replacing with a searchable Country Select component for better UX */}
//                                         <Input {...field} placeholder="e.g., Indian, American, British" />
//                                     </FormControl>
//                                      <FormDescription>Your country of citizenship.</FormDescription>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                          />

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700 mt-8">
//                             <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//                                 Back
//                             </Button>
//                             {/* FIX: Added disabled check for form validity */}
//                             <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
//                                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                                 Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//              </CardContent>
//         </Card>
//     );
// }


// // frontend/src/app/kyc/details/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// // ***** FIX: Import country list library *****
// import { getData as getCountryData } from 'country-list';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// // Remove Input if no longer needed, keep if other inputs exist
// // import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, Briefcase, BadgeDollarSign, Globe, AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
// // ***** FIX: Import Combobox components *****
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { cn } from '@/lib/utils'; // Ensure cn is imported

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import type { SalaryRange } from '@/app/services/kyc';

// // --- Zod Validation Schema ---
// const salaryRangeValues: [SalaryRange, ...SalaryRange[]] = ['0-1000', '10000-50000', '50000-100000', '100000+'];
// const salaryRangeEnum = z.enum(salaryRangeValues);

// const detailsSchema = z.object({
//     occupation: z.string().trim()
//         .max(100, { message: 'Occupation cannot exceed 100 characters' })
//         .optional()
//         .transform(val => val === '' ? undefined : val),
//     salaryRange: salaryRangeEnum.nullable().optional()
//         .transform(val => val === '' ? null : val),
//     // Nationality: Required string, validated that it's a non-empty string from the dropdown
//     nationality: z.string({ required_error: "Nationality is required." })
//         .trim()
//         .min(1, { message: 'Nationality is required.' }), // Ensure a selection is made
// });

// type DetailsFormData = z.infer<typeof detailsSchema>;

// // --- Select Options ---
// const salaryOptions: { value: SalaryRange; label: string }[] = [
//     { value: '0-1000', label: 'Below $10,000' },
//     { value: '10000-50000', label: '$10,000 - $49,999' },
//     { value: '50000-100000', label: '$50,000 - $99,999' },
//     { value: '100000+', label: '$100,000 or more' },
// ];
// const occupationOptions: string[] = ['Student', 'Employed', 'Self-Employed', 'Business Owner', 'Investor', 'Retired', 'Unemployed', 'Other'];

// // ***** FIX: Define type for country options *****
// type CountryOption = {
//     value: string; // Country name (used as value for form)
//     label: string; // Country name (used for display)
// };

// // --- Component ---
// export default function KycDetailsPage() {
//     const {
//         kycData,
//         setKycData,
//         nextStep,
//         prevStep,
//         updateCurrentUiStepId,
//         isInitialized: kycInitialized,
//         backendStatus,
//         goToStep,
//     } = useKyc();

//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isPageLoading, setIsPageLoading] = useState(true);
//     // ***** FIX: State for Nationality Combobox Popover *****
//     const [nationalityPopoverOpen, setNationalityPopoverOpen] = useState(false);

//     // ***** FIX: Memoize the country list *****
//     const countryOptions = useMemo<CountryOption[]>(() => {
//         try {
//             return getCountryData()
//                 .map((country: { name: any; }) => ({
//                     value: country.name, // Store the full name
//                     label: country.name, // Display the full name
//                 }))
//                 .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically
//         } catch (error) {
//              console.error("Failed to load country data:", error);
//              return []; // Return empty array on error
//         }
//     }, []);

//     // Initialize react-hook-form
//     const form = useForm<DetailsFormData>({
//         resolver: zodResolver(detailsSchema),
//         defaultValues: {
//             occupation: undefined,
//             salaryRange: null,
//             nationality: '', // Start with empty string for nationality
//         },
//         mode: 'onChange',
//     });

//     // Effect 1: Set the current UI step
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('details');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Load data from context
//     useEffect(() => {
//         if (!kycInitialized) {
//             setIsPageLoading(true); return;
//         }
//         if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//             console.log("DetailsPage: Skipping data load due to backend status:", backendStatus);
//             setIsPageLoading(false); return;
//         }

//         console.log("DetailsPage: Context initialized. Loading data:", kycData);
//         setIsPageLoading(true);
//         form.reset({
//             occupation: kycData.occupation || undefined,
//             salaryRange: kycData.salaryRange && salaryRangeValues.includes(kycData.salaryRange) ? kycData.salaryRange : null,
//             // Ensure loaded nationality is valid, otherwise keep default empty string
//             nationality: countryOptions.some(c => c.value === kycData.nationality) ? kycData.nationality : '',
//         });
//         setIsPageLoading(false);
//     // Add countryOptions to dependency array to ensure reset happens after list is loaded
//     }, [kycInitialized, backendStatus, kycData.occupation, kycData.salaryRange, kycData.nationality, form.reset, countryOptions]);

//     // --- Event Handlers ---
//     const onSubmit = (data: DetailsFormData) => {
//         console.log("DetailsPage: Form submitted with validated data:", data);
//         setIsSubmitting(true); setFormError(null);
//         try {
//             setKycData({
//                 occupation: data.occupation,
//                 salaryRange: data.salaryRange,
//                 nationality: data.nationality,
//             });
//             nextStep();
//         } catch (error: any) {
//             console.error("DetailsPage: Error saving progress:", error);
//             setFormError(error.message || "Failed to save progress.");
//             setIsSubmitting(false);
//         }
//     };

//     // --- Render Logic ---
//     if (isPageLoading || !kycInitialized) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Loading Additional Details...</span>
//             </div>
//         );
//     }
//     if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//         return (
//             <div className="flex justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Updating status...</span>
//             </div>
//         );
//     }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//              <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     <Briefcase className="h-6 w-6 text-primary" />
//                     Additional Details (Step {formStepOrder.indexOf('details') + 1} of {formStepOrder.length})
//                 </CardTitle>
//                 <CardDescription>
//                     This optional information helps us comply with regulations. Select your nationality from the list.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="p-6 md:p-8">
//                  {formError && (
//                     <Alert variant="destructive" className="mb-6">
//                         <AlertTriangle className="h-4 w-4" />
//                         <AlertTitle>Error</AlertTitle>
//                         <AlertDescription>{formError}</AlertDescription>
//                      </Alert>
//                   )}
//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//                         {/* Occupation Select (Optional) */}
//                         <FormField control={form.control} name="occupation" render={({ field }) => (
//                              <FormItem>
//                                 <FormLabel className="flex items-center gap-1.5">
//                                     <Briefcase className="h-4 w-4 text-muted-foreground"/> Occupation (Optional)
//                                 </FormLabel>
//                                 <Select onValueChange={field.onChange} value={field.value ?? ''} >
//                                     <FormControl>
//                                         <SelectTrigger><SelectValue placeholder="Select your occupation" /></SelectTrigger>
//                                     </FormControl>
//                                     <SelectContent>
//                                         {occupationOptions.map(opt => (
//                                             <SelectItem key={opt} value={opt}>{opt}</SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                                 <FormDescription>Your primary professional activity.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         {/* Salary Range Select (Optional) */}
//                         <FormField control={form.control} name="salaryRange" render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className="flex items-center gap-1.5">
//                                     <BadgeDollarSign className="h-4 w-4 text-muted-foreground"/> Annual Income Range (Optional)
//                                 </FormLabel>
//                                 <Select onValueChange={field.onChange} value={field.value ?? ''}>
//                                     <FormControl>
//                                         <SelectTrigger><SelectValue placeholder="Select income range" /></SelectTrigger>
//                                     </FormControl>
//                                     <SelectContent>
//                                         {salaryOptions.map(opt => (
//                                             <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                                  <FormDescription>Approximate yearly income.</FormDescription>
//                                  <FormMessage />
//                             </FormItem>
//                         )} />

//                         {/* ***** FIX: Nationality Combobox ***** */}
//                         <FormField
//                             control={form.control}
//                             name="nationality"
//                             render={({ field }) => (
//                                 <FormItem className="flex flex-col">
//                                     <FormLabel className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-muted-foreground"/> Nationality *</FormLabel>
//                                     <Popover open={nationalityPopoverOpen} onOpenChange={setNationalityPopoverOpen}>
//                                         <PopoverTrigger asChild>
//                                             <FormControl>
//                                                 <Button
//                                                     variant="outline"
//                                                     role="combobox"
//                                                     aria-expanded={nationalityPopoverOpen}
//                                                     aria-label="Select nationality"
//                                                     className={cn(
//                                                         "w-full justify-between",
//                                                         !field.value && "text-muted-foreground"
//                                                     )}
//                                                 >
//                                                     {field.value
//                                                         ? countryOptions.find((country) => country.value === field.value)?.label
//                                                         : "Select nationality..."}
//                                                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                 </Button>
//                                             </FormControl>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
//                                             <Command>
//                                                 <CommandInput placeholder="Search nationality..." />
//                                                 <CommandList>
//                                                     <CommandEmpty>No nationality found.</CommandEmpty>
//                                                     <CommandGroup>
//                                                         {countryOptions.map((country) => (
//                                                             <CommandItem
//                                                                 value={country.label} // Use label for display and searching in Command
//                                                                 key={country.value} // Use unique value (name) as key
//                                                                 onSelect={(currentValue) => { // currentValue is the label here
//                                                                     // Find the option by label to set the correct value
//                                                                     const selectedValue = countryOptions.find(c => c.label.toLowerCase() === currentValue.toLowerCase())?.value || '';
//                                                                     form.setValue("nationality", selectedValue, { shouldValidate: true });
//                                                                     setNationalityPopoverOpen(false);
//                                                                 }}
//                                                             >
//                                                                 <Check
//                                                                     className={cn(
//                                                                         "mr-2 h-4 w-4",
//                                                                         country.value === field.value ? "opacity-100" : "opacity-0"
//                                                                     )}
//                                                                 />
//                                                                 {country.label}
//                                                             </CommandItem>
//                                                         ))}
//                                                     </CommandGroup>
//                                                 </CommandList>
//                                             </Command>
//                                         </PopoverContent>
//                                     </Popover>
//                                     <FormDescription>Your country of citizenship.</FormDescription>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center pt-6 border-t dark:border-border/50 mt-8">
//                             <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//                                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                             </Button>
//                             <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
//                                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />} Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//              </CardContent>
//         </Card>
//     );
// }


// // frontend/src/app/kyc/details/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// // ***** FIX: Import country list library *****
// import { getData as getCountryData } from 'country-list'; // Corrected import

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// // Removed unused Input import
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, Briefcase, BadgeDollarSign, Globe, AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
// // ***** FIX: Import Combobox components *****
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { cn } from '@/lib/utils'; // Ensure cn is imported

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import type { SalaryRange } from '@/app/services/kyc'; // Ensure correct path if needed

// // --- Zod Validation Schema ---
// // Explicitly define the possible values for SalaryRange type if not imported
// // type SalaryRange = '0-1000' | '10000-50000' | '50000-100000' | '100000+';
// const salaryRangeValues: [SalaryRange, ...SalaryRange[]] = ['0-1000', '10000-50000', '50000-100000', '100000+'];
// const salaryRangeEnum = z.enum(salaryRangeValues);

// const detailsSchema = z.object({
//     occupation: z.string().trim()
//         .max(100, { message: 'Occupation cannot exceed 100 characters' })
//         .optional()
//         .transform(val => val === '' ? undefined : val), // Transform empty string to undefined for optional field
//     salaryRange: salaryRangeEnum.nullable().optional()
//         .transform(val => val === '' ? null : val), // Transform empty string to null for optional enum
//     // Nationality: Required string, validated that it's a non-empty string from the dropdown
//     nationality: z.string({ required_error: "Nationality is required." })
//         .trim()
//         .min(1, { message: 'Nationality is required.' }), // Ensure a selection is made
// });

// type DetailsFormData = z.infer<typeof detailsSchema>;

// // --- Select Options ---
// const salaryOptions: { value: SalaryRange; label: string }[] = [
//     { value: '0-1000', label: 'Below $10,000' },
//     { value: '10000-50000', label: '$10,000 - $49,999' },
//     { value: '50000-100000', label: '$50,000 - $99,999' },
//     { value: '100000+', label: '$100,000 or more' },
// ];
// const occupationOptions: string[] = ['Student', 'Employed', 'Self-Employed', 'Business Owner', 'Investor', 'Retired', 'Unemployed', 'Other'];

// // ***** FIX: Define type for country options *****
// type CountryOption = {
//     value: string; // Country name (used as value for form)
//     label: string; // Country name (used for display)
// };

// // --- Component ---
// export default function KycDetailsPage() {
//     const {
//         kycData,
//         setKycData,
//         nextStep,
//         prevStep,
//         updateCurrentUiStepId,
//         isInitialized: kycInitialized,
//         backendStatus,
//         // goToStep, // Not used currently, can be removed if not needed
//     } = useKyc();

//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isPageLoading, setIsPageLoading] = useState(true);
//     // ***** FIX: State for Nationality Combobox Popover *****
//     const [nationalityPopoverOpen, setNationalityPopoverOpen] = useState(false);

//     // ***** FIX: Memoize the country list *****
//     const countryOptions = useMemo<CountryOption[]>(() => {
//         try {
//             // Assuming country-list returns { code: string, name: string }[]
//             // If the structure is different, adjust the mapping accordingly
//             return getCountryData()
//                 .map((country: { name: string; /* potentially code: string */ }) => ({
//                     value: country.name, // Store the full name as the value
//                     label: country.name, // Display the full name
//                 }))
//                 .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically
//         } catch (error) {
//             console.error("Failed to load country data:", error);
//             // Optionally set an error state here to inform the user
//             return []; // Return empty array on error to prevent crashes
//         }
//     }, []); // Empty dependency array means this runs only once on mount

//     // Initialize react-hook-form
//     const form = useForm<DetailsFormData>({
//         resolver: zodResolver(detailsSchema),
//         defaultValues: {
//             occupation: undefined, // Use undefined for optional fields initially
//             salaryRange: null, // Use null for optional fields initially
//             nationality: '', // Start with empty string for nationality (required, but initially unselected)
//         },
//         mode: 'onChange', // Validate on change for better UX
//     });

//     // Effect 1: Set the current UI step
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('details');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Load data from context into the form
//     useEffect(() => {
//         // Wait for context AND country options to be ready
//         if (!kycInitialized || !countryOptions.length) {
//             setIsPageLoading(true);
//             return;
//         }
//         // Only load if KYC process hasn't advanced past editable states
//         if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//             console.log("DetailsPage: Skipping data load due to backend status:", backendStatus);
//             setIsPageLoading(false); // Ensure loading stops if we skip
//             return;
//         }

//         console.log("DetailsPage: Context initialized and countries loaded. Loading data:", kycData);
//         setIsPageLoading(true); // Set loading true before reset

//         // Reset form with data from context, ensuring values are valid
//         form.reset({
//             occupation: kycData.occupation || undefined, // Fallback to undefined if not set
//             salaryRange: kycData.salaryRange && salaryRangeValues.includes(kycData.salaryRange)
//                 ? kycData.salaryRange
//                 : null, // Fallback to null if invalid or not set
//             // Ensure loaded nationality is valid, otherwise keep default empty string
//             nationality: countryOptions.some(c => c.value === kycData.nationality)
//                 ? kycData.nationality ?? '' // Ensure string if it's somehow null/undefined from context
//                 : '', // Keep empty if loaded value isn't in the options
//         });

//         setIsPageLoading(false); // Set loading false after reset

//     // Add countryOptions to dependency array to ensure reset happens after list is loaded
//     // Use form.reset directly in deps as recommended by react-hook-form docs
//     // Add kycData fields individually if more granular control is needed, otherwise kycData obj is fine
//     }, [kycInitialized, backendStatus, kycData, form.reset, countryOptions]);


//     // --- Event Handlers ---
//     const onSubmit = (data: DetailsFormData) => {
//         console.log("DetailsPage: Form submitted with validated data:", data);
//         setIsSubmitting(true); setFormError(null);
//         try {
//             // Ensure we are passing the correct types, especially for optional fields
//             setKycData({
//                 occupation: data.occupation || undefined, // Pass undefined if empty/null
//                 salaryRange: data.salaryRange || null,   // Pass null if empty
//                 nationality: data.nationality, // Already validated as string
//             });
//             nextStep();
//         } catch (error: any) {
//             console.error("DetailsPage: Error saving progress:", error);
//             setFormError(error.message || "Failed to save progress.");
//         } finally {
//              // Ensure isSubmitting is reset even if nextStep() throws sync error (unlikely)
//             setIsSubmitting(false);
//         }
//     };

//     // --- Render Logic ---
//     if (isPageLoading || !kycInitialized || !countryOptions.length) { // Added !countryOptions.length check
//         return (
//             <div className="flex justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Loading Additional Details...</span>
//             </div>
//         );
//     }

//     // Check if KYC process state prevents editing
//     if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//         // This state might indicate the user shouldn't be on this page anymore
//         // Consider redirecting or showing a status message
//         return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full text-center">
//                  <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
//                  <p className="text-muted-foreground">Your KYC status is currently <span className="font-semibold">{backendStatus.replace(/_/g, ' ')}</span>.</p>
//                  <p className="text-sm text-muted-foreground mt-1">You cannot edit these details at this time.</p>
//                  {/* Optionally add a button to go to a status page or dashboard */}
//              </div>
//         );
//     }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//              <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     <Briefcase className="h-6 w-6 text-primary" />
//                     Additional Details (Step {formStepOrder.indexOf('details') + 1} of {formStepOrder.length})
//                 </CardTitle>
//                 <CardDescription>
//                     Please provide your nationality. Other details are optional but help us understand our users better.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="p-6 md:p-8">
//                  {formError && (
//                     <Alert variant="destructive" className="mb-6">
//                         <AlertTriangle className="h-4 w-4" />
//                         <AlertTitle>Error</AlertTitle>
//                         <AlertDescription>{formError}</AlertDescription>
//                      </Alert>
//                   )}
//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//                         {/* Occupation Select (Optional) */}
//                         <FormField control={form.control} name="occupation" render={({ field }) => (
//                              <FormItem>
//                                 <FormLabel className="flex items-center gap-1.5">
//                                     <Briefcase className="h-4 w-4 text-muted-foreground"/> Occupation (Optional)
//                                 </FormLabel>
//                                 <Select
//                                     onValueChange={(value) => field.onChange(value === '' ? undefined : value)} // Handle empty string selection for optional field
//                                     value={field.value ?? ''} // Pass '' to Select when value is undefined/null
//                                 >
//                                     <FormControl>
//                                         <SelectTrigger><SelectValue placeholder="Select your occupation" /></SelectTrigger>
//                                     </FormControl>
//                                     <SelectContent>
//                                         {/* Optional: Add an explicit "None" or empty option if desired */}
//                                         {/* <SelectItem value="">-- Select --</SelectItem> */}
//                                         {occupationOptions.map(opt => (
//                                             <SelectItem key={opt} value={opt}>{opt}</SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                                 <FormDescription>Your primary professional activity.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         {/* Salary Range Select (Optional) */}
//                         <FormField control={form.control} name="salaryRange" render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className="flex items-center gap-1.5">
//                                     <BadgeDollarSign className="h-4 w-4 text-muted-foreground"/> Annual Income Range (Optional)
//                                 </FormLabel>
//                                 <Select
//                                     onValueChange={(value) => field.onChange(value === '' ? null : value)} // Handle empty string selection for optional field
//                                     value={field.value ?? ''}
//                                 >
//                                     <FormControl>
//                                         <SelectTrigger><SelectValue placeholder="Select income range" /></SelectTrigger>
//                                     </FormControl>
//                                     <SelectContent>
//                                         {/* Optional: Add an explicit "None" or empty option if desired */}
//                                         {/* <SelectItem value="">-- Select --</SelectItem> */}
//                                         {salaryOptions.map(opt => (
//                                             <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                                  <FormDescription>Approximate yearly income.</FormDescription>
//                                  <FormMessage />
//                             </FormItem>
//                         )} />

//                         {/* ***** FIX: Nationality Combobox ***** */}
//                         <FormField
//                             control={form.control}
//                             name="nationality"
//                             render={({ field }) => (
//                                 <FormItem className="flex flex-col">
//                                     {/* Added asterisk for required field indication */}
//                                     <FormLabel className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-muted-foreground"/> Nationality *</FormLabel>
//                                     <Popover open={nationalityPopoverOpen} onOpenChange={setNationalityPopoverOpen}>
//                                         <PopoverTrigger asChild>
//                                             <FormControl>
//                                                 <Button
//                                                     variant="outline"
//                                                     role="combobox"
//                                                     aria-expanded={nationalityPopoverOpen}
//                                                     aria-label="Select nationality"
//                                                     className={cn(
//                                                         "w-full justify-between",
//                                                         // Use text-muted-foreground for placeholder style when no value selected
//                                                         !field.value && "text-muted-foreground"
//                                                     )}
//                                                 >
//                                                     {/* Find the label corresponding to the selected value */}
//                                                     {field.value
//                                                         ? countryOptions.find((country) => country.value === field.value)?.label
//                                                         : "Select nationality..."}
//                                                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                 </Button>
//                                             </FormControl>
//                                         </PopoverTrigger>
//                                         {/* Ensure PopoverContent has enough width and height */}
//                                         <PopoverContent align="start" className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
//                                             <Command>
//                                                 <CommandInput placeholder="Search nationality..." />
//                                                 {/* CommandList handles scrolling */}
//                                                 <CommandList>
//                                                     <CommandEmpty>No nationality found.</CommandEmpty>
//                                                     <CommandGroup>
//                                                         {countryOptions.map((country) => (
//                                                             <CommandItem
//                                                                 // value prop is used for search AND passed to onSelect if item selected via keyboard/filter
//                                                                 value={country.label} // Use label for searching/display in list
//                                                                 key={country.value} // Use the unique value for the key
//                                                                 onSelect={(currentLabel) => {
//                                                                     // Find the country option matching the selected label (case-insensitive just in case)
//                                                                     const selectedValue = countryOptions.find(c => c.label.toLowerCase() === currentLabel.toLowerCase())?.value ?? '';

//                                                                     // Set the form value to the country *name* (which is our 'value')
//                                                                     form.setValue("nationality", selectedValue, { shouldValidate: true }); // Trigger validation
//                                                                     setNationalityPopoverOpen(false); // Close the popover
//                                                                 }}
//                                                             >
//                                                                 <Check
//                                                                     className={cn(
//                                                                         "mr-2 h-4 w-4",
//                                                                         // Check if the item's value matches the field's current value
//                                                                         country.value === field.value ? "opacity-100" : "opacity-0"
//                                                                     )}
//                                                                 />
//                                                                 {country.label}
//                                                             </CommandItem>
//                                                         ))}
//                                                     </CommandGroup>
//                                                 </CommandList>
//                                             </Command>
//                                         </PopoverContent>
//                                     </Popover>
//                                     <FormDescription>Your country of citizenship.</FormDescription>
//                                     {/* FormMessage will show Zod's required error */}
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center pt-6 border-t dark:border-border/50 mt-8">
//                             <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//                                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                             </Button>
//                             {/* Disable button if submitting OR if form is invalid (and not submitting) */}
//                             <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
//                                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />} Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//              </CardContent>
//         </Card>
//     );
// }

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getData as getCountryData } from 'country-list'; // Corrected import

// --- UI Components ---
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Briefcase, BadgeDollarSign, Globe, AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from '@/lib/utils'; // Ensure cn is imported

// --- App Specific Imports ---
import { useKyc, formStepOrder } from '../../contexts/KycContext';
import type { SalaryRange } from '@/app/services/kyc'; // Assuming it's exported

// --- Zod Validation Schema ---
const salaryRangeValues: [SalaryRange, ...SalaryRange[]] = ['0-1000', '10000-50000', '50000-100000', '100000+'];
const salaryRangeEnum = z.enum(salaryRangeValues);

const detailsSchema = z.object({
    occupation: z.string().trim()
        .max(100, { message: 'Occupation cannot exceed 100 characters' })
        .optional()
        .transform(val => val === '' ? undefined : val), // Keep: ensures empty input becomes undefined
    salaryRange: salaryRangeEnum.nullable().optional(), // Keep: allows null or valid range
    nationality: z.string({ required_error: "Nationality is required." })
        .trim()
        .min(1, { message: 'Nationality is required.' }), // Ensure a selection is made
});

type DetailsFormData = z.infer<typeof detailsSchema>;

// --- Select Options ---
const salaryOptions: { value: SalaryRange; label: string }[] = [
    { value: '0-1000', label: 'Below $10,000' },
    { value: '10000-50000', label: '$10,000 - $49,999' },
    { value: '50000-100000', label: '$50,000 - $99,999' },
    { value: '100000+', label: '$100,000 or more' },
];
const occupationOptions: string[] = ['Student', 'Employed', 'Self-Employed', 'Business Owner', 'Investor', 'Retired', 'Unemployed', 'Other'];

type CountryOption = {
    value: string; // Country name (used as value for form)
    label: string; // Country name (used for display)
};

// --- Component ---
export default function KycDetailsPage() {
    const {
        kycData,
        setKycData,
        nextStep,
        prevStep,
        updateCurrentUiStepId,
        isInitialized: kycInitialized,
        backendStatus,
    } = useKyc();

    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [nationalityPopoverOpen, setNationalityPopoverOpen] = useState(false);

    const countryOptions = useMemo<CountryOption[]>(() => {
        try {
            return getCountryData()
                .map((country: { name: string; code: string }) => ({ // Added 'code' assuming it exists
                    value: country.name, // Store name as value
                    label: country.name, // Display name
                }))
                .sort((a, b) => a.label.localeCompare(b.label));
        } catch (error) {
            console.error("Failed to load country data:", error);
            return [];
        }
    }, []);

    const form = useForm<DetailsFormData>({
        resolver: zodResolver(detailsSchema),
        defaultValues: {
            occupation: undefined,
            salaryRange: null,
            nationality: '',
        },
        mode: 'onChange',
    });

    // Effect 1: Set UI step
    useEffect(() => {
        if (kycInitialized) {
            updateCurrentUiStepId('details');
        }
    }, [kycInitialized, updateCurrentUiStepId]);

    // Effect 2: Load data from context
    useEffect(() => {
        if (!kycInitialized || !countryOptions.length) {
            setIsPageLoading(true);
            return;
        }
        if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
            setIsPageLoading(false);
            return;
        }

        setIsPageLoading(true);
        form.reset({
            occupation: kycData.occupation || undefined,
            salaryRange: kycData.salaryRange && salaryRangeValues.includes(kycData.salaryRange)
                ? kycData.salaryRange
                : null,
            nationality: countryOptions.some(c => c.value === kycData.nationality)
                ? kycData.nationality ?? ''
                : '',
        });
        setIsPageLoading(false);
    }, [kycInitialized, backendStatus, kycData, form.reset, countryOptions]);

    // --- Event Handlers ---
    const onSubmit = (data: DetailsFormData) => {
        console.log("DetailsPage: Form submitted with validated data:", data);
        setIsSubmitting(true); setFormError(null);
        try {
            setKycData({
                occupation: data.occupation || undefined, // Pass undefined if empty/null
                salaryRange: data.salaryRange || null,   // Pass null if empty
                nationality: data.nationality, // Already validated as string
            });
            nextStep();
        } catch (error: any) {
            console.error("DetailsPage: Error saving progress:", error);
            setFormError(error.message || "Failed to save progress.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Render Logic ---
    if (isPageLoading || !kycInitialized || !countryOptions.length) {
        return (
            <div className="flex justify-center items-center min-h-[400px] w-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading Additional Details...</span>
            </div>
        );
    }

    if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
        return (
             <div className="flex flex-col justify-center items-center min-h-[400px] w-full text-center">
                 <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                 <p className="text-muted-foreground">Your KYC status is currently <span className="font-semibold">{backendStatus.replace(/_/g, ' ')}</span>.</p>
                 <p className="text-sm text-muted-foreground mt-1">You cannot edit these details at this time.</p>
             </div>
        );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
             <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    Additional Details (Step {formStepOrder.indexOf('details') + 1} of {formStepOrder.length})
                </CardTitle>
                <CardDescription>
                    Please provide your nationality. Other details are optional but help us understand our users better.
                </CardDescription>
            </CardHeader>
             <CardContent className="p-6 md:p-8">
                 {formError && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{formError}</AlertDescription>
                     </Alert>
                  )}
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Occupation Select (Optional) */}
                        <FormField control={form.control} name="occupation" render={({ field }) => (
                             <FormItem>
                                <FormLabel className="flex items-center gap-1.5">
                                    <Briefcase className="h-4 w-4 text-muted-foreground"/> Occupation (Optional)
                                </FormLabel>
                                {/* **FIX**: Use field.onChange directly. Pass undefined if value is empty string (handled by zod transform) */}
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""} // Map undefined/null to "" for Select state
                                >
                                    <FormControl>
                                        {/* **FIX**: Use placeholder prop */}
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your occupation" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* **FIX**: Removed the explicit empty SelectItem */}
                                        {occupationOptions.map(opt => (
                                            // Ensure value prop is never empty string
                                            <SelectItem key={opt} value={opt}>
                                                {opt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>Your primary professional activity.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Salary Range Select (Optional) */}
                        <FormField control={form.control} name="salaryRange" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-1.5">
                                    <BadgeDollarSign className="h-4 w-4 text-muted-foreground"/> Annual Income Range (Optional)
                                </FormLabel>
                                {/* **FIX**: Use field.onChange. Pass null if value is empty string */}
                                <Select
                                    onValueChange={(value) => field.onChange(value || null)}
                                    value={field.value ?? ""} // Map null/undefined to "" for Select state
                                >
                                    <FormControl>
                                        {/* **FIX**: Use placeholder prop */}
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select income range" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                         {/* **FIX**: Removed the explicit empty SelectItem */}
                                        {salaryOptions.map(opt => (
                                            // Ensure value prop is never empty string
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                 <FormDescription>Approximate yearly income.</FormDescription>
                                 <FormMessage />
                            </FormItem>
                        )} />

                        {/* Nationality Combobox (Required) */}
                        <FormField
                            control={form.control}
                            name="nationality"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-muted-foreground"/> Nationality *</FormLabel>
                                    <Popover open={nationalityPopoverOpen} onOpenChange={setNationalityPopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={nationalityPopoverOpen}
                                                    aria-label="Select nationality"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? countryOptions.find((country) => country.value === field.value)?.label
                                                        : "Select nationality..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                                            <Command filter={(value, search) => {
                                                // Custom filter for better matching (name starts with, contains, etc.)
                                                const label = countryOptions.find(c => c.value.toLowerCase() === value.toLowerCase())?.label ?? '';
                                                return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
                                            }}>
                                                <CommandInput placeholder="Search nationality..." />
                                                <CommandList>
                                                    <CommandEmpty>No nationality found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {countryOptions.map((country) => (
                                                            <CommandItem
                                                                // Use value for internal matching and key
                                                                value={country.value}
                                                                key={country.value}
                                                                onSelect={(currentValue) => {
                                                                    // currentValue is the 'value' prop of CommandItem
                                                                    form.setValue("nationality", currentValue, { shouldValidate: true });
                                                                    setNationalityPopoverOpen(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        country.value === field.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {country.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>Your country of citizenship.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-6 border-t dark:border-border/50 mt-8">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />} Continue
                            </Button>
                        </div>
                    </form>
                 </Form>
             </CardContent>
        </Card>
    );
}