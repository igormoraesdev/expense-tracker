"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import MonthPicker from "@/components/ui/month-picker";
import { DashboardFormSchema } from "@/lib/validation/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { ExpenseDialogAddBills } from "./components/ExpenseDialogAddBills";
import { PaidBillsList } from "./components/PaidBillsList";
import { PendingBillsList } from "./components/PendingBillsList";
import { TotalSpend } from "./components/TotalSpend";

export const DashboardContent = () => {
  const form = useForm<z.infer<typeof DashboardFormSchema>>({
    resolver: zodResolver(DashboardFormSchema),
    mode: "all",
    defaultValues: {
      date: new Date(),
    },
  });
  const session = useSession();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <FormProvider {...form}>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <section className="bg-white w-full h-full p-8">
          <div className="flex flex-col gap-2 justify-center items-center h-full md:justify-start md:items-start">
            <div className="w-full mb-6 flex flex-col gap-8 md:gap-0 md:flex-row items-center md:items-start justify-center md:justify-between">
              <h1 className="text-4xl font-bold">{`Hi, ${session.data?.user.name}`}</h1>
              <Controller
                control={form.control}
                name="date"
                render={({ field }) => (
                  <MonthPicker
                    currentMonth={field.value}
                    onMonthChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex mb-20 flex-col md:flex-row items-center gap-6 w-full">
              <TotalSpend />
              <DialogTrigger asChild className="size-8">
                <Button
                  variant="outline"
                  size={"icon"}
                  className="rounded-full outline-none"
                >
                  <Plus size={24} className="w-[24px] h-[24px]" />
                </Button>
              </DialogTrigger>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full overflow-y-hidden">
              <PendingBillsList />
              <PaidBillsList />
            </div>
          </div>
        </section>
        <ExpenseDialogAddBills onOpenDialog={setOpenDialog} />
      </Dialog>
    </FormProvider>
  );
};
