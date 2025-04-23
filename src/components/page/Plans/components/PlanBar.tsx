import { Skeleton } from "@/components/ui/skeleton";
import { useDetectTypeUser } from "@/hooks/useDetectTypeUser";
import { PlansIdEnum } from "@/lib/entities/plans/enum";
import { Sparkles } from "lucide-react";

type PlanBarProps = {
  currentPlan: {
    title: string;
    id: PlansIdEnum;
  } | null;
  isLoading: boolean;
};
export function PlanBar({ currentPlan, isLoading }: PlanBarProps) {
  const { totalBills, isPending } = useDetectTypeUser();

  const loading = isLoading || isPending || !totalBills;

  if (loading) {
    return (
      <Skeleton className="w-full h-[174px] rounded-xl bg-white/5 border border-white/10" />
    );
  }

  return (
    <div className="rounded-xl overflow-hidden backdrop-blur-sm border border-indigo-500/20 shadow-lg">
      <div className="bg-gradient-to-r from-indigo-600/70 to-indigo-900/70 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/10 p-4 backdrop-blur-md">
              <Sparkles className="h-8 w-8 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-indigo-200">
                Seu plano atual
              </h2>
              <p className="text-2xl font-bold text-white mt-1">
                {currentPlan?.title}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 text-sm font-bold">
              {currentPlan?.id === PlansIdEnum.Gratuito
                ? "Plano básico"
                : currentPlan?.id === PlansIdEnum["Premium Mensal"]
                ? "Renovação mensal"
                : "Renovação anual"}
            </div>
            {currentPlan?.id !== PlansIdEnum.Gratuito && (
              <p className="text-indigo-200 text-sm">
                Próxima cobrança: 15/06/2023
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Barra de progresso para plano gratuito */}
      {currentPlan?.id === PlansIdEnum.Gratuito && (
        <div className="bg-indigo-950/50 px-6 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-indigo-200">
                  {totalBills} de 10 despesas utilizadas
                </span>
                <span className="text-xs font-medium text-indigo-300">
                  {totalBills * 10}%
                </span>
              </div>
              <div className="w-full bg-indigo-900/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2 rounded-full"
                  style={{ width: `${totalBills * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
