"use client";

import { AuthProvider } from '../contexts/AuthContext';
import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';
import AppPreloader from './ui/AppPreloader';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import TawkToManager - only loads on client-side
const TawkToManager = dynamic(() => import('./TawkToManager'), {
    ssr: false,
});

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
    const [showAppPreloader, setShowAppPreloader] = useState(true);
    const originalBodyOverflowRef = useRef<string | null>(null);

    const tawkToPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const tawkToWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
    const shouldLoadTawkTo = tawkToPropertyId && tawkToWidgetId;

    useEffect(() => {
        // This effect manages body overflow during preloader display
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
            // Cleanup function to restore overflow
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
                {/* Render children immediately to avoid content layout shift */}
                {children}
            </AuthProvider>
            
            <div id="portal-root"></div>
            
            {/* Load TawkTo after preloader is done */}
            {!showAppPreloader && shouldLoadTawkTo && <TawkToManager />}
        </>
    );
}