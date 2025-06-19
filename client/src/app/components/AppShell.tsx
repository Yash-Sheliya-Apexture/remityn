// app/components/AppShell.tsx
"use client";

import { AuthProvider } from '../contexts/AuthContext';
import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';
import AppPreloader from './ui/AppPreloader';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const TawkToManager = dynamic(() => import('./TawkToManager'), {
    ssr: false,
});

interface AppShellProps {
    children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
    const [showAppPreloader, setShowAppPreloader] = useState(true);
    const originalBodyOverflowRef = useRef<string | null>(null);

    const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
    const shouldLoadTawkTo = tawkToPropertyId && tawkToWidgetId;

    useEffect(() => {
        // ... (keep all your useEffect logic for body overflow here)
        if (originalBodyOverflowRef.current === null) {
            originalBodyOverflowRef.current = document.body.style.overflow || '';
        }
        if (showAppPreloader) {
            document.body.style.overflow = 'hidden';
        } else {
            if (originalBodyOverflowRef.current !== null) {
                document.body.style.overflow = originalBodyOverflowRef.current;
            }
        }
        const capturedOriginalOverflow = originalBodyOverflowRef.current;
        return () => {
            if (document.body.style.overflow === 'hidden' && capturedOriginalOverflow !== null) {
                document.body.style.overflow = capturedOriginalOverflow;
            }
        };
    }, [showAppPreloader]);

    const handlePreloaderComplete = useCallback(() => {
        setShowAppPreloader(false);
    }, []);

    return (
        <>
            <AnimatePresence>
                {showAppPreloader && (
                    <AppPreloader onAnimationComplete={handlePreloaderComplete} />
                )}
            </AnimatePresence>

            <AuthProvider>
                {!showAppPreloader && children}
            </AuthProvider>
            
            <div id="portal-root"></div>
            {!showAppPreloader && shouldLoadTawkTo && <TawkToManager />}
        </>
    );
}