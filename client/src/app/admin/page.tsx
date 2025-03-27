// frontend/src/app/admin/page.tsx
export default function AdminHomePage() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard Home</h2>
            <p className="text-gray-700">Welcome to the admin panel! Here you can manage currencies, users, and other aspects of the application.</p>
            {/* Add more admin dashboard content here */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-md p-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Total Users</h3>
                    <p className="text-xl text-gray-900">150</p>
                </div>
                <div className="bg-white shadow rounded-md p-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Total Currencies</h3>
                    <p className="text-xl text-gray-900">45</p>
                </div>
                <div className="bg-white shadow rounded-md p-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Transactions Today</h3>
                    <p className="text-xl text-gray-900">32</p>
                </div>
            </div>
        </div>
    );
}