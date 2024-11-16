import "../globals.css";
import { ReactNode } from "react";
import { SideNavbar } from "@/components/ui/SideNavbar";
import { Providers } from "../providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "../../../config";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">
        <Providers initialState={initialState}>
          <SideNavbar />
          <main className="flex-1 overflow-auto bg-gray-50">
            <div className="h-full">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
