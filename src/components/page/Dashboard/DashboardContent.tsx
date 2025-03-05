"use client";
import { Dialog } from "@/components/ui/dialog";
import MonthPicker from "@/components/ui/month-picker";
import { DashboardFormSchema } from "@/lib/validation/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { ChartByCategory } from "./components/ChartByCategory";
import { DialogBills } from "./components/DialogBills";
import { DialogPhone } from "./components/DialogPhone";
import { MainCategory } from "./components/MainCategory";
import { NextBillsList } from "./components/NextBillsList";
import { TotalMonthSpend } from "./components/TotalMonthSpend";

export const DashboardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMonth = searchParams.get("month");
  const currentYear = searchParams.get("year");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogPhone, setOpenDialogPhone] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | undefined>(undefined);
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
        <div className="w-full min-h-screen overflow-hidden">
          <div className="w-full min-h-screen p-8 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 justify-items-center sm:justify-items-start">
              <TotalMonthSpend />
              <MainCategory />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full h-full col-span-1 flex items-center justify-center order-1 sm:order-3"
              >
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
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <NextBillsList
                onOpenDialog={setOpenDialog}
                onSelectBill={setSelectedBill}
              />
              <ChartByCategory />
            </div>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white overflow-hidden relative">
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Histórico de Despesas</CardTitle>
                    <CardDescription className="text-indigo-200">
                      Últimas despesas cadastradas
                    </CardDescription>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-10 px-4">
                    Ver todas
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mr-4">
                            <Wallet className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              Compras no supermercado
                            </p>
                            <p className="text-sm text-indigo-200">
                              Alimentação • {format(new Date(), "dd/MM/yyyy")}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-indigo-100">
                          - R$ 350,00
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div> */}
          </div>
        </div>
        <DialogBills
          onOpenDialog={setOpenDialog}
          bill={selectedBill}
          isEdit={!!selectedBill}
        />
      </Dialog>
    </FormProvider>
  );
};
