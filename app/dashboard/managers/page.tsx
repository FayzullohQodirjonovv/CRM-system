"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";

export default function ManagersPage() {
  const [search, setSearch] = useState("");
  const [managers, setManagers] = useState([
    { id: 1, name: "Ali Valiyev", role: "Senior Manager", phone: "+99890 123 45 67" },
    { id: 2, name: "Dilshod Karimov", role: "Assistant", phone: "+99893 555 22 11" },
    { id: 3, name: "Lola Rasulova", role: "Project Manager", phone: "+99891 444 33 22" },
  ]);

  // 🔍 Filter
  const filtered = managers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-gray-100 bg-[#0d0d0d] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-semibold">Menagerlar ro‘yxati</h1>

        <div className="flex items-center gap-2">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-800 text-gray-200 pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Add button */}
          <button
            onClick={() => alert("Yangi meneger qo‘shish formasi ochiladi")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium"
          >
            <Plus size={18} /> Qo‘shish
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-800 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Ism Familiya</th>
              <th className="px-4 py-3">Lavozimi</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((m, i) => (
                <tr
                  key={m.id}
                  className="border-t border-gray-800 hover:bg-gray-800/60 transition"
                >
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{m.name}</td>
                  <td className="px-4 py-3">{m.role}</td>
                  <td className="px-4 py-3">{m.phone}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-blue-400 hover:underline mr-3">
                      Tahrirlash
                    </button>
                    <button
                      onClick={() =>
                        setManagers(managers.filter((x) => x.id !== m.id))
                      }
                      className="text-red-400 hover:underline"
                    >
                      O‘chirish
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Hech qanday meneger topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
