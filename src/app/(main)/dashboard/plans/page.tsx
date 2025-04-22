"use client";

import { PlansContent } from "@/components/page/Plans/PlansContent";
import { useAuthUpdate } from "@/hooks/useAuthUpdate";

export default function PlansDashboard() {
  useAuthUpdate();

  return <PlansContent />;
}
