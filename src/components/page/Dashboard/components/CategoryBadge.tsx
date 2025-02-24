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
      [CategoryEnum.Card]: <CreditCard size={20} className="text-indigo-700" />,
      [CategoryEnum.Food]: <Ham size={20} className="text-indigo-700" />,
      [CategoryEnum.Health]: (
        <HeartPulse size={20} className="text-indigo-700" />
      ),
      [CategoryEnum.House]: <House size={20} className="text-indigo-700" />,
      [CategoryEnum.Phone]: <Phone size={20} className="text-indigo-700" />,
      [CategoryEnum.Utilities]: (
        <Package size={20} className="text-indigo-700" />
      ),
      [CategoryEnum.Other]: <Paperclip size={20} className="text-indigo-700" />,
    };
    return condition[category];
  }, [category]);
  return categoryRender;
};
