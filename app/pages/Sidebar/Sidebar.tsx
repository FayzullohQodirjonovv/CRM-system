"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Users,
  Shield,
  GraduationCap,
  User,
  BookOpen,
  DollarSign,
  Settings,
  LogOut,
  UserCircle,
  Building2,
  Menu,
  X,
} from "lucide-react";

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

export default function Sidebar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const renderMenuItems = () =>
    items.map((it) => {
      const active =
        path === it.href || (it.href !== "/dashboard" && path?.startsWith(it.href));
      const Icon = it.icon;
      return (
        <Link
          key={it.href}
          href={it.href}
          onClick={() => setIsOpen(false)} // modal yopish
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
            active
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <Icon size={18} />
          <span>{it.label}</span>
        </Link>
      );
    });

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 min-h-screen bg-[#0d0d0d] text-gray-100 border-r border-gray-800 flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="text-xl font-bold">⚙️ Admin CRM</div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">{renderMenuItems()}</nav>
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

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-[#0d0d0d] text-gray-100 px-4 py-3 border-b border-gray-800">
        <div className="text-xl font-bold">⚙️ Admin CRM</div>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-64 bg-[#0d0d0d] h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div className="text-xl font-bold">⚙️ Admin CRM</div>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1">{renderMenuItems()}</nav>
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
          </div>
        </div>
      )}
    </>
  );
}
