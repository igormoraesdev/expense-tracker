"use client";

import { ExpensesContent } from "@/components/page/Expenses/ExpensesContent";
import { useAuthUpdate } from "@/hooks/useAuthUpdate";

export default function ExpensesDashboard() {
  useAuthUpdate();

  return <ExpensesContent />;
}
