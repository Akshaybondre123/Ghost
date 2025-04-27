"use client";

import { DashboardCards } from "@/components/dashboard-cards";
import { DashboardHeader } from "@/components/dashboard-header";
import { useUser } from "@/lib/useUser"; // <--- use the client hook

export default function Dashboard() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>; // you can replace with spinner
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader user={user} />
      <DashboardCards />
    </div>
  );
}
