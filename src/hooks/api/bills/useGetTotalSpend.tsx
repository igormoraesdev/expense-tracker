import { BillsService } from "@/lib/service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useGetTotalSpend(
  params: TotalSpendParams,
  options?: Omit<UseQueryOptions<number, unknown, number>, "queryKey">
) {
  return useQuery({
    queryFn: async () => await BillsService.getTotalSpend(params),
    queryKey: ["total-spend", params.userId, params.date],
    ...options,
  });
}
