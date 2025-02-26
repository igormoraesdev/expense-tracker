import { CategoryEnum } from "@/lib/entities/bills/enum";
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
};

export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const categoryRender = useMemo(() => {
    const condition = {
      [CategoryEnum.Card]: <CreditCard className="size-4 text-indigo-600" />,
      [CategoryEnum.Food]: <Ham className="size-4 text-indigo-600" />,
      [CategoryEnum.Health]: <HeartPulse className="size-4 text-indigo-600" />,
      [CategoryEnum.House]: <House className="size-4 text-indigo-600" />,
      [CategoryEnum.Phone]: <Phone className="size-4 text-indigo-600" />,
      [CategoryEnum.Utilities]: <Package className="size-4 text-indigo-600" />,
      [CategoryEnum.Other]: <Paperclip className="size-4 text-indigo-600" />,
    };
    return condition[category];
  }, [category]);
  return (
    <div className="flex items-center justify-center rounded-full h-[32px] w-[32px]  border-[1px] border-indigo-600">
      {categoryRender}
    </div>
  );
};
