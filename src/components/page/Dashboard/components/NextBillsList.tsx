import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardData } from "@/hooks/useDashboardData";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { NextBillContent } from "./NextBillContent";

type NextBillsListProps = {
  onOpenDialog: (open: boolean) => void;
  onSelectBill: (bill: Bill | undefined) => void;
};

export const NextBillsList = ({
  onOpenDialog,
  onSelectBill,
}: NextBillsListProps) => {
  const { bills, isLoading } = useDashboardData();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center">
                <Skeleton className="bg-white/10 h-10 w-10 rounded-full" />
                <div className="flex flex-col ml-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="bg-white/10 h-3 w-24 rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="bg-white/10 h-3 w-24 rounded" />
                    <Skeleton className="bg-white/10 h-3 w-16 rounded" />
                    <Skeleton className="bg-white/10 h-[32px] w-[32px] rounded-full" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-5 w-20 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      );
    }

    if (bills?.length === 0) {
      return (
        <div className="flex items-center justify-center h-[400px] text-indigo-200">
          <p className="text-center">Nenhum dado disponível para exibição</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 max-h-[350px] overflow-y-auto">
        {bills
          ?.sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return dateA.getTime() - dateB.getTime();
          })
          ?.map((item) => (
            <NextBillContent
              key={item.id}
              bill={item}
              onOpenDialog={onOpenDialog}
              onSelectBill={onSelectBill}
            />
          ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="h-full bg-white/10 backdrop-blur-xl border-white/20 text-white overflow-hidden relative">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Próximas Despesas</CardTitle>
            <CardDescription className="text-indigo-200">
              Despesas que vencem em breve
            </CardDescription>
          </div>
          <DialogTrigger
            onClick={() => {
              onSelectBill(undefined);
            }}
            asChild
          >
            <Button className="bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-600 text-white rounded-full h-10 px-4">
              <Plus className="h-4 w-4 mr-2" />
              Nova
            </Button>
          </DialogTrigger>
        </CardHeader>
        <CardContent>{renderContent()} </CardContent>
      </Card>
    </motion.div>
  );
};
