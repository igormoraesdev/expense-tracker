import { CategoryEnum } from "@/lib/entities/bills/enum";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Ham,
  HeartPulse,
  House,
  Package,
  Paperclip,
  Phone,
} from "lucide-react";
import { useMemo } from "react";

type CategoryBadgeProps = {
  category: CategoryEnum;
  className?: string;
};

export const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  const categoryRender = useMemo(() => {
    const iconClass = cn("text-indigo-600", className || "size-4");
    const condition = {
      [CategoryEnum.Card]: <CreditCard className={iconClass} strokeWidth={1.5} />,
      [CategoryEnum.Food]: <Ham className={iconClass} strokeWidth={1.5} />,
      [CategoryEnum.Health]: <HeartPulse className={iconClass} strokeWidth={1.5} />,
      [CategoryEnum.House]: <House className={iconClass} strokeWidth={1.5} />,
      [CategoryEnum.Phone]: <Phone className={iconClass} strokeWidth={1.5} />,
      [CategoryEnum.Utilities]: <Package className={iconClass} strokeWidth={1.5} />,
      [CategoryEnum.Other]: <Paperclip className={iconClass} strokeWidth={1.5} />,
    };
    return condition[category];
  }, [category]);
  return (
    <div className="flex items-center justify-center">
      {categoryRender}
    </div>
  );
};
