"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Trash2, Edit, Plus, X } from "lucide-react";

type Teacher = {
  firstName: string;
  lastName: string;
  email: string;
  status: "faol" | "ishdan bo'shatilgan";
};

const initialTeachers: Teacher[] = [
  { firstName: "Davron01", lastName: "Raimjonov", email: "raimjonov03@mail.ru", status: "faol" },
  { firstName: "Shahriyor", lastName: "Malikov", email: "malikovshahriyor9@gmail.com", status: "ishdan bo'shatilgan" },
];

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<Teacher>({ firstName: "", lastName: "", email: "", status: "faol" });
  const [error, setError] = useState<{ firstName: string; lastName: string; email: string }>({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("teachers") || "[]") as Teacher[];
      setTeachers(saved.length ? saved : initialTeachers);
    } catch {
      setTeachers(initialTeachers);
    }
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const validate = () => {
    let valid = true;
    let newError = { firstName: "", lastName: "", email: "" };

    if (!form.firstName.trim()) {
      newError.firstName = "Ism bo‘sh bo‘lishi mumkin emas!";
      valid = false;
    }
    if (!form.lastName.trim()) {
      newError.lastName = "Familiya bo‘sh bo‘lishi mumkin emas!";
      valid = false;
    }
    if (!form.email.trim()) {
      newError.email = "Email bo‘sh bo‘lishi mumkin emas!";
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newError.email = "Email format noto‘g‘ri!";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const addTeacher = () => {
    if (!validate()) return;
    const newTeachers = [...teachers, form];
    setTeachers(newTeachers);
    localStorage.setItem("teachers", JSON.stringify(newTeachers));
    setForm({ firstName: "", lastName: "", email: "", status: "faol" });
    setIsModalOpen(false);
  };

  const deleteTeacher = (index: number) => {
    const newTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(newTeachers);
    localStorage.setItem("teachers", JSON.stringify(newTeachers));
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Ustozlar Bo‘limi</h1>

      {/* Input & Add Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1 w-full">
          <div>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleInput}
              placeholder="Ism"
              className={`border p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                error.firstName ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
              } bg-gray-900`}
            />
            {error.firstName && <p className="text-red-500 text-sm mt-1">{error.firstName}</p>}
          </div>

          <div>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleInput}
              placeholder="Familiya"
              className={`border p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                error.lastName ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
              } bg-gray-900`}
            />
            {error.lastName && <p className="text-red-500 text-sm mt-1">{error.lastName}</p>}
          </div>

          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleInput}
              placeholder="Email"
              className={`border p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                error.email ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
              } bg-gray-900`}
            />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>

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
          className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center w-full md:w-auto"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-lg w-full md:w-1/2 shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Yangi Ustoz Qo‘shish</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={24} className="text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInput}
                  placeholder="Ism"
                  className={`border p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    error.firstName ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
                  } bg-gray-800`}
                />
                {error.firstName && <p className="text-red-500 text-sm mt-1">{error.firstName}</p>}
              </div>

              <div>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInput}
                  placeholder="Familiya"
                  className={`border p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    error.lastName ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
                  } bg-gray-800`}
                />
                {error.lastName && <p className="text-red-500 text-sm mt-1">{error.lastName}</p>}
              </div>

              <div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                  placeholder="Email"
                  className={`border p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    error.email ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
                  } bg-gray-800`}
                />
                {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
              </div>

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

      {/* Teachers Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-900 shadow rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left">Ism</th>
              <th className="px-6 py-3 text-left">Familiya</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Holat</th>
              <th className="px-6 py-3 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {teachers.map((t, index) => (
              <tr
                key={t.email + index} // uniq key
                className={`hover:bg-gray-700 transition ${
                  t.status === "ishdan bo'shatilgan" ? "bg-gray-900 text-gray-400" : "bg-gray-900"
                }`}
              >
                <td className="px-6 py-3">{t.firstName}</td>
                <td className="px-6 py-3">{t.lastName}</td>
                <td className="px-6 py-3 break-words">{t.email}</td>
                <td className="px-6 py-3 font-medium">{t.status}</td>
                <td className="px-6 py-3 flex flex-wrap gap-2">
                  <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition">
                    <Edit size={16} /> Tahrirlash
                  </button>
                  <button
                    onClick={() => deleteTeacher(index)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
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
