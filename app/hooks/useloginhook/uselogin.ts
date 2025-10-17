"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      // Mock user (faqat frontend test uchun)
      const mockUser = {
        email: "usern88@mail.ru",
        password: "12345678",
        token: "mock_token_12345",
      };

      await new Promise((res) => setTimeout(res, 1000));

      if (
        data.email === mockUser.email &&
        data.password === mockUser.password
      ) {
        return { data: { access_token: mockUser.token } };
      } else {
        throw new Error("Email yoki parol noto‘g‘ri");
      }
    },
    onSuccess: (res) => {
      localStorage.setItem("access_token", res.data.access_token);
      toast.success(" Kirish muvaffaqiyatli!");
      router.push("/Dashboard");

    },
    onError: (err: any) => {
      toast.error(err.message || "Login xato!");
    },
  });
}
