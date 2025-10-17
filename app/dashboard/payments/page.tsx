"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";

interface Payment {
  student: string;
  amount: number | string;
  date: string;
  status: string;
}

const initialPayments: Payment[] = [
  { student: "Davron Raimjonov", amount: 500, date: "2025-10-17", status: "To‘landi" },
  { student: "Shahriyor Malikov", amount: 300, date: "2025-10-15", status: "To‘lanmadi" },
  { student: "Alibek Tursunboyev", amount: 450, date: "2025-10-16", status: "To‘landi" },
];

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<Payment>({ student: "", amount: "", date: "", status: "To‘landi" });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("payments") || "null");
      setPayments(saved || initialPayments);
    } catch {
      setPayments(initialPayments);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPayment = () => {
    if (!form.student || !form.amount || !form.date) {
      alert("Iltimos barcha maydonlarni to‘ldiring!");
      return;
    }
    const newPayments = [...payments, form];
    setPayments(newPayments);
    localStorage.setItem("payments", JSON.stringify(newPayments));
    setForm({ student: "", amount: "", date: "", status: "To‘landi" });
    setIsModalOpen(false);
  };

  const deletePayment = (index: number) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
    localStorage.setItem("payments", JSON.stringify(newPayments));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">To‘lovlar Bo‘limi</h1>

      {/* Qo‘shish tugmasi */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg shadow-md"
        >
          <Plus size={20} /> To‘lov Qo‘shish
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 md:p-8 rounded-xl w-full max-w-lg shadow-2xl text-white">
            <h2 className="text-2xl font-semibold mb-5 text-blue-400">Yangi To‘lov Qo‘shish</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                name="student"
                value={form.student}
                onChange={handleInput}
                placeholder="O‘quvchi nomi"
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="amount"
                value={form.amount}
                onChange={handleInput}
                placeholder="Summasi ($)"
                type="number"
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="date"
                value={form.date}
                onChange={handleInput}
                type="date"
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleInput}
                className="border border-gray-700 bg-gray-800 p-3 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="To‘landi">To‘landi</option>
                <option value="To‘lanmadi">To‘lanmadi</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition shadow"
              >
                Bekor qilish
              </button>
              <button
                onClick={addPayment}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow"
              >
                Qo‘shish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* To‘lovlar jadvali */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-900 rounded-lg shadow">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">O‘quvchi</th>
              <th className="px-6 py-3 text-left">Summasi ($)</th>
              <th className="px-6 py-3 text-left">Sana</th>
              <th className="px-6 py-3 text-left">Holat</th>
              <th className="px-6 py-3 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {payments.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                  To‘lovlar mavjud emas
                </td>
              </tr>
            )}
            {payments.map((p, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-800 transition ${p.status === "To‘lanmadi" ? "bg-gray-950" : ""}`}
              >
                <td className="px-6 py-3">{p.student}</td>
                <td className="px-6 py-3">{p.amount}</td>
                <td className="px-6 py-3">{p.date}</td>
                <td className={`px-6 py-3 font-medium ${p.status === "To‘landi" ? "text-green-400" : "text-red-500"}`}>
                  {p.status}
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => deletePayment(index)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-400 transition font-medium"
                  >
                    <Trash2 size={18} /> O‘chirish
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
