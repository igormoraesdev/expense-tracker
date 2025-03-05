import { ReceiptText } from "lucide-react";

import { LayoutDashboard } from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Visão geral das suas finanças",
  },
  {
    title: "Despesas",
    url: "/dashboard/bills",
    icon: ReceiptText,
    description: "Gerencie suas despesas",
  },
];
