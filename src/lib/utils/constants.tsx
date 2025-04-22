import { CreditCard, LayoutDashboard, ReceiptText } from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Visão geral das suas finanças",
  },
  {
    title: "Despesas",
    url: "/dashboard/expenses",
    icon: ReceiptText,
    description: "Gerencie suas despesas",
  },
  {
    title: "Planos",
    url: "/dashboard/plans",
    icon: CreditCard,
    description: "Conheça nossos planos",
  },
];
