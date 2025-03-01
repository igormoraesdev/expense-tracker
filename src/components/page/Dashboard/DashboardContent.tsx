"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import MonthPicker from "@/components/ui/month-picker";
import { DashboardFormSchema } from "@/lib/validation/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { BillsGrid } from "./components/BillsGrid";
import { DialogBills } from "./components/DialogBills";
import { DialogPhone } from "./components/DialogPhone";
import { TotalSpend } from "./components/TotalSpend";

export const DashboardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMonth = searchParams.get("month");
  const currentYear = searchParams.get("year");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogPhone, setOpenDialogPhone] = useState(false);
  const session = useSession();

  const date = new Date();

  const defaultDate = useMemo(() => {
    if (currentMonth && currentYear) {
      date.setMonth(Number(currentMonth) - 1);
      date.setFullYear(Number(currentYear));
      return date;
    }
    return new Date();
  }, [currentMonth, currentYear]);

  const form = useForm<z.infer<typeof DashboardFormSchema>>({
    resolver: zodResolver(DashboardFormSchema),
    mode: "all",
    defaultValues: {
      date: defaultDate as Date,
    },
  });

  useEffect(() => {
    if (!currentMonth) {
      const today = new Date();
      const monthParam = format(today, "MM");
      const yearParam = format(today, "yyyy");
      updateURL(monthParam, yearParam);
    }
  }, [currentMonth]);

  const updateURL = (monthParam: string, yearParam: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("month", monthParam);
    params.set("year", yearParam);
    router.push(`?${params.toString()}`);
  };

  const handleMonthChange = (date: Date, onChange: (date: Date) => void) => {
    const monthParam = format(date, "MM");
    const yearParam = format(date, "yyyy");
    updateURL(monthParam, yearParam);
    onChange(date);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (session.data?.user.userId) {
      if (!session.data.user.phone) {
        setOpenDialogPhone(true);
      }
    }
  }, [session.data?.user]);

  return (
    <FormProvider {...form}>
      <Dialog open={openDialogPhone}>
        <DialogPhone onOpenDialog={setOpenDialogPhone} />
      </Dialog>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <section className="relative min-h-screen bg-gradient-to-b from-white to-indigo-50/30">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-indigo-50/50 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-indigo-50/50 to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "30px 30px",
              }}
            />
          </div>
          <div className="relative w-full h-full px-6 py-8 sm:px-8 sm:py-8">
            <div className="mx-auto">
              <div className="flex flex-col gap-2">
                <div className="w-full mb-8 flex flex-col gap-8 md:gap-0 md:flex-row items-center md:items-start justify-center md:justify-between">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-4xl text-center md:text-left font-bold text-indigo-900">
                      {`Olá, ${session.data?.user.name}`}
                    </h1>
                    <p className="text-indigo-600/80 font-medium text-center md:text-left">
                      Acompanhe suas despesas e mantenha seu orçamento
                    </p>
                  </div>
                  <Controller
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <MonthPicker
                        currentMonth={field.value}
                        onMonthChange={(date) =>
                          handleMonthChange(date, field.onChange)
                        }
                      />
                    )}
                  />
                </div>
                <div className="flex mb-16 flex-col md:flex-row items-center gap-6 w-full">
                  <div className="flex-1 w-full">
                    <TotalSpend />
                  </div>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="group flex items-center gap-2 h-14 px-6 rounded-full border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 active:scale-95 transition-all duration-300 hover:shadow-lg md:w-auto w-full"
                    >
                      <Plus className="h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:rotate-90" />
                      <span className="text-sm font-medium text-indigo-600">
                        Adicionar nova despesa
                      </span>
                    </Button>
                  </DialogTrigger>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  <BillsGrid />
                </div>
              </div>
            </div>
          </div>
        </section>
        <DialogBills onOpenDialog={setOpenDialog} />
      </Dialog>
    </FormProvider>
  );
};
