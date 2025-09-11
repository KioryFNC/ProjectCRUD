"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "../../store/authStore";
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

  if (!isClient || !token) {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  }
  return <>{children}</>;
}
