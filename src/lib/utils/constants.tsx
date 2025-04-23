import { CreditCard, LayoutDashboard, ReceiptText } from "lucide-react";
import { PlansIdEnum } from "../entities/plans/enum";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Visão geral das suas finanças",
    plans: [
      PlansIdEnum.Gratuito,
      PlansIdEnum["Premium Mensal"],
      PlansIdEnum["Premium Anual"],
    ],
  },
  {
    title: "Despesas",
    url: "/dashboard/expenses",
    icon: ReceiptText,
    description: "Gerencie suas despesas",
    plans: [
      PlansIdEnum.Gratuito,
      PlansIdEnum["Premium Mensal"],
      PlansIdEnum["Premium Anual"],
    ],
  },
  {
    title: "Planos",
    url: "/dashboard/plans",
    icon: CreditCard,
    description: "Conheça nossos planos",
    plans: [
      PlansIdEnum.Gratuito,
      PlansIdEnum["Premium Mensal"],
      PlansIdEnum["Premium Anual"],
    ],
  },
];

export const plansItem = {
  [PlansIdEnum.Gratuito]: {
    title: "Gratuito",
    id: PlansIdEnum.Gratuito,
  },
  [PlansIdEnum["Premium Mensal"]]: {
    title: "Premium Mensal",
    id: PlansIdEnum["Premium Mensal"],
  },
  [PlansIdEnum["Premium Anual"]]: {
    title: "Premium Anual",
    id: PlansIdEnum["Premium Anual"],
  },
};
