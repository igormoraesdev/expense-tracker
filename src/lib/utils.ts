import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class Masks {
  static formatNumber(value: string, prefix = "") {
    value = value.replace(/\D/g, "");
    while (value.length < 3) {
      value = "0" + value;
    }

    let integerPart = value.slice(0, -2) || "0";
    const decimalPart = value.slice(-2);

    integerPart = integerPart
      .replace(/^(0+)(\d)/, "$2")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${prefix} ${integerPart},${decimalPart}`;
  }
}
