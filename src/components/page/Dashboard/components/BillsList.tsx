"use client";
import { Button } from "@/components/ui/button";
import { useCreateBillsByLastMonth } from "@/hooks/api/bills/useCreateBillsByLastMonth";
import { useToast } from "@/hooks/use-toast";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useQueryClient } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import { motion } from "framer-motion";
import { CalendarClock, List } from "lucide-react";
import { useSession } from "next-auth/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { BillsCard } from "./BillCard";
import { BillsCardSkeleton } from "./BillsCardSkeleton";
type BillsListProps = {
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
  onSelectBill: Dispatch<SetStateAction<Bill | undefined>>;
};

export const BillsList = ({ onOpenDialog, onSelectBill }: BillsListProps) => {
  const session = useSession();
  const queryClient = useQueryClient();
  const { bills, isLoading } = useDashboardData();
  const { mutateAsync, isPending } = useCreateBillsByLastMonth({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["total-spend"] });
    },
  });
  const { toast } = useToast();

  const handleAddPreviousMonthBills = async () => {
    try {
      const previousMonth = subMonths(new Date(), 1);
      await mutateAsync({
        date: previousMonth,
        userId: session.data?.user.userId as string,
      });
      toast({
        description: "Despesas do mês anterior adicionada com sucesso",
        className: "bg-green-500 text-white",
      });
    } catch (error: any) {
      toast({
        className: "bg-red-500 text-white",
        description: error.message,
      });
    }
  };

  if (Number(bills?.length) <= 0) {
    return (
      <div className="flex flex-col order-2 sm:order-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center size-10 rounded-xl bg-indigo-100 shadow-sm">
            <List className="size-5 text-indigo-600" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-indigo-900">Despesas</h3>
        </div>
        <div className="flex flex-col gap-6 py-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: "0px 4px 10px rgba(79, 70, 229, 0.2)",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 20px rgba(79, 70, 229, 0.3)",
            }}
            whileTap={{
              scale: 0.97,
              boxShadow: "0px 2px 5px rgba(79, 70, 229, 0.2)",
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="w-full overflow-hidden rounded-xl"
          >
            <Button
              isLoading={isPending}
              loadingColor="text-white"
              className="w-full min-h-[80px] text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 flex items-center justify-center gap-3 rounded-xl border-none"
              onClick={handleAddPreviousMonthBills}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-white/20 p-2 rounded-full"
              >
                <CalendarClock className="h-5 w-5" />
              </motion.div>
              <motion.span whileHover={{ x: 5 }} className="font-medium">
                Adicionar as despesas do mês anterior
              </motion.span>
            </Button>
          </motion.div>
          <div className="flex justify-center items-center w-full p-6 sm:p-8 bg-indigo-50 border border-indigo-100 rounded-xl gap-4">
            <p className="text-sm sm:text-lg font-semibold text-indigo-600">
              Nenhuma despesa registrada
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col order-1 sm:order-2">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center size-10 rounded-xl bg-indigo-100 shadow-sm">
          <List className="size-5 text-indigo-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold text-indigo-900">Despesas</h3>
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
        {isLoading ? (
          <>
            {Array.from(new Array(1)).map((_, index) => (
              <BillsCardSkeleton key={`key-${index}`} />
            ))}
          </>
        ) : (
          <Fragment>
            {bills?.map((bill) => (
              <BillsCard
                onOpenDialog={onOpenDialog}
                onSelectBill={onSelectBill}
                key={bill.id}
                bill={bill}
              />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};
