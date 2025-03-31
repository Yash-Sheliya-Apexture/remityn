// frontend/src/components/layout/DashboardHeader.tsx
import React from 'react';

interface DashboardHeaderProps {
    title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
    return (
        <header className="DashboardHeader bg-white py-4 sticky px-4 top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-main">{title}</h1>
                {/* You can add more header content here, like user profile dropdown, notifications, etc. */}
            </div>
        </header>
    );
};

export default DashboardHeader;