// src/app/page.tsx
"use client"; // Precisamos que seja um client component para checar o login

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      router.replace("/dashboard/products");
    } else {
      router.replace("/auth/login");
    }
  }, [token, router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <span className="loading loading-lg loading-spinner text-primary"></span>
    </main>
  );
}
