// src/app/dashboard/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore"; // Corrigido o caminho
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !token) {
      router.replace("/auth/login");
    }
  }, [isClient, token, router]);

  // 1. O 'if' deve mostrar APENAS o carregamento.
  if (!isClient || !token) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-base-300">
        <span className="loading loading-lg loading-spinner text-primary"></span>
      </div>
    );
  }

  // 2. O return final, para usuários logados, é que deve ter a Navbar.
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
