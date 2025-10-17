"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";

const initialGroups = [
  { name: "Frontend", description: "React, Tailwind, JavaScript kursi" },
  { name: "Backend", description: "Node.js, Express, MongoDB kursi" },
  { name: "Python Data Science", description: "Data Analysis va ML" },
];

export default function Groups() {
  const [groups, setGroups] = useState<{ name: string; description: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("groups") || "null");
      setGroups(saved || initialGroups);
    } catch (error) {
      setGroups(initialGroups);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addGroup = () => {
    if (!form.name.trim()) {
      alert("Guruh nomini kiriting!");
      return;
    }
    const newGroups = [...groups, form];
    setGroups(newGroups);
    localStorage.setItem("groups", JSON.stringify(newGroups));
    setForm({ name: "", description: "" });
    setIsModalOpen(false);
  };

  const deleteGroup = (index: number) => {
    const newGroups = groups.filter((_, i) => i !== index);
    setGroups(newGroups);
    localStorage.setItem("groups", JSON.stringify(newGroups));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Guruhlar Bo‘limi</h1>

      {/* Qo‘shish tugmasi */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg shadow-md"
        >
          <Plus size={20} /> Guruh Qo‘shish
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 md:p-8 rounded-xl w-11/12 md:w-1/2 shadow-2xl text-white">
            <h2 className="text-2xl font-semibold mb-5 text-blue-400">Yangi Guruh Qo‘shish</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleInput}
                placeholder="Guruh nomi"
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleInput}
                placeholder="Tavsif (ixtiyoriy)"
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition shadow"
              >
                Bekor qilish
              </button>
              <button
                onClick={addGroup}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow"
              >
                Qo‘shish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guruhlar kartalari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.length === 0 && (
          <p className="col-span-full text-center text-gray-400 mt-10">Guruhlar mavjud emas</p>
        )}
        {groups.map((g, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">{g.name}</h3>
            <p className="text-gray-300 mb-4">{g.description || "Tavsif kiritilmagan"}</p>
            <button
              onClick={() => deleteGroup(index)}
              className="flex items-center gap-2 text-red-500 hover:text-red-400 transition font-medium"
            >
              <Trash2 size={18} /> O‘chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
