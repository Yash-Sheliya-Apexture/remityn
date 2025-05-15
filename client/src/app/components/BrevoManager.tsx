// // app/components/BrevoManager.tsx
// "use client"; // This is a client component

// import Script from 'next/script';

// // --- Environment Variable ---
// // Get the Brevo Conversations ID from environment variables.
// // This variable must start with NEXT_PUBLIC_ to be available client-side.
// const brevoConversationsId = process.env.NEXT_PUBLIC_BREVO_CONVERSATIONS_ID;

// // --- Brevo Script Snippet ---
// // The Brevo script dynamically creates and appends a script tag.
// // We need to replicate the *initial* setup part of the script using dangerouslySetInnerHTML
// // and potentially use next/script's src attribute for the main conversations.js file.
// // However, the provided snippet itself handles loading the main script.
// // The simplest and safest way is to just provide the *entire* snippet to dangerouslySetInnerHTML
// // via next/script's inline script functionality.

// // We'll construct the full snippet string dynamically using the ID.
// const brevoFullSnippet = brevoConversationsId ? `
// (function(d, w, c) {
//     w.BrevoConversationsID = '${brevoConversationsId}'; // Use the environment variable ID
//     w[c] = w[c] || function() {
//         (w[c].q = w[c].q || []).push(arguments);
//     };
//     var s = d.createElement('script');
//     s.async = true;
//     // The main script URL is hardcoded in the original snippet
//     s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
//     if (d.head) d.head.appendChild(s);
// })(document, window, 'BrevoConversations');
// ` : ''; // If ID is missing, the snippet is an empty string

// // --- BrevoManager Component ---
// export default function BrevoManager() {
//     // If the environment variable is not set, do not render the script.
//     if (!brevoConversationsId) {
//         console.warn("BrevoManager: Missing NEXT_PUBLIC_BREVO_CONVERSATIONS_ID. Brevo Conversations disabled.");
//         return null;
//     }

//     return (
//         // Use next/script for optimized loading
//         <Script
//             id="brevo-conversations-script-manager" // Give it a unique ID
//             strategy="lazyOnload" // Load the script lazily when the browser is idle
//             // Alternatively, use "afterInteractive" if you want it to load as soon as possible after the page is interactive.
//             // For a chat widget, lazyOnload is usually appropriate.

//             // We use dangerouslySetInnerHTML to inject the entire Brevo snippet.
//             // next/script will handle appending this inline script tag to the DOM.
//             dangerouslySetInnerHTML={{ __html: brevoFullSnippet }}

//             // Optional: Add an error handler if the script fails to load
//             onError={(e) => {
//                 console.error('BrevoManager: Brevo Conversations script failed to load:', e);
//             }}
//         />
//     );
// }


// app/components/BrevoManager.tsx
"use client"; // This is a client component

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Script from 'next/script';

// --- Environment Variable ---
const brevoConversationsId = process.env.NEXT_PUBLIC_BREVO_CONVERSATIONS_ID;

// --- Brevo Script Snippet (dynamically constructed) ---
// This snippet loads the main brevo-conversations.js script.
// We need to ensure window.BrevoConversations is initialized early so we can define
// callbacks like 'onChatboxLoaded' *before* the main script fully loads.
const brevoFullSnippet = brevoConversationsId ? `
    (function(d, w, c) {
        w.BrevoConversationsID = '${brevoConversationsId}'; // Set the Conversation ID
        // Initialize w[c] as a function/queue if it doesn't exist.
        // This allows us to push commands (like 'onChatboxLoaded') to a queue
        // before the full API script loads and replaces this function with the real one.
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        var s = d.createElement('script');
        s.async = true;
        // The main script URL is hardcoded in the original snippet
        s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
        // Append the script to the head
        if (d.head) d.head.appendChild(s);
    })(document, window, 'BrevoConversations');
` : ''; // If ID is missing, the snippet is an empty string

