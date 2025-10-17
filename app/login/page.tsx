"use client";
import { useState } from "react";
import { Button, Input } from "antd";
import { toast } from "react-toastify";
import { useLogin } from "../hooks/useloginhook/uselogin";

export default function LoginPage() {
  const { mutate, isPending } = useLogin();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = () => {
    mutate(form, {
      onSuccess: () => toast.success("Login successful!"),
      onError: () => toast.error("Login failed!"),
    });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">CRM Login</h2>
        <Input
          placeholder="Username"
          className="mb-3"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input.Password
          placeholder="Password"
          className="mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          type="primary"
          block
          loading={isPending}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
