"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CustomDatePicker } from "@/components/ui/form/CustomDatePicker";

import { CircleDollarSign, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { ExpenseDialogAddBills } from "./components/ExpenseDialogAddBills";

export const DashboardContent = () => {
  const session = useSession();

  return (
    <Dialog>
      <section className="bg-white w-full h-full p-8">
        <div className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start">
          <div className="w-full mb-6 flex flex-col gap-8 md:gap-0 md:flex-row items-center md:items-start justify-center md:justify-between">
            <h1 className="text-4xl font-bold">{`Hi, ${session.data?.user.name}`}</h1>
            <CustomDatePicker />
          </div>
          <div className="flex mb-6 flex-col md:flex-row items-center gap-6 w-full">
            <div className="flex flex-row justify-between items-center p-6 border-2 border-indigo-200 rounded-2xl w-full max-w-[340px] h-[140px]">
              <div>
                <p className="mb-1 text-sm font-bold">Total spend this month</p>
                <p className="text-4xl font-bold text-indigo-900">R$: 6.000</p>
              </div>
              <div className="flex items-center justify-center size-12 rounded-full bg-indigo-700">
                <CircleDollarSign className="text-white" />
              </div>
            </div>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size={"icon"}
                className="h-[50] w-full max-w-[50] rounded-full p-6 outline-none"
              >
                <Plus size={24} className="w-[24px] h-[24px]" />
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </section>
      <ExpenseDialogAddBills />
    </Dialog>
  );
};
