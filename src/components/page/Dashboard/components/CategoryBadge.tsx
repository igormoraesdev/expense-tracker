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
      [CategoryEnum.Card]: <CreditCard size={20} className="text-white" />,
      [CategoryEnum.Food]: <Ham size={20} className="text-white" />,
      [CategoryEnum.Health]: <HeartPulse size={20} className="text-white" />,
      [CategoryEnum.House]: <House size={20} className="text-white" />,
      [CategoryEnum.Phone]: <Phone size={20} className="text-white" />,
      [CategoryEnum.Utilities]: <Package size={20} className="text-white" />,
      [CategoryEnum.Other]: <Paperclip size={20} className="text-white" />,
    };
    return condition[category];
  }, [category]);
  return categoryRender;
};
