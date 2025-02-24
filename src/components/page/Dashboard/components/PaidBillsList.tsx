"use client";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatusEnum } from "@/lib/entities/bills/enum";
import { Fragment } from "react";
import { BillsCard } from "./BillCard";
import { BillsCardSkeleton } from "./BillsCardSkeleton";

export const PaidBillsList = () => {
  const { bills, isLoading } = useDashboardData();

  if (Number(bills?.length) <= 0) {
    return (
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold mb-4">Paid Bills</h3>
        <div className="flex flex-col max-h-[600px] overflow-y-scroll gap-6 py-2">
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-xl text-indigo-900 font-bold">Empty list</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold mb-4">Paid Bills</h3>
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
              ?.filter((item) => item.status === StatusEnum.Paid)
              ?.map((bill) => (
                <BillsCard isPaid key={bill.id} bill={bill} />
              ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};
