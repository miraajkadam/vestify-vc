import "../globals.css";
import { ReactNode } from "react";
import { SideNavbar } from "@/components/ui/SideNavbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">
        <SideNavbar />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="h-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
