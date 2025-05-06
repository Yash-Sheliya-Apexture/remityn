// // frontend/src/components/inbox/InboxSkeleton.tsx
// import { Skeleton } from "@/components/ui/skeleton";
// import { Inbox } from 'lucide-react';

// export const InboxSkeleton: React.FC = () => {
//     return (
//         <section className="Your-Inbox py-8 md:py-12">
//             <div className="max-w-4xl mx-auto px-4">
//                 <div className="flex items-center justify-between mb-6 md:mb-8">
//                      <div className="flex items-center gap-2">
//                          <Inbox className="size-7 text-primary opacity-50" />
//                          <Skeleton className="h-8 w-40" /> {/* Title Skeleton */}
//                      </div>
//                     <Skeleton className="h-9 w-24" /> {/* Refresh Button Skeleton */}
//                 </div>
//                 <div className="space-y-3">
//                     {[...Array(5)].map((_, i) => (
//                         <Skeleton key={i} className="h-24 w-full rounded-lg" /> // Message card skeleton
//                     ))}
//                 </div>
//                 <div className="flex justify-center items-center gap-2 mt-8">
//                      <Skeleton className="h-9 w-24" /> {/* Prev Button Skeleton */}
//                      <Skeleton className="h-5 w-20" /> {/* Page Info Skeleton */}
//                      <Skeleton className="h-9 w-24" /> {/* Next Button Skeleton */}
//                 </div>
//             </div>
//         </section>
//     );
// };

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Inbox } from 'lucide-react';

export const InboxSkeleton: React.FC = () => {
    return (
        <section className="py-8 md:py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header with gradient background */}
                <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-primary/30 via-primary/10 to-muted p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg backdrop-blur-sm">
                                <Inbox className="h-7 w-7 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-7 w-36 bg-primary/20" />
                                <Skeleton className="h-4 w-24 bg-primary/10" />
                            </div>
                        </div>
                        <Skeleton className="h-9 w-28 bg-primary/20" />
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                    <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-primary/20 blur-xl" />
                </div>

                {/* Skeleton for filter or search */}
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-20 rounded-md" /> 
                        <Skeleton className="h-9 w-20 rounded-md" />
                    </div>
                    <Skeleton className="h-9 w-32 rounded-md" />
                </div>

                {/* Message list skeleton */}
                <div className="space-y-3 mb-8">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 border rounded-lg">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="flex-grow space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination skeleton */}
                <div className="flex justify-center items-center gap-3 mt-6">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-9 w-9 rounded-md" />
                        ))}
                    </div>
                    <Skeleton className="h-9 w-9 rounded-md" />
                </div>
            </div>
        </section>
    );
};