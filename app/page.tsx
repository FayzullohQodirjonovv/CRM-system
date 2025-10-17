"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "./hooks/useloginhook/uselogin";

// ThemeProvider yaratmasdan oddiy dark mode toggle
export default function LoginPage() {
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useLogin();
  const [email, setEmail] = useState("usern88@mail.ru");
  const [password, setPassword] = useState("12345678");
  const [isDark, setIsDark] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) router.push("/dashboard");
  }, [isSuccess, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-black transition-colors">
      {/* Toggle tugmasi */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg hover:opacity-80 transition-colors z-10"
        aria-label="Dark mode o'zgartirish"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-2xl w-90 border border-gray-300 dark:border-gray-700 transition-colors"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-2 flex items-center justify-center">
            Xush kelibsiz 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Hisobingizga kirish uchun email va parolini kiriting
          </p>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-3 mb-4 rounded-xl text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-orange-500 transition-colors"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Parol"
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-3 mb-6 rounded-xl text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-orange-500 transition-colors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 dark:bg-orange-500 text-white py-3 rounded-xl hover:bg-blue-600 dark:hover:bg-orange-600 disabled:opacity-50 font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {isPending && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V8a8 8 0 110 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          )}
          {isPending ? "Kirish..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}
