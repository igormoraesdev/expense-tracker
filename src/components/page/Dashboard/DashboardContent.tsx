"use client";
import { Button } from "@/components/ui/button";
import { CustomDatePicker } from "@/components/ui/form/CustomDatePicker";
import { CircleDollarSign, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

export const DashboardContent = () => {
  const session = useSession();

  return (
    <div className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start">
      <div className="w-full mb-6 flex flex-col gap-8 md:gap-0 md:flex-row items-center md:items-start justify-center md:justify-between">
        <h1 className="text-4xl font-bold">{`Hi, ${session.data?.user.name}`}</h1>
        <CustomDatePicker />
      </div>
      <div className="flex mb-6 flex-col md:flex-row items-center gap-4">
        <div className="flex flex-row justify-between items-center p-6 border-2 border-indigo-200 rounded-2xl w-full max-w-[340px] h-[140px]">
          <div>
            <p className="mb-1 text-sm font-bold">Total spend this month</p>
            <p className="text-4xl font-bold text-indigo-900">R$: 6.000</p>
          </div>
          <div className="flex items-center justify-center size-12 rounded-full bg-indigo-700">
            <CircleDollarSign className="text-white" />
          </div>
        </div>
        <Button variant="outline" className="rounded-full p-2">
          <Plus />
          <span className="hidden md:block">Add expense</span>
        </Button>
      </div>
      {/* <div>
        <h2 className="text-xl font-bold">Bills close to maturity</h2>
      </div> */}
    </div>
  );
};
