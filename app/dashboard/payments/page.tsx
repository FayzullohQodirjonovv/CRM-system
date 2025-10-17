// PaymentModal.tsx
"use client";
import { useState, useEffect } from "react";

type Payment = {
  id: number;
  student: string;
  group: string;
  amount: number;
  method: string;
  month: string;
  date: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PaymentModal({ isOpen, onClose }: Props) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [student, setStudent] = useState("");
  const [group, setGroup] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Nagd");
  const [month, setMonth] = useState(new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }));
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const saved = localStorage.getItem("payments");
    if (saved) setPayments(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    if (!student || !group || !amount) return alert("Barcha maydonlar to‘ldirilishi kerak!");
    const newPayment: Payment = {
      id: Date.now(),
      student,
      group,
      amount: parseFloat(amount),
      method,
      month,
      date,
    };
    const updated = [...payments, newPayment];
    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
    onClose();
    setStudent(""); setGroup(""); setAmount(""); setMethod("Nagd"); setMonth(""); setDate(new Date().toISOString().split("T")[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Yangi to‘lov qo‘shish</h2>
        <button className="absolute top-3 right-3 text-white" onClick={onClose}>✖</button>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Talaba ismi bilan qidiring..."
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            className="border border-gray-700 rounded p-2 bg-gray-800"
          />
          <input
            type="text"
            placeholder="Guruh nomi bilan qidiring..."
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="border border-gray-700 rounded p-2 bg-gray-800"
          />
          <input
            type="number"
            placeholder="To‘lov miqdori"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-700 rounded p-2 bg-gray-800"
          />
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border border-gray-700 rounded p-2 bg-gray-800"
          >
            <option>Nagd</option>
            <option>Plastik</option>
            <option>Transfer</option>
          </select>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-700 rounded p-2 bg-gray-800"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-700 rounded p-2 bg-gray-800"
          />
          <div className="flex justify-end gap-2 mt-3">
            <button onClick={onClose} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Bekor qilish</button>
            <button onClick={handleSave} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">Saqlash</button>
          </div>
        </div>
      </div>
    </div>
  );
}
