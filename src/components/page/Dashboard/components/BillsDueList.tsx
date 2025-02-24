"use client";
import { BillsDueCard } from "./BillsDueCard";

export const BillsDueList = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold">Pending Bills</h3>
      <div className="flex flex-col max-h-[600px] overflow-y-scroll gap-6 py-4">
        <BillsDueCard />
      </div>
    </div>
  );
};
