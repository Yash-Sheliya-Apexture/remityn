// // layout.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import Sidebar from "../../dashboard/components/Sidebar"; // Import Sidebar component
// import Header from "../../dashboard/components/Header";

// export default function DashboardLayout({ children }) {
//   // State to manage sidebar, notifications, and active section
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth/login"); // Redirect to login if not authenticated
//     }
//   }, [user, loading, router]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (loading) {
//     return <p>Loading dashboard...</p>; // Or a spinner
//   }

//   if (!user) {
//     return null; // Redirect is handled in useEffect, so return null here
//   }

//   return (
//     <div className="dashboard-layout">
//       <div className="max-w-[1440px] mx-auto">
//         <div className="flex h-screen">
//           <Sidebar
//             sidebarOpen={isSidebarOpen}
//             toggleSidebar={toggleSidebar}
//           />
//           <div className="flex-1 flex flex-col overflow-hidden">
//             <Header toggleSidebar={toggleSidebar} />
//             {/* Main Content */}
//             <main className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide">
//               <div className="max-w-5xl mx-auto px-4 sm:pb-0 pb-22">
//                 {children} {/* Render page content here */}
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // layout.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useRouter } from "next/navigation";
// import Sidebar from "../../dashboard/components/Sidebar"; // Import Sidebar component
// import Header from "../../dashboard/components/Header";

// export default function DashboardLayout({ children }) {
//   // State to manage sidebar, notifications, and active section
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth/login"); // Redirect to login if not authenticated
//     }
//   }, [user, loading, router]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (loading) {
//     return <p>Loading dashboard...</p>; // Or a spinner
//   }

//   if (!user) {
//     return null; // Redirect is handled in useEffect, so return null here
//   }

//   return (
//     <div className="dashboard-layout">
//       <div className="max-w-[1440px] mx-auto">
//         <div className="flex">
//           <Sidebar
//             sidebarOpen={isSidebarOpen}
//             toggleSidebar={toggleSidebar}
//           />
//           <div className="flex-1 flex flex-col">
//             <Header toggleSidebar={toggleSidebar} />
//             {/* Main Content */}
//             <main className="flex-1">
//               <div className="max-w-5xl mx-auto px-4 sm:pb-0 pb-22">
//                 {children} {/* Render page content here */}
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// layout.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/Header";
import BackToTopButton from '../../dashboard/components/BackToTopButton'; // Adjust path as needed

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-layout"> {/* You might want relative positioning here if needed */}
      <div className="max-w-[1440px] mx-auto">
        <div className="flex">
          <Sidebar
            sidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <div className="lg:w-[calc(100%-256px)] w-full"> {/* Ensure flex container takes height */}
            <Header toggleSidebar={toggleSidebar} />
            {/* Main Content */}
            <main className="flex-1">
              <div className="max-w-5xl mx-auto px-4 lg:pb-0 sm:pb-10 pb-18">
                {children} {/* Render page content here */}
              </div>
            </main>
          </div>
        </div>
      </div>
      <BackToTopButton />
    </div>
  );
}