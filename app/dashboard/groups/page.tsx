"use client";
import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";

const initialGroups = [
  { name: "Frontend", description: "React, Tailwind, JavaScript kursi" },
  { name: "Backend", description: "Node.js, Express, MongoDB kursi" },
  { name: "Python Data Science", description: "Data Analysis va ML" },
];

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("groups")) || initialGroups;
    setGroups(saved);
  }, []);

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addGroup = () => {
    if (!form.name) {
      alert("Guruh nomini kiriting!");
      return;
    }
    const newGroups = [...groups, form];
    setGroups(newGroups);
    localStorage.setItem("groups", JSON.stringify(newGroups));
    setForm({ name: "", description: "" });
    setIsModalOpen(false);
  };

  const deleteGroup = (index) => {
    const newGroups = groups.filter((_, i) => i !== index);
    setGroups(newGroups);
    localStorage.setItem("groups", JSON.stringify(newGroups));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Guruhlar Bo‘limi</h1>

      {/* Qo‘shish tugmasi */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 p-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <Plus size={20} /> Guruh Qo‘shish
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-11/12 md:w-1/2 shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Yangi Guruh Qo‘shish</h2>
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
                rows={3}
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={addGroup}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                Qo‘shish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guruhlar jadvali */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-900 rounded-lg shadow">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Guruh Nomi</th>
              <th className="px-6 py-3 text-left">Tavsif</th>
              <th className="px-6 py-3 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {groups.map((g, index) => (
              <tr key={index} className="hover:bg-gray-800 transition">
                <td className="px-6 py-3">{g.name}</td>
                <td className="px-6 py-3 break-words">{g.description}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => deleteGroup(index)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-400 transition"
                  >
                    <Trash2 size={16} /> O‘chirish
                  </button>
                </td>
              </tr>
            ))}
            {groups.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-400">
                  Guruhlar mavjud emas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
