import { TotalSpendData } from "@/hooks/useDashboardData";
import { BillsService } from "@/lib/service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useGetTotalSpend(
  params: TotalSpendParams,
  options?: Omit<
    UseQueryOptions<TotalSpendData, unknown, TotalSpendData>,
    "queryKey"
  >
) {
  return useQuery({
    queryFn: async () => await BillsService.getTotalSpend(params),
    queryKey: ["total-spend", params.userId, params.date],
    ...options,
  });
}
