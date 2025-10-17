"use client";

import { useState } from "react";
import { User, Mail, Phone, Users, Upload } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Fayzulloh Qodirjonov",
    email: "fqodirjonov1@gmail.com",
    phone: "+998 90 123 45 67",
    avatar: "", // rasm URL
    role: "Admin",
    followers: 120,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Profilim</h1>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400 text-4xl">
                {user.name.charAt(0)}
              </div>
            )}
            {/* Upload button */}
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Upload size={16} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <span className="text-gray-300 font-medium">{user.role}</span>
          <span className="text-gray-400">{user.followers} Followers</span>
        </div>

        {/* Info Form */}
        <div className="md:col-span-2 grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 text-gray-300">Ism</label>
            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Email</label>
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-gray-400" />
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Telefon</label>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-gray-400" />
              <input
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Roli</label>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-gray-400" />
              <input
                name="role"
                value={user.role}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
