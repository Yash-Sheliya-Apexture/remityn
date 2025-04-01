// frontend/src/app/admin/page.tsx
export default function AdminHomePage() {
  return (
    <div className="p-4">
      <h2 className="lg:text-2xl mb-4 font-medium text-main">
        Admin Dashboard Home
      </h2>
      <p className="text-gray lg:text-lg text-sm leading-relaxed">
        Welcome to the admin panel! Here you can manage currencies, users, and
        other aspects of the application.
      </p>
      {/* Add more admin dashboard content here */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow border border-gray-300 rounded-lg p-4">
          <h3 className="font-medium text-gray mb-2.5">Total Users</h3>
          <p className="text-xl text-main font-bold text-end">150</p>
        </div>
        <div className="bg-white shadow border border-gray-300 rounded-lg p-4">
          <h3 className="font-medium text-gray mb-2.5">Total Currencies</h3>
          <p className="text-xl text-main font-bold text-end">45</p>
        </div>
        <div className="bg-white shadow border border-gray-300 rounded-lg p-4">
          <h3 className="font-medium text-gray mb-2.5">
            Transactions Today
          </h3>
          <p className="text-xl text-main font-bold text-end">32</p>
        </div>
      </div>
    </div>
  );
}