// // frontend/src/app/layout.js
// import "./globals.css";
// import { AuthProvider } from "./contexts/AuthContext";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>{children}</AuthProvider>
//         <div id="portal-root"></div> {/* Add portal root here */}
//       </body>
//     </html>
//   );
// }

// frontend/src/app/layout.js
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <div id="portal-root"></div> {/* Add portal root here */}
      </body>
    </html>
  );
}
