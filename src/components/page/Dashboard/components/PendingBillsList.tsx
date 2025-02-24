"use client";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatusEnum } from "@/lib/entities/bills/enum";
import { Fragment } from "react";
import { BillsCard } from "./BillCard";
import { BillsCardSkeleton } from "./BillsCardSkeleton";

export const PendingBillsList = () => {
  const { bills, isLoading } = useDashboardData();

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold mb-4">Pending Bills</h3>
      <div className="flex flex-col max-h-[600px] overflow-y-scroll gap-6 py-2">
        {isLoading ? (
          <>
            {Array.from(new Array(1)).map((_, index) => (
              <BillsCardSkeleton key={`key-${index}`} />
            ))}
          </>
        ) : (
          <Fragment>
            {bills
              ?.filter((item) => item.status !== StatusEnum.Paid)
              ?.map((bill) => (
                <BillsCard key={bill.id} bill={bill} />
              ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};
