// // app/auth/layout.tsx
// "use client";
// import React from "react";
// import "../globals.css";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// export default function AuthLayout({ children }: DashboardLayoutProps) {
//   return (
//     <>
//       <main>
//         {children}
//       </main>
//     </>
//   );
// }

// app/auth/layout.tsx

import React from "react";
import "../globals.css"; // Assuming this path is correct relative to the app directory

interface AuthLayoutProps {
  children: React.ReactNode;
}

// This is now a Server Component
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
