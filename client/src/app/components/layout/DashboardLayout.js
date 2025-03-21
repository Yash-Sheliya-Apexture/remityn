// layout.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import Sidebar from "../../dashboard/components/Sidebar"; // Import Sidebar component
import Header from "../../dashboard/components/Header";

export default function DashboardLayout({ children }) {
  // State to manage sidebar, notifications, and active section
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isSendModalOpen, setIsSendModalOpen] = useState(false); // State for Send Money Modal
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false); // State for Add Money Modal

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return <p>Loading dashboard...</p>; // Or a spinner
  }

  if (!user) {
    return null; // Redirect is handled in useEffect, so return null here
  }

  return (
    <div className="dashboard-layout">

        <div className="bg-white max-w-[1440px] mx-auto">
          <div className="flex h-screen">
            <Sidebar
              sidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header toggleSidebar={toggleSidebar} />
              {/* Main Content */}
              <main className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide">
                <div className="max-w-5xl mx-auto px-4">
                  {children} {/* Render page content here */}
                </div>
              </main>
            </div>
          </div>
        </div>
    </div>
  );
}
