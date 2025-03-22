// frontend/src/app/layout.tsx
import './globals.css'
import { AuthProvider } from './contexts/AuthContext';
import { ReactNode } from 'react'; // Import ReactNode

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
                <div id="portal-root"></div> {/* Add portal root here */}
            </body>
        </html>
    );
}