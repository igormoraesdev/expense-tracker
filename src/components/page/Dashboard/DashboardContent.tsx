"use client";
import { CustomDatePicker } from "@/components/ui/form/CustomDatePicker";
import { useSession } from "next-auth/react";

export const DashboardContent = () => {
  const session = useSession();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-4xl font-bold">{`Hi, ${session.data?.user.name}`}</h1>
        <CustomDatePicker />
      </div>
    </div>
  );
};
