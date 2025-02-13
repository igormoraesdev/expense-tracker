import { BillsService } from "@/lib/service/bills";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useGetTotalSpend(
  params: TotalSpendParams,
  options?: UseQueryOptions<number, unknown, number>
) {
  return useQuery({
    queryKey: ["total-spend", params.userId],
    queryFn: async () => await BillsService.getTotalSpend(params),
    ...options,
  });
}
