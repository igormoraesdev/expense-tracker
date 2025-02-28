"use client";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatusEnum } from "@/lib/entities/bills/enum";
import { Dispatch, Fragment, SetStateAction } from "react";
import { BillsCard } from "./BillCard";
import { BillsCardSkeleton } from "./BillsCardSkeleton";

type BillsListProps = {
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
  onSelectBill: Dispatch<SetStateAction<Bill | undefined>>;
};

export const BillsList = ({ onOpenDialog, onSelectBill }: BillsListProps) => {
  const { bills, isLoading } = useDashboardData();

  if (
    Number(bills?.filter((item) => item.status !== StatusEnum.Paid)?.length) <=
    0
  ) {
    return (
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4">Bills</h3>
        <div className="flex flex-col gap-6 py-2">
          <div className="flex justify-center items-center w-full p-6 sm:p-8 bg-indigo-50 border border-indigo-100 rounded-xl gap-4">
            <p className="text-sm sm:text-lg font-semibold text-indigo-600">
              No expenses registered
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold text-indigo-900 mb-4">Bills</h3>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
        {isLoading ? (
          <>
            {Array.from(new Array(1)).map((_, index) => (
              <BillsCardSkeleton key={`key-${index}`} />
            ))}
          </>
        ) : (
          <Fragment>
            {bills?.map((bill) => (
              <BillsCard
                onOpenDialog={onOpenDialog}
                onSelectBill={onSelectBill}
                key={bill.id}
                bill={bill}
              />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};
