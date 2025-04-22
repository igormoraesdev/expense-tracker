"use client";

import { DashboardContent } from "@/components/page/Dashboard/DashboardContent";
import { useAuthUpdate } from "@/hooks/useAuthUpdate";

export default function Dashboard() {
  useAuthUpdate();

  return <DashboardContent />;
}
