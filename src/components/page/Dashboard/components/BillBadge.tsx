import { Badge } from "@/components/ui/badge";
import { StatusEnum } from "@/lib/entities/bills/enum";
import { useMemo } from "react";

type BillBadgeProps = {
  bill: Bill;
};

export const BillBadge = ({ bill }: BillBadgeProps) => {
  const badgeRender = useMemo(() => {
    const condition = {
      [StatusEnum.Pending]: (
        <Badge className="bg-yellow-400">{bill.status}</Badge>
      ),
      [StatusEnum.Expired]: <Badge className="bg-red-600">{bill.status}</Badge>,
      [StatusEnum.Paid]: <Badge className="bg-green-500">{bill.status}</Badge>,
    };
    return condition[bill.status as StatusEnum];
  }, [bill]);
  return badgeRender;
};
