import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import { useGetBills } from "./api/bills/useGetBills";
import { useGetTotalSpend } from "./api/bills/useGetTotalSpend";

export const useDashboardData = () => {
  const session = useSession();
  const { watch } = useFormContext();
  const date = watch("date");

  const { data: totalSpend, isLoading: totalSpendLoading } = useGetTotalSpend(
    {
      userId: session.data?.user.userId as string,
      date,
    },
    {
      enabled: !!session.data?.user.userId,
    }
  );

  const { data: bills, isLoading: billsLoading } = useGetBills(
    {
      userId: session.data?.user.userId as string,
      date,
    },
    {
      enabled: !!session.data?.user.userId,
    }
  );

  const isLoading = billsLoading || totalSpendLoading || !bills || !totalSpend;
  return {
    totalSpend,
    bills,
    isLoading,
  };
};
