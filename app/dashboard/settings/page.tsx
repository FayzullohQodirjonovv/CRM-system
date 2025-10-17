"use client";
import { useState } from "react";
import { User, Settings as Gear, Bell } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const [profile, setProfile] = useState({
    name: "Fayzulloh Qodirjonov",
    email: "fqodirjonov1@gmail.com",
    avatar: "",
  });
  const [system, setSystem] = useState({
    language: "Uzbek",
    currency: "USD",
    timezone: "GMT+5",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSystem({ ...system, [e.target.name]: e.target.value });

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Sozlamalar</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab("account")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === "account"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          <User size={18} /> Hisob
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === "system"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          <Gear size={18} /> Tizim
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === "notifications"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          <Bell size={18} /> Bildirishnomalar
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        {activeTab === "account" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-gray-300">Ism</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-300">Email</label>
              <input
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-gray-300">Avatar URL</label>
              <input
                name="avatar"
                value={profile.avatar}
                onChange={handleProfileChange}
                placeholder="Rasm URL"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-gray-300">Til</label>
              <select
                name="language"
                value={system.language}
                onChange={handleSystemChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Uzbek">Uzbek</option>
                <option value="Russian">Russian</option>
                <option value="English">English</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-300">Valyuta</label>
              <select
                name="currency"
                value={system.currency}
                onChange={handleSystemChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="UZS">UZS</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-300">Vaqt zonasi</label>
              <select
                name="timezone"
                value={system.timezone}
                onChange={handleSystemChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="GMT+5">GMT+5 (Tashkent)</option>
                <option value="GMT+3">GMT+3 (Moscow)</option>
                <option value="GMT+1">GMT+1 (London)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="grid grid-cols-1 gap-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="email"
                checked={notifications.email}
                onChange={handleNotificationChange}
                className="w-5 h-5 accent-blue-500"
              />
              <span>Email orqali bildirishnomalar olish</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="push"
                checked={notifications.push}
                onChange={handleNotificationChange}
                className="w-5 h-5 accent-blue-500"
              />
              <span>Push bildirishnomalar olish</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
