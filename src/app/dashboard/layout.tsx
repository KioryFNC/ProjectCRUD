"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";

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

  if (!isClient || !token) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-xl">Carregando...</h1>
      </div>
    );
  }
  return <>{children}</>;
}
