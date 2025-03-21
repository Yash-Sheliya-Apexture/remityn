// import DashboardLayout from '../components/layout/DashboardLayout';

// export default function DashboardRootLayout({ children }) {
//     return <DashboardLayout>{children}</DashboardLayout>;
// }

import DashboardLayout from "../components/layout/DashboardLayout";
import { ReactNode } from "react";

interface DashboardRootLayoutProps {
  children: ReactNode;
}

export default function DashboardRootLayout({
  children,
}: DashboardRootLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
