"use client";
import { useState, useEffect } from "react";
import { Trash2, Edit, Plus } from "lucide-react";

const initialTeachers = [
  { firstName: "Davron01", lastName: "Raimjonov", email: "raimjonov03@mail.ru", status: "faol" },
  { firstName: "Davron01", lastName: "Raimjonov", email: "raimjonov04@mail.ru", status: "faol" },
  { firstName: "Shahriyor", lastName: "Boyyyyyy", email: "malikovshahriyor929@gmail.com", status: "faol" },
  { firstName: "Davron01", lastName: "Raimjonov", email: "raimjonov05@mail.ru", status: "faol" },
  { firstName: "Shahriyor", lastName: "Malikov", email: "malikovshahriyor9@gmail.com", status: "ishdan bo'shatilgan" },
  { firstName: "Davron", lastName: "Raimjonov", email: "davron_raimjonov46@mail.ru", status: "ishdan bo'shatilgan" },
  { firstName: "Alibek", lastName: "Tursunboyev", email: "alibekteacher@mail.ru", status: "faol" },
  { firstName: "Alibek", lastName: "Tursunboyev", email: "alibekgithub01@gmail.com", status: "faol" },
  { firstName: "Shahriyor", lastName: "Malikov", email: "malikovs@gmail.com", status: "faol" },
  { firstName: "Alibek", lastName: "Tursunboyev", email: "tursunboyevfrontend@gmail.com", status: "faol" },
  { firstName: "Abdulloh", lastName: "Zokirov", email: "abzakirov@maisl.ru", status: "faol" },
  { firstName: "Otabek", lastName: "Web", email: "web@mail.com", status: "faol" },
  { firstName: "Muhammad", lastName: "Sadullayev", email: "user@mail.ru", status: "ishdan bo'shatilgan" },
  { firstName: "Muhammad", lastName: "Sadullayev", email: "user2@mail.ru", status: "faol" },
];

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", status: "faol" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("teachers")) || initialTeachers;
    setTeachers(saved);
  }, []);

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addTeacher = () => {
    if (!form.firstName || !form.lastName || !form.email) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }
    const newTeachers = [...teachers, form];
    setTeachers(newTeachers);
    localStorage.setItem("teachers", JSON.stringify(newTeachers));
    setForm({ firstName: "", lastName: "", email: "", status: "faol" });
    setIsModalOpen(false);
  };

  const deleteTeacher = (index) => {
    const newTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(newTeachers);
    localStorage.setItem("teachers", JSON.stringify(newTeachers));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Ustozlar Bo‘limi</h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleInput}
            placeholder="Ism"
            className="border border-gray-700 bg-gray-900 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleInput}
            placeholder="Familiya"
            className="border border-gray-700 bg-gray-900 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleInput}
            placeholder="Email"
            className="border border-gray-700 bg-gray-900 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleInput}
            className="border border-gray-700 bg-gray-900 p-3 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="faol">Faol</option>
            <option value="ishdan bo'shatilgan">Ishdan bo'shatilgan</option>
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#101828] p-4 rounded-lg hover:bg-[black] transition flex items-center justify-center"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-11/12 md:w-1/2 shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Yangi Ustoz Qo‘shish</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleInput}
                placeholder="Ism"
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleInput}
                placeholder="Familiya"
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleInput}
                placeholder="Email"
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleInput}
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="faol">Faol</option>
                <option value="ishdan bo'shatilgan">Ishdan bo'shatilgan</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={addTeacher}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                Qo‘shish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ustozlar Jadvali */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-900 rounded-lg shadow">
          <thead className="bg-gray-800 bg-black">
            <tr>
              <th className="px-6 py-3 text-left">Ism</th>
              <th className="px-6 py-3 text-left">Familiya</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Holat</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-black">
            {teachers.map((t, index) => (
              <tr
                key={index}
                className={`hover:bg-[grey] transition ${
                  t.status === "ishdan bo'shatilgan" ? "bg-black" : ""
                }`}
              >
                <td className="px-6 py-3">{t.firstName}</td>
                <td className="px-6 py-3">{t.lastName}</td>
                <td className="px-6 py-3 break-words">{t.email}</td>
                <td className="px-6 py-3 font-medium">{t.status}</td>
                <td className="px-6 py-3 flex gap-3">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition">
                    <Edit size={16} /> Tahrirlash
                  </button>
                  <button
                    onClick={() => deleteTeacher(index)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={16} /> O‘chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



// const initialTeachers = [
//   { firstName: "Davron01", lastName: "Raimjonov", email: "raimjonov03@mail.ru", status: "faol" },
//   { firstName: "Davron01", lastName: "Raimjonov", email: "raimjonov04@mail.ru", status: "faol" },
//   { firstName: "Shahriyor", lastName: "Boyyyyyy", email: "malikovshahriyor929@gmail.com", status: "faol" },
//   { firstName: "Davron01", lastName: "Raimjonov", email: "raimjonov05@mail.ru", status: "faol" },
//   { firstName: "Shahriyor", lastName: "Malikov", email: "malikovshahriyor9@gmail.com", status: "ishdan bo'shatilgan" },
//   { firstName: "Davron", lastName: "Raimjonov", email: "davron_raimjonov46@mail.ru", status: "ishdan bo'shatilgan" },
//   { firstName: "Alibek", lastName: "Tursunboyev", email: "alibekteacher@mail.ru", status: "faol" },
//   { firstName: "Alibek", lastName: "Tursunboyev", email: "alibekgithub01@gmail.com", status: "faol" },
//   { firstName: "Shahriyor", lastName: "Malikov", email: "malikovs@gmail.com", status: "faol" },
//   { firstName: "Alibek", lastName: "Tursunboyev", email: "tursunboyevfrontend@gmail.com", status: "faol" },
//   { firstName: "Abdulloh", lastName: "Zokirov", email: "abzakirov@maisl.ru", status: "faol" },
//   { firstName: "Otabek", lastName: "Web", email: "web@mail.com", status: "faol" },
//   { firstName: "Muhammad", lastName: "Sadullayev", email: "user@mail.ru", status: "ishdan bo'shatilgan" },
//   { firstName: "Muhammad", lastName: "Sadullayev", email: "user2@mail.ru", status: "faol" },
// ];