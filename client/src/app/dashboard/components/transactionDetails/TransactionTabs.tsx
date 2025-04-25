// frontend/app/dashboard/transactions/[transactionId]/components/TransactionTabs.tsx
import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils"; // Adjust path

interface TransactionTabsProps {
    activeTab: "Updates" | "Details";
    onTabChange: (tab: "Updates" | "Details") => void;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({ activeTab, onTabChange }) => {
    const updatesTabRef = useRef<HTMLButtonElement>(null);
    const detailsTabRef = useRef<HTMLButtonElement>(null);
    const underlineRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const updatesTab = updatesTabRef.current;
        const detailsTab = detailsTabRef.current;
        const underline = underlineRef.current;

        if (underline && updatesTab && detailsTab) {
            const updateUnderlinePosition = () => {
                 const currentUpdatesTab = updatesTabRef.current;
                 const currentDetailsTab = detailsTabRef.current;
                 const currentUnderline = underlineRef.current;
                 if (!currentUpdatesTab || !currentDetailsTab || !currentUnderline) return;

                if (activeTab === "Updates") {
                    currentUnderline.style.width = `${currentUpdatesTab.offsetWidth}px`;
                    currentUnderline.style.transform = `translateX(${currentUpdatesTab.offsetLeft}px)`;
                } else if (activeTab === "Details") {
                    currentUnderline.style.width = `${currentDetailsTab.offsetWidth}px`;
                    currentUnderline.style.transform = `translateX(${currentDetailsTab.offsetLeft}px)`;
                }
            };

            let rafId: number | null = null;
            const handleResize = () => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(updateUnderlinePosition);
            };

            updateUnderlinePosition();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                if (rafId) cancelAnimationFrame(rafId);
            };
        }
    }, [activeTab]);

    return (
        <div className="border-b dark:border-border px-4 sm:px-6">
            <nav className="-mb-px flex gap-4 sm:gap-6 relative" aria-label="Tabs">
                <button
                    ref={updatesTabRef}
                    onClick={() => onTabChange("Updates")}
                    className={cn(
                        "whitespace-nowrap border-b-2 capitalize cursor-pointer  py-4 px-1 text-sm font-medium transition-colors duration-200 ease-in-out",
                        activeTab === "Updates"
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    )}
                    aria-current={activeTab === "Updates" ? "page" : undefined}
                >
                    Updates
                </button>
                <button
                    ref={detailsTabRef}
                    onClick={() => onTabChange("Details")}
                    className={cn(
                        "whitespace-nowrap border-b-2 capitalize cursor-pointer py-4 px-1 text-sm font-medium transition-colors duration-200 ease-in-out",
                        activeTab === "Details"
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    )}
                    aria-current={activeTab === "Details" ? "page" : undefined}
                >
                    Details
                </button>
                {/* Animated underline */}
                <span
                    ref={underlineRef}
                    className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out block"
                    style={{ width: 0, transform: 'translateX(0px)' }} // Initial state set by JS effect
                />
            </nav>
        </div>
    );
};

export default TransactionTabs;