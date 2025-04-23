import { PlansIdEnum } from "@/lib/entities/plans/enum";
import { plansItem } from "@/lib/utils/constants";
import { isSameMonth, isSameYear, startOfMonth, subMonths } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useGetAllBills } from "./api/bills/useGetAllBills";
import { useGetPlans } from "./api/plans/useGetPlans";

interface UseDetectTypeUserResult {
  userPlan:
    | {
        title: string;
        id: PlansIdEnum;
      }
    | {
        title: string;
        id: PlansIdEnum;
      }
    | {
        title: string;
        id: PlansIdEnum;
      };
  totalBills: number;
  plans: Plans[] | undefined;
  isPending: boolean;
  hasPreviousMonthBills: boolean;
  userFreeExceeded: boolean;
}

export function useDetectTypeUser(): UseDetectTypeUserResult {
  const session = useSession();
  const { data, isLoading } = useGetAllBills(
    {
      userId: session.data?.user.userId as string,
      page: 1,
      limit: 100,
    },
    { enabled: !!session.data?.user.userId }
  );
  const { data: plans, isLoading: isLoadingPlans } = useGetPlans();

  const totalBills = useMemo(() => data?.bills?.length ?? 0, [data]);
  const userPlanId = session.data?.user.planId;

  const userPlan = plansItem[userPlanId as keyof typeof plansItem] || null;

  const hasBillsLastMonth = () => {
    if (!data?.bills || data.bills.length === 0) return false;

    const currentDate = new Date();
    const lastMonth = subMonths(startOfMonth(currentDate), 1);

    return data.bills.some((bill) => {
      const billDate = new Date(bill.dueDate);
      return (
        isSameMonth(billDate, lastMonth) && isSameYear(billDate, lastMonth)
      );
    });
  };

  const hasPreviousMonthBills = hasBillsLastMonth();

  const userFreeExceeded = totalBills === 10;

  const isPending = isLoading || isLoadingPlans || !totalBills;

  return {
    userPlan,
    totalBills,
    plans,
    isPending,
    hasPreviousMonthBills,
    userFreeExceeded,
  };
}
