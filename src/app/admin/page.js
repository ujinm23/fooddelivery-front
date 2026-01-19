"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Order from "../_components/Admin/FoodMenu";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminOrder() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Хэрэглэгч нэвтэрээгүй эсвэл admin эрхгүй бол homepage руу чиглүүлэх
    if (!isAuthenticated() || !isAdmin()) {
      router.push("/");
    }
  }, [user, router, isAuthenticated, isAdmin]);

  // Hydration алдааг засах - зөвхөн клиент дээр шалгах
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Уншиж байна...</p>
      </div>
    );
  }

  // Хэрэглэгч нэвтэрээгүй эсвэл admin эрхгүй бол юу ч харуулахгүй
  if (!isAuthenticated() || !isAdmin()) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Хандах эрхгүй байна...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <Order />
      </div>
    </>
  );
}
