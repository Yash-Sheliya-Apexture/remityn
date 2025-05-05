// frontend/src/components/inbox/InboxSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Inbox } from 'lucide-react';

export const InboxSkeleton: React.FC = () => {
    return (
        <section className="Your-Inbox py-8 md:py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                     <div className="flex items-center gap-2">
                         <Inbox className="size-7 text-primary opacity-50" />
                         <Skeleton className="h-8 w-40" /> {/* Title Skeleton */}
                     </div>
                    <Skeleton className="h-9 w-24" /> {/* Refresh Button Skeleton */}
                </div>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-lg" /> // Message card skeleton
                    ))}
                </div>
                <div className="flex justify-center items-center gap-2 mt-8">
                     <Skeleton className="h-9 w-24" /> {/* Prev Button Skeleton */}
                     <Skeleton className="h-5 w-20" /> {/* Page Info Skeleton */}
                     <Skeleton className="h-9 w-24" /> {/* Next Button Skeleton */}
                </div>
            </div>
        </section>
    );
};