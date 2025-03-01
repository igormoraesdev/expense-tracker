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
    [CategoryEnum.Card]: "Cartão de crédito",
    [CategoryEnum.Health]: "Saúde",
    [CategoryEnum.House]: "Casa",
    [CategoryEnum.Phone]: "Telefone",
    [CategoryEnum.Utilities]: "Serviços",
    [CategoryEnum.Other]: "Outros",
  };
  return translations[category];
};
