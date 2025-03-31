import React from "react";

export default function LogoutEveryWhere() {

    // Code of Log out Every devices
//   const handleLogoutEverywhere = async () => {
//     try {
//       // 1. Make API Request to Backend
//       const response = await fetch("/api/auth/logout-everywhere", { // Replace with your actual API endpoint
//         method: "POST", // Or DELETE, depending on your backend API design
//         headers: {
//           "Content-Type": "application/json",
//           // Include your authentication token here (e.g., from localStorage or cookies)
//           // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Example if using JWT
//         },
//       });

//       if (!response.ok) {
//         // Handle error from backend (e.g., show error message to user)
//         console.error("Logout everywhere failed:", response.statusText);
//         alert("Logout everywhere failed. Please try again later."); // Simple error alert
//         return;
//       }

//       // 2. Backend Logout Successful (response.ok is true)

//       // 3. Local Frontend Logout
//       // Clear authentication tokens (example using localStorage)
//       localStorage.removeItem("authToken"); // Or whatever key you use
//       // Clear other user data from local storage/context if needed
//       localStorage.removeItem("user");
//       // ... clear cookies if you are using cookies

//       // 4. Redirect to Login Page
//       window.location.href = "/login"; // Replace "/login" with your actual login page path

//       // (Optional) Display success message to user before redirecting
//       alert("You have been logged out from all devices.");

//     } catch (error) {
//       // Handle network errors or other exceptions
//       console.error("Error during logout everywhere:", error);
//       alert("An error occurred during logout. Please try again later.");
//     }
//   };

  return (
    <section className="kill-all-account py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl text-main font-semibold">Log out everywhere</h2>

        <div className="max-w-md mt-10 ml-6">
          <div className="text-sm text-gray space-y-6">
            <p>
              Instantly protect yourself from scams, a stolen device or
              suspicious activity. This will:
            </p>
            <ul className="list-disc pl-12">
                <li>log out of all devices, including this one
                </li>
                <li>freeze all physical and digital cards
                </li>
                <li>cancel any pending transactions
                </li>
            </ul>
            <p>After you’ve activated this, you will receive an email with the steps to recover your account securely.</p>

            <button
              className="inline-flex items-center justify-center w-full px-6 py-3 text-base text-white bg-red-700 hover:bg-red-800 cursor-pointer font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out"
            //   onClick={handleLogoutEverywhere} // Attach the click handler
            >
              Log out everywhere
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}