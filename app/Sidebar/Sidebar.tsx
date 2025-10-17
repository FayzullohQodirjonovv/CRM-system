"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Users, Shield, GraduationCap, User, BookOpen, DollarSign, Settings, LogOut, UserCircle, Building2 } from "lucide-react";
import Link from "next/link";

const items = [
  { label: "Asosiy", href: "/dashboard/dashboards", icon: Home },
  { label: "Menagerlar", href: "/dashboard/managers", icon: Users },
  { label: "Adminlar", href: "/dashboard/admins", icon: Shield },
  { label: "Ustozlar", href: "/dashboard/teachers", icon: GraduationCap },
  { label: "Studentlar", href: "/dashboard/students", icon: User },
  { label: "Guruhlar", href: "/dashboard/groups", icon: Building2 },
  { label: "Kurslar", href: "/dashboard/courses", icon: BookOpen },
  { label: "Payment", href: "/dashboard/payments", icon: DollarSign },
  { label: "Sozlamalar", href: "/dashboard/settings", icon: Settings },
  { label: "Profil", href: "/dashboard/profile", icon: UserCircle },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (val: boolean) => void }) {
  const path = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 w-64 h-full bg-[#0d0d0d] text-gray-100 border-r border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"} md:translate-x-0 md:static`}
    >
      {/* Header */}
      <div className="hidden md:flex items-center justify-start p-8 h-16 border-b border-gray-800 font-semibold text-white text-lg">
      Admin CRM
      </div>

      {/* Sidebar content */}
      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {items.map((it) => {
          const active = path === it.href || (it.href !== "/dashboard" && path?.startsWith(it.href));
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
                active ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="border-t border-gray-800 px-4 py-4">
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            window.location.href = "/";
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
        >
          <LogOut size={18} />
          <span>Chiqish</span>
        </button>
      </div>
    </aside>
  );
}