// --- TypeScript Definition for Brevo Conversations API ---
// Based on the snippet and common chat widget patterns.
// The main function accepts commands as the first argument.
declare global {
    interface Window {
        BrevoConversations?: (command: string, ...args: any[]) => void | any;
        // Brevo also uses a queue pattern before the full script loads,
        // where commands like 'onChatboxLoaded' can be pushed to the queue.
    }
}

// --- Helper Function (Visibility Logic) ---
// This function determines whether the Brevo widget should be shown based on the current path.
// It uses the exact same logic as your Tawk.to manager's visibility helper.
const shouldShowBrevoWidgetBasedOnPath = (currentPath: string): boolean => {
    const isAdminPath = currentPath.startsWith('/admin');
    const isAuthPath = currentPath.startsWith('/auth');
    const isDashboardPath = currentPath.startsWith('/dashboard');

    // Specific checks for the dashboard pages where we *do* want it to show
    const isYourAccountPath = currentPath === '/dashboard/your-account';
    const isThemeSettingsPath = currentPath === '/dashboard/your-account/theme-settings';

    // Rule 1: Hide on admin or auth paths
    if (isAdminPath || isAuthPath) {
        // console.log(`BrevoManager (Visibility Logic): Path ${currentPath} is admin or auth. Hiding.`);
        return false;
    }

    // Rule 2: If it's a dashboard path, ONLY show it if it's the specific
    // '/dashboard/your-account' or '/dashboard/your-account/theme-settings' path.
    // Otherwise, hide it on all other dashboard sub-paths.
    if (isDashboardPath) {
         const showOnSpecificDashboardPages = isYourAccountPath || isThemeSettingsPath;
         // console.log(`BrevoManager (Visibility Logic): Path ${currentPath} is dashboard. Show on specific pages: ${showOnSpecificDashboardPages}`);
         return showOnSpecificDashboardPages;
    }

    // Rule 3: If it's not an admin, auth, or dashboard path, show it by default (e.g., public pages like '/', '/about', '/contact', etc.).
    // console.log(`BrevoManager (Visibility Logic): Path ${currentPath} is public. Showing.`);
    return true;
};

