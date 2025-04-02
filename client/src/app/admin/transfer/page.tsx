// // frontend/src/app/admin/transfers/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import TransferList from "../components/TransferList";
// import adminTransferService from "../../services/admin/transfer";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation"; // Import useRouter
// import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// const AdminTransfersPage = () => {
//   const [transfers, setTransfers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, isAdmin, loadingAuth } = useAuth();
//   const router = useRouter(); // Initialize useRouter
//   const [statusFilter, setStatusFilter] = useState<string>("");

//   useEffect(() => {
//     // Redirect and don't fetch if auth is still loading or not admin
//     if (loadingAuth) {
//       return; // Wait for auth state to be determined
//     }
//     if (!isAdmin) {
//       router.push("/dashboard"); // Redirect non-admins to dashboard
//       return; // Stop further execution in this effect
//     }

//     fetchTransfers(); // Fetch transfers now that we are authorized
//   }, [token, isAdmin, loadingAuth, router, statusFilter]); // Added loadingAuth and router as dependencies

//   const fetchTransfers = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const filters = statusFilter ? { status: statusFilter } : {};
//       const data = await adminTransferService.getAdminTransfers(token, filters);
//       setTransfers(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load transfers.");
//       console.error("Error fetching admin transfers:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//   };

//   // Loading State (during auth loading or transfers loading)
//   if (loadingAuth || isLoading) {
//     return (
//       <div className="p-4">
//         <h2 className="text-2xl font-semibold mb-4">Admin Transfers</h2>
//         <div>
//           <Skeleton count={5} height={100} className="mb-2" />
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return <div className="p-4 text-red-500">Error: {error}</div>;
//   }

//   // Unauthorized State
//   if (!isAdmin) {
//     return <div className="p-4">You are not authorized to view this page.</div>;
//   }

//   // Main Content - Transfers List
//   return (
//     <div className="p-4">
//       <div className="space-y-2.5 pb-5 border-b border-gray-300">
//         <h2 className="text-3xl text-main font-semibold">Admin Transfers</h2>
//         <p className="text-lg max-w-4xl text-main leading-relaxed">
//         This page allows administrators to view, manage, and process transfer requests. Key features include filtering transfers by status (pending, approved, rejected), reviewing transaction details, and manually approving or canceling transfers.
//         </p>
//       </div>

//       {/* Status Filter Dropdown */}
//       <div className="my-5 flex justify-end items-center">
//         <label
//           htmlFor="statusFilter"
//           className="block  font-medium text-main mr-2"
//         >
//           Filter by Status:
//         </label>
//         <select
//           id="statusFilter"
//           className="mt-1 inline-block w-auto py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
//           value={statusFilter}
//           onChange={handleStatusFilterChange}
//         >
//           <option value="">All Statuses</option>
//           <option value="pending">Pending</option>
//           <option value="processing">Processing</option>
//           <option value="completed">Completed</option>
//           <option value="failed">Failed</option>
//           <option value="canceled">Canceled</option>
//         </select>
//       </div>

//       {/* Transfer List - Conditionally render based on isLoading */}
//       {isLoading ? (
//         <div>
//           <Skeleton count={5} height={100} className="mb-2" />
//         </div>
//       ) : (
//         <TransferList transfers={transfers} />
//       )}
//     </div>
//   );
// };

// export default AdminTransfersPage;


// frontend/src/app/admin/transfers/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import TransferList from "../components/TransferList";
import adminTransferService from "../../services/admin/transfer";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { ChevronDown, Filter, RefreshCw, AlertCircle } from "lucide-react";

const AdminTransfersPage = () => {
  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAdmin, loadingAuth } = useAuth();
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Status options with colors
  const statusOptions = [
    { value: "", label: "All Statuses", color: "bg-gray-500" },
    { value: "pending", label: "Pending", color: "bg-yellow-500" },
    { value: "processing", label: "Processing", color: "bg-blue-500" },
    { value: "completed", label: "Completed", color: "bg-green-500" },
    { value: "failed", label: "Failed", color: "bg-red-500" },
    { value: "canceled", label: "Canceled", color: "bg-gray-500" },
  ];

  useEffect(() => {
    if (loadingAuth) return;
    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }

    fetchTransfers();
  }, [token, isAdmin, loadingAuth, router, statusFilter]);

  const fetchTransfers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const filters = statusFilter ? { status: statusFilter } : {};
      const data = await adminTransferService.getAdminTransfers(token, filters);
      setTransfers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load transfers.");
      console.error("Error fetching admin transfers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setDropdownOpen(false);
  };

  const refreshData = () => {
    fetchTransfers();
  };

  // Get current status label and color
  const currentStatus =
    statusOptions.find((option) => option.value === statusFilter) ||
    statusOptions[0];

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-main text-center max-w-3xl">
            You don't have permission to access this area. Please contact your
            administrator if you believe this is a mistake.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-md border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-main">
                Transfer Management
              </h1>
              <p className="text-gray text-lg mt-4 max-w-4xl">
                This page allows administrators to view, manage, and process
                transfer requests. Key features include filtering transfers by
                status (pending, approved, rejected), reviewing transaction
                details, and manually approving or canceling transfers.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={refreshData}
                className="flex items-center cursor-pointer gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md shadow-sm transition-all duration-200"
              >
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-main">
              <Filter size={18} />
              <span className="font-medium">Filters</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex cursor-pointer items-center justify-between w-48 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm transition-colors duration-300"
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`size-3 rounded-full ${currentStatus.color}`}
                  ></span>
                  <span>{currentStatus.label}</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-200 text-gray ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {statusOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleStatusFilterChange(option.value)}
                      className={`flex items-center space-x-2 px-4 py-3 hover:bg-sky-100 cursor-pointer transition-colors duration-200 ${
                        statusFilter === option.value ? "bg-gray-100" : ""
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${option.color}`}
                      ></span>
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
              <div className="flex items-center">
                <AlertCircle size={20} className="text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Transfers List Content */}
          <div>
            <TransferList transfers={transfers} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransfersPage;
