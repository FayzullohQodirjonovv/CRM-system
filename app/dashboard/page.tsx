"use client";
import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  return (
    <div className="flex bg-[#0d0d0d] min-h-screen text-gray-100">
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}