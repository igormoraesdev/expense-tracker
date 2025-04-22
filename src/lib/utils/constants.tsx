import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  ReceiptText,
  Zap,
} from "lucide-react";
import { Plans } from "../entities/plans/enum";

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

export const plans = [
  {
    id: Plans.FREE,
    name: "Gratuito",
    price: "R$ 0",
    priceId: "",
    period: "/mês",
    description: "Plano básico para gerenciamento de despesas",
    features: ["Cadastro de 10 despesas", "Acesso às funcionalidades básicas"],
    isPopular: false,
    icon: <CreditCard className="h-5 w-5 text-indigo-200" />,
    bgGradient: "",
    accentColor: "bg-indigo-600",
  },
  {
    id: Plans.PREMIUM_MONTHLY,
    name: "Premium Mensal",
    price: "R$ 10,90",
    priceId: "price_1RDp7dQNgEeSuwCDF6Ds8gQQ",
    period: "/mês",
    description: "Plano ideal para gerenciamento financeiro completo",
    features: [
      "Despesas ilimitadas",
      "Categorização avançada",
      "Relatórios detalhados",
      "Suporte prioritário",
      "Exportação de dados",
    ],
    isPopular: true,
    icon: <Zap className="h-5 w-5 text-indigo-200" />,
    bgGradient: "",
    accentColor: "bg-indigo-600",
  },
  {
    id: Plans.PREMIUM_ANNUAL,
    name: "Premium Anual",
    price: "R$ 100,00",
    priceId: "price_1RDpA3QNgEeSuwCDED3ioiYi",
    period: "/ano",
    description: "Plano ideal para gerenciamento financeiro completo",
    features: [
      "Despesas ilimitadas",
      "Categorização avançada",
      "Relatórios detalhados",
      "Suporte prioritário",
      "Exportação de dados",
      "Economize 16% comparado ao mensal",
    ],
    isPopular: false,
    icon: <Calendar className="h-5 w-5 text-indigo-200" />,
    bgGradient: "",
    accentColor: "bg-indigo-600",
  },
];
