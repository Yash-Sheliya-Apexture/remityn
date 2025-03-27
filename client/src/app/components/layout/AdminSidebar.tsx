// frontend/src/components/layout/AdminSidebar.tsx
import Link from 'next/link';
import { FaCoins, FaUsers, FaTachometerAlt, FaMoneyBillWave } from 'react-icons/fa'; // Example icons

const AdminSidebar = () => {
    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen py-6 px-3">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-center text-white">Wise Admin</h2>
            </div>
            <nav>
                <ul>
                    <li className="mb-3"> {/* Increased margin-bottom for spacing */}
                        <Link href="/admin" className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200"> {/* Increased padding and transition */}
                            <FaTachometerAlt className="mr-3 text-lg" /> {/* Increased icon size and margin */}
                            <span className="text-base">Dashboard</span> {/* Increased text size */}
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/currencies" className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200">
                            <FaCoins className="mr-3 text-lg" />
                            <span className="text-base">Currencies</span>
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/users" className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200">
                            <FaUsers className="mr-3 text-lg" />
                            <span className="text-base">Users</span>
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/transactions" className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200">
                            <FaMoneyBillWave className="mr-3 text-lg" />
                            <span className="text-base">Transactions</span>
                        </Link>
                    </li>
                    {/* Add more admin navigation links here */}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;