// --- BrevoManager Component ---
export default function BrevoManager() {
    const pathname = usePathname();
    // Ref to track if the Brevo API is fully initialized and ready to receive commands
    const brevoApiReady = useRef(false);

    // --- Safely Call Brevo API Function ---
    // This function attempts to call the BrevoConversations API with a command.
    // It checks if the API is marked as ready before calling.
    const callBrevoAPI = (command: string, reason: string, currentPath: string, ...args: any[]) => {
         // The API function itself should exist very early due to the snippet,
         // but we primarily rely on the brevoApiReady flag set by onChatboxLoaded
        if (brevoApiReady.current && window.BrevoConversations && typeof window.BrevoConversations === 'function') {
            try {
                console.log(`BrevoManager: Calling API command '${command}' (${reason}) for path: ${currentPath}`);
                window.BrevoConversations(command, ...args);
            } catch (error) {
                console.error(`BrevoManager: Error calling BrevoConversations API command '${command}':`, error);
            }
        } else {
             // This log can be useful during debugging to understand why a command wasn't sent
             // console.log(`BrevoManager: Brevo API not ready. Cannot call '${command}' (${reason}) for path: ${currentPath}`);
        }
    };

    // --- Effect 1: Define the onChatboxLoaded callback ---
    // This effect runs ONCE on mount to set up the listener BEFORE the main Brevo script might execute it.
    // It replaces the polling logic.
    useEffect(() => {
        if (typeof window === 'undefined') return; // Ensure running in browser
        if (!brevoConversationsId) return; // Don't do anything if ID is missing

        console.log("BrevoManager: Setting up onChatboxLoaded callback.");

        // Define the callback function
        const handleBrevoChatboxLoaded = () => {
            console.log("BrevoManager: Brevo 'onChatboxLoaded' event fired. API is now considered ready.");

            brevoApiReady.current = true; // Mark API as ready

            // Use window.location.pathname as it reflects the path the user was on
            // when the chatbox finished loading.
            const currentPathAtLoaded = window.location.pathname;

            // --- IMPLEMENT "HIDE FIRST" STRATEGY on load ---
            // Immediately hide the widget as soon as it's loaded to prevent flash,
            // then conditionally show based on the path.
            callBrevoAPI('hideChatbox', 'loaded - hide first', currentPathAtLoaded);

            // Determine the correct visibility based on the path at the moment the chatbox loaded
            const shouldShow = shouldShowBrevoWidgetBasedOnPath(currentPathAtLoaded);

            // Apply the correct visibility state
            if (shouldShow) {
                callBrevoAPI('showChatbox', 'loaded - rules allow', currentPathAtLoaded);
            } else {
                 // It's already hidden from the "hide first" call, no need to call hide again.
                 console.log(`BrevoManager: Widget remains hidden for path: ${currentPathAtLoaded} based on rules after load.`);
            }
        };

        // Register the callback using the Brevo API command pattern.
        // Even if the full script isn't loaded yet, this command will be queued.
        // Check window.BrevoConversations exists before calling, though the snippet
        // should ensure it does as a queue placeholder.
        if (window.BrevoConversations) {
            window.BrevoConversations('onChatboxLoaded', handleBrevoChatboxLoaded);
             console.log("BrevoManager: Registered 'onChatboxLoaded' callback.");
        } else {
             console.error("BrevoManager: window.BrevoConversations not available when trying to register 'onChatboxLoaded'.");
        }


        // Cleanup: Attempt to remove the callback if possible. Brevo's API might not have an explicit way.
        // For now, we'll just log that the effect is cleaning up. The ref `brevoApiReady` helps manage state.
        return () => {
             console.log("BrevoManager: Brevo onChatboxLoaded effect cleanup.");
             // A more complex cleanup might involve checking if brevoApiReady is true
             // and calling hideChatbox if the component unmounts, but for a root layout
             // component that lives across the app's lifecycle, this is often less critical
             // than managing visibility *during* navigation.
        };
    }, [brevoConversationsId]); // Dependency: Re-run if the ID changes (unlikely)


    // --- Effect 2: Update visibility on Path Changes (AFTER API is ready) ---
    // This effect runs whenever the 'pathname' changes.
     useEffect(() => {
        // Only attempt to change visibility if the API is confirmed ready by the first effect.
        if (brevoApiReady.current) {
            const currentPath = pathname; // Use the pathname from the hook for navigation changes
            const shouldShow = shouldShowBrevoWidgetBasedOnPath(currentPath);

            // Apply the correct visibility state for the new path
            if (shouldShow) {
                callBrevoAPI('showChatbox', 'navigation change', currentPath);
            } else {
                callBrevoAPI('hideChatbox', 'navigation change', currentPath);
            }
        }
        // Re-run whenever the path changes.
    }, [pathname]); // Dependency array: Depends only on pathname

    // --- Render Script ---
    // Render the Script tag only if the environment variable is set.
    // This script tag injects the initial snippet that defines window.BrevoConversations
    // as a queue and starts the loading of the main conversations.js file.
    if (!brevoConversationsId) {
        console.warn("BrevoManager: Missing NEXT_PUBLIC_BREVO_CONVERSATIONS_ID. Brevo Conversations disabled.");
        return null; // Don't render anything if ID is missing
    }

    return (
        // Use next/script for optimized loading of the inline snippet
        <Script
            id="brevo-conversations-script-manager" // Unique ID for the script tag
            strategy="lazyOnload" // Load the script when browser is idle. 'afterInteractive' is another option.
            dangerouslySetInnerHTML={{ __html: brevoFullSnippet }} // Inject the Brevo snippet code
            onError={(e) => {
                console.error('BrevoManager: Brevo Conversations script failed to load:', e);
                brevoApiReady.current = false; // Ensure flag is false on error if script fails
            }}
            // We don't need an onLoad on the Script tag itself because we are listening
            // for the *widget's* specific 'onChatboxLoaded' event via the API queue mechanism.
        />
    );
}