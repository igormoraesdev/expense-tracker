import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import { useGetBills } from "./api/bills/useGetBills";
import { useGetTotalSpend } from "./api/bills/useGetTotalSpend";

export type TotalSpendData = {
  totalSpend: string;
  previousMonth: string;
  average: string;
  percentageChange: string;
};

export const useDashboardData = () => {
  const session = useSession();
  const { watch } = useFormContext();
  const date = watch("date");

  const { data: totalSpendData, isLoading: totalSpendLoading } =
    useGetTotalSpend(
      {
        userId: session.data?.user.userId as string,
        date: new Date(date),
      },
      {
        enabled: !!session.data?.user.userId,
      }
    );

  const { data: bills, isLoading: billsLoading } = useGetBills(
    {
      userId: session.data?.user.userId as string,
      date: new Date(date),
    },
    {
      enabled: !!session.data?.user.userId,
    }
  );

  const isLoading =
    billsLoading || totalSpendLoading || !bills || !totalSpendData;
  return {
    totalSpendData,
    bills,
    isLoading,
  };
};
