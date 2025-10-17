"use client";
import { useEffect, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";

type Course = {
  id: number;
  title: string;
  teacher: string;
  duration: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [newCourse, setNewCourse] = useState({ title: "", teacher: "", duration: "" });

  // 🧠 LocalStorage’dan yuklash
  useEffect(() => {
    const stored = localStorage.getItem("courses");
    if (stored) setCourses(JSON.parse(stored));
  }, []);

  // 💾 Har safar o‘zgarganda saqlash
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  // ➕ Kurs qo‘shish
  const addCourse = () => {
    if (!newCourse.title.trim() || !newCourse.teacher.trim()) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...newCourse,
    };
    setCourses([...courses, newItem]);
    setNewCourse({ title: "", teacher: "", duration: "" });
  };

  // ❌ O‘chirish
  const deleteCourse = (id: number) => {
    if (confirm("Kursni o‘chirishni tasdiqlaysizmi?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  // 🔍 Filterlash
  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#0d0d0d] min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-semibold">📚 Kurslar ro‘yxati</h1>

        <div className="flex items-center gap-2">
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
        </div>
      </div>

      {/* Add form */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Kurs nomi"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          className="bg-gray-900 px-3 py-2 rounded-lg flex-1"
        />
        <input
          type="text"
          placeholder="O‘qituvchi"
          value={newCourse.teacher}
          onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
          className="bg-gray-900 px-3 py-2 rounded-lg flex-1"
        />
        <input
          type="text"
          placeholder="Davomiyligi (soat)"
          value={newCourse.duration}
          onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
          className="bg-gray-900 px-3 py-2 rounded-lg flex-1"
        />
        <button
          onClick={addCourse}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Qo‘shish
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-800 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Kurs nomi</th>
              <th className="px-4 py-3">O‘qituvchi</th>
              <th className="px-4 py-3">Davomiyligi</th>
              <th className="px-4 py-3 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((c, i) => (
                <tr
                  key={c.id}
                  className="border-t border-gray-800 hover:bg-gray-800/60 transition"
                >
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{c.title}</td>
                  <td className="px-4 py-3">{c.teacher}</td>
                  <td className="px-4 py-3">{c.duration}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteCourse(c.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Hech qanday kurs topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
