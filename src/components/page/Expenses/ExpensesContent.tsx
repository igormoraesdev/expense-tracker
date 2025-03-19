"use client";

import { ExpensesList } from "./components/ExpensesList";
import { TotalSpend } from "./components/TotalSpend";

export function ExpensesContent() {
  return (
    <div className="container flex flex-col mx-auto p-6 gap-8">
      <TotalSpend />
      <ExpensesList />
    </div>
  );
}
