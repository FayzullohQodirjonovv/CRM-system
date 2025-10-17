"use client";
import { useState } from "react";
import { Button, Input } from "antd";
import { toast } from "react-toastify";
import { useLogin } from "../hooks/useloginhook/uselogin";
import { LoginData } from "@/app/@types";

export default function LoginPage() {
  const { mutate, isPending } = useLogin();
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      toast.warning("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    mutate(form, {
      onSuccess: () => toast.success("Login muvaffaqiyatli!"),
      onError: (err: any) => toast.error(err?.message || "Login xato!"),
    });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">CRM Login</h2>

        <Input
          placeholder="Email"
          className="mb-3"
          value={form.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, email: e.target.value })
          }
          
        />

        <Input.Password
          placeholder="Parol"
          className="mb-3"
          value={form.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button type="primary" block loading={isPending} onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
}
