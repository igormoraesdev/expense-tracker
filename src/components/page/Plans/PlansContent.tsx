"use client";

import { Plans } from "@/lib/entities/plans/enum";
import { plans } from "@/lib/utils/constants";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { PlanCard } from "./components/PlanCard";

export function PlansContent() {
  const [currentPlan] = useState<Plans>(Plans.FREE);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const getCurrentPlan = () => {
    return plans.find((plan) => plan.id === currentPlan);
  };

  return (
    <div className="container flex flex-col mx-auto p-6 gap-10">
      {/* Seção do plano atual */}
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
                  {getCurrentPlan()?.name || "Sem plano"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 text-sm font-bold">
                {currentPlan === Plans.FREE
                  ? "Plano básico"
                  : currentPlan === Plans.PREMIUM_MONTHLY
                  ? "Renovação mensal"
                  : "Renovação anual"}
              </div>
              {currentPlan !== Plans.FREE && (
                <p className="text-indigo-200 text-sm">
                  Próxima cobrança: 15/06/2023
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Barra de progresso para plano gratuito */}
        {currentPlan === Plans.FREE && (
          <div className="bg-indigo-950/50 px-6 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-indigo-200">
                    7 de 10 despesas utilizadas
                  </span>
                  <span className="text-xs font-medium text-indigo-300">
                    70%
                  </span>
                </div>
                <div className="w-full bg-indigo-900/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selectedPlan={selectedPlan as Plan}
            currentPlan={currentPlan}
            onSelectPlan={setSelectedPlan}
          />
        ))}
      </div>

      {/* Seção FAQ ou Informações Adicionais */}
      <div className="mt-10 bg-indigo-900/20 rounded-lg p-6 border border-indigo-500/20">
        <h3 className="text-xl font-semibold text-white mb-4">
          Informações importantes
        </h3>
        <p className="text-indigo-200/70 mb-2">
          • Você pode alterar seu plano a qualquer momento.
        </p>
        <p className="text-indigo-200/70 mb-2">
          • O pagamento é processado de forma segura através de nossa
          plataforma.
        </p>
        <p className="text-indigo-200/70">
          • Precisa de ajuda? Entre em contato com nosso suporte.
        </p>
      </div>
    </div>
  );
}
