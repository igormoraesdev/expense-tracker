"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetPlans } from "@/hooks/api/plans/useGetPlans";
import { PlansEnum } from "@/lib/entities/plans/enum";
import { useState } from "react";
import { PlanBar } from "./components/PlanBar";
import { PlanCard } from "./components/PlanCard";
import { PlanFaq } from "./components/PlanFaq";
export function PlansContent() {
  const [currentPlan] = useState<PlansEnum>(PlansEnum.Gratuito);
  const [selectedPlan, setSelectedPlan] = useState<Plans | null>(null);
  const { data: plans, isLoading } = useGetPlans();

  return (
    <div className="container flex flex-col mx-auto p-6 gap-10">
      {/* Seção do plano atual */}
      <PlanBar currentPlan={currentPlan} />

      {/* Título e descrição */}
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-indigo-100">
          Escolha seu plano
        </h1>
        <p className="text-indigo-200/80 max-w-2xl mx-auto">
          Selecione o plano que melhor se adapta às suas necessidades
          financeiras e aproveite ao máximo o gerenciamento de despesas
        </p>
      </div>

      {/* Cards de planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="relative min-h-[530px] p-6 flex flex-col items-center bg-white/5 border border-white/10"
              >
                <Skeleton className="rounded-full mt-2 mb-4 h-[44px] w-[44px]" />
                <Skeleton className="h-[20px] w-[100px]" />
                <Skeleton className="text-xl text-center my-4 h-[20px] w-full" />
                <Skeleton className="h-[20px] w-[100px]" />
              </Skeleton>
            ))}
          </>
        ) : (
          plans?.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selectedPlan={selectedPlan}
              currentPlan={currentPlan}
              onSelectPlan={setSelectedPlan}
            />
          ))
        )}
      </div>
      {/* Seção FAQ ou Informações Adicionais */}
      <PlanFaq />
    </div>
  );
}
