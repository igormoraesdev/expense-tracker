import { Badge } from "@/components/ui/badge";
import { StatusEnum } from "@/lib/entities/bills/enum";
import { translateStatus } from "@/lib/utils";
import { useMemo } from "react";

type BillBadgeProps = {
  bill: Bill;
};

export const BillBadge = ({ bill }: BillBadgeProps) => {
  const badgeRender = useMemo(() => {
    const condition = {
      [StatusEnum.Pending]: (
        <Badge className="bg-yellow-400">
          {translateStatus(bill.status as StatusEnum)}
        </Badge>
      ),
      [StatusEnum.Expired]: (
        <Badge className="bg-red-600">
          {translateStatus(bill.status as StatusEnum)}
        </Badge>
      ),
      [StatusEnum.Paid]: (
        <Badge className="bg-green-500">
          {translateStatus(bill.status as StatusEnum)}
        </Badge>
      ),
    };
    return condition[bill.status as StatusEnum];
  }, [bill]);
  return badgeRender;
};
