"use client";

import AdminPage from "@/components/admin/Admin";
import Login from "@/components/admin/Login";
import { useState } from "react";

export default function AdminMainpage({ data }: { data: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if (!isLoggedIn) {
    <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <AdminPage
      setIsLoggedIn={setIsLoggedIn}
      data={data}
    />
  );
}
