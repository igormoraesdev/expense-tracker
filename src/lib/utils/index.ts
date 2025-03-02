import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CategoryEnum, StatusEnum } from "../entities/bills/enum";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const translateStatus = (status: StatusEnum): string => {
  const translations = {
    [StatusEnum.Paid]: "Pago",
    [StatusEnum.Pending]: "Pendente",
    [StatusEnum.Expired]: "Expirado",
  };
  return translations[status];
};

export const translateCategory = (category: CategoryEnum): string => {
  const translations = {
    [CategoryEnum.Food]: "Alimentação",
    [CategoryEnum.Card]: "Cartão",
    [CategoryEnum.Health]: "Saúde",
    [CategoryEnum.House]: "Casa",
    [CategoryEnum.Phone]: "Telefone",
    [CategoryEnum.Utilities]: "Serviços",
    [CategoryEnum.Other]: "Outros",
  };
  return translations[category];
};

export const formatCurrency = (value: number, isCompact = false) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: isCompact ? "compact" : "standard",
  }).format(value);
};
