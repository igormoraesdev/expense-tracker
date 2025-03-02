import { Badge } from "@/components/ui/badge";
import { StatusEnum } from "@/lib/entities/bills/enum";
import { cn } from "@/lib/utils";
import { translateStatus } from "@/lib/utils";
import { Check, Clock, ShieldAlert } from "lucide-react";
import { useMemo } from "react";

type BillBadgeProps = {
  bill: Bill;
  className?: string;
};

export const BillBadge = ({ bill, className }: BillBadgeProps) => {
  const badgeRender = useMemo(() => {
    const condition = {
      [StatusEnum.Pending]: (
        <Badge 
          className={cn(
            "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 gap-1.5 px-2.5 py-0.5 shadow-sm",
            className
          )}
        >
          <Clock className="size-3" strokeWidth={2} />
          {translateStatus(bill.status as StatusEnum)}
        </Badge>
      ),
      [StatusEnum.Expired]: (
        <Badge 
          className={cn(
            "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 gap-1.5 px-2.5 py-0.5 shadow-sm",
            className
          )}
        >
          <ShieldAlert className="size-3" strokeWidth={2} />
          {translateStatus(bill.status as StatusEnum)}
        </Badge>
      ),
      [StatusEnum.Paid]: (
        <Badge 
          className={cn(
            "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 gap-1.5 px-2.5 py-0.5 shadow-sm",
            className
          )}
        >
          <Check className="size-3" strokeWidth={2} />
          {translateStatus(bill.status as StatusEnum)}
        </Badge>
      ),
    };
    return condition[bill.status as StatusEnum];
  }, [bill]);
  return badgeRender;
};
