"use client";
import { useEffect, useState } from "react";
import { Plus, Clock, Users, Pencil, Trash2, Snowflake } from "lucide-react";

type Course = {
  id: number;
  title: string;
  price: string;
  duration: string;
  students: number;
  description: string;
  frozen: boolean;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    price: "",
    duration: "",
    students: 0,
    description: "",
  });

  // 🔄 LocalStorage'dan yuklash yoki 5 ta kurs bilan to‘ldirish
  useEffect(() => {
    const saved = localStorage.getItem("courses");
    if (saved) {
      setCourses(JSON.parse(saved));
    } else {
      const defaultCourses: Course[] = [
        {
          id: 1,
          title: "Flutter dasturlash",
          price: "12,000",
          duration: "8 oy",
          students: 15,
          description: "yangi kurs",
          frozen: false,
        },
        {
          id: 2,
          title: "IOS",
          price: "3,300,000",
          duration: "4 yil",
          students: 15,
          description: "yangi kurs",
          frozen: false,
        },
        {
          id: 3,
          title: "SMM",
          price: "22,000,000",
          duration: "8 oy",
          students: 15,
          description: "kunlik",
          frozen: false,
        },
        {
          id: 4,
          title: "Frontend",
          price: "1,500,000",
          duration: "8 oy",
          students: 15,
          description: "Frontend",
          frozen: false,
        },
        {
          id: 5,
          title: "Backend",
          price: "1,400,000",
          duration: "7 oy",
          students: 15,
          description: "Backend",
          frozen: false,
        },
      ];
      setCourses(defaultCourses);
      localStorage.setItem("courses", JSON.stringify(defaultCourses));
    }
  }, []);

  // 💾 LocalStorage saqlash
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }, [courses]);

  // ➕ Kurs qo‘shish
  const addCourse = () => {
    if (!newCourse.title.trim() || !newCourse.price.trim()) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }
    const newItem: Course = {
      id: Date.now(),
      title: newCourse.title,
      price: newCourse.price,
      duration: newCourse.duration || "Noma’lum",
      students: newCourse.students || 0,
      description: newCourse.description || "",
      frozen: false,
    };
    setCourses([...courses, newItem]);
    setModalOpen(false);
    setNewCourse({ title: "", price: "", duration: "", students: 0, description: "" });
  };

  // 🧊 Muzlatish/Eritish
  const toggleFreeze = (id: number) => {
    setCourses(
      courses.map((c) =>
        c.id === id ? { ...c, frozen: !c.frozen } : c
      )
    );
  };

  // ❌ O‘chirish
  const deleteCourse = (id: number) => {
    if (confirm("Kursni o‘chirishni xohlaysizmi?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 bg-[#0d0d0d] min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold">📚 Kurslar</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus size={18} /> Kurs qo‘shish
        </button>
      </div>

      {/* Kurs kartalari */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#1a1a1a] p-5 rounded-2xl shadow-md border border-gray-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-gray-400 text-sm">{course.description}</p>
                </div>
                <div className="bg-gray-800 px-3 py-1 rounded-lg text-sm font-medium">
                  {course.price} UZS
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <Clock size={16} /> {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} /> {course.students} students
                </div>
              </div>

              <div className="flex justify-between items-center mt-5 flex-wrap gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 rounded-lg hover:bg-gray-800 text-sm">
                  <Pencil size={15} /> Edit
                </button>

                <button
                  onClick={() => deleteCourse(course.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 rounded-lg hover:bg-red-700 text-sm"
                >
                  <Trash2 size={15} /> O‘chirish
                </button>

                <button
                  onClick={() => toggleFreeze(course.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                    course.frozen
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <Snowflake size={15} /> {course.frozen ? "Eritish" : "Muzlatish"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-10">
            Hozircha kurslar mavjud emas.
          </p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-6 rounded-2xl w-[90%] max-w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Yangi kurs qo‘shish</h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Kurs nomi"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="bg-gray-900 px-3 py-2 rounded-lg outline-none"
              />
              <input
                type="text"
                placeholder="Narxi (UZS)"
                value={newCourse.price}
                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                className="bg-gray-900 px-3 py-2 rounded-lg outline-none"
              />
              <input
                type="text"
                placeholder="Davomiyligi (oy/yil)"
                value={newCourse.duration}
                onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                className="bg-gray-900 px-3 py-2 rounded-lg outline-none"
              />
              <input
                type="number"
                placeholder="Talabalar soni"
                value={newCourse.students}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, students: Number(e.target.value) })
                }
                className="bg-gray-900 px-3 py-2 rounded-lg outline-none"
              />
              <input
                type="text"
                placeholder="Kurs tavsifi"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                className="bg-gray-900 px-3 py-2 rounded-lg outline-none"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={addCourse}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Qo‘shish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
