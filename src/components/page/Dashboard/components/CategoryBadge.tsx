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
      [CategoryEnum.Card]: <CreditCard />,
      [CategoryEnum.Food]: <Ham />,
      [CategoryEnum.Health]: <HeartPulse />,
      [CategoryEnum.House]: <House />,
      [CategoryEnum.Phone]: <Phone />,
      [CategoryEnum.Utilities]: <Package />,
      [CategoryEnum.Other]: <Paperclip />,
    };
    return condition[category];
  }, [category]);
  return categoryRender;
};
